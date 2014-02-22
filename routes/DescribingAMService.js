var rjs = require("./RequestJSONService");

module.exports.DescribingAMService = _.extend(_.clone(rjs.RequestJSONService), {
  baseUrl: "http://describ.ing.am/?format=json&url=http://",
  name: "describing.am"
});
