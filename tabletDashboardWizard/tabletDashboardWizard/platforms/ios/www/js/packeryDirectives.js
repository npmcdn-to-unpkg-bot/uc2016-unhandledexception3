angular.module('packery.controllers', ['widget'])

.directive('packeryWorkspace', function ($compile) {
    return {
        scope: {
            configuration: "="
        },
        restrict: 'A',
        transclude: true,
        link: function ($scope, element, attributes) {

            $scope.$watch('configuration', function () {
                runStuff();
            })


            var runStuff = function () {
                if ($scope.configuration.Widgets === undefined) {
                    return;
                }

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
                    if ($scope.configuration.Widgets[i].widget.type == 'bullet')
                        var widgetElement = angular.element("<div packery-Container configuration='configuration.Widgets[" + i + "]' class='module'></div>");
                    else
                        var widgetElement = angular.element("<div packery-Container configuration='configuration.Widgets[" + i + "]' class='module nonBullet'></div>");

                    $compile(widgetElement)($scope);
                    element.append(widgetElement);
                }
            }
            

            runStuff();
        }
    }
})
.directive('packeryContainer', function ($compile) {

    return {
        scope : {
            configuration: '='
        },
        restrict: 'A',
        transclude: true,
        link: function ($scope, element, attributes) {
            var container = $scope.configuration.container;
            var widget = $scope.configuration.widget;

            //set container size
            element.addClass("width-" + container.width);
            element.addClass("height-" + container.height);

            //create and compile widget
            var widgetElement = angular.element("<" + widget.type + " config='configuration.widget'></" + widget.type + ">");
            $compile(widgetElement)($scope);
            element.append(widgetElement);
        }
    }
})
