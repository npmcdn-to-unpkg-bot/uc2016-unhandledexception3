angular.module('widget')
.directive("bullet", function () {

    var bulletController = ['$scope', 'lovelyDataService', '$interval', function ($scope, lovelyDataService, $interval) {
        $scope.value = 50;
        $scope.startValue = 0,
        $scope.endValue = 100;
        $scope.target = 50;

        $scope.bulletConfig = {
            startScaleValue: $scope.startValue,
            endScaleValue: $scope.endValue,
            value: $scope.value,
            target: $scope.target
        }

        $scope.getData = function () {
            lovelyDataService.getKpis([$scope.config.startId, $scope.config.targetId]).then(function (result) {
                
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
        templateUrl: 'js/widgets/templates/bullet.html',
        controller: bulletController,
    }
});