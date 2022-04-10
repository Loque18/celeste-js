"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultState = {
  web3: {},
  web3read: {},
  initialized: false,
  contracts: []
}; // eslint-disable-next-line default-param-last

var reducer = function reducer() {
  var _web3read;

  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case _constants.SET_WEB3_INSTANCE:
      return _objectSpread(_objectSpread({}, state), {}, {
        web3: payload
      });

    case _constants.SET_WEB3_READ_INSTANCE:
      return _objectSpread(_objectSpread({}, state), {}, {
        web3read: (_web3read = {}, _defineProperty(_web3read, payload.chainId, payload.web3instance), _defineProperty(_web3read, payload.chainName, payload.web3instance), _web3read)
      });

    case _constants.ADD_CONTRACT:
      {
        var _state = _objectSpread({}, state),
            contracts = _state.contracts;

        contracts[payload.key] = payload.contract;
        return _objectSpread(_objectSpread({}, state), {}, {
          contracts: contracts
        });
      }

    case _constants.SET_INITIALIZED:
      return _objectSpread(_objectSpread({}, state), {}, {
        initialized: payload
      });

    default:
      return _objectSpread({}, state);
  }
};

var _default = reducer;
exports["default"] = _default;