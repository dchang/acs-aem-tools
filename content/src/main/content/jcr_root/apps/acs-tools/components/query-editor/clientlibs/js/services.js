(function () {

    'use strict';

    var module = angular.module('qeServices', ['ngResource']);

    module.factory('QueryService', ['$resource', '$http',
        function ($resource, $http) {
            return $resource('/bin/querybuilder.json', {}, {
                query: {method: 'GET', params: {}}
            });
        }
    ]);

    // debounce from https://github.com/angular/angular.js/issues/2690
    module.factory('debounce', ['$timeout',
        function ($timeout) {
            return function (fn, timeout, apply) { // debounce fn
                timeout = angular.isUndefined(timeout) ? 0 : timeout;
                apply = angular.isUndefined(apply) ? true : apply; // !!default is true! most suitable to my experience
                var nthCall = 0;
                return function () { // intercepting fn
                    var that = this;
                    var argz = arguments;
                    nthCall++;
                    var later = (function (version) {
                        return function () {
                            if (version === nthCall) {
                                return fn.apply(that, argz);
                            }
                        };
                    })(nthCall);
                    return $timeout(later, timeout, apply);
                };
            };
        }
    ]);

})();