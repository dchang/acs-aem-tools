(function () {

    'use strict';

    var module = angular.module('qeControllers', []);

    module.controller('QueryEditorCtrl', ['$scope', 'QueryService', 'debounce',
        function ($scope, QueryService, debounce) {

            $scope.source = 'type=nt:file\n' +
                'nodename=*.jar\n' +
                'orderby=@jcr:content/jcr:lastModified\n' +
                'orderby.sort=desc';

            $scope.json = '{}';

            $scope.initEditor = function (editor) {
                editor.setOptions({
                    enableBasicAutocompletion: true,
                    enableSnippets: true
                });
            };

            function params(source) {
                var o = {};
                source.replace(/(.*)=(.*)/gi, function ($0, $1, $2) {
                    o[$1] = $2;
                });
                return o;
            }

            $scope.refresh = debounce(function () {
                QueryService.query(params($scope.source), function (resp) {
                    $scope.json = angular.toJson(resp, true);
                });

            }, 500);

        }
    ]);

})();