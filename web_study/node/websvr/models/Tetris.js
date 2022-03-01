
var Tetris = {};
Tetris.moving = function (data, socket) {
    //socket.broadcast.to(data.room).emit('render', data);
    socket.emit("moving", data);
}
Tetris.seize = function (socket) {
    //socket.broadcast.to(data.room).emit('render', data);
    socket.emit("seize");
}
Tetris.gameover = function (socket) {
    //socket.broadcast.to(data.room).emit('render', data);
    socket.emit("gameover");
}
Tetris.disconnect = function (socket) {
    console.log("SOCKETIO disconnect EVENT: ", socket.id, " client disconnected");
}

// model & export
module.exports = Tetris;