"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set_wallet = exports.set_login_status = exports.set_chain_id = exports.set_address = exports.request_disconnection = exports.request_connection = exports.request_change_network = void 0;

var _constants = require("../constants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var set_chain_id = function set_chain_id(id) {
  return {
    type: _constants.SET_CHAIN_ID,
    payload: id
  };
};

exports.set_chain_id = set_chain_id;

var set_wallet = function set_wallet(wallet) {
  return {
    type: _constants.SET_WALLET,
    payload: wallet
  };
};

exports.set_wallet = set_wallet;

var set_address = function set_address(address) {
  return {
    type: _constants.SET_ADDRESS,
    payload: address
  };
};

exports.set_address = set_address;

var set_login_status = function set_login_status(status) {
  return {
    type: _constants.SET_LOGIN_STATUS,
    payload: status
  };
};
/*  *~~*~~*~~*~~*~~* THUNK FUNCTIONS *~~*~~*~~*~~*~~* */


exports.set_login_status = set_login_status;

var request_connection = function request_connection() {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      var _window, ethereum, web3, accounts;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _window = window, ethereum = _window.ethereum;
              web3 = getState().web3Reducer.web3;
              _context.prev = 2;
              _context.next = 5;
              return ethereum.request({
                method: "eth_requestAccounts"
              });

            case 5:
              accounts = _context.sent;
              dispatch(set_login_status(true));
              _context.t0 = dispatch;
              _context.t1 = set_chain_id;
              _context.next = 11;
              return web3.eth.getChainId();

            case 11:
              _context.t2 = _context.sent;
              _context.t3 = (0, _context.t1)(_context.t2);
              (0, _context.t0)(_context.t3);
              dispatch(set_address(accounts[0]));
              _context.next = 19;
              break;

            case 17:
              _context.prev = 17;
              _context.t4 = _context["catch"](2);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 17]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.request_connection = request_connection;

var request_disconnection = function request_disconnection() {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch(set_login_status(false));
              dispatch(set_wallet(null));
              dispatch(set_address(null));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
};

exports.request_disconnection = request_disconnection;

var request_change_network = function request_change_network(networkId) {
  return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{
                chainId: "0x".concat(networkId.toString(16))
              }] // chainId must be in hexadecimal numbers

            });

          case 3:
            _context3.next = 7;
            break;

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 5]]);
  }));
};

exports.request_change_network = request_change_network;