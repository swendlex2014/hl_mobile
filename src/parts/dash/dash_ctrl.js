(function(app) {
 var dashCtrl = function($scope, $localStorage, $dataServ){
 	$scope.title ="";

 	var name = 'null';
 	if (name === 'null'){
 		$dataServ.getData('data.json').then(function(data){
 			$localStorage.setObject('App', data.App);
 			$scope.title = data.App.title;
 			console.log(data.App);
 		});
 	}
 };
 
 app.controller('dashCtrl', ['$scope', '$localStorage', '$dataServ', dashCtrl]);
 
 })(angular.module('ionicapp'));
