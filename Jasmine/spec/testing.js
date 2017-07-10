describe("Failed Search", function() {
	it('Cerca Buida', function () {
		user = "";
		UnityTesting.searchuser(user);
		expect(UnityTesting.tocheck.error).toBe("Error");
	});

	it('Cerca amb un git inexistent', function (){
		user = "ferrannoguerad";
		UnityTesting.searchuser(user);
		expect(UnityTesting.tocheck.error).toBe("Error");
	});
});
describe("Successfull Search w/ ferrannoguera Git",function(){
	beforeEach(function() {
		user = "ferrannoguera";
		UnityTesting.searchuser(user);
	});
	it('Check username',function(){
		expect(UnityTesting.tocheck.jsonuser.login).toBe("ferrannoguera");
	});
	it('Check fullname',function(){
		expect(UnityTesting.tocheck.jsonuser.name).toBe("Ferran Noguera Vall");
	});
	it('Check bio',function(){
		expect(UnityTesting.tocheck.jsonuser.bio).toBe("Studying Computer Engineering @ UPC- FIB");
	});
	it('Check img',function(){
		expect(UnityTesting.tocheck.jsonuser.avatar_url).toBe("https://avatars0.githubusercontent.com/u/29044151?v=3");
	});
});
describe("Same but checking api manually",function(){
	var user = "ferrannoguera";
	var request = new XMLHttpRequest();
	request.open('get', 'https://api.github.com/users/'+user, false)
	request.send();
	var jsonusercomp = JSON.parse(request.responseText);
	beforeEach(function() {
		UnityTesting.searchuser(user);
	});
	it('Check username',function(){
		expect(UnityTesting.tocheck.jsonuser.login).toBe(jsonusercomp.login);
	});
	it('Check fullname',function(){
		expect(UnityTesting.tocheck.jsonuser.name).toBe(jsonusercomp.name);
	});
	it('Check bio',function(){
		expect(UnityTesting.tocheck.jsonuser.bio).toBe(jsonusercomp.bio);
	});
	it('Check img',function(){
		expect(UnityTesting.tocheck.jsonuser.avatar_url).toBe(jsonusercomp.avatar_url);
	});
});

