'use strict';

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ssh = require('./routes/ssh');

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/static/index.html');
});

var remoteDir = '/var/log/diff/';

io.on('connection', function (socket) {
    console.log('Connect Client:'+socket.id);
    ssh.getFilelist(remoteDir).then(function ( filelist ) {
        console.dir(filelist);
        socket.emit('filelist', { files: Object.values(filelist)});
    });

    socket.on('inquiry', function (data) {
        console.log(data);
        if ( data.filename == '' || data.filename == 'ALL')
        {
            socket.emit('terminal', 'No File Name');
        } else if ( data.campaignid == '' && data.keyword == '') {
            ssh.getLogData(remoteDir,data.filename,0,data).then(function (logdata) {
                socket.emit('terminal', logdata.toString());
            });
        } else if ( data.keyword == '') {
            ssh.getLogData(remoteDir,data.filename,1,data).then(function (logdata) {
                socket.emit('terminal', logdata.toString());
            });
        } else if ( data.campaignid == '') {
            ssh.getLogData(remoteDir,data.filename,2,data).then(function (logdata) {
                socket.emit('terminal', logdata.toString());
            });
        } else {
            ssh.getLogData(remoteDir,data.filename,3,data).then(function (logdata) {
                socket.emit('terminal', logdata.toString());
            });
        }
    });
});

server.listen(7000, function() {
  console.log('server on!!');
});