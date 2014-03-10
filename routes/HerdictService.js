var rjs = require("./RequestJSONService");

module.exports.HerdictService = _.extend(_.clone(rjs.RequestJSONService), {
  baseUrl: "http://www.herdict.org/api/reports/countries?days=365&url=",
  name: "herdict"
});
