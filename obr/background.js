var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports, module) {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter2() {
      EventEmitter2.init.call(this);
    }
    module.exports = EventEmitter2;
    module.exports.once = once;
    EventEmitter2.EventEmitter = EventEmitter2;
    EventEmitter2.prototype._events = void 0;
    EventEmitter2.prototype._eventsCount = 0;
    EventEmitter2.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter2.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter2.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter2.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners2 = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners2[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter2.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
    EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state5 = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state5);
      wrapped.listener = listener;
      state5.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter2.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners2, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener") continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners2 = events[type];
      if (typeof listeners2 === "function") {
        this.removeListener(type, listeners2);
      } else if (listeners2 !== void 0) {
        for (i = listeners2.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners2[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter2.prototype.listeners = function listeners2(type) {
      return _listeners(this, type, true);
    };
    EventEmitter2.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter2.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter2.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/@owlbear-rodeo/sdk/lib/api/PlayerApi.js
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var PlayerApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  get id() {
    if (!this.messageBus.userId) {
      throw Error("Unable to get user ID: not ready");
    }
    return this.messageBus.userId;
  }
  getSelection() {
    return __awaiter(this, void 0, void 0, function* () {
      const { selection } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_SELECTION", {});
      return selection;
    });
  }
  select(items, replace) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_PLAYER_SELECT", { items, replace });
    });
  }
  deselect(items) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_PLAYER_DESELECT", { items });
    });
  }
  getName() {
    return __awaiter(this, void 0, void 0, function* () {
      const { name } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_NAME", {});
      return name;
    });
  }
  setName(name) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_PLAYER_SET_NAME", { name });
    });
  }
  getColor() {
    return __awaiter(this, void 0, void 0, function* () {
      const { color } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_COLOR", {});
      return color;
    });
  }
  setColor(color) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_PLAYER_SET_COLOR", { color });
    });
  }
  getSyncView() {
    return __awaiter(this, void 0, void 0, function* () {
      const { syncView } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_SYNC_VIEW", {});
      return syncView;
    });
  }
  setSyncView(syncView) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_PLAYER_SET_SYNC_VIEW", { syncView });
    });
  }
  getId() {
    return __awaiter(this, void 0, void 0, function* () {
      const { id } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_ID", {});
      return id;
    });
  }
  getRole() {
    return __awaiter(this, void 0, void 0, function* () {
      const { role: role8 } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_ROLE", {});
      return role8;
    });
  }
  getMetadata() {
    return __awaiter(this, void 0, void 0, function* () {
      const { metadata } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_METADATA", {});
      return metadata;
    });
  }
  setMetadata(update2) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_PLAYER_SET_METADATA", { update: update2 });
    });
  }
  hasPermission(permission) {
    return __awaiter(this, void 0, void 0, function* () {
      const role8 = yield this.getRole();
      if (role8 === "GM") {
        return true;
      }
      const { permissions } = yield this.messageBus.sendAsync("OBR_ROOM_GET_PERMISSIONS", {});
      return permissions.indexOf(permission) > -1;
    });
  }
  getConnectionId() {
    return __awaiter(this, void 0, void 0, function* () {
      const { connectionId } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_CONNECTION_ID", {});
      return connectionId;
    });
  }
  onChange(callback) {
    const handleChange = (data) => {
      callback(data.player);
    };
    this.messageBus.send("OBR_PLAYER_SUBSCRIBE", {});
    this.messageBus.on("OBR_PLAYER_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_PLAYER_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_PLAYER_EVENT_CHANGE", handleChange);
    };
  }
};
var PlayerApi_default = PlayerApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/ViewportApi.js
var __awaiter2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var ViewportApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  reset() {
    return __awaiter2(this, void 0, void 0, function* () {
      const { transform } = yield this.messageBus.sendAsync("OBR_VIEWPORT_RESET", {});
      return transform;
    });
  }
  animateTo(transform) {
    return __awaiter2(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_VIEWPORT_ANIMATE_TO", { transform });
    });
  }
  animateToBounds(bounds) {
    return __awaiter2(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_VIEWPORT_ANIMATE_TO_BOUNDS", {
        bounds
      });
    });
  }
  getPosition() {
    return __awaiter2(this, void 0, void 0, function* () {
      const { position } = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_POSITION", {});
      return position;
    });
  }
  setPosition(position) {
    return __awaiter2(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_VIEWPORT_SET_POSITION", { position });
    });
  }
  getScale() {
    return __awaiter2(this, void 0, void 0, function* () {
      const { scale } = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_SCALE", {});
      return scale;
    });
  }
  setScale(scale) {
    return __awaiter2(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_VIEWPORT_SET_SCALE", { scale });
    });
  }
  getWidth() {
    return __awaiter2(this, void 0, void 0, function* () {
      const { width } = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_WIDTH", {});
      return width;
    });
  }
  getHeight() {
    return __awaiter2(this, void 0, void 0, function* () {
      const { height } = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_HEIGHT", {});
      return height;
    });
  }
  transformPoint(point) {
    return __awaiter2(this, void 0, void 0, function* () {
      const { point: transformed } = yield this.messageBus.sendAsync("OBR_VIEWPORT_TRANSFORM_POINT", { point });
      return transformed;
    });
  }
  inverseTransformPoint(point) {
    return __awaiter2(this, void 0, void 0, function* () {
      const { point: transformed } = yield this.messageBus.sendAsync("OBR_VIEWPORT_INVERSE_TRANSFORM_POINT", { point });
      return transformed;
    });
  }
};
var ViewportApi_default = ViewportApi;

// node_modules/@owlbear-rodeo/sdk/lib/messages/Message.js
function isMessage(message) {
  return typeof message.id === "string";
}

// node_modules/@owlbear-rodeo/sdk/lib/messages/MessageBus.js
var import_events = __toESM(require_events());

// node_modules/uuid/dist/esm-browser/rng.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}

// node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

// node_modules/uuid/dist/esm-browser/native.js
var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native_default = {
  randomUUID
};

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// node_modules/@owlbear-rodeo/sdk/lib/messages/MessageBus.js
var MessageBus = class extends import_events.EventEmitter {
  constructor(origin, roomId) {
    super();
    this.ready = false;
    this.userId = null;
    this.ref = null;
    this.handleMessage = (event) => {
      const message = event.data;
      if (event.origin === this.targetOrigin && isMessage(message)) {
        if (message.id === "OBR_READY") {
          this.ready = true;
          const data = message.data;
          this.ref = data.ref;
          this.userId = data.userId;
        }
        this.emit(message.id, message.data);
      }
    };
    this.send = (id, data, nonce) => {
      var _a;
      if (!this.ref) {
        throw Error("Unable to send message: not ready");
      }
      (_a = window.parent) === null || _a === void 0 ? void 0 : _a.postMessage({
        id,
        data,
        ref: this.ref,
        nonce
      }, this.targetOrigin);
    };
    this.sendAsync = (id, data, timeout = 5e3) => {
      const nonce = `_${v4_default()}`;
      this.send(id, data, nonce);
      return Promise.race([
        new Promise((resolve, reject) => {
          const self = this;
          function onResponse(value) {
            self.off(`${id}_RESPONSE${nonce}`, onResponse);
            self.off(`${id}_ERROR${nonce}`, onError);
            resolve(value);
          }
          function onError(error) {
            self.off(`${id}_RESPONSE${nonce}`, onResponse);
            self.off(`${id}_ERROR${nonce}`, onError);
            reject(error);
          }
          this.on(`${id}_RESPONSE${nonce}`, onResponse);
          this.on(`${id}_ERROR${nonce}`, onError);
        }),
        ...timeout > 0 ? [
          new Promise((_, reject) => window.setTimeout(() => reject(new Error(`Message ${id} took longer than ${timeout}ms to get a result`)), timeout))
        ] : []
      ]);
    };
    this.roomId = roomId;
    this.targetOrigin = origin;
    window.addEventListener("message", this.handleMessage);
    this.setMaxListeners(100);
  }
  destroy() {
    window.removeEventListener("message", this.handleMessage);
  }
};
var MessageBus_default = MessageBus;

// node_modules/@owlbear-rodeo/sdk/lib/api/NotificationApi.js
var __awaiter3 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var NotificationApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  show(message, variant) {
    return __awaiter3(this, void 0, void 0, function* () {
      const { id } = yield this.messageBus.sendAsync("OBR_NOTIFICATION_SHOW", { message, variant });
      return id;
    });
  }
  close(id) {
    return __awaiter3(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_NOTIFICATION_CLOSE", { id });
    });
  }
};
var NotificationApi_default = NotificationApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/scene/SceneFogApi.js
var __awaiter4 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SceneFogApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  getColor() {
    return __awaiter4(this, void 0, void 0, function* () {
      const { color } = yield this.messageBus.sendAsync("OBR_SCENE_FOG_GET_COLOR", {});
      return color;
    });
  }
  setColor(color) {
    return __awaiter4(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_FOG_SET_COLOR", { color });
    });
  }
  getStrokeWidth() {
    return __awaiter4(this, void 0, void 0, function* () {
      const { strokeWidth } = yield this.messageBus.sendAsync("OBR_SCENE_FOG_GET_STROKE_WIDTH", {});
      return strokeWidth;
    });
  }
  setStrokeWidth(strokeWidth) {
    return __awaiter4(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_FOG_SET_STROKE_WIDTH", {
        strokeWidth
      });
    });
  }
  getFilled() {
    return __awaiter4(this, void 0, void 0, function* () {
      const { filled } = yield this.messageBus.sendAsync("OBR_SCENE_FOG_GET_FILLED", {});
      return filled;
    });
  }
  setFilled(filled) {
    return __awaiter4(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_FOG_SET_FILLED", { filled });
    });
  }
  onChange(callback) {
    const handleChange = (data) => {
      callback(data.fog);
    };
    this.messageBus.send("OBR_SCENE_FOG_SUBSCRIBE", {});
    this.messageBus.on("OBR_SCENE_FOG_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_SCENE_FOG_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_SCENE_FOG_EVENT_CHANGE", handleChange);
    };
  }
};
var SceneFogApi_default = SceneFogApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/scene/SceneGridApi.js
var __awaiter5 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SceneGridApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  getDpi() {
    return __awaiter5(this, void 0, void 0, function* () {
      const { dpi } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_DPI", {});
      return dpi;
    });
  }
  getScale() {
    return __awaiter5(this, void 0, void 0, function* () {
      const scale = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_SCALE", {});
      return scale;
    });
  }
  setScale(scale) {
    return __awaiter5(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_SCALE", { scale });
    });
  }
  getColor() {
    return __awaiter5(this, void 0, void 0, function* () {
      const { color } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_COLOR", {});
      return color;
    });
  }
  setColor(color) {
    return __awaiter5(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_COLOR", { color });
    });
  }
  getOpacity() {
    return __awaiter5(this, void 0, void 0, function* () {
      const { opacity } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_OPACITY", {});
      return opacity;
    });
  }
  setOpacity(opacity) {
    return __awaiter5(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_OPACITY", { opacity });
    });
  }
  getType() {
    return __awaiter5(this, void 0, void 0, function* () {
      const { type } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_TYPE", {});
      return type;
    });
  }
  setType(type) {
    return __awaiter5(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_TYPE", { type });
    });
  }
  getLineType() {
    return __awaiter5(this, void 0, void 0, function* () {
      const { lineType } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_LINE_TYPE", {});
      return lineType;
    });
  }
  setLineType(lineType) {
    return __awaiter5(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_LINE_TYPE", {
        lineType
      });
    });
  }
  getMeasurement() {
    return __awaiter5(this, void 0, void 0, function* () {
      const { measurement } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_MEASUREMENT", {});
      return measurement;
    });
  }
  setMeasurement(measurement) {
    return __awaiter5(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_MEASUREMENT", {
        measurement
      });
    });
  }
  getLineWidth() {
    return __awaiter5(this, void 0, void 0, function* () {
      const { lineWidth } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_LINE_WIDTH", {});
      return lineWidth;
    });
  }
  setLineWidth(lineWidth) {
    return __awaiter5(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_LINE_WIDTH", {
        lineWidth
      });
    });
  }
  snapPosition(position, snappingSensitivity, useCorners, useCenter) {
    return __awaiter5(this, void 0, void 0, function* () {
      const { position: snapped } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_SNAP_POSITION", {
        position,
        snappingSensitivity,
        useCorners,
        useCenter
      });
      return snapped;
    });
  }
  getDistance(from, to) {
    return __awaiter5(this, void 0, void 0, function* () {
      const { distance } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_DISTANCE", { from, to });
      return distance;
    });
  }
  onChange(callback) {
    const handleChange = (data) => {
      callback(data.grid);
    };
    this.messageBus.send("OBR_SCENE_GRID_SUBSCRIBE", {});
    this.messageBus.on("OBR_SCENE_GRID_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_SCENE_GRID_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_SCENE_GRID_EVENT_CHANGE", handleChange);
    };
  }
};
var SceneGridApi_default = SceneGridApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/scene/SceneHistoryApi.js
var __awaiter6 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SceneHistoryApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  undo() {
    return __awaiter6(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_UNDO", {});
    });
  }
  redo() {
    return __awaiter6(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_REDO", {});
    });
  }
  canUndo() {
    return __awaiter6(this, void 0, void 0, function* () {
      const { canUndo } = yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_CAN_UNDO", {});
      return canUndo;
    });
  }
  canRedo() {
    return __awaiter6(this, void 0, void 0, function* () {
      const { canRedo } = yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_CAN_REDO", {});
      return canRedo;
    });
  }
};
var SceneHistoryApi_default = SceneHistoryApi;

// node_modules/immer/dist/immer.mjs
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
var errors = true ? [
  // All error codes, starting by 0:
  function(plugin) {
    return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`;
  },
  function(thing) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${thing}'`;
  },
  "This object has been frozen and should not be mutated",
  function(data) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(thing) {
    return `'current' expects a draft, got: ${thing}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(thing) {
    return `'original' expects a draft, got: ${thing}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function die(error, ...args) {
  if (true) {
    const e = errors[error];
    const msg = typeof e === "function" ? e.apply(null, args) : e;
    throw new Error(`[Immer] ${msg}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var getPrototypeOf = Object.getPrototypeOf;
function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}
function isDraftable(value) {
  if (!value)
    return false;
  return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = Object.prototype.constructor.toString();
var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
function isPlainObject(value) {
  if (!value || typeof value !== "object")
    return false;
  const proto = Object.getPrototypeOf(value);
  if (proto === null || proto === Object.prototype)
    return true;
  const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  if (Ctor === Object)
    return true;
  if (typeof Ctor !== "function")
    return false;
  let ctorString = cachedCtorStrings.get(Ctor);
  if (ctorString === void 0) {
    ctorString = Function.toString.call(Ctor);
    cachedCtorStrings.set(Ctor, ctorString);
  }
  return ctorString === objectCtorString;
}
function each(obj, iter, strict = true) {
  if (getArchtype(obj) === 0) {
    const keys = strict ? Reflect.ownKeys(obj) : Object.keys(obj);
    keys.forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state5 = thing[DRAFT_STATE];
  return state5 ? state5.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
function has(thing, prop) {
  return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
function get(thing, prop) {
  return getArchtype(thing) === 2 ? thing.get(prop) : thing[prop];
}
function set(thing, propOrOldValue, value) {
  const t = getArchtype(thing);
  if (t === 2)
    thing.set(propOrOldValue, value);
  else if (t === 3) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
}
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function isMap(target) {
  return target instanceof Map;
}
function isSet(target) {
  return target instanceof Set;
}
function latest(state5) {
  return state5.copy_ || state5.base_;
}
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base))
    return Array.prototype.slice.call(base);
  const isPlain = isPlainObject(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = Object.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc.writable === false) {
        desc.writable = true;
        desc.configurable = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          configurable: true,
          writable: true,
          // could live with !!desc.set as well here...
          enumerable: desc.enumerable,
          value: base[key]
        };
    }
    return Object.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = Object.create(proto);
    return Object.assign(obj, base);
  }
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    Object.defineProperties(obj, {
      set: dontMutateMethodOverride,
      add: dontMutateMethodOverride,
      clear: dontMutateMethodOverride,
      delete: dontMutateMethodOverride
    });
  }
  Object.freeze(obj);
  if (deep)
    Object.values(obj).forEach((value) => freeze(value, true));
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
var dontMutateMethodOverride = {
  value: dontMutateFrozenCollections
};
function isFrozen(obj) {
  if (obj === null || typeof obj !== "object")
    return true;
  return Object.isFrozen(obj);
}
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
function loadPlugin(pluginKey, implementation) {
  if (!plugins[pluginKey])
    plugins[pluginKey] = implementation;
}
var currentScope;
function getCurrentScope() {
  return currentScope;
}
function createScope(parent_, immer_) {
  return {
    drafts_: [],
    parent_,
    immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
}
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches");
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
function enterScope(immer2) {
  return currentScope = createScope(currentScope, immer2);
}
function revokeDraft(draft) {
  const state5 = draft[DRAFT_STATE];
  if (state5.type_ === 0 || state5.type_ === 1)
    state5.revoke_();
  else
    state5.revoked_ = true;
}
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
      if (!scope.parent_)
        maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope.patches_,
        scope.inversePatches_
      );
    }
  } else {
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value, path) {
  if (isFrozen(value))
    return value;
  const useStrictIteration = rootScope.immer_.shouldUseStrictIteration();
  const state5 = value[DRAFT_STATE];
  if (!state5) {
    each(
      value,
      (key, childValue) => finalizeProperty(rootScope, state5, value, key, childValue, path),
      useStrictIteration
    );
    return value;
  }
  if (state5.scope_ !== rootScope)
    return value;
  if (!state5.modified_) {
    maybeFreeze(rootScope, state5.base_, true);
    return state5.base_;
  }
  if (!state5.finalized_) {
    state5.finalized_ = true;
    state5.scope_.unfinalizedDrafts_--;
    const result = state5.copy_;
    let resultEach = result;
    let isSet2 = false;
    if (state5.type_ === 3) {
      resultEach = new Set(result);
      result.clear();
      isSet2 = true;
    }
    each(
      resultEach,
      (key, childValue) => finalizeProperty(
        rootScope,
        state5,
        result,
        key,
        childValue,
        path,
        isSet2
      ),
      useStrictIteration
    );
    maybeFreeze(rootScope, result, false);
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(
        state5,
        path,
        rootScope.patches_,
        rootScope.inversePatches_
      );
    }
  }
  return state5.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if (childValue == null) {
    return;
  }
  if (typeof childValue !== "object" && !targetIsSet) {
    return;
  }
  const childIsFrozen = isFrozen(childValue);
  if (childIsFrozen && !targetIsSet) {
    return;
  }
  if (childValue === targetObject)
    die(5);
  if (isDraft(childValue)) {
    const path = rootPath && parentState && parentState.type_ !== 3 && // Set objects are atomic since they have no keys.
    !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
    const res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else
      return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  if (isDraftable(childValue) && !childIsFrozen) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      return;
    }
    if (parentState && parentState.base_ && parentState.base_[prop] === childValue && childIsFrozen) {
      return;
    }
    finalize(rootScope, childValue);
    if ((!parentState || !parentState.scope_.parent_) && typeof prop !== "symbol" && (isMap(targetObject) ? targetObject.has(prop) : Object.prototype.propertyIsEnumerable.call(targetObject, prop)))
      maybeFreeze(rootScope, childValue);
  }
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}
function createProxyProxy(base, parent) {
  const isArray = Array.isArray(base);
  const state5 = {
    type_: isArray ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false
  };
  let target = state5;
  let traps = objectTraps;
  if (isArray) {
    target = [state5];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state5.draft_ = proxy;
  state5.revoke_ = revoke;
  return proxy;
}
var objectTraps = {
  get(state5, prop) {
    if (prop === DRAFT_STATE)
      return state5;
    const source = latest(state5);
    if (!has(source, prop)) {
      return readPropFromProto(state5, source, prop);
    }
    const value = source[prop];
    if (state5.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value === peek(state5.base_, prop)) {
      prepareCopy(state5);
      return state5.copy_[prop] = createProxy(value, state5);
    }
    return value;
  },
  has(state5, prop) {
    return prop in latest(state5);
  },
  ownKeys(state5) {
    return Reflect.ownKeys(latest(state5));
  },
  set(state5, prop, value) {
    const desc = getDescriptorFromProto(latest(state5), prop);
    if (desc?.set) {
      desc.set.call(state5.draft_, value);
      return true;
    }
    if (!state5.modified_) {
      const current2 = peek(latest(state5), prop);
      const currentState = current2?.[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state5.copy_[prop] = value;
        state5.assigned_[prop] = false;
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has(state5.base_, prop)))
        return true;
      prepareCopy(state5);
      markChanged(state5);
    }
    if (state5.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state5.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state5.copy_[prop]))
      return true;
    state5.copy_[prop] = value;
    state5.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state5, prop) {
    if (peek(state5.base_, prop) !== void 0 || prop in state5.base_) {
      state5.assigned_[prop] = false;
      prepareCopy(state5);
      markChanged(state5);
    } else {
      delete state5.assigned_[prop];
    }
    if (state5.copy_) {
      delete state5.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state5, prop) {
    const owner = latest(state5);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      writable: true,
      configurable: state5.type_ !== 1 || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state5) {
    return getPrototypeOf(state5.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
each(objectTraps, (key, fn) => {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state5, prop) {
  if (isNaN(parseInt(prop)))
    die(13);
  return arrayTraps.set.call(this, state5, prop, void 0);
};
arrayTraps.set = function(state5, prop, value) {
  if (prop !== "length" && isNaN(parseInt(prop)))
    die(14);
  return objectTraps.set.call(this, state5[0], prop, value, state5[0]);
};
function peek(draft, prop) {
  const state5 = draft[DRAFT_STATE];
  const source = state5 ? latest(state5) : draft;
  return source[prop];
}
function readPropFromProto(state5, source, prop) {
  const desc = getDescriptorFromProto(source, prop);
  return desc ? `value` in desc ? desc.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    desc.get?.call(state5.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state5) {
  if (!state5.modified_) {
    state5.modified_ = true;
    if (state5.parent_) {
      markChanged(state5.parent_);
    }
  }
}
function prepareCopy(state5) {
  if (!state5.copy_) {
    state5.copy_ = shallowCopy(
      state5.base_,
      state5.scope_.immer_.useStrictShallowCopy_
    );
  }
}
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.useStrictIteration_ = true;
    this.produce = (base, recipe, patchListener) => {
      if (typeof base === "function" && typeof recipe !== "function") {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (typeof recipe !== "function")
        die(6);
      if (patchListener !== void 0 && typeof patchListener !== "function")
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || typeof base !== "object") {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (typeof base === "function") {
        return (state5, ...args) => this.produceWithPatches(state5, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (typeof config?.autoFreeze === "boolean")
      this.setAutoFreeze(config.autoFreeze);
    if (typeof config?.useStrictShallowCopy === "boolean")
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
    if (typeof config?.useStrictIteration === "boolean")
      this.setUseStrictIteration(config.useStrictIteration);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state5 = draft && draft[DRAFT_STATE];
    if (!state5 || !state5.isManual_)
      die(9);
    const { scope_: scope } = state5;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(value) {
    this.useStrictIteration_ = value;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(value, parent) {
  const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state5 = value[DRAFT_STATE];
  let copy;
  let strict = true;
  if (state5) {
    if (!state5.modified_)
      return state5.base_;
    state5.finalized_ = true;
    copy = shallowCopy(value, state5.scope_.immer_.useStrictShallowCopy_);
    strict = state5.scope_.immer_.shouldUseStrictIteration();
  } else {
    copy = shallowCopy(value, true);
  }
  each(
    copy,
    (key, childValue) => {
      set(copy, key, currentImpl(childValue));
    },
    strict
  );
  if (state5) {
    state5.finalized_ = false;
  }
  return copy;
}
function enablePatches() {
  const errorOffset = 16;
  if (true) {
    errors.push(
      'Sets cannot have "replace" patches.',
      function(op) {
        return "Unsupported patch operation: " + op;
      },
      function(path) {
        return "Cannot apply patch, path doesn't resolve: " + path;
      },
      "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
    );
  }
  const REPLACE = "replace";
  const ADD = "add";
  const REMOVE = "remove";
  function generatePatches_(state5, basePath, patches, inversePatches) {
    switch (state5.type_) {
      case 0:
      case 2:
        return generatePatchesFromAssigned(
          state5,
          basePath,
          patches,
          inversePatches
        );
      case 1:
        return generateArrayPatches(state5, basePath, patches, inversePatches);
      case 3:
        return generateSetPatches(
          state5,
          basePath,
          patches,
          inversePatches
        );
    }
  }
  function generateArrayPatches(state5, basePath, patches, inversePatches) {
    let { base_, assigned_ } = state5;
    let copy_ = state5.copy_;
    if (copy_.length < base_.length) {
      ;
      [base_, copy_] = [copy_, base_];
      [patches, inversePatches] = [inversePatches, patches];
    }
    for (let i = 0; i < base_.length; i++) {
      if (assigned_[i] && copy_[i] !== base_[i]) {
        const path = basePath.concat([i]);
        patches.push({
          op: REPLACE,
          path,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: clonePatchValueIfNeeded(copy_[i])
        });
        inversePatches.push({
          op: REPLACE,
          path,
          value: clonePatchValueIfNeeded(base_[i])
        });
      }
    }
    for (let i = base_.length; i < copy_.length; i++) {
      const path = basePath.concat([i]);
      patches.push({
        op: ADD,
        path,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: clonePatchValueIfNeeded(copy_[i])
      });
    }
    for (let i = copy_.length - 1; base_.length <= i; --i) {
      const path = basePath.concat([i]);
      inversePatches.push({
        op: REMOVE,
        path
      });
    }
  }
  function generatePatchesFromAssigned(state5, basePath, patches, inversePatches) {
    const { base_, copy_ } = state5;
    each(state5.assigned_, (key, assignedValue) => {
      const origValue = get(base_, key);
      const value = get(copy_, key);
      const op = !assignedValue ? REMOVE : has(base_, key) ? REPLACE : ADD;
      if (origValue === value && op === REPLACE)
        return;
      const path = basePath.concat(key);
      patches.push(op === REMOVE ? { op, path } : { op, path, value });
      inversePatches.push(
        op === ADD ? { op: REMOVE, path } : op === REMOVE ? { op: ADD, path, value: clonePatchValueIfNeeded(origValue) } : { op: REPLACE, path, value: clonePatchValueIfNeeded(origValue) }
      );
    });
  }
  function generateSetPatches(state5, basePath, patches, inversePatches) {
    let { base_, copy_ } = state5;
    let i = 0;
    base_.forEach((value) => {
      if (!copy_.has(value)) {
        const path = basePath.concat([i]);
        patches.push({
          op: REMOVE,
          path,
          value
        });
        inversePatches.unshift({
          op: ADD,
          path,
          value
        });
      }
      i++;
    });
    i = 0;
    copy_.forEach((value) => {
      if (!base_.has(value)) {
        const path = basePath.concat([i]);
        patches.push({
          op: ADD,
          path,
          value
        });
        inversePatches.unshift({
          op: REMOVE,
          path,
          value
        });
      }
      i++;
    });
  }
  function generateReplacementPatches_(baseValue, replacement, patches, inversePatches) {
    patches.push({
      op: REPLACE,
      path: [],
      value: replacement === NOTHING ? void 0 : replacement
    });
    inversePatches.push({
      op: REPLACE,
      path: [],
      value: baseValue
    });
  }
  function applyPatches_(draft, patches) {
    patches.forEach((patch) => {
      const { path, op } = patch;
      let base = draft;
      for (let i = 0; i < path.length - 1; i++) {
        const parentType = getArchtype(base);
        let p = path[i];
        if (typeof p !== "string" && typeof p !== "number") {
          p = "" + p;
        }
        if ((parentType === 0 || parentType === 1) && (p === "__proto__" || p === "constructor"))
          die(errorOffset + 3);
        if (typeof base === "function" && p === "prototype")
          die(errorOffset + 3);
        base = get(base, p);
        if (typeof base !== "object")
          die(errorOffset + 2, path.join("/"));
      }
      const type = getArchtype(base);
      const value = deepClonePatchValue(patch.value);
      const key = path[path.length - 1];
      switch (op) {
        case REPLACE:
          switch (type) {
            case 2:
              return base.set(key, value);
            case 3:
              die(errorOffset);
            default:
              return base[key] = value;
          }
        case ADD:
          switch (type) {
            case 1:
              return key === "-" ? base.push(value) : base.splice(key, 0, value);
            case 2:
              return base.set(key, value);
            case 3:
              return base.add(value);
            default:
              return base[key] = value;
          }
        case REMOVE:
          switch (type) {
            case 1:
              return base.splice(key, 1);
            case 2:
              return base.delete(key);
            case 3:
              return base.delete(patch.value);
            default:
              return delete base[key];
          }
        default:
          die(errorOffset + 1, op);
      }
    });
    return draft;
  }
  function deepClonePatchValue(obj) {
    if (!isDraftable(obj))
      return obj;
    if (Array.isArray(obj))
      return obj.map(deepClonePatchValue);
    if (isMap(obj))
      return new Map(
        Array.from(obj.entries()).map(([k, v]) => [k, deepClonePatchValue(v)])
      );
    if (isSet(obj))
      return new Set(Array.from(obj).map(deepClonePatchValue));
    const cloned = Object.create(getPrototypeOf(obj));
    for (const key in obj)
      cloned[key] = deepClonePatchValue(obj[key]);
    if (has(obj, DRAFTABLE))
      cloned[DRAFTABLE] = obj[DRAFTABLE];
    return cloned;
  }
  function clonePatchValueIfNeeded(obj) {
    if (isDraft(obj)) {
      return deepClonePatchValue(obj);
    } else
      return obj;
  }
  loadPlugin("Patches", {
    applyPatches_,
    generatePatches_,
    generateReplacementPatches_
  });
}
var immer = new Immer2();
var produce = immer.produce;
var produceWithPatches = /* @__PURE__ */ immer.produceWithPatches.bind(
  immer
);

// node_modules/@owlbear-rodeo/sdk/lib/api/scene/SceneItemsApi.js
var __awaiter7 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
enablePatches();
var SceneItemsApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  getItems(filter) {
    return __awaiter7(this, void 0, void 0, function* () {
      if (Array.isArray(filter)) {
        const { items } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ITEMS", { ids: filter });
        return items;
      } else if (filter) {
        const { items } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ALL_ITEMS", {});
        return items.filter(filter);
      } else {
        const { items } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ALL_ITEMS", {});
        return items;
      }
    });
  }
  isItemArray(value) {
    return Array.isArray(value) && value.every((item) => typeof item !== "string");
  }
  updateItems(filterOrItems, update2) {
    return __awaiter7(this, void 0, void 0, function* () {
      let items;
      if (this.isItemArray(filterOrItems)) {
        items = filterOrItems;
      } else {
        items = yield this.getItems(filterOrItems);
      }
      const [nextState, patches] = produceWithPatches(items, update2);
      const nextUpdates = nextState.map((item) => ({
        id: item.id,
        type: item.type
      }));
      for (const patch of patches) {
        const [index, key] = patch.path;
        if (typeof index === "number" && typeof key === "string") {
          nextUpdates[index][key] = nextState[index][key];
        }
      }
      const updates = nextUpdates.filter(
        // Ensure that there are updates besides the default ID and type
        (update3) => Object.keys(update3).length > 2
      );
      if (updates.length === 0) {
        return;
      }
      yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_UPDATE_ITEMS", {
        updates
      });
    });
  }
  addItems(items) {
    return __awaiter7(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_ADD_ITEMS", {
        items
      });
    });
  }
  deleteItems(ids) {
    return __awaiter7(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_DELETE_ITEMS", {
        ids
      });
    });
  }
  getItemAttachments(ids) {
    return __awaiter7(this, void 0, void 0, function* () {
      const { items } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ITEM_ATTACHMENTS", { ids });
      return items;
    });
  }
  getItemBounds(ids) {
    return __awaiter7(this, void 0, void 0, function* () {
      const { bounds } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ITEM_BOUNDS", { ids });
      return bounds;
    });
  }
  onChange(callback) {
    const handleChange = (data) => {
      callback(data.items);
    };
    this.messageBus.send("OBR_SCENE_ITEMS_SUBSCRIBE", {});
    this.messageBus.on("OBR_SCENE_ITEMS_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_SCENE_ITEMS_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_SCENE_ITEMS_EVENT_CHANGE", handleChange);
    };
  }
};
var SceneItemsApi_default = SceneItemsApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/scene/SceneLocalApi.js
var __awaiter8 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
enablePatches();
var SceneLocalApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  getItems(filter) {
    return __awaiter8(this, void 0, void 0, function* () {
      if (Array.isArray(filter)) {
        const { items } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEMS", { ids: filter });
        return items;
      } else if (filter) {
        const { items } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ALL_ITEMS", {});
        return items.filter(filter);
      } else {
        const { items } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ALL_ITEMS", {});
        return items;
      }
    });
  }
  isItemArray(value) {
    return Array.isArray(value) && value.every((item) => typeof item !== "string");
  }
  updateItems(filterOrItems, update2, fastUpdate) {
    return __awaiter8(this, void 0, void 0, function* () {
      let items;
      if (this.isItemArray(filterOrItems)) {
        items = filterOrItems;
      } else {
        items = yield this.getItems(filterOrItems);
      }
      const [nextState, patches] = produceWithPatches(items, update2);
      const nextUpdates = nextState.map((item) => ({
        id: item.id,
        type: item.type
      }));
      for (const patch of patches) {
        const [index, key] = patch.path;
        if (typeof index === "number" && typeof key === "string") {
          nextUpdates[index][key] = nextState[index][key];
        }
      }
      const updates = nextUpdates.filter(
        // Ensure that there are updates besides the default ID and type
        (update3) => Object.keys(update3).length > 2
      );
      if (updates.length === 0) {
        return;
      }
      yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_UPDATE_ITEMS", {
        updates,
        fastUpdate
      });
    });
  }
  addItems(items) {
    return __awaiter8(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_ADD_ITEMS", {
        items
      });
    });
  }
  deleteItems(ids) {
    return __awaiter8(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_DELETE_ITEMS", {
        ids
      });
    });
  }
  getItemAttachments(ids) {
    return __awaiter8(this, void 0, void 0, function* () {
      const { items } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEM_ATTACHMENTS", { ids });
      return items;
    });
  }
  getItemBounds(ids) {
    return __awaiter8(this, void 0, void 0, function* () {
      const { bounds } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEM_BOUNDS", { ids });
      return bounds;
    });
  }
  onChange(callback) {
    const handleChange = (data) => {
      callback(data.items);
    };
    this.messageBus.send("OBR_SCENE_LOCAL_SUBSCRIBE", {});
    this.messageBus.on("OBR_SCENE_LOCAL_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_SCENE_LOCAL_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_SCENE_LOCAL_EVENT_CHANGE", handleChange);
    };
  }
};
var SceneLocalApi_default = SceneLocalApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/scene/SceneApi.js
var __awaiter9 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SceneApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
    this.grid = new SceneGridApi_default(messageBus2);
    this.fog = new SceneFogApi_default(messageBus2);
    this.history = new SceneHistoryApi_default(messageBus2);
    this.items = new SceneItemsApi_default(messageBus2);
    this.local = new SceneLocalApi_default(messageBus2);
  }
  isReady() {
    return __awaiter9(this, void 0, void 0, function* () {
      const { ready: ready2 } = yield this.messageBus.sendAsync("OBR_SCENE_IS_READY", {});
      return ready2;
    });
  }
  onReadyChange(callback) {
    const handleChange = (data) => {
      callback(data.ready);
    };
    this.messageBus.send("OBR_SCENE_READY_SUBSCRIBE", {});
    this.messageBus.on("OBR_SCENE_EVENT_READY_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_SCENE_READY_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_SCENE_EVENT_READY_CHANGE", handleChange);
    };
  }
  getMetadata() {
    return __awaiter9(this, void 0, void 0, function* () {
      const { metadata } = yield this.messageBus.sendAsync("OBR_SCENE_GET_METADATA", {});
      return metadata;
    });
  }
  setMetadata(update2) {
    return __awaiter9(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_SCENE_SET_METADATA", { update: update2 });
    });
  }
  onMetadataChange(callback) {
    const handleChange = (data) => {
      callback(data.metadata);
    };
    this.messageBus.send("OBR_SCENE_METADATA_SUBSCRIBE", {});
    this.messageBus.on("OBR_SCENE_METADATA_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_SCENE_METADATA_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_SCENE_METADATA_EVENT_CHANGE", handleChange);
    };
  }
};
var SceneApi_default = SceneApi;

// node_modules/@owlbear-rodeo/sdk/lib/common/normalize.js
function normalizeUrl(url) {
  return url.startsWith("http") ? url : `${window.location.origin}${url}`;
}
function normalizeIconPaths(icons) {
  return icons.map((base) => Object.assign(Object.assign({}, base), { icon: normalizeUrl(base.icon) }));
}
function normalizeUrlObject(urlObject) {
  return Object.assign(Object.assign({}, urlObject), { url: normalizeUrl(urlObject.url) });
}

// node_modules/@owlbear-rodeo/sdk/lib/api/ContextMenuApi.js
var __awaiter10 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var ContextMenuApi = class {
  constructor(messageBus2) {
    this.contextMenus = {};
    this.handleClick = (event) => {
      var _a;
      const menu = this.contextMenus[event.id];
      if (menu) {
        (_a = menu.onClick) === null || _a === void 0 ? void 0 : _a.call(menu, event.context, event.elementId);
      }
    };
    this.messageBus = messageBus2;
    messageBus2.on("OBR_CONTEXT_MENU_EVENT_CLICK", this.handleClick);
  }
  create(contextMenu) {
    return __awaiter10(this, void 0, void 0, function* () {
      this.messageBus.sendAsync("OBR_CONTEXT_MENU_CREATE", {
        id: contextMenu.id,
        shortcut: contextMenu.shortcut,
        icons: normalizeIconPaths(contextMenu.icons),
        embed: contextMenu.embed && normalizeUrlObject(contextMenu.embed)
      });
      this.contextMenus[contextMenu.id] = contextMenu;
    });
  }
  remove(id) {
    return __awaiter10(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_CONTEXT_MENU_REMOVE", { id });
      delete this.contextMenus[id];
    });
  }
};
var ContextMenuApi_default = ContextMenuApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/ToolApi.js
var __awaiter11 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var ToolApi = class {
  constructor(messageBus2) {
    this.tools = {};
    this.toolActions = {};
    this.toolModes = {};
    this.handleToolClick = (event) => {
      const tool = this.tools[event.id];
      if (tool) {
        if (tool.onClick) {
          const result = tool.onClick(event.context, event.elementId);
          Promise.resolve(result).then((activate) => {
            if (activate) {
              this.messageBus.send("OBR_TOOL_ACTIVATE", {
                id: event.id
              });
            }
          });
        } else {
          this.messageBus.send("OBR_TOOL_ACTIVATE", {
            id: event.id
          });
        }
      }
    };
    this.handleToolActionClick = (event) => {
      var _a;
      const action = this.toolActions[event.id];
      if (action) {
        (_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action, event.context, event.elementId);
      }
    };
    this.handleToolModeClick = (event) => {
      const mode = this.toolModes[event.id];
      if (mode) {
        if (mode.onClick) {
          const result = mode.onClick(event.context, event.elementId);
          Promise.resolve(result).then((activate) => {
            if (activate) {
              this.messageBus.send("OBR_TOOL_MODE_ACTIVATE", {
                toolId: event.context.activeTool,
                modeId: event.id
              });
            }
          });
        } else {
          this.messageBus.send("OBR_TOOL_MODE_ACTIVATE", {
            toolId: event.context.activeTool,
            modeId: event.id
          });
        }
      }
    };
    this.handleToolModeToolClick = (event) => {
      const mode = this.toolModes[event.id];
      if (mode) {
        if (mode.onToolClick) {
          const result = mode.onToolClick(event.context, event.event);
          Promise.resolve(result).then((select) => {
            if (select && event.event.target && !event.event.target.locked) {
              this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
                items: [event.event.target.id]
              });
            }
          });
        } else {
          if (event.event.target && !event.event.target.locked) {
            this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
              items: [event.event.target.id]
            });
          }
        }
      }
    };
    this.handleToolModeToolDoubleClick = (event) => {
      const mode = this.toolModes[event.id];
      if (mode) {
        if (mode.onToolDoubleClick) {
          const result = mode.onToolDoubleClick(event.context, event.event);
          Promise.resolve(result).then((select) => {
            if (select && event.event.target) {
              this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
                items: [event.event.target.id]
              });
            }
          });
        } else {
          if (event.event.target) {
            this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
              items: [event.event.target.id]
            });
          }
        }
      }
    };
    this.handleToolModeToolDown = (event) => {
      var _a;
      const mode = this.toolModes[event.id];
      if (mode) {
        (_a = mode.onToolDown) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
      }
    };
    this.handleToolModeToolMove = (event) => {
      var _a;
      const mode = this.toolModes[event.id];
      if (mode) {
        (_a = mode.onToolMove) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
      }
    };
    this.handleToolModeToolUp = (event) => {
      var _a;
      const mode = this.toolModes[event.id];
      if (mode) {
        (_a = mode.onToolUp) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
      }
    };
    this.handleToolModeToolDragStart = (event) => {
      var _a;
      const mode = this.toolModes[event.id];
      if (mode) {
        (_a = mode.onToolDragStart) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
      }
    };
    this.handleToolModeToolDragMove = (event) => {
      var _a;
      const mode = this.toolModes[event.id];
      if (mode) {
        (_a = mode.onToolDragMove) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
      }
    };
    this.handleToolModeToolDragEnd = (event) => {
      var _a;
      const mode = this.toolModes[event.id];
      if (mode) {
        (_a = mode.onToolDragEnd) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
      }
    };
    this.handleToolModeToolDragCancel = (event) => {
      var _a;
      const mode = this.toolModes[event.id];
      if (mode) {
        (_a = mode.onToolDragCancel) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
      }
    };
    this.handleToolModeKeyDown = (event) => {
      var _a;
      const mode = this.toolModes[event.id];
      if (mode) {
        (_a = mode.onKeyDown) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
      }
    };
    this.handleToolModeKeyUp = (event) => {
      var _a;
      const mode = this.toolModes[event.id];
      if (mode) {
        (_a = mode.onKeyUp) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
      }
    };
    this.handleToolModeActivate = (event) => {
      var _a;
      const mode = this.toolModes[event.id];
      if (mode) {
        (_a = mode.onActivate) === null || _a === void 0 ? void 0 : _a.call(mode, event.context);
      }
    };
    this.handleToolModeDeactivate = (event) => {
      var _a;
      const mode = this.toolModes[event.id];
      if (mode) {
        (_a = mode.onDeactivate) === null || _a === void 0 ? void 0 : _a.call(mode, event.context);
      }
    };
    this.messageBus = messageBus2;
    messageBus2.on("OBR_TOOL_EVENT_CLICK", this.handleToolClick);
    messageBus2.on("OBR_TOOL_ACTION_EVENT_CLICK", this.handleToolActionClick);
    messageBus2.on("OBR_TOOL_MODE_EVENT_CLICK", this.handleToolModeClick);
    messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_CLICK", this.handleToolModeToolClick);
    messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_DOUBLE_CLICK", this.handleToolModeToolDoubleClick);
    messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_DOWN", this.handleToolModeToolDown);
    messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_MOVE", this.handleToolModeToolMove);
    messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_UP", this.handleToolModeToolUp);
    messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_START", this.handleToolModeToolDragStart);
    messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_MOVE", this.handleToolModeToolDragMove);
    messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_END", this.handleToolModeToolDragEnd);
    messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_CANCEL", this.handleToolModeToolDragCancel);
    messageBus2.on("OBR_TOOL_MODE_EVENT_KEY_DOWN", this.handleToolModeKeyDown);
    messageBus2.on("OBR_TOOL_MODE_EVENT_KEY_UP", this.handleToolModeKeyUp);
    messageBus2.on("OBR_TOOL_MODE_EVENT_ACTIVATE", this.handleToolModeActivate);
    messageBus2.on("OBR_TOOL_MODE_EVENT_DEACTIVATE", this.handleToolModeDeactivate);
  }
  create(tool) {
    return __awaiter11(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_CREATE", {
        id: tool.id,
        shortcut: tool.shortcut,
        defaultMode: tool.defaultMode,
        defaultMetadata: tool.defaultMetadata,
        icons: normalizeIconPaths(tool.icons),
        disabled: tool.disabled
      });
      this.tools[tool.id] = tool;
    });
  }
  remove(id) {
    return __awaiter11(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_REMOVE", { id });
      delete this.tools[id];
    });
  }
  activateTool(id) {
    return __awaiter11(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_ACTIVATE", { id });
    });
  }
  getActiveTool() {
    return __awaiter11(this, void 0, void 0, function* () {
      const { id } = yield this.messageBus.sendAsync("OBR_TOOL_GET_ACTIVE", {});
      return id;
    });
  }
  onToolChange(callback) {
    const handleChange = (data) => {
      callback(data.id);
    };
    this.messageBus.send("OBR_TOOL_ACTIVE_SUBSCRIBE", {});
    this.messageBus.on("OBR_TOOL_ACTIVE_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_TOOL_ACTIVE_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_TOOL_ACTIVE_EVENT_CHANGE", handleChange);
    };
  }
  getMetadata(id) {
    return __awaiter11(this, void 0, void 0, function* () {
      const { metadata } = yield this.messageBus.sendAsync("OBR_TOOL_GET_METADATA", { id });
      return metadata;
    });
  }
  setMetadata(toolId, update2) {
    return __awaiter11(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_SET_METADATA", {
        toolId,
        update: update2
      });
    });
  }
  createAction(action) {
    return __awaiter11(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_ACTION_CREATE", {
        id: action.id,
        shortcut: action.shortcut,
        icons: normalizeIconPaths(action.icons),
        disabled: action.disabled
      });
      this.toolActions[action.id] = action;
    });
  }
  removeAction(id) {
    return __awaiter11(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_ACTION_REMOVE", { id });
      delete this.tools[id];
    });
  }
  createMode(mode) {
    return __awaiter11(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_MODE_CREATE", {
        id: mode.id,
        shortcut: mode.shortcut,
        icons: normalizeIconPaths(mode.icons),
        preventDrag: mode.preventDrag,
        disabled: mode.disabled,
        cursors: mode.cursors
      });
      this.toolModes[mode.id] = mode;
    });
  }
  removeMode(id) {
    return __awaiter11(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_MODE_REMOVE", { id });
      delete this.tools[id];
    });
  }
  activateMode(toolId, modeId) {
    return __awaiter11(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_TOOL_MODE_ACTIVATE", {
        toolId,
        modeId
      });
    });
  }
  getActiveToolMode() {
    return __awaiter11(this, void 0, void 0, function* () {
      const { id } = yield this.messageBus.sendAsync("OBR_TOOL_MODE_GET_ACTIVE", {});
      return id;
    });
  }
  onToolModeChange(callback) {
    const handleChange = (data) => {
      callback(data.id);
    };
    this.messageBus.send("OBR_TOOL_MODE_ACTIVE_SUBSCRIBE", {});
    this.messageBus.on("OBR_TOOL_MODE_ACTIVE_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_TOOL_MODE_ACTIVE_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_TOOL_MODE_ACTIVE_EVENT_CHANGE", handleChange);
    };
  }
};
var ToolApi_default = ToolApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/PopoverApi.js
var __awaiter12 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var PopoverApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  open(popover) {
    return __awaiter12(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_POPOVER_OPEN", Object.assign({}, normalizeUrlObject(popover)));
    });
  }
  close(id) {
    return __awaiter12(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_POPOVER_CLOSE", { id });
    });
  }
  getWidth(id) {
    return __awaiter12(this, void 0, void 0, function* () {
      const { width } = yield this.messageBus.sendAsync("OBR_POPOVER_GET_WIDTH", { id });
      return width;
    });
  }
  setWidth(id, width) {
    return __awaiter12(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_POPOVER_SET_WIDTH", { id, width });
    });
  }
  getHeight(id) {
    return __awaiter12(this, void 0, void 0, function* () {
      const { height } = yield this.messageBus.sendAsync("OBR_POPOVER_GET_HEIGHT", { id });
      return height;
    });
  }
  setHeight(id, height) {
    return __awaiter12(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_POPOVER_SET_HEIGHT", { id, height });
    });
  }
};
var PopoverApi_default = PopoverApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/ModalApi.js
var __awaiter13 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var ModalApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  open(modal) {
    return __awaiter13(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_MODAL_OPEN", Object.assign({}, normalizeUrlObject(modal)));
    });
  }
  close(id) {
    return __awaiter13(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_MODAL_CLOSE", { id });
    });
  }
};
var ModalApi_default = ModalApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/ActionApi.js
var __awaiter14 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var ActionApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  getWidth() {
    return __awaiter14(this, void 0, void 0, function* () {
      const { width } = yield this.messageBus.sendAsync("OBR_ACTION_GET_WIDTH", {});
      return width;
    });
  }
  setWidth(width) {
    return __awaiter14(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_WIDTH", { width });
    });
  }
  getHeight() {
    return __awaiter14(this, void 0, void 0, function* () {
      const { height } = yield this.messageBus.sendAsync("OBR_ACTION_GET_HEIGHT", {});
      return height;
    });
  }
  setHeight(height) {
    return __awaiter14(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_HEIGHT", { height });
    });
  }
  getBadgeText() {
    return __awaiter14(this, void 0, void 0, function* () {
      const { badgeText } = yield this.messageBus.sendAsync("OBR_ACTION_GET_BADGE_TEXT", {});
      return badgeText;
    });
  }
  setBadgeText(badgeText) {
    return __awaiter14(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_BADGE_TEXT", { badgeText });
    });
  }
  getBadgeBackgroundColor() {
    return __awaiter14(this, void 0, void 0, function* () {
      const { badgeBackgroundColor } = yield this.messageBus.sendAsync("OBR_ACTION_GET_BADGE_BACKGROUND_COLOR", {});
      return badgeBackgroundColor;
    });
  }
  setBadgeBackgroundColor(badgeBackgroundColor) {
    return __awaiter14(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_BADGE_BACKGROUND_COLOR", {
        badgeBackgroundColor
      });
    });
  }
  getIcon() {
    return __awaiter14(this, void 0, void 0, function* () {
      const { icon: icon2 } = yield this.messageBus.sendAsync("OBR_ACTION_GET_ICON", {});
      return icon2;
    });
  }
  setIcon(icon2) {
    return __awaiter14(this, void 0, void 0, function* () {
      const data = normalizeIconPaths([{ icon: icon2 }]);
      yield this.messageBus.sendAsync("OBR_ACTION_SET_ICON", {
        icon: data[0].icon
      });
    });
  }
  getTitle() {
    return __awaiter14(this, void 0, void 0, function* () {
      const { title } = yield this.messageBus.sendAsync("OBR_ACTION_GET_TITLE", {});
      return title;
    });
  }
  setTitle(title) {
    return __awaiter14(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ACTION_SET_TITLE", { title });
    });
  }
  isOpen() {
    return __awaiter14(this, void 0, void 0, function* () {
      const { isOpen } = yield this.messageBus.sendAsync("OBR_ACTION_GET_IS_OPEN", {});
      return isOpen;
    });
  }
  open() {
    return __awaiter14(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ACTION_OPEN", {});
    });
  }
  close() {
    return __awaiter14(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ACTION_CLOSE", {});
    });
  }
  onOpenChange(callback) {
    const handleChange = (data) => {
      callback(data.isOpen);
    };
    this.messageBus.send("OBR_ACTION_IS_OPEN_SUBSCRIBE", {});
    this.messageBus.on("OBR_ACTION_IS_OPEN_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_IS_OPEN_ACTION_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_ACTION_IS_OPEN_EVENT_CHANGE", handleChange);
    };
  }
};
var ActionApi_default = ActionApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/InteractionApi.js
var __awaiter15 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
enablePatches();
var InteractionApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  startItemInteraction(baseState) {
    return __awaiter15(this, void 0, void 0, function* () {
      const { id } = yield this.messageBus.sendAsync("OBR_INTERACTION_START_ITEM_INTERACTION", { baseState });
      let prev = baseState;
      const dispatcher = (update2) => {
        const [next, patches] = produceWithPatches(prev, update2);
        prev = next;
        this.messageBus.send("OBR_INTERACTION_UPDATE_ITEM_INTERACTION", {
          id,
          patches
        });
        return next;
      };
      const stop = () => {
        this.messageBus.send("OBR_INTERACTION_STOP_ITEM_INTERACTION", { id });
      };
      return [dispatcher, stop];
    });
  }
};
var InteractionApi_default = InteractionApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/PartyApi.js
var __awaiter16 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var PartyApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  getPlayers() {
    return __awaiter16(this, void 0, void 0, function* () {
      const { players } = yield this.messageBus.sendAsync("OBR_PARTY_GET_PLAYERS", {});
      return players;
    });
  }
  onChange(callback) {
    const handleChange = (data) => {
      callback(data.players);
    };
    this.messageBus.send("OBR_PARTY_SUBSCRIBE", {});
    this.messageBus.on("OBR_PARTY_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_PARTY_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_PARTY_EVENT_CHANGE", handleChange);
    };
  }
};
var PartyApi_default = PartyApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/RoomApi.js
var __awaiter17 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var RoomApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  get id() {
    return this.messageBus.roomId;
  }
  getPermissions() {
    return __awaiter17(this, void 0, void 0, function* () {
      const { permissions } = yield this.messageBus.sendAsync("OBR_ROOM_GET_PERMISSIONS", {});
      return permissions;
    });
  }
  getMetadata() {
    return __awaiter17(this, void 0, void 0, function* () {
      const { metadata } = yield this.messageBus.sendAsync("OBR_ROOM_GET_METADATA", {});
      return metadata;
    });
  }
  setMetadata(update2) {
    return __awaiter17(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ROOM_SET_METADATA", { update: update2 });
    });
  }
  onMetadataChange(callback) {
    const handleChange = (data) => {
      callback(data.metadata);
    };
    this.messageBus.send("OBR_ROOM_METADATA_SUBSCRIBE", {});
    this.messageBus.on("OBR_ROOM_METADATA_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_METADATA_ROOM_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_ROOM_METADATA_EVENT_CHANGE", handleChange);
    };
  }
  onPermissionsChange(callback) {
    const handleChange = (data) => {
      callback(data.permissions);
    };
    this.messageBus.send("OBR_ROOM_PERMISSIONS_SUBSCRIBE", {});
    this.messageBus.on("OBR_ROOM_PERMISSIONS_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_PERMISSIONS_ROOM_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_ROOM_PERMISSIONS_EVENT_CHANGE", handleChange);
    };
  }
};
var RoomApi_default = RoomApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/ThemeApi.js
var __awaiter18 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var ThemeApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  getTheme() {
    return __awaiter18(this, void 0, void 0, function* () {
      const { theme } = yield this.messageBus.sendAsync("OBR_THEME_GET_THEME", {});
      return theme;
    });
  }
  onChange(callback) {
    const handleChange = (data) => {
      callback(data.theme);
    };
    this.messageBus.send("OBR_THEME_SUBSCRIBE", {});
    this.messageBus.on("OBR_THEME_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_THEME_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_THEME_EVENT_CHANGE", handleChange);
    };
  }
};
var ThemeApi_default = ThemeApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/AssetsApi.js
var __awaiter19 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var AssetsApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  uploadImages(images, typeHint) {
    return __awaiter19(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ASSETS_UPLOAD_IMAGES", {
        images,
        typeHint
      });
    });
  }
  uploadScenes(scenes, disableShowScenes) {
    return __awaiter19(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_ASSETS_UPLOAD_SCENES", {
        scenes,
        disableShowScenes
      });
    });
  }
  downloadImages(multiple, defaultSearch, typeHint) {
    return __awaiter19(this, void 0, void 0, function* () {
      const { images } = yield this.messageBus.sendAsync("OBR_ASSETS_DOWNLOAD_IMAGES", { multiple, defaultSearch, typeHint }, -1);
      return images;
    });
  }
  downloadScenes(multiple, defaultSearch) {
    return __awaiter19(this, void 0, void 0, function* () {
      const { scenes } = yield this.messageBus.sendAsync("OBR_ASSETS_DOWNLOAD_SCENES", { multiple, defaultSearch }, -1);
      return scenes;
    });
  }
};
var AssetsApi_default = AssetsApi;

// node_modules/@owlbear-rodeo/sdk/lib/api/BroadcastApi.js
var __awaiter20 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var BroadcastApi = class {
  constructor(messageBus2) {
    this.messageBus = messageBus2;
  }
  sendMessage(channel, data, options) {
    return __awaiter20(this, void 0, void 0, function* () {
      yield this.messageBus.sendAsync("OBR_BROADCAST_SEND_MESSAGE", {
        channel,
        data,
        options
      });
    });
  }
  onMessage(channel, callback) {
    this.messageBus.send("OBR_BROADCAST_SUBSCRIBE", { channel });
    this.messageBus.on(`OBR_BROADCAST_MESSAGE_${channel}`, callback);
    return () => {
      this.messageBus.send("OBR_BROADCAST_UNSUBSCRIBE", { channel });
      this.messageBus.off(`OBR_BROADCAST_MESSAGE_${channel}`, callback);
    };
  }
};
var BroadcastApi_default = BroadcastApi;

// node_modules/@owlbear-rodeo/sdk/lib/builders/GenericItemBuilder.js
var GenericItemBuilder = class {
  constructor(player) {
    this._item = {
      createdUserId: player.id,
      id: v4_default(),
      name: "Item",
      zIndex: Date.now(),
      lastModified: (/* @__PURE__ */ new Date()).toISOString(),
      lastModifiedUserId: player.id,
      locked: false,
      metadata: {},
      position: { x: 0, y: 0 },
      rotation: 0,
      scale: { x: 1, y: 1 },
      type: "ITEM",
      visible: true,
      layer: "POPOVER"
    };
  }
  createdUserId(createdUserId) {
    this._item.createdUserId = createdUserId;
    return this.self();
  }
  id(id) {
    this._item.id = id;
    return this.self();
  }
  name(name) {
    this._item.name = name;
    return this.self();
  }
  description(description) {
    this._item.description = description;
    return this.self();
  }
  lastModified(lastModified) {
    this._item.lastModified = lastModified;
    return this.self();
  }
  zIndex(zIndex) {
    this._item.zIndex = zIndex;
    return this.self();
  }
  lastModifiedUserId(lastModifiedUserId) {
    this._item.lastModifiedUserId = lastModifiedUserId;
    return this.self();
  }
  locked(locked) {
    this._item.locked = locked;
    return this.self();
  }
  metadata(metadata) {
    this._item.metadata = metadata;
    return this.self();
  }
  position(position) {
    this._item.position = position;
    return this.self();
  }
  rotation(rotation) {
    this._item.rotation = rotation;
    return this.self();
  }
  scale(scale) {
    this._item.scale = scale;
    return this.self();
  }
  visible(visible) {
    this._item.visible = visible;
    return this.self();
  }
  attachedTo(attachedTo) {
    this._item.attachedTo = attachedTo;
    return this.self();
  }
  layer(layer) {
    this._item.layer = layer;
    return this.self();
  }
  disableHit(disable) {
    this._item.disableHit = disable;
    return this.self();
  }
  disableAutoZIndex(disable) {
    this._item.disableAutoZIndex = disable;
    return this.self();
  }
  disableAttachmentBehavior(disable) {
    this._item.disableAttachmentBehavior = disable;
    return this.self();
  }
  self() {
    return this;
  }
};

// node_modules/@owlbear-rodeo/sdk/lib/builders/CurveBuilder.js
var CurveBuilder = class extends GenericItemBuilder {
  constructor(player) {
    super(player);
    this._points = [];
    this._style = {
      fillColor: "black",
      fillOpacity: 1,
      strokeColor: "white",
      strokeOpacity: 1,
      strokeWidth: 5,
      strokeDash: [],
      tension: 0.5
    };
    this._item.name = "Curve";
    this._item.layer = "DRAWING";
  }
  points(points) {
    this._points = points;
    return this.self();
  }
  style(style) {
    this._style = style;
    return this.self();
  }
  fillColor(fillColor) {
    this._style.fillColor = fillColor;
    return this.self();
  }
  fillOpacity(fillOpacity) {
    this._style.fillOpacity = fillOpacity;
    return this.self();
  }
  strokeColor(strokeColor) {
    this._style.strokeColor = strokeColor;
    return this.self();
  }
  strokeOpacity(strokeOpacity) {
    this._style.strokeOpacity = strokeOpacity;
    return this.self();
  }
  strokeWidth(strokeWidth) {
    this._style.strokeWidth = strokeWidth;
    return this.self();
  }
  strokeDash(strokeDash) {
    this._style.strokeDash = strokeDash;
    return this.self();
  }
  tension(tension) {
    this._style.tension = tension;
    return this.self();
  }
  closed(closed) {
    this._style.closed = closed;
    return this.self();
  }
  build() {
    return Object.assign(Object.assign({}, this._item), { type: "CURVE", points: this._points, style: this._style });
  }
};

// node_modules/@owlbear-rodeo/sdk/lib/builders/ImageBuilder.js
var ImageBuilder = class extends GenericItemBuilder {
  constructor(player, image, grid) {
    super(player);
    this._image = image;
    this._grid = grid;
    this._item.name = "Image";
    this._text = {
      richText: [
        {
          type: "paragraph",
          children: [{ text: "" }]
        }
      ],
      plainText: "",
      style: {
        padding: 8,
        fontFamily: "Roboto",
        fontSize: 24,
        fontWeight: 400,
        textAlign: "CENTER",
        textAlignVertical: "BOTTOM",
        fillColor: "white",
        fillOpacity: 1,
        strokeColor: "white",
        strokeOpacity: 1,
        strokeWidth: 0,
        lineHeight: 1.5
      },
      type: "PLAIN",
      width: "AUTO",
      height: "AUTO"
    };
    this._textItemType = "LABEL";
  }
  text(text) {
    this._text = text;
    return this.self();
  }
  textItemType(textItemType) {
    this._textItemType = textItemType;
    return this.self();
  }
  textWidth(width) {
    this._text.width = width;
    return this.self();
  }
  textHeight(height) {
    this._text.height = height;
    return this.self();
  }
  richText(richText) {
    this._text.richText = richText;
    return this.self();
  }
  plainText(plainText) {
    this._text.plainText = plainText;
    return this.self();
  }
  textType(textType) {
    this._text.type = textType;
    return this.self();
  }
  textPadding(padding) {
    this._text.style.padding = padding;
    return this.self();
  }
  fontFamily(fontFamily) {
    this._text.style.fontFamily = fontFamily;
    return this.self();
  }
  fontSize(fontSize) {
    this._text.style.fontSize = fontSize;
    return this.self();
  }
  fontWeight(fontWeight) {
    this._text.style.fontWeight = fontWeight;
    return this.self();
  }
  textAlign(textAlign) {
    this._text.style.textAlign = textAlign;
    return this.self();
  }
  textAlignVertical(textAlignVertical) {
    this._text.style.textAlignVertical = textAlignVertical;
    return this.self();
  }
  textFillColor(fillColor) {
    this._text.style.fillColor = fillColor;
    return this.self();
  }
  textFillOpacity(fillOpacity) {
    this._text.style.fillOpacity = fillOpacity;
    return this.self();
  }
  textStrokeColor(strokeColor) {
    this._text.style.strokeColor = strokeColor;
    return this.self();
  }
  textStrokeOpacity(strokeOpacity) {
    this._text.style.strokeOpacity = strokeOpacity;
    return this.self();
  }
  textStrokeWidth(strokeWidth) {
    this._text.style.strokeWidth = strokeWidth;
    return this.self();
  }
  textLineHeight(lineHeight) {
    this._text.style.lineHeight = lineHeight;
    return this.self();
  }
  build() {
    return Object.assign(Object.assign({}, this._item), { type: "IMAGE", image: this._image, grid: this._grid, text: this._text, textItemType: this._textItemType });
  }
};

// node_modules/@owlbear-rodeo/sdk/lib/builders/LabelBuilder.js
var LabelBuilder = class extends GenericItemBuilder {
  constructor(player) {
    super(player);
    this._text = {
      richText: [
        {
          type: "paragraph",
          children: [{ text: "" }]
        }
      ],
      plainText: "",
      style: {
        padding: 8,
        fontFamily: "Roboto",
        fontSize: 16,
        fontWeight: 400,
        textAlign: "CENTER",
        textAlignVertical: "MIDDLE",
        fillColor: "white",
        fillOpacity: 1,
        strokeColor: "white",
        strokeOpacity: 1,
        strokeWidth: 0,
        lineHeight: 1.5
      },
      type: "PLAIN",
      width: "AUTO",
      height: "AUTO"
    };
    this._style = {
      backgroundColor: "#3D4051",
      backgroundOpacity: 1,
      cornerRadius: 8,
      pointerDirection: "DOWN",
      pointerWidth: 4,
      pointerHeight: 4
    };
    this._item.layer = "TEXT";
    this._item.name = "Label";
  }
  text(text) {
    this._text = text;
    return this.self();
  }
  width(width) {
    this._text.width = width;
    return this.self();
  }
  height(height) {
    this._text.height = height;
    return this.self();
  }
  plainText(plainText) {
    this._text.plainText = plainText;
    return this.self();
  }
  padding(padding) {
    this._text.style.padding = padding;
    return this.self();
  }
  fontFamily(fontFamily) {
    this._text.style.fontFamily = fontFamily;
    return this.self();
  }
  fontSize(fontSize) {
    this._text.style.fontSize = fontSize;
    return this.self();
  }
  fontWeight(fontWeight) {
    this._text.style.fontWeight = fontWeight;
    return this.self();
  }
  textAlign(textAlign) {
    this._text.style.textAlign = textAlign;
    return this.self();
  }
  textAlignVertical(textAlignVertical) {
    this._text.style.textAlignVertical = textAlignVertical;
    return this.self();
  }
  fillColor(fillColor) {
    this._text.style.fillColor = fillColor;
    return this.self();
  }
  fillOpacity(fillOpacity) {
    this._text.style.fillOpacity = fillOpacity;
    return this.self();
  }
  strokeColor(strokeColor) {
    this._text.style.strokeColor = strokeColor;
    return this.self();
  }
  strokeOpacity(strokeOpacity) {
    this._text.style.strokeOpacity = strokeOpacity;
    return this.self();
  }
  strokeWidth(strokeWidth) {
    this._text.style.strokeWidth = strokeWidth;
    return this.self();
  }
  lineHeight(lineHeight) {
    this._text.style.lineHeight = lineHeight;
    return this.self();
  }
  style(style) {
    this._style = style;
    return this.self();
  }
  backgroundColor(backgroundColor) {
    this._style.backgroundColor = backgroundColor;
    return this.self();
  }
  backgroundOpacity(backgroundOpacity) {
    this._style.backgroundOpacity = backgroundOpacity;
    return this.self();
  }
  cornerRadius(cornerRadius) {
    this._style.cornerRadius = cornerRadius;
    return this.self();
  }
  pointerWidth(pointerWidth) {
    this._style.pointerWidth = pointerWidth;
    return this.self();
  }
  pointerHeight(pointerHeight) {
    this._style.pointerHeight = pointerHeight;
    return this.self();
  }
  pointerDirection(pointerDirection) {
    this._style.pointerDirection = pointerDirection;
    return this.self();
  }
  maxViewScale(maxViewScale) {
    this._style.maxViewScale = maxViewScale;
    return this.self();
  }
  minViewScale(minViewScale) {
    this._style.minViewScale = minViewScale;
    return this.self();
  }
  build() {
    return Object.assign(Object.assign({}, this._item), { type: "LABEL", text: this._text, style: this._style });
  }
};

// node_modules/@owlbear-rodeo/sdk/lib/builders/ShapeBuilder.js
var ShapeBuilder = class extends GenericItemBuilder {
  constructor(player) {
    super(player);
    this._width = 0;
    this._height = 0;
    this._shapeType = "RECTANGLE";
    this._style = {
      fillColor: "black",
      fillOpacity: 1,
      strokeColor: "white",
      strokeOpacity: 1,
      strokeWidth: 5,
      strokeDash: []
    };
    this._item.layer = "DRAWING";
    this._item.name = "Shape";
  }
  width(width) {
    this._width = width;
    return this.self();
  }
  height(height) {
    this._height = height;
    return this.self();
  }
  shapeType(shapeType) {
    this._shapeType = shapeType;
    return this.self();
  }
  style(style) {
    this._style = style;
    return this.self();
  }
  fillColor(fillColor) {
    this._style.fillColor = fillColor;
    return this.self();
  }
  fillOpacity(fillOpacity) {
    this._style.fillOpacity = fillOpacity;
    return this.self();
  }
  strokeColor(strokeColor) {
    this._style.strokeColor = strokeColor;
    return this.self();
  }
  strokeOpacity(strokeOpacity) {
    this._style.strokeOpacity = strokeOpacity;
    return this.self();
  }
  strokeWidth(strokeWidth) {
    this._style.strokeWidth = strokeWidth;
    return this.self();
  }
  strokeDash(strokeDash) {
    this._style.strokeDash = strokeDash;
    return this.self();
  }
  build() {
    return Object.assign(Object.assign({}, this._item), { type: "SHAPE", width: this._width, height: this._height, shapeType: this._shapeType, style: this._style });
  }
};

// node_modules/js-base64/base64.mjs
var _TD = typeof TextDecoder === "function" ? new TextDecoder("utf-8", { ignoreBOM: true }) : void 0;
var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64chs = Array.prototype.slice.call(b64ch);
var b64tab = ((a) => {
  let tab = {};
  a.forEach((c, i) => tab[c] = i);
  return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
var _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, "");
var btoaPolyfill = (bin) => {
  let u32, c0, c1, c2, asc = "";
  const pad = bin.length % 3;
  for (let i = 0; i < bin.length; ) {
    if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255)
      throw new TypeError("invalid character found");
    u32 = c0 << 16 | c1 << 8 | c2;
    asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
  }
  return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
var _btoa = typeof btoa === "function" ? (bin) => btoa(bin) : btoaPolyfill;
var _fromUint8Array = typeof Uint8Array.prototype.toBase64 === "function" ? (u8a) => u8a.toBase64() : (u8a) => {
  const maxargs = 4096;
  let strs = [];
  for (let i = 0, l = u8a.length; i < l; i += maxargs) {
    strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
  }
  return _btoa(strs.join(""));
};
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = (cccc) => {
  switch (cccc.length) {
    case 4:
      var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
      return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
    case 3:
      return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
    default:
      return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
  }
};
var btou = (b) => b.replace(re_btou, cb_btou);
var atobPolyfill = (asc) => {
  asc = asc.replace(/\s+/g, "");
  if (!b64re.test(asc))
    throw new TypeError("malformed base64.");
  asc += "==".slice(2 - (asc.length & 3));
  let u24, r1, r2;
  let binArray = [];
  for (let i = 0; i < asc.length; ) {
    u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
    if (r1 === 64) {
      binArray.push(_fromCC(u24 >> 16 & 255));
    } else if (r2 === 64) {
      binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255));
    } else {
      binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255));
    }
  }
  return binArray.join("");
};
var _atob = typeof atob === "function" ? (asc) => atob(_tidyB64(asc)) : atobPolyfill;
var _toUint8Array = typeof Uint8Array.fromBase64 === "function" ? (a) => Uint8Array.fromBase64(a) : (a) => _U8Afrom(_atob(a).split("").map((c) => c.charCodeAt(0)));
var _decode = _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
var _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
var decode = (src) => _decode(_unURI(src));

// node_modules/@owlbear-rodeo/sdk/lib/common/getDetails.js
function getDetails() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const ref = urlSearchParams.get("obrref");
  let origin = "";
  let roomId = "";
  if (ref) {
    const decodedRef = decode(ref);
    const parts = decodedRef.split(" ");
    if (parts.length === 2) {
      origin = parts[0];
      roomId = parts[1];
    }
  }
  return { origin, roomId };
}

// node_modules/@owlbear-rodeo/sdk/lib/builders/EffectBuilder.js
var EffectBuilder = class extends GenericItemBuilder {
  constructor(player) {
    super(player);
    this._item.name = "Effect";
    this._width = 0;
    this._height = 0;
    this._sksl = "";
    this._effectType = "VIEWPORT";
    this._uniforms = [];
    this._blendMode = "SRC_OVER";
  }
  width(width) {
    this._width = width;
    return this.self();
  }
  height(height) {
    this._height = height;
    return this.self();
  }
  sksl(sksl) {
    this._sksl = sksl;
    return this.self();
  }
  effectType(effectType) {
    this._effectType = effectType;
    return this.self();
  }
  uniforms(uniforms2) {
    this._uniforms = uniforms2;
    return this.self();
  }
  blendMode(blendMode) {
    this._blendMode = blendMode;
    return this.self();
  }
  build() {
    return Object.assign(Object.assign({}, this._item), { type: "EFFECT", width: this._width, height: this._height, sksl: this._sksl, effectType: this._effectType, uniforms: this._uniforms, blendMode: this._blendMode });
  }
};

// node_modules/@owlbear-rodeo/sdk/lib/types/items/Path.js
var Command;
(function(Command2) {
  Command2[Command2["MOVE"] = 0] = "MOVE";
  Command2[Command2["LINE"] = 1] = "LINE";
  Command2[Command2["QUAD"] = 2] = "QUAD";
  Command2[Command2["CONIC"] = 3] = "CONIC";
  Command2[Command2["CUBIC"] = 4] = "CUBIC";
  Command2[Command2["CLOSE"] = 5] = "CLOSE";
})(Command || (Command = {}));

// node_modules/@owlbear-rodeo/sdk/lib/index.js
var details = getDetails();
var messageBus = new MessageBus_default(details.origin, details.roomId);
var viewportApi = new ViewportApi_default(messageBus);
var playerApi = new PlayerApi_default(messageBus);
var partyApi = new PartyApi_default(messageBus);
var notificationApi = new NotificationApi_default(messageBus);
var sceneApi = new SceneApi_default(messageBus);
var contextMenuApi = new ContextMenuApi_default(messageBus);
var toolApi = new ToolApi_default(messageBus);
var popoverApi = new PopoverApi_default(messageBus);
var modalApi = new ModalApi_default(messageBus);
var actionApi = new ActionApi_default(messageBus);
var interactionApi = new InteractionApi_default(messageBus);
var roomApi = new RoomApi_default(messageBus);
var themeApi = new ThemeApi_default(messageBus);
var assetsApi = new AssetsApi_default(messageBus);
var broadcastApi = new BroadcastApi_default(messageBus);
var OBR = {
  onReady: (callback) => {
    if (messageBus.ready) {
      callback();
    } else {
      messageBus.once("OBR_READY", () => callback());
    }
  },
  get isReady() {
    return messageBus.ready;
  },
  viewport: viewportApi,
  player: playerApi,
  party: partyApi,
  notification: notificationApi,
  scene: sceneApi,
  contextMenu: contextMenuApi,
  tool: toolApi,
  popover: popoverApi,
  modal: modalApi,
  action: actionApi,
  interaction: interactionApi,
  room: roomApi,
  theme: themeApi,
  assets: assetsApi,
  broadcast: broadcastApi,
  /** True if the current site is embedded in an instance of Owlbear Rodeo */
  isAvailable: Boolean(details.origin)
};
function buildCurve() {
  return new CurveBuilder(playerApi);
}
function buildEffect() {
  return new EffectBuilder(playerApi);
}
function buildImage(image, grid) {
  return new ImageBuilder(playerApi, image, grid);
}
function buildLabel() {
  return new LabelBuilder(playerApi);
}
function buildShape() {
  return new ShapeBuilder(playerApi);
}
var lib_default = OBR;

// src/obr/protocol.js
var EXT = "com.encounter-builder";
var TRACKER_KEY = `${EXT}/tracker`;
var SETTINGS_KEY = `${EXT}/settings`;
var EFFECTS = `${EXT}/effects`;
var ZONE_KEY = `${EXT}/zone`;
var LOCAL_FX = `${EXT}/spell-fx-pref`;
var ZONE_PICK = `${EXT}/zone-pick`;
var LOCAL_COMMAND = `${EXT}/command`;
var LOCAL_STATUS = `${EXT}/status`;
var LOCAL_ASK = `${EXT}/status?`;
var LOCAL_PLAYER_ASK = `${EXT}/player-ask-local`;
var PLAYER_ASK = `${EXT}/player-ask`;
var PLAYER_ANSWER = `${EXT}/player-answer`;
var INIT_MODAL = `${EXT}/initiative`;
var WHISPER = `${EXT}/whisper`;
var WHISPER_ACK = `${EXT}/whisper-ack`;
var WHISPER_REPLY = `${EXT}/whisper-reply`;
var CHAT_UPDATED = `${EXT}/chat-updated`;
var MESSAGE_MODAL = `${EXT}/message`;
var chatKey = (thread) => `kem-chat:${thread}`;

// src/obr/turn-die.js
var KEY = `${EXT}/turn-die`;
var SIZE = 1.55;
var PULSE = { mid: 1.04, depth: 0.08, seconds: 3.2 };
var SPIN_SECONDS = 60;
var FRAME_MS = 66;
var picture = (name) => ({ url: new URL(name, location.href).href, width: 512, height: 512, mime: "image/png" });
var role = "PLAYER";
var state = null;
var settings = {};
var drawn = { sig: "", glows: [], dice: [] };
var busy = false;
var again = false;
function wanted() {
  if (settings.showTurnDie === false || state?.phase !== "active") return { ids: [], red: false };
  const row = state.order?.find((r) => r.key === state.turn);
  return { ids: row?.tokens || [], red: row?.kind !== "pc" };
}
async function sync() {
  if (busy) {
    again = true;
    return;
  }
  busy = true;
  try {
    do {
      again = false;
      await draw();
    } while (again);
  } catch (err) {
    console.error("Encounter Builder: could not draw the turn indicator", err);
  } finally {
    busy = false;
  }
}
async function draw() {
  const ready2 = await lib_default.scene.isReady();
  const { ids, red } = ready2 ? wanted() : { ids: [], red: false };
  const tokens = ids.length ? (await lib_default.scene.items.getItems(ids)).filter((t) => role === "GM" || t.visible) : [];
  const sig = JSON.stringify([red, tokens.map((t) => [t.id, t.scale.x, t.scale.y])]);
  if (sig === drawn.sig) return;
  const old = ready2 ? (await lib_default.scene.local.getItems((i) => !!i.metadata?.[KEY])).map((i) => i.id) : [];
  if (old.length) await lib_default.scene.local.deleteItems(old);
  drawn = { sig, glows: [], dice: [] };
  if (!tokens.length) return;
  const dpi = await lib_default.scene.grid.getDpi();
  const add = [];
  for (const t of tokens) {
    const b = await lib_default.scene.items.getItemBounds([t.id]);
    const base = Math.max(b.width, b.height) * SIZE / dpi;
    const item = (name, kind, z) => buildImage(picture(name), { dpi: 512, offset: { x: 256, y: 256 } }).position(b.center).scale({ x: base, y: base }).attachedTo(t.id).layer("PROP").zIndex(z).locked(true).disableHit(true).disableAttachmentBehavior(["COPY", "ROTATION", "SCALE"]).name("Turn indicator").metadata({ [KEY]: { kind } }).build();
    const tint = red ? "-red" : "";
    const glow = item(`turn-glow${tint}.png`, "glow", 0), die2 = item(`turn-d20${tint}.png`, "die", 1);
    add.push(glow, die2);
    drawn.glows.push({ id: glow.id, base });
    drawn.dice.push(die2.id);
  }
  await lib_default.scene.local.addItems(add);
}
var animating = false;
setInterval(async () => {
  if (animating || !drawn.glows.length || document.hidden) return;
  animating = true;
  const now = performance.now() / 1e3;
  const s = PULSE.mid + PULSE.depth * Math.sin(2 * Math.PI * now / PULSE.seconds);
  const turn = now / SPIN_SECONDS * 360 % 360;
  const base = new Map(drawn.glows.map((g) => [g.id, g.base]));
  try {
    await lib_default.scene.local.updateItems([...base.keys(), ...drawn.dice], (items) => {
      for (const it of items) {
        it.rotation = turn;
        if (base.has(it.id)) {
          const k = base.get(it.id) * s;
          it.scale = { x: k, y: k };
        }
      }
    }, true);
  } catch {
  }
  animating = false;
}, FRAME_MS);
async function startTurnDie() {
  role = await lib_default.player.getRole();
  lib_default.player.onChange((p) => {
    if (p.role !== role) {
      role = p.role;
      drawn.sig = "";
      sync();
    }
  });
  const md = await lib_default.room.getMetadata();
  state = md[TRACKER_KEY] || null;
  settings = md[SETTINGS_KEY] || {};
  lib_default.room.onMetadataChange((m) => {
    state = m[TRACKER_KEY] || null;
    settings = m[SETTINGS_KEY] || {};
    sync();
  });
  lib_default.scene.onReadyChange(() => {
    drawn.sig = "";
    sync();
  });
  let timer = null;
  lib_default.scene.items.onChange(() => {
    clearTimeout(timer);
    timer = setTimeout(sync, 200);
  });
  sync();
}

// src/obr/movement-math.js
function trailDots(points, segments, { step = 5, speed = null } = {}) {
  const dots = [];
  if (!points.length) return { dots, used: 0, over: false };
  dots.push({ ...points[0], start: true });
  let used = 0;
  for (let i = 0; i < segments.length && i + 1 < points.length; i++) {
    const a = points[i], b = points[i + 1], ft = Math.max(0, segments[i]);
    const n = Math.round(ft / step);
    for (let k = 1; k <= n; k++) {
      const t = k / n;
      const at = used + k * step;
      dots.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, over: speed != null && at > speed });
    }
    used += ft;
  }
  return { dots, used, over: speed != null && used > speed };
}
var feet = (squares2, perSquare) => Math.round(squares2 * perSquare * 10) / 10;
function usedText(used, speed, unit = "ft") {
  const u = Math.round(used * 10) / 10;
  if (speed == null) return `${u} ${unit}`;
  return `${u} / ${speed} ${unit}${u > speed ? ` (${Math.round((u - speed) * 10) / 10} over)` : ""}`;
}
var samePoint = (a, b) => !!a && !!b && Math.abs(a.x - b.x) < 0.5 && Math.abs(a.y - b.y) < 0.5;

// src/obr/movement.js
var MOVE_KEY = `${EXT}/move`;
var TRAIL_KEY = `${EXT}/trail`;
var RESET = `${EXT}/reset-movement`;
var NOTE = `${EXT}/movement-note`;
var MENU = `${EXT}/reset-movement-menu`;
var GREEN = "#3fd16f";
var RED = "#ff5a4a";
var role2 = "PLAYER";
var me = "";
var state2 = null;
var settings2 = {};
var turnKey = "";
var tracked = /* @__PURE__ */ new Map();
var drawnSig = /* @__PURE__ */ new Map();
var busy2 = false;
var again2 = false;
var writer = () => true;
var on = () => settings2.trackMovement !== false;
async function startMovement(isWriter2 = () => true) {
  writer = isWriter2;
  role2 = await lib_default.player.getRole();
  me = await lib_default.player.getId();
  lib_default.player.onChange((p) => {
    role2 = p.role;
  });
  const md = await lib_default.room.getMetadata();
  state2 = md[TRACKER_KEY] || null;
  settings2 = md[SETTINGS_KEY] || {};
  lib_default.room.onMetadataChange((m) => {
    state2 = m[TRACKER_KEY] || null;
    settings2 = m[SETTINGS_KEY] || {};
    queue();
  });
  lib_default.scene.onReadyChange((ready2) => {
    if (ready2) {
      turnKey = "";
      drawnSig.clear();
      queue();
    }
  });
  lib_default.scene.items.onChange((items) => {
    if (role2 === "GM" && tracked.size && items.some((i) => tracked.has(i.id))) queue();
  });
  lib_default.broadcast.onMessage(RESET, ({ data }) => {
    if (role2 === "GM" && writer()) reset(data?.ids || []);
  });
  lib_default.broadcast.onMessage(NOTE, async ({ data }) => {
    if (role2 === "GM") return;
    const [token] = await lib_default.scene.items.getItems([data?.token]).catch(() => []);
    if (token?.createdUserId === me) lib_default.notification.show(data.text, "WARNING");
  });
  const icon2 = new URL("../logo/logo-64.png", location.href).href;
  try {
    await lib_default.contextMenu.create({
      id: MENU,
      icons: [{ icon: icon2, label: "Reset movement", filter: { every: [{ key: ["metadata", MOVE_KEY], value: void 0, operator: "!=" }] } }],
      onClick: (ctx) => {
        const ids = ctx.items.map((i) => i.id);
        if (role2 === "GM" && writer()) reset(ids);
        else lib_default.broadcast.sendMessage(RESET, { ids }).catch(() => {
        });
      }
    });
  } catch (err) {
    console.error("Encounter Builder: could not add movement tracking to Owlbear", err);
  }
  queue();
  return () => {
    drawnSig.clear();
    queue();
  };
}
async function queue() {
  if (busy2) {
    again2 = true;
    return;
  }
  busy2 = true;
  try {
    do {
      again2 = false;
      await update();
    } while (again2);
  } catch (err) {
    console.error("Encounter Builder: movement tracking", err);
  } finally {
    busy2 = false;
  }
}
function wanted2() {
  if (!on() || state2?.phase !== "active") return { key: "", tokens: /* @__PURE__ */ new Map() };
  const row = state2.order?.find((r) => r.key === state2.turn);
  const rows = row ? [row, ...state2.order.filter((r) => r.during && r.with === row.key)] : [];
  const tokens = new Map(rows.flatMap((r) => (r.tokens || []).map((t) => [t, r.sp ?? null])));
  if (!tokens.size) return { key: "", tokens };
  return { key: `${state2.encounter}:${state2.round}:${state2.turn}`, tokens };
}
async function update() {
  if (role2 !== "GM" || !writer() || !await lib_default.scene.isReady()) return;
  const { key, tokens } = wanted2();
  if (key !== turnKey) {
    await clearAll(key, tokens);
    turnKey = key;
    tracked = tokens;
    drawnSig.clear();
    const here = tokens.size ? await lib_default.scene.items.getItems([...tokens.keys()]) : [];
    if (here.length) {
      await lib_default.scene.items.updateItems(here.map((t) => t.id), (items) => {
        for (const t of items) {
          const old = t.metadata[MOVE_KEY];
          if (old?.turn !== key) t.metadata[MOVE_KEY] = { turn: key, start: { ...t.position }, points: [{ ...t.position }], segments: [], sp: tokens.get(t.id) };
        }
      });
    }
  }
  if (!tracked.size) return;
  const [scale, tokensNow] = await Promise.all([lib_default.scene.grid.getScale(), lib_default.scene.items.getItems([...tracked.keys()])]);
  for (const t of tokensNow) {
    let m = t.metadata[MOVE_KEY];
    if (!m) continue;
    const last = m.points[m.points.length - 1];
    if (!samePoint(last, t.position)) {
      const ft = feet(await lib_default.scene.grid.getDistance(last, t.position), scale.parsed.multiplier);
      const used = m.segments.reduce((a, b) => a + b, 0);
      if (settings2.stopAtSpeed && m.sp != null && used + ft > m.sp + 0.01) {
        const text = `${t.name || "That token"} can move only ${Math.max(0, m.sp - used)} more ${scale.parsed.unit} this turn (${usedText(used, m.sp, scale.parsed.unit)}).`;
        await lib_default.scene.items.updateItems([t.id], (items) => {
          for (const it of items) it.position = { ...last };
        });
        lib_default.notification.show(text, "WARNING");
        lib_default.broadcast.sendMessage(NOTE, { token: t.id, text }).catch(() => {
        });
        continue;
      }
      m = { ...m, points: [...m.points, { ...t.position }], segments: [...m.segments, ft] };
      await lib_default.scene.items.updateItems([t.id], (items) => {
        for (const it of items) it.metadata[MOVE_KEY] = m;
      });
    }
    const sig = JSON.stringify([m.points, t.visible]);
    if (drawnSig.get(t.id) !== sig) {
      drawnSig.set(t.id, sig);
      await drawTrail(t.id, m, { visible: t.visible });
    }
  }
}
async function reset(ids) {
  if (!writer() || !await lib_default.scene.isReady()) return;
  const here = (await lib_default.scene.items.getItems(ids)).filter((t) => t.metadata[MOVE_KEY]);
  if (!here.length) return;
  await lib_default.scene.items.updateItems(here.map((t) => t.id), (items) => {
    for (const t of items) {
      const m = t.metadata[MOVE_KEY];
      t.position = { ...m.start };
      t.metadata[MOVE_KEY] = { ...m, points: [{ ...m.start }], segments: [] };
    }
  });
  queue();
}
async function clearAll(key = "", keep = /* @__PURE__ */ new Map()) {
  const stays = (i) => keep.has(i.id) && i.metadata?.[MOVE_KEY]?.turn === key;
  const trails = (await lib_default.scene.items.getItems((i) => !!i.metadata?.[TRAIL_KEY])).map((i) => i.id);
  if (trails.length) await lib_default.scene.items.deleteItems(trails);
  const moved = (await lib_default.scene.items.getItems((i) => !!i.metadata?.[MOVE_KEY] && !stays(i))).map((i) => i.id);
  if (moved.length) await lib_default.scene.items.updateItems(moved, (items) => {
    for (const t of items) delete t.metadata[MOVE_KEY];
  });
}
async function drawTrail(id, m, { visible = true } = {}) {
  const items = lib_default.scene.items;
  const key = TRAIL_KEY;
  const old = (await items.getItems((i) => i.metadata?.[key]?.token === id)).map((i) => i.id);
  const [dpi, scale] = await Promise.all([lib_default.scene.grid.getDpi(), lib_default.scene.grid.getScale()]);
  const speed = m.sp ?? null, unit = scale.parsed.unit || "ft";
  const { dots, used, over } = trailDots(m.points, m.segments, { step: scale.parsed.multiplier || 5, speed });
  const finish3 = (b, name) => b.layer("DRAWING").locked(true).disableHit(true).visible(visible).name(name).metadata({ [key]: { token: id } }).build();
  const add = [];
  if (m.points.length > 1) {
    add.push(finish3(buildCurve().points(m.points).tension(0).closed(false).strokeColor(over ? RED : GREEN).strokeOpacity(0.85).strokeWidth(dpi * 0.05).fillOpacity(0).position({ x: 0, y: 0 }).zIndex(0), "Movement trail"));
  }
  for (const d of dots) {
    const size = d.start ? dpi * 0.22 : dpi * 0.13;
    add.push(finish3(buildShape().shapeType("CIRCLE").width(size).height(size).position({ x: d.x, y: d.y }).fillColor(d.over ? RED : GREEN).fillOpacity(0.95).strokeColor(d.start ? "#ffffff" : "#103018").strokeWidth(d.start ? dpi * 0.03 : dpi * 0.015).strokeOpacity(0.9).zIndex(1), d.start ? "Movement start" : "Movement: 5 ft"));
  }
  const [token] = await lib_default.scene.items.getItems([id]);
  if (token) {
    const b = await lib_default.scene.items.getItemBounds([id]);
    const at = b.center;
    const style = token.text?.style || {};
    const label = finish3(buildLabel().plainText(usedText(used, speed, unit)).position({ x: at.x, y: at.y - b.height / 2 - dpi * 0.02 }).fontFamily(style.fontFamily || "Roboto").fontWeight(style.fontWeight || 400).fontSize(dpi * 0.075).padding(dpi * 0.02).cornerRadius(dpi * 0.03).pointerWidth(0).pointerHeight(0).backgroundColor("#000000").backgroundOpacity(0.6).fillColor(over ? "#ff8a80" : "#ffffff").attachedTo(id).disableAttachmentBehavior(["COPY", "ROTATION", "SCALE"]).zIndex(2), "Movement used");
    label.layer = "TEXT";
    add.push(label);
  }
  if (old.length) await items.deleteItems(old);
  await items.addItems(add);
}

// src/rules.js
var CR_XP = {
  "0": 10,
  "1/8": 25,
  "1/4": 50,
  "1/2": 100,
  "1": 200,
  "2": 450,
  "3": 700,
  "4": 1100,
  "5": 1800,
  "6": 2300,
  "7": 2900,
  "8": 3900,
  "9": 5e3,
  "10": 5900,
  "11": 7200,
  "12": 8400,
  "13": 1e4,
  "14": 11500,
  "15": 13e3,
  "16": 15e3,
  "17": 18e3,
  "18": 2e4,
  "19": 22e3,
  "20": 25e3,
  "21": 33e3,
  "22": 41e3,
  "23": 5e4,
  "24": 62e3,
  "25": 75e3,
  "26": 9e4,
  "27": 105e3,
  "28": 12e4,
  "29": 135e3,
  "30": 155e3
};
var CR_ORDER = Object.keys(CR_XP);

// src/maker/constants.js
var CRS = ["0", "1/8", "1/4", "1/2", ...Array.from({ length: 30 }, (_, i) => String(i + 1))];

// src/combat.js
var BLOODIED = "Bloodied";

// src/obr/tracker-state.js
var ROOM_LIMIT = 16 * 1024;
function roomUsage(md, prefix) {
  const bytes = (v) => new TextEncoder().encode(JSON.stringify(v)).length;
  const keys = Object.keys(md || {});
  const total = bytes(md || {}), ours = keys.filter((k) => k.startsWith(prefix)).reduce((n, k) => n + bytes({ [k]: md[k] }), 0);
  return { total, ours, others: Math.max(0, total - ours), limit: ROOM_LIMIT };
}
function tokenEntries(state5) {
  const rows = (state5?.order || []).flatMap((r) => r.tm ? Object.entries(r.tm) : r.marks?.length ? (r.tokens || []).map((t) => [t, r.marks]) : []);
  return [...rows, ...Object.entries(state5?.tmExtra || {})];
}
function bloodiedTokens(state5) {
  return tokenEntries(state5).filter(([, marks]) => marks.some((m) => m.n === BLOODIED)).map(([token]) => token);
}
function markedTokens(state5, names) {
  const out = /* @__PURE__ */ new Map();
  for (const [token, marks] of tokenEntries(state5)) {
    const hit = marks.filter((m) => names.has(m.n)).map((m) => m.n);
    if (hit.length) out.set(token, [.../* @__PURE__ */ new Set([...out.get(token) || [], ...hit])]);
  }
  return out;
}
function tokenBadges(state5, spells) {
  const out = /* @__PURE__ */ new Map();
  for (const [token, marks] of tokenEntries(state5)) out.set(token, marks.filter((m) => !spells.has(m.n)));
  for (const r of state5?.order || []) for (const t of r.tokens || []) if (!out.has(t)) out.set(t, []);
  return out;
}
function linkedTokens(state5) {
  const rows = (state5?.order || []).flatMap((r) => [...r.tokens || [], ...Object.keys(r.tm || {})]);
  return [.../* @__PURE__ */ new Set([...rows, ...Object.keys(state5?.tmExtra || {})])];
}
function initiativeRows(state5, owned) {
  if (state5?.phase !== "setup") return [];
  return (state5.order || []).filter((r) => !r.with && (r.tokens || []).some((t) => owned.has(t)));
}

// src/obr/bloodied.js
var KEY2 = `${EXT}/bloodied`;
var TINT = `uniform vec2 size;

half4 main(float2 coord) {
  float d = length(coord / size - 0.5) * 2.0;
  float disc = 1.0 - smoothstep(0.90, 0.98, d);
  float a = disc * mix(0.24, 0.46, d * d);
  return half4(0.78 * a, 0.02 * a, 0.04 * a, a);
}
`;
var role3 = "PLAYER";
var state3 = null;
var busy3 = false;
var again3 = false;
async function sync2() {
  if (busy3) {
    again3 = true;
    return;
  }
  busy3 = true;
  try {
    do {
      again3 = false;
      await draw2();
    } while (again3);
  } catch (err) {
    console.error("Encounter Builder: could not draw the bloodied tint", err);
  } finally {
    busy3 = false;
  }
}
async function draw2() {
  if (!await lib_default.scene.isReady()) return;
  const ids = bloodiedTokens(state3);
  const tokens = ids.length ? (await lib_default.scene.items.getItems(ids)).filter((t) => role3 === "GM" || t.visible) : [];
  const want = new Map(tokens.map((t) => [t.id, t]));
  const have = await lib_default.scene.local.getItems((i) => !!i.metadata?.[KEY2]);
  const old = have.filter((i) => !want.has(i.attachedTo)).map((i) => i.id);
  const drawn2 = new Set(have.map((i) => i.attachedTo));
  const add = tokens.filter((t) => !drawn2.has(t.id)).map((t) => buildEffect().effectType("ATTACHMENT").attachedTo(t.id).sksl(TINT).position(t.position).rotation(t.rotation).layer("ATTACHMENT").zIndex(0).disableAutoZIndex(true).locked(true).disableHit(true).disableAttachmentBehavior(["COPY"]).name("Bloodied").metadata({ [KEY2]: true }).build());
  if (old.length) await lib_default.scene.local.deleteItems(old);
  if (add.length) await lib_default.scene.local.addItems(add);
}
async function startBloodied() {
  role3 = await lib_default.player.getRole();
  lib_default.player.onChange((p) => {
    if (p.role !== role3) {
      role3 = p.role;
      sync2();
    }
  });
  state3 = (await lib_default.room.getMetadata())[TRACKER_KEY] || null;
  lib_default.room.onMetadataChange((m) => {
    state3 = m[TRACKER_KEY] || null;
    sync2();
  });
  lib_default.scene.onReadyChange(() => sync2());
  let timer = null;
  lib_default.scene.items.onChange(() => {
    clearTimeout(timer);
    timer = setTimeout(sync2, 200);
  });
  sync2();
}

// src/obr/fx-pref.js
var KEYS = { spells: "kem-spell-animations", hits: "kem-hit-heal-effects" };
var software = null;
function softwareDrawing() {
  if (software !== null) return software;
  software = false;
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    if (!gl) return software = true;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const name = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    software = /swiftshader|llvmpipe|softpipe|software|basic render/i.test(name);
  } catch {
  }
  return software;
}
var savedChoice = (kind) => {
  try {
    return localStorage.getItem(KEYS[kind]);
  } catch {
    return null;
  }
};
var effectsOn = (kind) => {
  const c = savedChoice(kind);
  return c ? c === "on" : !softwareDrawing();
};

// src/obr/fx-shaders.js
var HIT_SECONDS = 0.825;
var HEAL_SECONDS = 1.4;
var HIT_REACH = 1.4;
var HEAL_REACH = 1.45;
var GLOW_SECONDS = 1;
var HEAL_GLOW_END = GLOW_SECONDS / HEAL_SECONDS;
var HIT = `uniform shader scene;
uniform mat3 modelView;
uniform vec2 size;
uniform float reach;
uniform float shake;
uniform float seed;
uniform float progress;

half4 at(vec2 p) { return scene.eval((vec3(p, 1) * modelView).xy); }
float disc(vec2 p) { return 1.0 - smoothstep(0.95, 1.0, length((p / size - 0.5) * 2.0 * reach)); }

half4 main(float2 coord) {
  float amount = pow(1.0 - progress, 1.5);
  vec2 shift = vec2(sin(progress * 52.0 + seed), cos(progress * 41.0 + seed * 1.7) * 0.7) * 0.09 * shake * amount * size.x / reach;
  vec2 from = coord + shift;
  float moved = disc(from);
  half4 c = mix(at(coord), at(from), moved);
  float shown = max(moved, disc(coord));
  half3 rgb = mix(c.rgb, half3(0.92, 0.05, 0.06), amount * 0.72);
  return half4(rgb * shown, shown);
}
`;
var HEAL_LIGHT = `uniform vec2 size;
uniform float reach;
uniform float glowEnd;
uniform float seed;
uniform float progress;

half4 main(float2 coord) {
  vec2 p = (coord / size - 0.5) * 2.0 * reach;
  float r = length(p);
  float angle = atan(p.y, p.x) + seed;
  float glow = sin(min(progress / glowEnd, 1.0) * 3.14159);
  float inside = 1.0 - smoothstep(0.95, 1.0, r);
  float outside = smoothstep(0.98, 1.05, r) * (1.0 - smoothstep(1.2, reach * 0.97, r));
  float arms = pow(0.5 + 0.5 * sin(angle * 3.0 + r * 11.0 - progress * 15.0), 3.0);
  float glints = pow(0.5 + 0.5 * sin(angle * 11.0 - r * 24.0 + progress * 24.0), 14.0);
  float life = sin(progress * 3.14159);
  float halo = (1.0 - inside) * exp(-(r - 1.0) * 7.0) * glow * 0.4;
  float a = clamp(inside * glow * 0.5 + (arms * 0.85 + glints * 0.7) * outside * life + halo, 0.0, 0.95);
  return half4(a, a, a * 0.96, a);
}
`;
var HEAL_NATURE = `uniform vec2 size;
uniform float reach;
uniform float glowEnd;
uniform float seed;
uniform float progress;

float leaf(vec2 p, vec2 at, float turn) {
  vec2 d = p - at;
  float c = cos(turn), s = sin(turn);
  d = vec2(d.x * c + d.y * s, d.y * c - d.x * s);
  float width = 0.052 * (1.0 - pow(abs(d.x) / 0.1, 2.0));
  return (1.0 - smoothstep(0.0, 0.016, abs(d.y) - width)) * step(abs(d.x), 0.1);
}

half4 main(float2 coord) {
  vec2 p = (coord / size - 0.5) * 2.0 * reach;
  float r = length(p);
  float angle = atan(p.y, p.x) + seed;
  float glow = sin(min(progress / glowEnd, 1.0) * 3.14159);
  float inside = 1.0 - smoothstep(0.95, 1.0, r);
  float outside = smoothstep(0.98, 1.05, r) * (1.0 - smoothstep(1.22, reach * 0.97, r));
  float vine = pow(0.5 + 0.5 * sin(angle * 2.0 + r * 13.0 - progress * 11.0 + sin(angle * 5.0) * 0.6), 5.0);
  float life = sin(progress * 3.14159);
  float halo = (1.0 - inside) * exp(-(r - 1.0) * 7.0) * glow * 0.5;
  float leaves = 0.0;
  for (int i = 0; i < 9; i++) {
    float k = float(i);
    float a = k * 0.698 + seed * 2.0 + progress * (2.4 + 0.3 * sin(k * 2.1));
    float out_ = 1.1 + 0.26 * fract(k * 0.37 + progress * 0.55);
    leaves = max(leaves, leaf(p, vec2(cos(a), sin(a)) * out_, a + 1.2 + progress * 3.0));
  }
  float bright = clamp(vine * outside * life * 0.9 + leaves * life, 0.0, 1.0);
  half3 ring = mix(half3(0.10, 0.52, 0.16), half3(0.56, 0.93, 0.33), leaves * 0.8 + vine * 0.3);
  float g = inside * glow * 0.46;
  float a = clamp(bright + halo + g, 0.0, 0.95);
  half3 rgb = (ring * (bright + 0.0001) + half3(0.42, 0.88, 0.30) * (halo + g)) / (bright + halo + g + 0.0001);
  return half4(rgb * a, a);
}
`;
var HEAL_RADIANT = `uniform vec2 size;
uniform float reach;
uniform float glowEnd;
uniform float seed;
uniform float progress;

float star(vec2 d, float s) {
  if (s <= 0.001) return 0.0;
  d = abs(d) / s;
  return clamp(1.0 - sqrt(d.x) - sqrt(d.y), 0.0, 1.0);
}

half4 main(float2 coord) {
  vec2 p = (coord / size - 0.5) * 2.0 * reach;
  float r = length(p);
  float angle = atan(p.y, p.x) + seed;
  float glow = sin(min(progress / glowEnd, 1.0) * 3.14159);
  float life = sin(progress * 3.14159);
  float inside = 1.0 - smoothstep(0.95, 1.0, r);
  float edge = 1.0 - smoothstep(1.26, reach * 0.97, r);
  float rim = exp(-pow((r - 1.03) / 0.035, 2.0)) * life;
  float pulseAt = 1.0 + 0.36 * pow(progress, 0.7);
  float pulse = exp(-pow((r - pulseAt) / 0.03, 2.0)) * (1.0 - progress) * 0.9;
  float rays = pow(0.5 + 0.5 * sin(angle * 12.0 + progress * 3.0), 5.0) * pow(0.5 + 0.5 * sin(angle * 5.0 - progress * 5.0), 2.0);
  float beam = rays * smoothstep(0.98, 1.03, r) * exp(-(r - 1.0) * 4.5) * life * 1.2;
  float glints = 0.0;
  for (int i = 0; i < 8; i++) {
    float k = float(i);
    float a = k * 0.785 + seed + progress * 1.6;
    float at = 1.13 + 0.14 * sin(k * 3.7 + progress * 6.0);
    float twinkle = sin(fract(progress * 1.7 + k * 0.37) * 3.14159);
    glints = max(glints, star(p - vec2(cos(a), sin(a)) * at, 0.16 * twinkle * twinkle));
  }
  float g = inside * glow * 0.42;
  float gold = clamp((beam + pulse) * edge + g, 0.0, 1.0);
  float white = clamp((rim + glints * life) * edge * (1.0 - inside * 0.6), 0.0, 1.0);
  float a = clamp(gold + white, 0.0, 0.95);
  half3 rgb = (half3(1.0, 0.93, 0.78) * gold + half3(1.0, 0.98, 0.9) * white) / (gold + white + 0.0001);
  return half4(rgb * a, a);
}
`;
var HEAL_RISING = `uniform vec2 size;
uniform float reach;
uniform float glowEnd;
uniform float seed;
uniform float progress;

half4 main(float2 coord) {
  vec2 p = (coord / size - 0.5) * 2.0 * reach;
  float r = length(p);
  float angle = atan(p.y, p.x);
  float glow = sin(min(progress / glowEnd, 1.0) * 3.14159);
  float life = sin(progress * 3.14159);
  float inside = 1.0 - smoothstep(0.95, 1.0, r);
  float edge = 1.0 - smoothstep(1.28, reach * 0.97, r);
  float ribbons = 0.0;
  for (int i = 0; i < 2; i++) {
    float k = float(i) * 3.14159;
    float head = progress * 10.0 + k + seed;
    float along = pow(0.5 + 0.5 * cos(angle - head), 3.0);
    float at = 1.12 + 0.1 * sin(angle * 2.0 - progress * 12.0 + k);
    ribbons = max(ribbons, exp(-pow((r - at) / (0.02 + 0.035 * along), 2.0)) * along);
  }
  float motes = 0.0;
  for (int i = 0; i < 14; i++) {
    float k = float(i);
    float t = fract(progress * 1.3 + k * 0.619 + seed);
    float x = (fract(k * 0.7548 + seed * 0.3) - 0.5) * 2.5;
    float y = 1.28 - t * 2.6;
    float m = 1.0 - smoothstep(0.012, 0.05, length(p - vec2(x + sin(t * 6.0 + k) * 0.06, y)));
    motes = max(motes, m * sin(t * 3.14159));
  }
  float halo = (1.0 - inside) * exp(-(r - 1.0) * 7.0) * glow * 0.42;
  float g = inside * glow * 0.42;
  float soft = clamp(g + halo, 0.0, 1.0);
  float bright = clamp((ribbons * smoothstep(0.98, 1.04, r) + motes) * edge * life * 1.15, 0.0, 1.0);
  float a = clamp(soft + bright, 0.0, 0.95);
  half3 rgb = (half3(0.85, 0.93, 1.0) * soft + half3(0.92, 0.97, 1.0) * bright) / (soft + bright + 0.0001);
  return half4(rgb * a, a);
}
`;
var HEAL_BLOOM = `uniform vec2 size;
uniform float reach;
uniform float glowEnd;
uniform float seed;
uniform float progress;

half4 main(float2 coord) {
  vec2 p = (coord / size - 0.5) * 2.0 * reach;
  float r = length(p);
  float glow = sin(min(progress / glowEnd, 1.0) * 3.14159);
  float life = sin(progress * 3.14159);
  float inside = 1.0 - smoothstep(0.95, 1.0, r);
  float petals = 0.0, hearts = 0.0;
  for (int i = 0; i < 9; i++) {
    float k = float(i);
    float a = k * 0.698 + seed;
    float big = 0.135 + 0.05 * fract(k * 0.618);
    float open = smoothstep(0.0, 0.32, progress - k * 0.035) * (1.0 - smoothstep(0.82, 1.0, progress));
    vec2 d = p - vec2(cos(a), sin(a)) * (1.15 + 0.04 * sin(k * 2.3));
    float t = atan(d.y, d.x) + a + progress * 1.5;
    float n = length(d) / max(big * open, 0.001);
    petals = max(petals, 1.0 - smoothstep(0.62, 0.72, n / (0.62 + 0.38 * abs(cos(t * 2.5)))));
    hearts = max(hearts, 1.0 - smoothstep(0.2, 0.28, n));
  }
  float pollen = 0.0;
  for (int i = 0; i < 12; i++) {
    float k = float(i);
    float t = fract(progress * 1.1 + k * 0.618 + seed);
    vec2 at = vec2((fract(k * 0.7548) - 0.5) * 2.5 + sin(t * 5.0 + k) * 0.08, 1.25 - t * 2.5);
    pollen = max(pollen, (1.0 - smoothstep(0.01, 0.04, length(p - at))) * sin(t * 3.14159));
  }
  float halo = (1.0 - inside) * exp(-(r - 1.0) * 7.0) * glow * 0.5;
  float g = inside * glow * 0.44;
  float soft = clamp(g + halo, 0.0, 1.0);
  float bloom = clamp(petals * 0.95, 0.0, 1.0);
  float gold = clamp(hearts + pollen * life, 0.0, 1.0);
  float a = clamp(soft + bloom + gold, 0.0, 0.95);
  half3 petal = mix(half3(0.98, 0.72, 0.84), half3(1.0, 0.95, 0.95), petals * 0.4);
  half3 rgb = (half3(0.42, 0.88, 0.30) * soft + petal * bloom + half3(1.0, 0.86, 0.32) * gold) / (soft + bloom + gold + 0.0001);
  return half4(rgb * a, a);
}
`;
var HEALS = { light: HEAL_LIGHT, nature: HEAL_NATURE, radiant: HEAL_RADIANT, rising: HEAL_RISING, bloom: HEAL_BLOOM };

// src/obr/token-fx.js
var KEY3 = `${EXT}/fx`;
var FRAME_MS2 = 40;
var role4 = "PLAYER";
var running = /* @__PURE__ */ new Map();
function effectOn(bounds, { sksl, reach, layer, uniforms: uniforms2 }) {
  const w = Math.max(bounds.width, bounds.height) * reach;
  return buildEffect().effectType("STANDALONE").width(w).height(w).position({ x: bounds.center.x - w / 2, y: bounds.center.y - w / 2 }).sksl(sksl).uniforms([{ name: "reach", value: reach }, ...uniforms2, { name: "seed", value: Math.random() * 6.283 }, { name: "progress", value: 0 }]).layer(layer).locked(true).disableHit(true).name("Token effect").metadata({ [KEY3]: true }).build();
}
async function play({ hits = [], heals = [], shake = 1, style = "light" }) {
  if (!effectsOn("hits") || !await lib_default.scene.isReady()) return;
  const shown = async (ids) => ids.length ? (await lib_default.scene.items.getItems(ids)).filter((t) => role4 === "GM" || t.visible) : [];
  const add = [], seconds = /* @__PURE__ */ new Map();
  for (const t of await shown(hits)) {
    const it = effectOn(await lib_default.scene.items.getItemBounds([t.id]), { sksl: HIT, reach: HIT_REACH, layer: "POST_PROCESS", uniforms: [{ name: "shake", value: shake }] });
    add.push(it);
    seconds.set(it.id, HIT_SECONDS);
  }
  for (const t of await shown(heals)) {
    const it = effectOn(await lib_default.scene.items.getItemBounds([t.id]), { sksl: HEALS[style] || HEALS.light, reach: HEAL_REACH, layer: "ATTACHMENT", uniforms: [{ name: "glowEnd", value: HEAL_GLOW_END }] });
    add.push(it);
    seconds.set(it.id, HEAL_SECONDS);
  }
  if (!add.length) return;
  await lib_default.scene.local.addItems(add);
  const start = performance.now();
  for (const [id, s] of seconds) running.set(id, { start, seconds: s });
}
var drawing = false;
setInterval(async () => {
  if (drawing || !running.size) return;
  drawing = true;
  const now = performance.now(), done = [], progress = /* @__PURE__ */ new Map();
  for (const [id, e] of running) {
    const p = (now - e.start) / (e.seconds * 1e3);
    if (p >= 1) {
      done.push(id);
      running.delete(id);
    } else progress.set(id, p);
  }
  try {
    if (done.length) await lib_default.scene.local.deleteItems(done);
    if (progress.size) {
      await lib_default.scene.local.updateItems([...progress.keys()], (items) => {
        for (const it of items) it.uniforms.find((u) => u.name === "progress").value = progress.get(it.id);
      }, true);
    }
  } catch {
  }
  drawing = false;
}, FRAME_MS2);
async function startTokenFx() {
  role4 = await lib_default.player.getRole();
  lib_default.player.onChange((p) => {
    role4 = p.role;
  });
  lib_default.broadcast.onMessage(EFFECTS, ({ data }) => {
    play(data || {}).catch((err) => console.error("Encounter Builder: could not play a token effect", err));
  });
  lib_default.scene.onReadyChange(() => running.clear());
}

// src/owlbear-settings.js
var OWLBEAR_SWITCHES = [
  ["showPartyHp", "Show party HP to players", false, ""],
  ["showTurnDie", "Show the turn d20 on the active token", true, ""],
  ["trackMovement", "Track movement on the active token", true, 'A green trail with a dot every 5 ft and "15 / 30 ft" on the linked token whose turn it is. Right-click the token > Reset movement to start its turn again.'],
  ["stopAtSpeed", "Stop movement at its speed", false, "A token can\u2019t be moved past its speed this turn."],
  ["spellAnimations", "Show spell and zone animations", true, "The looping animations of spells on creatures and of zone spells, for everyone. Each player can also turn them off for their own screen, in the tracker panel."],
  ["playerInitiative", "Players enter their own initiative", true, "While you roll initiative, a player with a linked token gets a box on their screen for it. What they type fills in here; you can still change it."]
];
var switchOn = (settings5, key) => {
  const s = OWLBEAR_SWITCHES.find((x) => x[0] === key);
  return settings5[key] ?? s?.[2] ?? false;
};
var PLAYER_CONDITION_CHOICES = [["allow", "Allow"], ["ask", "Ask me first"], ["off", "Off"]];
var playerConditions = (settings5) => PLAYER_CONDITION_CHOICES.some(([k]) => k === settings5?.playerConditions) ? settings5.playerConditions : "allow";

// src/obr/spell-loops.js
var SHADERS = [
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;\nuniform vec3 color;uniform float mode;uniform float sustain;\n\nfloat hash2(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash2(i),hash2(i+vec2(1.0,0.0)),f.x),mix(hash2(i+vec2(0.0,1.0)),hash2(i+vec2(1.0)),f.x),f.y);}\nfloat cloud(vec2 p){return noise2(p)*.65+noise2(p*2.13+7.7)*.35;}\nfloat segment(vec2 p,vec2 a,vec2 b){vec2 d=b-a;return length(p-a-d*clamp(dot(p-a,d)/max(dot(d,d),.0001),0.0,1.0));}\nfloat lineGlow(float d,float w){return exp(-d*d/(w*w));}\nvec2 turn(vec2 p,float a){return vec2(p.x*cos(a)-p.y*sin(a),p.x*sin(a)+p.y*cos(a));}\n\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.11,progress)*(1.0-smoothstep(.86,1.0,progress));}\nhalf4 paint(float v,float bright,vec3 c){float al=clamp(v*life(),0.0,.95);return half4(mix(c,vec3(.98,.98,1.0),clamp(bright,0.0,.9))*al,al);}\nhalf4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float r=length(p),a=atan(p.y,p.x),t=progress*6.2831853;\n float n=cloud(p*5.0+vec2(cos(t),sin(t))*.75);\n float flow=.61+.055*sin(a*4.0+t)+.025*sin(a*9.0-t);\n float ribbon=lineGlow(r-flow,.026)*(.5+n*.5)+lineGlow(r-flow,.09)*.25;\n float inner=lineGlow(r-(.48+.02*sin(a*5.0-t)),.018)*.4;\n float wisps=lineGlow(r-.66,.15)*pow(max(0.0,sin(a*6.0+r*15.0-t)),6.0)*n*.6;\n float motes=0.0;\n for(int i=0;i<8;i++){float k=float(i),theta=k*.785398+t,rad=.56+.12*sin(k*3.0+t);vec2 q=vec2(cos(theta),sin(theta))*rad;vec2 d=abs(p-q);\n  motes+=exp(-dot(d,d)*1600.0)+exp(-min(d.x,d.y)*150.0-max(d.x,d.y)*38.0)*.35;\n }\n return paint(ribbon+inner+wisps+motes,clamp(motes+ribbon*.3,0.0,.9),color);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;\nuniform vec3 color;uniform float mode;uniform float sustain;\n\nfloat hash2(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash2(i),hash2(i+vec2(1.0,0.0)),f.x),mix(hash2(i+vec2(0.0,1.0)),hash2(i+vec2(1.0)),f.x),f.y);}\nfloat cloud(vec2 p){return noise2(p)*.65+noise2(p*2.13+7.7)*.35;}\nfloat segment(vec2 p,vec2 a,vec2 b){vec2 d=b-a;return length(p-a-d*clamp(dot(p-a,d)/max(dot(d,d),.0001),0.0,1.0));}\nfloat lineGlow(float d,float w){return exp(-d*d/(w*w));}\nvec2 turn(vec2 p,float a){return vec2(p.x*cos(a)-p.y*sin(a),p.x*sin(a)+p.y*cos(a));}\n\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.11,progress)*(1.0-smoothstep(.86,1.0,progress));}\nhalf4 paint(float v,float bright,vec3 c){float al=clamp(v*life(),0.0,.95);return half4(mix(c,vec3(.98,.98,1.0),clamp(bright,0.0,.9))*al,al);}\nhalf4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float r=length(p),a=atan(p.y,p.x),t=progress*6.2831853;\n vec2 orbit=vec2(cos(t),sin(t));float n=cloud(p*5.0+orbit*.65+seed);\n float wave=.022*sin(a*7.0+t)+.018*(n-.5),rimRadius=.67+wave;\n float rim=lineGlow(r-rimRadius,.018)+lineGlow(r-rimRadius,.07)*.42;\n float shell=smoothstep(.27,.59,r)*(1.0-smoothstep(.62,.72,r))*(.16+n*.28);\n float glint=pow(max(0.0,cos(a+2.1)),9.0)*lineGlow(r-rimRadius,.035)*.9;\n float filaments=lineGlow(sin(a*3.0+r*17.0+t)*.06,.014)*lineGlow(r-.59,.07)*.3;\n if(mode<.5){vec2 q=p*13.0;float h=abs(cos(q.x)+2.0*cos(q.x*.5)*cos(q.y*.866));shell+=lineGlow(h-1.0,.09)*smoothstep(.4,.48,r)*(1.0-smoothstep(.58,.65,r))*.3;}\n if(mode>1.5){shell*=.6;filaments*=1.8;}\n float sparks=pow(max(0.0,cos(a*17.0-t*2.0)),35.0)*lineGlow(r-.76-wave,.02)*.6;\n return paint(rim*.8+shell+filaments+sparks+glint,clamp(glint+rim*.35+sparks*.6,0.0,.85),color);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;\nuniform vec3 color;uniform float mode;uniform float sustain;\n\nfloat hash2(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash2(i),hash2(i+vec2(1.0,0.0)),f.x),mix(hash2(i+vec2(0.0,1.0)),hash2(i+vec2(1.0)),f.x),f.y);}\nfloat cloud(vec2 p){return noise2(p)*.65+noise2(p*2.13+7.7)*.35;}\nfloat segment(vec2 p,vec2 a,vec2 b){vec2 d=b-a;return length(p-a-d*clamp(dot(p-a,d)/max(dot(d,d),.0001),0.0,1.0));}\nfloat lineGlow(float d,float w){return exp(-d*d/(w*w));}\nvec2 turn(vec2 p,float a){return vec2(p.x*cos(a)-p.y*sin(a),p.x*sin(a)+p.y*cos(a));}\n\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.11,progress)*(1.0-smoothstep(.86,1.0,progress));}\nhalf4 paint(float v,float bright,vec3 c){float al=clamp(v*life(),0.0,.95);return half4(mix(c,vec3(.98,.98,1.0),clamp(bright,0.0,.9))*al,al);}\nhalf4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float r=length(p),a=atan(p.y,p.x),t=progress*6.2831853;\n float rough=cloud(p*13.0)*.07;float ann=smoothstep(.58,.64,r)*(1.0-smoothstep(.68+rough,.75+rough,r));float v,shine;\n if(mode<.5){float u=a*8.0+.3*sin(r*11.0)+.2*noise2(p*17.0);float grain=abs(sin(u));float cut=smoothstep(.04,.18,grain);float knots=cloud(vec2(a*9.0,r*35.0));v=.35+cut*.4+knots*.25;shine=pow(max(0.0,cos(u+.7)),9.0)*.15;}\n else{vec2 q=p*7.0,cell=floor(q);float first=9.0,second=9.0,h=0.0;vec2 normal=vec2(0.0);\n  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 c=cell+vec2(float(x),float(y));vec2 center=c+vec2(hash2(c),hash2(c+23.0));vec2 d=q-center;float dist=dot(d,d);if(dist<first){second=first;first=dist;h=hash2(c+7.0);normal=d;}else if(dist<second){second=dist;}}\n  float seam=second-first;float plate=smoothstep(.015,.09,seam);v=(.35+.3*h+clamp(dot(normal,vec2(-.4,-.6)),0.0,.3))*plate;shine=lineGlow(seam-.1,.035)*.25;}\n float shimmer=pow(max(0.0,cos(a-t)),12.0)*.12;\n vec3 c=mix(color*.3,color,clamp(v+shine,0.0,1.0));return paint(ann*(.65+v*.35),shine+shimmer,c);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;\nuniform vec3 color;uniform float mode;uniform float sustain;\n\nfloat hash2(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash2(i),hash2(i+vec2(1.0,0.0)),f.x),mix(hash2(i+vec2(0.0,1.0)),hash2(i+vec2(1.0)),f.x),f.y);}\nfloat cloud(vec2 p){return noise2(p)*.65+noise2(p*2.13+7.7)*.35;}\nfloat segment(vec2 p,vec2 a,vec2 b){vec2 d=b-a;return length(p-a-d*clamp(dot(p-a,d)/max(dot(d,d),.0001),0.0,1.0));}\nfloat lineGlow(float d,float w){return exp(-d*d/(w*w));}\nvec2 turn(vec2 p,float a){return vec2(p.x*cos(a)-p.y*sin(a),p.x*sin(a)+p.y*cos(a));}\n\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.11,progress)*(1.0-smoothstep(.86,1.0,progress));}\nhalf4 paint(float v,float bright,vec3 c){float al=clamp(v*life(),0.0,.95);return half4(mix(c,vec3(.98,.98,1.0),clamp(bright,0.0,.9))*al,al);}\nhalf4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float r=length(p),a=atan(p.y,p.x),t=progress*6.2831853;\n float n=cloud(p*7.0+vec2(cos(t),sin(t)));\n float v=0.0;\n for(int i=0;i<3;i++){float k=float(i),radius=.5+k*.1+.025*sin(a*5.0+t+k);\n  float tail=pow(max(0.0,cos(a*2.0-t*2.0+k)),5.0);v+=lineGlow(r-radius,.018+k*.004)*tail;\n }\n float trail=lineGlow(p.y+.06*sin(p.x*12.0+t),.07)*exp(-pow((p.x+.48)/.23,2.0))*(.3+n*.5);\n return paint(v+trail,v*.6,color);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;\nuniform vec3 color;uniform float mode;uniform float sustain;\n\nfloat hash2(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash2(i),hash2(i+vec2(1.0,0.0)),f.x),mix(hash2(i+vec2(0.0,1.0)),hash2(i+vec2(1.0)),f.x),f.y);}\nfloat cloud(vec2 p){return noise2(p)*.65+noise2(p*2.13+7.7)*.35;}\nfloat segment(vec2 p,vec2 a,vec2 b){vec2 d=b-a;return length(p-a-d*clamp(dot(p-a,d)/max(dot(d,d),.0001),0.0,1.0));}\nfloat lineGlow(float d,float w){return exp(-d*d/(w*w));}\nvec2 turn(vec2 p,float a){return vec2(p.x*cos(a)-p.y*sin(a),p.x*sin(a)+p.y*cos(a));}\n\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.11,progress)*(1.0-smoothstep(.86,1.0,progress));}\nhalf4 paint(float v,float bright,vec3 c){float al=clamp(v*life(),0.0,.95);return half4(mix(c,vec3(.98,.98,1.0),clamp(bright,0.0,.9))*al,al);}\nhalf4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float t=progress*6.2831853;p=turn(p,.08*sin(t));\n float blade=(1.0-smoothstep(.05,.075,abs(p.x)))*smoothstep(-.7,-.52,p.y)*(1.0-smoothstep(.19,.23,p.y));\n float guard=lineGlow(segment(p,vec2(-.25,.24),vec2(.25,.24)),.035);\n float grip=lineGlow(segment(p,vec2(0.0,.24),vec2(0.0,.55)),.03);\n float edge=lineGlow(abs(p.x)-.06,.012)*smoothstep(-.65,-.5,p.y)*(1.0-smoothstep(.18,.24,p.y));\n float n=cloud(p*7.0+vec2(cos(t),sin(t)));\n float flame=lineGlow(abs(p.x)-.1-.05*n,.08)*(1.0-smoothstep(.45,.8,abs(p.y)))*n*.55;\n return paint(blade*.7+guard+grip+edge+flame,edge+blade*step(p.x,0.0)*.5,color);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;\nuniform vec3 color;uniform float mode;uniform float sustain;\n\nfloat hash2(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash2(i),hash2(i+vec2(1.0,0.0)),f.x),mix(hash2(i+vec2(0.0,1.0)),hash2(i+vec2(1.0)),f.x),f.y);}\nfloat cloud(vec2 p){return noise2(p)*.65+noise2(p*2.13+7.7)*.35;}\nfloat segment(vec2 p,vec2 a,vec2 b){vec2 d=b-a;return length(p-a-d*clamp(dot(p-a,d)/max(dot(d,d),.0001),0.0,1.0));}\nfloat lineGlow(float d,float w){return exp(-d*d/(w*w));}\nvec2 turn(vec2 p,float a){return vec2(p.x*cos(a)-p.y*sin(a),p.x*sin(a)+p.y*cos(a));}\n\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.11,progress)*(1.0-smoothstep(.86,1.0,progress));}\nhalf4 paint(float v,float bright,vec3 c){float al=clamp(v*life(),0.0,.95);return half4(mix(c,vec3(.98,.98,1.0),clamp(bright,0.0,.9))*al,al);}\nhalf4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float r=length(p),a=atan(p.y,p.x),t=progress*6.2831853;\n float n=cloud(p*6.0+vec2(cos(t),sin(t))*.7);\n float rim=lineGlow(r-(.59+(n-.5)*.07),.025)*(.3+.4*n);\n float wisps=pow(max(0.0,sin(a*4.0+r*15.0+t)),12.0)*lineGlow(r-.58,.14)*n;\n float sheen=lineGlow(p.y-.5*sin(t)-.04*sin(p.x*15.0+t),.018)*(1.0-smoothstep(.4,.65,r))*.16;\n return paint(rim+wisps*.5+sheen,.35*rim,color);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;\nuniform vec3 color;uniform float mode;uniform float sustain;\n\nfloat hash2(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash2(i),hash2(i+vec2(1.0,0.0)),f.x),mix(hash2(i+vec2(0.0,1.0)),hash2(i+vec2(1.0)),f.x),f.y);}\nfloat cloud(vec2 p){return noise2(p)*.65+noise2(p*2.13+7.7)*.35;}\nfloat segment(vec2 p,vec2 a,vec2 b){vec2 d=b-a;return length(p-a-d*clamp(dot(p-a,d)/max(dot(d,d),.0001),0.0,1.0));}\nfloat lineGlow(float d,float w){return exp(-d*d/(w*w));}\nvec2 turn(vec2 p,float a){return vec2(p.x*cos(a)-p.y*sin(a),p.x*sin(a)+p.y*cos(a));}\n\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.11,progress)*(1.0-smoothstep(.86,1.0,progress));}\nhalf4 paint(float v,float bright,vec3 c){float al=clamp(v*life(),0.0,.95);return half4(mix(c,vec3(.98,.98,1.0),clamp(bright,0.0,.9))*al,al);}\nhalf4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float r=length(p),a=atan(p.y,p.x),t=progress*6.2831853;\n vec2 orbit=vec2(cos(t),sin(t));float n=cloud(p*5.0+orbit*.65+seed);\n float wave=.022*sin(a*7.0+t)+.018*(n-.5),rimRadius=.67+wave;\n float rim=lineGlow(r-rimRadius,.018)+lineGlow(r-rimRadius,.07)*.42;\n float shell=smoothstep(.27,.59,r)*(1.0-smoothstep(.62,.72,r))*(.16+n*.28);\n float glint=pow(max(0.0,cos(a+2.1)),9.0)*lineGlow(r-rimRadius,.035)*.9;\n float filaments=lineGlow(sin(a*3.0+r*17.0+t)*.06,.014)*lineGlow(r-.59,.07)*.3;\n if(mode<.5){vec2 q=p*13.0;float h=abs(cos(q.x)+2.0*cos(q.x*.5)*cos(q.y*.866));shell+=lineGlow(h-1.0,.09)*smoothstep(.4,.48,r)*(1.0-smoothstep(.58,.65,r))*.3;}\n if(mode>1.5){shell*=.6;filaments*=1.8;}\n float sparks=pow(max(0.0,cos(a*17.0-t*2.0)),35.0)*lineGlow(r-.76-wave,.02)*.6;\n return paint(rim+shell*1.5+filaments*1.8+sparks+glint,clamp(glint+rim*.35+sparks*.6,0.0,.85),color);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;uniform float sustain;\nfloat hash(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0)),f.x),f.y);}\nfloat glow(float d,float w){return exp(-d*d/(w*w));}\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.12,progress)*(1.0-smoothstep(.84,1.0,progress));}\nfloat phase(){return progress*6.2831853;}\nhalf4 ink(vec3 c,float v){float a=clamp(v*life(),0.0,.95);return half4(c*a,a);}\nuniform vec3 color;uniform float mode;half4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float r=length(p),a=atan(p.y,p.x),t=phase();\n vec2 drift=vec2(cos(t),sin(t));float n=noise(p*7.0+drift*.8)*.65+noise(p*15.0-drift)*.35;\n float radius=.43+(mode<.5?.025*sin(a*6.0+t):.05*(n-.5));\n float sphere=1.0-smoothstep(radius-.02,radius+.02,r);float rim=glow(r-radius,.025);\n float light=clamp(.5-dot(p,vec2(.6,.8))+.2*n,0.0,1.0);\n float corona=glow(r-radius,.12)*(.2+n*.55);float embers=pow(max(0.0,cos(a*17.0-t*2.0)),30.0)*glow(r-.6,.025)*.6;\n vec3 c=mix(color*.35,vec3(.96,.99,1.0),light*.7+rim*.2);\n if(mode>.5){float heat=.55+n*.5-r*.35;c=mix(vec3(.9,.06,.008),vec3(1.0,.76,.12),smoothstep(.25,.8,heat));c=mix(c,vec3(1.0,.97,.75),glow(r,.26)*(.35+n*.55));corona=glow(r-radius-(n-.5)*.14,.07)*(.5+n*.6);}\n return ink(c,sphere*.94+corona+embers);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;uniform float sustain;\nfloat hash(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0)),f.x),f.y);}\nfloat glow(float d,float w){return exp(-d*d/(w*w));}\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.12,progress)*(1.0-smoothstep(.84,1.0,progress));}\nfloat phase(){return progress*6.2831853;}\nhalf4 ink(vec3 c,float v){float a=clamp(v*life(),0.0,.95);return half4(c*a,a);}\nhalf4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float t=phase();float curve=.16*sin((p.y+.65)*2.5);float width=.065*clamp((p.y+.68)/.6,0.0,1.0);\n float n=noise(p*12.0+vec2(cos(t),sin(t)));float d=abs(p.x-curve);float blade=(1.0-smoothstep(width*.5,width+.015,d))*smoothstep(-.7,-.63,p.y)*(1.0-smoothstep(.12,.18,p.y));\n float flame=glow(d-width-.03*n,.055)*smoothstep(-.7,-.5,p.y)*(1.0-smoothstep(.12,.2,p.y))*(.3+n*.5);\n float grip=glow(p.x-.13,.025)*step(.18,p.y)*step(p.y,.55);\n return ink(mix(vec3(1.0,.18,.015),vec3(1.0,.95,.65),clamp(blade*.8+n*.15,0.0,.9)),blade+flame+grip*.7);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;uniform float sustain;\nfloat hash(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0)),f.x),f.y);}\nfloat glow(float d,float w){return exp(-d*d/(w*w));}\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.12,progress)*(1.0-smoothstep(.84,1.0,progress));}\nfloat phase(){return progress*6.2831853;}\nhalf4 ink(vec3 c,float v){float a=clamp(v*life(),0.0,.95);return half4(c*a,a);}\nuniform vec3 color;uniform float mode;half4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float r=length(p),a=atan(p.y,p.x),t=phase();\n float n=noise(p*8.0+vec2(cos(t),sin(t))*.7);\n float ring=glow(r-.65-.02*sin(a*5.0+t),.035);float v=ring*(.3+n*.5),white=0.0;\n if(mode<.5){float veins=glow(sin(a*13.0+r*35.0+n*3.0),.12);v+=veins*smoothstep(.45,.6,r)*(1.0-smoothstep(.65,.76,r));white=veins*.55;}\n else if(mode<1.5){float bubbles=pow(max(0.0,cos(a*11.0+t)),24.0)*glow(r-.66,.045);v+=bubbles*.8;white=bubbles*.5;}\n else if(mode<2.5){float plume=pow(max(0.0,sin(a*5.0+r*15.0-t)),6.0)*glow(r-.65,.15);v+=plume*n*.6;}\n else if(mode<3.5){float stars=pow(max(0.0,cos(a*8.0-t)),35.0)*glow(r-.67,.035);v+=stars;white=stars*.8;}\n else if(mode<4.5){v+=glow(sin(a*3.0+r*22.0-t*2.0),.15)*glow(r-.63,.12)*n*.65;}\n else{float glint=pow(max(0.0,cos(a*6.0+t)),22.0);v+=glint*glow(r-.63,.07);white=glint*.7;}\n return ink(mix(color,vec3(1.0),white),v);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;uniform float sustain;\nfloat hash(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0)),f.x),f.y);}\nfloat glow(float d,float w){return exp(-d*d/(w*w));}\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.12,progress)*(1.0-smoothstep(.84,1.0,progress));}\nfloat phase(){return progress*6.2831853;}\nhalf4 ink(vec3 c,float v){float a=clamp(v*life(),0.0,.95);return half4(c*a,a);}\nuniform float wall;half4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float t=phase();vec2 q=p*vec2(wall>.5?24.0:12.0,wall>.5?4.0:12.0);\n vec2 cell=floor(q),f=fract(q)-.5;float h=hash(cell);f-=vec2(hash(cell+3.0)-.5,hash(cell+11.0)-.5)*.4;\n float angle=h*6.2831853+.03*sin(t+cell.x);f=vec2(f.x*cos(angle)-f.y*sin(angle),f.x*sin(angle)+f.y*cos(angle));\n float tilt=(h-.5)*.4,x=f.x-tilt*f.y;float stem=glow(x,.028)*(1.0-smoothstep(.2,.43,abs(f.y)));\n float point=-.35-.08*h,u=clamp((f.y-point)/(.3-point),0.0,1.0),width=(.09+.07*h)*u;\n float spike=(1.0-smoothstep(width*.65,width+.012,abs(x)))*step(point,f.y)*step(f.y,.3);\n float leaves=glow(abs(x)-.14,.04)*pow(max(0.0,sin(f.y*17.0+h*5.0)),10.0);\n float mask=wall>.5?1.0-smoothstep(.35,.75,abs(p.y)):1.0-smoothstep(.8,1.0,length(p));\n float under=noise(p*9.0)*.3;float v=(stem*.7+spike*.9+leaves*.7+under)*mask;\n float face=spike*(x<0.0?.8:.35);vec3 c=mix(vec3(.035,.09,.012),vec3(.4,.49,.14),clamp(face+leaves*.6+under,0.0,1.0));return ink(c,v);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;uniform float sustain;\nfloat hash(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0)),f.x),f.y);}\nfloat glow(float d,float w){return exp(-d*d/(w*w));}\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.12,progress)*(1.0-smoothstep(.84,1.0,progress));}\nfloat phase(){return progress*6.2831853;}\nhalf4 ink(vec3 c,float v){float a=clamp(v*life(),0.0,.95);return half4(c*a,a);}\nuniform vec3 color;half4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float t=phase(),r=length(p);vec2 drift=vec2(cos(t),sin(t));\n float n=noise(p*4.5+drift*.65)*.65+noise(p*10.0-drift*.8)*.35;\n float edge=(1.0-smoothstep(.45,.92,r+(n-.5)*.25))*(1.0-smoothstep(.83,1.0,max(abs(p.x),abs(p.y))));\n vec3 c=mix(color*.18,color,.2+n*.8);return ink(c,edge*(.45+n*.48));\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;uniform float sustain;\nfloat hash(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0)),f.x),f.y);}\nfloat glow(float d,float w){return exp(-d*d/(w*w));}\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.12,progress)*(1.0-smoothstep(.84,1.0,progress));}\nfloat phase(){return progress*6.2831853;}\nhalf4 ink(vec3 c,float v){float a=clamp(v*life(),0.0,.95);return half4(c*a,a);}\nhalf4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float t=phase();\n float grow=sustain>.5?1.0:smoothstep(.04,.38,progress);\n float mask=1.0-smoothstep(.94,1.0,max(abs(p.x),abs(p.y)));\n // Staggered roots form openings in the ground. Each tentacle has an independent rising motion.\n float holes=0.0,lip=0.0,shadows=0.0;\n for(int i=0;i<7;i++){\n  float k=float(i),col=mod(k,3.0),row=floor(k/3.0);\n  vec2 root=vec2(-.62+col*.61+mod(row,2.0)*.15,-.34+row*.49);\n  vec2 q=p-root;float ellipse=length(q/vec2(.17,.075));\n  holes=max(holes,1.0-smoothstep(.65,1.0,ellipse));lip=max(lip,glow(ellipse-.92,.13));\n  shadows=max(shadows,exp(-dot((q-vec2(.07,.06))/vec2(.22,.09),(q-vec2(.07,.06))/vec2(.22,.09))));\n }\n vec3 color=vec3(.018,.009,.027);float alpha=(holes*.68+lip*.2+shadows*.18)*grow;\n color=mix(color,vec3(.2,.095,.24),lip*.55);\n // Rounded bodies extend from each opening; shaded sides and suckers reveal their curvature.\n for(int i=0;i<7;i++){\n  float k=float(i),col=mod(k,3.0),row=floor(k/3.0),phaseOffset=k*1.71;\n  vec2 root=vec2(-.62+col*.61+mod(row,2.0)*.15,-.34+row*.49);\n  vec2 q=p-root;float lean=(col-1.0)*.19+.1*sin(t+phaseOffset);\n  float height=(.45+.13*(.5+.5*sin(t+phaseOffset)))*grow;\n  float u=clamp(-q.y/max(height,.001),0.0,1.0);\n  float curve=lean*u+.105*sin(u*4.2+t+phaseOffset)*u+.065*u*u;\n  float width=mix(.105,.025,u),dx=q.x-curve;\n  float body=(1.0-smoothstep(width*.88,width*1.08,abs(dx)))*(1.0-smoothstep(-.005,.025,q.y))*(1.0-smoothstep(height-.035,height+.02,-q.y));\n  float cap=1.0-smoothstep(.022,.029,length(q-vec2(lean+.105*sin(4.2+t+phaseOffset)+.065,-height)));\n  body=max(body,cap*grow);\n  float side=clamp(dx/max(width,.001),-1.0,1.0),roundness=sqrt(max(0.0,1.0-side*side));\n  float shine=glow(side+.3,.23)*(.35+.2*sin(t+phaseOffset+u*3.0));\n  float underside=glow(side-.58,.27),cups=pow(max(0.0,cos(u*37.7+phaseOffset)),10.0)*underside*smoothstep(.12,.32,u);\n  vec3 flesh=mix(vec3(.025,.012,.042),vec3(.38,.22,.39),roundness*.65+shine*.65);\n  flesh=mix(flesh,vec3(.68,.46,.61),clamp(cups*.8,0.0,.8));\n  color=mix(color,flesh,body);alpha=max(alpha,body*.96);\n }\n return ink(color,alpha*mask);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;uniform float sustain;\nfloat hash(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0)),f.x),f.y);}\nfloat glow(float d,float w){return exp(-d*d/(w*w));}\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.12,progress)*(1.0-smoothstep(.84,1.0,progress));}\nfloat phase(){return progress*6.2831853;}\nhalf4 ink(vec3 c,float v){float a=clamp(v*life(),0.0,.95);return half4(c*a,a);}\nuniform float wall;half4 spell(float2 coord) {\n vec2 p=vec2(coord.x/size.x,(coord.y/size.y-.5)*2.0);float t=phase();\n float v=0.0;\n for(int i=0;i<6;i++){float k=float(i),y=-.65+k*.25+.08*sin(p.x*18.84955-t+k);\n  float line=glow(p.y-y,.014);float streak=pow(max(0.0,cos(p.x*25.13274-t*3.0+k)),9.0);v+=line*(.2+.65*streak);\n }\n if(wall>.5){vec2 q=vec2(fract(p.x*8.0)-.5,p.y*.65);float a=atan(q.y,q.x),r=length(q);v=v*.45+glow(r-.29-.04*sin(a*3.0+t),.022)*(.35+.55*pow(max(0.0,cos(a-t)),4.0))+glow(r-.38,.018)*.22;}\n float n=noise(vec2(p.x*14.0,p.y*5.0)+vec2(cos(t),sin(t)));\n float veil=glow(p.y,.5)*n*.16;float mask=smoothstep(0.0,.03,p.x)*(1.0-smoothstep(.97,1.0,p.x));\n return ink(mix(vec3(.36,.6,.7),vec3(.92,.98,1.0),clamp(v,0.0,.9)),(v+veil)*mask);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;uniform float sustain;\nfloat hash(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0)),f.x),f.y);}\nfloat glow(float d,float w){return exp(-d*d/(w*w));}\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.12,progress)*(1.0-smoothstep(.84,1.0,progress));}\nfloat phase(){return progress*6.2831853;}\nhalf4 ink(vec3 c,float v){float a=clamp(v*life(),0.0,.95);return half4(c*a,a);}\nhalf4 spell(float2 coord) {\n vec2 p=vec2(coord.x/size.x,(coord.y/size.y-.5)*2.0);float t=phase();\n float grow=sustain>.5?1.0:smoothstep(0.0,.35,progress);vec2 cell=vec2(floor(p.x*8.0),0.0);float h=hash(cell);\n float top=.65-grow*(1.05+h*.25);float slab=step(top,p.y)*(1.0-smoothstep(.56,.65,p.y));\n float edge=glow(fract(p.x*8.0)-.5,.015)+glow(p.y-top,.018);\n float facets=.25+.55*abs(fract(p.x*6.0+p.y*.27)-.5)*2.0+.1*noise(vec2(p.x*40.0,p.y*13.0));\n float cracks=glow(sin(p.x*58.0+p.y*3.0+noise(vec2(p.x*13.0,p.y*9.0))*.8),.045);\n float sheen=glow(p.y-.3*sin(t)-.2*p.x,.045)*.3;\n vec3 c=mix(vec3(.12,.35,.52),vec3(.65,.92,1.0),clamp(facets+edge*.4+cracks*.3+sheen,0.0,1.0));\n return ink(c,slab*.86*(1.0-smoothstep(.97,1.0,abs(p.x-.5)*2.0)));\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;uniform float sustain;\nfloat hash(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0)),f.x),f.y);}\nfloat line(vec2 p,vec2 a,vec2 b){vec2 d=b-a;return length(p-a-d*clamp(dot(p-a,d)/max(dot(d,d),.0001),0.0,1.0));}\nfloat glow(float d,float w){return exp(-d*d/(w*w));}\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.13,progress)*(1.0-smoothstep(.85,1.0,progress));}\nhalf4 ink(vec3 c,float v){float a=clamp(v*life(),0.0,.92);return half4(c*a,a);}\nuniform vec3 color;uniform float mode;half4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float r=length(p),a=atan(p.y,p.x),t=progress*6.2831853;\n float n=noise(p*8.0+vec2(cos(t),sin(t))*.7);float v=0.0,white=0.0;\n if(mode<.5){float ring=glow(r-.66,.018);float drag=pow(max(0.0,cos(a*6.0+t)),16.0);v=ring*(.25+.6*drag)+glow(r-.6,.09)*n*.22;white=drag*.4;}\n else if(mode<2.5){float bend=.035*sin(a*5.0-t)+(n-.5)*.05;float strands=glow(r-.63-bend,.025);float knots=pow(max(0.0,sin(a*7.0+r*9.0-t)),9.0)*glow(r-.64,.12);v=strands*.7+knots*n*.7;white=knots*.25;}\n else if(mode<3.5){for(int i=0;i<7;i++){float k=float(i),theta=k*.8976+t;vec2 q=vec2(cos(theta),sin(theta))*(.61+.035*sin(t+k));vec2 d=abs(p-q);v+=exp(-dot(d,d)*1500.0)+exp(-min(d.x,d.y)*150.0-max(d.x,d.y)*37.0)*.3;}v+=glow(r-.62,.04)*.24;white=v*.5;}\n else if(mode<4.5){float curve=sin(a*3.0+r*17.0+sin(t)*2.0);v=glow(curve,.16)*glow(r-.62,.13)*(.3+n*.5);v+=glow(r-.67-.025*sin(a*6.0-t),.018)*.35;}\n else if(mode<5.5){float fog=pow(max(0.0,sin(a*5.0+r*14.0-t)),7.0);v=glow(r-.64,.09)*(.2+n*.6)+fog*glow(r-.63,.14)*.6;}\n else if(mode<6.5){float fade=pow(abs(sin(t)),3.0);float vortex=glow(sin(a*4.0+r*17.0-t*2.0),.17)*glow(r-.63,.12);v=vortex*.7*fade+glow(r-.66,.025)*fade*.5;white=v*.5;}\n else{float facet=pow(max(0.0,cos(a*8.0-t)),20.0);v=glow(r-.65,.03)*(.5+n*.4)+facet*glow(r-.7,.04);white=facet*.6;}\n return ink(mix(color*.65,vec3(.97,.98,1.0),clamp(white,0.0,.6)),v);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;uniform float sustain;\nfloat hash(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0)),f.x),f.y);}\nfloat line(vec2 p,vec2 a,vec2 b){vec2 d=b-a;return length(p-a-d*clamp(dot(p-a,d)/max(dot(d,d),.0001),0.0,1.0));}\nfloat glow(float d,float w){return exp(-d*d/(w*w));}\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.13,progress)*(1.0-smoothstep(.85,1.0,progress));}\nhalf4 ink(vec3 c,float v){float a=clamp(v*life(),0.0,.92);return half4(c*a,a);}\nhalf4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float r=length(p),a=atan(p.y,p.x),t=progress*6.2831853;\n float grow=sustain>.5?1.0:smoothstep(0.0,.25,progress);\n float radius=.6+.05*sin(a*3.0+t),stem=glow(r-radius,.03);\n float second=glow(r-.63-.045*sin(a*4.0-t),.022);\n float thorns=pow(max(0.0,cos(a*13.0+t)),24.0)*glow(r-.69,.045);\n float light=glow(r-radius+.012,.009)*.4;float mask=step(a, -3.14159+grow*6.28319);\n vec3 c=mix(vec3(.045,.13,.018),vec3(.4,.6,.12),clamp(light+thorns*.6,0.0,1.0));return ink(c,(stem+second*.7+thorns*.9)*mask);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;uniform float sustain;\nfloat hash(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0)),f.x),f.y);}\nfloat line(vec2 p,vec2 a,vec2 b){vec2 d=b-a;return length(p-a-d*clamp(dot(p-a,d)/max(dot(d,d),.0001),0.0,1.0));}\nfloat glow(float d,float w){return exp(-d*d/(w*w));}\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.13,progress)*(1.0-smoothstep(.85,1.0,progress));}\nhalf4 ink(vec3 c,float v){float a=clamp(v*life(),0.0,.92);return half4(c*a,a);}\nhalf4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float t=progress*6.2831853,v=0.0;\n for(int i=0;i<8;i++){float k=float(i),a=k*.785398;vec2 d=vec2(cos(a),sin(a));vec2 n=vec2(-d.y,d.x);vec2 joint=d*(.56+.02*sin(t+k));\n  float line1=line(p,d*.43,joint+n*.07),line2=line(p,joint+n*.07,d*.72+n*.1);v=max(v,glow(min(line1,line2),.017));v+=glow(length(p-(d*.72+n*.1)),.025)*.35;\n }return ink(vec3(.48,.8,.58),v*.7);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;uniform float sustain;\nfloat hash(vec2 p){p=fract(p*vec2(.1031,.11369));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0)),f.x),f.y);}\nfloat line(vec2 p,vec2 a,vec2 b){vec2 d=b-a;return length(p-a-d*clamp(dot(p-a,d)/max(dot(d,d),.0001),0.0,1.0));}\nfloat glow(float d,float w){return exp(-d*d/(w*w));}\nfloat life(){return sustain>.5?1.0:smoothstep(0.0,.13,progress)*(1.0-smoothstep(.85,1.0,progress));}\nhalf4 ink(vec3 c,float v){float a=clamp(v*life(),0.0,.92);return half4(c*a,a);}\nhalf4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float r=length(p),a=atan(p.y,p.x),t=progress*6.2831853;\n float rings=glow(r-.84,.012)+glow(r-.77,.008)*.6+glow(r-.87,.03)*.25;\n float braid=glow(r-.8-.015*sin(a*24.0+t),.006)*.5;\n float accents=pow(max(0.0,cos(a*16.0-t)),32.0)*glow(r-.83,.022);\n float curtain=glow(r-.81,.1)*noise(p*12.0+vec2(cos(t),sin(t)))*.14;\n return ink(mix(vec3(.5,.35,.16),vec3(1.0,.85,.48),clamp(rings+accents,0.0,1.0)),rings*.7+braid+accents*.6+curtain);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size; uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress; uniform float seed; uniform float mode;\nconst float TAU=6.28318530718;\nfloat hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}\nfloat glow(float d,float w){return exp(-d*d/(w*w));}\nfloat sq(float x){return x*x;}\nfloat seg(vec2 p,vec2 a,vec2 b){vec2 v=b-a;return length(p-a-v*clamp(dot(p-a,v)/dot(v,v),0.0,1.0));}\nfloat smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.0,1.0);return mix(b,a,h)-k*h*(1.0-h);}\n// one finger as three jointed bones from base b, each turned c further; j1 and j2 are its knuckles\nfloat finger(vec2 p,vec2 b,float ang,vec3 L,vec2 c,float r,out vec2 j1,out vec2 j2){\n j1=b+vec2(cos(ang),sin(ang))*L.x;ang+=c.x;j2=j1+vec2(cos(ang),sin(ang))*L.y;ang+=c.y;\n vec2 tip=j2+vec2(cos(ang),sin(ang))*L.z;\n return min(min(seg(p,b,j1)-r,seg(p,j1,j2)-r*.9),seg(p,j2,tip)-r*.8);}\nhalf4 ink(vec3 c,float a){a=clamp(a,0.0,.96);return half4(c*a,a);}\nhalf4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0,drift=vec2(cos(progress*TAU),sin(progress*TAU));\n float t=progress*TAU,r=length(p),angle=atan(p.y,p.x);\n float n=noise(p*6.0+drift*.65)*.65+noise(p*15.0-drift)*.35;\n float circle=1.0-smoothstep(.975,1.0,r),square=1.0-smoothstep(.975,1.0,max(abs(p.x),abs(p.y)));\n float rim=glow(r-.977,.012),sqRim=glow(max(abs(p.x),abs(p.y))-.977,.012);\n vec3 c=vec3(.5,.7,1);float a=0.0;\n if(mode<.5){ // Moonbeam: illuminated cylinder footprint, drifting silver motes.\n  float shafts=pow(max(0.0,cos(angle*12.0+t+noise(vec2(r*9.0,0))*2.0)),8.0);\n  a=circle*(.12+.17*n+.17*shafts*pow(r,2.0))+rim*.7;\n  float mote=0.0;for(int i=0;i<15;i++){float k=float(i),v=k*2.39996;vec2 q=vec2(cos(v),sin(v))*(.15+.7*hash(vec2(k,4)))+drift*.025; mote+=glow(length(p-q),.012)*(.5+.5*sin(t+k));}\n  a+=mote*.75;c=mix(vec3(.32,.43,.76),vec3(.91,.96,1),clamp(.4+rim+mote,0.0,1.0));\n }else if(mode<1.5){ // Entangle: interwoven ground runners and paired leaves.\n  float vines=0.0,leaves=0.0;for(int i=0;i<7;i++){float k=float(i),y=-.86+k*.285+.09*sin(p.x*7.0+k+.06*sin(t));\n   vines+=glow(p.y-y,.014);vec2 q=vec2(fract((p.x+1.0)*4.0+k*.17)-.5,(p.y-y)*9.0);\n   leaves+=exp(-sq((q.x+.1)/.19)-sq((q.y-.22)/.32))+exp(-sq((q.x-.12)/.18)-sq((q.y+.23)/.3));}\n  a=square*(.08*n+vines*.8+leaves*.7)+sqRim*.22;c=mix(vec3(.055,.15,.025),vec3(.37,.64,.13),clamp(leaves*.8+vines*.2+n*.18,0.0,1.0));\n }else if(mode<2.5){ // Web: anchored threads with sagging cross-strands, subtle silver shimmer.\n  vec2 q=p+vec2(.11,.06);float ar=atan(q.y,q.x),rr=length(q);\n  float spokes=glow(sin(ar*9.0+.1*sin(rr*8.0)),.035)*smoothstep(.03,.2,rr);\n  float strands=glow(sin(rr*34.0+.8*cos(ar*18.0)),.1);\n  float corner=glow(abs(p.x+p.y)-.08*sin(p.x*9.0),.009)+glow(abs(p.x-p.y)-.06*sin(p.y*8.0),.009);\n  a=square*(.045+spokes*.55+strands*.42+corner*.25)*( .85+.15*sin(t+rr*6.0));c=vec3(.78,.86,.94);\n }else if(mode<4.5){ // Fog / Darkness have exact circles with softly textured interiors.\n  float edge=circle;float billow=noise(p*3.4+drift*.55);\n  if(mode<3.5){ // Dense fog: tiny periodic drift, restrained contrast, stable feathered perimeter.\n   float fogBody=noise(p*3.4+drift*.055),fogDetail=noise(p*10.0-drift*.035);\n   float softEdge=1.0-smoothstep(.73,.995,r+(noise(p*6.0)-.5)*.065);\n   a=softEdge*(.56+.18*fogBody+.07*fogDetail);\n   c=mix(vec3(.53,.59,.62),vec3(.75,.79,.8),fogBody*.7+fogDetail*.3);}\n  else{a=edge*(.83+.12*n)+rim*.2;c=mix(vec3(.008,.006,.018),vec3(.08,.035,.14),n);}\n }else if(mode<5.5){ // Grease: nonflammable wet sheen, not fire or acid.\n  float puddle=square*(.27+.12*n),sheen=glow(sin(p.x*3.0+p.y*5.0+n*2.0+.12*sin(t)),.12);\n  a=puddle+square*sheen*.22+sqRim*.18;c=mix(vec3(.1,.13,.11),vec3(.51,.57,.43),sheen*.65+n*.15);\n }else if(mode<7.5){ // Fire: a 20-foot edge-to-edge line, or 20-foot outer diameter ring.\n  float ring=step(6.5,mode),d=mix(abs(p.y),abs(r-.935),ring);\n  float band=mix(.12,.065,ring),edge=mix(1.0,circle,ring);\n  float flameNoise=noise(vec2(mix(p.x*16.0,angle*7.0,ring),d*20.0)+drift*1.4);\n  float flame=glow(d,band*(.65+flameNoise)),halo=glow(d,band*2.4);\n  a=(flame*.95+halo*.33)*edge;\n  c=mix(vec3(.9,.055,.006),vec3(1,.65,.055),clamp(flameNoise*.75+flame*.35,0.0,1.0));c=mix(c,vec3(1,.96,.65),pow(flame,4.0)*.6);\n  // A quiet ember wash marks the selected hot side: downwards / inside the ring.\n  float hot=mix(smoothstep(.02,.2,p.y)*(1.0-smoothstep(.75,.98,p.y)),(1.0-smoothstep(.73,.89,r)),ring);\n  a+=hot*.07*edge;\n }else if(mode<8.5){ // Silence: calm transparent field; broken wave arcs die at its boundary.\n  float wave=glow(r-(.73+.035*sin(t)),.009)*(.3+.7*sq(sin(angle*3.0)));\n  a=circle*.045+rim*.48+wave*.17;c=vec3(.43,.66,.78);\n }else if(mode<9.5){ // Sleet: periodic falling streaks and icy ground glimpses.\n  float stones=0.0;for(int i=0;i<45;i++){float k=float(i);vec2 q=vec2(hash(vec2(k,2))*2.0-1.0,fract(hash(vec2(k,8))+progress*2.0)*2.2-1.1);\n   stones+=exp(-sq((p.x-q.x)/.006)-sq((p.y-q.y)/.037));}\n  float frost=glow(sin(p.x*21.0+p.y*14.0+n*6.0),.08)*.16;\n  a=circle*(.16+.23*n+stones*.8+frost)+rim*.35;c=mix(vec3(.23,.37,.48),vec3(.83,.94,1),clamp(stones+frost+n*.25,0.0,1.0));\n }else if(mode<10.5){ // Mage Hand: a spectral hand seen from the back, reaching up and to the right; its fingers beckon in turn\n  vec2 q=p-vec2(.06,.02)-vec2(.025*cos(t),.04*sin(t));\n  float sway=.07*sin(t+.6),cs=cos(sway),sn=sin(sway);q=vec2(cs*q.x+sn*q.y,-sn*q.x+cs*q.y);\n  vec2 u=vec2(.77,-.64),v=vec2(.64,.77),c0=vec2(-.13,.13);float a0=atan(u.y,u.x);\n  vec2 pl=vec2(dot(q-c0,u),dot(q-c0,v)),bb=abs(pl)-vec2(.19,.15);\n  float palm=length(max(bb,vec2(0)))+min(max(bb.x,bb.y),0.0)-.1;\n  float d=smin(palm,seg(q,c0-u*.16,c0-u*.7)-.14,.09);\n  float lines=0.0,joints=0.0,tendons=0.0;vec2 j1,j2;\n  for(int i=0;i<4;i++){float k=float(i); // little finger to index finger\n   float len=k<.5?.78:(k<1.5?.94:(k<2.5?1.0:.93)),r=k<.5?.054:.064,wave=.5+.5*sin(t-k*.75);\n   vec2 b=c0+u*.23+v*(-.165+k*.112);\n   float f=finger(q,b,a0-.3+k*.16,vec3(.23,.15,.12)*len,vec2(.16+.3*wave,.22+.36*wave),r,j1,j2);\n   d=smin(d,f,.03);lines+=glow(f,.0075);\n   joints+=glow(length(q-b),.045)*.6+glow(length(q-j1),.032)+glow(length(q-j2),.026)*.7;\n   tendons+=glow(seg(q,c0-u*.05+v*(-.06+k*.04),b),.012);}\n  float th=finger(q,c0+v*.19-u*.03,a0+1.12,vec3(.17,.14,.09),vec2(.2+.1*sin(t+1.2),.24),.074,j1,j2);\n  d=smin(d,th,.05);lines+=glow(th,.0075);joints+=glow(length(q-j1),.035);\n  float along=dot(q-c0,-u),dissolve=1.0-smoothstep(.26,.66,along+.14*(noise(q*7.0+drift*.6)-.5));\n  float body=(1.0-smoothstep(-.012,.008,d))*dissolve,depth=clamp(-d/.09,0.0,1.0);\n  float edge=body*pow(1.0-depth,2.0),outline=glow(d,.016)*dissolve;\n  float inner=noise(q*5.0+drift*.8)*.6+noise(q*13.0-drift*.5)*.4;\n  float halo=glow(max(d,0.0),.12)*dissolve*(.75+.25*sin(t*2.0));\n  vec2 w=q-(c0-u*.5);float wa=dot(w,-u),wb=dot(w,v);\n  float wisp=smoothstep(-.12,.1,wa)*(1.0-smoothstep(.1,.5,wa))*glow(wb+.07*sin(wa*9.0-t),.07+wa*.25)*(.4+.9*noise(vec2(wa*5.0,wb*8.0)+drift*.9));\n  float mote=0.0;for(int i=0;i<8;i++){float k=float(i),ang=k*.785+t,rad=.6+.08*sin(t*2.0+k);\n   mote+=glow(length(q-c0-u*.12-vec2(cos(ang),sin(ang)*.8)*rad),.013)*(.55+.45*sin(t+k*1.7));}\n  a=body*(.27+.17*inner)+edge*.55+outline*.8+lines*body*.55+joints*body*.22+tendons*body*.16+halo*.3+wisp*.38+mote*.75;\n  c=mix(vec3(.1,.34,.85),vec3(.25,.65,1),clamp(inner*.6+depth*.35,0.0,1.0));\n  c=mix(c,vec3(.72,.9,1),clamp(edge*.9+outline*.85+lines*.6+joints*.3+mote,0.0,1.0));\n }else if(mode<11.5){ // Spiritual Weapon: idle force sword with hilt, pommel and a faceted blade.\n  vec2 q=p;q.y-=.035*sin(t);float blade=step(-.82,q.y)*step(q.y,.24)*(1.0-smoothstep(.005,.02,abs(q.x)-min(.15,(q.y+.83)*.27)));\n  float guard=1.0-smoothstep(.035,.055,seg(q,vec2(-.4,.27),vec2(.4,.27)));\n  float grip=1.0-smoothstep(.055,.07,seg(q,vec2(0,.31),vec2(0,.62)));\n  float pommel=1.0-smoothstep(.075,.095,length(q-vec2(0,.7)));\n  a=blade*.85+guard*.95+grip*.8+pommel*.9;float halo=glow(q.x,.24)*smoothstep(-.95,-.7,q.y)*(1.0-smoothstep(.65,.85,q.y));a+=halo*.12;\n  c=mix(vec3(.36,.18,.75),vec3(.83,.72,1),q.x<0.0?.8:.35);c=mix(c,vec3(1,.8,.3),clamp(guard+grip+pommel,0.0,1.0));\n }else if(mode<12.5){ // Arcane Shield: blue force dome, curved lattice and projected rim.\n  float dome=sqrt(max(0.0,1.0-r*r));vec2 q=p/(.75+.25*dome);\n  vec2 cell=vec2(q.x*9.0,q.y*10.4);cell.x+=mod(floor(cell.y),2.0)*.5;\n  vec2 f=fract(cell)-.5;float hex=glow(max(abs(f.x)*.866+abs(f.y)*.5,abs(f.y))-.43,.025);\n  float sweep=glow(dome-(.55+.18*sin(t)),.045);\n  a=circle*(.07+.13*hex+.12*sweep)+rim*.8+glow(r-.92,.018)*.2;\n  c=mix(vec3(.035,.18,.62),vec3(.3,.78,1),clamp(hex*.35+rim+sweep*.5,0.0,1.0));\n }else if(mode<13.5){ // Silence v2: soft blue hush, without concentric outlines or symbols.\n  float soft=1.0-smoothstep(.72,1.0,r);\n  float perimeter=glow(r-.89,.075)*(.22+.04*sin(t));\n  float haze=noise(p*3.0+drift*.18);\n  a=soft*(.035+.065*haze)+perimeter;\n  c=mix(vec3(.16,.33,.47),vec3(.48,.7,.81),clamp(perimeter*2.0+haze*.25,0.0,1.0));\n }else{ // Silence v3: fine lavender perimeter and slow, sparse dust flecks.\n  float edgeLine=glow(r-.958,.006);\n  float flecks=0.0;for(int i=0;i<12;i++){float k=float(i),v=k*2.39996;\n   vec2 q=vec2(cos(v),sin(v))*(.22+.56*hash(vec2(k,7)))+drift*.018;\n   flecks+=glow(length(p-q),.007)*(.22+.12*sin(t+k));}\n  a=circle*.018+edgeLine*(.28+.04*sin(t))+flecks*.5;\n  c=vec3(.67,.61,.81);\n }\n return ink(c,a);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n",
  "uniform vec2 size;uniform float time;\nuniform float period;\nuniform float fade;\nfloat progress;uniform float seed;uniform float mode;\nconst float TAU=6.28318530718;\nfloat hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}\nfloat noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}\nfloat glow(float d,float w){return exp(-d*d/(w*w));}\nfloat seg(vec2 p,vec2 a,vec2 b){vec2 v=b-a;return length(p-a-v*clamp(dot(p-a,v)/dot(v,v),0.0,1.0));}\nhalf4 ink(vec3 c,float a){a=clamp(a,0.0,.97);return half4(c*a,a);}\nhalf4 spell(float2 coord) {\n vec2 p=(coord/size-.5)*2.0;float t=TAU*progress,r=length(p),ang=atan(p.y,p.x);\n vec2 drift=vec2(cos(t),sin(t));float n=noise(p*7.0+drift*.6);\n float mask=1.0-smoothstep(.96,1.0,r),a=0.0;vec3 c=vec3(.3,.1,.6);\n if(mode<.5){ // Shield v1: translucent obsidian dome, flowing violet event horizon.\n  float edge=.86+.009*sin(ang*9.0+t)+.006*sin(ang*17.0-t);\n  float rim=glow(r-edge,.014),corona=glow(r-edge,.055)*(.3+.7*n);\n  float dome=sqrt(max(0.0,1.0-r*r));\n  float ribbons=glow(sin(ang*4.0+dome*14.0+t),.15)*smoothstep(.25,.6,r)*(1.0-smoothstep(.8,.9,r));\n  a=mask*(.16+.13*n)+rim*.8+corona*.34+ribbons*.11;\n  c=mix(vec3(.025,.012,.065),vec3(.52,.24,.9),clamp(rim*.9+corona*.45+ribbons*.4,0.0,1.0));\n }else if(mode<1.5){ // Shield v2: fractured black-glass shell with cool blue-violet seams.\n  float dome=sqrt(max(0.0,1.0-r*r));vec2 q=p/(.65+.35*dome);\n  float seams=0.0;for(int i=0;i<5;i++){float k=float(i),v=k*1.256637;\n   vec2 axis=vec2(cos(v),sin(v));float stripe=dot(q,axis)+.035*sin(dot(q,axis.yx)*16.0+k);\n   seams=max(seams,glow(stripe-(k-2.0)*.12,.008));}\n  float edge=glow(r-.88,.013),sweep=glow(dome-(.62+.14*sin(t)),.035);\n  float interior=1.0-smoothstep(.86,.89,r);\n  float facets=.08+.055*noise(floor(q*8.0));\n  a=interior*(facets+seams*.34+sweep*.09)+edge*.85;\n  c=mix(vec3(.018,.025,.06),vec3(.3,.48,.95),clamp(seams*.85+edge+sweep*.4,0.0,1.0));\n }else if(mode<2.5){ // Glyph v1: inscribed double seal, twelve angular sigils and a central void diamond.\n  float rings=glow(r-.86,.009)+glow(r-.76,.006)*.6;\n  float sigils=0.0;for(int i=0;i<12;i++){float k=float(i),v=k*TAU/12.0;\n   vec2 q=vec2(p.x*cos(v)+p.y*sin(v),-p.x*sin(v)+p.y*cos(v));\n   float d=min(seg(q,vec2(.785,-.027),vec2(.835,.027)),seg(q,vec2(.785,.027),vec2(.835,-.027)));\n   d=min(d,seg(q,vec2(.785,-.027),vec2(.785,.027)));sigils+=glow(d,.005);}\n  float diamond=glow(abs(p.x)+abs(p.y)-.36,.009);\n  float cross=glow(seg(p,vec2(0,-.59),vec2(0,.59)),.006)+glow(seg(p,vec2(-.59,0),vec2(.59,0)),.006);\n  float links=glow(r-.59,.006)*(.35+.25*cos(ang*4.0));\n  float pulse=.77+.16*sin(t);a=(rings+sigils*.6+diamond*.85+cross*.4+links)*pulse;\n  a+=glow(r-.86,.045)*.12+glow(r,.31)*.09;\n  c=mix(vec3(.24,.06,.45),vec3(.72,.35,1),clamp(rings+sigils*.7+diamond,0.0,1.0));\n }else if(mode<3.5){ // Glyph v2: counter-rotating broken rings, a six-point aperture and orbiting sparks.\n  float outer=glow(r-.85,.011)*smoothstep(.16,.28,abs(sin(ang*4.0-t)));\n  float inner=glow(r-.63,.008)*smoothstep(.1,.22,abs(sin(ang*3.0+t)));\n  vec2 q=p;\n  float triA=abs(max(dot(q,vec2(.866,.5)),max(dot(q,vec2(-.866,.5)),-q.y))-.3);\n  float triB=abs(max(dot(q,vec2(.866,-.5)),max(dot(q,vec2(-.866,-.5)),q.y))-.3);\n  float seal=glow(triA,.007)+glow(triB,.007);\n  float sparks=0.0;for(int i=0;i<6;i++){float v=float(i)*TAU/6.0+t;vec2 point=vec2(cos(v),sin(v))*.74;sparks+=glow(length(p-point),.015);}\n  float aperture=glow(r-.16,.012);a=outer*.8+inner*.65+seal*.65+sparks*.8+aperture*.65;\n  a+=glow(r,.16)*(.28+.04*sin(t))+glow(r-.85,.05)*.07;\n  c=mix(vec3(.055,.11,.23),vec3(.39,.65,.94),clamp(outer+inner+seal+sparks,0.0,1.0));\n }else{ // Glyph v3: larger, bolder v1 seal with a slow rotating outer band.\n  float rotation=t/12.0;\n  float rings=glow(r-.86,.012)*.92+glow(r-.76,.009)*.72;\n  float segments=glow(r-.91,.008)*smoothstep(.08,.23,abs(sin((ang-rotation)*6.0)));\n  float sigils=0.0;for(int i=0;i<12;i++){float v=float(i)*TAU/12.0+rotation;\n   vec2 q=vec2(p.x*cos(v)+p.y*sin(v),-p.x*sin(v)+p.y*cos(v));\n   float d=min(seg(q,vec2(.785,-.027),vec2(.835,.027)),seg(q,vec2(.785,.027),vec2(.835,-.027)));\n   d=min(d,seg(q,vec2(.785,-.027),vec2(.785,.027)));sigils+=glow(d,.007);}\n  float diamond=glow(abs(p.x)+abs(p.y)-.36,.013);\n  float cross=glow(seg(p,vec2(0,-.59),vec2(0,.59)),.008)+glow(seg(p,vec2(-.59,0),vec2(.59,0)),.008);\n  float links=glow(r-.59,.008)*(.4+.25*cos(ang*4.0));\n  float pulse=.8+.1*sin(t),faintGlow=.07+.035*sin(t);\n  a=(rings+segments*.7+sigils*.85+diamond*.95+cross*.55+links)*pulse;\n  a+=glow(r-.84,.09)*faintGlow+glow(r,.48)*faintGlow*.55;\n  c=mix(vec3(.26,.035,.48),vec3(.76,.38,1),clamp(rings+segments*.55+sigils*.7+diamond,0.0,1.0));\n }\n return ink(c,a*mask);\n}\nhalf4 main(float2 coord) {\n  progress = fract(time / period);\n  return spell(coord) * half(fade);\n}\n"
];
var CREATURE_LOOPS = { "Aid": { "period": 2.4, "items": [{ "s": 0, "w": 1.75, "h": 1.75, "dx": 0, "dy": 0, "ground": true, "seed": 1.8, "u": { "color": { "x": 1, "y": 0.32, "z": 0.28 }, "mode": 0, "sustain": 1 } }] }, "Arcane Shield": { "period": 2.4, "items": [{ "s": 6, "w": 1.594, "h": 1.594, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 0.3, "y": 0.48, "z": 1 }, "mode": 0, "sustain": 1 } }] }, "Aura of Life": { "period": 2.4, "items": [{ "s": 0, "w": 1.75, "h": 1.75, "dx": 0, "dy": 0, "ground": true, "seed": 1.8, "u": { "color": { "x": 0.35, "y": 0.9, "z": 0.4 }, "mode": 1, "sustain": 1 } }, { "s": 1, "w": 6.406, "h": 6.406, "dx": 0, "dy": 0, "ground": true, "seed": 1.8, "u": { "color": { "x": 0.35, "y": 0.9, "z": 0.4 }, "mode": 1, "sustain": 1 } }] }, "Bane": { "period": 2.8, "items": [{ "s": 15, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1, "mode": 1, "color": { "x": 0.75, "y": 0.13, "z": 0.2 } } }] }, "Barkskin": { "period": 2.4, "items": [{ "s": 2, "w": 1.5, "h": 1.5, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 0.57, "y": 0.34, "z": 0.14 }, "mode": 0, "sustain": 1 } }] }, "Beacon of Hope": { "period": 2.4, "items": [{ "s": 0, "w": 1.75, "h": 1.75, "dx": 0, "dy": 0, "ground": true, "seed": 1.8, "u": { "color": { "x": 1, "y": 0.78, "z": 0.25 }, "mode": 1, "sustain": 1 } }] }, "Blindness/Deafness": { "period": 2.8, "items": [{ "s": 15, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1, "mode": 5, "color": { "x": 0.18, "y": 0.2, "z": 0.3 } } }] }, "Charm Person": { "period": 2.8, "items": [{ "s": 15, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1, "mode": 3, "color": { "x": 1, "y": 0.43, "z": 0.67 } } }] }, "Confusion": { "period": 2.8, "items": [{ "s": 15, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1, "mode": 4, "color": { "x": 0.8, "y": 0.36, "z": 0.85 } } }] }, "Death Ward": { "period": 2.4, "items": [{ "s": 1, "w": 1.594, "h": 1.594, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 0.7, "y": 0.85, "z": 1 }, "mode": 1, "sustain": 1 } }] }, "Enhance Ability": { "period": 2.4, "items": [{ "s": 0, "w": 1.75, "h": 1.75, "dx": 0, "dy": 0, "ground": true, "seed": 1.8, "u": { "color": { "x": 0.25, "y": 0.9, "z": 0.78 }, "mode": 0, "sustain": 1 } }] }, "Ensnaring Strike": { "period": 2.8, "items": [{ "s": 16, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1 } }] }, "Flame Blade": { "period": 2.8, "items": [{ "s": 8, "w": 1.55, "h": 1.55, "dx": 0.438, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1 } }] }, "Foresight": { "period": 2.4, "items": [{ "s": 1, "w": 1.594, "h": 1.594, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 1, "y": 0.78, "z": 0.25 }, "mode": 1, "sustain": 1 } }] }, "Freedom of Movement": { "period": 2.4, "items": [{ "s": 3, "w": 1.625, "h": 1.625, "dx": 0, "dy": 0, "ground": true, "seed": 1.8, "u": { "color": { "x": 0.25, "y": 0.9, "z": 0.78 }, "mode": 0, "sustain": 1 } }] }, "Haste": { "period": 2.4, "items": [{ "s": 3, "w": 1.625, "h": 1.625, "dx": 0, "dy": 0, "ground": true, "seed": 1.8, "u": { "color": { "x": 1, "y": 0.78, "z": 0.25 }, "mode": 0, "sustain": 1 } }] }, "Heat Metal": { "period": 2.8, "items": [{ "s": 9, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1, "color": { "x": 1, "y": 0.3, "z": 0.035 }, "mode": 0 } }] }, "Heroes\u2019 Feast": { "period": 2.4, "items": [{ "s": 0, "w": 1.75, "h": 1.75, "dx": 0, "dy": 0, "ground": true, "seed": 1.8, "u": { "color": { "x": 1, "y": 0.78, "z": 0.25 }, "mode": 1, "sustain": 1 } }] }, "Heroism": { "period": 2.4, "items": [{ "s": 0, "w": 1.75, "h": 1.75, "dx": 0, "dy": 0, "ground": true, "seed": 1.8, "u": { "color": { "x": 1, "y": 0.78, "z": 0.25 }, "mode": 0, "sustain": 1 } }] }, "Hex": { "period": 2.8, "items": [{ "s": 15, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1, "mode": 2, "color": { "x": 0.5, "y": 0.14, "z": 0.7 } } }] }, "Holy Aura": { "period": 2.4, "items": [{ "s": 1, "w": 1.594, "h": 1.594, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 1, "y": 0.78, "z": 0.25 }, "mode": 1, "sustain": 1 } }, { "s": 1, "w": 6.406, "h": 6.406, "dx": 0, "dy": 0, "ground": true, "seed": 1.8, "u": { "color": { "x": 1, "y": 0.78, "z": 0.25 }, "mode": 1, "sustain": 1 } }] }, "Hypnotic Pattern": { "period": 2.8, "items": [{ "s": 15, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1, "mode": 4, "color": { "x": 0.65, "y": 0.35, "z": 1 } } }] }, "Mage Armor": { "period": 2.4, "items": [{ "s": 1, "w": 1.594, "h": 1.594, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 0.25, "y": 0.65, "z": 1 }, "mode": 0, "sustain": 1 } }] }, "Magic Weapon": { "period": 2.4, "items": [{ "s": 4, "w": 1.719, "h": 1.719, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 0.65, "y": 0.35, "z": 1 }, "mode": 0, "sustain": 1 } }] }, "Mind Blank": { "period": 2.4, "items": [{ "s": 1, "w": 1.594, "h": 1.594, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 0.7, "y": 0.85, "z": 1 }, "mode": 2, "sustain": 1 } }] }, "Nondetection": { "period": 2.4, "items": [{ "s": 5, "w": 1.813, "h": 1.813, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 0.25, "y": 0.9, "z": 0.78 }, "mode": 0, "sustain": 1 } }] }, "Protection from Energy": { "period": 2.4, "items": [{ "s": 1, "w": 1.594, "h": 1.594, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 1, "y": 0.32, "z": 0.28 }, "mode": 0, "sustain": 1 } }] }, "Protection from Evil and Good": { "period": 2.4, "items": [{ "s": 1, "w": 1.594, "h": 1.594, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 1, "y": 0.78, "z": 0.25 }, "mode": 1, "sustain": 1 } }] }, "Protection from Poison": { "period": 2.4, "items": [{ "s": 1, "w": 1.594, "h": 1.594, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 0.35, "y": 0.9, "z": 0.4 }, "mode": 2, "sustain": 1 } }] }, "Ray of Sickness": { "period": 2.8, "items": [{ "s": 9, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1, "color": { "x": 0.35, "y": 0.65, "z": 0.08 }, "mode": 2 } }] }, "Regenerate": { "period": 2.4, "items": [{ "s": 0, "w": 1.75, "h": 1.75, "dx": 0, "dy": 0, "ground": true, "seed": 1.8, "u": { "color": { "x": 0.35, "y": 0.9, "z": 0.4 }, "mode": 0, "sustain": 1 } }] }, "Resistance": { "period": 2.4, "items": [{ "s": 1, "w": 1.594, "h": 1.594, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 0.25, "y": 0.9, "z": 0.78 }, "mode": 2, "sustain": 1 } }] }, "Sanctuary": { "period": 2.4, "items": [{ "s": 1, "w": 1.594, "h": 1.594, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 0.7, "y": 0.85, "z": 1 }, "mode": 2, "sustain": 1 } }] }, "Slow": { "period": 2.8, "items": [{ "s": 15, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1, "mode": 0, "color": { "x": 0.46, "y": 0.66, "z": 0.82 } } }] }, "Spider Climb": { "period": 2.8, "items": [{ "s": 17, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1 } }] }, "Starry Wisp": { "period": 2.8, "items": [{ "s": 9, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1, "color": { "x": 0.65, "y": 0.85, "z": 1 }, "mode": 3 } }] }, "Stoneskin": { "period": 2.4, "items": [{ "s": 2, "w": 1.5, "h": 1.5, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 0.58, "y": 0.57, "z": 0.52 }, "mode": 1, "sustain": 1 } }] }, "Sunbeam": { "period": 2.8, "items": [{ "s": 7, "w": 0.938, "h": 0.938, "dx": 0, "dy": -0.445, "ground": false, "seed": 2.3, "u": { "sustain": 1, "color": { "x": 1, "y": 0.8, "z": 0.3 }, "mode": 0 } }] }, "Sunburst": { "period": 2.8, "items": [{ "s": 9, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1, "color": { "x": 1, "y": 0.92, "z": 0.6 }, "mode": 5 } }] }, "Vicious Mockery": { "period": 2.8, "items": [{ "s": 9, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1, "color": { "x": 0.85, "y": 0.25, "z": 0.8 }, "mode": 4 } }] }, "Vitriolic Sphere": { "period": 2.8, "items": [{ "s": 9, "w": 1.55, "h": 1.55, "dx": 0, "dy": 0, "ground": false, "seed": 2.3, "u": { "sustain": 1, "color": { "x": 0.4, "y": 0.95, "z": 0.08 }, "mode": 1 } }] }, "Warding Bond": { "period": 2.4, "items": [{ "s": 1, "w": 1.594, "h": 1.594, "dx": 0, "dy": 0, "ground": false, "seed": 1.8, "u": { "color": { "x": 1, "y": 0.78, "z": 0.25 }, "mode": 1, "sustain": 1 } }] } };
var ZONE_LOOPS = { "Arcane Shield": { "period": 3.2, "s": 19, "w": 4, "h": 4, "seed": 2.3, "u": { "mode": 12 }, "kind": "zone", "ground": false }, "Black Tentacles": { "period": 2.8, "s": 12, "w": 4, "h": 4, "seed": 2.3, "u": { "sustain": 1 }, "ground": true }, "Cloudkill": { "period": 2.8, "s": 11, "w": 8, "h": 8, "seed": 2.3, "u": { "sustain": 1, "color": { "x": 0.16, "y": 0.55, "z": 0.25 } } }, "Darkness": { "period": 3.2, "s": 19, "w": 6, "h": 6, "seed": 2.3, "u": { "mode": 4 }, "kind": "zone", "ground": false }, "Entangle": { "period": 3.2, "s": 19, "w": 4, "h": 4, "seed": 2.3, "u": { "mode": 1 }, "kind": "zone", "ground": true }, "Flaming Sphere": { "period": 2.8, "s": 7, "w": 2.25, "h": 2.25, "seed": 2.3, "u": { "sustain": 1, "color": { "x": 1, "y": 0.3, "z": 0.035 }, "mode": 1 } }, "Fog Cloud": { "period": 3.2, "s": 19, "w": 8, "h": 8, "seed": 2.3, "u": { "mode": 3 }, "kind": "zone", "ground": false }, "Grease": { "period": 3.2, "s": 19, "w": 2, "h": 2, "seed": 2.3, "u": { "mode": 5 }, "kind": "zone", "ground": true }, "Gust of Wind": { "period": 2.8, "s": 13, "w": 12, "h": 2, "seed": 2.3, "u": { "sustain": 1, "wall": 0 } }, "Mage Hand": { "period": 3.2, "s": 19, "w": 1, "h": 1, "seed": 2.3, "u": { "mode": 10 }, "kind": "object", "ground": false }, "Magic Circle": { "period": 2.8, "s": 18, "w": 4.75, "h": 4.75, "seed": 2.3, "u": { "sustain": 1 } }, "Moonbeam": { "period": 3.2, "s": 19, "w": 2, "h": 2, "seed": 2.3, "u": { "mode": 0 }, "kind": "zone", "ground": false }, "Silence": { "period": 3.2, "s": 19, "w": 8, "h": 8, "seed": 2.3, "u": { "mode": 8 }, "kind": "zone", "ground": false }, "Sleet Storm": { "period": 3.2, "s": 19, "w": 8, "h": 8, "seed": 2.3, "u": { "mode": 9 }, "kind": "zone", "ground": false }, "Spike Growth": { "period": 2.8, "s": 10, "w": 8, "h": 8, "seed": 2.3, "u": { "sustain": 1, "wall": 0 } }, "Spiritual Weapon": { "period": 3.2, "s": 19, "w": 1, "h": 1, "seed": 2.3, "u": { "mode": 11 }, "kind": "object", "ground": false }, "Stinking Cloud": { "period": 2.8, "s": 11, "w": 8, "h": 8, "seed": 2.3, "u": { "sustain": 1, "color": { "x": 0.56, "y": 0.61, "z": 0.13 } } }, "Void Glyph": { "period": 8, "s": 20, "w": 6, "h": 6, "seed": 2.3, "u": { "mode": 4 }, "kind": "zone", "ground": true }, "Void Shield": { "period": 3.2, "s": 20, "w": 4, "h": 4, "seed": 2.3, "u": { "mode": 0 }, "kind": "zone", "ground": false }, "Wall of Fire \u2014 20 ft Line": { "period": 3.2, "s": 19, "w": 4, "h": 1, "seed": 2.3, "u": { "mode": 6 }, "kind": "zone", "ground": false }, "Wall of Fire \u2014 20 ft Ring": { "period": 3.2, "s": 19, "w": 4, "h": 4, "seed": 2.3, "u": { "mode": 7 }, "kind": "zone", "ground": false }, "Wall of Ice": { "period": 2.8, "s": 14, "w": 8, "h": 2.266, "seed": 2.3, "u": { "sustain": 1 } }, "Wall of Thorns": { "period": 2.8, "s": 10, "w": 8, "h": 2, "seed": 2.3, "u": { "sustain": 1, "wall": 1 } }, "Web": { "period": 3.2, "s": 19, "w": 4, "h": 4, "seed": 2.3, "u": { "mode": 2 }, "kind": "zone", "ground": true }, "Wind Wall": { "period": 2.8, "s": 13, "w": 10, "h": 1.5, "seed": 2.3, "u": { "sustain": 1, "wall": 1 } } };

// src/obr/spell-fx.js
var KEY4 = `${EXT}/spell-fx`;
var NAMES = new Set(Object.keys(CREATURE_LOOPS));
var FADE_SECONDS = 0.4;
var FRAME_MS3 = 40;
var AURA_SQUARES = 3;
var role5 = "PLAYER";
var state4 = null;
var settings3 = {};
var busy4 = false;
var again4 = false;
var settled = false;
var fading = /* @__PURE__ */ new Map();
var uniforms = (loop, it, fade) => [
  { name: "period", value: loop.period },
  { name: "fade", value: fade },
  { name: "seed", value: it.seed },
  ...Object.entries(it.u).map(([name, value]) => ({ name, value }))
];
var finish = (builder, token, sig) => builder.attachedTo(token.id).visible(token.visible).zIndex(0).disableAutoZIndex(true).locked(true).disableHit(true).name("Spell effect").metadata({ [KEY4]: sig });
function onToken(token, bounds, spell, i, sig, fade, dpi) {
  const loop = CREATURE_LOOPS[spell], it = loop.items[i];
  const unit = it.w > AURA_SQUARES ? dpi : Math.max(bounds.width, bounds.height);
  const w = it.w * unit, h = it.h * unit, x = bounds.center.x + it.dx * unit - w / 2, y = bounds.center.y + it.dy * unit - h / 2;
  return finish(buildEffect().effectType("STANDALONE").width(w).height(h).position({ x, y }).sksl(SHADERS[it.s]).uniforms(uniforms(loop, it, fade)).layer(it.ground ? "MOUNT" : "ATTACHMENT").disableAttachmentBehavior(["COPY", "ROTATION", "SCALE"]), token, sig).build();
}
function onZone(prop, spell, sig, fade, bounds) {
  const loop = ZONE_LOOPS[spell], shape = prop.type === "SHAPE";
  const w = shape ? prop.width * Math.abs(prop.scale.x) : bounds.width, h = shape ? prop.height * Math.abs(prop.scale.y) : bounds.height;
  return finish(buildEffect().effectType("STANDALONE").width(w).height(h).position(shape ? prop.position : bounds.min).rotation(shape ? prop.rotation : 0).sksl(SHADERS[loop.s]).uniforms(uniforms(loop, loop, fade)).layer(loop.ground ? "MOUNT" : "ATTACHMENT").disableAttachmentBehavior(["COPY"]), prop, sig).build();
}
var placeOf = (it) => [it.position.x, it.position.y, it.rotation, it.scale?.x, it.scale?.y, it.width, it.height].map((n) => typeof n === "number" ? Math.round(n * 100) / 100 : "").join(",");
async function draw3() {
  if (!await lib_default.scene.isReady()) {
    settled = false;
    return;
  }
  const on2 = switchOn(settings3, "spellAnimations") && effectsOn("spells");
  const marked = on2 ? markedTokens(state4, NAMES) : /* @__PURE__ */ new Map();
  const seen = (t) => role5 === "GM" || t.visible;
  const tokens = marked.size ? (await lib_default.scene.items.getItems([...marked.keys()])).filter(seen) : [];
  const zones = on2 ? (await lib_default.scene.items.getItems((i) => ZONE_LOOPS[i.metadata?.[ZONE_KEY]?.spell])).filter(seen) : [];
  const dpi = tokens.length ? await lib_default.scene.grid.getDpi() : 0;
  const want = /* @__PURE__ */ new Map();
  for (const t of tokens) {
    const b = await lib_default.scene.items.getItemBounds([t.id]);
    for (const spell of marked.get(t.id)) CREATURE_LOOPS[spell].items.forEach((_, i) => {
      const sig = [t.id, spell, i, Math.round(b.width), t.visible].join("|");
      want.set(sig, { parent: t.id, build: (fade) => onToken(t, b, spell, i, sig, fade, dpi) });
    });
  }
  for (const z of zones) {
    const spell = z.metadata[ZONE_KEY].spell, sig = [z.id, spell, z.visible, placeOf(z)].join("|");
    const bounds = z.type === "SHAPE" ? null : await lib_default.scene.items.getItemBounds([z.id]);
    want.set(sig, { parent: z.id, build: (fade) => onZone(z, spell, sig, fade, bounds) });
  }
  const have = await lib_default.scene.local.getItems((i) => i.metadata?.[KEY4] !== void 0);
  const old = have.filter((i) => !want.has(i.metadata[KEY4])).map((i) => i.id);
  const drawn2 = new Set(have.map((i) => i.metadata[KEY4])), shown = new Set(have.map((i) => i.attachedTo));
  const add = [...want].filter(([sig]) => !drawn2.has(sig)).map(([, { parent, build }]) => {
    const it = build(settled && !shown.has(parent) ? 0 : 1);
    if (it.uniforms.find((u) => u.name === "fade").value === 0) fading.set(it.id, performance.now());
    return it;
  });
  if (old.length) await lib_default.scene.local.deleteItems(old);
  if (add.length) await lib_default.scene.local.addItems(add);
  settled = true;
}
async function sync3() {
  if (busy4) {
    again4 = true;
    return;
  }
  busy4 = true;
  try {
    do {
      again4 = false;
      await draw3();
    } while (again4);
  } catch (err) {
    console.error("Encounter Builder: could not draw the spell effects", err);
  } finally {
    busy4 = false;
  }
}
var stepping = false;
setInterval(async () => {
  if (stepping || !fading.size) return;
  stepping = true;
  const now = performance.now(), fade = /* @__PURE__ */ new Map();
  for (const [id, start] of fading) {
    const k = Math.min(1, (now - start) / (FADE_SECONDS * 1e3));
    fade.set(id, k);
    if (k >= 1) fading.delete(id);
  }
  try {
    await lib_default.scene.local.updateItems([...fade.keys()], (items) => {
      for (const it of items) it.uniforms.find((u) => u.name === "fade").value = fade.get(it.id);
    }, true);
  } catch {
  }
  stepping = false;
}, FRAME_MS3);
async function startSpellFx() {
  role5 = await lib_default.player.getRole();
  lib_default.player.onChange((p) => {
    if (p.role !== role5) {
      role5 = p.role;
      sync3();
    }
  });
  const md = await lib_default.room.getMetadata();
  state4 = md[TRACKER_KEY] || null;
  settings3 = md[SETTINGS_KEY] || {};
  lib_default.room.onMetadataChange((m) => {
    state4 = m[TRACKER_KEY] || null;
    settings3 = m[SETTINGS_KEY] || {};
    sync3();
  });
  lib_default.scene.onReadyChange((ready2) => {
    if (!ready2) {
      settled = false;
      fading.clear();
    }
    sync3();
  });
  let timer = null;
  lib_default.scene.items.onChange(() => {
    clearTimeout(timer);
    timer = setTimeout(sync3, 200);
  });
  lib_default.broadcast.onMessage(LOCAL_FX, () => sync3());
  sync3();
}

// src/obr/zones.js
var TOOL = `${EXT}/zone-tool`;
var MODE = `${EXT}/zone-place`;
var MENU2 = `${EXT}/zone-menu`;
var MOVE = "rodeo.owlbear.tool/move";
var placing = null;
async function zoneProp(spell, position) {
  const dpi = await lib_default.scene.grid.getDpi(), { w, h, kind } = ZONE_LOOPS[spell], width = w * dpi, height = h * dpi;
  return buildShape().shapeType("RECTANGLE").width(width).height(height).position({ x: position.x - width / 2, y: position.y - height / 2 }).fillColor("#ffffff").fillOpacity(0.02).strokeOpacity(0).strokeWidth(0).name(spell).layer(kind === "object" ? "CHARACTER" : "PROP").metadata({ [ZONE_KEY]: { spell } }).build();
}
async function startPlacing(spell) {
  if (!ZONE_LOOPS[spell]) return;
  if (placing) await finish2();
  await lib_default.player.deselect();
  const back = await lib_default.tool.getActiveTool().catch(() => MOVE);
  placing = { spell, back: back === TOOL ? MOVE : back };
  await addTool();
  await lib_default.tool.activateTool(TOOL);
  lib_default.notification.show(`Click where ${spell} goes (Esc stops).`, "DEFAULT");
}
async function finish2() {
  if (!placing) return;
  const { back } = placing;
  placing = null;
  await lib_default.tool.activateTool(back).catch(() => lib_default.tool.activateTool(MOVE)).catch(() => {
  });
  await lib_default.tool.removeMode(MODE).catch(() => {
  });
  await lib_default.tool.remove(TOOL).catch(() => {
  });
}
async function place(position) {
  if (!placing) return;
  const prop = await zoneProp(placing.spell, position);
  await lib_default.scene.items.addItems([prop]);
  await finish2();
  await lib_default.player.select([prop.id]);
}
async function addTool() {
  const icon2 = new URL("../logo/logo-64.png", location.href).href;
  try {
    await lib_default.tool.create({ id: TOOL, icons: [{ icon: icon2, label: "Placing a zone spell (Esc stops)", filter: { roles: ["GM"] } }], defaultMode: MODE });
    await lib_default.tool.createMode({
      id: MODE,
      icons: [{ icon: icon2, label: "Click where the zone goes", filter: { activeTools: [TOOL] } }],
      cursors: [{ cursor: "crosshair" }],
      onToolClick: (ctx, ev) => {
        place(ev.pointerPosition);
        return false;
      },
      onKeyDown: (ctx, ev) => {
        if (ev.key === "Escape") finish2();
      },
      onDeactivate: () => finish2()
      // the GM picked another tool
    });
  } catch (err) {
    console.error("Encounter Builder: could not set up the zone tool", err);
  }
}
async function startZones() {
  const icon2 = new URL("../logo/logo-64.png", location.href).href;
  lib_default.broadcast.onMessage(ZONE_PICK, ({ data }) => {
    startPlacing(data?.spell).catch((err) => console.error("Encounter Builder: could not place a zone", err));
  });
  try {
    await lib_default.contextMenu.create({
      id: MENU2,
      icons: [{ icon: icon2, label: "Zone spell", filter: { roles: ["GM"], max: 1, every: [{ key: "layer", value: "MAP" }] } }],
      embed: { url: new URL("zone-menu.html", location.href).href, height: 262 }
    });
  } catch (err) {
    console.error("Encounter Builder: could not add zone spells to Owlbear", err);
  }
}

// src/obr/writer.js
var WRITER = `${EXT}/writer`;
var EVERY = 3e3;
var QUIET = 8e3;
var role6 = "PLAYER";
var me2 = "";
var lowest = true;
var otherLinked = 0;
var was = null;
var linkedHere = () => false;
var listeners = /* @__PURE__ */ new Set();
var isWriter = () => role6 === "GM" && (linkedHere() || Date.now() - otherLinked > QUIET && lowest);
var onWriterChange = (fn) => {
  listeners.add(fn);
};
async function check() {
  if (role6 === "GM" && linkedHere()) lib_default.broadcast.sendMessage(WRITER, {}, { destination: "REMOTE" }).catch(() => {
  });
  try {
    const others = (await lib_default.party.getPlayers()).filter((p) => p.role === "GM").map((p) => p.connectionId);
    lowest = others.every((id) => me2 <= id);
  } catch {
  }
  const now = isWriter();
  if (was === false && now) listeners.forEach((fn) => fn());
  was = now;
}
async function startWriter(isLinked) {
  linkedHere = isLinked;
  role6 = await lib_default.player.getRole();
  lib_default.player.onChange((p) => {
    role6 = p.role;
  });
  me2 = await lib_default.player.getConnectionId();
  lib_default.broadcast.onMessage(WRITER, () => {
    otherLinked = Date.now();
  });
  await check();
  setInterval(check, EVERY);
}

// src/obr/whisper.js
var KEEP = 200;
function readThread(thread) {
  try {
    return JSON.parse(localStorage.getItem(chatKey(thread)) || "null") || { character: "", messages: [] };
  } catch {
    return { character: "", messages: [] };
  }
}
function addToThread(thread, character, message) {
  const t = readThread(thread);
  t.character = character || t.character;
  t.messages = [...t.messages, message].slice(-KEEP);
  try {
    localStorage.setItem(chatKey(thread), JSON.stringify(t));
  } catch {
  }
  return t;
}
async function sendWhisper(m) {
  if (!m.tokens?.length) return { error: `${m.character} has no linked token: link one first (right-click > Link to token\u2026).` };
  if (!await lib_default.scene.isReady()) return { error: "No scene is open in Owlbear." };
  const tokens = await lib_default.scene.items.getItems(m.tokens);
  if (!tokens.length) return { error: `${m.character}'s token is not on this map.` };
  const owners = new Set(tokens.map((t) => t.createdUserId));
  const players = (await lib_default.party.getPlayers()).filter((p) => owners.has(p.id) && p.role !== "GM");
  if (!players.length) return { error: `No connected player owns ${m.character}'s token.` };
  await lib_default.broadcast.sendMessage(WHISPER, {
    to: [...new Set(players.map((p) => p.id))],
    id: m.id,
    thread: m.thread,
    character: m.character,
    from: m.from,
    text: m.text,
    at: Date.now()
  }, { destination: "REMOTE" });
  return { sentTo: [...new Set(players.map((p) => p.name))] };
}
function startWhispers(gm2) {
  const waiting2 = [];
  lib_default.broadcast.onMessage(WHISPER, async ({ data }) => {
    if (gm2.isGM() || !data?.to?.includes(await lib_default.player.getId())) return;
    addToThread(data.thread, data.character, { dir: "in", from: data.from, text: data.text, at: data.at });
    lib_default.broadcast.sendMessage(WHISPER_ACK, { id: data.id, name: await lib_default.player.getName() }, { destination: "REMOTE" }).catch(() => {
    });
    lib_default.broadcast.sendMessage(CHAT_UPDATED, { thread: data.thread }, { destination: "LOCAL" }).catch(() => {
    });
    const url = new URL(`message.html?thread=${encodeURIComponent(data.thread)}`, location.href).href;
    lib_default.modal.open({ id: MESSAGE_MODAL, url, width: 380, height: 420, hideBackdrop: true }).catch(() => {
    });
  });
  lib_default.broadcast.onMessage(WHISPER_ACK, ({ data }) => {
    if (gm2.isGM()) gm2.toWindow({ type: "whisperAck", id: data?.id, name: data?.name });
  });
  lib_default.broadcast.onMessage(WHISPER_REPLY, ({ data }) => {
    if (!gm2.isGM() || !data) return;
    const msg = { type: "whisperReply", thread: data.thread, character: data.character, name: data.name, text: data.text, at: data.at };
    if (gm2.toWindow(msg)) return;
    waiting2.push(msg);
    lib_default.notification.show(`Reply from ${data.name} (${data.character}). Open the GM window to read it.`, "INFO");
  });
  return { flush: () => {
    while (waiting2.length && gm2.toWindow(waiting2[0])) waiting2.shift();
  } };
}

// src/obr/player-asks.js
var COND_MENU = `${EXT}/add-condition`;
var SPELL_MENU = `${EXT}/add-spell`;
var WAIT = 5e3;
var icon = () => new URL("../logo/logo-64.png", location.href).href;
var me3 = { id: "", conn: "", name: "" };
var waiting = /* @__PURE__ */ new Map();
var relayed = /* @__PURE__ */ new Map();
async function ownedOf(ids) {
  if (!ids.length || !await lib_default.scene.isReady()) return /* @__PURE__ */ new Set();
  const myId = await lib_default.player.getId();
  return new Set((await lib_default.scene.items.getItems(ids)).filter((i) => i.createdUserId === myId).map((i) => i.id));
}
async function startPlayerAsks({ role: role8, linked: linked2, toWindow }) {
  [me3.id, me3.conn, me3.name] = await Promise.all([lib_default.player.getId(), lib_default.player.getConnectionId(), lib_default.player.getName()]);
  lib_default.player.onChange((p) => {
    me3.name = p.name;
  });
  lib_default.broadcast.onMessage(LOCAL_PLAYER_ASK, ({ data }) => {
    if (!data?.what || !data.token) return;
    const ask = { id: `ask-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`, what: data.what, token: data.token, name: data.name ?? null, value: data.value ?? null };
    if (role8() === "GM" && linked2()) return relay(ask, { conn: me3.conn, local: true, from: me3.name, gm: true });
    waiting.set(ask.id, setTimeout(() => {
      waiting.delete(ask.id);
      lib_default.notification.show("The GM window isn\u2019t open, so nothing changed. Ask your GM.", "WARNING");
    }, WAIT));
    lib_default.broadcast.sendMessage(PLAYER_ASK, ask, { destination: "REMOTE" }).catch(() => {
    });
  });
  lib_default.broadcast.onMessage(PLAYER_ANSWER, ({ data }) => {
    if (data?.to !== me3.conn) return;
    clearTimeout(waiting.get(data.id));
    waiting.delete(data.id);
    if (data.text) lib_default.notification.show(data.text, data.pending ? "INFO" : data.ok ? "SUCCESS" : "WARNING");
  });
  lib_default.broadcast.onMessage(PLAYER_ASK, async ({ data, connectionId }) => {
    if (role8() !== "GM" || !linked2() || !data?.id) return;
    const who = (await lib_default.party.getPlayers()).find((p) => p.connectionId === connectionId);
    if (!who) return;
    const reply = (text) => answerTo({ conn: connectionId, local: false }, { id: data.id, ok: false, text });
    if (who.role !== "GM") {
      const [token] = await lib_default.scene.isReady() ? await lib_default.scene.items.getItems([data.token]) : [];
      if (!token) return reply("That token isn\u2019t on the GM\u2019s map.");
      if (token.createdUserId !== who.id) return reply("That token isn\u2019t yours, so you can\u2019t change it.");
    }
    relay(data, { conn: connectionId, local: false, from: who.name, gm: who.role === "GM" });
  });
  function relay(ask, r) {
    relayed.set(ask.id, r);
    if (!toWindow({ type: "playerAsk", ...ask, from: r.from, gm: r.gm })) answer({ id: ask.id, ok: false, text: "The GM window isn\u2019t open, so nothing changed." });
  }
  function answerTo(r, m) {
    if (r.local) {
      if (m.text && !m.ok) lib_default.notification.show(m.text, "WARNING");
      return;
    }
    lib_default.broadcast.sendMessage(PLAYER_ANSWER, { id: m.id, to: r.conn, ok: !!m.ok, text: m.text || "", pending: !!m.pending }, { destination: "REMOTE" }).catch(() => {
    });
  }
  function answer(m) {
    const r = relayed.get(m?.id);
    if (!r) return;
    if (!m.pending) relayed.delete(m.id);
    answerTo(r, m);
  }
  const md = await lib_default.room.getMetadata();
  let state5 = md[TRACKER_KEY] || null, settings5 = md[SETTINGS_KEY] || {};
  const follow = () => {
    setMenus(role8(), state5, settings5);
    askInitiative(role8(), state5, settings5);
  };
  lib_default.room.onMetadataChange((m) => {
    state5 = m[TRACKER_KEY] || null;
    settings5 = m[SETTINGS_KEY] || {};
    follow();
  });
  lib_default.player.onChange(() => follow());
  lib_default.scene.onReadyChange((ready2) => {
    if (ready2) follow();
  });
  follow();
  return { answer };
}
var menuSig = "";
async function setMenus(role8, state5, settings5) {
  const gm2 = role8 === "GM", ids = gm2 ? [] : linkedTokens(state5).sort();
  const off = !gm2 && (playerConditions(settings5) === "off" || !ids.length);
  const sig = JSON.stringify([gm2, off, ids]);
  if (sig === menuSig) return;
  menuSig = sig;
  await Promise.all([COND_MENU, SPELL_MENU].map((id) => lib_default.contextMenu.remove(id).catch(() => {
  })));
  if (off) return;
  const filter = gm2 ? { roles: ["GM"], max: 1, every: [{ key: ["metadata", ZONE_KEY], value: void 0 }], some: [{ key: "layer", value: "CHARACTER" }, { key: "layer", value: "MOUNT" }] } : { roles: ["PLAYER"], max: 1, every: [{ key: "createdUserId", value: me3.id }], some: ids.map((id) => ({ key: "id", value: id })) };
  const url = (kind) => `${new URL("cond-menu.html", location.href).href}?kind=${kind}`;
  try {
    await lib_default.contextMenu.create({ id: COND_MENU, icons: [{ icon: icon(), label: "Add condition", filter }], embed: { url: url("condition"), height: 250 } });
    await lib_default.contextMenu.create({ id: SPELL_MENU, icons: [{ icon: icon(), label: "Add spell", filter }], embed: { url: url("spell"), height: 250 } });
  } catch (err) {
    console.error("Encounter Builder: could not add the condition menus to Owlbear", err);
  }
}
var askedFor = null;
var initOpen = false;
async function askInitiative(role8, state5, settings5) {
  const rolling = role8 !== "GM" && state5?.phase === "setup" && switchOn(settings5, "playerInitiative");
  if (!rolling) {
    if (state5?.phase !== "setup") askedFor = null;
    if (initOpen) {
      initOpen = false;
      lib_default.modal.close(INIT_MODAL).catch(() => {
      });
    }
    return;
  }
  const fight = state5.encounter || state5.name;
  if (askedFor === fight) return;
  const rows = initiativeRows(state5, await ownedOf(linkedTokens(state5)));
  if (!rows.length) return;
  askedFor = fight;
  initOpen = true;
  openInitiative(rows.length);
}
function openInitiative(count) {
  lib_default.modal.open({ id: INIT_MODAL, url: new URL("init.html", location.href).href, width: 320, height: Math.min(420, 150 + 52 * count), hideBackdrop: true }).catch(() => {
  });
}

// src/obr/token-look.js
function lookOf(t) {
  if (t.type !== "IMAGE" || !t.image?.url) return null;
  return { image: t.image, grid: t.grid, scale: t.scale, rotation: t.rotation, layer: t.layer, text: t.text, textItemType: t.textItemType, owner: t.createdUserId };
}
var squares = (look) => Math.max(1, Math.ceil(Math.max(look.image.width, look.image.height) / (look.grid.dpi || 1) * Math.abs(look.scale?.x || 1)));
function spots(centre, n, step) {
  const cols = Math.ceil(Math.sqrt(n)), rows = Math.ceil(n / cols);
  return Array.from({ length: n }, (_, i) => {
    const row = Math.floor(i / cols), inRow = row === rows - 1 ? n - cols * row : cols;
    return { x: centre.x + (i % cols - (inRow - 1) / 2) * step, y: centre.y + (row - (rows - 1) / 2) * step };
  });
}

// src/obr/latest-writer.js
function latestWriter(write, { onStatus = () => {
}, wait = (ms) => new Promise((r) => setTimeout(r, ms)), firstDelay = 1e3, maxDelay = 8e3 } = {}) {
  let next = null, busy5 = false, failing = false;
  async function run() {
    busy5 = true;
    let delay = firstDelay;
    while (next) {
      const { value } = next;
      next = null;
      try {
        await write(value);
        delay = firstDelay;
        if (failing) {
          failing = false;
          onStatus({ ok: true });
        }
      } catch (err) {
        next ??= { value };
        if (!failing) {
          failing = true;
          onStatus({ ok: false, error: String(err?.message || err) });
        }
        await wait(delay);
        delay = Math.min(delay * 2, maxDelay);
      }
    }
    busy5 = false;
  }
  return (value) => {
    next = { value };
    if (!busy5) run();
  };
}

// src/spell-loop-names.js
var CREATURE_SPELLS = ["Aid", "Arcane Shield", "Aura of Life", "Bane", "Barkskin", "Beacon of Hope", "Blindness/Deafness", "Charm Person", "Confusion", "Death Ward", "Enhance Ability", "Ensnaring Strike", "Flame Blade", "Foresight", "Freedom of Movement", "Haste", "Heat Metal", "Heroes\u2019 Feast", "Heroism", "Hex", "Holy Aura", "Hypnotic Pattern", "Mage Armor", "Magic Weapon", "Mind Blank", "Nondetection", "Protection from Energy", "Protection from Evil and Good", "Protection from Poison", "Ray of Sickness", "Regenerate", "Resistance", "Sanctuary", "Slow", "Spider Climb", "Starry Wisp", "Stoneskin", "Sunbeam", "Sunburst", "Vicious Mockery", "Vitriolic Sphere", "Warding Bond"];

// src/condition-icon.js
var slug = (name) => String(name).split("/")[0].toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
var markIcon = (m) => m.t ? null : m.i || slug(m.n);

// src/obr/background.js
var whispers = null;
var asks = null;
var role7 = "PLAYER";
var settings4 = {};
var gm = null;
var gmSeen = 0;
var resolveReady;
var ready = new Promise((r) => {
  resolveReady = r;
});
var post = (target, msg) => {
  try {
    target.postMessage({ eb: true, ...msg }, location.origin);
  } catch {
  }
};
var linked = () => !!gm && Date.now() - gmSeen < 8e3;
var writeTracker = latestWriter((state5) => lib_default.room.setMetadata({ [TRACKER_KEY]: state5 }), {
  onStatus: (s) => {
    if (s.error) console.error("Encounter Builder: Owlbear refused a tracker update", s.error);
    if (gm) post(gm, { type: "trackerStatus", ...s });
  }
});
var lastStatus = null;
function status(force = false) {
  const connected = linked();
  if (!force && connected === lastStatus) return;
  lastStatus = connected;
  lib_default.broadcast.sendMessage(LOCAL_STATUS, { connected }, { destination: "LOCAL" }).catch(() => {
  });
}
window.addEventListener("message", async (e) => {
  if (e.origin !== location.origin || !e.data?.eb || !e.source) return;
  await ready;
  if (role7 !== "GM") return;
  const m = e.data;
  if (m.type === "hello") {
    gm = e.source;
    gmSeen = Date.now();
    post(gm, { type: "welcome", settings: settings4 });
    status();
    whispers?.flush();
    sendTokens(true);
    sendUsage();
  } else if (m.type === "ping") {
    if (e.source === gm) {
      gmSeen = Date.now();
      post(gm, { type: "pong" });
    }
  } else if (m.type === "publish") {
    gm = e.source;
    gmSeen = Date.now();
    writeTracker(m.state ?? null);
    syncMarkers(m.state ?? null);
  } else if (m.type === "setSettings") await lib_default.room.setMetadata({ [SETTINGS_KEY]: { ...settings4, ...m.settings || {} } });
  else if (m.type === "pick") startPick(e.source, m);
  else if (m.type === "unlink") await unlink(m.ids || []);
  else if (m.type === "rename") await rename(m.items || []);
  else if (m.type === "setVisible") await setVisible(m.ids || [], !!m.visible);
  else if (m.type === "effects") lib_default.broadcast.sendMessage(EFFECTS, { hits: m.hits, heals: m.heals, shake: m.shake, style: m.style }, { destination: "ALL" }).catch(() => {
  });
  else if (m.type === "addTokens") post(e.source, { type: "tokensAdded", id: m.id, ...await addTokens(m.list || []).catch((err) => ({ error: String(err?.message || err) })) });
  else if (m.type === "whisper") post(e.source, { type: "whisperResult", id: m.id, ...await sendWhisper(m).catch((err) => ({ error: String(err?.message || err) })) });
  else if (m.type === "playerAnswer") asks?.answer(m);
});
var TOOL2 = `${EXT}/link-tool`;
var MODE2 = `${EXT}/pick`;
var LINK_KEY = `${EXT}/link`;
var MOVE2 = "rodeo.owlbear.tool/move";
var pick = null;
async function startPick(source, { id, names }) {
  if (pick) await finishPick("replaced");
  if (!names?.length) return;
  pick = { id, names, at: 0, picked: /* @__PURE__ */ new Set(), source, back: await lib_default.tool.getActiveTool().catch(() => MOVE2) };
  if (pick.back === TOOL2) pick.back = MOVE2;
  await addLinkTool();
  await lib_default.tool.activateTool(TOOL2);
}
async function finishPick(reason) {
  if (!pick) return;
  const { id, source, back } = pick;
  pick = null;
  post(source, { type: "pickDone", id, reason });
  await lib_default.tool.activateTool(back).catch(() => lib_default.tool.activateTool(MOVE2)).catch(() => {
  });
  await removeLinkTool();
}
async function addLinkTool() {
  const icon2 = new URL("../logo/logo-64.png", location.href).href;
  try {
    await lib_default.tool.create({ id: TOOL2, icons: [{ icon: icon2, label: "Linking a token (Esc stops)", filter: { roles: ["GM"] } }], defaultMode: MODE2 });
    await lib_default.tool.createMode({
      id: MODE2,
      icons: [{ icon: icon2, label: "Click a token to link it", filter: { activeTools: [TOOL2] } }],
      cursors: [{ cursor: "crosshair" }],
      onToolClick: (ctx, ev) => {
        onTokenClick(ev.target);
        return false;
      },
      onKeyDown: (ctx, ev) => {
        if (ev.key === "Escape") finishPick("cancelled");
      },
      onDeactivate: () => finishPick("cancelled")
      // the GM picked another tool
    });
  } catch (err) {
    console.error("Encounter Builder: could not set up the link tool", err);
  }
}
async function removeLinkTool() {
  await lib_default.tool.removeMode(MODE2).catch(() => {
  });
  await lib_default.tool.remove(TOOL2).catch(() => {
  });
}
async function onTokenClick(target) {
  if (!pick) return;
  if (!target || !["CHARACTER", "MOUNT"].includes(target.layer)) {
    lib_default.notification.show("That is not a token. Click a character token (Esc stops).", "WARNING");
    return;
  }
  if (pick.picked.has(target.id)) {
    lib_default.notification.show("That token is already linked in this round of clicks. Click another one.", "WARNING");
    return;
  }
  const name = pick.names[pick.at];
  await lib_default.scene.items.updateItems([target.id], (items) => {
    for (const it of items) {
      it.name = name;
      if (it.text) {
        it.text.plainText = name;
        it.text.type = "PLAIN";
      }
      it.metadata[LINK_KEY] = { name, linked: Date.now() };
    }
  });
  pick.picked.add(target.id);
  post(pick.source, { type: "picked", id: pick.id, index: pick.at, token: target.id });
  pick.at++;
  if (pick.at >= pick.names.length) finishPick("done");
}
var onMap = async (ids) => await lib_default.scene.isReady() ? (await lib_default.scene.items.getItems(ids)).map((i) => i.id) : [];
async function unlink(ids) {
  const here = await onMap(ids);
  if (here.length) await lib_default.scene.items.updateItems(here, (items) => {
    for (const it of items) delete it.metadata[LINK_KEY];
  });
}
async function rename(list) {
  const names = new Map(list.map((x) => [x.id, x.name]));
  const here = await onMap([...names.keys()]);
  if (here.length) {
    await lib_default.scene.items.updateItems(here, (items) => {
      for (const it of items) {
        const name = names.get(it.id);
        it.name = name;
        if (it.text) {
          it.text.plainText = name;
          it.text.type = "PLAIN";
        }
      }
    });
  }
}
async function setVisible(ids, visible) {
  const here = await onMap(ids);
  if (here.length) await lib_default.scene.items.updateItems(here, (items) => {
    for (const it of items) it.visible = visible;
  });
}
async function addTokens(list) {
  if (!await lib_default.scene.isReady()) return { error: "No scene is open in Owlbear." };
  const [w, ht, dpi] = await Promise.all([lib_default.viewport.getWidth(), lib_default.viewport.getHeight(), lib_default.scene.grid.getDpi()]);
  const centre = await lib_default.viewport.inverseTransformPoint({ x: w / 2, y: ht / 2 });
  const at = spots(centre, list.length, dpi * Math.max(...list.map((x) => squares(x.look))));
  const items = await Promise.all(list.map(async ({ name, look, visible }, i) => {
    const b = buildImage(look.image, look.grid).name(name).position(await lib_default.scene.grid.snapPosition(at[i])).scale(look.scale).rotation(look.rotation).layer(look.layer).visible(visible !== false).metadata({ [LINK_KEY]: { name, linked: Date.now() } });
    if (look.text) b.text({ ...look.text, plainText: name, type: "PLAIN" }).textItemType(look.textItemType);
    if (look.owner) b.createdUserId(look.owner);
    return b.build();
  }));
  await lib_default.scene.items.addItems(items);
  return { added: items.length };
}
var lastTokens = "";
async function sendTokens(force = false) {
  if (role7 !== "GM" || !linked() || !await lib_default.scene.isReady()) return;
  const tokens = (await lib_default.scene.items.getItems((i) => i.layer === "CHARACTER" || i.layer === "MOUNT")).map((i) => ({ id: i.id, name: i.name || "", label: i.text?.plainText || "", visible: i.visible, look: lookOf(i) }));
  const sig = JSON.stringify(tokens);
  if (!force && sig === lastTokens) return;
  lastTokens = sig;
  post(gm, { type: "sceneTokens", tokens });
}
var MARK_KEY = `${EXT}/marker`;
var iconUrl = (id) => new URL(`../conditions%20symbols/png-128/${id}.png`, location.href).href;
var syncRunning = false;
var syncNext;
var lastState = null;
async function syncMarkers(state5) {
  lastState = state5;
  syncNext = state5;
  if (syncRunning) return;
  syncRunning = true;
  try {
    while (syncNext !== void 0) {
      const s = syncNext;
      syncNext = void 0;
      await drawMarkers(s);
    }
  } catch (err) {
    console.error("Encounter Builder: could not update the condition markers", err);
  } finally {
    syncRunning = false;
  }
}
var SPELLS = new Set(CREATURE_SPELLS);
async function drawMarkers(state5) {
  if (role7 !== "GM" || !await lib_default.scene.isReady()) return;
  const want = tokenBadges(state5, SPELLS);
  const tokens = new Map((want.size ? await lib_default.scene.items.getItems([...want.keys()]) : []).map((t) => [t.id, t]));
  const have = /* @__PURE__ */ new Map();
  const remove = [];
  for (const m of await lib_default.scene.items.getItems((i) => !!i.metadata?.[MARK_KEY])) {
    if (!tokens.has(m.attachedTo)) {
      remove.push(m.id);
      continue;
    }
    const h = have.get(m.attachedTo) || { sig: m.metadata[MARK_KEY].sig, ids: [], mixed: false };
    if (h.sig !== m.metadata[MARK_KEY].sig) h.mixed = true;
    h.ids.push(m.id);
    have.set(m.attachedTo, h);
  }
  const dpi = await lib_default.scene.grid.getDpi();
  const add = [];
  for (const [id, token] of tokens) {
    const marks = want.get(id);
    const sig = JSON.stringify([marks.map((x) => markIcon(x) || `~${x.t}`), token.scale.x, token.scale.y, token.visible]);
    const h = have.get(id);
    if (h && !h.mixed && h.sig === sig) continue;
    if (h) remove.push(...h.ids);
    add.push(...await markersFor(token, marks, sig, dpi));
  }
  if (remove.length) await lib_default.scene.items.deleteItems(remove);
  if (add.length) await lib_default.scene.items.addItems(add);
}
async function markersFor(token, marks, sig, dpi) {
  const b = await lib_default.scene.items.getItemBounds([token.id]);
  const size = dpi * 0.3, step = size * 1.04;
  const row = marks.filter((m) => m.n !== BLOODIED);
  const shown = row.length > 4 ? row.slice(0, 3) : row;
  const extra = row.length - shown.length;
  const count = shown.length + (extra ? 1 : 0);
  const at = (k) => ({ x: b.center.x - step * (count - 1) / 2 + k * step, y: b.min.y + size * 0.3 });
  const finish3 = (builder, name) => builder.attachedTo(token.id).layer("ATTACHMENT").locked(true).disableHit(true).visible(token.visible).disableAttachmentBehavior(["COPY", "ROTATION", "SCALE"]).name(name).metadata({ [MARK_KEY]: { sig } }).build();
  const badge = (text, k) => buildLabel().plainText(text).fontSize(size * 0.42).fontWeight(700).padding(size * 0.12).cornerRadius(size / 2).backgroundColor("#3a3d45").backgroundOpacity(0.95).fillColor("#ffffff").pointerWidth(0).pointerHeight(0).position({ ...at(k), y: at(k).y + size * 0.35 });
  const items = shown.map((m, k) => markIcon(m) ? finish3(buildImage({ url: iconUrl(markIcon(m)), width: 128, height: 128, mime: "image/png" }, { dpi: 128, offset: { x: 64, y: 64 } }).scale({ x: size / dpi, y: size / dpi }).position(at(k)), `Condition: ${m.n}`) : finish3(badge(m.t, k), `Condition: ${m.n}`));
  if (extra) items.push(finish3(badge(`+${extra}`, shown.length), `Conditions: ${extra} more`));
  if (row.length < marks.length) {
    items.push(finish3(buildImage({ url: new URL("bloodied-mark.png", location.href).href, width: 128, height: 128, mime: "image/png" }, { dpi: 128, offset: { x: 64, y: 64 } }).scale({ x: size * 0.6 / dpi, y: size * 0.6 / dpi }).position({ x: b.center.x, y: b.max.y - size * 0.22 }), `Condition: ${BLOODIED}`));
  }
  return items;
}
var lastSelection = "";
function sendSelection(ids = []) {
  if (role7 !== "GM" || !linked() || pick) return;
  const sig = ids.join(",");
  if (sig === lastSelection) return;
  lastSelection = sig;
  post(gm, { type: "selection", ids });
}
async function sendUsage(md) {
  if (role7 !== "GM" || !gm) return;
  try {
    post(gm, { type: "roomUsage", ...roomUsage(md || await lib_default.room.getMetadata(), EXT) });
  } catch {
  }
}
lib_default.onReady(async () => {
  role7 = await lib_default.player.getRole();
  lib_default.player.onChange((p) => {
    role7 = p.role;
    sendSelection(p.selection);
  });
  settings4 = (await lib_default.room.getMetadata())[SETTINGS_KEY] || {};
  lib_default.room.onMetadataChange((md) => {
    sendUsage(md);
    const next = md[SETTINGS_KEY] || {};
    if (JSON.stringify(next) === JSON.stringify(settings4)) return;
    settings4 = next;
    if (linked()) post(gm, { type: "settings", settings: settings4 });
  });
  lib_default.broadcast.onMessage(LOCAL_COMMAND, ({ data }) => {
    if (role7 === "GM" && linked()) post(gm, { type: "command", cmd: data?.cmd });
  });
  lib_default.broadcast.onMessage(LOCAL_ASK, () => status(true));
  removeLinkTool();
  setInterval(() => status(), 2e3);
  await startWriter(linked);
  const redraw = async () => {
    if (role7 === "GM" && isWriter()) syncMarkers((await lib_default.room.getMetadata())[TRACKER_KEY] ?? null);
  };
  lib_default.scene.onReadyChange((ready2) => {
    if (ready2) {
      redraw();
      sendTokens(true);
    }
  });
  let resizeTimer = null, tokensTimer = null;
  lib_default.scene.items.onChange(() => {
    if (role7 === "GM") {
      clearTimeout(tokensTimer);
      tokensTimer = setTimeout(() => sendTokens(), 400);
    }
    if (role7 !== "GM" || !lastState || !isWriter()) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => syncMarkers(lastState), 250);
  });
  redraw();
  startTurnDie();
  const nudgeMovement = await startMovement(isWriter);
  onWriterChange(() => {
    redraw();
    nudgeMovement();
  });
  startBloodied();
  startTokenFx();
  startSpellFx();
  startZones();
  const toWindow = (msg) => {
    if (!linked()) return false;
    post(gm, msg);
    return true;
  };
  whispers = startWhispers({ isGM: () => role7 === "GM", toWindow });
  asks = await startPlayerAsks({ role: () => role7, linked, toWindow }).catch((err) => {
    console.error("Encounter Builder: could not start the players' own changes", err);
    return null;
  });
  resolveReady();
});
