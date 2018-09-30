\\ Declare variables:

var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "http://vnexpress.net";
var util = require("util");
var testData = require('./index');
var chai = require('chai');
var assert = chai.assert;


var Runner = require('mocha').Runner;
var Suite = require('mocha').Suite;

it('should return 200', function (done) {
  var options = {
    url: 'http://www.vnexpress.net:80',
  };
  request.get(options, function (err, res, body) {
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.equal('correct header');
    done();
  });
});