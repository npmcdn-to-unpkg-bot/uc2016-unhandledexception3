angular.module('widget')
.directive("kpi", function () {

    var kpiController = ['$scope','lovelyDataService','$interval', function ($scope, lovelyDataService, $interval) {
        $scope.value = "";
        $scope.units = "";

        $scope.kpiValue = {
            scale: {
                startValue: 40,
                endValue: 100,
                tickInterval: 5
            },
            rangeContainer: {
                ranges: [
                    { startValue: 40, endValue: 65, color: '#0A0092' },
                     { startValue: 65, endValue: 75, color: '#77DD77' },
                    { startValue: 75, endValue: 100, color: '#92000A' }
                ]
            },
            title:{
                text: $scope.config.name,
                verticalAlignment: 'bottom',
                placeholderSize:10,
                margin: { top: 40},
                font: { size: 20,weight:600 },
            },

            bindingOptions: {
                value: 'value'
            }
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

        $scope.$on('$destroy', function() {
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
        templateUrl: 'js/widgets/templates/kpi.html',
        controller: kpiController,
    }
});