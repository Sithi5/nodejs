var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var session = require('express-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res) {
    res.render('index.html.twig');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.emit('message', 'vous etes bien connecte !');
    socket.broadcast.emit('message', 'Quelqu\'un vient de se co.');
    socket.on('message', function(message) {
        console.log('kikiveux ? ' + message);
    })
});

http.listen(8070, function() {
    console.log('listening on *:8070');
});