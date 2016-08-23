module.exports = function () {
    "use strict";
    // Libs
    var $ = require('jquery');
    global.jQuery = $;

    // Libs
    {
        var moment = require('moment');
        var _ = require('underscore');
        $.pickadate = require('./../../libs/pickadate/lib/index.js');
        var config = require('./../config.js');
        var utils = require('./../helpers/utils.js');
        var validate = require('./../helpers/validate.js');
        var log = require('loglevel');
        if (!_.isNull(config.logLevel)) {
            log.setLevel(config.logLevel);
        }
    }

    // Templates
    {
        require('./../helpers/templates-helpers.js');
        var Handlebars = require('handlebars');
        var template = require('./../templates');
        var Swag = require('./../../libs/swag.js');
        Swag.registerHelpers(Handlebars);
    }

    // Variables
    {
        var schedule = {};
        schedule.articleId = null;
        schedule.articleScheduled = null;
        schedule.scheduleData = {};
        schedule.scheduleDate = null;
        schedule.scheduleTime = null;
        schedule.scheduleDateTime = null;
        schedule.scheduleActionType = null;
        schedule.isScheduling = false;
        schedule.isAllScheduled = false;
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

    //

    /**
     * Initialise the methods for the Detail page
     */
    function init() {
        bindEvents();
        $('body').append(schedule.template.scheduleModal());
    }

    /**
     * Bind events
     */
    function bindEvents() {
        $(document).on('click', '#schedule-modal #schedule-action', performSchedule.bind(this));
        $(document).on('click', '#schedule-modal #schedule-cancel-btn', performSchedule.bind(this));
        $(document).on('click', '.schedule-btn, .schedule-amend-btn, .schedule-cancel-btn, .schedule-future', setParameters.bind(this));
        $(document).on('click', '.schedule-btn, .schedule-amend-btn, .schedule-cancel-btn, .schedule-future', initDateTime.bind(this));
        $(document).on('click', '.schedule-cancel-btn', updateModal.bind(this));
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

        $('.datepicker').pickadate({
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
     * Validate the form
     * @returns {boolean}
     */
    function validateForm() {
        setTime();
        var errors = 0;

        // Check for null fields
        var fields = $('[data-required]', '#schedule-modal');
        errors += validate.fieldRequired(fields,errors);

        // check each numeric field is numeric
        var numericfields = $('[data-validation="numeric"]', '#schedule-modal');
        errors += validate.fieldNumeric(numericfields, errors);

        // ensure max and min values are adhered to
        var maxminfields = $('[data-actual-min][data-actual-max]', '#schedule-modal');
        errors += validate.fieldMaxMin(maxminfields, errors);

        // ensure maxlength adhered too
        var maxlengthfields = $('[data-maxlength]', '#schedule-modal');
        errors += validate.fieldMaxLenth(maxlengthfields, errors);

        // check this time isn't in the past
        var $timeEl = $('.timepicker', '#schedule-modal');
        errors++;
        validate.validateToggleError($timeEl, checkScheduledTimeValid());
        if (checkScheduledTimeValid()) {
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

    /**
     *
     * @param $el
     * @returns {boolean}
     */
    function checkScheduledTimeValid() {
        var $elHour = $('.hourpicker', '#schedule-modal');
        var $elMinute = $('.minutepicker', '#schedule-modal');
        var $elDate = $('.datepicker', '#schedule-modal');
        var date = $('.datepicker', '#schedule-modal').val();
        var hour = $elHour.val();
        var minute = $elMinute.val();
        if (_.isEmpty(date) || _.isEmpty(hour) || _.isEmpty(minute)) {
            // no hour minute or date
            return false;
        }
        else if ($elHour.hasClass('validation-error') || $elMinute.hasClass('validation-error') || $elDate.hasClass('validation-error')) {
            // other validation error
            return false;
        }
        else {
            // log.info('current time is after the selected date ' + moment().isAfter(schedule.scheduleDateTime));
            if (moment().isAfter(schedule.scheduleDateTime)) {
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
        setModalTitle($(e.currentTarget));
        var articleId = ($(e.currentTarget).attr('data-article-id')) ? $(e.currentTarget).attr('data-article-id') : false;
        var articleScheduled = ($(e.currentTarget).attr('data-scheduled')) ? $(e.currentTarget).attr('data-scheduled') : false;
        schedule.articleId = articleId;
        schedule.articleScheduled = articleScheduled;
        schedule.scheduleActionType = $(e.currentTarget).attr('data-action-type');

        var data = {actionType: 'schedule', includeArticleId: false};
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
        var articleDoi = $('.schedule-cancel-btn[data-article-id="' + schedule.articleId + '"]').attr('data-article-doi');
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
        schedule.scheduleData = {};
        schedule.scheduleDate = null;
        schedule.scheduleTime = null;
        schedule.scheduleDateTime = null;
    }

    /**
     * Schedule article
     * @param scheduleData
     * @param successCallback
     * @param errorCallback
     * @returns {*}
     */
    function scheduleArticlePublication(scheduleData, successCallback, errorCallback) {
        return $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: config.api.schedule_article_publication,
            data: JSON.stringify(scheduleData),
            success: function (data) {
                successCallback(data);
            },
            error: function (data) {
                errorCallback(data);
            }
        });
    }

    /**
     * Success callback for publishing article
     * @param data
     */
    function scheduleArticlePublicationSuccess(data) {
        log.info('Success: ' + config.api.schedule_article_publication);
        log.info(data);
        log.info(schedule.scheduleData);
        $('#schedule-modal .modal-body').html(schedule.template.modalStatus({
            response: data,
            actionType: schedule.scheduleActionType
        }));
        $('#schedule-close', '#schedule-modal').text('Close');
        schedule.isScheduling = false;
        schedule.isAllScheduled = true;
    }

    /**
     * Error callback for publishing an article
     * @param data
     */
    function scheduleArticlePublicationError(data) {
        log.error(config.errors.en.type.api + ': ' + config.api.schedule_article_publication);
        log.info(schedule.scheduleData);
        log.info(data);

        var errorInfo = utils.formatErrorInformation(data);
        errorInfo.errorType = null;
        errorInfo.ref = 'scheduleArticlePublicationError';
        errorInfo.type = config.errors.en.type.api;
        $('.modal-body', '#schedule-modal').empty().html(schedule.template.errorMessage(errorInfo));
        $('.modal-body', '#schedule-modal').append(schedule.template.errorDetail(errorInfo));

        $('#schedule-close', '#schedule-modal').text('Close');
        schedule.isScheduling = false;
        schedule.isAllScheduled = true;
    }

    /**
     * Schedule the article using the service
     */
    function performSchedule() {
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
                schedule.scheduleData = {
                    article: {
                        'article-identifier': schedule.articleId,
                        scheduled: moment(schedule.scheduleDateTime).format('X')
                    },
                };
            } else {
                schedule.scheduleData = {article: {'article-identifier': schedule.articleId, scheduled: false}};
            }


            // log.info(schedule.scheduleData);
            $('#schedule-modal #schedule-action').hide();
            $('#schedule-modal #schedule-cancel-btn').hide();
            scheduleArticlePublication(schedule.scheduleData, scheduleArticlePublicationSuccess, scheduleArticlePublicationError);
        }

    }

    /**
     * refresh page when
     * user closes modal and scheduling is not taking place.
     */
    function refreshPage() {
        // we're on the scheduled page and there is a scheduled date (ie not cancellation)
        // and calendar view is active and the scheduledDateTime is not on the calendar
        // force calendar to go to the new scheduled date
        if ($('.scheduled-page').length > 0 && schedule.scheduleDateTime && $('.scheduled-page').hasClass('calendar-view') &&  !(moment(schedule.scheduleDateTime).isAfter($('#schedule-calendar').fullCalendar('getView').start) && moment(schedule.scheduleDateTime).isBefore($('#schedule-calendar').fullCalendar('getView').end))) {
            $('#schedule-calendar').fullCalendar('render'); // render then go to the date incase its in the current month
            $('#schedule-calendar').fullCalendar('gotoDate', schedule.scheduleDateTime);
        } else {
            sch.resetParameters();
            if (schedule.isScheduling === false && schedule.isAllScheduled === true) {
                sch.reloadPage();
            }
        }
    }

    /**
     * Split out reload page for easier unit testing
     */
    function reloadPage() {
        window.location.reload(true);
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
        if (valLength <= 9 && valInt <= 9 && valInt >= 0) {
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
        if (val === max) {
            $el.val(actualmin);
        }
        if (val === min) {
            $el.val(actualmax);
        }
    }

    var sch =  {
        init: init,
        performSchedule: performSchedule,
        setParameters: setParameters,
        initDateTime: initDateTime,
        refreshPage: refreshPage,
        reloadPage: reloadPage,
        updateModal: updateModal,
        schedule: schedule,
        resetParameters: resetParameters,
        validateForm: validateForm,
        checkScheduledTimeValid: checkScheduledTimeValid,
        scheduleArticlePublication: scheduleArticlePublication,
        scheduleArticlePublicationSuccess: scheduleArticlePublicationSuccess,
        scheduleArticlePublicationError: scheduleArticlePublicationError
    };

    return sch;

}();
