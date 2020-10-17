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