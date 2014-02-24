/*global angular: false, ace: false */

'use strict';

angular.module('qeControllers').
    controller('QueryInputCtrl', ['$scope', 'Crx',
        function ($scope, Crx) {
            $scope.initEditor = function (editor) {
                var langTools = ace.require("ace/ext/language_tools");

                editor.setOptions({
                    enableBasicAutocompletion: true,
                    enableSnippets: true
                });

                langTools.addCompleter({
                    getCompletions: function(editor, session, pos, prefix, callback) {
                        console.log(editor.session.getLine(pos.row), prefix);

                        Crx.filesearch(prefix).
                            then(function(resp) {
                                var items = [];
                                angular.forEach(resp.data, function(res) {
                                    items.push({
                                        name: res['jcr:name'],
                                        value: res['jcr:path'],
                                        meta: 'filesearch'
                                    });
                                });
                                callback(null, items);
                            });
                    }
                });
            };


        }
    ]);