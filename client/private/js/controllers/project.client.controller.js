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