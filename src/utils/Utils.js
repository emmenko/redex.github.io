// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var Curry      = require("bs-platform/lib/js/curry.js");
var $$String   = require("bs-platform/lib/js/string.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");

function hash(input) {
  var value = [0];
  $$String.iter((function (c) {
          value[0] = ((value[0] << 5) - value[0] | 0) + c | 0;
          return /* () */0;
        }), input);
  return Math.abs(value[0]);
}

function selectColor(colors, string) {
  var choices = colors.length;
  var index = Caml_int32.mod_(hash(string), choices);
  return Caml_array.caml_array_get(colors, index);
}

function tap(f, x) {
  Curry._1(f, x);
  return x;
}

exports.hash        = hash;
exports.selectColor = selectColor;
exports.tap         = tap;
/* No side effect */
