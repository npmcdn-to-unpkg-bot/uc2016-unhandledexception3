angular.module('lovely', [])
.factory('lovelyDataService', ['$http', function ($http) {
    var endpoint = 'http://callitwhateveryoulike.azurewebsites.net/lovely/';

    var getKpi = function (webId) {
        return $http.get(endpoint + 'GetKPI?_WebId=' + webId);
    }
    
    var getDashboards = function () {
        return $http.get(endpoint + 'getdashboards');
    }

    var getDashboardConfig = function (webId) {
        return $http.get(endpoint + 'getdashboardconfig?_WebId=' + webId);
    }

    return {
        getKpi: getKpi,
        getDashboards: getDashboards,
        getDashboardConfig: getDashboardConfig
    }
}])