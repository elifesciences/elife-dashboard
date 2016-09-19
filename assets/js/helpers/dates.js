/**
 * This file helps keep dates within the dashboard consistent.
 * Please note, am/pm is not preceded by a space and shown in lowercase.
 *
 * The following are the date formats used on this site:
 *
 * ISO 8601 (2016-01-18T00:00:00Z)
 *
 * timeConcise - hh:mm:ss (23:59:59)
 * timeHuman - hh:mmpm (12:59am)
 * dateConcise - dd/mm/yyyy (30/12/2016)
 * dateHuman - month dd, yyyy (October 08, 2016)
 *
 * fullConcise - dd/mm/yyyy hh:mmpm (dateConcise + timeHuman) (30/12/2016 12:59am)
 * fullHuman - month dd, yyyy hh:mmpm (dateHuman + timeHuman) (October 08, 2016 12:59am)
 * timestamp - dd/mm/yyyy hh:mm:ss (dateConcise + timeConcise) (30/12/2016 23:59:59)
 *
 */

module.exports = function () {
    "use strict";

    // Libs
    {
        var moment = require('moment');
    }

    // Setup formats
    {
        var dateformat = {};
        dateformat.timeConcise = 'HH:mm:ss';
        dateformat.timeHuman = 'h:mma';
        dateformat.dateConcise = 'DD/MM/YYYY';
        dateformat.dateHuman = 'MMMM D, YYYY';
        dateformat.fullConcise = dateformat.dateConcise + ' ' + dateformat.timeHuman;
        dateformat.fullHuman = dateformat.dateHuman + ' ' + dateformat.timeHuman;
        dateformat.timestamp = dateformat.dateConcise + ' ' + dateformat.timeConcise;
        dateformat.dateDefault = 'YYYY-MM-DD HH:mm Z';
    }

    /**
     * Accepted dates
     *
     * Moment instances
     * Unix datestamp
     * ISO 8601 2014-04-25T01:32:21.196Z or 2014-04-25T01:32:21.196+0600
     *
     * @param date
     * @returns {*}
     */
    function setup(date) {
        moment.locale('en-GB');

        if (moment.isMoment(date)) {
            return date;
        }
        else if (moment.unix(date).isValid()) {
            // its a unix date
            return moment.unix(date);
        }
        else if(moment(date).isValid()) {
            // ensure it is a valid format - accepted by moment see https://github.com/moment/moment/issues/1407
            return moment(new Date(date));
        }
        else {
            return false;
        }
    }

    /**
     * Format inputted date into specified format
     * @param date
     * @param format
     * @returns {*}
     */
    function format(date, format) {
        moment.locale('en-GB');
        var formatted;

        date = dates.setup(date);

        if(date) {
            if (format === 'fullConcise') {
                formatted = date.format(dateformat.fullConcise);
            }
            else if (format === 'fullHuman') {
                formatted = date.format(dateformat.fullHuman);
            }
            else if (format === 'timestamp') {
                formatted = date.format(dateformat.timestamp);
            }
            else if (format === 'timeHuman') {
                formatted = date.format(dateformat.timeHuman);
            }
            else if (format === 'timeConcise') {
                formatted = date.format(dateformat.timeConcise);
            }
            else if (format === 'dateConcise') {
                formatted = date.format(dateformat.dateConcise);
            }
            else if (format === 'dateHuman') {
                formatted = date.format(dateformat.dateHuman);
            }
            else if (format === 'default') {
                formatted = date.format(dateformat.dateDefault);
            }
            else {
                formatted = 'Date output format not supplied';
            }
        }
        else {
            formatted = 'Invalid date format supplied';
        }

        return formatted;
    }

    var dates = {
        format: format,
        setup: setup,
        dateformat: dateformat
    };
    return dates;

}();
