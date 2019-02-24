//For nodejs
var express = require("express");
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');
var url = 'mongodb://localhost:27017/test';

//For selenium
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var driver = new webdriver.Builder().forBrowser('chrome').build();
var hisnet = "https://hisnet.handong.edu/login/login.php";
driver.get(hisnet);

var By = webdriver.By;
var until = webdriver.until;
var timeout = 30000;
var isAlreadyLogIn = false;

driver.findElement(By.name('id')).sendKeys('hisnet_id');
driver.findElement(By.name('password')).sendKeys('hisnet_pw');
driver.findElement(By.xpath('//input[@ src ="/2012_images/intro/btn_login.gif"]')).click();
isAlreadyLogIn = true;

//학사정보 들어가기
driver.wait(until.elementLocated(By.xpath('//*[@id="div_TopmenuBg"]/table/tbody/tr[2]/td[2]/div/a[2]')),timeout).click();

name = driver.wait(until.elementLocated(By.xpath("/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[3]/table/tbody/tr[3]/td/form/table/tbody/tr[1]/td[2]")),timeout).getText();
name.then((text) => { console.log(text); });
studentNum = driver.wait(until.elementLocated(By.xpath("/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[3]/table/tbody/tr[3]/td/form/table/tbody/tr[2]/td[2]")),timeout).getText();
studentNum.then((text) => { console.log(text); });
major = driver.wait(until.elementLocated(By.xpath("/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[3]/table/tbody/tr[3]/td/form/table/tbody/tr[6]/td[2]")),timeout).getText();
major.then((text) => { console.log(text); });


/*var isAlreadyLogIn = false;
 function LogIn (id, password){
  if (isAlreadyLogIn){
    driver.findElement(By.xpath("//*[@id='Email']")).sendKeys(userId);
    driver.findElement(By.xpath("//*[@id='Password']")).sendKeys(password);
    driver.findElement(By.xpath("//input[@value='Login']")).click();
      isAlreadyLogIn = true;
      }
    }
     it('Should login', function(done) { LogIn("username", "password");
  });*/

////nodejs////
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
  var findDocumentsQuery = function(db, id, callback){
    var collection = db.collection('account');

    collection.findOne(id, function(err, account){
      if(err)throw err;

      if(account == null)
        callback('Such account does not exist!!');
      else if(id == account.id)
        callback('Login Success!!');
    });
  }

  /*var findDocumentsQuery = function(db, id, callback){
    var collection = db.collection('account');

    collection.findOne(id, function(err, account){
      if(err)throw err;

      if(account == null)
        callback('Such account does not exist!');
      else if(isAlreadyLogIn == true)
        callback('Login Success!');
      else
        callback('Wrong Password!!');

    });
  }*/
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
  app.get('/loginpage', function(req,res){
    //console.log(__dirname); Users/kimhyewon/Desktop/Web/i-survey/LoginPage_post
    res.sendFile(path.join(__dirname + '/login.html')); //path()를 이용해서 절대경로 써주어야한다.
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
      console.log("Successfully connected to DB")

      checkDocumentsQuery(db,idQuery,function(result){
        if(result == false && isAlreadyLogIn == true){
          insertDocuments(db,idQuery,function(){
            var html = fs.readFile('./result.html',function(err,html){
              html = " " + html;
              html = html.replace("<%RESULT%>", "Register Complete!");

              res.send(html);
            });
            db.close();
          });

        }else if(result == true && isAlreadyLogIn ==true){
          var html = fs.readFile('./result.html',function(err,html){
            html = " " + html;
            html = html.replace("<%RESULT%>", "Login Success! (Account already exists!!)");

            res.send(html);
          });
              db.close();
        }else{
          var html = fs.readFile('./result.html',function(err,html){
            html = " " + html;
            html = html.replace("<%RESULT%>", "Login Failed!");

            res.send(html);
          });
              db.close();
        }
      });

      findDocumentsQuery(db,idQuery,function(result){
        var html = fs.readFile('./result.html',function(err,html){
          html = " " + html;
          html = html.replace("<%RESULT%>",result);

          res.send(html);
        });
            //db.close();
      });

    });

  });

//login해서 isAlreadyLogIn===true이면 insertDocuments isAlreadyLogIn===true이면서 이미있으면 already exists

  app.listen(3000, function(){
    console.log("server started at http://localhost:3000");
  })
