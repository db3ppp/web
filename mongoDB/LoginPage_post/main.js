var express = require("express");
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');
var url = 'mongodb://localhost:27017/test';

//register 기능: 계정추가
//{id,password}정보 같이 추가하기 때문에 var query = req.body 형태로 넘겨준다.
var insertDocuments = function(db, query, callback){
  var collection = db.collection('account');

  collection.insertOne(query, function(err,result){
    assert.equal(err,null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted one account to 'account' collection");
    callback(result);
  });
}
//login기능: id정보가 계정에 있는지 없는지 find
var findDocumentsQuery = function(db, id, pw, callback){
  var collection = db.collection('account');

  collection.findOne(id, function(err, account){
    if(err)throw err;

    if(account == null)
      callback('Such account does not exist!!');
    else if(pw == account.password)
      callback('Login Success!!');
    else
      callback('Wrong Password!');
  });
}
//register기능: 기존에 정보가 있는지 check
var checkDocumentsQuery = function(db,id,callback){
  var collection = db.collection('account');

  collection.findOne(id,function(err,account){
    if(err) throw err;
    if(account == null) callback(false); //기존에 계정정보 없으면
    else callback(true);
  });
}

//html 불러들여오기
app.get('/', function(req,res){
  //console.log(__dirname); Users/kimhyewon/Desktop/Web/i-survey/LoginPage_post
  res.sendFile(path.join(__dirname + '/login.html')); //path()를 이용해서 절대경로 써주어야한다.
});
app.get('/registerpage',function(req,res){
  res.sendFile(path.join(__dirname + '/register.html'));
});

//decoding_post형식
app.use(express.json());
app.use(express.urlencoded());

app.post('/login', function(req,res){
  var username = req.body.username;
  var password = req.body.password;

  var idQuery = {};
  idQuery['username'] = username;

  MongoClient.connect(url, function(err,db){
    assert.equal(err, null);
    console.log("Successfully connected to DB");

    findDocumentsQuery(db,idQuery,password,function(result){
      var html = fs.readFile('./result.html',function(err,html){
        html = " " + html;
        html = html.replace("<%RESULT%>",result);

        res.send(html);
      });
          db.close();
    });
  });
});

app.post('/register', function(req,res){
  var query = req.body;
  var idQuery = {};
  idQuery['username'] = query.username;

  MongoClient.connect(url, function(err,db){
    assert.equal(err,null);
    console.log("Successfully connected to DB");

    checkDocumentsQuery(db,idQuery,function(result){
      if(result == false){
        insertDocuments(db,query,function(){
          var html = fs.readFile('./result.html',function(err,html){
            html = " " + html;
            html = html.replace("<%RESULT%>", "Register Complete!");

            res.send(html);
          });
          db.close();
        });

      }else{
        var html = fs.readFile('./result.html',function(err,html){
          html = " " + html;
          html = html.replace("<%RESULT%>", "Account already exists!!");

          res.send(html);
        });
            db.close();
      }

    });
  });
});

app.listen(3000, function(){
  console.log("server started at http://localhost:3000");
})
