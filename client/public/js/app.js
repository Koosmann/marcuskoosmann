/* GENERATED: DO NOT MODIFY! */
'use strict';

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'me';
	var applicationModuleVendorDependencies = ['ngSanitize', 'ngAnimate', 'ui.router', 'firebase'];

	// Add a new vertical module
	var registerModule = function(moduleName) {
		// Create angular module
		angular.module(moduleName, []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
	function() {

	}
]);

// Set timer that will reload the page at the next updayt time
angular.module(ApplicationConfiguration.applicationModuleName).run([
	function() {
		
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
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
'use strict';

// Follows controller
angular.module('me').controller('HomeController', ['$scope', '$sce', '$timeout', '$location', '$stateParams',
    function($scope, $sce, $timeout, $location, $stateParams) {
        $scope.loading = true;
        console.log($scope.projects);
        $scope.params = $stateParams;

        /*$timeout(function () {
            if ($stateParams.project) $('[data-panel="' + $stateParams.project + '"]').click();
        }, 1000);

        $scope.$on('$locationChangeSuccess', function () {
            var panel = $location.path().replace('/', '').length > 0 ? $location.path().replace('/', '') : 'home';
            console.log('load', panel);
            //$('[data-panel="' + panel + '"]').click();
            var target = 
        });*/

    	// Filter html through $sce
        $scope.projects.$loaded(function () {
            $scope.loading = false;
            console.log('loaded');
            $timeout(function () {
            	var panel = $location.path().replace('/', '').length > 0 ? $location.path().replace('/', '') : 'home';
                $('[data-panel=' + panel + ']').click();
            });

            /*$scope.projects.forEach(function (project, i, projects) {
                console.log(project);
        		_.each(project.images, function (image, x, images) {
        			projects[i].images[x].caption = $sce.trustAsHtml(image.caption);
    	    	});

                //if (project.builtWith) projects[i].builtWith = $sce.trustAsHtml(project.builtWith);
                //if (project.design) projects[i].design = $sce.trustAsHtml(project.design);
        	});*/
        });

    	/*$scope.$watch('projects', function () {
    		console.log('SCE');
	        _.each($scope.projects, function (project, i, projects) {
	    		_.each(project.images, function (image, x, images) {
	    			projects[i].images[x].caption = $sce.trustAsHtml(image.caption);
		    	});
	    	});
	    }, true);*/
    }
]);
'use strict';

// Follows controller
angular.module('me').controller('ProjectController', ['$scope', '$stateParams', '$sce',
    function($scope, $stateParams, $sce) {
        $scope.project = _.findWhere($scope.projects, {key: $stateParams.project});
	console.log($scope.projects);
        console.log($scope.project.url);
        $scope.url = $sce.trustAsResourceUrl($scope.project.url);

        /*$scope.$watch('url', function () {
            $scope.url = $sce.trustAsResourceUrl($scope.project.url);
        });*/

        var i = _.indexOf($scope.projects, $scope.project),
        	prev, next;

    	switch (i) {
    		case 0:
    			console.log('first');
    			prev = $scope.projects.length-1;
    			next = 1;
    			break;
    		case $scope.projects.length-1:
    			console.log('last');
    			prev = i-1;
    			next = 0;
    			break;
    		default:
    			console.log('mid');
    			prev = i-1;
    			next = i+1;
    			break;
    	}

        $scope.prevProject = $scope.projects[prev];
        $scope.nextProject = $scope.projects[next];
    }
]);
'use strict';

angular.module('me').directive('mFadeOnLoad', [
	function() {
		return {
			restrict: 'C',
			link: function postLink(scope, elm, attrs) {
				elm.on('load', function () {
					elm.css('opacity', 1);
				});
			}
		};
	}
]);
'use strict';

angular.module('me').directive('mPreventLongSentences', [
	function() {
		return {
			restrict: 'C',
			link: function postLink(scope, elm, attrs) {

					elm.find('[m-prevent]').each(function() {
						var pElm = $(this);
						//console.log(pElm.attr('m-prevent'));
						scope.$watch(pElm.attr('m-prevent'), function (value) {
							var color = tinycolor(pElm.css('color')).toHsl(),
								letters = value.split(''),
								lighterColor = tinycolor(pElm.css('color')).toHsl();

							var l = parseFloat(color.l),
								newL = parseFloat(lighterColor.l);
						
				            _.each(letters, function (elm, i, list) {
				                list[i] = '<span>' + elm + '</span>';
				            });

				            pElm.html(letters.join(''));

				            //console.log(color);
			                pElm.find('span').each(function() {
			                	newL = (newL + (1-l)/100);

			                	lighterColor.l = newL;
			                    $(this).css('color', tinycolor(lighterColor).toHslString());
			                    if (elm.prop('tagName') === 'A') $(this).css('text-decoration', 'underline');
			                    //console.log($(this).text() + ' - ' + tinycolor($(this).css('color')).toHslString());
			                });

			            });
		            });

		            elm.css('opacity', 1);
			}
		};
	}
]);

angular.module('me').directive('mFullBleed', ['$window',
	function($window) {
		return {
			restrict: 'C',
			link: function postLink(scope, elm, attrs) {
				
				scope.makeFullBleed = function () {
					elm.height($window.innerHeight);
				};

				scope.makeFullBleed();

				angular.element($window).bind('resize', function() {
			        scope.$apply(function () {
			        	scope.makeFullBleed();
			       	});
			    });
			}
		};
	}
]);


// Angular wrapper for PanelSnap
angular.module('me').directive('mPanels', ['$window', '$location', '$stateParams', '$timeout',
	function($window, $location, $stateParams, $timeout) {
		return {
			restrict: 'C',
			link: function postLink(scope, elm, attrs) {
				//Initialize Panel Snap
				$timeout(function () {
					console.log('init');
					elm.panelSnap({
						$menu: angular.element('#menu'),
						menuSelector: 'a',
						/*onSnapFinish: function(elm){ 
							scope.$apply(function () { 
								$location.path(elm.attr('id')==='home'?'':elm.attr('id'));
							});
						},*/
						onActivate: function (elm) {
							$timeout(function () { 
								$location.path(elm.attr('id')==='home'?'':elm.attr('id'));
							});
						},
						directionThreshold: 100,
						slideSpeed: 400,
						keyboardNavigation: {
							enabled: true,
							nextPanelKey: 40,
							previousPanelKey: 38,
							wrapAround: true
						}
				    });

			        scope.$on('$locationChangeSuccess', function () {
			            var panel = $location.path().replace('/', '').length > 0 ? $location.path().replace('/', '') : 'home';
			            $('[data-panel=' + panel + ']').click();
			        });
			    });
			}
		};
	}
]);

//
angular.module('me').directive('mCarousel', ['$window', '$location',
	function($window, $location) {
		return {
			restrict: 'C',
			link: function postLink(scope, elm, attrs) {
				scope.i = 0;

				scope.next = function () {
					switch (scope.i) {
						case scope.length-1:
							scope.i = 0;
							break;
						default:
							scope.i++;
							break;
					}
				};

				scope.prev = function () {
					switch (scope.i) {
						case 0:
							scope.i = scope.length-1;
							break;
						default:
							scope.i--;
							break;
					}
				};
			}
		};
	}
]);

angular.module('me').directive('mImageSize', ['$window', '$location',
	function($window, $location) {
		return {
			restrict: 'C',
			link: function postLink(scope, elm, attrs) {
				var width, height;

				elm.on('load', function () {
					width = elm.width();
					height = elm.height();

					elm.attr('width', width);
					elm.attr('height', height);
				});
			}
		};
	}
]);