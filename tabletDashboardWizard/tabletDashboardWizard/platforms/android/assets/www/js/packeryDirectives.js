angular.module('packery.controllers', [])

.directive('packeryWorkspace', function () {
    return {
        scope: {
            configuration: "="
        },
        restrict: 'A',
        link: function ($scope, element, attributes) {


            angular.forEach($scope.configuration.Widgets, function (widget) {
                var angularElement = 
            });

        }
    }
})
