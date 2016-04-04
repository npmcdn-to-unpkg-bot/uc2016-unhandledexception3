angular.module('packery.controllers', [])

.directive('packeryWorkspace', function ($compile) {
    return {
        scope: {
            configuration: "="
        },
        restrict: 'A',
        link: function ($scope, element, attributes) {

            element.ready(function () {
                $scope.packery = new Packery(element[0], {
                    rowHeight: 100,
                    itemSelector: '.module',
                    columnWidth: 100
                });
                angular.forEach($scope.packery.getItemElements(), function (item) {
                    var draggable = new Draggabilly(item);
                    $scope.packery.bindDraggabillyEvents(draggable);
                });
                $scope.packery.layout();
            });

            for (var i = 0; i < $scope.configuration.Widgets.length; i++) {
                var widgetElement = angular.element("<div class='module'>configuration.Widgets[" + i + "]</div>");
                $compile(widgetElement)($scope);
                element.append(widgetElement);
                $compile(widgetElement)($scope);
            }
        }
    }
})
.directive('packeryContainer', function ($compile) {
    return {
        scope : {
            configuration: '='
        },
        restrict: 'A',
        link: function ($scope, element, attributes) {

        }
    }
})
