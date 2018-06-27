var fs = require('fs');
fs.readFile('sample.txt',function(err,data){//파일 읽어들여오는 방법
  console.log(data);
});
