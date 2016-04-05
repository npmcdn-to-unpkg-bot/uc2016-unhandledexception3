angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  
})

.controller('DashboardCtrl', function ($scope, lovelyDataService, $stateParams) {
    $scope.config = {};

    if ($stateParams.dashboardId == 0) {
        return;
    }

    lovelyDataService.getDashboardConfig($stateParams.dashboardId).then(function (results) {
        $scope.config = JSON.parse(results.data.Value);
    });
})

.directive('dashboardList', function ($compile, lovelyDataService, $state) {

    return {
        scope: {
        },
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

                $state.go("app.dashboard",{ "dashboardId": results.data[0].WebId }, { reload: true });
            })
        }
    }
})
