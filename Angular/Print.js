var app = angular.module('app', []);

app3.controller('gListCtrl', function($scope) {
	$scope.groceries = [
		{item: "Tomatoes", purchased: 3000},
		{item: "Potatoes", purchased: 2000},
		{item: "Bread", purchased: 2500},
		{item: "Hummus", purchased: 50000}
	];
});
