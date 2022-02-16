var express = require('express');
var router = express.Router();
var jwt = require('../../models/main/jwt');
var Post = require('../../models/board/Post');

// Index
router.get('/', jwt.verifyToken, function(req, res){
  Post.find(function(posts){
    res.render('board/posts/index', {posts:posts});
  });
});

// New
router.get('/new', jwt.verifyToken, function(req, res){
  res.render('board/posts/new');
});

// create
router.post('/', function(req, res){
  Post.create(req.body, function(){
    res.redirect('posts');
  });
});

// show
router.get('/:id', jwt.verifyToken, function(req, res){
  Post.findOne(req.params.id, function(post){
    res.render('board/posts/show', {post:post[0]});
  });
});

// edit
router.get('/:id/edit', jwt.verifyToken, function(req, res){
  Post.findOne(req.params.id, function(post){
    res.render('board/posts/edit', {post:post[0]});
  });
});

// update
router.put('/:id', function(req, res){
  Post.findOneAndUpdate(req.params.id, req.body, function(){
    res.redirect(req.params.id);
  });
});

// destroy
router.delete('/:id', function(req, res){
  Post.deleteOne(req.params.id, function(){
    res.redirect();
  });
});

module.exports = router;