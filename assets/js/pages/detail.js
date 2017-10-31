module.exports = function (config) {
    "use strict";
    // Libs
    var $ = require('jquery');
    global.jQuery = $;

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
        var Handlebars = require('handlebars');
        var template = require('./../templates');
        var Swag = require('./../../libs/swag.js');
        Swag.registerHelpers(Handlebars);
    }

    // App
    {
        var utils = require('utils');
        var publish = require('publish')(config);
        var log = require('loglevel');
        if (!_.isNull(config.logLevel)) {
            log.setLevel(config.logLevel);
        }
    }

    // Variables
    {
        var data = {};
        data.article = [];
        data.errors = [];
        data.detailEvents = [];
        data.detailArticle = [];
        data.scheduleStatus = [];
        data.queryParams = {};
        data.currUrl = {};
        data.extraUrl = 'patterns/04-pages-01-detail/04-pages-01-detail.html?/';
    }

    {
        // Templates
        data.template = {};
        data.template.loadingTemplate = template['loading-template'];
        data.template.errorMessage = template['error-message'];
        data.template.errorDetail = template['error-detail'];
        data.template.buttonsScheduleTemplate = template['detail/buttons-schedule'];
        data.template.buttonsReScheduleTemplate = template['detail/buttons-reschedule'];
        data.template.buttonsPublishTemplate = template['detail/buttons-publish'];
        data.template.articlesScheduledForTemplate = template['detail/article-scheduled-for'];
        data.template.articleTemplate = template['detail/article'];

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
            publish.init();
        }
    }

    function renderLoader() {
        $('#article').empty().html(data.template.loadingTemplate());
    }

    /**
     * Get URL hash from History
     * @returns {*}
     */
    function getUrlHash() {
        var state = History.getState();
        var hash = state.hash;
        return hash;
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
        var hash = detail.getUrlHash();
        if (config.ISPP) {
            hash = hash.replace(data.extraUrl, '');
        }

        url = hash;
        hash = hash.split('/');
        hash = _.compact(hash);
        articleId = (!_.isEmpty(hash[1])) ? hash[1] : null;
        versionNumber = (!_.isEmpty(hash[2])) ? hash[2] : null;
        runId = (!_.isEmpty(hash[3])) ? hash[3] : null;

        url = (url.slice(-1) === '/') ? url.slice(0, -1) : url;

        if (_.isNull(versionNumber) && _.isNull(runId)) {
            url += '/' + data.queryParams.versionNumber + '/' + data.queryParams.runId;
        }

        if (!_.isNull(versionNumber) && _.isNull(runId)) {
            url += '/' + data.queryParams.runId;
        }

        if (config.ISPP) {
            url = '/' + data.extraUrl.slice(0, -1) + url;
        }

        data.currUrl = url;
        detail.detailReplaceState(url);
    }

    /**
     * Replace url
     * @param url
     */
    function detailReplaceState(url) {
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
     * On back/forwards/page url change update the article
     * @param e
     */
    function stateChange(e) {
        detail.setArticleParams();
        detail.getArticle();
    }

    /**
     * Bind navigation events
     */
    function bindNavigationEvents(e) {
        e.preventDefault();
        var version = $(e.currentTarget).attr('data-version');
        var run = $(e.currentTarget).attr('data-run');
        var url = '/article/' + data.queryParams.articleId + '/' + version + '/' + run;

        if (config.ISPP) {
            url = '/' + data.extraUrl.slice(0, -1) + url;
        }

        data.currUrl = url;
        detail.detailPushState(url);

    }

    /**
     * Update history with new url
     * @param url
     */
    function detailPushState(url) {
        // Create a new history item.
        history.pushState(null, null, url);
    }

    /**
     * Detail Actions Success
     * @param data
     */
    function getDetailActionsSuccess(returnedData) {
        if (returnedData.articles.length === 1) {
            data.scheduleStatus = returnedData.articles[0];
            detail.renderDetailActions();
        }
    }

    /**
     * Detail Actions Error
     * @param data
     */
    function getDetailActionsError(returnedData) {
        log.error(config.errors.en.type.api + ': ' + config.api.current);
        log.info(returnedData);
        var errorInfo = utils.formatErrorInformation(returnedData);
        errorInfo.errorType = null;
        errorInfo.ref = 'getDetailActionsError';
        errorInfo.type = config.errors.en.type.api;
        $('#article').prepend(data.template.errorMessage(errorInfo));
        $('#error-console').empty().html(data.template.errorDetail(errorInfo));
    }

    /**
     * Fetch Detail Actions
     * @param successCallback
     * @param errorCallback
     * @returns {*}
     */
    function fetchDetailActions(successCallback, errorCallback) {
        var articleIds = [];
        articleIds.push(data.queryParams.articleId);
        return $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: config.api.article_scheduled_status,
            data: JSON.stringify({articles: articleIds}),
            success: function (returnedData) {
                successCallback(returnedData);
            },
            error: function (returnedData) {
                errorCallback(returnedData);
            }
        });
    }

    /**
     * Determine which action buttons to show for this page
     */
    function getDetailActions() {
        if (!_.isNull(data.queryParams.articleId)) {
            detail.fetchDetailActions(getDetailActionsSuccess, getDetailActionsError);
        }
    }

    /**
     * Determine which action buttons to show for this page
     */
    function renderDetailActions() {
        
        if (!_.isEmpty(data.scheduleStatus)) {
            if (data.scheduleStatus.scheduled > 0) {
                $('.article-detail-actions', '#article').empty().html(data.template.buttonsReScheduleTemplate({
                    article: data.article,
                    currentArticle: data.currentArticle,
                    "scheduled-publication-date": data.scheduleStatus.scheduled
                }));
                $('.article-detail-scheduled', '#article').empty().html(data.template.articlesScheduledForTemplate({scheduleStatus: data.scheduleStatus}));
            } else {
                var buttons = data.template.buttonsScheduleTemplate({article: data.article, currentArticle: data.currentArticle}) + data.template.buttonsPublishTemplate({
                        article: data.article,
                        currentArticle: data.currentArticle,
                        currentEvents: data.currentEvents,
                        currentVersion: data.queryParams.versionNumber,
                        currentRun: data.queryParams.runId,
                        scheduleStatus: data.scheduleStatus,
                    });
                $('.article-detail-actions', '#article').empty().html(buttons);
            }
        } else {
            var buttons = data.template.buttonsPublishTemplate({
                article: data.article,
                currentArticle: data.currentArticle,
                currentEvents: data.currentEvents,
                currentVersion: data.queryParams.versionNumber,
                currentRun: data.queryParams.runId,
            });
            $('.article-detail-actions', '#article').empty().html(buttons);
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
        detail.setLatestArticle();
        data.currentArticle = getCurrentArticle();
        data.currentEvents = getCurrentRun();
        detail.renderArticle();
        detail.getDetailActions();
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
     * Get article from param in url
     */
    function getArticle() {
        if (!_.isNull(data.queryParams.articleId)) {
            detail.fetchArticle(getArticleSuccess, getArticleError);
        } else {
            // var errorInfo = utils.formatErrorInformation(data);
            var errorInfo = {};
            errorInfo.errorType = null;
            errorInfo.ref = 'getArticleError';
            errorInfo.statusText = config.errors.en.missingInformation;
            errorInfo.type = config.errors.en.type.application;
            errorInfo.message = config.errors.en.noArticleId;
            $('#article').empty().html(data.template.errorMessage(errorInfo));

        }
    }

    /**
     * Render article to template
     */
    function renderArticle() {
        if (data.article && _.isEmpty(data.errors)) {
            $('#article').empty().html(data.template.articleTemplate(
                {
                    article: data.article,
                    currentArticle: data.currentArticle,
                    currentEvents: data.currentEvents,
                    currentVersion: data.queryParams.versionNumber,
                    currentRun: data.queryParams.runId,
                    scheduleStatus: data.scheduleStatus,
                }));

            detail.renderDetailActions();
        } else {
            var errorInfo = utils.formatErrorInformation(data.errors);
            errorInfo.errorType = null;
            errorInfo.ref = 'renderArticleError';
            errorInfo.type = config.errors.en.type.application;
            $('#article').empty().html(data.template.errorMessage(data.errors));
        }

        detail.updatePageUrl();
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

    /**
     * Update page details when a new run is selected
     * @param e
     */
    function updateRun(e) {
        data.queryParams.versionNumber = $(e.currentTarget).attr('data-version');
        data.queryParams.runId = $(e.currentTarget).attr('data-run');
        setCurrentArticle(data.article.versions[data.queryParams.versionNumber].details);
        if (_.findWhere(data.article.versions[data.queryParams.versionNumber].runs, {'run-id': data.queryParams.runId})) {
            setCurrentRun(_.findWhere(data.article.versions[data.queryParams.versionNumber].runs, {'run-id': data.queryParams.runId}));
        }

        renderArticle();
    }

    /**
     *
     * @param details
     */
    function setCurrentArticle(details) {
        data.currentArticle = details;
    }

    /**
     *
     * @param details
     */
    function setCurrentRun(run) {
        data.currentEvents = run;
    }

    /**
     * Returns Window Pathname
     */
    function getWindowPathname() {
        return window.location.pathname;
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
        var url = detail.getWindowPathname();
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

        data.queryParams = {
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

    /**
     * Reset parameters
     */
    function resetParams() {
        // detail = {};
        data.article = [];
        data.errors = [];
        data.detailEvents = [];
        data.detailArticle = [];
        data.scheduleStatus = [];
        data.queryParams = {};
    }

    var detail = {
        init: init,
        bindEvents: bindEvents,
        data: data,
        renderLoader: renderLoader,
        setArticleParams: setArticleParams,
        getWindowPathname: getWindowPathname,
        getArticle: getArticle,
        fetchArticle: fetchArticle,
        getArticleSuccess: getArticleSuccess,
        getArticleError: getArticleError,
        setLatestArticle: setLatestArticle,
        getCurrentArticle: getCurrentArticle,
        getCurrentRun: getCurrentRun,
        resetParams: resetParams,
        renderArticle: renderArticle,
        getDetailActions: getDetailActions,
        fetchDetailActions: fetchDetailActions,
        renderDetailActions: renderDetailActions,
        getDetailActionsError: getDetailActionsError,
        getDetailActionsSuccess: getDetailActionsSuccess,
        bindNavigationEvents: bindNavigationEvents,
        detailPushState: detailPushState,
        detailReplaceState: detailReplaceState,
        updatePageUrl: updatePageUrl,
        getUrlHash: getUrlHash,
        config: config
    };

    return detail;

};
