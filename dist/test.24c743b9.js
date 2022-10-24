"use strict";
function _typeof(obj1) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj1);
}
(function(f) {
    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") module.exports = f();
    else if (typeof define === "function" && define.amd) define([], f);
    else {
        var g;
        if (typeof window !== "undefined") g = window;
        else if (typeof global !== "undefined") g = global;
        else if (typeof self !== "undefined") g = self;
        else g = this;
        g.dns = f();
    }
})(function() {
    var define, module, exports;
    return (function() {
        function r1(e, n1, t) {
            function o(i, f) {
                if (!n1[i]) {
                    if (!e[i]) {
                        var c = "function" == typeof require && undefined;
                        if (!f && c) return c(i, !0);
                        if (u) return u(i, !0);
                        var a = new Error("Cannot find module '" + i + "'");
                        throw a.code = "MODULE_NOT_FOUND", a;
                    }
                    var p = n1[i] = {
                        exports: {}
                    };
                    e[i][0].call(p.exports, function(r) {
                        var n = e[i][1][r];
                        return o(n || r);
                    }, p, p.exports, r1, e, n1, t);
                }
                return n1[i].exports;
            }
            for(var u = "function" == typeof require && undefined, i1 = 0; i1 < t.length; i1++)o(t[i1]);
            return o;
        }
        return r1;
    })()({
        1: [
            function(require, module, exports) {},
            {}
        ],
        2: [
            function(require, module, exports) {
                "use strict";
                var _dns = _interopRequireDefault(require("dns"));
                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule ? obj : {
                        "default": obj
                    };
                }
            },
            {
                "dns": 1
            }
        ]
    }, {}, [
        2
    ])(2);
});

//# sourceMappingURL=test.24c743b9.js.map
