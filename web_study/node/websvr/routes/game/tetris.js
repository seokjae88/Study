var express = require('express');
var router = express.Router();
var jwt = require('../../models/main/jwt');

router.get('/', jwt.verifyToken, function(req, res){
  res.render('game/tetris');
  //res.sendFile(path.join(__dirname, "../../public", "index.html"));
});

router.get('/play', jwt.verifyToken, function(req, res){
  res.render('game/tetris/play');
});

module.exports = router;