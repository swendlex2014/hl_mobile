(function(app) {
 var alphaCtrl = function($scope, $appData){
 	$scope.title = "Alpha";
 	$scope.indexes = $appData.getIndexes();
 	
 };
 
 app.controller('alphaCtrl', ['$scope', '$appData', alphaCtrl]);
 
 })(angular.module('ionicapp'));