var app = angular.module('app', []);

app2.controller('userCtrl', function($scope) {
	$scope.user = [{
		fName: "Derek",
		lName: "Banas",
		subscribe: "Subscribe",
		street: "123 Main St",
		delivery: "Email",
		mail: "123@gmail.com"
	}];

	$scope.saveUser = function(userInfo){
		if($scope.userForm.$valid){
			$scope.user.push({
				fName: userInfo.fName,
				lName: userInfo.lName,
				street: userInfo.street,
				subscribe: userInfo.subscribe,
				delivery: userInfo.delivery,
				mail: userInfo.mail
			});
			console.log('User Saved');
		} else {
			console.log("Error: Couldn't Save User");
		}
	};

	$scope.IsEmail = function(value){
	  if(value === "Email")
	  return true;

	  else return false;
	}

});
