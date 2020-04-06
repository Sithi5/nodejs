var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var session = require('express-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//setting the view folders
app.set('views', './views');
app.get('/', function(req, res) {
    res.render('index.html.twig');
});

io.on('connection', function(socket) {
    console.log('a new user connected to server.');

    socket.on('pseudo', function(pseudo) {
        socket.pseudo = pseudo;
        console.log(socket.pseudo + ' connected to chat.');
        socket.emit('message', 'vous etes bien connecte ' + socket.pseudo + ' !', socket.pseudo);
        socket.broadcast.emit('newuseronchat', socket.pseudo + ' vient de se co.');
    });
    socket.on('message', function(message) {
        console.log('user ' + socket.pseudo + ': ' + message);
    })
});

http.listen(8070, function() {
    console.log('listening on *:8070');
});