const jsonFile = './data/board.json';
var dataList = require('../../data/board.json');
var fs = require('fs');

var Post = {};
Post.deleteOne = function(id, callback) {
    var idx = dataList.findIndex(function(item, idx){
        return item._id == id 
    })
    delete dataList[idx];
    fs.writeFile (jsonFile, JSON.stringify(dataList), function(err) {
        if (err) throw err;
        callback();   
    });
}
Post.findOneAndUpdate = function(id, data, callback) {
    var idx = dataList.findIndex(function(item, idx){
        return item._id == id 
    })
    dataList[idx].title = data.title;
    dataList[idx].body = data.body;
    dataList[idx].updatedAt = Date.now();
    fs.writeFile (jsonFile, JSON.stringify(dataList), function(err) {
        if (err) throw err;
        callback();
    });    
}
Post.find = function(callback) {
    callback(dataList.sort(function(a, b){
        return a.createdAt - b.createdAt;
    }));
}
Post.findOne = function(id, callback) {
    callback(dataList.filter(function(item){
        return item._id == id;
    }));
}
Post.create = function(body, callback) {
    body.createdAt = Date.now();
    body._id = body.createdAt;
    dataList.push(body);
    fs.writeFile (jsonFile, JSON.stringify(dataList), function(err) {
        if (err) throw err;
        callback();   
    });
}

// model & export
module.exports = Post;