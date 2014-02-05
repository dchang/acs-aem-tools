(function() {

    'use strict';

    var defaults = {
        source: "type=nt:file\n" +
                "nodename=*.jar\n" +
                "orderby=@jcr:content/jcr:lastModified\n" +
                "orderby.sort=desc",
        json: "{}"
    };

    var editor = ace.edit("editor");
    var output = ace.edit("output");

    var query = function() {
        var toParams = function(source) {
            return source.replace(/\n/g, "&").replace(/^\s+|\s+$/mg, "").replace(/^#.*$/mg, "");
        }

        return $.getJSON("/bin/querybuilder.json", toParams(editor.getValue()))
            .done(function(json) {
                output.session.setValue(JSON.stringify(json, null, 4));
            });
    }

    var refresh = _.debounce(function() {
        var $loader = $(".loader");

        $loader.show();
        query().always(function() {
            $loader.hide();
        });
    }, 500);

    ace.require("ace/ext/language_tools");

    editor.session.setMode("ace/mode/querybuilder");
    editor.setTheme("ace/theme/monokai");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true
    });
    editor.session.setValue(defaults.source);
    editor.on("change", refresh);

    output.session.setMode("ace/mode/json");
    output.setTheme("ace/theme/monokai");
    output.setReadOnly(true);
    output.session.setValue(defaults.json);

    refresh();

})();