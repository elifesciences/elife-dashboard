(function () {
    var config = require('config')();
    var schedule = require('schedule')(config);
    var current = require('current')(config);
    var detail = require('detail')(config);
    var scheduled = require('scheduled')(config);
    schedule.init();
    current.init();
    detail.init();
    scheduled.init();
})();