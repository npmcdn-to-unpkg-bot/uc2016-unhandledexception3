angular.module('lovely', [])
.factory('lovelyDataService', ['$http', function ($http) {
    var endpoint = 'http://callitwhateveryoulike.azurewebsites.net/lovely/';

    var getKpi = function (webId) {
        return $http.get(endpoint + 'GetKPI?_WebId=' + webId);
    }

    var getKpis = function (webIds) {
        var url = "?garbage=0";
        for (var i = 0; i < webIds.length; i++) {
            url += "&_WebId=" + webIds[i];
        }

        return $http.get(endpoint + 'GetKPI' + url);
    }
    
    var getDashboards = function () {
        return $http.get(endpoint + 'getdashboards');
    }

    var getDashboardConfig = function (webId) {
        return $http.get(endpoint + 'getdashboardconfig?_WebId=' + webId);
    }

    var getTrends = function (webIds) {
        var url = "?garbage=0";
        for (var i = 0; i < webIds.length; i++) {
            url += "&_WebId=" + webIds[i];
        }

        return $http.get(endpoint + 'getplot' + url)
    }

    return {
        getKpi: getKpi,
        getKpis: getKpis,
        getDashboards: getDashboards,
        getDashboardConfig: getDashboardConfig,
        getTrends: getTrends
    }
}])