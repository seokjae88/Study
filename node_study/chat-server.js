// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 7777;

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

var numUsers = 0;
var roomlist = [];

io.on('connection', (socket) => {
    var addedUser = false;

    socket.on('debug', (data) => {
        console.log(data);
    });

    socket.on('join', (data) => {
        if(data.room == '') {
            socket.emit();
            return;
        }

        if(roomlist == undefined) {
            roomlist = new Array();
            roomlist[data.room] = new Object();
            roomlist[data.room].userlist = new Object();
            roomlist[data.room].userlist[data.username] = true;
        } else if(roomlist[data.room] == undefined) {
            roomlist[data.room] = new Object();
            roomlist[data.room].userlist = new Object();
            roomlist[data.room].userlist[data.username] = true;
        } else if(roomlist[data.room].userlist == undefined){
            roomlist[data.room].userlist = new Object();
            roomlist[data.room].userlist[data.username] = true;
        } else {
            if(roomlist[data.room].userlist[data.username]) {
                socket.emit('error msg', 'Already Use Name!!!');
                return;
            }

            roomlist[data.room].userlist[data.username] = true;
        }

        socket.room = data.room;
        socket.join(data.room);

        socket.emit('login', {'username':socket.username,'users':Object.keys(roomlist[data.room].userlist)});
        socket.broadcast.to(data.room).emit('user joined', {'username':socket.username,'users':Object.keys(roomlist[data.room].userlist)});
    });


    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
        // we tell the client to execute 'new message'
        socket.broadcast.to(socket.room).emit('new message', {
            username: socket.username,
            message: data
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        if (username == '') return;

        // we store the username in the socket session for this client
        socket.username = username;

        if(roomlist == undefined) {
            roomlist = new Array();
            socket.emit('roomlist', Object.keys(roomlist));
        } else {

            socket.emit('roomlist', {'rooms':Object.keys(roomlist)});
        }
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
        socket.broadcast.to(socket.room).emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
        socket.broadcast.to(socket.room).emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        if(roomlist[socket.room] == undefined || roomlist[socket.room].userlist == undefined) {
            return;
        }

        if(roomlist[socket.room].userlist[socket.username]) {
            delete roomlist[socket.room].userlist[socket.username];
            console.log(socket.username);
        }

        socket.broadcast.to(socket.room).emit('user left', {'username': socket.username,'users':Object.keys(roomlist[socket.room].userlist)});
    });
});
