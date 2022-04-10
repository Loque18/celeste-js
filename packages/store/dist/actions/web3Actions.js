"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set_web3_read_instance = exports.set_web3_instance = exports.set_initialized = exports.add_contract = void 0;

var _constants = require("../constants");

var set_web3_instance = function set_web3_instance(web3Instance) {
  return {
    type: _constants.SET_WEB3_INSTANCE,
    payload: web3Instance
  };
};

exports.set_web3_instance = set_web3_instance;

var set_web3_read_instance = function set_web3_read_instance(chainName, chainId, web3instance) {
  return {
    type: _constants.SET_WEB3_READ_INSTANCE,
    payload: {
      chainName: chainName,
      chainId: chainId,
      web3instance: web3instance
    }
  };
};

exports.set_web3_read_instance = set_web3_read_instance;

var add_contract = function add_contract(key, contract) {
  return {
    type: _constants.ADD_CONTRACT,
    payload: {
      key: key,
      contract: contract
    }
  };
};

exports.add_contract = add_contract;

var set_initialized = function set_initialized(value) {
  return {
    type: _constants.SET_INITIALIZED,
    payload: value
  };
};

exports.set_initialized = set_initialized;