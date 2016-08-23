var utils = require('../js/helpers/utils.js');

//component to be tested
describe('Application Utilities', function () {
    'use strict';

    it('utils should exist', function () {
        expect(utils).to.be.a('object');
    });

    // test cases
    describe('addObject method', function () {
        it('Should add an object to an object', function () {
            var start = [{id: "0028982", version: "2", run: "def"}];
            var end = [{id: "0028982", version: "2", run: "def"}, {id: "002898", version: "2", run: "fsdfsdfass"}];
            var match = {id: "002898", version: "2", run: "fsdfsdfass"};
            expect(utils.addObject(start, match)).to.eql(end);
        });
    });

    describe('removeObject method', function () {
        it('Should remove an object from an object', function () {
            var start = [{id: "0028982", version: "2", run: "def"}, {id: "002898", version: "2", run: "fsdfsdfass"}];
            var end = [{id: "0028982", version: "2", run: "def"}];
            var match = {id: "002898", version: "2", run: "fsdfsdfass"};
            expect(utils.removeObject(start, match)).to.eql(end);
        });
    });

    describe('findLastKey method', function () {
        it('Should return the key for the last entry in an object', function () {
            var obj = {'keyone': 'keyonedata', 'keytwo': 'keytwodata'};
            var expected = 'keytwo';
            expect(utils.findLastKey(obj)).to.equal('keytwo');
        });
    });

    describe('isNumeric method', function () {
        var possibleInputs = [
            {
                arg: 1,
                expected: true
            },
            {
                arg: null,
                expected: false
            },
            {
                arg: NaN,
                expected: false
            },
            {
                arg: undefined,
                expected: false
            },
            {
                arg: '',
                expected: false
            },
            {
                arg: 'string',
                expected: false
            }
        ];
        possibleInputs.forEach(function (input) {
            it('isNumeric returns ' + input.expected + ' with input of ' + input.arg, function () {
                expect(utils.isNumeric(input.arg)).to.equal(input.expected);
            });
        });
    });

    describe('urlObject method', function () {
        it('Should return decoded information from a url', function () {
            var url = "/scheduled?view=calendar&type=month&date=01-06-2016";
            var parameters = {view: "calendar", type: "month", date: "01-06-2016"};
            expect(utils.urlObject(url)).to.eql(parameters);
        });
    });
    describe('isJson method', function () {
        it('Should return true if not invalid JSON', function () {
            var validJson = '{"json": "should be valid"}';
            expect(utils.isJson(validJson)).to.be.true;
        });
        it('Should return false if invalid JSON', function () {
            var invalidJson = '{json: "should be invalid"}';
            expect(utils.isJson(invalidJson)).to.be.false;
        });
    });
    describe('generateUrl method', function () {
        it('Should return null if no id', function () {
            var article = [{id: null, version: 2, "run-id": 1}];
            var test = utils.generateUrl(article);
            expect(test[0].url).to.be.null;
        });
        it('Should return ID only if no version number', function () {
            var article = [{id: 123, version: null, "run-id": 1}];
            var test = utils.generateUrl(article);
            expect(test[0].url).to.equal('123');
        });
        it('Should return full url if ID and version', function () {
            var article = [{id: 123, version: 1, "run-id": 1}];
            var test = utils.generateUrl(article);
            expect(test[0].url).to.equal('123/1/1');
        });
    });

});