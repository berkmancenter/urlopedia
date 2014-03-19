_ = require("underscore");
request = require('request');
Promise = require('promise');
fs = require('fs');
Twit = require('twit');

module.exports.TwitterService = {
  baseUrl: "",
  name: "twitter",
  credentials_file: __dirname + '/../config/credentials/twitter.json',

  fetch: function(url){
    console.log("fetching " + url);

    return new Promise( function( resolve, reject ) {
      fs.readFile(this.credentials_file, 'utf8', function (err, data) {
        if (err) {
          reject( { error: 'Missing credentials' } );
        } else {
          var credentials = JSON.parse(data);

          var T = new Twit( credentials );

          T.get( 'search/tweets', { q: url }, function( err, data ) {
            if (err) {
              reject( {
                error: err
              } );
            } else {
              resolve( {
                twitter: data
              } );
            }
          } );
        }
      });

    }.bind(this) );
  }
}
