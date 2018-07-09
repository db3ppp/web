var findDocuments = function(db,callback){ //하나만 Find하기
  var collection = db.collection('account');
  collection.findOne({'a':1}, function(err,doc){//모든내용 찾을때는 function을 toArray로 바꿔주기
    assert.equal(err,null);
    console.log("Found the following document");
    console.log(doc);
    callback(doc);
  });
}
var findDocumentsQuery = function(db,callback){ //특정 Query와 일치하는 모든 Document들 Find하기
  var collection = db.collection('account');
  collection.find({'a':3}).toArray(function(err,doc){
    assert.equal(err,null);
    console.log("Found the following document");
    console.log(doc);
    callback(doc);

  });
}

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

MongoClient.connect(url,function(err,db){
  assert.equal(null,err);
  console.log("connected successfully to server");

  findDocumentsQuery(db,function(){
  //findDocuments(db,function(){
    db.close();
  });

});
