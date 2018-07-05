var indexDocuments = function(db, callback){
	var collection = db.collection('account').createIndex({"a":2}
	,function(err,result){
		console.log(result);
		callback();
	});
}

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("connected successfully to server");

	indexDocuments(db, function(){
		db.close();
		});
});
