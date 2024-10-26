(function (window, $) {
    window.jargon = {};
    window.jargon.abbreviations = ["TCP", "HTTP", "SDD", "RAM", "GB", "CSS", "SSL", "AGP", "SQL", "FTP", "PCI", "AI", "ADP", "RSS", "XML", "EXE", "COM", "HDD", "THX", "SMTP", "SMS", "USB", "PNG"];
    window.jargon.adjectives = ["auxiliary", "primary", "back-end", "digital", "open-source", "virtual", "cross-platform", "redundant", "online", "haptic", "multi-byte", "bluetooth", "wireless", "1080p", "neural", "optical", "solid state", "mobile"];
    window.jargon.nouns = ["driver", "protocol", "bandwidth", "panel", "microchip", "program", "port", "card", "array", "interface", "system", "sensor", "firewall", "hard drive", "pixel", "alarm", "feed", "monitor", "application", "transmitter", "bus", "circuit", "capacitor", "matrix"];
    window.jargon.verbs = ["back up", "bypass", "hack", "override", "compress", "copy", "navigate", "index", "connect", "generate", "quantify", "calculate", "synthesize", "input", "transmit", "program", "reboot", "parse"];
    window.jargon.ingverbs = ["backing up", "bypassing", "hacking", "overriding", "compressing", "copying", "navigating", "indexing", "connecting", "generating", "quantifying", "calculating", "synthesizing", "transmitting", "programming", "parsing"];
    window.jargon.constructs = [{
        types: ["verb", "noun", "abbreviation", "noun", "adjective", "abbreviation", "noun"],
        structure: "If we {0} the {1}, we can get to the {2} {3} through the {4} {5} {6}!"
    }, {
        types: ["verb", "adjective", "abbreviation", "noun"],
        structure: "We need to {0} the {1} {2} {3}!"
    }, {
        types: ["verb", "abbreviation", "noun", "verb", "adjective", "noun"],
        structure: "Try to {0} the {1} {2}, maybe it will {3} the {4} {5}!"
    }, {
        types: ["verb", "noun", "ingverb", "adjective", "abbreviation", "noun"],
        structure: "You can't {0} the {1} without {2} the {3} {4} {5}!"
    }, {
        types: ["adjective", "abbreviation", "noun", "verb", "adjective", "noun"],
        structure: "Use the {0} {1} {2}, then you can {3} the {4} {5}!"
    }, {
        types: ["abbreviation", "noun", "verb", "adjective", "noun", "verb", "abbreviation", "noun"],
        structure: "The {0} {1} is down, {2} the {3} {4} so we can {5} the {6} {7}!"
    }, {
        types: ["ingverb", "noun", "verb", "adjective", "abbreviation", "noun"],
        structure: "{0} the {1} won't do anything, we need to {2} the {3} {4} {5}!"
    }, {
        types: ["verb", "adjective", "abbreviation", "noun", "verb", "abbreviation", "noun"],
        structure: "I'll {0} the {1} {2} {3}, that should {4} the {5} {6}!"
    }];
    window.jargon.clearcache = function () {
        window.jargon.abbreviationcache = new Array;
        window.jargon.adjectivecache = new Array;
        window.jargon.nouncache = new Array;
        window.jargon.verbcache = new Array;
        window.jargon.ingverbcache = new Array
    };
    window.jargon.generate = function () {
        var construct = window.jargon.constructs[Math.floor(Math.random() * window.jargon.constructs.length)];
        var sentence = construct.structure;
        window.jargon.clearcache();
        $.each(construct.types, function (index, type) {
            var words = window.jargon[type + "s"];
            var wordindex = Math.floor(Math.random() * words.length);
            var cache = window.jargon[type + "cache"];
            while ($.inArray(wordindex, cache) !== -1) {
                wordindex++;
                if (wordindex >= words.length) {
                    wordindex = 0
                }
            }
            cache.push(wordindex);
            var word = words[wordindex];
            sentence = sentence.replace("{" + index + "}", word)
        });
        sentence = '"' + sentence.charAt(0).toUpperCase() + sentence.slice(1) + '"';
        return sentence
    };
})(window, jQuery);
