"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _walletActions = require("./walletActions");

Object.keys(_walletActions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _walletActions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _walletActions[key];
    }
  });
});

var _web3Actions = require("./web3Actions");

Object.keys(_web3Actions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _web3Actions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _web3Actions[key];
    }
  });
});