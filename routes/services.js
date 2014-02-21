_ = require("underscore");
request = require('request');


// example of a service that takes in a url and returns json
function url_service(url){
  // $SERVICE_NAME { key: value }
  return {url:url}
}

function herdict_service(url){
  var rval = {};

  var countryReportUrl = 'http://www.herdict.org/api/reports/countries?days=365&url=' +  url;

  request( {
      url: countryReportUrl,
      json: true
  }, function ( e, r, body ) {
    if (!e && response.statusCode == 200) {
      rval = JSON.parse( body );
    }
  } );

  return {
    herdict: rval
  };
}

function wayback_machine_service(url){
  console.log('loading wayback');
  request('http://archive.org/wayback/available?url=' +  encodeURIComponent(url), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Print the google web page.
    }
  })

  var rval = {};
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
    url = req.url.substring(req.url.indexOf('?')+1,req.url.length)
    rval = {};

    // query string validation
    if(validate_url(url)){
      // merge the results of the url service into the results values
      _.extend(rval, url_service(url)); 
      _.extend(rval, herdict_service(url)); 
    }
    res.json(rval);
};


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


