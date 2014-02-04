(function() {

    'use strict';

    var source = "type=nt:file\n" +
        "nodename=*.jar\n" +
        "orderby=@jcr:content/jcr:lastModified\n" +
        "orderby.sort=desc";

    var editor = ace.edit("editor");
    var output = ace.edit("output");

    var refresh = _.debounce(function() {
        var toParams = function(source) {
            return source.replace(/^\s+|\s+$/mg, "").replace(/^#.*$/mg, "").replace(/\n/g, "&");
        }

        $.getJSON("/bin/querybuilder.json", toParams(editor.getValue()))
            .done(function(json) {
                output.session.setValue(JSON.stringify(json, null, 4));
            });
    }, 500);

    ace.require("ace/ext/language_tools");

    editor.session.setMode("ace/mode/querybuilder");
    editor.setTheme("ace/theme/monokai");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true
    });
    editor.session.setValue(source);
    editor.on("change", refresh);

    output.session.setMode("ace/mode/json");
    output.setTheme("ace/theme/monokai");
    output.setReadOnly(true);

    refresh();

})();