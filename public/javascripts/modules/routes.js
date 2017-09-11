var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/:username',
    {
      templateUrl: "home.html",
      controller: "TweetList"
    })
    .when('/address/:country/:state/:city',
    {
      templateUrl: "address.html",
      controller: "CityController"
    })
});
