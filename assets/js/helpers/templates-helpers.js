var Handlebars = require("handlebars");
var moment = require("moment");
Handlebars.registerHelper('elFormatUnixDate', function(date, format) {
  return moment.unix(date).format(format);
});