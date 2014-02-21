_ = require("underscore");
request = require('request');
Promise = require('promise');


// example of a service that takes in a url and returns json
function url_service(url){
  // $SERVICE_NAME { key: value }
  return new Promise( function( resolve, reject ) {
    resolve( {
      url: url
    } );
  } );
}

function herdict_service(url) {
  return new Promise( function( resolve, reject ) {
    var countryReportUrl = 'http://www.herdict.org/api/reports/countries?days=365&url=' +  url;

    request( {
        url: countryReportUrl,
        json: true
    }, function ( e, r, body ) {
      if (!e && r.statusCode == 200) {
        console.log( body );
        resolve( {
          herdict: body
        } );
      }
    } );
  } );
}

function wayback_machine_service(url){
  console.log('loading wayback');
  var rval = {};
  request.get({url:'http://archive.org/wayback/available?url=' +  encodeURIComponent(url), json:true}, function (error, response, body) {
    rval["status"] = response.statusCode;
    if (!error && response.statusCode == 200) {
      rval = _.extend(rval,body);
    }
  });
  return {"wayback": rval}
}

// validation method
function validate_url(url){
  if(url!= null && url!=""){
    return true;
  }
  return false;
}

exports.herdict = function (req, res) {
  var url = req.url.substring(req.url.indexOf('?')+1,req.url.length);

  if ( !validate_url( url ) ) {
    res.status( 400 );
    return;
  }

  Promise.all( [
    url_service( url ),
    herdict_service( url )
  ] )
  .then( function( result ) {
    res.json(result);
  } )
  .catch(function (e) {
    res.status( 500, {
      error: e
    } );
  });
};

/*
exports.herdict = function (req, res) {
    var url = req.url.substring(req.url.indexOf('?')+1,req.url.length);
    rval = {};

    // query string validation
    if (validate_url( url ) ) {
      // merge the results of the url service into the results values
      //_.extend(rval, url_service(url)); 

      herdict_service(url).then( function( result ) {
        _.extend(rval, result); 
        res.json(rval);
      } );

      //_.extend(rval, herdict_service(url)); 
    }
};
*/


exports.all = function (req, res) {
    url = req.url.substring(req.url.indexOf('?')+1,req.url.length)
    rval = {};

    // query string validation
    if(validate_url(url)){
      // merge the results of the url service into the results values
      _.extend(rval, url_service(url)); 
      _.extend(rval, herdict_service(url)); 
      _.extend(rval, wayback_machine_service(url)); 
    }
    res.json(rval);
};


