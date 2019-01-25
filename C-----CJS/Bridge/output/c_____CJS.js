/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 15.7.0
 */
Bridge.assembly("C-----CJS", function ($asm, globals) {
    "use strict";

    Bridge.define("C_____CJS.App", {
        $main: function () {
            var input = document.getElementById("input");
            var button = document.getElementById("button");
            var output = document.getElementById("output");
            // Create a new Button
            button.onclick = function (ev) {
                var $t;
                // When Button is clicked, 
                // the Bridge Console should open.
                var compiler = new C_____CJS.Compiler(true);
                try {
                    var data = input.value;
                    $t = Bridge.getEnumerator(data.split("\n"));
                    while ($t.moveNext()) {
                        var line = $t.getCurrent();
                        compiler.line(line);
                    }
                    output.value = compiler.getReturn();
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    var e;
                    if (Bridge.is($e1, C_____CJS.ProgramException)) {
                        e = $e1;
                        output.value = e.getMessage();
                    } else {
                        output.value = C_____CJS.ProgramException.DID_BAD;
                    }
                }
            };
        }
    });

    Bridge.define("C_____CJS.Compiler", {
        statics: {
            isPrime: function (i) {
                if (i < 2) {
                    return false;
                }
                // Algorithm from http://stackoverflow.com/a/21176886
                return System.Linq.Enumerable.range(1, i).where(function (x) {
                    return i % x === 0;
                }).sequenceEqual(System.Array.init([1, i], System.Int32));
            },
            isPrime$1: function (i) {
                return C_____CJS.Compiler.isPrime((i | 0));
            }
        },
        enableValidation: false,
        memory: null,
        currentLine: 0,
        lines: null,
        config: {
            init: function () {
                this.memory = new (System.Collections.Generic.Dictionary$2(System.UInt32,C_____CJS.Data))();
                this.lines = new (System.Collections.Generic.List$1(String))();
            }
        },
        ctor: function (enableValidation) {
            this.$initialize();
            this.enableValidation = enableValidation;
        },
        getReturn: function () {
            var $t, $t1;
            // Validate script
            if (this.enableValidation) {
                var hash = ($t=this.getSha256(Bridge.toArray(this.lines).join("\n")), System.String.toCharArray($t, 0, $t.length));
                var targetHash = ($t1=this.getSha256("C-----C"), System.String.toCharArray($t1, 0, $t1.length));
                // Get number of elements in common between hash and targetHash
                var numCharsInCommon = 0;
                for (var i = 0; i < hash.length; i = (i + 1) | 0) {
                    if (hash[i] === targetHash[i]) {
                        numCharsInCommon = (numCharsInCommon + 1) | 0;
                    }
                }
                if (C_____CJS.Compiler.isPrime(numCharsInCommon)) {
                    throw new C_____CJS.ProgramException(C_____CJS.ProgramException.SEGFAULT);
                }
            }
            return this.getMemory(this.currentLine).toString$1();
        },
        getSha256: function (str) {
            return sha256(str);
            ;
        },
        getMemory: function (val) {
            if (this.memory.containsKey(val)) {
                return this.memory.get(val);
            }
            // Else return the line number that we are trying to grab
            return new C_____CJS.Int.$ctor1(val);
        },
        line: function (line) {
            this.line$1(line, false)},
        line$1: function (line, repeat) {
            var previousLine = this.currentLine;
            if (!repeat) {
                this.lines.add(line)}
            // Skip until we get a non-prime that is greater than four
            do {
                this.currentLine = (this.currentLine + 1) >>> 0} while (this.currentLine < 4 || C_____CJS.Compiler.isPrime$1(this.currentLine));
            // We'll never have two non-lines in a row, since no two primes appear consecutively (except less than 4)
            // Check if the line is a data entry line or an operation line
            if (line.charCodeAt(0) === 39) {
                this.memory.set(this.currentLine, new C_____CJS.Int.ctor(line))} else if (line.charCodeAt(0) === 34) {
                this.memory.set(this.currentLine, new C_____CJS.String(line))} else if (Bridge.referenceEquals(line, C_____CJS.ProgramException.SYNTAX_ERROR)) {
                // Check whether the last valid line is set to itself
                if (Bridge.is(this.getMemory(previousLine), C_____CJS.Int)) {
                    if (Bridge.cast(this.getMemory(previousLine), C_____CJS.Int).getValue() === previousLine) {
                        // Loop back to beginning and run all lines of code
                        this.currentLine = 0;
                        for (var i = 0; i < this.lines.getCount(); i = (i + 1) | 0) {
                            this.line$1(this.lines.getItem(i), true);
                        }
                    }
                }
            } else {
                // Operation line
                var reg = new System.Text.RegularExpressions.Regex.ctor("([0-9]+)([-+*/^% ])([0-9]+)");
                ;
                if (!reg.isMatch(line)) {
                    throw new C_____CJS.ProgramException(C_____CJS.ProgramException.SYNTAX_ERROR);
                }
                var match = reg.match(line);
                // [0-9]+ will always parse as an int
                var line1 = System.UInt32.parse(match.getGroups().get(1).getValue());
                ;
                var line2 = System.UInt32.parse(match.getGroups().get(3).getValue());
                ;
                var operation = match.getGroups().get(2).getValue().charCodeAt(0);
                ;
                switch (operation) {
                    case 43: 
                        this.memory.set(this.currentLine, this.getMemory(line1).plus(this.getMemory(line2)));
                        ;
                        break;
                    case 45: 
                        this.memory.set(this.currentLine, this.getMemory(line1).minus(this.getMemory(line2)));
                        ;
                        break;
                    case 42: 
                        this.memory.set(this.currentLine, this.getMemory(line1).asterisk(this.getMemory(line2)));
                        ;
                        break;
                    case 47: 
                        this.memory.set(this.currentLine, this.getMemory(line1).slash(this.getMemory(line2)));
                        ;
                        break;
                    case 94: 
                        this.memory.set(this.currentLine, this.getMemory(line1).carrot(this.getMemory(line2)));
                        ;
                        break;
                    case 37: 
                        this.memory.set(this.currentLine, this.getMemory(line1).percent(this.getMemory(line2)));
                        ;
                        break;
                }
            }
            // Check headers
            if (!Bridge.referenceEquals(this.getMemory(4).toString$1(), "C-----C")) {
                throw new C_____CJS.ProgramException(C_____CJS.ProgramException.SYNTAX_ERROR);
            }
        }
    });

    Bridge.define("C_____CJS.Data", {
        asterisk: function (other) {
            if (Bridge.is(other, C_____CJS.Int)) {
                return this.asterisk$1(Bridge.cast(other, C_____CJS.Int));
            } else {
                return this.asterisk$2(Bridge.cast(other, C_____CJS.String));
            }
        },
        carrot: function (other) {
            if (Bridge.is(other, C_____CJS.Int)) {
                return this.carrot$1(Bridge.cast(other, C_____CJS.Int));
            } else {
                return this.carrot$2(Bridge.cast(other, C_____CJS.String));
            }
        },
        minus: function (other) {
            if (Bridge.is(other, C_____CJS.Int)) {
                return this.minus$1(Bridge.cast(other, C_____CJS.Int));
            } else {
                return this.minus$2(Bridge.cast(other, C_____CJS.String));
            }
        },
        percent: function (other) {
            if (Bridge.is(other, C_____CJS.Int)) {
                return this.percent$1(Bridge.cast(other, C_____CJS.Int));
            } else {
                return this.percent$2(Bridge.cast(other, C_____CJS.String));
            }
        },
        plus: function (other) {
            if (Bridge.is(other, C_____CJS.Int)) {
                return this.plus$1(Bridge.cast(other, C_____CJS.Int));
            } else {
                return this.plus$2(Bridge.cast(other, C_____CJS.String));
            }
        },
        slash: function (other) {
            if (Bridge.is(other, C_____CJS.Int)) {
                return this.slash$1(Bridge.cast(other, C_____CJS.Int));
            } else {
                return this.slash$2(Bridge.cast(other, C_____CJS.String));
            }
        }
    });

    Bridge.define("C_____CJS.ProgramException", {
        inherits: [System.Exception],
        statics: {
            SYNTAX_ERROR: "¯\\_(ツ)_/¯",
            OPERATION_ERROR: "¯\\_(ツ)_/¯",
            DID_BAD: "¯\\_(ツ)_/¯",
            SEGFAULT: "Segmentation Fault"
        },
        ctor: function (message) {
            this.$initialize();
            System.Exception.ctor.call(this, message);
        }
    });

    Bridge.define("C_____CJS.Int", {
        inherits: [C_____CJS.Data],
        config: {
            properties: {
                Value: 0
            }
        },
        ctor: function (line) {
            this.$initialize();
            C_____CJS.Data.ctor.call(this);
            if (line.charCodeAt(0) !== 39 || line.charCodeAt(((line.length - 1) | 0)) !== 33) {
                throw new C_____CJS.ProgramException("Error 13");
            }
            line = line.substr(1, ((line.length - 2) | 0));
            var value = { };
            if (!System.UInt32.tryParse(line, value)) {
                throw new C_____CJS.ProgramException("Error 19");
            } else {
                this.setValue(value.v);
            }
        },
        $ctor1: function (value) {
            this.$initialize();
            C_____CJS.Data.ctor.call(this);
            this.setValue(value);
        },
        asterisk$2: function (other) {
            // Per specs: string2 concatenated with string representation of uint1
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), other.getValue(), this.toString$1(), String.fromCharCode(39)));
        },
        asterisk$1: function (other) {
            // Per specs: uint1 divided by uint2
            return new C_____CJS.Int.$ctor1(((Bridge.Int.div(this.getValue(), other.getValue())) >>> 0));
        },
        carrot$2: function (other) {
            // Per specs: string representation of uint2 concatenated with string1
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), this.toString$1(), other.getValue(), String.fromCharCode(39)));
        },
        carrot$1: function (other) {
            // Per specs: uint1 plus uint2
            return new C_____CJS.Int.$ctor1(((this.getValue() + other.getValue()) >>> 0));
        },
        minus$2: function (other) {
            var $t;
            // Per specs: (last uint1 characters of string2) reversed
            var charArray = ($t=other.getValue().substr(System.Int64.clip32(System.Int64(other.getValue().length).sub(System.Int64(this.getValue()))), ((this.getValue()) | 0)), System.String.toCharArray($t, 0, $t.length));
            charArray.reverse();
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), String.fromCharCode.apply(null, charArray), String.fromCharCode(39)));
        },
        minus$1: function (other) {
            // Per specs: uint1 times uint2
            return new C_____CJS.Int.$ctor1(((this.getValue() * other.getValue()) >>> 0));
        },
        percent$2: function (other) {
            // Per specs: first uint2 characters of string1
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), other.getValue().substr(0, ((this.getValue()) | 0)), String.fromCharCode(39)));
        },
        percent$1: function (other) {
            // Per specs: uint2 to the power of uint1
            return new C_____CJS.Int.$ctor1(Bridge.Int.clipu32(Math.pow(other.getValue(), this.getValue())));
        },
        plus$2: function (other) {
            // Per specs: last uint1 characters of string2
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), other.getValue().substr(System.Int64.clip32(System.Int64(other.getValue().length).sub(System.Int64(this.getValue()))), ((this.getValue()) | 0)), String.fromCharCode(39)));
        },
        plus$1: function (other) {
            // Per specs: uint2 minus uint1
            return new C_____CJS.Int.$ctor1(((other.getValue() - this.getValue()) >>> 0));
        },
        slash$2: function (other) {
            var $t;
            // Per specs: (first uint1 characters of string2) reversed
            var charArray = ($t=other.getValue().substr(0, ((this.getValue()) | 0)), System.String.toCharArray($t, 0, $t.length));
            charArray.reverse();
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), String.fromCharCode.apply(null, charArray), String.fromCharCode(39)));
        },
        slash$1: function (other) {
            // Per specs: uint2 mod uint1
            return new C_____CJS.Int.$ctor1(other.getValue() % this.getValue());
        },
        toString$1: function () {
            return this.getValue().toString();
        }
    });

    Bridge.define("C_____CJS.String", {
        inherits: [C_____CJS.Data],
        config: {
            properties: {
                Value: null
            }
        },
        ctor: function (line) {
            this.$initialize();
            C_____CJS.Data.ctor.call(this);
            if (line.charCodeAt(0) !== 34 || line.charCodeAt(((line.length - 1) | 0)) !== 39) {
                throw new C_____CJS.ProgramException(C_____CJS.ProgramException.SYNTAX_ERROR);
            }
            this.setValue(line.substr(1, ((line.length - 2) | 0)));
        },
        asterisk$2: function (other) {
            // Per specs: return string1
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), this.getValue(), String.fromCharCode(39)));
        },
        asterisk$1: function (other) {
            // Per specs: string1 concatenated with string representation of int2
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), this.getValue(), other.toString$1(), String.fromCharCode(39)));
        },
        carrot$2: function (other) {
            // Per specs: Characters of string2 and string1 alternated, until one string is depleted, then the rest of the non-depleted string
            var result = new (System.Collections.Generic.List$1(System.Char))();
            // Begin string
            result.add(34);
            for (var i = 0; i < Math.max(this.getValue().length, other.toString$1().length); i = (i + 1) | 0) {
                if (i < other.toString$1().length) {
                    result.add(other.toString$1().charCodeAt(i));
                }
                if (i < this.getValue().length) {
                    result.add(this.getValue().charCodeAt(i));
                }
            }
            // End string
            result.add(39);
            return new C_____CJS.String(String.fromCharCode.apply(null, result.toArray()));
        },
        carrot$1: function (other) {
            var $t;
            // Per specs: last int2 characters of (string1 reversed)
            var charArray = ($t=this.getValue(), System.String.toCharArray($t, 0, $t.length));
            charArray.reverse();
            var reversedString = String.fromCharCode.apply(null, charArray);
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), reversedString.substr(System.Int64.clip32(System.Int64(this.getValue().length).sub(System.Int64(other.getValue()))), ((other.getValue()) | 0)), String.fromCharCode(39)));
        },
        minus$2: function (other) {
            // Per specs: Concatenation of string1 and string2
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), this.getValue(), other.toString$1(), String.fromCharCode(39)));
        },
        minus$1: function (other) {
            // Per specs: String representation of int2 concatenated with string1
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), other.toString$1(), this.getValue(), String.fromCharCode(39)));
        },
        percent$2: function (other) {
            // Per specs: Characters of string1 and string2 alternated, until one string is depleted, then the rest of the non-depleted string
            var result = new (System.Collections.Generic.List$1(System.Char))();
            // Begin string
            result.add(34);
            for (var i = 0; i < Math.max(this.getValue().length, other.toString$1().length); i = (i + 1) | 0) {
                if (i < this.getValue().length) {
                    result.add(this.getValue().charCodeAt(i));
                }
                if (i < other.toString$1().length) {
                    result.add(other.toString$1().charCodeAt(i));
                }
            }
            // End string
            result.add(39);
            return new C_____CJS.String(String.fromCharCode.apply(null, result.toArray()));
        },
        percent$1: function (other) {
            // Per specs: First int2 characters of string1
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), this.getValue().substr(0, ((other.getValue()) | 0)), String.fromCharCode(39)));
        },
        plus$2: function (other) {
            // Per specs: string2
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), other.toString$1(), String.fromCharCode(39)));
        },
        plus$1: function (other) {
            // Per specs: Last int2 characters of string1
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), this.getValue().substr(System.Int64.clip32(System.Int64(this.getValue().length).sub(System.Int64(other.getValue()))), ((other.getValue()) | 0)), String.fromCharCode(39)));
        },
        slash$2: function (other) {
            // Per specs: Concatenation of string2 and string1
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), other.toString$1(), this.getValue(), String.fromCharCode(39)));
        },
        slash$1: function (other) {
            var $t;
            // Per specs: First int2 characters of (string1 reversed)
            var charArray = ($t=this.getValue(), System.String.toCharArray($t, 0, $t.length));
            charArray.reverse();
            return new C_____CJS.String(System.String.concat(String.fromCharCode(34), String.fromCharCode.apply(null, charArray).substr(0, ((other.getValue()) | 0)), String.fromCharCode(39)));
        },
        toString$1: function () {
            return this.getValue();
        }
    });
});
