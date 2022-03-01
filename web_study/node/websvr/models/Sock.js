var Chat = require('./Chat');
var Tetris = require('./Tetris');

exports = module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log("SOCKETIO connection EVENT: ", socket.id, " client connected");
        // 여기서부터 socket에 대한 이벤트를 작성하면 된다.
        var addedUser = false;

        socket.on('debug', (data) => {
            console.log(data);
        });

        socket.on('join', (data) => {
            Chat.join(data, socket);
        });

        socket.on('new message', (data) => {
            Chat.newMessage(data.socket);
        });

        socket.on('add user', (username) => {
            Chat.addUser(username, socket);
        });

        socket.on('typing', () => {
            Chat.typing(socket);
        });

        socket.on('stop typing', () => {
            Chat.stopTyping(socket);
        });

        socket.on('disconnect', () => {
            Chat.disconnect(socket);
            Tetris.disconnect(socket);
        });

        socket.on('moving', (data) => {
            Tetris.moving(data, socket);
        });
        socket.on('seize', () => {
            Tetris.seize(socket);
        });
        socket.on('gameover', () => {
            Tetris.gameover(socket);
        });
    })
};