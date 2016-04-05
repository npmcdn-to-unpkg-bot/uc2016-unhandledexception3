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
                    width: 2,
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
                    height: 2
                }
            },
            {
                widget: {
                    type: 'widget3',
                    refresh: '5',
                    webId: 'A0EPUDmN4uvgkyiAt_SPv5vtg991umqry5RGAvwANOjKA4ANSkJlh49lVwXIb5mEqRnkwSlVQSVRFUjAwMVxTQU4gRElFR08gQUlSUE9SVFxIVkFDXFRFUk1JTkFMU1xURVJNSU5BTCAxXEVBU1RcQUlSIEhBTkRMRVIgMjhcQUgtMjggUkVUVVJOIEFJUiBDQUxDVUxBVElPTlN8Uk9PTSBDQVJCT04gRElPWElERQ'
                },
                container: {
                    width: 2,
                    height: 3
                }
            }
        ]
    }
})
