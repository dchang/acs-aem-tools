ace.define('ace/mode/querybuilder', function(require, exports, module) {

    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var Tokenizer = require("ace/tokenizer").Tokenizer;
    var QueryBuilderHighlightRules = require("ace/mode/querybuilder_highlight_rules").QueryBuilderHighlightRules;

    var Mode = function() {
        this.$tokenizer = new Tokenizer(new QueryBuilderHighlightRules().getRules());
    };
    oop.inherits(Mode, TextMode);

    (function() {
        // Extra logic goes here. (see below)
    }).call(Mode.prototype);

    exports.Mode = Mode;
});

ace.define('ace/mode/querybuilder_highlight_rules', function(require, exports, module) {

    var oop = require("ace/lib/oop");
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

    var QueryBuilderHighlightRules = function() {

        this.$rules = new TextHighlightRules().getRules();

    }

    oop.inherits(QueryBuilderHighlightRules, TextHighlightRules);

    exports.QueryBuilderHighlightRules = QueryBuilderHighlightRules;
});
