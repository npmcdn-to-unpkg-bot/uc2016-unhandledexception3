angular.module('widget')
.directive("trend", function () {

    var trendController = ['$scope','lovelyDataService','$interval', function ($scope, lovelyDataService, $interval) {
        $scope.dataSource = [];
        $scope.trendValue = {
            bindingOptions: {
                dataSource: 'dataSource'
            },
            commonSeriesSettings: {
                type: "spline",
                argumentField: "ts"
            },
            commonAxisSettings: {
                grid: {
                    visible: true
                }
            },
            margin: {
                bottom: 20
            },
            series: [
                { valueField: "v0", name: $scope.config.trend1 },
                { valueField: "v1", name: $scope.config.trend2 },
            ],
            tooltip: {
                enabled: true
            },
            argumentAxis: {
                argumentType: 'datetime',
                label: {
                    format: 'MMM-dd',
                    overlappingBehavior: 'enlargeTickInterval',
                },
            },
            legend: {
                verticalAlignment: "top",
                horizontalAlignment: "right"
            },
            title: $scope.config.name
        };

        $scope.getData = function () {
            lovelyDataService.getTrends([$scope.config.targetId,$scope.config.startId]).then(function (result) {
                var dataSource = [];

                for (var i = 0; i < result.data.length; i++) {
                    
                    for (var j = 0; j < result.data[i].length; j++) {

                        if (i == 0) {
                            dataSource.push({});
                        }
                        dataSource[j]["ts"] = new Date(result.data[i][j].Timestamp);
                        dataSource[j]["v" + i] = result.data[i][j].Value;

                    }
                }

                $scope.dataSource = dataSource;
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
        templateUrl: 'js/widgets/templates/trend.html',
        controller: trendController,
    }
});