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
  });


\\String Test
describe('Basic Mocha String Test', function () {
 it('should return number of charachters in a string', function () {
        assert.equal("Hello".length, 4);
    });
	
\\Outtest
 it('should return first charachter of the string', function () {
        assert.equal("Hello".charAt(0), 'H');
    });
});
}).call(this);