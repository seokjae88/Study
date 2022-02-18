var express = require('express');
var router = express.Router();

router.use('/join', require('./join'));
router.use('/login', require('./login'));
router.use('/home', require('./home'));

module.exports = router;