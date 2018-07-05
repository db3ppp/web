var app = angular.modle('app',[]);
app.controller('eventCtrl',function($scope){
  //$scope.disableButton = true;
  //$scope.dayTimeButton = true;

  $scope.capitals = [
    {"City": "Montgomery", "State": "Alabama"},
    {"City" : "Juneau", "State" : "Alaska"},
    {"City" : "Phoenix", "State" : "Arizona"},
    {"City" : "Little Rock", "State" : "Arkansas"}
  ]
});
