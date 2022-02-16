var express = require('express');
var router = express.Router();

router.use('/home', require('./home'));
router.use('/posts', require('./posts'));

module.exports = router;