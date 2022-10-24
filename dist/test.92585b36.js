"use strict";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ 
    _regeneratorRuntime = function _regeneratorRuntime() {
        return exports;
    };
    var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err1) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn1, outerFn, self1, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context1 = new Context(tryLocsList || []);
        return generator._invoke = function(innerFn, self, context) {
            var state = "suspendedStart";
            return function(method, arg) {
                if ("executing" === state) throw new Error("Generator is already running");
                if ("completed" === state) {
                    if ("throw" === method) throw arg;
                    return doneResult();
                }
                for(context.method = method, context.arg = arg;;){
                    var delegate = context.delegate;
                    if (delegate) {
                        var delegateResult = maybeInvokeDelegate(delegate, context);
                        if (delegateResult) {
                            if (delegateResult === ContinueSentinel) continue;
                            return delegateResult;
                        }
                    }
                    if ("next" === context.method) context.sent = context._sent = context.arg;
                    else if ("throw" === context.method) {
                        if ("suspendedStart" === state) throw state = "completed", context.arg;
                        context.dispatchException(context.arg);
                    } else "return" === context.method && context.abrupt("return", context.arg);
                    state = "executing";
                    var record = tryCatch(innerFn, self, context);
                    if ("normal" === record.type) {
                        if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                        return {
                            value: record.arg,
                            done: context.done
                        };
                    }
                    "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
                }
            };
        }(innerFn1, self1, context1), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value1 = result.value;
                return value1 && "object" == _typeof(value1) && hasOwn.call(value1, "__await") ? PromiseImpl.resolve(value1.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value1).then(function(unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        this._invoke = function(method, arg) {
            function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                });
            }
            return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];
        if (undefined === method) {
            if (context.delegate = null, "throw" === context.method) {
                if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
                context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
            }
            return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next1 = function next() {
                    for(; ++i < iterable.length;){
                        if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    }
                    return next.value = undefined, next.done = !0, next;
                };
                return next1.next = next1;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function(arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
    }), define(Gp, "toString", function() {
        return "[object Generator]";
    }), exports.keys = function(object) {
        var keys = [];
        for(var key1 in object)keys.push(key1);
        return keys.reverse(), function next() {
            for(; keys.length;){
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for(var name in this)"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it["return"] != null) it["return"]();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _typeof(obj1) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj1);
}
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
(function(modules, entry, mainEntry, parcelRequireName, globalName) {
    /* eslint-disable no-undef */ var globalObject = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
    /* eslint-enable no-undef */ // Save the require from previous bundle to this closure if any
    var previousRequire = typeof globalObject[parcelRequireName] === "function" && globalObject[parcelRequireName];
    var cache = previousRequire.cache || {}; // Do not use `require` to prevent Webpack from trying to bundle this call
    var nodeRequire = typeof module !== "undefined" && typeof module.require === "function" && module.require.bind(module);
    function newRequire(name, jumped) {
        if (!cache[name]) {
            if (!modules[name]) {
                // if we cannot find the module within our internal map or
                // cache jump to the current global require ie. the last bundle
                // that was added to the page.
                var currentRequire = typeof globalObject[parcelRequireName] === "function" && globalObject[parcelRequireName];
                if (!jumped && currentRequire) return currentRequire(name, true);
                 // If there are other bundles on this page the require from the
                // previous one is saved to 'previousRequire'. Repeat this as
                // many times as there are bundles until the module is found or
                // we exhaust the require chain.
                if (previousRequire) return previousRequire(name, true);
                 // Try the node require function if it exists.
                if (nodeRequire && typeof name === "string") return nodeRequire(name);
                var err = new Error("Cannot find module '" + name + "'");
                err.code = "MODULE_NOT_FOUND";
                throw err;
            }
            localRequire.resolve = resolve;
            localRequire.cache = {};
            var module = cache[name] = new newRequire.Module(name);
            modules[name][0].call(module.exports, localRequire, module, module.exports, this);
        }
        return cache[name].exports;
        function localRequire(x) {
            var res = localRequire.resolve(x);
            return res === false ? {} : newRequire(res);
        }
        function resolve(x) {
            var id = modules[name][1][x];
            return id != null ? id : x;
        }
    }
    function Module(moduleName) {
        this.id = moduleName;
        this.bundle = newRequire;
        this.exports = {};
    }
    newRequire.isParcelRequire = true;
    newRequire.Module = Module;
    newRequire.modules = modules;
    newRequire.cache = cache;
    newRequire.parent = previousRequire;
    newRequire.register = function(id, exports) {
        modules[id] = [
            function(require, module) {
                module.exports = exports;
            },
            {}
        ];
    };
    Object.defineProperty(newRequire, "root", {
        get: function get() {
            return globalObject[parcelRequireName];
        }
    });
    globalObject[parcelRequireName] = newRequire;
    for(var i = 0; i < entry.length; i++)newRequire(entry[i]);
    if (mainEntry) {
        // Expose entry point to Node, AMD or browser globals
        // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
        var mainExports = newRequire(mainEntry); // CommonJS
        if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") module.exports = mainExports; // RequireJS
        else if (typeof define === "function" && define.amd) define(function() {
            return mainExports;
        }); // <script>
        else if (globalName) this[globalName] = mainExports;
    }
})({
    "jYB4h": [
        function(require, module, exports) {
            "use strict";
            var global = arguments[3];
            var HMR_HOST = null;
            var HMR_PORT = null;
            var HMR_SECURE = false;
            var HMR_ENV_HASH = "d6ea1d42532a7575";
            module.bundle.HMR_BUNDLE_ID = "080391e143de529d";
            /* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, importScripts */ /*::
    import type {
    HMRAsset,
    HMRMessage,
    } from '@parcel/reporter-dev-server/src/HMRServer.js';
    interface ParcelRequire {
    (string): mixed;
    cache: {|[string]: ParcelModule|};
    hotData: mixed;
    Module: any;
    parent: ?ParcelRequire;
    isParcelRequire: true;
    modules: {|[string]: [Function, {|[string]: string|}]|};
    HMR_BUNDLE_ID: string;
    root: ParcelRequire;
    }
    interface ParcelModule {
    hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
    |};
    }
    interface ExtensionContext {
    runtime: {|
    reload(): void,
    |};
    }
    declare var module: {bundle: ParcelRequire, ...};
    declare var HMR_HOST: string;
    declare var HMR_PORT: string;
    declare var HMR_ENV_HASH: string;
    declare var HMR_SECURE: boolean;
    declare var chrome: ExtensionContext;
    declare var browser: ExtensionContext;
    */ var OVERLAY_ID = "__parcel__error__overlay__";
            var OldModule = module.bundle.Module;
            function Module(moduleName) {
                OldModule.call(this, moduleName);
                this.hot = {
                    data: module.bundle.hotData,
                    _acceptCallbacks: [],
                    _disposeCallbacks: [],
                    accept: function accept(fn) {
                        this._acceptCallbacks.push(fn || function() {});
                    },
                    dispose: function dispose(fn) {
                        this._disposeCallbacks.push(fn);
                    }
                };
                module.bundle.hotData = undefined;
            }
            module.bundle.Module = Module;
            var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
            function getHostname() {
                return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
            }
            function getPort() {
                return HMR_PORT || location.port;
            } // eslint-disable-next-line no-redeclare
            var parent = module.bundle.parent;
            if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
                var hostname = getHostname();
                var port = getPort();
                var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
                var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Safari doesn't support sourceURL in error stacks.
                // eval may also be disabled via CSP, so do a quick check.
                var supportsSourceURL = false;
                try {
                    (0, eval)('throw new Error("test"); //# sourceURL=test.js');
                } catch (err2) {
                    supportsSourceURL = err2.stack.includes("test.js");
                } // $FlowFixMe
                ws.onmessage = /*#__PURE__*/ function() {
                    var _ref = _asyncToGenerator(/*#__PURE__*/ _regeneratorRuntime().mark(function _callee(event) {
                        var data, assets, handled, i, id, ext, _iterator, _step, ansiDiagnostic, stack, overlay;
                        return _regeneratorRuntime().wrap(function _callee$(_context) {
                            while(true)switch(_context.prev = _context.next){
                                case 0:
                                    checkedAssets = {} /*: {|[string]: boolean|} */ ;
                                    acceptedAssets = {} /*: {|[string]: boolean|} */ ;
                                    assetsToAccept = [];
                                    data = JSON.parse(event.data);
                                    if (!(data.type === "update")) {
                                        _context.next = 17;
                                        break;
                                    }
                                    // Remove error overlay if there is one
                                    if (typeof document !== "undefined") removeErrorOverlay();
                                    assets = data.assets.filter(function(asset) {
                                        return asset.envHash === HMR_ENV_HASH;
                                    }); // Handle HMR Update
                                    handled = assets.every(function(asset) {
                                        return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
                                    });
                                    if (!handled) {
                                        _context.next = 16;
                                        break;
                                    }
                                    console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                                    if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                                    _context.next = 13;
                                    return hmrApplyUpdates(assets);
                                case 13:
                                    for(i = 0; i < assetsToAccept.length; i++){
                                        id = assetsToAccept[i][1];
                                        if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                                    }
                                    _context.next = 17;
                                    break;
                                case 16:
                                    if ("reload" in location) location.reload();
                                    else {
                                        // Web extension context
                                        ext = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
                                        if (ext && ext.runtime && ext.runtime.reload) ext.runtime.reload();
                                    }
                                case 17:
                                    if (data.type === "error") {
                                        // Log parcel errors to console
                                        _iterator = _createForOfIteratorHelper(data.diagnostics.ansi);
                                        try {
                                            for(_iterator.s(); !(_step = _iterator.n()).done;){
                                                ansiDiagnostic = _step.value;
                                                stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                                                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
                                            }
                                        } catch (err) {
                                            _iterator.e(err);
                                        } finally{
                                            _iterator.f();
                                        }
                                        if (typeof document !== "undefined") {
                                            // Render the fancy html overlay
                                            removeErrorOverlay();
                                            overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                                            document.body.appendChild(overlay);
                                        }
                                    }
                                case 18:
                                case "end":
                                    return _context.stop();
                            }
                        }, _callee);
                    }));
                    return function(_x) {
                        return _ref.apply(this, arguments);
                    };
                }();
                ws.onerror = function(e) {
                    console.error(e.message);
                };
                ws.onclose = function() {
                    console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
                };
            }
            function removeErrorOverlay() {
                var overlay = document.getElementById(OVERLAY_ID);
                if (overlay) {
                    overlay.remove();
                    console.log("[parcel] \u2728 Error resolved");
                }
            }
            function createErrorOverlay(diagnostics) {
                var overlay = document.createElement("div");
                overlay.id = OVERLAY_ID;
                var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
                var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
                try {
                    for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
                        var diagnostic = _step2.value;
                        var stack = diagnostic.frames.length ? diagnostic.frames.reduce(function(p, frame) {
                            return "".concat(p, '\n<a href="/__parcel_launch_editor?file=').concat(encodeURIComponent(frame.location), '" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">').concat(frame.location, "</a>\n").concat(frame.code);
                        }, "") : diagnostic.stack;
                        errorHTML += '\n      <div>\n        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">\n          \uD83D\uDEA8 '.concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                            return "<div>\uD83D\uDCA1 " + hint + "</div>";
                        }).join(""), "\n        </div>\n        ").concat(diagnostic.documentation ? '<div>\uD83D\uDCDD <a style="color: violet" href="'.concat(diagnostic.documentation, '" target="_blank">Learn more</a></div>') : "", "\n      </div>\n    ");
                    }
                } catch (err) {
                    _iterator2.e(err);
                } finally{
                    _iterator2.f();
                }
                errorHTML += "</div>";
                overlay.innerHTML = errorHTML;
                return overlay;
            }
            function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
                var modules = bundle.modules;
                if (!modules) return [];
                var parents = [];
                var k, d, dep;
                for(k in modules)for(d in modules[k][1]){
                    dep = modules[k][1][d];
                    if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
                        bundle,
                        k
                    ]);
                }
                if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
                return parents;
            }
            function updateLink(link) {
                var newLink = link.cloneNode();
                newLink.onload = function() {
                    if (link.parentNode !== null) link.parentNode.removeChild(link);
                };
                newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
                link.parentNode.insertBefore(newLink, link.nextSibling);
            }
            var cssTimeout = null;
            function reloadCSS() {
                if (cssTimeout) return;
                cssTimeout = setTimeout(function() {
                    var links = document.querySelectorAll('link[rel="stylesheet"]');
                    for(var i = 0; i < links.length; i++){
                        // $FlowFixMe[incompatible-type]
                        var href = links[i].getAttribute("href");
                        var hostname = getHostname();
                        var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
                        var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
                        if (!absolute) updateLink(links[i]);
                    }
                    cssTimeout = null;
                }, 50);
            }
            function hmrApplyUpdates(_x2) {
                return _hmrApplyUpdates.apply(this, arguments);
            }
            function _hmrApplyUpdates() {
                _hmrApplyUpdates = _asyncToGenerator(/*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(assets) {
                    var scriptsToRemove, promises;
                    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                        while(true)switch(_context2.prev = _context2.next){
                            case 0:
                                global.parcelHotUpdate = Object.create(null);
                                _context2.prev = 1;
                                if (supportsSourceURL) {
                                    _context2.next = 7;
                                    break;
                                }
                                promises = assets.map(function(asset) {
                                    if (asset.type === "js") {
                                        if (typeof document !== "undefined") {
                                            var script = document.createElement("script");
                                            script.src = asset.url;
                                            return new Promise(function(resolve, reject) {
                                                var _document$head;
                                                script.onload = function() {
                                                    return resolve(script);
                                                };
                                                script.onerror = reject;
                                                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
                                            });
                                        } else if (typeof importScripts === "function") return new Promise(function(resolve, reject) {
                                            try {
                                                importScripts(asset.url);
                                            } catch (err) {
                                                reject(err);
                                            }
                                        });
                                    }
                                });
                                _context2.next = 6;
                                return Promise.all(promises);
                            case 6:
                                scriptsToRemove = _context2.sent;
                            case 7:
                                assets.forEach(function(asset) {
                                    hmrApply(module.bundle.root, asset);
                                });
                            case 8:
                                _context2.prev = 8;
                                delete global.parcelHotUpdate;
                                if (scriptsToRemove) scriptsToRemove.forEach(function(script) {
                                    if (script) {
                                        var _document$head2;
                                        (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
                                    }
                                });
                                return _context2.finish(8);
                            case 12:
                            case "end":
                                return _context2.stop();
                        }
                    }, _callee2, null, [
                        [
                            1,
                            ,
                            8,
                            12
                        ]
                    ]);
                }));
                return _hmrApplyUpdates.apply(this, arguments);
            }
            function hmrApply(bundle, asset) {
                var modules = bundle.modules;
                if (!modules) return;
                if (asset.type === "css") reloadCSS();
                else if (asset.type === "js") {
                    var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
                    if (deps) {
                        if (modules[asset.id]) {
                            // Remove dependencies that are removed and will become orphaned.
                            // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                            var oldDeps = modules[asset.id][1];
                            for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                                var id = oldDeps[dep];
                                var parents = getParents(module.bundle.root, id);
                                if (parents.length === 1) hmrDelete(module.bundle.root, id);
                            }
                        }
                        if (supportsSourceURL) // support for source maps is better with eval.
                        (0, eval)(asset.output);
                        var fn = global.parcelHotUpdate[asset.id];
                        modules[asset.id] = [
                            fn,
                            deps
                        ];
                    } else if (bundle.parent) hmrApply(bundle.parent, asset);
                }
            }
            function hmrDelete(bundle, id1) {
                var modules = bundle.modules;
                if (!modules) return;
                if (modules[id1]) {
                    // Collect dependencies that will become orphaned when this module is deleted.
                    var deps = modules[id1][1];
                    var orphans = [];
                    for(var dep in deps){
                        var parents = getParents(module.bundle.root, deps[dep]);
                        if (parents.length === 1) orphans.push(deps[dep]);
                    } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
                    delete modules[id1];
                    delete bundle.cache[id1]; // Now delete the orphans.
                    orphans.forEach(function(id) {
                        hmrDelete(module.bundle.root, id);
                    });
                } else if (bundle.parent) hmrDelete(bundle.parent, id1);
            }
            function hmrAcceptCheck(bundle, id, depsByBundle) {
                if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true; // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
                var parents = getParents(module.bundle.root, id);
                var accepted = false;
                while(parents.length > 0){
                    var v = parents.shift();
                    var a = hmrAcceptCheckOne(v[0], v[1], null);
                    if (a) accepted = true;
                    else {
                        // Otherwise, queue the parents in the next level upward.
                        var p = getParents(module.bundle.root, v[1]);
                        if (p.length === 0) {
                            // If there are no parents, then we've reached an entry without accepting. Reload.
                            accepted = false;
                            break;
                        }
                        parents.push.apply(parents, _toConsumableArray(p));
                    }
                }
                return accepted;
            }
            function hmrAcceptCheckOne(bundle, id, depsByBundle) {
                var modules = bundle.modules;
                if (!modules) return;
                if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
                    // If we reached the root bundle without finding where the asset should go,
                    // there's nothing to do. Mark as "accepted" so we don't reload the page.
                    if (!bundle.parent) return true;
                    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
                }
                if (checkedAssets[id]) return true;
                checkedAssets[id] = true;
                var cached = bundle.cache[id];
                assetsToAccept.push([
                    bundle,
                    id
                ]);
                if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
            }
            function hmrAcceptRun(bundle, id) {
                var cached = bundle.cache[id];
                bundle.hotData = {};
                if (cached && cached.hot) cached.hot.data = bundle.hotData;
                if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
                    cb(bundle.hotData);
                });
                delete bundle.cache[id];
                bundle(id);
                cached = bundle.cache[id];
                if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
                    var assetsToAlsoAccept = cb(function() {
                        return getParents(module.bundle.root, id);
                    });
                    if (assetsToAlsoAccept && assetsToAccept.length) assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
                });
                acceptedAssets[id] = true;
            }
        },
        {}
    ],
    "9xTr6": [
        function(require, module, exports) {
            "use strict";
            var _dns = _interopRequireDefault(require("dns"));
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    "default": obj
                };
            }
            window.dns = _dns["default"];
        },
        {
            "dns": "h9HYz"
        }
    ],
    "h9HYz": [
        function(require, module, exports) {
            "use strict";
        },
        {}
    ]
}, [
    "jYB4h",
    "9xTr6"
], "9xTr6", "parcelRequireef27");

//# sourceMappingURL=test.92585b36.js.map
