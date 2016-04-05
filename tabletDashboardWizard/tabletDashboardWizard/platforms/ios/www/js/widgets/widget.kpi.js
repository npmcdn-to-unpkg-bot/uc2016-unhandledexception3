﻿angular.module('widget')
.directive("kpi", function () {

    var kpiController = ['$scope','lovelyDataService','$interval', function ($scope, lovelyDataService, $interval) {
        $scope.value = "";
        $scope.units = "";

        $scope.getData = function () {
            lovelyDataService.getKpi($scope.config.webId).then(function (result) {
                $scope.value = result.data.Value;
                $scope.units = result.data.UnitsAbbreviation;
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