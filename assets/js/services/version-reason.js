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
        data.articleId = null;
        data.articleScheduled = null;
        data.versionReasonText = null;
    }

    {
        // Templates
        data.template = {};
        data.template.versionReasonModal = template['version-reason/article-version-reason-modal'];
        data.template.modalStatus = template['version-reason/article-version-reason-modal-status'];
        data.template.errorMessage = template['error-message'];
        data.template.errorDetail = template['error-detail'];
    }

    //

    /**
     * Initialise the methods for the Detail page
     */
    function init() {
        bindEvents();
        $('body').append(data.template.versionReasonModal());
    }

    /**
     * Bind events
     */
    function bindEvents() {
        $(document).on('hide.bs.modal', reloadPage.bind(this));
        $(document).on('show.bs.modal', setupData.bind(this));
        $(document).on('click', '#version-reason-modal .close', reloadPage.bind(this));
        $(document).on('click', '#version-reason-modal #version-reason-close', reloadPage.bind(this));
        $(document).on('click', '#version-reason-modal #version-reason-action', performAction.bind(this));
        $(document).on('change blur keyup', '.version-reason-field', validateForm.bind(this));
    }

    /**
     * Validate the form
     * @returns {boolean}
     */
    function validateForm() {
        var errors = 0;

        // Check for null fields
        var fields = $('[data-required]', '#version-reason-modal');
        errors += validate.fieldRequired(fields,errors);


        if (errors == 0) {
            $('#version-reason-action', '#version-reason-modal').prop('disabled', false).removeClass('disabled');
            return true;
        } else {
            $('#version-reason-action', '#version-reason-modal').prop('disabled', true).addClass('disabled');
            return false;
        }

    }

    /**
     * Get data from the clicked button
     * @param e
     */
    function setupData(e) {
        console.log($(e.relatedTarget), $(e.relatedTarget).attr('data-article-id'));
        data.articleId = $(e.relatedTarget).attr('data-article-id');
    }

    /**
     * Perform action - in this case submit the reason to the server
     */
    function performAction() {
        console.log('performAction');
        var isValid = avr.validateForm();
        console.log(isValid, data);
        if(isValid && data.articleId !== undefined) {
            
            data.versionReasonText = $('#version-reason-modal #version-reason-text').val();
        

            $('#version-reason-modal #version-reason-action').hide();
            $('#version-reason-modal #version-reason-close').hide();
            submitVersionReason(data, submitVersionReasonSuccess, submitVersionReasonError);
            
        }
    }

    /**
     * Schedule article
     * @param scheduleData
     * @param successCallback
     * @param errorCallback
     * @returns {*}
     */
    function submitVersionReason(data, successCallback, errorCallback) {
        return $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: config.api.version_reason,
            data: JSON.stringify(data),
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
    function submitVersionReasonSuccess(ReturnedData) {
        log.info('Success: ' + config.api.version_reason);
        log.info(ReturnedData);
        log.info(data.scheduleData);
        $('#version-reason-modal .modal-body').html(data.template.modalStatus({
            response: ReturnedData,
            actionType: data.scheduleActionType
        }));
    }

    /**
     * Error callback for publishing an article
     * @param ReturnedData
     */
    function submitVersionReasonError(ReturnedData) {
        log.error(config.errors.en.type.api + ': ' + config.api.version_reason);
        log.info(data.scheduleData);
        log.info(ReturnedData);

        var errorInfo = utils.formatErrorInformation(ReturnedData);
        errorInfo.errorType = null;
        errorInfo.ref = 'scheduleArticlePublicationError';
        errorInfo.type = config.errors.en.type.api;
        $('.modal-body', '#version-reason-modal').empty().html(data.template.errorMessage(errorInfo));
        $('.modal-body', '#version-reason').append(data.template.errorDetail(errorInfo));

    }
    
    /**
     * Split out reload page for easier unit testing
     */
    function reloadPage() {
        window.location.reload(true);
    }
    
    
    var avr =  {
        init: init,
        data: data,
        validateForm: validateForm,
        performAction: performAction,
        reloadPage:reloadPage
    };

    return avr;

};
