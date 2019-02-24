var app = angular.module('planetApp', ['ngRoute', 'ngAnimate']);
app.config(function($routeProvider) {
  $routeProvider
    .when('/mercury', {
      templateUrl: "atmosphere.html",
      controller: "mercuryCtrl"
    })
    .when('/venus', {
      templateUrl: "atmosphere.html",
      controller: "venusCtrl"
    })
    .when('/earth', {
      templateUrl: "atmosphere.html",
      controller: "earthCtrl"
    })
    .when('/mars', {
      templateUrl: "atmosphere.html",
      controller: "marsCtrl"
    })
});

app.controller("mercuryCtrl", function($scope, $route) {
  $scope.planet = {
    name: 'Mercury',
    carbondioxide: 'Trace Amount',
    nitrogen: 'Trace Amount',
    oxygen: '42%',
    hydrogen: '22%'
  }
});

app.controller("venusCtrl", function($scope, $route) {
  $scope.planet = {
    name: 'Venus',
    carbondioxide: '96.5%',
    nitrogen: '3.5%',
    oxygen: 'Almost None',
    hydrogen: 'Almost None'
  }
});

app.controller("earthCtrl", function($scope, $route) {
  $scope.planet = {
    name: 'Earth',
    carbondioxide: '0.038%',
    nitrogen: '78.1%',
    oxygen: '21%',
    hydrogen: 'Almost None'
  }
});

app.controller("marsCtrl", function($scope, $route) {
  $scope.planet = {
    name: 'Mars',
    carbondioxide: '95.7%',
    nitrogen: '2.7%',
    oxygen: '0.2%',
    hydrogen: 'Almost None'
  }
});
