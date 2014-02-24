/*global angular: false, ace: false */

'use strict';

angular.module('qeControllers').
    controller('QueryOutputCtrl', ['$scope',
        function ($scope) {
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
        }
    ]);