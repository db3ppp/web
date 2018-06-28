module.exports = {
  html: function (title,list,body,control){
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
      ${control}
      ${body}

  </body>
  </html>
  `;
  /*
  위에서의 body부분을 의미함. 이 부분을 파라미터로 넘겨주자
  <h2>${title}</h2>
  <p>${description}</p>
  */
},list: function(filelist){
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){ //파일리스트 가져온 목록들 추가해주기 + 링크걸기
    list = list + `<li><a href="/?id=${filelist[i]}"> ${filelist[i]}</a></li>`;
    i++;
  }
  list = list + '</ul>';

  return list;
    }
}
