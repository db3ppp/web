var express = require('express');
var router = express.Router();
var fs = require('fs');
var template = require('../lib/template.js');


router.get('/', function(req,res){
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

module.exports = router;
