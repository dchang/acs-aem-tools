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

            $scope.initOutput = function (editor) {
                var Range = ace.require("ace/range").Range, markerId;
                var event = ace.require("ace/lib/event");

                editor.setOptions({
                    enableMultiselect: false
                });

                function getToken(e) {
                    var pos = e.getDocumentPosition();
                    return e.editor.session.getTokenAt(pos.row, pos.column);
                }

                function linkable(token) {
                    var re = /^"\/.*"/;
                    return token.type === "string" && re.test(token.value);
                }

                editor.on("click", function(e) {
                    if(!e.domEvent.metaKey) return;

                    var token = getToken(e);

                    if(linkable(token)) {
                        var re = /^"(.*)"/;
                        var path = re.exec(token.value)[1];
                        window.open("/crx/de/index.jsp#" + path, "crxde");
                    }
                });

                editor.on("mousemove", function(e) {
                    if(!e.domEvent.metaKey) return;

                    e.editor.session.removeMarker(markerId);

                    var token = getToken(e);

                    if(linkable(token)) {
                        var pos = e.getDocumentPosition();
                        var range = new Range(pos.row, token.start, pos.row, token.start + token.value.length);

                        markerId = e.editor.session.addMarker(range, 'link');
                    }

                });

                event.addListener(document, "keyup", function() {
                    editor.session.removeMarker(markerId);
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
                QueryService.query(params($scope.source)).
                    then(function (resp) {
                        $scope.json = angular.toJson(resp, true);
                    }).
                    finally(function() {
                        $scope.status.requesting = false;
                        $scope.status.duration = new Date().getTime() - time;
                    });

            }, 500);

        }
    ]);

}());