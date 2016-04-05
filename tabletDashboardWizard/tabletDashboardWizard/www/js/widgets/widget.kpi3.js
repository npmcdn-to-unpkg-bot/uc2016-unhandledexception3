angular.module('widget')
.directive("kpi3", function () {

    var kpiController = ['$scope','lovelyDataService','$interval', function ($scope, lovelyDataService, $interval) {
        $scope.value = "";
        $scope.units = "";

        $scope.kpiValue = {
            scale: {
                startValue: 0,
                endValue: 1500,
                tickInterval: 100
            },
            rangeContainer: {
                ranges: [
                    { startValue: 0, endValue: 1000 },
                     { startValue: 1000, endValue: 1500 },
                    { startValue: 1000, endValue: 1500 }
                ]
            },
            title:{
                text: 'KPI3',
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
        templateUrl: 'js/widgets/templates/kpi3.html',
        controller: kpiController,
    }
});