var updateDocuments = function(db, callback){
	var collection = db.collection('account');
        collection.updateOne({a:2}, {$set: {b:1}}
				, function(err, result){
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Updated the document with the field 'a' equal to 2");
                callback(result);
        });
}

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("connected successfully to server");

	updateDocuments(db, function(){
		db.close();
		});
});
