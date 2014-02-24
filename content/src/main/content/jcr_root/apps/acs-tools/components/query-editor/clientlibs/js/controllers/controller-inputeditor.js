/*global angular: false, ace: false */

'use strict';

angular.module('qeControllers').
    controller('QueryInputCtrl', ['$scope',
        function ($scope) {
            $scope.initEditor = function (editor) {
                editor.setOptions({
                    enableBasicAutocompletion: true,
                    enableSnippets: true
                });
            };
        }
    ]);