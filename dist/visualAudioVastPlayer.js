/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseXmlOrReturnUrl: () => (/* binding */ parseXmlOrReturnUrl),
/* harmony export */   warn: () => (/* binding */ warn),
/* harmony export */   xmlToJSON: () => (/* binding */ xmlToJSON)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var mapObject = function mapObject(keys, value) {
  var obj = {};
  var _iterator = _createForOfIteratorHelper(keys),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      obj[key] = typeof value === 'function' ? value(key) : value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return obj;
};
var toInfo = function toInfo(proto) {
  return function (name) {
    return {
      name: name,
      desc: Object.getOwnPropertyDescriptor(proto, name)
    };
  };
};
var hasGetter = function hasGetter(_ref) {
  var desc = _ref.desc;
  return desc.get != null;
};
var getName = function getName(_ref2) {
  var name = _ref2.name;
  return name;
};
var listGetters = function listGetters(proto) {
  var lookup = Object.create(null);
  while (proto != null && proto !== Object.prototype) {
    var getters = Object.getOwnPropertyNames(proto).filter(function (elem) {
      return elem !== 'constructor';
    }).map(toInfo(proto)).filter(hasGetter).map(getName);
    var _iterator2 = _createForOfIteratorHelper(getters),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var name = _step2.value;
        lookup[name] = true;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    proto = Object.getPrototypeOf(proto);
  }
  return Object.keys(lookup);
};
var convertElement = function convertElement(el) {
  return '' + el;
};
var convertTimeRanges = function convertTimeRanges(ranges) {
  return {
    $type: 'TimeRanges',
    data: _toConsumableArray(Array(ranges.length).keys()).map(function (i) {
      return {
        start: ranges.start(i),
        end: ranges.end(i)
      };
    })
  };
};
var convertArrayLike = function convertArrayLike(type) {
  return function (obj, seen) {
    return {
      $type: type,
      data: Array.prototype.map.call(obj, function (e) {
        return circularToJSON(e, seen);
      })
    };
  };
};
var propertiesToJSON = function propertiesToJSON(o, names, seen) {
  return mapObject(names, function (name) {
    var value, ok;
    try {
      value = o[name];
      ok = true;
    } catch (err) {
      value = err;
      ok = false;
    }
    return ok ? circularToJSON(value, seen) : "[Error: ".concat(value, "]");
  });
};
var converters = [{
  test: function test(o) {
    return o == null;
  },
  convert: function convert() {
    return null;
  }
}, {
  test: function test(o) {
    return _typeof(o) !== 'object';
  },
  convert: function convert(o) {
    return o;
  }
}, {
  test: Array.isArray,
  convert: function convert(a, seen) {
    return a.map(function (e) {
      return circularToJSON(e, seen);
    });
  }
}, {
  test: function test(o) {
    return typeof o.nodeName === 'string';
  },
  convert: convertElement
}, {
  test: function test(o) {
    return o instanceof window.TimeRanges;
  },
  convert: convertTimeRanges
}, {
  test: function test(o) {
    return o instanceof window.TextTrackList;
  },
  convert: convertArrayLike('TextTrackList')
}, {
  test: function test(o) {
    return o.$type === 'SortedList';
  },
  convert: function convert(o, seen) {
    return circularToJSON(o.toArray(), seen);
  }
}, {
  test: function test(o) {
    return o.constructor != null && o.constructor.prototype !== Object.prototype;
  },
  convert: function convert(o, seen) {
    return propertiesToJSON(o, listGetters(o.constructor.prototype), seen);
  }
}, {
  test: function test() {
    return true;
  },
  convert: function convert(o, seen) {
    return propertiesToJSON(o, Object.keys(o), seen);
  }
}];
var circularToJSON = function circularToJSON(value, seen) {
  // TODO Identify circular refs
  if (seen.includes(value)) {
    return '[Circular]';
  }
  seen.push(value);
  var idx = seen.length - 1;
  var json = converters.reduce(function (res, _ref3) {
    var test = _ref3.test,
      convert = _ref3.convert;
    return !res.ok && test(res.value) ? {
      ok: true,
      value: convert(res.value, seen)
    } : res;
  }, {
    ok: false,
    value: value
  }).value;
  seen.splice(idx, 1);
  return json;
};
var toJSON = function toJSON(value) {
  return circularToJSON(value, []);
};
var removeKey = function removeKey(obj, key) {
  if (obj == null) {
    return;
  }
  if (Array.isArray(obj)) {
    var _iterator3 = _createForOfIteratorHelper(obj),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var entry = _step3.value;
        removeKey(entry, key);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return;
  }
  if (_typeof(obj) === 'object') {
    delete obj[key];
    for (var _i = 0, _Object$values = Object.values(obj); _i < _Object$values.length; _i++) {
      var value = _Object$values[_i];
      removeKey(value, key);
    }
  }
};
var xmlToJSON = function xmlToJSON(elem) {
  var json = toJSON(elem);
  removeKey(json, 'xmlElement');
  return json;
};
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (e) {
    return false;
  }
}
function parseXmlOrReturnUrl(inputString) {
  try {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(inputString, "application/xml");
    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
      throw new Error("Error parsing XML");
    }
    return xmlDoc.documentElement.outerHTML;
  } catch (e) {
    if (isValidUrl(inputString)) {
      return inputString;
    } else {
      throw new Error("Input is neither valid XML nor a valid URL");
    }
  }
}
var warn = function warn(message, data) {
  return console.warn({
    message: message,
    data: data
  });
};


/***/ }),

/***/ "./node_modules/es6-error/es6/index.js":
/*!*********************************************!*\
  !*** ./node_modules/es6-error/es6/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    cls.apply(this, arguments);
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var ExtendableError = function (_extendableBuiltin2) {
  _inherits(ExtendableError, _extendableBuiltin2);

  function ExtendableError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, ExtendableError);

    // extending Error is weird and does not propagate `message`
    var _this = _possibleConstructorReturn(this, (ExtendableError.__proto__ || Object.getPrototypeOf(ExtendableError)).call(this, message));

    Object.defineProperty(_this, 'message', {
      configurable: true,
      enumerable: false,
      value: message,
      writable: true
    });

    Object.defineProperty(_this, 'name', {
      configurable: true,
      enumerable: false,
      value: _this.constructor.name,
      writable: true
    });

    if (Error.hasOwnProperty('captureStackTrace')) {
      Error.captureStackTrace(_this, _this.constructor);
      return _possibleConstructorReturn(_this);
    }

    Object.defineProperty(_this, 'stack', {
      configurable: true,
      enumerable: false,
      value: new Error(message).stack,
      writable: true
    });
    return _this;
  }

  return ExtendableError;
}(_extendableBuiltin(Error));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExtendableError);


/***/ }),

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./node_modules/iab-vast-error/index.js":
/*!**********************************************!*\
  !*** ./node_modules/iab-vast-error/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var lib = __webpack_require__(/*! ./lib/ */ "./node_modules/iab-vast-error/lib/index.js")
module.exports = lib.default
module.exports.ERRORS = lib.ERRORS


/***/ }),

/***/ "./node_modules/iab-vast-error/lib/errors.js":
/*!***************************************************!*\
  !*** ./node_modules/iab-vast-error/lib/errors.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = {
  100: 'XML parsing error.',
  101: 'VAST schema validation error.',
  102: 'VAST version of response not supported.',
  200: 'Trafficking error. Video player received an ad type that it was not expecting and/or cannot display.',
  201: 'Video player expecting different linearity.',
  202: 'Video player expecting different duration.',
  203: 'Video player expecting different size.',
  300: 'General Wrapper error.',
  301: 'Timeout of VAST URI provided in Wrapper element, or of VAST URI provided in a subsequent Wrapper element.',
  302: 'Wrapper limit reached, as defined by the video player. Too many Wrapper responses have been received with no InLine response.',
  303: 'No ads VAST response after one or more Wrappers. Also includes number of empty VAST responses from fallback.',
  400: 'General linear error. Video player is unable to display the linear ad.',
  401: 'File not found. Unable to find Linear/MediaFile from URI.',
  402: 'Timeout of MediaFile URI.',
  403: 'Could not find MediaFile that is supported by this video player, based on the attributes of the MediaFile element.',
  405: 'Problem displaying MediaFile.',
  406: 'Mezzanine was required but not provided. Ad not served.',
  407: 'Mezzanine is in the process of being downloaded for the first time. Download may take several hours. Ad will not be served until mezzanine is downloaded and transcoded.',
  408: 'Conditional ad rejected.',
  409: 'Interactive unit in the InteractiveCreativeFile node was not executed',
  410: 'Verification unit in the Verification node was not executed.',
  411: 'Mezzanine was provided as required, but file did not meet required specification. Ad not served.',
  500: 'General NonLinearAds error.',
  501: 'Unable to display NonLinear Ad because creative dimensions do not align with creative display area.',
  502: 'Unable to fetch NonLinearAds/NonLinear resource.',
  503: 'Could not find NonLinearresource with supported type.',
  600: 'General CompanionAds error.',
  601: 'Unable to display companion because creative dimensions do not fit within Companion display area.',
  602: 'Unable to display Required Companion.',
  603: 'Unable to fetch CompanionAds/Companion resource.',
  604: 'Could not find Companion resource with supported type.',
  900: 'Undefined error.',
  901: 'General VPAID error.'
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTtBQUNiLE9BQUssb0JBRFE7QUFFYixPQUFLLCtCQUZRO0FBR2IsT0FBSyx5Q0FIUTtBQUliLE9BQUssc0dBSlE7QUFLYixPQUFLLDZDQUxRO0FBTWIsT0FBSyw0Q0FOUTtBQU9iLE9BQUssd0NBUFE7QUFRYixPQUFLLHdCQVJRO0FBU2IsT0FBSywyR0FUUTtBQVViLE9BQUssK0hBVlE7QUFXYixPQUFLLDhHQVhRO0FBWWIsT0FBSyx3RUFaUTtBQWFiLE9BQUssMkRBYlE7QUFjYixPQUFLLDJCQWRRO0FBZWIsT0FBSyxvSEFmUTtBQWdCYixPQUFLLCtCQWhCUTtBQWlCYixPQUFLLHlEQWpCUTtBQWtCYixPQUFLLDBLQWxCUTtBQW1CYixPQUFLLDBCQW5CUTtBQW9CYixPQUFLLHVFQXBCUTtBQXFCYixPQUFLLDhEQXJCUTtBQXNCYixPQUFLLGtHQXRCUTtBQXVCYixPQUFLLDZCQXZCUTtBQXdCYixPQUFLLHFHQXhCUTtBQXlCYixPQUFLLGtEQXpCUTtBQTBCYixPQUFLLHVEQTFCUTtBQTJCYixPQUFLLDZCQTNCUTtBQTRCYixPQUFLLG1HQTVCUTtBQTZCYixPQUFLLHVDQTdCUTtBQThCYixPQUFLLGtEQTlCUTtBQStCYixPQUFLLHdEQS9CUTtBQWdDYixPQUFLLGtCQWhDUTtBQWlDYixPQUFLO0FBakNRLEMiLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICAxMDA6ICdYTUwgcGFyc2luZyBlcnJvci4nLFxuICAxMDE6ICdWQVNUIHNjaGVtYSB2YWxpZGF0aW9uIGVycm9yLicsXG4gIDEwMjogJ1ZBU1QgdmVyc2lvbiBvZiByZXNwb25zZSBub3Qgc3VwcG9ydGVkLicsXG4gIDIwMDogJ1RyYWZmaWNraW5nIGVycm9yLiBWaWRlbyBwbGF5ZXIgcmVjZWl2ZWQgYW4gYWQgdHlwZSB0aGF0IGl0IHdhcyBub3QgZXhwZWN0aW5nIGFuZC9vciBjYW5ub3QgZGlzcGxheS4nLFxuICAyMDE6ICdWaWRlbyBwbGF5ZXIgZXhwZWN0aW5nIGRpZmZlcmVudCBsaW5lYXJpdHkuJyxcbiAgMjAyOiAnVmlkZW8gcGxheWVyIGV4cGVjdGluZyBkaWZmZXJlbnQgZHVyYXRpb24uJyxcbiAgMjAzOiAnVmlkZW8gcGxheWVyIGV4cGVjdGluZyBkaWZmZXJlbnQgc2l6ZS4nLFxuICAzMDA6ICdHZW5lcmFsIFdyYXBwZXIgZXJyb3IuJyxcbiAgMzAxOiAnVGltZW91dCBvZiBWQVNUIFVSSSBwcm92aWRlZCBpbiBXcmFwcGVyIGVsZW1lbnQsIG9yIG9mIFZBU1QgVVJJIHByb3ZpZGVkIGluIGEgc3Vic2VxdWVudCBXcmFwcGVyIGVsZW1lbnQuJyxcbiAgMzAyOiAnV3JhcHBlciBsaW1pdCByZWFjaGVkLCBhcyBkZWZpbmVkIGJ5IHRoZSB2aWRlbyBwbGF5ZXIuIFRvbyBtYW55IFdyYXBwZXIgcmVzcG9uc2VzIGhhdmUgYmVlbiByZWNlaXZlZCB3aXRoIG5vIEluTGluZSByZXNwb25zZS4nLFxuICAzMDM6ICdObyBhZHMgVkFTVCByZXNwb25zZSBhZnRlciBvbmUgb3IgbW9yZSBXcmFwcGVycy4gQWxzbyBpbmNsdWRlcyBudW1iZXIgb2YgZW1wdHkgVkFTVCByZXNwb25zZXMgZnJvbSBmYWxsYmFjay4nLFxuICA0MDA6ICdHZW5lcmFsIGxpbmVhciBlcnJvci4gVmlkZW8gcGxheWVyIGlzIHVuYWJsZSB0byBkaXNwbGF5IHRoZSBsaW5lYXIgYWQuJyxcbiAgNDAxOiAnRmlsZSBub3QgZm91bmQuIFVuYWJsZSB0byBmaW5kIExpbmVhci9NZWRpYUZpbGUgZnJvbSBVUkkuJyxcbiAgNDAyOiAnVGltZW91dCBvZiBNZWRpYUZpbGUgVVJJLicsXG4gIDQwMzogJ0NvdWxkIG5vdCBmaW5kIE1lZGlhRmlsZSB0aGF0IGlzIHN1cHBvcnRlZCBieSB0aGlzIHZpZGVvIHBsYXllciwgYmFzZWQgb24gdGhlIGF0dHJpYnV0ZXMgb2YgdGhlIE1lZGlhRmlsZSBlbGVtZW50LicsXG4gIDQwNTogJ1Byb2JsZW0gZGlzcGxheWluZyBNZWRpYUZpbGUuJyxcbiAgNDA2OiAnTWV6emFuaW5lIHdhcyByZXF1aXJlZCBidXQgbm90IHByb3ZpZGVkLiBBZCBub3Qgc2VydmVkLicsXG4gIDQwNzogJ01lenphbmluZSBpcyBpbiB0aGUgcHJvY2VzcyBvZiBiZWluZyBkb3dubG9hZGVkIGZvciB0aGUgZmlyc3QgdGltZS4gRG93bmxvYWQgbWF5IHRha2Ugc2V2ZXJhbCBob3Vycy4gQWQgd2lsbCBub3QgYmUgc2VydmVkIHVudGlsIG1lenphbmluZSBpcyBkb3dubG9hZGVkIGFuZCB0cmFuc2NvZGVkLicsXG4gIDQwODogJ0NvbmRpdGlvbmFsIGFkIHJlamVjdGVkLicsXG4gIDQwOTogJ0ludGVyYWN0aXZlIHVuaXQgaW4gdGhlIEludGVyYWN0aXZlQ3JlYXRpdmVGaWxlIG5vZGUgd2FzIG5vdCBleGVjdXRlZCcsXG4gIDQxMDogJ1ZlcmlmaWNhdGlvbiB1bml0IGluIHRoZSBWZXJpZmljYXRpb24gbm9kZSB3YXMgbm90IGV4ZWN1dGVkLicsXG4gIDQxMTogJ01lenphbmluZSB3YXMgcHJvdmlkZWQgYXMgcmVxdWlyZWQsIGJ1dCBmaWxlIGRpZCBub3QgbWVldCByZXF1aXJlZCBzcGVjaWZpY2F0aW9uLiBBZCBub3Qgc2VydmVkLicsXG4gIDUwMDogJ0dlbmVyYWwgTm9uTGluZWFyQWRzIGVycm9yLicsXG4gIDUwMTogJ1VuYWJsZSB0byBkaXNwbGF5IE5vbkxpbmVhciBBZCBiZWNhdXNlIGNyZWF0aXZlIGRpbWVuc2lvbnMgZG8gbm90IGFsaWduIHdpdGggY3JlYXRpdmUgZGlzcGxheSBhcmVhLicsXG4gIDUwMjogJ1VuYWJsZSB0byBmZXRjaCBOb25MaW5lYXJBZHMvTm9uTGluZWFyIHJlc291cmNlLicsXG4gIDUwMzogJ0NvdWxkIG5vdCBmaW5kIE5vbkxpbmVhcnJlc291cmNlIHdpdGggc3VwcG9ydGVkIHR5cGUuJyxcbiAgNjAwOiAnR2VuZXJhbCBDb21wYW5pb25BZHMgZXJyb3IuJyxcbiAgNjAxOiAnVW5hYmxlIHRvIGRpc3BsYXkgY29tcGFuaW9uIGJlY2F1c2UgY3JlYXRpdmUgZGltZW5zaW9ucyBkbyBub3QgZml0IHdpdGhpbiBDb21wYW5pb24gZGlzcGxheSBhcmVhLicsXG4gIDYwMjogJ1VuYWJsZSB0byBkaXNwbGF5IFJlcXVpcmVkIENvbXBhbmlvbi4nLFxuICA2MDM6ICdVbmFibGUgdG8gZmV0Y2ggQ29tcGFuaW9uQWRzL0NvbXBhbmlvbiByZXNvdXJjZS4nLFxuICA2MDQ6ICdDb3VsZCBub3QgZmluZCBDb21wYW5pb24gcmVzb3VyY2Ugd2l0aCBzdXBwb3J0ZWQgdHlwZS4nLFxuICA5MDA6ICdVbmRlZmluZWQgZXJyb3IuJyxcbiAgOTAxOiAnR2VuZXJhbCBWUEFJRCBlcnJvci4nXG59XG4iXX0=


/***/ }),

/***/ "./node_modules/iab-vast-error/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/iab-vast-error/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ERRORS = undefined;

var _errors = __webpack_require__(/*! ./errors */ "./node_modules/iab-vast-error/lib/errors.js");

var _errors2 = _interopRequireDefault(_errors);

var _es6Error = __webpack_require__(/*! es6-error */ "./node_modules/es6-error/es6/index.js");

var _es6Error2 = _interopRequireDefault(_es6Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.ERRORS = _errors2.default;

var VASTError = function (_ExtendableError) {
  _inherits(VASTError, _ExtendableError);

  function VASTError() {
    var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 900;

    _classCallCheck(this, VASTError);

    var _this = _possibleConstructorReturn(this, (VASTError.__proto__ || Object.getPrototypeOf(VASTError)).call(this, 'VAST error ' + code + (code in _errors2.default ? ': ' + _errors2.default[code] : '')));

    _this.code = code;
    _this.$type = 'VASTError';
    return _this;
  }

  return VASTError;
}(_es6Error2.default);

exports["default"] = VASTError;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkVSUk9SUyIsIlZBU1RFcnJvciIsImNvZGUiLCIkdHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztRQUVTQSxNOztJQUVZQyxTOzs7QUFDbkIsdUJBQXlCO0FBQUEsUUFBWkMsSUFBWSx1RUFBTCxHQUFLOztBQUFBOztBQUFBLHNIQUNqQixnQkFBY0EsSUFBZCxJQUNGQSx3QkFBRCxHQUFtQixPQUFPLGlCQUFPQSxJQUFQLENBQTFCLEdBQXlDLEVBRHRDLENBRGlCOztBQUd2QixVQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLQyxLQUFMLEdBQWEsV0FBYjtBQUp1QjtBQUt4Qjs7Ozs7a0JBTmtCRixTIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVSUk9SUyBmcm9tICcuL2Vycm9ycydcbmltcG9ydCBFeHRlbmRhYmxlRXJyb3IgZnJvbSAnZXM2LWVycm9yJ1xuXHJcbmV4cG9ydCB7IEVSUk9SUyB9XHJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVkFTVEVycm9yIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgY29uc3RydWN0b3IgKGNvZGUgPSA5MDApIHtcbiAgICBzdXBlcihgVkFTVCBlcnJvciAke2NvZGV9YCArXHJcbiAgICAgICgoY29kZSBpbiBFUlJPUlMpID8gJzogJyArIEVSUk9SU1tjb2RlXSA6ICcnKSlcbiAgICB0aGlzLmNvZGUgPSBjb2RlXHJcbiAgICB0aGlzLiR0eXBlID0gJ1ZBU1RFcnJvcidcbiAgfVxufVxuIl19


/***/ }),

/***/ "./node_modules/iab-vast-loader/browser.js":
/*!*************************************************!*\
  !*** ./node_modules/iab-vast-loader/browser.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTTPError: () => (/* reexport safe */ _lib_http_error__WEBPACK_IMPORTED_MODULE_3__.HTTPError),
/* harmony export */   VASTLoader: () => (/* reexport safe */ _lib_loader__WEBPACK_IMPORTED_MODULE_1__.VASTLoader),
/* harmony export */   VASTLoaderError: () => (/* reexport safe */ _lib_loader_error__WEBPACK_IMPORTED_MODULE_2__.VASTLoaderError)
/* harmony export */ });
/* harmony import */ var unfetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unfetch */ "./node_modules/unfetch/dist/unfetch.module.js");
/* harmony import */ var _lib_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/loader */ "./node_modules/iab-vast-loader/lib/loader.js");
/* harmony import */ var _lib_loader_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/loader-error */ "./node_modules/iab-vast-loader/lib/loader-error.js");
/* harmony import */ var _lib_http_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/http-error */ "./node_modules/iab-vast-loader/lib/http-error.js");
/* harmony import */ var _lib_browser_atob__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/browser/atob */ "./node_modules/iab-vast-loader/lib/browser/atob.js");






_lib_loader__WEBPACK_IMPORTED_MODULE_1__.VASTLoader.fetch = unfetch__WEBPACK_IMPORTED_MODULE_0__["default"]
_lib_loader__WEBPACK_IMPORTED_MODULE_1__.VASTLoader.atob = _lib_browser_atob__WEBPACK_IMPORTED_MODULE_4__.atob




/***/ }),

/***/ "./node_modules/iab-vast-loader/lib/browser/atob.js":
/*!**********************************************************!*\
  !*** ./node_modules/iab-vast-loader/lib/browser/atob.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   atob: () => (/* binding */ atob)
/* harmony export */ });
// Based on https://gist.github.com/stubbetje/229984

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const atob = string => {
  let result = ''
  let i = 0
  do {
    const b1 = characters.indexOf(string.charAt(i++))
    const b2 = characters.indexOf(string.charAt(i++))
    const b3 = characters.indexOf(string.charAt(i++))
    const b4 = characters.indexOf(string.charAt(i++))
    const a = ((b1 & 0x3f) << 2) | ((b2 >> 4) & 0x3)
    const b = ((b2 & 0xf) << 4) | ((b3 >> 2) & 0xf)
    const c = ((b3 & 0x3) << 6) | (b4 & 0x3f)
    /* istanbul ignore next */
    result +=
      String.fromCharCode(a) +
      (b ? String.fromCharCode(b) : '') +
      (c ? String.fromCharCode(c) : '')
  } while (i < string.length)
  return result
}




/***/ }),

/***/ "./node_modules/iab-vast-loader/lib/http-error.js":
/*!********************************************************!*\
  !*** ./node_modules/iab-vast-loader/lib/http-error.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTTPError: () => (/* binding */ HTTPError)
/* harmony export */ });
/* harmony import */ var es6_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! es6-error */ "./node_modules/es6-error/es6/index.js");


class HTTPError extends es6_error__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor (status, statusText) {
    super(
      `HTTP ${status}` +
        (statusText != null && statusText !== '' ? `: ${statusText}` : '')
    )
    this.status = status
    this.statusText = statusText
    this.$type = 'HTTPError'
  }
}




/***/ }),

/***/ "./node_modules/iab-vast-loader/lib/loader-error.js":
/*!**********************************************************!*\
  !*** ./node_modules/iab-vast-loader/lib/loader-error.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VASTLoaderError: () => (/* binding */ VASTLoaderError)
/* harmony export */ });
/* harmony import */ var iab_vast_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-error */ "./node_modules/iab-vast-error/index.js");
/* harmony import */ var iab_vast_error__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(iab_vast_error__WEBPACK_IMPORTED_MODULE_0__);


class VASTLoaderError extends (iab_vast_error__WEBPACK_IMPORTED_MODULE_0___default()) {
  constructor (code, cause = null, uri = null) {
    super(code)
    this.cause = cause
    this.uri = uri
    this.$type = 'VASTLoaderError'
  }
}




/***/ }),

/***/ "./node_modules/iab-vast-loader/lib/loader.js":
/*!****************************************************!*\
  !*** ./node_modules/iab-vast-loader/lib/loader.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VASTLoader: () => (/* binding */ VASTLoader)
/* harmony export */ });
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var iab_vast_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! iab-vast-parser */ "./node_modules/iab-vast-parser/src/parse.js");
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _loader_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loader-error */ "./node_modules/iab-vast-loader/lib/loader-error.js");
/* harmony import */ var _http_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./http-error */ "./node_modules/iab-vast-loader/lib/http-error.js");






const RE_DATA_URI = /^data:(.*?)(;\s*base64)?,(.*)/

const DEFAULT_OPTIONS = {
  maxDepth: 10,
  credentials: 'omit',
  timeout: 10000,
  noSingleAdPods: false,
  prepareUri: uri => uri
}

class VASTLoader extends (eventemitter3__WEBPACK_IMPORTED_MODULE_0___default()) {
  constructor (uri, options, parent) {
    super()
    this._uri = uri
    if (parent != null) {
      this._root = parent._root
      this._options = this._root._options
      this._depth = parent._depth + 1
    } else {
      this._root = this
      this._options = Object.assign({}, DEFAULT_OPTIONS, options)
      this._depth = 1
      this._fetch =
        this._options.fetch != null ? this._options.fetch : VASTLoader.fetch
    }
  }

  load () {
    return this._load(this._uri).catch(error => {
      this._emit('error', { error })
      throw error
    })
  }

  _load (uri) {
    return Promise.resolve()
      .then(() => {
        this._emit('willFetch', { uri })
        const match = RE_DATA_URI.exec(uri)
        return match == null
          ? this._fetchUri(uri)
          : this._parseDataUri(match[3], match[1], match[2] != null)
      })
      .then(({ headers, body }) => {
        this._emit('didFetch', { uri, headers, body })
        this._emit('willParse', { uri, headers, body })
        const vast = (0,iab_vast_parser__WEBPACK_IMPORTED_MODULE_1__["default"])(body, {
          noSingleAdPods: this._options.noSingleAdPods
        })
        vast.uri = uri
        this._emit('didParse', { uri, headers, body, vast })
        if (vast.ads.length > 0) {
          const ad = vast.ads.get(0)
          if (ad instanceof iab_vast_model__WEBPACK_IMPORTED_MODULE_2__.Wrapper || ad.$type === 'Wrapper') {
            return this._loadWrapped(ad.vastAdTagURI, vast)
          }
        } else if (this._depth > 1) {
          throw new _loader_error__WEBPACK_IMPORTED_MODULE_3__.VASTLoaderError(303, null, uri)
        }
        return [vast]
      })
  }

  _parseDataUri (data, mimeType, isBase64) {
    return { body: isBase64 ? VASTLoader.atob(data) : decodeURIComponent(data) }
  }

  _loadWrapped (vastAdTagURI, vast) {
    return Promise.resolve()
      .then(() => {
        const { maxDepth } = this._options
        if (maxDepth > 0 && this._depth + 1 >= maxDepth) {
          throw new _loader_error__WEBPACK_IMPORTED_MODULE_3__.VASTLoaderError(302, null, vastAdTagURI)
        }
        const childLoader = new VASTLoader(vastAdTagURI, null, this)
        return childLoader.load()
      })
      .then(children => [vast, ...children])
  }

  _fetchUri (uri) {
    const preparedUri = this._options.prepareUri(uri)
    const fetching = this._fetchWithCredentials(preparedUri)
    const timingOut = this._createTimeouter(fetching, preparedUri)
    return Promise.race([fetching, timingOut])
      .then(response => {
        timingOut.cancel()
        return response
      })
      .catch(err => {
        timingOut.cancel()
        if (this._depth > 1) {
          throw new _loader_error__WEBPACK_IMPORTED_MODULE_3__.VASTLoaderError(301, null, preparedUri)
        }
        throw err
      })
  }

  _fetchWithCredentials (uri) {
    let { credentials } = this._options
    if (typeof credentials === 'function') {
      credentials = credentials(uri)
    }
    if (!Array.isArray(credentials)) {
      credentials = [credentials]
    }
    return credentials.reduce(
      (prev, cred) => prev.catch(() => this._tryFetch(uri, cred)),
      Promise.reject(new Error())
    )
  }

  _tryFetch (uri, credentials) {
    return this._root
      ._fetch(uri, { credentials })
      .then(response => {
        if (!response.ok) {
          const httpError = new _http_error__WEBPACK_IMPORTED_MODULE_4__.HTTPError(response.status, response.statusText)
          throw new _loader_error__WEBPACK_IMPORTED_MODULE_3__.VASTLoaderError(301, httpError, uri)
        }
        return response.text().then(body => ({
          headers: response.headers,
          body
        }))
      })
      .catch(error => {
        this._emit('fetchError', { uri, credentials, error })
        throw error
      })
  }

  _createTimeouter (fetching, uri) {
    const ms = this._options.timeout
    let timeout = null
    const timingOut = new Promise((resolve, reject) => {
      timeout = setTimeout(() => {
        reject(new _loader_error__WEBPACK_IMPORTED_MODULE_3__.VASTLoaderError(301, null, uri))
      }, ms)
    })
    timingOut.cancel = () => {
      if (timeout != null) {
        clearTimeout(timeout)
        timeout = null
      }
    }
    return timingOut
  }

  _emit (...args) {
    this._root.emit(...args)
  }
}




/***/ }),

/***/ "./node_modules/iab-vast-model/src/ad/abstract.js":
/*!********************************************************!*\
  !*** ./node_modules/iab-vast-model/src/ad/abstract.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractAd: () => (/* binding */ AbstractAd)
/* harmony export */ });
/* harmony import */ var _util_sorted_list_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/sorted-list-item */ "./node_modules/iab-vast-model/src/util/sorted-list-item.js");
/* harmony import */ var _util_sorted_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/sorted-list */ "./node_modules/iab-vast-model/src/util/sorted-list.js");



/**
 * Abstract class for ads (i.e., {@link InLine} and {@link Wrapper}).
 *
 * @abstract
 * @protected
 */
class AbstractAd extends _util_sorted_list_item__WEBPACK_IMPORTED_MODULE_0__.SortedListItem {
  constructor () {
    super()
    this._id = null
    this._conditionalAd = false
    this._adSystem = null
    this._impressions = []
    this._pricing = null
    this._errors = []
    this._viewableImpression = null
    this._verifications = []
    this._extensions = []
    this._creatives = new _util_sorted_list__WEBPACK_IMPORTED_MODULE_1__.SortedList()
  }

  // Attribute(s).

  /**
   * The ad server-defined identifier for this ad.
   *
   * @type {string}
   */
  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  /**
   * The conditional attribute for this ad.
   *
   * @type {boolean}
   */
  get conditionalAd () {
    return this._conditionalAd
  }

  set conditionalAd (value) {
    this._conditionalAd = value
  }

  // Children.

  /**
   * The ad system for this ad.
   *
   * @type {AdSystem}
   */
  get adSystem () {
    return this._adSystem
  }

  set adSystem (value) {
    this._adSystem = value
  }

  /**
   * The impression-tracking configurations for this ad.
   *
   * @type {Impression[]}
   */
  get impressions () {
    return this._impressions
  }

  /**
   * The pricing configuration for this ad.
   *
   * @type {Pricing}
   */
  get pricing () {
    return this._pricing
  }

  set pricing (value) {
    this._pricing = value
  }

  /**
   * The error-tracking URIs for this ad.
   *
   * @type {string[]}
   */
  get errors () {
    return this._errors
  }

  /**
   * The viewable impression for this ad.
   *
   * @type {ViewableImpression}
   */
  get viewableImpression () {
    return this._viewableImpression
  }

  set viewableImpression (value) {
    this._viewableImpression = value
  }

  /**
   * The verifications for this ad.
   *
   * @type {Verification[]}
   */
  get verifications () {
    return this._verifications
  }

  /**
   * The extensions for this ad.
   *
   * @type {Extension[]}
   */
  get extensions () {
    return this._extensions
  }

  /**
   * The creatives for this ad.
   *
   * @type {SortedList.<Creative>}
   */
  get creatives () {
    return this._creatives
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/ad/in-line.js":
/*!*******************************************************!*\
  !*** ./node_modules/iab-vast-model/src/ad/in-line.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InLine: () => (/* binding */ InLine)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./node_modules/iab-vast-model/src/ad/abstract.js");


/**
 * Represents an InLine ad.
 */
class InLine extends _abstract__WEBPACK_IMPORTED_MODULE_0__.AbstractAd {
  constructor () {
    super()
    this._adTitle = null
    this._categories = []
    this._description = null
    this._surveys = []
  }

  // Children.

  /**
   * The title for this ad.
   *
   * @type {string}
   */
  get adTitle () {
    return this._adTitle
  }

  set adTitle (value) {
    this._adTitle = value
  }

  /**
   * The categories for this ad.
   *
   * @type {Category[]}
   */
  get categories () {
    return this._categories
  }

  /**
   * The description for this ad.
   *
   * @type {string}
   */
  get description () {
    return this._description
  }

  set description (value) {
    this._description = value
  }

  /**
   * The advertiser name for this ad.
   *
   * @type {string}
   */
  get advertiser () {
    return this._advertiser
  }

  set advertiser (value) {
    this._advertiser = value
  }

  /**
   * The survey URI for this ad.
   *
   * @type {Survey[]}
   */
  get surveys () {
    return this._surveys
  }

  get $type () {
    return 'InLine'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/ad/wrapper.js":
/*!*******************************************************!*\
  !*** ./node_modules/iab-vast-model/src/ad/wrapper.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Wrapper: () => (/* binding */ Wrapper)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./node_modules/iab-vast-model/src/ad/abstract.js");


/**
 * Represents a wrapper ad.
 */
class Wrapper extends _abstract__WEBPACK_IMPORTED_MODULE_0__.AbstractAd {
  constructor () {
    super()
    this._followAdditionalWrappers = true
    this._allowMultipleAds = false
    this._fallbackOnNoAd = false
    this._vastAdTagURI = null
  }

  // Attribute(s).

  /**
   * Whether subsequent wrappers after a requested VAST response is allowed.
   *
   * @type {boolean}
   */
  get followAdditionalWrappers () {
    return this._followAdditionalWrappers
  }

  set followAdditionalWrappers (value) {
    this._followAdditionalWrappers = value
  }

  /**
   * Whether multiple ads are allowed in the requested VAST response.
   *
   * @type {boolean}
   */
  get allowMultipleAds () {
    return this._allowMultipleAds
  }

  set allowMultipleAds (value) {
    this._allowMultipleAds = value
  }

  /**
   * Whether to use an available Ad when the requested VAST response returns no
   * ads.
   *
   * @type {boolean}
   */
  get fallbackOnNoAd () {
    return this._fallbackOnNoAd
  }

  set fallbackOnNoAd (value) {
    this._fallbackOnNoAd = value
  }

  // Children.

  /**
   * The URI to a VAST response that may be another VAST {@link Wrapper} or a
   * VAST {@link InLine} ad.
   *
   * @type {string}
   */
  get vastAdTagURI () {
    return this._vastAdTagURI
  }

  set vastAdTagURI (value) {
    this._vastAdTagURI = value
  }

  get $type () {
    return 'Wrapper'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/clicks/abstract.js":
/*!************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/clicks/abstract.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractClicks: () => (/* binding */ AbstractClicks)
/* harmony export */ });
/**
 * Stores the click-through URI and a set of click-tracking pixels.
 *
 * @abstract
 * @protected
 */
class AbstractClicks {
  constructor () {
    this._clickThrough = null
    this._clickTrackings = []
  }

  // Children.

  /**
   * The click-through configuration.
   *
   * @type {Click}
   */
  get clickThrough () {
    return this._clickThrough
  }

  set clickThrough (value) {
    this._clickThrough = value
  }

  /**
   * The click-tracking configurations.
   *
   * @type {Click[]}
   */
  get clickTrackings () {
    return this._clickTrackings
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/clicks/icon.js":
/*!********************************************************!*\
  !*** ./node_modules/iab-vast-model/src/clicks/icon.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconClicks: () => (/* binding */ IconClicks)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./node_modules/iab-vast-model/src/clicks/abstract.js");


/**
 * Represents the click tracking configuration for an {@link Icon}.
 */
class IconClicks extends _abstract__WEBPACK_IMPORTED_MODULE_0__.AbstractClicks {
  get $type () {
    return 'IconClicks'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/clicks/video.js":
/*!*********************************************************!*\
  !*** ./node_modules/iab-vast-model/src/clicks/video.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoClicks: () => (/* binding */ VideoClicks)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./node_modules/iab-vast-model/src/clicks/abstract.js");


/**
 * Represents the click-tracking configuration for a {@link Linear} creative.
 */
class VideoClicks extends _abstract__WEBPACK_IMPORTED_MODULE_0__.AbstractClicks {
  constructor () {
    super()
    this._customClicks = []
  }

  // Children.

  /**
   * The custom-click configurations.
   *
   * @type {Click[]}
   */
  get customClicks () {
    return this._customClicks
  }

  get $type () {
    return 'VideoClicks'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/ad-system.js":
/*!***********************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/ad-system.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdSystem: () => (/* binding */ AdSystem)
/* harmony export */ });
/**
 * Stores information about the ad system.
 */
class AdSystem {
  constructor () {
    this._version = null
    this._name = null
  }

  // Attribute(s).

  /**
   * The version of the ad system.
   *
   * @type {string}
   */
  get version () {
    return this._version
  }

  set version (value) {
    this._version = value
  }

  // Content.

  /**
   * The name of the ad server that returned the ad.
   *
   * @type {string}
   */
  get name () {
    return this._name
  }

  set name (value) {
    this._name = value
  }

  get $type () {
    return 'AdSystem'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/category.js":
/*!**********************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/category.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Category: () => (/* binding */ Category)
/* harmony export */ });
/**
 * Pricing information for real-time bidding.
 */
class Category {
  constructor () {
    this._authority = null
    this._code = null
  }

  // Attribute(s).

  /**
   * The URL for the organizational authority that produced the list being used
   * to identify the ad content.
   *
   * @type {string}
   */
  get authority () {
    return this._authority
  }

  set authority (value) {
    this._authority = value
  }

  // Content.

  /**
   * The category code or label that identifies the ad content.
   *
   * @type {string}
   */
  get code () {
    return this._code
  }

  set code (value) {
    this._code = value
  }

  get $type () {
    return 'Category'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/click.js":
/*!*******************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/click.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Click: () => (/* binding */ Click)
/* harmony export */ });
/**
 * Describes a click configuration.
 */
class Click {
  constructor () {
    this._id = null
    this._uri = null
  }

  // Attribute(s).

  /**
   * The ID of this click.
   *
   * @type {string}
   */
  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  // Content.

  /**
   * The URI of this tracking pixel.
   *
   * @type {string}
   */
  get uri () {
    return this._uri
  }

  set uri (value) {
    this._uri = value
  }

  get $type () {
    return 'Click'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/creative.js":
/*!**********************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/creative.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Creative: () => (/* binding */ Creative)
/* harmony export */ });
/* harmony import */ var _util_sorted_list_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/sorted-list-item */ "./node_modules/iab-vast-model/src/util/sorted-list-item.js");


/**
 * Represents a creative.
 */
class Creative extends _util_sorted_list_item__WEBPACK_IMPORTED_MODULE_0__.SortedListItem {
  constructor () {
    super()
    this._id = null
    this._adID = null
    this._apiFramework = null
    this._universalAdId = null
    this._extensions = []
    this._linear = null
    this._companionAds = null
    this._nonLinearAds = null
  }

  // Attribute(s).

  /**
   * The ID of this creative.
   *
   * @type {string}
   */
  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  /**
   * The ID of the {@link Ad} with which this creative is served.
   *
   * Required for VAST 2.0 and 3.0, optional for VAST 4.0.
   *
   * @type {string}
   */
  get adID () {
    return this._adID
  }

  set adID (value) {
    this._adID = value
  }

  /**
   * The string that identifies an API that is needed to execute this creative.
   *
   * @type {string}
   */
  get apiFramework () {
    return this._apiFramework
  }

  set apiFramework (value) {
    this._apiFramework = value
  }

  // Children.

  /**
   * The unique creative identifier for this creative.
   *
   * @type {UniversalAdId}
   */
  get universalAdId () {
    return this._universalAdId
  }

  set universalAdId (value) {
    this._universalAdId = value
  }

  /**
   * The creative extensions for this creative.
   *
   * @type {CreativeExtension[]}
   */
  get extensions () {
    return this._extensions
  }

  /**
   * The linear ad for this creative, if any.
   *
   * @type {Linear}
   */
  get linear () {
    return this._linear
  }

  set linear (value) {
    this._linear = value
  }

  /**
   * The companion ads for this creative, if any.
   *
   * @type {CompanionAds}
   */
  get companionAds () {
    return this._companionAds
  }

  set companionAds (value) {
    this._companionAds = value
  }

  /**
   * The non-linear ads for this creative, if any.
   *
   * @type {NonLinearAds}
   */
  get nonLinearAds () {
    return this._nonLinearAds
  }

  set nonLinearAds (value) {
    this._nonLinearAds = value
  }

  get $type () {
    return 'Creative'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/icon.js":
/*!******************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/icon.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Icon: () => (/* binding */ Icon)
/* harmony export */ });
/**
 * Represents an icon used in a {@link Linear} creative.
 */
class Icon {
  constructor () {
    this._program = null
    this._width = null
    this._height = null
    this._xPosition = null
    this._yPosition = null
    this._duration = null
    this._offset = null
    this._apiFramework = null
    this._pxratio = null
    this._resource = null
    this._clicks = null
    this._viewTrackings = []
  }

  // Attribute(s).

  /**
   * The industry initiative that this icon supports.
   *
   * @type {string}
   */
  get program () {
    return this._program
  }

  set program (value) {
    this._program = value
  }

  /**
   * The width of this icon in pixels.
   *
   * @type {number}
   */
  get width () {
    return this._width
  }

  set width (value) {
    this._width = value
  }

  /**
   * The height of this icon in pixels.
   *
   * @type {number}
   */
  get height () {
    return this._height
  }

  set height (value) {
    this._height = value
  }

  /**
   * The horizontal position of this icon. Either a number of pixels or the
   * string `"left"` or `"right"`.
   *
   * @type {number|string}
   */
  get xPosition () {
    return this._xPosition
  }

  set xPosition (value) {
    this._xPosition = value
  }

  /**
   * The vertical position of this icon. Either a number of pixels or the
   * string `"top"` or `"bottom"`.
   *
   * @type {number|string}
   */
  get yPosition () {
    return this._yPosition
  }

  set yPosition (value) {
    this._yPosition = value
  }

  /**
   * The duration of this icon in seconds.
   *
   * @type {number}
   */
  get duration () {
    return this._duration
  }

  set duration (value) {
    this._duration = value
  }

  /**
   * The time offset of this icon in seconds.
   *
   * @type {number}
   */
  get offset () {
    return this._offset
  }

  set offset (value) {
    this._offset = value
  }

  /**
   * The API framework used by this icon.
   *
   * @type {string}
   */
  get apiFramework () {
    return this._apiFramework
  }

  set apiFramework (value) {
    this._apiFramework = value
  }

  /**
   * The pixel ratio for which the icon creative is intended.
   *
   * @type {string}
   */
  get pxratio () {
    return this._pxratio
  }

  set pxratio (value) {
    this._pxratio = value
  }

  // Children.

  /**
   * The resource associated with this icon.
   *
   * @type {Resource}
   */
  get resource () {
    return this._resource
  }

  set resource (value) {
    this._resource = value
  }

  /**
   * The click-tracking configuration for this icon.
   *
   * @type {IconClicks}
   */
  get clicks () {
    return this._clicks
  }

  set clicks (value) {
    this._clicks = value
  }

  /**
   * The view-tracking URIs for this icon.
   *
   * @type {string[]}
   */
  get viewTrackings () {
    return this._viewTrackings
  }

  get $type () {
    return 'Icon'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/impression.js":
/*!************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/impression.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Impression: () => (/* binding */ Impression)
/* harmony export */ });
/**
 * Represents an impression.
 */
class Impression {
  constructor () {
    this._id = null
    this._uri = null
  }

  // Attribute(s).

  /**
   * The ad server id for the impression.
   *
   * @type {string}
   */
  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  // Content.

  /**
   * The URI of this impression resource.
   *
   * @type {string}
   */
  get uri () {
    return this._uri
  }

  set uri (value) {
    this._uri = value
  }

  get $type () {
    return 'Impression'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/interactive-creative-file.js":
/*!***************************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/interactive-creative-file.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InteractiveCreativeFile: () => (/* binding */ InteractiveCreativeFile)
/* harmony export */ });
/**
 * Represents an interactive creative file used in a {@link Linear} creative.
 */
class InteractiveCreativeFile {
  constructor () {
    this._type = null
    this._apiFramework = null
    this._url = null
  }

  // Attribute(s).

  /**
   * The MIME type of this interactive creative file.
   *
   * @type {string}
   */
  get type () {
    return this._type
  }

  set type (value) {
    this._type = value
  }

  /**
   * The API framework used by this interactive creative file.
   *
   * @type {string}
   */
  get apiFramework () {
    return this._apiFramework
  }

  set apiFramework (value) {
    this._apiFramework = value
  }

  // Content.

  /**
   * The URI to this interactive creative file.
   *
   * @type {string}
   */
  get uri () {
    return this._uri
  }

  set uri (value) {
    this._uri = value
  }

  get $type () {
    return 'InteractiveCreativeFile'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/media-file.js":
/*!************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/media-file.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MediaFile: () => (/* binding */ MediaFile)
/* harmony export */ });
/**
 * Represents a media file used in a {@link Linear} creative.
 */
class MediaFile {
  constructor () {
    this._delivery = null
    this._type = null
    this._width = null
    this._height = null
    this._codec = null
    this._id = null
    this._bitrate = null
    this._minBitrate = null
    this._maxBitrate = null
    this._scalable = false
    this._maintainAspectRatio = false
    this._apiFramework = null
    this._uri = null
  }

  // Attribute(s).

  /**
   * The delivery method for this media file.
   *
   * @type {string}
   */
  get delivery () {
    return this._delivery
  }

  set delivery (value) {
    this._delivery = value
  }

  /**
   * The MIME type of this media file.
   *
   * @type {string}
   */
  get type () {
    return this._type
  }

  set type (value) {
    this._type = value
  }

  /**
   * The width of this media file in pixels.
   *
   * @type {number}
   */
  get width () {
    return this._width
  }

  set width (value) {
    this._width = value
  }

  /**
   * The height of this media file in pixels.
   *
   * @type {number}
   */
  get height () {
    return this._height
  }

  set height (value) {
    this._height = value
  }

  /**
   * The codec of this media file in RFC 4281 format.
   *
   * @type {string}
   */
  get codec () {
    return this._codec
  }

  set codec (value) {
    this._codec = value
  }

  /**
   * The ID of this media file.
   *
   * @type {string}
   */
  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  /**
   * The bitrate of this media file in kbps.
   *
   * @type {number}
   */
  get bitrate () {
    return this._bitrate
  }

  set bitrate (value) {
    this._bitrate = value
  }

  /**
   * The minimum bitrate of this media file in kbps.
   *
   * @type {number}
   */
  get minBitrate () {
    return this._minBitrate
  }

  set minBitrate (value) {
    this._minBitrate = value
  }

  /**
   * The maximum bitrate of this media file in kbps.
   *
   * @type {number}
   */
  get maxBitrate () {
    return this._maxBitrate
  }

  set maxBitrate (value) {
    this._maxBitrate = value
  }

  /**
   * Whether this media file is meant to scale to larger dimensions.
   *
   * @type {boolean}
   */
  get scalable () {
    return this._scalable
  }

  set scalable (value) {
    this._scalable = value
  }

  /**
   * Whether this media file's aspect ratio should be maintained when scaled.
   *
   * @type {boolean}
   */
  get maintainAspectRatio () {
    return this._maintainAspectRatio
  }

  set maintainAspectRatio (value) {
    this._maintainAspectRatio = value
  }

  /**
   * The API framework used by this media file.
   *
   * @type {string}
   */
  get apiFramework () {
    return this._apiFramework
  }

  set apiFramework (value) {
    this._apiFramework = value
  }

  // Content.

  /**
   * The URI to this media file.
   *
   * @type {string}
   */
  get uri () {
    return this._uri
  }

  set uri (value) {
    this._uri = value
  }

  get $type () {
    return 'MediaFile'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/pricing.js":
/*!*********************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/pricing.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pricing: () => (/* binding */ Pricing)
/* harmony export */ });
/**
 * Represents pricing information for real-time bidding.
 */
class Pricing {
  constructor () {
    this._model = null
    this._currency = null
    this._value = null
  }

  // Attribute(s).

  /**
   * The pricing model. Either `"CPM"`, `"CPC"`, `"CPE"`, or `"CPV"`.
   *
   * @type {string}
   */
  get model () {
    return this._model
  }

  set model (value) {
    this._model = value
  }

  /**
   * The three-letter ISO-4217 currency symbol that identifies the currency of
   * the value provided (e.g. `"USD"`, `"GBP"`, etc.).
   *
   * @type {string}
   */
  get currency () {
    return this._currency
  }

  set currency (value) {
    this._currency = value
  }

  // Content.

  /**
   * The price that can be used in real-time bidding systems.
   *
   * @type {number}
   */
  get value () {
    return this._value
  }

  set value (value) {
    this._value = value
  }

  get $type () {
    return 'Pricing'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/survey.js":
/*!********************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/survey.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Survey: () => (/* binding */ Survey)
/* harmony export */ });
/**
 * Represents survey information for data collection.
 */
class Survey {
  constructor () {
    this._type = null
    this._uri = null
  }

  // Attribute(s).

  /**
   * The MIME type of the resource being served.
   *
   * @type {string}
   */
  get type () {
    return this._type
  }

  set type (value) {
    this._type = value
  }

  // Content.

  /**
   * The URI to any resource relating to an integrated survey.
   *
   * @type {string}
   */
  get uri () {
    return this._uri
  }

  set uri (value) {
    this._uri = value
  }

  get $type () {
    return 'Survey'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/tracking-event.js":
/*!****************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/tracking-event.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackingEvent: () => (/* binding */ TrackingEvent)
/* harmony export */ });
/**
 * Represents an event to be tracked.
 */
class TrackingEvent {
  constructor () {
    this._uri = null
    this._offset = null
  }

  // Content.

  /**
   * The tracking URI for this event configuration.
   *
   * @type {string}
   */
  get uri () {
    return this._uri
  }

  set uri (value) {
    this._uri = value
  }

  /**
   * The time offset for this event configuration.
   *
   * @type {TimeOffset}
   */
  get offset () {
    return this._offset
  }

  set offset (value) {
    this._offset = value
  }

  get $type () {
    return 'TrackingEvent'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/tracking-events.js":
/*!*****************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/tracking-events.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackingEvents: () => (/* binding */ TrackingEvents)
/* harmony export */ });
/**
 * Configures tracking events. Maps VAST event types to arrays of
 * {@link TrackingEvent} instances.
 */
class TrackingEvents {
  constructor () {
    this._map = Object.create(null)
  }

  /**
   * The event types tracked by this configuration.
   *
   * @type {string[]}
   */
  get types () {
    return Object.keys(this._map)
  }

  /**
   * Gets the tracking-event configurations for the given event type.
   *
   * @param {string} event - the event type.
   * @return {TrackingEvent[]} the tracking event configurations.
   */
  get (event) {
    return this._map[event] || []
  }

  /**
   * Adds a tracking-event configuration for the given event type.
   *
   * @param {string} event - the event type.
   * @param {TrackingEvent} config - the tracking event configuration.
   */
  add (event, config) {
    this._map[event] = this._map[event] || []
    this._map[event].push(config)
  }

  get $type () {
    return 'TrackingEvents'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/universal-ad-id.js":
/*!*****************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/universal-ad-id.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UniversalAdId: () => (/* binding */ UniversalAdId)
/* harmony export */ });
/**
 * Represents a unique identifier for an ad.
 */
class UniversalAdId {
  constructor () {
    this._idRegistry = 'unknown'
    this._idValue = 'unknown'
    this._creativeIdentifier = null
  }

  // Attribute(s).

  /**
   * The registry URL for the unique creative identifier.
   *
   * @type {string}
   */
  get idRegistry () {
    return this._idRegistry
  }

  set idRegistry (value) {
    this._idRegistry = value
  }

  /**
   * A string for the unique creative identifier.
   *
   * @type {string}
   */
  get idValue () {
    return this._idValue
  }

  set idValue (value) {
    this._idValue = value
  }

  // Content.

  /**
   * The string identifying the unique creative identifier.
   *
   * @type {string}
   */
  get creativeIdentifier () {
    return this._creativeIdentifier
  }

  set creativeIdentifier (value) {
    this._creativeIdentifier = value
  }

  get $type () {
    return 'UniversalAdId'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/vast.js":
/*!******************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/vast.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VAST: () => (/* binding */ VAST)
/* harmony export */ });
/* harmony import */ var _util_ad_buffet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/ad-buffet */ "./node_modules/iab-vast-model/src/util/ad-buffet.js");


/**
 * Represents a VAST document.
 */
class VAST extends _util_ad_buffet__WEBPACK_IMPORTED_MODULE_0__.AdBuffet {
  constructor () {
    super()
    this._uri = null
    this._version = null
    this._errors = []
  }

  /**
   * The URI associated with this document.
   *
   * @type {string}
   */
  get uri () {
    return this._uri
  }

  set uri (uri) {
    this._uri = uri
  }

  // Attribute(s).

  /**
   * The VAST version used by this document.
   *
   * @type {number}
   */
  get version () {
    return this._version
  }

  set version (value) {
    this._version = value
  }

  // Children.

  /**
   * The error-tracking URIs for this document.
   *
   * @type {string[]}
   */
  get errors () {
    return this._errors
  }

  get $type () {
    return 'VAST'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/verification.js":
/*!**************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/verification.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Verification: () => (/* binding */ Verification)
/* harmony export */ });
/**
 * Represents a list of verification resources for a vendor.
 */
class Verification {
  constructor () {
    this._vendor = null
    this._javaScriptResources = []
    this._flashResources = []
    this._viewableImpression = null
  }

  // Attribute(s).

  /**
   * The home page URL for the verification service provider that supplies the
   * resource file.
   *
   * @type {string}
   */
  get vendor () {
    return this._vendor
  }

  set vendor (value) {
    this._vendor = value
  }

  // Children.

  /**
   * The JavaScript resources for this verification vendor.
   *
   * @type {JavaScriptResource[]}
   */
  get javaScriptResources () {
    return this._javaScriptResources
  }

  /**
   * The Flash resources for this verification vendor.
   *
   * @type {FlashResource[]}
   */
  get flashResources () {
    return this._flashResources
  }

  /**
   * The viewable impression for this verification vendor.
   *
   * @type {ViewableImpression}
   */
  get viewableImpression () {
    return this._viewableImpression
  }

  set viewableImpression (value) {
    this._viewableImpression = value
  }

  get $type () {
    return 'Verification'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/core/viewable-impression.js":
/*!*********************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/core/viewable-impression.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewableImpression: () => (/* binding */ ViewableImpression)
/* harmony export */ });
/**
 * Represents the impression-tracking URIs for both an {@link InLine} and any
 * {@link Wrapper}.
 */
class ViewableImpression {
  constructor () {
    this._id = null
    this._viewables = []
    this._notViewables = []
    this._viewUndetermineds = []
  }

  // Attribute(s).

  /**
   * The ad server ID of this viewability impression pixel.
   *
   * @type {string}
   */
  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  // Children.

  /**
   * The URIs that direct the video player to a tracking resource file that the
   * video player should request at the time that criteria is met for a viewable
   * impression.
   *
   * @type {string[]}
   */
  get viewables () {
    return this._viewables
  }

  /**
   * The URIs that direct the video player to a tracking resource file that the
   * video player should request if the ad is executed but never meets criteria
   * for a viewable impression.
   *
   * @type {string[]}
   */
  get notViewables () {
    return this._notViewables
  }

  /**
   * The URIs that direct the video player to a tracking resource file that the
   * video player should request if the player cannot determine whether criteria
   * is met for a viewable impression.
   *
   * @type {string[]}
   */
  get viewUndetermineds () {
    return this._viewUndetermineds
  }

  get $type () {
    return 'ViewableImpression'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/creative/companion-ads.js":
/*!*******************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/creative/companion-ads.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompanionAds: () => (/* binding */ CompanionAds)
/* harmony export */ });
/**
 * Represents companion ads within a {@link Creative}.
 */
class CompanionAds {
  constructor () {
    this._required = null
    this._companions = []
    this._xmlElement = null
  }

  // Attribute(s).

  /**
   * Determines which companion creative to display when multiple companions
   * are supplied and whether the ad can be displayed without its companion
   * creative. Either `"all"`, `"any"`, or `"none"`.
   *
   * @type {string}
   */
  get required () {
    return this._required
  }

  set required (value) {
    this._required = value
  }

  // Children.

  /**
   * The companion ads.
   *
   * @type {Companion[]}
   */
  get companions () {
    return this._companions
  }

  // Content.

  /**
   * The `<CompanionAds>` XML DOM element.
   *
   * @type {Element}
   */
  get xmlElement () {
    return this._xmlElement
  }

  set xmlElement (value) {
    this._xmlElement = value
  }

  get $type () {
    return 'CompanionAds'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/creative/companion.js":
/*!***************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/creative/companion.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Companion: () => (/* binding */ Companion)
/* harmony export */ });
/**
 * Represents a single companion inside {@link CompanionAds}.
 */
class Companion {
  constructor () {
    this._id = null
    this._width = null
    this._height = null
    this._assetWidth = null
    this._assetHeight = null
    this._expandedWidth = null
    this._expandedHeight = null
    this._apiFramework = null
    this._adSlotID = null
    this._pxratio = null
    this._resource = null
    this._adParameters = null
    this._altText = null
    this._clickThrough = null
    this._clickTrackings = []
    this._trackingEvents = null
  }

  // Attribute(s).

  /**
   * The ID for this companion ad.
   *
   * @type {string}
   */
  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  /**
   * The width of this companion ad in pixels.
   *
   * @type {number}
   */
  get width () {
    return this._width
  }

  set width (value) {
    this._width = value
  }

  /**
   * The height of this companion ad in pixels.
   *
   * @type {number}
   */
  get height () {
    return this._height
  }

  set height (value) {
    this._height = value
  }

  /**
   * The width of this companion ad's asset in pixels.
   *
   * @type {number}
   */
  get assetWidth () {
    return this._assetWidth
  }

  set assetWidth (value) {
    this._assetWidth = value
  }

  /**
   * The height of this companion ad's asset in pixels.
   *
   * @type {number}
   */
  get assetHeight () {
    return this._assetHeight
  }

  set assetHeight (value) {
    this._assetHeight = value
  }

  /**
   * The expanded width of this companion ad in pixels.
   *
   * @type {number}
   */
  get expandedWidth () {
    return this._expandedWidth
  }

  set expandedWidth (value) {
    this._expandedWidth = value
  }

  /**
   * The expanded height of this companion ad in pixels.
   *
   * @type {number}
   */
  get expandedHeight () {
    return this._expandedHeight
  }

  set expandedHeight (value) {
    this._expandedHeight = value
  }

  /**
   * The API framework used by this companion ad.
   *
   * @type {string}
   */
  get apiFramework () {
    return this._apiFramework
  }

  set apiFramework (value) {
    this._apiFramework = value
  }

  /**
   * The ad slot ID of this companion ad.
   *
   * @type {string}
   */
  get adSlotID () {
    return this._adSlotID
  }

  set adSlotID (value) {
    this._adSlotID = value
  }

  /**
   * The pixel ratio for which the companion creative is intended.
   *
   * @type {string}
   */
  get pxratio () {
    return this._pxratio
  }

  set pxratio (value) {
    this._pxratio = value
  }

  // Children.

  /**
   * The resource associated with this companion ad.
   *
   * @type {StaticResource|IFrameResource|HTMLResource}
   */
  get resource () {
    return this._resource
  }

  set resource (value) {
    this._resource = value
  }

  /**
   * The ad parameters for this companion ad.
   *
   * @type {string}
   */
  get adParameters () {
    return this._adParameters
  }

  set adParameters (value) {
    this._adParameters = value
  }

  /**
   * The alt text of this companion ad.
   *
   * @type {string}
   */
  get altText () {
    return this._altText
  }

  set altText (value) {
    this._altText = value
  }

  /**
   * The click-through configuration.
   *
   * @type {Click}
   */
  get clickThrough () {
    return this._clickThrough
  }

  set clickThrough (value) {
    this._clickThrough = value
  }

  /**
   * The click-tracking configurations.
   *
   * @type {Click[]}
   */
  get clickTrackings () {
    return this._clickTrackings
  }

  /**
   * The event-tracking configuration for this companion ad.
   *
   * @type {TrackingEvents}
   */
  get trackingEvents () {
    return this._trackingEvents
  }

  set trackingEvents (value) {
    this._trackingEvents = value
  }

  get $type () {
    return 'Companion'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/creative/linear.js":
/*!************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/creative/linear.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Linear: () => (/* binding */ Linear)
/* harmony export */ });
/**
 * Represents a linear within a {@link Creative}.
 */
class Linear {
  constructor () {
    this._skipoffset = null
    this._duration = null
    this._mezzanine = null
    this._mediaFiles = []
    this._interactiveCreativeFiles = []
    this._adParameters = null
    this._videoClicks = null
    this._trackingEvents = null
    this._icons = []
  }

  // Attribute(s).

  /**
   * The time interval after which this linear creative can be skipped.
   *
   * @type {TimeOffset}
   */
  get skipoffset () {
    return this._skipoffset
  }

  set skipoffset (value) {
    this._skipoffset = value
  }

  // Children.

  /**
   * The duration of this linear creative in seconds.
   *
   * @type {number}
   */
  get duration () {
    return this._duration
  }

  set duration (value) {
    this._duration = value
  }

  /**
   * The URI of the raw mezzanine file for this linear creative, intended for
   * video transcoding.
   *
   * @type {string}
   */
  get mezzanine () {
    return this._mezzanine
  }

  set mezzanine (value) {
    this._mezzanine = value
  }

  /**
   * The media files for this linear creative.
   *
   * @type {MediaFile[]}
   */
  get mediaFiles () {
    return this._mediaFiles
  }

  /**
   * The interactive creative files for this linear creative.
   *
   * @type {InteractiveCreativeFile[]}
   */
  get interactiveCreativeFiles () {
    return this._interactiveCreativeFiles
  }

  /**
   * The ad parameters for this linear creative.
   *
   * @type {string}
   */
  get adParameters () {
    return this._adParameters
  }

  set adParameters (value) {
    this._adParameters = value
  }

  /**
   * The video click tracking configuration for this linear creative.
   *
   * @type {VideoClicks}
   */
  get videoClicks () {
    return this._videoClicks
  }

  set videoClicks (value) {
    this._videoClicks = value
  }

  /**
   * The event-tracking configuration for this linear creative.
   *
   * @type {TrackingEvents}
   */
  get trackingEvents () {
    return this._trackingEvents
  }

  set trackingEvents (value) {
    this._trackingEvents = value
  }

  /**
   * The icons for this linear creative.
   *
   * @type {Icon[]}
   */
  get icons () {
    return this._icons
  }

  get $type () {
    return 'Linear'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/creative/non-linear-ads.js":
/*!********************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/creative/non-linear-ads.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NonLinearAds: () => (/* binding */ NonLinearAds)
/* harmony export */ });
/**
 * Represents non-linear ads within a {@link Creative}.
 */
class NonLinearAds {
  constructor () {
    this._nonLinears = []
    this._trackingEvents = null
  }

  // Children.

  /**
   * The non-linear ads.
   *
   * @type {NonLinear[]}
   */
  get nonLinears () {
    return this._nonLinears
  }

  /**
   * The event-tracking configuration.
   *
   * @type {TrackingEvents}
   */
  get trackingEvents () {
    return this._trackingEvents
  }

  set trackingEvents (value) {
    this._trackingEvents = value
  }

  get $type () {
    return 'NonLinearAds'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/creative/non-linear.js":
/*!****************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/creative/non-linear.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NonLinear: () => (/* binding */ NonLinear)
/* harmony export */ });
/**
 * Represents a single non-linear ad inside {@link NonLinearAds}.
 */
class NonLinear {
  constructor () {
    this._id = null
    this._width = null
    this._height = null
    this._expandedWidth = null
    this._expandedHeight = null
    this._scalable = false
    this._maintainAspectRatio = false
    this._minSuggestedDuration = null
    this._apiFramework = null
    this._resource = null
    this._adParameters = null
    this._clickThrough = null
    this._clickTrackings = []
  }

  // Attribute(s).

  /**
   * The ID of this non-linear ad.
   *
   * VAST 2.0 and 3.0 only.
   *
   * @type {string}
   */
  get id () {
    return this._id
  }

  set id (value) {
    this._id = value
  }

  /**
   * The width of this non-linear ad in pixels.
   *
   * VAST 2.0 and 3.0 only.
   *
   * @type {number}
   */
  get width () {
    return this._width
  }

  set width (value) {
    this._width = value
  }

  /**
   * The height of this non-linear ad in pixels.
   *
   * VAST 2.0 and 3.0 only.
   *
   * @type {number}
   */
  get height () {
    return this._height
  }

  set height (value) {
    this._height = value
  }

  /**
   * The expanded width of this non-linear ad in pixels.
   *
   * VAST 2.0 and 3.0 only.
   *
   * @type {number}
   */
  get expandedWidth () {
    return this._expandedWidth
  }

  set expandedWidth (value) {
    this._expandedWidth = value
  }

  /**
   * The expanded height of this non-linear ad in pixels.
   *
   * VAST 2.0 and 3.0 only.
   *
   * @type {number}
   */
  get expandedHeight () {
    return this._expandedHeight
  }

  set expandedHeight (value) {
    this._expandedHeight = value
  }

  /**
   * Whether this non-linear ad is meant to scale to larger dimensions.
   *
   * VAST 2.0 and 3.0 only.
   *
   * @type {boolean}
   */
  get scalable () {
    return this._scalable
  }

  set scalable (value) {
    this._scalable = value
  }

  /**
   * Whether this non-linear ad's aspect ratio should be maintained when scaled.
   *
   * VAST 2.0 and 3.0 only.
   *
   * @type {boolean}
   */
  get maintainAspectRatio () {
    return this._maintainAspectRatio
  }

  set maintainAspectRatio (value) {
    this._maintainAspectRatio = value
  }

  /**
   * The minimum suggested duration of this non-linear ad in seconds.
   *
   * VAST 2.0 and 3.0 only.
   *
   * @type {number}
   */
  get minSuggestedDuration () {
    return this._minSuggestedDuration
  }

  set minSuggestedDuration (value) {
    this._minSuggestedDuration = value
  }

  /**
   * The API framework used by this non-linear ad.
   *
   * VAST 2.0 and 3.0 only.
   *
   * @type {string}
   */
  get apiFramework () {
    return this._apiFramework
  }

  set apiFramework (value) {
    this._apiFramework = value
  }

  // Children.

  /**
   * The resource associated with this non-linear ad.
   *
   * @type {Resource}
   */
  get resource () {
    return this._resource
  }

  set resource (value) {
    this._resource = value
  }

  /**
   * The ad parameters for this non-linear ad.
   *
   * @type {string}
   */
  get adParameters () {
    return this._adParameters
  }

  set adParameters (value) {
    this._adParameters = value
  }

  /**
   * The click-through configuration for this non-linear ad.
   *
   * @type {Click}
   */
  get clickThrough () {
    return this._clickThrough
  }

  set clickThrough (value) {
    this._clickThrough = value
  }

  /**
   * The click-tracking configurations for this non-linear ad.
   *
   * @type {Click[]}
   */
  get clickTrackings () {
    return this._clickTrackings
  }

  get $type () {
    return 'NonLinear'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/extension/abstract.js":
/*!***************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/extension/abstract.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractExtension: () => (/* binding */ AbstractExtension)
/* harmony export */ });
/**
 * Base class for VAST {@link Extension} as well as {@link CreativeExtension}.
 *
 * @abstract
 * @protected
 */
class AbstractExtension {
  constructor () {
    this._type = null
    this._xmlElement = null
  }

  // Attribute(s).

  /**
   * The MIME type of any code that might be included in the extension.
   *
   * @type {string}
   */
  get type () {
    return this._type
  }

  set type (value) {
    this._type = value
  }

  // Content.

  /**
   * The `<Extension>` XML DOM element.
   *
   * @type {Element}
   */
  get xmlElement () {
    return this._xmlElement
  }

  set xmlElement (value) {
    this._xmlElement = value
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/extension/creative.js":
/*!***************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/extension/creative.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreativeExtension: () => (/* binding */ CreativeExtension)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./node_modules/iab-vast-model/src/extension/abstract.js");


/**
 * Represents a creative extension.
 */
class CreativeExtension extends _abstract__WEBPACK_IMPORTED_MODULE_0__.AbstractExtension {
  get $type () {
    return 'CreativeExtension'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/extension/default.js":
/*!**************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/extension/default.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Extension: () => (/* binding */ Extension)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./node_modules/iab-vast-model/src/extension/abstract.js");


/**
 * Represents a VAST extension.
 */
class Extension extends _abstract__WEBPACK_IMPORTED_MODULE_0__.AbstractExtension {
  get $type () {
    return 'Extension'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/index.js":
/*!**************************************************!*\
  !*** ./node_modules/iab-vast-model/src/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbsoluteTimeOffset: () => (/* reexport safe */ _time_offset_absolute__WEBPACK_IMPORTED_MODULE_32__.AbsoluteTimeOffset),
/* harmony export */   AdBuffet: () => (/* reexport safe */ _util_ad_buffet__WEBPACK_IMPORTED_MODULE_34__.AdBuffet),
/* harmony export */   AdPod: () => (/* reexport safe */ _util_ad_pod__WEBPACK_IMPORTED_MODULE_35__.AdPod),
/* harmony export */   AdSystem: () => (/* reexport safe */ _core_ad_system__WEBPACK_IMPORTED_MODULE_4__.AdSystem),
/* harmony export */   Category: () => (/* reexport safe */ _core_category__WEBPACK_IMPORTED_MODULE_5__.Category),
/* harmony export */   Click: () => (/* reexport safe */ _core_click__WEBPACK_IMPORTED_MODULE_6__.Click),
/* harmony export */   Companion: () => (/* reexport safe */ _creative_companion__WEBPACK_IMPORTED_MODULE_21__.Companion),
/* harmony export */   CompanionAds: () => (/* reexport safe */ _creative_companion_ads__WEBPACK_IMPORTED_MODULE_20__.CompanionAds),
/* harmony export */   Creative: () => (/* reexport safe */ _core_creative__WEBPACK_IMPORTED_MODULE_7__.Creative),
/* harmony export */   CreativeExtension: () => (/* reexport safe */ _extension_creative__WEBPACK_IMPORTED_MODULE_25__.CreativeExtension),
/* harmony export */   Extension: () => (/* reexport safe */ _extension_default__WEBPACK_IMPORTED_MODULE_26__.Extension),
/* harmony export */   FlashResource: () => (/* reexport safe */ _resource_verification_flash__WEBPACK_IMPORTED_MODULE_30__.FlashResource),
/* harmony export */   HTMLResource: () => (/* reexport safe */ _resource_creative_html__WEBPACK_IMPORTED_MODULE_27__.HTMLResource),
/* harmony export */   IFrameResource: () => (/* reexport safe */ _resource_creative_iframe__WEBPACK_IMPORTED_MODULE_28__.IFrameResource),
/* harmony export */   Icon: () => (/* reexport safe */ _core_icon__WEBPACK_IMPORTED_MODULE_8__.Icon),
/* harmony export */   IconClicks: () => (/* reexport safe */ _clicks_icon__WEBPACK_IMPORTED_MODULE_2__.IconClicks),
/* harmony export */   Impression: () => (/* reexport safe */ _core_impression__WEBPACK_IMPORTED_MODULE_9__.Impression),
/* harmony export */   InLine: () => (/* reexport safe */ _ad_in_line__WEBPACK_IMPORTED_MODULE_0__.InLine),
/* harmony export */   InteractiveCreativeFile: () => (/* reexport safe */ _core_interactive_creative_file__WEBPACK_IMPORTED_MODULE_10__.InteractiveCreativeFile),
/* harmony export */   JavaScriptResource: () => (/* reexport safe */ _resource_verification_javascript__WEBPACK_IMPORTED_MODULE_31__.JavaScriptResource),
/* harmony export */   Linear: () => (/* reexport safe */ _creative_linear__WEBPACK_IMPORTED_MODULE_22__.Linear),
/* harmony export */   MediaFile: () => (/* reexport safe */ _core_media_file__WEBPACK_IMPORTED_MODULE_11__.MediaFile),
/* harmony export */   NonLinear: () => (/* reexport safe */ _creative_non_linear__WEBPACK_IMPORTED_MODULE_24__.NonLinear),
/* harmony export */   NonLinearAds: () => (/* reexport safe */ _creative_non_linear_ads__WEBPACK_IMPORTED_MODULE_23__.NonLinearAds),
/* harmony export */   Pricing: () => (/* reexport safe */ _core_pricing__WEBPACK_IMPORTED_MODULE_12__.Pricing),
/* harmony export */   RelativeTimeOffset: () => (/* reexport safe */ _time_offset_relative__WEBPACK_IMPORTED_MODULE_33__.RelativeTimeOffset),
/* harmony export */   SortedList: () => (/* reexport safe */ _util_sorted_list__WEBPACK_IMPORTED_MODULE_37__.SortedList),
/* harmony export */   SortedListItem: () => (/* reexport safe */ _util_sorted_list_item__WEBPACK_IMPORTED_MODULE_36__.SortedListItem),
/* harmony export */   StaticResource: () => (/* reexport safe */ _resource_creative_static__WEBPACK_IMPORTED_MODULE_29__.StaticResource),
/* harmony export */   Survey: () => (/* reexport safe */ _core_survey__WEBPACK_IMPORTED_MODULE_13__.Survey),
/* harmony export */   TrackingEvent: () => (/* reexport safe */ _core_tracking_event__WEBPACK_IMPORTED_MODULE_14__.TrackingEvent),
/* harmony export */   TrackingEvents: () => (/* reexport safe */ _core_tracking_events__WEBPACK_IMPORTED_MODULE_15__.TrackingEvents),
/* harmony export */   UniversalAdId: () => (/* reexport safe */ _core_universal_ad_id__WEBPACK_IMPORTED_MODULE_16__.UniversalAdId),
/* harmony export */   VAST: () => (/* reexport safe */ _core_vast__WEBPACK_IMPORTED_MODULE_17__.VAST),
/* harmony export */   Verification: () => (/* reexport safe */ _core_verification__WEBPACK_IMPORTED_MODULE_18__.Verification),
/* harmony export */   VideoClicks: () => (/* reexport safe */ _clicks_video__WEBPACK_IMPORTED_MODULE_3__.VideoClicks),
/* harmony export */   ViewableImpression: () => (/* reexport safe */ _core_viewable_impression__WEBPACK_IMPORTED_MODULE_19__.ViewableImpression),
/* harmony export */   Wrapper: () => (/* reexport safe */ _ad_wrapper__WEBPACK_IMPORTED_MODULE_1__.Wrapper)
/* harmony export */ });
/* harmony import */ var _ad_in_line__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ad/in-line */ "./node_modules/iab-vast-model/src/ad/in-line.js");
/* harmony import */ var _ad_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ad/wrapper */ "./node_modules/iab-vast-model/src/ad/wrapper.js");
/* harmony import */ var _clicks_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clicks/icon */ "./node_modules/iab-vast-model/src/clicks/icon.js");
/* harmony import */ var _clicks_video__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clicks/video */ "./node_modules/iab-vast-model/src/clicks/video.js");
/* harmony import */ var _core_ad_system__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/ad-system */ "./node_modules/iab-vast-model/src/core/ad-system.js");
/* harmony import */ var _core_category__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/category */ "./node_modules/iab-vast-model/src/core/category.js");
/* harmony import */ var _core_click__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/click */ "./node_modules/iab-vast-model/src/core/click.js");
/* harmony import */ var _core_creative__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/creative */ "./node_modules/iab-vast-model/src/core/creative.js");
/* harmony import */ var _core_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/icon */ "./node_modules/iab-vast-model/src/core/icon.js");
/* harmony import */ var _core_impression__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core/impression */ "./node_modules/iab-vast-model/src/core/impression.js");
/* harmony import */ var _core_interactive_creative_file__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/interactive-creative-file */ "./node_modules/iab-vast-model/src/core/interactive-creative-file.js");
/* harmony import */ var _core_media_file__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core/media-file */ "./node_modules/iab-vast-model/src/core/media-file.js");
/* harmony import */ var _core_pricing__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./core/pricing */ "./node_modules/iab-vast-model/src/core/pricing.js");
/* harmony import */ var _core_survey__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./core/survey */ "./node_modules/iab-vast-model/src/core/survey.js");
/* harmony import */ var _core_tracking_event__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./core/tracking-event */ "./node_modules/iab-vast-model/src/core/tracking-event.js");
/* harmony import */ var _core_tracking_events__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./core/tracking-events */ "./node_modules/iab-vast-model/src/core/tracking-events.js");
/* harmony import */ var _core_universal_ad_id__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./core/universal-ad-id */ "./node_modules/iab-vast-model/src/core/universal-ad-id.js");
/* harmony import */ var _core_vast__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./core/vast */ "./node_modules/iab-vast-model/src/core/vast.js");
/* harmony import */ var _core_verification__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./core/verification */ "./node_modules/iab-vast-model/src/core/verification.js");
/* harmony import */ var _core_viewable_impression__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./core/viewable-impression */ "./node_modules/iab-vast-model/src/core/viewable-impression.js");
/* harmony import */ var _creative_companion_ads__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./creative/companion-ads */ "./node_modules/iab-vast-model/src/creative/companion-ads.js");
/* harmony import */ var _creative_companion__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./creative/companion */ "./node_modules/iab-vast-model/src/creative/companion.js");
/* harmony import */ var _creative_linear__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./creative/linear */ "./node_modules/iab-vast-model/src/creative/linear.js");
/* harmony import */ var _creative_non_linear_ads__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./creative/non-linear-ads */ "./node_modules/iab-vast-model/src/creative/non-linear-ads.js");
/* harmony import */ var _creative_non_linear__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./creative/non-linear */ "./node_modules/iab-vast-model/src/creative/non-linear.js");
/* harmony import */ var _extension_creative__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./extension/creative */ "./node_modules/iab-vast-model/src/extension/creative.js");
/* harmony import */ var _extension_default__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./extension/default */ "./node_modules/iab-vast-model/src/extension/default.js");
/* harmony import */ var _resource_creative_html__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./resource/creative/html */ "./node_modules/iab-vast-model/src/resource/creative/html.js");
/* harmony import */ var _resource_creative_iframe__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./resource/creative/iframe */ "./node_modules/iab-vast-model/src/resource/creative/iframe.js");
/* harmony import */ var _resource_creative_static__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./resource/creative/static */ "./node_modules/iab-vast-model/src/resource/creative/static.js");
/* harmony import */ var _resource_verification_flash__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./resource/verification/flash */ "./node_modules/iab-vast-model/src/resource/verification/flash.js");
/* harmony import */ var _resource_verification_javascript__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./resource/verification/javascript */ "./node_modules/iab-vast-model/src/resource/verification/javascript.js");
/* harmony import */ var _time_offset_absolute__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./time-offset/absolute */ "./node_modules/iab-vast-model/src/time-offset/absolute.js");
/* harmony import */ var _time_offset_relative__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./time-offset/relative */ "./node_modules/iab-vast-model/src/time-offset/relative.js");
/* harmony import */ var _util_ad_buffet__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./util/ad-buffet */ "./node_modules/iab-vast-model/src/util/ad-buffet.js");
/* harmony import */ var _util_ad_pod__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./util/ad-pod */ "./node_modules/iab-vast-model/src/util/ad-pod.js");
/* harmony import */ var _util_sorted_list_item__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./util/sorted-list-item */ "./node_modules/iab-vast-model/src/util/sorted-list-item.js");
/* harmony import */ var _util_sorted_list__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./util/sorted-list */ "./node_modules/iab-vast-model/src/util/sorted-list.js");















































/***/ }),

/***/ "./node_modules/iab-vast-model/src/resource/abstract.js":
/*!**************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/resource/abstract.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractResource: () => (/* binding */ AbstractResource)
/* harmony export */ });
/**
 * Base class for a verification resource used by a {@link HTMLResource}, a
 * {@link IFrameResource} and a {@link StaticResource}.
 *
 * @abstract
 * @protected
 */
class AbstractResource {
  constructor () {
    this._uri = null
  }

  // Content.

  /**
   * The URI to this resource.
   *
   * @type {string}
   */
  get uri () {
    return this._uri
  }

  set uri (value) {
    this._uri = value
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/resource/creative/html.js":
/*!*******************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/resource/creative/html.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTMLResource: () => (/* binding */ HTMLResource)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../abstract */ "./node_modules/iab-vast-model/src/resource/abstract.js");


/**
 * Describes an HTML snippet.
 */
class HTMLResource extends _abstract__WEBPACK_IMPORTED_MODULE_0__.AbstractResource {
  get $type () {
    return 'HTMLResource'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/resource/creative/iframe.js":
/*!*********************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/resource/creative/iframe.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IFrameResource: () => (/* binding */ IFrameResource)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../abstract */ "./node_modules/iab-vast-model/src/resource/abstract.js");


/**
 * Describes an HTML page for display within an iframe.
 */
class IFrameResource extends _abstract__WEBPACK_IMPORTED_MODULE_0__.AbstractResource {
  get $type () {
    return 'IFrameResource'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/resource/creative/static.js":
/*!*********************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/resource/creative/static.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StaticResource: () => (/* binding */ StaticResource)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../abstract */ "./node_modules/iab-vast-model/src/resource/abstract.js");


/**
 * Describes non-HTML creative.
 */
class StaticResource extends _abstract__WEBPACK_IMPORTED_MODULE_0__.AbstractResource {
  constructor () {
    super()
    this._creativeType = null
  }

  // Attribute(s).

  /**
   * The MIME type of this resource.
   *
   * @type {string}
   */
  get creativeType () {
    return this._creativeType
  }

  set creativeType (value) {
    this._creativeType = value
  }

  get $type () {
    return 'StaticResource'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/resource/verification/abstract.js":
/*!***************************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/resource/verification/abstract.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractVerificationResource: () => (/* binding */ AbstractVerificationResource)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../abstract */ "./node_modules/iab-vast-model/src/resource/abstract.js");


/**
 * Base class for a verification resource used by a {@link FlashResource} and a
 * {@link JavaScriptResource}.
 *
 * @abstract
 * @protected
 */
class AbstractVerificationResource extends _abstract__WEBPACK_IMPORTED_MODULE_0__.AbstractResource {
  constructor () {
    super()
    this._apiFramework = null
  }

  // Attribute(s).

  /**
   * The name of the API framework.
   *
   * @type {string}
   */
  get apiFramework () {
    return this._apiFramework
  }

  set apiFramework (value) {
    this._apiFramework = value
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/resource/verification/flash.js":
/*!************************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/resource/verification/flash.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlashResource: () => (/* binding */ FlashResource)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./node_modules/iab-vast-model/src/resource/verification/abstract.js");


/**
 * Describes a Flash resource used to collect verification data.
 */
class FlashResource extends _abstract__WEBPACK_IMPORTED_MODULE_0__.AbstractVerificationResource {
  get $type () {
    return 'FlashResource'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/resource/verification/javascript.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/resource/verification/javascript.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JavaScriptResource: () => (/* binding */ JavaScriptResource)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./node_modules/iab-vast-model/src/resource/verification/abstract.js");


/**
 * Describes a JavaScript resource used to collect verification data.
 */
class JavaScriptResource extends _abstract__WEBPACK_IMPORTED_MODULE_0__.AbstractVerificationResource {
  get $type () {
    return 'JavaScriptResource'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/time-offset/absolute.js":
/*!*****************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/time-offset/absolute.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbsoluteTimeOffset: () => (/* binding */ AbsoluteTimeOffset)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./node_modules/iab-vast-model/src/time-offset/abstract.js");


/**
 * Represents a time offset expressed as an absolute duration in seconds.
 */
class AbsoluteTimeOffset extends _abstract__WEBPACK_IMPORTED_MODULE_0__.AbstractTimeOffset {
  get $type () {
    return 'AbsoluteTimeOffset'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/time-offset/abstract.js":
/*!*****************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/time-offset/abstract.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractTimeOffset: () => (/* binding */ AbstractTimeOffset)
/* harmony export */ });
/**
 * Represents a time offset.
 *
 * @abstract
 * @protected
 */
class AbstractTimeOffset {
  constructor () {
    this._value = null
  }

  /**
   * The value for this offset.
   *
   * @type {number}
   */
  get value () {
    return this._value
  }

  set value (value) {
    this._value = value
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/time-offset/relative.js":
/*!*****************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/time-offset/relative.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RelativeTimeOffset: () => (/* binding */ RelativeTimeOffset)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./node_modules/iab-vast-model/src/time-offset/abstract.js");


/**
 * Represents a time offset expressed as a percentage (between 0 and 100).
 */
class RelativeTimeOffset extends _abstract__WEBPACK_IMPORTED_MODULE_0__.AbstractTimeOffset {
  get $type () {
    return 'RelativeTimeOffset'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/util/ad-buffet.js":
/*!***********************************************************!*\
  !*** ./node_modules/iab-vast-model/src/util/ad-buffet.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdBuffet: () => (/* binding */ AdBuffet)
/* harmony export */ });
/* harmony import */ var _sorted_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sorted-list */ "./node_modules/iab-vast-model/src/util/sorted-list.js");


/**
 * Represents a VAST ad buffet.
 */
class AdBuffet {
  constructor () {
    this._ads = new _sorted_list__WEBPACK_IMPORTED_MODULE_0__.SortedList()
    this._adPod = null
  }

  /**
   * The ads in this ad buffet.
   *
   * @type {SortedList}
   */
  get ads () {
    return this._ads
  }

  /**
   * The ad pod for this ad buffet.
   *
   * @type {AdPod}
   */
  get adPod () {
    return this._adPod
  }

  set adPod (value) {
    this._adPod = value
  }

  get $type () {
    return 'AdBuffet'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/util/ad-pod.js":
/*!********************************************************!*\
  !*** ./node_modules/iab-vast-model/src/util/ad-pod.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdPod: () => (/* binding */ AdPod)
/* harmony export */ });
/* harmony import */ var _sorted_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sorted-list */ "./node_modules/iab-vast-model/src/util/sorted-list.js");


/**
 * Represents a VAST ad pod.
 */
class AdPod {
  constructor () {
    this._ads = new _sorted_list__WEBPACK_IMPORTED_MODULE_0__.SortedList()
  }

  /**
   * The ads in this ad pod.
   *
   * @type {SortedList}
   */
  get ads () {
    return this._ads
  }

  get $type () {
    return 'AdPod'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/util/sorted-list-item.js":
/*!******************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/util/sorted-list-item.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SortedListItem: () => (/* binding */ SortedListItem)
/* harmony export */ });
/**
 * Represents an item in a {@link SortedList}. Base class for {@link Ad} and
 * {@link Creative}.
 *
 * @abstract
 */
class SortedListItem {
  constructor () {
    this._sequence = null
  }

  /**
   * The sequence number of this item within its parent.
   *
   * @type {number}
   */
  get sequence () {
    return this._sequence
  }

  set sequence (value) {
    this._sequence = value
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-model/src/util/sorted-list.js":
/*!*************************************************************!*\
  !*** ./node_modules/iab-vast-model/src/util/sorted-list.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SortedList: () => (/* binding */ SortedList)
/* harmony export */ });
/**
 * Represents a list of {@link SortedListItem}s, ordered by
 * {@link SortedListItem#sequence}.
 */
class SortedList {
  constructor () {
    this._contents = []
  }

  /**
   * The length of this list.
   *
   * @type {number}
   */
  get length () {
    return this._contents.length
  }

  /**
   * Adds the given item to this list.
   *
   * @param {SortedListItem} item - the item.
   */
  add (item) {
    this._contents.push(item)
    this._contents.sort((a, b) => (a.sequence || 0) - (b.sequence || 0))
  }

  /**
   * Removes the given item from this list.
   *
   * @param {SortedListItem} item - the item.
   */
  remove (item) {
    let index = this._contents.indexOf(item)
    while (index >= 0) {
      this._contents.splice(index, 1)
      index = this._contents.indexOf(item, index)
    }
  }

  /**
   * Gets the item at the given index.
   *
   * @param {number} index - the index.
   * @return {SortedListItem} the item.
   */
  get (index) {
    return this._contents[index]
  }

  /**
   * Empties this list.
   */
  clear () {
    this._contents.length = 0
  }

  [Symbol.iterator] () {
    const that = this
    let i = 0
    return {
      next () {
        return (i < that.length) ? { value: that.get(i++), done: false }
          : { value: undefined, done: true }
      }
    }
  }

  /**
   * Creates an array representation of this list.
   *
   * @return {SortedListItem[]} the item array.
   */
  toArray () {
    return this._contents.slice()
  }

  get $type () {
    return 'SortedList'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/errors/error-codes.js":
/*!****************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/errors/error-codes.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  XML_PARSING_ERROR: 100,
  VAST_SCHEMA_VALIDATION_ERROR: 101
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/errors/error-handler.js":
/*!******************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/errors/error-handler.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ErrorHandler)
/* harmony export */ });
/* harmony import */ var _error_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error-codes */ "./node_modules/iab-vast-parser/src/errors/error-codes.js");
/* harmony import */ var _vast_parser_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vast-parser-error */ "./node_modules/iab-vast-parser/src/errors/vast-parser-error.js");


class ErrorHandler {
  constructor (strict) {
    this._strictMode = strict
  }

  failWithErrorCode (error, errorCode) {
    if (error instanceof _vast_parser_error__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      throw error
    }
    throw new _vast_parser_error__WEBPACK_IMPORTED_MODULE_1__["default"](error instanceof Error ? error.message : error, errorCode)
  }

  fail (error) {
    this.failWithErrorCode(error, _error_codes__WEBPACK_IMPORTED_MODULE_0__["default"].VAST_SCHEMA_VALIDATION_ERROR)
  }

  tryRecover (error) {
    if (this._strictMode) {
      this.fail(error)
    }
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/errors/vast-parser-error.js":
/*!**********************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/errors/vast-parser-error.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VASTParserError)
/* harmony export */ });
/* harmony import */ var es6_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! es6-error */ "./node_modules/es6-error/es6/index.js");


class VASTParserError extends es6_error__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor (message, code) {
    super(message)
    this.code = code
    this.name = 'VASTParserError'
  }
}


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/ad-system.js":
/*!***************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/ad-system.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($adSystem) => {
  const adSystem = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.AdSystem()
  adSystem.version = $adSystem.version
  adSystem.name = $adSystem._value
  return adSystem
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/ad.js":
/*!********************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/ad.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _in_line__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./in-line */ "./node_modules/iab-vast-parser/src/factory/in-line.js");
/* harmony import */ var _wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wrapper */ "./node_modules/iab-vast-parser/src/factory/wrapper.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($ad, options) => {
  if ($ad.inLine != null) {
    return (0,_in_line__WEBPACK_IMPORTED_MODULE_0__["default"])($ad, options)
  } else if ($ad.wrapper != null) {
    return (0,_wrapper__WEBPACK_IMPORTED_MODULE_1__["default"])($ad, options)
  } else {
    throw new Error('Unrecognized ad type')
  }
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/category.js":
/*!**************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/category.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($category) => {
  const category = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.Category()
  category.authority = $category.authority
  category.code = $category._value
  return category
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/click.js":
/*!***********************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/click.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($click) => {
  const click = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.Click()
  click.id = $click.id
  click.uri = $click._value
  return click
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/companion-ads.js":
/*!*******************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/companion-ads.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _companion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./companion */ "./node_modules/iab-vast-parser/src/factory/companion.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($creative) => {
  const $companionAds = $creative.companionAds
  const companionAds = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.CompanionAds()
  companionAds.required = $companionAds.required
  if ($companionAds.companion != null) {
    companionAds.companions.push(...$companionAds.companion.map(_companion__WEBPACK_IMPORTED_MODULE_1__["default"]))
  }
  companionAds.xmlElement = $companionAds._value
  return companionAds
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/companion.js":
/*!***************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/companion.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _click__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./click */ "./node_modules/iab-vast-parser/src/factory/click.js");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resource */ "./node_modules/iab-vast-parser/src/factory/resource.js");
/* harmony import */ var _util_map_tracking_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/map-tracking-events */ "./node_modules/iab-vast-parser/src/util/map-tracking-events.js");
/* harmony import */ var _util_is_non_empty_array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/is-non-empty-array */ "./node_modules/iab-vast-parser/src/util/is-non-empty-array.js");
/* harmony import */ var _util_has_value__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/has-value */ "./node_modules/iab-vast-parser/src/util/has-value.js");







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($companion) => {
  const companion = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.Companion()
  companion.id = $companion.id
  companion.width = $companion.width
  companion.height = $companion.height
  companion.assetWidth = $companion.assetWidth
  companion.assetHeight = $companion.assetHeight
  companion.expandedWidth = $companion.expandedWidth
  companion.expandedHeight = $companion.expandedHeight
  companion.apiFramework = $companion.apiFramework
  companion.adSlotID = $companion.adSlotID
  companion.pxratio = $companion.pxratio
  companion.resource = (0,_resource__WEBPACK_IMPORTED_MODULE_2__["default"])($companion)
  if ($companion.adParameters != null && (0,_util_has_value__WEBPACK_IMPORTED_MODULE_5__["default"])($companion.adParameters)) {
    companion.adParameters = $companion.adParameters._value
  }
  if ($companion.altText != null && (0,_util_has_value__WEBPACK_IMPORTED_MODULE_5__["default"])($companion.altText._value)) {
    companion.altText = $companion.altText._value
  }
  if ($companion.companionClickThrough != null && (0,_util_has_value__WEBPACK_IMPORTED_MODULE_5__["default"])($companion.companionClickThrough)) {
    companion.clickThrough = (0,_click__WEBPACK_IMPORTED_MODULE_1__["default"])($companion.companionClickThrough)
  }
  if ($companion.companionClickTracking != null) {
    companion.clickTrackings.push(
      ...$companion.companionClickTracking
        .filter(_util_has_value__WEBPACK_IMPORTED_MODULE_5__["default"])
        .map(_click__WEBPACK_IMPORTED_MODULE_1__["default"]))
  }
  if ($companion.trackingEvents != null && (0,_util_is_non_empty_array__WEBPACK_IMPORTED_MODULE_4__["default"])($companion.trackingEvents.tracking)) {
    companion.trackingEvents = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.TrackingEvents()
    ;(0,_util_map_tracking_events__WEBPACK_IMPORTED_MODULE_3__["default"])($companion.trackingEvents, companion.trackingEvents)
  }
  return companion
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/creative-extension.js":
/*!************************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/creative-extension.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($creativeExtension) => {
  const creativeExtension = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.CreativeExtension()
  creativeExtension.type = $creativeExtension.type
  creativeExtension.xmlElement = $creativeExtension._value
  return creativeExtension
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/creative.js":
/*!**************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/creative.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _factory_universal_ad_id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factory/universal-ad-id */ "./node_modules/iab-vast-parser/src/factory/universal-ad-id.js");
/* harmony import */ var _factory_creative_extension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../factory/creative-extension */ "./node_modules/iab-vast-parser/src/factory/creative-extension.js");
/* harmony import */ var _linear__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./linear */ "./node_modules/iab-vast-parser/src/factory/linear.js");
/* harmony import */ var _non_linear_ads__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./non-linear-ads */ "./node_modules/iab-vast-parser/src/factory/non-linear-ads.js");
/* harmony import */ var _companion_ads__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./companion-ads */ "./node_modules/iab-vast-parser/src/factory/companion-ads.js");







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($creative, options) => {
  const creative = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.Creative()
  creative.id = $creative.id
  creative.sequence = $creative.sequence
  // VAST3 XSD specifies AdID and that seems to be what parsers have agreed on
  creative.adID = $creative.AdID || $creative.adID || $creative.adId
  creative.apiFramework = $creative.apiFramework
  if ($creative.universalAdId != null) {
    creative.universalAdId = (0,_factory_universal_ad_id__WEBPACK_IMPORTED_MODULE_1__["default"])($creative.universalAdId)
  }
  if ($creative.creativeExtensions != null && $creative.creativeExtensions.creativeExtension) {
    creative.extensions
      .push(...$creative.creativeExtensions.creativeExtension.map(_factory_creative_extension__WEBPACK_IMPORTED_MODULE_2__["default"]))
  }
  if ($creative.linear != null) {
    creative.linear = (0,_linear__WEBPACK_IMPORTED_MODULE_3__["default"])($creative, options)
  } else if ($creative.nonLinearAds != null) {
    creative.nonLinearAds = (0,_non_linear_ads__WEBPACK_IMPORTED_MODULE_4__["default"])($creative)
  }
  if ($creative.companionAds != null) {
    creative.companionAds = (0,_companion_ads__WEBPACK_IMPORTED_MODULE_5__["default"])($creative)
  }
  if (creative.linear == null && creative.nonLinearAds == null &&
      creative.companionAds == null) {
    options.errorHandler.tryRecover('Creative has no ads')
  }
  return creative
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/extension.js":
/*!***************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/extension.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($extension) => {
  const extension = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.Extension()
  extension.type = $extension.type
  extension.xmlElement = $extension._value
  return extension
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/flash-resource.js":
/*!********************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/flash-resource.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($flashResource) => {
  const res = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.FlashResource()
  res.apiFramework = $flashResource.apiFramework
  res.uri = $flashResource._value
  return res
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/html-resource.js":
/*!*******************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/html-resource.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($htmlResource) => {
  const res = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.HTMLResource()
  res.uri = $htmlResource._value
  return res
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/icon-clicks.js":
/*!*****************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/icon-clicks.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _click__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./click */ "./node_modules/iab-vast-parser/src/factory/click.js");
/* harmony import */ var _util_has_value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/has-value */ "./node_modules/iab-vast-parser/src/util/has-value.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($iconClicks) => {
  const iconClicks = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.IconClicks()
  if ($iconClicks.iconClickThrough != null && (0,_util_has_value__WEBPACK_IMPORTED_MODULE_2__["default"])($iconClicks.iconClickThrough)) {
    iconClicks.clickThrough = (0,_click__WEBPACK_IMPORTED_MODULE_1__["default"])($iconClicks.iconClickThrough)
  }
  if ($iconClicks.iconClickTracking != null) {
    iconClicks.clickTrackings.push(
      ...$iconClicks.iconClickTracking
        .filter(_util_has_value__WEBPACK_IMPORTED_MODULE_2__["default"])
        .map(_click__WEBPACK_IMPORTED_MODULE_1__["default"]))
  }
  return iconClicks
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/icon.js":
/*!**********************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/icon.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resource */ "./node_modules/iab-vast-parser/src/factory/resource.js");
/* harmony import */ var _click__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./click */ "./node_modules/iab-vast-parser/src/factory/click.js");
/* harmony import */ var _icon_clicks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icon-clicks */ "./node_modules/iab-vast-parser/src/factory/icon-clicks.js");
/* harmony import */ var _util_has_value__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/has-value */ "./node_modules/iab-vast-parser/src/util/has-value.js");
/* harmony import */ var _util_is_non_empty_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/is-non-empty-array */ "./node_modules/iab-vast-parser/src/util/is-non-empty-array.js");







const parsePosition = (str, allowed) => (str == null) ? str
  : (allowed.indexOf(str) < 0) ? parseInt(str, 0)
    : str

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($icon) => {
  const icon = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.Icon()
  icon.program = $icon.program
  icon.width = $icon.width
  icon.height = $icon.height
  icon.xPosition = parsePosition($icon.xPosition, ['left', 'right'])
  icon.yPosition = parsePosition($icon.yPosition, ['top', 'bottom'])
  icon.duration = $icon.duration
  icon.offset = $icon.offset
  icon.apiFramework = $icon.apiFramework
  icon.pxratio = $icon.pxratio
  icon.resources = (0,_resource__WEBPACK_IMPORTED_MODULE_1__["default"])($icon)
  if ($icon.iconClicks != null &&
      ((0,_util_has_value__WEBPACK_IMPORTED_MODULE_4__["default"])($icon.iconClicks.iconClickThrough) ||
        (0,_util_is_non_empty_array__WEBPACK_IMPORTED_MODULE_5__["default"])($icon.iconClicks.iconClickTracking))) {
    icon.clicks = (0,_icon_clicks__WEBPACK_IMPORTED_MODULE_3__["default"])($icon.iconClicks)
  }
  if ($icon.iconViewTracking != null) {
    icon.viewTrackings.push(
      ...$icon.iconViewTracking
        .filter(_util_has_value__WEBPACK_IMPORTED_MODULE_4__["default"])
        .map(_click__WEBPACK_IMPORTED_MODULE_2__["default"]))
  }
  return icon
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/iframe-resource.js":
/*!*********************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/iframe-resource.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($iFrameResource) => {
  const res = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.IFrameResource()
  res.uri = $iFrameResource._value
  return res
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/impression.js":
/*!****************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/impression.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($impression) => {
  const impression = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.Impression()
  impression.id = $impression.id
  impression.uri = $impression._value
  return impression
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/in-line.js":
/*!*************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/in-line.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _inherit_ad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../inherit/ad */ "./node_modules/iab-vast-parser/src/inherit/ad.js");
/* harmony import */ var _category__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./category */ "./node_modules/iab-vast-parser/src/factory/category.js");
/* harmony import */ var _survey__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./survey */ "./node_modules/iab-vast-parser/src/factory/survey.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($ad, options) => {
  const inLine = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.InLine()
  const $inLine = $ad.inLine
  ;(0,_inherit_ad__WEBPACK_IMPORTED_MODULE_1__["default"])($ad, $inLine, inLine, options)
  inLine.adTitle = ($inLine.adTitle != null) ? $inLine.adTitle._value : null
  if ($inLine.category != null) {
    inLine.categories.push(...$inLine.category
      .filter(c => c.authority != null) // Ignores declarations such as <Category/>.
      .map(_category__WEBPACK_IMPORTED_MODULE_2__["default"]))
  }
  inLine.description = ($inLine.description != null) ? $inLine.description._value : null
  inLine.advertiser = ($inLine.advertiser != null) ? $inLine.advertiser._value : null
  if ($inLine.survey != null) {
    inLine.surveys.push(...$inLine.survey
      .filter(s => s._value.length > 0)
      .map(_survey__WEBPACK_IMPORTED_MODULE_3__["default"]))
  }
  return inLine
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/interactive-creative-file.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/interactive-creative-file.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($interactiveCreativeFile) => {
  const interactiveCreativeFile = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.InteractiveCreativeFile()
  interactiveCreativeFile.type = $interactiveCreativeFile.type
  interactiveCreativeFile.apiFramework = $interactiveCreativeFile.apiFramework
  interactiveCreativeFile.uri = $interactiveCreativeFile._value
  return interactiveCreativeFile
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/javascript-resource.js":
/*!*************************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/javascript-resource.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($javascriptResource) => {
  const res = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.JavaScriptResource()
  res.apiFramework = $javascriptResource.apiFramework
  res.uri = $javascriptResource._value
  return res
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/linear.js":
/*!************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/linear.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _media_file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./media-file */ "./node_modules/iab-vast-parser/src/factory/media-file.js");
/* harmony import */ var _interactive_creative_file__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interactive-creative-file */ "./node_modules/iab-vast-parser/src/factory/interactive-creative-file.js");
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icon */ "./node_modules/iab-vast-parser/src/factory/icon.js");
/* harmony import */ var _click__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./click */ "./node_modules/iab-vast-parser/src/factory/click.js");
/* harmony import */ var _time_offset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./time-offset */ "./node_modules/iab-vast-parser/src/factory/time-offset.js");
/* harmony import */ var _util_map_tracking_events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/map-tracking-events */ "./node_modules/iab-vast-parser/src/util/map-tracking-events.js");
/* harmony import */ var _util_is_non_empty_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/is-non-empty-string */ "./node_modules/iab-vast-parser/src/util/is-non-empty-string.js");
/* harmony import */ var _util_is_non_empty_array__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/is-non-empty-array */ "./node_modules/iab-vast-parser/src/util/is-non-empty-array.js");
/* harmony import */ var _util_has_value__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/has-value */ "./node_modules/iab-vast-parser/src/util/has-value.js");











const mapVideoClicks = ($videoClicks, videoClicks) => {
  if ($videoClicks.clickThrough != null && (0,_util_has_value__WEBPACK_IMPORTED_MODULE_9__["default"])($videoClicks.clickThrough)) {
    videoClicks.clickThrough = (0,_click__WEBPACK_IMPORTED_MODULE_4__["default"])($videoClicks.clickThrough)
  }
  if ($videoClicks.clickTracking != null) {
    videoClicks.clickTrackings.push(
      ...$videoClicks.clickTracking
        .filter(_util_has_value__WEBPACK_IMPORTED_MODULE_9__["default"])
        .map(_click__WEBPACK_IMPORTED_MODULE_4__["default"]))
  }
  if ($videoClicks.customClick != null) {
    videoClicks.customClicks.push(
      ...$videoClicks.customClick
        .filter(_util_has_value__WEBPACK_IMPORTED_MODULE_9__["default"])
        .map(_click__WEBPACK_IMPORTED_MODULE_4__["default"]))
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($creative, options) => {
  const $linear = $creative.linear
  const linear = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.Linear()
  if ((0,_util_is_non_empty_string__WEBPACK_IMPORTED_MODULE_7__["default"])($linear.skipoffset)) {
    linear.skipoffset = (0,_time_offset__WEBPACK_IMPORTED_MODULE_5__["default"])($linear.skipoffset, options)
  }
  if ($linear.duration != null) {
    linear.duration = $linear.duration._value
  }
  if ($linear.mediaFiles != null) {
    if ($linear.mediaFiles.mezzanine != null) {
      linear.mezzanine = $linear.mediaFiles.mezzanine._value
    }
    if ($linear.mediaFiles.mediaFile != null) {
      linear.mediaFiles
        .push(...$linear.mediaFiles.mediaFile.map(_media_file__WEBPACK_IMPORTED_MODULE_1__["default"]))
    }
    if ($linear.mediaFiles.interactiveCreativeFile != null) {
      linear.interactiveCreativeFiles
        .push(...$linear.mediaFiles.interactiveCreativeFile.map(_interactive_creative_file__WEBPACK_IMPORTED_MODULE_2__["default"]))
    }
  }
  if ($linear.adParameters != null) {
    linear.adParameters = $linear.adParameters._value
  }
  if ($linear.videoClicks != null) {
    linear.videoClicks = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.VideoClicks()
    mapVideoClicks($linear.videoClicks, linear.videoClicks)
  }
  if ($linear.trackingEvents != null && (0,_util_is_non_empty_array__WEBPACK_IMPORTED_MODULE_8__["default"])($linear.trackingEvents.tracking)) {
    linear.trackingEvents = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.TrackingEvents()
    ;(0,_util_map_tracking_events__WEBPACK_IMPORTED_MODULE_6__["default"])($linear.trackingEvents, linear.trackingEvents, options)
  }
  if ($linear.icons != null && $linear.icons.icon) {
    linear.icons.push(...$linear.icons.icon.map(_icon__WEBPACK_IMPORTED_MODULE_3__["default"]))
  }
  return linear
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/media-file.js":
/*!****************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/media-file.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($mediaFile) => {
  const mediaFile = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.MediaFile()
  mediaFile.id = $mediaFile.id
  mediaFile.delivery = $mediaFile.delivery
  mediaFile.type = $mediaFile.type
  mediaFile.bitrate = $mediaFile.bitrate
  mediaFile.minBitrate = $mediaFile.minBitrate
  mediaFile.maxBitrate = $mediaFile.maxBitrate
  mediaFile.width = $mediaFile.width
  mediaFile.height = $mediaFile.height
  mediaFile.scalable = $mediaFile.scalable
  mediaFile.maintainAspectRatio = $mediaFile.maintainAspectRatio
  mediaFile.codec = $mediaFile.codec
  mediaFile.apiFramework = $mediaFile.apiFramework
  mediaFile.uri = $mediaFile._value
  return mediaFile
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/non-linear-ads.js":
/*!********************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/non-linear-ads.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _non_linear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./non-linear */ "./node_modules/iab-vast-parser/src/factory/non-linear.js");
/* harmony import */ var _util_map_tracking_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/map-tracking-events */ "./node_modules/iab-vast-parser/src/util/map-tracking-events.js");
/* harmony import */ var _util_is_non_empty_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/is-non-empty-array */ "./node_modules/iab-vast-parser/src/util/is-non-empty-array.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($creative) => {
  const $nonLinearAds = $creative.nonLinearAds
  const nonLinearAds = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.NonLinearAds()
  if ($nonLinearAds.nonLinear != null) {
    nonLinearAds.nonLinears.push(...$nonLinearAds.nonLinear.map(_non_linear__WEBPACK_IMPORTED_MODULE_1__["default"]))
  }
  if ($nonLinearAds.trackingEvents != null && (0,_util_is_non_empty_array__WEBPACK_IMPORTED_MODULE_3__["default"])($nonLinearAds.trackingEvents.tracking)) {
    nonLinearAds.trackingEvents = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.TrackingEvents()
    ;(0,_util_map_tracking_events__WEBPACK_IMPORTED_MODULE_2__["default"])($nonLinearAds.trackingEvents, nonLinearAds.trackingEvents)
  }
  return nonLinearAds
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/non-linear.js":
/*!****************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/non-linear.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resource */ "./node_modules/iab-vast-parser/src/factory/resource.js");
/* harmony import */ var _click__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./click */ "./node_modules/iab-vast-parser/src/factory/click.js");
/* harmony import */ var _util_has_value__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/has-value */ "./node_modules/iab-vast-parser/src/util/has-value.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($nonLinear) => {
  const nonLinear = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.NonLinear()
  nonLinear.id = $nonLinear.id
  nonLinear.width = $nonLinear.width
  nonLinear.height = $nonLinear.height
  nonLinear.expandedWidth = $nonLinear.expandedWidth
  nonLinear.expandedHeight = $nonLinear.expandedHeight
  nonLinear.scalable = $nonLinear.scalable
  nonLinear.maintainAspectRatio = $nonLinear.maintainAspectRatio
  nonLinear.minSuggestedDuration = $nonLinear.minSuggestedDuration
  nonLinear.apiFramework = $nonLinear.apiFramework
  nonLinear.resource = (0,_resource__WEBPACK_IMPORTED_MODULE_1__["default"])($nonLinear)
  if ($nonLinear.adParameters != null) {
    nonLinear.adParameters = $nonLinear.adParameters._value
  }
  if ($nonLinear.nonLinearClickThrough != null && (0,_util_has_value__WEBPACK_IMPORTED_MODULE_3__["default"])($nonLinear.nonLinearClickThrough)) {
    nonLinear.clickThrough = (0,_click__WEBPACK_IMPORTED_MODULE_2__["default"])($nonLinear.nonLinearClickThrough)
  }
  if ($nonLinear.nonLinearClickTracking != null) {
    nonLinear.clickTrackings.push(
      ...$nonLinear.nonLinearClickTracking
        .filter(_util_has_value__WEBPACK_IMPORTED_MODULE_3__["default"])
        .map(_click__WEBPACK_IMPORTED_MODULE_2__["default"]))
  }
  return nonLinear
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/pricing.js":
/*!*************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/pricing.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($pricing) => {
  const pricing = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.Pricing()
  pricing.model = $pricing.model
  pricing.currency = $pricing.currency
  pricing.value = $pricing._value
  return pricing
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/resource.js":
/*!**************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/resource.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _static_resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./static-resource */ "./node_modules/iab-vast-parser/src/factory/static-resource.js");
/* harmony import */ var _iframe_resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iframe-resource */ "./node_modules/iab-vast-parser/src/factory/iframe-resource.js");
/* harmony import */ var _html_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./html-resource */ "./node_modules/iab-vast-parser/src/factory/html-resource.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($parent) =>
  ($parent.staticResource != null) ? (0,_static_resource__WEBPACK_IMPORTED_MODULE_0__["default"])($parent.staticResource)
    : ($parent.iFrameResource != null) ? (0,_iframe_resource__WEBPACK_IMPORTED_MODULE_1__["default"])($parent.iFrameResource)
      : ($parent.htmlResource != null) ? (0,_html_resource__WEBPACK_IMPORTED_MODULE_2__["default"])($parent.htmlResource)
        : null);


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/static-resource.js":
/*!*********************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/static-resource.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($staticResource) => {
  const res = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.StaticResource()
  res.creativeType = $staticResource.creativeType
  res.uri = $staticResource._value
  return res
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/survey.js":
/*!************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/survey.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($survey) => {
  const survey = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.Survey()
  survey.type = $survey.type
  survey.uri = $survey._value
  return survey
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/time-offset.js":
/*!*****************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/time-offset.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _util_parse_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/parse-time */ "./node_modules/iab-vast-parser/src/util/parse-time.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((offsetStr, options, err) => {
  const lastChar = offsetStr.charAt(offsetStr.length - 1)
  if (lastChar === '%') {
    const offset = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.RelativeTimeOffset()
    offset.value = parseFloat(offsetStr.substr(0, offsetStr.length - 1))
    return offset
  } else {
    const offset = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.AbsoluteTimeOffset()
    try {
      offset.value = (0,_util_parse_time__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetStr)
    } catch (error) {
      options.errorHandler.tryRecover(error)
    }
    return offset
  }
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/universal-ad-id.js":
/*!*********************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/universal-ad-id.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($universalAdId) => {
  const universalAdId = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.UniversalAdId()
  if ($universalAdId.idRegistry != null) {
    universalAdId.idRegistry = $universalAdId.idRegistry
  }
  if ($universalAdId.idValue != null) {
    universalAdId.idValue = $universalAdId.idValue
  }
  universalAdId.creativeIdentifier = $universalAdId._value
  return universalAdId
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/vast.js":
/*!**********************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/vast.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _ad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ad */ "./node_modules/iab-vast-parser/src/factory/ad.js");



const triageAds = ($$ads) => {
  const $$adsWithSequence = []
  const $$adsWithoutSequence = []
  for (let i = 0; i < $$ads.length; ++i) {
    const $ad = $$ads[i]
    if (typeof $ad.sequence !== 'undefined') {
      $$adsWithSequence.push($ad)
    } else {
      $$adsWithoutSequence.push($ad)
    }
  }
  return [$$adsWithSequence, $$adsWithoutSequence]
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($vast, options) => {
  const vast = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.VAST()
  vast.version = $vast.version
  vast.errors.push(...$vast.error
    .map((err) => err._value)
    .filter((uri) => (uri !== '')))
  const [$$adsWithSequence, $$adsWithoutSequence] = triageAds($vast.ad)
  if ($$adsWithSequence.length > 0) {
    if (options.noSingleAdPods &&
        $vast.ad.length === 1 && $$adsWithSequence.length === 1) {
      $$adsWithoutSequence.push($$adsWithSequence[0])
    } else {
      vast.adPod = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.AdPod()
      for (let i = 0; i < $$adsWithSequence.length; i++) {
        vast.adPod.ads.add((0,_ad__WEBPACK_IMPORTED_MODULE_1__["default"])($$adsWithSequence[i], options))
      }
    }
  }
  for (let i = 0; i < $$adsWithoutSequence.length; i++) {
    vast.ads.add((0,_ad__WEBPACK_IMPORTED_MODULE_1__["default"])($$adsWithoutSequence[i], options))
  }
  return vast
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/verification.js":
/*!******************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/verification.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _javascript_resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./javascript-resource */ "./node_modules/iab-vast-parser/src/factory/javascript-resource.js");
/* harmony import */ var _flash_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flash-resource */ "./node_modules/iab-vast-parser/src/factory/flash-resource.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($verification) => {
  const verification = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.Verification()
  verification.vendor = $verification.vendor
  if ($verification.javaScriptResource != null) {
    verification.javaScriptResources
      .push(...$verification.javaScriptResource.map(_javascript_resource__WEBPACK_IMPORTED_MODULE_1__["default"]))
  }
  if ($verification.flashResource != null) {
    verification.flashResources
      .push(...$verification.flashResource.map(_flash_resource__WEBPACK_IMPORTED_MODULE_2__["default"]))
  }
  if ($verification.viewableImpression != null) {
    verification.viewableImpression = $verification.viewableImpression._value
  }
  // XXX Proposed properties subject to change
  if ($verification.verificationParameters != null) {
    verification.parameters = $verification.verificationParameters._value
  }
  return verification
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/viewable-impression.js":
/*!*************************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/viewable-impression.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($viewableImpression) => {
  const viewableImpression = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.ViewableImpression()
  viewableImpression.id = $viewableImpression.id
  if ($viewableImpression.viewable != null) {
    viewableImpression.viewables
      .push(...$viewableImpression.viewable.map(imp => imp._value))
  }
  if ($viewableImpression.notViewable != null) {
    viewableImpression.notViewables
      .push(...$viewableImpression.notViewable.map(imp => imp._value))
  }
  if ($viewableImpression.viewUndetermined != null) {
    viewableImpression.viewUndetermineds
      .push(...$viewableImpression.viewUndetermined.map(imp => imp._value))
  }
  return viewableImpression
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/factory/wrapper.js":
/*!*************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/factory/wrapper.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _inherit_ad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../inherit/ad */ "./node_modules/iab-vast-parser/src/inherit/ad.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($ad, options) => {
  const wrapper = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.Wrapper()
  const $wrapper = $ad.wrapper
  ;(0,_inherit_ad__WEBPACK_IMPORTED_MODULE_1__["default"])($ad, $wrapper, wrapper, options)
  if ($wrapper.followAdditionalWrappers != null) {
    wrapper.followAdditionalWrappers = $wrapper.followAdditionalWrappers
  }
  if ($wrapper.allowMultipleAds != null) {
    wrapper.allowMultipleAds = $wrapper.allowMultipleAds
  }
  wrapper.fallbackOnNoAd = $wrapper.fallbackOnNoAd
  wrapper.vastAdTagURI = ($wrapper.vastAdTagURI != null)
    ? $wrapper.vastAdTagURI._value
    : null
  return wrapper
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/inherit/ad.js":
/*!********************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/inherit/ad.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factory_ad_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory/ad-system */ "./node_modules/iab-vast-parser/src/factory/ad-system.js");
/* harmony import */ var _factory_creative__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factory/creative */ "./node_modules/iab-vast-parser/src/factory/creative.js");
/* harmony import */ var _factory_extension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../factory/extension */ "./node_modules/iab-vast-parser/src/factory/extension.js");
/* harmony import */ var _factory_impression__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../factory/impression */ "./node_modules/iab-vast-parser/src/factory/impression.js");
/* harmony import */ var _factory_pricing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../factory/pricing */ "./node_modules/iab-vast-parser/src/factory/pricing.js");
/* harmony import */ var _factory_viewable_impression__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../factory/viewable-impression */ "./node_modules/iab-vast-parser/src/factory/viewable-impression.js");
/* harmony import */ var _factory_verification__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../factory/verification */ "./node_modules/iab-vast-parser/src/factory/verification.js");
/* harmony import */ var _util_is_non_empty_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/is-non-empty-string */ "./node_modules/iab-vast-parser/src/util/is-non-empty-string.js");









const hasValue = ($node) => ($node != null && (0,_util_is_non_empty_string__WEBPACK_IMPORTED_MODULE_7__["default"])($node._value))

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($ad, $impl, ad, options) => {
  ad.id = $ad.id
  ad.conditionalAd = $ad.conditionalAd
  ad.sequence = $ad.sequence
  if ($impl.adSystem != null) {
    ad.adSystem = (0,_factory_ad_system__WEBPACK_IMPORTED_MODULE_0__["default"])($impl.adSystem)
  }
  if ($impl.impression != null) {
    ad.impressions.push(...$impl.impression
      .filter(hasValue)
      .map(_factory_impression__WEBPACK_IMPORTED_MODULE_3__["default"]))
  }
  if ($impl.pricing != null) {
    ad.pricing = (0,_factory_pricing__WEBPACK_IMPORTED_MODULE_4__["default"])($impl.pricing)
  }
  if ($impl.error != null) {
    ad.errors.push(...$impl.error
      .filter(hasValue)
      .map($err => $err._value))
  }
  if ($impl.viewableImpression != null) {
    ad.viewableImpression = (0,_factory_viewable_impression__WEBPACK_IMPORTED_MODULE_5__["default"])($impl.viewableImpression)
  }
  if ($impl.adVerifications != null) {
    $impl.adVerifications.verification.forEach(($verification) => {
      try {
        const verification = (0,_factory_verification__WEBPACK_IMPORTED_MODULE_6__["default"])($verification, options)
        ad.verifications.push(verification)
      } catch (error) {
        options.errorHandler.tryRecover(error)
      }
    })
  }
  if ($impl.extensions != null) {
    ad.extensions.push(...$impl.extensions.extension.map(_factory_extension__WEBPACK_IMPORTED_MODULE_2__["default"]))
  }
  if ($impl.creatives != null) {
    $impl.creatives.creative.forEach(($creative) => {
      try {
        const creative = (0,_factory_creative__WEBPACK_IMPORTED_MODULE_1__["default"])($creative, options)
        ad.creatives.add(creative)
      } catch (error) {
        options.errorHandler.tryRecover(error)
      }
    })
  }
  return ad
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/parse.js":
/*!***************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/parse.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _xml_unmarshaler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./xml/unmarshaler */ "./node_modules/iab-vast-parser/src/xml/unmarshaler.js");
/* harmony import */ var _vast_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vast/schema */ "./node_modules/iab-vast-parser/src/vast/schema.js");
/* harmony import */ var _factory_vast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factory/vast */ "./node_modules/iab-vast-parser/src/factory/vast.js");
/* harmony import */ var _errors_error_codes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors/error-codes */ "./node_modules/iab-vast-parser/src/errors/error-codes.js");
/* harmony import */ var _errors_error_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./errors/error-handler */ "./node_modules/iab-vast-parser/src/errors/error-handler.js");






const DEFAULT_OPTIONS = {
  strict: false,
  noSingleAdPods: false
}

const toElement = (xml, options) => {
  if (typeof xml === 'string') {
    const domParser = options.domParser || new DOMParser()
    xml = domParser.parseFromString(xml, 'text/xml')
  }
  if (xml.documentElement != null) {
    xml = xml.documentElement
  }
  if (xml.getElementsByTagName('parsererror').length > 0) {
    options.errorHandler.failWithErrorCode('XML parsing error', _errors_error_codes__WEBPACK_IMPORTED_MODULE_3__["default"].XML_PARSING_ERROR)
  }
  return xml
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((xml, options = {}) => {
  options = Object.assign({}, DEFAULT_OPTIONS, options)
  options.errorHandler = new _errors_error_handler__WEBPACK_IMPORTED_MODULE_4__["default"](options.strict)
  const element = toElement(xml, options)
  const unmarshaler = new _xml_unmarshaler__WEBPACK_IMPORTED_MODULE_0__["default"](_vast_schema__WEBPACK_IMPORTED_MODULE_1__["default"])
  try {
    const root = unmarshaler.unmarshal(element)
    return (0,_factory_vast__WEBPACK_IMPORTED_MODULE_2__["default"])(root, options)
  } catch (error) {
    options.errorHandler.fail(error)
  }
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/util/has-value.js":
/*!************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/util/has-value.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _is_non_empty_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-non-empty-string */ "./node_modules/iab-vast-parser/src/util/is-non-empty-string.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((item) => (item != null && (0,_is_non_empty_string__WEBPACK_IMPORTED_MODULE_0__["default"])(item._value)));


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/util/is-non-empty-array.js":
/*!*********************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/util/is-non-empty-array.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((arr) => (Array.isArray(arr) && arr.length > 0));


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/util/is-non-empty-string.js":
/*!**********************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/util/is-non-empty-string.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((str) => (typeof str === 'string' && str.length > 0));


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/util/map-tracking-events.js":
/*!**********************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/util/map-tracking-events.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iab_vast_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-model */ "./node_modules/iab-vast-model/src/index.js");
/* harmony import */ var _factory_time_offset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factory/time-offset */ "./node_modules/iab-vast-parser/src/factory/time-offset.js");
/* harmony import */ var _is_non_empty_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-non-empty-string */ "./node_modules/iab-vast-parser/src/util/is-non-empty-string.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (($trackingEvents, trackingEvents, options) => {
  if ($trackingEvents == null || !Array.isArray($trackingEvents.tracking)) {
    return
  }
  for (const $tracking of $trackingEvents.tracking) {
    if (!(0,_is_non_empty_string__WEBPACK_IMPORTED_MODULE_2__["default"])($tracking._value)) {
      continue
    }
    const conf = new iab_vast_model__WEBPACK_IMPORTED_MODULE_0__.TrackingEvent()
    conf.uri = $tracking._value
    // VAST 3.0: 'offset' attribute is available for 'progress' events only.
    // VAST 4.0: 'offset' attribute is available when <Linear> is the parent.
    if ((0,_is_non_empty_string__WEBPACK_IMPORTED_MODULE_2__["default"])($tracking.offset)) {
      try {
        conf.offset = (0,_factory_time_offset__WEBPACK_IMPORTED_MODULE_1__["default"])($tracking.offset)
      } catch (error) {
        options.errorHandler.tryRecover(error)
      }
    }
    trackingEvents.add($tracking.event, conf)
  }
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/util/parse-time.js":
/*!*************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/util/parse-time.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const re = /^\s*(\d+):(\d+):(\d+(?:\.\d+)?)\s*$/

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((str) => {
  if (typeof str !== 'string') {
    return null
  }
  const m = re.exec(str)
  if (m == null) {
    return null
  }
  return ((parseInt(m[1], 10) * 60) + parseInt(m[2], 10)) * 60 + parseFloat(m[3])
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/vast/schema.js":
/*!*********************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/vast/schema.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _xml_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xml/types */ "./node_modules/iab-vast-parser/src/xml/types.js");
// TODO Add required nodes & attributes



const collections = {
  AdVerifications: ['Verification'],
  Companion: ['CompanionClickTracking'],
  CompanionAds: ['Companion'],
  CreativeExtensions: ['CreativeExtension'],
  Creatives: ['Creative'],
  Extensions: ['Extension'],
  Icon: ['IconViewTracking'],
  IconClicks: ['IconClickTracking'],
  Icons: ['Icon'],
  InLine: ['Category', 'Error', 'Impression', 'Survey'],
  MediaFiles: ['MediaFile', 'InteractiveCreativeFile'],
  NonLinear: ['NonLinearClickTracking'],
  NonLinearAds: ['NonLinear'],
  TrackingEvents: ['Tracking'],
  VAST: ['Error', 'Ad'],
  Verification: ['JavaScriptResource', 'FlashResource'],
  ViewableImpression: ['Viewable', 'NotViewable', 'ViewUndetermined'],
  VideoClicks: ['ClickTracking', 'CustomClick'],
  Wrapper: ['Impression', 'Error']
}

const freeforms = {
  CreativeExtensions: ['CreativeExtension'],
  Extensions: ['Extension']
}

const hybrids = [
  'CompanionAds'
]

const types = {
  Ad: {
    sequence: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int
  },
  AdParameters: {
    xmlEncoded: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].bool
  },
  Companion: {
    width: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    height: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    expandedWidth: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    expandedHeight: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int
  },
  Creative: {
    sequence: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int
  },
  Duration: {
    _value: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].time
  },
  Icon: {
    width: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    height: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    offset: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].time,
    duration: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].time
  },
  MediaFile: {
    bitrate: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    minBitrate: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    maxBitrate: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    width: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    height: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    scalable: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].bool,
    maintainAspectRatio: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].bool
  },
  NonLinear: {
    width: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    height: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    assetWidth: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    assetHeight: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    expandedWidth: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    expandedHeight: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].int,
    scalable: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].bool,
    maintainAspectRatio: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].bool,
    minSuggestedDuration: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].time
  },
  Pricing: {
    _value: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].float
  },
  Wrapper: {
    followAdditionalWrappers: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].bool,
    allowMultipleAds: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].bool,
    fallbackOnNoAd: _xml_types__WEBPACK_IMPORTED_MODULE_0__["default"].bool
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  collections,
  freeforms,
  hybrids,
  types
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/xml/convertors.js":
/*!************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/xml/convertors.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./node_modules/iab-vast-parser/src/xml/types.js");
/* harmony import */ var _util_parse_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/parse-time */ "./node_modules/iab-vast-parser/src/util/parse-time.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  [_types__WEBPACK_IMPORTED_MODULE_0__["default"].bool]: (str) => (str === 'true' || str === '1'),
  [_types__WEBPACK_IMPORTED_MODULE_0__["default"].int]: (str) => parseInt(str, 10),
  [_types__WEBPACK_IMPORTED_MODULE_0__["default"].float]: parseFloat,
  [_types__WEBPACK_IMPORTED_MODULE_0__["default"].time]: _util_parse_time__WEBPACK_IMPORTED_MODULE_1__["default"]
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/xml/dom.js":
/*!*****************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/xml/dom.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getChildren: () => (/* binding */ getChildren),
/* harmony export */   getText: () => (/* binding */ getText),
/* harmony export */   isCdata: () => (/* binding */ isCdata),
/* harmony export */   isElement: () => (/* binding */ isElement),
/* harmony export */   isText: () => (/* binding */ isText)
/* harmony export */ });
const nodeTypeIs = (type) => (node) => (node.nodeType === type)

const isElement = nodeTypeIs(1)

const isText = nodeTypeIs(3)

const isCdata = nodeTypeIs(4)

const getChildren = (node, filter) => Array.prototype.filter.call(node.childNodes, filter)

const isTextOrCdata = (node) => (isText(node) || isCdata(node))

const getText = (node) => getChildren(node, isTextOrCdata).map((child) => child.nodeValue).join('').trim()


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/xml/types.js":
/*!*******************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/xml/types.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  bool: 'b',
  int: 'i',
  float: 'f',
  time: 't'
});


/***/ }),

/***/ "./node_modules/iab-vast-parser/src/xml/unmarshaler.js":
/*!*************************************************************!*\
  !*** ./node_modules/iab-vast-parser/src/xml/unmarshaler.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Unmarshaler)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./node_modules/iab-vast-parser/src/xml/dom.js");
/* harmony import */ var _convertors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./convertors */ "./node_modules/iab-vast-parser/src/xml/convertors.js");



const toProperty = (() => {
  const re = /^[A-Z]+/
  const insert = (m) => (m.length === 1) ? m.toLowerCase()
    : m.substr(0, m.length - 1).toLowerCase() + m.charAt(m.length - 1)
  return (str) => str.replace(re, insert)
})()

const hasPair = (map, parentName, childName) =>
  (map[parentName] != null && ~map[parentName].indexOf(childName))

class Unmarshaler {
  constructor ({ collections, freeforms, hybrids, types }) {
    this._collections = collections
    this._freeforms = freeforms
    this._hybrids = hybrids
    this._types = types
  }

  unmarshal (xml) {
    return this._createNode(xml)
  }

  _createNode (xml) {
    const node = Object.create(null)
    node._value = this._isHybrid(xml.nodeName)
      ? xml
      : this._convertPropertyValue((0,_dom__WEBPACK_IMPORTED_MODULE_0__.getText)(xml), xml.nodeName, '_value')
    this._copyAttributes(node, xml)
    this._createCollections(node, xml)
    this._createChildren(node, xml)
    return node
  }

  _createFreeformNode (xml) {
    const node = Object.create(null)
    this._copyAttributes(node, xml)
    node._value = xml
    return node
  }

  _copyAttributes (node, xml) {
    const parentName = xml.nodeName
    for (let i = 0; i < xml.attributes.length; ++i) {
      const attrNode = xml.attributes[i]
      const name = attrNode.nodeName
      const rawValue = attrNode.nodeValue
      node[name] = this._convertPropertyValue(rawValue, parentName, name)
    }
  }

  _createCollections (node, xml) {
    if (this._collections[xml.nodeName] != null) {
      this._collections[xml.nodeName].forEach((childName) => {
        node[toProperty(childName)] = []
      })
    }
  }

  _createChildren (node, xml) {
    const parentName = xml.nodeName
    ;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.getChildren)(xml, _dom__WEBPACK_IMPORTED_MODULE_0__.isElement).forEach((child) => {
      const childName = child.nodeName
      const prop = toProperty(childName)
      if (this._isFreeformParent(parentName)) {
        if (this._isFreeformChild(parentName, childName)) {
          this._addFreeformChild(child, prop, node)
        }
      } else {
        this._addNodeChild(child, prop, node, parentName, childName)
      }
    })
  }

  _addNodeChild (child, prop, parentNode, parentName, childName) {
    const childNode = this._createNode(child)
    if (parentNode[prop] == null) {
      parentNode[prop] = childNode
    } else if (this._isCollection(parentName, childName)) {
      parentNode[prop].push(childNode)
    } else {
      throw new Error(`Multiple values for ${parentName}.${childName}`)
    }
  }

  _addFreeformChild (child, prop, parentNode) {
    parentNode[prop] = parentNode[prop] || []
    parentNode[prop].push(this._createFreeformNode(child))
  }

  _convertPropertyValue (value, parentName, property) {
    const typeId = (this._types[parentName] != null) ? this._types[parentName][property] : null
    return (typeId != null) ? _convertors__WEBPACK_IMPORTED_MODULE_1__["default"][typeId](value) : value
  }

  _isCollection (parentName, childName) {
    return hasPair(this._collections, parentName, childName)
  }

  _isFreeformParent (name) {
    return (this._freeforms[name] != null)
  }

  _isFreeformChild (parentName, childName) {
    return hasPair(this._freeforms, parentName, childName)
  }

  _isHybrid (name) {
    return this._hybrids.indexOf(name) >= 0
  }
}


/***/ }),

/***/ "./node_modules/unfetch/dist/unfetch.module.js":
/*!*****************************************************!*\
  !*** ./node_modules/unfetch/dist/unfetch.module.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(s.status/100|0),statusText:s.statusText,status:s.status,url:s.responseURL,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var l in s.open(n.method||"get",e,!0),s.onload=function(){s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t}),t(a())},s.onerror=r,s.withCredentials="include"==n.credentials,n.headers)s.setRequestHeader(l,n.headers[l]);s.send(n.body||null)})}
//# sourceMappingURL=unfetch.module.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************************!*\
  !*** ./src/visualAudioVastPlayer.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var iab_vast_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iab-vast-loader */ "./node_modules/iab-vast-loader/browser.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var playSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="18" viewBox="0 0 384 512"><<path fill="#ffffff" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
var pauseSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="15" viewBox="0 0 320 512"><path fill="#ffffff" d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>';
var muteSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="27" viewBox="0 0 576 512"><path fill="#ffffff" d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>';
var unmuteSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="21" viewBox="0 0 448 512"><path fill="#ffffff" d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"/></svg>';
var replaySvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512"><path fill="#ffffff" d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96H320v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32V64H160C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96H192V352c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V448H352c88.4 0 160-71.6 160-160z"/></svg>';
var VisualAudioVastPlayer = /*#__PURE__*/function () {
  function VisualAudioVastPlayer(vastString, addSlot, height, width) {
    var log = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var autoPlay = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    _classCallCheck(this, VisualAudioVastPlayer);
    this.vastUrl = "data:text/xml;base64,".concat(btoa(vastString));
    this.logger = log;
    this.autoPlay = autoPlay;
    this.addSlot = addSlot;
    this.videoHeight = height;
    this.videoWidth = width;
    this.parsedXmlData = null;
    this.audioInlineVastData = null;
    this.audioEvents = null;
    this.videoSrc = null;
    this.audioSrc = null;
    this.audioPaused = false;
    this.isLooped = false;
    this.timeElasped = {
      start: false,
      firstQuartile: false,
      midpoint: false,
      thirdQuartile: false,
      complete: false
    };
    this.initializePlayers();
  }
  return _createClass(VisualAudioVastPlayer, [{
    key: "initializePlayers",
    value: function () {
      var _initializePlayers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return this.loadVastData();
            case 3:
              // console.log({
              //     parsedXmlData: this.parsedXmlData,
              //     audioInlineVastData: this.audioInlineVastData,
              //     audioEvents: this.audioEvents,
              //     videoSrc: this.videoSrc,
              //     audioSrc: this.audioSrc
              // });
              this.validateParameters();
              this.createVideoPlayer();
              this.createAudioPlayer();
              this.createPlayerControls();
              this.wrapPlayers();
              if (this.logger) {
                this.createLoggerElement();
              }
              this.addEventListeners();
              this.addControlEvents();
              _context.next = 16;
              break;
            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 13]]);
      }));
      function initializePlayers() {
        return _initializePlayers.apply(this, arguments);
      }
      return initializePlayers;
    }()
  }, {
    key: "loadVastData",
    value: function () {
      var _loadVastData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _xmlToJSON, _vastType, _tmpAudioInlineVast, _tmpAudioLinearVast;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return this.fetchVastData(this.vastUrl);
            case 3:
              this.parsedXmlData = _context2.sent;
              _vastType = this.checkVastType();
              _tmpAudioInlineVast = this.getAdFromVast('InLine', _utils__WEBPACK_IMPORTED_MODULE_1__.warn, this.parsedXmlData[this.parsedXmlData.length - 1]); // console.log(this.parsedXmlData, _tmpAudioInlineVast);
              this.audioInlineVastData = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.xmlToJSON)(_tmpAudioInlineVast);
              _tmpAudioLinearVast = this.getLinearFromInLine(_tmpAudioInlineVast, _utils__WEBPACK_IMPORTED_MODULE_1__.warn);
              this.audioEvents = this.getTrackingEvents(_tmpAudioLinearVast);
              this.videoSrc = this.getMediaFileUrl((0,_utils__WEBPACK_IMPORTED_MODULE_1__.xmlToJSON)(this.getVideoLinearFromInLine(this.getAdFromVast(_vastType, _utils__WEBPACK_IMPORTED_MODULE_1__.warn, this.parsedXmlData[0]), _utils__WEBPACK_IMPORTED_MODULE_1__.warn)).mediaFiles);
              this.audioSrc = this.getMediaFileUrl((_xmlToJSON = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.xmlToJSON)(_tmpAudioLinearVast)) === null || _xmlToJSON === void 0 ? void 0 : _xmlToJSON.mediaFiles);
              _context2.next = 16;
              break;
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);
            case 16:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 13]]);
      }));
      function loadVastData() {
        return _loadVastData.apply(this, arguments);
      }
      return loadVastData;
    }()
  }, {
    key: "fetchVastData",
    value: function () {
      var _fetchVastData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(vastUrl) {
        var response;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return new iab_vast_loader__WEBPACK_IMPORTED_MODULE_0__.VASTLoader(vastUrl, {
                noSingleAdPods: true
              }).load();
            case 3:
              response = _context3.sent;
              return _context3.abrupt("return", response);
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0);
            case 10:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 7]]);
      }));
      function fetchVastData(_x) {
        return _fetchVastData.apply(this, arguments);
      }
      return fetchVastData;
    }()
  }, {
    key: "checkVastType",
    value: function checkVastType() {
      var _xmlToJSON2;
      var _ads = (_xmlToJSON2 = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.xmlToJSON)(this.parsedXmlData[0])) === null || _xmlToJSON2 === void 0 ? void 0 : _xmlToJSON2.ads;
      // console.log(_ads);
      if (!(_ads !== null && _ads !== void 0 && _ads.length)) {
        throw new Error('No Ad element found in VAST XML');
      }
      return _ads[0].$type;
    }
  }, {
    key: "getAdFromVast",
    value: function getAdFromVast(type, warn, vast) {
      if (vast.version >= '4.0') {
        warn('Support for VAST 4 is incomplete', vast.uri);
      }
      if (vast.adPod != null) {
        warn('Ad pods not supported yet', vast.uri);
      }
      var ads = vast.ads.toArray().filter(function (ad) {
        return ad.$type === type;
      });
      if (ads.length === 0) {
        throw new Error('VAST does not contain ad buffet');
      }
      if (ads.length > 1) {
        warn("Multiple ".concat(type, " elements in VAST, using first"), vast.uri);
      }
      return ads[0];
    }
  }, {
    key: "getLinearFromInLine",
    value: function getLinearFromInLine(inLine, warn) {
      var linearCreatives = inLine.creatives.toArray().filter(function (creative) {
        return creative.linear != null;
      });
      if (linearCreatives.length > 1) {
        warn('Multiple Linear elements in InLine, using first', inLine.uri);
      }
      return linearCreatives[0].linear;
    }
  }, {
    key: "getVideoLinearFromInLine",
    value: function getVideoLinearFromInLine(inLine, warn) {
      var linearCreatives = inLine.creatives.toArray().filter(function (creative) {
        return creative.linear != null;
      });
      if (linearCreatives.length > 1) {
        warn('Multiple Linear elements in InLine, using first', inLine.uri);
      }
      return linearCreatives[linearCreatives.length - 1].linear;
    }
  }, {
    key: "getMediaFileUrl",
    value: function getMediaFileUrl(mediaFiles) {
      return mediaFiles[0];
    }
  }, {
    key: "getTrackingEvents",
    value: function getTrackingEvents(vastData) {
      var trackingEvents = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.xmlToJSON)(this.getTrackingEventsFromLinearVast(vastData));
      var impressions = this.audioInlineVastData.impressions;
      var clickThroughs = this.audioInlineVastData.creatives[0].linear.videoClicks;
      return {
        trackingEvents: trackingEvents,
        impressions: impressions,
        clickThroughs: clickThroughs
      };
    }
  }, {
    key: "getTrackingEventsFromLinearVast",
    value: function getTrackingEventsFromLinearVast(linear) {
      if (linear.trackingEvents == null) {
        return {};
      }
      return linear.trackingEvents.types.reduce(function (acc, type) {
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, type, linear.trackingEvents.get(type)));
      }, {});
    }
  }, {
    key: "validateParameters",
    value: function validateParameters() {
      var requiredParams = {
        videoSrc: this.videoSrc,
        audioSrc: this.audioSrc,
        addSlotTagId: this.addSlot,
        height: this.videoHeight,
        width: this.videoWidth
      };
      var notSpecified = Object.keys(requiredParams).filter(function (key) {
        return !requiredParams[key];
      });
      if (notSpecified.length) {
        throw new Error("Parameters missing ".concat(notSpecified.join(', ')));
      }
    }
  }, {
    key: "createVideoPlayer",
    value: function createVideoPlayer() {
      this.videoPlayer = document.createElement('video');
      this.videoPlayer.src = this.videoSrc.uri;
      this.videoPlayer.controls = false;
      this.videoPlayer.muted = true;
      this.videoPlayer.height = this.videoHeight;
      this.videoPlayer.width = this.videoWidth;
    }
  }, {
    key: "createAudioPlayer",
    value: function createAudioPlayer() {
      this.audioPlayer = document.createElement('audio');
      this.audioPlayer.src = this.audioSrc.uri;
      this.audioPlayer.controls = false;
    }
  }, {
    key: "createPlayerControls",
    value: function createPlayerControls() {
      this.controlsContainer = document.createElement('div');
      var innerDiv = document.createElement('div');
      innerDiv.style.display = 'flex';
      this.videoBtn = this.createButton();
      this.videoBtn.innerHTML = playSvg;
      this.replayBtn = this.createButton();
      this.replayBtn.innerHTML = replaySvg;
      this.replayBtn.style.marginLeft = '20px';
      this.soundBtn = this.createButton();
      this.soundBtn.innerHTML = unmuteSvg;
      innerDiv.appendChild(this.videoBtn);
      innerDiv.appendChild(this.replayBtn);
      this.controlsContainer.appendChild(innerDiv);
      this.controlsContainer.appendChild(this.soundBtn);
      this.controlsContainer.style.display = 'flex';
      this.controlsContainer.style.width = '90%';
      this.controlsContainer.style.justifyContent = 'space-between';
      this.controlsContainer.style.position = 'absolute';
      this.controlsContainer.style.paddingInline = '5%';
      this.controlsContainer.style.bottom = '30px';
    }
  }, {
    key: "createButton",
    value: function createButton() {
      var button = document.createElement('button');
      button.style.backgroundColor = 'transparent';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.cursor = 'pointer';
      button.style.fontSize = '1.5em';
      return button;
    }
  }, {
    key: "wrapPlayers",
    value: function wrapPlayers() {
      this.addSlotCont = document.getElementById(this.addSlot);
      this.wrapperDiv = document.createElement('div');
      this.wrapperDiv.id = 'visual_audio_vast_player';
      this.wrapperDiv.style.position = 'relative';
      this.wrapperDiv.appendChild(this.videoPlayer);
      this.wrapperDiv.appendChild(this.audioPlayer);
      this.wrapperDiv.appendChild(this.controlsContainer);
      this.addSlotCont.appendChild(this.wrapperDiv);
    }
  }, {
    key: "createLoggerElement",
    value: function createLoggerElement() {
      this.loggerList = document.createElement('ul');
      this.wrapperDiv = document.getElementById('visual_audio_slot');
      this.wrapperDiv.appendChild(this.loggerList);
    }
  }, {
    key: "addControlEvents",
    value: function addControlEvents() {
      var _this = this;
      this.videoBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (_this.videoPlayer.paused) {
          _this.videoPlayer.play();
          _this.videoBtn.innerHTML = pauseSvg;
        } else {
          _this.videoPlayer.pause();
          _this.videoBtn.innerHTML = playSvg;
        }
      });
      this.soundBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (_this.audioPlayer.muted) {
          _this.audioPlayer.muted = false;
          _this.soundBtn.innerHTML = unmuteSvg;
        } else {
          _this.audioPlayer.muted = true;
          _this.soundBtn.innerHTML = muteSvg;
        }
      });
      this.replayBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (_this.audioPlayer.currentTime > 0) {
          _this.audioPlayer.currentTime = 0;
          _this.videoPlayer.currentTime = 0;
          _this.triggerEvent('rewind');
        }
      });
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this2 = this,
        _this$audioEvents$imp;
      this.videoPlayer.addEventListener('play', function () {
        return _this2.visualAudioSyncPlay();
      });
      this.videoPlayer.addEventListener('pause', function () {
        return _this2.visualAudioSyncPause();
      });
      this.videoPlayer.addEventListener('volumechange', function () {
        return _this2.visualAudioSyncVolume();
      });
      this.audioPlayer.addEventListener('play', function () {
        if (!_this2.audioPaused) {
          if (!_this2.timeElasped.start) {
            _this2.triggerEvent('start');
            _this2.timeElasped.start = true;
          }
        } else {
          _this2.triggerEvent('resume');
          _this2.audioPaused = false;
        }
      });
      this.audioPlayer.addEventListener('pause', function () {
        if (!_this2.audioPlayer.ended) {
          _this2.triggerEvent('pause');
          _this2.audioPaused = true;
        }
      });
      this.audioPlayer.addEventListener('volumechange', function () {
        if (_this2.audioPlayer.muted) {
          _this2.triggerEvent('mute');
        } else {
          _this2.triggerEvent('unmute');
        }
      });
      this.audioPlayer.addEventListener('ended', function () {
        if (!_this2.timeElasped.complete) {
          _this2.triggerEvent('complete');
          _this2.timeElasped.complete = true;
        }
        if (!_this2.videoPlayer.paused) {
          _this2.videoPlayer.pause();
          _this2.videoBtn.innerHTML = playSvg;
        }
      });
      this.audioPlayer.addEventListener('timeupdate', function () {
        var currentTime = _this2.audioPlayer.currentTime;
        var duration = _this2.audioPlayer.duration;
        var quartile = duration / 4;
        if (currentTime >= quartile && !_this2.timeElasped.firstQuartile) {
          _this2.triggerEvent('firstQuartile');
          _this2.timeElasped.firstQuartile = true;
        } else if (currentTime >= quartile * 2 && !_this2.timeElasped.midpoint) {
          _this2.triggerEvent('midpoint');
          _this2.timeElasped.midpoint = true;
        } else if (currentTime >= quartile * 3 && !_this2.timeElasped.thirdQuartile) {
          _this2.triggerEvent('thirdQuartile');
          _this2.timeElasped.thirdQuartile = true;
        }
      });
      // this.videoPlayer.addEventListener('click', () => this.triggerClickThrough());
      (_this$audioEvents$imp = this.audioEvents.impressions) === null || _this$audioEvents$imp === void 0 || _this$audioEvents$imp.forEach(function (_, index) {
        _this2.triggerEvent('impression', index);
      });
      this.videoPlayer.addEventListener('click', function () {
        _this2.triggerClickThrough();
      });
      this.controlsContainer.addEventListener('click', function () {
        _this2.triggerClickThrough();
      });
      if (this.autoPlay) {
        this.videoPlayer.addEventListener('canplay', function () {
          if (_this2.videoPlayer.paused) {
            _this2.audioPlayer.play().then(function () {
              _this2.videoPlayer.play();
              _this2.videoBtn.innerHTML = pauseSvg;
            });
          }
        });
      }
    }
  }, {
    key: "visualAudioSyncPlay",
    value: function visualAudioSyncPlay() {
      if (this.audioPlayer.paused) {
        this.audioPlayer.play();
      }
    }
  }, {
    key: "visualAudioSyncPause",
    value: function visualAudioSyncPause() {
      if (this.videoPlayer.ended && this.audioPlayer.duration > this.audioPlayer.currentTime) {
        this.videoPlayer.currentTime = 0;
        this.videoPlayer.play();
        this.isLooped = true;
      } else if (!this.audioPlayer.paused) {
        this.audioPlayer.pause();
      }
    }
  }, {
    key: "visualAudioSyncVolume",
    value: function visualAudioSyncVolume() {
      this.audioPlayer.volume = this.videoPlayer.volume;
    }
  }, {
    key: "triggerEvent",
    value: function triggerEvent(eventType, index) {
      var _this$audioEvents;
      var uri = null;
      if (eventType === 'impression') {
        uri = this.audioEvents.impressions[index].uri;
        fetch(this.audioEvents.impressions[index].uri, {
          method: 'GET',
          mode: "no-cors"
        });
      } else if ((_this$audioEvents = this.audioEvents) !== null && _this$audioEvents !== void 0 && (_this$audioEvents = _this$audioEvents.trackingEvents[eventType]) !== null && _this$audioEvents !== void 0 && _this$audioEvents.length) {
        uri = this.audioEvents.trackingEvents[eventType][0].uri;
        fetch(this.audioEvents.trackingEvents[eventType][0].uri, {
          method: 'GET',
          mode: "no-cors"
        });
      }
      if (this.logger) {
        var log = document.createElement('li');
        var eventSpan = document.createElement('div');
        eventSpan.innerHTML = "<strong>Event:</strong> ".concat(eventType);
        var uriSpan = document.createElement('div');
        uriSpan.innerHTML = "<strong>URL:</strong> ".concat(uri);
        log.appendChild(eventSpan);
        log.appendChild(uriSpan);
        this.loggerList.appendChild(log);
      }
    }
  }, {
    key: "triggerClickThrough",
    value: function triggerClickThrough() {
      var _this$audioEvents2,
        _this$audioEvents3,
        _this3 = this;
      if ((_this$audioEvents2 = this.audioEvents) !== null && _this$audioEvents2 !== void 0 && (_this$audioEvents2 = _this$audioEvents2.clickThroughs) !== null && _this$audioEvents2 !== void 0 && (_this$audioEvents2 = _this$audioEvents2.clickThrough) !== null && _this$audioEvents2 !== void 0 && _this$audioEvents2.uri) {
        var clickThroughUri = this.audioEvents.clickThroughs.clickThrough.uri;
        window.open(clickThroughUri, '_blank');
        if (this.logger) {
          var log = document.createElement('li');
          var eventSpan = document.createElement('div');
          eventSpan.innerHTML = "<strong>Event:</strong> clickThrough";
          var uriSpan = document.createElement('div');
          uriSpan.innerHTML = "<strong>URL:</strong> ".concat(clickThroughUri);
          log.appendChild(eventSpan);
          log.appendChild(uriSpan);
          this.loggerList.appendChild(log);
        }
      }
      if (((_this$audioEvents3 = this.audioEvents) === null || _this$audioEvents3 === void 0 || (_this$audioEvents3 = _this$audioEvents3.clickThroughs) === null || _this$audioEvents3 === void 0 || (_this$audioEvents3 = _this$audioEvents3.clickTrackings) === null || _this$audioEvents3 === void 0 ? void 0 : _this$audioEvents3.length) > 0) {
        this.audioEvents.clickThroughs.clickTrackings.forEach(function (event) {
          fetch(event.uri, {
            method: 'GET',
            mode: "no-cors"
          });
          if (_this3.logger) {
            var _log = document.createElement('li');
            var _eventSpan = document.createElement('div');
            _eventSpan.innerHTML = "<strong>Event:</strong> ClickTracking";
            var _uriSpan = document.createElement('div');
            _uriSpan.innerHTML = "<strong>URL:</strong> ".concat(event.uri);
            _log.appendChild(_eventSpan);
            _log.appendChild(_uriSpan);
            _this3.loggerList.appendChild(_log);
          }
        });
      }
    }
  }]);
}();
window.VisualAudioVastPlayer = VisualAudioVastPlayer;
})();

/******/ })()
;
//# sourceMappingURL=visualAudioVastPlayer.js.map