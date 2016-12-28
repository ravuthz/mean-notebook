var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://ravuthz:123123@ds145158.mlab.com:45158/ravuthz_notebook', ['notes']);
// var db = mongojs('mongodb://admin:123123@localhost:27017/admin?authSource=admin', ['notes']);

// var Note = require('./models/note');
// var data = new Note();
// data.title = 'new note with mongoose';
// data.content = 'new note content with mongoose';
// data.book = 'notebook';
// data.author = 'admin';
// data.save(function(err, note) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(note);
//     }
// });


db.on('error', function(err) {
    console.log('database error', err)
})

db.on('connect', function() {
    console.log('database connected with mongojs')
})

// get all notes
router.get('/notes', function(req, res, next) {
    db.notes.find(function(err, notes) {
        if (err) {
            res.send(err);
        }
        res.json(notes);
    });
});

// create new note
router.post('/notes', function(req, res, next) {
    var note = req.body;
    if (!note.title || !note.author || !note.book) {
        res.status(400);
        res.json({
            "error": "Bad data",
            "message": "Please check your input data again"
        });
    } else {
        db.notes.save(note, function(err, note) {
            if (err) {
                res.send(err);
            }
            res.json(note);
        });
    }
});

// get single note
router.get('/notes/:id', function(req, res, next) {
    db.notes.find({ _id: mongojs.ObjectId(req.params.id) }, function(err, note) {
        if (err) {
            res.send(err);
        }
        res.json(note);
    });
});

// delete the note
router.delete('/notes/:id', function(req, res, next) {
    db.notes.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, note) {
        if (err) {
            res.send(err);
        }
        res.json(note);
    });
});

// update note
router.put('/notes/:id', function(req, res, next) {
    db.notes.find({ _id: mongojs.ObjectId(req.params.id) }, function(err, note) {
        var oldNote = req.body;
        var newNote = {};

        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);
        newNote.created_at = note.created_at;
        newNote.updated_at = timestamp;

        if (oldNote.title) {
            newNote.title = oldNote.title;
        }

        if (oldNote.description) {
            newNote.description = oldNote.description;
        }

        if (oldNote.book) {
            newNote.book = oldNote.book;
        }

        if (oldNote.author) {
            newNote.author = oldNote.author;
        }

        if (!newNote) {
            res.status(400);
            res.json({
                "error": "Bad data",
                "message": "Please check your input data again"
            });
        } else {
            db.notes.update({ _id: mongojs.ObjectId(req.params.id) }, newNote, {}, function(err, note) {
                if (err) {
                    res.send(err);
                }
                res.json(note);
            });
        }
    });
});

module.exports = router;