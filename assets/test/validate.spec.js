var $ = require('jquery');
var validate = require('../js/helpers/validate.js');


//component to be tested
describe('Validate', function () {
    'use strict';

    before(function () {
        // document.body.innerHTML = "";
        this.$fieldRequired = $('<input id="fieldRequired" name="fieldRequired" type="text" data-required/>');
        this.$fieldNumeric = $('<input id="fieldNumeric" name="fieldNumeric" type="text" data-validation="numeric"/>');
        this.$fieldMaxMin = $('<input id="fieldMaxMin" name="fieldMaxMin" type="number" data-min="0" data-actual-min="1" data-max="13" data-actual-max="12">');
        this.$fieldMaxLength = $('<input id="fieldMaxLength" name="fieldMaxLength" type="number" data-maxlength="2">');
    });


    it('validate should exist', function () {
        expect(validate).to.be.a('object');
    });

    describe('validateToggleError', function() {
        it('Should remove class on $el if state is false', function() {
            validate.validateToggleError(this.$fieldRequired, true);
            expect(this.$fieldRequired.hasClass('validation-error')).to.be.false;
        });
        it('Should add class on $el if state is true', function() {
            validate.validateToggleError(this.$fieldRequired, false);
            expect(this.$fieldRequired.hasClass('validation-error')).to.be.true;});
    });

    describe('fieldRequired', function() {
        it('Should return 0 when field not empty and not have class validation-error', function() {
            this.$fieldRequired.val('123');
            var errors = 0;
            errors += validate.fieldRequired(this.$fieldRequired, errors);
            expect(errors).to.equal(0);
            expect(this.$fieldRequired.hasClass('validation-error')).to.be.false;
        });
        it('Should return 1 when field empty and have class validation-error', function() {
            this.$fieldRequired.val('');
            var errors = 0;
            errors += validate.fieldRequired(this.$fieldRequired, errors);
            expect(errors).to.equal(1);
            expect(this.$fieldRequired.hasClass('validation-error')).to.be.true;
        });
    });
    describe('fieldNumeric', function() {
        it('Should return 0 when field numeric and not have class validation-error', function() {
            this.$fieldNumeric.val('123');
            var errors = 0;
            errors += validate.fieldNumeric(this.$fieldNumeric, errors);
            expect(errors).to.equal(0);
            expect(this.$fieldNumeric.hasClass('validation-error')).to.be.false;
        });
        it('Should return 1 when field not numeric and have class validation-error', function() {
            this.$fieldNumeric.val('abc');
            var errors = 0;
            errors += validate.fieldNumeric(this.$fieldNumeric, errors);
            expect(errors).to.equal(1);
            expect(this.$fieldNumeric.hasClass('validation-error')).to.be.true;
        });
    });
    describe('fieldMaxMin', function() {
        it('Should return 0 when value within range and not have class validation-error', function() {
            this.$fieldMaxMin.val('6');
            var errors = 0;
            errors += validate.fieldMaxMin(this.$fieldMaxMin, errors);
            expect(errors).to.equal(0);
            expect(this.$fieldMaxMin.hasClass('validation-error')).to.be.false;
        });
        it('Should return 1 when value not within range and have class validation-error', function() {
            this.$fieldMaxMin.val('14');
            var errors = 0;
            errors += validate.fieldMaxMin(this.$fieldMaxMin, errors);
            expect(errors).to.equal(1);
            expect(this.$fieldMaxMin.hasClass('validation-error')).to.be.true;
        });
    });
    describe('fieldMaxLenth', function() {
        it('Should return 0 when value length within range and not have class validation-error', function() {
            this.$fieldMaxLength.val('6');
            var errors = 0;
            errors += validate.fieldMaxLenth(this.$fieldMaxLength, errors);
            expect(errors).to.equal(0);
            expect(this.$fieldMaxLength.hasClass('validation-error')).to.be.false;
        });
        it('Should return 1 when value length not within range and have class validation-error', function() {
            this.$fieldMaxLength.val('104');
            var errors = 0;
            errors += validate.fieldMaxLenth(this.$fieldMaxLength, errors);
            expect(errors).to.equal(1);
            expect(this.$fieldMaxLength.hasClass('validation-error')).to.be.true;
        });
    });

});

