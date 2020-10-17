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