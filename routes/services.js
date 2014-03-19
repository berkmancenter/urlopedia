_ = require("underscore");
request = require('request');
Promise = require('promise');
WayBack = require('./WayBackService');
MediaCloud = require('./MediaCloudService');
Herdict = require('./HerdictService');
Describing = require('./DescribingAMService');

// validation method
function validate_url(url){
  if(url!= null && url!=""){
    return true;
  }
  return false;
}

// example of a service that takes in a url and returns a promise for json
function url_service(url){
  // { SERVICE_NAME: { key: value } }
  return new Promise( function( resolve, reject ) {
    resolve( {
      url: url
    } );
  } );
}

exports.all = function (req, res) {
  var url = req.url.substring(req.url.indexOf('?')+1,req.url.length);

  if ( !validate_url( url ) ) {
    res.status( 400 );
    return;
  }

  herdict = Object.create(Herdict.HerdictService);
  wayback = Object.create(WayBack.WayBackService);
  mediacloud = Object.create(MediaCloud.MediaCloudService);
  describing = Object.create(Describing.DescribingAMService);

  Promise.all( [
    url_service(url),
    herdict.fetch( url.replace( /^https?:\/\//, '' ) ),
    describing.fetch(url),
    mediacloud.fetch(url),
    wayback.fetch(url)
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

exports.mediacloud = function (req, res) {
  var url = req.url.substring(req.url.indexOf('?')+1,req.url.length);

  if ( !validate_url( url ) ) {
    res.status( 400 );
    return;
  }

  mediacloud = Object.create(MediaCloud.MediaCloudService);

  Promise.all( [
    url_service(url),
    mediacloud.fetch(url)
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

exports.herdict = function (req, res) {
  var url = req.url.substring(req.url.indexOf('?')+1,req.url.length);

  if ( !validate_url( url ) ) {
    res.status( 400 );
    return;
  }

  herdict = Object.create(Herdict.HerdictService);

  Promise.all( [
    url_service(url),
    herdict.fetch(url)
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
