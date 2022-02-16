var express = require('express');
var router = express.Router();
var jwt = require('../../models/main/jwt');

router.get('/', jwt.verifyToken, function(req, res){
    res.render('chat/sock/index');
});

module.exports = router;