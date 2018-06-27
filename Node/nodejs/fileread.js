//파일 읽어들여오는 방법

var fs = require('fs');
fs.readFile('sample.txt',function(err,data){  /* where data is the contents of the file. */
  console.log(data);
});
