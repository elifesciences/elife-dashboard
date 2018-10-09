var dates = require('../js/helpers/dates.js');
var moment = require('moment');

//component to be tested
describe('Dates', function () {
    'use strict';

    it('dates should exist', function () {
        expect(dates).to.be.an('object');
    });

    // test cases
    describe('setup method', function () {
        it('Should do nothing if input is already instance of moment', function () {
            var testDate = moment();
            var result = dates.setup(testDate);
            expect(result).to.be.instanceOf(moment);
        });
        it('Should create instance of moment from unix timestamp', function () {
            var epoch = 1474373340;
            var epochMs = 1474373352069;
            expect(dates.setup(epoch)).to.eql(moment.unix(epoch));
            expect(dates.setup(epochMs)).to.eql(moment.unix(epochMs));
        });
        it('Should create instance of moment from a date', function () {
            var dateOne = 'January 1, 2015 1:15pm';
            var dateTwo = '2014/04/25';
            var dateThree = 'Thu Apr 24 2014 12:32:21 GMT-0700 (PDT)';
            var dateIsoUtc = '2014-04-25T01:32:21.196Z';
            var dateIsoNoTimezone = '2014-04-25T01:32:21.196+0600';

            expect(dates.setup(dateOne)).to.be.false;
            expect(dates.setup(dateTwo)).to.be.instanceOf(moment);
            expect(dates.setup(dateThree)).to.be.instanceOf(moment);
            expect(dates.setup(dateIsoUtc)).to.be.instanceOf(moment);
            expect(dates.setup(dateIsoNoTimezone)).to.be.instanceOf(moment);

        });
    });

    describe('format method', function () {

        it('should return the date in the requested format', function () {
            var date = '1480636740'; //2016-12-01T23:59:00Z
            expect(dates.format(date, 'fullConcise')).to.equal('01/12/2016 11:59pm');
            expect(dates.format(date, 'fullHuman')).to.equal('December 1, 2016 11:59pm');
            expect(dates.format(date, 'timestamp')).to.equal('01/12/2016 23:59:00');

            expect(dates.format(date, 'timeConcise')).to.equal('23:59:00');
            expect(dates.format(date, 'timeHuman')).to.equal('11:59pm');
            expect(dates.format(date, 'dateConcise')).to.equal('01/12/2016');
            expect(dates.format(date, 'dateHuman')).to.equal('December 1, 2016');

            expect(dates.format(date, 'default')).to.equal('2016-12-01 23:59 +00:00');
            expect(dates.format(date, 'none')).to.equal('Date output format not supplied');
        });

        it('should state invalid format when invalid format supplied', function () {
            var dateOne = 'January 1, 2015 1:15pm';
            expect(dates.format(dateOne, 'fullConcise')).to.equal('Invalid date format supplied');
        });

    });

});