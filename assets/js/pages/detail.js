module.exports = function (name) {
    "use strict";
    // Libs
    var $ = require('jquery');
    global.jQuery = $;

    if ($('.detail-page').length > 0) {
        // Libs
        {
            var _ = require('underscore');
            var moment = require('moment');
            require('history');
            $.pickadate = require('pickadate');
            var bootstrap = require('bootstrap-sass');
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
            var config = require('config');
            var utils = require('utils');
            var publish = require('publish');
            var log = require('loglevel');
            if(!_.isNull(config.logLevel)) { log.setLevel(config.logLevel); }
        }

        // Variables
        {
            var detail = {};
            detail.article = [];
            detail.errors = [];
            detail.detailEvents = [];
            detail.detailArticle = [];
            detail.scheduleStatus = [];
            detail.queryParams = {};
            detail.extraUrl = 'patterns/04-pages-01-detail/04-pages-01-detail.html?/';
        }

        {
            // Templates
            detail.template = {};
            detail.template.loadingTemplate = template['loading-template'];
            detail.template.errorMessage = template['error-message'];
            detail.template.errorDetail = template['error-detail'];
            detail.template.buttonsScheduleTemplate = template['detail/buttons-schedule'];
            detail.template.buttonsReScheduleTemplate = template['detail/buttons-reschedule'];
            detail.template.buttonsPublishTemplate = template['detail/buttons-publish'];
            detail.template.articlesScheduledForTemplate = template['detail/article-scheduled-for'];
            detail.template.articleTemplate = template['detail/article'];

        }
    }

    //


    /**
     * Initialise the methods for the Detail page
     */
    function init() {
        if ($('.detail-page').length > 0) {
            renderLoader();
            setArticleParams();
            getArticle();
            bindEvents();
        }
    }

    function renderLoader() {
        $('#article').empty().html(detail.template.loadingTemplate());
    }

    /**
     * Generate page url
     * if url is /articleid/version/run do nothing
     * if url is /articleid/version find latest run and update the url
     * if url is /articleid find latest version and then the latest run and update the url
     * @returns {string}
     */
    function updatePageUrl() {
        setLatestArticle();

        var articleId;
        var versionNumber;
        var runId;
        var url;
        var state = History.getState();
        var hash = state.hash;
        if (config.ISPP) {
            hash = hash.replace(detail.extraUrl, '');
        }

        url = hash;
        hash = hash.split('/');
        hash = _.compact(hash);
        articleId = (!_.isEmpty(hash[1])) ? hash[1] : null;
        versionNumber = (!_.isEmpty(hash[2])) ? hash[2] : null;
        runId = (!_.isEmpty(hash[3])) ? hash[3] : null;

        url = (url.slice(-1) === '/') ? url.slice(0, -1) : url;

        if (_.isNull(versionNumber) && _.isNull(runId)) {
            url += '/' + detail.queryParams.versionNumber + '/' + detail.queryParams.runId;
        }

        if (!_.isNull(versionNumber) && _.isNull(runId)) {
            url += '/' + detail.queryParams.runId;
        }

        if (config.ISPP) {
            url = '/' + detail.extraUrl.slice(0, -1) + url;
        }

        History.replaceState(null, null, url);
        // History.pushState(null, null, url);
    }

    /**
     * Bind events
     */
    function bindEvents() {
        $('#article', '.detail-page').on('click', '.version-run-nav-list .run-container .run a', updateRun.bind(this));
        $('#article', '.detail-page').on('click', '.btn-publish', detailPublish.bind(this));
        $('#article').on('click', '.run-container li a', bindNavigationEvents.bind(this));
        $(window).on('statechange', stateChange.bind(this));
    }

    /**
     * On back/forwards update the article
     * @param e
     */
    function stateChange(e) {
        setArticleParams();
        getArticle();
    }

    /**
     * Bind navigation events
     */
    function bindNavigationEvents(e) {
        e.preventDefault();
        var version = $(e.currentTarget).attr('data-version');
        var run = $(e.currentTarget).attr('data-run');
        var url = '/article/' + detail.queryParams.articleId + '/' + version + '/' + run;

        if (config.ISPP) {
            url = '/' + detail.extraUrl.slice(0, -1) + url;
        }

        // Create a new history item.
        history.pushState(null, null, url);
    }

    /**
     * Determine which action buttons to show for this page
     */
    function getDetailActions() {
        if (!_.isNull(detail.queryParams.articleId)) {
            var articleIds = [];
            articleIds.push(detail.queryParams.articleId);

            var getDetailActionsSuccess = function getDetailActionsSuccess(data) {
                if (data.articles.length === 1) {
                    detail.scheduleStatus = data.articles[0];
                    renderDetailActions();
                }
            }

            var getDetailActionsError = function getDetailActionsError(data) {
                log.error(config.errors.en.type.api + ': ' + config.api.current);
                log.info(data);

                var errorInfo = utils.formatErrorInformation(data);
                errorInfo.errorType = null;
                errorInfo.ref = 'getDetailActionsError';
                errorInfo.type = config.errors.en.type.api;
                $('#article').prepend(detail.template.errorMessage(errorInfo));
                $('#error-console').empty().html(detail.template.errorDetail(errorInfo));
            }

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: config.api.article_scheduled_status,
                data: JSON.stringify({articles: articleIds}),
                success: getDetailActionsSuccess,
                error: getDetailActionsError,
            });
        }
    }

    /**
     * Determine which action buttons to show for this page
     */
    function renderDetailActions() {
        if (!_.isEmpty(detail.scheduleStatus)) {
            if (detail.scheduleStatus.scheduled > 0) {
                $('.article-detail-actions', '#article').empty().html(detail.template.buttonsReScheduleTemplate({
                    article: detail.article,
                    "scheduled-publication-date": detail.scheduleStatus.scheduled
                }));
                $('.article-detail-scheduled', '#article').empty().html(detail.template.articlesScheduledForTemplate({scheduleStatus: detail.scheduleStatus}));
            } else {
                var buttons = detail.template.buttonsScheduleTemplate({article: detail.article}) + detail.template.buttonsPublishTemplate({
                        article: detail.article,
                        currentArticle: detail.currentArticle,
                        currentEvents: detail.currentEvents,
                        currentVersion: detail.queryParams.versionNumber,
                        currentRun: detail.queryParams.runId,
                        scheduleStatus: detail.scheduleStatus,
                    });
                $('.article-detail-actions', '#article').empty().html(buttons);
            }
        } else {
            var buttons = detail.template.buttonsPublishTemplate({
                article: detail.article,
                currentArticle: detail.currentArticle,
                currentEvents: detail.currentEvents,
                currentVersion: detail.queryParams.versionNumber,
                currentRun: detail.queryParams.runId,
            });
            $('.article-detail-actions', '#article').empty().html(buttons);
        }
    }

    /**
     * Get article from param in url
     */
    function getArticle() {
        if (!_.isNull(detail.queryParams.articleId)) {

            var getArticleSuccess = function(data) {
                detail.article = data;
                setLatestArticle();
                detail.currentArticle = getCurrentArticle();
                detail.currentEvents = getCurrentRun();
                renderArticle();
                getDetailActions();
            }
            var getArticleError = function(data) {
                log.error(config.errors.en.type.api + ': ' + config.api.article + '/' + detail.queryParams.articleId);
                log.info(data);
                var errorInfo = utils.formatErrorInformation(data);
                errorInfo.errorType = null;
                errorInfo.ref = 'getArticleError';
                errorInfo.type = config.errors.en.type.api;
                $('#article').empty().html(detail.template.errorMessage(errorInfo));
                $('#error-console').empty().html(detail.template.errorDetail(errorInfo));
            }

            $.ajax({
                url: config.api.article + '/' + detail.queryParams.articleId,
                cache: false,
                dataType: 'json',
                success: getArticleSuccess,
                error: getArticleError,

            });
        } else {
            // var errorInfo = utils.formatErrorInformation(data);
            var errorInfo = {};
            errorInfo.errorType = null;
            errorInfo.ref = 'getArticleError';
            errorInfo.statusText = config.errors.en.missingInformation;
            errorInfo.type = config.errors.en.type.application;
            errorInfo.message = config.errors.en.noArticleId;
            $('#article').empty().html(detail.template.errorMessage(errorInfo));

        }
    }

    /**
     * Render article to template
     */
    function renderArticle() {
        if (article && _.isEmpty(detail.errors)) {
            $('#article').empty().html(detail.template.articleTemplate(
                {
                    article: detail.article,
                    currentArticle: detail.currentArticle,
                    currentEvents: detail.currentEvents,
                    currentVersion: detail.queryParams.versionNumber,
                    currentRun: detail.queryParams.runId,
                    scheduleStatus: detail.scheduleStatus,
                }));

            renderDetailActions();
        } else {
            var errorInfo = utils.formatErrorInformation(detail.errors);
            errorInfo.errorType = null;
            errorInfo.ref = 'renderArticleError';
            errorInfo.type = config.errors.en.type.application;
            $('#article').empty().html(detail.template.errorMessage(detail.errors));
        }

        updatePageUrl();
    }

    /**
     * Set latest article
     */
    function setLatestArticle() {
        if (!detail.queryParams.versionNumber) {
            detail.queryParams.versionNumber = utils.findLastKey(detail.article.versions);
        }

        if (!detail.queryParams.runId) {
            if (_.has(detail.article.versions, detail.queryParams.versionNumber)) {
                var lastKey = utils.findLastKey(detail.article.versions[detail.queryParams.versionNumber].runs);
                var runId = detail.article.versions[detail.queryParams.versionNumber].runs[lastKey]['run-id'];
                detail.queryParams.runId = runId;
            } else {
                detail.queryParams.runId = null;
            }
        }

    }

    /**
     * Find the current article from stored data
     * @returns {*}
     */
    function getCurrentArticle() {
        if (_.has(detail.article.versions, detail.queryParams.versionNumber)) {
            return detail.article.versions[detail.queryParams.versionNumber].details;
        } else {
            detail.errors = {
                    status: config.errors.en.type.application,
                    statusText: config.errors.en.incorrectInformation,
                    message: config.errors.en.noVersions + ' (' + detail.queryParams.versionNumber + ')'
            };
            return false;
        }
    }

    /**
     * Find the current list of events from stored data
     * @returns {*}
     */
    function getCurrentRun() {
        if (_.has(detail.article.versions, detail.queryParams.versionNumber)) {
            if (_.findWhere(detail.article.versions[detail.queryParams.versionNumber].runs, {'run-id': detail.queryParams.runId})) {
                return _.findWhere(detail.article.versions[detail.queryParams.versionNumber].runs, {'run-id': detail.queryParams.runId});
            } else {
                detail.errors = {
                        status: config.errors.en.type.application,
                        statusText: config.errors.en.incorrectInformation,
                        message: config.errors.en.noRuns + ' (' + detail.queryParams.runId + ')'
                };
                return false;
            }
        }
    }

    /**
     * Update page details when a new run is selected
     * @param e
     */
    function updateRun(e) {
        detail.queryParams.versionNumber = $(e.currentTarget).attr('data-version');
        detail.queryParams.runId = $(e.currentTarget).attr('data-run');
        setCurrentArticle(detail.article.versions[detail.queryParams.versionNumber].details);
        if (_.findWhere(detail.article.versions[detail.queryParams.versionNumber].runs, {'run-id': detail.queryParams.runId})) {
            setCurrentRun(_.findWhere(detail.article.versions[detail.queryParams.versionNumber].runs, {'run-id': detail.queryParams.runId}));
        }

        renderArticle();
    }

    /**
     *
     * @param details
     */
    function setCurrentArticle(details) {
        detail.currentArticle = details;
    }

    /**
     *
     * @param details
     */
    function setCurrentRun(run) {
        detail.currentEvents = run;
    }

    /**
     * Get information from the url for the article ID
     * expected format
     * article/articleId/version/run
     * if there is nothing specified - ie no run/version, load the last version and the last run
     */
    function setArticleParams() {
        var articleId;
        var versionNumber;
        var runId;
        var url = window.location.pathname;
        if (config.ISPP) {
            // for use in the PP
            url = window.location.search;
            url = url.replace('?', '/');
        }

        url = url.split('/');
        url = _.compact(url);
        articleId = (!_.isEmpty(url[1])) ? url[1] : null;
        versionNumber = (!_.isEmpty(url[2])) ? url[2] : null;
        runId = (!_.isEmpty(url[3])) ? url[3] : null;

        /* If you have come through the PP nav we need to force some id's */
        if (config.ISPP && url[0] !== 'article') {
            articleId = '00353';
            versionNumber = '1';
            runId = 'c03211f7-6e1e-492d-9312-e0a80857873c';
        }

        detail.queryParams = {
            articleId: articleId,
            versionNumber: versionNumber,
            runId: runId,
        };
    }

    /**
     * When 'Publish now' clicked
     * Launch publish modal and update the list of queued items.
     * @param e
     */
    function detailPublish(e) {
        publish.initModal(false);
        publish.populateQueue($(e.target), true);
        publish.displayQueueList();
    }

    return {
        init: init
    }


}();
