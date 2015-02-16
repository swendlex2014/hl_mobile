(function(app) {
 var alpha_detailsCtrl = function($scope, $appData, $stateParams){
 	$scope.title = "Alpha-details";
 	$scope.list = $appData.getTable($stateParams.ID);
 };
 
 app.controller('alpha_detailsCtrl', ['$scope', '$appData', '$stateParams', alpha_detailsCtrl]);
 
 })(angular.module('ionicapp'));