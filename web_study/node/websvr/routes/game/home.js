var express = require('express');
var router = express.Router();
var jwt = require('../../models/main/jwt');

router.get('/', jwt.verifyToken, function(req, res){
  res.render('game/home/welcome');
});
router.get('/about', jwt.verifyToken, function(req, res){
  res.render('game/home/about');
});

module.exports = router;