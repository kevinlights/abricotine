/*
*   Abricotine - Markdown Editor
*   Copyright (c) 2015 Thomas Brouard
*   Licensed under GNU-GPLv3 <http://www.gnu.org/licenses/gpl.html>
*/

// Spellchecker for CodeMirror

var baseMode = require("./cm-base-mode.js");

function initSpellcheck (CodeMirror) {
    // Create overlay
    // Inspiration: https://github.com/NextStepWebs/codemirror-spell-checker/blob/master/src/js/spell-checker.js
    CodeMirror.defineMode("spellchecker", function (config, parserConfig) {
        var wordDelimiters = "!\"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ \t",
            overlay = {
        		token: function(stream, state) {
        			var ch = stream.peek(),
                        word = "",
                        // isMisspelledFunc = window.abrDoc.getSpellcheckFunc();
                        isMisspelledFunc = false;
                    if (!isMisspelledFunc) {
                        return null;
                    }
        			if (wordDelimiters.includes(ch)) {
        				stream.next();
        				return null;
        			}
        			while ((ch = stream.peek()) != null && !wordDelimiters.includes(ch)) {
        				word += ch;
        				stream.next();
        			}
                    word = word.replace(/[’ʼ]/g, "'"); // Alternative apostrophes
        			if (isMisspelledFunc && isMisspelledFunc(word)) {
        				return "spell-error"; // CSS class: cm-spell-error
                    }
        			return null;
        		}
        	},
            mode = CodeMirror.getMode(config, baseMode);
        return CodeMirror.overlayMode(mode, overlay, true);
    });
}

module.exports = initSpellcheck;
