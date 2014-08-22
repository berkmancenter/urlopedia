/*
	node-bitlyapi test
 */

var access_token = "";
var client_id = "";
var client_secret = "";

var BitlyAPI = require("node-bitlyapi");

var Bitly = new BitlyAPI({
    client_id: client_id,
    client_secret: client_secret    
});

Bitly.setAccessToken(access_token);

var clicks_response = Bitly.getLinkClicks({link:"http://bit.ly/1ovjOXg"}, function(err, results) {
	console.log(results);	
	return results;
});

console.log(clicks_response);
// if(status_code == 200) {console.log("double-plus good!");}
