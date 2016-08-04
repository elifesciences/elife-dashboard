module.exports = function (name) {

    var $ = require('jquery');
    var _ = require('underscore');
    global.jQuery = $;
    var config = require('./../config.js');
    var utils = require('./utils.js');
    var log = require('loglevel');
    if (!_.isNull(config.logLevel)) {
        log.setLevel(config.logLevel);
    }
    /**
     * Check required fields are completed
     * @param fields
     * @param errors
     * @returns {*}
     */
    function fieldRequired(fields, errors) {
        errors += fields.length;
        _.each(fields, function (field) {
            var $el = $(field);
            var val = $el.val();
            var isValid = (!_.isEmpty(val)) ? true : false;
            if (isValid) {
                errors--;
            }

            validate.validateToggleError($el, isValid);
        });
        return errors;
    }

    /**
     * check each numeric field is numeric
     * @param numericfields
     * @param errors
     * @returns {*}
     */
    function fieldNumeric(numericfields, errors) {
        errors += numericfields.length;
        _.each(numericfields, function (field) {
            var $el = $(field);
            var val = $el.val();
            var isValid = (utils.isNumeric(val) && !_.isNull(val)) ? true : false;
            if (isValid) {
                errors--;
            }

            validate.validateToggleError($el, isValid);
        });
        return errors;
    }

    /**
     * ensure max and min values are adhered to
     * @param maxminfields
     * @param errors
     * @returns {*}
     */
    function fieldMaxMin(maxminfields, errors) {
        errors += maxminfields.length;
        _.each(maxminfields, function (field) {
            var $el = $(field);
            var val = parseInt($el.val());
            var min = parseInt($el.attr('data-actual-min'));
            var max = parseInt($el.attr('data-actual-max'));
            var isValid = (val >= min && val <= max) ? true : false;
            if (isValid) {
                errors--;
            }

            validate.validateToggleError($el, isValid);
        });
        return errors;
    }

    function fieldMaxLenth(maxlengthfields, errors) {
        errors += maxlengthfields.length;
        _.each(maxlengthfields, function (field) {
            var $el = $(field);
            var val = $el.val();
            var valLen = val.length;
            var maxlength = parseInt($el.attr('data-maxlength'));
            var isValid = (valLen <= maxlength) ? true : false;
            if (isValid) {
                errors--;
            }

            validate.validateToggleError($el, isValid);
        });
        return errors;
    }

    /**
     * Toggle the class that indicates an error
     * @param $el
     * @param isValid
     */
    function validateToggleError($el, isValid) {
        if (!!isValid) {
            $el.removeClass('validation-error');
        } else {
            $el.addClass('validation-error');
        }
    }

    var validate = {
        fieldRequired: fieldRequired,
        fieldNumeric: fieldNumeric,
        fieldMaxMin: fieldMaxMin,
        fieldMaxLenth: fieldMaxLenth,
        validateToggleError: validateToggleError
    };
    return validate;

}();
