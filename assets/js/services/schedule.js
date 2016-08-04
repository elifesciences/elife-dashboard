module.exports = function (name) {
    "use strict";
    // Libs
    var $ = require('jquery');
    global.jQuery = $;

    if ($('.current-page').length > 0 || $('.detail-page').length > 0 || $('.scheduled-page').length > 0) {
        // Libs
        {
            var moment = require('moment');
            var _ = require('underscore');
            $.pickadate = require('pickadate');
            var config = require('config');
            var utils = require('utils');
            var log = require('loglevel');
            if(!_.isNull(config.logLevel)) { log.setLevel(config.logLevel); }
        }

        // Templates
        {
            require('./../helpers/templates-helpers.js');
            var Handlebars = require('Handlebars');
            var template = require('./../templates');
            var Swag = require('swag');
            Swag.registerHelpers(Handlebars);
        }

        // App
        {
            var app = require('config');
            var utils = require('utils');
            var publish = require('publish');
        }

        // Variables
        {
            var schedule = {};
            schedule.articleId = null;
            schedule.articleScheduled = null;
            schedule.scheduleDate = null;
            schedule.scheduleTime = null;
            schedule.scheduleDateTime = null;
            schedule.scheduleActionType = null;
        }

        {
            // Templates
            schedule.template = {};
            schedule.template.scheduleModal = template['schedule/article-schedule-modal'];
            schedule.template.modalBody = template['schedule/article-schedule-modal-body'];
            schedule.template.modalFooter = template['schedule/article-schedule-modal-footer'];
            schedule.template.modalStatus = template['schedule/article-schedule-modal-status'];
            schedule.template.errorMessage = template['error-message'];
            schedule.template.errorDetail = template['error-detail'];
        }
    }


    //



    /**
     * Initialise the methods for the Detail page
     */
    function init() {
        if ($('.current-page').length > 0 || $('.detail-page').length > 0 || $('.scheduled-page').length > 0) {
            bindEvents();
            $('body').append(schedule.template.scheduleModal());
        }
    }

    /**
     * Bind events
     */
    function bindEvents() {
        $(document).on('click', '#schedule-modal #schedule-action', performSchedule.bind(this));
        $(document).on('click', '#schedule-modal #schedule-cancel', performSchedule.bind(this));
        $(document).on('show.bs.modal', setParameters.bind(this));
        $(document).on('show.bs.modal', initDateTime.bind(this));
        $(document).on('show.bs.modal', updateModal.bind(this));
        // $(document).on('hide.bs.modal', resetParameters.bind(this));
        $(document).on('click', '#schedule-modal .close', refreshPage.bind(this));
        $(document).on('click', '#schedule-modal #schedule-close', refreshPage.bind(this));
        $(document).on('change mousewheel input', '.hourpicker, .minutepicker', loopPicker.bind(this));
        $(document).on('change', '.hourpicker, .minutepicker', padInput.bind(this));
        $(document).on('change blur keyup', '.schedule-field', validateForm.bind(this));
    }

    /**
     * When the modal is loaded enable the date and time pickers.
     */
    function initDateTime() {
        // $('#schedule-action').prop('disabled', true).addClass('disabled');
        var yesterday = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24);

        function datePickerOnStart() {
            var day = moment.unix(schedule.articleScheduled).format('DD');
            var month = moment.unix(schedule.articleScheduled).format('MM');
            var year = moment.unix(schedule.articleScheduled).format('YYYY');
            month--; //only month for dates are zero indexed
            if (schedule.articleScheduled) {
                this.set('select', new Date(year, month, day));
            }
        }
        function datePickerOnSet(context) {
            var selectedDate = context.select;
            if (!utils.isNumeric(context.select)) {
                selectedDate = moment(selectedDate).format('x');
            }

            selectedDate = parseInt(selectedDate);
            schedule.scheduleDate = selectedDate;
            validateForm();
        }

        var $datePicker = $('.datepicker').pickadate({
            // disable: [
            //   {from: [0, 0, 0], to: yesterday},
            // ],
            format: 'mmmm d, yyyy',
            formatSubmit: 'dd/mm/yyyy',
            onStart: datePickerOnStart,
            onSet: datePickerOnSet
        });

        // if we're rescheduling we will have an existing time date
        if (schedule.articleScheduled) {
            var hour = moment.unix(schedule.articleScheduled).format('hh');
            var minute = moment.unix(schedule.articleScheduled).format('mm');
            var ampm = moment.unix(schedule.articleScheduled).format('a');
            $('#schedule_hour_submit', '#schedule-modal').val(hour);
            $('#schedule_minute_submit', '#schedule-modal').val(minute);
            $('#schedule_ampm_submit', '#schedule-modal').val(ampm);
        }

    }

    /**
     * Toggle the class that indicates an error
     * @param $el
     * @param state
     */
    function validateToggleError($el, state) {
        if (state === true) {
            $el.removeClass('validation-error');
        } else {
            $el.addClass('validation-error');
        }
    }

    /**
     * Validate the form
     * @returns {boolean}
     */
    function validateForm() {
        setTime();
        var errors = 0;

        // Check for null fields
        var fields = $('#schedule-modal .schedule-field');
        errors = fields.length;
        _.each(fields, function(field) {
            var $el = $(field);
            var val = $el.val();
            var isValid = (!_.isEmpty(val)) ? true : false;
            if (isValid) {
                errors--;
            }

            validateToggleError($el, isValid);
        });

        // check each numeric field is numeric
        var numericfields = $('[data-validation="numeric"]', '#schedule-modal');
        errors += numericfields.length;
        _.each(numericfields, function(field) {
            var $el = $(field);
            var val = $el.val();
            var isValid = (utils.isNumeric(val) && !_.isNull(val)) ? true : false;
            if (isValid) {
                errors--;
            }

            validateToggleError($el, isValid);
        });


        // ensure max and min values are adhered to
        var maxminfields = $('[data-actual-min][data-actual-max]', '#schedule-modal');
        errors += maxminfields.length;
        _.each(maxminfields, function(field) {
            var $el = $(field);
            var val = parseInt($el.val());
            var min = parseInt($el.attr('data-actual-min'));
            var max = parseInt($el.attr('data-actual-max'));
            var isValid = (val >= min && val <= max) ? true : false;
            if (isValid) {
                errors--;
            }

            validateToggleError($el, isValid);
        });

        // ensure maxlength adhered too
        var maxlengthfields = $('[data-maxlength]', '#schedule-modal');
        errors += maxlengthfields.length;
        _.each(maxlengthfields, function(field) {
            var $el = $(field);
            var val = $el.val();
            var valLen = val.length;
            var maxlength = parseInt($el.attr('data-maxlength'));
            var isValid = (valLen <= maxlength) ? true : false;
            if (isValid) {
                errors--;
            }

            validateToggleError($el, isValid);
        });

        // check this time isn't in the past
        var $timeEl = $('.timepicker', '#schedule-modal');
        errors ++;
        validateToggleError($timeEl, checkScheduledTimeValid($timeEl));
        if(checkScheduledTimeValid($timeEl)) {
            errors--;
        }

        if (errors == 0) {
            $('#schedule-action', '#schedule-modal').prop('disabled', false).removeClass('disabled');
            return true;
        } else {
            $('#schedule-action', '#schedule-modal').prop('disabled', true).addClass('disabled');
            return false;
        }

    }

    function checkScheduledTimeValid($el) {
        var $elHour = $('.hourpicker', '#schedule-modal');
        var $elMinute = $('.minutepicker', '#schedule-modal');
        var date = $('.datepicker', '#schedule-modal').val();
        var hour = $elHour.val();
        var minute = $elMinute.val();
        if (_.isEmpty(date) || _.isEmpty(hour) || _.isEmpty(minute)) {
            // no hour minute or date
            return false;
        }
        else if($elHour.hasClass('validation-error') || $elMinute.hasClass('validation-error')) {
            // other validation error
            return false;
        }
        else {
            // log.info('current time is after the selected date ' + moment().isAfter(schedule.scheduleDateTime));
            if(moment().isAfter(schedule.scheduleDateTime)) {
                // selected time is before now
                return false
            }
            return true;
        }
    }

    /**
     * set the time when time is entered
     */
    function setTime() {

        var hours = $('input[name="schedule_hour_submit"]').val();
        var minutes = $('input[name="schedule_minute_submit"]').val();
        if (!_.isEmpty(hours) && !_.isEmpty(minutes)) {
            schedule.scheduleTime = $('input[name="schedule_hour_submit"]').val() + ':' + $('input[name="schedule_minute_submit"]').val() + ' ' + $('select[name="schedule_ampm_submit"] option:selected').val();
        }


        if (!_.isNull(schedule.scheduleDate) && !_.isNull(schedule.scheduleTime)) {
            var date = moment(schedule.scheduleDate).format('DD-MM-YYYY');
            var datetime = date + ' ' + schedule.scheduleTime;
            schedule.scheduleDateTime = moment(datetime, 'DD-MM-YYYY hh:mm a');
        }

    }

    /**
     * Set the parameters for the article scheduling.
     * @param e
     */
    function setParameters(e) {
        setModalTitle($(e.relatedTarget));
        var articleId = $(e.relatedTarget).attr('data-article-id');
        var articleScheduled = ($(e.relatedTarget).attr('data-scheduled')) ? $(e.relatedTarget).attr('data-scheduled') : false;
        var data = {actionType: 'schedule', includeArticleId: false};
        schedule.articleId = articleId;
        schedule.articleScheduled = articleScheduled;
        schedule.scheduleActionType = $(e.relatedTarget).attr('id');
        if (schedule.scheduleActionType === 'schedule-cancel') {
            data.actionType = 'cancel';
        } else if (schedule.scheduleActionType === 'schedule-amend' || schedule.scheduleActionType === 'schedule' || schedule.scheduleActionType === 'future-schedule') {
            data.actionType = 'schedule';
        }

        if (schedule.scheduleActionType === 'future-schedule') {
            data.showArticleIdField = true;
        }

        $('#schedule-modal .modal-body').html(schedule.template.modalBody(data));
        $('#schedule-modal .modal-footer').html(schedule.template.modalFooter(data));

    }

    /**
     * Display additional information in the modal
     * @param e
     */
    function updateModal(e) {
        var articleDoi = $('#article-' + schedule.articleId + ' .article-doi').text();
        $('.article-cancel-info', '#schedule-modal').html(articleDoi);
        validateForm();
    }

    /**
     * if custom data provided amend title
     */
    function setModalTitle($target) {
        var title = $target.attr('data-title');
        if (!_.isUndefined(title)) {
            $('.modal-title', '#schedule-modal').html(title);
        }
    }

    /**
     * reset parameters on modal close
     */
    function resetParameters() {
        schedule.scheduleDate = null;
        schedule.scheduleTime = null;
        schedule.scheduleDateTime = null;
    }
    /**
     * Schedule the article using the service
     */
    function performSchedule() {
        var scheduleData = {};
        if (schedule.scheduleActionType !== 'schedule-cancel') {
            var formValid = validateForm();
        } else {
            var formValid = true;
        }

        if (formValid) {
            config.isScheduling = true;
            if (schedule.scheduleActionType === 'future-schedule') {
                schedule.articleId = $('#schedule-id', '#schedule-modal').val();
            }

            if (schedule.scheduleActionType !== 'schedule-cancel') {
                scheduleData = {
                    article: {
                        'article-identifier': schedule.articleId,
                        scheduled: moment(schedule.scheduleDateTime).format('X')
                    },
                };
            } else {
                scheduleData = {article: {'article-identifier': schedule.articleId, scheduled: false}};
            }

            // log.info(scheduleData);
            $('#schedule-modal #schedule-action').hide();
            $('#schedule-modal #schedule-cancel').hide();
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: config.api.schedule_article_publication,
                data: JSON.stringify(scheduleData),
                success: function(data) {
                    log.info('Success: ' + config.api.schedule_article_publication);
                    log.info(data);
                    log.info(scheduleData);
                    $('#schedule-modal .modal-body').html(schedule.template.modalStatus({response: data, actionType: schedule.scheduleActionType}));
                    $('#schedule-close', '#schedule-modal').text('Close');
                    config.isScheduling = false;
                    config.isAllScheduled = true;
                },

                error: function(data) {
                    log.error(config.errors.en.type.api + ': ' + config.api.schedule_article_publication);
                    log.info(scheduleData);
                    log.info(data);

                    var errorInfo = utils.formatErrorInformation(data);
                    errorInfo.errorType = null;
                    errorInfo.ref = 'scheduleArticlePublicationError';
                    errorInfo.type = config.errors.en.type.api;
                    $('.modal-body', '#schedule-modal').empty().html(schedule.template.errorMessage(errorInfo));
                    $('.modal-body', '#schedule-modal').append(schedule.template.errorDetail(errorInfo));

                    $('#schedule-close', '#schedule-modal').text('Close');
                    config.isScheduling = false;
                    config.isAllScheduled = true;
                },
            });
        }

    }

    /**
     * refresh page when
     * user closes modal and scheduling is not takign place.
     */
    function refreshPage() {
        // we're on the scheduled page and there is a scheduled date (ie not cancellation) and calendar view is active ans the scheduleddatetime is not on the calendar
        if ($('.scheduled-page').length > 0 && schedule.scheduleDateTime && $('.scheduled-page').hasClass('calendar-view') && !(moment(schedule.scheduleDateTime).isAfter($('#schedule-calendar').fullCalendar('getView').start) && moment(schedule.scheduleDateTime).isBefore($('#schedule-calendar').fullCalendar('getView').end))) {
            $('#schedule-calendar').fullCalendar('render'); // render then go to the date incase its in the current month
            $('#schedule-calendar').fullCalendar('gotoDate', schedule.scheduleDateTime);
        } else {
            resetParameters();
            if (config.isScheduling === false && config.isAllScheduled === true) {
                location.reload(true);
            }
        }
    }

    /**
     * Zero Pad the value
     * @param e
     */
    function padInput(e) {
        var $el = $(e.currentTarget);
        var val = $el.val();
        var valLength = val.length;
        var valInt = parseInt($el.val());
        if(valLength <= 9 && valInt <= 9 && valInt >= 0) {
            var newVal = utils.padDigits(val, 2);
            $el.val(newVal)
        }
    }

    /**
     * Loop the number inputs. When adding hour, minutes, clicking up when you're on 12 will go straight to 1 and 59 to 0
     * @param e
     */
    function loopPicker(e) {
        var $el = $(e.currentTarget);
        var val = $el.val();
        var min = $el.attr('data-min');
        var max = $el.attr('data-max');
        var actualmin = $el.attr('data-actual-min');
        var actualmax = $el.attr('data-actual-max');
        if(val === max) {
            $el.val(actualmin);
        }
        if(val === min) {
            $el.val(actualmax);
        }
    }


    return {
        init: init
    }


}();
