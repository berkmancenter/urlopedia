var rjs = require("./RequestJSONService");


module.exports.MediaCloudService = _.extend(_.clone(rjs.RequestJSONService), {
  baseUrl: 'http://mediacloud.org/url?url=',
  name: "mediacloud"
});
