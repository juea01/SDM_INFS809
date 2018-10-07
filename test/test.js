 //Test Case 1:
 /*(function() {
 var assert = require("assert"),
 plus = require("../lib/plus");
 suite("plus", function() {
    it("Calculator-test-function", function() {
      return assert.equal(5, plus(2, 3));
    });
  });
}).call(this);
  
//Test Case 2:
  
  (function() {
 var assert = require("assert"),
  minus = require("../lib/minus");	  
  suite("minus", function() {
	 it("Canculator-check-function",function() {
	  return assert.equal(1, minus(10,9));
	 });
});
}).call(this);*/

//Test Case 3:

(function(){
	var assert = require("assert"),
	compares =require("../lib/Compare")
	suite("Compare function reminder",function(){
		it("Test compare reminder", function(){
			return assert.equal(1,delaytime(5,50));
		});
	});
}).call(this);

