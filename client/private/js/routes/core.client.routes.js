'use strict';

/* Route Module */

angular.module('me').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
	// Redirect to home view when route not found
	//$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);

	// Home state routing
	$stateProvider.
		state('root', {
			url: '',
			abstract: true,
			resolve: {
				projects: function ($firebase) {
					var projectsRef = new Firebase('https://marcuskoosmann.firebaseio.com/projects');
					return $firebase(projectsRef).$asArray();
      			}
			},
			controller: function ($scope, projects) {
				$scope.projects = projects;
			},
			template: '<div data-ui-view class="m-panels" />'
		}).
		state('root.home', {
			url: '/{project}',
			templateUrl: '/views/home.client.view.html',
			controller: 'HomeController',
			reloadOnSearch: false
		/*}).
		state('root.project', {
			url: '/:project',
			templateUrl: '/views/project.client.view.html',
			controller: 'ProjectController'*/
	});
}]);