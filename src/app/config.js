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
