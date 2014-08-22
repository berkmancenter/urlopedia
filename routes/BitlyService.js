_ = require("underscore");
request = require('request');
Promise = require('promise');
BitlyAPI = require("node-bitlyapi");
fs = require('fs');

module.exports.BitlyService = {
  credentials_file: __dirname + '/../config/credentials/bitly.json',

  fetch: function(url) {
    console.log("fetching " + url);
    return new Promise( function( resolve, reject ) {
      fs.readFile(this.credentials_file, 'utf8', function (err, data) {
        if (err) {
          reject( { error: 'Missing credentials' } );
        } else {
          var credentials = JSON.parse(data);

          var Bitly = new BitlyAPI({
            client_id: credentials.client_id,
            client_secret: credentials.client_secret
          });

          Bitly.setAccessToken(credentials.access_token);

          Bitly.getLinkClicks({link:url}, function(err, results) {
            if (results.status_code == '200') {
              console.log(results);
              rval = {};
              rval[this.name]=results
              resolve(rval);
            } else {
              reject( { error: 'Bad Response: ' + results.status_code } );
            }
          }.bind(this) );
        }
      }.bind(this) );
    }.bind(this) );
  }
}