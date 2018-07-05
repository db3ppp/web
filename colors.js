<!-- 함수 사용해보기 -->
/*function LinkSetColor(color){
  var alist = document.querySelectorAll('a');
  var i = 0;
  while(i<alist.length){
    alist[i].style.color = color;
    i++;
  }
}*/

<!-- 객체 사용해보기 -->
//링크색깔 바꾸어주는 객체
var Links = {
  setColor: function(color){
    var alist = document.querySelectorAll('a');
    var i = 0;
    while(i<alist.length){
      alist[i].style.color = color;
      i++;
    }
  }

}
//배경색,글자색 바꾸어주는 객체
var Body = {
  setColor: function(color){
    document.querySelector('body').style.color = color;
  },
  setBackgroundColor:function(color){
    document.querySelector('body').style.background = color;
  }
}

/*제어할 태그 선택하기 'querySelector'*/
function nightDayHandler(self){
  var target = document.querySelector('body');
  if(self.value==='night'){
  Body.setBackgroundColor('black');
  Body.setColor('white');
  self.value = 'day';

  Links.setColor('powderblue');
}

  else{
    Body.setBackgroundColor('white');
    Body.setColor('black');
    self.value = 'night';
    Links.setColor('blue');
  }

}
