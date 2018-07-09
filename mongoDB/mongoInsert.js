var insertDocuments = function(db, callback){
	var collection = db.collection('account');
        collection.insertMany([
					{a:1},
					{a:2},
					{a:3}
				]	, function(err, result){
                assert.equal(err, null);
                assert.equal(3, result.result.n);
                assert.equal(3, result.ops.length);
                console.log("Inserted 3 documents into the collection");
                callback(result);
        });
}

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test'; //test라는 database안의 account collection과 연결

MongoClient.connect(url, function(err, db){
        assert.equal(err,null);
        console.log("connected successfully to server");

	insertDocuments(db, function(){
		db.close();
	});
});
