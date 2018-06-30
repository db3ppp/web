var deleteDocuments = function(db, callback){
	var collection = db.collection('account');
				collection.deleteOne({a:1}, function(err, result){
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Removed the document with the field equal to 1");
                callback(result);
        });
}

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("connected successfully to server");

	deleteDocuments(db, function(){
		db.close();
		});
});
