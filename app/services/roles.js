'use strict';
var app = angular.module('jobbomat');

app.service('Roles', ['$http', '$q', function($http, $q) {
    console.log('[Roles] service initiated');
    var def = $q.defer();
    var _roles = [];
    var service = {
        getRoles: function() {
            return def.promise;
        }
    }
    return service;
}]);
