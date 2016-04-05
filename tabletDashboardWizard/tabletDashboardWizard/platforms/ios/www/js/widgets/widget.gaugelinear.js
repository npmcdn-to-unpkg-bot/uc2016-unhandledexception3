angular.module('widget')
.directive("linearGauge", function () {

	var LinearGaugeController = ['$scope', 'lovelyDataService', '$interval', function ($scope, lovelyDataService, $interval) {
		$scope.value = "";
		$scope.units = "";

		$scope.kpiValue = {
			scale: {
				startValue: 0,
				endValue: 1500,
				tickInterval: 100,
				tick: {
					color: '#536878'
				},
				label: {
					indentFromTick: -3
				}
			},
			rangeContainer: {
				offset: 10,
				ranges: [
					{ startValue: 0, endValue: 550, color: '#92000A' },
					{ startValue: 550, endValue: 750, color: '#E6E200' },
					{ startValue: 750, endValue: 1500, color: '#77DD77' }
				]
			},
			valueIndicator: {
				offset: 20
			},
			subvalueIndicator: {
				offset: -15
			},
			title: {
				text: 'Carbon Dioxide Levels (ppm)',
				font: { size: 16 }
			},
			bindingOptions: {
				value: 'value'
			}/*,
			subvalues: [5, 25]*/
		}

		$scope.getData = function () {
			lovelyDataService.getKpi($scope.config.webId).then(function (result) {
				$scope.value = result.data[0].Value;
				$scope.units = result.data[0].UnitsAbbreviation;
			}, function (error) {

			});
		}

		$scope.refreshInterval = $interval(function () {
			$scope.getData();


		}, $scope.config.refresh * 1000);

		$scope.$on('$destroy', function () {
			$interval.cancel($scope.refreshInterval);
			$scope.refreshInterval = null;
		});

		$scope.getData();

	}];


	return {
		scope: {
			config: '='
		},
		transclue: true,
		restrict: 'E',
		templateUrl: 'js/widgets/templates/gaugelinear.html',
		controller: LinearGaugeController,
		link: function($scope, element, attributes)
			{
				console.log("TEST");
			}
	}
});