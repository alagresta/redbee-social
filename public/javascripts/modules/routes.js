



(function() {
	'use strict';
	angular.module('Twitter').config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/home/:username',
      {
        templateUrl: "home.html",
        controller: "TweetList as TWList"
      })
      .otherwise({
         controller: 'Error404Controller',
         templateUrl: 'noUser.html'
     });
     $locationProvider.html5Mode(true);
  });

})();
