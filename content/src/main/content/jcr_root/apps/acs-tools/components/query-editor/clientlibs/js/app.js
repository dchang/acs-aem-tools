(function() {

'use strict';

ace.require("ace/ext/language_tools");

var editor = ace.edit("editor");
editor.session.setMode("ace/mode/querybuilder");
editor.setTheme("ace/theme/monokai");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true
});

var output = ace.edit("output");
output.session.setMode("ace/mode/json");
output.setTheme("ace/theme/monokai");
output.setReadOnly(true);

})();