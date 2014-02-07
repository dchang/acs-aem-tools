/*global angular: false, ace: false */

(function () {

    'use strict';

    var module = angular.module('qeControllers', []);

    module.controller('QueryEditorCtrl', ['$scope', 'QueryService', 'debounce',
        function ($scope, QueryService, debounce) {

            $scope.running = true;

            $scope.status = {
                requesting: false,
                duration: 0
            };

            $scope.source = 'type=nt:file\n' +
                'nodename=*.jar\n' +
                'orderby=@jcr:content/jcr:lastModified\n' +
                'orderby.sort=desc';

            $scope.json = '{}';

            $scope.initEditor = function (editor) {
                $scope.editor = editor;
                editor.setOptions({
                    enableBasicAutocompletion: true,
                    enableSnippets: true
                });
            };

            function params(source) {
                var o = {};
                source.replace(/^\s*(\S*)\s*=\s*(\S*)\s*$/gm, function ($0, $1, $2) {
                    o[$1] = $2;
                });
                return o;
            }

            $scope.refresh = debounce(function () {
                var time = new Date().getTime();
                $scope.status.requesting = true;
                QueryService.query(params($scope.source), function (resp) {
                    $scope.json = angular.toJson(resp, true);
                    $scope.status.requesting = false;
                    $scope.status.duration = new Date().getTime() - time;
                });

            }, 500);

        }
    ]);

}());