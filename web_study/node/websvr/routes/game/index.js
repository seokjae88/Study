var express = require('express');
var router = express.Router();

router.use('/home', require('./home'));
router.use('/tetris', require('./tetris'));

module.exports = router;