angular.module('lovely', [])
.factory('lovelyDataService', ['$http', function ($http) {
    var endpoint = 'http://callitwhateveryoulike.azurewebsites.net/lovely/';

    var getKpi = function (webId) {
        return $http.get(endpoint + 'GetKPI?_WebId=' + webId);
    }
    
<<<<<<< HEAD


    return {
        getKpi: getKpi
=======
    var getDashboards = function () {
        return $http.get(endpoint + 'getdashboards');
    }

    return {
        getKpi: getKpi,
        getDashboards: getDashboards
>>>>>>> alanTheGreat
    }
}])