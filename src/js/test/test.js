(function() {
  var assert = require("assert"),
    plus = require("../lib/plus");
  suite("plus", function() {
    it("Function calculator", function() {
      return assert.equal(5, plus(2, 3));
    });
  });
}).call(this);
