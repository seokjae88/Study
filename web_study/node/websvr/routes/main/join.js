var express = require('express');
var router = express.Router();
var Login = require('../../models/main/login');
var jwt = require('../../models/main/jwt');

router.get('/', function(req, res){
    res.render('main/login/join');
});
router.get('/home', jwt.verifyToken, function(req, res){
    res.render('main/home/welcome');
});
router.post('/', function(req, res){
    Login.join(req, res);
});
module.exports = router;