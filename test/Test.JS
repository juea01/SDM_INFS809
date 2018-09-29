var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "https://slack.com/api";
var util = require("util");

describe('Test URL API', function() {
    it('returns luke', function(done) {
        request.get({ url: baseUrl },
            function(response) {
                    expect(response.statusCode).to.equal(200);
                    return assert.equal(200);
                done();
            });
    });
});