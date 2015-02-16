(function(app) {
	var $localStorage = function($window){
		return {
			set: function(key, value) {
				$window.localStorage[key] = value;
			},
			get: function(key, defaultValue) {
				return $window.localStorage[key] || defaultValue;
			},
			setObject: function(key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			},
			getObject: function(key) {
				return JSON.parse($window.localStorage[key] || '{}');
			},
			initialize: function(){
				console.log('initialize');
			}
		};
	}

	app.factory('$localStorage', ['$window', $localStorage])

})(angular.module('ionicapp'));

