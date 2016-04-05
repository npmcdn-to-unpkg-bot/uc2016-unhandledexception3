angular.module('widget')
.directive("bullet", function () {

    var bulletController = ['$scope', 'lovelyDataService', '$interval','$compile', function ($scope, lovelyDataService, $interval,$compile) {
        $scope.value = 5;
        $scope.startValue = $scope.config.start,
        $scope.endValue = $scope.config.end;
        $scope.target = 1000;

        $scope.bulletConfig = {
            startScaleValue: $scope.startValue,
            endScaleValue: $scope.endValue,
            
            target: $scope.target,
            color: 'powderblue',
           
            bindingOptions: {
                value: 'value'
            },

            tooltip: {
            color: 'seashell',
            format: 'fixedPoint',
            precision: 2,
            font: {
                color: 'crimson',
                size: 10,
                family: 'Zapf-Chancery, cursive',
                opacity: 0.75,
                weight: 400
            }
        }
        
        

        }

        $scope.getData = function () {
            lovelyDataService.getKpis([$scope.config.startId, $scope.config.targetId]).then(function (result) {
                for (var i = 0; i < result.data.length; i++) {
                    var item = result.data[i];

                    if (item.WebId == $scope.config.startId) {
                        $scope.value = item.Value;
                    }

                    if (item.WebId == $scope.config.targetId) {
                        $scope.target = item.Value;
                    }
                }
                $scope.bulletConfig = {
                    startScaleValue: $scope.startValue,
                    endScaleValue: $scope.endValue,
                    value: $scope.value,
                    target: $scope.target
                }

                //var contents = $scope.element.contents();
                //contents.html("");
                //$compile($scope.element)($scope);
                //var newContents = angular.element("<div><div dx-bullet='bulletConfig'></div></div>");
                //$compile(newContents)({ config: $scope.config);
                //$scope.element.append(newContents);


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
        link: function($scope,element,attrs){
            $scope.element = element;
        },
        controller: bulletController,
    }
});