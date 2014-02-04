(function() {

'use strict';

var source = "type=nt:file\n" +
             "nodename=*.jar\n" +
             "orderby=@jcr:content/jcr:lastModified\n" +
             "orderby.sort=desc";

ace.require("ace/ext/language_tools");

var editor = ace.edit("editor");
editor.session.setMode("ace/mode/querybuilder");
editor.setTheme("ace/theme/monokai");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true
});
editor.setValue(source, 0);
//editor.on("change", );

var output = ace.edit("output");
output.session.setMode("ace/mode/json");
output.setTheme("ace/theme/monokai");
output.setReadOnly(true);

})();