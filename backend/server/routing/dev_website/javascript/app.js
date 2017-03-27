var app = angular.module('myApp', ['ngRoute'])
.config(function ($routeProvider) {
    $routeProvider.when('/', {
      controller: 'home_controller',
      templateUrl: '/dev/home_view.html'
    })
    .when('/documentation',{
      controller: 'documenatation_controller',
      templateUrl: '/dev/documentation_view.html'
    })
    .when('/map', {
      controller: 'map_controller',
      templateUrl: '/dev/map_view.html'
    })
    .when('/history', {
      controller: 'history_controller',
      templateUrl: '/dev/history_view.html'
    })
    .when('/datadoc',{
      controller : 'data_doc_controller',
      templateUrl: '/dev/data_doc_view.html'
    })
    .otherwise({
      redirectTo : '/'
    });
}).controller('indexController', function($scope) {});

app.controller('home_controller',function($scope, $location){
  $(document).ready(function(){
    $('#key').text(sessionStorage.getItem('key'));
  });
});

app.controller('documenatation_controller',function($scope, $location){
  $(document).ready(function(){
    $('#docs').load("document.html");
  });
});

app.controller('data_doc_controller', function($scope, $location){
  //TODO
});

function signOut(){
  sessionStorage.removeItem('key');
  location.href = '/';
}
