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

function countFailures(tests, expectedFailures) {
    var hook = {},
        err = {},
        suite = new Suite(),
        runner;

    tests.forEach(function (test) {
        suite.addTest(test);
    });

    runner = new Runner(suite);
    runner.failHook(hook, err);

    assert.strictEqual(expectedFailures, runner.failures);
}

function nop() {
    return;
}

function run(tests) {
    tests.forEach(function (test) {
        test.run(nop);
    });
    return tests;
}
\\Test cases: 

\\

\\Check URL Connection
describe('Test URL API', function() {
    it('return 200', function() {
        request.get({url: baseUrl},
        return assert.equal(200);
            });
    });
});