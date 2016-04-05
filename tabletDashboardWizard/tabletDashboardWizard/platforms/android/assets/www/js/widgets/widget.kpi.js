angular.module('widget')
.directive("kpi", function () {

    var kpiController = ['$scope','lovelyDataService','$interval', function ($scope, lovelyDataService, $interval) {
        $scope.value = "";
        $scope.units = "";



        $scope.kpiValue = {
            scale: {
                startValue: 0,
                endValue: 1000,
                tickInterval: 100
            },
            rangeContainer: {
                ranges: [
                    { startValue: 0, endValue: 750 },
                     { startValue: 750, endValue: 1000 },
                    { startValue: 750, endValue: 1000 }
                ]
            },
            title:{
                text: 'KPI',
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
<<<<<<< HEAD
                    $scope.value = result.data.Value;
                    $scope.units = result.data.UnitsAbbreviation;
                   

=======
                $scope.value = result.data[0].Value;
                $scope.units = result.data[0].UnitsAbbreviation;
>>>>>>> alanTheGreat
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
     


<<<<<<< HEAD

    }];

=======
>>>>>>> alanTheGreat
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