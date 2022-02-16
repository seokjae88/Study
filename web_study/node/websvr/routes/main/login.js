var express = require('express');
var router = express.Router();
var jwt = require('../../models/main/jwt');
var Login = require('../../models/main/login');

router.get('/', function(req, res){
    res.render('main/login');
});

router.get('/home', jwt.verifyToken, function(req, res){
    res.render('main/home/welcome');
});

router.post('/', function(req, res){
    Login.login(req, res);
});

module.exports = router;