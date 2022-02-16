var express = require('express');
var router = express.Router();

router.use('/home', require('./home'));
router.use('/sock', require('./sock'));

module.exports = router;