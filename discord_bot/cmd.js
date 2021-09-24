// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["diceRoll"]},
    {"name": "main", "symbols": ["hiddenDiceRoll"]},
    {"name": "main", "symbols": ["description"]},
    {"name": "main", "symbols": ["ressource"]},
    {"name": "diceRoll$ebnf$1$subexpression$1", "symbols": ["_", "number"]},
    {"name": "diceRoll$ebnf$1", "symbols": ["diceRoll$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "diceRoll$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "diceRoll", "symbols": [{"literal":"d"}, "diceRoll$ebnf$1"], "postprocess": 
        function(data) {
            return {
                cmd: "dice",
                n: data[1] === null ? 100 : data[1][1]
            };
        }
        },
    {"name": "hiddenDiceRoll$string$1", "symbols": [{"literal":"h"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "hiddenDiceRoll$ebnf$1$subexpression$1", "symbols": ["__", "number"]},
    {"name": "hiddenDiceRoll$ebnf$1", "symbols": ["hiddenDiceRoll$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "hiddenDiceRoll$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "hiddenDiceRoll$ebnf$2$subexpression$1", "symbols": ["__", "number"]},
    {"name": "hiddenDiceRoll$ebnf$2", "symbols": ["hiddenDiceRoll$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "hiddenDiceRoll$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "hiddenDiceRoll", "symbols": ["hiddenDiceRoll$string$1", "_", "number", "hiddenDiceRoll$ebnf$1", "hiddenDiceRoll$ebnf$2"], "postprocess": 
        function(data) {
            return {
                cmd: "hidden_dice",
                skill: data[2],
                critical: data[3] === null ? 5 : data[3][1],
                n: data[4] === null ? 100 : data[4][1]
            };
        }
        },
    {"name": "description$string$1", "symbols": [{"literal":"d"}, {"literal":"e"}, {"literal":"s"}, {"literal":"c"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "description", "symbols": ["description$string$1", "_", "word"], "postprocess": 
        function(data) {
            return {
                cmd: "description",
                name: data[2]
            };
        }
        },
    {"name": "ressource$string$1", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ressource", "symbols": ["ressource$string$1", "_", "word"], "postprocess": 
        function(data) {
            return {
                cmd: "resource",
                code: data[2]
            };
        }
        },
    {"name": "__$ebnf$1", "symbols": [{"literal":" "}]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", {"literal":" "}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", {"literal":" "}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "number$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "number$ebnf$1", "symbols": ["number$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "number", "symbols": ["number$ebnf$1"], "postprocess": 
        function(data) {
            return parseInt(data[0].join(''), 10);
        }
        },
    {"name": "word$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "word$ebnf$1", "symbols": ["word$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "word", "symbols": ["word$ebnf$1"], "postprocess": 
        function(data) {
            return data[0].join('');
        }
        }
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
