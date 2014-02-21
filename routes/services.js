_ = require("underscore");

// example of a service that takes in a url and returns json
function url_service(url){
  // $SERVICE_NAME + _ + value_name
  return {url:url}
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
    }
    res.json(rval);
};
