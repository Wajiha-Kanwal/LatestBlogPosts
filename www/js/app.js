var App = angular.module("App", ["ionic"]);

App.service("FreshlyPressed", ["$http", "$log", FreshlyPressed]);
App.controller("AppController", ["$scope", "$log", "$http","FreshlyPressed", AppController]);


function AppController($scope, $log, $http, FreshlyPressed){
  $scope.content = "Welcome";
  $scope.posts = [];
  $scope.refresh = function(){
    FreshlyPressed.getPosts($scope)
  }
};

function FreshlyPressed($http, $log){
  this.getPosts = function($scope){
    $http.jsonp("https://public-api.wordpress.com/rest/v1/freshly-pressed?callback=JSON_CALLBACK")
      .success(function(result){
        $log.info(result);
        $scope.posts = result.posts;
        $scope.$broadcast("scroll.refreshComplete");
      })
  }

}

