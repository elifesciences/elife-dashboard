var Handlebars = require("handlebars");
var moment = require("moment");
var dates = require("dates");
Handlebars.registerHelper('elFormatUnixDate', function(date, format) {
  return moment.unix(date).format(format);
});
Handlebars.registerHelper('elFormatDate', function(date, format) {
  return dates.format(date, format);
});