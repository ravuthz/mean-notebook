// var mongoose = require('mongoose');

// mongoose.connect('mongodb://ravuthz:123123@ds145158.mlab.com:45158/ravuthz_notebook');

// mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
// mongoose.connection.once('open', function() {
//     console.log('database connected with mongoose')
// });

// var noteSchema = mongoose.Schema({
//     // _id: Schema.Types.ObjectId,
//     title: String,
//     content: String,
//     book: String,
//     author: String,
//     created_at: { type: Date, default: Date.now },
//     updated_at: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Note', noteSchema);

var restful = require('node-restful');
var mongoose = restful.mongoose;

mongoose.connect('mongodb://ravuthz:123123@ds145158.mlab.com:45158/ravuthz_notebook');

var noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    book: String,
    author: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = restful.model('Note', noteSchema);