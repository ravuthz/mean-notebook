var express = require('express');
var router = express.Router();

// Models
var Note = require('../models/note');

// Routes
Note.methods(['get', 'post', 'put', 'delete']);
Note.register(router, '/note-restful');

// Return router
module.exports = router;