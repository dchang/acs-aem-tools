ace.define('ace/mode/querybuilder', function(require, exports, module) {

    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var Tokenizer = require("ace/tokenizer").Tokenizer;
    var QueryBuilderHighlightRules = require("ace/mode/querybuilder_highlight_rules").QueryBuilderHighlightRules;

    var Mode = function() {
        this.HighlightRules = QueryBuilderHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        this.$id = "ace/mode/querybuilder";
    }).call(Mode.prototype);

    exports.Mode = Mode;
});

ace.define('ace/mode/querybuilder_highlight_rules', function(require, exports, module) {

    var oop = require("ace/lib/oop");
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

    var QueryBuilderHighlightRules = function() {

        var keywordMapper = this.createKeywordMapper({
            "variable.language": "orderby|orderby.sort|p.hits|p.limit|p.nodedepth|p.offset|" + // General
                                 "timeZone|" + // Date range
                                 "fulltext|relPath|" + // Fulltext
                                 "boolproperty|" + // Bool property
                                 "property|value|and|operation|" + // Property
                                 "nodename|" + // Nodename
                                 "path|exact|flat|self|" + // Path
                                 "group|group.p.or|" + // Group
                                 "lowerBound|lowerOperation|upperBound|upperOperation|decimal|" + // Range
                                 "savedquery|" + // Saved query
                                 "similar|local|" + // Similarity
                                 "type|" + // Type
                                 "tagid", // Other

            "constant.language": "full|selective|desc"
        }, "identifier");

        this.$rules = {
            "start": [
                {
                    token: "comment",
                    regex: /#.*$/
                },
                {
                    token: "keyword.operator",
                    regex: /=/,
                    next: "value"
                },
                {
                    token : keywordMapper,
                    regex : /^[^=]*/
                },
                {
                    defaultToken : "identifier"
                }
            ],
            "value": [
                {
                    token : "string",
                    regex : /$/,
                    next : "start"
                },
                {
                    token : "constant.language.escape",
                    regex : /\\u[0-9a-fA-F]{4}|\\/
                },
                {
                    defaultToken: "string"
                }
            ]
        };

    }

    oop.inherits(QueryBuilderHighlightRules, TextHighlightRules);

    exports.QueryBuilderHighlightRules = QueryBuilderHighlightRules;
});
