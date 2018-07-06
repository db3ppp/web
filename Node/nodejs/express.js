var express = require('express');
var app = express();
var template= require('./lib/template.js');
var bodyParser = require('body-parser');

var pageRouter = require('./route/page');
var indexRouter = require('./route/index');

app.use(bodyParser.urlencoded({extended :false})); //middelware사용
app.use(express.static('./')); //static파일 사용하기


// /page로 시작하는 페이지를 pageRouter 라는 이름의 middleware로 사용
app.use('/page', pageRouter);
app.use('/',indexRouter);


app.use(function(req,res,next){
  res.status(404).send('Sorry cannot find that!');
});
app.use(function(err,req,res,next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});
