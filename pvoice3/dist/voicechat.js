/*
 * pvoice3 v3.0.0
 * GLife | Voice Chat
 * Copyright: 2017-2021 Vinipux322 & pichotm (a little)...
 * License: All Rights Reserved
 */

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"/home/ubuntu/umbrella-voice2/app/lib/Logger.js":[function(require,module,exports){
  "use strict";
  
  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  
  var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
  
  var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
  
  var _debug = _interopRequireDefault(require("debug"));
  
  var APP_NAME = 'mediasoup-demo';
  
  var Logger = /*#__PURE__*/function () {
    function Logger(prefix) {
      (0, _classCallCheck2["default"])(this, Logger);
  
      if (prefix) {
        this._debug = (0, _debug["default"])("".concat(APP_NAME, ":").concat(prefix));
        this._warn = (0, _debug["default"])("".concat(APP_NAME, ":WARN:").concat(prefix));
        this._error = (0, _debug["default"])("".concat(APP_NAME, ":ERROR:").concat(prefix));
      } else {
        this._debug = (0, _debug["default"])(APP_NAME);
        this._warn = (0, _debug["default"])("".concat(APP_NAME, ":WARN"));
        this._error = (0, _debug["default"])("".concat(APP_NAME, ":ERROR"));
      }
      /* eslint-disable no-console */
  
  
      this._debug.log = console.info.bind(console);
      this._warn.log = console.warn.bind(console);
      this._error.log = console.error.bind(console);
      /* eslint-enable no-console */
    }
  
    (0, _createClass2["default"])(Logger, [{
      key: "debug",
      get: function get() {
        return this._debug;
      }
    }, {
      key: "warn",
      get: function get() {
        return this._warn;
      }
    }, {
      key: "error",
      get: function get() {
        return this._error;
      }
    }]);
    return Logger;
  }();
  
  exports["default"] = Logger;
  
  },{"@babel/runtime/helpers/classCallCheck":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/interopRequireDefault":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js","debug":"/home/ubuntu/umbrella-voice2/app/node_modules/debug/src/browser.js"}],"/home/ubuntu/umbrella-voice2/app/lib/RoomClient.js":[function(require,module,exports){
  "use strict";
  
  var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
  
  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  
  var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
  
  var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
  
  var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
  
  var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
  
  var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
  
  var _protooClient = _interopRequireDefault(require("protoo-client"));
  
  var mediasoupClient = _interopRequireWildcard(require("mediasoup-client"));
  
  var _Logger = _interopRequireDefault(require("./Logger"));
  
  var _urlFactory = require("./urlFactory");
  
  var _events = _interopRequireDefault(require("./events"));
  
  var utils = _interopRequireWildcard(require("./utils"));
  
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
  
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  
  var PC_PROPRIETARY_CONSTRAINTS = {
    optional: [{
      googDscp: true
    }]
  };
  var iceServers = [{
    urls: 'stun:stun.l.google.com:19302',
    username: '',
    credential: ''
  }, {
    urls: 'stun:stun1.l.google.com:19302',
    username: '',
    credential: ''
  }, {
    urls: 'stun:stun2.l.google.com:19302',
    username: '',
    credential: ''
  }, {
    urls: 'stun:stun3.l.google.com:19302',
    username: '',
    credential: ''
  }, {
    urls: 'stun:stun4.l.google.com:19302',
    username: '',
    credential: ''
  }];
  var logger = new _Logger["default"]('RoomClient');
  
  var RoomClient = /*#__PURE__*/function () {
    /**
     * @param  {Object} data
     * @param  {Object} data.store - The Redux store.
     */
    // static init(data)
    // {
    // 	store = data.store;
    // }
    function RoomClient(_ref) {
      var roomId = _ref.roomId,
          peerId = _ref.peerId,
          device = _ref.device,
          handlerName = _ref.handlerName,
          useSimulcast = _ref.useSimulcast,
          forceTcp = _ref.forceTcp,
          produce = _ref.produce,
          consume = _ref.consume,
          forceH264 = _ref.forceH264,
          forceVP9 = _ref.forceVP9,
          datachannel = _ref.datachannel;
      (0, _classCallCheck2["default"])(this, RoomClient);
      logger.debug('constructor() [roomId:"%s", peerId:"%s", device:%s]', roomId, peerId, device.flag);
      this.audioContext = new AudioContext();
      this.mainVolume = this.audioContext.createGain();
      this.mainVolume.connect(this.audioContext.destination);
      this.mainVolume.gain.setValueAtTime(1, this.audioContext.currentTime);
      this.roomId = roomId;
      this.peerId = peerId; // Closed flag.
      // @type {Boolean}
  
      this._closed = false; // Device info.
      // @type {Object}
  
      this._device = device; // Whether we want to force RTC over TCP.
      // @type {Boolean}
  
      this._forceTcp = forceTcp; // Whether we want to produce audio/video.
      // @type {Boolean}
  
      this._produce = produce; // Whether we should consume.
      // @type {Boolean}
  
      this._consume = consume; // Whether we want DataChannels.
      // @type {Boolean}
  
      this._useDataChannel = datachannel; // Force H264 codec for sending.
  
      this._forceH264 = Boolean(forceH264); // Force VP9 codec for sending.
  
      this._forceVP9 = Boolean(forceVP9); // External video.
      // @type {HTMLVideoElement}
  
      this._externalVideo = null; // Next expected dataChannel test number.
      // @type {Number}
  
      this._nextDataChannelTestNumber = 0; // Custom mediasoup-client handler name (to override default browser
      // detection if desired).
      // @type {String}
  
      this._handlerName = handlerName; // Whether simulcast should be used.
      // @type {Boolean}
  
      this._useSimulcast = useSimulcast; // protoo-client Peer instance.
      // @type {protooClient.Peer}
  
      this._protoo = null; // mediasoup-client Device instance.
      // @type {mediasoupClient.Device}
  
      this._mediasoupDevice = null; // mediasoup Transport for sending.
      // @type {mediasoupClient.Transport}
  
      this._sendTransport = null; // mediasoup Transport for receiving.
      // @type {mediasoupClient.Transport}
  
      this._recvTransport = null; // Local mic mediasoup Producer.
      // @type {mediasoupClient.Producer}
  
      this._micProducer = null; // mediasoup Consumers.
      // @type {Map<String, mediasoupClient.Consumer>}
  
      this._consumers = new Map(); // mediasoup Consumers.
      // @type {Map<String, mediasoupClient.Consumer>}
  
      this._peers = new Map();
    }
  
    (0, _createClass2["default"])(RoomClient, [{
      key: "close",
      value: function close() {
        if (this._closed) return;
        this._closed = true;
        logger.debug('close()'); // Close protoo Peer
  
        this._protoo.close();
  
        _events["default"].triggerClientChangeStateConnection(this.roomId, 'disconnected'); // Close mediasoup Transports.
  
  
        if (this._sendTransport) this._sendTransport.close();
        if (this._recvTransport) this._recvTransport.close();
      }
    }, {
      key: "join",
      value: function () {
        var _join = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
          var _this = this;
  
          var protooUrl, protooTransport;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  protooUrl = (0, _urlFactory.getProtooUrl)({
                    roomId: this.roomId,
                    peerId: this.peerId
                  });
                  protooTransport = new _protooClient["default"].WebSocketTransport(protooUrl);
                  this._protoo = new _protooClient["default"].Peer(protooTransport);
  
                  this._protoo.on('open', function () {
                    return _this._joinRoom();
                  });
  
                  this._protoo.on('failed', function () {
                    logger.error('proto connect failed');
  
                    _events["default"].triggerClientChangeStateConnection(_this.roomId, 'disconnected');
                  });
  
                  this._protoo.on('disconnected', function () {
                    logger.debug('proto disconnected');
  
                    _events["default"].triggerClientChangeStateConnection(_this.roomId, 'disconnected'); // Close mediasoup Transports.
  
  
                    if (_this._sendTransport) {
                      _this._sendTransport.close();
  
                      _this._sendTransport = null;
                    }
  
                    if (_this._recvTransport) {
                      _this._recvTransport.close();
  
                      _this._recvTransport = null;
                    }
                  });
  
                  this._protoo.on('close', function () {
                    if (_this._closed) return;
  
                    _this.close();
                  }); // eslint-disable-next-line no-unused-vars
  
  
                  this._protoo.on('request', /*#__PURE__*/function () {
                    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, accept, reject) {
                      var _request$data, peerId, producerId, id, kind, rtpParameters, appData, consumer;
  
                      return _regenerator["default"].wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              logger.debug('proto "request" event [method:%s, data:%o]', request.method, request.data);
                              _context.t0 = request.method;
                              _context.next = _context.t0 === 'newConsumer' ? 4 : 24;
                              break;
  
                            case 4:
                              if (_this._consume) {
                                _context.next = 7;
                                break;
                              }
  
                              reject(403, 'I do not want to consume');
                              return _context.abrupt("break", 24);
  
                            case 7:
                              _request$data = request.data, peerId = _request$data.peerId, producerId = _request$data.producerId, id = _request$data.id, kind = _request$data.kind, rtpParameters = _request$data.rtpParameters, appData = _request$data.appData;
                              _context.prev = 8;
                              _context.next = 11;
                              return _this._recvTransport.consume({
                                id: id,
                                producerId: producerId,
                                kind: kind,
                                rtpParameters: rtpParameters,
                                appData: _objectSpread(_objectSpread({}, appData), {}, {
                                  peerId: peerId
                                }) // Trick.
  
                              });
  
                            case 11:
                              consumer = _context.sent;
  
                              // Store in the map.
                              _this._consumers.set(consumer.id, consumer);
  
                              _this._peers.set(peerId, consumer.id);
  
                              consumer.on('transportclose', function () {
                                _this._peers["delete"](consumer.peerId);
  
                                _this._consumers["delete"](consumer.id);
                              }); // const { spatialLayers, temporalLayers } =
                              // 	mediasoupClient.parseScalabilityMode(
                              // 		consumer.rtpParameters.encodings[0].scalabilityMode);
  
                              _this.initConsumerAudio(consumer.id); // We are ready. Answer the protoo request so the server will
                              // resume this Consumer (which was paused for now if video).
  
  
                              accept(); // If audio-only mode is enabled, pause it.
                              // if (consumer.kind === 'video' && store.getState().me.audioOnly)
                              // 	this._pauseConsumer(consumer);
  
                              _context.next = 23;
                              break;
  
                            case 19:
                              _context.prev = 19;
                              _context.t1 = _context["catch"](8);
                              logger.error('"newConsumer" request failed:%o', _context.t1);
                              throw _context.t1;
  
                            case 23:
                              return _context.abrupt("break", 24);
  
                            case 24:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, null, [[8, 19]]);
                    }));
  
                    return function (_x, _x2, _x3) {
                      return _ref2.apply(this, arguments);
                    };
                  }());
  
                  this._protoo.on('notification', function (notification) {
                    if (notification.method !== 'activeSpeaker') {
                      logger.debug('proto "notification" event [method:%s, data:%o]', notification.method, notification.data);
                    }
  
                    switch (notification.method) {
                      case 'consumerClosed':
                        {
                          var consumerId = notification.data.consumerId;
  
                          var consumer = _this._consumers.get(consumerId);
  
                          if (!consumer) break;
                          consumer.close();
  
                          _this.removeConsumerAudio(consumerId);
  
                          _this._peers["delete"](consumer.peerId);
  
                          _this._consumers["delete"](consumerId); // const { peerId } = consumer.appData;
  
  
                          break;
                        }
  
                      case 'consumerPaused':
                        {
                          var _consumerId = notification.data.consumerId;
  
                          var _consumer = _this._consumers.get(_consumerId);
  
                          if (!_consumer) break;
  
                          _consumer.pause();
  
                          break;
                        }
  
                      case 'consumerResumed':
                        {
                          var _consumerId2 = notification.data.consumerId;
  
                          var _consumer2 = _this._consumers.get(_consumerId2);
  
                          if (!_consumer2) break;
  
                          _consumer2.resume();
  
                          break;
                        }
  
                      default:
                        {
                          logger.error('unknown protoo notification.method "%s"', notification.method);
                        }
                    }
                  });
  
                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));
  
        function join() {
          return _join.apply(this, arguments);
        }
  
        return join;
      }()
    }, {
      key: "enableMic",
      value: function () {
        var _enableMic = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
          var _this2 = this;
  
          var track, constraints, stream;
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  logger.debug('enableMic()');
  
                  if (!this._micProducer) {
                    _context3.next = 3;
                    break;
                  }
  
                  return _context3.abrupt("return");
  
                case 3:
                  if (this._mediasoupDevice.canProduce('audio')) {
                    _context3.next = 6;
                    break;
                  }
  
                  logger.error('enableMic() | cannot produce audio');
                  return _context3.abrupt("return");
  
                case 6:
                  _context3.prev = 6;
                  logger.debug('enableMic() | calling getUserMedia()');
                  constraints = {
                    audio: {
                      // echoCancellation: isUsb ? false : null,
                      echoCancellation: false,
                      noiseSuppression: true,
                      autoGainControl: false // deviceId : deviceId
  
                    }
                  };
                  _context3.next = 11;
                  return navigator.mediaDevices.getUserMedia(constraints);
  
                case 11:
                  stream = _context3.sent;
                  track = stream.getAudioTracks()[0];
                  _context3.next = 15;
                  return this._sendTransport.produce({
                    track: track,
                    codecOptions: {
                      opusStereo: 1,
                      opusDtx: 1
                    } // NOTE: for testing codec selection.
                    // codec : this._mediasoupDevice.rtpCapabilities.codecs
                    // 	.find((codec) => codec.mimeType.toLowerCase() === 'audio/pcma')
  
                  });
  
                case 15:
                  this._micProducer = _context3.sent;
  
                  this._micProducer.pause();
  
                  this._micProducer.on('transportclose', function () {
                    _this2._micProducer = null;
                  });
  
                  this._micProducer.on('trackended', function () {
                    _this2.disableMic()["catch"](function () {});
                  });
  
                  _context3.next = 25;
                  break;
  
                case 21:
                  _context3.prev = 21;
                  _context3.t0 = _context3["catch"](6);
                  logger.error('enableMic() | failed:%o', _context3.t0);
                  if (track) track.stop();
  
                case 25:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[6, 21]]);
        }));
  
        function enableMic() {
          return _enableMic.apply(this, arguments);
        }
  
        return enableMic;
      }()
    }, {
      key: "disableMic",
      value: function () {
        var _disableMic = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  logger.debug('disableMic()');
  
                  if (this._micProducer) {
                    _context4.next = 3;
                    break;
                  }
  
                  return _context4.abrupt("return");
  
                case 3:
                  this._micProducer.close();
  
                  _context4.prev = 4;
                  _context4.next = 7;
                  return this._protoo.request('closeProducer', {
                    producerId: this._micProducer.id
                  });
  
                case 7:
                  _context4.next = 12;
                  break;
  
                case 9:
                  _context4.prev = 9;
                  _context4.t0 = _context4["catch"](4);
                  logger.error(_context4.t0);
  
                case 12:
                  this._micProducer = null;
  
                case 13:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[4, 9]]);
        }));
  
        function disableMic() {
          return _disableMic.apply(this, arguments);
        }
  
        return disableMic;
      }()
    }, {
      key: "muteMic",
      value: function () {
        var _muteMic = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
          return _regenerator["default"].wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  logger.debug('muteMic()');
  
                  this._micProducer.pause();
  
                  _context5.prev = 2;
                  _context5.next = 5;
                  return this._protoo.request('pauseProducer', {
                    producerId: this._micProducer.id
                  });
  
                case 5:
                  _context5.next = 10;
                  break;
  
                case 7:
                  _context5.prev = 7;
                  _context5.t0 = _context5["catch"](2);
                  logger.error('muteMic() | failed: %o', _context5.t0);
  
                case 10:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[2, 7]]);
        }));
  
        function muteMic() {
          return _muteMic.apply(this, arguments);
        }
  
        return muteMic;
      }()
    }, {
      key: "unmuteMic",
      value: function () {
        var _unmuteMic = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
          return _regenerator["default"].wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  logger.debug('unmuteMic()');
  
                  this._micProducer.resume();
  
                  _context6.prev = 2;
                  _context6.next = 5;
                  return this._protoo.request('resumeProducer', {
                    producerId: this._micProducer.id
                  });
  
                case 5:
                  _context6.next = 10;
                  break;
  
                case 7:
                  _context6.prev = 7;
                  _context6.t0 = _context6["catch"](2);
                  logger.error('unmuteMic() | failed: %o', _context6.t0);
  
                case 10:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[2, 7]]);
        }));
  
        function unmuteMic() {
          return _unmuteMic.apply(this, arguments);
        }
  
        return unmuteMic;
      }()
    }, {
      key: "requestMediaPeer",
      value: function () {
        var _requestMediaPeer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(peerId) {
          var _this3 = this;
  
          return _regenerator["default"].wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  logger.debug("request peer: ".concat(peerId));
  
                  this._protoo.request('requestPeer', {
                    peerId: peerId
                  }).then(function () {
                    _events["default"].triggerClientRequestMediaPeerResponse(_this3.roomId, peerId, true);
                  })["catch"](function (err) {
                    // console.log(err);
                    logger.error('requestCloseMediaPeer - error', peerId, err);
  
                    _events["default"].triggerClientRequestMediaPeerResponse(_this3.roomId, peerId, false);
                  });
  
                case 2:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));
  
        function requestMediaPeer(_x4) {
          return _requestMediaPeer.apply(this, arguments);
        }
  
        return requestMediaPeer;
      }()
    }, {
      key: "requestCloseMediaPeer",
      value: function () {
        var _requestCloseMediaPeer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(peerId) {
          var consumerId, consumer;
          return _regenerator["default"].wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  // this._protoo.request(
                  // 	'requestClosePeer', { peerId });
                  consumerId = this._peers.get(peerId);
  
                  if (consumerId) {
                    _context8.next = 3;
                    break;
                  }
  
                  return _context8.abrupt("return");
  
                case 3:
                  consumer = this._consumers.get(consumerId);
  
                  this._closeConsumer(consumer, peerId);
  
                case 5:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));
  
        function requestCloseMediaPeer(_x5) {
          return _requestCloseMediaPeer.apply(this, arguments);
        }
  
        return requestCloseMediaPeer;
      }()
    }, {
      key: "muteAudio",
      value: function () {
        var _muteAudio = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
          return _regenerator["default"].wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  logger.debug('muteAudio()');
  
                case 1:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee9);
        }));
  
        function muteAudio() {
          return _muteAudio.apply(this, arguments);
        }
  
        return muteAudio;
      }()
    }, {
      key: "unmuteAudio",
      value: function () {
        var _unmuteAudio = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
          return _regenerator["default"].wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  logger.debug('unmuteAudio()');
  
                case 1:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee10);
        }));
  
        function unmuteAudio() {
          return _unmuteAudio.apply(this, arguments);
        }
  
        return unmuteAudio;
      }()
    }, {
      key: "restartIce",
      value: function () {
        var _restartIce = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
          var iceParameters, _iceParameters;
  
          return _regenerator["default"].wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  logger.debug('restartIce()');
                  _context11.prev = 1;
  
                  if (!this._sendTransport) {
                    _context11.next = 8;
                    break;
                  }
  
                  _context11.next = 5;
                  return this._protoo.request('restartIce', {
                    transportId: this._sendTransport.id
                  });
  
                case 5:
                  iceParameters = _context11.sent;
                  _context11.next = 8;
                  return this._sendTransport.restartIce({
                    iceParameters: iceParameters
                  });
  
                case 8:
                  if (!this._recvTransport) {
                    _context11.next = 14;
                    break;
                  }
  
                  _context11.next = 11;
                  return this._protoo.request('restartIce', {
                    transportId: this._recvTransport.id
                  });
  
                case 11:
                  _iceParameters = _context11.sent;
                  _context11.next = 14;
                  return this._recvTransport.restartIce({
                    iceParameters: _iceParameters
                  });
  
                case 14:
                  _context11.next = 19;
                  break;
  
                case 16:
                  _context11.prev = 16;
                  _context11.t0 = _context11["catch"](1);
                  logger.error('restartIce() | failed:%o', _context11.t0);
  
                case 19:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee11, this, [[1, 16]]);
        }));
  
        function restartIce() {
          return _restartIce.apply(this, arguments);
        }
  
        return restartIce;
      }()
    }, {
      key: "setConsumerPreferredLayers",
      value: function () {
        var _setConsumerPreferredLayers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(consumerId, spatialLayer, temporalLayer) {
          return _regenerator["default"].wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  logger.debug('setConsumerPreferredLayers() [consumerId:%s, spatialLayer:%s, temporalLayer:%s]', consumerId, spatialLayer, temporalLayer);
                  _context12.prev = 1;
                  _context12.next = 4;
                  return this._protoo.request('setConsumerPreferredLayers', {
                    consumerId: consumerId,
                    spatialLayer: spatialLayer,
                    temporalLayer: temporalLayer
                  });
  
                case 4:
                  _context12.next = 9;
                  break;
  
                case 6:
                  _context12.prev = 6;
                  _context12.t0 = _context12["catch"](1);
                  logger.error('setConsumerPreferredLayers() | failed:%o', _context12.t0);
  
                case 9:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee12, this, [[1, 6]]);
        }));
  
        function setConsumerPreferredLayers(_x6, _x7, _x8) {
          return _setConsumerPreferredLayers.apply(this, arguments);
        }
  
        return setConsumerPreferredLayers;
      }()
    }, {
      key: "setConsumerPriority",
      value: function () {
        var _setConsumerPriority = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(consumerId, priority) {
          return _regenerator["default"].wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  logger.debug('setConsumerPriority() [consumerId:%s, priority:%d]', consumerId, priority);
                  _context13.prev = 1;
                  _context13.next = 4;
                  return this._protoo.request('setConsumerPriority', {
                    consumerId: consumerId,
                    priority: priority
                  });
  
                case 4:
                  _context13.next = 9;
                  break;
  
                case 6:
                  _context13.prev = 6;
                  _context13.t0 = _context13["catch"](1);
                  logger.error('setConsumerPriority() | failed:%o', _context13.t0);
  
                case 9:
                case "end":
                  return _context13.stop();
              }
            }
          }, _callee13, this, [[1, 6]]);
        }));
  
        function setConsumerPriority(_x9, _x10) {
          return _setConsumerPriority.apply(this, arguments);
        }
  
        return setConsumerPriority;
      }()
    }, {
      key: "getSendTransportRemoteStats",
      value: function () {
        var _getSendTransportRemoteStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
          return _regenerator["default"].wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  logger.debug('getSendTransportRemoteStats()');
  
                  if (this._sendTransport) {
                    _context14.next = 3;
                    break;
                  }
  
                  return _context14.abrupt("return");
  
                case 3:
                  return _context14.abrupt("return", this._protoo.request('getTransportStats', {
                    transportId: this._sendTransport.id
                  }));
  
                case 4:
                case "end":
                  return _context14.stop();
              }
            }
          }, _callee14, this);
        }));
  
        function getSendTransportRemoteStats() {
          return _getSendTransportRemoteStats.apply(this, arguments);
        }
  
        return getSendTransportRemoteStats;
      }()
    }, {
      key: "getRecvTransportRemoteStats",
      value: function () {
        var _getRecvTransportRemoteStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
          return _regenerator["default"].wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  logger.debug('getRecvTransportRemoteStats()');
  
                  if (this._recvTransport) {
                    _context15.next = 3;
                    break;
                  }
  
                  return _context15.abrupt("return");
  
                case 3:
                  return _context15.abrupt("return", this._protoo.request('getTransportStats', {
                    transportId: this._recvTransport.id
                  }));
  
                case 4:
                case "end":
                  return _context15.stop();
              }
            }
          }, _callee15, this);
        }));
  
        function getRecvTransportRemoteStats() {
          return _getRecvTransportRemoteStats.apply(this, arguments);
        }
  
        return getRecvTransportRemoteStats;
      }()
    }, {
      key: "getAudioRemoteStats",
      value: function () {
        var _getAudioRemoteStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
          return _regenerator["default"].wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  logger.debug('getAudioRemoteStats()');
  
                  if (this._micProducer) {
                    _context16.next = 3;
                    break;
                  }
  
                  return _context16.abrupt("return");
  
                case 3:
                  return _context16.abrupt("return", this._protoo.request('getProducerStats', {
                    producerId: this._micProducer.id
                  }));
  
                case 4:
                case "end":
                  return _context16.stop();
              }
            }
          }, _callee16, this);
        }));
  
        function getAudioRemoteStats() {
          return _getAudioRemoteStats.apply(this, arguments);
        }
  
        return getAudioRemoteStats;
      }()
    }, {
      key: "getConsumerRemoteStats",
      value: function () {
        var _getConsumerRemoteStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(consumerId) {
          var consumer;
          return _regenerator["default"].wrap(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  logger.debug('getConsumerRemoteStats()');
                  consumer = this._consumers.get(consumerId);
  
                  if (consumer) {
                    _context17.next = 4;
                    break;
                  }
  
                  return _context17.abrupt("return");
  
                case 4:
                  return _context17.abrupt("return", this._protoo.request('getConsumerStats', {
                    consumerId: consumerId
                  }));
  
                case 5:
                case "end":
                  return _context17.stop();
              }
            }
          }, _callee17, this);
        }));
  
        function getConsumerRemoteStats(_x11) {
          return _getConsumerRemoteStats.apply(this, arguments);
        }
  
        return getConsumerRemoteStats;
      }()
    }, {
      key: "getBotDataProducerRemoteStats",
      value: function () {
        var _getBotDataProducerRemoteStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
          var dataProducer;
          return _regenerator["default"].wrap(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  logger.debug('getBotDataProducerRemoteStats()');
                  dataProducer = this._botDataProducer;
  
                  if (dataProducer) {
                    _context18.next = 4;
                    break;
                  }
  
                  return _context18.abrupt("return");
  
                case 4:
                  return _context18.abrupt("return", this._protoo.request('getDataProducerStats', {
                    dataProducerId: dataProducer.id
                  }));
  
                case 5:
                case "end":
                  return _context18.stop();
              }
            }
          }, _callee18, this);
        }));
  
        function getBotDataProducerRemoteStats() {
          return _getBotDataProducerRemoteStats.apply(this, arguments);
        }
  
        return getBotDataProducerRemoteStats;
      }()
    }, {
      key: "getDataConsumerRemoteStats",
      value: function () {
        var _getDataConsumerRemoteStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(dataConsumerId) {
          var dataConsumer;
          return _regenerator["default"].wrap(function _callee19$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  logger.debug('getDataConsumerRemoteStats()');
                  dataConsumer = this._dataConsumers.get(dataConsumerId);
  
                  if (dataConsumer) {
                    _context19.next = 4;
                    break;
                  }
  
                  return _context19.abrupt("return");
  
                case 4:
                  return _context19.abrupt("return", this._protoo.request('getDataConsumerStats', {
                    dataConsumerId: dataConsumerId
                  }));
  
                case 5:
                case "end":
                  return _context19.stop();
              }
            }
          }, _callee19, this);
        }));
  
        function getDataConsumerRemoteStats(_x12) {
          return _getDataConsumerRemoteStats.apply(this, arguments);
        }
  
        return getDataConsumerRemoteStats;
      }()
    }, {
      key: "getSendTransportLocalStats",
      value: function () {
        var _getSendTransportLocalStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
          return _regenerator["default"].wrap(function _callee20$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  logger.debug('getSendTransportLocalStats()');
  
                  if (this._sendTransport) {
                    _context20.next = 3;
                    break;
                  }
  
                  return _context20.abrupt("return");
  
                case 3:
                  return _context20.abrupt("return", this._sendTransport.getStats());
  
                case 4:
                case "end":
                  return _context20.stop();
              }
            }
          }, _callee20, this);
        }));
  
        function getSendTransportLocalStats() {
          return _getSendTransportLocalStats.apply(this, arguments);
        }
  
        return getSendTransportLocalStats;
      }()
    }, {
      key: "getRecvTransportLocalStats",
      value: function () {
        var _getRecvTransportLocalStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
          return _regenerator["default"].wrap(function _callee21$(_context21) {
            while (1) {
              switch (_context21.prev = _context21.next) {
                case 0:
                  logger.debug('getRecvTransportLocalStats()');
  
                  if (this._recvTransport) {
                    _context21.next = 3;
                    break;
                  }
  
                  return _context21.abrupt("return");
  
                case 3:
                  return _context21.abrupt("return", this._recvTransport.getStats());
  
                case 4:
                case "end":
                  return _context21.stop();
              }
            }
          }, _callee21, this);
        }));
  
        function getRecvTransportLocalStats() {
          return _getRecvTransportLocalStats.apply(this, arguments);
        }
  
        return getRecvTransportLocalStats;
      }()
    }, {
      key: "getAudioLocalStats",
      value: function () {
        var _getAudioLocalStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
          return _regenerator["default"].wrap(function _callee22$(_context22) {
            while (1) {
              switch (_context22.prev = _context22.next) {
                case 0:
                  logger.debug('getAudioLocalStats()');
  
                  if (this._micProducer) {
                    _context22.next = 3;
                    break;
                  }
  
                  return _context22.abrupt("return");
  
                case 3:
                  return _context22.abrupt("return", this._micProducer.getStats());
  
                case 4:
                case "end":
                  return _context22.stop();
              }
            }
          }, _callee22, this);
        }));
  
        function getAudioLocalStats() {
          return _getAudioLocalStats.apply(this, arguments);
        }
  
        return getAudioLocalStats;
      }()
    }, {
      key: "getConsumerLocalStats",
      value: function () {
        var _getConsumerLocalStats = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(consumerId) {
          var consumer;
          return _regenerator["default"].wrap(function _callee23$(_context23) {
            while (1) {
              switch (_context23.prev = _context23.next) {
                case 0:
                  consumer = this._consumers.get(consumerId);
  
                  if (consumer) {
                    _context23.next = 3;
                    break;
                  }
  
                  return _context23.abrupt("return");
  
                case 3:
                  return _context23.abrupt("return", consumer.getStats());
  
                case 4:
                case "end":
                  return _context23.stop();
              }
            }
          }, _callee23, this);
        }));
  
        function getConsumerLocalStats(_x13) {
          return _getConsumerLocalStats.apply(this, arguments);
        }
  
        return getConsumerLocalStats;
      }()
    }, {
      key: "applyNetworkThrottle",
      value: function () {
        var _applyNetworkThrottle = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(_ref3) {
          var uplink, downlink, rtt, secret;
          return _regenerator["default"].wrap(function _callee24$(_context24) {
            while (1) {
              switch (_context24.prev = _context24.next) {
                case 0:
                  uplink = _ref3.uplink, downlink = _ref3.downlink, rtt = _ref3.rtt, secret = _ref3.secret;
                  logger.debug('applyNetworkThrottle() [uplink:%s, downlink:%s, rtt:%s]', uplink, downlink, rtt);
                  _context24.prev = 2;
                  _context24.next = 5;
                  return this._protoo.request('applyNetworkThrottle', {
                    uplink: uplink,
                    downlink: downlink,
                    rtt: rtt,
                    secret: secret
                  });
  
                case 5:
                  _context24.next = 10;
                  break;
  
                case 7:
                  _context24.prev = 7;
                  _context24.t0 = _context24["catch"](2);
                  logger.error('applyNetworkThrottle() | failed:%o', _context24.t0);
  
                case 10:
                case "end":
                  return _context24.stop();
              }
            }
          }, _callee24, this, [[2, 7]]);
        }));
  
        function applyNetworkThrottle(_x14) {
          return _applyNetworkThrottle.apply(this, arguments);
        }
  
        return applyNetworkThrottle;
      }()
    }, {
      key: "resetNetworkThrottle",
      value: function () {
        var _resetNetworkThrottle = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(_ref4) {
          var _ref4$silent, silent, secret;
  
          return _regenerator["default"].wrap(function _callee25$(_context25) {
            while (1) {
              switch (_context25.prev = _context25.next) {
                case 0:
                  _ref4$silent = _ref4.silent, silent = _ref4$silent === void 0 ? false : _ref4$silent, secret = _ref4.secret;
                  logger.debug('resetNetworkThrottle()');
                  _context25.prev = 2;
                  _context25.next = 5;
                  return this._protoo.request('resetNetworkThrottle', {
                    secret: secret
                  });
  
                case 5:
                  _context25.next = 10;
                  break;
  
                case 7:
                  _context25.prev = 7;
                  _context25.t0 = _context25["catch"](2);
  
                  if (!silent) {
                    logger.error('resetNetworkThrottle() | failed:%o', _context25.t0);
                  }
  
                case 10:
                case "end":
                  return _context25.stop();
              }
            }
          }, _callee25, this, [[2, 7]]);
        }));
  
        function resetNetworkThrottle(_x15) {
          return _resetNetworkThrottle.apply(this, arguments);
        }
  
        return resetNetworkThrottle;
      }()
    }, {
      key: "_joinRoom",
      value: function () {
        var _joinRoom2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
          var _this4 = this;
  
          var routerRtpCapabilities, constraints, stream, audioTrack, transportInfo, id, iceParameters, iceCandidates, dtlsParameters, sctpParameters, _transportInfo, _id3, _iceParameters2, _iceCandidates, _dtlsParameters, _sctpParameters;
  
          return _regenerator["default"].wrap(function _callee28$(_context28) {
            while (1) {
              switch (_context28.prev = _context28.next) {
                case 0:
                  logger.debug('_joinRoom()');
                  _context28.prev = 1;
                  this._mediasoupDevice = new mediasoupClient.Device({
                    handlerName: this._handlerName
                  });
                  _context28.next = 5;
                  return this._protoo.request('getRouterRtpCapabilities');
  
                case 5:
                  routerRtpCapabilities = _context28.sent;
                  _context28.next = 8;
                  return this._mediasoupDevice.load({
                    routerRtpCapabilities: routerRtpCapabilities
                  });
  
                case 8:
                  // NOTE: Stuff to play remote audios due to browsers' new autoplay policy.
                  //
                  // Just get access to the mic and DO NOT close the mic track for a while.
                  // Super hack!
                  constraints = {
                    audio: {
                      // echoCancellation: isUsb ? false : null,
                      echoCancellation: false,
                      noiseSuppression: true,
                      autoGainControl: false // deviceId : deviceId
  
                    }
                  };
                  _context28.next = 11;
                  return navigator.mediaDevices.getUserMedia(constraints);
  
                case 11:
                  stream = _context28.sent;
                  audioTrack = stream.getAudioTracks()[0];
                  audioTrack.enabled = false;
                  setTimeout(function () {
                    return audioTrack.stop();
                  }, 120000); // Create mediasoup Transport for sending (unless we don't want to produce).
  
                  if (!this._produce) {
                    _context28.next = 24;
                    break;
                  }
  
                  _context28.next = 18;
                  return this._protoo.request('createWebRtcTransport', {
                    forceTcp: this._forceTcp,
                    producing: true,
                    consuming: false,
                    sctpCapabilities: this._useDataChannel ? this._mediasoupDevice.sctpCapabilities : undefined
                  });
  
                case 18:
                  transportInfo = _context28.sent;
                  id = transportInfo.id, iceParameters = transportInfo.iceParameters, iceCandidates = transportInfo.iceCandidates, dtlsParameters = transportInfo.dtlsParameters, sctpParameters = transportInfo.sctpParameters;
                  this._sendTransport = this._mediasoupDevice.createSendTransport({
                    id: id,
                    iceParameters: iceParameters,
                    iceCandidates: iceCandidates,
                    dtlsParameters: dtlsParameters,
                    sctpParameters: sctpParameters,
                    iceServers: iceServers,
                    proprietaryConstraints: PC_PROPRIETARY_CONSTRAINTS
                  });
  
                  this._sendTransport.on('connect', function (_ref5, callback, errback) // eslint-disable-line no-shadow
                  {
                    var dtlsParameters = _ref5.dtlsParameters;
  
                    _this4._protoo.request('connectWebRtcTransport', {
                      transportId: _this4._sendTransport.id,
                      dtlsParameters: dtlsParameters
                    }).then(callback)["catch"](errback);
                  });
  
                  this._sendTransport.on('produce', /*#__PURE__*/function () {
                    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26(_ref6, callback, errback) {
                      var kind, rtpParameters, appData, _yield$_this4$_protoo, _id;
  
                      return _regenerator["default"].wrap(function _callee26$(_context26) {
                        while (1) {
                          switch (_context26.prev = _context26.next) {
                            case 0:
                              kind = _ref6.kind, rtpParameters = _ref6.rtpParameters, appData = _ref6.appData;
                              _context26.prev = 1;
                              _context26.next = 4;
                              return _this4._protoo.request('produce', {
                                transportId: _this4._sendTransport.id,
                                kind: kind,
                                rtpParameters: rtpParameters,
                                appData: appData
                              });
  
                            case 4:
                              _yield$_this4$_protoo = _context26.sent;
                              _id = _yield$_this4$_protoo.id;
                              callback({
                                id: _id
                              });
                              _context26.next = 12;
                              break;
  
                            case 9:
                              _context26.prev = 9;
                              _context26.t0 = _context26["catch"](1);
                              errback(_context26.t0);
  
                            case 12:
                            case "end":
                              return _context26.stop();
                          }
                        }
                      }, _callee26, null, [[1, 9]]);
                    }));
  
                    return function (_x16, _x17, _x18) {
                      return _ref7.apply(this, arguments);
                    };
                  }());
  
                  this._sendTransport.on('producedata', /*#__PURE__*/function () {
                    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(_ref8, callback, errback) {
                      var sctpStreamParameters, label, protocol, appData, _yield$_this4$_protoo2, _id2;
  
                      return _regenerator["default"].wrap(function _callee27$(_context27) {
                        while (1) {
                          switch (_context27.prev = _context27.next) {
                            case 0:
                              sctpStreamParameters = _ref8.sctpStreamParameters, label = _ref8.label, protocol = _ref8.protocol, appData = _ref8.appData;
                              logger.debug('"producedata" event: [sctpStreamParameters:%o, appData:%o]', sctpStreamParameters, appData);
                              _context27.prev = 2;
                              _context27.next = 5;
                              return _this4._protoo.request('produceData', {
                                transportId: _this4._sendTransport.id,
                                sctpStreamParameters: sctpStreamParameters,
                                label: label,
                                protocol: protocol,
                                appData: appData
                              });
  
                            case 5:
                              _yield$_this4$_protoo2 = _context27.sent;
                              _id2 = _yield$_this4$_protoo2.id;
                              callback({
                                id: _id2
                              });
                              _context27.next = 13;
                              break;
  
                            case 10:
                              _context27.prev = 10;
                              _context27.t0 = _context27["catch"](2);
                              errback(_context27.t0);
  
                            case 13:
                            case "end":
                              return _context27.stop();
                          }
                        }
                      }, _callee27, null, [[2, 10]]);
                    }));
  
                    return function (_x19, _x20, _x21) {
                      return _ref9.apply(this, arguments);
                    };
                  }());
  
                case 24:
                  if (!this._consume) {
                    _context28.next = 31;
                    break;
                  }
  
                  _context28.next = 27;
                  return this._protoo.request('createWebRtcTransport', {
                    forceTcp: this._forceTcp,
                    producing: false,
                    consuming: true,
                    sctpCapabilities: this._useDataChannel ? this._mediasoupDevice.sctpCapabilities : undefined
                  });
  
                case 27:
                  _transportInfo = _context28.sent;
                  _id3 = _transportInfo.id, _iceParameters2 = _transportInfo.iceParameters, _iceCandidates = _transportInfo.iceCandidates, _dtlsParameters = _transportInfo.dtlsParameters, _sctpParameters = _transportInfo.sctpParameters;
                  this._recvTransport = this._mediasoupDevice.createRecvTransport({
                    id: _id3,
                    iceParameters: _iceParameters2,
                    iceCandidates: _iceCandidates,
                    dtlsParameters: _dtlsParameters,
                    sctpParameters: _sctpParameters,
                    iceServers: iceServers
                  });
  
                  this._recvTransport.on('connect', function (_ref10, callback, errback) // eslint-disable-line no-shadow
                  {
                    var dtlsParameters = _ref10.dtlsParameters;
  
                    _this4._protoo.request('connectWebRtcTransport', {
                      transportId: _this4._recvTransport.id,
                      dtlsParameters: dtlsParameters
                    }).then(callback)["catch"](errback);
                  });
  
                case 31:
                  _context28.next = 33;
                  return this._protoo.request('join', {
                    displayName: this.peerId,
                    device: this._device,
                    rtpCapabilities: this._consume ? this._mediasoupDevice.rtpCapabilities : undefined,
                    sctpCapabilities: this._useDataChannel && this._consume ? this._mediasoupDevice.sctpCapabilities : undefined
                  });
  
                case 33:
                  // Enable mic.
                  if (this._produce) {
                    // Set our media capabilities.
                    this.enableMic(); // this._sendTransport.on('connectionstatechange', (connectionState) =>
                    // {
                    // 	// Events.triggerClientChangeStateConnection(connectionState)
                    // });
                  }
  
                  _events["default"].triggerClientChangeStateConnection(this.roomId, 'connected');
  
                  _context28.next = 41;
                  break;
  
                case 37:
                  _context28.prev = 37;
                  _context28.t0 = _context28["catch"](1);
                  logger.error('_joinRoom() failed:%o', _context28.t0);
                  this.close();
  
                case 41:
                case "end":
                  return _context28.stop();
              }
            }
          }, _callee28, this, [[1, 37]]);
        }));
  
        function _joinRoom() {
          return _joinRoom2.apply(this, arguments);
        }
  
        return _joinRoom;
      }()
    }, {
      key: "_pauseConsumer",
      value: function () {
        var _pauseConsumer2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29(consumer) {
          return _regenerator["default"].wrap(function _callee29$(_context29) {
            while (1) {
              switch (_context29.prev = _context29.next) {
                case 0:
                  if (!consumer.paused) {
                    _context29.next = 2;
                    break;
                  }
  
                  return _context29.abrupt("return");
  
                case 2:
                  _context29.prev = 2;
                  _context29.next = 5;
                  return this._protoo.request('pauseConsumer', {
                    consumerId: consumer.id
                  });
  
                case 5:
                  consumer.pause();
                  _context29.next = 11;
                  break;
  
                case 8:
                  _context29.prev = 8;
                  _context29.t0 = _context29["catch"](2);
                  logger.error('_pauseConsumer() | failed:%o', _context29.t0);
  
                case 11:
                case "end":
                  return _context29.stop();
              }
            }
          }, _callee29, this, [[2, 8]]);
        }));
  
        function _pauseConsumer(_x22) {
          return _pauseConsumer2.apply(this, arguments);
        }
  
        return _pauseConsumer;
      }()
    }, {
      key: "_resumeConsumer",
      value: function () {
        var _resumeConsumer2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30(consumer) {
          return _regenerator["default"].wrap(function _callee30$(_context30) {
            while (1) {
              switch (_context30.prev = _context30.next) {
                case 0:
                  if (consumer.paused) {
                    _context30.next = 2;
                    break;
                  }
  
                  return _context30.abrupt("return");
  
                case 2:
                  _context30.prev = 2;
                  _context30.next = 5;
                  return this._protoo.request('resumeConsumer', {
                    consumerId: consumer.id
                  });
  
                case 5:
                  consumer.resume();
                  _context30.next = 11;
                  break;
  
                case 8:
                  _context30.prev = 8;
                  _context30.t0 = _context30["catch"](2);
                  logger.error('_resumeConsumer() | failed:%o', _context30.t0);
  
                case 11:
                case "end":
                  return _context30.stop();
              }
            }
          }, _callee30, this, [[2, 8]]);
        }));
  
        function _resumeConsumer(_x23) {
          return _resumeConsumer2.apply(this, arguments);
        }
  
        return _resumeConsumer;
      }()
    }, {
      key: "_closeConsumer",
      value: function () {
        var _closeConsumer2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31(consumer, peerId) {
          var _this5 = this;
  
          return _regenerator["default"].wrap(function _callee31$(_context31) {
            while (1) {
              switch (_context31.prev = _context31.next) {
                case 0:
                  if (!(!consumer || consumer.closed)) {
                    _context31.next = 2;
                    break;
                  }
  
                  return _context31.abrupt("return");
  
                case 2:
                  try {
                    this._protoo.request('closeConsumer', {
                      consumerId: consumer.id
                    }).then(function () {
                      _events["default"].triggerClientRequestCloseMediaPeerResponse(_this5.roomId, peerId, true);
  
                      consumer.close();
  
                      _this5.removeConsumerAudio(consumer.id);
  
                      _this5._peers["delete"](consumer.peerId);
  
                      _this5._consumers["delete"](consumer.id);
                    })["catch"](function (err) {
                      // console.log(err);
                      logger.error('requestCloseMediaPeer - error', peerId, err);
  
                      _events["default"].triggerClientRequestCloseMediaPeerResponse(_this5.roomId, peerId, false);
                    });
                  } catch (error) {
                    logger.error('_closeConsumer() | failed:%o', error);
                  }
  
                case 3:
                case "end":
                  return _context31.stop();
              }
            }
          }, _callee31, this);
        }));
  
        function _closeConsumer(_x24, _x25) {
          return _closeConsumer2.apply(this, arguments);
        }
  
        return _closeConsumer;
      }()
    }, {
      key: "initConsumerAudio",
      value: function () {
        var _initConsumerAudio = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32(consumerId) {
          var consumer, stream, audio, source, panner;
          return _regenerator["default"].wrap(function _callee32$(_context32) {
            while (1) {
              switch (_context32.prev = _context32.next) {
                case 0:
                  consumer = this._consumers.get(consumerId);
                  stream = new MediaStream();
                  audio = new Audio();
                  audio.autoplay = false;
                  audio.volume = 0;
                  stream.addTrack(consumer.track);
                  audio.srcObject = stream;
                  source = this.audioContext.createMediaStreamSource(stream); // GainNode (proximity)
  
                  consumer.gainNode = this.audioContext.createGain();
                  source.connect(consumer.gainNode); // consumer.gainNode.connect(this.mainVolume);
  
                  consumer.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime); // PannerNode (stereo)
  
                  panner = this.audioContext.createPanner();
                  consumer.panner = panner;
                  consumer.gainNode.connect(consumer.panner);
                  consumer.panner.connect(this.mainVolume);
                  consumer.panner.setOrientation(0, 0, 1);
                  consumer.streamSource = source;
                  consumer.audioSource = audio;
                  consumer.currentActiveNode = consumer.panner;
                  consumer.defaultActiveNode = consumer.panner; // consumer.effects = {};
  
                case 20:
                case "end":
                  return _context32.stop();
              }
            }
          }, _callee32, this);
        }));
  
        function initConsumerAudio(_x26) {
          return _initConsumerAudio.apply(this, arguments);
        }
  
        return initConsumerAudio;
      }()
    }, {
      key: "removeConsumerAudio",
      value: function () {
        var _removeConsumerAudio = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33(consumerId) {
          var consumer;
          return _regenerator["default"].wrap(function _callee33$(_context33) {
            while (1) {
              switch (_context33.prev = _context33.next) {
                case 0:
                  consumer = this._consumers.get(consumerId);
  
                  if (consumer) {
                    _context33.next = 3;
                    break;
                  }
  
                  return _context33.abrupt("return");
  
                case 3:
                  if (consumer.streamSource) {
                    if (consumer.streamSource.numberOfOutputs > 0) {
                      consumer.streamSource.disconnect(consumer.gainNode);
                    }
  
                    if (consumer.gainNode.numberOfOutputs > 0) {
                      consumer.gainNode.disconnect(consumer.panner);
                    }
  
                    if (consumer.panner.numberOfOutputs > 0) {
                      consumer.panner.disconnect(this.mainVolume);
                    }
                  }
  
                  if (consumer && consumer.audioElement) {
                    consumer.audioElement.remove();
                  }
  
                case 5:
                case "end":
                  return _context33.stop();
              }
            }
          }, _callee33, this);
        }));
  
        function removeConsumerAudio(_x27) {
          return _removeConsumerAudio.apply(this, arguments);
        }
  
        return removeConsumerAudio;
      }()
    }, {
      key: "changeMainVolume",
      value: function () {
        var _changeMainVolume = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee34(volume) {
          return _regenerator["default"].wrap(function _callee34$(_context34) {
            while (1) {
              switch (_context34.prev = _context34.next) {
                case 0:
                  if (!isNaN(volume)) this.mainVolume.gain.setValueAtTime(volume, this.audioContext.currentTime);
  
                case 1:
                case "end":
                  return _context34.stop();
              }
            }
          }, _callee34, this);
        }));
  
        function changeMainVolume(_x28) {
          return _changeMainVolume.apply(this, arguments);
        }
  
        return changeMainVolume;
      }()
    }, {
      key: "changeConsumerVolume",
      value: function () {
        var _changeConsumerVolume = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee35(peerId, volume, balance) {
          var consumerId, consumer;
          return _regenerator["default"].wrap(function _callee35$(_context35) {
            while (1) {
              switch (_context35.prev = _context35.next) {
                case 0:
                  consumerId = this._peers.get(peerId);
  
                  if (consumerId) {
                    _context35.next = 3;
                    break;
                  }
  
                  return _context35.abrupt("return");
  
                case 3:
                  consumer = this._consumers.get(consumerId);
  
                  if (consumer) {
                    _context35.next = 6;
                    break;
                  }
  
                  return _context35.abrupt("return");
  
                case 6:
                  if (consumer.audioElement) {
                    consumer.audioElement.volume = volume;
                  }
  
                  if (consumer.gainNode && !isNaN(volume)) {
                    consumer.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
                    consumer.volume = volume;
                  }
  
                  if (consumer.panner && !isNaN(balance)) {
                    consumer.panner.setPosition(balance, 0, 1 - Math.abs(balance));
                    consumer.balance = balance;
                  }
  
                case 9:
                case "end":
                  return _context35.stop();
              }
            }
          }, _callee35, this);
        }));
  
        function changeConsumerVolume(_x29, _x30, _x31) {
          return _changeConsumerVolume.apply(this, arguments);
        }
  
        return changeConsumerVolume;
      }()
    }, {
      key: "changeConsumersVolume",
      value: function () {
        var _changeConsumersVolume = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee36(peers) {
          var _this6 = this;
  
          return _regenerator["default"].wrap(function _callee36$(_context36) {
            while (1) {
              switch (_context36.prev = _context36.next) {
                case 0:
                  peers = typeof peers === 'string' ? JSON.parse(peers) : peers;
                  peers.forEach(function (peer) {
                    if (peer) {
                      _this6.changeConsumerVolume(peer.name, peer.volume, peer.balance);
  
                      if (peer.clearEffects) {
                        _this6.clearConsumerAudioEffects(peer.name);
                      }
  
                      if (peer.effects) {
                        _this6.setConsumerAudioEffects(peer.name, peer.effects);
                      }
                    }
                  });
  
                case 2:
                case "end":
                  return _context36.stop();
              }
            }
          }, _callee36);
        }));
  
        function changeConsumersVolume(_x32) {
          return _changeConsumersVolume.apply(this, arguments);
        }
  
        return changeConsumersVolume;
      }()
    }, {
      key: "clearConsumerAudioEffects",
      value: function () {
        var _clearConsumerAudioEffects = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee37(peerId) {
          var consumerId, consumer;
          return _regenerator["default"].wrap(function _callee37$(_context37) {
            while (1) {
              switch (_context37.prev = _context37.next) {
                case 0:
                  consumerId = this._peers.get(peerId);
  
                  if (consumerId) {
                    _context37.next = 3;
                    break;
                  }
  
                  return _context37.abrupt("return");
  
                case 3:
                  consumer = this._consumers.get(consumerId);
  
                  if (consumer) {
                    _context37.next = 6;
                    break;
                  }
  
                  return _context37.abrupt("return");
  
                case 6:
                  if (consumer.effects) {
                    _context37.next = 8;
                    break;
                  }
  
                  return _context37.abrupt("return");
  
                case 8:
                  if (consumer.currentActiveNode.numberOfOutputs > 0) {
                    consumer.currentActiveNode.disconnect(this.mainVolume);
                    consumer.currentActiveNode = consumer.defaultActiveNode;
                    consumer.currentActiveNode.connect(this.mainVolume);
                    delete consumer.effects;
                  }
  
                case 9:
                case "end":
                  return _context37.stop();
              }
            }
          }, _callee37, this);
        }));
  
        function clearConsumerAudioEffects(_x33) {
          return _clearConsumerAudioEffects.apply(this, arguments);
        }
  
        return clearConsumerAudioEffects;
      }()
    }, {
      key: "makeDistortionCurve",
      value: function makeDistortionCurve(amount) {
        var k = typeof amount === 'number' ? amount : 50;
        var nSamples = 44100;
        var curve = new Float32Array(nSamples);
        var deg = Math.PI / 180;
        var i = 0;
        var x;
  
        for (; i < nSamples; ++i) {
          x = i * 2 / nSamples - 1;
          curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
        }
  
        return curve;
      }
    }, {
      key: "setConsumerAudioEffects",
      value: function () {
        var _setConsumerAudioEffects = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee38(peerId, effects) {
          var consumerId, consumer, values, addedNewEffect, _i, _values, effect, filter, _filter, _filter2, previousNode, _i2, _Object$values, _effect;
  
          return _regenerator["default"].wrap(function _callee38$(_context38) {
            while (1) {
              switch (_context38.prev = _context38.next) {
                case 0:
                  consumerId = this._peers.get(peerId);
  
                  if (consumerId) {
                    _context38.next = 3;
                    break;
                  }
  
                  return _context38.abrupt("return");
  
                case 3:
                  consumer = this._consumers.get(consumerId);
  
                  if (consumer) {
                    _context38.next = 6;
                    break;
                  }
  
                  return _context38.abrupt("return");
  
                case 6:
                  values = Object.values(effects);
                  addedNewEffect = false;
                  _i = 0, _values = values;
  
                case 9:
                  if (!(_i < _values.length)) {
                    _context38.next = 35;
                    break;
                  }
  
                  effect = _values[_i];
                  if (!consumer.effects) consumer.effects = {};
  
                  if (!consumer.effects[effect.name]) {
                    _context38.next = 14;
                    break;
                  }
  
                  return _context38.abrupt("continue", 32);
  
                case 14:
                  _context38.t0 = effect.type;
                  _context38.next = _context38.t0 === 'biquad' ? 17 : _context38.t0 === 'compressor' ? 23 : _context38.t0 === 'distortion' ? 27 : 32;
                  break;
  
                case 17:
                  filter = consumer.effects[effect.name] || this.audioContext.createBiquadFilter();
                  filter.type = effect.data.type;
                  if (!isNaN(effect.data.frequency.value)) filter.frequency.value = effect.data.frequency.value;
                  consumer.effects[effect.name] = filter;
                  addedNewEffect = true;
                  return _context38.abrupt("break", 32);
  
                case 23:
                  _filter = consumer.effects[effect.name] || this.audioContext.createDynamicsCompressor(); // filter.type = effect.data.type;
                  // filter.frequency.value = effect.data.frequency.value;
  
                  consumer.effects[effect.name] = _filter;
                  addedNewEffect = true;
                  return _context38.abrupt("break", 32);
  
                case 27:
                  _filter2 = consumer.effects[effect.name] || this.audioContext.createWaveShaper();
                  _filter2.curve = this.makeDistortionCurve(); // filter.type = effect.data.type;
                  // filter.frequency.value = effect.data.frequency.value;
  
                  consumer.effects[effect.name] = _filter2;
                  addedNewEffect = true;
                  return _context38.abrupt("break", 32);
  
                case 32:
                  _i++;
                  _context38.next = 9;
                  break;
  
                case 35:
                  if (addedNewEffect) {
                    _context38.next = 37;
                    break;
                  }
  
                  return _context38.abrupt("return");
  
                case 37:
                  consumer.currentActiveNode.disconnect(this.mainVolume);
  
                  for (_i2 = 0, _Object$values = Object.values(consumer.effects); _i2 < _Object$values.length; _i2++) {
                    _effect = _Object$values[_i2];
  
                    if (!previousNode) {
                      consumer.currentActiveNode.connect(_effect);
                    } else {
                      previousNode.connect(_effect);
                    }
  
                    previousNode = _effect;
                  }
  
                  consumer.currentActiveNode = previousNode;
                  consumer.currentActiveNode.connect(this.mainVolume); // seems like shit code end
  
                case 41:
                case "end":
                  return _context38.stop();
              }
            }
          }, _callee38, this);
        }));
  
        function setConsumerAudioEffects(_x34, _x35) {
          return _setConsumerAudioEffects.apply(this, arguments);
        }
  
        return setConsumerAudioEffects;
      }()
    }]);
    return RoomClient;
  }();
  
  exports["default"] = RoomClient;
  
  },{"./Logger":"/home/ubuntu/umbrella-voice2/app/lib/Logger.js","./events":"/home/ubuntu/umbrella-voice2/app/lib/events.js","./urlFactory":"/home/ubuntu/umbrella-voice2/app/lib/urlFactory.js","./utils":"/home/ubuntu/umbrella-voice2/app/lib/utils.js","@babel/runtime/helpers/asyncToGenerator":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/asyncToGenerator.js","@babel/runtime/helpers/classCallCheck":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/defineProperty":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/defineProperty.js","@babel/runtime/helpers/interopRequireDefault":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js","@babel/runtime/helpers/interopRequireWildcard":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/interopRequireWildcard.js","@babel/runtime/regenerator":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/regenerator/index.js","mediasoup-client":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/index.js","protoo-client":"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/index.js"}],"/home/ubuntu/umbrella-voice2/app/lib/deviceInfo.js":[function(require,module,exports){
  "use strict";
  
  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = _default;
  
  var _bowser = _interopRequireDefault(require("bowser"));
  
  // TODO: For testing.
  window.BOWSER = _bowser["default"];
  
  function _default() {
    var ua = navigator.userAgent;
  
    var browser = _bowser["default"].getParser(ua);
  
    var flag;
    if (browser.satisfies({
      chrome: '>=0',
      chromium: '>=0'
    })) flag = 'chrome';else if (browser.satisfies({
      firefox: '>=0'
    })) flag = 'firefox';else if (browser.satisfies({
      safari: '>=0'
    })) flag = 'safari';else if (browser.satisfies({
      opera: '>=0'
    })) flag = 'opera';else if (browser.satisfies({
      'microsoft edge': '>=0'
    })) flag = 'edge';else flag = 'unknown';
    return {
      flag: flag,
      name: browser.getBrowserName(),
      version: browser.getBrowserVersion()
    };
  }
  
  },{"@babel/runtime/helpers/interopRequireDefault":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js","bowser":"/home/ubuntu/umbrella-voice2/app/node_modules/bowser/es5.js"}],"/home/ubuntu/umbrella-voice2/app/lib/events.js":[function(require,module,exports){
  "use strict";
  
  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  
  var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
  
  var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
  
  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
  
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  
  /**
   * @type {Map<String, Set<Function>>}
  */
  var __events = new Map();
  
  var listenEvent = function listenEvent(eventName, eventFunction) {
    if (__events.has(eventName)) {
      var event = __events.get(eventName);
  
      if (!event.has(eventFunction)) {
        event.add(eventFunction);
      }
    } else {
      __events.set(eventName, new Set([eventFunction]));
    }
  };
  
  var callEvent = function callEvent(eventName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
  
    if (__events.has(eventName)) {
      var event = __events.get(eventName);
  
      event.forEach(function (eventFunction) {
        eventFunction.apply(void 0, args);
      });
    }
  };
  
  var removeEvent = function removeEvent(eventName, eventFunction) {
    if (__events.has(eventName)) {
      var event = __events.get(eventName);
  
      if (event.has(eventFunction)) {
        event["delete"](eventFunction);
      } else {
        event.clear();
      }
    }
  };
  
  var eventToClient = function eventToClient(eventName, args) {
    args = _objectSpread({}, args); // fetch(`http://${eventName}`, {
    // 	method : 'POST',
    // 	body   : JSON.stringify(args)
    // });
    // const ndata = args === undefined ? '{}' : JSON.stringify(args);
    // console.log("PIZDA")
    // console.log(`http://${eventName}`);
    // console.log(typeof(window.jQuery.post));
    // window.jQuery.post(`http://${eventName}`, JSON.stringify(args));
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "https://".concat(eventName));
    xhr.send(JSON.stringify(args));
  };
  
  var triggerClientChangeStateConnection = function triggerClientChangeStateConnection(roomId, state) {
    eventToClient('pvoice3/changeStateConnection', {
      roomId: roomId,
      state: state
    });
  };
  
  var triggerClientRequestMediaPeerResponse = function triggerClientRequestMediaPeerResponse(roomId, peerName, status) {
    eventToClient('pvoice3/requestMediaPeerResponse', {
      roomId: roomId,
      peerName: peerName,
      status: status
    });
  };
  
  var triggerClientRequestCloseMediaPeerResponse = function triggerClientRequestCloseMediaPeerResponse(roomId, peerName, status) {
    eventToClient('pvoice3/requestCloseMediaPeerResponse', {
      roomId: roomId,
      peerName: peerName,
      status: status
    });
  };
  
  var triggerClientChangeProducerVolume = function triggerClientChangeProducerVolume(volume) {
    eventToClient('pvoice3/changeProducerVolume', {
      volume: volume
    });
  };
  
  var triggerClientChangeConsumerVolume = function triggerClientChangeConsumerVolume(roomId, peerName, volume) {
    eventToClient('pvoice3/changeConsumerVolume', {
      roomId: roomId,
      peerName: peerName,
      volume: volume
    });
  };
  
  var triggerClientChangeConsumersVolume = function triggerClientChangeConsumersVolume(roomId, consumers) {
    eventToClient('pvoice3/changeConsumersVolume', {
      roomId: roomId,
      consumers: consumers
    });
  };
  
  var triggerClientMicrophoneEnabled = function triggerClientMicrophoneEnabled(roomId, peerName, isEnabled) {
    eventToClient('pvoice3/toggleMicrophone', {
      roomId: roomId,
      peerName: peerName,
      isEnabled: isEnabled
    });
  };
  
  window.addEventListener('message', function (event) {
    var data = event.data;
  
    if (__events.has(data.type)) {
      var args = data.args || [];
      callEvent.apply(void 0, [data.type].concat((0, _toConsumableArray2["default"])(args)));
    }
  });
  var _default = {
    on: listenEvent,
    call: callEvent,
    remove: removeEvent,
    triggerClientChangeStateConnection: triggerClientChangeStateConnection,
    triggerClientRequestMediaPeerResponse: triggerClientRequestMediaPeerResponse,
    triggerClientRequestCloseMediaPeerResponse: triggerClientRequestCloseMediaPeerResponse,
    triggerClientChangeProducerVolume: triggerClientChangeProducerVolume,
    triggerClientChangeConsumerVolume: triggerClientChangeConsumerVolume,
    triggerClientChangeConsumersVolume: triggerClientChangeConsumersVolume,
    triggerClientMicrophoneEnabled: triggerClientMicrophoneEnabled,
    __events: __events
  };
  exports["default"] = _default;
  
  },{"@babel/runtime/helpers/defineProperty":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/defineProperty.js","@babel/runtime/helpers/interopRequireDefault":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js","@babel/runtime/helpers/toConsumableArray":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/toConsumableArray.js"}],"/home/ubuntu/umbrella-voice2/app/lib/index.js":[function(require,module,exports){
  "use strict";
  
  var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");
  
  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
  
  var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
  
  var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
  
  var _domready = _interopRequireDefault(require("domready"));
  
  var _urlParse = _interopRequireDefault(require("url-parse"));
  
  var _Logger = _interopRequireDefault(require("./Logger"));
  
  var utils = _interopRequireWildcard(require("./utils"));
  
  var _deviceInfo = _interopRequireDefault(require("./deviceInfo"));
  
  var _RoomClient = _interopRequireDefault(require("./RoomClient"));
  
  var _events = _interopRequireDefault(require("./events"));
  
  var _urlFactory = require("./urlFactory");
  
  // import { createLogger as createReduxLogger } from 're dux-logger';
  var logger = new _Logger["default"](); // if (process.env.NODE_ENV === 'development')
  // {
  // 	const reduxLogger = createReduxLogger(
  // 		{
  // 			duration  : true,
  // 			timestamp : false,
  // 			level     : 'log',
  // 			logErrors : true
  // 		});
  // 	reduxMiddlewares.push(reduxLogger);
  // }
  
  var rooms = {};
  (0, _domready["default"])( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logger.debug('DOM ready');
            _context.next = 3;
            return utils.initialize();
  
          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  
  function run(_x, _x2) {
    return _run.apply(this, arguments);
  }
  
  function _run() {
    _run = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(roomId, peerId) {
      var urlParser, handler, useSimulcast, forceTcp, produce, consume, forceH264, forceVP9, datachannel, roomUrlParser, _i2, _Object$keys, key, device;
  
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              logger.debug('run() [environment:%s]', "development");
              urlParser = new _urlParse["default"](window.location.href, true); // const peerId = randomString({ length: 8 }).toLowerCase() || peerId;
              // let roomId = urlParser.query.roomId;
  
              handler = urlParser.query.handler;
              useSimulcast = urlParser.query.simulcast !== 'false';
              forceTcp = urlParser.query.forceTcp === 'true';
              produce = urlParser.query.produce !== 'false';
              consume = urlParser.query.consume !== 'false';
              forceH264 = urlParser.query.forceH264 === 'true';
              forceVP9 = urlParser.query.forceVP9 === 'true';
              datachannel = urlParser.query.datachannel !== 'false'; // Get the effective/shareable Room URL.
  
              roomUrlParser = new _urlParse["default"](window.location.href, true);
              _i2 = 0, _Object$keys = Object.keys(roomUrlParser.query);
  
            case 12:
              if (!(_i2 < _Object$keys.length)) {
                _context2.next = 22;
                break;
              }
  
              key = _Object$keys[_i2];
              _context2.t0 = key;
              _context2.next = _context2.t0 === 'roomId' ? 17 : _context2.t0 === 'handler' ? 17 : _context2.t0 === 'simulcast' ? 17 : _context2.t0 === 'sharingSimulcast' ? 17 : _context2.t0 === 'produce' ? 17 : _context2.t0 === 'consume' ? 17 : _context2.t0 === 'forceH264' ? 17 : _context2.t0 === 'forceVP9' ? 17 : _context2.t0 === 'forceTcp' ? 17 : _context2.t0 === 'svc' ? 17 : _context2.t0 === 'datachannel' ? 17 : _context2.t0 === 'info' ? 17 : _context2.t0 === 'faceDetection' ? 17 : _context2.t0 === 'externalVideo' ? 17 : _context2.t0 === 'throttleSecret' ? 17 : 18;
              break;
  
            case 17:
              return _context2.abrupt("break", 19);
  
            case 18:
              delete roomUrlParser.query[key];
  
            case 19:
              _i2++;
              _context2.next = 12;
              break;
  
            case 22:
              delete roomUrlParser.hash; // Get current device info.
  
              device = (0, _deviceInfo["default"])();
              rooms[roomId] = new _RoomClient["default"]({
                roomId: roomId,
                peerId: peerId,
                device: device,
                handlerName: handler,
                useSimulcast: useSimulcast,
                forceTcp: forceTcp,
                produce: produce,
                consume: consume,
                forceH264: forceH264,
                forceVP9: forceVP9,
                datachannel: datachannel
              }); // setTimeout(() => roomClient.enableShare(), 3000)
  
              setTimeout(function () {
                return rooms[roomId].join();
              }, 100);
  
            case 26:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _run.apply(this, arguments);
  }
  
  _events["default"].on('run', function (roomId, peerId, token, deviceId, producerVolume, isUsb, isPositioning) {
    run(roomId, peerId, token, deviceId, producerVolume, isUsb, isPositioning);
  });
  
  _events["default"].on('streamIn', function (roomId, peerId) {
    var currentRoom = rooms[roomId];
  
    if (currentRoom && currentRoom._stateConnection !== 'closed') {
      currentRoom.requestMediaPeer(peerId);
    }
  });
  
  _events["default"].on('streamOut', function (roomId, peerId) {
    var currentRoom = rooms[roomId];
  
    if (currentRoom && currentRoom._stateConnection !== 'closed') {
      currentRoom.requestCloseMediaPeer(peerId);
    }
  });
  
  _events["default"].on('changeVolumeConsumer', function (roomId, peerId, volume, balance) {
    var currentRoom = rooms[roomId];
  
    if (currentRoom && currentRoom._stateConnection !== 'closed') {
      currentRoom.changeConsumerVolume(peerId, volume, balance);
    }
  });
  
  _events["default"].on('changeVolumeConsumers', function (roomId, peers) {
    var currentRoom = rooms[roomId];
  
    if (currentRoom && currentRoom._stateConnection !== 'closed') {
      currentRoom.changeConsumersVolume(peers);
    }
  });
  
  _events["default"].on('setConsumerAudioEffects', function (roomId, peerId, effects) {
    var currentRoom = rooms[roomId];
  
    if (currentRoom && currentRoom._stateConnection !== 'closed') {
      currentRoom.setConsumerAudioEffects(peerId, effects);
    }
  }); // Events.on('changeProducerVolume', (volume) => {
  // 	if (roomClient && roomClient._stateConnection !== 'closed') {
  // 		roomClient.changeProducerVolume(volume);
  // 	}
  // });
  
  
  _events["default"].on('changeMainVolume', function (roomId, volume) {
    var currentRoom = rooms[roomId];
  
    if (currentRoom && currentRoom._stateConnection !== 'closed') {
      currentRoom.changeMainVolume(volume);
    }
  }); // Events.on('changeProducer', (deviceId, producerVolume = 1) => {
  // 	if (roomClient && roomClient._stateConnection !== 'closed') {
  // 		roomClient.changeProducer(deviceId, producerVolume);
  // 	}
  // });
  // Events.on('changeProducerIsUsb', (isUsb) => {
  // 	if (roomClient && roomClient._stateConnection !== 'closed') {
  // 		roomClient.changeProducerIsUsb(isUsb);
  // 	}
  // });
  // Events.on('changePositioning', (isPositioning) => {
  // 	if (roomClient && roomClient._stateConnection !== 'closed') {
  // 		roomClient.changePositioning(isPositioning);
  // 	}
  // });
  
  
  _events["default"].on('muteMic', function (roomId, ids) {
    var currentRoom = rooms[roomId];
  
    if (currentRoom && currentRoom._stateConnection !== 'closed') {
      currentRoom.muteMic(ids);
    }
  });
  
  _events["default"].on('unmuteMic', function (roomId, ids) {
    var currentRoom = rooms[roomId];
  
    if (currentRoom && currentRoom._stateConnection !== 'closed') {
      currentRoom.unmuteMic(ids);
    }
  }); // Events.on('updateRooms', (rooms) => {
  // 	if (roomClient && roomClient._stateConnection !== 'closed') {
  // 		roomClient.updateRooms(rooms);
  // 	}
  // });
  
  
  _events["default"].on('restartIceAllRooms', function () {
    for (var _i = 0, _Object$values = Object.values(rooms); _i < _Object$values.length; _i++) {
      var room = _Object$values[_i];
  
      if (room._stateConnection !== 'closed') {
        room.restartIce();
      }
    }
  });
  
  _events["default"].on('restartIce', function (roomId) {
    var currentRoom = rooms[roomId];
  
    if (currentRoom && currentRoom._stateConnection !== 'closed') {
      currentRoom.restartIce();
    }
  });
  
  _events["default"].on('quit', function (roomId) {
    var currentRoom = rooms[roomId];
  
    if (currentRoom && currentRoom._stateConnection !== 'closed') {
      currentRoom.close();
  
      if (currentRoom._closed) {
        delete rooms[roomId];
      }
    }
  });
  
  _events["default"].on('setServerUrl', function (serverUrl, serverPort) {
    (0, _urlFactory.setProotooUrl)(serverUrl);
    (0, _urlFactory.setProotooPort)(serverPort);
  });
  
  },{"./Logger":"/home/ubuntu/umbrella-voice2/app/lib/Logger.js","./RoomClient":"/home/ubuntu/umbrella-voice2/app/lib/RoomClient.js","./deviceInfo":"/home/ubuntu/umbrella-voice2/app/lib/deviceInfo.js","./events":"/home/ubuntu/umbrella-voice2/app/lib/events.js","./urlFactory":"/home/ubuntu/umbrella-voice2/app/lib/urlFactory.js","./utils":"/home/ubuntu/umbrella-voice2/app/lib/utils.js","@babel/runtime/helpers/asyncToGenerator":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/asyncToGenerator.js","@babel/runtime/helpers/interopRequireDefault":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js","@babel/runtime/helpers/interopRequireWildcard":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/interopRequireWildcard.js","@babel/runtime/regenerator":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/regenerator/index.js","domready":"/home/ubuntu/umbrella-voice2/app/node_modules/domready/ready.js","url-parse":"/home/ubuntu/umbrella-voice2/app/node_modules/url-parse/index.js"}],"/home/ubuntu/umbrella-voice2/app/lib/urlFactory.js":[function(require,module,exports){
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setProotooUrl = setProotooUrl;
  exports.setProotooPort = setProotooPort;
  exports.getProtooUrl = getProtooUrl;
  var protooPort = 4443;
  var protooUrl = 'mediasoup.umbrellarp.ru';
  
  function setProotooUrl(url) {
    protooUrl = url;
  }
  
  function setProotooPort(port) {
    protooPort = Number(port);
  }
  
  function getProtooUrl(_ref) {
    var roomId = _ref.roomId,
        peerId = _ref.peerId;
    return "wss://".concat(protooUrl, ":").concat(protooPort, "/?roomId=").concat(roomId, "&peerId=").concat(peerId);
  }
  
  },{}],"/home/ubuntu/umbrella-voice2/app/lib/utils.js":[function(require,module,exports){
  "use strict";
  
  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getUserMedia = getUserMedia;
  exports.initialize = initialize;
  exports.isDesktop = isDesktop;
  exports.isMobile = isMobile;
  
  var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
  
  var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
  
  /* eslint-disable no-console */
  var mediaQueryDetectorElem;
  var userMedia;
  
  function getUserMedia(_x) {
    return _getUserMedia.apply(this, arguments);
  }
  
  function _getUserMedia() {
    _getUserMedia = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(constraints) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("fuck - ".concat(userMedia));
  
              if (userMedia) {
                _context.next = 5;
                break;
              }
  
              _context.next = 4;
              return navigator.mediaDevices.getUserMedia(constraints);
  
            case 4:
              userMedia = _context.sent;
  
            case 5:
              return _context.abrupt("return", userMedia);
  
            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _getUserMedia.apply(this, arguments);
  }
  
  function initialize() {
    // Media query detector stuff.
    mediaQueryDetectorElem = document.getElementById('mediasoup-demo-app-media-query-detector');
    return Promise.resolve();
  }
  
  function isDesktop() {
    return Boolean(mediaQueryDetectorElem.offsetParent);
  }
  
  function isMobile() {
    return !mediaQueryDetectorElem.offsetParent;
  }
  
  },{"@babel/runtime/helpers/asyncToGenerator":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/asyncToGenerator.js","@babel/runtime/helpers/interopRequireDefault":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js","@babel/runtime/regenerator":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/regenerator/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/arrayLikeToArray.js":[function(require,module,exports){
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
  
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
  
    return arr2;
  }
  
  module.exports = _arrayLikeToArray;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":[function(require,module,exports){
  var arrayLikeToArray = require("./arrayLikeToArray.js");
  
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }
  
  module.exports = _arrayWithoutHoles;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  },{"./arrayLikeToArray.js":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/arrayLikeToArray.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/asyncToGenerator.js":[function(require,module,exports){
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
  
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
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
  
  module.exports = _asyncToGenerator;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/classCallCheck.js":[function(require,module,exports){
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  
  module.exports = _classCallCheck;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/createClass.js":[function(require,module,exports){
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  
  module.exports = _createClass;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/defineProperty.js":[function(require,module,exports){
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
  
    return obj;
  }
  
  module.exports = _defineProperty;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js":[function(require,module,exports){
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  
  module.exports = _interopRequireDefault;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/interopRequireWildcard.js":[function(require,module,exports){
  var _typeof = require("@babel/runtime/helpers/typeof")["default"];
  
  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
  
    _getRequireWildcardCache = function _getRequireWildcardCache() {
      return cache;
    };
  
    return cache;
  }
  
  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }
  
    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return {
        "default": obj
      };
    }
  
    var cache = _getRequireWildcardCache();
  
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
  
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
  
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  
    newObj["default"] = obj;
  
    if (cache) {
      cache.set(obj, newObj);
    }
  
    return newObj;
  }
  
  module.exports = _interopRequireWildcard;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  },{"@babel/runtime/helpers/typeof":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/typeof.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/iterableToArray.js":[function(require,module,exports){
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  
  module.exports = _iterableToArray;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/nonIterableSpread.js":[function(require,module,exports){
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  
  module.exports = _nonIterableSpread;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/toConsumableArray.js":[function(require,module,exports){
  var arrayWithoutHoles = require("./arrayWithoutHoles.js");
  
  var iterableToArray = require("./iterableToArray.js");
  
  var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");
  
  var nonIterableSpread = require("./nonIterableSpread.js");
  
  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
  }
  
  module.exports = _toConsumableArray;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  },{"./arrayWithoutHoles.js":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js","./iterableToArray.js":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/iterableToArray.js","./nonIterableSpread.js":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/nonIterableSpread.js","./unsupportedIterableToArray.js":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/typeof.js":[function(require,module,exports){
  function _typeof(obj) {
    "@babel/helpers - typeof";
  
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
  
      module.exports["default"] = module.exports, module.exports.__esModule = true;
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
  
      module.exports["default"] = module.exports, module.exports.__esModule = true;
    }
  
    return _typeof(obj);
  }
  
  module.exports = _typeof;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":[function(require,module,exports){
  var arrayLikeToArray = require("./arrayLikeToArray.js");
  
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }
  
  module.exports = _unsupportedIterableToArray;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  },{"./arrayLikeToArray.js":"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/helpers/arrayLikeToArray.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/@babel/runtime/regenerator/index.js":[function(require,module,exports){
  module.exports = require("regenerator-runtime");
  
  },{"regenerator-runtime":"/home/ubuntu/umbrella-voice2/app/node_modules/regenerator-runtime/runtime.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/awaitqueue/lib/index.js":[function(require,module,exports){
  "use strict";
  var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  class AwaitQueue {
      constructor({ ClosedErrorClass = Error, StoppedErrorClass = Error } = {
          ClosedErrorClass: Error,
          StoppedErrorClass: Error
      }) {
          // Closed flag.
          this.closed = false;
          // Queue of pending tasks.
          this.pendingTasks = [];
          // Error class used when rejecting a task due to AwaitQueue being closed.
          this.ClosedErrorClass = Error;
          // Error class used when rejecting a task due to AwaitQueue being stopped.
          this.StoppedErrorClass = Error;
          this.ClosedErrorClass = ClosedErrorClass;
          this.StoppedErrorClass = StoppedErrorClass;
      }
      /**
       * The number of ongoing enqueued tasks.
       */
      get size() {
          return this.pendingTasks.length;
      }
      /**
       * Closes the AwaitQueue. Pending tasks will be rejected with ClosedErrorClass
       * error.
       */
      close() {
          if (this.closed)
              return;
          this.closed = true;
          for (const pendingTask of this.pendingTasks) {
              pendingTask.stopped = true;
              pendingTask.reject(new this.ClosedErrorClass('AwaitQueue closed'));
          }
          // Enpty the pending tasks array.
          this.pendingTasks.length = 0;
      }
      /**
       * Accepts a task as argument (and an optional task name) and enqueues it after
       * pending tasks. Once processed, the push() method resolves (or rejects) with
       * the result returned by the given task.
       *
       * The given task must return a Promise or directly a value.
       */
      push(task, name) {
          return __awaiter(this, void 0, void 0, function* () {
              if (this.closed)
                  throw new this.ClosedErrorClass('AwaitQueue closed');
              if (typeof task !== 'function')
                  throw new TypeError('given task is not a function');
              if (!task.name && name) {
                  try {
                      Object.defineProperty(task, 'name', { value: name });
                  }
                  catch (error) { }
              }
              return new Promise((resolve, reject) => {
                  const pendingTask = {
                      task,
                      name,
                      resolve,
                      reject,
                      stopped: false,
                      enqueuedAt: new Date(),
                      executedAt: undefined
                  };
                  // Append task to the queue.
                  this.pendingTasks.push(pendingTask);
                  // And run it if this is the only task in the queue.
                  if (this.pendingTasks.length === 1)
                      this.next();
              });
          });
      }
      /**
       * Make ongoing pending tasks reject with the given StoppedErrorClass error.
       * The AwaitQueue instance is still usable for future tasks added via push()
       * method.
       */
      stop() {
          if (this.closed)
              return;
          for (const pendingTask of this.pendingTasks) {
              pendingTask.stopped = true;
              pendingTask.reject(new this.StoppedErrorClass('AwaitQueue stopped'));
          }
          // Enpty the pending tasks array.
          this.pendingTasks.length = 0;
      }
      dump() {
          const now = new Date();
          return this.pendingTasks.map((pendingTask) => {
              return {
                  task: pendingTask.task,
                  name: pendingTask.name,
                  enqueuedTime: pendingTask.executedAt
                      ? pendingTask.executedAt.getTime() - pendingTask.enqueuedAt.getTime()
                      : now.getTime() - pendingTask.enqueuedAt.getTime(),
                  executingTime: pendingTask.executedAt
                      ? now.getTime() - pendingTask.executedAt.getTime()
                      : 0
              };
          });
      }
      next() {
          return __awaiter(this, void 0, void 0, function* () {
              // Take the first pending task.
              const pendingTask = this.pendingTasks[0];
              if (!pendingTask)
                  return;
              // Execute it.
              yield this.executeTask(pendingTask);
              // Remove the first pending task (the completed one) from the queue.
              this.pendingTasks.shift();
              // And continue.
              this.next();
          });
      }
      executeTask(pendingTask) {
          return __awaiter(this, void 0, void 0, function* () {
              // If the task is stopped, ignore it.
              if (pendingTask.stopped)
                  return;
              pendingTask.executedAt = new Date();
              try {
                  const result = yield pendingTask.task();
                  // If the task is stopped, ignore it.
                  if (pendingTask.stopped)
                      return;
                  // Resolve the task with the returned result (if any).
                  pendingTask.resolve(result);
              }
              catch (error) {
                  // If the task is stopped, ignore it.
                  if (pendingTask.stopped)
                      return;
                  // Reject the task with its own error.
                  pendingTask.reject(error);
              }
          });
      }
  }
  exports.AwaitQueue = AwaitQueue;
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/bowser/es5.js":[function(require,module,exports){
  !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.bowser=t():e.bowser=t()}(this,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=90)}({17:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n=r(18),i=function(){function e(){}return e.getFirstMatch=function(e,t){var r=t.match(e);return r&&r.length>0&&r[1]||""},e.getSecondMatch=function(e,t){var r=t.match(e);return r&&r.length>1&&r[2]||""},e.matchAndReturnConst=function(e,t,r){if(e.test(t))return r},e.getWindowsVersionName=function(e){switch(e){case"NT":return"NT";case"XP":return"XP";case"NT 5.0":return"2000";case"NT 5.1":return"XP";case"NT 5.2":return"2003";case"NT 6.0":return"Vista";case"NT 6.1":return"7";case"NT 6.2":return"8";case"NT 6.3":return"8.1";case"NT 10.0":return"10";default:return}},e.getMacOSVersionName=function(e){var t=e.split(".").splice(0,2).map((function(e){return parseInt(e,10)||0}));if(t.push(0),10===t[0])switch(t[1]){case 5:return"Leopard";case 6:return"Snow Leopard";case 7:return"Lion";case 8:return"Mountain Lion";case 9:return"Mavericks";case 10:return"Yosemite";case 11:return"El Capitan";case 12:return"Sierra";case 13:return"High Sierra";case 14:return"Mojave";case 15:return"Catalina";default:return}},e.getAndroidVersionName=function(e){var t=e.split(".").splice(0,2).map((function(e){return parseInt(e,10)||0}));if(t.push(0),!(1===t[0]&&t[1]<5))return 1===t[0]&&t[1]<6?"Cupcake":1===t[0]&&t[1]>=6?"Donut":2===t[0]&&t[1]<2?"Eclair":2===t[0]&&2===t[1]?"Froyo":2===t[0]&&t[1]>2?"Gingerbread":3===t[0]?"Honeycomb":4===t[0]&&t[1]<1?"Ice Cream Sandwich":4===t[0]&&t[1]<4?"Jelly Bean":4===t[0]&&t[1]>=4?"KitKat":5===t[0]?"Lollipop":6===t[0]?"Marshmallow":7===t[0]?"Nougat":8===t[0]?"Oreo":9===t[0]?"Pie":void 0},e.getVersionPrecision=function(e){return e.split(".").length},e.compareVersions=function(t,r,n){void 0===n&&(n=!1);var i=e.getVersionPrecision(t),s=e.getVersionPrecision(r),a=Math.max(i,s),o=0,u=e.map([t,r],(function(t){var r=a-e.getVersionPrecision(t),n=t+new Array(r+1).join(".0");return e.map(n.split("."),(function(e){return new Array(20-e.length).join("0")+e})).reverse()}));for(n&&(o=a-Math.min(i,s)),a-=1;a>=o;){if(u[0][a]>u[1][a])return 1;if(u[0][a]===u[1][a]){if(a===o)return 0;a-=1}else if(u[0][a]<u[1][a])return-1}},e.map=function(e,t){var r,n=[];if(Array.prototype.map)return Array.prototype.map.call(e,t);for(r=0;r<e.length;r+=1)n.push(t(e[r]));return n},e.find=function(e,t){var r,n;if(Array.prototype.find)return Array.prototype.find.call(e,t);for(r=0,n=e.length;r<n;r+=1){var i=e[r];if(t(i,r))return i}},e.assign=function(e){for(var t,r,n=e,i=arguments.length,s=new Array(i>1?i-1:0),a=1;a<i;a++)s[a-1]=arguments[a];if(Object.assign)return Object.assign.apply(Object,[e].concat(s));var o=function(){var e=s[t];"object"==typeof e&&null!==e&&Object.keys(e).forEach((function(t){n[t]=e[t]}))};for(t=0,r=s.length;t<r;t+=1)o();return e},e.getBrowserAlias=function(e){return n.BROWSER_ALIASES_MAP[e]},e.getBrowserTypeByAlias=function(e){return n.BROWSER_MAP[e]||""},e}();t.default=i,e.exports=t.default},18:function(e,t,r){"use strict";t.__esModule=!0,t.ENGINE_MAP=t.OS_MAP=t.PLATFORMS_MAP=t.BROWSER_MAP=t.BROWSER_ALIASES_MAP=void 0;t.BROWSER_ALIASES_MAP={"Amazon Silk":"amazon_silk","Android Browser":"android",Bada:"bada",BlackBerry:"blackberry",Chrome:"chrome",Chromium:"chromium",Electron:"electron",Epiphany:"epiphany",Firefox:"firefox",Focus:"focus",Generic:"generic","Google Search":"google_search",Googlebot:"googlebot","Internet Explorer":"ie","K-Meleon":"k_meleon",Maxthon:"maxthon","Microsoft Edge":"edge","MZ Browser":"mz","NAVER Whale Browser":"naver",Opera:"opera","Opera Coast":"opera_coast",PhantomJS:"phantomjs",Puffin:"puffin",QupZilla:"qupzilla",QQ:"qq",QQLite:"qqlite",Safari:"safari",Sailfish:"sailfish","Samsung Internet for Android":"samsung_internet",SeaMonkey:"seamonkey",Sleipnir:"sleipnir",Swing:"swing",Tizen:"tizen","UC Browser":"uc",Vivaldi:"vivaldi","WebOS Browser":"webos",WeChat:"wechat","Yandex Browser":"yandex",Roku:"roku"};t.BROWSER_MAP={amazon_silk:"Amazon Silk",android:"Android Browser",bada:"Bada",blackberry:"BlackBerry",chrome:"Chrome",chromium:"Chromium",electron:"Electron",epiphany:"Epiphany",firefox:"Firefox",focus:"Focus",generic:"Generic",googlebot:"Googlebot",google_search:"Google Search",ie:"Internet Explorer",k_meleon:"K-Meleon",maxthon:"Maxthon",edge:"Microsoft Edge",mz:"MZ Browser",naver:"NAVER Whale Browser",opera:"Opera",opera_coast:"Opera Coast",phantomjs:"PhantomJS",puffin:"Puffin",qupzilla:"QupZilla",qq:"QQ Browser",qqlite:"QQ Browser Lite",safari:"Safari",sailfish:"Sailfish",samsung_internet:"Samsung Internet for Android",seamonkey:"SeaMonkey",sleipnir:"Sleipnir",swing:"Swing",tizen:"Tizen",uc:"UC Browser",vivaldi:"Vivaldi",webos:"WebOS Browser",wechat:"WeChat",yandex:"Yandex Browser"};t.PLATFORMS_MAP={tablet:"tablet",mobile:"mobile",desktop:"desktop",tv:"tv"};t.OS_MAP={WindowsPhone:"Windows Phone",Windows:"Windows",MacOS:"macOS",iOS:"iOS",Android:"Android",WebOS:"WebOS",BlackBerry:"BlackBerry",Bada:"Bada",Tizen:"Tizen",Linux:"Linux",ChromeOS:"Chrome OS",PlayStation4:"PlayStation 4",Roku:"Roku"};t.ENGINE_MAP={EdgeHTML:"EdgeHTML",Blink:"Blink",Trident:"Trident",Presto:"Presto",Gecko:"Gecko",WebKit:"WebKit"}},90:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(91))&&n.__esModule?n:{default:n},s=r(18);function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var o=function(){function e(){}var t,r,n;return e.getParser=function(e,t){if(void 0===t&&(t=!1),"string"!=typeof e)throw new Error("UserAgent should be a string");return new i.default(e,t)},e.parse=function(e){return new i.default(e).getResult()},t=e,n=[{key:"BROWSER_MAP",get:function(){return s.BROWSER_MAP}},{key:"ENGINE_MAP",get:function(){return s.ENGINE_MAP}},{key:"OS_MAP",get:function(){return s.OS_MAP}},{key:"PLATFORMS_MAP",get:function(){return s.PLATFORMS_MAP}}],(r=null)&&a(t.prototype,r),n&&a(t,n),e}();t.default=o,e.exports=t.default},91:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n=u(r(92)),i=u(r(93)),s=u(r(94)),a=u(r(95)),o=u(r(17));function u(e){return e&&e.__esModule?e:{default:e}}var d=function(){function e(e,t){if(void 0===t&&(t=!1),null==e||""===e)throw new Error("UserAgent parameter can't be empty");this._ua=e,this.parsedResult={},!0!==t&&this.parse()}var t=e.prototype;return t.getUA=function(){return this._ua},t.test=function(e){return e.test(this._ua)},t.parseBrowser=function(){var e=this;this.parsedResult.browser={};var t=o.default.find(n.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.browser=t.describe(this.getUA())),this.parsedResult.browser},t.getBrowser=function(){return this.parsedResult.browser?this.parsedResult.browser:this.parseBrowser()},t.getBrowserName=function(e){return e?String(this.getBrowser().name).toLowerCase()||"":this.getBrowser().name||""},t.getBrowserVersion=function(){return this.getBrowser().version},t.getOS=function(){return this.parsedResult.os?this.parsedResult.os:this.parseOS()},t.parseOS=function(){var e=this;this.parsedResult.os={};var t=o.default.find(i.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.os=t.describe(this.getUA())),this.parsedResult.os},t.getOSName=function(e){var t=this.getOS().name;return e?String(t).toLowerCase()||"":t||""},t.getOSVersion=function(){return this.getOS().version},t.getPlatform=function(){return this.parsedResult.platform?this.parsedResult.platform:this.parsePlatform()},t.getPlatformType=function(e){void 0===e&&(e=!1);var t=this.getPlatform().type;return e?String(t).toLowerCase()||"":t||""},t.parsePlatform=function(){var e=this;this.parsedResult.platform={};var t=o.default.find(s.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.platform=t.describe(this.getUA())),this.parsedResult.platform},t.getEngine=function(){return this.parsedResult.engine?this.parsedResult.engine:this.parseEngine()},t.getEngineName=function(e){return e?String(this.getEngine().name).toLowerCase()||"":this.getEngine().name||""},t.parseEngine=function(){var e=this;this.parsedResult.engine={};var t=o.default.find(a.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.engine=t.describe(this.getUA())),this.parsedResult.engine},t.parse=function(){return this.parseBrowser(),this.parseOS(),this.parsePlatform(),this.parseEngine(),this},t.getResult=function(){return o.default.assign({},this.parsedResult)},t.satisfies=function(e){var t=this,r={},n=0,i={},s=0;if(Object.keys(e).forEach((function(t){var a=e[t];"string"==typeof a?(i[t]=a,s+=1):"object"==typeof a&&(r[t]=a,n+=1)})),n>0){var a=Object.keys(r),u=o.default.find(a,(function(e){return t.isOS(e)}));if(u){var d=this.satisfies(r[u]);if(void 0!==d)return d}var c=o.default.find(a,(function(e){return t.isPlatform(e)}));if(c){var f=this.satisfies(r[c]);if(void 0!==f)return f}}if(s>0){var l=Object.keys(i),h=o.default.find(l,(function(e){return t.isBrowser(e,!0)}));if(void 0!==h)return this.compareVersion(i[h])}},t.isBrowser=function(e,t){void 0===t&&(t=!1);var r=this.getBrowserName().toLowerCase(),n=e.toLowerCase(),i=o.default.getBrowserTypeByAlias(n);return t&&i&&(n=i.toLowerCase()),n===r},t.compareVersion=function(e){var t=[0],r=e,n=!1,i=this.getBrowserVersion();if("string"==typeof i)return">"===e[0]||"<"===e[0]?(r=e.substr(1),"="===e[1]?(n=!0,r=e.substr(2)):t=[],">"===e[0]?t.push(1):t.push(-1)):"="===e[0]?r=e.substr(1):"~"===e[0]&&(n=!0,r=e.substr(1)),t.indexOf(o.default.compareVersions(i,r,n))>-1},t.isOS=function(e){return this.getOSName(!0)===String(e).toLowerCase()},t.isPlatform=function(e){return this.getPlatformType(!0)===String(e).toLowerCase()},t.isEngine=function(e){return this.getEngineName(!0)===String(e).toLowerCase()},t.is=function(e,t){return void 0===t&&(t=!1),this.isBrowser(e,t)||this.isOS(e)||this.isPlatform(e)},t.some=function(e){var t=this;return void 0===e&&(e=[]),e.some((function(e){return t.is(e)}))},e}();t.default=d,e.exports=t.default},92:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n};var s=/version\/(\d+(\.?_?\d+)+)/i,a=[{test:[/googlebot/i],describe:function(e){var t={name:"Googlebot"},r=i.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/opera/i],describe:function(e){var t={name:"Opera"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/opr\/|opios/i],describe:function(e){var t={name:"Opera"},r=i.default.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/SamsungBrowser/i],describe:function(e){var t={name:"Samsung Internet for Android"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Whale/i],describe:function(e){var t={name:"NAVER Whale Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/MZBrowser/i],describe:function(e){var t={name:"MZ Browser"},r=i.default.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/focus/i],describe:function(e){var t={name:"Focus"},r=i.default.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/swing/i],describe:function(e){var t={name:"Swing"},r=i.default.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/coast/i],describe:function(e){var t={name:"Opera Coast"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/opt\/\d+(?:.?_?\d+)+/i],describe:function(e){var t={name:"Opera Touch"},r=i.default.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/yabrowser/i],describe:function(e){var t={name:"Yandex Browser"},r=i.default.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/ucbrowser/i],describe:function(e){var t={name:"UC Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Maxthon|mxios/i],describe:function(e){var t={name:"Maxthon"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/epiphany/i],describe:function(e){var t={name:"Epiphany"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/puffin/i],describe:function(e){var t={name:"Puffin"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sleipnir/i],describe:function(e){var t={name:"Sleipnir"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/k-meleon/i],describe:function(e){var t={name:"K-Meleon"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/micromessenger/i],describe:function(e){var t={name:"WeChat"},r=i.default.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/qqbrowser/i],describe:function(e){var t={name:/qqbrowserlite/i.test(e)?"QQ Browser Lite":"QQ Browser"},r=i.default.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/msie|trident/i],describe:function(e){var t={name:"Internet Explorer"},r=i.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/\sedg\//i],describe:function(e){var t={name:"Microsoft Edge"},r=i.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/edg([ea]|ios)/i],describe:function(e){var t={name:"Microsoft Edge"},r=i.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/vivaldi/i],describe:function(e){var t={name:"Vivaldi"},r=i.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/seamonkey/i],describe:function(e){var t={name:"SeaMonkey"},r=i.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sailfish/i],describe:function(e){var t={name:"Sailfish"},r=i.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i,e);return r&&(t.version=r),t}},{test:[/silk/i],describe:function(e){var t={name:"Amazon Silk"},r=i.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/phantom/i],describe:function(e){var t={name:"PhantomJS"},r=i.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/slimerjs/i],describe:function(e){var t={name:"SlimerJS"},r=i.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t={name:"BlackBerry"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t={name:"WebOS Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/bada/i],describe:function(e){var t={name:"Bada"},r=i.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/tizen/i],describe:function(e){var t={name:"Tizen"},r=i.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/qupzilla/i],describe:function(e){var t={name:"QupZilla"},r=i.default.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/firefox|iceweasel|fxios/i],describe:function(e){var t={name:"Firefox"},r=i.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/electron/i],describe:function(e){var t={name:"Electron"},r=i.default.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/MiuiBrowser/i],describe:function(e){var t={name:"Miui"},r=i.default.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/chromium/i],describe:function(e){var t={name:"Chromium"},r=i.default.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/chrome|crios|crmo/i],describe:function(e){var t={name:"Chrome"},r=i.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/GSA/i],describe:function(e){var t={name:"Google Search"},r=i.default.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t={name:"Android Browser"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/playstation 4/i],describe:function(e){var t={name:"PlayStation 4"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/safari|applewebkit/i],describe:function(e){var t={name:"Safari"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/.*/i],describe:function(e){var t=-1!==e.search("\\(")?/^(.*)\/(.*)[ \t]\((.*)/:/^(.*)\/(.*) /;return{name:i.default.getFirstMatch(t,e),version:i.default.getSecondMatch(t,e)}}}];t.default=a,e.exports=t.default},93:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var a=[{test:[/Roku\/DVP/],describe:function(e){var t=i.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i,e);return{name:s.OS_MAP.Roku,version:t}}},{test:[/windows phone/i],describe:function(e){var t=i.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.WindowsPhone,version:t}}},{test:[/windows /i],describe:function(e){var t=i.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i,e),r=i.default.getWindowsVersionName(t);return{name:s.OS_MAP.Windows,version:t,versionName:r}}},{test:[/Macintosh(.*?) FxiOS(.*?)\//],describe:function(e){var t={name:s.OS_MAP.iOS},r=i.default.getSecondMatch(/(Version\/)(\d[\d.]+)/,e);return r&&(t.version=r),t}},{test:[/macintosh/i],describe:function(e){var t=i.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i,e).replace(/[_\s]/g,"."),r=i.default.getMacOSVersionName(t),n={name:s.OS_MAP.MacOS,version:t};return r&&(n.versionName=r),n}},{test:[/(ipod|iphone|ipad)/i],describe:function(e){var t=i.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i,e).replace(/[_\s]/g,".");return{name:s.OS_MAP.iOS,version:t}}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t=i.default.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i,e),r=i.default.getAndroidVersionName(t),n={name:s.OS_MAP.Android,version:t};return r&&(n.versionName=r),n}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t=i.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,e),r={name:s.OS_MAP.WebOS};return t&&t.length&&(r.version=t),r}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t=i.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i,e)||i.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i,e)||i.default.getFirstMatch(/\bbb(\d+)/i,e);return{name:s.OS_MAP.BlackBerry,version:t}}},{test:[/bada/i],describe:function(e){var t=i.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.Bada,version:t}}},{test:[/tizen/i],describe:function(e){var t=i.default.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.Tizen,version:t}}},{test:[/linux/i],describe:function(){return{name:s.OS_MAP.Linux}}},{test:[/CrOS/],describe:function(){return{name:s.OS_MAP.ChromeOS}}},{test:[/PlayStation 4/],describe:function(e){var t=i.default.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.PlayStation4,version:t}}}];t.default=a,e.exports=t.default},94:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var a=[{test:[/googlebot/i],describe:function(){return{type:"bot",vendor:"Google"}}},{test:[/huawei/i],describe:function(e){var t=i.default.getFirstMatch(/(can-l01)/i,e)&&"Nova",r={type:s.PLATFORMS_MAP.mobile,vendor:"Huawei"};return t&&(r.model=t),r}},{test:[/nexus\s*(?:7|8|9|10).*/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Nexus"}}},{test:[/ipad/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Apple",model:"iPad"}}},{test:[/Macintosh(.*?) FxiOS(.*?)\//],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Apple",model:"iPad"}}},{test:[/kftt build/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Amazon",model:"Kindle Fire HD 7"}}},{test:[/silk/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Amazon"}}},{test:[/tablet(?! pc)/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet}}},{test:function(e){var t=e.test(/ipod|iphone/i),r=e.test(/like (ipod|iphone)/i);return t&&!r},describe:function(e){var t=i.default.getFirstMatch(/(ipod|iphone)/i,e);return{type:s.PLATFORMS_MAP.mobile,vendor:"Apple",model:t}}},{test:[/nexus\s*[0-6].*/i,/galaxy nexus/i],describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"Nexus"}}},{test:[/[^-]mobi/i],describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"blackberry"===e.getBrowserName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"BlackBerry"}}},{test:function(e){return"bada"===e.getBrowserName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"windows phone"===e.getBrowserName()},describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"Microsoft"}}},{test:function(e){var t=Number(String(e.getOSVersion()).split(".")[0]);return"android"===e.getOSName(!0)&&t>=3},describe:function(){return{type:s.PLATFORMS_MAP.tablet}}},{test:function(e){return"android"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"macos"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop,vendor:"Apple"}}},{test:function(e){return"windows"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop}}},{test:function(e){return"linux"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop}}},{test:function(e){return"playstation 4"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.tv}}},{test:function(e){return"roku"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.tv}}}];t.default=a,e.exports=t.default},95:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var a=[{test:function(e){return"microsoft edge"===e.getBrowserName(!0)},describe:function(e){if(/\sedg\//i.test(e))return{name:s.ENGINE_MAP.Blink};var t=i.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i,e);return{name:s.ENGINE_MAP.EdgeHTML,version:t}}},{test:[/trident/i],describe:function(e){var t={name:s.ENGINE_MAP.Trident},r=i.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){return e.test(/presto/i)},describe:function(e){var t={name:s.ENGINE_MAP.Presto},r=i.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=e.test(/gecko/i),r=e.test(/like gecko/i);return t&&!r},describe:function(e){var t={name:s.ENGINE_MAP.Gecko},r=i.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(apple)?webkit\/537\.36/i],describe:function(){return{name:s.ENGINE_MAP.Blink}}},{test:[/(apple)?webkit/i],describe:function(e){var t={name:s.ENGINE_MAP.WebKit},r=i.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}}];t.default=a,e.exports=t.default}})}));
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/browserify/node_modules/events/events.js":[function(require,module,exports){
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  
  var objectCreate = Object.create || objectCreatePolyfill
  var objectKeys = Object.keys || objectKeysPolyfill
  var bind = Function.prototype.bind || functionBindPolyfill
  
  function EventEmitter() {
    if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
      this._events = objectCreate(null);
      this._eventsCount = 0;
    }
  
    this._maxListeners = this._maxListeners || undefined;
  }
  module.exports = EventEmitter;
  
  // Backwards-compat with node 0.10.x
  EventEmitter.EventEmitter = EventEmitter;
  
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;
  
  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  var defaultMaxListeners = 10;
  
  var hasDefineProperty;
  try {
    var o = {};
    if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
    hasDefineProperty = o.x === 0;
  } catch (err) { hasDefineProperty = false }
  if (hasDefineProperty) {
    Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        // check whether the input is a positive number (whose value is zero or
        // greater and not a NaN).
        if (typeof arg !== 'number' || arg < 0 || arg !== arg)
          throw new TypeError('"defaultMaxListeners" must be a positive number');
        defaultMaxListeners = arg;
      }
    });
  } else {
    EventEmitter.defaultMaxListeners = defaultMaxListeners;
  }
  
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || isNaN(n))
      throw new TypeError('"n" argument must be a positive number');
    this._maxListeners = n;
    return this;
  };
  
  function $getMaxListeners(that) {
    if (that._maxListeners === undefined)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }
  
  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
  };
  
  // These standalone emit* functions are used to optimize calling of event
  // handlers for fast cases because emit() itself often has a variable number of
  // arguments and can be deoptimized because of that. These functions always have
  // the same number of arguments and thus do not get deoptimized, so the code
  // inside them can execute faster.
  function emitNone(handler, isFn, self) {
    if (isFn)
      handler.call(self);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self);
    }
  }
  function emitOne(handler, isFn, self, arg1) {
    if (isFn)
      handler.call(self, arg1);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1);
    }
  }
  function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn)
      handler.call(self, arg1, arg2);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1, arg2);
    }
  }
  function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn)
      handler.call(self, arg1, arg2, arg3);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1, arg2, arg3);
    }
  }
  
  function emitMany(handler, isFn, self, args) {
    if (isFn)
      handler.apply(self, args);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].apply(self, args);
    }
  }
  
  EventEmitter.prototype.emit = function emit(type) {
    var er, handler, len, args, i, events;
    var doError = (type === 'error');
  
    events = this._events;
    if (events)
      doError = (doError && events.error == null);
    else if (!doError)
      return false;
  
    // If there is no 'error' event listener then throw.
    if (doError) {
      if (arguments.length > 1)
        er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Unhandled "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
      return false;
    }
  
    handler = events[type];
  
    if (!handler)
      return false;
  
    var isFn = typeof handler === 'function';
    len = arguments.length;
    switch (len) {
        // fast cases
      case 1:
        emitNone(handler, isFn, this);
        break;
      case 2:
        emitOne(handler, isFn, this, arguments[1]);
        break;
      case 3:
        emitTwo(handler, isFn, this, arguments[1], arguments[2]);
        break;
      case 4:
        emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
        break;
        // slower
      default:
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        emitMany(handler, isFn, this, args);
    }
  
    return true;
  };
  
  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
  
    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');
  
    events = target._events;
    if (!events) {
      events = target._events = objectCreate(null);
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener) {
        target.emit('newListener', type,
            listener.listener ? listener.listener : listener);
  
        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }
  
    if (!existing) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] =
            prepend ? [listener, existing] : [existing, listener];
      } else {
        // If we've already got an array, just append.
        if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
      }
  
      // Check for listener leak
      if (!existing.warned) {
        m = $getMaxListeners(target);
        if (m && m > 0 && existing.length > m) {
          existing.warned = true;
          var w = new Error('Possible EventEmitter memory leak detected. ' +
              existing.length + ' "' + String(type) + '" listeners ' +
              'added. Use emitter.setMaxListeners() to ' +
              'increase limit.');
          w.name = 'MaxListenersExceededWarning';
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          if (typeof console === 'object' && console.warn) {
            console.warn('%s: %s', w.name, w.message);
          }
        }
      }
    }
  
    return target;
  }
  
  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };
  
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  
  EventEmitter.prototype.prependListener =
      function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
  
  function onceWrapper() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      switch (arguments.length) {
        case 0:
          return this.listener.call(this.target);
        case 1:
          return this.listener.call(this.target, arguments[0]);
        case 2:
          return this.listener.call(this.target, arguments[0], arguments[1]);
        case 3:
          return this.listener.call(this.target, arguments[0], arguments[1],
              arguments[2]);
        default:
          var args = new Array(arguments.length);
          for (var i = 0; i < args.length; ++i)
            args[i] = arguments[i];
          this.listener.apply(this.target, args);
      }
    }
  }
  
  function _onceWrap(target, type, listener) {
    var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
    var wrapped = bind.call(onceWrapper, state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }
  
  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };
  
  EventEmitter.prototype.prependOnceListener =
      function prependOnceListener(type, listener) {
        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
  
  // Emits a 'removeListener' event if and only if the listener was removed.
  EventEmitter.prototype.removeListener =
      function removeListener(type, listener) {
        var list, events, position, i, originalListener;
  
        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');
  
        events = this._events;
        if (!events)
          return this;
  
        list = events[type];
        if (!list)
          return this;
  
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit('removeListener', type, list.listener || listener);
          }
        } else if (typeof list !== 'function') {
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
          else
            spliceOne(list, position);
  
          if (list.length === 1)
            events[type] = list[0];
  
          if (events.removeListener)
            this.emit('removeListener', type, originalListener || listener);
        }
  
        return this;
      };
  
  EventEmitter.prototype.removeAllListeners =
      function removeAllListeners(type) {
        var listeners, events, i;
  
        events = this._events;
        if (!events)
          return this;
  
        // not listening for removeListener, no need to emit
        if (!events.removeListener) {
          if (arguments.length === 0) {
            this._events = objectCreate(null);
            this._eventsCount = 0;
          } else if (events[type]) {
            if (--this._eventsCount === 0)
              this._events = objectCreate(null);
            else
              delete events[type];
          }
          return this;
        }
  
        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
          var keys = objectKeys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = objectCreate(null);
          this._eventsCount = 0;
          return this;
        }
  
        listeners = events[type];
  
        if (typeof listeners === 'function') {
          this.removeListener(type, listeners);
        } else if (listeners) {
          // LIFO order
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
  
        return this;
      };
  
  function _listeners(target, type, unwrap) {
    var events = target._events;
  
    if (!events)
      return [];
  
    var evlistener = events[type];
    if (!evlistener)
      return [];
  
    if (typeof evlistener === 'function')
      return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }
  
  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };
  
  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };
  
  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };
  
  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events = this._events;
  
    if (events) {
      var evlistener = events[type];
  
      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener) {
        return evlistener.length;
      }
    }
  
    return 0;
  }
  
  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  };
  
  // About 1.5x faster than the two-arg version of Array#splice().
  function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
      list[i] = list[k];
    list.pop();
  }
  
  function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
      copy[i] = arr[i];
    return copy;
  }
  
  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }
  
  function objectCreatePolyfill(proto) {
    var F = function() {};
    F.prototype = proto;
    return new F;
  }
  function objectKeysPolyfill(obj) {
    var keys = [];
    for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
      keys.push(k);
    }
    return k;
  }
  function functionBindPolyfill(context) {
    var fn = this;
    return function () {
      return fn.apply(context, arguments);
    };
  }
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/debug/src/browser.js":[function(require,module,exports){
  (function (process){(function (){
  /* eslint-env browser */
  
  /**
   * This is the web browser implementation of `debug()`.
   */
  
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  exports.destroy = (() => {
    let warned = false;
  
    return () => {
      if (!warned) {
        warned = true;
        console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
      }
    };
  })();
  
  /**
   * Colors.
   */
  
  exports.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33'
  ];
  
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
    }
  
    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }
  
    // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
      // Is firebug? http://stackoverflow.com/a/398120/376773
      (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
      // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
      // Double check webkit in userAgent just in case we are in a worker
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  
  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */
  
  function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') +
      this.namespace +
      (this.useColors ? ' %c' : ' ') +
      args[0] +
      (this.useColors ? '%c ' : ' ') +
      '+' + module.exports.humanize(this.diff);
  
    if (!this.useColors) {
      return;
    }
  
    const c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');
  
    // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, match => {
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
  exports.log = console.debug || console.log || (() => {});
  
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
    } catch (error) {
      // Swallow
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
    let r;
    try {
      r = exports.storage.getItem('debug');
    } catch (error) {
      // Swallow
      // XXX (@Qix-) should we be logging these?
    }
  
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
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
    } catch (error) {
      // Swallow
      // XXX (@Qix-) should we be logging these?
    }
  }
  
  module.exports = require('./common')(exports);
  
  const {formatters} = module.exports;
  
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
  
  }).call(this)}).call(this,require('_process'))
  
  },{"./common":"/home/ubuntu/umbrella-voice2/app/node_modules/debug/src/common.js","_process":"/home/ubuntu/umbrella-voice2/app/node_modules/process/browser.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/debug/src/common.js":[function(require,module,exports){
  
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   */
  
  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = require('ms');
    createDebug.destroy = destroy;
  
    Object.keys(env).forEach(key => {
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
      let hash = 0;
  
      for (let i = 0; i < namespace.length; i++) {
        hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
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
      let prevTime;
      let enableOverride = null;
  
      function debug(...args) {
        // Disabled?
        if (!debug.enabled) {
          return;
        }
  
        const self = debug;
  
        // Set `diff` timestamp
        const curr = Number(new Date());
        const ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
  
        args[0] = createDebug.coerce(args[0]);
  
        if (typeof args[0] !== 'string') {
          // Anything else let's inspect with %O
          args.unshift('%O');
        }
  
        // Apply any `formatters` transformations
        let index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
          // If we encounter an escaped % then don't increase the array index
          if (match === '%%') {
            return '%';
          }
          index++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === 'function') {
            const val = args[index];
            match = formatter.call(self, val);
  
            // Now we need to remove `args[index]` since it's inlined in the `format`
            args.splice(index, 1);
            index--;
          }
          return match;
        });
  
        // Apply env-specific formatting (colors, etc.)
        createDebug.formatArgs.call(self, args);
  
        const logFn = self.log || createDebug.log;
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
        get: () => enableOverride === null ? createDebug.enabled(namespace) : enableOverride,
        set: v => {
          enableOverride = v;
        }
      });
  
      // Env-specific initialization logic for debug instances
      if (typeof createDebug.init === 'function') {
        createDebug.init(debug);
      }
  
      return debug;
    }
  
    function extend(namespace, delimiter) {
      const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
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
  
      let i;
      const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
      const len = split.length;
  
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
      const namespaces = [
        ...createDebug.names.map(toNamespace),
        ...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
      ].join(',');
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
  
      let i;
      let len;
  
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
      return regexp.toString()
        .substring(2, regexp.toString().length - 2)
        .replace(/\.\*\?$/, '*');
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
  
  },{"ms":"/home/ubuntu/umbrella-voice2/app/node_modules/ms/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/domready/ready.js":[function(require,module,exports){
  /*!
    * domready (c) Dustin Diaz 2014 - License MIT
    */
  !function (name, definition) {
  
    if (typeof module != 'undefined') module.exports = definition()
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
    else this[name] = definition()
  
  }('domready', function () {
  
    var fns = [], listener
      , doc = document
      , hack = doc.documentElement.doScroll
      , domContentLoaded = 'DOMContentLoaded'
      , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)
  
  
    if (!loaded)
    doc.addEventListener(domContentLoaded, listener = function () {
      doc.removeEventListener(domContentLoaded, listener)
      loaded = 1
      while (listener = fns.shift()) listener()
    })
  
    return function (fn) {
      loaded ? setTimeout(fn, 0) : fns.push(fn)
    }
  
  });
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/es5-ext/global.js":[function(require,module,exports){
  var naiveFallback = function () {
    if (typeof self === "object" && self) return self;
    if (typeof window === "object" && window) return window;
    throw new Error("Unable to resolve global `this`");
  };
  
  module.exports = (function () {
    if (this) return this;
  
    // Unexpected strict mode (may happen if e.g. bundled into ESM module)
  
    // Fallback to standard globalThis if available
    if (typeof globalThis === "object" && globalThis) return globalThis;
  
    // Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
    // In all ES5+ engines global object inherits from Object.prototype
    // (if you approached one that doesn't please report)
    try {
      Object.defineProperty(Object.prototype, "__global__", {
        get: function () { return this; },
        configurable: true
      });
    } catch (error) {
      // Unfortunate case of updates to Object.prototype being restricted
      // via preventExtensions, seal or freeze
      return naiveFallback();
    }
    try {
      // Safari case (window.__global__ works, but __global__ does not)
      if (!__global__) return naiveFallback();
      return __global__;
    } finally {
      delete Object.prototype.__global__;
    }
  })();
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/h264-profile-level-id/index.js":[function(require,module,exports){
  const debug = require('debug')('h264-profile-level-id');
  
  /* eslint-disable no-console */
  debug.log = console.info.bind(console);
  /* eslint-enable no-console */
  
  const ProfileConstrainedBaseline = 1;
  const ProfileBaseline = 2;
  const ProfileMain = 3;
  const ProfileConstrainedHigh = 4;
  const ProfileHigh = 5;
  
  exports.ProfileConstrainedBaseline = ProfileConstrainedBaseline;
  exports.ProfileBaseline = ProfileBaseline;
  exports.ProfileMain = ProfileMain;
  exports.ProfileConstrainedHigh = ProfileConstrainedHigh;
  exports.ProfileHigh = ProfileHigh;
  
  // All values are equal to ten times the level number, except level 1b which is
  // special.
  const Level1_b = 0;
  const Level1 = 10;
  const Level1_1 = 11;
  const Level1_2 = 12;
  const Level1_3 = 13;
  const Level2 = 20;
  const Level2_1 = 21;
  const Level2_2 = 22;
  const Level3 = 30;
  const Level3_1 = 31;
  const Level3_2 = 32;
  const Level4 = 40;
  const Level4_1 = 41;
  const Level4_2 = 42;
  const Level5 = 50;
  const Level5_1 = 51;
  const Level5_2 = 52;
  
  exports.Level1_b = Level1_b;
  exports.Level1 = Level1;
  exports.Level1_1 = Level1_1;
  exports.Level1_2 = Level1_2;
  exports.Level1_3 = Level1_3;
  exports.Level2 = Level2;
  exports.Level2_1 = Level2_1;
  exports.Level2_2 = Level2_2;
  exports.Level3 = Level3;
  exports.Level3_1 = Level3_1;
  exports.Level3_2 = Level3_2;
  exports.Level4 = Level4;
  exports.Level4_1 = Level4_1;
  exports.Level4_2 = Level4_2;
  exports.Level5 = Level5;
  exports.Level5_1 = Level5_1;
  exports.Level5_2 = Level5_2;
  
  class ProfileLevelId
  {
    constructor(profile, level)
    {
      this.profile = profile;
      this.level = level;
    }
  }
  
  exports.ProfileLevelId = ProfileLevelId;
  
  // Default ProfileLevelId.
  //
  // TODO: The default should really be profile Baseline and level 1 according to
  // the spec: https://tools.ietf.org/html/rfc6184#section-8.1. In order to not
  // break backwards compatibility with older versions of WebRTC where external
  // codecs don't have any parameters, use profile ConstrainedBaseline level 3_1
  // instead. This workaround will only be done in an interim period to allow
  // external clients to update their code.
  //
  // http://crbug/webrtc/6337.
  const DefaultProfileLevelId =
    new ProfileLevelId(ProfileConstrainedBaseline, Level3_1);
  
  // For level_idc=11 and profile_idc=0x42, 0x4D, or 0x58, the constraint set3
  // flag specifies if level 1b or level 1.1 is used.
  const ConstraintSet3Flag = 0x10;
  
  // Class for matching bit patterns such as "x1xx0000" where 'x' is allowed to be
  // either 0 or 1.
  class BitPattern
  {
    constructor(str)
    {
      this._mask = ~byteMaskString('x', str);
      this._maskedValue = byteMaskString('1', str);
    }
  
    isMatch(value)
    {
      return this._maskedValue === (value & this._mask);
    }
  }
  
  // Class for converting between profile_idc/profile_iop to Profile.
  class ProfilePattern
  {
    constructor(profile_idc, profile_iop, profile)
    {
      this.profile_idc = profile_idc;
      this.profile_iop = profile_iop;
      this.profile = profile;
    }
  }
  
  // This is from https://tools.ietf.org/html/rfc6184#section-8.1.
  const ProfilePatterns =
  [
    new ProfilePattern(0x42, new BitPattern('x1xx0000'), ProfileConstrainedBaseline),
    new ProfilePattern(0x4D, new BitPattern('1xxx0000'), ProfileConstrainedBaseline),
    new ProfilePattern(0x58, new BitPattern('11xx0000'), ProfileConstrainedBaseline),
    new ProfilePattern(0x42, new BitPattern('x0xx0000'), ProfileBaseline),
    new ProfilePattern(0x58, new BitPattern('10xx0000'), ProfileBaseline),
    new ProfilePattern(0x4D, new BitPattern('0x0x0000'), ProfileMain),
    new ProfilePattern(0x64, new BitPattern('00000000'), ProfileHigh),
    new ProfilePattern(0x64, new BitPattern('00001100'), ProfileConstrainedHigh)
  ];
  
  /**
   * Parse profile level id that is represented as a string of 3 hex bytes.
   * Nothing will be returned if the string is not a recognized H264 profile
   * level id.
   *
   * @param {String} str - profile-level-id value as a string of 3 hex bytes.
   *
   * @returns {ProfileLevelId}
   */
  exports.parseProfileLevelId = function(str)
  {
    // The string should consist of 3 bytes in hexadecimal format.
    if (typeof str !== 'string' || str.length !== 6)
      return null;
  
    const profile_level_id_numeric = parseInt(str, 16);
  
    if (profile_level_id_numeric === 0)
      return null;
  
    // Separate into three bytes.
    const level_idc = profile_level_id_numeric & 0xFF;
    const profile_iop = (profile_level_id_numeric >> 8) & 0xFF;
    const profile_idc = (profile_level_id_numeric >> 16) & 0xFF;
  
    // Parse level based on level_idc and constraint set 3 flag.
    let level;
  
    switch (level_idc)
    {
      case Level1_1:
      {
        level = (profile_iop & ConstraintSet3Flag) !== 0 ? Level1_b : Level1_1;
        break;
      }
      case Level1:
      case Level1_2:
      case Level1_3:
      case Level2:
      case Level2_1:
      case Level2_2:
      case Level3:
      case Level3_1:
      case Level3_2:
      case Level4:
      case Level4_1:
      case Level4_2:
      case Level5:
      case Level5_1:
      case Level5_2:
      {
        level = level_idc;
        break;
      }
      // Unrecognized level_idc.
      default:
      {
        debug('parseProfileLevelId() | unrecognized level_idc:%s', level_idc);
  
        return null;
      }
    }
  
    // Parse profile_idc/profile_iop into a Profile enum.
    for (const pattern of ProfilePatterns)
    {
      if (
        profile_idc === pattern.profile_idc &&
        pattern.profile_iop.isMatch(profile_iop)
      )
      {
        return new ProfileLevelId(pattern.profile, level);
      }
    }
  
    debug('parseProfileLevelId() | unrecognized profile_idc/profile_iop combination');
  
    return null;
  };
  
  /**
   * Returns canonical string representation as three hex bytes of the profile
   * level id, or returns nothing for invalid profile level ids.
   *
   * @param {ProfileLevelId} profile_level_id
   *
   * @returns {String}
   */
  exports.profileLevelIdToString = function(profile_level_id)
  {
    // Handle special case level == 1b.
    if (profile_level_id.level == Level1_b)
    {
      switch (profile_level_id.profile)
      {
        case ProfileConstrainedBaseline:
        {
          return '42f00b';
        }
        case ProfileBaseline:
        {
          return '42100b';
        }
        case ProfileMain:
        {
          return '4d100b';
        }
        // Level 1_b is not allowed for other profiles.
        default:
        {
          debug(
            'profileLevelIdToString() | Level 1_b not is allowed for profile:%s',
            profile_level_id.profile);
  
          return null;
        }
      }
    }
  
    let profile_idc_iop_string;
  
    switch (profile_level_id.profile)
    {
      case ProfileConstrainedBaseline:
      {
        profile_idc_iop_string = '42e0';
        break;
      }
      case ProfileBaseline:
      {
        profile_idc_iop_string = '4200';
        break;
      }
      case ProfileMain:
      {
        profile_idc_iop_string = '4d00';
        break;
      }
      case ProfileConstrainedHigh:
      {
        profile_idc_iop_string = '640c';
        break;
      }
      case ProfileHigh:
      {
        profile_idc_iop_string = '6400';
        break;
      }
      default:
      {
        debug(
          'profileLevelIdToString() | unrecognized profile:%s',
          profile_level_id.profile);
  
        return null;
      }
    }
  
    let levelStr = (profile_level_id.level).toString(16);
  
    if (levelStr.length === 1)
      levelStr = `0${levelStr}`;
  
    return `${profile_idc_iop_string}${levelStr}`;
  };
  
  /**
   * Parse profile level id that is represented as a string of 3 hex bytes
   * contained in an SDP key-value map. A default profile level id will be
   * returned if the profile-level-id key is missing. Nothing will be returned if
   * the key is present but the string is invalid.
   *
   * @param {Object} [params={}] - Codec parameters object.
   *
   * @returns {ProfileLevelId}
   */
  exports.parseSdpProfileLevelId = function(params = {})
  {
    const profile_level_id = params['profile-level-id'];
  
    return !profile_level_id
      ? DefaultProfileLevelId
      : exports.parseProfileLevelId(profile_level_id);
  };
  
  /**
   * Returns true if the parameters have the same H264 profile, i.e. the same
   * H264 profile (Baseline, High, etc).
   *
   * @param {Object} [params1={}] - Codec parameters object.
   * @param {Object} [params2={}] - Codec parameters object.
   *
   * @returns {Boolean}
   */
  exports.isSameProfile = function(params1 = {}, params2 = {})
  {
    const profile_level_id_1 = exports.parseSdpProfileLevelId(params1);
    const profile_level_id_2 = exports.parseSdpProfileLevelId(params2);
  
    // Compare H264 profiles, but not levels.
    return Boolean(
      profile_level_id_1 &&
      profile_level_id_2 &&
      profile_level_id_1.profile === profile_level_id_2.profile
    );
  };
  
  /**
   * Generate codec parameters that will be used as answer in an SDP negotiation
   * based on local supported parameters and remote offered parameters. Both
   * local_supported_params and remote_offered_params represent sendrecv media
   * descriptions, i.e they are a mix of both encode and decode capabilities. In
   * theory, when the profile in local_supported_params represent a strict superset
   * of the profile in remote_offered_params, we could limit the profile in the
   * answer to the profile in remote_offered_params.
   *
   * However, to simplify the code, each supported H264 profile should be listed
   * explicitly in the list of local supported codecs, even if they are redundant.
   * Then each local codec in the list should be tested one at a time against the
   * remote codec, and only when the profiles are equal should this function be
   * called. Therefore, this function does not need to handle profile intersection,
   * and the profile of local_supported_params and remote_offered_params must be
   * equal before calling this function. The parameters that are used when
   * negotiating are the level part of profile-level-id and level-asymmetry-allowed.
   *
   * @param {Object} [local_supported_params={}]
   * @param {Object} [remote_offered_params={}]
   *
   * @returns {String} Canonical string representation as three hex bytes of the
   *   profile level id, or null if no one of the params have profile-level-id.
   *
   * @throws {TypeError} If Profile mismatch or invalid params.
   */
  exports.generateProfileLevelIdForAnswer = function(
    local_supported_params = {},
    remote_offered_params = {}
  )
  {
    // If both local and remote params do not contain profile-level-id, they are
    // both using the default profile. In this case, don't return anything.
    if (
      !local_supported_params['profile-level-id'] &&
      !remote_offered_params['profile-level-id']
    )
    {
      debug(
        'generateProfileLevelIdForAnswer() | no profile-level-id in local and remote params');
  
      return null;
    }
  
    // Parse profile-level-ids.
    const local_profile_level_id =
      exports.parseSdpProfileLevelId(local_supported_params);
    const remote_profile_level_id =
      exports.parseSdpProfileLevelId(remote_offered_params);
  
    // The local and remote codec must have valid and equal H264 Profiles.
    if (!local_profile_level_id)
      throw new TypeError('invalid local_profile_level_id');
  
    if (!remote_profile_level_id)
      throw new TypeError('invalid remote_profile_level_id');
  
    if (local_profile_level_id.profile !== remote_profile_level_id.profile)
      throw new TypeError('H264 Profile mismatch');
  
    // Parse level information.
    const level_asymmetry_allowed = (
      isLevelAsymmetryAllowed(local_supported_params) &&
      isLevelAsymmetryAllowed(remote_offered_params)
    );
  
    const local_level = local_profile_level_id.level;
    const remote_level = remote_profile_level_id.level;
    const min_level = minLevel(local_level, remote_level);
  
    // Determine answer level. When level asymmetry is not allowed, level upgrade
    // is not allowed, i.e., the level in the answer must be equal to or lower
    // than the level in the offer.
    const answer_level = level_asymmetry_allowed ? local_level : min_level;
  
    debug(
      'generateProfileLevelIdForAnswer() | result: [profile:%s, level:%s]',
      local_profile_level_id.profile, answer_level);
  
    // Return the resulting profile-level-id for the answer parameters.
    return exports.profileLevelIdToString(
      new ProfileLevelId(local_profile_level_id.profile, answer_level));
  };
  
  // Convert a string of 8 characters into a byte where the positions containing
  // character c will have their bit set. For example, c = 'x', str = "x1xx0000"
  // will return 0b10110000.
  function byteMaskString(c, str)
  {
    return (
      ((str[0] === c) << 7) | ((str[1] === c) << 6) | ((str[2] === c) << 5) |
      ((str[3] === c) << 4)	| ((str[4] === c) << 3)	| ((str[5] === c) << 2)	|
      ((str[6] === c) << 1)	| ((str[7] === c) << 0)
    );
  }
  
  // Compare H264 levels and handle the level 1b case.
  function isLessLevel(a, b)
  {
    if (a === Level1_b)
      return b !== Level1 && b !== Level1_b;
  
    if (b === Level1_b)
      return a !== Level1;
  
    return a < b;
  }
  
  function minLevel(a, b)
  {
    return isLessLevel(a, b) ? a : b;
  }
  
  function isLevelAsymmetryAllowed(params = {})
  {
    const level_asymmetry_allowed = params['level-asymmetry-allowed'];
  
    return (
      level_asymmetry_allowed === 1 ||
      level_asymmetry_allowed === '1'
    );
  }
  
  },{"debug":"/home/ubuntu/umbrella-voice2/app/node_modules/debug/src/browser.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Consumer.js":[function(require,module,exports){
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Consumer = void 0;
  const Logger_1 = require("./Logger");
  const EnhancedEventEmitter_1 = require("./EnhancedEventEmitter");
  const errors_1 = require("./errors");
  const logger = new Logger_1.Logger('Consumer');
  class Consumer extends EnhancedEventEmitter_1.EnhancedEventEmitter {
      /**
       * @emits transportclose
       * @emits trackended
       * @emits @getstats
       * @emits @close
       */
      constructor({ id, localId, producerId, rtpReceiver, track, rtpParameters, appData }) {
          super();
          // Closed flag.
          this._closed = false;
          // Observer instance.
          this._observer = new EnhancedEventEmitter_1.EnhancedEventEmitter();
          logger.debug('constructor()');
          this._id = id;
          this._localId = localId;
          this._producerId = producerId;
          this._rtpReceiver = rtpReceiver;
          this._track = track;
          this._rtpParameters = rtpParameters;
          this._paused = !track.enabled;
          this._appData = appData;
          this._onTrackEnded = this._onTrackEnded.bind(this);
          this._handleTrack();
      }
      /**
       * Consumer id.
       */
      get id() {
          return this._id;
      }
      /**
       * Local id.
       */
      get localId() {
          return this._localId;
      }
      /**
       * Associated Producer id.
       */
      get producerId() {
          return this._producerId;
      }
      /**
       * Whether the Consumer is closed.
       */
      get closed() {
          return this._closed;
      }
      /**
       * Media kind.
       */
      get kind() {
          return this._track.kind;
      }
      /**
       * Associated RTCRtpReceiver.
       */
      get rtpReceiver() {
          return this._rtpReceiver;
      }
      /**
       * The associated track.
       */
      get track() {
          return this._track;
      }
      /**
       * RTP parameters.
       */
      get rtpParameters() {
          return this._rtpParameters;
      }
      /**
       * Whether the Consumer is paused.
       */
      get paused() {
          return this._paused;
      }
      /**
       * App custom data.
       */
      get appData() {
          return this._appData;
      }
      /**
       * Invalid setter.
       */
      set appData(appData) {
          throw new Error('cannot override appData object');
      }
      /**
       * Observer.
       *
       * @emits close
       * @emits pause
       * @emits resume
       * @emits trackended
       */
      get observer() {
          return this._observer;
      }
      /**
       * Closes the Consumer.
       */
      close() {
          if (this._closed)
              return;
          logger.debug('close()');
          this._closed = true;
          this._destroyTrack();
          this.emit('@close');
          // Emit observer event.
          this._observer.safeEmit('close');
      }
      /**
       * Transport was closed.
       */
      transportClosed() {
          if (this._closed)
              return;
          logger.debug('transportClosed()');
          this._closed = true;
          this._destroyTrack();
          this.safeEmit('transportclose');
          // Emit observer event.
          this._observer.safeEmit('close');
      }
      /**
       * Get associated RTCRtpReceiver stats.
       */
      async getStats() {
          if (this._closed)
              throw new errors_1.InvalidStateError('closed');
          return this.safeEmitAsPromise('@getstats');
      }
      /**
       * Pauses receiving media.
       */
      pause() {
          logger.debug('pause()');
          if (this._closed) {
              logger.error('pause() | Consumer closed');
              return;
          }
          this._paused = true;
          this._track.enabled = false;
          // Emit observer event.
          this._observer.safeEmit('pause');
      }
      /**
       * Resumes receiving media.
       */
      resume() {
          logger.debug('resume()');
          if (this._closed) {
              logger.error('resume() | Consumer closed');
              return;
          }
          this._paused = false;
          this._track.enabled = true;
          // Emit observer event.
          this._observer.safeEmit('resume');
      }
      _onTrackEnded() {
          logger.debug('track "ended" event');
          this.safeEmit('trackended');
          // Emit observer event.
          this._observer.safeEmit('trackended');
      }
      _handleTrack() {
          this._track.addEventListener('ended', this._onTrackEnded);
      }
      _destroyTrack() {
          try {
              this._track.removeEventListener('ended', this._onTrackEnded);
              this._track.stop();
          }
          catch (error) { }
      }
  }
  exports.Consumer = Consumer;
  
  },{"./EnhancedEventEmitter":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/EnhancedEventEmitter.js","./Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","./errors":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/errors.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/DataConsumer.js":[function(require,module,exports){
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DataConsumer = void 0;
  const Logger_1 = require("./Logger");
  const EnhancedEventEmitter_1 = require("./EnhancedEventEmitter");
  const logger = new Logger_1.Logger('DataConsumer');
  class DataConsumer extends EnhancedEventEmitter_1.EnhancedEventEmitter {
      /**
       * @emits transportclose
       * @emits open
       * @emits error - (error: Error)
       * @emits close
       * @emits message - (message: any)
       * @emits @close
       */
      constructor({ id, dataProducerId, dataChannel, sctpStreamParameters, appData }) {
          super();
          // Closed flag.
          this._closed = false;
          // Observer instance.
          this._observer = new EnhancedEventEmitter_1.EnhancedEventEmitter();
          logger.debug('constructor()');
          this._id = id;
          this._dataProducerId = dataProducerId;
          this._dataChannel = dataChannel;
          this._sctpStreamParameters = sctpStreamParameters;
          this._appData = appData;
          this._handleDataChannel();
      }
      /**
       * DataConsumer id.
       */
      get id() {
          return this._id;
      }
      /**
       * Associated DataProducer id.
       */
      get dataProducerId() {
          return this._dataProducerId;
      }
      /**
       * Whether the DataConsumer is closed.
       */
      get closed() {
          return this._closed;
      }
      /**
       * SCTP stream parameters.
       */
      get sctpStreamParameters() {
          return this._sctpStreamParameters;
      }
      /**
       * DataChannel readyState.
       */
      get readyState() {
          return this._dataChannel.readyState;
      }
      /**
       * DataChannel label.
       */
      get label() {
          return this._dataChannel.label;
      }
      /**
       * DataChannel protocol.
       */
      get protocol() {
          return this._dataChannel.protocol;
      }
      /**
       * DataChannel binaryType.
       */
      get binaryType() {
          return this._dataChannel.binaryType;
      }
      /**
       * Set DataChannel binaryType.
       */
      set binaryType(binaryType) {
          this._dataChannel.binaryType = binaryType;
      }
      /**
       * App custom data.
       */
      get appData() {
          return this._appData;
      }
      /**
       * Invalid setter.
       */
      set appData(appData) {
          throw new Error('cannot override appData object');
      }
      /**
       * Observer.
       *
       * @emits close
       */
      get observer() {
          return this._observer;
      }
      /**
       * Closes the DataConsumer.
       */
      close() {
          if (this._closed)
              return;
          logger.debug('close()');
          this._closed = true;
          this._dataChannel.close();
          this.emit('@close');
          // Emit observer event.
          this._observer.safeEmit('close');
      }
      /**
       * Transport was closed.
       */
      transportClosed() {
          if (this._closed)
              return;
          logger.debug('transportClosed()');
          this._closed = true;
          this._dataChannel.close();
          this.safeEmit('transportclose');
          // Emit observer event.
          this._observer.safeEmit('close');
      }
      _handleDataChannel() {
          this._dataChannel.addEventListener('open', () => {
              if (this._closed)
                  return;
              logger.debug('DataChannel "open" event');
              this.safeEmit('open');
          });
          this._dataChannel.addEventListener('error', (event) => {
              if (this._closed)
                  return;
              let { error } = event;
              if (!error)
                  error = new Error('unknown DataChannel error');
              if (error.errorDetail === 'sctp-failure') {
                  logger.error('DataChannel SCTP error [sctpCauseCode:%s]: %s', error.sctpCauseCode, error.message);
              }
              else {
                  logger.error('DataChannel "error" event: %o', error);
              }
              this.safeEmit('error', error);
          });
          this._dataChannel.addEventListener('close', () => {
              if (this._closed)
                  return;
              logger.warn('DataChannel "close" event');
              this._closed = true;
              this.emit('@close');
              this.safeEmit('close');
          });
          this._dataChannel.addEventListener('message', (event) => {
              if (this._closed)
                  return;
              this.safeEmit('message', event.data);
          });
      }
  }
  exports.DataConsumer = DataConsumer;
  
  },{"./EnhancedEventEmitter":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/EnhancedEventEmitter.js","./Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/DataProducer.js":[function(require,module,exports){
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DataProducer = void 0;
  const Logger_1 = require("./Logger");
  const EnhancedEventEmitter_1 = require("./EnhancedEventEmitter");
  const errors_1 = require("./errors");
  const logger = new Logger_1.Logger('DataProducer');
  class DataProducer extends EnhancedEventEmitter_1.EnhancedEventEmitter {
      /**
       * @emits transportclose
       * @emits open
       * @emits error - (error: Error)
       * @emits close
       * @emits bufferedamountlow
       * @emits @close
       */
      constructor({ id, dataChannel, sctpStreamParameters, appData }) {
          super();
          // Closed flag.
          this._closed = false;
          // Observer instance.
          this._observer = new EnhancedEventEmitter_1.EnhancedEventEmitter();
          logger.debug('constructor()');
          this._id = id;
          this._dataChannel = dataChannel;
          this._sctpStreamParameters = sctpStreamParameters;
          this._appData = appData;
          this._handleDataChannel();
      }
      /**
       * DataProducer id.
       */
      get id() {
          return this._id;
      }
      /**
       * Whether the DataProducer is closed.
       */
      get closed() {
          return this._closed;
      }
      /**
       * SCTP stream parameters.
       */
      get sctpStreamParameters() {
          return this._sctpStreamParameters;
      }
      /**
       * DataChannel readyState.
       */
      get readyState() {
          return this._dataChannel.readyState;
      }
      /**
       * DataChannel label.
       */
      get label() {
          return this._dataChannel.label;
      }
      /**
       * DataChannel protocol.
       */
      get protocol() {
          return this._dataChannel.protocol;
      }
      /**
       * DataChannel bufferedAmount.
       */
      get bufferedAmount() {
          return this._dataChannel.bufferedAmount;
      }
      /**
       * DataChannel bufferedAmountLowThreshold.
       */
      get bufferedAmountLowThreshold() {
          return this._dataChannel.bufferedAmountLowThreshold;
      }
      /**
       * Set DataChannel bufferedAmountLowThreshold.
       */
      set bufferedAmountLowThreshold(bufferedAmountLowThreshold) {
          this._dataChannel.bufferedAmountLowThreshold = bufferedAmountLowThreshold;
      }
      /**
       * App custom data.
       */
      get appData() {
          return this._appData;
      }
      /**
       * Invalid setter.
       */
      set appData(appData) {
          throw new Error('cannot override appData object');
      }
      /**
       * Observer.
       *
       * @emits close
       */
      get observer() {
          return this._observer;
      }
      /**
       * Closes the DataProducer.
       */
      close() {
          if (this._closed)
              return;
          logger.debug('close()');
          this._closed = true;
          this._dataChannel.close();
          this.emit('@close');
          // Emit observer event.
          this._observer.safeEmit('close');
      }
      /**
       * Transport was closed.
       */
      transportClosed() {
          if (this._closed)
              return;
          logger.debug('transportClosed()');
          this._closed = true;
          this._dataChannel.close();
          this.safeEmit('transportclose');
          // Emit observer event.
          this._observer.safeEmit('close');
      }
      /**
       * Send a message.
       *
       * @param {String|Blob|ArrayBuffer|ArrayBufferView} data.
       */
      send(data) {
          logger.debug('send()');
          if (this._closed)
              throw new errors_1.InvalidStateError('closed');
          this._dataChannel.send(data);
      }
      _handleDataChannel() {
          this._dataChannel.addEventListener('open', () => {
              if (this._closed)
                  return;
              logger.debug('DataChannel "open" event');
              this.safeEmit('open');
          });
          this._dataChannel.addEventListener('error', (event) => {
              if (this._closed)
                  return;
              let { error } = event;
              if (!error)
                  error = new Error('unknown DataChannel error');
              if (error.errorDetail === 'sctp-failure') {
                  logger.error('DataChannel SCTP error [sctpCauseCode:%s]: %s', error.sctpCauseCode, error.message);
              }
              else {
                  logger.error('DataChannel "error" event: %o', error);
              }
              this.safeEmit('error', error);
          });
          this._dataChannel.addEventListener('close', () => {
              if (this._closed)
                  return;
              logger.warn('DataChannel "close" event');
              this._closed = true;
              this.emit('@close');
              this.safeEmit('close');
          });
          this._dataChannel.addEventListener('message', () => {
              if (this._closed)
                  return;
              logger.warn('DataChannel "message" event in a DataProducer, message discarded');
          });
          this._dataChannel.addEventListener('bufferedamountlow', () => {
              if (this._closed)
                  return;
              this.safeEmit('bufferedamountlow');
          });
      }
  }
  exports.DataProducer = DataProducer;
  
  },{"./EnhancedEventEmitter":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/EnhancedEventEmitter.js","./Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","./errors":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/errors.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Device.js":[function(require,module,exports){
  "use strict";
  /* global RTCRtpTransceiver */
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  var __importDefault = (this && this.__importDefault) || function (mod) {
      return (mod && mod.__esModule) ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Device = exports.detectDevice = void 0;
  const bowser_1 = __importDefault(require("bowser"));
  const Logger_1 = require("./Logger");
  const EnhancedEventEmitter_1 = require("./EnhancedEventEmitter");
  const errors_1 = require("./errors");
  const utils = __importStar(require("./utils"));
  const ortc = __importStar(require("./ortc"));
  const Transport_1 = require("./Transport");
  const Chrome74_1 = require("./handlers/Chrome74");
  const Chrome70_1 = require("./handlers/Chrome70");
  const Chrome67_1 = require("./handlers/Chrome67");
  const Chrome55_1 = require("./handlers/Chrome55");
  const Firefox60_1 = require("./handlers/Firefox60");
  const Safari12_1 = require("./handlers/Safari12");
  const Safari11_1 = require("./handlers/Safari11");
  const Edge11_1 = require("./handlers/Edge11");
  const ReactNative_1 = require("./handlers/ReactNative");
  const logger = new Logger_1.Logger('Device');
  function detectDevice() {
      // React-Native.
      // NOTE: react-native-webrtc >= 1.75.0 is required.
      if (typeof navigator === 'object' && navigator.product === 'ReactNative') {
          if (typeof RTCPeerConnection === 'undefined') {
              logger.warn('this._detectDevice() | unsupported ReactNative without RTCPeerConnection');
              return undefined;
          }
          logger.debug('this._detectDevice() | ReactNative handler chosen');
          return 'ReactNative';
      }
      // Browser.
      else if (typeof navigator === 'object' && typeof navigator.userAgent === 'string') {
          const ua = navigator.userAgent;
          const browser = bowser_1.default.getParser(ua);
          const engine = browser.getEngine();
          // Chrome and Chromium.
          if (browser.satisfies({ chrome: '>=74', chromium: '>=74' })) {
              return 'Chrome74';
          }
          else if (browser.satisfies({ chrome: '>=70', chromium: '>=70' })) {
              return 'Chrome70';
          }
          else if (browser.satisfies({ chrome: '>=67', chromium: '>=67' })) {
              return 'Chrome67';
          }
          else if (browser.satisfies({ chrome: '>=55', chromium: '>=55' })) {
              return 'Chrome55';
          }
          // Firefox.
          else if (browser.satisfies({ firefox: '>=60' })) {
              return 'Firefox60';
          }
          // Safari with Unified-Plan support enabled.
          else if (browser.satisfies({ safari: '>=12.0' }) &&
              typeof RTCRtpTransceiver !== 'undefined' &&
              RTCRtpTransceiver.prototype.hasOwnProperty('currentDirection')) {
              return 'Safari12';
          }
          // Safari with Plab-B support.
          else if (browser.satisfies({ safari: '>=11' })) {
              return 'Safari11';
          }
          // Old Edge with ORTC support.
          else if (browser.satisfies({ 'microsoft edge': '>=11' }) &&
              browser.satisfies({ 'microsoft edge': '<=18' })) {
              return 'Edge11';
          }
          // Best effort for Chromium based browsers.
          else if (engine.name && engine.name.toLowerCase() === 'blink') {
              const match = ua.match(/(?:(?:Chrome|Chromium))[ /](\w+)/i);
              if (match) {
                  const version = Number(match[1]);
                  if (version >= 74) {
                      return 'Chrome74';
                  }
                  else if (version >= 70) {
                      return 'Chrome70';
                  }
                  else if (version >= 67) {
                      return 'Chrome67';
                  }
                  else {
                      return 'Chrome55';
                  }
              }
              else {
                  return 'Chrome74';
              }
          }
          // Unsupported browser.
          else {
              logger.warn('this._detectDevice() | browser not supported [name:%s, version:%s]', browser.getBrowserName(), browser.getBrowserVersion());
              return undefined;
          }
      }
      // Unknown device.
      else {
          logger.warn('this._detectDevice() | unknown device');
          return undefined;
      }
  }
  exports.detectDevice = detectDevice;
  class Device {
      /**
       * Create a new Device to connect to mediasoup server.
       *
       * @throws {UnsupportedError} if device is not supported.
       */
      constructor({ handlerName, handlerFactory, Handler } = {}) {
          // Loaded flag.
          this._loaded = false;
          // Observer instance.
          this._observer = new EnhancedEventEmitter_1.EnhancedEventEmitter();
          logger.debug('constructor()');
          // Handle deprecated option.
          if (Handler) {
              logger.warn('constructor() | Handler option is DEPRECATED, use handlerName or handlerFactory instead');
              if (typeof Handler === 'string')
                  handlerName = Handler;
              else
                  throw new TypeError('non string Handler option no longer supported, use handlerFactory instead');
          }
          if (handlerName && handlerFactory) {
              throw new TypeError('just one of handlerName or handlerInterface can be given');
          }
          if (handlerFactory) {
              this._handlerFactory = handlerFactory;
          }
          else {
              if (handlerName) {
                  logger.debug('constructor() | handler given: %s', handlerName);
              }
              else {
                  handlerName = detectDevice();
                  if (handlerName)
                      logger.debug('constructor() | detected handler: %s', handlerName);
                  else
                      throw new errors_1.UnsupportedError('device not supported');
              }
              switch (handlerName) {
                  case 'Chrome74':
                      this._handlerFactory = Chrome74_1.Chrome74.createFactory();
                      break;
                  case 'Chrome70':
                      this._handlerFactory = Chrome70_1.Chrome70.createFactory();
                      break;
                  case 'Chrome67':
                      this._handlerFactory = Chrome67_1.Chrome67.createFactory();
                      break;
                  case 'Chrome55':
                      this._handlerFactory = Chrome55_1.Chrome55.createFactory();
                      break;
                  case 'Firefox60':
                      this._handlerFactory = Firefox60_1.Firefox60.createFactory();
                      break;
                  case 'Safari12':
                      this._handlerFactory = Safari12_1.Safari12.createFactory();
                      break;
                  case 'Safari11':
                      this._handlerFactory = Safari11_1.Safari11.createFactory();
                      break;
                  case 'Edge11':
                      this._handlerFactory = Edge11_1.Edge11.createFactory();
                      break;
                  case 'ReactNative':
                      this._handlerFactory = ReactNative_1.ReactNative.createFactory();
                      break;
                  default:
                      throw new TypeError(`unknown handlerName "${handlerName}"`);
              }
          }
          // Create a temporal handler to get its name.
          const handler = this._handlerFactory();
          this._handlerName = handler.name;
          handler.close();
          this._extendedRtpCapabilities = undefined;
          this._recvRtpCapabilities = undefined;
          this._canProduceByKind =
              {
                  audio: false,
                  video: false
              };
          this._sctpCapabilities = undefined;
      }
      /**
       * The RTC handler name.
       */
      get handlerName() {
          return this._handlerName;
      }
      /**
       * Whether the Device is loaded.
       */
      get loaded() {
          return this._loaded;
      }
      /**
       * RTP capabilities of the Device for receiving media.
       *
       * @throws {InvalidStateError} if not loaded.
       */
      get rtpCapabilities() {
          if (!this._loaded)
              throw new errors_1.InvalidStateError('not loaded');
          return this._recvRtpCapabilities;
      }
      /**
       * SCTP capabilities of the Device.
       *
       * @throws {InvalidStateError} if not loaded.
       */
      get sctpCapabilities() {
          if (!this._loaded)
              throw new errors_1.InvalidStateError('not loaded');
          return this._sctpCapabilities;
      }
      /**
       * Observer.
       *
       * @emits newtransport - (transport: Transport)
       */
      get observer() {
          return this._observer;
      }
      /**
       * Initialize the Device.
       */
      async load({ routerRtpCapabilities }) {
          logger.debug('load() [routerRtpCapabilities:%o]', routerRtpCapabilities);
          routerRtpCapabilities = utils.clone(routerRtpCapabilities, undefined);
          // Temporal handler to get its capabilities.
          let handler;
          try {
              if (this._loaded)
                  throw new errors_1.InvalidStateError('already loaded');
              // This may throw.
              ortc.validateRtpCapabilities(routerRtpCapabilities);
              handler = this._handlerFactory();
              const nativeRtpCapabilities = await handler.getNativeRtpCapabilities();
              logger.debug('load() | got native RTP capabilities:%o', nativeRtpCapabilities);
              // This may throw.
              ortc.validateRtpCapabilities(nativeRtpCapabilities);
              // Get extended RTP capabilities.
              this._extendedRtpCapabilities = ortc.getExtendedRtpCapabilities(nativeRtpCapabilities, routerRtpCapabilities);
              logger.debug('load() | got extended RTP capabilities:%o', this._extendedRtpCapabilities);
              // Check whether we can produce audio/video.
              this._canProduceByKind.audio =
                  ortc.canSend('audio', this._extendedRtpCapabilities);
              this._canProduceByKind.video =
                  ortc.canSend('video', this._extendedRtpCapabilities);
              // Generate our receiving RTP capabilities for receiving media.
              this._recvRtpCapabilities =
                  ortc.getRecvRtpCapabilities(this._extendedRtpCapabilities);
              // This may throw.
              ortc.validateRtpCapabilities(this._recvRtpCapabilities);
              logger.debug('load() | got receiving RTP capabilities:%o', this._recvRtpCapabilities);
              // Generate our SCTP capabilities.
              this._sctpCapabilities = await handler.getNativeSctpCapabilities();
              logger.debug('load() | got native SCTP capabilities:%o', this._sctpCapabilities);
              // This may throw.
              ortc.validateSctpCapabilities(this._sctpCapabilities);
              logger.debug('load() succeeded');
              this._loaded = true;
              handler.close();
          }
          catch (error) {
              if (handler)
                  handler.close();
              throw error;
          }
      }
      /**
       * Whether we can produce audio/video.
       *
       * @throws {InvalidStateError} if not loaded.
       * @throws {TypeError} if wrong arguments.
       */
      canProduce(kind) {
          if (!this._loaded)
              throw new errors_1.InvalidStateError('not loaded');
          else if (kind !== 'audio' && kind !== 'video')
              throw new TypeError(`invalid kind "${kind}"`);
          return this._canProduceByKind[kind];
      }
      /**
       * Creates a Transport for sending media.
       *
       * @throws {InvalidStateError} if not loaded.
       * @throws {TypeError} if wrong arguments.
       */
      createSendTransport({ id, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, appData = {} }) {
          logger.debug('createSendTransport()');
          return this._createTransport({
              direction: 'send',
              id: id,
              iceParameters: iceParameters,
              iceCandidates: iceCandidates,
              dtlsParameters: dtlsParameters,
              sctpParameters: sctpParameters,
              iceServers: iceServers,
              iceTransportPolicy: iceTransportPolicy,
              additionalSettings: additionalSettings,
              proprietaryConstraints: proprietaryConstraints,
              appData: appData
          });
      }
      /**
       * Creates a Transport for receiving media.
       *
       * @throws {InvalidStateError} if not loaded.
       * @throws {TypeError} if wrong arguments.
       */
      createRecvTransport({ id, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, appData = {} }) {
          logger.debug('createRecvTransport()');
          return this._createTransport({
              direction: 'recv',
              id: id,
              iceParameters: iceParameters,
              iceCandidates: iceCandidates,
              dtlsParameters: dtlsParameters,
              sctpParameters: sctpParameters,
              iceServers: iceServers,
              iceTransportPolicy: iceTransportPolicy,
              additionalSettings: additionalSettings,
              proprietaryConstraints: proprietaryConstraints,
              appData: appData
          });
      }
      _createTransport({ direction, id, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, appData = {} }) {
          if (!this._loaded)
              throw new errors_1.InvalidStateError('not loaded');
          else if (typeof id !== 'string')
              throw new TypeError('missing id');
          else if (typeof iceParameters !== 'object')
              throw new TypeError('missing iceParameters');
          else if (!Array.isArray(iceCandidates))
              throw new TypeError('missing iceCandidates');
          else if (typeof dtlsParameters !== 'object')
              throw new TypeError('missing dtlsParameters');
          else if (sctpParameters && typeof sctpParameters !== 'object')
              throw new TypeError('wrong sctpParameters');
          else if (appData && typeof appData !== 'object')
              throw new TypeError('if given, appData must be an object');
          // Create a new Transport.
          const transport = new Transport_1.Transport({
              direction,
              id,
              iceParameters,
              iceCandidates,
              dtlsParameters,
              sctpParameters,
              iceServers,
              iceTransportPolicy,
              additionalSettings,
              proprietaryConstraints,
              appData,
              handlerFactory: this._handlerFactory,
              extendedRtpCapabilities: this._extendedRtpCapabilities,
              canProduceByKind: this._canProduceByKind
          });
          // Emit observer event.
          this._observer.safeEmit('newtransport', transport);
          return transport;
      }
  }
  exports.Device = Device;
  
  },{"./EnhancedEventEmitter":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/EnhancedEventEmitter.js","./Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","./Transport":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Transport.js","./errors":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/errors.js","./handlers/Chrome55":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Chrome55.js","./handlers/Chrome67":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Chrome67.js","./handlers/Chrome70":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Chrome70.js","./handlers/Chrome74":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Chrome74.js","./handlers/Edge11":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Edge11.js","./handlers/Firefox60":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Firefox60.js","./handlers/ReactNative":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/ReactNative.js","./handlers/Safari11":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Safari11.js","./handlers/Safari12":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Safari12.js","./ortc":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/ortc.js","./utils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js","bowser":"/home/ubuntu/umbrella-voice2/app/node_modules/bowser/es5.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/EnhancedEventEmitter.js":[function(require,module,exports){
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.EnhancedEventEmitter = void 0;
  const events_1 = require("events");
  const Logger_1 = require("./Logger");
  const logger = new Logger_1.Logger('EnhancedEventEmitter');
  class EnhancedEventEmitter extends events_1.EventEmitter {
      constructor() {
          super();
          this.setMaxListeners(Infinity);
      }
      safeEmit(event, ...args) {
          const numListeners = this.listenerCount(event);
          try {
              return this.emit(event, ...args);
          }
          catch (error) {
              logger.error('safeEmit() | event listener threw an error [event:%s]:%o', event, error);
              return Boolean(numListeners);
          }
      }
      async safeEmitAsPromise(event, ...args) {
          return new Promise((resolve, reject) => {
              try {
                  this.emit(event, ...args, resolve, reject);
              }
              catch (error) {
                  logger.error('safeEmitAsPromise() | event listener threw an error [event:%s]:%o', event, error);
                  reject(error);
              }
          });
      }
  }
  exports.EnhancedEventEmitter = EnhancedEventEmitter;
  
  },{"./Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","events":"/home/ubuntu/umbrella-voice2/app/node_modules/browserify/node_modules/events/events.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js":[function(require,module,exports){
  "use strict";
  var __importDefault = (this && this.__importDefault) || function (mod) {
      return (mod && mod.__esModule) ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Logger = void 0;
  const debug_1 = __importDefault(require("debug"));
  const APP_NAME = 'mediasoup-client';
  class Logger {
      constructor(prefix) {
          if (prefix) {
              this._debug = debug_1.default(`${APP_NAME}:${prefix}`);
              this._warn = debug_1.default(`${APP_NAME}:WARN:${prefix}`);
              this._error = debug_1.default(`${APP_NAME}:ERROR:${prefix}`);
          }
          else {
              this._debug = debug_1.default(APP_NAME);
              this._warn = debug_1.default(`${APP_NAME}:WARN`);
              this._error = debug_1.default(`${APP_NAME}:ERROR`);
          }
          /* eslint-disable no-console */
          this._debug.log = console.info.bind(console);
          this._warn.log = console.warn.bind(console);
          this._error.log = console.error.bind(console);
          /* eslint-enable no-console */
      }
      get debug() {
          return this._debug;
      }
      get warn() {
          return this._warn;
      }
      get error() {
          return this._error;
      }
  }
  exports.Logger = Logger;
  
  },{"debug":"/home/ubuntu/umbrella-voice2/app/node_modules/debug/src/browser.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Producer.js":[function(require,module,exports){
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Producer = void 0;
  const Logger_1 = require("./Logger");
  const EnhancedEventEmitter_1 = require("./EnhancedEventEmitter");
  const errors_1 = require("./errors");
  const logger = new Logger_1.Logger('Producer');
  class Producer extends EnhancedEventEmitter_1.EnhancedEventEmitter {
      /**
       * @emits transportclose
       * @emits trackended
       * @emits @replacetrack - (track: MediaStreamTrack | null)
       * @emits @setmaxspatiallayer - (spatialLayer: string)
       * @emits @setrtpencodingparameters - (params: any)
       * @emits @getstats
       * @emits @close
       */
      constructor({ id, localId, rtpSender, track, rtpParameters, stopTracks, disableTrackOnPause, zeroRtpOnPause, appData }) {
          super();
          // Closed flag.
          this._closed = false;
          // Observer instance.
          this._observer = new EnhancedEventEmitter_1.EnhancedEventEmitter();
          logger.debug('constructor()');
          this._id = id;
          this._localId = localId;
          this._rtpSender = rtpSender;
          this._track = track;
          this._kind = track.kind;
          this._rtpParameters = rtpParameters;
          this._paused = disableTrackOnPause ? !track.enabled : false;
          this._maxSpatialLayer = undefined;
          this._stopTracks = stopTracks;
          this._disableTrackOnPause = disableTrackOnPause;
          this._zeroRtpOnPause = zeroRtpOnPause;
          this._appData = appData;
          this._onTrackEnded = this._onTrackEnded.bind(this);
          // NOTE: Minor issue. If zeroRtpOnPause is true, we cannot emit the
          // '@replacetrack' event here, so RTCRtpSender.track won't be null.
          this._handleTrack();
      }
      /**
       * Producer id.
       */
      get id() {
          return this._id;
      }
      /**
       * Local id.
       */
      get localId() {
          return this._localId;
      }
      /**
       * Whether the Producer is closed.
       */
      get closed() {
          return this._closed;
      }
      /**
       * Media kind.
       */
      get kind() {
          return this._kind;
      }
      /**
       * Associated RTCRtpSender.
       */
      get rtpSender() {
          return this._rtpSender;
      }
      /**
       * The associated track.
       */
      get track() {
          return this._track;
      }
      /**
       * RTP parameters.
       */
      get rtpParameters() {
          return this._rtpParameters;
      }
      /**
       * Whether the Producer is paused.
       */
      get paused() {
          return this._paused;
      }
      /**
       * Max spatial layer.
       *
       * @type {Number | undefined}
       */
      get maxSpatialLayer() {
          return this._maxSpatialLayer;
      }
      /**
       * App custom data.
       */
      get appData() {
          return this._appData;
      }
      /**
       * Invalid setter.
       */
      set appData(appData) {
          throw new Error('cannot override appData object');
      }
      /**
       * Observer.
       *
       * @emits close
       * @emits pause
       * @emits resume
       * @emits trackended
       */
      get observer() {
          return this._observer;
      }
      /**
       * Closes the Producer.
       */
      close() {
          if (this._closed)
              return;
          logger.debug('close()');
          this._closed = true;
          this._destroyTrack();
          this.emit('@close');
          // Emit observer event.
          this._observer.safeEmit('close');
      }
      /**
       * Transport was closed.
       */
      transportClosed() {
          if (this._closed)
              return;
          logger.debug('transportClosed()');
          this._closed = true;
          this._destroyTrack();
          this.safeEmit('transportclose');
          // Emit observer event.
          this._observer.safeEmit('close');
      }
      /**
       * Get associated RTCRtpSender stats.
       */
      async getStats() {
          if (this._closed)
              throw new errors_1.InvalidStateError('closed');
          return this.safeEmitAsPromise('@getstats');
      }
      /**
       * Pauses sending media.
       */
      pause() {
          logger.debug('pause()');
          if (this._closed) {
              logger.error('pause() | Producer closed');
              return;
          }
          this._paused = true;
          if (this._track && this._disableTrackOnPause) {
              this._track.enabled = false;
          }
          if (this._zeroRtpOnPause) {
              this.safeEmitAsPromise('@replacetrack', null)
                  .catch(() => { });
          }
          // Emit observer event.
          this._observer.safeEmit('pause');
      }
      /**
       * Resumes sending media.
       */
      resume() {
          logger.debug('resume()');
          if (this._closed) {
              logger.error('resume() | Producer closed');
              return;
          }
          this._paused = false;
          if (this._track && this._disableTrackOnPause) {
              this._track.enabled = true;
          }
          if (this._zeroRtpOnPause) {
              this.safeEmitAsPromise('@replacetrack', this._track)
                  .catch(() => { });
          }
          // Emit observer event.
          this._observer.safeEmit('resume');
      }
      /**
       * Replaces the current track with a new one or null.
       */
      async replaceTrack({ track }) {
          logger.debug('replaceTrack() [track:%o]', track);
          if (this._closed) {
              // This must be done here. Otherwise there is no chance to stop the given
              // track.
              if (track && this._stopTracks) {
                  try {
                      track.stop();
                  }
                  catch (error) { }
              }
              throw new errors_1.InvalidStateError('closed');
          }
          else if (track && track.readyState === 'ended') {
              throw new errors_1.InvalidStateError('track ended');
          }
          // Do nothing if this is the same track as the current handled one.
          if (track === this._track) {
              logger.debug('replaceTrack() | same track, ignored');
              return;
          }
          if (!this._zeroRtpOnPause || !this._paused) {
              await this.safeEmitAsPromise('@replacetrack', track);
          }
          // Destroy the previous track.
          this._destroyTrack();
          // Set the new track.
          this._track = track;
          // If this Producer was paused/resumed and the state of the new
          // track does not match, fix it.
          if (this._track && this._disableTrackOnPause) {
              if (!this._paused)
                  this._track.enabled = true;
              else if (this._paused)
                  this._track.enabled = false;
          }
          // Handle the effective track.
          this._handleTrack();
      }
      /**
       * Sets the video max spatial layer to be sent.
       */
      async setMaxSpatialLayer(spatialLayer) {
          if (this._closed)
              throw new errors_1.InvalidStateError('closed');
          else if (this._kind !== 'video')
              throw new errors_1.UnsupportedError('not a video Producer');
          else if (typeof spatialLayer !== 'number')
              throw new TypeError('invalid spatialLayer');
          if (spatialLayer === this._maxSpatialLayer)
              return;
          await this.safeEmitAsPromise('@setmaxspatiallayer', spatialLayer);
          this._maxSpatialLayer = spatialLayer;
      }
      /**
       * Sets the DSCP value.
       */
      async setRtpEncodingParameters(params) {
          if (this._closed)
              throw new errors_1.InvalidStateError('closed');
          else if (typeof params !== 'object')
              throw new TypeError('invalid params');
          await this.safeEmitAsPromise('@setrtpencodingparameters', params);
      }
      _onTrackEnded() {
          logger.debug('track "ended" event');
          this.safeEmit('trackended');
          // Emit observer event.
          this._observer.safeEmit('trackended');
      }
      _handleTrack() {
          if (!this._track)
              return;
          this._track.addEventListener('ended', this._onTrackEnded);
      }
      _destroyTrack() {
          if (!this._track)
              return;
          try {
              this._track.removeEventListener('ended', this._onTrackEnded);
              // Just stop the track unless the app set stopTracks: false.
              if (this._stopTracks)
                  this._track.stop();
          }
          catch (error) { }
      }
  }
  exports.Producer = Producer;
  
  },{"./EnhancedEventEmitter":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/EnhancedEventEmitter.js","./Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","./errors":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/errors.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/RtpParameters.js":[function(require,module,exports){
  "use strict";
  /**
   * The RTP capabilities define what mediasoup or an endpoint can receive at
   * media level.
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/SctpParameters.js":[function(require,module,exports){
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Transport.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Transport = void 0;
  const awaitqueue_1 = require("awaitqueue");
  const Logger_1 = require("./Logger");
  const EnhancedEventEmitter_1 = require("./EnhancedEventEmitter");
  const errors_1 = require("./errors");
  const utils = __importStar(require("./utils"));
  const ortc = __importStar(require("./ortc"));
  const Producer_1 = require("./Producer");
  const Consumer_1 = require("./Consumer");
  const DataProducer_1 = require("./DataProducer");
  const DataConsumer_1 = require("./DataConsumer");
  const logger = new Logger_1.Logger('Transport');
  class Transport extends EnhancedEventEmitter_1.EnhancedEventEmitter {
      /**
       * @emits connect - (transportLocalParameters: any, callback: Function, errback: Function)
       * @emits connectionstatechange - (connectionState: ConnectionState)
       * @emits produce - (producerLocalParameters: any, callback: Function, errback: Function)
       * @emits producedata - (dataProducerLocalParameters: any, callback: Function, errback: Function)
       */
      constructor({ direction, id, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, appData, handlerFactory, extendedRtpCapabilities, canProduceByKind }) {
          super();
          // Closed flag.
          this._closed = false;
          // Transport connection state.
          this._connectionState = 'new';
          // Map of Producers indexed by id.
          this._producers = new Map();
          // Map of Consumers indexed by id.
          this._consumers = new Map();
          // Map of DataProducers indexed by id.
          this._dataProducers = new Map();
          // Map of DataConsumers indexed by id.
          this._dataConsumers = new Map();
          // Whether the Consumer for RTP probation has been created.
          this._probatorConsumerCreated = false;
          // AwaitQueue instance to make async tasks happen sequentially.
          this._awaitQueue = new awaitqueue_1.AwaitQueue({ ClosedErrorClass: errors_1.InvalidStateError });
          // Observer instance.
          this._observer = new EnhancedEventEmitter_1.EnhancedEventEmitter();
          logger.debug('constructor() [id:%s, direction:%s]', id, direction);
          this._id = id;
          this._direction = direction;
          this._extendedRtpCapabilities = extendedRtpCapabilities;
          this._canProduceByKind = canProduceByKind;
          this._maxSctpMessageSize =
              sctpParameters ? sctpParameters.maxMessageSize : null;
          // Clone and sanitize additionalSettings.
          additionalSettings = utils.clone(additionalSettings, {});
          delete additionalSettings.iceServers;
          delete additionalSettings.iceTransportPolicy;
          delete additionalSettings.bundlePolicy;
          delete additionalSettings.rtcpMuxPolicy;
          delete additionalSettings.sdpSemantics;
          this._handler = handlerFactory();
          this._handler.run({
              direction,
              iceParameters,
              iceCandidates,
              dtlsParameters,
              sctpParameters,
              iceServers,
              iceTransportPolicy,
              additionalSettings,
              proprietaryConstraints,
              extendedRtpCapabilities
          });
          this._appData = appData;
          this._handleHandler();
      }
      /**
       * Transport id.
       */
      get id() {
          return this._id;
      }
      /**
       * Whether the Transport is closed.
       */
      get closed() {
          return this._closed;
      }
      /**
       * Transport direction.
       */
      get direction() {
          return this._direction;
      }
      /**
       * RTC handler instance.
       */
      get handler() {
          return this._handler;
      }
      /**
       * Connection state.
       */
      get connectionState() {
          return this._connectionState;
      }
      /**
       * App custom data.
       */
      get appData() {
          return this._appData;
      }
      /**
       * Invalid setter.
       */
      set appData(appData) {
          throw new Error('cannot override appData object');
      }
      /**
       * Observer.
       *
       * @emits close
       * @emits newproducer - (producer: Producer)
       * @emits newconsumer - (producer: Producer)
       * @emits newdataproducer - (dataProducer: DataProducer)
       * @emits newdataconsumer - (dataProducer: DataProducer)
       */
      get observer() {
          return this._observer;
      }
      /**
       * Close the Transport.
       */
      close() {
          if (this._closed)
              return;
          logger.debug('close()');
          this._closed = true;
          // Close the AwaitQueue.
          this._awaitQueue.close();
          // Close the handler.
          this._handler.close();
          // Close all Producers.
          for (const producer of this._producers.values()) {
              producer.transportClosed();
          }
          this._producers.clear();
          // Close all Consumers.
          for (const consumer of this._consumers.values()) {
              consumer.transportClosed();
          }
          this._consumers.clear();
          // Close all DataProducers.
          for (const dataProducer of this._dataProducers.values()) {
              dataProducer.transportClosed();
          }
          this._dataProducers.clear();
          // Close all DataConsumers.
          for (const dataConsumer of this._dataConsumers.values()) {
              dataConsumer.transportClosed();
          }
          this._dataConsumers.clear();
          // Emit observer event.
          this._observer.safeEmit('close');
      }
      /**
       * Get associated Transport (RTCPeerConnection) stats.
       *
       * @returns {RTCStatsReport}
       */
      async getStats() {
          if (this._closed)
              throw new errors_1.InvalidStateError('closed');
          return this._handler.getTransportStats();
      }
      /**
       * Restart ICE connection.
       */
      async restartIce({ iceParameters }) {
          logger.debug('restartIce()');
          if (this._closed)
              throw new errors_1.InvalidStateError('closed');
          else if (!iceParameters)
              throw new TypeError('missing iceParameters');
          // Enqueue command.
          return this._awaitQueue.push(async () => this._handler.restartIce(iceParameters), 'transport.restartIce()');
      }
      /**
       * Update ICE servers.
       */
      async updateIceServers({ iceServers } = {}) {
          logger.debug('updateIceServers()');
          if (this._closed)
              throw new errors_1.InvalidStateError('closed');
          else if (!Array.isArray(iceServers))
              throw new TypeError('missing iceServers');
          // Enqueue command.
          return this._awaitQueue.push(async () => this._handler.updateIceServers(iceServers), 'transport.updateIceServers()');
      }
      /**
       * Create a Producer.
       */
      async produce({ track, encodings, codecOptions, codec, stopTracks = true, disableTrackOnPause = true, zeroRtpOnPause = false, appData = {} } = {}) {
          logger.debug('produce() [track:%o]', track);
          if (!track)
              throw new TypeError('missing track');
          else if (this._direction !== 'send')
              throw new errors_1.UnsupportedError('not a sending Transport');
          else if (!this._canProduceByKind[track.kind])
              throw new errors_1.UnsupportedError(`cannot produce ${track.kind}`);
          else if (track.readyState === 'ended')
              throw new errors_1.InvalidStateError('track ended');
          else if (this.listenerCount('connect') === 0 && this._connectionState === 'new')
              throw new TypeError('no "connect" listener set into this transport');
          else if (this.listenerCount('produce') === 0)
              throw new TypeError('no "produce" listener set into this transport');
          else if (appData && typeof appData !== 'object')
              throw new TypeError('if given, appData must be an object');
          // Enqueue command.
          return this._awaitQueue.push(async () => {
              let normalizedEncodings;
              if (encodings && !Array.isArray(encodings)) {
                  throw TypeError('encodings must be an array');
              }
              else if (encodings && encodings.length === 0) {
                  normalizedEncodings = undefined;
              }
              else if (encodings) {
                  normalizedEncodings = encodings
                      .map((encoding) => {
                      const normalizedEncoding = { active: true };
                      if (encoding.active === false)
                          normalizedEncoding.active = false;
                      if (typeof encoding.dtx === 'boolean')
                          normalizedEncoding.dtx = encoding.dtx;
                      if (typeof encoding.scalabilityMode === 'string')
                          normalizedEncoding.scalabilityMode = encoding.scalabilityMode;
                      if (typeof encoding.scaleResolutionDownBy === 'number')
                          normalizedEncoding.scaleResolutionDownBy = encoding.scaleResolutionDownBy;
                      if (typeof encoding.maxBitrate === 'number')
                          normalizedEncoding.maxBitrate = encoding.maxBitrate;
                      if (typeof encoding.maxFramerate === 'number')
                          normalizedEncoding.maxFramerate = encoding.maxFramerate;
                      if (typeof encoding.adaptivePtime === 'boolean')
                          normalizedEncoding.adaptivePtime = encoding.adaptivePtime;
                      if (typeof encoding.priority === 'string')
                          normalizedEncoding.priority = encoding.priority;
                      if (typeof encoding.networkPriority === 'string')
                          normalizedEncoding.networkPriority = encoding.networkPriority;
                      return normalizedEncoding;
                  });
              }
              const { localId, rtpParameters, rtpSender } = await this._handler.send({
                  track,
                  encodings: normalizedEncodings,
                  codecOptions,
                  codec
              });
              try {
                  // This will fill rtpParameters's missing fields with default values.
                  ortc.validateRtpParameters(rtpParameters);
                  const { id } = await this.safeEmitAsPromise('produce', {
                      kind: track.kind,
                      rtpParameters,
                      appData
                  });
                  const producer = new Producer_1.Producer({
                      id,
                      localId,
                      rtpSender,
                      track,
                      rtpParameters,
                      stopTracks,
                      disableTrackOnPause,
                      zeroRtpOnPause,
                      appData
                  });
                  this._producers.set(producer.id, producer);
                  this._handleProducer(producer);
                  // Emit observer event.
                  this._observer.safeEmit('newproducer', producer);
                  return producer;
              }
              catch (error) {
                  this._handler.stopSending(localId)
                      .catch(() => { });
                  throw error;
              }
          }, 'transport.produce()')
              // This catch is needed to stop the given track if the command above
              // failed due to closed Transport.
              .catch((error) => {
              if (stopTracks) {
                  try {
                      track.stop();
                  }
                  catch (error2) { }
              }
              throw error;
          });
      }
      /**
       * Create a Consumer to consume a remote Producer.
       */
      async consume({ id, producerId, kind, rtpParameters, appData = {} }) {
          logger.debug('consume()');
          rtpParameters = utils.clone(rtpParameters, undefined);
          if (this._closed)
              throw new errors_1.InvalidStateError('closed');
          else if (this._direction !== 'recv')
              throw new errors_1.UnsupportedError('not a receiving Transport');
          else if (typeof id !== 'string')
              throw new TypeError('missing id');
          else if (typeof producerId !== 'string')
              throw new TypeError('missing producerId');
          else if (kind !== 'audio' && kind !== 'video')
              throw new TypeError(`invalid kind '${kind}'`);
          else if (this.listenerCount('connect') === 0 && this._connectionState === 'new')
              throw new TypeError('no "connect" listener set into this transport');
          else if (appData && typeof appData !== 'object')
              throw new TypeError('if given, appData must be an object');
          // Enqueue command.
          return this._awaitQueue.push(async () => {
              // Ensure the device can consume it.
              const canConsume = ortc.canReceive(rtpParameters, this._extendedRtpCapabilities);
              if (!canConsume)
                  throw new errors_1.UnsupportedError('cannot consume this Producer');
              const { localId, rtpReceiver, track } = await this._handler.receive({ trackId: id, kind, rtpParameters });
              const consumer = new Consumer_1.Consumer({
                  id,
                  localId,
                  producerId,
                  rtpReceiver,
                  track,
                  rtpParameters,
                  appData
              });
              this._consumers.set(consumer.id, consumer);
              this._handleConsumer(consumer);
              // If this is the first video Consumer and the Consumer for RTP probation
              // has not yet been created, create it now.
              if (!this._probatorConsumerCreated && kind === 'video') {
                  try {
                      const probatorRtpParameters = ortc.generateProbatorRtpParameters(consumer.rtpParameters);
                      await this._handler.receive({
                          trackId: 'probator',
                          kind: 'video',
                          rtpParameters: probatorRtpParameters
                      });
                      logger.debug('consume() | Consumer for RTP probation created');
                      this._probatorConsumerCreated = true;
                  }
                  catch (error) {
                      logger.error('consume() | failed to create Consumer for RTP probation:%o', error);
                  }
              }
              // Emit observer event.
              this._observer.safeEmit('newconsumer', consumer);
              return consumer;
          }, 'transport.consume()');
      }
      /**
       * Create a DataProducer
       */
      async produceData({ ordered = true, maxPacketLifeTime, maxRetransmits, label = '', protocol = '', appData = {} } = {}) {
          logger.debug('produceData()');
          if (this._direction !== 'send')
              throw new errors_1.UnsupportedError('not a sending Transport');
          else if (!this._maxSctpMessageSize)
              throw new errors_1.UnsupportedError('SCTP not enabled by remote Transport');
          else if (this.listenerCount('connect') === 0 && this._connectionState === 'new')
              throw new TypeError('no "connect" listener set into this transport');
          else if (this.listenerCount('producedata') === 0)
              throw new TypeError('no "producedata" listener set into this transport');
          else if (appData && typeof appData !== 'object')
              throw new TypeError('if given, appData must be an object');
          if (maxPacketLifeTime || maxRetransmits)
              ordered = false;
          // Enqueue command.
          return this._awaitQueue.push(async () => {
              const { dataChannel, sctpStreamParameters } = await this._handler.sendDataChannel({
                  ordered,
                  maxPacketLifeTime,
                  maxRetransmits,
                  label,
                  protocol
              });
              // This will fill sctpStreamParameters's missing fields with default values.
              ortc.validateSctpStreamParameters(sctpStreamParameters);
              const { id } = await this.safeEmitAsPromise('producedata', {
                  sctpStreamParameters,
                  label,
                  protocol,
                  appData
              });
              const dataProducer = new DataProducer_1.DataProducer({ id, dataChannel, sctpStreamParameters, appData });
              this._dataProducers.set(dataProducer.id, dataProducer);
              this._handleDataProducer(dataProducer);
              // Emit observer event.
              this._observer.safeEmit('newdataproducer', dataProducer);
              return dataProducer;
          }, 'transport.produceData()');
      }
      /**
       * Create a DataConsumer
       */
      async consumeData({ id, dataProducerId, sctpStreamParameters, label = '', protocol = '', appData = {} }) {
          logger.debug('consumeData()');
          sctpStreamParameters = utils.clone(sctpStreamParameters, undefined);
          if (this._closed)
              throw new errors_1.InvalidStateError('closed');
          else if (this._direction !== 'recv')
              throw new errors_1.UnsupportedError('not a receiving Transport');
          else if (!this._maxSctpMessageSize)
              throw new errors_1.UnsupportedError('SCTP not enabled by remote Transport');
          else if (typeof id !== 'string')
              throw new TypeError('missing id');
          else if (typeof dataProducerId !== 'string')
              throw new TypeError('missing dataProducerId');
          else if (this.listenerCount('connect') === 0 && this._connectionState === 'new')
              throw new TypeError('no "connect" listener set into this transport');
          else if (appData && typeof appData !== 'object')
              throw new TypeError('if given, appData must be an object');
          // This may throw.
          ortc.validateSctpStreamParameters(sctpStreamParameters);
          // Enqueue command.
          return this._awaitQueue.push(async () => {
              const { dataChannel } = await this._handler.receiveDataChannel({
                  sctpStreamParameters,
                  label,
                  protocol
              });
              const dataConsumer = new DataConsumer_1.DataConsumer({
                  id,
                  dataProducerId,
                  dataChannel,
                  sctpStreamParameters,
                  appData
              });
              this._dataConsumers.set(dataConsumer.id, dataConsumer);
              this._handleDataConsumer(dataConsumer);
              // Emit observer event.
              this._observer.safeEmit('newdataconsumer', dataConsumer);
              return dataConsumer;
          }, 'transport.consumeData()');
      }
      _handleHandler() {
          const handler = this._handler;
          handler.on('@connect', ({ dtlsParameters }, callback, errback) => {
              if (this._closed) {
                  errback(new errors_1.InvalidStateError('closed'));
                  return;
              }
              this.safeEmit('connect', { dtlsParameters }, callback, errback);
          });
          handler.on('@connectionstatechange', (connectionState) => {
              if (connectionState === this._connectionState)
                  return;
              logger.debug('connection state changed to %s', connectionState);
              this._connectionState = connectionState;
              if (!this._closed)
                  this.safeEmit('connectionstatechange', connectionState);
          });
      }
      _handleProducer(producer) {
          producer.on('@close', () => {
              this._producers.delete(producer.id);
              if (this._closed)
                  return;
              this._awaitQueue.push(async () => this._handler.stopSending(producer.localId), 'producer @close event')
                  .catch((error) => logger.warn('producer.close() failed:%o', error));
          });
          producer.on('@replacetrack', (track, callback, errback) => {
              this._awaitQueue.push(async () => this._handler.replaceTrack(producer.localId, track), 'producer @replacetrack event')
                  .then(callback)
                  .catch(errback);
          });
          producer.on('@setmaxspatiallayer', (spatialLayer, callback, errback) => {
              this._awaitQueue.push(async () => (this._handler.setMaxSpatialLayer(producer.localId, spatialLayer)), 'producer @setmaxspatiallayer event')
                  .then(callback)
                  .catch(errback);
          });
          producer.on('@setrtpencodingparameters', (params, callback, errback) => {
              this._awaitQueue.push(async () => (this._handler.setRtpEncodingParameters(producer.localId, params)), 'producer @setrtpencodingparameters event')
                  .then(callback)
                  .catch(errback);
          });
          producer.on('@getstats', (callback, errback) => {
              if (this._closed)
                  return errback(new errors_1.InvalidStateError('closed'));
              this._handler.getSenderStats(producer.localId)
                  .then(callback)
                  .catch(errback);
          });
      }
      _handleConsumer(consumer) {
          consumer.on('@close', () => {
              this._consumers.delete(consumer.id);
              if (this._closed)
                  return;
              this._awaitQueue.push(async () => this._handler.stopReceiving(consumer.localId), 'consumer @close event')
                  .catch(() => { });
          });
          consumer.on('@getstats', (callback, errback) => {
              if (this._closed)
                  return errback(new errors_1.InvalidStateError('closed'));
              this._handler.getReceiverStats(consumer.localId)
                  .then(callback)
                  .catch(errback);
          });
      }
      _handleDataProducer(dataProducer) {
          dataProducer.on('@close', () => {
              this._dataProducers.delete(dataProducer.id);
          });
      }
      _handleDataConsumer(dataConsumer) {
          dataConsumer.on('@close', () => {
              this._dataConsumers.delete(dataConsumer.id);
          });
      }
  }
  exports.Transport = Transport;
  
  },{"./Consumer":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Consumer.js","./DataConsumer":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/DataConsumer.js","./DataProducer":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/DataProducer.js","./EnhancedEventEmitter":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/EnhancedEventEmitter.js","./Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","./Producer":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Producer.js","./errors":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/errors.js","./ortc":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/ortc.js","./utils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js","awaitqueue":"/home/ubuntu/umbrella-voice2/app/node_modules/awaitqueue/lib/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/errors.js":[function(require,module,exports){
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.InvalidStateError = exports.UnsupportedError = void 0;
  /**
   * Error indicating not support for something.
   */
  class UnsupportedError extends Error {
      constructor(message) {
          super(message);
          this.name = 'UnsupportedError';
          if (Error.hasOwnProperty('captureStackTrace')) // Just in V8.
           {
              // @ts-ignore
              Error.captureStackTrace(this, UnsupportedError);
          }
          else {
              this.stack = (new Error(message)).stack;
          }
      }
  }
  exports.UnsupportedError = UnsupportedError;
  /**
   * Error produced when calling a method in an invalid state.
   */
  class InvalidStateError extends Error {
      constructor(message) {
          super(message);
          this.name = 'InvalidStateError';
          if (Error.hasOwnProperty('captureStackTrace')) // Just in V8.
           {
              // @ts-ignore
              Error.captureStackTrace(this, InvalidStateError);
          }
          else {
              this.stack = (new Error(message)).stack;
          }
      }
  }
  exports.InvalidStateError = InvalidStateError;
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Chrome55.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Chrome55 = void 0;
  const sdpTransform = __importStar(require("sdp-transform"));
  const Logger_1 = require("../Logger");
  const errors_1 = require("../errors");
  const utils = __importStar(require("../utils"));
  const ortc = __importStar(require("../ortc"));
  const sdpCommonUtils = __importStar(require("./sdp/commonUtils"));
  const sdpPlanBUtils = __importStar(require("./sdp/planBUtils"));
  const HandlerInterface_1 = require("./HandlerInterface");
  const RemoteSdp_1 = require("./sdp/RemoteSdp");
  const logger = new Logger_1.Logger('Chrome55');
  const SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
  class Chrome55 extends HandlerInterface_1.HandlerInterface {
      constructor() {
          super();
          // Local stream for sending.
          this._sendStream = new MediaStream();
          // Map of sending MediaStreamTracks indexed by localId.
          this._mapSendLocalIdTrack = new Map();
          // Next sending localId.
          this._nextSendLocalId = 0;
          // Map of MID, RTP parameters and RTCRtpReceiver indexed by local id.
          // Value is an Object with mid, rtpParameters and rtpReceiver.
          this._mapRecvLocalIdInfo = new Map();
          // Whether a DataChannel m=application section has been created.
          this._hasDataChannelMediaSection = false;
          // Sending DataChannel id value counter. Incremented for each new DataChannel.
          this._nextSendSctpStreamId = 0;
          // Got transport local and remote parameters.
          this._transportReady = false;
      }
      /**
       * Creates a factory function.
       */
      static createFactory() {
          return () => new Chrome55();
      }
      get name() {
          return 'Chrome55';
      }
      close() {
          logger.debug('close()');
          // Close RTCPeerConnection.
          if (this._pc) {
              try {
                  this._pc.close();
              }
              catch (error) { }
          }
      }
      async getNativeRtpCapabilities() {
          logger.debug('getNativeRtpCapabilities()');
          const pc = new RTCPeerConnection({
              iceServers: [],
              iceTransportPolicy: 'all',
              bundlePolicy: 'max-bundle',
              rtcpMuxPolicy: 'require',
              sdpSemantics: 'plan-b'
          });
          try {
              const offer = await pc.createOffer({
                  offerToReceiveAudio: true,
                  offerToReceiveVideo: true
              });
              try {
                  pc.close();
              }
              catch (error) { }
              const sdpObject = sdpTransform.parse(offer.sdp);
              const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({ sdpObject });
              return nativeRtpCapabilities;
          }
          catch (error) {
              try {
                  pc.close();
              }
              catch (error2) { }
              throw error;
          }
      }
      async getNativeSctpCapabilities() {
          logger.debug('getNativeSctpCapabilities()');
          return {
              numStreams: SCTP_NUM_STREAMS
          };
      }
      run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          logger.debug('run()');
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
              iceParameters,
              iceCandidates,
              dtlsParameters,
              sctpParameters,
              planB: true
          });
          this._sendingRtpParametersByKind =
              {
                  audio: ortc.getSendingRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRtpParameters('video', extendedRtpCapabilities)
              };
          this._sendingRemoteRtpParametersByKind =
              {
                  audio: ortc.getSendingRemoteRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRemoteRtpParameters('video', extendedRtpCapabilities)
              };
          this._pc = new RTCPeerConnection(Object.assign({ iceServers: iceServers || [], iceTransportPolicy: iceTransportPolicy || 'all', bundlePolicy: 'max-bundle', rtcpMuxPolicy: 'require', sdpSemantics: 'plan-b' }, additionalSettings), proprietaryConstraints);
          // Handle RTCPeerConnection connection status.
          this._pc.addEventListener('iceconnectionstatechange', () => {
              switch (this._pc.iceConnectionState) {
                  case 'checking':
                      this.emit('@connectionstatechange', 'connecting');
                      break;
                  case 'connected':
                  case 'completed':
                      this.emit('@connectionstatechange', 'connected');
                      break;
                  case 'failed':
                      this.emit('@connectionstatechange', 'failed');
                      break;
                  case 'disconnected':
                      this.emit('@connectionstatechange', 'disconnected');
                      break;
                  case 'closed':
                      this.emit('@connectionstatechange', 'closed');
                      break;
              }
          });
      }
      async updateIceServers(iceServers) {
          logger.debug('updateIceServers()');
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
      }
      async restartIce(iceParameters) {
          logger.debug('restartIce()');
          // Provide the remote SDP handler with new remote ICE parameters.
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady)
              return;
          if (this._direction === 'send') {
              const offer = await this._pc.createOffer({ iceRestart: true });
              logger.debug('restartIce() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
          }
          else {
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              logger.debug('restartIce() | calling pc.setLocalDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
          }
      }
      async getTransportStats() {
          return this._pc.getStats();
      }
      async send({ track, encodings, codecOptions, codec }) {
          this._assertSendDirection();
          logger.debug('send() [kind:%s, track.id:%s]', track.kind, track.id);
          if (codec) {
              logger.warn('send() | codec selection is not available in %s handler', this.name);
          }
          this._sendStream.addTrack(track);
          this._pc.addStream(this._sendStream);
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          let offerMediaObject;
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind], {});
          sendingRtpParameters.codecs =
              ortc.reduceCodecs(sendingRtpParameters.codecs);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind], {});
          sendingRemoteRtpParameters.codecs =
              ortc.reduceCodecs(sendingRemoteRtpParameters.codecs);
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
          if (track.kind === 'video' && encodings && encodings.length > 1) {
              logger.debug('send() | enabling simulcast');
              localSdpObject = sdpTransform.parse(offer.sdp);
              offerMediaObject = localSdpObject.media.find((m) => m.type === 'video');
              sdpPlanBUtils.addLegacySimulcast({
                  offerMediaObject,
                  track,
                  numStreams: encodings.length
              });
              offer = { type: 'offer', sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug('send() | calling pc.setLocalDescription() [offer:%o]', offer);
          await this._pc.setLocalDescription(offer);
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media
              .find((m) => m.type === track.kind);
          // Set RTCP CNAME.
          sendingRtpParameters.rtcp.cname =
              sdpCommonUtils.getCname({ offerMediaObject });
          // Set RTP encodings.
          sendingRtpParameters.encodings =
              sdpPlanBUtils.getRtpEncodings({ offerMediaObject, track });
          // Complete encodings with given values.
          if (encodings) {
              for (let idx = 0; idx < sendingRtpParameters.encodings.length; ++idx) {
                  if (encodings[idx])
                      Object.assign(sendingRtpParameters.encodings[idx], encodings[idx]);
              }
          }
          // If VP8 and there is effective simulcast, add scalabilityMode to each
          // encoding.
          if (sendingRtpParameters.encodings.length > 1 &&
              sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/vp8') {
              for (const encoding of sendingRtpParameters.encodings) {
                  encoding.scalabilityMode = 'S1T3';
              }
          }
          this._remoteSdp.send({
              offerMediaObject,
              offerRtpParameters: sendingRtpParameters,
              answerRtpParameters: sendingRemoteRtpParameters,
              codecOptions
          });
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('send() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
          const localId = String(this._nextSendLocalId);
          this._nextSendLocalId++;
          // Insert into the map.
          this._mapSendLocalIdTrack.set(localId, track);
          return {
              localId: localId,
              rtpParameters: sendingRtpParameters
          };
      }
      async stopSending(localId) {
          this._assertSendDirection();
          logger.debug('stopSending() [localId:%s]', localId);
          const track = this._mapSendLocalIdTrack.get(localId);
          if (!track)
              throw new Error('track not found');
          this._mapSendLocalIdTrack.delete(localId);
          this._sendStream.removeTrack(track);
          this._pc.addStream(this._sendStream);
          const offer = await this._pc.createOffer();
          logger.debug('stopSending() | calling pc.setLocalDescription() [offer:%o]', offer);
          try {
              await this._pc.setLocalDescription(offer);
          }
          catch (error) {
              // NOTE: If there are no sending tracks, setLocalDescription() will fail with
              // "Failed to create channels". If so, ignore it.
              if (this._sendStream.getTracks().length === 0) {
                  logger.warn('stopSending() | ignoring expected error due no sending tracks: %s', error.toString());
                  return;
              }
              throw error;
          }
          if (this._pc.signalingState === 'stable')
              return;
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopSending() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
      }
      async replaceTrack(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      localId, track) {
          throw new errors_1.UnsupportedError('not implemented');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async setMaxSpatialLayer(localId, spatialLayer) {
          throw new errors_1.UnsupportedError(' not implemented');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async setRtpEncodingParameters(localId, params) {
          throw new errors_1.UnsupportedError('not supported');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async getSenderStats(localId) {
          throw new errors_1.UnsupportedError('not implemented');
      }
      async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol }) {
          this._assertSendDirection();
          const options = {
              negotiated: true,
              id: this._nextSendSctpStreamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmitTime: maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('sendDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // Increase next id.
          this._nextSendSctpStreamId =
              ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          // If this is the first DataChannel we need to create the SDP answer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              const offer = await this._pc.createOffer();
              const localSdpObject = sdpTransform.parse(offer.sdp);
              const offerMediaObject = localSdpObject.media
                  .find((m) => m.type === 'application');
              if (!this._transportReady)
                  await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
              logger.debug('sendDataChannel() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              this._remoteSdp.sendSctpAssociation({ offerMediaObject });
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
              streamId: options.id,
              ordered: options.ordered,
              maxPacketLifeTime: options.maxPacketLifeTime,
              maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
      }
      async receive({ trackId, kind, rtpParameters }) {
          this._assertRecvDirection();
          logger.debug('receive() [trackId:%s, kind:%s]', trackId, kind);
          const localId = trackId;
          const mid = kind;
          const streamId = rtpParameters.rtcp.cname;
          this._remoteSdp.receive({
              mid,
              kind,
              offerRtpParameters: rtpParameters,
              streamId,
              trackId
          });
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('receive() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          const answerMediaObject = localSdpObject.media
              .find((m) => String(m.mid) === mid);
          // May need to modify codec parameters in the answer based on codec
          // parameters in the offer.
          sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
          });
          answer = { type: 'answer', sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
          logger.debug('receive() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
          const stream = this._pc.getRemoteStreams()
              .find((s) => s.id === streamId);
          const track = stream.getTrackById(localId);
          if (!track)
              throw new Error('remote track not found');
          // Insert into the map.
          this._mapRecvLocalIdInfo.set(localId, { mid, rtpParameters });
          return { localId, track };
      }
      async stopReceiving(localId) {
          this._assertRecvDirection();
          logger.debug('stopReceiving() [localId:%s]', localId);
          const { mid, rtpParameters } = this._mapRecvLocalIdInfo.get(localId) || {};
          // Remove from the map.
          this._mapRecvLocalIdInfo.delete(localId);
          this._remoteSdp.planBStopReceiving({ mid: mid, offerRtpParameters: rtpParameters });
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopReceiving() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug('stopReceiving() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async getReceiverStats(localId) {
          throw new errors_1.UnsupportedError('not implemented');
      }
      async receiveDataChannel({ sctpStreamParameters, label, protocol }) {
          this._assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
              negotiated: true,
              id: streamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmitTime: maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('receiveDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // If this is the first DataChannel we need to create the SDP offer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              this._remoteSdp.receiveSctpAssociation({ oldDataChannelSpec: true });
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              if (!this._transportReady) {
                  const localSdpObject = sdpTransform.parse(answer.sdp);
                  await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
              }
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
      }
      async _setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject)
              localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          // Get our local DTLS parameters.
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({ sdpObject: localSdpObject });
          // Set our DTLS role.
          dtlsParameters.role = localDtlsRole;
          // Update the remote DTLS role in the SDP.
          this._remoteSdp.updateDtlsRole(localDtlsRole === 'client' ? 'server' : 'client');
          // Need to tell the remote transport about our parameters.
          await this.safeEmitAsPromise('@connect', { dtlsParameters });
          this._transportReady = true;
      }
      _assertSendDirection() {
          if (this._direction !== 'send') {
              throw new Error('method can just be called for handlers with "send" direction');
          }
      }
      _assertRecvDirection() {
          if (this._direction !== 'recv') {
              throw new Error('method can just be called for handlers with "recv" direction');
          }
      }
  }
  exports.Chrome55 = Chrome55;
  
  },{"../Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","../errors":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/errors.js","../ortc":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/ortc.js","../utils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js","./HandlerInterface":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/HandlerInterface.js","./sdp/RemoteSdp":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/RemoteSdp.js","./sdp/commonUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/commonUtils.js","./sdp/planBUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/planBUtils.js","sdp-transform":"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Chrome67.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Chrome67 = void 0;
  const sdpTransform = __importStar(require("sdp-transform"));
  const Logger_1 = require("../Logger");
  const utils = __importStar(require("../utils"));
  const ortc = __importStar(require("../ortc"));
  const sdpCommonUtils = __importStar(require("./sdp/commonUtils"));
  const sdpPlanBUtils = __importStar(require("./sdp/planBUtils"));
  const HandlerInterface_1 = require("./HandlerInterface");
  const RemoteSdp_1 = require("./sdp/RemoteSdp");
  const logger = new Logger_1.Logger('Chrome67');
  const SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
  class Chrome67 extends HandlerInterface_1.HandlerInterface {
      constructor() {
          super();
          // Local stream for sending.
          this._sendStream = new MediaStream();
          // Map of RTCRtpSender indexed by localId.
          this._mapSendLocalIdRtpSender = new Map();
          // Next sending localId.
          this._nextSendLocalId = 0;
          // Map of MID, RTP parameters and RTCRtpReceiver indexed by local id.
          // Value is an Object with mid, rtpParameters and rtpReceiver.
          this._mapRecvLocalIdInfo = new Map();
          // Whether a DataChannel m=application section has been created.
          this._hasDataChannelMediaSection = false;
          // Sending DataChannel id value counter. Incremented for each new DataChannel.
          this._nextSendSctpStreamId = 0;
          // Got transport local and remote parameters.
          this._transportReady = false;
      }
      /**
       * Creates a factory function.
       */
      static createFactory() {
          return () => new Chrome67();
      }
      get name() {
          return 'Chrome67';
      }
      close() {
          logger.debug('close()');
          // Close RTCPeerConnection.
          if (this._pc) {
              try {
                  this._pc.close();
              }
              catch (error) { }
          }
      }
      async getNativeRtpCapabilities() {
          logger.debug('getNativeRtpCapabilities()');
          const pc = new RTCPeerConnection({
              iceServers: [],
              iceTransportPolicy: 'all',
              bundlePolicy: 'max-bundle',
              rtcpMuxPolicy: 'require',
              sdpSemantics: 'plan-b'
          });
          try {
              const offer = await pc.createOffer({
                  offerToReceiveAudio: true,
                  offerToReceiveVideo: true
              });
              try {
                  pc.close();
              }
              catch (error) { }
              const sdpObject = sdpTransform.parse(offer.sdp);
              const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({ sdpObject });
              return nativeRtpCapabilities;
          }
          catch (error) {
              try {
                  pc.close();
              }
              catch (error2) { }
              throw error;
          }
      }
      async getNativeSctpCapabilities() {
          logger.debug('getNativeSctpCapabilities()');
          return {
              numStreams: SCTP_NUM_STREAMS
          };
      }
      run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          logger.debug('run()');
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
              iceParameters,
              iceCandidates,
              dtlsParameters,
              sctpParameters,
              planB: true
          });
          this._sendingRtpParametersByKind =
              {
                  audio: ortc.getSendingRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRtpParameters('video', extendedRtpCapabilities)
              };
          this._sendingRemoteRtpParametersByKind =
              {
                  audio: ortc.getSendingRemoteRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRemoteRtpParameters('video', extendedRtpCapabilities)
              };
          this._pc = new RTCPeerConnection(Object.assign({ iceServers: iceServers || [], iceTransportPolicy: iceTransportPolicy || 'all', bundlePolicy: 'max-bundle', rtcpMuxPolicy: 'require', sdpSemantics: 'plan-b' }, additionalSettings), proprietaryConstraints);
          // Handle RTCPeerConnection connection status.
          this._pc.addEventListener('iceconnectionstatechange', () => {
              switch (this._pc.iceConnectionState) {
                  case 'checking':
                      this.emit('@connectionstatechange', 'connecting');
                      break;
                  case 'connected':
                  case 'completed':
                      this.emit('@connectionstatechange', 'connected');
                      break;
                  case 'failed':
                      this.emit('@connectionstatechange', 'failed');
                      break;
                  case 'disconnected':
                      this.emit('@connectionstatechange', 'disconnected');
                      break;
                  case 'closed':
                      this.emit('@connectionstatechange', 'closed');
                      break;
              }
          });
      }
      async updateIceServers(iceServers) {
          logger.debug('updateIceServers()');
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
      }
      async restartIce(iceParameters) {
          logger.debug('restartIce()');
          // Provide the remote SDP handler with new remote ICE parameters.
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady)
              return;
          if (this._direction === 'send') {
              const offer = await this._pc.createOffer({ iceRestart: true });
              logger.debug('restartIce() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
          }
          else {
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              logger.debug('restartIce() | calling pc.setLocalDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
          }
      }
      async getTransportStats() {
          return this._pc.getStats();
      }
      async send({ track, encodings, codecOptions, codec }) {
          this._assertSendDirection();
          logger.debug('send() [kind:%s, track.id:%s]', track.kind, track.id);
          if (codec) {
              logger.warn('send() | codec selection is not available in %s handler', this.name);
          }
          this._sendStream.addTrack(track);
          this._pc.addTrack(track, this._sendStream);
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          let offerMediaObject;
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind], {});
          sendingRtpParameters.codecs =
              ortc.reduceCodecs(sendingRtpParameters.codecs);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind], {});
          sendingRemoteRtpParameters.codecs =
              ortc.reduceCodecs(sendingRemoteRtpParameters.codecs);
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
          if (track.kind === 'video' && encodings && encodings.length > 1) {
              logger.debug('send() | enabling simulcast');
              localSdpObject = sdpTransform.parse(offer.sdp);
              offerMediaObject = localSdpObject.media
                  .find((m) => m.type === 'video');
              sdpPlanBUtils.addLegacySimulcast({
                  offerMediaObject,
                  track,
                  numStreams: encodings.length
              });
              offer = { type: 'offer', sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug('send() | calling pc.setLocalDescription() [offer:%o]', offer);
          await this._pc.setLocalDescription(offer);
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media
              .find((m) => m.type === track.kind);
          // Set RTCP CNAME.
          sendingRtpParameters.rtcp.cname =
              sdpCommonUtils.getCname({ offerMediaObject });
          // Set RTP encodings.
          sendingRtpParameters.encodings =
              sdpPlanBUtils.getRtpEncodings({ offerMediaObject, track });
          // Complete encodings with given values.
          if (encodings) {
              for (let idx = 0; idx < sendingRtpParameters.encodings.length; ++idx) {
                  if (encodings[idx])
                      Object.assign(sendingRtpParameters.encodings[idx], encodings[idx]);
              }
          }
          // If VP8 and there is effective simulcast, add scalabilityMode to each
          // encoding.
          if (sendingRtpParameters.encodings.length > 1 &&
              sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/vp8') {
              for (const encoding of sendingRtpParameters.encodings) {
                  encoding.scalabilityMode = 'S1T3';
              }
          }
          this._remoteSdp.send({
              offerMediaObject,
              offerRtpParameters: sendingRtpParameters,
              answerRtpParameters: sendingRemoteRtpParameters,
              codecOptions
          });
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('send() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
          const localId = String(this._nextSendLocalId);
          this._nextSendLocalId++;
          const rtpSender = this._pc.getSenders()
              .find((s) => s.track === track);
          // Insert into the map.
          this._mapSendLocalIdRtpSender.set(localId, rtpSender);
          return {
              localId: localId,
              rtpParameters: sendingRtpParameters,
              rtpSender
          };
      }
      async stopSending(localId) {
          this._assertSendDirection();
          logger.debug('stopSending() [localId:%s]', localId);
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender)
              throw new Error('associated RTCRtpSender not found');
          this._pc.removeTrack(rtpSender);
          if (rtpSender.track)
              this._sendStream.removeTrack(rtpSender.track);
          this._mapSendLocalIdRtpSender.delete(localId);
          const offer = await this._pc.createOffer();
          logger.debug('stopSending() | calling pc.setLocalDescription() [offer:%o]', offer);
          try {
              await this._pc.setLocalDescription(offer);
          }
          catch (error) {
              // NOTE: If there are no sending tracks, setLocalDescription() will fail with
              // "Failed to create channels". If so, ignore it.
              if (this._sendStream.getTracks().length === 0) {
                  logger.warn('stopSending() | ignoring expected error due no sending tracks: %s', error.toString());
                  return;
              }
              throw error;
          }
          if (this._pc.signalingState === 'stable')
              return;
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopSending() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
      }
      async replaceTrack(localId, track) {
          this._assertSendDirection();
          if (track) {
              logger.debug('replaceTrack() [localId:%s, track.id:%s]', localId, track.id);
          }
          else {
              logger.debug('replaceTrack() [localId:%s, no track]', localId);
          }
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender)
              throw new Error('associated RTCRtpSender not found');
          const oldTrack = rtpSender.track;
          await rtpSender.replaceTrack(track);
          // Remove the old track from the local stream.
          if (oldTrack)
              this._sendStream.removeTrack(oldTrack);
          // Add the new track to the local stream.
          if (track)
              this._sendStream.addTrack(track);
      }
      async setMaxSpatialLayer(localId, spatialLayer) {
          this._assertSendDirection();
          logger.debug('setMaxSpatialLayer() [localId:%s, spatialLayer:%s]', localId, spatialLayer);
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender)
              throw new Error('associated RTCRtpSender not found');
          const parameters = rtpSender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
              if (idx <= spatialLayer)
                  encoding.active = true;
              else
                  encoding.active = false;
          });
          await rtpSender.setParameters(parameters);
      }
      async setRtpEncodingParameters(localId, params) {
          this._assertSendDirection();
          logger.debug('setRtpEncodingParameters() [localId:%s, params:%o]', localId, params);
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender)
              throw new Error('associated RTCRtpSender not found');
          const parameters = rtpSender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
              parameters.encodings[idx] = Object.assign(Object.assign({}, encoding), params);
          });
          await rtpSender.setParameters(parameters);
      }
      async getSenderStats(localId) {
          this._assertSendDirection();
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender)
              throw new Error('associated RTCRtpSender not found');
          return rtpSender.getStats();
      }
      async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol }) {
          this._assertSendDirection();
          const options = {
              negotiated: true,
              id: this._nextSendSctpStreamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmitTime: maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('sendDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // Increase next id.
          this._nextSendSctpStreamId =
              ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          // If this is the first DataChannel we need to create the SDP answer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              const offer = await this._pc.createOffer();
              const localSdpObject = sdpTransform.parse(offer.sdp);
              const offerMediaObject = localSdpObject.media
                  .find((m) => m.type === 'application');
              if (!this._transportReady)
                  await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
              logger.debug('sendDataChannel() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              this._remoteSdp.sendSctpAssociation({ offerMediaObject });
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
              streamId: options.id,
              ordered: options.ordered,
              maxPacketLifeTime: options.maxPacketLifeTime,
              maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
      }
      async receive({ trackId, kind, rtpParameters }) {
          this._assertRecvDirection();
          logger.debug('receive() [trackId:%s, kind:%s]', trackId, kind);
          const localId = trackId;
          const mid = kind;
          this._remoteSdp.receive({
              mid,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: rtpParameters.rtcp.cname,
              trackId
          });
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('receive() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          const answerMediaObject = localSdpObject.media
              .find((m) => String(m.mid) === mid);
          // May need to modify codec parameters in the answer based on codec
          // parameters in the offer.
          sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
          });
          answer = { type: 'answer', sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
          logger.debug('receive() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
          const rtpReceiver = this._pc.getReceivers()
              .find((r) => r.track && r.track.id === localId);
          if (!rtpReceiver)
              throw new Error('new RTCRtpReceiver not');
          // Insert into the map.
          this._mapRecvLocalIdInfo.set(localId, { mid, rtpParameters, rtpReceiver });
          return {
              localId,
              track: rtpReceiver.track,
              rtpReceiver
          };
      }
      async stopReceiving(localId) {
          this._assertRecvDirection();
          logger.debug('stopReceiving() [localId:%s]', localId);
          const { mid, rtpParameters } = this._mapRecvLocalIdInfo.get(localId) || {};
          // Remove from the map.
          this._mapRecvLocalIdInfo.delete(localId);
          this._remoteSdp.planBStopReceiving({ mid: mid, offerRtpParameters: rtpParameters });
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopReceiving() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug('stopReceiving() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
      }
      async getReceiverStats(localId) {
          this._assertRecvDirection();
          const { rtpReceiver } = this._mapRecvLocalIdInfo.get(localId) || {};
          if (!rtpReceiver)
              throw new Error('associated RTCRtpReceiver not found');
          return rtpReceiver.getStats();
      }
      async receiveDataChannel({ sctpStreamParameters, label, protocol }) {
          this._assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
              negotiated: true,
              id: streamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmitTime: maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('receiveDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // If this is the first DataChannel we need to create the SDP offer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              this._remoteSdp.receiveSctpAssociation({ oldDataChannelSpec: true });
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              if (!this._transportReady) {
                  const localSdpObject = sdpTransform.parse(answer.sdp);
                  await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
              }
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
      }
      async _setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject)
              localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          // Get our local DTLS parameters.
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({ sdpObject: localSdpObject });
          // Set our DTLS role.
          dtlsParameters.role = localDtlsRole;
          // Update the remote DTLS role in the SDP.
          this._remoteSdp.updateDtlsRole(localDtlsRole === 'client' ? 'server' : 'client');
          // Need to tell the remote transport about our parameters.
          await this.safeEmitAsPromise('@connect', { dtlsParameters });
          this._transportReady = true;
      }
      _assertSendDirection() {
          if (this._direction !== 'send') {
              throw new Error('method can just be called for handlers with "send" direction');
          }
      }
      _assertRecvDirection() {
          if (this._direction !== 'recv') {
              throw new Error('method can just be called for handlers with "recv" direction');
          }
      }
  }
  exports.Chrome67 = Chrome67;
  
  },{"../Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","../ortc":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/ortc.js","../utils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js","./HandlerInterface":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/HandlerInterface.js","./sdp/RemoteSdp":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/RemoteSdp.js","./sdp/commonUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/commonUtils.js","./sdp/planBUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/planBUtils.js","sdp-transform":"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Chrome70.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Chrome70 = void 0;
  const sdpTransform = __importStar(require("sdp-transform"));
  const Logger_1 = require("../Logger");
  const utils = __importStar(require("../utils"));
  const ortc = __importStar(require("../ortc"));
  const sdpCommonUtils = __importStar(require("./sdp/commonUtils"));
  const sdpUnifiedPlanUtils = __importStar(require("./sdp/unifiedPlanUtils"));
  const HandlerInterface_1 = require("./HandlerInterface");
  const RemoteSdp_1 = require("./sdp/RemoteSdp");
  const scalabilityModes_1 = require("../scalabilityModes");
  const logger = new Logger_1.Logger('Chrome70');
  const SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
  class Chrome70 extends HandlerInterface_1.HandlerInterface {
      constructor() {
          super();
          // Map of RTCTransceivers indexed by MID.
          this._mapMidTransceiver = new Map();
          // Local stream for sending.
          this._sendStream = new MediaStream();
          // Whether a DataChannel m=application section has been created.
          this._hasDataChannelMediaSection = false;
          // Sending DataChannel id value counter. Incremented for each new DataChannel.
          this._nextSendSctpStreamId = 0;
          // Got transport local and remote parameters.
          this._transportReady = false;
      }
      /**
       * Creates a factory function.
       */
      static createFactory() {
          return () => new Chrome70();
      }
      get name() {
          return 'Chrome70';
      }
      close() {
          logger.debug('close()');
          // Close RTCPeerConnection.
          if (this._pc) {
              try {
                  this._pc.close();
              }
              catch (error) { }
          }
      }
      async getNativeRtpCapabilities() {
          logger.debug('getNativeRtpCapabilities()');
          const pc = new RTCPeerConnection({
              iceServers: [],
              iceTransportPolicy: 'all',
              bundlePolicy: 'max-bundle',
              rtcpMuxPolicy: 'require',
              sdpSemantics: 'unified-plan'
          });
          try {
              pc.addTransceiver('audio');
              pc.addTransceiver('video');
              const offer = await pc.createOffer();
              try {
                  pc.close();
              }
              catch (error) { }
              const sdpObject = sdpTransform.parse(offer.sdp);
              const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({ sdpObject });
              return nativeRtpCapabilities;
          }
          catch (error) {
              try {
                  pc.close();
              }
              catch (error2) { }
              throw error;
          }
      }
      async getNativeSctpCapabilities() {
          logger.debug('getNativeSctpCapabilities()');
          return {
              numStreams: SCTP_NUM_STREAMS
          };
      }
      run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          logger.debug('run()');
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
              iceParameters,
              iceCandidates,
              dtlsParameters,
              sctpParameters
          });
          this._sendingRtpParametersByKind =
              {
                  audio: ortc.getSendingRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRtpParameters('video', extendedRtpCapabilities)
              };
          this._sendingRemoteRtpParametersByKind =
              {
                  audio: ortc.getSendingRemoteRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRemoteRtpParameters('video', extendedRtpCapabilities)
              };
          this._pc = new RTCPeerConnection(Object.assign({ iceServers: iceServers || [], iceTransportPolicy: iceTransportPolicy || 'all', bundlePolicy: 'max-bundle', rtcpMuxPolicy: 'require', sdpSemantics: 'unified-plan' }, additionalSettings), proprietaryConstraints);
          // Handle RTCPeerConnection connection status.
          this._pc.addEventListener('iceconnectionstatechange', () => {
              switch (this._pc.iceConnectionState) {
                  case 'checking':
                      this.emit('@connectionstatechange', 'connecting');
                      break;
                  case 'connected':
                  case 'completed':
                      this.emit('@connectionstatechange', 'connected');
                      break;
                  case 'failed':
                      this.emit('@connectionstatechange', 'failed');
                      break;
                  case 'disconnected':
                      this.emit('@connectionstatechange', 'disconnected');
                      break;
                  case 'closed':
                      this.emit('@connectionstatechange', 'closed');
                      break;
              }
          });
      }
      async updateIceServers(iceServers) {
          logger.debug('updateIceServers()');
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
      }
      async restartIce(iceParameters) {
          logger.debug('restartIce()');
          // Provide the remote SDP handler with new remote ICE parameters.
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady)
              return;
          if (this._direction === 'send') {
              const offer = await this._pc.createOffer({ iceRestart: true });
              logger.debug('restartIce() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
          }
          else {
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              logger.debug('restartIce() | calling pc.setLocalDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
          }
      }
      async getTransportStats() {
          return this._pc.getStats();
      }
      async send({ track, encodings, codecOptions, codec }) {
          this._assertSendDirection();
          logger.debug('send() [kind:%s, track.id:%s]', track.kind, track.id);
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind], {});
          // This may throw.
          sendingRtpParameters.codecs =
              ortc.reduceCodecs(sendingRtpParameters.codecs, codec);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind], {});
          // This may throw.
          sendingRemoteRtpParameters.codecs =
              ortc.reduceCodecs(sendingRemoteRtpParameters.codecs, codec);
          const mediaSectionIdx = this._remoteSdp.getNextMediaSectionIdx();
          const transceiver = this._pc.addTransceiver(track, { direction: 'sendonly', streams: [this._sendStream] });
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          let offerMediaObject;
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
          if (encodings && encodings.length > 1) {
              logger.debug('send() | enabling legacy simulcast');
              localSdpObject = sdpTransform.parse(offer.sdp);
              offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
              sdpUnifiedPlanUtils.addLegacySimulcast({
                  offerMediaObject,
                  numStreams: encodings.length
              });
              offer = { type: 'offer', sdp: sdpTransform.write(localSdpObject) };
          }
          // Special case for VP9 with SVC.
          let hackVp9Svc = false;
          const layers = scalabilityModes_1.parse((encodings || [{}])[0].scalabilityMode);
          if (encodings &&
              encodings.length === 1 &&
              layers.spatialLayers > 1 &&
              sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/vp9') {
              logger.debug('send() | enabling legacy simulcast for VP9 SVC');
              hackVp9Svc = true;
              localSdpObject = sdpTransform.parse(offer.sdp);
              offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
              sdpUnifiedPlanUtils.addLegacySimulcast({
                  offerMediaObject,
                  numStreams: layers.spatialLayers
              });
              offer = { type: 'offer', sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug('send() | calling pc.setLocalDescription() [offer:%o]', offer);
          await this._pc.setLocalDescription(offer);
          // If encodings are given, apply them now.
          if (encodings) {
              logger.debug('send() | applying given encodings');
              const parameters = transceiver.sender.getParameters();
              for (let idx = 0; idx < (parameters.encodings || []).length; ++idx) {
                  const encoding = parameters.encodings[idx];
                  const desiredEncoding = encodings[idx];
                  // Should not happen but just in case.
                  if (!desiredEncoding)
                      break;
                  parameters.encodings[idx] = Object.assign(encoding, desiredEncoding);
              }
              await transceiver.sender.setParameters(parameters);
          }
          // We can now get the transceiver.mid.
          const localId = transceiver.mid;
          // Set MID.
          sendingRtpParameters.mid = localId;
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
          // Set RTCP CNAME.
          sendingRtpParameters.rtcp.cname =
              sdpCommonUtils.getCname({ offerMediaObject });
          // Set RTP encodings.
          sendingRtpParameters.encodings =
              sdpUnifiedPlanUtils.getRtpEncodings({ offerMediaObject });
          // Complete encodings with given values.
          if (encodings) {
              for (let idx = 0; idx < sendingRtpParameters.encodings.length; ++idx) {
                  if (encodings[idx])
                      Object.assign(sendingRtpParameters.encodings[idx], encodings[idx]);
              }
          }
          // Hack for VP9 SVC.
          if (hackVp9Svc) {
              sendingRtpParameters.encodings = [sendingRtpParameters.encodings[0]];
          }
          // If VP8 or H264 and there is effective simulcast, add scalabilityMode to
          // each encoding.
          if (sendingRtpParameters.encodings.length > 1 &&
              (sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/vp8' ||
                  sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/h264')) {
              for (const encoding of sendingRtpParameters.encodings) {
                  encoding.scalabilityMode = 'S1T3';
              }
          }
          this._remoteSdp.send({
              offerMediaObject,
              reuseMid: mediaSectionIdx.reuseMid,
              offerRtpParameters: sendingRtpParameters,
              answerRtpParameters: sendingRemoteRtpParameters,
              codecOptions
          });
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('send() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
          // Store in the map.
          this._mapMidTransceiver.set(localId, transceiver);
          return {
              localId,
              rtpParameters: sendingRtpParameters,
              rtpSender: transceiver.sender
          };
      }
      async stopSending(localId) {
          this._assertSendDirection();
          logger.debug('stopSending() [localId:%s]', localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          transceiver.sender.replaceTrack(null);
          this._pc.removeTrack(transceiver.sender);
          this._remoteSdp.closeMediaSection(transceiver.mid);
          const offer = await this._pc.createOffer();
          logger.debug('stopSending() | calling pc.setLocalDescription() [offer:%o]', offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopSending() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
      }
      async replaceTrack(localId, track) {
          this._assertSendDirection();
          if (track) {
              logger.debug('replaceTrack() [localId:%s, track.id:%s]', localId, track.id);
          }
          else {
              logger.debug('replaceTrack() [localId:%s, no track]', localId);
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          await transceiver.sender.replaceTrack(track);
      }
      async setMaxSpatialLayer(localId, spatialLayer) {
          this._assertSendDirection();
          logger.debug('setMaxSpatialLayer() [localId:%s, spatialLayer:%s]', localId, spatialLayer);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
              if (idx <= spatialLayer)
                  encoding.active = true;
              else
                  encoding.active = false;
          });
          await transceiver.sender.setParameters(parameters);
      }
      async setRtpEncodingParameters(localId, params) {
          this._assertSendDirection();
          logger.debug('setRtpEncodingParameters() [localId:%s, params:%o]', localId, params);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
              parameters.encodings[idx] = Object.assign(Object.assign({}, encoding), params);
          });
          await transceiver.sender.setParameters(parameters);
      }
      async getSenderStats(localId) {
          this._assertSendDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          return transceiver.sender.getStats();
      }
      async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol }) {
          this._assertSendDirection();
          const options = {
              negotiated: true,
              id: this._nextSendSctpStreamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmitTime: maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('sendDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // Increase next id.
          this._nextSendSctpStreamId =
              ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          // If this is the first DataChannel we need to create the SDP answer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              const offer = await this._pc.createOffer();
              const localSdpObject = sdpTransform.parse(offer.sdp);
              const offerMediaObject = localSdpObject.media
                  .find((m) => m.type === 'application');
              if (!this._transportReady)
                  await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
              logger.debug('sendDataChannel() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              this._remoteSdp.sendSctpAssociation({ offerMediaObject });
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
              streamId: options.id,
              ordered: options.ordered,
              maxPacketLifeTime: options.maxPacketLifeTime,
              maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
      }
      async receive({ trackId, kind, rtpParameters }) {
          this._assertRecvDirection();
          logger.debug('receive() [trackId:%s, kind:%s]', trackId, kind);
          const localId = rtpParameters.mid || String(this._mapMidTransceiver.size);
          this._remoteSdp.receive({
              mid: localId,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: rtpParameters.rtcp.cname,
              trackId
          });
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('receive() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          const answerMediaObject = localSdpObject.media
              .find((m) => String(m.mid) === localId);
          // May need to modify codec parameters in the answer based on codec
          // parameters in the offer.
          sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
          });
          answer = { type: 'answer', sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
          logger.debug('receive() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
          const transceiver = this._pc.getTransceivers()
              .find((t) => t.mid === localId);
          if (!transceiver)
              throw new Error('new RTCRtpTransceiver not found');
          // Store in the map.
          this._mapMidTransceiver.set(localId, transceiver);
          return {
              localId,
              track: transceiver.receiver.track,
              rtpReceiver: transceiver.receiver
          };
      }
      async stopReceiving(localId) {
          this._assertRecvDirection();
          logger.debug('stopReceiving() [localId:%s]', localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          this._remoteSdp.closeMediaSection(transceiver.mid);
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopReceiving() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug('stopReceiving() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
      }
      async getReceiverStats(localId) {
          this._assertRecvDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          return transceiver.receiver.getStats();
      }
      async receiveDataChannel({ sctpStreamParameters, label, protocol }) {
          this._assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
              negotiated: true,
              id: streamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmitTime: maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('receiveDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // If this is the first DataChannel we need to create the SDP offer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              this._remoteSdp.receiveSctpAssociation();
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              if (!this._transportReady) {
                  const localSdpObject = sdpTransform.parse(answer.sdp);
                  await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
              }
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
      }
      async _setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject)
              localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          // Get our local DTLS parameters.
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({ sdpObject: localSdpObject });
          // Set our DTLS role.
          dtlsParameters.role = localDtlsRole;
          // Update the remote DTLS role in the SDP.
          this._remoteSdp.updateDtlsRole(localDtlsRole === 'client' ? 'server' : 'client');
          // Need to tell the remote transport about our parameters.
          await this.safeEmitAsPromise('@connect', { dtlsParameters });
          this._transportReady = true;
      }
      _assertSendDirection() {
          if (this._direction !== 'send') {
              throw new Error('method can just be called for handlers with "send" direction');
          }
      }
      _assertRecvDirection() {
          if (this._direction !== 'recv') {
              throw new Error('method can just be called for handlers with "recv" direction');
          }
      }
  }
  exports.Chrome70 = Chrome70;
  
  },{"../Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","../ortc":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/ortc.js","../scalabilityModes":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/scalabilityModes.js","../utils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js","./HandlerInterface":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/HandlerInterface.js","./sdp/RemoteSdp":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/RemoteSdp.js","./sdp/commonUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/commonUtils.js","./sdp/unifiedPlanUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/unifiedPlanUtils.js","sdp-transform":"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Chrome74.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Chrome74 = void 0;
  const sdpTransform = __importStar(require("sdp-transform"));
  const Logger_1 = require("../Logger");
  const utils = __importStar(require("../utils"));
  const ortc = __importStar(require("../ortc"));
  const sdpCommonUtils = __importStar(require("./sdp/commonUtils"));
  const sdpUnifiedPlanUtils = __importStar(require("./sdp/unifiedPlanUtils"));
  const HandlerInterface_1 = require("./HandlerInterface");
  const RemoteSdp_1 = require("./sdp/RemoteSdp");
  const scalabilityModes_1 = require("../scalabilityModes");
  const logger = new Logger_1.Logger('Chrome74');
  const SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
  class Chrome74 extends HandlerInterface_1.HandlerInterface {
      constructor() {
          super();
          // Map of RTCTransceivers indexed by MID.
          this._mapMidTransceiver = new Map();
          // Local stream for sending.
          this._sendStream = new MediaStream();
          // Whether a DataChannel m=application section has been created.
          this._hasDataChannelMediaSection = false;
          // Sending DataChannel id value counter. Incremented for each new DataChannel.
          this._nextSendSctpStreamId = 0;
          // Got transport local and remote parameters.
          this._transportReady = false;
      }
      /**
       * Creates a factory function.
       */
      static createFactory() {
          return () => new Chrome74();
      }
      get name() {
          return 'Chrome74';
      }
      close() {
          logger.debug('close()');
          // Close RTCPeerConnection.
          if (this._pc) {
              try {
                  this._pc.close();
              }
              catch (error) { }
          }
      }
      async getNativeRtpCapabilities() {
          logger.debug('getNativeRtpCapabilities()');
          const pc = new RTCPeerConnection({
              iceServers: [],
              iceTransportPolicy: 'all',
              bundlePolicy: 'max-bundle',
              rtcpMuxPolicy: 'require',
              sdpSemantics: 'unified-plan'
          });
          try {
              pc.addTransceiver('audio');
              pc.addTransceiver('video');
              const offer = await pc.createOffer();
              try {
                  pc.close();
              }
              catch (error) { }
              const sdpObject = sdpTransform.parse(offer.sdp);
              const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({ sdpObject });
              return nativeRtpCapabilities;
          }
          catch (error) {
              try {
                  pc.close();
              }
              catch (error2) { }
              throw error;
          }
      }
      async getNativeSctpCapabilities() {
          logger.debug('getNativeSctpCapabilities()');
          return {
              numStreams: SCTP_NUM_STREAMS
          };
      }
      run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          logger.debug('run()');
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
              iceParameters,
              iceCandidates,
              dtlsParameters,
              sctpParameters
          });
          this._sendingRtpParametersByKind =
              {
                  audio: ortc.getSendingRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRtpParameters('video', extendedRtpCapabilities)
              };
          this._sendingRemoteRtpParametersByKind =
              {
                  audio: ortc.getSendingRemoteRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRemoteRtpParameters('video', extendedRtpCapabilities)
              };
          this._pc = new RTCPeerConnection(Object.assign({ iceServers: iceServers || [], iceTransportPolicy: iceTransportPolicy || 'all', bundlePolicy: 'max-bundle', rtcpMuxPolicy: 'require', sdpSemantics: 'unified-plan' }, additionalSettings), proprietaryConstraints);
          // Handle RTCPeerConnection connection status.
          this._pc.addEventListener('iceconnectionstatechange', () => {
              switch (this._pc.iceConnectionState) {
                  case 'checking':
                      this.emit('@connectionstatechange', 'connecting');
                      break;
                  case 'connected':
                  case 'completed':
                      this.emit('@connectionstatechange', 'connected');
                      break;
                  case 'failed':
                      this.emit('@connectionstatechange', 'failed');
                      break;
                  case 'disconnected':
                      this.emit('@connectionstatechange', 'disconnected');
                      break;
                  case 'closed':
                      this.emit('@connectionstatechange', 'closed');
                      break;
              }
          });
      }
      async updateIceServers(iceServers) {
          logger.debug('updateIceServers()');
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
      }
      async restartIce(iceParameters) {
          logger.debug('restartIce()');
          // Provide the remote SDP handler with new remote ICE parameters.
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady)
              return;
          if (this._direction === 'send') {
              const offer = await this._pc.createOffer({ iceRestart: true });
              logger.debug('restartIce() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
          }
          else {
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              logger.debug('restartIce() | calling pc.setLocalDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
          }
      }
      async getTransportStats() {
          return this._pc.getStats();
      }
      async send({ track, encodings, codecOptions, codec }) {
          this._assertSendDirection();
          logger.debug('send() [kind:%s, track.id:%s]', track.kind, track.id);
          if (encodings && encodings.length > 1) {
              encodings.forEach((encoding, idx) => {
                  encoding.rid = `r${idx}`;
              });
          }
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind], {});
          // This may throw.
          sendingRtpParameters.codecs =
              ortc.reduceCodecs(sendingRtpParameters.codecs, codec);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind], {});
          // This may throw.
          sendingRemoteRtpParameters.codecs =
              ortc.reduceCodecs(sendingRemoteRtpParameters.codecs, codec);
          const mediaSectionIdx = this._remoteSdp.getNextMediaSectionIdx();
          const transceiver = this._pc.addTransceiver(track, {
              direction: 'sendonly',
              streams: [this._sendStream],
              sendEncodings: encodings
          });
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          let offerMediaObject;
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
          // Special case for VP9 with SVC.
          let hackVp9Svc = false;
          const layers = scalabilityModes_1.parse((encodings || [{}])[0].scalabilityMode);
          if (encodings &&
              encodings.length === 1 &&
              layers.spatialLayers > 1 &&
              sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/vp9') {
              logger.debug('send() | enabling legacy simulcast for VP9 SVC');
              hackVp9Svc = true;
              localSdpObject = sdpTransform.parse(offer.sdp);
              offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
              sdpUnifiedPlanUtils.addLegacySimulcast({
                  offerMediaObject,
                  numStreams: layers.spatialLayers
              });
              offer = { type: 'offer', sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug('send() | calling pc.setLocalDescription() [offer:%o]', offer);
          await this._pc.setLocalDescription(offer);
          // We can now get the transceiver.mid.
          const localId = transceiver.mid;
          // Set MID.
          sendingRtpParameters.mid = localId;
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
          // Set RTCP CNAME.
          sendingRtpParameters.rtcp.cname =
              sdpCommonUtils.getCname({ offerMediaObject });
          // Set RTP encodings by parsing the SDP offer if no encodings are given.
          if (!encodings) {
              sendingRtpParameters.encodings =
                  sdpUnifiedPlanUtils.getRtpEncodings({ offerMediaObject });
          }
          // Set RTP encodings by parsing the SDP offer and complete them with given
          // one if just a single encoding has been given.
          else if (encodings.length === 1) {
              let newEncodings = sdpUnifiedPlanUtils.getRtpEncodings({ offerMediaObject });
              Object.assign(newEncodings[0], encodings[0]);
              // Hack for VP9 SVC.
              if (hackVp9Svc)
                  newEncodings = [newEncodings[0]];
              sendingRtpParameters.encodings = newEncodings;
          }
          // Otherwise if more than 1 encoding are given use them verbatim.
          else {
              sendingRtpParameters.encodings = encodings;
          }
          // If VP8 or H264 and there is effective simulcast, add scalabilityMode to
          // each encoding.
          if (sendingRtpParameters.encodings.length > 1 &&
              (sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/vp8' ||
                  sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/h264')) {
              for (const encoding of sendingRtpParameters.encodings) {
                  encoding.scalabilityMode = 'S1T3';
              }
          }
          this._remoteSdp.send({
              offerMediaObject,
              reuseMid: mediaSectionIdx.reuseMid,
              offerRtpParameters: sendingRtpParameters,
              answerRtpParameters: sendingRemoteRtpParameters,
              codecOptions,
              extmapAllowMixed: true
          });
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('send() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
          // Store in the map.
          this._mapMidTransceiver.set(localId, transceiver);
          return {
              localId,
              rtpParameters: sendingRtpParameters,
              rtpSender: transceiver.sender
          };
      }
      async stopSending(localId) {
          this._assertSendDirection();
          logger.debug('stopSending() [localId:%s]', localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          transceiver.sender.replaceTrack(null);
          this._pc.removeTrack(transceiver.sender);
          this._remoteSdp.closeMediaSection(transceiver.mid);
          const offer = await this._pc.createOffer();
          logger.debug('stopSending() | calling pc.setLocalDescription() [offer:%o]', offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopSending() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
      }
      async replaceTrack(localId, track) {
          this._assertSendDirection();
          if (track) {
              logger.debug('replaceTrack() [localId:%s, track.id:%s]', localId, track.id);
          }
          else {
              logger.debug('replaceTrack() [localId:%s, no track]', localId);
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          await transceiver.sender.replaceTrack(track);
      }
      async setMaxSpatialLayer(localId, spatialLayer) {
          this._assertSendDirection();
          logger.debug('setMaxSpatialLayer() [localId:%s, spatialLayer:%s]', localId, spatialLayer);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
              if (idx <= spatialLayer)
                  encoding.active = true;
              else
                  encoding.active = false;
          });
          await transceiver.sender.setParameters(parameters);
      }
      async setRtpEncodingParameters(localId, params) {
          this._assertSendDirection();
          logger.debug('setRtpEncodingParameters() [localId:%s, params:%o]', localId, params);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
              parameters.encodings[idx] = Object.assign(Object.assign({}, encoding), params);
          });
          await transceiver.sender.setParameters(parameters);
      }
      async getSenderStats(localId) {
          this._assertSendDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          return transceiver.sender.getStats();
      }
      async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol }) {
          this._assertSendDirection();
          const options = {
              negotiated: true,
              id: this._nextSendSctpStreamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('sendDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // Increase next id.
          this._nextSendSctpStreamId =
              ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          // If this is the first DataChannel we need to create the SDP answer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              const offer = await this._pc.createOffer();
              const localSdpObject = sdpTransform.parse(offer.sdp);
              const offerMediaObject = localSdpObject.media
                  .find((m) => m.type === 'application');
              if (!this._transportReady)
                  await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
              logger.debug('sendDataChannel() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              this._remoteSdp.sendSctpAssociation({ offerMediaObject });
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
              streamId: options.id,
              ordered: options.ordered,
              maxPacketLifeTime: options.maxPacketLifeTime,
              maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
      }
      async receive({ trackId, kind, rtpParameters }) {
          this._assertRecvDirection();
          logger.debug('receive() [trackId:%s, kind:%s]', trackId, kind);
          const localId = rtpParameters.mid || String(this._mapMidTransceiver.size);
          this._remoteSdp.receive({
              mid: localId,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: rtpParameters.rtcp.cname,
              trackId
          });
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('receive() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          const answerMediaObject = localSdpObject.media
              .find((m) => String(m.mid) === localId);
          // May need to modify codec parameters in the answer based on codec
          // parameters in the offer.
          sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
          });
          answer = { type: 'answer', sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
          logger.debug('receive() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
          const transceiver = this._pc.getTransceivers()
              .find((t) => t.mid === localId);
          if (!transceiver)
              throw new Error('new RTCRtpTransceiver not found');
          // Store in the map.
          this._mapMidTransceiver.set(localId, transceiver);
          return {
              localId,
              track: transceiver.receiver.track,
              rtpReceiver: transceiver.receiver
          };
      }
      async stopReceiving(localId) {
          this._assertRecvDirection();
          logger.debug('stopReceiving() [localId:%s]', localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          this._remoteSdp.closeMediaSection(transceiver.mid);
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopReceiving() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug('stopReceiving() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
      }
      async getReceiverStats(localId) {
          this._assertRecvDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          return transceiver.receiver.getStats();
      }
      async receiveDataChannel({ sctpStreamParameters, label, protocol }) {
          this._assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
              negotiated: true,
              id: streamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('receiveDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // If this is the first DataChannel we need to create the SDP offer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              this._remoteSdp.receiveSctpAssociation();
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              if (!this._transportReady) {
                  const localSdpObject = sdpTransform.parse(answer.sdp);
                  await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
              }
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
      }
      async _setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject)
              localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          // Get our local DTLS parameters.
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({ sdpObject: localSdpObject });
          // Set our DTLS role.
          dtlsParameters.role = localDtlsRole;
          // Update the remote DTLS role in the SDP.
          this._remoteSdp.updateDtlsRole(localDtlsRole === 'client' ? 'server' : 'client');
          // Need to tell the remote transport about our parameters.
          await this.safeEmitAsPromise('@connect', { dtlsParameters });
          this._transportReady = true;
      }
      _assertSendDirection() {
          if (this._direction !== 'send') {
              throw new Error('method can just be called for handlers with "send" direction');
          }
      }
      _assertRecvDirection() {
          if (this._direction !== 'recv') {
              throw new Error('method can just be called for handlers with "recv" direction');
          }
      }
  }
  exports.Chrome74 = Chrome74;
  
  },{"../Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","../ortc":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/ortc.js","../scalabilityModes":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/scalabilityModes.js","../utils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js","./HandlerInterface":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/HandlerInterface.js","./sdp/RemoteSdp":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/RemoteSdp.js","./sdp/commonUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/commonUtils.js","./sdp/unifiedPlanUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/unifiedPlanUtils.js","sdp-transform":"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Edge11.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Edge11 = void 0;
  const Logger_1 = require("../Logger");
  const errors_1 = require("../errors");
  const utils = __importStar(require("../utils"));
  const ortc = __importStar(require("../ortc"));
  const edgeUtils = __importStar(require("./ortc/edgeUtils"));
  const HandlerInterface_1 = require("./HandlerInterface");
  const logger = new Logger_1.Logger('Edge11');
  class Edge11 extends HandlerInterface_1.HandlerInterface {
      constructor() {
          super();
          // Map of RTCRtpSenders indexed by id.
          this._rtpSenders = new Map();
          // Map of RTCRtpReceivers indexed by id.
          this._rtpReceivers = new Map();
          // Next localId for sending tracks.
          this._nextSendLocalId = 0;
          // Got transport local and remote parameters.
          this._transportReady = false;
      }
      /**
       * Creates a factory function.
       */
      static createFactory() {
          return () => new Edge11();
      }
      get name() {
          return 'Edge11';
      }
      close() {
          logger.debug('close()');
          // Close the ICE gatherer.
          // NOTE: Not yet implemented by Edge.
          try {
              this._iceGatherer.close();
          }
          catch (error) { }
          // Close the ICE transport.
          try {
              this._iceTransport.stop();
          }
          catch (error) { }
          // Close the DTLS transport.
          try {
              this._dtlsTransport.stop();
          }
          catch (error) { }
          // Close RTCRtpSenders.
          for (const rtpSender of this._rtpSenders.values()) {
              try {
                  rtpSender.stop();
              }
              catch (error) { }
          }
          // Close RTCRtpReceivers.
          for (const rtpReceiver of this._rtpReceivers.values()) {
              try {
                  rtpReceiver.stop();
              }
              catch (error) { }
          }
      }
      async getNativeRtpCapabilities() {
          logger.debug('getNativeRtpCapabilities()');
          return edgeUtils.getCapabilities();
      }
      async getNativeSctpCapabilities() {
          logger.debug('getNativeSctpCapabilities()');
          return {
              numStreams: { OS: 0, MIS: 0 }
          };
      }
      run({ direction, // eslint-disable-line @typescript-eslint/no-unused-vars
      iceParameters, iceCandidates, dtlsParameters, sctpParameters, // eslint-disable-line @typescript-eslint/no-unused-vars
      iceServers, iceTransportPolicy, additionalSettings, // eslint-disable-line @typescript-eslint/no-unused-vars
      proprietaryConstraints, // eslint-disable-line @typescript-eslint/no-unused-vars
      extendedRtpCapabilities }) {
          logger.debug('run()');
          this._sendingRtpParametersByKind =
              {
                  audio: ortc.getSendingRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRtpParameters('video', extendedRtpCapabilities)
              };
          this._remoteIceParameters = iceParameters;
          this._remoteIceCandidates = iceCandidates;
          this._remoteDtlsParameters = dtlsParameters;
          this._cname = `CNAME-${utils.generateRandomNumber()}`;
          this._setIceGatherer({ iceServers, iceTransportPolicy });
          this._setIceTransport();
          this._setDtlsTransport();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async updateIceServers(iceServers) {
          // NOTE: Edge 11 does not implement iceGatherer.gater().
          throw new errors_1.UnsupportedError('not supported');
      }
      async restartIce(iceParameters) {
          logger.debug('restartIce()');
          this._remoteIceParameters = iceParameters;
          if (!this._transportReady)
              return;
          logger.debug('restartIce() | calling iceTransport.start()');
          this._iceTransport.start(this._iceGatherer, iceParameters, 'controlling');
          for (const candidate of this._remoteIceCandidates) {
              this._iceTransport.addRemoteCandidate(candidate);
          }
          this._iceTransport.addRemoteCandidate({});
      }
      async getTransportStats() {
          return this._iceTransport.getStats();
      }
      async send(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { track, encodings, codecOptions, codec }) {
          logger.debug('send() [kind:%s, track.id:%s]', track.kind, track.id);
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'server' });
          logger.debug('send() | calling new RTCRtpSender()');
          const rtpSender = new RTCRtpSender(track, this._dtlsTransport);
          const rtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind], {});
          rtpParameters.codecs = ortc.reduceCodecs(rtpParameters.codecs, codec);
          const useRtx = rtpParameters.codecs
              .some((_codec) => /.+\/rtx$/i.test(_codec.mimeType));
          if (!encodings)
              encodings = [{}];
          for (const encoding of encodings) {
              encoding.ssrc = utils.generateRandomNumber();
              if (useRtx)
                  encoding.rtx = { ssrc: utils.generateRandomNumber() };
          }
          rtpParameters.encodings = encodings;
          // Fill RTCRtpParameters.rtcp.
          rtpParameters.rtcp =
              {
                  cname: this._cname,
                  reducedSize: true,
                  mux: true
              };
          // NOTE: Convert our standard RTCRtpParameters into those that Edge
          // expects.
          const edgeRtpParameters = edgeUtils.mangleRtpParameters(rtpParameters);
          logger.debug('send() | calling rtpSender.send() [params:%o]', edgeRtpParameters);
          await rtpSender.send(edgeRtpParameters);
          const localId = String(this._nextSendLocalId);
          this._nextSendLocalId++;
          // Store it.
          this._rtpSenders.set(localId, rtpSender);
          return { localId, rtpParameters, rtpSender };
      }
      async stopSending(localId) {
          logger.debug('stopSending() [localId:%s]', localId);
          const rtpSender = this._rtpSenders.get(localId);
          if (!rtpSender)
              throw new Error('RTCRtpSender not found');
          this._rtpSenders.delete(localId);
          try {
              logger.debug('stopSending() | calling rtpSender.stop()');
              rtpSender.stop();
          }
          catch (error) {
              logger.warn('stopSending() | rtpSender.stop() failed:%o', error);
              throw error;
          }
      }
      async replaceTrack(localId, track) {
          if (track) {
              logger.debug('replaceTrack() [localId:%s, track.id:%s]', localId, track.id);
          }
          else {
              logger.debug('replaceTrack() [localId:%s, no track]', localId);
          }
          const rtpSender = this._rtpSenders.get(localId);
          if (!rtpSender)
              throw new Error('RTCRtpSender not found');
          rtpSender.setTrack(track);
      }
      async setMaxSpatialLayer(localId, spatialLayer) {
          logger.debug('setMaxSpatialLayer() [localId:%s, spatialLayer:%s]', localId, spatialLayer);
          const rtpSender = this._rtpSenders.get(localId);
          if (!rtpSender)
              throw new Error('RTCRtpSender not found');
          const parameters = rtpSender.getParameters();
          parameters.encodings
              .forEach((encoding, idx) => {
              if (idx <= spatialLayer)
                  encoding.active = true;
              else
                  encoding.active = false;
          });
          await rtpSender.setParameters(parameters);
      }
      async setRtpEncodingParameters(localId, params) {
          logger.debug('setRtpEncodingParameters() [localId:%s, params:%o]', localId, params);
          const rtpSender = this._rtpSenders.get(localId);
          if (!rtpSender)
              throw new Error('RTCRtpSender not found');
          const parameters = rtpSender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
              parameters.encodings[idx] = Object.assign(Object.assign({}, encoding), params);
          });
          await rtpSender.setParameters(parameters);
      }
      async getSenderStats(localId) {
          const rtpSender = this._rtpSenders.get(localId);
          if (!rtpSender)
              throw new Error('RTCRtpSender not found');
          return rtpSender.getStats();
      }
      async sendDataChannel(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      options) {
          throw new errors_1.UnsupportedError('not implemented');
      }
      async receive({ trackId, kind, rtpParameters }) {
          logger.debug('receive() [trackId:%s, kind:%s]', trackId, kind);
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'server' });
          logger.debug('receive() | calling new RTCRtpReceiver()');
          const rtpReceiver = new RTCRtpReceiver(this._dtlsTransport, kind);
          rtpReceiver.addEventListener('error', (event) => {
              logger.error('rtpReceiver "error" event [event:%o]', event);
          });
          // NOTE: Convert our standard RTCRtpParameters into those that Edge
          // expects.
          const edgeRtpParameters = edgeUtils.mangleRtpParameters(rtpParameters);
          logger.debug('receive() | calling rtpReceiver.receive() [params:%o]', edgeRtpParameters);
          await rtpReceiver.receive(edgeRtpParameters);
          const localId = trackId;
          // Store it.
          this._rtpReceivers.set(localId, rtpReceiver);
          return {
              localId,
              track: rtpReceiver.track,
              rtpReceiver
          };
      }
      async stopReceiving(localId) {
          logger.debug('stopReceiving() [localId:%s]', localId);
          const rtpReceiver = this._rtpReceivers.get(localId);
          if (!rtpReceiver)
              throw new Error('RTCRtpReceiver not found');
          this._rtpReceivers.delete(localId);
          try {
              logger.debug('stopReceiving() | calling rtpReceiver.stop()');
              rtpReceiver.stop();
          }
          catch (error) {
              logger.warn('stopReceiving() | rtpReceiver.stop() failed:%o', error);
          }
      }
      async getReceiverStats(localId) {
          const rtpReceiver = this._rtpReceivers.get(localId);
          if (!rtpReceiver)
              throw new Error('RTCRtpReceiver not found');
          return rtpReceiver.getStats();
      }
      async receiveDataChannel(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      options) {
          throw new errors_1.UnsupportedError('not implemented');
      }
      _setIceGatherer({ iceServers, iceTransportPolicy }) {
          const iceGatherer = new RTCIceGatherer({
              iceServers: iceServers || [],
              gatherPolicy: iceTransportPolicy || 'all'
          });
          iceGatherer.addEventListener('error', (event) => {
              logger.error('iceGatherer "error" event [event:%o]', event);
          });
          // NOTE: Not yet implemented by Edge, which starts gathering automatically.
          try {
              iceGatherer.gather();
          }
          catch (error) {
              logger.debug('_setIceGatherer() | iceGatherer.gather() failed: %s', error.toString());
          }
          this._iceGatherer = iceGatherer;
      }
      _setIceTransport() {
          const iceTransport = new RTCIceTransport(this._iceGatherer);
          // NOTE: Not yet implemented by Edge.
          iceTransport.addEventListener('statechange', () => {
              switch (iceTransport.state) {
                  case 'checking':
                      this.emit('@connectionstatechange', 'connecting');
                      break;
                  case 'connected':
                  case 'completed':
                      this.emit('@connectionstatechange', 'connected');
                      break;
                  case 'failed':
                      this.emit('@connectionstatechange', 'failed');
                      break;
                  case 'disconnected':
                      this.emit('@connectionstatechange', 'disconnected');
                      break;
                  case 'closed':
                      this.emit('@connectionstatechange', 'closed');
                      break;
              }
          });
          // NOTE: Not standard, but implemented by Edge.
          iceTransport.addEventListener('icestatechange', () => {
              switch (iceTransport.state) {
                  case 'checking':
                      this.emit('@connectionstatechange', 'connecting');
                      break;
                  case 'connected':
                  case 'completed':
                      this.emit('@connectionstatechange', 'connected');
                      break;
                  case 'failed':
                      this.emit('@connectionstatechange', 'failed');
                      break;
                  case 'disconnected':
                      this.emit('@connectionstatechange', 'disconnected');
                      break;
                  case 'closed':
                      this.emit('@connectionstatechange', 'closed');
                      break;
              }
          });
          iceTransport.addEventListener('candidatepairchange', (event) => {
              logger.debug('iceTransport "candidatepairchange" event [pair:%o]', event.pair);
          });
          this._iceTransport = iceTransport;
      }
      _setDtlsTransport() {
          const dtlsTransport = new RTCDtlsTransport(this._iceTransport);
          // NOTE: Not yet implemented by Edge.
          dtlsTransport.addEventListener('statechange', () => {
              logger.debug('dtlsTransport "statechange" event [state:%s]', dtlsTransport.state);
          });
          // NOTE: Not standard, but implemented by Edge.
          dtlsTransport.addEventListener('dtlsstatechange', () => {
              logger.debug('dtlsTransport "dtlsstatechange" event [state:%s]', dtlsTransport.state);
              if (dtlsTransport.state === 'closed')
                  this.emit('@connectionstatechange', 'closed');
          });
          dtlsTransport.addEventListener('error', (event) => {
              logger.error('dtlsTransport "error" event [event:%o]', event);
          });
          this._dtlsTransport = dtlsTransport;
      }
      async _setupTransport({ localDtlsRole }) {
          logger.debug('_setupTransport()');
          // Get our local DTLS parameters.
          const dtlsParameters = this._dtlsTransport.getLocalParameters();
          dtlsParameters.role = localDtlsRole;
          // Need to tell the remote transport about our parameters.
          await this.safeEmitAsPromise('@connect', { dtlsParameters });
          // Start the RTCIceTransport.
          this._iceTransport.start(this._iceGatherer, this._remoteIceParameters, 'controlling');
          // Add remote ICE candidates.
          for (const candidate of this._remoteIceCandidates) {
              this._iceTransport.addRemoteCandidate(candidate);
          }
          // Also signal a 'complete' candidate as per spec.
          // NOTE: It should be {complete: true} but Edge prefers {}.
          // NOTE: If we don't signal end of candidates, the Edge RTCIceTransport
          // won't enter the 'completed' state.
          this._iceTransport.addRemoteCandidate({});
          // NOTE: Edge does not like SHA less than 256.
          this._remoteDtlsParameters.fingerprints = this._remoteDtlsParameters.fingerprints
              .filter((fingerprint) => {
              return (fingerprint.algorithm === 'sha-256' ||
                  fingerprint.algorithm === 'sha-384' ||
                  fingerprint.algorithm === 'sha-512');
          });
          // Start the RTCDtlsTransport.
          this._dtlsTransport.start(this._remoteDtlsParameters);
          this._transportReady = true;
      }
  }
  exports.Edge11 = Edge11;
  
  },{"../Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","../errors":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/errors.js","../ortc":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/ortc.js","../utils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js","./HandlerInterface":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/HandlerInterface.js","./ortc/edgeUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/ortc/edgeUtils.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Firefox60.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Firefox60 = void 0;
  const sdpTransform = __importStar(require("sdp-transform"));
  const Logger_1 = require("../Logger");
  const errors_1 = require("../errors");
  const utils = __importStar(require("../utils"));
  const ortc = __importStar(require("../ortc"));
  const sdpCommonUtils = __importStar(require("./sdp/commonUtils"));
  const sdpUnifiedPlanUtils = __importStar(require("./sdp/unifiedPlanUtils"));
  const HandlerInterface_1 = require("./HandlerInterface");
  const RemoteSdp_1 = require("./sdp/RemoteSdp");
  const logger = new Logger_1.Logger('Firefox60');
  const SCTP_NUM_STREAMS = { OS: 16, MIS: 2048 };
  class Firefox60 extends HandlerInterface_1.HandlerInterface {
      constructor() {
          super();
          // Map of RTCTransceivers indexed by MID.
          this._mapMidTransceiver = new Map();
          // Local stream for sending.
          this._sendStream = new MediaStream();
          // Whether a DataChannel m=application section has been created.
          this._hasDataChannelMediaSection = false;
          // Sending DataChannel id value counter. Incremented for each new DataChannel.
          this._nextSendSctpStreamId = 0;
          // Got transport local and remote parameters.
          this._transportReady = false;
      }
      /**
       * Creates a factory function.
       */
      static createFactory() {
          return () => new Firefox60();
      }
      get name() {
          return 'Firefox60';
      }
      close() {
          logger.debug('close()');
          // Close RTCPeerConnection.
          if (this._pc) {
              try {
                  this._pc.close();
              }
              catch (error) { }
          }
      }
      async getNativeRtpCapabilities() {
          logger.debug('getNativeRtpCapabilities()');
          const pc = new RTCPeerConnection({
              iceServers: [],
              iceTransportPolicy: 'all',
              bundlePolicy: 'max-bundle',
              rtcpMuxPolicy: 'require'
          });
          // NOTE: We need to add a real video track to get the RID extension mapping.
          const canvas = document.createElement('canvas');
          // NOTE: Otherwise Firefox fails in next line.
          canvas.getContext('2d');
          const fakeStream = canvas.captureStream();
          const fakeVideoTrack = fakeStream.getVideoTracks()[0];
          try {
              pc.addTransceiver('audio', { direction: 'sendrecv' });
              const videoTransceiver = pc.addTransceiver(fakeVideoTrack, { direction: 'sendrecv' });
              const parameters = videoTransceiver.sender.getParameters();
              const encodings = [
                  { rid: 'r0', maxBitrate: 100000 },
                  { rid: 'r1', maxBitrate: 500000 }
              ];
              parameters.encodings = encodings;
              await videoTransceiver.sender.setParameters(parameters);
              const offer = await pc.createOffer();
              try {
                  canvas.remove();
              }
              catch (error) { }
              try {
                  fakeVideoTrack.stop();
              }
              catch (error) { }
              try {
                  pc.close();
              }
              catch (error) { }
              const sdpObject = sdpTransform.parse(offer.sdp);
              const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({ sdpObject });
              return nativeRtpCapabilities;
          }
          catch (error) {
              try {
                  canvas.remove();
              }
              catch (error2) { }
              try {
                  fakeVideoTrack.stop();
              }
              catch (error2) { }
              try {
                  pc.close();
              }
              catch (error2) { }
              throw error;
          }
      }
      async getNativeSctpCapabilities() {
          logger.debug('getNativeSctpCapabilities()');
          return {
              numStreams: SCTP_NUM_STREAMS
          };
      }
      run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          logger.debug('run()');
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
              iceParameters,
              iceCandidates,
              dtlsParameters,
              sctpParameters
          });
          this._sendingRtpParametersByKind =
              {
                  audio: ortc.getSendingRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRtpParameters('video', extendedRtpCapabilities)
              };
          this._sendingRemoteRtpParametersByKind =
              {
                  audio: ortc.getSendingRemoteRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRemoteRtpParameters('video', extendedRtpCapabilities)
              };
          this._pc = new RTCPeerConnection(Object.assign({ iceServers: iceServers || [], iceTransportPolicy: iceTransportPolicy || 'all', bundlePolicy: 'max-bundle', rtcpMuxPolicy: 'require' }, additionalSettings), proprietaryConstraints);
          // Handle RTCPeerConnection connection status.
          this._pc.addEventListener('iceconnectionstatechange', () => {
              switch (this._pc.iceConnectionState) {
                  case 'checking':
                      this.emit('@connectionstatechange', 'connecting');
                      break;
                  case 'connected':
                  case 'completed':
                      this.emit('@connectionstatechange', 'connected');
                      break;
                  case 'failed':
                      this.emit('@connectionstatechange', 'failed');
                      break;
                  case 'disconnected':
                      this.emit('@connectionstatechange', 'disconnected');
                      break;
                  case 'closed':
                      this.emit('@connectionstatechange', 'closed');
                      break;
              }
          });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async updateIceServers(iceServers) {
          // NOTE: Firefox does not implement pc.setConfiguration().
          throw new errors_1.UnsupportedError('not supported');
      }
      async restartIce(iceParameters) {
          logger.debug('restartIce()');
          // Provide the remote SDP handler with new remote ICE parameters.
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady)
              return;
          if (this._direction === 'send') {
              const offer = await this._pc.createOffer({ iceRestart: true });
              logger.debug('restartIce() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
          }
          else {
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              logger.debug('restartIce() | calling pc.setLocalDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
          }
      }
      async getTransportStats() {
          return this._pc.getStats();
      }
      async send({ track, encodings, codecOptions, codec }) {
          this._assertSendDirection();
          logger.debug('send() [kind:%s, track.id:%s]', track.kind, track.id);
          if (encodings) {
              encodings = utils.clone(encodings, []);
              if (encodings.length > 1) {
                  encodings.forEach((encoding, idx) => {
                      encoding.rid = `r${idx}`;
                  });
                  // Clone the encodings and reverse them because Firefox likes them
                  // from high to low.
                  encodings.reverse();
              }
          }
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind], {});
          // This may throw.
          sendingRtpParameters.codecs =
              ortc.reduceCodecs(sendingRtpParameters.codecs, codec);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind], {});
          // This may throw.
          sendingRemoteRtpParameters.codecs =
              ortc.reduceCodecs(sendingRemoteRtpParameters.codecs, codec);
          // NOTE: Firefox fails sometimes to properly anticipate the closed media
          // section that it should use, so don't reuse closed media sections.
          //   https://github.com/versatica/mediasoup-client/issues/104
          //
          // const mediaSectionIdx = this._remoteSdp!.getNextMediaSectionIdx();
          const transceiver = this._pc.addTransceiver(track, { direction: 'sendonly', streams: [this._sendStream] });
          // NOTE: This is not spec compliants. Encodings should be given in addTransceiver
          // second argument, but Firefox does not support it.
          if (encodings) {
              const parameters = transceiver.sender.getParameters();
              parameters.encodings = encodings;
              await transceiver.sender.setParameters(parameters);
          }
          const offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          // In Firefox use DTLS role client even if we are the "offerer" since
          // Firefox does not respect ICE-Lite.
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
          logger.debug('send() | calling pc.setLocalDescription() [offer:%o]', offer);
          await this._pc.setLocalDescription(offer);
          // We can now get the transceiver.mid.
          const localId = transceiver.mid;
          // Set MID.
          sendingRtpParameters.mid = localId;
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          const offerMediaObject = localSdpObject.media[localSdpObject.media.length - 1];
          // Set RTCP CNAME.
          sendingRtpParameters.rtcp.cname =
              sdpCommonUtils.getCname({ offerMediaObject });
          // Set RTP encodings by parsing the SDP offer if no encodings are given.
          if (!encodings) {
              sendingRtpParameters.encodings =
                  sdpUnifiedPlanUtils.getRtpEncodings({ offerMediaObject });
          }
          // Set RTP encodings by parsing the SDP offer and complete them with given
          // one if just a single encoding has been given.
          else if (encodings.length === 1) {
              const newEncodings = sdpUnifiedPlanUtils.getRtpEncodings({ offerMediaObject });
              Object.assign(newEncodings[0], encodings[0]);
              sendingRtpParameters.encodings = newEncodings;
          }
          // Otherwise if more than 1 encoding are given use them verbatim (but
          // reverse them back since we reversed them above to satisfy Firefox).
          else {
              sendingRtpParameters.encodings = encodings.reverse();
          }
          // If VP8 or H264 and there is effective simulcast, add scalabilityMode to
          // each encoding.
          if (sendingRtpParameters.encodings.length > 1 &&
              (sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/vp8' ||
                  sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/h264')) {
              for (const encoding of sendingRtpParameters.encodings) {
                  encoding.scalabilityMode = 'S1T3';
              }
          }
          this._remoteSdp.send({
              offerMediaObject,
              offerRtpParameters: sendingRtpParameters,
              answerRtpParameters: sendingRemoteRtpParameters,
              codecOptions,
              extmapAllowMixed: true
          });
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('send() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
          // Store in the map.
          this._mapMidTransceiver.set(localId, transceiver);
          return {
              localId,
              rtpParameters: sendingRtpParameters,
              rtpSender: transceiver.sender
          };
      }
      async stopSending(localId) {
          logger.debug('stopSending() [localId:%s]', localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated transceiver not found');
          transceiver.sender.replaceTrack(null);
          this._pc.removeTrack(transceiver.sender);
          // NOTE: Cannot use closeMediaSection() due to the the note above in send()
          // method.
          // this._remoteSdp!.closeMediaSection(transceiver.mid);
          this._remoteSdp.disableMediaSection(transceiver.mid);
          const offer = await this._pc.createOffer();
          logger.debug('stopSending() | calling pc.setLocalDescription() [offer:%o]', offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopSending() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
      }
      async replaceTrack(localId, track) {
          this._assertSendDirection();
          if (track) {
              logger.debug('replaceTrack() [localId:%s, track.id:%s]', localId, track.id);
          }
          else {
              logger.debug('replaceTrack() [localId:%s, no track]', localId);
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          await transceiver.sender.replaceTrack(track);
      }
      async setMaxSpatialLayer(localId, spatialLayer) {
          this._assertSendDirection();
          logger.debug('setMaxSpatialLayer() [localId:%s, spatialLayer:%s]', localId, spatialLayer);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated transceiver not found');
          const parameters = transceiver.sender.getParameters();
          // NOTE: We require encodings given from low to high, however Firefox
          // requires them in reverse order, so do magic here.
          spatialLayer = parameters.encodings.length - 1 - spatialLayer;
          parameters.encodings.forEach((encoding, idx) => {
              if (idx >= spatialLayer)
                  encoding.active = true;
              else
                  encoding.active = false;
          });
          await transceiver.sender.setParameters(parameters);
      }
      async setRtpEncodingParameters(localId, params) {
          this._assertSendDirection();
          logger.debug('setRtpEncodingParameters() [localId:%s, params:%o]', localId, params);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
              parameters.encodings[idx] = Object.assign(Object.assign({}, encoding), params);
          });
          await transceiver.sender.setParameters(parameters);
      }
      async getSenderStats(localId) {
          this._assertSendDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          return transceiver.sender.getStats();
      }
      async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol }) {
          this._assertSendDirection();
          const options = {
              negotiated: true,
              id: this._nextSendSctpStreamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('sendDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // Increase next id.
          this._nextSendSctpStreamId =
              ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          // If this is the first DataChannel we need to create the SDP answer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              const offer = await this._pc.createOffer();
              const localSdpObject = sdpTransform.parse(offer.sdp);
              const offerMediaObject = localSdpObject.media
                  .find((m) => m.type === 'application');
              if (!this._transportReady)
                  await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
              logger.debug('sendDataChannel() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              this._remoteSdp.sendSctpAssociation({ offerMediaObject });
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
              streamId: options.id,
              ordered: options.ordered,
              maxPacketLifeTime: options.maxPacketLifeTime,
              maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
      }
      async receive({ trackId, kind, rtpParameters }) {
          this._assertRecvDirection();
          logger.debug('receive() [trackId:%s, kind:%s]', trackId, kind);
          const localId = rtpParameters.mid || String(this._mapMidTransceiver.size);
          this._remoteSdp.receive({
              mid: localId,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: rtpParameters.rtcp.cname,
              trackId
          });
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('receive() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          const answerMediaObject = localSdpObject.media
              .find((m) => String(m.mid) === localId);
          // May need to modify codec parameters in the answer based on codec
          // parameters in the offer.
          sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
          });
          answer = { type: 'answer', sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
          logger.debug('receive() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
          const transceiver = this._pc.getTransceivers()
              .find((t) => t.mid === localId);
          if (!transceiver)
              throw new Error('new RTCRtpTransceiver not found');
          // Store in the map.
          this._mapMidTransceiver.set(localId, transceiver);
          return {
              localId,
              track: transceiver.receiver.track,
              rtpReceiver: transceiver.receiver
          };
      }
      async stopReceiving(localId) {
          this._assertRecvDirection();
          logger.debug('stopReceiving() [localId:%s]', localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          this._remoteSdp.closeMediaSection(transceiver.mid);
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopReceiving() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug('stopReceiving() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
      }
      async getReceiverStats(localId) {
          this._assertRecvDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          return transceiver.receiver.getStats();
      }
      async receiveDataChannel({ sctpStreamParameters, label, protocol }) {
          this._assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
              negotiated: true,
              id: streamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('receiveDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // If this is the first DataChannel we need to create the SDP offer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              this._remoteSdp.receiveSctpAssociation();
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              if (!this._transportReady) {
                  const localSdpObject = sdpTransform.parse(answer.sdp);
                  await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
              }
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
      }
      async _setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject)
              localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          // Get our local DTLS parameters.
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({ sdpObject: localSdpObject });
          // Set our DTLS role.
          dtlsParameters.role = localDtlsRole;
          // Update the remote DTLS role in the SDP.
          this._remoteSdp.updateDtlsRole(localDtlsRole === 'client' ? 'server' : 'client');
          // Need to tell the remote transport about our parameters.
          await this.safeEmitAsPromise('@connect', { dtlsParameters });
          this._transportReady = true;
      }
      _assertSendDirection() {
          if (this._direction !== 'send') {
              throw new Error('method can just be called for handlers with "send" direction');
          }
      }
      _assertRecvDirection() {
          if (this._direction !== 'recv') {
              throw new Error('method can just be called for handlers with "recv" direction');
          }
      }
  }
  exports.Firefox60 = Firefox60;
  
  },{"../Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","../errors":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/errors.js","../ortc":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/ortc.js","../utils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js","./HandlerInterface":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/HandlerInterface.js","./sdp/RemoteSdp":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/RemoteSdp.js","./sdp/commonUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/commonUtils.js","./sdp/unifiedPlanUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/unifiedPlanUtils.js","sdp-transform":"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/HandlerInterface.js":[function(require,module,exports){
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HandlerInterface = void 0;
  const EnhancedEventEmitter_1 = require("../EnhancedEventEmitter");
  class HandlerInterface extends EnhancedEventEmitter_1.EnhancedEventEmitter {
      /**
       * @emits @connect - (
       *     { dtlsParameters: DtlsParameters },
       *     callback: Function,
       *     errback: Function
       *   )
       * @emits @connectionstatechange - (connectionState: ConnectionState)
       */
      constructor() {
          super();
      }
  }
  exports.HandlerInterface = HandlerInterface;
  
  },{"../EnhancedEventEmitter":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/EnhancedEventEmitter.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/ReactNative.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ReactNative = void 0;
  const sdpTransform = __importStar(require("sdp-transform"));
  const Logger_1 = require("../Logger");
  const errors_1 = require("../errors");
  const utils = __importStar(require("../utils"));
  const ortc = __importStar(require("../ortc"));
  const sdpCommonUtils = __importStar(require("./sdp/commonUtils"));
  const sdpPlanBUtils = __importStar(require("./sdp/planBUtils"));
  const HandlerInterface_1 = require("./HandlerInterface");
  const RemoteSdp_1 = require("./sdp/RemoteSdp");
  const logger = new Logger_1.Logger('ReactNative');
  const SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
  class ReactNative extends HandlerInterface_1.HandlerInterface {
      constructor() {
          super();
          // Local stream for sending.
          this._sendStream = new MediaStream();
          // Map of sending MediaStreamTracks indexed by localId.
          this._mapSendLocalIdTrack = new Map();
          // Next sending localId.
          this._nextSendLocalId = 0;
          // Map of MID, RTP parameters and RTCRtpReceiver indexed by local id.
          // Value is an Object with mid, rtpParameters and rtpReceiver.
          this._mapRecvLocalIdInfo = new Map();
          // Whether a DataChannel m=application section has been created.
          this._hasDataChannelMediaSection = false;
          // Sending DataChannel id value counter. Incremented for each new DataChannel.
          this._nextSendSctpStreamId = 0;
          // Got transport local and remote parameters.
          this._transportReady = false;
      }
      /**
       * Creates a factory function.
       */
      static createFactory() {
          return () => new ReactNative();
      }
      get name() {
          return 'ReactNative';
      }
      close() {
          logger.debug('close()');
          // Close RTCPeerConnection.
          if (this._pc) {
              try {
                  this._pc.close();
              }
              catch (error) { }
          }
      }
      async getNativeRtpCapabilities() {
          logger.debug('getNativeRtpCapabilities()');
          const pc = new RTCPeerConnection({
              iceServers: [],
              iceTransportPolicy: 'all',
              bundlePolicy: 'max-bundle',
              rtcpMuxPolicy: 'require',
              sdpSemantics: 'plan-b'
          });
          try {
              const offer = await pc.createOffer({
                  offerToReceiveAudio: true,
                  offerToReceiveVideo: true
              });
              try {
                  pc.close();
              }
              catch (error) { }
              const sdpObject = sdpTransform.parse(offer.sdp);
              const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({ sdpObject });
              return nativeRtpCapabilities;
          }
          catch (error) {
              try {
                  pc.close();
              }
              catch (error2) { }
              throw error;
          }
      }
      async getNativeSctpCapabilities() {
          logger.debug('getNativeSctpCapabilities()');
          return {
              numStreams: SCTP_NUM_STREAMS
          };
      }
      run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          logger.debug('run()');
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
              iceParameters,
              iceCandidates,
              dtlsParameters,
              sctpParameters,
              planB: true
          });
          this._sendingRtpParametersByKind =
              {
                  audio: ortc.getSendingRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRtpParameters('video', extendedRtpCapabilities)
              };
          this._sendingRemoteRtpParametersByKind =
              {
                  audio: ortc.getSendingRemoteRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRemoteRtpParameters('video', extendedRtpCapabilities)
              };
          this._pc = new RTCPeerConnection(Object.assign({ iceServers: iceServers || [], iceTransportPolicy: iceTransportPolicy || 'all', bundlePolicy: 'max-bundle', rtcpMuxPolicy: 'require', sdpSemantics: 'plan-b' }, additionalSettings), proprietaryConstraints);
          // Handle RTCPeerConnection connection status.
          this._pc.addEventListener('iceconnectionstatechange', () => {
              switch (this._pc.iceConnectionState) {
                  case 'checking':
                      this.emit('@connectionstatechange', 'connecting');
                      break;
                  case 'connected':
                  case 'completed':
                      this.emit('@connectionstatechange', 'connected');
                      break;
                  case 'failed':
                      this.emit('@connectionstatechange', 'failed');
                      break;
                  case 'disconnected':
                      this.emit('@connectionstatechange', 'disconnected');
                      break;
                  case 'closed':
                      this.emit('@connectionstatechange', 'closed');
                      break;
              }
          });
      }
      async updateIceServers(iceServers) {
          logger.debug('updateIceServers()');
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
      }
      async restartIce(iceParameters) {
          logger.debug('restartIce()');
          // Provide the remote SDP handler with new remote ICE parameters.
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady)
              return;
          if (this._direction === 'send') {
              const offer = await this._pc.createOffer({ iceRestart: true });
              logger.debug('restartIce() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
          }
          else {
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              logger.debug('restartIce() | calling pc.setLocalDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
          }
      }
      async getTransportStats() {
          return this._pc.getStats();
      }
      async send({ track, encodings, codecOptions, codec }) {
          this._assertSendDirection();
          logger.debug('send() [kind:%s, track.id:%s]', track.kind, track.id);
          if (codec) {
              logger.warn('send() | codec selection is not available in %s handler', this.name);
          }
          this._sendStream.addTrack(track);
          this._pc.addStream(this._sendStream);
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          let offerMediaObject;
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind], {});
          sendingRtpParameters.codecs =
              ortc.reduceCodecs(sendingRtpParameters.codecs);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind], {});
          sendingRemoteRtpParameters.codecs =
              ortc.reduceCodecs(sendingRemoteRtpParameters.codecs);
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
          if (track.kind === 'video' && encodings && encodings.length > 1) {
              logger.debug('send() | enabling simulcast');
              localSdpObject = sdpTransform.parse(offer.sdp);
              offerMediaObject = localSdpObject.media
                  .find((m) => m.type === 'video');
              sdpPlanBUtils.addLegacySimulcast({
                  offerMediaObject,
                  track,
                  numStreams: encodings.length
              });
              offer = { type: 'offer', sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug('send() | calling pc.setLocalDescription() [offer:%o]', offer);
          await this._pc.setLocalDescription(offer);
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media
              .find((m) => m.type === track.kind);
          // Set RTCP CNAME.
          sendingRtpParameters.rtcp.cname =
              sdpCommonUtils.getCname({ offerMediaObject });
          // Set RTP encodings.
          sendingRtpParameters.encodings =
              sdpPlanBUtils.getRtpEncodings({ offerMediaObject, track });
          // Complete encodings with given values.
          if (encodings) {
              for (let idx = 0; idx < sendingRtpParameters.encodings.length; ++idx) {
                  if (encodings[idx])
                      Object.assign(sendingRtpParameters.encodings[idx], encodings[idx]);
              }
          }
          // If VP8 or H264 and there is effective simulcast, add scalabilityMode to
          // each encoding.
          if (sendingRtpParameters.encodings.length > 1 &&
              (sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/vp8' ||
                  sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/h264')) {
              for (const encoding of sendingRtpParameters.encodings) {
                  encoding.scalabilityMode = 'S1T3';
              }
          }
          this._remoteSdp.send({
              offerMediaObject,
              offerRtpParameters: sendingRtpParameters,
              answerRtpParameters: sendingRemoteRtpParameters,
              codecOptions
          });
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('send() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
          const localId = String(this._nextSendLocalId);
          this._nextSendLocalId++;
          // Insert into the map.
          this._mapSendLocalIdTrack.set(localId, track);
          return {
              localId: localId,
              rtpParameters: sendingRtpParameters
          };
      }
      async stopSending(localId) {
          this._assertSendDirection();
          logger.debug('stopSending() [localId:%s]', localId);
          const track = this._mapSendLocalIdTrack.get(localId);
          if (!track)
              throw new Error('track not found');
          this._mapSendLocalIdTrack.delete(localId);
          this._sendStream.removeTrack(track);
          this._pc.addStream(this._sendStream);
          const offer = await this._pc.createOffer();
          logger.debug('stopSending() | calling pc.setLocalDescription() [offer:%o]', offer);
          try {
              await this._pc.setLocalDescription(offer);
          }
          catch (error) {
              // NOTE: If there are no sending tracks, setLocalDescription() will fail with
              // "Failed to create channels". If so, ignore it.
              if (this._sendStream.getTracks().length === 0) {
                  logger.warn('stopSending() | ignoring expected error due no sending tracks: %s', error.toString());
                  return;
              }
              throw error;
          }
          if (this._pc.signalingState === 'stable')
              return;
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopSending() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
      }
      async replaceTrack(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      localId, track) {
          throw new errors_1.UnsupportedError('not implemented');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async setMaxSpatialLayer(localId, spatialLayer) {
          throw new errors_1.UnsupportedError('not implemented');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async setRtpEncodingParameters(localId, params) {
          throw new errors_1.UnsupportedError('not implemented');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async getSenderStats(localId) {
          throw new errors_1.UnsupportedError('not implemented');
      }
      async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol }) {
          this._assertSendDirection();
          const options = {
              negotiated: true,
              id: this._nextSendSctpStreamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmitTime: maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('sendDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // Increase next id.
          this._nextSendSctpStreamId =
              ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          // If this is the first DataChannel we need to create the SDP answer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              const offer = await this._pc.createOffer();
              const localSdpObject = sdpTransform.parse(offer.sdp);
              const offerMediaObject = localSdpObject.media
                  .find((m) => m.type === 'application');
              if (!this._transportReady)
                  await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
              logger.debug('sendDataChannel() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              this._remoteSdp.sendSctpAssociation({ offerMediaObject });
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
              streamId: options.id,
              ordered: options.ordered,
              maxPacketLifeTime: options.maxPacketLifeTime,
              maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
      }
      async receive({ trackId, kind, rtpParameters }) {
          this._assertRecvDirection();
          logger.debug('receive() [trackId:%s, kind:%s]', trackId, kind);
          const localId = trackId;
          const mid = kind;
          let streamId = rtpParameters.rtcp.cname;
          // NOTE: In React-Native we cannot reuse the same remote MediaStream for new
          // remote tracks. This is because react-native-webrtc does not react on new
          // tracks generated within already existing streams, so force the streamId
          // to be different.
          logger.debug('receive() | forcing a random remote streamId to avoid well known bug in react-native-webrtc');
          streamId += `-hack-${utils.generateRandomNumber()}`;
          this._remoteSdp.receive({
              mid,
              kind,
              offerRtpParameters: rtpParameters,
              streamId,
              trackId
          });
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('receive() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          const answerMediaObject = localSdpObject.media
              .find((m) => String(m.mid) === mid);
          // May need to modify codec parameters in the answer based on codec
          // parameters in the offer.
          sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
          });
          answer = { type: 'answer', sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
          logger.debug('receive() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
          const stream = this._pc.getRemoteStreams()
              .find((s) => s.id === streamId);
          const track = stream.getTrackById(localId);
          if (!track)
              throw new Error('remote track not found');
          // Insert into the map.
          this._mapRecvLocalIdInfo.set(localId, { mid, rtpParameters });
          return { localId, track };
      }
      async stopReceiving(localId) {
          this._assertRecvDirection();
          logger.debug('stopReceiving() [localId:%s]', localId);
          const { mid, rtpParameters } = this._mapRecvLocalIdInfo.get(localId) || {};
          // Remove from the map.
          this._mapRecvLocalIdInfo.delete(localId);
          this._remoteSdp.planBStopReceiving({ mid: mid, offerRtpParameters: rtpParameters });
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopReceiving() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug('stopReceiving() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async getReceiverStats(localId) {
          throw new errors_1.UnsupportedError('not implemented');
      }
      async receiveDataChannel({ sctpStreamParameters, label, protocol }) {
          this._assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
              negotiated: true,
              id: streamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmitTime: maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('receiveDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // If this is the first DataChannel we need to create the SDP offer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              this._remoteSdp.receiveSctpAssociation({ oldDataChannelSpec: true });
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              if (!this._transportReady) {
                  const localSdpObject = sdpTransform.parse(answer.sdp);
                  await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
              }
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
      }
      async _setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject)
              localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          // Get our local DTLS parameters.
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({ sdpObject: localSdpObject });
          // Set our DTLS role.
          dtlsParameters.role = localDtlsRole;
          // Update the remote DTLS role in the SDP.
          this._remoteSdp.updateDtlsRole(localDtlsRole === 'client' ? 'server' : 'client');
          // Need to tell the remote transport about our parameters.
          await this.safeEmitAsPromise('@connect', { dtlsParameters });
          this._transportReady = true;
      }
      _assertSendDirection() {
          if (this._direction !== 'send') {
              throw new Error('method can just be called for handlers with "send" direction');
          }
      }
      _assertRecvDirection() {
          if (this._direction !== 'recv') {
              throw new Error('method can just be called for handlers with "recv" direction');
          }
      }
  }
  exports.ReactNative = ReactNative;
  
  },{"../Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","../errors":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/errors.js","../ortc":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/ortc.js","../utils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js","./HandlerInterface":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/HandlerInterface.js","./sdp/RemoteSdp":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/RemoteSdp.js","./sdp/commonUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/commonUtils.js","./sdp/planBUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/planBUtils.js","sdp-transform":"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Safari11.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Safari11 = void 0;
  const sdpTransform = __importStar(require("sdp-transform"));
  const Logger_1 = require("../Logger");
  const utils = __importStar(require("../utils"));
  const ortc = __importStar(require("../ortc"));
  const sdpCommonUtils = __importStar(require("./sdp/commonUtils"));
  const sdpPlanBUtils = __importStar(require("./sdp/planBUtils"));
  const HandlerInterface_1 = require("./HandlerInterface");
  const RemoteSdp_1 = require("./sdp/RemoteSdp");
  const logger = new Logger_1.Logger('Safari11');
  const SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
  class Safari11 extends HandlerInterface_1.HandlerInterface {
      constructor() {
          super();
          // Local stream for sending.
          this._sendStream = new MediaStream();
          // Map of RTCRtpSender indexed by localId.
          this._mapSendLocalIdRtpSender = new Map();
          // Next sending localId.
          this._nextSendLocalId = 0;
          // Map of MID, RTP parameters and RTCRtpReceiver indexed by local id.
          // Value is an Object with mid, rtpParameters and rtpReceiver.
          this._mapRecvLocalIdInfo = new Map();
          // Whether a DataChannel m=application section has been created.
          this._hasDataChannelMediaSection = false;
          // Sending DataChannel id value counter. Incremented for each new DataChannel.
          this._nextSendSctpStreamId = 0;
          // Got transport local and remote parameters.
          this._transportReady = false;
      }
      /**
       * Creates a factory function.
       */
      static createFactory() {
          return () => new Safari11();
      }
      get name() {
          return 'Safari11';
      }
      close() {
          logger.debug('close()');
          // Close RTCPeerConnection.
          if (this._pc) {
              try {
                  this._pc.close();
              }
              catch (error) { }
          }
      }
      async getNativeRtpCapabilities() {
          logger.debug('getNativeRtpCapabilities()');
          const pc = new RTCPeerConnection({
              iceServers: [],
              iceTransportPolicy: 'all',
              bundlePolicy: 'max-bundle',
              rtcpMuxPolicy: 'require',
              sdpSemantics: 'plan-b'
          });
          try {
              const offer = await pc.createOffer({
                  offerToReceiveAudio: true,
                  offerToReceiveVideo: true
              });
              try {
                  pc.close();
              }
              catch (error) { }
              const sdpObject = sdpTransform.parse(offer.sdp);
              const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({ sdpObject });
              return nativeRtpCapabilities;
          }
          catch (error) {
              try {
                  pc.close();
              }
              catch (error2) { }
              throw error;
          }
      }
      async getNativeSctpCapabilities() {
          logger.debug('getNativeSctpCapabilities()');
          return {
              numStreams: SCTP_NUM_STREAMS
          };
      }
      run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          logger.debug('run()');
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
              iceParameters,
              iceCandidates,
              dtlsParameters,
              sctpParameters,
              planB: true
          });
          this._sendingRtpParametersByKind =
              {
                  audio: ortc.getSendingRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRtpParameters('video', extendedRtpCapabilities)
              };
          this._sendingRemoteRtpParametersByKind =
              {
                  audio: ortc.getSendingRemoteRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRemoteRtpParameters('video', extendedRtpCapabilities)
              };
          this._pc = new RTCPeerConnection(Object.assign({ iceServers: iceServers || [], iceTransportPolicy: iceTransportPolicy || 'all', bundlePolicy: 'max-bundle', rtcpMuxPolicy: 'require' }, additionalSettings), proprietaryConstraints);
          // Handle RTCPeerConnection connection status.
          this._pc.addEventListener('iceconnectionstatechange', () => {
              switch (this._pc.iceConnectionState) {
                  case 'checking':
                      this.emit('@connectionstatechange', 'connecting');
                      break;
                  case 'connected':
                  case 'completed':
                      this.emit('@connectionstatechange', 'connected');
                      break;
                  case 'failed':
                      this.emit('@connectionstatechange', 'failed');
                      break;
                  case 'disconnected':
                      this.emit('@connectionstatechange', 'disconnected');
                      break;
                  case 'closed':
                      this.emit('@connectionstatechange', 'closed');
                      break;
              }
          });
      }
      async updateIceServers(iceServers) {
          logger.debug('updateIceServers()');
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
      }
      async restartIce(iceParameters) {
          logger.debug('restartIce()');
          // Provide the remote SDP handler with new remote ICE parameters.
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady)
              return;
          if (this._direction === 'send') {
              const offer = await this._pc.createOffer({ iceRestart: true });
              logger.debug('restartIce() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
          }
          else {
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              logger.debug('restartIce() | calling pc.setLocalDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
          }
      }
      async getTransportStats() {
          return this._pc.getStats();
      }
      async send({ track, encodings, codecOptions, codec }) {
          this._assertSendDirection();
          logger.debug('send() [kind:%s, track.id:%s]', track.kind, track.id);
          if (codec) {
              logger.warn('send() | codec selection is not available in %s handler', this.name);
          }
          this._sendStream.addTrack(track);
          this._pc.addTrack(track, this._sendStream);
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          let offerMediaObject;
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind], {});
          sendingRtpParameters.codecs =
              ortc.reduceCodecs(sendingRtpParameters.codecs);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind], {});
          sendingRemoteRtpParameters.codecs =
              ortc.reduceCodecs(sendingRemoteRtpParameters.codecs);
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
          if (track.kind === 'video' && encodings && encodings.length > 1) {
              logger.debug('send() | enabling simulcast');
              localSdpObject = sdpTransform.parse(offer.sdp);
              offerMediaObject = localSdpObject.media.find((m) => m.type === 'video');
              sdpPlanBUtils.addLegacySimulcast({
                  offerMediaObject,
                  track,
                  numStreams: encodings.length
              });
              offer = { type: 'offer', sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug('send() | calling pc.setLocalDescription() [offer:%o]', offer);
          await this._pc.setLocalDescription(offer);
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media
              .find((m) => m.type === track.kind);
          // Set RTCP CNAME.
          sendingRtpParameters.rtcp.cname =
              sdpCommonUtils.getCname({ offerMediaObject });
          // Set RTP encodings.
          sendingRtpParameters.encodings =
              sdpPlanBUtils.getRtpEncodings({ offerMediaObject, track });
          // Complete encodings with given values.
          if (encodings) {
              for (let idx = 0; idx < sendingRtpParameters.encodings.length; ++idx) {
                  if (encodings[idx])
                      Object.assign(sendingRtpParameters.encodings[idx], encodings[idx]);
              }
          }
          // If VP8 and there is effective simulcast, add scalabilityMode to each
          // encoding.
          if (sendingRtpParameters.encodings.length > 1 &&
              sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/vp8') {
              for (const encoding of sendingRtpParameters.encodings) {
                  encoding.scalabilityMode = 'S1T3';
              }
          }
          this._remoteSdp.send({
              offerMediaObject,
              offerRtpParameters: sendingRtpParameters,
              answerRtpParameters: sendingRemoteRtpParameters,
              codecOptions
          });
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('send() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
          const localId = String(this._nextSendLocalId);
          this._nextSendLocalId++;
          const rtpSender = this._pc.getSenders()
              .find((s) => s.track === track);
          // Insert into the map.
          this._mapSendLocalIdRtpSender.set(localId, rtpSender);
          return {
              localId: localId,
              rtpParameters: sendingRtpParameters,
              rtpSender
          };
      }
      async stopSending(localId) {
          this._assertSendDirection();
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender)
              throw new Error('associated RTCRtpSender not found');
          if (rtpSender.track)
              this._sendStream.removeTrack(rtpSender.track);
          this._mapSendLocalIdRtpSender.delete(localId);
          const offer = await this._pc.createOffer();
          logger.debug('stopSending() | calling pc.setLocalDescription() [offer:%o]', offer);
          try {
              await this._pc.setLocalDescription(offer);
          }
          catch (error) {
              // NOTE: If there are no sending tracks, setLocalDescription() will fail with
              // "Failed to create channels". If so, ignore it.
              if (this._sendStream.getTracks().length === 0) {
                  logger.warn('stopSending() | ignoring expected error due no sending tracks: %s', error.toString());
                  return;
              }
              throw error;
          }
          if (this._pc.signalingState === 'stable')
              return;
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopSending() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
      }
      async replaceTrack(localId, track) {
          this._assertSendDirection();
          if (track) {
              logger.debug('replaceTrack() [localId:%s, track.id:%s]', localId, track.id);
          }
          else {
              logger.debug('replaceTrack() [localId:%s, no track]', localId);
          }
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender)
              throw new Error('associated RTCRtpSender not found');
          const oldTrack = rtpSender.track;
          await rtpSender.replaceTrack(track);
          // Remove the old track from the local stream.
          if (oldTrack)
              this._sendStream.removeTrack(oldTrack);
          // Add the new track to the local stream.
          if (track)
              this._sendStream.addTrack(track);
      }
      async setMaxSpatialLayer(localId, spatialLayer) {
          this._assertSendDirection();
          logger.debug('setMaxSpatialLayer() [localId:%s, spatialLayer:%s]', localId, spatialLayer);
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender)
              throw new Error('associated RTCRtpSender not found');
          const parameters = rtpSender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
              if (idx <= spatialLayer)
                  encoding.active = true;
              else
                  encoding.active = false;
          });
          await rtpSender.setParameters(parameters);
      }
      async setRtpEncodingParameters(localId, params) {
          this._assertSendDirection();
          logger.debug('setRtpEncodingParameters() [localId:%s, params:%o]', localId, params);
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender)
              throw new Error('associated RTCRtpSender not found');
          const parameters = rtpSender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
              parameters.encodings[idx] = Object.assign(Object.assign({}, encoding), params);
          });
          await rtpSender.setParameters(parameters);
      }
      async getSenderStats(localId) {
          this._assertSendDirection();
          const rtpSender = this._mapSendLocalIdRtpSender.get(localId);
          if (!rtpSender)
              throw new Error('associated RTCRtpSender not found');
          return rtpSender.getStats();
      }
      async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol }) {
          this._assertSendDirection();
          const options = {
              negotiated: true,
              id: this._nextSendSctpStreamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('sendDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // Increase next id.
          this._nextSendSctpStreamId =
              ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          // If this is the first DataChannel we need to create the SDP answer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              const offer = await this._pc.createOffer();
              const localSdpObject = sdpTransform.parse(offer.sdp);
              const offerMediaObject = localSdpObject.media
                  .find((m) => m.type === 'application');
              if (!this._transportReady)
                  await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
              logger.debug('sendDataChannel() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              this._remoteSdp.sendSctpAssociation({ offerMediaObject });
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
              streamId: options.id,
              ordered: options.ordered,
              maxPacketLifeTime: options.maxPacketLifeTime,
              maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
      }
      async receive({ trackId, kind, rtpParameters }) {
          this._assertRecvDirection();
          logger.debug('receive() [trackId:%s, kind:%s]', trackId, kind);
          const localId = trackId;
          const mid = kind;
          this._remoteSdp.receive({
              mid,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: rtpParameters.rtcp.cname,
              trackId
          });
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('receive() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          const answerMediaObject = localSdpObject.media
              .find((m) => String(m.mid) === mid);
          // May need to modify codec parameters in the answer based on codec
          // parameters in the offer.
          sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
          });
          answer = { type: 'answer', sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
          logger.debug('receive() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
          const rtpReceiver = this._pc.getReceivers()
              .find((r) => r.track && r.track.id === localId);
          if (!rtpReceiver)
              throw new Error('new RTCRtpReceiver not');
          // Insert into the map.
          this._mapRecvLocalIdInfo.set(localId, { mid, rtpParameters, rtpReceiver });
          return {
              localId,
              track: rtpReceiver.track,
              rtpReceiver
          };
      }
      async stopReceiving(localId) {
          this._assertRecvDirection();
          logger.debug('stopReceiving() [localId:%s]', localId);
          const { mid, rtpParameters } = this._mapRecvLocalIdInfo.get(localId) || {};
          // Remove from the map.
          this._mapRecvLocalIdInfo.delete(localId);
          this._remoteSdp.planBStopReceiving({ mid: mid, offerRtpParameters: rtpParameters });
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopReceiving() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug('stopReceiving() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
      }
      async getReceiverStats(localId) {
          this._assertRecvDirection();
          const { rtpReceiver } = this._mapRecvLocalIdInfo.get(localId) || {};
          if (!rtpReceiver)
              throw new Error('associated RTCRtpReceiver not found');
          return rtpReceiver.getStats();
      }
      async receiveDataChannel({ sctpStreamParameters, label, protocol }) {
          this._assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
              negotiated: true,
              id: streamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('receiveDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // If this is the first DataChannel we need to create the SDP offer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              this._remoteSdp.receiveSctpAssociation({ oldDataChannelSpec: true });
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              if (!this._transportReady) {
                  const localSdpObject = sdpTransform.parse(answer.sdp);
                  await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
              }
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
      }
      async _setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject)
              localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          // Get our local DTLS parameters.
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({ sdpObject: localSdpObject });
          // Set our DTLS role.
          dtlsParameters.role = localDtlsRole;
          // Update the remote DTLS role in the SDP.
          this._remoteSdp.updateDtlsRole(localDtlsRole === 'client' ? 'server' : 'client');
          // Need to tell the remote transport about our parameters.
          await this.safeEmitAsPromise('@connect', { dtlsParameters });
          this._transportReady = true;
      }
      _assertSendDirection() {
          if (this._direction !== 'send') {
              throw new Error('method can just be called for handlers with "send" direction');
          }
      }
      _assertRecvDirection() {
          if (this._direction !== 'recv') {
              throw new Error('method can just be called for handlers with "recv" direction');
          }
      }
  }
  exports.Safari11 = Safari11;
  
  },{"../Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","../ortc":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/ortc.js","../utils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js","./HandlerInterface":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/HandlerInterface.js","./sdp/RemoteSdp":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/RemoteSdp.js","./sdp/commonUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/commonUtils.js","./sdp/planBUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/planBUtils.js","sdp-transform":"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/Safari12.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Safari12 = void 0;
  const sdpTransform = __importStar(require("sdp-transform"));
  const Logger_1 = require("../Logger");
  const utils = __importStar(require("../utils"));
  const ortc = __importStar(require("../ortc"));
  const sdpCommonUtils = __importStar(require("./sdp/commonUtils"));
  const sdpUnifiedPlanUtils = __importStar(require("./sdp/unifiedPlanUtils"));
  const HandlerInterface_1 = require("./HandlerInterface");
  const RemoteSdp_1 = require("./sdp/RemoteSdp");
  const logger = new Logger_1.Logger('Safari12');
  const SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
  class Safari12 extends HandlerInterface_1.HandlerInterface {
      constructor() {
          super();
          // Map of RTCTransceivers indexed by MID.
          this._mapMidTransceiver = new Map();
          // Local stream for sending.
          this._sendStream = new MediaStream();
          // Whether a DataChannel m=application section has been created.
          this._hasDataChannelMediaSection = false;
          // Sending DataChannel id value counter. Incremented for each new DataChannel.
          this._nextSendSctpStreamId = 0;
          // Got transport local and remote parameters.
          this._transportReady = false;
      }
      /**
       * Creates a factory function.
       */
      static createFactory() {
          return () => new Safari12();
      }
      get name() {
          return 'Safari12';
      }
      close() {
          logger.debug('close()');
          // Close RTCPeerConnection.
          if (this._pc) {
              try {
                  this._pc.close();
              }
              catch (error) { }
          }
      }
      async getNativeRtpCapabilities() {
          logger.debug('getNativeRtpCapabilities()');
          const pc = new RTCPeerConnection({
              iceServers: [],
              iceTransportPolicy: 'all',
              bundlePolicy: 'max-bundle',
              rtcpMuxPolicy: 'require'
          });
          try {
              pc.addTransceiver('audio');
              pc.addTransceiver('video');
              const offer = await pc.createOffer();
              try {
                  pc.close();
              }
              catch (error) { }
              const sdpObject = sdpTransform.parse(offer.sdp);
              const nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({ sdpObject });
              return nativeRtpCapabilities;
          }
          catch (error) {
              try {
                  pc.close();
              }
              catch (error2) { }
              throw error;
          }
      }
      async getNativeSctpCapabilities() {
          logger.debug('getNativeSctpCapabilities()');
          return {
              numStreams: SCTP_NUM_STREAMS
          };
      }
      run({ direction, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, extendedRtpCapabilities }) {
          logger.debug('run()');
          this._direction = direction;
          this._remoteSdp = new RemoteSdp_1.RemoteSdp({
              iceParameters,
              iceCandidates,
              dtlsParameters,
              sctpParameters
          });
          this._sendingRtpParametersByKind =
              {
                  audio: ortc.getSendingRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRtpParameters('video', extendedRtpCapabilities)
              };
          this._sendingRemoteRtpParametersByKind =
              {
                  audio: ortc.getSendingRemoteRtpParameters('audio', extendedRtpCapabilities),
                  video: ortc.getSendingRemoteRtpParameters('video', extendedRtpCapabilities)
              };
          this._pc = new RTCPeerConnection(Object.assign({ iceServers: iceServers || [], iceTransportPolicy: iceTransportPolicy || 'all', bundlePolicy: 'max-bundle', rtcpMuxPolicy: 'require' }, additionalSettings), proprietaryConstraints);
          // Handle RTCPeerConnection connection status.
          this._pc.addEventListener('iceconnectionstatechange', () => {
              switch (this._pc.iceConnectionState) {
                  case 'checking':
                      this.emit('@connectionstatechange', 'connecting');
                      break;
                  case 'connected':
                  case 'completed':
                      this.emit('@connectionstatechange', 'connected');
                      break;
                  case 'failed':
                      this.emit('@connectionstatechange', 'failed');
                      break;
                  case 'disconnected':
                      this.emit('@connectionstatechange', 'disconnected');
                      break;
                  case 'closed':
                      this.emit('@connectionstatechange', 'closed');
                      break;
              }
          });
      }
      async updateIceServers(iceServers) {
          logger.debug('updateIceServers()');
          const configuration = this._pc.getConfiguration();
          configuration.iceServers = iceServers;
          this._pc.setConfiguration(configuration);
      }
      async restartIce(iceParameters) {
          logger.debug('restartIce()');
          // Provide the remote SDP handler with new remote ICE parameters.
          this._remoteSdp.updateIceParameters(iceParameters);
          if (!this._transportReady)
              return;
          if (this._direction === 'send') {
              const offer = await this._pc.createOffer({ iceRestart: true });
              logger.debug('restartIce() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
          }
          else {
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('restartIce() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              logger.debug('restartIce() | calling pc.setLocalDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
          }
      }
      async getTransportStats() {
          return this._pc.getStats();
      }
      async send({ track, encodings, codecOptions, codec }) {
          this._assertSendDirection();
          logger.debug('send() [kind:%s, track.id:%s]', track.kind, track.id);
          const sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind], {});
          // This may throw.
          sendingRtpParameters.codecs =
              ortc.reduceCodecs(sendingRtpParameters.codecs, codec);
          const sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind], {});
          // This may throw.
          sendingRemoteRtpParameters.codecs =
              ortc.reduceCodecs(sendingRemoteRtpParameters.codecs, codec);
          const mediaSectionIdx = this._remoteSdp.getNextMediaSectionIdx();
          const transceiver = this._pc.addTransceiver(track, { direction: 'sendonly', streams: [this._sendStream] });
          let offer = await this._pc.createOffer();
          let localSdpObject = sdpTransform.parse(offer.sdp);
          let offerMediaObject;
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
          if (encodings && encodings.length > 1) {
              logger.debug('send() | enabling legacy simulcast');
              localSdpObject = sdpTransform.parse(offer.sdp);
              offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
              sdpUnifiedPlanUtils.addLegacySimulcast({
                  offerMediaObject,
                  numStreams: encodings.length
              });
              offer = { type: 'offer', sdp: sdpTransform.write(localSdpObject) };
          }
          logger.debug('send() | calling pc.setLocalDescription() [offer:%o]', offer);
          await this._pc.setLocalDescription(offer);
          // We can now get the transceiver.mid.
          const localId = transceiver.mid;
          // Set MID.
          sendingRtpParameters.mid = localId;
          localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
          // Set RTCP CNAME.
          sendingRtpParameters.rtcp.cname =
              sdpCommonUtils.getCname({ offerMediaObject });
          // Set RTP encodings.
          sendingRtpParameters.encodings =
              sdpUnifiedPlanUtils.getRtpEncodings({ offerMediaObject });
          // Complete encodings with given values.
          if (encodings) {
              for (let idx = 0; idx < sendingRtpParameters.encodings.length; ++idx) {
                  if (encodings[idx])
                      Object.assign(sendingRtpParameters.encodings[idx], encodings[idx]);
              }
          }
          // If VP8 or H264 and there is effective simulcast, add scalabilityMode to
          // each encoding.
          if (sendingRtpParameters.encodings.length > 1 &&
              (sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/vp8' ||
                  sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/h264')) {
              for (const encoding of sendingRtpParameters.encodings) {
                  encoding.scalabilityMode = 'S1T3';
              }
          }
          this._remoteSdp.send({
              offerMediaObject,
              reuseMid: mediaSectionIdx.reuseMid,
              offerRtpParameters: sendingRtpParameters,
              answerRtpParameters: sendingRemoteRtpParameters,
              codecOptions
          });
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('send() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
          // Store in the map.
          this._mapMidTransceiver.set(localId, transceiver);
          return {
              localId,
              rtpParameters: sendingRtpParameters,
              rtpSender: transceiver.sender
          };
      }
      async stopSending(localId) {
          this._assertSendDirection();
          logger.debug('stopSending() [localId:%s]', localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          transceiver.sender.replaceTrack(null);
          this._pc.removeTrack(transceiver.sender);
          this._remoteSdp.closeMediaSection(transceiver.mid);
          const offer = await this._pc.createOffer();
          logger.debug('stopSending() | calling pc.setLocalDescription() [offer:%o]', offer);
          await this._pc.setLocalDescription(offer);
          const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopSending() | calling pc.setRemoteDescription() [answer:%o]', answer);
          await this._pc.setRemoteDescription(answer);
      }
      async replaceTrack(localId, track) {
          this._assertSendDirection();
          if (track) {
              logger.debug('replaceTrack() [localId:%s, track.id:%s]', localId, track.id);
          }
          else {
              logger.debug('replaceTrack() [localId:%s, no track]', localId);
          }
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          await transceiver.sender.replaceTrack(track);
      }
      async setMaxSpatialLayer(localId, spatialLayer) {
          this._assertSendDirection();
          logger.debug('setMaxSpatialLayer() [localId:%s, spatialLayer:%s]', localId, spatialLayer);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
              if (idx <= spatialLayer)
                  encoding.active = true;
              else
                  encoding.active = false;
          });
          await transceiver.sender.setParameters(parameters);
      }
      async setRtpEncodingParameters(localId, params) {
          this._assertSendDirection();
          logger.debug('setRtpEncodingParameters() [localId:%s, params:%o]', localId, params);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          const parameters = transceiver.sender.getParameters();
          parameters.encodings.forEach((encoding, idx) => {
              parameters.encodings[idx] = Object.assign(Object.assign({}, encoding), params);
          });
          await transceiver.sender.setParameters(parameters);
      }
      async getSenderStats(localId) {
          this._assertSendDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          return transceiver.sender.getStats();
      }
      async sendDataChannel({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol }) {
          this._assertSendDirection();
          const options = {
              negotiated: true,
              id: this._nextSendSctpStreamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('sendDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // Increase next id.
          this._nextSendSctpStreamId =
              ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
          // If this is the first DataChannel we need to create the SDP answer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              const offer = await this._pc.createOffer();
              const localSdpObject = sdpTransform.parse(offer.sdp);
              const offerMediaObject = localSdpObject.media
                  .find((m) => m.type === 'application');
              if (!this._transportReady)
                  await this._setupTransport({ localDtlsRole: 'server', localSdpObject });
              logger.debug('sendDataChannel() | calling pc.setLocalDescription() [offer:%o]', offer);
              await this._pc.setLocalDescription(offer);
              this._remoteSdp.sendSctpAssociation({ offerMediaObject });
              const answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
              logger.debug('sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setRemoteDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          const sctpStreamParameters = {
              streamId: options.id,
              ordered: options.ordered,
              maxPacketLifeTime: options.maxPacketLifeTime,
              maxRetransmits: options.maxRetransmits
          };
          return { dataChannel, sctpStreamParameters };
      }
      async receive({ trackId, kind, rtpParameters }) {
          this._assertRecvDirection();
          logger.debug('receive() [trackId:%s, kind:%s]', trackId, kind);
          const localId = rtpParameters.mid || String(this._mapMidTransceiver.size);
          this._remoteSdp.receive({
              mid: localId,
              kind,
              offerRtpParameters: rtpParameters,
              streamId: rtpParameters.rtcp.cname,
              trackId
          });
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('receive() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          let answer = await this._pc.createAnswer();
          const localSdpObject = sdpTransform.parse(answer.sdp);
          const answerMediaObject = localSdpObject.media
              .find((m) => String(m.mid) === localId);
          // May need to modify codec parameters in the answer based on codec
          // parameters in the offer.
          sdpCommonUtils.applyCodecParameters({
              offerRtpParameters: rtpParameters,
              answerMediaObject
          });
          answer = { type: 'answer', sdp: sdpTransform.write(localSdpObject) };
          if (!this._transportReady)
              await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
          logger.debug('receive() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
          const transceiver = this._pc.getTransceivers()
              .find((t) => t.mid === localId);
          if (!transceiver)
              throw new Error('new RTCRtpTransceiver not found');
          // Store in the map.
          this._mapMidTransceiver.set(localId, transceiver);
          return {
              localId,
              track: transceiver.receiver.track,
              rtpReceiver: transceiver.receiver
          };
      }
      async stopReceiving(localId) {
          this._assertRecvDirection();
          logger.debug('stopReceiving() [localId:%s]', localId);
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          this._remoteSdp.closeMediaSection(transceiver.mid);
          const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
          logger.debug('stopReceiving() | calling pc.setRemoteDescription() [offer:%o]', offer);
          await this._pc.setRemoteDescription(offer);
          const answer = await this._pc.createAnswer();
          logger.debug('stopReceiving() | calling pc.setLocalDescription() [answer:%o]', answer);
          await this._pc.setLocalDescription(answer);
      }
      async getReceiverStats(localId) {
          this._assertRecvDirection();
          const transceiver = this._mapMidTransceiver.get(localId);
          if (!transceiver)
              throw new Error('associated RTCRtpTransceiver not found');
          return transceiver.receiver.getStats();
      }
      async receiveDataChannel({ sctpStreamParameters, label, protocol }) {
          this._assertRecvDirection();
          const { streamId, ordered, maxPacketLifeTime, maxRetransmits } = sctpStreamParameters;
          const options = {
              negotiated: true,
              id: streamId,
              ordered,
              maxPacketLifeTime,
              maxRetransmits,
              protocol
          };
          logger.debug('receiveDataChannel() [options:%o]', options);
          const dataChannel = this._pc.createDataChannel(label, options);
          // If this is the first DataChannel we need to create the SDP offer with
          // m=application section.
          if (!this._hasDataChannelMediaSection) {
              this._remoteSdp.receiveSctpAssociation();
              const offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]', offer);
              await this._pc.setRemoteDescription(offer);
              const answer = await this._pc.createAnswer();
              if (!this._transportReady) {
                  const localSdpObject = sdpTransform.parse(answer.sdp);
                  await this._setupTransport({ localDtlsRole: 'client', localSdpObject });
              }
              logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
              await this._pc.setLocalDescription(answer);
              this._hasDataChannelMediaSection = true;
          }
          return { dataChannel };
      }
      async _setupTransport({ localDtlsRole, localSdpObject }) {
          if (!localSdpObject)
              localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
          // Get our local DTLS parameters.
          const dtlsParameters = sdpCommonUtils.extractDtlsParameters({ sdpObject: localSdpObject });
          // Set our DTLS role.
          dtlsParameters.role = localDtlsRole;
          // Update the remote DTLS role in the SDP.
          this._remoteSdp.updateDtlsRole(localDtlsRole === 'client' ? 'server' : 'client');
          // Need to tell the remote transport about our parameters.
          await this.safeEmitAsPromise('@connect', { dtlsParameters });
          this._transportReady = true;
      }
      _assertSendDirection() {
          if (this._direction !== 'send') {
              throw new Error('method can just be called for handlers with "send" direction');
          }
      }
      _assertRecvDirection() {
          if (this._direction !== 'recv') {
              throw new Error('method can just be called for handlers with "recv" direction');
          }
      }
  }
  exports.Safari12 = Safari12;
  
  },{"../Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","../ortc":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/ortc.js","../utils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js","./HandlerInterface":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/HandlerInterface.js","./sdp/RemoteSdp":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/RemoteSdp.js","./sdp/commonUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/commonUtils.js","./sdp/unifiedPlanUtils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/unifiedPlanUtils.js","sdp-transform":"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/ortc/edgeUtils.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.mangleRtpParameters = exports.getCapabilities = void 0;
  const utils = __importStar(require("../../utils"));
  /**
   * Normalize ORTC based Edge's RTCRtpReceiver.getCapabilities() to produce a full
   * compliant ORTC RTCRtpCapabilities.
   */
  function getCapabilities() {
      const nativeCaps = RTCRtpReceiver.getCapabilities();
      const caps = utils.clone(nativeCaps, {});
      for (const codec of caps.codecs) {
          // Rename numChannels to channels.
          codec.channels = codec.numChannels;
          delete codec.numChannels;
          // Add mimeType.
          codec.mimeType = codec.mimeType || `${codec.kind}/${codec.name}`;
          // NOTE: Edge sets some numeric parameters as string rather than number. Fix them.
          if (codec.parameters) {
              const parameters = codec.parameters;
              if (parameters.apt)
                  parameters.apt = Number(parameters.apt);
              if (parameters['packetization-mode'])
                  parameters['packetization-mode'] = Number(parameters['packetization-mode']);
          }
          // Delete emty parameter String in rtcpFeedback.
          for (const feedback of codec.rtcpFeedback || []) {
              if (!feedback.parameter)
                  feedback.parameter = '';
          }
      }
      return caps;
  }
  exports.getCapabilities = getCapabilities;
  /**
   * Generate RTCRtpParameters as ORTC based Edge likes.
   */
  function mangleRtpParameters(rtpParameters) {
      const params = utils.clone(rtpParameters, {});
      // Rename mid to muxId.
      if (params.mid) {
          params.muxId = params.mid;
          delete params.mid;
      }
      for (const codec of params.codecs) {
          // Rename channels to numChannels.
          if (codec.channels) {
              codec.numChannels = codec.channels;
              delete codec.channels;
          }
          // Add codec.name (requried by Edge).
          if (codec.mimeType && !codec.name)
              codec.name = codec.mimeType.split('/')[1];
          // Remove mimeType.
          delete codec.mimeType;
      }
      return params;
  }
  exports.mangleRtpParameters = mangleRtpParameters;
  
  },{"../../utils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/MediaSection.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.OfferMediaSection = exports.AnswerMediaSection = exports.MediaSection = void 0;
  const utils = __importStar(require("../../utils"));
  class MediaSection {
      constructor({ iceParameters, iceCandidates, dtlsParameters, planB = false }) {
          this._mediaObject = {};
          this._planB = planB;
          if (iceParameters) {
              this.setIceParameters(iceParameters);
          }
          if (iceCandidates) {
              this._mediaObject.candidates = [];
              for (const candidate of iceCandidates) {
                  const candidateObject = {};
                  // mediasoup does mandates rtcp-mux so candidates component is always
                  // RTP (1).
                  candidateObject.component = 1;
                  candidateObject.foundation = candidate.foundation;
                  candidateObject.ip = candidate.ip;
                  candidateObject.port = candidate.port;
                  candidateObject.priority = candidate.priority;
                  candidateObject.transport = candidate.protocol;
                  candidateObject.type = candidate.type;
                  if (candidate.tcpType)
                      candidateObject.tcptype = candidate.tcpType;
                  this._mediaObject.candidates.push(candidateObject);
              }
              this._mediaObject.endOfCandidates = 'end-of-candidates';
              this._mediaObject.iceOptions = 'renomination';
          }
          if (dtlsParameters) {
              this.setDtlsRole(dtlsParameters.role);
          }
      }
      get mid() {
          return String(this._mediaObject.mid);
      }
      get closed() {
          return this._mediaObject.port === 0;
      }
      getObject() {
          return this._mediaObject;
      }
      setIceParameters(iceParameters) {
          this._mediaObject.iceUfrag = iceParameters.usernameFragment;
          this._mediaObject.icePwd = iceParameters.password;
      }
      disable() {
          this._mediaObject.direction = 'inactive';
          delete this._mediaObject.ext;
          delete this._mediaObject.ssrcs;
          delete this._mediaObject.ssrcGroups;
          delete this._mediaObject.simulcast;
          delete this._mediaObject.simulcast_03;
          delete this._mediaObject.rids;
      }
      close() {
          this._mediaObject.direction = 'inactive';
          this._mediaObject.port = 0;
          delete this._mediaObject.ext;
          delete this._mediaObject.ssrcs;
          delete this._mediaObject.ssrcGroups;
          delete this._mediaObject.simulcast;
          delete this._mediaObject.simulcast_03;
          delete this._mediaObject.rids;
          delete this._mediaObject.extmapAllowMixed;
      }
  }
  exports.MediaSection = MediaSection;
  class AnswerMediaSection extends MediaSection {
      constructor({ iceParameters, iceCandidates, dtlsParameters, sctpParameters, plainRtpParameters, planB = false, offerMediaObject, offerRtpParameters, answerRtpParameters, codecOptions, extmapAllowMixed = false }) {
          super({ iceParameters, iceCandidates, dtlsParameters, planB });
          this._mediaObject.mid = String(offerMediaObject.mid);
          this._mediaObject.type = offerMediaObject.type;
          this._mediaObject.protocol = offerMediaObject.protocol;
          if (!plainRtpParameters) {
              this._mediaObject.connection = { ip: '127.0.0.1', version: 4 };
              this._mediaObject.port = 7;
          }
          else {
              this._mediaObject.connection =
                  {
                      ip: plainRtpParameters.ip,
                      version: plainRtpParameters.ipVersion
                  };
              this._mediaObject.port = plainRtpParameters.port;
          }
          switch (offerMediaObject.type) {
              case 'audio':
              case 'video':
                  {
                      this._mediaObject.direction = 'recvonly';
                      this._mediaObject.rtp = [];
                      this._mediaObject.rtcpFb = [];
                      this._mediaObject.fmtp = [];
                      for (const codec of answerRtpParameters.codecs) {
                          const rtp = {
                              payload: codec.payloadType,
                              codec: getCodecName(codec),
                              rate: codec.clockRate
                          };
                          if (codec.channels > 1)
                              rtp.encoding = codec.channels;
                          this._mediaObject.rtp.push(rtp);
                          const codecParameters = utils.clone(codec.parameters, {});
                          if (codecOptions) {
                              const { opusStereo, opusFec, opusDtx, opusMaxPlaybackRate, opusMaxAverageBitrate, opusPtime, videoGoogleStartBitrate, videoGoogleMaxBitrate, videoGoogleMinBitrate } = codecOptions;
                              const offerCodec = offerRtpParameters.codecs
                                  .find((c) => (c.payloadType === codec.payloadType));
                              switch (codec.mimeType.toLowerCase()) {
                                  case 'audio/opus':
                                      {
                                          if (opusStereo !== undefined) {
                                              offerCodec.parameters['sprop-stereo'] = opusStereo ? 1 : 0;
                                              codecParameters.stereo = opusStereo ? 1 : 0;
                                          }
                                          if (opusFec !== undefined) {
                                              offerCodec.parameters.useinbandfec = opusFec ? 1 : 0;
                                              codecParameters.useinbandfec = opusFec ? 1 : 0;
                                          }
                                          if (opusDtx !== undefined) {
                                              offerCodec.parameters.usedtx = opusDtx ? 1 : 0;
                                              codecParameters.usedtx = opusDtx ? 1 : 0;
                                          }
                                          if (opusMaxPlaybackRate !== undefined) {
                                              codecParameters.maxplaybackrate = opusMaxPlaybackRate;
                                          }
                                          if (opusMaxAverageBitrate !== undefined) {
                                              codecParameters.maxaveragebitrate = opusMaxAverageBitrate;
                                          }
                                          if (opusPtime !== undefined) {
                                              offerCodec.parameters.ptime = opusPtime;
                                              codecParameters.ptime = opusPtime;
                                          }
                                          break;
                                      }
                                  case 'video/vp8':
                                  case 'video/vp9':
                                  case 'video/h264':
                                  case 'video/h265':
                                      {
                                          if (videoGoogleStartBitrate !== undefined)
                                              codecParameters['x-google-start-bitrate'] = videoGoogleStartBitrate;
                                          if (videoGoogleMaxBitrate !== undefined)
                                              codecParameters['x-google-max-bitrate'] = videoGoogleMaxBitrate;
                                          if (videoGoogleMinBitrate !== undefined)
                                              codecParameters['x-google-min-bitrate'] = videoGoogleMinBitrate;
                                          break;
                                      }
                              }
                          }
                          const fmtp = {
                              payload: codec.payloadType,
                              config: ''
                          };
                          for (const key of Object.keys(codecParameters)) {
                              if (fmtp.config)
                                  fmtp.config += ';';
                              fmtp.config += `${key}=${codecParameters[key]}`;
                          }
                          if (fmtp.config)
                              this._mediaObject.fmtp.push(fmtp);
                          for (const fb of codec.rtcpFeedback) {
                              this._mediaObject.rtcpFb.push({
                                  payload: codec.payloadType,
                                  type: fb.type,
                                  subtype: fb.parameter
                              });
                          }
                      }
                      this._mediaObject.payloads = answerRtpParameters.codecs
                          .map((codec) => codec.payloadType)
                          .join(' ');
                      this._mediaObject.ext = [];
                      for (const ext of answerRtpParameters.headerExtensions) {
                          // Don't add a header extension if not present in the offer.
                          const found = (offerMediaObject.ext || [])
                              .some((localExt) => localExt.uri === ext.uri);
                          if (!found)
                              continue;
                          this._mediaObject.ext.push({
                              uri: ext.uri,
                              value: ext.id
                          });
                      }
                      // Allow both 1 byte and 2 bytes length header extensions.
                      if (extmapAllowMixed &&
                          offerMediaObject.extmapAllowMixed === 'extmap-allow-mixed') {
                          this._mediaObject.extmapAllowMixed = 'extmap-allow-mixed';
                      }
                      // Simulcast.
                      if (offerMediaObject.simulcast) {
                          this._mediaObject.simulcast =
                              {
                                  dir1: 'recv',
                                  list1: offerMediaObject.simulcast.list1
                              };
                          this._mediaObject.rids = [];
                          for (const rid of offerMediaObject.rids || []) {
                              if (rid.direction !== 'send')
                                  continue;
                              this._mediaObject.rids.push({
                                  id: rid.id,
                                  direction: 'recv'
                              });
                          }
                      }
                      // Simulcast (draft version 03).
                      else if (offerMediaObject.simulcast_03) {
                          // eslint-disable-next-line camelcase
                          this._mediaObject.simulcast_03 =
                              {
                                  value: offerMediaObject.simulcast_03.value.replace(/send/g, 'recv')
                              };
                          this._mediaObject.rids = [];
                          for (const rid of offerMediaObject.rids || []) {
                              if (rid.direction !== 'send')
                                  continue;
                              this._mediaObject.rids.push({
                                  id: rid.id,
                                  direction: 'recv'
                              });
                          }
                      }
                      this._mediaObject.rtcpMux = 'rtcp-mux';
                      this._mediaObject.rtcpRsize = 'rtcp-rsize';
                      if (this._planB && this._mediaObject.type === 'video')
                          this._mediaObject.xGoogleFlag = 'conference';
                      break;
                  }
              case 'application':
                  {
                      // New spec.
                      if (typeof offerMediaObject.sctpPort === 'number') {
                          this._mediaObject.payloads = 'webrtc-datachannel';
                          this._mediaObject.sctpPort = sctpParameters.port;
                          this._mediaObject.maxMessageSize = sctpParameters.maxMessageSize;
                      }
                      // Old spec.
                      else if (offerMediaObject.sctpmap) {
                          this._mediaObject.payloads = sctpParameters.port;
                          this._mediaObject.sctpmap =
                              {
                                  app: 'webrtc-datachannel',
                                  sctpmapNumber: sctpParameters.port,
                                  maxMessageSize: sctpParameters.maxMessageSize
                              };
                      }
                      break;
                  }
          }
      }
      setDtlsRole(role) {
          switch (role) {
              case 'client':
                  this._mediaObject.setup = 'active';
                  break;
              case 'server':
                  this._mediaObject.setup = 'passive';
                  break;
              case 'auto':
                  this._mediaObject.setup = 'actpass';
                  break;
          }
      }
  }
  exports.AnswerMediaSection = AnswerMediaSection;
  class OfferMediaSection extends MediaSection {
      constructor({ iceParameters, iceCandidates, dtlsParameters, sctpParameters, plainRtpParameters, planB = false, mid, kind, offerRtpParameters, streamId, trackId, oldDataChannelSpec = false }) {
          super({ iceParameters, iceCandidates, dtlsParameters, planB });
          this._mediaObject.mid = String(mid);
          this._mediaObject.type = kind;
          if (!plainRtpParameters) {
              this._mediaObject.connection = { ip: '127.0.0.1', version: 4 };
              if (!sctpParameters)
                  this._mediaObject.protocol = 'UDP/TLS/RTP/SAVPF';
              else
                  this._mediaObject.protocol = 'UDP/DTLS/SCTP';
              this._mediaObject.port = 7;
          }
          else {
              this._mediaObject.connection =
                  {
                      ip: plainRtpParameters.ip,
                      version: plainRtpParameters.ipVersion
                  };
              this._mediaObject.protocol = 'RTP/AVP';
              this._mediaObject.port = plainRtpParameters.port;
          }
          switch (kind) {
              case 'audio':
              case 'video':
                  {
                      this._mediaObject.direction = 'sendonly';
                      this._mediaObject.rtp = [];
                      this._mediaObject.rtcpFb = [];
                      this._mediaObject.fmtp = [];
                      if (!this._planB)
                          this._mediaObject.msid = `${streamId || '-'} ${trackId}`;
                      for (const codec of offerRtpParameters.codecs) {
                          const rtp = {
                              payload: codec.payloadType,
                              codec: getCodecName(codec),
                              rate: codec.clockRate
                          };
                          if (codec.channels > 1)
                              rtp.encoding = codec.channels;
                          this._mediaObject.rtp.push(rtp);
                          const fmtp = {
                              payload: codec.payloadType,
                              config: ''
                          };
                          for (const key of Object.keys(codec.parameters)) {
                              if (fmtp.config)
                                  fmtp.config += ';';
                              fmtp.config += `${key}=${codec.parameters[key]}`;
                          }
                          if (fmtp.config)
                              this._mediaObject.fmtp.push(fmtp);
                          for (const fb of codec.rtcpFeedback) {
                              this._mediaObject.rtcpFb.push({
                                  payload: codec.payloadType,
                                  type: fb.type,
                                  subtype: fb.parameter
                              });
                          }
                      }
                      this._mediaObject.payloads = offerRtpParameters.codecs
                          .map((codec) => codec.payloadType)
                          .join(' ');
                      this._mediaObject.ext = [];
                      for (const ext of offerRtpParameters.headerExtensions) {
                          this._mediaObject.ext.push({
                              uri: ext.uri,
                              value: ext.id
                          });
                      }
                      this._mediaObject.rtcpMux = 'rtcp-mux';
                      this._mediaObject.rtcpRsize = 'rtcp-rsize';
                      const encoding = offerRtpParameters.encodings[0];
                      const ssrc = encoding.ssrc;
                      const rtxSsrc = (encoding.rtx && encoding.rtx.ssrc)
                          ? encoding.rtx.ssrc
                          : undefined;
                      this._mediaObject.ssrcs = [];
                      this._mediaObject.ssrcGroups = [];
                      if (offerRtpParameters.rtcp.cname) {
                          this._mediaObject.ssrcs.push({
                              id: ssrc,
                              attribute: 'cname',
                              value: offerRtpParameters.rtcp.cname
                          });
                      }
                      if (this._planB) {
                          this._mediaObject.ssrcs.push({
                              id: ssrc,
                              attribute: 'msid',
                              value: `${streamId || '-'} ${trackId}`
                          });
                      }
                      if (rtxSsrc) {
                          if (offerRtpParameters.rtcp.cname) {
                              this._mediaObject.ssrcs.push({
                                  id: rtxSsrc,
                                  attribute: 'cname',
                                  value: offerRtpParameters.rtcp.cname
                              });
                          }
                          if (this._planB) {
                              this._mediaObject.ssrcs.push({
                                  id: rtxSsrc,
                                  attribute: 'msid',
                                  value: `${streamId || '-'} ${trackId}`
                              });
                          }
                          // Associate original and retransmission SSRCs.
                          this._mediaObject.ssrcGroups.push({
                              semantics: 'FID',
                              ssrcs: `${ssrc} ${rtxSsrc}`
                          });
                      }
                      break;
                  }
              case 'application':
                  {
                      // New spec.
                      if (!oldDataChannelSpec) {
                          this._mediaObject.payloads = 'webrtc-datachannel';
                          this._mediaObject.sctpPort = sctpParameters.port;
                          this._mediaObject.maxMessageSize = sctpParameters.maxMessageSize;
                      }
                      // Old spec.
                      else {
                          this._mediaObject.payloads = sctpParameters.port;
                          this._mediaObject.sctpmap =
                              {
                                  app: 'webrtc-datachannel',
                                  sctpmapNumber: sctpParameters.port,
                                  maxMessageSize: sctpParameters.maxMessageSize
                              };
                      }
                      break;
                  }
          }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setDtlsRole(role) {
          // Always 'actpass'.
          this._mediaObject.setup = 'actpass';
      }
      planBReceive({ offerRtpParameters, streamId, trackId }) {
          const encoding = offerRtpParameters.encodings[0];
          const ssrc = encoding.ssrc;
          const rtxSsrc = (encoding.rtx && encoding.rtx.ssrc)
              ? encoding.rtx.ssrc
              : undefined;
          for (const codec of offerRtpParameters.codecs) {
              const rtp = {
                  payload: codec.payloadType,
                  codec: getCodecName(codec),
                  rate: codec.clockRate
              };
              if (codec.channels > 1)
                  rtp.encoding = codec.channels;
              this._mediaObject.rtp.push(rtp);
              const fmtp = {
                  payload: codec.payloadType,
                  config: ''
              };
              for (const key of Object.keys(codec.parameters)) {
                  if (fmtp.config)
                      fmtp.config += ';';
                  fmtp.config += `${key}=${codec.parameters[key]}`;
              }
              if (fmtp.config)
                  this._mediaObject.fmtp.push(fmtp);
              for (const fb of codec.rtcpFeedback) {
                  this._mediaObject.rtcpFb.push({
                      payload: codec.payloadType,
                      type: fb.type,
                      subtype: fb.parameter
                  });
              }
          }
          this._mediaObject.payloads += ` ${offerRtpParameters
              .codecs
              .map((codec) => codec.payloadType)
              .join(' ')}`;
          if (offerRtpParameters.rtcp.cname) {
              this._mediaObject.ssrcs.push({
                  id: ssrc,
                  attribute: 'cname',
                  value: offerRtpParameters.rtcp.cname
              });
          }
          this._mediaObject.ssrcs.push({
              id: ssrc,
              attribute: 'msid',
              value: `${streamId || '-'} ${trackId}`
          });
          if (rtxSsrc) {
              if (offerRtpParameters.rtcp.cname) {
                  this._mediaObject.ssrcs.push({
                      id: rtxSsrc,
                      attribute: 'cname',
                      value: offerRtpParameters.rtcp.cname
                  });
              }
              this._mediaObject.ssrcs.push({
                  id: rtxSsrc,
                  attribute: 'msid',
                  value: `${streamId || '-'} ${trackId}`
              });
              // Associate original and retransmission SSRCs.
              this._mediaObject.ssrcGroups.push({
                  semantics: 'FID',
                  ssrcs: `${ssrc} ${rtxSsrc}`
              });
          }
      }
      planBStopReceiving({ offerRtpParameters }) {
          const encoding = offerRtpParameters.encodings[0];
          const ssrc = encoding.ssrc;
          const rtxSsrc = (encoding.rtx && encoding.rtx.ssrc)
              ? encoding.rtx.ssrc
              : undefined;
          const payloads = offerRtpParameters.codecs
              .map((codec) => codec.payloadType);
          this._mediaObject.payloads = this._mediaObject.payloads.split(' ')
              .filter((payload) => !payloads.includes(Number(payload)))
              .join(' ');
          this._mediaObject.rtp = this._mediaObject.rtp
              .filter((rtp) => !payloads.includes(rtp.payload));
          this._mediaObject.rtcpFb = this._mediaObject.rtcpFb
              .filter((rtcpFb) => !payloads.includes(rtcpFb.payload));
          this._mediaObject.fmtp = this._mediaObject.fmtp
              .filter((fmtp) => !payloads.includes(fmtp.payload));
          this._mediaObject.ssrcs = this._mediaObject.ssrcs
              .filter((s) => s.id !== ssrc && s.id !== rtxSsrc);
          if (rtxSsrc) {
              this._mediaObject.ssrcGroups = this._mediaObject.ssrcGroups
                  .filter((group) => group.ssrcs !== `${ssrc} ${rtxSsrc}`);
          }
      }
  }
  exports.OfferMediaSection = OfferMediaSection;
  function getCodecName(codec) {
      const MimeTypeRegex = new RegExp('^(audio|video)/(.+)', 'i');
      const mimeTypeMatch = MimeTypeRegex.exec(codec.mimeType);
      if (!mimeTypeMatch)
          throw new TypeError('invalid codec.mimeType');
      return mimeTypeMatch[2];
  }
  
  },{"../../utils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/RemoteSdp.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RemoteSdp = void 0;
  const sdpTransform = __importStar(require("sdp-transform"));
  const Logger_1 = require("../../Logger");
  const MediaSection_1 = require("./MediaSection");
  const logger = new Logger_1.Logger('RemoteSdp');
  class RemoteSdp {
      constructor({ iceParameters, iceCandidates, dtlsParameters, sctpParameters, plainRtpParameters, planB = false }) {
          // MediaSection instances with same order as in the SDP.
          this._mediaSections = [];
          // MediaSection indices indexed by MID.
          this._midToIndex = new Map();
          this._iceParameters = iceParameters;
          this._iceCandidates = iceCandidates;
          this._dtlsParameters = dtlsParameters;
          this._sctpParameters = sctpParameters;
          this._plainRtpParameters = plainRtpParameters;
          this._planB = planB;
          this._sdpObject =
              {
                  version: 0,
                  origin: {
                      address: '0.0.0.0',
                      ipVer: 4,
                      netType: 'IN',
                      sessionId: 10000,
                      sessionVersion: 0,
                      username: 'mediasoup-client'
                  },
                  name: '-',
                  timing: { start: 0, stop: 0 },
                  media: []
              };
          // If ICE parameters are given, add ICE-Lite indicator.
          if (iceParameters && iceParameters.iceLite) {
              this._sdpObject.icelite = 'ice-lite';
          }
          // If DTLS parameters are given, assume WebRTC and BUNDLE.
          if (dtlsParameters) {
              this._sdpObject.msidSemantic = { semantic: 'WMS', token: '*' };
              // NOTE: We take the latest fingerprint.
              const numFingerprints = this._dtlsParameters.fingerprints.length;
              this._sdpObject.fingerprint =
                  {
                      type: dtlsParameters.fingerprints[numFingerprints - 1].algorithm,
                      hash: dtlsParameters.fingerprints[numFingerprints - 1].value
                  };
              this._sdpObject.groups = [{ type: 'BUNDLE', mids: '' }];
          }
          // If there are plain RPT parameters, override SDP origin.
          if (plainRtpParameters) {
              this._sdpObject.origin.address = plainRtpParameters.ip;
              this._sdpObject.origin.ipVer = plainRtpParameters.ipVersion;
          }
      }
      updateIceParameters(iceParameters) {
          logger.debug('updateIceParameters() [iceParameters:%o]', iceParameters);
          this._iceParameters = iceParameters;
          this._sdpObject.icelite = iceParameters.iceLite ? 'ice-lite' : undefined;
          for (const mediaSection of this._mediaSections) {
              mediaSection.setIceParameters(iceParameters);
          }
      }
      updateDtlsRole(role) {
          logger.debug('updateDtlsRole() [role:%s]', role);
          this._dtlsParameters.role = role;
          for (const mediaSection of this._mediaSections) {
              mediaSection.setDtlsRole(role);
          }
      }
      getNextMediaSectionIdx() {
          // If a closed media section is found, return its index.
          for (let idx = 0; idx < this._mediaSections.length; ++idx) {
              const mediaSection = this._mediaSections[idx];
              if (mediaSection.closed)
                  return { idx, reuseMid: mediaSection.mid };
          }
          // If no closed media section is found, return next one.
          return { idx: this._mediaSections.length };
      }
      send({ offerMediaObject, reuseMid, offerRtpParameters, answerRtpParameters, codecOptions, extmapAllowMixed = false }) {
          const mediaSection = new MediaSection_1.AnswerMediaSection({
              iceParameters: this._iceParameters,
              iceCandidates: this._iceCandidates,
              dtlsParameters: this._dtlsParameters,
              plainRtpParameters: this._plainRtpParameters,
              planB: this._planB,
              offerMediaObject,
              offerRtpParameters,
              answerRtpParameters,
              codecOptions,
              extmapAllowMixed
          });
          // Unified-Plan with closed media section replacement.
          if (reuseMid) {
              this._replaceMediaSection(mediaSection, reuseMid);
          }
          // Unified-Plan or Plan-B with different media kind.
          else if (!this._midToIndex.has(mediaSection.mid)) {
              this._addMediaSection(mediaSection);
          }
          // Plan-B with same media kind.
          else {
              this._replaceMediaSection(mediaSection);
          }
      }
      receive({ mid, kind, offerRtpParameters, streamId, trackId }) {
          const idx = this._midToIndex.get(mid);
          let mediaSection;
          if (idx !== undefined)
              mediaSection = this._mediaSections[idx];
          // Unified-Plan or different media kind.
          if (!mediaSection) {
              mediaSection = new MediaSection_1.OfferMediaSection({
                  iceParameters: this._iceParameters,
                  iceCandidates: this._iceCandidates,
                  dtlsParameters: this._dtlsParameters,
                  plainRtpParameters: this._plainRtpParameters,
                  planB: this._planB,
                  mid,
                  kind,
                  offerRtpParameters,
                  streamId,
                  trackId
              });
              // Let's try to recycle a closed media section (if any).
              // NOTE: Yes, we can recycle a closed m=audio section with a new m=video.
              const oldMediaSection = this._mediaSections.find((m) => (m.closed));
              if (oldMediaSection) {
                  this._replaceMediaSection(mediaSection, oldMediaSection.mid);
              }
              else {
                  this._addMediaSection(mediaSection);
              }
          }
          // Plan-B.
          else {
              mediaSection.planBReceive({ offerRtpParameters, streamId, trackId });
              this._replaceMediaSection(mediaSection);
          }
      }
      disableMediaSection(mid) {
          const idx = this._midToIndex.get(mid);
          if (idx === undefined) {
              throw new Error(`no media section found with mid '${mid}'`);
          }
          const mediaSection = this._mediaSections[idx];
          mediaSection.disable();
      }
      closeMediaSection(mid) {
          const idx = this._midToIndex.get(mid);
          if (idx === undefined) {
              throw new Error(`no media section found with mid '${mid}'`);
          }
          const mediaSection = this._mediaSections[idx];
          // NOTE: Closing the first m section is a pain since it invalidates the
          // bundled transport, so let's avoid it.
          if (mid === this._firstMid) {
              logger.debug('closeMediaSection() | cannot close first media section, disabling it instead [mid:%s]', mid);
              this.disableMediaSection(mid);
              return;
          }
          mediaSection.close();
          // Regenerate BUNDLE mids.
          this._regenerateBundleMids();
      }
      planBStopReceiving({ mid, offerRtpParameters }) {
          const idx = this._midToIndex.get(mid);
          if (idx === undefined) {
              throw new Error(`no media section found with mid '${mid}'`);
          }
          const mediaSection = this._mediaSections[idx];
          mediaSection.planBStopReceiving({ offerRtpParameters });
          this._replaceMediaSection(mediaSection);
      }
      sendSctpAssociation({ offerMediaObject }) {
          const mediaSection = new MediaSection_1.AnswerMediaSection({
              iceParameters: this._iceParameters,
              iceCandidates: this._iceCandidates,
              dtlsParameters: this._dtlsParameters,
              sctpParameters: this._sctpParameters,
              plainRtpParameters: this._plainRtpParameters,
              offerMediaObject
          });
          this._addMediaSection(mediaSection);
      }
      receiveSctpAssociation({ oldDataChannelSpec = false } = {}) {
          const mediaSection = new MediaSection_1.OfferMediaSection({
              iceParameters: this._iceParameters,
              iceCandidates: this._iceCandidates,
              dtlsParameters: this._dtlsParameters,
              sctpParameters: this._sctpParameters,
              plainRtpParameters: this._plainRtpParameters,
              mid: 'datachannel',
              kind: 'application',
              oldDataChannelSpec
          });
          this._addMediaSection(mediaSection);
      }
      getSdp() {
          // Increase SDP version.
          this._sdpObject.origin.sessionVersion++;
          return sdpTransform.write(this._sdpObject);
      }
      _addMediaSection(newMediaSection) {
          if (!this._firstMid)
              this._firstMid = newMediaSection.mid;
          // Add to the vector.
          this._mediaSections.push(newMediaSection);
          // Add to the map.
          this._midToIndex.set(newMediaSection.mid, this._mediaSections.length - 1);
          // Add to the SDP object.
          this._sdpObject.media.push(newMediaSection.getObject());
          // Regenerate BUNDLE mids.
          this._regenerateBundleMids();
      }
      _replaceMediaSection(newMediaSection, reuseMid) {
          // Store it in the map.
          if (typeof reuseMid === 'string') {
              const idx = this._midToIndex.get(reuseMid);
              if (idx === undefined) {
                  throw new Error(`no media section found for reuseMid '${reuseMid}'`);
              }
              const oldMediaSection = this._mediaSections[idx];
              // Replace the index in the vector with the new media section.
              this._mediaSections[idx] = newMediaSection;
              // Update the map.
              this._midToIndex.delete(oldMediaSection.mid);
              this._midToIndex.set(newMediaSection.mid, idx);
              // Update the SDP object.
              this._sdpObject.media[idx] = newMediaSection.getObject();
              // Regenerate BUNDLE mids.
              this._regenerateBundleMids();
          }
          else {
              const idx = this._midToIndex.get(newMediaSection.mid);
              if (idx === undefined) {
                  throw new Error(`no media section found with mid '${newMediaSection.mid}'`);
              }
              // Replace the index in the vector with the new media section.
              this._mediaSections[idx] = newMediaSection;
              // Update the SDP object.
              this._sdpObject.media[idx] = newMediaSection.getObject();
          }
      }
      _regenerateBundleMids() {
          if (!this._dtlsParameters)
              return;
          this._sdpObject.groups[0].mids = this._mediaSections
              .filter((mediaSection) => !mediaSection.closed)
              .map((mediaSection) => mediaSection.mid)
              .join(' ');
      }
  }
  exports.RemoteSdp = RemoteSdp;
  
  },{"../../Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Logger.js","./MediaSection":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/MediaSection.js","sdp-transform":"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/commonUtils.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.applyCodecParameters = exports.getCname = exports.extractDtlsParameters = exports.extractRtpCapabilities = void 0;
  const sdpTransform = __importStar(require("sdp-transform"));
  function extractRtpCapabilities({ sdpObject }) {
      // Map of RtpCodecParameters indexed by payload type.
      const codecsMap = new Map();
      // Array of RtpHeaderExtensions.
      const headerExtensions = [];
      // Whether a m=audio/video section has been already found.
      let gotAudio = false;
      let gotVideo = false;
      for (const m of sdpObject.media) {
          const kind = m.type;
          switch (kind) {
              case 'audio':
                  {
                      if (gotAudio)
                          continue;
                      gotAudio = true;
                      break;
                  }
              case 'video':
                  {
                      if (gotVideo)
                          continue;
                      gotVideo = true;
                      break;
                  }
              default:
                  {
                      continue;
                  }
          }
          // Get codecs.
          for (const rtp of m.rtp) {
              const codec = {
                  kind: kind,
                  mimeType: `${kind}/${rtp.codec}`,
                  preferredPayloadType: rtp.payload,
                  clockRate: rtp.rate,
                  channels: rtp.encoding,
                  parameters: {},
                  rtcpFeedback: []
              };
              codecsMap.set(codec.preferredPayloadType, codec);
          }
          // Get codec parameters.
          for (const fmtp of m.fmtp || []) {
              const parameters = sdpTransform.parseParams(fmtp.config);
              const codec = codecsMap.get(fmtp.payload);
              if (!codec)
                  continue;
              // Specials case to convert parameter value to string.
              if (parameters && parameters.hasOwnProperty('profile-level-id'))
                  parameters['profile-level-id'] = String(parameters['profile-level-id']);
              codec.parameters = parameters;
          }
          // Get RTCP feedback for each codec.
          for (const fb of m.rtcpFb || []) {
              const codec = codecsMap.get(fb.payload);
              if (!codec)
                  continue;
              const feedback = {
                  type: fb.type,
                  parameter: fb.subtype
              };
              if (!feedback.parameter)
                  delete feedback.parameter;
              codec.rtcpFeedback.push(feedback);
          }
          // Get RTP header extensions.
          for (const ext of m.ext || []) {
              // Ignore encrypted extensions (not yet supported in mediasoup).
              if (ext['encrypt-uri'])
                  continue;
              const headerExtension = {
                  kind: kind,
                  uri: ext.uri,
                  preferredId: ext.value
              };
              headerExtensions.push(headerExtension);
          }
      }
      const rtpCapabilities = {
          codecs: Array.from(codecsMap.values()),
          headerExtensions: headerExtensions
      };
      return rtpCapabilities;
  }
  exports.extractRtpCapabilities = extractRtpCapabilities;
  function extractDtlsParameters({ sdpObject }) {
      const mediaObject = (sdpObject.media || [])
          .find((m) => (m.iceUfrag && m.port !== 0));
      if (!mediaObject)
          throw new Error('no active media section found');
      const fingerprint = mediaObject.fingerprint || sdpObject.fingerprint;
      let role;
      switch (mediaObject.setup) {
          case 'active':
              role = 'client';
              break;
          case 'passive':
              role = 'server';
              break;
          case 'actpass':
              role = 'auto';
              break;
      }
      const dtlsParameters = {
          role,
          fingerprints: [
              {
                  algorithm: fingerprint.type,
                  value: fingerprint.hash
              }
          ]
      };
      return dtlsParameters;
  }
  exports.extractDtlsParameters = extractDtlsParameters;
  function getCname({ offerMediaObject }) {
      const ssrcCnameLine = (offerMediaObject.ssrcs || [])
          .find((line) => line.attribute === 'cname');
      if (!ssrcCnameLine)
          return '';
      return ssrcCnameLine.value;
  }
  exports.getCname = getCname;
  /**
   * Apply codec parameters in the given SDP m= section answer based on the
   * given RTP parameters of an offer.
   */
  function applyCodecParameters({ offerRtpParameters, answerMediaObject }) {
      for (const codec of offerRtpParameters.codecs) {
          const mimeType = codec.mimeType.toLowerCase();
          // Avoid parsing codec parameters for unhandled codecs.
          if (mimeType !== 'audio/opus')
              continue;
          const rtp = (answerMediaObject.rtp || [])
              .find((r) => r.payload === codec.payloadType);
          if (!rtp)
              continue;
          // Just in case.
          answerMediaObject.fmtp = answerMediaObject.fmtp || [];
          let fmtp = answerMediaObject.fmtp
              .find((f) => f.payload === codec.payloadType);
          if (!fmtp) {
              fmtp = { payload: codec.payloadType, config: '' };
              answerMediaObject.fmtp.push(fmtp);
          }
          const parameters = sdpTransform.parseParams(fmtp.config);
          switch (mimeType) {
              case 'audio/opus':
                  {
                      const spropStereo = codec.parameters['sprop-stereo'];
                      if (spropStereo !== undefined)
                          parameters.stereo = spropStereo ? 1 : 0;
                      break;
                  }
          }
          // Write the codec fmtp.config back.
          fmtp.config = '';
          for (const key of Object.keys(parameters)) {
              if (fmtp.config)
                  fmtp.config += ';';
              fmtp.config += `${key}=${parameters[key]}`;
          }
      }
  }
  exports.applyCodecParameters = applyCodecParameters;
  
  },{"sdp-transform":"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/planBUtils.js":[function(require,module,exports){
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.addLegacySimulcast = exports.getRtpEncodings = void 0;
  function getRtpEncodings({ offerMediaObject, track }) {
      // First media SSRC (or the only one).
      let firstSsrc;
      const ssrcs = new Set();
      for (const line of offerMediaObject.ssrcs || []) {
          if (line.attribute !== 'msid')
              continue;
          const trackId = line.value.split(' ')[1];
          if (trackId === track.id) {
              const ssrc = line.id;
              ssrcs.add(ssrc);
              if (!firstSsrc)
                  firstSsrc = ssrc;
          }
      }
      if (ssrcs.size === 0)
          throw new Error(`a=ssrc line with msid information not found [track.id:${track.id}]`);
      const ssrcToRtxSsrc = new Map();
      // First assume RTX is used.
      for (const line of offerMediaObject.ssrcGroups || []) {
          if (line.semantics !== 'FID')
              continue;
          let [ssrc, rtxSsrc] = line.ssrcs.split(/\s+/);
          ssrc = Number(ssrc);
          rtxSsrc = Number(rtxSsrc);
          if (ssrcs.has(ssrc)) {
              // Remove both the SSRC and RTX SSRC from the set so later we know that they
              // are already handled.
              ssrcs.delete(ssrc);
              ssrcs.delete(rtxSsrc);
              // Add to the map.
              ssrcToRtxSsrc.set(ssrc, rtxSsrc);
          }
      }
      // If the set of SSRCs is not empty it means that RTX is not being used, so take
      // media SSRCs from there.
      for (const ssrc of ssrcs) {
          // Add to the map.
          ssrcToRtxSsrc.set(ssrc, null);
      }
      const encodings = [];
      for (const [ssrc, rtxSsrc] of ssrcToRtxSsrc) {
          const encoding = { ssrc };
          if (rtxSsrc)
              encoding.rtx = { ssrc: rtxSsrc };
          encodings.push(encoding);
      }
      return encodings;
  }
  exports.getRtpEncodings = getRtpEncodings;
  /**
   * Adds multi-ssrc based simulcast into the given SDP media section offer.
   */
  function addLegacySimulcast({ offerMediaObject, track, numStreams }) {
      if (numStreams <= 1)
          throw new TypeError('numStreams must be greater than 1');
      let firstSsrc;
      let firstRtxSsrc;
      let streamId;
      // Get the SSRC.
      const ssrcMsidLine = (offerMediaObject.ssrcs || [])
          .find((line) => {
          if (line.attribute !== 'msid')
              return false;
          const trackId = line.value.split(' ')[1];
          if (trackId === track.id) {
              firstSsrc = line.id;
              streamId = line.value.split(' ')[0];
              return true;
          }
          else {
              return false;
          }
      });
      if (!ssrcMsidLine)
          throw new Error(`a=ssrc line with msid information not found [track.id:${track.id}]`);
      // Get the SSRC for RTX.
      (offerMediaObject.ssrcGroups || [])
          .some((line) => {
          if (line.semantics !== 'FID')
              return false;
          const ssrcs = line.ssrcs.split(/\s+/);
          if (Number(ssrcs[0]) === firstSsrc) {
              firstRtxSsrc = Number(ssrcs[1]);
              return true;
          }
          else {
              return false;
          }
      });
      const ssrcCnameLine = offerMediaObject.ssrcs
          .find((line) => (line.attribute === 'cname' && line.id === firstSsrc));
      if (!ssrcCnameLine)
          throw new Error(`a=ssrc line with cname information not found [track.id:${track.id}]`);
      const cname = ssrcCnameLine.value;
      const ssrcs = [];
      const rtxSsrcs = [];
      for (let i = 0; i < numStreams; ++i) {
          ssrcs.push(firstSsrc + i);
          if (firstRtxSsrc)
              rtxSsrcs.push(firstRtxSsrc + i);
      }
      offerMediaObject.ssrcGroups = offerMediaObject.ssrcGroups || [];
      offerMediaObject.ssrcs = offerMediaObject.ssrcs || [];
      offerMediaObject.ssrcGroups.push({
          semantics: 'SIM',
          ssrcs: ssrcs.join(' ')
      });
      for (let i = 0; i < ssrcs.length; ++i) {
          const ssrc = ssrcs[i];
          offerMediaObject.ssrcs.push({
              id: ssrc,
              attribute: 'cname',
              value: cname
          });
          offerMediaObject.ssrcs.push({
              id: ssrc,
              attribute: 'msid',
              value: `${streamId} ${track.id}`
          });
      }
      for (let i = 0; i < rtxSsrcs.length; ++i) {
          const ssrc = ssrcs[i];
          const rtxSsrc = rtxSsrcs[i];
          offerMediaObject.ssrcs.push({
              id: rtxSsrc,
              attribute: 'cname',
              value: cname
          });
          offerMediaObject.ssrcs.push({
              id: rtxSsrc,
              attribute: 'msid',
              value: `${streamId} ${track.id}`
          });
          offerMediaObject.ssrcGroups.push({
              semantics: 'FID',
              ssrcs: `${ssrc} ${rtxSsrc}`
          });
      }
  }
  exports.addLegacySimulcast = addLegacySimulcast;
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/sdp/unifiedPlanUtils.js":[function(require,module,exports){
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.addLegacySimulcast = exports.getRtpEncodings = void 0;
  function getRtpEncodings({ offerMediaObject }) {
      const ssrcs = new Set();
      for (const line of offerMediaObject.ssrcs || []) {
          const ssrc = line.id;
          ssrcs.add(ssrc);
      }
      if (ssrcs.size === 0)
          throw new Error('no a=ssrc lines found');
      const ssrcToRtxSsrc = new Map();
      // First assume RTX is used.
      for (const line of offerMediaObject.ssrcGroups || []) {
          if (line.semantics !== 'FID')
              continue;
          let [ssrc, rtxSsrc] = line.ssrcs.split(/\s+/);
          ssrc = Number(ssrc);
          rtxSsrc = Number(rtxSsrc);
          if (ssrcs.has(ssrc)) {
              // Remove both the SSRC and RTX SSRC from the set so later we know that they
              // are already handled.
              ssrcs.delete(ssrc);
              ssrcs.delete(rtxSsrc);
              // Add to the map.
              ssrcToRtxSsrc.set(ssrc, rtxSsrc);
          }
      }
      // If the set of SSRCs is not empty it means that RTX is not being used, so take
      // media SSRCs from there.
      for (const ssrc of ssrcs) {
          // Add to the map.
          ssrcToRtxSsrc.set(ssrc, null);
      }
      const encodings = [];
      for (const [ssrc, rtxSsrc] of ssrcToRtxSsrc) {
          const encoding = { ssrc };
          if (rtxSsrc)
              encoding.rtx = { ssrc: rtxSsrc };
          encodings.push(encoding);
      }
      return encodings;
  }
  exports.getRtpEncodings = getRtpEncodings;
  /**
   * Adds multi-ssrc based simulcast into the given SDP media section offer.
   */
  function addLegacySimulcast({ offerMediaObject, numStreams }) {
      if (numStreams <= 1)
          throw new TypeError('numStreams must be greater than 1');
      // Get the SSRC.
      const ssrcMsidLine = (offerMediaObject.ssrcs || [])
          .find((line) => line.attribute === 'msid');
      if (!ssrcMsidLine)
          throw new Error('a=ssrc line with msid information not found');
      const [streamId, trackId] = ssrcMsidLine.value.split(' ');
      const firstSsrc = ssrcMsidLine.id;
      let firstRtxSsrc;
      // Get the SSRC for RTX.
      (offerMediaObject.ssrcGroups || [])
          .some((line) => {
          if (line.semantics !== 'FID')
              return false;
          const ssrcs = line.ssrcs.split(/\s+/);
          if (Number(ssrcs[0]) === firstSsrc) {
              firstRtxSsrc = Number(ssrcs[1]);
              return true;
          }
          else {
              return false;
          }
      });
      const ssrcCnameLine = offerMediaObject.ssrcs
          .find((line) => line.attribute === 'cname');
      if (!ssrcCnameLine)
          throw new Error('a=ssrc line with cname information not found');
      const cname = ssrcCnameLine.value;
      const ssrcs = [];
      const rtxSsrcs = [];
      for (let i = 0; i < numStreams; ++i) {
          ssrcs.push(firstSsrc + i);
          if (firstRtxSsrc)
              rtxSsrcs.push(firstRtxSsrc + i);
      }
      offerMediaObject.ssrcGroups = [];
      offerMediaObject.ssrcs = [];
      offerMediaObject.ssrcGroups.push({
          semantics: 'SIM',
          ssrcs: ssrcs.join(' ')
      });
      for (let i = 0; i < ssrcs.length; ++i) {
          const ssrc = ssrcs[i];
          offerMediaObject.ssrcs.push({
              id: ssrc,
              attribute: 'cname',
              value: cname
          });
          offerMediaObject.ssrcs.push({
              id: ssrc,
              attribute: 'msid',
              value: `${streamId} ${trackId}`
          });
      }
      for (let i = 0; i < rtxSsrcs.length; ++i) {
          const ssrc = ssrcs[i];
          const rtxSsrc = rtxSsrcs[i];
          offerMediaObject.ssrcs.push({
              id: rtxSsrc,
              attribute: 'cname',
              value: cname
          });
          offerMediaObject.ssrcs.push({
              id: rtxSsrc,
              attribute: 'msid',
              value: `${streamId} ${trackId}`
          });
          offerMediaObject.ssrcGroups.push({
              semantics: 'FID',
              ssrcs: `${ssrc} ${rtxSsrc}`
          });
      }
  }
  exports.addLegacySimulcast = addLegacySimulcast;
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/index.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.detectDevice = exports.Device = exports.version = exports.types = void 0;
  const Device_1 = require("./Device");
  Object.defineProperty(exports, "Device", { enumerable: true, get: function () { return Device_1.Device; } });
  Object.defineProperty(exports, "detectDevice", { enumerable: true, get: function () { return Device_1.detectDevice; } });
  const types = __importStar(require("./types"));
  exports.types = types;
  /**
   * Expose mediasoup-client version.
   */
  exports.version = '3.6.34';
  /**
   * Expose parseScalabilityMode() function.
   */
  var scalabilityModes_1 = require("./scalabilityModes");
  Object.defineProperty(exports, "parseScalabilityMode", { enumerable: true, get: function () { return scalabilityModes_1.parse; } });
  
  },{"./Device":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Device.js","./scalabilityModes":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/scalabilityModes.js","./types":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/types.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/ortc.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (this && this.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.canReceive = exports.canSend = exports.generateProbatorRtpParameters = exports.reduceCodecs = exports.getSendingRemoteRtpParameters = exports.getSendingRtpParameters = exports.getRecvRtpCapabilities = exports.getExtendedRtpCapabilities = exports.validateSctpStreamParameters = exports.validateSctpParameters = exports.validateNumSctpStreams = exports.validateSctpCapabilities = exports.validateRtcpParameters = exports.validateRtpEncodingParameters = exports.validateRtpHeaderExtensionParameters = exports.validateRtpCodecParameters = exports.validateRtpParameters = exports.validateRtpHeaderExtension = exports.validateRtcpFeedback = exports.validateRtpCodecCapability = exports.validateRtpCapabilities = void 0;
  const h264 = __importStar(require("h264-profile-level-id"));
  const utils = __importStar(require("./utils"));
  const RTP_PROBATOR_MID = 'probator';
  const RTP_PROBATOR_SSRC = 1234;
  const RTP_PROBATOR_CODEC_PAYLOAD_TYPE = 127;
  /**
   * Validates RtpCapabilities. It may modify given data by adding missing
   * fields with default values.
   * It throws if invalid.
   */
  function validateRtpCapabilities(caps) {
      if (typeof caps !== 'object')
          throw new TypeError('caps is not an object');
      // codecs is optional. If unset, fill with an empty array.
      if (caps.codecs && !Array.isArray(caps.codecs))
          throw new TypeError('caps.codecs is not an array');
      else if (!caps.codecs)
          caps.codecs = [];
      for (const codec of caps.codecs) {
          validateRtpCodecCapability(codec);
      }
      // headerExtensions is optional. If unset, fill with an empty array.
      if (caps.headerExtensions && !Array.isArray(caps.headerExtensions))
          throw new TypeError('caps.headerExtensions is not an array');
      else if (!caps.headerExtensions)
          caps.headerExtensions = [];
      for (const ext of caps.headerExtensions) {
          validateRtpHeaderExtension(ext);
      }
  }
  exports.validateRtpCapabilities = validateRtpCapabilities;
  /**
   * Validates RtpCodecCapability. It may modify given data by adding missing
   * fields with default values.
   * It throws if invalid.
   */
  function validateRtpCodecCapability(codec) {
      const MimeTypeRegex = new RegExp('^(audio|video)/(.+)', 'i');
      if (typeof codec !== 'object')
          throw new TypeError('codec is not an object');
      // mimeType is mandatory.
      if (!codec.mimeType || typeof codec.mimeType !== 'string')
          throw new TypeError('missing codec.mimeType');
      const mimeTypeMatch = MimeTypeRegex.exec(codec.mimeType);
      if (!mimeTypeMatch)
          throw new TypeError('invalid codec.mimeType');
      // Just override kind with media component of mimeType.
      codec.kind = mimeTypeMatch[1].toLowerCase();
      // preferredPayloadType is optional.
      if (codec.preferredPayloadType && typeof codec.preferredPayloadType !== 'number')
          throw new TypeError('invalid codec.preferredPayloadType');
      // clockRate is mandatory.
      if (typeof codec.clockRate !== 'number')
          throw new TypeError('missing codec.clockRate');
      // channels is optional. If unset, set it to 1 (just if audio).
      if (codec.kind === 'audio') {
          if (typeof codec.channels !== 'number')
              codec.channels = 1;
      }
      else {
          delete codec.channels;
      }
      // parameters is optional. If unset, set it to an empty object.
      if (!codec.parameters || typeof codec.parameters !== 'object')
          codec.parameters = {};
      for (const key of Object.keys(codec.parameters)) {
          let value = codec.parameters[key];
          if (value === undefined) {
              codec.parameters[key] = '';
              value = '';
          }
          if (typeof value !== 'string' && typeof value !== 'number') {
              throw new TypeError(`invalid codec parameter [key:${key}s, value:${value}]`);
          }
          // Specific parameters validation.
          if (key === 'apt') {
              if (typeof value !== 'number')
                  throw new TypeError('invalid codec apt parameter');
          }
      }
      // rtcpFeedback is optional. If unset, set it to an empty array.
      if (!codec.rtcpFeedback || !Array.isArray(codec.rtcpFeedback))
          codec.rtcpFeedback = [];
      for (const fb of codec.rtcpFeedback) {
          validateRtcpFeedback(fb);
      }
  }
  exports.validateRtpCodecCapability = validateRtpCodecCapability;
  /**
   * Validates RtcpFeedback. It may modify given data by adding missing
   * fields with default values.
   * It throws if invalid.
   */
  function validateRtcpFeedback(fb) {
      if (typeof fb !== 'object')
          throw new TypeError('fb is not an object');
      // type is mandatory.
      if (!fb.type || typeof fb.type !== 'string')
          throw new TypeError('missing fb.type');
      // parameter is optional. If unset set it to an empty string.
      if (!fb.parameter || typeof fb.parameter !== 'string')
          fb.parameter = '';
  }
  exports.validateRtcpFeedback = validateRtcpFeedback;
  /**
   * Validates RtpHeaderExtension. It may modify given data by adding missing
   * fields with default values.
   * It throws if invalid.
   */
  function validateRtpHeaderExtension(ext) {
      if (typeof ext !== 'object')
          throw new TypeError('ext is not an object');
      // kind is mandatory.
      if (ext.kind !== 'audio' && ext.kind !== 'video')
          throw new TypeError('invalid ext.kind');
      // uri is mandatory.
      if (!ext.uri || typeof ext.uri !== 'string')
          throw new TypeError('missing ext.uri');
      // preferredId is mandatory.
      if (typeof ext.preferredId !== 'number')
          throw new TypeError('missing ext.preferredId');
      // preferredEncrypt is optional. If unset set it to false.
      if (ext.preferredEncrypt && typeof ext.preferredEncrypt !== 'boolean')
          throw new TypeError('invalid ext.preferredEncrypt');
      else if (!ext.preferredEncrypt)
          ext.preferredEncrypt = false;
      // direction is optional. If unset set it to sendrecv.
      if (ext.direction && typeof ext.direction !== 'string')
          throw new TypeError('invalid ext.direction');
      else if (!ext.direction)
          ext.direction = 'sendrecv';
  }
  exports.validateRtpHeaderExtension = validateRtpHeaderExtension;
  /**
   * Validates RtpParameters. It may modify given data by adding missing
   * fields with default values.
   * It throws if invalid.
   */
  function validateRtpParameters(params) {
      if (typeof params !== 'object')
          throw new TypeError('params is not an object');
      // mid is optional.
      if (params.mid && typeof params.mid !== 'string')
          throw new TypeError('params.mid is not a string');
      // codecs is mandatory.
      if (!Array.isArray(params.codecs))
          throw new TypeError('missing params.codecs');
      for (const codec of params.codecs) {
          validateRtpCodecParameters(codec);
      }
      // headerExtensions is optional. If unset, fill with an empty array.
      if (params.headerExtensions && !Array.isArray(params.headerExtensions))
          throw new TypeError('params.headerExtensions is not an array');
      else if (!params.headerExtensions)
          params.headerExtensions = [];
      for (const ext of params.headerExtensions) {
          validateRtpHeaderExtensionParameters(ext);
      }
      // encodings is optional. If unset, fill with an empty array.
      if (params.encodings && !Array.isArray(params.encodings))
          throw new TypeError('params.encodings is not an array');
      else if (!params.encodings)
          params.encodings = [];
      for (const encoding of params.encodings) {
          validateRtpEncodingParameters(encoding);
      }
      // rtcp is optional. If unset, fill with an empty object.
      if (params.rtcp && typeof params.rtcp !== 'object')
          throw new TypeError('params.rtcp is not an object');
      else if (!params.rtcp)
          params.rtcp = {};
      validateRtcpParameters(params.rtcp);
  }
  exports.validateRtpParameters = validateRtpParameters;
  /**
   * Validates RtpCodecParameters. It may modify given data by adding missing
   * fields with default values.
   * It throws if invalid.
   */
  function validateRtpCodecParameters(codec) {
      const MimeTypeRegex = new RegExp('^(audio|video)/(.+)', 'i');
      if (typeof codec !== 'object')
          throw new TypeError('codec is not an object');
      // mimeType is mandatory.
      if (!codec.mimeType || typeof codec.mimeType !== 'string')
          throw new TypeError('missing codec.mimeType');
      const mimeTypeMatch = MimeTypeRegex.exec(codec.mimeType);
      if (!mimeTypeMatch)
          throw new TypeError('invalid codec.mimeType');
      // payloadType is mandatory.
      if (typeof codec.payloadType !== 'number')
          throw new TypeError('missing codec.payloadType');
      // clockRate is mandatory.
      if (typeof codec.clockRate !== 'number')
          throw new TypeError('missing codec.clockRate');
      const kind = mimeTypeMatch[1].toLowerCase();
      // channels is optional. If unset, set it to 1 (just if audio).
      if (kind === 'audio') {
          if (typeof codec.channels !== 'number')
              codec.channels = 1;
      }
      else {
          delete codec.channels;
      }
      // parameters is optional. If unset, set it to an empty object.
      if (!codec.parameters || typeof codec.parameters !== 'object')
          codec.parameters = {};
      for (const key of Object.keys(codec.parameters)) {
          let value = codec.parameters[key];
          if (value === undefined) {
              codec.parameters[key] = '';
              value = '';
          }
          if (typeof value !== 'string' && typeof value !== 'number') {
              throw new TypeError(`invalid codec parameter [key:${key}s, value:${value}]`);
          }
          // Specific parameters validation.
          if (key === 'apt') {
              if (typeof value !== 'number')
                  throw new TypeError('invalid codec apt parameter');
          }
      }
      // rtcpFeedback is optional. If unset, set it to an empty array.
      if (!codec.rtcpFeedback || !Array.isArray(codec.rtcpFeedback))
          codec.rtcpFeedback = [];
      for (const fb of codec.rtcpFeedback) {
          validateRtcpFeedback(fb);
      }
  }
  exports.validateRtpCodecParameters = validateRtpCodecParameters;
  /**
   * Validates RtpHeaderExtensionParameteters. It may modify given data by adding missing
   * fields with default values.
   * It throws if invalid.
   */
  function validateRtpHeaderExtensionParameters(ext) {
      if (typeof ext !== 'object')
          throw new TypeError('ext is not an object');
      // uri is mandatory.
      if (!ext.uri || typeof ext.uri !== 'string')
          throw new TypeError('missing ext.uri');
      // id is mandatory.
      if (typeof ext.id !== 'number')
          throw new TypeError('missing ext.id');
      // encrypt is optional. If unset set it to false.
      if (ext.encrypt && typeof ext.encrypt !== 'boolean')
          throw new TypeError('invalid ext.encrypt');
      else if (!ext.encrypt)
          ext.encrypt = false;
      // parameters is optional. If unset, set it to an empty object.
      if (!ext.parameters || typeof ext.parameters !== 'object')
          ext.parameters = {};
      for (const key of Object.keys(ext.parameters)) {
          let value = ext.parameters[key];
          if (value === undefined) {
              ext.parameters[key] = '';
              value = '';
          }
          if (typeof value !== 'string' && typeof value !== 'number')
              throw new TypeError('invalid header extension parameter');
      }
  }
  exports.validateRtpHeaderExtensionParameters = validateRtpHeaderExtensionParameters;
  /**
   * Validates RtpEncodingParameters. It may modify given data by adding missing
   * fields with default values.
   * It throws if invalid.
   */
  function validateRtpEncodingParameters(encoding) {
      if (typeof encoding !== 'object')
          throw new TypeError('encoding is not an object');
      // ssrc is optional.
      if (encoding.ssrc && typeof encoding.ssrc !== 'number')
          throw new TypeError('invalid encoding.ssrc');
      // rid is optional.
      if (encoding.rid && typeof encoding.rid !== 'string')
          throw new TypeError('invalid encoding.rid');
      // rtx is optional.
      if (encoding.rtx && typeof encoding.rtx !== 'object') {
          throw new TypeError('invalid encoding.rtx');
      }
      else if (encoding.rtx) {
          // RTX ssrc is mandatory if rtx is present.
          if (typeof encoding.rtx.ssrc !== 'number')
              throw new TypeError('missing encoding.rtx.ssrc');
      }
      // dtx is optional. If unset set it to false.
      if (!encoding.dtx || typeof encoding.dtx !== 'boolean')
          encoding.dtx = false;
      // scalabilityMode is optional.
      if (encoding.scalabilityMode && typeof encoding.scalabilityMode !== 'string')
          throw new TypeError('invalid encoding.scalabilityMode');
  }
  exports.validateRtpEncodingParameters = validateRtpEncodingParameters;
  /**
   * Validates RtcpParameters. It may modify given data by adding missing
   * fields with default values.
   * It throws if invalid.
   */
  function validateRtcpParameters(rtcp) {
      if (typeof rtcp !== 'object')
          throw new TypeError('rtcp is not an object');
      // cname is optional.
      if (rtcp.cname && typeof rtcp.cname !== 'string')
          throw new TypeError('invalid rtcp.cname');
      // reducedSize is optional. If unset set it to true.
      if (!rtcp.reducedSize || typeof rtcp.reducedSize !== 'boolean')
          rtcp.reducedSize = true;
  }
  exports.validateRtcpParameters = validateRtcpParameters;
  /**
   * Validates SctpCapabilities. It may modify given data by adding missing
   * fields with default values.
   * It throws if invalid.
   */
  function validateSctpCapabilities(caps) {
      if (typeof caps !== 'object')
          throw new TypeError('caps is not an object');
      // numStreams is mandatory.
      if (!caps.numStreams || typeof caps.numStreams !== 'object')
          throw new TypeError('missing caps.numStreams');
      validateNumSctpStreams(caps.numStreams);
  }
  exports.validateSctpCapabilities = validateSctpCapabilities;
  /**
   * Validates NumSctpStreams. It may modify given data by adding missing
   * fields with default values.
   * It throws if invalid.
   */
  function validateNumSctpStreams(numStreams) {
      if (typeof numStreams !== 'object')
          throw new TypeError('numStreams is not an object');
      // OS is mandatory.
      if (typeof numStreams.OS !== 'number')
          throw new TypeError('missing numStreams.OS');
      // MIS is mandatory.
      if (typeof numStreams.MIS !== 'number')
          throw new TypeError('missing numStreams.MIS');
  }
  exports.validateNumSctpStreams = validateNumSctpStreams;
  /**
   * Validates SctpParameters. It may modify given data by adding missing
   * fields with default values.
   * It throws if invalid.
   */
  function validateSctpParameters(params) {
      if (typeof params !== 'object')
          throw new TypeError('params is not an object');
      // port is mandatory.
      if (typeof params.port !== 'number')
          throw new TypeError('missing params.port');
      // OS is mandatory.
      if (typeof params.OS !== 'number')
          throw new TypeError('missing params.OS');
      // MIS is mandatory.
      if (typeof params.MIS !== 'number')
          throw new TypeError('missing params.MIS');
      // maxMessageSize is mandatory.
      if (typeof params.maxMessageSize !== 'number')
          throw new TypeError('missing params.maxMessageSize');
  }
  exports.validateSctpParameters = validateSctpParameters;
  /**
   * Validates SctpStreamParameters. It may modify given data by adding missing
   * fields with default values.
   * It throws if invalid.
   */
  function validateSctpStreamParameters(params) {
      if (typeof params !== 'object')
          throw new TypeError('params is not an object');
      // streamId is mandatory.
      if (typeof params.streamId !== 'number')
          throw new TypeError('missing params.streamId');
      // ordered is optional.
      let orderedGiven = false;
      if (typeof params.ordered === 'boolean')
          orderedGiven = true;
      else
          params.ordered = true;
      // maxPacketLifeTime is optional.
      if (params.maxPacketLifeTime && typeof params.maxPacketLifeTime !== 'number')
          throw new TypeError('invalid params.maxPacketLifeTime');
      // maxRetransmits is optional.
      if (params.maxRetransmits && typeof params.maxRetransmits !== 'number')
          throw new TypeError('invalid params.maxRetransmits');
      if (params.maxPacketLifeTime && params.maxRetransmits)
          throw new TypeError('cannot provide both maxPacketLifeTime and maxRetransmits');
      if (orderedGiven &&
          params.ordered &&
          (params.maxPacketLifeTime || params.maxRetransmits)) {
          throw new TypeError('cannot be ordered with maxPacketLifeTime or maxRetransmits');
      }
      else if (!orderedGiven && (params.maxPacketLifeTime || params.maxRetransmits)) {
          params.ordered = false;
      }
      // label is optional.
      if (params.label && typeof params.label !== 'string')
          throw new TypeError('invalid params.label');
      // protocol is optional.
      if (params.protocol && typeof params.protocol !== 'string')
          throw new TypeError('invalid params.protocol');
  }
  exports.validateSctpStreamParameters = validateSctpStreamParameters;
  /**
   * Generate extended RTP capabilities for sending and receiving.
   */
  function getExtendedRtpCapabilities(localCaps, remoteCaps) {
      const extendedRtpCapabilities = {
          codecs: [],
          headerExtensions: []
      };
      // Match media codecs and keep the order preferred by remoteCaps.
      for (const remoteCodec of remoteCaps.codecs || []) {
          if (isRtxCodec(remoteCodec))
              continue;
          const matchingLocalCodec = (localCaps.codecs || [])
              .find((localCodec) => (matchCodecs(localCodec, remoteCodec, { strict: true, modify: true })));
          if (!matchingLocalCodec)
              continue;
          const extendedCodec = {
              mimeType: matchingLocalCodec.mimeType,
              kind: matchingLocalCodec.kind,
              clockRate: matchingLocalCodec.clockRate,
              channels: matchingLocalCodec.channels,
              localPayloadType: matchingLocalCodec.preferredPayloadType,
              localRtxPayloadType: undefined,
              remotePayloadType: remoteCodec.preferredPayloadType,
              remoteRtxPayloadType: undefined,
              localParameters: matchingLocalCodec.parameters,
              remoteParameters: remoteCodec.parameters,
              rtcpFeedback: reduceRtcpFeedback(matchingLocalCodec, remoteCodec)
          };
          extendedRtpCapabilities.codecs.push(extendedCodec);
      }
      // Match RTX codecs.
      for (const extendedCodec of extendedRtpCapabilities.codecs) {
          const matchingLocalRtxCodec = localCaps.codecs
              .find((localCodec) => (isRtxCodec(localCodec) &&
              localCodec.parameters.apt === extendedCodec.localPayloadType));
          const matchingRemoteRtxCodec = remoteCaps.codecs
              .find((remoteCodec) => (isRtxCodec(remoteCodec) &&
              remoteCodec.parameters.apt === extendedCodec.remotePayloadType));
          if (matchingLocalRtxCodec && matchingRemoteRtxCodec) {
              extendedCodec.localRtxPayloadType = matchingLocalRtxCodec.preferredPayloadType;
              extendedCodec.remoteRtxPayloadType = matchingRemoteRtxCodec.preferredPayloadType;
          }
      }
      // Match header extensions.
      for (const remoteExt of remoteCaps.headerExtensions) {
          const matchingLocalExt = localCaps.headerExtensions
              .find((localExt) => (matchHeaderExtensions(localExt, remoteExt)));
          if (!matchingLocalExt)
              continue;
          const extendedExt = {
              kind: remoteExt.kind,
              uri: remoteExt.uri,
              sendId: matchingLocalExt.preferredId,
              recvId: remoteExt.preferredId,
              encrypt: matchingLocalExt.preferredEncrypt,
              direction: 'sendrecv'
          };
          switch (remoteExt.direction) {
              case 'sendrecv':
                  extendedExt.direction = 'sendrecv';
                  break;
              case 'recvonly':
                  extendedExt.direction = 'sendonly';
                  break;
              case 'sendonly':
                  extendedExt.direction = 'recvonly';
                  break;
              case 'inactive':
                  extendedExt.direction = 'inactive';
                  break;
          }
          extendedRtpCapabilities.headerExtensions.push(extendedExt);
      }
      return extendedRtpCapabilities;
  }
  exports.getExtendedRtpCapabilities = getExtendedRtpCapabilities;
  /**
   * Generate RTP capabilities for receiving media based on the given extended
   * RTP capabilities.
   */
  function getRecvRtpCapabilities(extendedRtpCapabilities) {
      const rtpCapabilities = {
          codecs: [],
          headerExtensions: []
      };
      for (const extendedCodec of extendedRtpCapabilities.codecs) {
          const codec = {
              mimeType: extendedCodec.mimeType,
              kind: extendedCodec.kind,
              preferredPayloadType: extendedCodec.remotePayloadType,
              clockRate: extendedCodec.clockRate,
              channels: extendedCodec.channels,
              parameters: extendedCodec.localParameters,
              rtcpFeedback: extendedCodec.rtcpFeedback
          };
          rtpCapabilities.codecs.push(codec);
          // Add RTX codec.
          if (!extendedCodec.remoteRtxPayloadType)
              continue;
          const rtxCodec = {
              mimeType: `${extendedCodec.kind}/rtx`,
              kind: extendedCodec.kind,
              preferredPayloadType: extendedCodec.remoteRtxPayloadType,
              clockRate: extendedCodec.clockRate,
              parameters: {
                  apt: extendedCodec.remotePayloadType
              },
              rtcpFeedback: []
          };
          rtpCapabilities.codecs.push(rtxCodec);
          // TODO: In the future, we need to add FEC, CN, etc, codecs.
      }
      for (const extendedExtension of extendedRtpCapabilities.headerExtensions) {
          // Ignore RTP extensions not valid for receiving.
          if (extendedExtension.direction !== 'sendrecv' &&
              extendedExtension.direction !== 'recvonly') {
              continue;
          }
          const ext = {
              kind: extendedExtension.kind,
              uri: extendedExtension.uri,
              preferredId: extendedExtension.recvId,
              preferredEncrypt: extendedExtension.encrypt,
              direction: extendedExtension.direction
          };
          rtpCapabilities.headerExtensions.push(ext);
      }
      return rtpCapabilities;
  }
  exports.getRecvRtpCapabilities = getRecvRtpCapabilities;
  /**
   * Generate RTP parameters of the given kind for sending media.
   * NOTE: mid, encodings and rtcp fields are left empty.
   */
  function getSendingRtpParameters(kind, extendedRtpCapabilities) {
      const rtpParameters = {
          mid: undefined,
          codecs: [],
          headerExtensions: [],
          encodings: [],
          rtcp: {}
      };
      for (const extendedCodec of extendedRtpCapabilities.codecs) {
          if (extendedCodec.kind !== kind)
              continue;
          const codec = {
              mimeType: extendedCodec.mimeType,
              payloadType: extendedCodec.localPayloadType,
              clockRate: extendedCodec.clockRate,
              channels: extendedCodec.channels,
              parameters: extendedCodec.localParameters,
              rtcpFeedback: extendedCodec.rtcpFeedback
          };
          rtpParameters.codecs.push(codec);
          // Add RTX codec.
          if (extendedCodec.localRtxPayloadType) {
              const rtxCodec = {
                  mimeType: `${extendedCodec.kind}/rtx`,
                  payloadType: extendedCodec.localRtxPayloadType,
                  clockRate: extendedCodec.clockRate,
                  parameters: {
                      apt: extendedCodec.localPayloadType
                  },
                  rtcpFeedback: []
              };
              rtpParameters.codecs.push(rtxCodec);
          }
      }
      for (const extendedExtension of extendedRtpCapabilities.headerExtensions) {
          // Ignore RTP extensions of a different kind and those not valid for sending.
          if ((extendedExtension.kind && extendedExtension.kind !== kind) ||
              (extendedExtension.direction !== 'sendrecv' &&
                  extendedExtension.direction !== 'sendonly')) {
              continue;
          }
          const ext = {
              uri: extendedExtension.uri,
              id: extendedExtension.sendId,
              encrypt: extendedExtension.encrypt,
              parameters: {}
          };
          rtpParameters.headerExtensions.push(ext);
      }
      return rtpParameters;
  }
  exports.getSendingRtpParameters = getSendingRtpParameters;
  /**
   * Generate RTP parameters of the given kind suitable for the remote SDP answer.
   */
  function getSendingRemoteRtpParameters(kind, extendedRtpCapabilities) {
      const rtpParameters = {
          mid: undefined,
          codecs: [],
          headerExtensions: [],
          encodings: [],
          rtcp: {}
      };
      for (const extendedCodec of extendedRtpCapabilities.codecs) {
          if (extendedCodec.kind !== kind)
              continue;
          const codec = {
              mimeType: extendedCodec.mimeType,
              payloadType: extendedCodec.localPayloadType,
              clockRate: extendedCodec.clockRate,
              channels: extendedCodec.channels,
              parameters: extendedCodec.remoteParameters,
              rtcpFeedback: extendedCodec.rtcpFeedback
          };
          rtpParameters.codecs.push(codec);
          // Add RTX codec.
          if (extendedCodec.localRtxPayloadType) {
              const rtxCodec = {
                  mimeType: `${extendedCodec.kind}/rtx`,
                  payloadType: extendedCodec.localRtxPayloadType,
                  clockRate: extendedCodec.clockRate,
                  parameters: {
                      apt: extendedCodec.localPayloadType
                  },
                  rtcpFeedback: []
              };
              rtpParameters.codecs.push(rtxCodec);
          }
      }
      for (const extendedExtension of extendedRtpCapabilities.headerExtensions) {
          // Ignore RTP extensions of a different kind and those not valid for sending.
          if ((extendedExtension.kind && extendedExtension.kind !== kind) ||
              (extendedExtension.direction !== 'sendrecv' &&
                  extendedExtension.direction !== 'sendonly')) {
              continue;
          }
          const ext = {
              uri: extendedExtension.uri,
              id: extendedExtension.sendId,
              encrypt: extendedExtension.encrypt,
              parameters: {}
          };
          rtpParameters.headerExtensions.push(ext);
      }
      // Reduce codecs' RTCP feedback. Use Transport-CC if available, REMB otherwise.
      if (rtpParameters.headerExtensions.some((ext) => (ext.uri === 'http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01'))) {
          for (const codec of rtpParameters.codecs) {
              codec.rtcpFeedback = (codec.rtcpFeedback || [])
                  .filter((fb) => fb.type !== 'goog-remb');
          }
      }
      else if (rtpParameters.headerExtensions.some((ext) => (ext.uri === 'http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time'))) {
          for (const codec of rtpParameters.codecs) {
              codec.rtcpFeedback = (codec.rtcpFeedback || [])
                  .filter((fb) => fb.type !== 'transport-cc');
          }
      }
      else {
          for (const codec of rtpParameters.codecs) {
              codec.rtcpFeedback = (codec.rtcpFeedback || [])
                  .filter((fb) => (fb.type !== 'transport-cc' &&
                  fb.type !== 'goog-remb'));
          }
      }
      return rtpParameters;
  }
  exports.getSendingRemoteRtpParameters = getSendingRemoteRtpParameters;
  /**
   * Reduce given codecs by returning an array of codecs "compatible" with the
   * given capability codec. If no capability codec is given, take the first
   * one(s).
   *
   * Given codecs must be generated by ortc.getSendingRtpParameters() or
   * ortc.getSendingRemoteRtpParameters().
   *
   * The returned array of codecs also include a RTX codec if available.
   */
  function reduceCodecs(codecs, capCodec) {
      const filteredCodecs = [];
      // If no capability codec is given, take the first one (and RTX).
      if (!capCodec) {
          filteredCodecs.push(codecs[0]);
          if (isRtxCodec(codecs[1]))
              filteredCodecs.push(codecs[1]);
      }
      // Otherwise look for a compatible set of codecs.
      else {
          for (let idx = 0; idx < codecs.length; ++idx) {
              if (matchCodecs(codecs[idx], capCodec)) {
                  filteredCodecs.push(codecs[idx]);
                  if (isRtxCodec(codecs[idx + 1]))
                      filteredCodecs.push(codecs[idx + 1]);
                  break;
              }
          }
          if (filteredCodecs.length === 0)
              throw new TypeError('no matching codec found');
      }
      return filteredCodecs;
  }
  exports.reduceCodecs = reduceCodecs;
  /**
   * Create RTP parameters for a Consumer for the RTP probator.
   */
  function generateProbatorRtpParameters(videoRtpParameters) {
      // Clone given reference video RTP parameters.
      videoRtpParameters = utils.clone(videoRtpParameters, {});
      // This may throw.
      validateRtpParameters(videoRtpParameters);
      const rtpParameters = {
          mid: RTP_PROBATOR_MID,
          codecs: [],
          headerExtensions: [],
          encodings: [{ ssrc: RTP_PROBATOR_SSRC }],
          rtcp: { cname: 'probator' }
      };
      rtpParameters.codecs.push(videoRtpParameters.codecs[0]);
      rtpParameters.codecs[0].payloadType = RTP_PROBATOR_CODEC_PAYLOAD_TYPE;
      rtpParameters.headerExtensions = videoRtpParameters.headerExtensions;
      return rtpParameters;
  }
  exports.generateProbatorRtpParameters = generateProbatorRtpParameters;
  /**
   * Whether media can be sent based on the given RTP capabilities.
   */
  function canSend(kind, extendedRtpCapabilities) {
      return extendedRtpCapabilities.codecs.
          some((codec) => codec.kind === kind);
  }
  exports.canSend = canSend;
  /**
   * Whether the given RTP parameters can be received with the given RTP
   * capabilities.
   */
  function canReceive(rtpParameters, extendedRtpCapabilities) {
      // This may throw.
      validateRtpParameters(rtpParameters);
      if (rtpParameters.codecs.length === 0)
          return false;
      const firstMediaCodec = rtpParameters.codecs[0];
      return extendedRtpCapabilities.codecs
          .some((codec) => codec.remotePayloadType === firstMediaCodec.payloadType);
  }
  exports.canReceive = canReceive;
  function isRtxCodec(codec) {
      if (!codec)
          return false;
      return /.+\/rtx$/i.test(codec.mimeType);
  }
  function matchCodecs(aCodec, bCodec, { strict = false, modify = false } = {}) {
      const aMimeType = aCodec.mimeType.toLowerCase();
      const bMimeType = bCodec.mimeType.toLowerCase();
      if (aMimeType !== bMimeType)
          return false;
      if (aCodec.clockRate !== bCodec.clockRate)
          return false;
      if (aCodec.channels !== bCodec.channels)
          return false;
      // Per codec special checks.
      switch (aMimeType) {
          case 'video/h264':
              {
                  const aPacketizationMode = aCodec.parameters['packetization-mode'] || 0;
                  const bPacketizationMode = bCodec.parameters['packetization-mode'] || 0;
                  if (aPacketizationMode !== bPacketizationMode)
                      return false;
                  // If strict matching check profile-level-id.
                  if (strict) {
                      if (!h264.isSameProfile(aCodec.parameters, bCodec.parameters))
                          return false;
                      let selectedProfileLevelId;
                      try {
                          selectedProfileLevelId =
                              h264.generateProfileLevelIdForAnswer(aCodec.parameters, bCodec.parameters);
                      }
                      catch (error) {
                          return false;
                      }
                      if (modify) {
                          if (selectedProfileLevelId) {
                              aCodec.parameters['profile-level-id'] = selectedProfileLevelId;
                              bCodec.parameters['profile-level-id'] = selectedProfileLevelId;
                          }
                          else {
                              delete aCodec.parameters['profile-level-id'];
                              delete bCodec.parameters['profile-level-id'];
                          }
                      }
                  }
                  break;
              }
          case 'video/vp9':
              {
                  // If strict matching check profile-id.
                  if (strict) {
                      const aProfileId = aCodec.parameters['profile-id'] || 0;
                      const bProfileId = bCodec.parameters['profile-id'] || 0;
                      if (aProfileId !== bProfileId)
                          return false;
                  }
                  break;
              }
      }
      return true;
  }
  function matchHeaderExtensions(aExt, bExt) {
      if (aExt.kind && bExt.kind && aExt.kind !== bExt.kind)
          return false;
      if (aExt.uri !== bExt.uri)
          return false;
      return true;
  }
  function reduceRtcpFeedback(codecA, codecB) {
      const reducedRtcpFeedback = [];
      for (const aFb of codecA.rtcpFeedback || []) {
          const matchingBFb = (codecB.rtcpFeedback || [])
              .find((bFb) => (bFb.type === aFb.type &&
              (bFb.parameter === aFb.parameter || (!bFb.parameter && !aFb.parameter))));
          if (matchingBFb)
              reducedRtcpFeedback.push(matchingBFb);
      }
      return reducedRtcpFeedback;
  }
  
  },{"./utils":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js","h264-profile-level-id":"/home/ubuntu/umbrella-voice2/app/node_modules/h264-profile-level-id/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/scalabilityModes.js":[function(require,module,exports){
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.parse = void 0;
  const ScalabilityModeRegex = new RegExp('^[LS]([1-9]\\d{0,1})T([1-9]\\d{0,1})');
  function parse(scalabilityMode) {
      const match = ScalabilityModeRegex.exec(scalabilityMode || '');
      if (match) {
          return {
              spatialLayers: Number(match[1]),
              temporalLayers: Number(match[2])
          };
      }
      else {
          return {
              spatialLayers: 1,
              temporalLayers: 1
          };
      }
  }
  exports.parse = parse;
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/types.js":[function(require,module,exports){
  "use strict";
  var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __exportStar = (this && this.__exportStar) || function(m, exports) {
      for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(require("./Device"), exports);
  __exportStar(require("./Transport"), exports);
  __exportStar(require("./Producer"), exports);
  __exportStar(require("./Consumer"), exports);
  __exportStar(require("./DataProducer"), exports);
  __exportStar(require("./DataConsumer"), exports);
  __exportStar(require("./RtpParameters"), exports);
  __exportStar(require("./SctpParameters"), exports);
  __exportStar(require("./handlers/HandlerInterface"), exports);
  __exportStar(require("./errors"), exports);
  
  },{"./Consumer":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Consumer.js","./DataConsumer":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/DataConsumer.js","./DataProducer":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/DataProducer.js","./Device":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Device.js","./Producer":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Producer.js","./RtpParameters":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/RtpParameters.js","./SctpParameters":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/SctpParameters.js","./Transport":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/Transport.js","./errors":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/errors.js","./handlers/HandlerInterface":"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/handlers/HandlerInterface.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/mediasoup-client/lib/utils.js":[function(require,module,exports){
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.generateRandomNumber = exports.clone = void 0;
  /**
   * Clones the given data.
   */
  function clone(data, defaultValue) {
      if (typeof data === 'undefined')
          return defaultValue;
      return JSON.parse(JSON.stringify(data));
  }
  exports.clone = clone;
  /**
   * Generates a random positive integer.
   */
  function generateRandomNumber() {
      return Math.round(Math.random() * 10000000);
  }
  exports.generateRandomNumber = generateRandomNumber;
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/ms/index.js":[function(require,module,exports){
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
  
  module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse(val);
    } else if (type === 'number' && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
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
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    );
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
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/process/browser.js":[function(require,module,exports){
  // shim for using process in browser
  var process = module.exports = {};
  
  // cached from whatever global is present so that test runners that stub it
  // don't break things.  But we need to wrap it in a try catch in case it is
  // wrapped in strict mode code which doesn't define any globals.  It's inside a
  // function because try/catches deoptimize in certain engines.
  
  var cachedSetTimeout;
  var cachedClearTimeout;
  
  function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined');
  }
  (function () {
      try {
          if (typeof setTimeout === 'function') {
              cachedSetTimeout = setTimeout;
          } else {
              cachedSetTimeout = defaultSetTimout;
          }
      } catch (e) {
          cachedSetTimeout = defaultSetTimout;
      }
      try {
          if (typeof clearTimeout === 'function') {
              cachedClearTimeout = clearTimeout;
          } else {
              cachedClearTimeout = defaultClearTimeout;
          }
      } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
      }
  } ())
  function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
      } catch(e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
          }
      }
  
  
  }
  function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
      } catch (e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
          } catch (e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
          }
      }
  
  
  
  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  
  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }
  
  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
  
      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
  }
  
  process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
      }
  };
  
  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = ''; // empty string to avoid regexp issues
  process.versions = {};
  
  function noop() {}
  
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.prependListener = noop;
  process.prependOnceListener = noop;
  
  process.listeners = function (name) { return [] }
  
  process.binding = function (name) {
      throw new Error('process.binding is not supported');
  };
  
  process.cwd = function () { return '/' };
  process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
  };
  process.umask = function() { return 0; };
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/EnhancedEventEmitter.js":[function(require,module,exports){
  const { EventEmitter } = require('events');
  const Logger = require('./Logger');
  
  class EnhancedEventEmitter extends EventEmitter
  {
    constructor(logger)
    {
      super();
      this.setMaxListeners(Infinity);
  
      this._logger = logger || new Logger('EnhancedEventEmitter');
    }
  
    safeEmit(event, ...args)
    {
      try
      {
        this.emit(event, ...args);
      }
      catch (error)
      {
        this._logger.error(
          'safeEmit() | event listener threw an error [event:%s]:%o',
          event, error);
      }
    }
  
    async safeEmitAsPromise(event, ...args)
    {
      return new Promise((resolve, reject) =>
      {
        this.safeEmit(event, ...args, resolve, reject);
      });
    }
  }
  
  module.exports = EnhancedEventEmitter;
  
  },{"./Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/Logger.js","events":"/home/ubuntu/umbrella-voice2/app/node_modules/browserify/node_modules/events/events.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/Logger.js":[function(require,module,exports){
  const debug = require('debug');
  
  const APP_NAME = 'protoo-client';
  
  class Logger
  {
    constructor(prefix)
    {
      if (prefix)
      {
        this._debug = debug(`${APP_NAME}:${prefix}`);
        this._warn = debug(`${APP_NAME}:WARN:${prefix}`);
        this._error = debug(`${APP_NAME}:ERROR:${prefix}`);
      }
      else
      {
        this._debug = debug(APP_NAME);
        this._warn = debug(`${APP_NAME}:WARN`);
        this._error = debug(`${APP_NAME}:ERROR`);
      }
  
      /* eslint-disable no-console */
      this._debug.log = console.info.bind(console);
      this._warn.log = console.warn.bind(console);
      this._error.log = console.error.bind(console);
      /* eslint-enable no-console */
    }
  
    get debug()
    {
      return this._debug;
    }
  
    get warn()
    {
      return this._warn;
    }
  
    get error()
    {
      return this._error;
    }
  }
  
  module.exports = Logger;
  
  },{"debug":"/home/ubuntu/umbrella-voice2/app/node_modules/debug/src/browser.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/Message.js":[function(require,module,exports){
  const Logger = require('./Logger');
  const { generateRandomNumber } = require('./utils');
  
  const logger = new Logger('Message');
  
  class Message
  {
    static parse(raw)
    {
      let object;
      const message = {};
  
      try
      {
        object = JSON.parse(raw);
      }
      catch (error)
      {
        logger.error('parse() | invalid JSON: %s', error);
  
        return;
      }
  
      if (typeof object !== 'object' || Array.isArray(object))
      {
        logger.error('parse() | not an object');
  
        return;
      }
  
      // Request.
      if (object.request)
      {
        message.request = true;
  
        if (typeof object.method !== 'string')
        {
          logger.error('parse() | missing/invalid method field');
  
          return;
        }
  
        if (typeof object.id !== 'number')
        {
          logger.error('parse() | missing/invalid id field');
  
          return;
        }
  
        message.id = object.id;
        message.method = object.method;
        message.data = object.data || {};
      }
      // Response.
      else if (object.response)
      {
        message.response = true;
  
        if (typeof object.id !== 'number')
        {
          logger.error('parse() | missing/invalid id field');
  
          return;
        }
  
        message.id = object.id;
  
        // Success.
        if (object.ok)
        {
          message.ok = true;
          message.data = object.data || {};
        }
        // Error.
        else
        {
          message.ok = false;
          message.errorCode = object.errorCode;
          message.errorReason = object.errorReason;
        }
      }
      // Notification.
      else if (object.notification)
      {
        message.notification = true;
  
        if (typeof object.method !== 'string')
        {
          logger.error('parse() | missing/invalid method field');
  
          return;
        }
  
        message.method = object.method;
        message.data = object.data || {};
      }
      // Invalid.
      else
      {
        logger.error('parse() | missing request/response field');
  
        return;
      }
  
      return message;
    }
  
    static createRequest(method, data)
    {
      const request =
      {
        request : true,
        id      : generateRandomNumber(),
        method  : method,
        data    : data || {}
      };
  
      return request;
    }
  
    static createSuccessResponse(request, data)
    {
      const response =
      {
        response : true,
        id       : request.id,
        ok       : true,
        data     : data || {}
      };
  
      return response;
    }
  
    static createErrorResponse(request, errorCode, errorReason)
    {
      const response =
      {
        response    : true,
        id          : request.id,
        ok          : false,
        errorCode   : errorCode,
        errorReason : errorReason
      };
  
      return response;
    }
  
    static createNotification(method, data)
    {
      const notification =
      {
        notification : true,
        method       : method,
        data         : data || {}
      };
  
      return notification;
    }
  }
  
  module.exports = Message;
  
  },{"./Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/Logger.js","./utils":"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/utils.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/Peer.js":[function(require,module,exports){
  const Logger = require('./Logger');
  const EnhancedEventEmitter = require('./EnhancedEventEmitter');
  const Message = require('./Message');
  
  const logger = new Logger('Peer');
  
  class Peer extends EnhancedEventEmitter
  {
    /**
     * @param {protoo.Transport} transport
     *
     * @emits open
     * @emits {currentAttempt: Number} failed
     * @emits disconnected
     * @emits close
     * @emits {request: protoo.Request, accept: Function, reject: Function} request
     * @emits {notification: protoo.Notification} notification
     */
    constructor(transport)
    {
      super(logger);
  
      logger.debug('constructor()');
  
      // Closed flag.
      // @type {Boolean}
      this._closed = false;
  
      // Transport.
      // @type {protoo.Transport}
      this._transport = transport;
  
      // Connected flag.
      // @type {Boolean}
      this._connected = false;
  
      // Custom data object.
      // @type {Object}
      this._data = {};
  
      // Map of pending sent request objects indexed by request id.
      // @type {Map<Number, Object>}
      this._sents = new Map();
  
      // Handle transport.
      this._handleTransport();
    }
  
    /**
     * Whether the Peer is closed.
     *
     * @returns {Boolean}
     */
    get closed()
    {
      return this._closed;
    }
  
    /**
     * Whether the Peer is connected.
     *
     * @returns {Boolean}
     */
    get connected()
    {
      return this._connected;
    }
  
    /**
     * App custom data.
     *
     * @returns {Object}
     */
    get data()
    {
      return this._data;
    }
  
    /**
     * Invalid setter.
     */
    set data(data) // eslint-disable-line no-unused-vars
    {
      throw new Error('cannot override data object');
    }
  
    /**
     * Close this Peer and its Transport.
     */
    close()
    {
      if (this._closed)
        return;
  
      logger.debug('close()');
  
      this._closed = true;
      this._connected = false;
  
      // Close Transport.
      this._transport.close();
  
      // Close every pending sent.
      for (const sent of this._sents.values())
      {
        sent.close();
      }
  
      // Emit 'close' event.
      this.safeEmit('close');
    }
  
    /**
     * Send a protoo request to the server-side Room.
     *
     * @param {String} method
     * @param {Object} [data]
     *
     * @async
     * @returns {Object} The response data Object if a success response is received.
     */
    async request(method, data = undefined)
    {
      const request = Message.createRequest(method, data);
  
      this._logger.debug('request() [method:%s, id:%s]', method, request.id);
  
      // This may throw.
      await this._transport.send(request);
  
      return new Promise((pResolve, pReject) =>
      {
        const timeout = 1500 * (15 + (0.1 * this._sents.size));
        const sent =
        {
          id      : request.id,
          method  : request.method,
          resolve : (data2) =>
          {
            if (!this._sents.delete(request.id))
              return;
  
            clearTimeout(sent.timer);
            pResolve(data2);
          },
          reject : (error) =>
          {
            if (!this._sents.delete(request.id))
              return;
  
            clearTimeout(sent.timer);
            pReject(error);
          },
          timer : setTimeout(() =>
          {
            if (!this._sents.delete(request.id))
              return;
  
            pReject(new Error('request timeout'));
          }, timeout),
          close : () =>
          {
            clearTimeout(sent.timer);
            pReject(new Error('peer closed'));
          }
        };
  
        // Add sent stuff to the map.
        this._sents.set(request.id, sent);
      });
    }
  
    /**
     * Send a protoo notification to the server-side Room.
     *
     * @param {String} method
     * @param {Object} [data]
     *
     * @async
     */
    async notify(method, data = undefined)
    {
      const notification = Message.createNotification(method, data);
  
      this._logger.debug('notify() [method:%s]', method);
  
      // This may throw.
      await this._transport.send(notification);
    }
  
    _handleTransport()
    {
      if (this._transport.closed)
      {
        this._closed = true;
  
        setTimeout(() =>
        {
          if (this._closed)
            return;
  
          this._connected = false;
  
          this.safeEmit('close');
        });
  
        return;
      }
  
      this._transport.on('open', () =>
      {
        if (this._closed)
          return;
  
        logger.debug('emit "open"');
  
        this._connected = true;
  
        this.safeEmit('open');
      });
  
      this._transport.on('disconnected', () =>
      {
        if (this._closed)
          return;
  
        logger.debug('emit "disconnected"');
  
        this._connected = false;
  
        this.safeEmit('disconnected');
      });
  
      this._transport.on('failed', (currentAttempt) =>
      {
        if (this._closed)
          return;
  
        logger.debug('emit "failed" [currentAttempt:%s]', currentAttempt);
  
        this._connected = false;
  
        this.safeEmit('failed', currentAttempt);
      });
  
      this._transport.on('close', () =>
      {
        if (this._closed)
          return;
  
        this._closed = true;
  
        logger.debug('emit "close"');
  
        this._connected = false;
  
        this.safeEmit('close');
      });
  
      this._transport.on('message', (message) =>
      {
        if (message.request)
          this._handleRequest(message);
        else if (message.response)
          this._handleResponse(message);
        else if (message.notification)
          this._handleNotification(message);
      });
    }
  
    _handleRequest(request)
    {
      try
      {
        this.emit('request',
          // Request.
          request,
          // accept() function.
          (data) =>
          {
            const response = Message.createSuccessResponse(request, data);
  
            this._transport.send(response)
              .catch(() => {});
          },
          // reject() function.
          (errorCode, errorReason) =>
          {
            if (errorCode instanceof Error)
            {
              errorReason = errorCode.message;
              errorCode = 500;
            }
            else if (typeof errorCode === 'number' && errorReason instanceof Error)
            {
              errorReason = errorReason.message;
            }
  
            const response =
              Message.createErrorResponse(request, errorCode, errorReason);
  
            this._transport.send(response)
              .catch(() => {});
          });
      }
      catch (error)
      {
        const response = Message.createErrorResponse(request, 500, String(error));
  
        this._transport.send(response)
          .catch(() => {});
      }
    }
  
    _handleResponse(response)
    {
      const sent = this._sents.get(response.id);
  
      if (!sent)
      {
        logger.error(
          'received response does not match any sent request [id:%s]', response.id);
  
        return;
      }
  
      if (response.ok)
      {
        sent.resolve(response.data);
      }
      else
      {
        const error = new Error(response.errorReason);
  
        error.code = response.errorCode;
        sent.reject(error);
      }
    }
  
    _handleNotification(notification)
    {
      this.safeEmit('notification', notification);
    }
  }
  
  module.exports = Peer;
  
  },{"./EnhancedEventEmitter":"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/EnhancedEventEmitter.js","./Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/Logger.js","./Message":"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/Message.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/index.js":[function(require,module,exports){
  const { version } = require('../package.json');
  const Peer = require('./Peer');
  const WebSocketTransport = require('./transports/WebSocketTransport');
  
  /**
   * Expose mediasoup-client version.
   *
   * @type {String}
   */
  exports.version = version;
  
  /**
   * Expose Peer class.
   *
   * @type {Class}
   */
  exports.Peer = Peer;
  
  /**
   * Expose WebSocketTransport class.
   *
   * @type {Class}
   */
  exports.WebSocketTransport = WebSocketTransport;
  
  },{"../package.json":"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/package.json","./Peer":"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/Peer.js","./transports/WebSocketTransport":"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/transports/WebSocketTransport.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/transports/WebSocketTransport.js":[function(require,module,exports){
  const W3CWebSocket = require('websocket').w3cwebsocket;
  const retry = require('retry');
  const Logger = require('../Logger');
  const EnhancedEventEmitter = require('../EnhancedEventEmitter');
  const Message = require('../Message');
  
  const WS_SUBPROTOCOL = 'protoo';
  const DEFAULT_RETRY_OPTIONS =
  {
    retries    : 10,
    factor     : 2,
    minTimeout : 1 * 1000,
    maxTimeout : 8 * 1000
  };
  
  const logger = new Logger('WebSocketTransport');
  
  class WebSocketTransport extends EnhancedEventEmitter
  {
    /**
     * @param {String} url - WebSocket URL.
     * @param {Object} [options] - Options for WebSocket-Node.W3CWebSocket and retry.
     */
    constructor(url, options)
    {
      super(logger);
  
      logger.debug('constructor() [url:%s, options:%o]', url, options);
  
      // Closed flag.
      // @type {Boolean}
      this._closed = false;
  
      // WebSocket URL.
      // @type {String}
      this._url = url;
  
      // Options.
      // @type {Object}
      this._options = options || {};
  
      // WebSocket instance.
      // @type {WebSocket}
      this._ws = null;
  
      // Run the WebSocket.
      this._runWebSocket();
    }
  
    get closed()
    {
      return this._closed;
    }
  
    close()
    {
      if (this._closed)
        return;
  
      logger.debug('close()');
  
      // Don't wait for the WebSocket 'close' event, do it now.
      this._closed = true;
      this.safeEmit('close');
  
      try
      {
        this._ws.onopen = null;
        this._ws.onclose = null;
        this._ws.onerror = null;
        this._ws.onmessage = null;
        this._ws.close();
      }
      catch (error)
      {
        logger.error('close() | error closing the WebSocket: %o', error);
      }
    }
  
    async send(message)
    {
      if (this._closed)
        throw new Error('transport closed');
  
      try
      {
        this._ws.send(JSON.stringify(message));
      }
      catch (error)
      {
        logger.warn('send() failed:%o', error);
  
        throw error;
      }
    }
  
    _runWebSocket()
    {
      const operation =
        retry.operation(this._options.retry || DEFAULT_RETRY_OPTIONS);
  
      let wasConnected = false;
  
      operation.attempt((currentAttempt) =>
      {
        if (this._closed)
        {
          operation.stop();
  
          return;
        }
  
        logger.debug('_runWebSocket() [currentAttempt:%s]', currentAttempt);
  
        this._ws = new W3CWebSocket(
          this._url,
          WS_SUBPROTOCOL,
          this._options.origin,
          this._options.headers,
          this._options.requestOptions,
          this._options.clientConfig);
  
        this._ws.onopen = () =>
        {
          if (this._closed)
            return;
  
          wasConnected = true;
  
          // Emit 'open' event.
          this.safeEmit('open');
        };
  
        this._ws.onclose = (event) =>
        {
          if (this._closed)
            return;
  
          logger.warn(
            'WebSocket "close" event [wasClean:%s, code:%s, reason:"%s"]',
            event.wasClean, event.code, event.reason);
  
          // Don't retry if code is 4000 (closed by the server).
          if (event.code !== 4000)
          {
            // If it was not connected, try again.
            if (!wasConnected)
            {
              this.safeEmit('failed', currentAttempt);
  
              if (this._closed)
                return;
  
              if (operation.retry(true))
                return;
            }
            // If it was connected, start from scratch.
            else
            {
              operation.stop();
  
              this.safeEmit('disconnected');
  
              if (this._closed)
                return;
  
              this._runWebSocket();
  
              return;
            }
          }
  
          this._closed = true;
  
          // Emit 'close' event.
          this.safeEmit('close');
        };
  
        this._ws.onerror = () =>
        {
          if (this._closed)
            return;
  
          logger.error('WebSocket "error" event');
        };
  
        this._ws.onmessage = (event) =>
        {
          if (this._closed)
            return;
  
          const message = Message.parse(event.data);
  
          if (!message)
            return;
  
          if (this.listenerCount('message') === 0)
          {
            logger.error(
              'no listeners for WebSocket "message" event, ignoring received message');
  
            return;
          }
  
          // Emit 'message' event.
          this.safeEmit('message', message);
        };
      });
    }
  }
  
  module.exports = WebSocketTransport;
  
  },{"../EnhancedEventEmitter":"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/EnhancedEventEmitter.js","../Logger":"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/Logger.js","../Message":"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/Message.js","retry":"/home/ubuntu/umbrella-voice2/app/node_modules/retry/index.js","websocket":"/home/ubuntu/umbrella-voice2/app/node_modules/websocket/lib/browser.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/lib/utils.js":[function(require,module,exports){
  /**
   * Generates a random positive integer.
   *
   * @returns {Number}
   */
  exports.generateRandomNumber = function()
  {
    return Math.round(Math.random() * 10000000);
  };
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/protoo-client/package.json":[function(require,module,exports){
  module.exports={
    "_from": "protoo-client@^4.0.4",
    "_id": "protoo-client@4.0.6",
    "_inBundle": false,
    "_integrity": "sha512-ZqImkKHpeJhSlgvyI6QAfZNc/aXcCgmmocMx4S1w2lAaxXtckxxeDtcVNtkOISUWm/mbC+BrmYPXoGMkfhkKOQ==",
    "_location": "/protoo-client",
    "_phantomChildren": {},
    "_requested": {
      "type": "range",
      "registry": true,
      "raw": "protoo-client@^4.0.4",
      "name": "protoo-client",
      "escapedName": "protoo-client",
      "rawSpec": "^4.0.4",
      "saveSpec": null,
      "fetchSpec": "^4.0.4"
    },
    "_requiredBy": [
      "/"
    ],
    "_resolved": "https://registry.npmjs.org/protoo-client/-/protoo-client-4.0.6.tgz",
    "_shasum": "02a89f997ee5a4f385dab7be938dda1a2c5158e4",
    "_spec": "protoo-client@^4.0.4",
    "_where": "/home/ubuntu/umbrella-voice/app",
    "author": {
      "name": "Iñaki Baz Castillo",
      "email": "ibc@aliax.net"
    },
    "bugs": {
      "url": "https://github.com/ibc/protoo/issues"
    },
    "bundleDependencies": false,
    "dependencies": {
      "debug": "^4.3.1",
      "events": "^3.2.0",
      "retry": "^0.12.0",
      "websocket": "^1.0.33"
    },
    "deprecated": false,
    "description": "protoo JavaScript client module",
    "devDependencies": {
      "eslint": "^5.16.0"
    },
    "engines": {
      "node": ">=8.0.0"
    },
    "homepage": "https://protoo.versatica.com",
    "keywords": [
      "nodejs",
      "browser",
      "websocket"
    ],
    "license": "MIT",
    "main": "lib/index.js",
    "name": "protoo-client",
    "optionalDependencies": {
      "websocket": "^1.0.33"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/ibc/protoo.git"
    },
    "scripts": {
      "lint": "eslint -c .eslintrc.js lib"
    },
    "version": "4.0.6"
  }
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/querystringify/index.js":[function(require,module,exports){
  'use strict';
  
  var has = Object.prototype.hasOwnProperty
    , undef;
  
  /**
   * Decode a URI encoded string.
   *
   * @param {String} input The URI encoded string.
   * @returns {String|Null} The decoded string.
   * @api private
   */
  function decode(input) {
    try {
      return decodeURIComponent(input.replace(/\+/g, ' '));
    } catch (e) {
      return null;
    }
  }
  
  /**
   * Attempts to encode a given input.
   *
   * @param {String} input The string that needs to be encoded.
   * @returns {String|Null} The encoded string.
   * @api private
   */
  function encode(input) {
    try {
      return encodeURIComponent(input);
    } catch (e) {
      return null;
    }
  }
  
  /**
   * Simple query string parser.
   *
   * @param {String} query The query string that needs to be parsed.
   * @returns {Object}
   * @api public
   */
  function querystring(query) {
    var parser = /([^=?#&]+)=?([^&]*)/g
      , result = {}
      , part;
  
    while (part = parser.exec(query)) {
      var key = decode(part[1])
        , value = decode(part[2]);
  
      //
      // Prevent overriding of existing properties. This ensures that build-in
      // methods like `toString` or __proto__ are not overriden by malicious
      // querystrings.
      //
      // In the case if failed decoding, we want to omit the key/value pairs
      // from the result.
      //
      if (key === null || value === null || key in result) continue;
      result[key] = value;
    }
  
    return result;
  }
  
  /**
   * Transform a query string to an object.
   *
   * @param {Object} obj Object that should be transformed.
   * @param {String} prefix Optional prefix.
   * @returns {String}
   * @api public
   */
  function querystringify(obj, prefix) {
    prefix = prefix || '';
  
    var pairs = []
      , value
      , key;
  
    //
    // Optionally prefix with a '?' if needed
    //
    if ('string' !== typeof prefix) prefix = '?';
  
    for (key in obj) {
      if (has.call(obj, key)) {
        value = obj[key];
  
        //
        // Edge cases where we actually want to encode the value to an empty
        // string instead of the stringified value.
        //
        if (!value && (value === null || value === undef || isNaN(value))) {
          value = '';
        }
  
        key = encode(key);
        value = encode(value);
  
        //
        // If we failed to encode the strings, we should bail out as we don't
        // want to add invalid strings to the query.
        //
        if (key === null || value === null) continue;
        pairs.push(key +'='+ value);
      }
    }
  
    return pairs.length ? prefix + pairs.join('&') : '';
  }
  
  //
  // Expose the module.
  //
  exports.stringify = querystringify;
  exports.parse = querystring;
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/regenerator-runtime/runtime.js":[function(require,module,exports){
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  
  var runtime = (function (exports) {
    "use strict";
  
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  
    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }
  
    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
  
      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);
  
      return generator;
    }
    exports.wrap = wrap;
  
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
  
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
  
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
  
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
  
    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };
  
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }
  
    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );
  
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }
  
    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };
  
    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };
  
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };
  
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }
  
          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }
  
      var previousPromise;
  
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
  
        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }
  
      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }
  
    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;
  
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
  
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );
  
      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };
  
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
  
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
  
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
  
          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }
  
        context.method = method;
        context.arg = arg;
  
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
  
          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
  
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }
  
            context.dispatchException(context.arg);
  
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }
  
          state = GenStateExecuting;
  
          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;
  
            if (record.arg === ContinueSentinel) {
              continue;
            }
  
            return {
              value: record.arg,
              done: context.done
            };
  
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }
  
    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;
  
        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);
  
            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }
  
          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }
  
        return ContinueSentinel;
      }
  
      var record = tryCatch(method, delegate.iterator, context.arg);
  
      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }
  
      var info = record.arg;
  
      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }
  
      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;
  
        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;
  
        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined;
        }
  
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }
  
      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }
  
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
  
    define(Gp, toStringTagSymbol, "Generator");
  
    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };
  
    Gp.toString = function() {
      return "[object Generator]";
    };
  
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };
  
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
  
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
  
      this.tryEntries.push(entry);
    }
  
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
  
    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
  
    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
  
      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }
  
        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };
  
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
  
        if (typeof iterable.next === "function") {
          return iterable;
        }
  
        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }
  
            next.value = undefined;
            next.done = true;
  
            return next;
          };
  
          return next.next = next;
        }
      }
  
      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;
  
    function doneResult() {
      return { value: undefined, done: true };
    }
  
    Context.prototype = {
      constructor: Context,
  
      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;
  
        this.method = "next";
        this.arg = undefined;
  
        this.tryEntries.forEach(resetTryEntry);
  
        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },
  
      stop: function() {
        this.done = true;
  
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
  
        return this.rval;
      },
  
      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }
  
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
  
          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined;
          }
  
          return !! caught;
        }
  
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
  
          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }
  
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
  
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
  
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
  
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
  
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
  
      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
  
        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }
  
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
  
        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }
  
        return this.complete(record);
      },
  
      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
  
        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
  
        return ContinueSentinel;
      },
  
      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
  
      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
  
        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },
  
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };
  
        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined;
        }
  
        return ContinueSentinel;
      }
    };
  
    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
  
  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    typeof module === "object" ? module.exports : {}
  ));
  
  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/requires-port/index.js":[function(require,module,exports){
  'use strict';
  
  /**
   * Check if we're required to add a port number.
   *
   * @see https://url.spec.whatwg.org/#default-port
   * @param {Number|String} port Port number we need to check
   * @param {String} protocol Protocol we need to check against.
   * @returns {Boolean} Is it a default port for the given protocol
   * @api private
   */
  module.exports = function required(port, protocol) {
    protocol = protocol.split(':')[0];
    port = +port;
  
    if (!port) return false;
  
    switch (protocol) {
      case 'http':
      case 'ws':
      return port !== 80;
  
      case 'https':
      case 'wss':
      return port !== 443;
  
      case 'ftp':
      return port !== 21;
  
      case 'gopher':
      return port !== 70;
  
      case 'file':
      return false;
    }
  
    return port !== 0;
  };
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/retry/index.js":[function(require,module,exports){
  module.exports = require('./lib/retry');
  },{"./lib/retry":"/home/ubuntu/umbrella-voice2/app/node_modules/retry/lib/retry.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/retry/lib/retry.js":[function(require,module,exports){
  var RetryOperation = require('./retry_operation');
  
  exports.operation = function(options) {
    var timeouts = exports.timeouts(options);
    return new RetryOperation(timeouts, {
        forever: options && options.forever,
        unref: options && options.unref,
        maxRetryTime: options && options.maxRetryTime
    });
  };
  
  exports.timeouts = function(options) {
    if (options instanceof Array) {
      return [].concat(options);
    }
  
    var opts = {
      retries: 10,
      factor: 2,
      minTimeout: 1 * 1000,
      maxTimeout: Infinity,
      randomize: false
    };
    for (var key in options) {
      opts[key] = options[key];
    }
  
    if (opts.minTimeout > opts.maxTimeout) {
      throw new Error('minTimeout is greater than maxTimeout');
    }
  
    var timeouts = [];
    for (var i = 0; i < opts.retries; i++) {
      timeouts.push(this.createTimeout(i, opts));
    }
  
    if (options && options.forever && !timeouts.length) {
      timeouts.push(this.createTimeout(i, opts));
    }
  
    // sort the array numerically ascending
    timeouts.sort(function(a,b) {
      return a - b;
    });
  
    return timeouts;
  };
  
  exports.createTimeout = function(attempt, opts) {
    var random = (opts.randomize)
      ? (Math.random() + 1)
      : 1;
  
    var timeout = Math.round(random * opts.minTimeout * Math.pow(opts.factor, attempt));
    timeout = Math.min(timeout, opts.maxTimeout);
  
    return timeout;
  };
  
  exports.wrap = function(obj, options, methods) {
    if (options instanceof Array) {
      methods = options;
      options = null;
    }
  
    if (!methods) {
      methods = [];
      for (var key in obj) {
        if (typeof obj[key] === 'function') {
          methods.push(key);
        }
      }
    }
  
    for (var i = 0; i < methods.length; i++) {
      var method   = methods[i];
      var original = obj[method];
  
      obj[method] = function retryWrapper(original) {
        var op       = exports.operation(options);
        var args     = Array.prototype.slice.call(arguments, 1);
        var callback = args.pop();
  
        args.push(function(err) {
          if (op.retry(err)) {
            return;
          }
          if (err) {
            arguments[0] = op.mainError();
          }
          callback.apply(this, arguments);
        });
  
        op.attempt(function() {
          original.apply(obj, args);
        });
      }.bind(obj, original);
      obj[method].options = options;
    }
  };
  
  },{"./retry_operation":"/home/ubuntu/umbrella-voice2/app/node_modules/retry/lib/retry_operation.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/retry/lib/retry_operation.js":[function(require,module,exports){
  function RetryOperation(timeouts, options) {
    // Compatibility for the old (timeouts, retryForever) signature
    if (typeof options === 'boolean') {
      options = { forever: options };
    }
  
    this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
    this._timeouts = timeouts;
    this._options = options || {};
    this._maxRetryTime = options && options.maxRetryTime || Infinity;
    this._fn = null;
    this._errors = [];
    this._attempts = 1;
    this._operationTimeout = null;
    this._operationTimeoutCb = null;
    this._timeout = null;
    this._operationStart = null;
  
    if (this._options.forever) {
      this._cachedTimeouts = this._timeouts.slice(0);
    }
  }
  module.exports = RetryOperation;
  
  RetryOperation.prototype.reset = function() {
    this._attempts = 1;
    this._timeouts = this._originalTimeouts;
  }
  
  RetryOperation.prototype.stop = function() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  
    this._timeouts       = [];
    this._cachedTimeouts = null;
  };
  
  RetryOperation.prototype.retry = function(err) {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  
    if (!err) {
      return false;
    }
    var currentTime = new Date().getTime();
    if (err && currentTime - this._operationStart >= this._maxRetryTime) {
      this._errors.unshift(new Error('RetryOperation timeout occurred'));
      return false;
    }
  
    this._errors.push(err);
  
    var timeout = this._timeouts.shift();
    if (timeout === undefined) {
      if (this._cachedTimeouts) {
        // retry forever, only keep last error
        this._errors.splice(this._errors.length - 1, this._errors.length);
        this._timeouts = this._cachedTimeouts.slice(0);
        timeout = this._timeouts.shift();
      } else {
        return false;
      }
    }
  
    var self = this;
    var timer = setTimeout(function() {
      self._attempts++;
  
      if (self._operationTimeoutCb) {
        self._timeout = setTimeout(function() {
          self._operationTimeoutCb(self._attempts);
        }, self._operationTimeout);
  
        if (self._options.unref) {
            self._timeout.unref();
        }
      }
  
      self._fn(self._attempts);
    }, timeout);
  
    if (this._options.unref) {
        timer.unref();
    }
  
    return true;
  };
  
  RetryOperation.prototype.attempt = function(fn, timeoutOps) {
    this._fn = fn;
  
    if (timeoutOps) {
      if (timeoutOps.timeout) {
        this._operationTimeout = timeoutOps.timeout;
      }
      if (timeoutOps.cb) {
        this._operationTimeoutCb = timeoutOps.cb;
      }
    }
  
    var self = this;
    if (this._operationTimeoutCb) {
      this._timeout = setTimeout(function() {
        self._operationTimeoutCb();
      }, self._operationTimeout);
    }
  
    this._operationStart = new Date().getTime();
  
    this._fn(this._attempts);
  };
  
  RetryOperation.prototype.try = function(fn) {
    console.log('Using RetryOperation.try() is deprecated');
    this.attempt(fn);
  };
  
  RetryOperation.prototype.start = function(fn) {
    console.log('Using RetryOperation.start() is deprecated');
    this.attempt(fn);
  };
  
  RetryOperation.prototype.start = RetryOperation.prototype.try;
  
  RetryOperation.prototype.errors = function() {
    return this._errors;
  };
  
  RetryOperation.prototype.attempts = function() {
    return this._attempts;
  };
  
  RetryOperation.prototype.mainError = function() {
    if (this._errors.length === 0) {
      return null;
    }
  
    var counts = {};
    var mainError = null;
    var mainErrorCount = 0;
  
    for (var i = 0; i < this._errors.length; i++) {
      var error = this._errors[i];
      var message = error.message;
      var count = (counts[message] || 0) + 1;
  
      counts[message] = count;
  
      if (count >= mainErrorCount) {
        mainError = error;
        mainErrorCount = count;
      }
    }
  
    return mainError;
  };
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/grammar.js":[function(require,module,exports){
  var grammar = module.exports = {
    v: [{
      name: 'version',
      reg: /^(\d*)$/
    }],
    o: [{
      // o=- 20518 0 IN IP4 203.0.113.1
      // NB: sessionId will be a String in most cases because it is huge
      name: 'origin',
      reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
      names: ['username', 'sessionId', 'sessionVersion', 'netType', 'ipVer', 'address'],
      format: '%s %s %d %s IP%d %s'
    }],
    // default parsing of these only (though some of these feel outdated)
    s: [{ name: 'name' }],
    i: [{ name: 'description' }],
    u: [{ name: 'uri' }],
    e: [{ name: 'email' }],
    p: [{ name: 'phone' }],
    z: [{ name: 'timezones' }], // TODO: this one can actually be parsed properly...
    r: [{ name: 'repeats' }],   // TODO: this one can also be parsed properly
    // k: [{}], // outdated thing ignored
    t: [{
      // t=0 0
      name: 'timing',
      reg: /^(\d*) (\d*)/,
      names: ['start', 'stop'],
      format: '%d %d'
    }],
    c: [{
      // c=IN IP4 10.47.197.26
      name: 'connection',
      reg: /^IN IP(\d) (\S*)/,
      names: ['version', 'ip'],
      format: 'IN IP%d %s'
    }],
    b: [{
      // b=AS:4000
      push: 'bandwidth',
      reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
      names: ['type', 'limit'],
      format: '%s:%s'
    }],
    m: [{
      // m=video 51744 RTP/AVP 126 97 98 34 31
      // NB: special - pushes to session
      // TODO: rtp/fmtp should be filtered by the payloads found here?
      reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/,
      names: ['type', 'port', 'protocol', 'payloads'],
      format: '%s %d %s %s'
    }],
    a: [
      {
        // a=rtpmap:110 opus/48000/2
        push: 'rtp',
        reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
        names: ['payload', 'codec', 'rate', 'encoding'],
        format: function (o) {
          return (o.encoding)
            ? 'rtpmap:%d %s/%s/%s'
            : o.rate
              ? 'rtpmap:%d %s/%s'
              : 'rtpmap:%d %s';
        }
      },
      {
        // a=fmtp:108 profile-level-id=24;object=23;bitrate=64000
        // a=fmtp:111 minptime=10; useinbandfec=1
        push: 'fmtp',
        reg: /^fmtp:(\d*) ([\S| ]*)/,
        names: ['payload', 'config'],
        format: 'fmtp:%d %s'
      },
      {
        // a=control:streamid=0
        name: 'control',
        reg: /^control:(.*)/,
        format: 'control:%s'
      },
      {
        // a=rtcp:65179 IN IP4 193.84.77.194
        name: 'rtcp',
        reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
        names: ['port', 'netType', 'ipVer', 'address'],
        format: function (o) {
          return (o.address != null)
            ? 'rtcp:%d %s IP%d %s'
            : 'rtcp:%d';
        }
      },
      {
        // a=rtcp-fb:98 trr-int 100
        push: 'rtcpFbTrrInt',
        reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
        names: ['payload', 'value'],
        format: 'rtcp-fb:%s trr-int %d'
      },
      {
        // a=rtcp-fb:98 nack rpsi
        push: 'rtcpFb',
        reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
        names: ['payload', 'type', 'subtype'],
        format: function (o) {
          return (o.subtype != null)
            ? 'rtcp-fb:%s %s %s'
            : 'rtcp-fb:%s %s';
        }
      },
      {
        // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
        // a=extmap:1/recvonly URI-gps-string
        // a=extmap:3 urn:ietf:params:rtp-hdrext:encrypt urn:ietf:params:rtp-hdrext:smpte-tc 25@600/24
        push: 'ext',
        reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,
        names: ['value', 'direction', 'encrypt-uri', 'uri', 'config'],
        format: function (o) {
          return (
            'extmap:%d' +
            (o.direction ? '/%s' : '%v') +
            (o['encrypt-uri'] ? ' %s' : '%v') +
            ' %s' +
            (o.config ? ' %s' : '')
          );
        }
      },
      {
        // a=extmap-allow-mixed
        name: 'extmapAllowMixed',
        reg: /^(extmap-allow-mixed)/
      },
      {
        // a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
        push: 'crypto',
        reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
        names: ['id', 'suite', 'config', 'sessionConfig'],
        format: function (o) {
          return (o.sessionConfig != null)
            ? 'crypto:%d %s %s %s'
            : 'crypto:%d %s %s';
        }
      },
      {
        // a=setup:actpass
        name: 'setup',
        reg: /^setup:(\w*)/,
        format: 'setup:%s'
      },
      {
        // a=connection:new
        name: 'connectionType',
        reg: /^connection:(new|existing)/,
        format: 'connection:%s'
      },
      {
        // a=mid:1
        name: 'mid',
        reg: /^mid:([^\s]*)/,
        format: 'mid:%s'
      },
      {
        // a=msid:0c8b064d-d807-43b4-b434-f92a889d8587 98178685-d409-46e0-8e16-7ef0db0db64a
        name: 'msid',
        reg: /^msid:(.*)/,
        format: 'msid:%s'
      },
      {
        // a=ptime:20
        name: 'ptime',
        reg: /^ptime:(\d*(?:\.\d*)*)/,
        format: 'ptime:%d'
      },
      {
        // a=maxptime:60
        name: 'maxptime',
        reg: /^maxptime:(\d*(?:\.\d*)*)/,
        format: 'maxptime:%d'
      },
      {
        // a=sendrecv
        name: 'direction',
        reg: /^(sendrecv|recvonly|sendonly|inactive)/
      },
      {
        // a=ice-lite
        name: 'icelite',
        reg: /^(ice-lite)/
      },
      {
        // a=ice-ufrag:F7gI
        name: 'iceUfrag',
        reg: /^ice-ufrag:(\S*)/,
        format: 'ice-ufrag:%s'
      },
      {
        // a=ice-pwd:x9cml/YzichV2+XlhiMu8g
        name: 'icePwd',
        reg: /^ice-pwd:(\S*)/,
        format: 'ice-pwd:%s'
      },
      {
        // a=fingerprint:SHA-1 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33
        name: 'fingerprint',
        reg: /^fingerprint:(\S*) (\S*)/,
        names: ['type', 'hash'],
        format: 'fingerprint:%s %s'
      },
      {
        // a=candidate:0 1 UDP 2113667327 203.0.113.1 54400 typ host
        // a=candidate:1162875081 1 udp 2113937151 192.168.34.75 60017 typ host generation 0 network-id 3 network-cost 10
        // a=candidate:3289912957 2 udp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 generation 0 network-id 3 network-cost 10
        // a=candidate:229815620 1 tcp 1518280447 192.168.150.19 60017 typ host tcptype active generation 0 network-id 3 network-cost 10
        // a=candidate:3289912957 2 tcp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 tcptype passive generation 0 network-id 3 network-cost 10
        push:'candidates',
        reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
        names: ['foundation', 'component', 'transport', 'priority', 'ip', 'port', 'type', 'raddr', 'rport', 'tcptype', 'generation', 'network-id', 'network-cost'],
        format: function (o) {
          var str = 'candidate:%s %d %s %d %s %d typ %s';
  
          str += (o.raddr != null) ? ' raddr %s rport %d' : '%v%v';
  
          // NB: candidate has three optional chunks, so %void middles one if it's missing
          str += (o.tcptype != null) ? ' tcptype %s' : '%v';
  
          if (o.generation != null) {
            str += ' generation %d';
          }
  
          str += (o['network-id'] != null) ? ' network-id %d' : '%v';
          str += (o['network-cost'] != null) ? ' network-cost %d' : '%v';
          return str;
        }
      },
      {
        // a=end-of-candidates (keep after the candidates line for readability)
        name: 'endOfCandidates',
        reg: /^(end-of-candidates)/
      },
      {
        // a=remote-candidates:1 203.0.113.1 54400 2 203.0.113.1 54401 ...
        name: 'remoteCandidates',
        reg: /^remote-candidates:(.*)/,
        format: 'remote-candidates:%s'
      },
      {
        // a=ice-options:google-ice
        name: 'iceOptions',
        reg: /^ice-options:(\S*)/,
        format: 'ice-options:%s'
      },
      {
        // a=ssrc:2566107569 cname:t9YU8M1UxTF8Y1A1
        push: 'ssrcs',
        reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
        names: ['id', 'attribute', 'value'],
        format: function (o) {
          var str = 'ssrc:%d';
          if (o.attribute != null) {
            str += ' %s';
            if (o.value != null) {
              str += ':%s';
            }
          }
          return str;
        }
      },
      {
        // a=ssrc-group:FEC 1 2
        // a=ssrc-group:FEC-FR 3004364195 1080772241
        push: 'ssrcGroups',
        // token-char = %x21 / %x23-27 / %x2A-2B / %x2D-2E / %x30-39 / %x41-5A / %x5E-7E
        reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
        names: ['semantics', 'ssrcs'],
        format: 'ssrc-group:%s %s'
      },
      {
        // a=msid-semantic: WMS Jvlam5X3SX1OP6pn20zWogvaKJz5Hjf9OnlV
        name: 'msidSemantic',
        reg: /^msid-semantic:\s?(\w*) (\S*)/,
        names: ['semantic', 'token'],
        format: 'msid-semantic: %s %s' // space after ':' is not accidental
      },
      {
        // a=group:BUNDLE audio video
        push: 'groups',
        reg: /^group:(\w*) (.*)/,
        names: ['type', 'mids'],
        format: 'group:%s %s'
      },
      {
        // a=rtcp-mux
        name: 'rtcpMux',
        reg: /^(rtcp-mux)/
      },
      {
        // a=rtcp-rsize
        name: 'rtcpRsize',
        reg: /^(rtcp-rsize)/
      },
      {
        // a=sctpmap:5000 webrtc-datachannel 1024
        name: 'sctpmap',
        reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,
        names: ['sctpmapNumber', 'app', 'maxMessageSize'],
        format: function (o) {
          return (o.maxMessageSize != null)
            ? 'sctpmap:%s %s %s'
            : 'sctpmap:%s %s';
        }
      },
      {
        // a=x-google-flag:conference
        name: 'xGoogleFlag',
        reg: /^x-google-flag:([^\s]*)/,
        format: 'x-google-flag:%s'
      },
      {
        // a=rid:1 send max-width=1280;max-height=720;max-fps=30;depend=0
        push: 'rids',
        reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
        names: ['id', 'direction', 'params'],
        format: function (o) {
          return (o.params) ? 'rid:%s %s %s' : 'rid:%s %s';
        }
      },
      {
        // a=imageattr:97 send [x=800,y=640,sar=1.1,q=0.6] [x=480,y=320] recv [x=330,y=250]
        // a=imageattr:* send [x=800,y=640] recv *
        // a=imageattr:100 recv [x=320,y=240]
        push: 'imageattrs',
        reg: new RegExp(
          // a=imageattr:97
          '^imageattr:(\\d+|\\*)' +
          // send [x=800,y=640,sar=1.1,q=0.6] [x=480,y=320]
          '[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)' +
          // recv [x=330,y=250]
          '(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?'
        ),
        names: ['pt', 'dir1', 'attrs1', 'dir2', 'attrs2'],
        format: function (o) {
          return 'imageattr:%s %s %s' + (o.dir2 ? ' %s %s' : '');
        }
      },
      {
        // a=simulcast:send 1,2,3;~4,~5 recv 6;~7,~8
        // a=simulcast:recv 1;4,5 send 6;7
        name: 'simulcast',
        reg: new RegExp(
          // a=simulcast:
          '^simulcast:' +
          // send 1,2,3;~4,~5
          '(send|recv) ([a-zA-Z0-9\\-_~;,]+)' +
          // space + recv 6;~7,~8
          '(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?' +
          // end
          '$'
        ),
        names: ['dir1', 'list1', 'dir2', 'list2'],
        format: function (o) {
          return 'simulcast:%s %s' + (o.dir2 ? ' %s %s' : '');
        }
      },
      {
        // old simulcast draft 03 (implemented by Firefox)
        //   https://tools.ietf.org/html/draft-ietf-mmusic-sdp-simulcast-03
        // a=simulcast: recv pt=97;98 send pt=97
        // a=simulcast: send rid=5;6;7 paused=6,7
        name: 'simulcast_03',
        reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
        names: ['value'],
        format: 'simulcast: %s'
      },
      {
        // a=framerate:25
        // a=framerate:29.97
        name: 'framerate',
        reg: /^framerate:(\d+(?:$|\.\d+))/,
        format: 'framerate:%s'
      },
      {
        // RFC4570
        // a=source-filter: incl IN IP4 239.5.2.31 10.1.15.5
        name: 'sourceFilter',
        reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
        names: ['filterMode', 'netType', 'addressTypes', 'destAddress', 'srcList'],
        format: 'source-filter: %s %s %s %s %s'
      },
      {
        // a=bundle-only
        name: 'bundleOnly',
        reg: /^(bundle-only)/
      },
      {
        // a=label:1
        name: 'label',
        reg: /^label:(.+)/,
        format: 'label:%s'
      },
      {
        // RFC version 26 for SCTP over DTLS
        // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-5
        name: 'sctpPort',
        reg: /^sctp-port:(\d+)$/,
        format: 'sctp-port:%s'
      },
      {
        // RFC version 26 for SCTP over DTLS
        // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-6
        name: 'maxMessageSize',
        reg: /^max-message-size:(\d+)$/,
        format: 'max-message-size:%s'
      },
      {
        // RFC7273
        // a=ts-refclk:ptp=IEEE1588-2008:39-A7-94-FF-FE-07-CB-D0:37
        push:'tsRefClocks',
        reg: /^ts-refclk:([^\s=]*)(?:=(\S*))?/,
        names: ['clksrc', 'clksrcExt'],
        format: function (o) {
          return 'ts-refclk:%s' + (o.clksrcExt != null ? '=%s' : '');
        }
      },
      {
        // RFC7273
        // a=mediaclk:direct=963214424
        name:'mediaClk',
        reg: /^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/,
        names: ['id', 'mediaClockName', 'mediaClockValue', 'rateNumerator', 'rateDenominator'],
        format: function (o) {
          var str = 'mediaclk:';
          str += (o.id != null ? 'id=%s %s' : '%v%s');
          str += (o.mediaClockValue != null ? '=%s' : '');
          str += (o.rateNumerator != null ? ' rate=%s' : '');
          str += (o.rateDenominator != null ? '/%s' : '');
          return str;
        }
      },
      {
        // a=keywds:keywords
        name: 'keywords',
        reg: /^keywds:(.+)$/,
        format: 'keywds:%s'
      },
      {
        // a=content:main
        name: 'content',
        reg: /^content:(.+)/,
        format: 'content:%s'
      },
      // BFCP https://tools.ietf.org/html/rfc4583
      {
        // a=floorctrl:c-s
        name: 'bfcpFloorCtrl',
        reg: /^floorctrl:(c-only|s-only|c-s)/,
        format: 'floorctrl:%s'
      },
      {
        // a=confid:1
        name: 'bfcpConfId',
        reg: /^confid:(\d+)/,
        format: 'confid:%s'
      },
      {
        // a=userid:1
        name: 'bfcpUserId',
        reg: /^userid:(\d+)/,
        format: 'userid:%s'
      },
      {
        // a=floorid:1
        name: 'bfcpFloorId',
        reg: /^floorid:(.+) (?:m-stream|mstrm):(.+)/,
        names: ['id', 'mStream'],
        format: 'floorid:%s mstrm:%s'
      },
      {
        // any a= that we don't understand is kept verbatim on media.invalid
        push: 'invalid',
        names: ['value']
      }
    ]
  };
  
  // set sensible defaults to avoid polluting the grammar with boring details
  Object.keys(grammar).forEach(function (key) {
    var objs = grammar[key];
    objs.forEach(function (obj) {
      if (!obj.reg) {
        obj.reg = /(.*)/;
      }
      if (!obj.format) {
        obj.format = '%s';
      }
    });
  });
  
  },{}],"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/index.js":[function(require,module,exports){
  var parser = require('./parser');
  var writer = require('./writer');
  
  exports.write = writer;
  exports.parse = parser.parse;
  exports.parseParams = parser.parseParams;
  exports.parseFmtpConfig = parser.parseFmtpConfig; // Alias of parseParams().
  exports.parsePayloads = parser.parsePayloads;
  exports.parseRemoteCandidates = parser.parseRemoteCandidates;
  exports.parseImageAttributes = parser.parseImageAttributes;
  exports.parseSimulcastStreamList = parser.parseSimulcastStreamList;
  
  },{"./parser":"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/parser.js","./writer":"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/writer.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/parser.js":[function(require,module,exports){
  var toIntIfInt = function (v) {
    return String(Number(v)) === v ? Number(v) : v;
  };
  
  var attachProperties = function (match, location, names, rawName) {
    if (rawName && !names) {
      location[rawName] = toIntIfInt(match[1]);
    }
    else {
      for (var i = 0; i < names.length; i += 1) {
        if (match[i+1] != null) {
          location[names[i]] = toIntIfInt(match[i+1]);
        }
      }
    }
  };
  
  var parseReg = function (obj, location, content) {
    var needsBlank = obj.name && obj.names;
    if (obj.push && !location[obj.push]) {
      location[obj.push] = [];
    }
    else if (needsBlank && !location[obj.name]) {
      location[obj.name] = {};
    }
    var keyLocation = obj.push ?
      {} :  // blank object that will be pushed
      needsBlank ? location[obj.name] : location; // otherwise, named location or root
  
    attachProperties(content.match(obj.reg), keyLocation, obj.names, obj.name);
  
    if (obj.push) {
      location[obj.push].push(keyLocation);
    }
  };
  
  var grammar = require('./grammar');
  var validLine = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
  
  exports.parse = function (sdp) {
    var session = {}
      , media = []
      , location = session; // points at where properties go under (one of the above)
  
    // parse lines we understand
    sdp.split(/(\r\n|\r|\n)/).filter(validLine).forEach(function (l) {
      var type = l[0];
      var content = l.slice(2);
      if (type === 'm') {
        media.push({rtp: [], fmtp: []});
        location = media[media.length-1]; // point at latest media line
      }
  
      for (var j = 0; j < (grammar[type] || []).length; j += 1) {
        var obj = grammar[type][j];
        if (obj.reg.test(content)) {
          return parseReg(obj, location, content);
        }
      }
    });
  
    session.media = media; // link it up
    return session;
  };
  
  var paramReducer = function (acc, expr) {
    var s = expr.split(/=(.+)/, 2);
    if (s.length === 2) {
      acc[s[0]] = toIntIfInt(s[1]);
    } else if (s.length === 1 && expr.length > 1) {
      acc[s[0]] = undefined;
    }
    return acc;
  };
  
  exports.parseParams = function (str) {
    return str.split(/;\s?/).reduce(paramReducer, {});
  };
  
  // For backward compatibility - alias will be removed in 3.0.0
  exports.parseFmtpConfig = exports.parseParams;
  
  exports.parsePayloads = function (str) {
    return str.toString().split(' ').map(Number);
  };
  
  exports.parseRemoteCandidates = function (str) {
    var candidates = [];
    var parts = str.split(' ').map(toIntIfInt);
    for (var i = 0; i < parts.length; i += 3) {
      candidates.push({
        component: parts[i],
        ip: parts[i + 1],
        port: parts[i + 2]
      });
    }
    return candidates;
  };
  
  exports.parseImageAttributes = function (str) {
    return str.split(' ').map(function (item) {
      return item.substring(1, item.length-1).split(',').reduce(paramReducer, {});
    });
  };
  
  exports.parseSimulcastStreamList = function (str) {
    return str.split(';').map(function (stream) {
      return stream.split(',').map(function (format) {
        var scid, paused = false;
  
        if (format[0] !== '~') {
          scid = toIntIfInt(format);
        } else {
          scid = toIntIfInt(format.substring(1, format.length));
          paused = true;
        }
  
        return {
          scid: scid,
          paused: paused
        };
      });
    });
  };
  
  },{"./grammar":"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/grammar.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/writer.js":[function(require,module,exports){
  var grammar = require('./grammar');
  
  // customized util.format - discards excess arguments and can void middle ones
  var formatRegExp = /%[sdv%]/g;
  var format = function (formatStr) {
    var i = 1;
    var args = arguments;
    var len = args.length;
    return formatStr.replace(formatRegExp, function (x) {
      if (i >= len) {
        return x; // missing argument
      }
      var arg = args[i];
      i += 1;
      switch (x) {
      case '%%':
        return '%';
      case '%s':
        return String(arg);
      case '%d':
        return Number(arg);
      case '%v':
        return '';
      }
    });
    // NB: we discard excess arguments - they are typically undefined from makeLine
  };
  
  var makeLine = function (type, obj, location) {
    var str = obj.format instanceof Function ?
      (obj.format(obj.push ? location : location[obj.name])) :
      obj.format;
  
    var args = [type + '=' + str];
    if (obj.names) {
      for (var i = 0; i < obj.names.length; i += 1) {
        var n = obj.names[i];
        if (obj.name) {
          args.push(location[obj.name][n]);
        }
        else { // for mLine and push attributes
          args.push(location[obj.names[i]]);
        }
      }
    }
    else {
      args.push(location[obj.name]);
    }
    return format.apply(null, args);
  };
  
  // RFC specified order
  // TODO: extend this with all the rest
  var defaultOuterOrder = [
    'v', 'o', 's', 'i',
    'u', 'e', 'p', 'c',
    'b', 't', 'r', 'z', 'a'
  ];
  var defaultInnerOrder = ['i', 'c', 'b', 'a'];
  
  
  module.exports = function (session, opts) {
    opts = opts || {};
    // ensure certain properties exist
    if (session.version == null) {
      session.version = 0; // 'v=0' must be there (only defined version atm)
    }
    if (session.name == null) {
      session.name = ' '; // 's= ' must be there if no meaningful name set
    }
    session.media.forEach(function (mLine) {
      if (mLine.payloads == null) {
        mLine.payloads = '';
      }
    });
  
    var outerOrder = opts.outerOrder || defaultOuterOrder;
    var innerOrder = opts.innerOrder || defaultInnerOrder;
    var sdp = [];
  
    // loop through outerOrder for matching properties on session
    outerOrder.forEach(function (type) {
      grammar[type].forEach(function (obj) {
        if (obj.name in session && session[obj.name] != null) {
          sdp.push(makeLine(type, obj, session));
        }
        else if (obj.push in session && session[obj.push] != null) {
          session[obj.push].forEach(function (el) {
            sdp.push(makeLine(type, obj, el));
          });
        }
      });
    });
  
    // then for each media line, follow the innerOrder
    session.media.forEach(function (mLine) {
      sdp.push(makeLine('m', grammar.m[0], mLine));
  
      innerOrder.forEach(function (type) {
        grammar[type].forEach(function (obj) {
          if (obj.name in mLine && mLine[obj.name] != null) {
            sdp.push(makeLine(type, obj, mLine));
          }
          else if (obj.push in mLine && mLine[obj.push] != null) {
            mLine[obj.push].forEach(function (el) {
              sdp.push(makeLine(type, obj, el));
            });
          }
        });
      });
    });
  
    return sdp.join('\r\n') + '\r\n';
  };
  
  },{"./grammar":"/home/ubuntu/umbrella-voice2/app/node_modules/sdp-transform/lib/grammar.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/url-parse/index.js":[function(require,module,exports){
  (function (global){(function (){
  'use strict';
  
  var required = require('requires-port')
    , qs = require('querystringify')
    , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:[\\/]+/
    , protocolre = /^([a-z][a-z0-9.+-]*:)?([\\/]{1,})?([\S\s]*)/i
    , whitespace = '[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]'
    , left = new RegExp('^'+ whitespace +'+');
  
  /**
   * Trim a given string.
   *
   * @param {String} str String to trim.
   * @public
   */
  function trimLeft(str) {
    return (str ? str : '').toString().replace(left, '');
  }
  
  /**
   * These are the parse rules for the URL parser, it informs the parser
   * about:
   *
   * 0. The char it Needs to parse, if it's a string it should be done using
   *    indexOf, RegExp using exec and NaN means set as current value.
   * 1. The property we should set when parsing this value.
   * 2. Indication if it's backwards or forward parsing, when set as number it's
   *    the value of extra chars that should be split off.
   * 3. Inherit from location if non existing in the parser.
   * 4. `toLowerCase` the resulting value.
   */
  var rules = [
    ['#', 'hash'],                        // Extract from the back.
    ['?', 'query'],                       // Extract from the back.
    function sanitize(address) {          // Sanitize what is left of the address
      return address.replace('\\', '/');
    },
    ['/', 'pathname'],                    // Extract from the back.
    ['@', 'auth', 1],                     // Extract from the front.
    [NaN, 'host', undefined, 1, 1],       // Set left over value.
    [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
    [NaN, 'hostname', undefined, 1, 1]    // Set left over.
  ];
  
  /**
   * These properties should not be copied or inherited from. This is only needed
   * for all non blob URL's as a blob URL does not include a hash, only the
   * origin.
   *
   * @type {Object}
   * @private
   */
  var ignore = { hash: 1, query: 1 };
  
  /**
   * The location object differs when your code is loaded through a normal page,
   * Worker or through a worker using a blob. And with the blobble begins the
   * trouble as the location object will contain the URL of the blob, not the
   * location of the page where our code is loaded in. The actual origin is
   * encoded in the `pathname` so we can thankfully generate a good "default"
   * location from it so we can generate proper relative URL's again.
   *
   * @param {Object|String} loc Optional default location object.
   * @returns {Object} lolcation object.
   * @public
   */
  function lolcation(loc) {
    var globalVar;
  
    if (typeof window !== 'undefined') globalVar = window;
    else if (typeof global !== 'undefined') globalVar = global;
    else if (typeof self !== 'undefined') globalVar = self;
    else globalVar = {};
  
    var location = globalVar.location || {};
    loc = loc || location;
  
    var finaldestination = {}
      , type = typeof loc
      , key;
  
    if ('blob:' === loc.protocol) {
      finaldestination = new Url(unescape(loc.pathname), {});
    } else if ('string' === type) {
      finaldestination = new Url(loc, {});
      for (key in ignore) delete finaldestination[key];
    } else if ('object' === type) {
      for (key in loc) {
        if (key in ignore) continue;
        finaldestination[key] = loc[key];
      }
  
      if (finaldestination.slashes === undefined) {
        finaldestination.slashes = slashes.test(loc.href);
      }
    }
  
    return finaldestination;
  }
  
  /**
   * @typedef ProtocolExtract
   * @type Object
   * @property {String} protocol Protocol matched in the URL, in lowercase.
   * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
   * @property {String} rest Rest of the URL that is not part of the protocol.
   */
  
  /**
   * Extract protocol information from a URL with/without double slash ("//").
   *
   * @param {String} address URL we want to extract from.
   * @return {ProtocolExtract} Extracted information.
   * @private
   */
  function extractProtocol(address) {
    address = trimLeft(address);
  
    var match = protocolre.exec(address)
      , protocol = match[1] ? match[1].toLowerCase() : ''
      , slashes = !!(match[2] && match[2].length >= 2)
      , rest =  match[2] && match[2].length === 1 ? '/' + match[3] : match[3];
  
    return {
      protocol: protocol,
      slashes: slashes,
      rest: rest
    };
  }
  
  /**
   * Resolve a relative URL pathname against a base URL pathname.
   *
   * @param {String} relative Pathname of the relative URL.
   * @param {String} base Pathname of the base URL.
   * @return {String} Resolved pathname.
   * @private
   */
  function resolve(relative, base) {
    if (relative === '') return base;
  
    var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
      , i = path.length
      , last = path[i - 1]
      , unshift = false
      , up = 0;
  
    while (i--) {
      if (path[i] === '.') {
        path.splice(i, 1);
      } else if (path[i] === '..') {
        path.splice(i, 1);
        up++;
      } else if (up) {
        if (i === 0) unshift = true;
        path.splice(i, 1);
        up--;
      }
    }
  
    if (unshift) path.unshift('');
    if (last === '.' || last === '..') path.push('');
  
    return path.join('/');
  }
  
  /**
   * The actual URL instance. Instead of returning an object we've opted-in to
   * create an actual constructor as it's much more memory efficient and
   * faster and it pleases my OCD.
   *
   * It is worth noting that we should not use `URL` as class name to prevent
   * clashes with the global URL instance that got introduced in browsers.
   *
   * @constructor
   * @param {String} address URL we want to parse.
   * @param {Object|String} [location] Location defaults for relative paths.
   * @param {Boolean|Function} [parser] Parser for the query string.
   * @private
   */
  function Url(address, location, parser) {
    address = trimLeft(address);
  
    if (!(this instanceof Url)) {
      return new Url(address, location, parser);
    }
  
    var relative, extracted, parse, instruction, index, key
      , instructions = rules.slice()
      , type = typeof location
      , url = this
      , i = 0;
  
    //
    // The following if statements allows this module two have compatibility with
    // 2 different API:
    //
    // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
    //    where the boolean indicates that the query string should also be parsed.
    //
    // 2. The `URL` interface of the browser which accepts a URL, object as
    //    arguments. The supplied object will be used as default values / fall-back
    //    for relative paths.
    //
    if ('object' !== type && 'string' !== type) {
      parser = location;
      location = null;
    }
  
    if (parser && 'function' !== typeof parser) parser = qs.parse;
  
    location = lolcation(location);
  
    //
    // Extract protocol information before running the instructions.
    //
    extracted = extractProtocol(address || '');
    relative = !extracted.protocol && !extracted.slashes;
    url.slashes = extracted.slashes || relative && location.slashes;
    url.protocol = extracted.protocol || location.protocol || '';
    address = extracted.rest;
  
    //
    // When the authority component is absent the URL starts with a path
    // component.
    //
    if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];
  
    for (; i < instructions.length; i++) {
      instruction = instructions[i];
  
      if (typeof instruction === 'function') {
        address = instruction(address);
        continue;
      }
  
      parse = instruction[0];
      key = instruction[1];
  
      if (parse !== parse) {
        url[key] = address;
      } else if ('string' === typeof parse) {
        if (~(index = address.indexOf(parse))) {
          if ('number' === typeof instruction[2]) {
            url[key] = address.slice(0, index);
            address = address.slice(index + instruction[2]);
          } else {
            url[key] = address.slice(index);
            address = address.slice(0, index);
          }
        }
      } else if ((index = parse.exec(address))) {
        url[key] = index[1];
        address = address.slice(0, index.index);
      }
  
      url[key] = url[key] || (
        relative && instruction[3] ? location[key] || '' : ''
      );
  
      //
      // Hostname, host and protocol should be lowercased so they can be used to
      // create a proper `origin`.
      //
      if (instruction[4]) url[key] = url[key].toLowerCase();
    }
  
    //
    // Also parse the supplied query string in to an object. If we're supplied
    // with a custom parser as function use that instead of the default build-in
    // parser.
    //
    if (parser) url.query = parser(url.query);
  
    //
    // If the URL is relative, resolve the pathname against the base URL.
    //
    if (
        relative
      && location.slashes
      && url.pathname.charAt(0) !== '/'
      && (url.pathname !== '' || location.pathname !== '')
    ) {
      url.pathname = resolve(url.pathname, location.pathname);
    }
  
    //
    // Default to a / for pathname if none exists. This normalizes the URL
    // to always have a /
    //
    if (url.pathname.charAt(0) !== '/' && url.hostname) {
      url.pathname = '/' + url.pathname;
    }
  
    //
    // We should not add port numbers if they are already the default port number
    // for a given protocol. As the host also contains the port number we're going
    // override it with the hostname which contains no port number.
    //
    if (!required(url.port, url.protocol)) {
      url.host = url.hostname;
      url.port = '';
    }
  
    //
    // Parse down the `auth` for the username and password.
    //
    url.username = url.password = '';
    if (url.auth) {
      instruction = url.auth.split(':');
      url.username = instruction[0] || '';
      url.password = instruction[1] || '';
    }
  
    url.origin = url.protocol && url.host && url.protocol !== 'file:'
      ? url.protocol +'//'+ url.host
      : 'null';
  
    //
    // The href is just the compiled result.
    //
    url.href = url.toString();
  }
  
  /**
   * This is convenience method for changing properties in the URL instance to
   * insure that they all propagate correctly.
   *
   * @param {String} part          Property we need to adjust.
   * @param {Mixed} value          The newly assigned value.
   * @param {Boolean|Function} fn  When setting the query, it will be the function
   *                               used to parse the query.
   *                               When setting the protocol, double slash will be
   *                               removed from the final url if it is true.
   * @returns {URL} URL instance for chaining.
   * @public
   */
  function set(part, value, fn) {
    var url = this;
  
    switch (part) {
      case 'query':
        if ('string' === typeof value && value.length) {
          value = (fn || qs.parse)(value);
        }
  
        url[part] = value;
        break;
  
      case 'port':
        url[part] = value;
  
        if (!required(value, url.protocol)) {
          url.host = url.hostname;
          url[part] = '';
        } else if (value) {
          url.host = url.hostname +':'+ value;
        }
  
        break;
  
      case 'hostname':
        url[part] = value;
  
        if (url.port) value += ':'+ url.port;
        url.host = value;
        break;
  
      case 'host':
        url[part] = value;
  
        if (/:\d+$/.test(value)) {
          value = value.split(':');
          url.port = value.pop();
          url.hostname = value.join(':');
        } else {
          url.hostname = value;
          url.port = '';
        }
  
        break;
  
      case 'protocol':
        url.protocol = value.toLowerCase();
        url.slashes = !fn;
        break;
  
      case 'pathname':
      case 'hash':
        if (value) {
          var char = part === 'pathname' ? '/' : '#';
          url[part] = value.charAt(0) !== char ? char + value : value;
        } else {
          url[part] = value;
        }
        break;
  
      default:
        url[part] = value;
    }
  
    for (var i = 0; i < rules.length; i++) {
      var ins = rules[i];
  
      if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
    }
  
    url.origin = url.protocol && url.host && url.protocol !== 'file:'
      ? url.protocol +'//'+ url.host
      : 'null';
  
    url.href = url.toString();
  
    return url;
  }
  
  /**
   * Transform the properties back in to a valid and full URL string.
   *
   * @param {Function} stringify Optional query stringify function.
   * @returns {String} Compiled version of the URL.
   * @public
   */
  function toString(stringify) {
    if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;
  
    var query
      , url = this
      , protocol = url.protocol;
  
    if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';
  
    var result = protocol + (url.slashes ? '//' : '');
  
    if (url.username) {
      result += url.username;
      if (url.password) result += ':'+ url.password;
      result += '@';
    }
  
    result += url.host + url.pathname;
  
    query = 'object' === typeof url.query ? stringify(url.query) : url.query;
    if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;
  
    if (url.hash) result += url.hash;
  
    return result;
  }
  
  Url.prototype = { set: set, toString: toString };
  
  //
  // Expose the URL parser and some additional properties that might be useful for
  // others or testing.
  //
  Url.extractProtocol = extractProtocol;
  Url.location = lolcation;
  Url.trimLeft = trimLeft;
  Url.qs = qs;
  
  module.exports = Url;
  
  }).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
  
  },{"querystringify":"/home/ubuntu/umbrella-voice2/app/node_modules/querystringify/index.js","requires-port":"/home/ubuntu/umbrella-voice2/app/node_modules/requires-port/index.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/websocket/lib/browser.js":[function(require,module,exports){
  var _globalThis;
  if (typeof globalThis === 'object') {
    _globalThis = globalThis;
  } else {
    try {
      _globalThis = require('es5-ext/global');
    } catch (error) {
    } finally {
      if (!_globalThis && typeof window !== 'undefined') { _globalThis = window; }
      if (!_globalThis) { throw new Error('Could not determine global this'); }
    }
  }
  
  var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
  var websocket_version = require('./version');
  
  
  /**
   * Expose a W3C WebSocket class with just one or two arguments.
   */
  function W3CWebSocket(uri, protocols) {
    var native_instance;
  
    if (protocols) {
      native_instance = new NativeWebSocket(uri, protocols);
    }
    else {
      native_instance = new NativeWebSocket(uri);
    }
  
    /**
     * 'native_instance' is an instance of nativeWebSocket (the browser's WebSocket
     * class). Since it is an Object it will be returned as it is when creating an
     * instance of W3CWebSocket via 'new W3CWebSocket()'.
     *
     * ECMAScript 5: http://bclary.com/2004/11/07/#a-13.2.2
     */
    return native_instance;
  }
  if (NativeWebSocket) {
    ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function(prop) {
      Object.defineProperty(W3CWebSocket, prop, {
        get: function() { return NativeWebSocket[prop]; }
      });
    });
  }
  
  /**
   * Module exports.
   */
  module.exports = {
      'w3cwebsocket' : NativeWebSocket ? W3CWebSocket : null,
      'version'      : websocket_version
  };
  
  },{"./version":"/home/ubuntu/umbrella-voice2/app/node_modules/websocket/lib/version.js","es5-ext/global":"/home/ubuntu/umbrella-voice2/app/node_modules/es5-ext/global.js"}],"/home/ubuntu/umbrella-voice2/app/node_modules/websocket/lib/version.js":[function(require,module,exports){
  module.exports = require('../package.json').version;
  
  },{"../package.json":"/home/ubuntu/umbrella-voice2/app/node_modules/websocket/package.json"}],"/home/ubuntu/umbrella-voice2/app/node_modules/websocket/package.json":[function(require,module,exports){
  module.exports={
    "_from": "websocket@^1.0.33",
    "_id": "websocket@1.0.34",
    "_inBundle": false,
    "_integrity": "sha512-PRDso2sGwF6kM75QykIesBijKSVceR6jL2G8NGYyq2XrItNC2P5/qL5XeR056GhA+Ly7JMFvJb9I312mJfmqnQ==",
    "_location": "/websocket",
    "_phantomChildren": {},
    "_requested": {
      "type": "range",
      "registry": true,
      "raw": "websocket@^1.0.33",
      "name": "websocket",
      "escapedName": "websocket",
      "rawSpec": "^1.0.33",
      "saveSpec": null,
      "fetchSpec": "^1.0.33"
    },
    "_requiredBy": [
      "/protoo-client"
    ],
    "_resolved": "https://registry.npmjs.org/websocket/-/websocket-1.0.34.tgz",
    "_shasum": "2bdc2602c08bf2c82253b730655c0ef7dcab3111",
    "_spec": "websocket@^1.0.33",
    "_where": "/home/ubuntu/umbrella-voice/app/node_modules/protoo-client",
    "author": {
      "name": "Brian McKelvey",
      "email": "theturtle32@gmail.com",
      "url": "https://github.com/theturtle32"
    },
    "browser": "lib/browser.js",
    "bugs": {
      "url": "https://github.com/theturtle32/WebSocket-Node/issues"
    },
    "bundleDependencies": false,
    "config": {
      "verbose": false
    },
    "contributors": [
      {
        "name": "Iñaki Baz Castillo",
        "email": "ibc@aliax.net",
        "url": "http://dev.sipdoc.net"
      }
    ],
    "dependencies": {
      "bufferutil": "^4.0.1",
      "debug": "^2.2.0",
      "es5-ext": "^0.10.50",
      "typedarray-to-buffer": "^3.1.5",
      "utf-8-validate": "^5.0.2",
      "yaeti": "^0.0.6"
    },
    "deprecated": false,
    "description": "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",
    "devDependencies": {
      "buffer-equal": "^1.0.0",
      "gulp": "^4.0.2",
      "gulp-jshint": "^2.0.4",
      "jshint": "^2.0.0",
      "jshint-stylish": "^2.2.1",
      "tape": "^4.9.1"
    },
    "directories": {
      "lib": "./lib"
    },
    "engines": {
      "node": ">=4.0.0"
    },
    "homepage": "https://github.com/theturtle32/WebSocket-Node",
    "keywords": [
      "websocket",
      "websockets",
      "socket",
      "networking",
      "comet",
      "push",
      "RFC-6455",
      "realtime",
      "server",
      "client"
    ],
    "license": "Apache-2.0",
    "main": "index",
    "name": "websocket",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/theturtle32/WebSocket-Node.git"
    },
    "scripts": {
      "gulp": "gulp",
      "test": "tape test/unit/*.js"
    },
    "version": "1.0.34"
  }
  
  },{}]},{},["/home/ubuntu/umbrella-voice2/app/lib/index.js"])
  