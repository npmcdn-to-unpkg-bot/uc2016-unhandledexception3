angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  
})

.controller('DashboardCtrl', function ($scope) {
    




    $scope.config = {
        PackeryConfig: {  },
        Widgets: [
            {
                widget:{
                    type: 'trend'
                },
                container: {
                    width: 1,
                    height: 2,
                }
            },
            {
                widget: {
                    type: 'kpi',
                    refresh: '5',
                    webId: 'A0EPUDmN4uvgkyiAt_SPv5vtg991umqry5RGAvwANOjKA4ANSkJlh49lVwXIb5mEqRnkwSlVQSVRFUjAwMVxTQU4gRElFR08gQUlSUE9SVFxIVkFDXFRFUk1JTkFMU1xURVJNSU5BTCAxXEVBU1RcQUlSIEhBTkRMRVIgMjhcQUgtMjggUkVUVVJOIEFJUiBDQUxDVUxBVElPTlN8Uk9PTSBDQVJCT04gRElPWElERQ'
                },
                container: {
                    width: 2,
                    height: 1
                }
            }
        ]
    }
})

.directive('dashboardList', function ($compile, lovelyDataService) {

    return {
        scope: {},
        transclude: true,
        restrict: 'E',
        link: function ($scope, element, attrs) {
            lovelyDataService.getDashboards().then(function (results) {
                var html = "<ion-list>";

                for (var i = 0; i < results.data.length; i++) {
                    html += "<ion-item menu-close href=#/app/dashboard/" + results.data[i].WebId + ">" + results.data[i].Name + "</ion-item>";
                }
                html += "</ion-list>";

                var htmlElement = angular.element(html);
                $compile(htmlElement)($scope);
                element.append(htmlElement);

            })
        }
    }
})
