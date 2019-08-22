var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [
    {
        id:1,
        text:"Lorem ipsum",
        author:"Ferney Caceres"
    }
]

app.use(express.static('public'));

app.get('/',function(req,res) {
    res.status(200).send("Hola Mundo");
});

io.on('connection', function(socket) {
    console.log('Someone is connected via socket');

    socket.emit('messages',messages);
    socket.on('new-message',function(data) {
        messages.push(data);
        io.sockets.emit('messages',messages);
    })
})

server.listen(8080,function() {
    console.log("Server running")
});