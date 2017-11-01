module.exports = function (config) {
    "use strict";
    // Libs
    var $ = require('jquery');
    global.jQuery = $;

    // Libs
    {
        var moment = require('moment');
        var _ = require('underscore');
        $.pickadate = require('./../../libs/pickadate/lib/index.js');
        var utils = require('./../helpers/utils.js');
        var validate = require('./../helpers/validate.js')(config);
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
        var data = {};
        data.article = [];
        data.articleId = null;
        data.articleScheduled = null;
        data.articleExpectedPublicationDate = null;
        data.scheduleData = {};
        data.scheduleDate = null;
        data.scheduleTime = null;
        data.scheduleDateTime = null;
        data.scheduleActionType = null;
        data.isScheduling = false;
        data.isAllScheduled = false;
        data.queryParams = {};
    }

    {
        // Templates
        data.template = {};
        data.template.scheduleModal = template['schedule/article-schedule-modal'];
        data.template.modalBody = template['schedule/article-schedule-modal-body'];
        data.template.modalFooter = template['schedule/article-schedule-modal-footer'];
        data.template.modalStatus = template['schedule/article-schedule-modal-status'];
        data.template.errorMessage = template['error-message'];
        data.template.errorDetail = template['error-detail'];
    }

    //

    /**
     * Initialise the methods for the Detail page
     */
    function init() {
        bindEvents();
        $('body').append(data.template.scheduleModal());
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
        $(document).on('click', '#schedule-modal #find-article-action', getArticle.bind(this));
    }

    /**
     * When the modal is loaded enable the date and time pickers.
     */
    function initDateTime() {
        var yesterday = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24);

        var exemptDate = checkForExpectedPublicationDate();

        var datePickerInit = {
            format: 'mmmm d, yyyy',
            formatSubmit: 'dd/mm/yyyy',
            onStart: datePickerOnStart,
            onSet: datePickerOnSet
        };


        function datePickerOnStart() {
            var day = moment.unix(data.articleScheduled).format('DD');
            var month = moment.unix(data.articleScheduled).format('MM');
            var year = moment.unix(data.articleScheduled).format('YYYY');
            month--; //only month for dates are zero indexed
            if (data.articleScheduled) {
                this.set('select', new Date(year, month, day));
            }


            if (exemptDate) {
                this.set('select', exemptDate);
            }
        }

        function datePickerOnSet(context) {
            var selectedDate = context.select;
            if (!utils.isNumeric(context.select)) {
                selectedDate = moment(selectedDate).format('x');
            }

            selectedDate = parseInt(selectedDate);
            data.scheduleDate = selectedDate;
            validateForm();
        }

        if (exemptDate) {
            datePickerInit["disable"] = [
                true,
                exemptDate
            ];
        }


        data.datepicker = $('.datepicker').pickadate(datePickerInit);

        // if we're rescheduling we will have an existing time date
        if (data.articleScheduled) {
            var hour = moment.unix(data.articleScheduled).format('hh');
            var minute = moment.unix(data.articleScheduled).format('mm');
            var ampm = moment.unix(data.articleScheduled).format('a');
            $('#schedule_hour_submit', '#schedule-modal').val(hour);
            $('#schedule_minute_submit', '#schedule-modal').val(minute);
            $('#schedule_ampm_submit', '#schedule-modal').val(ampm);
        }

    }

    /**
     * Check for expected publication date
     * @returns {[boolean,null]}
     */
    function checkForExpectedPublicationDate() {
        if (data.articleExpectedPublicationDate > 0) {
            var exemptDay = moment.unix(data.articleExpectedPublicationDate).format('DD');
            var exemptMonth = moment.unix(data.articleExpectedPublicationDate).format('MM');
            var exemptYear = moment.unix(data.articleExpectedPublicationDate).format('YYYY');
            exemptMonth--; //only month for dates are zero indexed
            var exemptDate = new Date(exemptYear, exemptMonth, exemptDay);
            return exemptDate;
        }
        return false;
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
        errors += validate.fieldRequired(fields, errors);
        
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
            // log.info('current time is after the selected date ' + moment().isAfter(data.scheduleDateTime));
            if (moment().isAfter(data.scheduleDateTime)) {
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
            data.scheduleTime = $('input[name="schedule_hour_submit"]').val() + ':' + $('input[name="schedule_minute_submit"]').val() + ' ' + $('select[name="schedule_ampm_submit"] option:selected').val();
        }

        if (!_.isNull(data.scheduleDate) && !_.isNull(data.scheduleTime)) {
            var date = moment(data.scheduleDate).format('DD-MM-YYYY');
            var datetime = date + ' ' + data.scheduleTime;
            data.scheduleDateTime = moment(datetime, 'DD-MM-YYYY hh:mm a');
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
        var articleExpectedPublicationDate = ($(e.currentTarget).attr('data-expected-publication-date')) ? $(e.currentTarget).attr('data-expected-publication-date') : false;
        data.articleId = articleId;
        data.articleScheduled = articleScheduled;
        data.articleExpectedPublicationDate = articleExpectedPublicationDate;
        data.scheduleActionType = $(e.currentTarget).attr('data-action-type');

        var action = {actionType: 'schedule', includeArticleId: false};
        if (data.scheduleActionType === 'schedule-cancel') {
            action.actionType = 'cancel';
        } else if (data.scheduleActionType === 'schedule-amend' || data.scheduleActionType === 'schedule' || data.scheduleActionType === 'future-schedule') {
            action.actionType = 'schedule';
        }

        action.showScheduleDatepicker = true;
        if (data.scheduleActionType === 'future-schedule') {
            action.showArticleIdField = true;
            action.showScheduleDatepicker = false;
        }

        $('#schedule-modal .modal-body').html(data.template.modalBody(action));
        $('#schedule-modal .modal-footer').html(data.template.modalFooter(action));

        if (!action.showScheduleDatepicker) {
            $('#schedule-modal .schedule-modal-datepicker').hide();
        }

    }

    /**
     * Display additional information in the modal
     * @param e
     */
    function updateModal(e) {
        var articleDoi = $('.schedule-cancel-btn[data-article-id="' + data.articleId + '"]').attr('data-article-doi');
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
        data.scheduleData = {};
        data.scheduleDate = null;
        data.scheduleTime = null;
        data.scheduleDateTime = null;
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
            success: function (ReturnedData) {
                successCallback(ReturnedData);
            },
            error: function (ReturnedData) {
                errorCallback(ReturnedData);
            }
        });
    }

    /**
     * Success callback for publishing article
     * @param ReturnedData
     */
    function scheduleArticlePublicationSuccess(ReturnedData) {
        log.info('Success: ' + config.api.schedule_article_publication);
        log.info(ReturnedData);
        log.info(data.scheduleData);
        $('#schedule-modal .modal-body').html(data.template.modalStatus({
            response: ReturnedData,
            actionType: data.scheduleActionType
        }));
        $('#schedule-close', '#schedule-modal').text('Close');
        data.isScheduling = false;
        data.isAllScheduled = true;
    }

    /**
     * Error callback for publishing an article
     * @param ReturnedData
     */
    function scheduleArticlePublicationError(ReturnedData) {
        log.error(config.errors.en.type.api + ': ' + config.api.schedule_article_publication);
        log.info(data.scheduleData);
        log.info(ReturnedData);

        var errorInfo = utils.formatErrorInformation(ReturnedData);
        errorInfo.errorType = null;
        errorInfo.ref = 'scheduleArticlePublicationError';
        errorInfo.type = config.errors.en.type.api;
        $('.modal-body', '#schedule-modal').empty().html(data.template.errorMessage(errorInfo));
        $('.modal-body', '#schedule-modal').append(data.template.errorDetail(errorInfo));

        $('#schedule-close', '#schedule-modal').text('Close');
        data.isScheduling = false;
        data.isAllScheduled = true;
    }

    /**
     * Schedule the article using the service
     */
    function performSchedule() {
        if (data.scheduleActionType !== 'schedule-cancel') {
            var formValid = validateForm();
        } else {
            var formValid = true;
        }

        if (formValid) {
            config.isScheduling = true;
            if (data.scheduleActionType === 'future-schedule') {
                data.articleId = $('#schedule-id', '#schedule-modal').val();
            }

            if (data.scheduleActionType !== 'schedule-cancel') {
                data.scheduleData = {
                    article: {
                        'article-identifier': data.articleId,
                        scheduled: moment(data.scheduleDateTime).format('X')
                    },
                };
            } else {
                data.scheduleData = {article: {'article-identifier': data.articleId, scheduled: false}};
            }


            // log.info(data.scheduleData);
            $('#schedule-modal #schedule-action').hide();
            $('#schedule-modal #schedule-cancel-btn').hide();
            scheduleArticlePublication(data.scheduleData, scheduleArticlePublicationSuccess, scheduleArticlePublicationError);
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
        if ($('.scheduled-page').length > 0 && data.scheduleDateTime && $('.scheduled-page').hasClass('calendar-view') && !(moment(data.scheduleDateTime).isAfter($('#schedule-calendar').fullCalendar('getView').start) && moment(data.scheduleDateTime).isBefore($('#schedule-calendar').fullCalendar('getView').end))) {
            $('#schedule-calendar').fullCalendar('render'); // render then go to the date incase its in the current month
            $('#schedule-calendar').fullCalendar('gotoDate', data.scheduleDateTime);
        } else {
            sch.resetParameters();
            if (data.isScheduling === false && data.isAllScheduled === true) {
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


    /**
     * Get article
     */
    function getArticle() {
        data.queryParams.articleId = $('#schedule-id', '#schedule-modal').val();
        if (data.queryParams.articleId) {
            sch.fetchArticle(sch.getArticleSuccess, sch.getArticleError);
        }
    }

    /**
     * Fetch article information
     *
     * @param successCallback
     * @param errorCallback
     * @returns {*}
     */
    function fetchArticle(successCallback, errorCallback) {
        return $.ajax({
            url: config.api.article + '/' + data.queryParams.articleId,
            cache: false,
            dataType: 'json',
            success: function (returnedData) {
                successCallback(returnedData);
            },
            error: function (returnedData) {
                errorCallback(returnedData);
            }
        });
    }


    /**
     * Success callback for fetching article information
     * @param data
     */
    function getArticleSuccess(returnedData) {
        data.article = returnedData;
        sch.setLatestArticle();
        data.currentArticle = getCurrentArticle();
        data.currentEvents = getCurrentRun();
        if (data.currentArticle["expected-publication-date"] > 0) {
            data.articleExpectedPublicationDate = data.currentArticle["expected-publication-date"];
        }
        var picker = data.datepicker.pickadate('picker');
        var exemptDate = checkForExpectedPublicationDate();
        picker.set('disable', true);
        picker.set('disable', [
            true,
            exemptDate
        ]);
        picker.set('select', exemptDate);
        $('#schedule-modal .schedule-modal-datepicker').show();
    }

    /**
     * Error callback for fetching article information
     *
     * @param data
     */
    function getArticleError(returnedData) {
        log.error(config.errors.en.type.api + ': ' + config.api.article + '/' + data.queryParams.articleId);
        log.info(returnedData);
        var errorInfo = utils.formatErrorInformation(returnedData);
        errorInfo.errorType = null;
        errorInfo.ref = 'getArticleError';
        errorInfo.type = config.errors.en.type.api;
        $('#article').empty().html(data.template.errorMessage(errorInfo));
        $('#error-console').empty().html(data.template.errorDetail(errorInfo));
    }

    /**
     * Set latest article
     */
    function setLatestArticle() {
        if (!data.queryParams.versionNumber) {
            data.queryParams.versionNumber = utils.findLastKey(data.article.versions);
        }

        if (!data.queryParams.runId) {
            if (_.has(data.article.versions, data.queryParams.versionNumber)) {
                var lastKey = utils.findLastKey(data.article.versions[data.queryParams.versionNumber].runs);
                var runId = data.article.versions[data.queryParams.versionNumber].runs[lastKey]['run-id'];
                data.queryParams.runId = runId;
            } else {
                data.queryParams.runId = null;
            }
        }

    }


    /**
     * Find the current article from stored data
     * @returns {*}
     */
    function getCurrentArticle() {
        if (_.has(data.article.versions, data.queryParams.versionNumber)) {
            return data.article.versions[data.queryParams.versionNumber].details;
        } else {
            data.errors = {
                status: config.errors.en.type.application,
                statusText: config.errors.en.incorrectInformation,
                message: config.errors.en.noVersions + ' (' + data.queryParams.versionNumber + ')'
            };
            return false;
        }
    }

    /**
     * Find the current list of events from stored data
     * @returns {*}
     */
    function getCurrentRun() {
        if (_.has(data.article.versions, data.queryParams.versionNumber) && _.findWhere(data.article.versions[data.queryParams.versionNumber].runs, {'run-id': data.queryParams.runId})) {
            return _.findWhere(data.article.versions[data.queryParams.versionNumber].runs, {'run-id': data.queryParams.runId});
        } else {
            data.errors = {
                status: config.errors.en.type.application,
                statusText: config.errors.en.incorrectInformation,
                message: config.errors.en.noRuns + ' (' + data.queryParams.runId + ')'
            };
            return false;
        }
    }

    var sch = {
        init: init,
        performSchedule: performSchedule,
        setParameters: setParameters,
        initDateTime: initDateTime,
        refreshPage: refreshPage,
        reloadPage: reloadPage,
        updateModal: updateModal,
        data: data,
        resetParameters: resetParameters,
        validateForm: validateForm,
        checkScheduledTimeValid: checkScheduledTimeValid,
        scheduleArticlePublication: scheduleArticlePublication,
        scheduleArticlePublicationSuccess: scheduleArticlePublicationSuccess,
        scheduleArticlePublicationError: scheduleArticlePublicationError,
        getArticle: getArticle,
        fetchArticle: fetchArticle,
        getArticleSuccess: getArticleSuccess,
        getArticleError: getArticleError,
        setLatestArticle: setLatestArticle
    };

    return sch;

};
