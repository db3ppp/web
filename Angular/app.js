angular.module('routingApp', ['ngRoute'])
    // Setting configuration for application
    .config(function ($routeProvider) {
        $routeProvider.when('/hello', {
            controller: helloCtrl,
            templateUrl: 'hello.html'
        })
        .when('/about',{
                controller: aboutCtrl,
                templateUrl :'about.html'
              })
        .otherwise({
                redirectTo: '/hello'
                });


    })
    // Ignore code below. This is usually in seperate html files
    .run(function ($templateCache){
        $templateCache.put('hello.html', '<h1>{{message}}</h1>');
        $templateCache.put('about.html', '<h1>About</h1><p>{{description}}</p>');
    });
