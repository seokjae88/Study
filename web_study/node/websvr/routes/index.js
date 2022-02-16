var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.redirect('main/login');
});

router.use('/main', require('./main'));
router.use('/board', require('./board'));
router.use('/game', require('./game'));
router.use('/chat', require('./chat'));
router.use('/api/movies', require('./movies'));

module.exports = router;