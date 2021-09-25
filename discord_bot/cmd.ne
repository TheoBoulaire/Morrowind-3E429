main -> diceRoll | hiddenDiceRoll | description | ressource | names
diceRoll -> "d" (_ number):? {%
    function(data) {
        return {
            cmd: "dice",
            n: data[1] === null ? 100 : data[1][1]
        };
    }
%}
hiddenDiceRoll -> "hd" _ number (__ number):? (__ number):? {%
    function(data) {
        return {
            cmd: "hidden_dice",
            skill: data[2],
            critical: data[3] === null ? 5 : data[3][1],
            n: data[4] === null ? 100 : data[4][1]
        };
    }
%}
description -> "desc" _ word {%
    function(data) {
        return {
            cmd: "description",
            name: data[2]
        };
    }
%}
ressource -> "res" _ word {%
    function(data) {
        return {
            cmd: "resource",
            code: data[2]
        };
    }
%}
names -> "n" [obcdinhkargxf] [mf]:? number:? {%
    function(data) {
        return {
            cmd: "names",
            race: data[1],
            sex: data[2],
            n: data[3] === null ? 5 : data[3]
        }
    }
%} 
__ -> " ":+
_ -> " ":*
number -> [0-9]:+ {%
    function(data) {
        return parseInt(data[0].join(''), 10);
    }
%}
word -> [a-zA-Z]:+ {%
    function(data) {
        return data[0].join('');
    }
%}