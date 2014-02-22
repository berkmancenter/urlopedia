var rjs = require("./RequestJSONService");

module.exports.WayBackService = _.extend(_.clone(rjs.RequestJSONService), {
  baseUrl: 'http://archive.org/wayback/available?url=',
  name: "wayback"
});
