var express = require("express");
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');
var url = 'mongodb://localhost:27017/test'; //'test'DB

/* MongoDB function expression */

//query: json형식의 document(로그인정보) 하나씩 받음
var insertDocuments = function(db,query,callback){
  var collection = db.collection('account');

  collection.insertOne(query, function(err,result){
    assert.equal(err,null);
    assert.equal(1,result.result.n);
    assert.equal(1,result.ops,length);
    console.log("Inserted one account into 'account' collection");
    callback(result);
  });

}

// login확인을 위한 find function
var findDocumentsQuery = function(db, id, pw, callback){
  var collection = db.collection('account');

  collection.findOne(id, function(err, account){
    if(err) throw err;

    if(account == null){
      callback('Such account does not exist!');
    }else if(pw == account.password){
      callback('Login Success!');
    }else callback('Wrong Password!');
  });

}

// register를 위한  check function
var checkDocumentsQuery = function(db, id, callback){
  var collection = db.collection('accounts');

  collection.findOne(id,function(err,account){
    if(err) throw err;
    if(account == null) callback(false);
    else callback(true);
  });

}

/* import Html */
app.get('/loginpage', function(req,res){
  res.sendFile(path.join(__dirname + '/login.html'));
});
app.get('/registerpage', function(req,res){
  res.sendFile(path.join(__dirname + '/register.html'));
});

/* Route Handler_get방식 */
app.get('/login', function(req,res){
  var username = req.query.username;
  var password = req.query.password;

  var idQuery = {}; //json형식
  //console.log("username="+username);
  //console.log("password="+password);
  idQuery['username'] = username;

  MongoClient.connect(url, function(err,db){
    assert.equal(err,null);
    console.log("Successfully connected to userInfo DB");

    findDocumentsQuery(db, idQuery, password, function(result){
      var html = fs.readFile('./result.html',function(err,html){ //html파일 불러오는 형식은 fs모듈사용
        html = " " + html;
        html = html.replace("<%RESULT%>", result);

        //res.set('Content-Type', 'text/html');
        res.send(html);
      });
      db.close();
    });
  });
});

app.get('/register', function(req,res){
  var query = req.query;
  var idQuery = {};
  idQuery['username'] = query.username;

  MongoClient.connect(url, function(err,db){
    assert.equal(err,null);
    console.log("Successfully connected to userInfo DB");

    checkDocumentsQuery(db, idQuery, function(result){
      if(result == false){
        insertDocuments(db, query, function(){
          var html = fs.readFile('./result.html',function(err, html){
            html = " " + html;
            html = html.replace("<%RESULT%>", "Register Complete!");

            res.set('Content-Type', 'text/html');
            res.send(html);
          });
          db.close();
        });

      }else{
        var html = fs.readFile('./result.html',function(err,html){
          html = " " + html;
          html = html.replace("<%RESULT%>", "Account already exists!");

          res.set('Content-Type', 'text/html');
          res.send(html);
        });
        db.close();
      }

    });
  });

});

app.listen(3000,()=>{
  console.log("server started at http://localhost:3000");
});
