_ = require("underscore");

// example of a service that takes in a url and returns json
function url_service(url){
  // $SERVICE_NAME + _ + value_name
  return {url:url}
}

function herdict_service(url){
  var rval = {};
  rval["url"] = url;
  return {"herdict": rval}
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
    }
    res.json(rval);
};


