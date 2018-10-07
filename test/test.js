(function() {
  var assert = require("assert"),
    plus = require("../lib/plus");
 suite("plus", function() {
    test("Calculator-test-function", function() {
      return assert.equal(5, plus(2, 3));
    });
  });
}).call(this);
