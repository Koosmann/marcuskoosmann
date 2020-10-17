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