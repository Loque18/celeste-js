"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _web3Reducer = _interopRequireDefault(require("./reducers/web3Reducer"));

var _walletReducer = _interopRequireDefault(require("./reducers/walletReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reducer = (0, _redux.combineReducers)({
  web3Reducer: _web3Reducer["default"],
  walletReducer: _walletReducer["default"]
});
var store = (0, _redux.createStore)(reducer, (0, _redux.applyMiddleware)(_reduxThunk["default"]));
var _default = store;
exports["default"] = _default;