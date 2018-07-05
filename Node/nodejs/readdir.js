var testFolder = './data/';
var fs = require('fs');

fs.readdir(testFolder,function(err,filelist){//testFolder에있는 파일목록확인하기
console.log(filelist);//nodejs는 특정 파일의 목록을 어레이로 나타낸다.
})
