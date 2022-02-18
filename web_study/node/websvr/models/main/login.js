var jwt = require('../main/jwt.js');
var cookie = require('cookie-parser');

var dataList = require('../../data/login.json');
const loginFile = './data/login.json';
var fs = require('fs');

var Login = {};
Login.createID = function (id, pw, callback) {
    var data = {
        'id' : id,
        'pw' : pw,
        'createAt' : Date.now()
    }
    dataList.push(data);
    fs.writeFile (loginFile, JSON.stringify(dataList), function(err) {
        if (err) throw err;
        callback();
    });
}

Login.checkID = function (id, pw, callback) {
    var data = (dataList.filter(function (item) {
        return item.id == id;
    }));

    if (data[0]) {
        if (data[0].pw == pw) {
            callback(200, "로그인 성공");
        } else {
            callback(401, "비밀번호가 틀립니다.");
        }
    } else {
        callback(404, "아이디가 없습니다.");
    }
}

Login.login = function (req, res) {
    try {
        const { id, pw } = req.body;

        Login.checkID(id, pw, function (code, msg) {
            if (code == 200) {
                // 토큰 발행
                jwt.getToken(id).then(token => {
                    res.cookie('id', id);
                    res.cookie('token', token);
                    res.cookie('hasVisited', '1', {
                        maxAge: 60 * 60 * 1000,
                        httpOnly: true,
                        path: '/visitors'
                    });

                    res.status(200).json({
                        resultCode: code,
                        id: id,
                        token: token,
                    });
                });
            } else {
                res.status(200).json({
                    resultCode: code,
                    message: msg,
                });
            }
        });
    } catch (err) {
        // 서버 에러
        res.status(500).json({
            resultCode: 500,
            message: "서버 에러",
        });
    }
}
Login.join = function (req, res) {
    try {
        const { id, pw, name } = req.body;
        
        if (name == '정석재') {
            Login.checkID(id, pw, function (code, msg) {
                if (code == 404) {
                    Login.createID(id, pw, function(err) {
                        if (err) {
                            res.status(200).json({
                                resultCode: 403,
                                message: "가입 실패",
                            });
                        } else {
                            res.status(200).json({
                                resultCode: 200,
                                message: "가입 성공",
                            });
                        }                
                    });
                } else {
                    res.status(200).json({
                        resultCode: 404,
                        message: "사용중인 아이디 입니다.",
                    });
                }                
            });            
        } else {
            res.status(200).json({
                resultCode: 401, // 권한 없음
                message: "가입 실패(권한 없음)",
            });
        }
    } catch (err) {
        // 서버 에러
        res.status(500).json({
            resultCode: 500,
            message: "서버 에러",
        });
    }
}

// model & export
module.exports = Login;