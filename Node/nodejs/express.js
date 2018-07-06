var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var template= require('./lib/template.js');
var bodyParser = require('body-parser');
var router = express.Router();
var pageRouter = require('./route/page');

app.use(bodyParser.urlencoded({extended :false})); //middelware사용
app.use(express.static('./')); //static파일 사용하기

// /page로 시작하는 페이지를 pageRouter 라는 이름의 middleware로 사용
app.use('/page', pageRouter);

//routing
app.get('/', function(req,res){
fs.readdir('./data', function(err,filelist){

  var title = 'Welcome';
  var description = "Hello,Node.js";

  var list = template.list(filelist);
  var html = template.html(title, list,
    `
    <h2>${title}</h2>${description}
    <img src="/images/hello.jpg" style="width:300px; display:block; margin-top:10px;">
    `,
    `<a href="/page/create">create</a>`
  );
res.send(html);
  });
});


app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});
