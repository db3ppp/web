var batchModule = angular.module('batchModule',[]);

batchModule.factory('batchLog', ['$interval','$log',function($interval,$log){
  var messageQueue = [];

  //batchModule모듈 안에 batchLog서비스 안에 log라는 함수
  function log(){
    if(messageQueue.length){
      $log.log('batchLog messages: ',messageQueue);
      messageQueue=[];
    }
  }
  
  $interval(log, 5000);

  return function(message){
    messageQueue.push(message);
  }

}]);
