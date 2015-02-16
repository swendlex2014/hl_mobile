(function(app) {
 var numCtrl = function($scope){
 	$scope.title = "Num";
 };
 
 app.controller('numCtrl', ['$scope', numCtrl]);
 
 })(angular.module('ionicapp'));