/*!
 * Socket.IO v4.0.1
 * (c) 2014-2021 Guillermo Rauch
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd)
    define([], factory);
  else if (typeof exports === 'object')
    exports["io"] = factory();
  else
    root["io"] = factory();
})(self, function () {
  return /******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
        /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
        /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
      /******/
}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
        /******/
}
      /******/
};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function (exports) {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
      /******/
};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function (value, mode) {
/******/ 		if (mode & 1) value = __webpack_require__(value);
/******/ 		if (mode & 8) return value;
/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
      /******/
};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
      /******/
};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./build/index.js");
    /******/
})
/************************************************************************/
/******/({

/***/ "./build/index.js":
/*!************************!*\
  !*** ./build/index.js ***!
  \************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";


        function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.Socket = exports.io = exports.Manager = exports.protocol = void 0;

        var url_1 = __webpack_require__(/*! ./url */ "./build/url.js");

        var manager_1 = __webpack_require__(/*! ./manager */ "./build/manager.js");

        var socket_1 = __webpack_require__(/*! ./socket */ "./build/socket.js");

        Object.defineProperty(exports, "Socket", {
          enumerable: true,
          get: function get() {
            return socket_1.Socket;
          }
        });

        var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client");
        /**
         * Module exports.
         */


        module.exports = exports = lookup;
        /**
         * Managers cache.
         */

        var cache = exports.managers = {};

        function lookup(uri, opts) {
          if (_typeof(uri) === "object") {
            opts = uri;
            uri = undefined;
          }

          opts = opts || {};
          var parsed = url_1.url(uri, opts.path);
          var source = parsed.source;
          var id = parsed.id;
          var path = parsed.path;
          var sameNamespace = cache[id] && path in cache[id]["nsps"];
          var newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
          var io;

          if (newConnection) {
            debug("ignoring socket cache for %s", source);
            io = new manager_1.Manager(source, opts);
          } else {
            if (!cache[id]) {
              debug("new io instance for %s", source);
              cache[id] = new manager_1.Manager(source, opts);
            }

            io = cache[id];
          }

          if (parsed.query && !opts.query) {
            opts.query = parsed.queryKey;
          }

          return io.socket(parsed.path, opts);
        }

        exports.io = lookup;
        /**
         * Protocol version.
         *
         * @public
         */

        var socket_io_parser_1 = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/dist/index.js");

        Object.defineProperty(exports, "protocol", {
          enumerable: true,
          get: function get() {
            return socket_io_parser_1.protocol;
          }
        });
        /**
         * `connect`.
         *
         * @param {String} uri
         * @public
         */

        exports.connect = lookup;
        /**
         * Expose constructors for standalone build.
         *
         * @public
         */

        var manager_2 = __webpack_require__(/*! ./manager */ "./build/manager.js");

        Object.defineProperty(exports, "Manager", {
          enumerable: true,
          get: function get() {
            return manager_2.Manager;
          }
        });
        exports["default"] = lookup;

        /***/
}),

/***/ "./build/manager.js":
/*!**************************!*\
  !*** ./build/manager.js ***!
  \**************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";


        function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

        function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

        function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

        function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

        function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

        function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true; } catch (e) { return false; } }

        function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.Manager = void 0;

        var eio = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/lib/index.js");

        var socket_1 = __webpack_require__(/*! ./socket */ "./build/socket.js");

        var parser = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/dist/index.js");

        var on_1 = __webpack_require__(/*! ./on */ "./build/on.js");

        var Backoff = __webpack_require__(/*! backo2 */ "./node_modules/backo2/index.js");

        var typed_events_1 = __webpack_require__(/*! ./typed-events */ "./build/typed-events.js");

        var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client:manager");

        var Manager = /*#__PURE__*/function (_typed_events_1$Stric) {
          _inherits(Manager, _typed_events_1$Stric);

          var _super = _createSuper(Manager);

          function Manager(uri, opts) {
            var _this;

            _classCallCheck(this, Manager);

            _this = _super.call(this);
            _this.nsps = {};
            _this.subs = [];

            if (uri && "object" === _typeof(uri)) {
              opts = uri;
              uri = undefined;
            }

            opts = opts || {};
            opts.path = opts.path || "/socket.io";
            _this.opts = opts;

            _this.reconnection(opts.reconnection !== false);

            _this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);

            _this.reconnectionDelay(opts.reconnectionDelay || 1000);

            _this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);

            _this.randomizationFactor(opts.randomizationFactor || 0.5);

            _this.backoff = new Backoff({
              min: _this.reconnectionDelay(),
              max: _this.reconnectionDelayMax(),
              jitter: _this.randomizationFactor()
            });

            _this.timeout(null == opts.timeout ? 20000 : opts.timeout);

            _this._readyState = "closed";
            _this.uri = uri;

            var _parser = opts.parser || parser;

            _this.encoder = new _parser.Encoder();
            _this.decoder = new _parser.Decoder();
            _this._autoConnect = opts.autoConnect !== false;
            if (_this._autoConnect) _this.open();
            return _this;
          }

          _createClass(Manager, [{
            key: "reconnection",
            value: function reconnection(v) {
              if (!arguments.length) return this._reconnection;
              this._reconnection = !!v;
              return this;
            }
          }, {
            key: "reconnectionAttempts",
            value: function reconnectionAttempts(v) {
              if (v === undefined) return this._reconnectionAttempts;
              this._reconnectionAttempts = v;
              return this;
            }
          }, {
            key: "reconnectionDelay",
            value: function reconnectionDelay(v) {
              var _a;

              if (v === undefined) return this._reconnectionDelay;
              this._reconnectionDelay = v;
              (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
              return this;
            }
          }, {
            key: "randomizationFactor",
            value: function randomizationFactor(v) {
              var _a;

              if (v === undefined) return this._randomizationFactor;
              this._randomizationFactor = v;
              (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
              return this;
            }
          }, {
            key: "reconnectionDelayMax",
            value: function reconnectionDelayMax(v) {
              var _a;

              if (v === undefined) return this._reconnectionDelayMax;
              this._reconnectionDelayMax = v;
              (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
              return this;
            }
          }, {
            key: "timeout",
            value: function timeout(v) {
              if (!arguments.length) return this._timeout;
              this._timeout = v;
              return this;
            }
            /**
             * Starts trying to reconnect if reconnection is enabled and we have not
             * started reconnecting yet
             *
             * @private
             */

          }, {
            key: "maybeReconnectOnOpen",
            value: function maybeReconnectOnOpen() {
              // Only try to reconnect if it's the first time we're connecting
              if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
                // keeps reconnection from firing twice for the same reconnection loop
                this.reconnect();
              }
            }
            /**
             * Sets the current transport `socket`.
             *
             * @param {Function} fn - optional, callback
             * @return self
             * @public
             */

          }, {
            key: "open",
            value: function open(fn) {
              var _this2 = this;

              debug("readyState %s", this._readyState);
              if (~this._readyState.indexOf("open")) return this;
              debug("opening %s", this.uri);
              this.engine = eio(this.uri, this.opts);
              var socket = this.engine;
              var self = this;
              this._readyState = "opening";
              this.skipReconnect = false; // emit `open`

              var openSubDestroy = on_1.on(socket, "open", function () {
                self.onopen();
                fn && fn();
              }); // emit `error`

              var errorSub = on_1.on(socket, "error", function (err) {
                debug("error");
                self.cleanup();
                self._readyState = "closed";

                _this2.emitReserved("error", err);

                if (fn) {
                  fn(err);
                } else {
                  // Only do this if there is no fn to handle the error
                  self.maybeReconnectOnOpen();
                }
              });

              if (false !== this._timeout) {
                var timeout = this._timeout;
                debug("connect attempt will timeout after %d", timeout);

                if (timeout === 0) {
                  openSubDestroy(); // prevents a race condition with the 'open' event
                } // set timer


                var timer = setTimeout(function () {
                  debug("connect attempt timed out after %d", timeout);
                  openSubDestroy();
                  socket.close();
                  socket.emit("error", new Error("timeout"));
                }, timeout);

                if (this.opts.autoUnref) {
                  timer.unref();
                }

                this.subs.push(function subDestroy() {
                  clearTimeout(timer);
                });
              }

              this.subs.push(openSubDestroy);
              this.subs.push(errorSub);
              return this;
            }
            /**
             * Alias for open()
             *
             * @return self
             * @public
             */

          }, {
            key: "connect",
            value: function connect(fn) {
              return this.open(fn);
            }
            /**
             * Called upon transport open.
             *
             * @private
             */

          }, {
            key: "onopen",
            value: function onopen() {
              debug("open"); // clear old subs

              this.cleanup(); // mark as open

              this._readyState = "open";
              this.emitReserved("open"); // add new subs

              var socket = this.engine;
              this.subs.push(on_1.on(socket, "ping", this.onping.bind(this)), on_1.on(socket, "data", this.ondata.bind(this)), on_1.on(socket, "error", this.onerror.bind(this)), on_1.on(socket, "close", this.onclose.bind(this)), on_1.on(this.decoder, "decoded", this.ondecoded.bind(this)));
            }
            /**
             * Called upon a ping.
             *
             * @private
             */

          }, {
            key: "onping",
            value: function onping() {
              this.emitReserved("ping");
            }
            /**
             * Called with data.
             *
             * @private
             */

          }, {
            key: "ondata",
            value: function ondata(data) {
              this.decoder.add(data);
            }
            /**
             * Called when parser fully decodes a packet.
             *
             * @private
             */

          }, {
            key: "ondecoded",
            value: function ondecoded(packet) {
              this.emitReserved("packet", packet);
            }
            /**
             * Called upon socket error.
             *
             * @private
             */

          }, {
            key: "onerror",
            value: function onerror(err) {
              debug("error", err);
              this.emitReserved("error", err);
            }
            /**
             * Creates a new socket for the given `nsp`.
             *
             * @return {Socket}
             * @public
             */

          }, {
            key: "socket",
            value: function socket(nsp, opts) {
              var socket = this.nsps[nsp];

              if (!socket) {
                socket = new socket_1.Socket(this, nsp, opts);
                this.nsps[nsp] = socket;
              }

              return socket;
            }
            /**
             * Called upon a socket close.
             *
             * @param socket
             * @private
             */

          }, {
            key: "_destroy",
            value: function _destroy(socket) {
              var nsps = Object.keys(this.nsps);

              for (var _i = 0, _nsps = nsps; _i < _nsps.length; _i++) {
                var nsp = _nsps[_i];
                var _socket = this.nsps[nsp];

                if (_socket.active) {
                  debug("socket %s is still active, skipping close", nsp);
                  return;
                }
              }

              this._close();
            }
            /**
             * Writes a packet.
             *
             * @param packet
             * @private
             */

          }, {
            key: "_packet",
            value: function _packet(packet) {
              debug("writing packet %j", packet);
              var encodedPackets = this.encoder.encode(packet);

              for (var i = 0; i < encodedPackets.length; i++) {
                this.engine.write(encodedPackets[i], packet.options);
              }
            }
            /**
             * Clean up transport subscriptions and packet buffer.
             *
             * @private
             */

          }, {
            key: "cleanup",
            value: function cleanup() {
              debug("cleanup");
              this.subs.forEach(function (subDestroy) {
                return subDestroy();
              });
              this.subs.length = 0;
              this.decoder.destroy();
            }
            /**
             * Close the current socket.
             *
             * @private
             */

          }, {
            key: "_close",
            value: function _close() {
              debug("disconnect");
              this.skipReconnect = true;
              this._reconnecting = false;

              if ("opening" === this._readyState) {
                // `onclose` will not fire because
                // an open event never happened
                this.cleanup();
              }

              this.backoff.reset();
              this._readyState = "closed";
              if (this.engine) this.engine.close();
            }
            /**
             * Alias for close()
             *
             * @private
             */

          }, {
            key: "disconnect",
            value: function disconnect() {
              return this._close();
            }
            /**
             * Called upon engine close.
             *
             * @private
             */

          }, {
            key: "onclose",
            value: function onclose(reason) {
              debug("onclose");
              this.cleanup();
              this.backoff.reset();
              this._readyState = "closed";
              this.emitReserved("close", reason);

              if (this._reconnection && !this.skipReconnect) {
                this.reconnect();
              }
            }
            /**
             * Attempt a reconnection.
             *
             * @private
             */

          }, {
            key: "reconnect",
            value: function reconnect() {
              var _this3 = this;

              if (this._reconnecting || this.skipReconnect) return this;
              var self = this;

              if (this.backoff.attempts >= this._reconnectionAttempts) {
                debug("reconnect failed");
                this.backoff.reset();
                this.emitReserved("reconnect_failed");
                this._reconnecting = false;
              } else {
                var delay = this.backoff.duration();
                debug("will wait %dms before reconnect attempt", delay);
                this._reconnecting = true;
                var timer = setTimeout(function () {
                  if (self.skipReconnect) return;
                  debug("attempting reconnect");

                  _this3.emitReserved("reconnect_attempt", self.backoff.attempts); // check again for the case socket closed in above events


                  if (self.skipReconnect) return;
                  self.open(function (err) {
                    if (err) {
                      debug("reconnect attempt error");
                      self._reconnecting = false;
                      self.reconnect();

                      _this3.emitReserved("reconnect_error", err);
                    } else {
                      debug("reconnect success");
                      self.onreconnect();
                    }
                  });
                }, delay);

                if (this.opts.autoUnref) {
                  timer.unref();
                }

                this.subs.push(function subDestroy() {
                  clearTimeout(timer);
                });
              }
            }
            /**
             * Called upon successful reconnect.
             *
             * @private
             */

          }, {
            key: "onreconnect",
            value: function onreconnect() {
              var attempt = this.backoff.attempts;
              this._reconnecting = false;
              this.backoff.reset();
              this.emitReserved("reconnect", attempt);
            }
          }]);

          return Manager;
        }(typed_events_1.StrictEventEmitter);

        exports.Manager = Manager;

        /***/
}),

/***/ "./build/on.js":
/*!*********************!*\
  !*** ./build/on.js ***!
  \*********************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.on = void 0;

        function on(obj, ev, fn) {
          obj.on(ev, fn);
          return function subDestroy() {
            obj.off(ev, fn);
          };
        }

        exports.on = on;

        /***/
}),

/***/ "./build/socket.js":
/*!*************************!*\
  !*** ./build/socket.js ***!
  \*************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";


        function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

        function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() { }; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

        function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

        function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

        function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

        function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

        function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

        function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

        function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

        function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

        function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true; } catch (e) { return false; } }

        function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.Socket = void 0;

        var socket_io_parser_1 = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/dist/index.js");

        var on_1 = __webpack_require__(/*! ./on */ "./build/on.js");

        var typed_events_1 = __webpack_require__(/*! ./typed-events */ "./build/typed-events.js");

        var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client:socket");
        /**
         * Internal events.
         * These events can't be emitted by the user.
         */


        var RESERVED_EVENTS = Object.freeze({
          connect: 1,
          connect_error: 1,
          disconnect: 1,
          disconnecting: 1,
          // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
          newListener: 1,
          removeListener: 1
        });

        var Socket = /*#__PURE__*/function (_typed_events_1$Stric) {
          _inherits(Socket, _typed_events_1$Stric);

          var _super = _createSuper(Socket);

          /**
           * `Socket` constructor.
           *
           * @public
           */
          function Socket(io, nsp, opts) {
            var _this;

            _classCallCheck(this, Socket);

            _this = _super.call(this);
            _this.receiveBuffer = [];
            _this.sendBuffer = [];
            _this.ids = 0;
            _this.acks = {};
            _this.flags = {};
            _this.io = io;
            _this.nsp = nsp;
            _this.ids = 0;
            _this.acks = {};
            _this.receiveBuffer = [];
            _this.sendBuffer = [];
            _this.connected = false;
            _this.disconnected = true;
            _this.flags = {};

            if (opts && opts.auth) {
              _this.auth = opts.auth;
            }

            if (_this.io._autoConnect) _this.open();
            return _this;
          }
          /**
           * Subscribe to open, close and packet events
           *
           * @private
           */


          _createClass(Socket, [{
            key: "subEvents",
            value: function subEvents() {
              if (this.subs) return;
              var io = this.io;
              this.subs = [on_1.on(io, "open", this.onopen.bind(this)), on_1.on(io, "packet", this.onpacket.bind(this)), on_1.on(io, "error", this.onerror.bind(this)), on_1.on(io, "close", this.onclose.bind(this))];
            }
            /**
             * Whether the Socket will try to reconnect when its Manager connects or reconnects
             */

          }, {
            key: "connect",

            /**
             * "Opens" the socket.
             *
             * @public
             */
            value: function connect() {
              if (this.connected) return this;
              this.subEvents();
              if (!this.io["_reconnecting"]) this.io.open(); // ensure open

              if ("open" === this.io._readyState) this.onopen();
              return this;
            }
            /**
             * Alias for connect()
             */

          }, {
            key: "open",
            value: function open() {
              return this.connect();
            }
            /**
             * Sends a `message` event.
             *
             * @return self
             * @public
             */

          }, {
            key: "send",
            value: function send() {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              args.unshift("message");
              this.emit.apply(this, args);
              return this;
            }
            /**
             * Override `emit`.
             * If the event is in `events`, it's emitted normally.
             *
             * @return self
             * @public
             */

          }, {
            key: "emit",
            value: function emit(ev) {
              if (RESERVED_EVENTS.hasOwnProperty(ev)) {
                throw new Error('"' + ev + '" is a reserved event name');
              }

              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }

              args.unshift(ev);
              var packet = {
                type: socket_io_parser_1.PacketType.EVENT,
                data: args
              };
              packet.options = {};
              packet.options.compress = this.flags.compress !== false; // event ack callback

              if ("function" === typeof args[args.length - 1]) {
                debug("emitting packet with ack id %d", this.ids);
                this.acks[this.ids] = args.pop();
                packet.id = this.ids++;
              }

              var isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
              var discardPacket = this.flags["volatile"] && (!isTransportWritable || !this.connected);

              if (discardPacket) {
                debug("discard packet as the transport is not currently writable");
              } else if (this.connected) {
                this.packet(packet);
              } else {
                this.sendBuffer.push(packet);
              }

              this.flags = {};
              return this;
            }
            /**
             * Sends a packet.
             *
             * @param packet
             * @private
             */

          }, {
            key: "packet",
            value: function packet(_packet) {
              _packet.nsp = this.nsp;

              this.io._packet(_packet);
            }
            /**
             * Called upon engine `open`.
             *
             * @private
             */

          }, {
            key: "onopen",
            value: function onopen() {
              var _this2 = this;

              debug("transport is open - connecting");

              if (typeof this.auth == "function") {
                this.auth(function (data) {
                  _this2.packet({
                    type: socket_io_parser_1.PacketType.CONNECT,
                    data: data
                  });
                });
              } else {
                this.packet({
                  type: socket_io_parser_1.PacketType.CONNECT,
                  data: this.auth
                });
              }
            }
            /**
             * Called upon engine or manager `error`.
             *
             * @param err
             * @private
             */

          }, {
            key: "onerror",
            value: function onerror(err) {
              if (!this.connected) {
                this.emitReserved("connect_error", err);
              }
            }
            /**
             * Called upon engine `close`.
             *
             * @param reason
             * @private
             */

          }, {
            key: "onclose",
            value: function onclose(reason) {
              debug("close (%s)", reason);
              this.connected = false;
              this.disconnected = true;
              delete this.id;
              this.emitReserved("disconnect", reason);
            }
            /**
             * Called with socket packet.
             *
             * @param packet
             * @private
             */

          }, {
            key: "onpacket",
            value: function onpacket(packet) {
              var sameNamespace = packet.nsp === this.nsp;
              if (!sameNamespace) return;

              switch (packet.type) {
                case socket_io_parser_1.PacketType.CONNECT:
                  if (packet.data && packet.data.sid) {
                    var id = packet.data.sid;
                    this.onconnect(id);
                  } else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                  }

                  break;

                case socket_io_parser_1.PacketType.EVENT:
                  this.onevent(packet);
                  break;

                case socket_io_parser_1.PacketType.BINARY_EVENT:
                  this.onevent(packet);
                  break;

                case socket_io_parser_1.PacketType.ACK:
                  this.onack(packet);
                  break;

                case socket_io_parser_1.PacketType.BINARY_ACK:
                  this.onack(packet);
                  break;

                case socket_io_parser_1.PacketType.DISCONNECT:
                  this.ondisconnect();
                  break;

                case socket_io_parser_1.PacketType.CONNECT_ERROR:
                  var err = new Error(packet.data.message); // @ts-ignore

                  err.data = packet.data.data;
                  this.emitReserved("connect_error", err);
                  break;
              }
            }
            /**
             * Called upon a server event.
             *
             * @param packet
             * @private
             */

          }, {
            key: "onevent",
            value: function onevent(packet) {
              var args = packet.data || [];
              debug("emitting event %j", args);

              if (null != packet.id) {
                debug("attaching ack callback to event");
                args.push(this.ack(packet.id));
              }

              if (this.connected) {
                this.emitEvent(args);
              } else {
                this.receiveBuffer.push(Object.freeze(args));
              }
            }
          }, {
            key: "emitEvent",
            value: function emitEvent(args) {
              if (this._anyListeners && this._anyListeners.length) {
                var listeners = this._anyListeners.slice();

                var _iterator = _createForOfIteratorHelper(listeners),
                  _step;

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var listener = _step.value;
                    listener.apply(this, args);
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              }

              _get(_getPrototypeOf(Socket.prototype), "emit", this).apply(this, args);
            }
            /**
             * Produces an ack callback to emit with an event.
             *
             * @private
             */

          }, {
            key: "ack",
            value: function ack(id) {
              var self = this;
              var sent = false;
              return function () {
                // prevent double callbacks
                if (sent) return;
                sent = true;

                for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                  args[_key3] = arguments[_key3];
                }

                debug("sending ack %j", args);
                self.packet({
                  type: socket_io_parser_1.PacketType.ACK,
                  id: id,
                  data: args
                });
              };
            }
            /**
             * Called upon a server acknowlegement.
             *
             * @param packet
             * @private
             */

          }, {
            key: "onack",
            value: function onack(packet) {
              var ack = this.acks[packet.id];

              if ("function" === typeof ack) {
                debug("calling ack %s with %j", packet.id, packet.data);
                ack.apply(this, packet.data);
                delete this.acks[packet.id];
              } else {
                debug("bad ack %s", packet.id);
              }
            }
            /**
             * Called upon server connect.
             *
             * @private
             */

          }, {
            key: "onconnect",
            value: function onconnect(id) {
              debug("socket connected with id %s", id);
              this.id = id;
              this.connected = true;
              this.disconnected = false;
              this.emitReserved("connect");
              this.emitBuffered();
            }
            /**
             * Emit buffered events (received and emitted).
             *
             * @private
             */

          }, {
            key: "emitBuffered",
            value: function emitBuffered() {
              var _this3 = this;

              this.receiveBuffer.forEach(function (args) {
                return _this3.emitEvent(args);
              });
              this.receiveBuffer = [];
              this.sendBuffer.forEach(function (packet) {
                return _this3.packet(packet);
              });
              this.sendBuffer = [];
            }
            /**
             * Called upon server disconnect.
             *
             * @private
             */

          }, {
            key: "ondisconnect",
            value: function ondisconnect() {
              debug("server disconnect (%s)", this.nsp);
              this.destroy();
              this.onclose("io server disconnect");
            }
            /**
             * Called upon forced client/server side disconnections,
             * this method ensures the manager stops tracking us and
             * that reconnections don't get triggered for this.
             *
             * @private
             */

          }, {
            key: "destroy",
            value: function destroy() {
              if (this.subs) {
                // clean subscriptions to avoid reconnections
                this.subs.forEach(function (subDestroy) {
                  return subDestroy();
                });
                this.subs = undefined;
              }

              this.io["_destroy"](this);
            }
            /**
             * Disconnects the socket manually.
             *
             * @return self
             * @public
             */

          }, {
            key: "disconnect",
            value: function disconnect() {
              if (this.connected) {
                debug("performing disconnect (%s)", this.nsp);
                this.packet({
                  type: socket_io_parser_1.PacketType.DISCONNECT
                });
              } // remove socket from pool


              this.destroy();

              if (this.connected) {
                // fire events
                this.onclose("io client disconnect");
              }

              return this;
            }
            /**
             * Alias for disconnect()
             *
             * @return self
             * @public
             */

          }, {
            key: "close",
            value: function close() {
              return this.disconnect();
            }
            /**
             * Sets the compress flag.
             *
             * @param compress - if `true`, compresses the sending data
             * @return self
             * @public
             */

          }, {
            key: "compress",
            value: function compress(_compress) {
              this.flags.compress = _compress;
              return this;
            }
            /**
             * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
             * ready to send messages.
             *
             * @returns self
             * @public
             */

          }, {
            key: "onAny",

            /**
             * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
             * callback.
             *
             * @param listener
             * @public
             */
            value: function onAny(listener) {
              this._anyListeners = this._anyListeners || [];

              this._anyListeners.push(listener);

              return this;
            }
            /**
             * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
             * callback. The listener is added to the beginning of the listeners array.
             *
             * @param listener
             * @public
             */

          }, {
            key: "prependAny",
            value: function prependAny(listener) {
              this._anyListeners = this._anyListeners || [];

              this._anyListeners.unshift(listener);

              return this;
            }
            /**
             * Removes the listener that will be fired when any event is emitted.
             *
             * @param listener
             * @public
             */

          }, {
            key: "offAny",
            value: function offAny(listener) {
              if (!this._anyListeners) {
                return this;
              }

              if (listener) {
                var listeners = this._anyListeners;

                for (var i = 0; i < listeners.length; i++) {
                  if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                  }
                }
              } else {
                this._anyListeners = [];
              }

              return this;
            }
            /**
             * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
             * e.g. to remove listeners.
             *
             * @public
             */

          }, {
            key: "listenersAny",
            value: function listenersAny() {
              return this._anyListeners || [];
            }
          }, {
            key: "active",
            get: function get() {
              return !!this.subs;
            }
          }, {
            key: "volatile",
            get: function get() {
              this.flags["volatile"] = true;
              return this;
            }
          }]);

          return Socket;
        }(typed_events_1.StrictEventEmitter);

        exports.Socket = Socket;

        /***/
}),

/***/ "./build/typed-events.js":
/*!*******************************!*\
  !*** ./build/typed-events.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";


        function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

        function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

        function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

        function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

        function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

        function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

        function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

        function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true; } catch (e) { return false; } }

        function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.StrictEventEmitter = void 0;

        var Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
        /**
         * Strictly typed version of an `EventEmitter`. A `TypedEventEmitter` takes type
         * parameters for mappings of event names to event data types, and strictly
         * types method calls to the `EventEmitter` according to these event maps.
         *
         * @typeParam ListenEvents - `EventsMap` of user-defined events that can be
         * listened to with `on` or `once`
         * @typeParam EmitEvents - `EventsMap` of user-defined events that can be
         * emitted with `emit`
         * @typeParam ReservedEvents - `EventsMap` of reserved events, that can be
         * emitted by socket.io with `emitReserved`, and can be listened to with
         * `listen`.
         */


        var StrictEventEmitter = /*#__PURE__*/function (_Emitter) {
          _inherits(StrictEventEmitter, _Emitter);

          var _super = _createSuper(StrictEventEmitter);

          function StrictEventEmitter() {
            _classCallCheck(this, StrictEventEmitter);

            return _super.apply(this, arguments);
          }

          _createClass(StrictEventEmitter, [{
            key: "on",

            /**
             * Adds the `listener` function as an event listener for `ev`.
             *
             * @param ev Name of the event
             * @param listener Callback function
             */
            value: function on(ev, listener) {
              _get(_getPrototypeOf(StrictEventEmitter.prototype), "on", this).call(this, ev, listener);

              return this;
            }
            /**
             * Adds a one-time `listener` function as an event listener for `ev`.
             *
             * @param ev Name of the event
             * @param listener Callback function
             */

          }, {
            key: "once",
            value: function once(ev, listener) {
              _get(_getPrototypeOf(StrictEventEmitter.prototype), "once", this).call(this, ev, listener);

              return this;
            }
            /**
             * Emits an event.
             *
             * @param ev Name of the event
             * @param args Values to send to listeners of this event
             */

          }, {
            key: "emit",
            value: function emit(ev) {
              var _get2;

              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }

              (_get2 = _get(_getPrototypeOf(StrictEventEmitter.prototype), "emit", this)).call.apply(_get2, [this, ev].concat(args));

              return this;
            }
            /**
             * Emits a reserved event.
             *
             * This method is `protected`, so that only a class extending
             * `StrictEventEmitter` can emit its own reserved events.
             *
             * @param ev Reserved event name
             * @param args Arguments to emit along with the event
             */

          }, {
            key: "emitReserved",
            value: function emitReserved(ev) {
              var _get3;

              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }

              (_get3 = _get(_getPrototypeOf(StrictEventEmitter.prototype), "emit", this)).call.apply(_get3, [this, ev].concat(args));

              return this;
            }
            /**
             * Returns the listeners listening to an event.
             *
             * @param event Event name
             * @returns Array of listeners subscribed to `event`
             */

          }, {
            key: "listeners",
            value: function listeners(event) {
              return _get(_getPrototypeOf(StrictEventEmitter.prototype), "listeners", this).call(this, event);
            }
          }]);

          return StrictEventEmitter;
        }(Emitter);

        exports.StrictEventEmitter = StrictEventEmitter;

        /***/
}),

/***/ "./build/url.js":
/*!**********************!*\
  !*** ./build/url.js ***!
  \**********************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.url = void 0;

        var parseuri = __webpack_require__(/*! parseuri */ "./node_modules/parseuri/index.js");

        var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-client:url");
        /**
         * URL parser.
         *
         * @param uri - url
         * @param path - the request path of the connection
         * @param loc - An object meant to mimic window.location.
         *        Defaults to window.location.
         * @public
         */


        function url(uri) {
          var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
          var loc = arguments.length > 2 ? arguments[2] : undefined;
          var obj = uri; // default to window.location

          loc = loc || typeof location !== "undefined" && location;
          if (null == uri) uri = loc.protocol + "//" + loc.host; // relative path support

          if (typeof uri === "string") {
            if ("/" === uri.charAt(0)) {
              if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
              } else {
                uri = loc.host + uri;
              }
            }

            if (!/^(https?|wss?):\/\//.test(uri)) {
              debug("protocol-less url %s", uri);

              if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
              } else {
                uri = "https://" + uri;
              }
            } // parse


            debug("parse %s", uri);
            obj = parseuri(uri);
          } // make sure we treat `localhost:80` and `localhost` equally


          if (!obj.port) {
            if (/^(http|ws)$/.test(obj.protocol)) {
              obj.port = "80";
            } else if (/^(http|ws)s$/.test(obj.protocol)) {
              obj.port = "443";
            }
          }

          obj.path = obj.path || "/";
          var ipv6 = obj.host.indexOf(":") !== -1;
          var host = ipv6 ? "[" + obj.host + "]" : obj.host; // define unique id

          obj.id = obj.protocol + "://" + host + ":" + obj.port + path; // define href

          obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
          return obj;
        }

        exports.url = url;

        /***/
}),

/***/ "./node_modules/backo2/index.js":
/*!**************************************!*\
  !*** ./node_modules/backo2/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function (module, exports) {

        /**
         * Expose `Backoff`.
         */
        module.exports = Backoff;
        /**
         * Initialize backoff timer with `opts`.
         *
         * - `min` initial timeout in milliseconds [100]
         * - `max` max timeout [10000]
         * - `jitter` [0]
         * - `factor` [2]
         *
         * @param {Object} opts
         * @api public
         */

        function Backoff(opts) {
          opts = opts || {};
          this.ms = opts.min || 100;
          this.max = opts.max || 10000;
          this.factor = opts.factor || 2;
          this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
          this.attempts = 0;
        }
        /**
         * Return the backoff duration.
         *
         * @return {Number}
         * @api public
         */


        Backoff.prototype.duration = function () {
          var ms = this.ms * Math.pow(this.factor, this.attempts++);

          if (this.jitter) {
            var rand = Math.random();
            var deviation = Math.floor(rand * this.jitter * ms);
            ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
          }

          return Math.min(ms, this.max) | 0;
        };
        /**
         * Reset the number of attempts.
         *
         * @api public
         */


        Backoff.prototype.reset = function () {
          this.attempts = 0;
        };
        /**
         * Set the minimum duration
         *
         * @api public
         */


        Backoff.prototype.setMin = function (min) {
          this.ms = min;
        };
        /**
         * Set the maximum duration
         *
         * @api public
         */


        Backoff.prototype.setMax = function (max) {
          this.max = max;
        };
        /**
         * Set the jitter
         *
         * @api public
         */


        Backoff.prototype.setJitter = function (jitter) {
          this.jitter = jitter;
        };

        /***/
}),

/***/ "./node_modules/component-emitter/index.js":
/*!*************************************************!*\
  !*** ./node_modules/component-emitter/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        /**
         * Expose `Emitter`.
         */
        if (true) {
          module.exports = Emitter;
        }
        /**
         * Initialize a new `Emitter`.
         *
         * @api public
         */


        function Emitter(obj) {
          if (obj) return mixin(obj);
        }

        ;
        /**
         * Mixin the emitter properties.
         *
         * @param {Object} obj
         * @return {Object}
         * @api private
         */

        function mixin(obj) {
          for (var key in Emitter.prototype) {
            obj[key] = Emitter.prototype[key];
          }

          return obj;
        }
        /**
         * Listen on the given `event` with `fn`.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */


        Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
          this._callbacks = this._callbacks || {};
          (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
          return this;
        };
        /**
         * Adds an `event` listener that will be invoked a single
         * time then automatically removed.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */


        Emitter.prototype.once = function (event, fn) {
          function on() {
            this.off(event, on);
            fn.apply(this, arguments);
          }

          on.fn = fn;
          this.on(event, on);
          return this;
        };
        /**
         * Remove the given callback for `event` or all
         * registered callbacks.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */


        Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
          this._callbacks = this._callbacks || {}; // all

          if (0 == arguments.length) {
            this._callbacks = {};
            return this;
          } // specific event


          var callbacks = this._callbacks['$' + event];
          if (!callbacks) return this; // remove all handlers

          if (1 == arguments.length) {
            delete this._callbacks['$' + event];
            return this;
          } // remove specific handler


          var cb;

          for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];

            if (cb === fn || cb.fn === fn) {
              callbacks.splice(i, 1);
              break;
            }
          } // Remove event specific arrays for event types that no
          // one is subscribed for to avoid memory leak.


          if (callbacks.length === 0) {
            delete this._callbacks['$' + event];
          }

          return this;
        };
        /**
         * Emit `event` with the given args.
         *
         * @param {String} event
         * @param {Mixed} ...
         * @return {Emitter}
         */


        Emitter.prototype.emit = function (event) {
          this._callbacks = this._callbacks || {};
          var args = new Array(arguments.length - 1),
            callbacks = this._callbacks['$' + event];

          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }

          if (callbacks) {
            callbacks = callbacks.slice(0);

            for (var i = 0, len = callbacks.length; i < len; ++i) {
              callbacks[i].apply(this, args);
            }
          }

          return this;
        };
        /**
         * Return array of callbacks for `event`.
         *
         * @param {String} event
         * @return {Array}
         * @api public
         */


        Emitter.prototype.listeners = function (event) {
          this._callbacks = this._callbacks || {};
          return this._callbacks['$' + event] || [];
        };
        /**
         * Check if this emitter has `event` handlers.
         *
         * @param {String} event
         * @return {Boolean}
         * @api public
         */


        Emitter.prototype.hasListeners = function (event) {
          return !!this.listeners(event).length;
        };

        /***/
}),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        /* eslint-env browser */

        /**
         * This is the web browser implementation of `debug()`.
         */
        exports.formatArgs = formatArgs;
        exports.save = save;
        exports.load = load;
        exports.useColors = useColors;
        exports.storage = localstorage();

        exports.destroy = function () {
          var warned = false;
          return function () {
            if (!warned) {
              warned = true;
              console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
            }
          };
        }();
        /**
         * Colors.
         */


        exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
        /**
         * Currently only WebKit-based Web Inspectors, Firefox >= v31,
         * and the Firebug extension (any Firefox version) are known
         * to support "%c" CSS customizations.
         *
         * TODO: add a `localStorage` variable to explicitly enable/disable colors
         */
        // eslint-disable-next-line complexity

        function useColors() {
          // NB: In an Electron preload script, document will be defined but not fully
          // initialized. Since we know we're in Chrome, we'll just detect this case
          // explicitly
          if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
            return true;
          } // Internet Explorer and Edge do not support colors.


          if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
            return false;
          } // Is webkit? http://stackoverflow.com/a/16459606/376773
          // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


          return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
            typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
            // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
            typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
            typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
        }
        /**
         * Colorize log arguments if enabled.
         *
         * @api public
         */


        function formatArgs(args) {
          args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

          if (!this.useColors) {
            return;
          }

          var c = 'color: ' + this.color;
          args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
          // arguments passed either before or after the %c, so we need to
          // figure out the correct index to insert the CSS into

          var index = 0;
          var lastC = 0;
          args[0].replace(/%[a-zA-Z%]/g, function (match) {
            if (match === '%%') {
              return;
            }

            index++;

            if (match === '%c') {
              // We only are interested in the *last* %c
              // (the user may have provided their own)
              lastC = index;
            }
          });
          args.splice(lastC, 0, c);
        }
        /**
         * Invokes `console.debug()` when available.
         * No-op when `console.debug` is not a "function".
         * If `console.debug` is not available, falls back
         * to `console.log`.
         *
         * @api public
         */


        exports.log = console.debug || console.log || function () { };
        /**
         * Save `namespaces`.
         *
         * @param {String} namespaces
         * @api private
         */


        function save(namespaces) {
          try {
            if (namespaces) {
              exports.storage.setItem('debug', namespaces);
            } else {
              exports.storage.removeItem('debug');
            }
          } catch (error) {// Swallow
            // XXX (@Qix-) should we be logging these?
          }
        }
        /**
         * Load `namespaces`.
         *
         * @return {String} returns the previously persisted debug modes
         * @api private
         */


        function load() {
          var r;

          try {
            r = exports.storage.getItem('debug');
          } catch (error) {// Swallow
            // XXX (@Qix-) should we be logging these?
          } // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


          if (!r && typeof process !== 'undefined' && 'env' in process) {
            r = process.env.DEBUG;
          }

          return r;
        }
        /**
         * Localstorage attempts to return the localstorage.
         *
         * This is necessary because safari throws
         * when a user disables cookies/localstorage
         * and you attempt to access it.
         *
         * @return {LocalStorage}
         * @api private
         */


        function localstorage() {
          try {
            // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
            // The Browser also has localStorage in the global context.
            return localStorage;
          } catch (error) {// Swallow
            // XXX (@Qix-) should we be logging these?
          }
        }

        module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);
        var formatters = module.exports.formatters;
        /**
         * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
         */

        formatters.j = function (v) {
          try {
            return JSON.stringify(v);
          } catch (error) {
            return '[UnexpectedJSONParseError]: ' + error.message;
          }
        };

        /***/
}),

/***/ "./node_modules/debug/src/common.js":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

        function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

        function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

        function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

        function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

        function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

        /**
         * This is the common logic for both the Node.js and web browser
         * implementations of `debug()`.
         */
        function setup(env) {
          createDebug.debug = createDebug;
          createDebug["default"] = createDebug;
          createDebug.coerce = coerce;
          createDebug.disable = disable;
          createDebug.enable = enable;
          createDebug.enabled = enabled;
          createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");
          createDebug.destroy = destroy;
          Object.keys(env).forEach(function (key) {
            createDebug[key] = env[key];
          });
          /**
          * The currently active debug mode names, and names to skip.
          */

          createDebug.names = [];
          createDebug.skips = [];
          /**
          * Map of special "%n" handling functions, for the debug "format" argument.
          *
          * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
          */

          createDebug.formatters = {};
          /**
          * Selects a color for a debug namespace
          * @param {String} namespace The namespace string for the for the debug instance to be colored
          * @return {Number|String} An ANSI color code for the given namespace
          * @api private
          */

          function selectColor(namespace) {
            var hash = 0;

            for (var i = 0; i < namespace.length; i++) {
              hash = (hash << 5) - hash + namespace.charCodeAt(i);
              hash |= 0; // Convert to 32bit integer
            }

            return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
          }

          createDebug.selectColor = selectColor;
          /**
          * Create a debugger with the given `namespace`.
          *
          * @param {String} namespace
          * @return {Function}
          * @api public
          */

          function createDebug(namespace) {
            var prevTime;
            var enableOverride = null;

            function debug() {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              // Disabled?
              if (!debug.enabled) {
                return;
              }

              var self = debug; // Set `diff` timestamp

              var curr = Number(new Date());
              var ms = curr - (prevTime || curr);
              self.diff = ms;
              self.prev = prevTime;
              self.curr = curr;
              prevTime = curr;
              args[0] = createDebug.coerce(args[0]);

              if (typeof args[0] !== 'string') {
                // Anything else let's inspect with %O
                args.unshift('%O');
              } // Apply any `formatters` transformations


              var index = 0;
              args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
                // If we encounter an escaped % then don't increase the array index
                if (match === '%%') {
                  return '%';
                }

                index++;
                var formatter = createDebug.formatters[format];

                if (typeof formatter === 'function') {
                  var val = args[index];
                  match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

                  args.splice(index, 1);
                  index--;
                }

                return match;
              }); // Apply env-specific formatting (colors, etc.)

              createDebug.formatArgs.call(self, args);
              var logFn = self.log || createDebug.log;
              logFn.apply(self, args);
            }

            debug.namespace = namespace;
            debug.useColors = createDebug.useColors();
            debug.color = createDebug.selectColor(namespace);
            debug.extend = extend;
            debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

            Object.defineProperty(debug, 'enabled', {
              enumerable: true,
              configurable: false,
              get: function get() {
                return enableOverride === null ? createDebug.enabled(namespace) : enableOverride;
              },
              set: function set(v) {
                enableOverride = v;
              }
            }); // Env-specific initialization logic for debug instances

            if (typeof createDebug.init === 'function') {
              createDebug.init(debug);
            }

            return debug;
          }

          function extend(namespace, delimiter) {
            var newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
            newDebug.log = this.log;
            return newDebug;
          }
          /**
          * Enables a debug mode by namespaces. This can include modes
          * separated by a colon and wildcards.
          *
          * @param {String} namespaces
          * @api public
          */


          function enable(namespaces) {
            createDebug.save(namespaces);
            createDebug.names = [];
            createDebug.skips = [];
            var i;
            var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
            var len = split.length;

            for (i = 0; i < len; i++) {
              if (!split[i]) {
                // ignore empty strings
                continue;
              }

              namespaces = split[i].replace(/\*/g, '.*?');

              if (namespaces[0] === '-') {
                createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
              } else {
                createDebug.names.push(new RegExp('^' + namespaces + '$'));
              }
            }
          }
          /**
          * Disable debug output.
          *
          * @return {String} namespaces
          * @api public
          */


          function disable() {
            var namespaces = [].concat(_toConsumableArray(createDebug.names.map(toNamespace)), _toConsumableArray(createDebug.skips.map(toNamespace).map(function (namespace) {
              return '-' + namespace;
            }))).join(',');
            createDebug.enable('');
            return namespaces;
          }
          /**
          * Returns true if the given mode name is enabled, false otherwise.
          *
          * @param {String} name
          * @return {Boolean}
          * @api public
          */


          function enabled(name) {
            if (name[name.length - 1] === '*') {
              return true;
            }

            var i;
            var len;

            for (i = 0, len = createDebug.skips.length; i < len; i++) {
              if (createDebug.skips[i].test(name)) {
                return false;
              }
            }

            for (i = 0, len = createDebug.names.length; i < len; i++) {
              if (createDebug.names[i].test(name)) {
                return true;
              }
            }

            return false;
          }
          /**
          * Convert regexp to namespace
          *
          * @param {RegExp} regxep
          * @return {String} namespace
          * @api private
          */


          function toNamespace(regexp) {
            return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
          }
          /**
          * Coerce `val`.
          *
          * @param {Mixed} val
          * @return {Mixed}
          * @api private
          */


          function coerce(val) {
            if (val instanceof Error) {
              return val.stack || val.message;
            }

            return val;
          }
          /**
          * XXX DO NOT USE. This is a temporary stub function.
          * XXX It WILL be removed in the next major release.
          */


          function destroy() {
            console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
          }

          createDebug.enable(createDebug.load());
          return createDebug;
        }

        module.exports = setup;

        /***/
}),

/***/ "./node_modules/engine.io-client/lib/globalThis.browser.js":
/*!*****************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/globalThis.browser.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

        module.exports = function () {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else {
            return Function("return this")();
          }
        }();

        /***/
}),

/***/ "./node_modules/engine.io-client/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/engine.io-client/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        var Socket = __webpack_require__(/*! ./socket */ "./node_modules/engine.io-client/lib/socket.js");

        module.exports = function (uri, opts) {
          return new Socket(uri, opts);
        };
        /**
         * Expose deps for legacy compatibility
         * and standalone browser access.
         */


        module.exports.Socket = Socket;
        module.exports.protocol = Socket.protocol; // this is an int

        module.exports.Transport = __webpack_require__(/*! ./transport */ "./node_modules/engine.io-client/lib/transport.js");
        module.exports.transports = __webpack_require__(/*! ./transports/index */ "./node_modules/engine.io-client/lib/transports/index.js");
        module.exports.parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");

        /***/
}),

/***/ "./node_modules/engine.io-client/lib/socket.js":
/*!*****************************************************!*\
  !*** ./node_modules/engine.io-client/lib/socket.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

        function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

        function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

        function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

        function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

        function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

        function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true; } catch (e) { return false; } }

        function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

        var transports = __webpack_require__(/*! ./transports/index */ "./node_modules/engine.io-client/lib/transports/index.js");

        var Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");

        var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:socket");

        var parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");

        var parseuri = __webpack_require__(/*! parseuri */ "./node_modules/parseuri/index.js");

        var parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");

        var Socket = /*#__PURE__*/function (_Emitter) {
          _inherits(Socket, _Emitter);

          var _super = _createSuper(Socket);

          /**
           * Socket constructor.
           *
           * @param {String|Object} uri or options
           * @param {Object} options
           * @api public
           */
          function Socket(uri) {
            var _this;

            var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            _classCallCheck(this, Socket);

            _this = _super.call(this);

            if (uri && "object" === _typeof(uri)) {
              opts = uri;
              uri = null;
            }

            if (uri) {
              uri = parseuri(uri);
              opts.hostname = uri.host;
              opts.secure = uri.protocol === "https" || uri.protocol === "wss";
              opts.port = uri.port;
              if (uri.query) opts.query = uri.query;
            } else if (opts.host) {
              opts.hostname = parseuri(opts.host).host;
            }

            _this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;

            if (opts.hostname && !opts.port) {
              // if no port is specified manually, use the protocol default
              opts.port = _this.secure ? "443" : "80";
            }

            _this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
            _this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : _this.secure ? 443 : 80);
            _this.transports = opts.transports || ["polling", "websocket"];
            _this.readyState = "";
            _this.writeBuffer = [];
            _this.prevBufferLen = 0;
            _this.opts = _extends({
              path: "/engine.io",
              agent: false,
              withCredentials: false,
              upgrade: true,
              jsonp: true,
              timestampParam: "t",
              rememberUpgrade: false,
              rejectUnauthorized: true,
              perMessageDeflate: {
                threshold: 1024
              },
              transportOptions: {}
            }, opts);
            _this.opts.path = _this.opts.path.replace(/\/$/, "") + "/";

            if (typeof _this.opts.query === "string") {
              _this.opts.query = parseqs.decode(_this.opts.query);
            } // set on handshake


            _this.id = null;
            _this.upgrades = null;
            _this.pingInterval = null;
            _this.pingTimeout = null; // set on heartbeat

            _this.pingTimeoutTimer = null;

            if (typeof addEventListener === "function") {
              addEventListener("beforeunload", function () {
                if (_this.transport) {
                  // silently close the transport
                  _this.transport.removeAllListeners();

                  _this.transport.close();
                }
              }, false);

              if (_this.hostname !== "localhost") {
                _this.offlineEventListener = function () {
                  _this.onClose("transport close");
                };

                addEventListener("offline", _this.offlineEventListener, false);
              }
            }

            _this.open();

            return _this;
          }
          /**
           * Creates transport of the given type.
           *
           * @param {String} transport name
           * @return {Transport}
           * @api private
           */


          _createClass(Socket, [{
            key: "createTransport",
            value: function createTransport(name) {
              debug('creating transport "%s"', name);
              var query = clone(this.opts.query); // append engine.io protocol identifier

              query.EIO = parser.protocol; // transport name

              query.transport = name; // session id if we already have one

              if (this.id) query.sid = this.id;

              var opts = _extends({}, this.opts.transportOptions[name], this.opts, {
                query: query,
                socket: this,
                hostname: this.hostname,
                secure: this.secure,
                port: this.port
              });

              debug("options: %j", opts);
              return new transports[name](opts);
            }
            /**
             * Initializes transport to use and starts probe.
             *
             * @api private
             */

          }, {
            key: "open",
            value: function open() {
              var transport;

              if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
                transport = "websocket";
              } else if (0 === this.transports.length) {
                // Emit error on next tick so it can be listened to
                var self = this;
                setTimeout(function () {
                  self.emit("error", "No transports available");
                }, 0);
                return;
              } else {
                transport = this.transports[0];
              }

              this.readyState = "opening"; // Retry with the next transport if the transport is disabled (jsonp: false)

              try {
                transport = this.createTransport(transport);
              } catch (e) {
                debug("error while creating transport: %s", e);
                this.transports.shift();
                this.open();
                return;
              }

              transport.open();
              this.setTransport(transport);
            }
            /**
             * Sets the current transport. Disables the existing one (if any).
             *
             * @api private
             */

          }, {
            key: "setTransport",
            value: function setTransport(transport) {
              debug("setting transport %s", transport.name);
              var self = this;

              if (this.transport) {
                debug("clearing existing transport %s", this.transport.name);
                this.transport.removeAllListeners();
              } // set up transport


              this.transport = transport; // set up transport listeners

              transport.on("drain", function () {
                self.onDrain();
              }).on("packet", function (packet) {
                self.onPacket(packet);
              }).on("error", function (e) {
                self.onError(e);
              }).on("close", function () {
                self.onClose("transport close");
              });
            }
            /**
             * Probes a transport.
             *
             * @param {String} transport name
             * @api private
             */

          }, {
            key: "probe",
            value: function probe(name) {
              debug('probing transport "%s"', name);
              var transport = this.createTransport(name, {
                probe: 1
              });
              var failed = false;
              var self = this;
              Socket.priorWebsocketSuccess = false;

              function onTransportOpen() {
                if (self.onlyBinaryUpgrades) {
                  var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
                  failed = failed || upgradeLosesBinary;
                }

                if (failed) return;
                debug('probe transport "%s" opened', name);
                transport.send([{
                  type: "ping",
                  data: "probe"
                }]);
                transport.once("packet", function (msg) {
                  if (failed) return;

                  if ("pong" === msg.type && "probe" === msg.data) {
                    debug('probe transport "%s" pong', name);
                    self.upgrading = true;
                    self.emit("upgrading", transport);
                    if (!transport) return;
                    Socket.priorWebsocketSuccess = "websocket" === transport.name;
                    debug('pausing current transport "%s"', self.transport.name);
                    self.transport.pause(function () {
                      if (failed) return;
                      if ("closed" === self.readyState) return;
                      debug("changing transport and sending upgrade packet");
                      cleanup();
                      self.setTransport(transport);
                      transport.send([{
                        type: "upgrade"
                      }]);
                      self.emit("upgrade", transport);
                      transport = null;
                      self.upgrading = false;
                      self.flush();
                    });
                  } else {
                    debug('probe transport "%s" failed', name);
                    var err = new Error("probe error");
                    err.transport = transport.name;
                    self.emit("upgradeError", err);
                  }
                });
              }

              function freezeTransport() {
                if (failed) return; // Any callback called by transport should be ignored since now

                failed = true;
                cleanup();
                transport.close();
                transport = null;
              } // Handle any error that happens while probing


              function onerror(err) {
                var error = new Error("probe error: " + err);
                error.transport = transport.name;
                freezeTransport();
                debug('probe transport "%s" failed because of error: %s', name, err);
                self.emit("upgradeError", error);
              }

              function onTransportClose() {
                onerror("transport closed");
              } // When the socket is closed while we're probing


              function onclose() {
                onerror("socket closed");
              } // When the socket is upgraded while we're probing


              function onupgrade(to) {
                if (transport && to.name !== transport.name) {
                  debug('"%s" works - aborting "%s"', to.name, transport.name);
                  freezeTransport();
                }
              } // Remove all listeners on the transport and on self


              function cleanup() {
                transport.removeListener("open", onTransportOpen);
                transport.removeListener("error", onerror);
                transport.removeListener("close", onTransportClose);
                self.removeListener("close", onclose);
                self.removeListener("upgrading", onupgrade);
              }

              transport.once("open", onTransportOpen);
              transport.once("error", onerror);
              transport.once("close", onTransportClose);
              this.once("close", onclose);
              this.once("upgrading", onupgrade);
              transport.open();
            }
            /**
             * Called when connection is deemed open.
             *
             * @api public
             */

          }, {
            key: "onOpen",
            value: function onOpen() {
              debug("socket open");
              this.readyState = "open";
              Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
              this.emit("open");
              this.flush(); // we check for `readyState` in case an `open`
              // listener already closed the socket

              if ("open" === this.readyState && this.opts.upgrade && this.transport.pause) {
                debug("starting upgrade probes");
                var i = 0;
                var l = this.upgrades.length;

                for (; i < l; i++) {
                  this.probe(this.upgrades[i]);
                }
              }
            }
            /**
             * Handles a packet.
             *
             * @api private
             */

          }, {
            key: "onPacket",
            value: function onPacket(packet) {
              if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
                this.emit("packet", packet); // Socket is live - any packet counts

                this.emit("heartbeat");

                switch (packet.type) {
                  case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;

                  case "ping":
                    this.resetPingTimeout();
                    this.sendPacket("pong");
                    this.emit("pong");
                    break;

                  case "error":
                    var err = new Error("server error");
                    err.code = packet.data;
                    this.onError(err);
                    break;

                  case "message":
                    this.emit("data", packet.data);
                    this.emit("message", packet.data);
                    break;
                }
              } else {
                debug('packet received with socket readyState "%s"', this.readyState);
              }
            }
            /**
             * Called upon handshake completion.
             *
             * @param {Object} handshake obj
             * @api private
             */

          }, {
            key: "onHandshake",
            value: function onHandshake(data) {
              this.emit("handshake", data);
              this.id = data.sid;
              this.transport.query.sid = data.sid;
              this.upgrades = this.filterUpgrades(data.upgrades);
              this.pingInterval = data.pingInterval;
              this.pingTimeout = data.pingTimeout;
              this.onOpen(); // In case open handler closes socket

              if ("closed" === this.readyState) return;
              this.resetPingTimeout();
            }
            /**
             * Sets and resets ping timeout timer based on server pings.
             *
             * @api private
             */

          }, {
            key: "resetPingTimeout",
            value: function resetPingTimeout() {
              var _this2 = this;

              clearTimeout(this.pingTimeoutTimer);
              this.pingTimeoutTimer = setTimeout(function () {
                _this2.onClose("ping timeout");
              }, this.pingInterval + this.pingTimeout);

              if (this.opts.autoUnref) {
                this.pingTimeoutTimer.unref();
              }
            }
            /**
             * Called on `drain` event
             *
             * @api private
             */

          }, {
            key: "onDrain",
            value: function onDrain() {
              this.writeBuffer.splice(0, this.prevBufferLen); // setting prevBufferLen = 0 is very important
              // for example, when upgrading, upgrade packet is sent over,
              // and a nonzero prevBufferLen could cause problems on `drain`

              this.prevBufferLen = 0;

              if (0 === this.writeBuffer.length) {
                this.emit("drain");
              } else {
                this.flush();
              }
            }
            /**
             * Flush write buffers.
             *
             * @api private
             */

          }, {
            key: "flush",
            value: function flush() {
              if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
                debug("flushing %d packets in socket", this.writeBuffer.length);
                this.transport.send(this.writeBuffer); // keep track of current length of writeBuffer
                // splice writeBuffer and callbackBuffer on `drain`

                this.prevBufferLen = this.writeBuffer.length;
                this.emit("flush");
              }
            }
            /**
             * Sends a message.
             *
             * @param {String} message.
             * @param {Function} callback function.
             * @param {Object} options.
             * @return {Socket} for chaining.
             * @api public
             */

          }, {
            key: "write",
            value: function write(msg, options, fn) {
              this.sendPacket("message", msg, options, fn);
              return this;
            }
          }, {
            key: "send",
            value: function send(msg, options, fn) {
              this.sendPacket("message", msg, options, fn);
              return this;
            }
            /**
             * Sends a packet.
             *
             * @param {String} packet type.
             * @param {String} data.
             * @param {Object} options.
             * @param {Function} callback function.
             * @api private
             */

          }, {
            key: "sendPacket",
            value: function sendPacket(type, data, options, fn) {
              if ("function" === typeof data) {
                fn = data;
                data = undefined;
              }

              if ("function" === typeof options) {
                fn = options;
                options = null;
              }

              if ("closing" === this.readyState || "closed" === this.readyState) {
                return;
              }

              options = options || {};
              options.compress = false !== options.compress;
              var packet = {
                type: type,
                data: data,
                options: options
              };
              this.emit("packetCreate", packet);
              this.writeBuffer.push(packet);
              if (fn) this.once("flush", fn);
              this.flush();
            }
            /**
             * Closes the connection.
             *
             * @api private
             */

          }, {
            key: "close",
            value: function close() {
              var self = this;

              if ("opening" === this.readyState || "open" === this.readyState) {
                this.readyState = "closing";

                if (this.writeBuffer.length) {
                  this.once("drain", function () {
                    if (this.upgrading) {
                      waitForUpgrade();
                    } else {
                      close();
                    }
                  });
                } else if (this.upgrading) {
                  waitForUpgrade();
                } else {
                  close();
                }
              }

              function close() {
                self.onClose("forced close");
                debug("socket closing - telling transport to close");
                self.transport.close();
              }

              function cleanupAndClose() {
                self.removeListener("upgrade", cleanupAndClose);
                self.removeListener("upgradeError", cleanupAndClose);
                close();
              }

              function waitForUpgrade() {
                // wait for upgrade to finish since we can't send packets while pausing a transport
                self.once("upgrade", cleanupAndClose);
                self.once("upgradeError", cleanupAndClose);
              }

              return this;
            }
            /**
             * Called upon transport error
             *
             * @api private
             */

          }, {
            key: "onError",
            value: function onError(err) {
              debug("socket error %j", err);
              Socket.priorWebsocketSuccess = false;
              this.emit("error", err);
              this.onClose("transport error", err);
            }
            /**
             * Called upon transport close.
             *
             * @api private
             */

          }, {
            key: "onClose",
            value: function onClose(reason, desc) {
              if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                debug('socket close with reason: "%s"', reason);
                var self = this; // clear timers

                clearTimeout(this.pingIntervalTimer);
                clearTimeout(this.pingTimeoutTimer); // stop event from firing again for transport

                this.transport.removeAllListeners("close"); // ensure transport won't stay open

                this.transport.close(); // ignore further transport communication

                this.transport.removeAllListeners();

                if (typeof removeEventListener === "function") {
                  removeEventListener("offline", this.offlineEventListener, false);
                } // set ready state


                this.readyState = "closed"; // clear session id

                this.id = null; // emit close event

                this.emit("close", reason, desc); // clean buffers after, so users can still
                // grab the buffers on `close` event

                self.writeBuffer = [];
                self.prevBufferLen = 0;
              }
            }
            /**
             * Filters upgrades, returning only those matching client transports.
             *
             * @param {Array} server upgrades
             * @api private
             *
             */

          }, {
            key: "filterUpgrades",
            value: function filterUpgrades(upgrades) {
              var filteredUpgrades = [];
              var i = 0;
              var j = upgrades.length;

              for (; i < j; i++) {
                if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
              }

              return filteredUpgrades;
            }
          }]);

          return Socket;
        }(Emitter);

        Socket.priorWebsocketSuccess = false;
        /**
         * Protocol version.
         *
         * @api public
         */

        Socket.protocol = parser.protocol; // this is an int

        function clone(obj) {
          var o = {};

          for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
              o[i] = obj[i];
            }
          }

          return o;
        }

        module.exports = Socket;

        /***/
}),

/***/ "./node_modules/engine.io-client/lib/transport.js":
/*!********************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transport.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

        function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

        function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

        function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

        function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

        function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true; } catch (e) { return false; } }

        function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

        var parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");

        var Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");

        var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:transport");

        var Transport = /*#__PURE__*/function (_Emitter) {
          _inherits(Transport, _Emitter);

          var _super = _createSuper(Transport);

          /**
           * Transport abstract constructor.
           *
           * @param {Object} options.
           * @api private
           */
          function Transport(opts) {
            var _this;

            _classCallCheck(this, Transport);

            _this = _super.call(this);
            _this.opts = opts;
            _this.query = opts.query;
            _this.readyState = "";
            _this.socket = opts.socket;
            return _this;
          }
          /**
           * Emits an error.
           *
           * @param {String} str
           * @return {Transport} for chaining
           * @api public
           */


          _createClass(Transport, [{
            key: "onError",
            value: function onError(msg, desc) {
              var err = new Error(msg);
              err.type = "TransportError";
              err.description = desc;
              this.emit("error", err);
              return this;
            }
            /**
             * Opens the transport.
             *
             * @api public
             */

          }, {
            key: "open",
            value: function open() {
              if ("closed" === this.readyState || "" === this.readyState) {
                this.readyState = "opening";
                this.doOpen();
              }

              return this;
            }
            /**
             * Closes the transport.
             *
             * @api private
             */

          }, {
            key: "close",
            value: function close() {
              if ("opening" === this.readyState || "open" === this.readyState) {
                this.doClose();
                this.onClose();
              }

              return this;
            }
            /**
             * Sends multiple packets.
             *
             * @param {Array} packets
             * @api private
             */

          }, {
            key: "send",
            value: function send(packets) {
              if ("open" === this.readyState) {
                this.write(packets);
              } else {
                // this might happen if the transport was silently closed in the beforeunload event handler
                debug("transport is not open, discarding packets");
              }
            }
            /**
             * Called upon open
             *
             * @api private
             */

          }, {
            key: "onOpen",
            value: function onOpen() {
              this.readyState = "open";
              this.writable = true;
              this.emit("open");
            }
            /**
             * Called with data.
             *
             * @param {String} data
             * @api private
             */

          }, {
            key: "onData",
            value: function onData(data) {
              var packet = parser.decodePacket(data, this.socket.binaryType);
              this.onPacket(packet);
            }
            /**
             * Called with a decoded packet.
             */

          }, {
            key: "onPacket",
            value: function onPacket(packet) {
              this.emit("packet", packet);
            }
            /**
             * Called upon close.
             *
             * @api private
             */

          }, {
            key: "onClose",
            value: function onClose() {
              this.readyState = "closed";
              this.emit("close");
            }
          }]);

          return Transport;
        }(Emitter);

        module.exports = Transport;

        /***/
}),

/***/ "./node_modules/engine.io-client/lib/transports/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        var XMLHttpRequest = __webpack_require__(/*! ../../contrib/xmlhttprequest-ssl/XMLHttpRequest */ "./node_modules/engine.io-client/lib/xmlhttprequest.js");

        var XHR = __webpack_require__(/*! ./polling-xhr */ "./node_modules/engine.io-client/lib/transports/polling-xhr.js");

        var JSONP = __webpack_require__(/*! ./polling-jsonp */ "./node_modules/engine.io-client/lib/transports/polling-jsonp.js");

        var websocket = __webpack_require__(/*! ./websocket */ "./node_modules/engine.io-client/lib/transports/websocket.js");

        exports.polling = polling;
        exports.websocket = websocket;
        /**
         * Polling transport polymorphic constructor.
         * Decides on xhr vs jsonp based on feature detection.
         *
         * @api private
         */

        function polling(opts) {
          var xhr;
          var xd = false;
          var xs = false;
          var jsonp = false !== opts.jsonp;

          if (typeof location !== "undefined") {
            var isSSL = "https:" === location.protocol;
            var port = location.port; // some user agents have empty `location.port`

            if (!port) {
              port = isSSL ? 443 : 80;
            }

            xd = opts.hostname !== location.hostname || port !== opts.port;
            xs = opts.secure !== isSSL;
          }

          opts.xdomain = xd;
          opts.xscheme = xs;
          xhr = new XMLHttpRequest(opts);

          if ("open" in xhr && !opts.forceJSONP) {
            return new XHR(opts);
          } else {
            if (!jsonp) throw new Error("JSONP disabled");
            return new JSONP(opts);
          }
        }

        /***/
}),

/***/ "./node_modules/engine.io-client/lib/transports/polling-jsonp.js":
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling-jsonp.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

        function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

        function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

        function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

        function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

        function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

        function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

        function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true; } catch (e) { return false; } }

        function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

        var Polling = __webpack_require__(/*! ./polling */ "./node_modules/engine.io-client/lib/transports/polling.js");

        var globalThis = __webpack_require__(/*! ../globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

        var rNewline = /\n/g;
        var rEscapedNewline = /\\n/g;
        /**
         * Global JSONP callbacks.
         */

        var callbacks;

        var JSONPPolling = /*#__PURE__*/function (_Polling) {
          _inherits(JSONPPolling, _Polling);

          var _super = _createSuper(JSONPPolling);

          /**
           * JSONP Polling constructor.
           *
           * @param {Object} opts.
           * @api public
           */
          function JSONPPolling(opts) {
            var _this;

            _classCallCheck(this, JSONPPolling);

            _this = _super.call(this, opts);
            _this.query = _this.query || {}; // define global callbacks array if not present
            // we do this here (lazily) to avoid unneeded global pollution

            if (!callbacks) {
              // we need to consider multiple engines in the same page
              callbacks = globalThis.___eio = globalThis.___eio || [];
            } // callback identifier


            _this.index = callbacks.length; // add callback to jsonp global

            var self = _assertThisInitialized(_this);

            callbacks.push(function (msg) {
              self.onData(msg);
            }); // append to query string

            _this.query.j = _this.index;
            return _this;
          }
          /**
           * JSONP only supports binary as base64 encoded strings
           */


          _createClass(JSONPPolling, [{
            key: "doClose",

            /**
             * Closes the socket.
             *
             * @api private
             */
            value: function doClose() {
              if (this.script) {
                // prevent spurious errors from being emitted when the window is unloaded
                this.script.onerror = function () { };

                this.script.parentNode.removeChild(this.script);
                this.script = null;
              }

              if (this.form) {
                this.form.parentNode.removeChild(this.form);
                this.form = null;
                this.iframe = null;
              }

              _get(_getPrototypeOf(JSONPPolling.prototype), "doClose", this).call(this);
            }
            /**
             * Starts a poll cycle.
             *
             * @api private
             */

          }, {
            key: "doPoll",
            value: function doPoll() {
              var self = this;
              var script = document.createElement("script");

              if (this.script) {
                this.script.parentNode.removeChild(this.script);
                this.script = null;
              }

              script.async = true;
              script.src = this.uri();

              script.onerror = function (e) {
                self.onError("jsonp poll error", e);
              };

              var insertAt = document.getElementsByTagName("script")[0];

              if (insertAt) {
                insertAt.parentNode.insertBefore(script, insertAt);
              } else {
                (document.head || document.body).appendChild(script);
              }

              this.script = script;
              var isUAgecko = "undefined" !== typeof navigator && /gecko/i.test(navigator.userAgent);

              if (isUAgecko) {
                setTimeout(function () {
                  var iframe = document.createElement("iframe");
                  document.body.appendChild(iframe);
                  document.body.removeChild(iframe);
                }, 100);
              }
            }
            /**
             * Writes with a hidden iframe.
             *
             * @param {String} data to send
             * @param {Function} called upon flush.
             * @api private
             */

          }, {
            key: "doWrite",
            value: function doWrite(data, fn) {
              var self = this;
              var iframe;

              if (!this.form) {
                var form = document.createElement("form");
                var area = document.createElement("textarea");
                var id = this.iframeId = "eio_iframe_" + this.index;
                form.className = "socketio";
                form.style.position = "absolute";
                form.style.top = "-1000px";
                form.style.left = "-1000px";
                form.target = id;
                form.method = "POST";
                form.setAttribute("accept-charset", "utf-8");
                area.name = "d";
                form.appendChild(area);
                document.body.appendChild(form);
                this.form = form;
                this.area = area;
              }

              this.form.action = this.uri();

              function complete() {
                initIframe();
                fn();
              }

              function initIframe() {
                if (self.iframe) {
                  try {
                    self.form.removeChild(self.iframe);
                  } catch (e) {
                    self.onError("jsonp polling iframe removal error", e);
                  }
                }

                try {
                  // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
                  var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
                  iframe = document.createElement(html);
                } catch (e) {
                  iframe = document.createElement("iframe");
                  iframe.name = self.iframeId;
                  iframe.src = "javascript:0";
                }

                iframe.id = self.iframeId;
                self.form.appendChild(iframe);
                self.iframe = iframe;
              }

              initIframe(); // escape \n to prevent it from being converted into \r\n by some UAs
              // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side

              data = data.replace(rEscapedNewline, "\\\n");
              this.area.value = data.replace(rNewline, "\\n");

              try {
                this.form.submit();
              } catch (e) { }

              if (this.iframe.attachEvent) {
                this.iframe.onreadystatechange = function () {
                  if (self.iframe.readyState === "complete") {
                    complete();
                  }
                };
              } else {
                this.iframe.onload = complete;
              }
            }
          }, {
            key: "supportsBinary",
            get: function get() {
              return false;
            }
          }]);

          return JSONPPolling;
        }(Polling);

        module.exports = JSONPPolling;

        /***/
}),

/***/ "./node_modules/engine.io-client/lib/transports/polling-xhr.js":
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling-xhr.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

        function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

        function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

        function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

        function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

        function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

        function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true; } catch (e) { return false; } }

        function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

        /* global attachEvent */
        var XMLHttpRequest = __webpack_require__(/*! ../../contrib/xmlhttprequest-ssl/XMLHttpRequest */ "./node_modules/engine.io-client/lib/xmlhttprequest.js");

        var Polling = __webpack_require__(/*! ./polling */ "./node_modules/engine.io-client/lib/transports/polling.js");

        var Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");

        var _require = __webpack_require__(/*! ../util */ "./node_modules/engine.io-client/lib/util.js"),
          pick = _require.pick;

        var globalThis = __webpack_require__(/*! ../globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

        var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:polling-xhr");
        /**
         * Empty function
         */


        function empty() { }

        var hasXHR2 = function () {
          var xhr = new XMLHttpRequest({
            xdomain: false
          });
          return null != xhr.responseType;
        }();

        var XHR = /*#__PURE__*/function (_Polling) {
          _inherits(XHR, _Polling);

          var _super = _createSuper(XHR);

          /**
           * XHR Polling constructor.
           *
           * @param {Object} opts
           * @api public
           */
          function XHR(opts) {
            var _this;

            _classCallCheck(this, XHR);

            _this = _super.call(this, opts);

            if (typeof location !== "undefined") {
              var isSSL = "https:" === location.protocol;
              var port = location.port; // some user agents have empty `location.port`

              if (!port) {
                port = isSSL ? 443 : 80;
              }

              _this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
              _this.xs = opts.secure !== isSSL;
            }
            /**
             * XHR supports binary
             */


            var forceBase64 = opts && opts.forceBase64;
            _this.supportsBinary = hasXHR2 && !forceBase64;
            return _this;
          }
          /**
           * Creates a request.
           *
           * @param {String} method
           * @api private
           */


          _createClass(XHR, [{
            key: "request",
            value: function request() {
              var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

              _extends(opts, {
                xd: this.xd,
                xs: this.xs
              }, this.opts);

              return new Request(this.uri(), opts);
            }
            /**
             * Sends data.
             *
             * @param {String} data to send.
             * @param {Function} called upon flush.
             * @api private
             */

          }, {
            key: "doWrite",
            value: function doWrite(data, fn) {
              var req = this.request({
                method: "POST",
                data: data
              });
              var self = this;
              req.on("success", fn);
              req.on("error", function (err) {
                self.onError("xhr post error", err);
              });
            }
            /**
             * Starts a poll cycle.
             *
             * @api private
             */

          }, {
            key: "doPoll",
            value: function doPoll() {
              debug("xhr poll");
              var req = this.request();
              var self = this;
              req.on("data", function (data) {
                self.onData(data);
              });
              req.on("error", function (err) {
                self.onError("xhr poll error", err);
              });
              this.pollXhr = req;
            }
          }]);

          return XHR;
        }(Polling);

        var Request = /*#__PURE__*/function (_Emitter) {
          _inherits(Request, _Emitter);

          var _super2 = _createSuper(Request);

          /**
           * Request constructor
           *
           * @param {Object} options
           * @api public
           */
          function Request(uri, opts) {
            var _this2;

            _classCallCheck(this, Request);

            _this2 = _super2.call(this);
            _this2.opts = opts;
            _this2.method = opts.method || "GET";
            _this2.uri = uri;
            _this2.async = false !== opts.async;
            _this2.data = undefined !== opts.data ? opts.data : null;

            _this2.create();

            return _this2;
          }
          /**
           * Creates the XHR object and sends the request.
           *
           * @api private
           */


          _createClass(Request, [{
            key: "create",
            value: function create() {
              var opts = pick(this.opts, "agent", "enablesXDR", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
              opts.xdomain = !!this.opts.xd;
              opts.xscheme = !!this.opts.xs;
              var xhr = this.xhr = new XMLHttpRequest(opts);
              var self = this;

              try {
                debug("xhr open %s: %s", this.method, this.uri);
                xhr.open(this.method, this.uri, this.async);

                try {
                  if (this.opts.extraHeaders) {
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);

                    for (var i in this.opts.extraHeaders) {
                      if (this.opts.extraHeaders.hasOwnProperty(i)) {
                        xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                      }
                    }
                  }
                } catch (e) { }

                if ("POST" === this.method) {
                  try {
                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                  } catch (e) { }
                }

                try {
                  xhr.setRequestHeader("Accept", "*/*");
                } catch (e) { } // ie6 check


                if ("withCredentials" in xhr) {
                  xhr.withCredentials = this.opts.withCredentials;
                }

                if (this.opts.requestTimeout) {
                  xhr.timeout = this.opts.requestTimeout;
                }

                if (this.hasXDR()) {
                  xhr.onload = function () {
                    self.onLoad();
                  };

                  xhr.onerror = function () {
                    self.onError(xhr.responseText);
                  };
                } else {
                  xhr.onreadystatechange = function () {
                    if (4 !== xhr.readyState) return;

                    if (200 === xhr.status || 1223 === xhr.status) {
                      self.onLoad();
                    } else {
                      // make sure the `error` event handler that's user-set
                      // does not throw in the same tick and gets caught here
                      setTimeout(function () {
                        self.onError(typeof xhr.status === "number" ? xhr.status : 0);
                      }, 0);
                    }
                  };
                }

                debug("xhr data %s", this.data);
                xhr.send(this.data);
              } catch (e) {
                // Need to defer since .create() is called directly from the constructor
                // and thus the 'error' event can only be only bound *after* this exception
                // occurs.  Therefore, also, we cannot throw here at all.
                setTimeout(function () {
                  self.onError(e);
                }, 0);
                return;
              }

              if (typeof document !== "undefined") {
                this.index = Request.requestsCount++;
                Request.requests[this.index] = this;
              }
            }
            /**
             * Called upon successful response.
             *
             * @api private
             */

          }, {
            key: "onSuccess",
            value: function onSuccess() {
              this.emit("success");
              this.cleanup();
            }
            /**
             * Called if we have data.
             *
             * @api private
             */

          }, {
            key: "onData",
            value: function onData(data) {
              this.emit("data", data);
              this.onSuccess();
            }
            /**
             * Called upon error.
             *
             * @api private
             */

          }, {
            key: "onError",
            value: function onError(err) {
              this.emit("error", err);
              this.cleanup(true);
            }
            /**
             * Cleans up house.
             *
             * @api private
             */

          }, {
            key: "cleanup",
            value: function cleanup(fromError) {
              if ("undefined" === typeof this.xhr || null === this.xhr) {
                return;
              } // xmlhttprequest


              if (this.hasXDR()) {
                this.xhr.onload = this.xhr.onerror = empty;
              } else {
                this.xhr.onreadystatechange = empty;
              }

              if (fromError) {
                try {
                  this.xhr.abort();
                } catch (e) { }
              }

              if (typeof document !== "undefined") {
                delete Request.requests[this.index];
              }

              this.xhr = null;
            }
            /**
             * Called upon load.
             *
             * @api private
             */

          }, {
            key: "onLoad",
            value: function onLoad() {
              var data = this.xhr.responseText;

              if (data !== null) {
                this.onData(data);
              }
            }
            /**
             * Check if it has XDomainRequest.
             *
             * @api private
             */

          }, {
            key: "hasXDR",
            value: function hasXDR() {
              return typeof XDomainRequest !== "undefined" && !this.xs && this.enablesXDR;
            }
            /**
             * Aborts the request.
             *
             * @api public
             */

          }, {
            key: "abort",
            value: function abort() {
              this.cleanup();
            }
          }]);

          return Request;
        }(Emitter);
        /**
         * Aborts pending requests when unloading the window. This is needed to prevent
         * memory leaks (e.g. when using IE) and to ensure that no spurious error is
         * emitted.
         */


        Request.requestsCount = 0;
        Request.requests = {};

        if (typeof document !== "undefined") {
          if (typeof attachEvent === "function") {
            attachEvent("onunload", unloadHandler);
          } else if (typeof addEventListener === "function") {
            var terminationEvent = "onpagehide" in globalThis ? "pagehide" : "unload";
            addEventListener(terminationEvent, unloadHandler, false);
          }
        }

        function unloadHandler() {
          for (var i in Request.requests) {
            if (Request.requests.hasOwnProperty(i)) {
              Request.requests[i].abort();
            }
          }
        }

        module.exports = XHR;
        module.exports.Request = Request;

        /***/
}),

/***/ "./node_modules/engine.io-client/lib/transports/polling.js":
/*!*****************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

        function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

        function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

        function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

        function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

        function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true; } catch (e) { return false; } }

        function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

        var Transport = __webpack_require__(/*! ../transport */ "./node_modules/engine.io-client/lib/transport.js");

        var parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");

        var parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");

        var yeast = __webpack_require__(/*! yeast */ "./node_modules/yeast/index.js");

        var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:polling");

        var Polling = /*#__PURE__*/function (_Transport) {
          _inherits(Polling, _Transport);

          var _super = _createSuper(Polling);

          function Polling() {
            _classCallCheck(this, Polling);

            return _super.apply(this, arguments);
          }

          _createClass(Polling, [{
            key: "doOpen",

            /**
             * Opens the socket (triggers polling). We write a PING message to determine
             * when the transport is open.
             *
             * @api private
             */
            value: function doOpen() {
              this.poll();
            }
            /**
             * Pauses polling.
             *
             * @param {Function} callback upon buffers are flushed and transport is paused
             * @api private
             */

          }, {
            key: "pause",
            value: function pause(onPause) {
              var self = this;
              this.readyState = "pausing";

              function pause() {
                debug("paused");
                self.readyState = "paused";
                onPause();
              }

              if (this.polling || !this.writable) {
                var total = 0;

                if (this.polling) {
                  debug("we are currently polling - waiting to pause");
                  total++;
                  this.once("pollComplete", function () {
                    debug("pre-pause polling complete");
                    --total || pause();
                  });
                }

                if (!this.writable) {
                  debug("we are currently writing - waiting to pause");
                  total++;
                  this.once("drain", function () {
                    debug("pre-pause writing complete");
                    --total || pause();
                  });
                }
              } else {
                pause();
              }
            }
            /**
             * Starts polling cycle.
             *
             * @api public
             */

          }, {
            key: "poll",
            value: function poll() {
              debug("polling");
              this.polling = true;
              this.doPoll();
              this.emit("poll");
            }
            /**
             * Overloads onData to detect payloads.
             *
             * @api private
             */

          }, {
            key: "onData",
            value: function onData(data) {
              var self = this;
              debug("polling got data %s", data);

              var callback = function callback(packet, index, total) {
                // if its the first message we consider the transport open
                if ("opening" === self.readyState && packet.type === "open") {
                  self.onOpen();
                } // if its a close packet, we close the ongoing requests


                if ("close" === packet.type) {
                  self.onClose();
                  return false;
                } // otherwise bypass onData and handle the message


                self.onPacket(packet);
              }; // decode payload


              parser.decodePayload(data, this.socket.binaryType).forEach(callback); // if an event did not trigger closing

              if ("closed" !== this.readyState) {
                // if we got data we're not polling
                this.polling = false;
                this.emit("pollComplete");

                if ("open" === this.readyState) {
                  this.poll();
                } else {
                  debug('ignoring poll - transport state "%s"', this.readyState);
                }
              }
            }
            /**
             * For polling, send a close packet.
             *
             * @api private
             */

          }, {
            key: "doClose",
            value: function doClose() {
              var self = this;

              function close() {
                debug("writing close packet");
                self.write([{
                  type: "close"
                }]);
              }

              if ("open" === this.readyState) {
                debug("transport open - closing");
                close();
              } else {
                // in case we're trying to close while
                // handshaking is in progress (GH-164)
                debug("transport not open - deferring close");
                this.once("open", close);
              }
            }
            /**
             * Writes a packets payload.
             *
             * @param {Array} data packets
             * @param {Function} drain callback
             * @api private
             */

          }, {
            key: "write",
            value: function write(packets) {
              var _this = this;

              this.writable = false;
              parser.encodePayload(packets, function (data) {
                _this.doWrite(data, function () {
                  _this.writable = true;

                  _this.emit("drain");
                });
              });
            }
            /**
             * Generates uri for connection.
             *
             * @api private
             */

          }, {
            key: "uri",
            value: function uri() {
              var query = this.query || {};
              var schema = this.opts.secure ? "https" : "http";
              var port = ""; // cache busting is forced

              if (false !== this.opts.timestampRequests) {
                query[this.opts.timestampParam] = yeast();
              }

              if (!this.supportsBinary && !query.sid) {
                query.b64 = 1;
              }

              query = parseqs.encode(query); // avoid port if default for schema

              if (this.opts.port && ("https" === schema && Number(this.opts.port) !== 443 || "http" === schema && Number(this.opts.port) !== 80)) {
                port = ":" + this.opts.port;
              } // prepend ? to query


              if (query.length) {
                query = "?" + query;
              }

              var ipv6 = this.opts.hostname.indexOf(":") !== -1;
              return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + query;
            }
          }, {
            key: "name",

            /**
             * Transport name.
             */
            get: function get() {
              return "polling";
            }
          }]);

          return Polling;
        }(Transport);

        module.exports = Polling;

        /***/
}),

/***/ "./node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        var globalThis = __webpack_require__(/*! ../globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

        module.exports = {
          WebSocket: globalThis.WebSocket || globalThis.MozWebSocket,
          usingBrowserWebSocket: true,
          defaultBinaryType: "arraybuffer"
        };

        /***/
}),

/***/ "./node_modules/engine.io-client/lib/transports/websocket.js":
/*!*******************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/websocket.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

        function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

        function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

        function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

        function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

        function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true; } catch (e) { return false; } }

        function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

        var Transport = __webpack_require__(/*! ../transport */ "./node_modules/engine.io-client/lib/transport.js");

        var parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/index.js");

        var parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");

        var yeast = __webpack_require__(/*! yeast */ "./node_modules/yeast/index.js");

        var _require = __webpack_require__(/*! ../util */ "./node_modules/engine.io-client/lib/util.js"),
          pick = _require.pick;

        var _require2 = __webpack_require__(/*! ./websocket-constructor */ "./node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js"),
          WebSocket = _require2.WebSocket,
          usingBrowserWebSocket = _require2.usingBrowserWebSocket,
          defaultBinaryType = _require2.defaultBinaryType;

        var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("engine.io-client:websocket"); // detect ReactNative environment


        var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";

        var WS = /*#__PURE__*/function (_Transport) {
          _inherits(WS, _Transport);

          var _super = _createSuper(WS);

          /**
           * WebSocket transport constructor.
           *
           * @api {Object} connection options
           * @api public
           */
          function WS(opts) {
            var _this;

            _classCallCheck(this, WS);

            _this = _super.call(this, opts);
            _this.supportsBinary = !opts.forceBase64;
            return _this;
          }
          /**
           * Transport name.
           *
           * @api public
           */


          _createClass(WS, [{
            key: "doOpen",

            /**
             * Opens socket.
             *
             * @api private
             */
            value: function doOpen() {
              if (!this.check()) {
                // let probe timeout
                return;
              }

              var uri = this.uri();
              var protocols = this.opts.protocols; // React Native only supports the 'headers' option, and will print a warning if anything else is passed

              var opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");

              if (this.opts.extraHeaders) {
                opts.headers = this.opts.extraHeaders;
              }

              try {
                this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
              } catch (err) {
                return this.emit("error", err);
              }

              this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
              this.addEventListeners();
            }
            /**
             * Adds event listeners to the socket
             *
             * @api private
             */

          }, {
            key: "addEventListeners",
            value: function addEventListeners() {
              var _this2 = this;

              this.ws.onopen = function () {
                if (_this2.opts.autoUnref) {
                  _this2.ws._socket.unref();
                }

                _this2.onOpen();
              };

              this.ws.onclose = this.onClose.bind(this);

              this.ws.onmessage = function (ev) {
                return _this2.onData(ev.data);
              };

              this.ws.onerror = function (e) {
                return _this2.onError("websocket error", e);
              };
            }
            /**
             * Writes data to socket.
             *
             * @param {Array} array of packets.
             * @api private
             */

          }, {
            key: "write",
            value: function write(packets) {
              var self = this;
              this.writable = false; // encodePacket efficient as it uses WS framing
              // no need for encodePayload

              var total = packets.length;
              var i = 0;
              var l = total;

              for (; i < l; i++) {
                (function (packet) {
                  parser.encodePacket(packet, self.supportsBinary, function (data) {
                    // always create a new object (GH-437)
                    var opts = {};

                    if (!usingBrowserWebSocket) {
                      if (packet.options) {
                        opts.compress = packet.options.compress;
                      }

                      if (self.opts.perMessageDeflate) {
                        var len = "string" === typeof data ? Buffer.byteLength(data) : data.length;

                        if (len < self.opts.perMessageDeflate.threshold) {
                          opts.compress = false;
                        }
                      }
                    } // Sometimes the websocket has already been closed but the browser didn't
                    // have a chance of informing us about it yet, in that case send will
                    // throw an error


                    try {
                      if (usingBrowserWebSocket) {
                        // TypeError is thrown when passing the second argument on Safari
                        self.ws.send(data);
                      } else {
                        self.ws.send(data, opts);
                      }
                    } catch (e) {
                      debug("websocket closed before onclose event");
                    }

                    --total || done();
                  });
                })(packets[i]);
              }

              function done() {
                self.emit("flush"); // fake drain
                // defer to next tick to allow Socket to clear writeBuffer

                setTimeout(function () {
                  self.writable = true;
                  self.emit("drain");
                }, 0);
              }
            }
            /**
             * Called upon close
             *
             * @api private
             */

          }, {
            key: "onClose",
            value: function onClose() {
              Transport.prototype.onClose.call(this);
            }
            /**
             * Closes socket.
             *
             * @api private
             */

          }, {
            key: "doClose",
            value: function doClose() {
              if (typeof this.ws !== "undefined") {
                this.ws.close();
                this.ws = null;
              }
            }
            /**
             * Generates uri for connection.
             *
             * @api private
             */

          }, {
            key: "uri",
            value: function uri() {
              var query = this.query || {};
              var schema = this.opts.secure ? "wss" : "ws";
              var port = ""; // avoid port if default for schema

              if (this.opts.port && ("wss" === schema && Number(this.opts.port) !== 443 || "ws" === schema && Number(this.opts.port) !== 80)) {
                port = ":" + this.opts.port;
              } // append timestamp to URI


              if (this.opts.timestampRequests) {
                query[this.opts.timestampParam] = yeast();
              } // communicate binary support capabilities


              if (!this.supportsBinary) {
                query.b64 = 1;
              }

              query = parseqs.encode(query); // prepend ? to query

              if (query.length) {
                query = "?" + query;
              }

              var ipv6 = this.opts.hostname.indexOf(":") !== -1;
              return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + query;
            }
            /**
             * Feature detection for WebSocket.
             *
             * @return {Boolean} whether this transport is available.
             * @api public
             */

          }, {
            key: "check",
            value: function check() {
              return !!WebSocket && !("__initialize" in WebSocket && this.name === WS.prototype.name);
            }
          }, {
            key: "name",
            get: function get() {
              return "websocket";
            }
          }]);

          return WS;
        }(Transport);

        module.exports = WS;

        /***/
}),

/***/ "./node_modules/engine.io-client/lib/util.js":
/*!***************************************************!*\
  !*** ./node_modules/engine.io-client/lib/util.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

        module.exports.pick = function (obj) {
          for (var _len = arguments.length, attr = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            attr[_key - 1] = arguments[_key];
          }

          return attr.reduce(function (acc, k) {
            if (obj.hasOwnProperty(k)) {
              acc[k] = obj[k];
            }

            return acc;
          }, {});
        };

        /***/
}),

/***/ "./node_modules/engine.io-client/lib/xmlhttprequest.js":
/*!*************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/xmlhttprequest.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        // browser shim for xmlhttprequest module
        var hasCORS = __webpack_require__(/*! has-cors */ "./node_modules/has-cors/index.js");

        var globalThis = __webpack_require__(/*! ./globalThis */ "./node_modules/engine.io-client/lib/globalThis.browser.js");

        module.exports = function (opts) {
          var xdomain = opts.xdomain; // scheme must be same when usign XDomainRequest
          // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx

          var xscheme = opts.xscheme; // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
          // https://github.com/Automattic/engine.io-client/pull/217

          var enablesXDR = opts.enablesXDR; // XMLHttpRequest can be disabled on IE

          try {
            if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
              return new XMLHttpRequest();
            }
          } catch (e) { } // Use XDomainRequest for IE8 if enablesXDR is true
          // because loading bar keeps flashing when using jsonp-polling
          // https://github.com/yujiosaka/socke.io-ie8-loading-example


          try {
            if ("undefined" !== typeof XDomainRequest && !xscheme && enablesXDR) {
              return new XDomainRequest();
            }
          } catch (e) { }

          if (!xdomain) {
            try {
              return new globalThis[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
            } catch (e) { }
          }
        };

        /***/
}),

/***/ "./node_modules/engine.io-parser/lib/commons.js":
/*!******************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/commons.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

        var PACKET_TYPES = Object.create(null); // no Map = no polyfill

        PACKET_TYPES["open"] = "0";
        PACKET_TYPES["close"] = "1";
        PACKET_TYPES["ping"] = "2";
        PACKET_TYPES["pong"] = "3";
        PACKET_TYPES["message"] = "4";
        PACKET_TYPES["upgrade"] = "5";
        PACKET_TYPES["noop"] = "6";
        var PACKET_TYPES_REVERSE = Object.create(null);
        Object.keys(PACKET_TYPES).forEach(function (key) {
          PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
        });
        var ERROR_PACKET = {
          type: "error",
          data: "parser error"
        };
        module.exports = {
          PACKET_TYPES: PACKET_TYPES,
          PACKET_TYPES_REVERSE: PACKET_TYPES_REVERSE,
          ERROR_PACKET: ERROR_PACKET
        };

        /***/
}),

/***/ "./node_modules/engine.io-parser/lib/decodePacket.browser.js":
/*!*******************************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/decodePacket.browser.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        var _require = __webpack_require__(/*! ./commons */ "./node_modules/engine.io-parser/lib/commons.js"),
          PACKET_TYPES_REVERSE = _require.PACKET_TYPES_REVERSE,
          ERROR_PACKET = _require.ERROR_PACKET;

        var withNativeArrayBuffer = typeof ArrayBuffer === "function";
        var base64decoder;

        if (withNativeArrayBuffer) {
          base64decoder = __webpack_require__(/*! base64-arraybuffer */ "./node_modules/engine.io-parser/node_modules/base64-arraybuffer/lib/base64-arraybuffer.js");
        }

        var decodePacket = function decodePacket(encodedPacket, binaryType) {
          if (typeof encodedPacket !== "string") {
            return {
              type: "message",
              data: mapBinary(encodedPacket, binaryType)
            };
          }

          var type = encodedPacket.charAt(0);

          if (type === "b") {
            return {
              type: "message",
              data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
            };
          }

          var packetType = PACKET_TYPES_REVERSE[type];

          if (!packetType) {
            return ERROR_PACKET;
          }

          return encodedPacket.length > 1 ? {
            type: PACKET_TYPES_REVERSE[type],
            data: encodedPacket.substring(1)
          } : {
              type: PACKET_TYPES_REVERSE[type]
            };
        };

        var decodeBase64Packet = function decodeBase64Packet(data, binaryType) {
          if (base64decoder) {
            var decoded = base64decoder.decode(data);
            return mapBinary(decoded, binaryType);
          } else {
            return {
              base64: true,
              data: data
            }; // fallback for old browsers
          }
        };

        var mapBinary = function mapBinary(data, binaryType) {
          switch (binaryType) {
            case "blob":
              return data instanceof ArrayBuffer ? new Blob([data]) : data;

            case "arraybuffer":
            default:
              return data;
            // assuming the data is already an ArrayBuffer
          }
        };

        module.exports = decodePacket;

        /***/
}),

/***/ "./node_modules/engine.io-parser/lib/encodePacket.browser.js":
/*!*******************************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/encodePacket.browser.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        var _require = __webpack_require__(/*! ./commons */ "./node_modules/engine.io-parser/lib/commons.js"),
          PACKET_TYPES = _require.PACKET_TYPES;

        var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
        var withNativeArrayBuffer = typeof ArrayBuffer === "function"; // ArrayBuffer.isView method is not defined in IE10

        var isView = function isView(obj) {
          return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
        };

        var encodePacket = function encodePacket(_ref, supportsBinary, callback) {
          var type = _ref.type,
            data = _ref.data;

          if (withNativeBlob && data instanceof Blob) {
            if (supportsBinary) {
              return callback(data);
            } else {
              return encodeBlobAsBase64(data, callback);
            }
          } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
            if (supportsBinary) {
              return callback(data instanceof ArrayBuffer ? data : data.buffer);
            } else {
              return encodeBlobAsBase64(new Blob([data]), callback);
            }
          } // plain string


          return callback(PACKET_TYPES[type] + (data || ""));
        };

        var encodeBlobAsBase64 = function encodeBlobAsBase64(data, callback) {
          var fileReader = new FileReader();

          fileReader.onload = function () {
            var content = fileReader.result.split(",")[1];
            callback("b" + content);
          };

          return fileReader.readAsDataURL(data);
        };

        module.exports = encodePacket;

        /***/
}),

/***/ "./node_modules/engine.io-parser/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        var encodePacket = __webpack_require__(/*! ./encodePacket */ "./node_modules/engine.io-parser/lib/encodePacket.browser.js");

        var decodePacket = __webpack_require__(/*! ./decodePacket */ "./node_modules/engine.io-parser/lib/decodePacket.browser.js");

        var SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text

        var encodePayload = function encodePayload(packets, callback) {
          // some packets may be added to the array while encoding, so the initial length must be saved
          var length = packets.length;
          var encodedPackets = new Array(length);
          var count = 0;
          packets.forEach(function (packet, i) {
            // force base64 encoding for binary packets
            encodePacket(packet, false, function (encodedPacket) {
              encodedPackets[i] = encodedPacket;

              if (++count === length) {
                callback(encodedPackets.join(SEPARATOR));
              }
            });
          });
        };

        var decodePayload = function decodePayload(encodedPayload, binaryType) {
          var encodedPackets = encodedPayload.split(SEPARATOR);
          var packets = [];

          for (var i = 0; i < encodedPackets.length; i++) {
            var decodedPacket = decodePacket(encodedPackets[i], binaryType);
            packets.push(decodedPacket);

            if (decodedPacket.type === "error") {
              break;
            }
          }

          return packets;
        };

        module.exports = {
          protocol: 4,
          encodePacket: encodePacket,
          encodePayload: encodePayload,
          decodePacket: decodePacket,
          decodePayload: decodePayload
        };

        /***/
}),

/***/ "./node_modules/engine.io-parser/node_modules/base64-arraybuffer/lib/base64-arraybuffer.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/engine.io-parser/node_modules/base64-arraybuffer/lib/base64-arraybuffer.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

        /*
         * base64-arraybuffer
         * https://github.com/niklasvh/base64-arraybuffer
         *
         * Copyright (c) 2012 Niklas von Hertzen
         * Licensed under the MIT license.
         */
        (function (chars) {
          "use strict";

          exports.encode = function (arraybuffer) {
            var bytes = new Uint8Array(arraybuffer),
              i,
              len = bytes.length,
              base64 = "";

            for (i = 0; i < len; i += 3) {
              base64 += chars[bytes[i] >> 2];
              base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
              base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
              base64 += chars[bytes[i + 2] & 63];
            }

            if (len % 3 === 2) {
              base64 = base64.substring(0, base64.length - 1) + "=";
            } else if (len % 3 === 1) {
              base64 = base64.substring(0, base64.length - 2) + "==";
            }

            return base64;
          };

          exports.decode = function (base64) {
            var bufferLength = base64.length * 0.75,
              len = base64.length,
              i,
              p = 0,
              encoded1,
              encoded2,
              encoded3,
              encoded4;

            if (base64[base64.length - 1] === "=") {
              bufferLength--;

              if (base64[base64.length - 2] === "=") {
                bufferLength--;
              }
            }

            var arraybuffer = new ArrayBuffer(bufferLength),
              bytes = new Uint8Array(arraybuffer);

            for (i = 0; i < len; i += 4) {
              encoded1 = chars.indexOf(base64[i]);
              encoded2 = chars.indexOf(base64[i + 1]);
              encoded3 = chars.indexOf(base64[i + 2]);
              encoded4 = chars.indexOf(base64[i + 3]);
              bytes[p++] = encoded1 << 2 | encoded2 >> 4;
              bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
              bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
            }

            return arraybuffer;
          };
        })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");

        /***/
}),

/***/ "./node_modules/has-cors/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-cors/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function (module, exports) {

        /**
         * Module exports.
         *
         * Logic borrowed from Modernizr:
         *
         *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
         */
        try {
          module.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
        } catch (err) {
          // if XMLHttp support is disabled in IE then it will throw
          // when trying to create
          module.exports = false;
        }

        /***/
}),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function (module, exports) {

        function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

        /**
         * Helpers.
         */
        var s = 1000;
        var m = s * 60;
        var h = m * 60;
        var d = h * 24;
        var w = d * 7;
        var y = d * 365.25;
        /**
         * Parse or format the given `val`.
         *
         * Options:
         *
         *  - `long` verbose formatting [false]
         *
         * @param {String|Number} val
         * @param {Object} [options]
         * @throws {Error} throw an error if val is not a non-empty string or a number
         * @return {String|Number}
         * @api public
         */

        module.exports = function (val, options) {
          options = options || {};

          var type = _typeof(val);

          if (type === 'string' && val.length > 0) {
            return parse(val);
          } else if (type === 'number' && isFinite(val)) {
            return options["long"] ? fmtLong(val) : fmtShort(val);
          }

          throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
        };
        /**
         * Parse the given `str` and return milliseconds.
         *
         * @param {String} str
         * @return {Number}
         * @api private
         */


        function parse(str) {
          str = String(str);

          if (str.length > 100) {
            return;
          }

          var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

          if (!match) {
            return;
          }

          var n = parseFloat(match[1]);
          var type = (match[2] || 'ms').toLowerCase();

          switch (type) {
            case 'years':
            case 'year':
            case 'yrs':
            case 'yr':
            case 'y':
              return n * y;

            case 'weeks':
            case 'week':
            case 'w':
              return n * w;

            case 'days':
            case 'day':
            case 'd':
              return n * d;

            case 'hours':
            case 'hour':
            case 'hrs':
            case 'hr':
            case 'h':
              return n * h;

            case 'minutes':
            case 'minute':
            case 'mins':
            case 'min':
            case 'm':
              return n * m;

            case 'seconds':
            case 'second':
            case 'secs':
            case 'sec':
            case 's':
              return n * s;

            case 'milliseconds':
            case 'millisecond':
            case 'msecs':
            case 'msec':
            case 'ms':
              return n;

            default:
              return undefined;
          }
        }
        /**
         * Short format for `ms`.
         *
         * @param {Number} ms
         * @return {String}
         * @api private
         */


        function fmtShort(ms) {
          var msAbs = Math.abs(ms);

          if (msAbs >= d) {
            return Math.round(ms / d) + 'd';
          }

          if (msAbs >= h) {
            return Math.round(ms / h) + 'h';
          }

          if (msAbs >= m) {
            return Math.round(ms / m) + 'm';
          }

          if (msAbs >= s) {
            return Math.round(ms / s) + 's';
          }

          return ms + 'ms';
        }
        /**
         * Long format for `ms`.
         *
         * @param {Number} ms
         * @return {String}
         * @api private
         */


        function fmtLong(ms) {
          var msAbs = Math.abs(ms);

          if (msAbs >= d) {
            return plural(ms, msAbs, d, 'day');
          }

          if (msAbs >= h) {
            return plural(ms, msAbs, h, 'hour');
          }

          if (msAbs >= m) {
            return plural(ms, msAbs, m, 'minute');
          }

          if (msAbs >= s) {
            return plural(ms, msAbs, s, 'second');
          }

          return ms + ' ms';
        }
        /**
         * Pluralization helper.
         */


        function plural(ms, msAbs, n, name) {
          var isPlural = msAbs >= n * 1.5;
          return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
        }

        /***/
}),

/***/ "./node_modules/parseqs/index.js":
/*!***************************************!*\
  !*** ./node_modules/parseqs/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function (module, exports) {

        /**
         * Compiles a querystring
         * Returns string representation of the object
         *
         * @param {Object}
         * @api private
         */
        exports.encode = function (obj) {
          var str = '';

          for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
              if (str.length) str += '&';
              str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
            }
          }

          return str;
        };
        /**
         * Parses a simple querystring into an object
         *
         * @param {String} qs
         * @api private
         */


        exports.decode = function (qs) {
          var qry = {};
          var pairs = qs.split('&');

          for (var i = 0, l = pairs.length; i < l; i++) {
            var pair = pairs[i].split('=');
            qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
          }

          return qry;
        };

        /***/
}),

/***/ "./node_modules/parseuri/index.js":
/*!****************************************!*\
  !*** ./node_modules/parseuri/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function (module, exports) {

        /**
         * Parses an URI
         *
         * @author Steven Levithan <stevenlevithan.com> (MIT license)
         * @api private
         */
        var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
        var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

        module.exports = function parseuri(str) {
          var src = str,
            b = str.indexOf('['),
            e = str.indexOf(']');

          if (b != -1 && e != -1) {
            str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
          }

          var m = re.exec(str || ''),
            uri = {},
            i = 14;

          while (i--) {
            uri[parts[i]] = m[i] || '';
          }

          if (b != -1 && e != -1) {
            uri.source = src;
            uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
            uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
            uri.ipv6uri = true;
          }

          uri.pathNames = pathNames(uri, uri['path']);
          uri.queryKey = queryKey(uri, uri['query']);
          return uri;
        };

        function pathNames(obj, path) {
          var regx = /\/{2,9}/g,
            names = path.replace(regx, "/").split("/");

          if (path.substr(0, 1) == '/' || path.length === 0) {
            names.splice(0, 1);
          }

          if (path.substr(path.length - 1, 1) == '/') {
            names.splice(names.length - 1, 1);
          }

          return names;
        }

        function queryKey(uri, query) {
          var data = {};
          query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
            if ($1) {
              data[$1] = $2;
            }
          });
          return data;
        }

        /***/
}),

/***/ "./node_modules/socket.io-parser/dist/binary.js":
/*!******************************************************!*\
  !*** ./node_modules/socket.io-parser/dist/binary.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";


        function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.reconstructPacket = exports.deconstructPacket = void 0;

        var is_binary_1 = __webpack_require__(/*! ./is-binary */ "./node_modules/socket.io-parser/dist/is-binary.js");
        /**
         * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
         *
         * @param {Object} packet - socket.io event packet
         * @return {Object} with deconstructed packet and list of buffers
         * @public
         */


        function deconstructPacket(packet) {
          var buffers = [];
          var packetData = packet.data;
          var pack = packet;
          pack.data = _deconstructPacket(packetData, buffers);
          pack.attachments = buffers.length; // number of binary 'attachments'

          return {
            packet: pack,
            buffers: buffers
          };
        }

        exports.deconstructPacket = deconstructPacket;

        function _deconstructPacket(data, buffers) {
          if (!data) return data;

          if (is_binary_1.isBinary(data)) {
            var placeholder = {
              _placeholder: true,
              num: buffers.length
            };
            buffers.push(data);
            return placeholder;
          } else if (Array.isArray(data)) {
            var newData = new Array(data.length);

            for (var i = 0; i < data.length; i++) {
              newData[i] = _deconstructPacket(data[i], buffers);
            }

            return newData;
          } else if (_typeof(data) === "object" && !(data instanceof Date)) {
            var _newData = {};

            for (var key in data) {
              if (data.hasOwnProperty(key)) {
                _newData[key] = _deconstructPacket(data[key], buffers);
              }
            }

            return _newData;
          }

          return data;
        }
        /**
         * Reconstructs a binary packet from its placeholder packet and buffers
         *
         * @param {Object} packet - event packet with placeholders
         * @param {Array} buffers - binary buffers to put in placeholder positions
         * @return {Object} reconstructed packet
         * @public
         */


        function reconstructPacket(packet, buffers) {
          packet.data = _reconstructPacket(packet.data, buffers);
          packet.attachments = undefined; // no longer useful

          return packet;
        }

        exports.reconstructPacket = reconstructPacket;

        function _reconstructPacket(data, buffers) {
          if (!data) return data;

          if (data && data._placeholder) {
            return buffers[data.num]; // appropriate buffer (should be natural order anyway)
          } else if (Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
              data[i] = _reconstructPacket(data[i], buffers);
            }
          } else if (_typeof(data) === "object") {
            for (var key in data) {
              if (data.hasOwnProperty(key)) {
                data[key] = _reconstructPacket(data[key], buffers);
              }
            }
          }

          return data;
        }

        /***/
}),

/***/ "./node_modules/socket.io-parser/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/socket.io-parser/dist/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";


        function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

        function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

        function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

        function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

        function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

        function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

        function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

        function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true; } catch (e) { return false; } }

        function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

        function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;

        var Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");

        var binary_1 = __webpack_require__(/*! ./binary */ "./node_modules/socket.io-parser/dist/binary.js");

        var is_binary_1 = __webpack_require__(/*! ./is-binary */ "./node_modules/socket.io-parser/dist/is-binary.js");

        var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")("socket.io-parser");
        /**
         * Protocol version.
         *
         * @public
         */


        exports.protocol = 5;
        var PacketType;

        (function (PacketType) {
          PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
          PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
          PacketType[PacketType["EVENT"] = 2] = "EVENT";
          PacketType[PacketType["ACK"] = 3] = "ACK";
          PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
          PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
          PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
        })(PacketType = exports.PacketType || (exports.PacketType = {}));
        /**
         * A socket.io Encoder instance
         */


        var Encoder = /*#__PURE__*/function () {
          function Encoder() {
            _classCallCheck(this, Encoder);
          }

          _createClass(Encoder, [{
            key: "encode",

            /**
             * Encode a packet as a single string if non-binary, or as a
             * buffer sequence, depending on packet type.
             *
             * @param {Object} obj - packet object
             */
            value: function encode(obj) {
              debug("encoding packet %j", obj);

              if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
                if (is_binary_1.hasBinary(obj)) {
                  obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
                  return this.encodeAsBinary(obj);
                }
              }

              return [this.encodeAsString(obj)];
            }
            /**
             * Encode packet as string.
             */

          }, {
            key: "encodeAsString",
            value: function encodeAsString(obj) {
              // first is type
              var str = "" + obj.type; // attachments if we have them

              if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
                str += obj.attachments + "-";
              } // if we have a namespace other than `/`
              // we append it followed by a comma `,`


              if (obj.nsp && "/" !== obj.nsp) {
                str += obj.nsp + ",";
              } // immediately followed by the id


              if (null != obj.id) {
                str += obj.id;
              } // json data


              if (null != obj.data) {
                str += JSON.stringify(obj.data);
              }

              debug("encoded %j as %s", obj, str);
              return str;
            }
            /**
             * Encode packet as 'buffer sequence' by removing blobs, and
             * deconstructing packet into object with placeholders and
             * a list of buffers.
             */

          }, {
            key: "encodeAsBinary",
            value: function encodeAsBinary(obj) {
              var deconstruction = binary_1.deconstructPacket(obj);
              var pack = this.encodeAsString(deconstruction.packet);
              var buffers = deconstruction.buffers;
              buffers.unshift(pack); // add packet info to beginning of data list

              return buffers; // write all the buffers
            }
          }]);

          return Encoder;
        }();

        exports.Encoder = Encoder;
        /**
         * A socket.io Decoder instance
         *
         * @return {Object} decoder
         */

        var Decoder = /*#__PURE__*/function (_Emitter) {
          _inherits(Decoder, _Emitter);

          var _super = _createSuper(Decoder);

          function Decoder() {
            _classCallCheck(this, Decoder);

            return _super.call(this);
          }
          /**
           * Decodes an encoded packet string into packet JSON.
           *
           * @param {String} obj - encoded packet
           */


          _createClass(Decoder, [{
            key: "add",
            value: function add(obj) {
              var packet;

              if (typeof obj === "string") {
                packet = this.decodeString(obj);

                if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
                  // binary packet's json
                  this.reconstructor = new BinaryReconstructor(packet); // no attachments, labeled binary but no binary data to follow

                  if (packet.attachments === 0) {
                    _get(_getPrototypeOf(Decoder.prototype), "emit", this).call(this, "decoded", packet);
                  }
                } else {
                  // non-binary full packet
                  _get(_getPrototypeOf(Decoder.prototype), "emit", this).call(this, "decoded", packet);
                }
              } else if (is_binary_1.isBinary(obj) || obj.base64) {
                // raw binary data
                if (!this.reconstructor) {
                  throw new Error("got binary data when not reconstructing a packet");
                } else {
                  packet = this.reconstructor.takeBinaryData(obj);

                  if (packet) {
                    // received final buffer
                    this.reconstructor = null;

                    _get(_getPrototypeOf(Decoder.prototype), "emit", this).call(this, "decoded", packet);
                  }
                }
              } else {
                throw new Error("Unknown type: " + obj);
              }
            }
            /**
             * Decode a packet String (JSON data)
             *
             * @param {String} str
             * @return {Object} packet
             */

          }, {
            key: "decodeString",
            value: function decodeString(str) {
              var i = 0; // look up type

              var p = {
                type: Number(str.charAt(0))
              };

              if (PacketType[p.type] === undefined) {
                throw new Error("unknown packet type " + p.type);
              } // look up attachments if type binary


              if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
                var start = i + 1;

                while (str.charAt(++i) !== "-" && i != str.length) { }

                var buf = str.substring(start, i);

                if (buf != Number(buf) || str.charAt(i) !== "-") {
                  throw new Error("Illegal attachments");
                }

                p.attachments = Number(buf);
              } // look up namespace (if any)


              if ("/" === str.charAt(i + 1)) {
                var _start = i + 1;

                while (++i) {
                  var c = str.charAt(i);
                  if ("," === c) break;
                  if (i === str.length) break;
                }

                p.nsp = str.substring(_start, i);
              } else {
                p.nsp = "/";
              } // look up id


              var next = str.charAt(i + 1);

              if ("" !== next && Number(next) == next) {
                var _start2 = i + 1;

                while (++i) {
                  var _c = str.charAt(i);

                  if (null == _c || Number(_c) != _c) {
                    --i;
                    break;
                  }

                  if (i === str.length) break;
                }

                p.id = Number(str.substring(_start2, i + 1));
              } // look up json data


              if (str.charAt(++i)) {
                var payload = tryParse(str.substr(i));

                if (Decoder.isPayloadValid(p.type, payload)) {
                  p.data = payload;
                } else {
                  throw new Error("invalid payload");
                }
              }

              debug("decoded %s as %j", str, p);
              return p;
            }
          }, {
            key: "destroy",

            /**
             * Deallocates a parser's resources
             */
            value: function destroy() {
              if (this.reconstructor) {
                this.reconstructor.finishedReconstruction();
              }
            }
          }], [{
            key: "isPayloadValid",
            value: function isPayloadValid(type, payload) {
              switch (type) {
                case PacketType.CONNECT:
                  return _typeof(payload) === "object";

                case PacketType.DISCONNECT:
                  return payload === undefined;

                case PacketType.CONNECT_ERROR:
                  return typeof payload === "string" || _typeof(payload) === "object";

                case PacketType.EVENT:
                case PacketType.BINARY_EVENT:
                  return Array.isArray(payload) && payload.length > 0;

                case PacketType.ACK:
                case PacketType.BINARY_ACK:
                  return Array.isArray(payload);
              }
            }
          }]);

          return Decoder;
        }(Emitter);

        exports.Decoder = Decoder;

        function tryParse(str) {
          try {
            return JSON.parse(str);
          } catch (e) {
            return false;
          }
        }
        /**
         * A manager of a binary event's 'buffer sequence'. Should
         * be constructed whenever a packet of type BINARY_EVENT is
         * decoded.
         *
         * @param {Object} packet
         * @return {BinaryReconstructor} initialized reconstructor
         */


        var BinaryReconstructor = /*#__PURE__*/function () {
          function BinaryReconstructor(packet) {
            _classCallCheck(this, BinaryReconstructor);

            this.packet = packet;
            this.buffers = [];
            this.reconPack = packet;
          }
          /**
           * Method to be called when binary data received from connection
           * after a BINARY_EVENT packet.
           *
           * @param {Buffer | ArrayBuffer} binData - the raw binary data received
           * @return {null | Object} returns null if more binary data is expected or
           *   a reconstructed packet object if all buffers have been received.
           */


          _createClass(BinaryReconstructor, [{
            key: "takeBinaryData",
            value: function takeBinaryData(binData) {
              this.buffers.push(binData);

              if (this.buffers.length === this.reconPack.attachments) {
                // done with buffer list
                var packet = binary_1.reconstructPacket(this.reconPack, this.buffers);
                this.finishedReconstruction();
                return packet;
              }

              return null;
            }
            /**
             * Cleans up binary packet reconstruction variables.
             */

          }, {
            key: "finishedReconstruction",
            value: function finishedReconstruction() {
              this.reconPack = null;
              this.buffers = [];
            }
          }]);

          return BinaryReconstructor;
        }();

        /***/
}),

/***/ "./node_modules/socket.io-parser/dist/is-binary.js":
/*!*********************************************************!*\
  !*** ./node_modules/socket.io-parser/dist/is-binary.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";


        function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.hasBinary = exports.isBinary = void 0;
        var withNativeArrayBuffer = typeof ArrayBuffer === "function";

        var isView = function isView(obj) {
          return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
        };

        var toString = Object.prototype.toString;
        var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
        var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
        /**
         * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
         *
         * @private
         */

        function isBinary(obj) {
          return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
        }

        exports.isBinary = isBinary;

        function hasBinary(obj, toJSON) {
          if (!obj || _typeof(obj) !== "object") {
            return false;
          }

          if (Array.isArray(obj)) {
            for (var i = 0, l = obj.length; i < l; i++) {
              if (hasBinary(obj[i])) {
                return true;
              }
            }

            return false;
          }

          if (isBinary(obj)) {
            return true;
          }

          if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
            return hasBinary(obj.toJSON(), true);
          }

          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
              return true;
            }
          }

          return false;
        }

        exports.hasBinary = hasBinary;

        /***/
}),

/***/ "./node_modules/yeast/index.js":
/*!*************************************!*\
  !*** ./node_modules/yeast/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";


        var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
          length = 64,
          map = {},
          seed = 0,
          i = 0,
          prev;
        /**
         * Return a string representing the specified number.
         *
         * @param {Number} num The number to convert.
         * @returns {String} The string representation of the number.
         * @api public
         */

        function encode(num) {
          var encoded = '';

          do {
            encoded = alphabet[num % length] + encoded;
            num = Math.floor(num / length);
          } while (num > 0);

          return encoded;
        }
        /**
         * Return the integer value specified by the given string.
         *
         * @param {String} str The string to convert.
         * @returns {Number} The integer value represented by the string.
         * @api public
         */


        function decode(str) {
          var decoded = 0;

          for (i = 0; i < str.length; i++) {
            decoded = decoded * length + map[str.charAt(i)];
          }

          return decoded;
        }
        /**
         * Yeast: A tiny growing id generator.
         *
         * @returns {String} A unique id.
         * @api public
         */


        function yeast() {
          var now = encode(+new Date());
          if (now !== prev) return seed = 0, prev = now;
          return now + '.' + encode(seed++);
        } //
        // Map each character to its index.
        //


        for (; i < length; i++) {
          map[alphabet[i]] = i;
        } //
        // Expose the `yeast`, `encode` and `decode` functions.
        //


        yeast.encode = encode;
        yeast.decode = decode;
        module.exports = yeast;

        /***/
})

    /******/
});
});
//# sourceMappingURL=socket.io.js.map

/*! jQuery v3.6.0 -ajax,-ajax/jsonp,-ajax/load,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-deprecated/ajax-event-alias,-effects,-effects/Tween,-effects/animatedSelector | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(g,e){"use strict";var t=[],r=Object.getPrototypeOf,s=t.slice,v=t.flat?function(e){return t.flat.call(e)}:function(e){return t.concat.apply([],e)},u=t.push,i=t.indexOf,n={},o=n.toString,y=n.hasOwnProperty,a=y.toString,l=a.call(Object),m={},b=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType&&"function"!=typeof e.item},x=function(e){return null!=e&&e===e.window},w=g.document,c={type:!0,src:!0,nonce:!0,noModule:!0};function C(e,t,n){var r,i,o=(n=n||w).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function T(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.6.0 -ajax,-ajax/jsonp,-ajax/load,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-deprecated/ajax-event-alias,-effects,-effects/Tween,-effects/animatedSelector",E=function(e,t){return new E.fn.init(e,t)};function d(e){var t=!!e&&"length"in e&&e.length,n=T(e);return!b(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}E.fn=E.prototype={jquery:f,constructor:E,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=E.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return E.each(this,e)},map:function(n){return this.pushStack(E.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(E.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(E.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},E.extend=E.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||b(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(E.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||E.isPlainObject(n)?n:{},i=!1,a[t]=E.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},E.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=y.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){C(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(d(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},makeArray:function(e,t){var n=t||[];return null!=e&&(d(Object(e))?E.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(d(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return v(a)},guid:1,support:m}),"function"==typeof Symbol&&(E.fn[Symbol.iterator]=t[Symbol.iterator]),E.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var p=function(n){var e,p,x,o,i,h,f,g,w,u,l,C,T,a,E,v,s,c,y,A="sizzle"+1*new Date,d=n.document,N=0,r=0,m=ue(),b=ue(),S=ue(),k=ue(),D=function(e,t){return e===t&&(l=!0),0},L={}.hasOwnProperty,t=[],j=t.pop,q=t.push,O=t.push,P=t.slice,H=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},I="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",R="[\\x20\\t\\r\\n\\f]",B="(?:\\\\[\\da-fA-F]{1,6}"+R+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",M="\\["+R+"*("+B+")(?:"+R+"*([*^$|!~]?=)"+R+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+B+"))|)"+R+"*\\]",W=":("+B+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",F=new RegExp(R+"+","g"),$=new RegExp("^"+R+"+|((?:^|[^\\\\])(?:\\\\.)*)"+R+"+$","g"),z=new RegExp("^"+R+"*,"+R+"*"),_=new RegExp("^"+R+"*([>+~]|"+R+")"+R+"*"),U=new RegExp(R+"|>"),V=new RegExp(W),X=new RegExp("^"+B+"$"),Q={ID:new RegExp("^#("+B+")"),CLASS:new RegExp("^\\.("+B+")"),TAG:new RegExp("^("+B+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+W),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+R+"*(even|odd|(([+-]|)(\\d*)n|)"+R+"*(?:([+-]|)"+R+"*(\\d+)|))"+R+"*\\)|)","i"),bool:new RegExp("^(?:"+I+")$","i"),needsContext:new RegExp("^"+R+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+R+"*((?:-\\d)?\\d*)"+R+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,G=/^(?:input|select|textarea|button)$/i,K=/^h\d$/i,J=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\[\\da-fA-F]{1,6}"+R+"?|\\\\([^\\r\\n\\f])","g"),ne=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){C()},ae=xe(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{O.apply(t=P.call(d.childNodes),d.childNodes),t[d.childNodes.length].nodeType}catch(e){O={apply:t.length?function(e,t){q.apply(e,P.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,d=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==d&&9!==d&&11!==d)return n;if(!r&&(C(e),e=e||T,E)){if(11!==d&&(u=Z.exec(t)))if(i=u[1]){if(9===d){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&y(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return O.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&p.getElementsByClassName&&e.getElementsByClassName)return O.apply(n,e.getElementsByClassName(i)),n}if(p.qsa&&!k[t+" "]&&(!v||!v.test(t))&&(1!==d||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===d&&(U.test(t)||_.test(t))){(f=ee.test(t)&&ye(e.parentNode)||e)===e&&p.scope||((s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=A)),o=(l=h(t)).length;while(o--)l[o]=(s?"#"+s:":scope")+" "+be(l[o]);c=l.join(",")}try{return O.apply(n,f.querySelectorAll(c)),n}catch(e){k(t,!0)}finally{s===A&&e.removeAttribute("id")}}}return g(t.replace($,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>x.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[A]=!0,e}function ce(e){var t=T.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)x.attrHandle[n[r]]=t}function de(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function pe(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ve(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ye(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in p=se.support={},i=se.isXML=function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},C=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:d;return r!=T&&9===r.nodeType&&r.documentElement&&(a=(T=r).documentElement,E=!i(T),d!=T&&(n=T.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),p.scope=ce(function(e){return a.appendChild(e).appendChild(T.createElement("div")),"undefined"!=typeof e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length}),p.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),p.getElementsByTagName=ce(function(e){return e.appendChild(T.createComment("")),!e.getElementsByTagName("*").length}),p.getElementsByClassName=J.test(T.getElementsByClassName),p.getById=ce(function(e){return a.appendChild(e).id=A,!T.getElementsByName||!T.getElementsByName(A).length}),p.getById?(x.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},x.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(x.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},x.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),x.find.TAG=p.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):p.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},x.find.CLASS=p.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],v=[],(p.qsa=J.test(T.querySelectorAll))&&(ce(function(e){var t;a.appendChild(e).innerHTML="<a id='"+A+"'></a><select id='"+A+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+R+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+R+"*(?:value|"+I+")"),e.querySelectorAll("[id~="+A+"-]").length||v.push("~="),(t=T.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||v.push("\\["+R+"*name"+R+"*="+R+"*(?:''|\"\")"),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+A+"+*").length||v.push(".#.+[+~]"),e.querySelectorAll("\\\f"),v.push("[\\r\\n\\f]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=T.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+R+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(p.matchesSelector=J.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){p.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",W)}),v=v.length&&new RegExp(v.join("|")),s=s.length&&new RegExp(s.join("|")),t=J.test(a.compareDocumentPosition),y=t||J.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!p.sortDetached&&t.compareDocumentPosition(e)===n?e==T||e.ownerDocument==d&&y(d,e)?-1:t==T||t.ownerDocument==d&&y(d,t)?1:u?H(u,e)-H(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e==T?-1:t==T?1:i?-1:o?1:u?H(u,e)-H(u,t):0;if(i===o)return de(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?de(a[r],s[r]):a[r]==d?-1:s[r]==d?1:0}),T},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if(C(e),p.matchesSelector&&E&&!k[t+" "]&&(!s||!s.test(t))&&(!v||!v.test(t)))try{var n=c.call(e,t);if(n||p.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){k(t,!0)}return 0<se(t,T,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!=T&&C(e),y(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!=T&&C(e);var n=x.attrHandle[t.toLowerCase()],r=n&&L.call(x.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:p.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!p.detectDuplicates,u=!p.sortStable&&e.slice(0),e.sort(D),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(x=se.selectors={cacheLength:50,createPseudo:le,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return Q.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&V.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=m[e+" "];return t||(t=new RegExp("(^|"+R+")"+e+"("+R+"|$)"))&&m(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(F," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,v){var y="nth"!==h.slice(0,3),m="last"!==h.slice(-4),b="of-type"===e;return 1===g&&0===v?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=y!==m?"nextSibling":"previousSibling",c=e.parentNode,f=b&&e.nodeName.toLowerCase(),d=!n&&!b,p=!1;if(c){if(y){while(l){a=e;while(a=a[l])if(b?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&d){p=(s=(r=(i=(o=(a=c)[A]||(a[A]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===N&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(p=s=0)||u.pop())if(1===a.nodeType&&++p&&a===e){i[h]=[N,s,p];break}}else if(d&&(p=s=(r=(i=(o=(a=e)[A]||(a[A]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===N&&r[1]),!1===p)while(a=++s&&a&&a[l]||(p=s=0)||u.pop())if((b?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++p&&(d&&((i=(o=a[A]||(a[A]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[N,p]),a===e))break;return(p-=v)===g||p%g==0&&0<=p/g}}},PSEUDO:function(e,o){var t,a=x.pseudos[e]||x.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[A]?a(o):1<a.length?(t=[e,e,"",o],x.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=H(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace($,"$1"));return s[A]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return X.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===T.activeElement&&(!T.hasFocus||T.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!x.pseudos.empty(e)},header:function(e){return K.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=x.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})x.pseudos[e]=pe(e);for(e in{submit:!0,reset:!0})x.pseudos[e]=he(e);function me(){}function be(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function xe(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,d=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[N,d];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[A]||(e[A]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===N&&r[1]===d)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Ce(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Te(p,h,g,v,y,e){return v&&!v[A]&&(v=Te(v)),y&&!y[A]&&(y=Te(y,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!p||!e&&h?c:Ce(c,s,p,n,r),d=g?y||(e?p:l||v)?[]:t:f;if(g&&g(f,d,n,r),v){i=Ce(d,u),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(d[u[o]]=!(f[u[o]]=a))}if(e){if(y||p){if(y){i=[],o=d.length;while(o--)(a=d[o])&&i.push(f[o]=a);y(null,d=[],i,r)}o=d.length;while(o--)(a=d[o])&&-1<(i=y?H(e,a):s[o])&&(e[i]=!(t[i]=a))}}else d=Ce(d===t?d.splice(l,d.length):d),y?y(null,t,d,r):O.apply(t,d)})}function Ee(e){for(var i,t,n,r=e.length,o=x.relative[e[0].type],a=o||x.relative[" "],s=o?1:0,u=xe(function(e){return e===i},a,!0),l=xe(function(e){return-1<H(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=x.relative[e[s].type])c=[xe(we(c),t)];else{if((t=x.filter[e[s].type].apply(null,e[s].matches))[A]){for(n=++s;n<r;n++)if(x.relative[e[n].type])break;return Te(1<s&&we(c),1<s&&be(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace($,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&be(e))}c.push(t)}return we(c)}return me.prototype=x.filters=x.pseudos,x.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=b[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=x.preFilter;while(a){for(o in n&&!(r=z.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=_.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace($," ")}),a=a.slice(n.length)),x.filter)!(r=Q[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):b(e,s).slice(0)},f=se.compile=function(e,t){var n,v,y,m,b,r,i=[],o=[],a=S[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[A]?i.push(a):o.push(a);(a=S(e,(v=o,m=0<(y=i).length,b=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],d=w,p=e||b&&x.find.TAG("*",i),h=N+=null==d?1:Math.random()||.1,g=p.length;for(i&&(w=t==T||t||i);l!==g&&null!=(o=p[l]);l++){if(b&&o){a=0,t||o.ownerDocument==T||(C(o),n=!E);while(s=v[a++])if(s(o,t||T,n)){r.push(o);break}i&&(N=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=j.call(r));f=Ce(f)}O.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&se.uniqueSort(r)}return i&&(N=h,w=d),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&x.relative[o[1].type]){if(!(t=(x.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=Q.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],x.relative[s=a.type])break;if((u=x.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ye(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&be(o)))return O.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},p.sortStable=A.split("").sort(D).join("")===A,p.detectDuplicates=!!l,C(),p.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(T.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),p.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(I,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(g);E.find=p,E.expr=p.selectors,E.expr[":"]=E.expr.pseudos,E.uniqueSort=E.unique=p.uniqueSort,E.text=p.getText,E.isXMLDoc=p.isXML,E.contains=p.contains,E.escapeSelector=p.escape;var h=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&E(e).is(n))break;r.push(e)}return r},A=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},N=E.expr.match.needsContext;function S(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var k=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function D(e,n,r){return b(n)?E.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?E.grep(e,function(e){return e===n!==r}):"string"!=typeof n?E.grep(e,function(e){return-1<i.call(n,e)!==r}):E.filter(n,e,r)}E.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?E.find.matchesSelector(r,e)?[r]:[]:E.find.matches(e,E.grep(t,function(e){return 1===e.nodeType}))},E.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(E(e).filter(function(){for(t=0;t<r;t++)if(E.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)E.find(e,i[t],n);return 1<r?E.uniqueSort(n):n},filter:function(e){return this.pushStack(D(this,e||[],!1))},not:function(e){return this.pushStack(D(this,e||[],!0))},is:function(e){return!!D(this,"string"==typeof e&&N.test(e)?E(e):e||[],!1).length}});var L,j=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(E.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||L,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:j.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof E?t[0]:t,E.merge(this,E.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:w,!0)),k.test(r[1])&&E.isPlainObject(t))for(r in t)b(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=w.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):b(e)?void 0!==n.ready?n.ready(e):e(E):E.makeArray(e,this)}).prototype=E.fn,L=E(w);var q=/^(?:parents|prev(?:Until|All))/,O={children:!0,contents:!0,next:!0,prev:!0};function P(e,t){while((e=e[t])&&1!==e.nodeType);return e}E.fn.extend({has:function(e){var t=E(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(E.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&E(e);if(!N.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&E.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?E.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(E(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(E.uniqueSort(E.merge(this.get(),E(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),E.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return h(e,"parentNode")},parentsUntil:function(e,t,n){return h(e,"parentNode",n)},next:function(e){return P(e,"nextSibling")},prev:function(e){return P(e,"previousSibling")},nextAll:function(e){return h(e,"nextSibling")},prevAll:function(e){return h(e,"previousSibling")},nextUntil:function(e,t,n){return h(e,"nextSibling",n)},prevUntil:function(e,t,n){return h(e,"previousSibling",n)},siblings:function(e){return A((e.parentNode||{}).firstChild,e)},children:function(e){return A(e.firstChild)},contents:function(e){return null!=e.contentDocument&&r(e.contentDocument)?e.contentDocument:(S(e,"template")&&(e=e.content||e),E.merge([],e.childNodes))}},function(r,i){E.fn[r]=function(e,t){var n=E.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=E.filter(t,n)),1<this.length&&(O[r]||E.uniqueSort(n),q.test(r)&&n.reverse()),this.pushStack(n)}});var H=/[^\x20\t\r\n\f]+/g;function I(e){return e}function R(e){throw e}function B(e,t,n,r){var i;try{e&&b(i=e.promise)?i.call(e).done(t).fail(n):e&&b(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}E.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},E.each(e.match(H)||[],function(e,t){n[t]=!0}),n):E.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){E.each(e,function(e,t){b(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==T(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return E.each(arguments,function(e,t){var n;while(-1<(n=E.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<E.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},E.extend({Deferred:function(e){var o=[["notify","progress",E.Callbacks("memory"),E.Callbacks("memory"),2],["resolve","done",E.Callbacks("once memory"),E.Callbacks("once memory"),0,"resolved"],["reject","fail",E.Callbacks("once memory"),E.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return E.Deferred(function(r){E.each(o,function(e,t){var n=b(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&b(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,b(t)?s?t.call(e,l(u,o,I,s),l(u,o,R,s)):(u++,t.call(e,l(u,o,I,s),l(u,o,R,s),l(u,o,I,o.notifyWith))):(a!==I&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){E.Deferred.exceptionHook&&E.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==R&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(E.Deferred.getStackHook&&(t.stackTrace=E.Deferred.getStackHook()),g.setTimeout(t))}}return E.Deferred(function(e){o[0][3].add(l(0,e,b(r)?r:I,e.notifyWith)),o[1][3].add(l(0,e,b(t)?t:I)),o[2][3].add(l(0,e,b(n)?n:R))}).promise()},promise:function(e){return null!=e?E.extend(e,a):a}},s={};return E.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=E.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(B(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||b(i[t]&&i[t].then)))return o.then();while(t--)B(i[t],a(t),o.reject);return o.promise()}});var M=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;E.Deferred.exceptionHook=function(e,t){g.console&&g.console.warn&&e&&M.test(e.name)&&g.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},E.readyException=function(e){g.setTimeout(function(){throw e})};var W=E.Deferred();function F(){w.removeEventListener("DOMContentLoaded",F),g.removeEventListener("load",F),E.ready()}E.fn.ready=function(e){return W.then(e)["catch"](function(e){E.readyException(e)}),this},E.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--E.readyWait:E.isReady)||(E.isReady=!0)!==e&&0<--E.readyWait||W.resolveWith(w,[E])}}),E.ready.then=W.then,"complete"===w.readyState||"loading"!==w.readyState&&!w.documentElement.doScroll?g.setTimeout(E.ready):(w.addEventListener("DOMContentLoaded",F),g.addEventListener("load",F));var $=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===T(n))for(s in i=!0,n)$(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,b(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(E(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},z=/^-ms-/,_=/-([a-z])/g;function U(e,t){return t.toUpperCase()}function V(e){return e.replace(z,"ms-").replace(_,U)}var X=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Q(){this.expando=E.expando+Q.uid++}Q.uid=1,Q.prototype={cache:function(e){var t=e[this.expando];return t||(t={},X(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[V(t)]=n;else for(r in t)i[V(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][V(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(V):(t=V(t))in r?[t]:t.match(H)||[]).length;while(n--)delete r[t[n]]}(void 0===t||E.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!E.isEmptyObject(t)}};var Y=new Q,G=new Q,K=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,J=/[A-Z]/g;function Z(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(J,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:K.test(i)?JSON.parse(i):i)}catch(e){}G.set(e,t,n)}else n=void 0;return n}E.extend({hasData:function(e){return G.hasData(e)||Y.hasData(e)},data:function(e,t,n){return G.access(e,t,n)},removeData:function(e,t){G.remove(e,t)},_data:function(e,t,n){return Y.access(e,t,n)},_removeData:function(e,t){Y.remove(e,t)}}),E.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=G.get(o),1===o.nodeType&&!Y.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=V(r.slice(5)),Z(o,r,i[r]));Y.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){G.set(this,n)}):$(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=G.get(o,n))?t:void 0!==(t=Z(o,n))?t:void 0;this.each(function(){G.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){G.remove(this,e)})}}),E.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Y.get(e,t),n&&(!r||Array.isArray(n)?r=Y.access(e,t,E.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=E.queue(e,t),r=n.length,i=n.shift(),o=E._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){E.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Y.get(e,n)||Y.access(e,n,{empty:E.Callbacks("once memory").add(function(){Y.remove(e,[t+"queue",n])})})}}),E.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?E.queue(this[0],t):void 0===n?this:this.each(function(){var e=E.queue(this,t,n);E._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&E.dequeue(this,t)})},dequeue:function(e){return this.each(function(){E.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=E.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Y.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var ee=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,te=new RegExp("^(?:([+-])=|)("+ee+")([a-z%]*)$","i"),ne=["Top","Right","Bottom","Left"],re=w.documentElement,ie=function(e){return E.contains(e.ownerDocument,e)},oe={composed:!0};re.getRootNode&&(ie=function(e){return E.contains(e.ownerDocument,e)||e.getRootNode(oe)===e.ownerDocument});var ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&ie(e)&&"none"===E.css(e,"display")};var se={};function ue(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Y.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&ae(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=se[s])||(o=a.body.appendChild(a.createElement(s)),u=E.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),se[s]=u)))):"none"!==n&&(l[c]="none",Y.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}E.fn.extend({show:function(){return ue(this,!0)},hide:function(){return ue(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?E(this).show():E(this).hide()})}});var le,ce,fe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,pe=/^$|^module$|\/(?:java|ecma)script/i;le=w.createDocumentFragment().appendChild(w.createElement("div")),(ce=w.createElement("input")).setAttribute("type","radio"),ce.setAttribute("checked","checked"),ce.setAttribute("name","t"),le.appendChild(ce),m.checkClone=le.cloneNode(!0).cloneNode(!0).lastChild.checked,le.innerHTML="<textarea>x</textarea>",m.noCloneChecked=!!le.cloneNode(!0).lastChild.defaultValue,le.innerHTML="<option></option>",m.option=!!le.lastChild;var he={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ge(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&S(e,t)?E.merge([e],n):n}function ve(e,t){for(var n=0,r=e.length;n<r;n++)Y.set(e[n],"globalEval",!t||Y.get(t[n],"globalEval"))}he.tbody=he.tfoot=he.colgroup=he.caption=he.thead,he.th=he.td,m.option||(he.optgroup=he.option=[1,"<select multiple='multiple'>","</select>"]);var ye=/<|&#?\w+;/;function me(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),d=[],p=0,h=e.length;p<h;p++)if((o=e[p])||0===o)if("object"===T(o))E.merge(d,o.nodeType?[o]:o);else if(ye.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=he[s]||he._default,a.innerHTML=u[1]+E.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;E.merge(d,a.childNodes),(a=f.firstChild).textContent=""}else d.push(t.createTextNode(o));f.textContent="",p=0;while(o=d[p++])if(r&&-1<E.inArray(o,r))i&&i.push(o);else if(l=ie(o),a=ge(f.appendChild(o),"script"),l&&ve(a),n){c=0;while(o=a[c++])pe.test(o.type||"")&&n.push(o)}return f}var be=/^([^.]*)(?:\.(.+)|)/;function xe(){return!0}function we(){return!1}function Ce(e,t){return e===function(){try{return w.activeElement}catch(e){}}()==("focus"===t)}function Te(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Te(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=we;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return E().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=E.guid++)),e.each(function(){E.event.add(this,t,i,r,n)})}function Ee(e,i,o){o?(Y.set(e,i,!1),E.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Y.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(E.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Y.set(this,i,r),t=o(this,i),this[i](),r!==(n=Y.get(this,i))||t?Y.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n&&n.value}else r.length&&(Y.set(this,i,{value:E.event.trigger(E.extend(r[0],E.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Y.get(e,i)&&E.event.add(e,i,xe)}E.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,d,p,h,g,v=Y.get(t);if(X(t)){n.handler&&(n=(o=n).handler,i=o.selector),i&&E.find.matchesSelector(re,i),n.guid||(n.guid=E.guid++),(u=v.events)||(u=v.events=Object.create(null)),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof E&&E.event.triggered!==e.type?E.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(H)||[""]).length;while(l--)p=g=(s=be.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),p&&(f=E.event.special[p]||{},p=(i?f.delegateType:f.bindType)||p,f=E.event.special[p]||{},c=E.extend({type:p,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&E.expr.match.needsContext.test(i),namespace:h.join(".")},o),(d=u[p])||((d=u[p]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(p,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?d.splice(d.delegateCount++,0,c):d.push(c),E.event.global[p]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,d,p,h,g,v=Y.hasData(e)&&Y.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(H)||[""]).length;while(l--)if(p=g=(s=be.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),p){f=E.event.special[p]||{},d=u[p=(r?f.delegateType:f.bindType)||p]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=d.length;while(o--)c=d[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(d.splice(o,1),c.selector&&d.delegateCount--,f.remove&&f.remove.call(e,c));a&&!d.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||E.removeEvent(e,p,v.handle),delete u[p])}else for(p in u)E.event.remove(e,p+t[l],n,r,!0);E.isEmptyObject(u)&&Y.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=new Array(arguments.length),u=E.event.fix(e),l=(Y.get(this,"events")||Object.create(null))[u.type]||[],c=E.event.special[u.type]||{};for(s[0]=u,t=1;t<arguments.length;t++)s[t]=arguments[t];if(u.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,u)){a=E.event.handlers.call(this,u,l),t=0;while((i=a[t++])&&!u.isPropagationStopped()){u.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!u.isImmediatePropagationStopped())u.rnamespace&&!1!==o.namespace&&!u.rnamespace.test(o.namespace)||(u.handleObj=o,u.data=o.data,void 0!==(r=((E.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,s))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<E(i,this).index(l):E.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(E.Event.prototype,t,{enumerable:!0,configurable:!0,get:b(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[E.expando]?e:new E.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return fe.test(t.type)&&t.click&&S(t,"input")&&Ee(t,"click",xe),!1},trigger:function(e){var t=this||e;return fe.test(t.type)&&t.click&&S(t,"input")&&Ee(t,"click"),!0},_default:function(e){var t=e.target;return fe.test(t.type)&&t.click&&S(t,"input")&&Y.get(t,"click")||S(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},E.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},E.Event=function(e,t){if(!(this instanceof E.Event))return new E.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?xe:we,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&E.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[E.expando]=!0},E.Event.prototype={constructor:E.Event,isDefaultPrevented:we,isPropagationStopped:we,isImmediatePropagationStopped:we,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=xe,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=xe,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=xe,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},E.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},E.event.addProp),E.each({focus:"focusin",blur:"focusout"},function(e,t){E.event.special[e]={setup:function(){return Ee(this,e,Ce),!1},trigger:function(){return Ee(this,e),!0},_default:function(){return!0},delegateType:t}}),E.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){E.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||E.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),E.fn.extend({on:function(e,t,n,r){return Te(this,e,t,n,r)},one:function(e,t,n,r){return Te(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,E(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=we),this.each(function(){E.event.remove(this,e,n,t)})}});var Ae=/<script|<style|<link/i,Ne=/checked\s*(?:[^=]|=\s*.checked.)/i,Se=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function ke(e,t){return S(e,"table")&&S(11!==t.nodeType?t:t.firstChild,"tr")&&E(e).children("tbody")[0]||e}function De(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Le(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function je(e,t){var n,r,i,o,a,s;if(1===t.nodeType){if(Y.hasData(e)&&(s=Y.get(e).events))for(i in Y.remove(t,"handle events"),s)for(n=0,r=s[i].length;n<r;n++)E.event.add(t,i,s[i][n]);G.hasData(e)&&(o=G.access(e),a=E.extend({},o),G.set(t,a))}}function qe(n,r,i,o){r=v(r);var e,t,a,s,u,l,c=0,f=n.length,d=f-1,p=r[0],h=b(p);if(h||1<f&&"string"==typeof p&&!m.checkClone&&Ne.test(p))return n.each(function(e){var t=n.eq(e);h&&(r[0]=p.call(this,e,t.html())),qe(t,r,i,o)});if(f&&(t=(e=me(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=E.map(ge(e,"script"),De)).length;c<f;c++)u=e,c!==d&&(u=E.clone(u,!0,!0),s&&E.merge(a,ge(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,E.map(a,Le),c=0;c<s;c++)u=a[c],pe.test(u.type||"")&&!Y.access(u,"globalEval")&&E.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?E._evalUrl&&!u.noModule&&E._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")},l):C(u.textContent.replace(Se,""),u,l))}return n}function Oe(e,t,n){for(var r,i=t?E.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||E.cleanData(ge(r)),r.parentNode&&(n&&ie(r)&&ve(ge(r,"script")),r.parentNode.removeChild(r));return e}E.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=ie(e);if(!(m.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||E.isXMLDoc(e)))for(a=ge(c),r=0,i=(o=ge(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&fe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ge(e),a=a||ge(c),r=0,i=o.length;r<i;r++)je(o[r],a[r]);else je(e,c);return 0<(a=ge(c,"script")).length&&ve(a,!f&&ge(e,"script")),c},cleanData:function(e){for(var t,n,r,i=E.event.special,o=0;void 0!==(n=e[o]);o++)if(X(n)){if(t=n[Y.expando]){if(t.events)for(r in t.events)i[r]?E.event.remove(n,r):E.removeEvent(n,r,t.handle);n[Y.expando]=void 0}n[G.expando]&&(n[G.expando]=void 0)}}}),E.fn.extend({detach:function(e){return Oe(this,e,!0)},remove:function(e){return Oe(this,e)},text:function(e){return $(this,function(e){return void 0===e?E.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return qe(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||ke(this,e).appendChild(e)})},prepend:function(){return qe(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=ke(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return qe(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return qe(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(E.cleanData(ge(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return E.clone(this,e,t)})},html:function(e){return $(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ae.test(e)&&!he[(de.exec(e)||["",""])[1].toLowerCase()]){e=E.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(E.cleanData(ge(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return qe(this,arguments,function(e){var t=this.parentNode;E.inArray(this,n)<0&&(E.cleanData(ge(this)),t&&t.replaceChild(e,this))},n)}}),E.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){E.fn[e]=function(e){for(var t,n=[],r=E(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),E(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var Pe=new RegExp("^("+ee+")(?!px)[a-z%]+$","i"),He=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=g),t.getComputedStyle(e)},Ie=function(e,t,n){var r,i,o={};for(i in t)o[i]=e.style[i],e.style[i]=t[i];for(i in r=n.call(e),t)e.style[i]=o[i];return r},Re=new RegExp(ne.join("|"),"i");function Be(e,t,n){var r,i,o,a,s=e.style;return(n=n||He(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||ie(e)||(a=E.style(e,t)),!m.pixelBoxStyles()&&Pe.test(a)&&Re.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function Me(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(l){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",re.appendChild(u).appendChild(l);var e=g.getComputedStyle(l);n="1%"!==e.top,s=12===t(e.marginLeft),l.style.right="60%",o=36===t(e.right),r=36===t(e.width),l.style.position="absolute",i=12===t(l.offsetWidth/3),re.removeChild(u),l=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s,u=w.createElement("div"),l=w.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",m.clearCloneStyle="content-box"===l.style.backgroundClip,E.extend(m,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),s},scrollboxSize:function(){return e(),i},reliableTrDimensions:function(){var e,t,n,r;return null==a&&(e=w.createElement("table"),t=w.createElement("tr"),n=w.createElement("div"),e.style.cssText="position:absolute;left:-11111px;border-collapse:separate",t.style.cssText="border:1px solid",t.style.height="1px",n.style.height="9px",n.style.display="block",re.appendChild(e).appendChild(t).appendChild(n),r=g.getComputedStyle(t),a=parseInt(r.height,10)+parseInt(r.borderTopWidth,10)+parseInt(r.borderBottomWidth,10)===t.offsetHeight,re.removeChild(e)),a}}))}();var We=["Webkit","Moz","ms"],Fe=w.createElement("div").style,$e={};function ze(e){var t=E.cssProps[e]||$e[e];return t||(e in Fe?e:$e[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=We.length;while(n--)if((e=We[n]+t)in Fe)return e}(e)||e)}var _e,Ue,Ve=/^(none|table(?!-c[ea]).+)/,Xe=/^--/,Qe={position:"absolute",visibility:"hidden",display:"block"},Ye={letterSpacing:"0",fontWeight:"400"};function Ge(e,t,n){var r=te.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Ke(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=E.css(e,n+ne[a],!0,i)),r?("content"===n&&(u-=E.css(e,"padding"+ne[a],!0,i)),"margin"!==n&&(u-=E.css(e,"border"+ne[a]+"Width",!0,i))):(u+=E.css(e,"padding"+ne[a],!0,i),"padding"!==n?u+=E.css(e,"border"+ne[a]+"Width",!0,i):s+=E.css(e,"border"+ne[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function Je(e,t,n){var r=He(e),i=(!m.boxSizingReliable()||n)&&"border-box"===E.css(e,"boxSizing",!1,r),o=i,a=Be(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if(Pe.test(a)){if(!n)return a;a="auto"}return(!m.boxSizingReliable()&&i||!m.reliableTrDimensions()&&S(e,"tr")||"auto"===a||!parseFloat(a)&&"inline"===E.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===E.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+Ke(e,t,n||(i?"border":"content"),o,r,a)+"px"}E.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Be(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=V(t),u=Xe.test(t),l=e.style;if(u||(t=ze(s)),a=E.cssHooks[t]||E.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=te.exec(n))&&i[1]&&(n=function(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return E.css(e,t,"")},u=s(),l=n&&n[3]||(E.cssNumber[t]?"":"px"),c=e.nodeType&&(E.cssNumber[t]||"px"!==l&&+u)&&te.exec(E.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)E.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,E.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(E.cssNumber[s]?"":"px")),m.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=V(t);return Xe.test(t)||(t=ze(s)),(a=E.cssHooks[t]||E.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Be(e,t,r)),"normal"===i&&t in Ye&&(i=Ye[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),E.each(["height","width"],function(e,u){E.cssHooks[u]={get:function(e,t,n){if(t)return!Ve.test(E.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?Je(e,u,n):Ie(e,Qe,function(){return Je(e,u,n)})},set:function(e,t,n){var r,i=He(e),o=!m.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===E.css(e,"boxSizing",!1,i),s=n?Ke(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-Ke(e,u,"border",!1,i)-.5)),s&&(r=te.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=E.css(e,u)),Ge(0,t,s)}}}),E.cssHooks.marginLeft=Me(m.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Be(e,"marginLeft"))||e.getBoundingClientRect().left-Ie(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),E.each({margin:"",padding:"",border:"Width"},function(i,o){E.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+ne[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(E.cssHooks[i+o].set=Ge)}),E.fn.extend({css:function(e,t){return $(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=He(e),i=t.length;a<i;a++)o[t[a]]=E.css(e,t[a],!1,r);return o}return void 0!==n?E.style(e,t,n):E.css(e,t)},e,t,1<arguments.length)}}),E.fn.delay=function(r,e){return r=E.fx&&E.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=g.setTimeout(e,r);t.stop=function(){g.clearTimeout(n)}})},_e=w.createElement("input"),Ue=w.createElement("select").appendChild(w.createElement("option")),_e.type="checkbox",m.checkOn=""!==_e.value,m.optSelected=Ue.selected,(_e=w.createElement("input")).value="t",_e.type="radio",m.radioValue="t"===_e.value;var Ze,et=E.expr.attrHandle;E.fn.extend({attr:function(e,t){return $(this,E.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){E.removeAttr(this,e)})}}),E.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?E.prop(e,t,n):(1===o&&E.isXMLDoc(e)||(i=E.attrHooks[t.toLowerCase()]||(E.expr.match.bool.test(t)?Ze:void 0)),void 0!==n?null===n?void E.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=E.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!m.radioValue&&"radio"===t&&S(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(H);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),Ze={set:function(e,t,n){return!1===t?E.removeAttr(e,n):e.setAttribute(n,n),n}},E.each(E.expr.match.bool.source.match(/\w+/g),function(e,t){var a=et[t]||E.find.attr;et[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=et[o],et[o]=r,r=null!=a(e,t,n)?o:null,et[o]=i),r}});var tt=/^(?:input|select|textarea|button)$/i,nt=/^(?:a|area)$/i;function rt(e){return(e.match(H)||[]).join(" ")}function it(e){return e.getAttribute&&e.getAttribute("class")||""}function ot(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(H)||[]}E.fn.extend({prop:function(e,t){return $(this,E.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[E.propFix[e]||e]})}}),E.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&E.isXMLDoc(e)||(t=E.propFix[t]||t,i=E.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=E.find.attr(e,"tabindex");return t?parseInt(t,10):tt.test(e.nodeName)||nt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),m.optSelected||(E.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),E.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){E.propFix[this.toLowerCase()]=this}),E.fn.extend({addClass:function(t){var e,n,r,i,o,a,s,u=0;if(b(t))return this.each(function(e){E(this).addClass(t.call(this,e,it(this)))});if((e=ot(t)).length)while(n=this[u++])if(i=it(n),r=1===n.nodeType&&" "+rt(i)+" "){a=0;while(o=e[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=rt(r))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,r,i,o,a,s,u=0;if(b(t))return this.each(function(e){E(this).removeClass(t.call(this,e,it(this)))});if(!arguments.length)return this.attr("class","");if((e=ot(t)).length)while(n=this[u++])if(i=it(n),r=1===n.nodeType&&" "+rt(i)+" "){a=0;while(o=e[a++])while(-1<r.indexOf(" "+o+" "))r=r.replace(" "+o+" "," ");i!==(s=rt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(i,t){var o=typeof i,a="string"===o||Array.isArray(i);return"boolean"==typeof t&&a?t?this.addClass(i):this.removeClass(i):b(i)?this.each(function(e){E(this).toggleClass(i.call(this,e,it(this),t),t)}):this.each(function(){var e,t,n,r;if(a){t=0,n=E(this),r=ot(i);while(e=r[t++])n.hasClass(e)?n.removeClass(e):n.addClass(e)}else void 0!==i&&"boolean"!==o||((e=it(this))&&Y.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===i?"":Y.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+rt(it(n))+" ").indexOf(t))return!0;return!1}});var at=/\r/g;E.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=b(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,E(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=E.map(t,function(e){return null==e?"":e+""})),(r=E.valHooks[this.type]||E.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=E.valHooks[t.type]||E.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(at,""):null==e?"":e:void 0}}),E.extend({valHooks:{option:{get:function(e){var t=E.find.attr(e,"value");return null!=t?t:rt(E.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!S(n.parentNode,"optgroup"))){if(t=E(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=E.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<E.inArray(E.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),E.each(["radio","checkbox"],function(){E.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<E.inArray(E(e).val(),t)}},m.checkOn||(E.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),m.focusin="onfocusin"in g;var st=/^(?:focusinfocus|focusoutblur)$/,ut=function(e){e.stopPropagation()};E.extend(E.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,d=[n||w],p=y.call(e,"type")?e.type:e,h=y.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||w,3!==n.nodeType&&8!==n.nodeType&&!st.test(p+E.event.triggered)&&(-1<p.indexOf(".")&&(p=(h=p.split(".")).shift(),h.sort()),u=p.indexOf(":")<0&&"on"+p,(e=e[E.expando]?e:new E.Event(p,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:E.makeArray(t,[e]),c=E.event.special[p]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||p,st.test(s+p)||(o=o.parentNode);o;o=o.parentNode)d.push(o),a=o;a===(n.ownerDocument||w)&&d.push(a.defaultView||a.parentWindow||g)}i=0;while((o=d[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||p,(l=(Y.get(o,"events")||Object.create(null))[e.type]&&Y.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&X(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=p,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(d.pop(),t)||!X(n)||u&&b(n[p])&&!x(n)&&((a=n[u])&&(n[u]=null),E.event.triggered=p,e.isPropagationStopped()&&f.addEventListener(p,ut),n[p](),e.isPropagationStopped()&&f.removeEventListener(p,ut),E.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=E.extend(new E.Event,n,{type:e,isSimulated:!0});E.event.trigger(r,null,t)}}),E.fn.extend({trigger:function(e,t){return this.each(function(){E.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return E.event.trigger(e,t,n,!0)}}),m.focusin||E.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){E.event.simulate(r,e.target,E.event.fix(e))};E.event.special[r]={setup:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r);t||e.addEventListener(n,i,!0),Y.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r)-1;t?Y.access(e,r,t):(e.removeEventListener(n,i,!0),Y.remove(e,r))}}}),E.parseXML=function(e){var t,n;if(!e||"string"!=typeof e)return null;try{t=(new g.DOMParser).parseFromString(e,"text/xml")}catch(e){}return n=t&&t.getElementsByTagName("parsererror")[0],t&&!n||E.error("Invalid XML: "+(n?E.map(n.childNodes,function(e){return e.textContent}).join("\n"):e)),t};var lt,ct=/\[\]$/,ft=/\r?\n/g,dt=/^(?:submit|button|image|reset|file)$/i,pt=/^(?:input|select|textarea|keygen)/i;function ht(n,e,r,i){var t;if(Array.isArray(e))E.each(e,function(e,t){r||ct.test(n)?i(n,t):ht(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==T(e))i(n,e);else for(t in e)ht(n+"["+t+"]",e[t],r,i)}E.param=function(e,t){var n,r=[],i=function(e,t){var n=b(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!E.isPlainObject(e))E.each(e,function(){i(this.name,this.value)});else for(n in e)ht(n,e[n],t,i);return r.join("&")},E.fn.extend({serialize:function(){return E.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=E.prop(this,"elements");return e?E.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!E(this).is(":disabled")&&pt.test(this.nodeName)&&!dt.test(e)&&(this.checked||!fe.test(e))}).map(function(e,t){var n=E(this).val();return null==n?null:Array.isArray(n)?E.map(n,function(e){return{name:t.name,value:e.replace(ft,"\r\n")}}):{name:t.name,value:n.replace(ft,"\r\n")}}).get()}}),E.fn.extend({wrapAll:function(e){var t;return this[0]&&(b(e)&&(e=e.call(this[0])),t=E(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return b(n)?this.each(function(e){E(this).wrapInner(n.call(this,e))}):this.each(function(){var e=E(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=b(t);return this.each(function(e){E(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){E(this).replaceWith(this.childNodes)}),this}}),E.expr.pseudos.hidden=function(e){return!E.expr.pseudos.visible(e)},E.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},m.createHTMLDocument=((lt=w.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===lt.childNodes.length),E.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(m.createHTMLDocument?((r=(t=w.implementation.createHTMLDocument("")).createElement("base")).href=w.location.href,t.head.appendChild(r)):t=w),o=!n&&[],(i=k.exec(e))?[t.createElement(i[1])]:(i=me([e],t,o),o&&o.length&&E(o).remove(),E.merge([],i.childNodes)));var r,i,o},E.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=E.css(e,"position"),c=E(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=E.css(e,"top"),u=E.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),b(t)&&(t=t.call(e,n,E.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},E.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){E.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===E.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===E.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=E(e).offset()).top+=E.css(e,"borderTopWidth",!0),i.left+=E.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-E.css(r,"marginTop",!0),left:t.left-i.left-E.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===E.css(e,"position"))e=e.offsetParent;return e||re})}}),E.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;E.fn[t]=function(e){return $(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),E.each(["top","left"],function(e,n){E.cssHooks[n]=Me(m.pixelPosition,function(e,t){if(t)return t=Be(e,n),Pe.test(t)?E(e).position()[n]+"px":t})}),E.each({Height:"height",Width:"width"},function(a,s){E.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){E.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return $(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?E.css(e,t,i):E.style(e,t,n,i)},s,n?e:void 0,n)}})}),E.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),E.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){E.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}});var gt=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;E.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),b(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||E.guid++,i},E.holdReady=function(e){e?E.readyWait++:E.ready(!0)},E.isArray=Array.isArray,E.parseJSON=JSON.parse,E.nodeName=S,E.isFunction=b,E.isWindow=x,E.camelCase=V,E.type=T,E.now=Date.now,E.isNumeric=function(e){var t=E.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},E.trim=function(e){return null==e?"":(e+"").replace(gt,"")},"function"==typeof define&&define.amd&&define("jquery",[],function(){return E});var vt=g.jQuery,yt=g.$;return E.noConflict=function(e){return g.$===E&&(g.$=yt),e&&g.jQuery===E&&(g.jQuery=vt),E},"undefined"==typeof e&&(g.jQuery=g.$=E),E});

const prm = {
  onnewstate() { },
  socket: io()
}
  ; (() => {
    const { socket } = prm
    socket.on('connect', () => {
      console.log('Connection established with backend!')
      var parts = location.href.split('/');
      var lastSegment = parts.pop() || parts.pop();
      console.log(`Identifying as ${lastSegment}...`)
      socket.emit('identify', lastSegment)
    })

    socket.on('state', state => {
      console.log('Got new state.', state)
      prm.onnewstate(state)
    })
  })();


/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
  // re-use canvas object for better performance
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}