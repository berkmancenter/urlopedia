_ = require("underscore");
request = require('request');
Promise = require('promise');

module.exports.RequestJSONService = {
  baseUrl: "",
  name: "",

  construct_url: function(url){
    return this.baseUrl + encodeURIComponent(url);
  },

  fetch: function(url){
        console.log("fetching " + this.construct_url(url));
        return new Promise( function( resolve, reject ) {
            request( {
                url: this.construct_url(url),
                json: true
            }, function ( e, r, body ) {
              if (!e && r.statusCode == 200) {
                console.log( body );
                rval = {};
                rval[this.name]=body
                resolve(rval);
              }
            }.bind(this) );
          }.bind(this) );
  }
}
