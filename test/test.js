 //Test Case 1:
 (function() {
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
}).call(this);

//Test Case 3:

(function(){
	var assert = require("assert"),
	compares =require("../lib/Compare");
	suite("Compare function reminder",function(){
		it("Test compare reminder- Next reminder will >= 5 and <= 50 mins", function(){
			return assert(delay_min(5) >= 5,"Min Time is less than 5");
			return assert(50 <= delay_max(50),"Max Time is greater than 50");
		});
	});
}).call(this);

//Test Case 4:
 (function() {
 var assert = require("assert"),
 business = require("../BusinessLayer");
 suite("business", function() {
    it("insertTeamMemberData", function() {
	 var data = {name: "Thomas Junior4", team: "DevTeam3", date: "12July2018", rating: "happy"};
      return assert.equal("success", business.insertTeamMemberData(data));
    });
  });
}).call(this);
