//Route로 파일로 분리해서 관리하기

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var template = require('../lib/template.js');


router.get('/create',function(req,res){
  fs.readdir('./data', function(err,filelist){

    var title = 'WEB -create';

    var list = template.list(filelist);
    var html = template.html(title, list, `
      <form action="/page/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `,``);

  res.send(html);
  });
});


router.post('/create_process',function(req,res){
  var post = req.body;
  var title = post.title;
  var description = post.description;

    fs.writeFile(`data/${title}`,description, 'utf8',function(err){ //파일생성
      res.redirect(`/page/${title}`);
    });
  });


router.get('/update/:pageId',function(req,res){
  fs.readdir('./data', function(err,filelist){
    var filteredId = path.parse(req.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    var title = req.params.pageId;
    var list = template.list(filelist);
    var html = template.html(title, list,
       `
       <form action="/page/update_process" method="post">
             <p><input type="hidden", name="id" value="${title}"><p>
             <p><input type="text" name="title" placeholder="title" value="${title}"></p>
             <p>
               <textarea name="description" placeholder="description">${description}</textarea>
             </p>
             <p>
               <input type="submit">
             </p>
           </form>
       `,
         `<a href="/page/create">create</a> <a href="/page/update/${title}">update</a>`);

    res.send(html);
  });
});

})

router.post('/update_process',function(req,res){
    var post = req.body;
    var id = post.id;
    var title = post.title;
    var description = post.description;

    fs.rename(`data/${id}`, `data/${title}`,function(err){
      fs.writeFile(`data/${title}`,description, 'utf8',function(err){
        res.redirect(`/page/${title}`);
      })
    });
  });

router.post('/delete_process',function(req,res){
    var post = req.body;
    var id = post.id;
    fs.unlink(`data/${id}`,function(err){
      res.redirect('/');
    })
  });


router.get('/:pageId',function(req,res){
  fs.readdir('./data', function(err,filelist){
    var filteredId = path.parse(req.params.pageId).base;

  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    var title = req.params.pageId;
    var list = template.list(filelist);
    var html = template.html(title, list,
       `<h2>${title}</h2> <p>${description}</p>`,
         `<a href="/page/create">create</a> <a href="/page/update/${title}">update</a>
         <form action="/page/delete_process" method="post">
         <input type="hidden" name="id" value="${title}">
         <input type="submit" value="delete">
         </form>`
      );
    res.send(html);
    });
  });
});

  module.exports = router;
