var roomlist = [];

var Chat = {};
Chat.join = function (data, socket) {
    if (data.room == '') {
        socket.emit();
        return;
    }

    if (roomlist == undefined) {
        roomlist = new Array();
        roomlist[data.room] = new Object();
        roomlist[data.room].userlist = new Object();
        roomlist[data.room].userlist[data.username] = true;
    } else if (roomlist[data.room] == undefined) {
        roomlist[data.room] = new Object();
        roomlist[data.room].userlist = new Object();
        roomlist[data.room].userlist[data.username] = true;
    } else if (roomlist[data.room].userlist == undefined) {
        roomlist[data.room].userlist = new Object();
        roomlist[data.room].userlist[data.username] = true;
    } else {
        if (roomlist[data.room].userlist[data.username]) {
            socket.emit('error msg', 'Already Use Name!!!');
            return;
        }

        roomlist[data.room].userlist[data.username] = true;
    }

    socket.room = data.room;
    socket.join(data.room);

    socket.emit('login', { 'username': socket.username, 'users': Object.keys(roomlist[data.room].userlist) });
    socket.broadcast.to(data.room).emit('user joined', { 'username': socket.username, 'users': Object.keys(roomlist[data.room].userlist) });
}
Chat.newMessage = function (data, socket) {
    socket.broadcast.to(socket.room).emit('new message', {
        username: socket.username,
        message: data
    });
}
Chat.addUser = function (username, socket) {
    console.log(roomlist);
    if (username == '') return;
    socket.username = username;

    if (roomlist == undefined) {
        roomlist = new Array();
        socket.emit('roomlist', Object.keys(roomlist));
    } else {

        socket.emit('roomlist', { 'rooms': Object.keys(roomlist) });
    }
}
Chat.typing = function (socket) {
    socket.broadcast.to(socket.room).emit('typing', {
        'username': socket.username
    });
}
Chat.stopTyping = function (socket) {
    socket.broadcast.to(socket.room).emit('stop typing', {
        'username': socket.username
    });
}
Chat.disconnect = function (socket) {
    if (roomlist[socket.room] == undefined || roomlist[socket.room].userlist == undefined) {
        return;
    }

    if (roomlist[socket.room].userlist[socket.username]) {
        delete roomlist[socket.room].userlist[socket.username];
        console.log(socket.username);
    }

    socket.broadcast.to(socket.room).emit('user left', { 'username': socket.username, 'users': Object.keys(roomlist[socket.room].userlist) });
    console.log("SOCKETIO disconnect EVENT: ", socket.id, " client disconnected");
}

// model & export
module.exports = Chat;