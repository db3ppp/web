var insertDocument = function(db,callback){
	var collection = db.collection('account');
	collection.insertOne({a:1}, function(err,result){
		assert.equal(err,null);
		assert.equal(1,result.result.n);
		assert.equal(1,result.ops.length);
		console.log("Inserted 1 document into the collection");
		callback(result);
	});
}

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function(err, db){
	assert.equal(null, err);
	console.log("connected successfully to server");

	insertDocument(db, function(){
				db.close();
	});


});
