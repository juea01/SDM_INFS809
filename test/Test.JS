\\ Declare variables:

var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "https://slack.com/api";
var util = require("util");
var testData = require('./index');
var chai = require('chai');
var assert = chai.assert;

var Runner = require('mocha').Runner;
var Suite = require('mocha').Suite;

\\Check URL Connection
describe('Test URL API', function() {
    it('return 200', function() {
        request.get({url: baseUrl},
        return assert.equal(200);
            });
    });