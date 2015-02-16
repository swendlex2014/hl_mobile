(function(app) {
	var chantCtrl = function($scope, $appData, $stateParams, $location){
		$scope.chant = $appData.getChant($stateParams.ID);
		
		$scope.swipeLeft = function(){
			$location.path('/tab/chant/' + $scope.chant.next.n);
		}

		$scope.swipeRight = function(){
			$location.path('/tab/chant/' + $scope.chant.prev.n);
		}
	};

	app.controller('chantCtrl', ['$scope', '$appData', '$stateParams', '$location', chantCtrl]);

})(angular.module('ionicapp'));

