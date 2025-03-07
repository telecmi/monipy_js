"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _session = _interopRequireDefault(require("./session"));
var _offline = _interopRequireDefault(require("./offline"));
var _jssip = _interopRequireDefault(require("jssip"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var cmi_ua = {};
var isConnected = false;
var cmi_session = new _session["default"]();
var cmi_offline = new _offline["default"]();
var socket = new _jssip["default"].WebSocketInterface('wss://supersbc.telecmi.com');
window.onbeforeunload = function () {
  cmi_offline.start(cmi_ua);
};
var _default = exports["default"] = /*#__PURE__*/function () {
  function _default() {
    _classCallCheck(this, _default);
  }
  return _createClass(_default, [{
    key: "start",
    value: function start(credentials, _this) {
      if (!_lodash["default"].isEmpty(cmi_ua)) {
        if (cmi_ua.isRegistered()) {
          _this.emit('error', {
            code: 1001,
            status: 'Please logout before you login'
          });
          return;
        }
        if (cmi_ua.isConnected()) {
          cmi_ua.stop();
        }
      }
      if (credentials.debug === true) {
        _jssip["default"].debug.enable('JsSIP:*');
      } else {
        _jssip["default"].debug.disable('PIOPIY:*');
      }
      if (credentials['region']) {
        socket = new _jssip["default"].WebSocketInterface('wss://' + credentials['region']);
      }
      credentials['sockets'] = [socket];
      credentials['user_agent'] = 'PIOPIYJS';
      credentials['use_preloaded_route'] = true;
      cmi_ua = new _jssip["default"].UA(credentials);
      cmi_ua.on('registered', function (e) {
        _this.emit('login', {
          code: 200,
          status: 'login successfully'
        });
      });
      cmi_ua.on('unregistered', function (e) {
        _this.emit('logout', {
          code: 200,
          status: 'logout successfully'
        });
      });
      cmi_ua.on('registrationFailed', function (e) {
        _this.emit('loginFailed', {
          code: 407,
          status: 'invalid user'
        });
      });
      cmi_ua.on('newRTCSession', function (session) {
        if (session.originator != "local") {
          if (!_lodash["default"].isEmpty(cmi_ua._sessions)) {
            if (Object.keys(cmi_ua._sessions).length > 1) {
              session.session.terminate();
              return;
            }
          }
        }
        cmi_session.invite(session, _this);
      });
      if (!isConnected) {
        cmi_ua.start();
      } else {
        cmi_ua.register();
      }
    }
  }, {
    key: "stop",
    value: function stop(_this) {
      if (cmi_ua) {
        if (!cmi_ua.isRegistered()) {
          _this.emit('error', {
            code: 1002,
            status: 'Please login'
          });
          return;
        }
        if (cmi_ua.isRegistered()) {
          cmi_ua.unregister();
          cmi_ua.stop();
        }
      }
    }
  }, {
    key: "make",
    value: function make(to, _this) {
      if (!_lodash["default"].isEmpty(cmi_ua)) {
        if (!cmi_ua.isRegistered()) {
          _this.emit('error', {
            code: 1002,
            status: 'Please login to call'
          });
          return;
        }
      }
      cmi_session.make(to, cmi_ua, _this);
    }
  }, {
    key: "terminate",
    value: function terminate(_this) {
      if (!_lodash["default"].isEmpty(cmi_ua)) {
        if (!cmi_ua.isRegistered()) {
          _this.emit('error', {
            code: 1002,
            status: 'Please login '
          });
          return;
        }
      }
      cmi_session.terminate(cmi_ua, _this);
    }
  }, {
    key: "hangup",
    value: function hangup(_this) {
      if (!_lodash["default"].isEmpty(cmi_ua)) {
        if (!cmi_ua.isRegistered()) {
          _this.emit('error', {
            code: 1002,
            status: 'Please login '
          });
          return;
        }
      }
      cmi_session.hangup(cmi_ua, _this);
    }
  }, {
    key: "answer",
    value: function answer(_this) {
      if (!_lodash["default"].isEmpty(cmi_ua)) {
        if (!cmi_ua.isRegistered()) {
          _this.emit('error', {
            code: 1002,
            status: 'Please login '
          });
          return;
        }
      }
      cmi_session.answer(cmi_ua, _this);
    }
  }, {
    key: "reject",
    value: function reject(_this) {
      if (!_lodash["default"].isEmpty(cmi_ua)) {
        if (!cmi_ua.isRegistered()) {
          _this.emit('error', {
            code: 1002,
            status: 'Please login '
          });
          return;
        }
      }
      cmi_session.reject(cmi_ua, _this);
    }
  }, {
    key: "dtmf",
    value: function dtmf(no, _this) {
      if (!_lodash["default"].isEmpty(cmi_ua)) {
        if (!cmi_ua.isRegistered()) {
          _this.emit('error', {
            code: 1002,
            status: 'Please login '
          });
          return;
        }
      }
      if (_lodash["default"].isEmpty(no) && !_lodash["default"].isNumber(no)) {
        _this.emit('error', {
          code: 1005,
          status: 'invalid dtmf type '
        });
        return;
      }
      cmi_session.dtmf(no, cmi_ua, _this);
    }
  }, {
    key: "hold",
    value: function hold(_this) {
      if (!_lodash["default"].isEmpty(cmi_ua)) {
        if (!cmi_ua.isRegistered()) {
          _this.emit('error', {
            code: 1002,
            status: 'Please login '
          });
          return;
        }
      }
      cmi_session.hold(cmi_ua, _this);
    }
  }, {
    key: "unhold",
    value: function unhold(_this) {
      if (!_lodash["default"].isEmpty(cmi_ua)) {
        if (!cmi_ua.isRegistered()) {
          _this.emit('error', {
            code: 1002,
            status: 'Please login '
          });
          return;
        }
      }
      cmi_session.unhold(cmi_ua, _this);
    }
  }, {
    key: "mute",
    value: function mute(_this) {
      if (!_lodash["default"].isEmpty(cmi_ua)) {
        if (!cmi_ua.isRegistered()) {
          _this.emit('error', {
            code: 1002,
            status: 'Please login '
          });
          return;
        }
      }
      cmi_session.mute(cmi_ua, _this);
    }
  }, {
    key: "unmute",
    value: function unmute(_this) {
      if (!_lodash["default"].isEmpty(cmi_ua)) {
        if (!cmi_ua.isRegistered()) {
          _this.emit('error', {
            code: 1002,
            status: 'Please login '
          });
          return;
        }
      }
      cmi_session.unmute(cmi_ua, _this);
    }
  }, {
    key: "islogedin",
    value: function islogedin(_this) {
      if (!_lodash["default"].isEmpty(cmi_ua)) {
        if (cmi_ua.isRegistered()) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "onmute",
    value: function onmute(_this) {
      if (!_lodash["default"].isEmpty(cmi_ua)) {
        if (!cmi_ua.isRegistered()) {
          return false;
        } else {
          return cmi_session.onmute(cmi_ua, _this);
        }
      }
    }
  }, {
    key: "onhold",
    value: function onhold(_this) {
      if (!_lodash["default"].isEmpty(cmi_ua)) {
        if (!cmi_ua.isRegistered()) {
          return false;
        } else {
          return cmi_session.onhold(cmi_ua, _this);
        }
      }
    }
  }]);
}();