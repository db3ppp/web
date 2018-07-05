
var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title,list,body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>

    ${list}
    ${body}

</body>
</html>
`;
}
/*
위에서의 body부분 을 의미함. 이 부분을 파라미터로 넘겨주자
<h2>${title}</h2>
<p>${description}</p>
*/

function templateList(filelist){
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){ //파일리스트 가져온 목록들 추가해주기 + 링크걸기
    list = list + `<li><a href="/?id=${filelist[i]}"> ${filelist[i]}</a></li>`;
    i++;
  }
  list = list + '</ul>';

  return list;
}

var app = http.createServer(function(request,response){
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

        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2> <p>${description}</p>`);

      response.writeHead(200);
      response.end(template); //홈페이지에 출력하고자 하는 내용
      })

  }else{ //다른페이지일때
    fs.readdir('./data', function(err,filelist){

    fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
        var title = queryData.id;
        var list = templateList(filelist);
        var template = templateHTML(title, list, `<h2>${title}</h2> <p>${description}</p>`);

        response.writeHead(200);
        response.end(template);
    });
  });
}

  }else{ //잘못된 경로를 입력했을 때 error 처리
    response.writeHead(404);
    response.end('Not found');
  }

});

app.listen(3000);
