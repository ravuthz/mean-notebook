var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var notes = require('./routes/notes');

var port = 3000;
var app = express();

// CORS middleware
// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     next();
// }

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));
// app.use(express.static(__dirname + "/public"));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS middleware
// app.use(function(req, res, next) {
// res.header("Access-Control-Allow-Origin", "*");
// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// res.header('Access-Control-Allow-Headers', 'application/json');
// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// next();
// });

// Routers
app.use('/', index);
app.use('/api', notes);
app.use('/', require('./routes/note-restful'));

app.listen(port, function() {
    console.log('Server started on port: ' + port);
});