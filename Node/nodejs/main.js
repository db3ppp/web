
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var template= require('./lib/template.js'); // 모듈사용

var app = http.createServer(function(request,response){ //request: 웹브라우저가 보낸 정보
                                                        //response: 응답할때 우리가 웹브라우저에 보낼 정보
  var _url = request.url;
  var queryData = url.parse(_url,true).query;
  var pathname = url.parse(_url,true).pathname;

  if(pathname ==='/'){
    if(queryData.id === undefined){ //기본페이지일때

      fs.readdir('./data', function(err,filelist){
        //console.log(filelist); //파일리스트 가져오기(배열형태)

        var title = 'Welcome';
        var description = "Hello,Node.js";

        /* 이 부분(정적) 을 templateList함수에서
        data디렉토리에 있는 파일 목록들 정보를 가져와서 링크걸어주는 동작을 하도록 하여
        동적으로 페이지 추가할 수 있게끔 함.
        var list = `
        <ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>`;
        */

        var list = template.list(filelist);
        var html = template.html(title, list,
           `<h2>${title}</h2> <p>${description}</p>`,
             `<a href="/create">create</a>`);

      response.writeHead(200);
      response.end(html); //홈페이지에 출력하고자 하는 내용
      })

    }else{ //다른페이지일때
      fs.readdir('./data', function(err,filelist){

      fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.html(title, list,
           `<h2>${title}</h2> <p>${description}</p>`,
             `<a href="/create">create</a> <a href="/update?id=${title}">update</a>
             <form action="delete_process" method="post">
             <input type="hidden" name="id" value="${title}">
             <input type="submit" value="delete">
             </form>`
          );
        response.writeHead(200);
        response.end(html);
    });
  });
}
}else if(pathname === '/create'){
  fs.readdir('./data', function(err,filelist){

    var title = 'WEB -create';

    var list = template.list(filelist);
    var html = template.html(title, list, `
      <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `,``);

  response.writeHead(200);
  response.end(html); //홈페이지에 출력하고자 하는 내용
});
}else if(pathname === '/create_process'){//create_process창에 띄울 내용

/*post로 전송된 데이터를 가져오는 방법 */
  var body = '';
  request.on('data',function(data){ //callback이 호출될때마다 data를 더해준다.
    body = body + data;
  });
  request.on('end',function(){ //더이상 들어올 정보가 없으면
    var post = qs.parse(body);  //post출력하면 객체형식으로 나타남.
    var title = post.title;
    var description = post.description;

    fs.writeFile(`data/${title}`,description, 'utf8',function(err){ //파일생성
      response.writeHead(302, {Location: `/?id=${title}`}); // Location: 리다이렉션시키고 싶은 주소
      response.end();
    })
  });
}else if(pathname === '/update'){
  fs.readdir('./data', function(err,filelist){

  fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
    var title = queryData.id;
    var list = template.list(filelist);
    var html = template.html(title, list,
       `
       <form action="/update_process" method="post">
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
         `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);

    response.writeHead(200);
    response.end(html);
  });
});
}else if(pathname ==='/update_process'){
  var body = '';
  request.on('data',function(data){
    body = body+data;
  });
  request.on('end',function(){
    var post = qs.parse(body);
    var id = post.id;
    var title = post.title;
    var description = post.description;

    fs.rename(`data/${id}`, `data/${title}`,function(err){
      fs.writeFile(`data/${title}`,description, 'utf8',function(err){
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      })
    });
    //console.log(post);

  });
}else if(pathname === '/delete_process'){//create_process창에 띄울 내용

  /*post로 전송된 데이터를 가져오는 방법 */
    var body = '';
    request.on('data',function(data){ //callback이 호출될때마다 data를 더해준다.
      body = body+data;
    });
    request.on('end',function(){ //더이상 들어올 정보가 없으면
      var post = qs.parse(body);  //post출력하면 객체형식으로 나타남.
      var id = post.id;
      fs.unlink(`data/${id}`,function(err){
        response.writeHead(302, {Location: `/`}); //삭제하면 home으로 리다이렉션
        response.end();
      })
    });

}else{ //잘못된 경로를 입력했을 때 error 처리
    response.writeHead(404);
    response.end('Not found');
  }

});
app.listen(3000);
