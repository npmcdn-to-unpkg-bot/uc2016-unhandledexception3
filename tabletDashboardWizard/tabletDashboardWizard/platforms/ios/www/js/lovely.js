angular.module('lovely', [])
.factory('lovelyDataService', ['$http', function ($http) {
    var endpoint = 'http://callitwhateveryoulike.azurewebsites.net/lovely/';

    var getKpi = function (webId) {
        return $http.get(endpoint + 'GetKPI?_WebId=' + webId);
    }
    


    return {
        getKpi: getKpi
    }
}])