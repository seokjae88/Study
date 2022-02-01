
var Client = require('ssh2').Client;
var $q = require('q');

exports.getFilelist = getFilelist;
exports.getLogData = getLogData;

function getFilelist(remoteDir) {

    var deferred = $q.defer();
    var conn = new Client();

    conn.on('ready', function() {
        console.log('Connect SSH - ready');

        conn.sftp(function(err, sftp) {
            if (err) {
                console.log('sftp err:', err);
                deferred.reject(err);
                return;
            }

            sftp.readdir(remoteDir, function(err, list) {
                if (err) {
                    console.log('readdir err:', err);
                    deferred.reject(err);
                    return;
                }
                //console.dir(list);
                var filelist = [];

                for (var i=0; i<list.length; i++) {
                    filelist.push(list[i].filename);
                }
                deferred.resolve(filelist);
                conn.end();
            });
        });

    }).connect({
        host: 'rtb-ase-dev-03.cns.widerlab.io',
        port: 22,
        username: 'seokjae',
        privateKey: require('fs').readFileSync('/Users/jsj/.ssh/id_rsa', 'utf-8')
    });

    return deferred.promise;
};

function getLogData(remoteDir, fileName, type, data) {

    var deferred = $q.defer();
    var conn = new Client();

    var command;

    switch (type) {
        case 0:
            command = 'tail -n 100 -f ' + remoteDir + fileName; break;
        case 1:
            command = 'grep "' + data.campaignid + '" ' + remoteDir + fileName; break;
        case 2:
            command = 'grep "' + data.keyword + '" ' + remoteDir + fileName; break;
        case 3:
            command = 'grep "' + data.campaignid + '" ' + remoteDir + fileName + ' | grep "' + data.keyword + '"'; break;
    }

    conn.on('ready', function() {
        console.log('Connect SSH - ready');

        conn.exec(command, function(err, stream) {
            if (err) {
                console.log('sftp err:', err);
                deferred.reject(err);
                return;
            }

            stream.on('close', function(code, signal) {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
            }).on('data', function(data) {
                console.log('STDOUT: ' + data);
                deferred.resolve(data);
            }).stderr.on('data', function(data) {
                console.log('STDERR: ' + data);
                deferred.reject(err);
            });
        });

    }).connect({
        host: 'rtb-ase-dev-03.cns.widerlab.io',
        port: 22,
        username: 'seokjae',
        privateKey: require('fs').readFileSync('/Users/jsj/.ssh/id_rsa', 'utf-8')
    });

    return deferred.promise;
};

