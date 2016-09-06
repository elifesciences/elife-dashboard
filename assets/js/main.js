(function () {
    var options = {
        debug: true
    };
    var config = require('config')();
    var schedule = require('schedule')(config);
    var publish = require('publish')(config);
    var current = require('current')(config);
    var detail = require('detail')(config);
    var scheduled = require('scheduled')(config);

    publish.init();
    schedule.init();
    current.init();
    detail.init();
    scheduled.init();
})();