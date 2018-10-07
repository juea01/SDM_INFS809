 var assert = require("assert"),
   
(function() {
 plus = require("../lib/plus"),	
 suite("plus", function() {
    it("Calculator-test-function", function() {
      return assert.equal(5, plus(2, 3));
    });
  });
}).call(this);
  (function() {
  minus = require("../lib/minus"),	  
  suite("minus", function() {
	 it("Canculator-check-function",function() {
	  return assert.equal(1, minus(10,9));
	 });
});
}).call(this);
