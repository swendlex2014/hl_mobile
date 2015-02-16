angular.module('ionicapp', ['ionic']);


(function(app) {
    var $appData = function($localStorage){
        var app = $localStorage.getObject('App');
        
        return {
            getIndexes : function(num){
                if (num !== undefined && num === true)
                    return app.indexes.num;
                return app.indexes.alpha;
            },

            getTable : function(ID, num){
                var table = app.table.alpha;
                if (num !== undefined && num === true)
                    return app.table.num;
                for(var i = 0; i < table.length; i++){
                    var key = Object.keys(table[i]);
                    if (key[0] === ID){
                        return table[i][ID];
                    }
                }
            },

            getChant : function(ID){
                if (this.IsValidChant(ID)){
                    $localStorage.set('chant', ID);
                    return app.chants[ID-1];
                } else{
                    var temp = $localStorage.get('chant'); 
                    return app.chants[temp > -1 === true ? temp : 0];
                }

            },

            IsValidChant : function(ID) {
                return ID !== undefined && ID >= 1 && ID <= 654;
            }    
        };
    }
    
    app.factory('$appData', ['$localStorage', $appData])

})(angular.module('ionicapp'));
(function(app) {
    var $dataServ = function($http, $q){
        return {
            getSiteRoot : function(){
                return '';
            }, 
            
            //TAB ACTIVE
            activeTab : function(index, list){
                list.map(function(elem){
                    elem.active = false;
                });
                list[index].active = true;
                return list;
            },
            
            //HELPER
            range: function(min, max, step){
                step = (step === undefined) ? 1 : step;
                var input = [];
                for (var i = min; i <= max; i += step) input.push(i);
                return input;
            },
            
            getData:  function(link) {
                var deferred = $q.defer();

                $http.get(link).success(function(data) {
                    deferred.resolve(data);
                });

                return deferred.promise;
            },

            postData : function(jsondata, link, table){
                var deferred = $q.defer();
                var data = new FormData();
                data.append('data', JSON.stringify(jsondata));
                if (table !== undefined){
                    data.append('table', JSON.stringify(table));
                }
                var xhr = new XMLHttpRequest();
                xhr.open('POST', link, true);
                xhr.onload = function () {
                    var result = JSON.parse(xhr.responseText);
                    deferred.resolve(result);
                };
                xhr.send(data);
                return deferred.promise;
            },

            sendEmail : function(jsondata){
                return this.postData(jsondata, this.getSiteRoot() + 'mail/contact.php');
            },
            
            //PAGINATION
            pages: function(start, size, length, number){
                pages = {};
                pages.start = start-1;
                pages.size = size;
                pages.number = number;
                pages.length = length;
                pages.show = length > size;
                pages.limit = length / size;
                pages.pagination = []; 
                i = start - (number / 2);
                if (start > 1)
                    pages.pagination.push({"class" : '', "page": start - 1, "show": "&laquo;"});
                while (i < start+(number / 2)) {
                    if (i > 0 && (i-1) < pages.limit){
                        var c = (i === start)? 'active' : '';
                        pages.pagination.push({"class" : c, "page": i, "show": i});
                    }
                    i++;
                }
                if (start < pages.limit)
                    pages.pagination.push({"class" : '', "page": start, "show": "&raquo;"});
                return pages;
            },
            
            goToPage: function(index, page){
                if (index.class !== 'active'){
                    this.slideToTop();
                    return this.pages(index.page, page.size, page.length, page.number);
                }
                return page;
            },
            
            updatePagination: function(index, page){
                return this.pages(1, page.size, index, page.number);
            },
            
            //WEB SERVICES ARRAY
            getWebServices : function(filename, ID){
                var id = '?ID=' + ID;
                if (ID === undefined)
                    id = '';
                var root = this.getSiteRoot();
                var link = root + 'data/get/' + filename + '.php' + id;
                var deferred = $q.defer();

                this.getData(link).then(function(data) {
                    deferred.resolve(data);
                });

                return deferred.promise;
            },
            
            getServData : function(file, ID){
                return this.getWebServices(file, ID);
            }
        }
    };

    app.factory('$dataServ', ['$http', '$q', $dataServ])

})(angular.module('ionicapp'));
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


(function(app){
  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  })



  app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/dash.html',
        controller: 'dashCtrl'
      }
    }
  })

  .state('tab.chant', {
    url: '/chant/:ID',
    views: {
      'tab-chant': {
        templateUrl: 'templates/chant.html',
        controller: 'chantCtrl'
      }
    }
  })

  .state('tab.alpha', {
    url: '/alpha',
    views: {
      'tab-alpha': {
        templateUrl: 'templates/alpha.html',
        controller: 'alphaCtrl'
      }
    }
  })

  .state('tab.alpha_details', {
    url: '/alpha1/:ID',
    views: {
      'tab-alpha': {
        templateUrl: 'templates/alpha_details.html',
        controller: 'alpha_detailsCtrl'
      }
    }
  })

.state('tab.num', {
    url: '/num',
    views: {
      'tab-num': {
        templateUrl: 'templates/num.html',
        controller: 'numCtrl'
      }
    }
  })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');
});

})(angular.module('ionicapp'));

(function(app) {
 var alpha_detailsCtrl = function($scope, $appData, $stateParams){
 	$scope.title = "Alpha-details";
 	$scope.list = $appData.getTable($stateParams.ID);
 };
 
 app.controller('alpha_detailsCtrl', ['$scope', '$appData', '$stateParams', alpha_detailsCtrl]);
 
 })(angular.module('ionicapp'));
(function(app) {
 var alphaCtrl = function($scope, $appData){
 	$scope.title = "Alpha";
 	$scope.indexes = $appData.getIndexes();
 	
 };
 
 app.controller('alphaCtrl', ['$scope', '$appData', alphaCtrl]);
 
 })(angular.module('ionicapp'));
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

(function(app) {
 var numCtrl = function($scope){
 	$scope.title = "Num";
 };
 
 app.controller('numCtrl', ['$scope', numCtrl]);
 
 })(angular.module('ionicapp'));