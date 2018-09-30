\\ Declare variables:

var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "http://vnexpress.net";
var util = require("util");
var testData = require('./index');
var chai = require('chai');
var assert = chai.assert;


(function() {
  var assert = require("assert"),
    plus = require("../lib/plus");
  suite("plus", function() {
    test("2 plus 3 should equals 5", function() {
      return assert.equal(6, plus(2, 3));
    });
  });.call(this);