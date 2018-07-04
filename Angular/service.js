var app = angular.module('myApp',[]);
 app.controller('AppCtrl',function AppCtrl($scope,nametrickService,nametrickFactory){
   $scope.name = "Guest";

   $scope.reverseNameService=function(){
     $scope.name = nametrickService.reverse($scope.name);
   };

   $scope.reverseNameFactory=function(){
     $scope.name = nametrickFactory.reverse($scope.name);
   };
 });

 app.service('nametrickService',function(){
   this.reverse = function(name){
     return name.split("").reverse().join("");
   };
 });

 app.factory('nametrickFactory',function(){
   return{
     reverse: function(name){
       return name.split("").reverse().join("");
     }
   }
 });


/* <Controller 와 Service>
컨트롤러는 함수적인 기능을 수행.
컨트롤러 $scpoe상의 모델을 조작하거나 UI와 밀접하게 여러기능 수행.

서비스는 하나의 객체를 리턴하는 형태가 주를 이룸.
서비스는 자체가 싱글톤이라는 특성을 사용해 컨트롤러간의 통신을 제어하거나,
리소스 접근권한을 가진 객체를 리턴해서 컨트롤러에서 이 객체로 CRUD를 수행하는 방식으로 사용됨. */

/*

서비스는..
컨트롤러 데이터 일부를 조작할 수 있 .컨트롤러에 주입하기 전에는 사용할 수 xx.

app.controller('AppCtrl',function($scope,서비스,팩토리{
$scope.함수이름 = function(){
$scope.name = 서비스이름.서비스에서만든함수($scope.name);
  };
});

*/
