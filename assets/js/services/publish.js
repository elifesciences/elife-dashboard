module.exports = function (config) {
    "use strict";
    // Libs
    var $ = require('jquery');
    global.jQuery = $;

    // Libs
    {
        var _ = require('underscore');
        var utils = require('./../helpers/utils.js');
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
        data.queued = [];
        data.queuePolled = 0;
        data.checkingStatus = '';
        data.pollLimit = 250;
        data.publishInterval = 500;
        data.isAllPublished = false;
        data.isPublishing = false;
    }

    {
        // Templates
        data.template = {};
        data.template.errorMessage = template['error-message'];
        data.template.errorDetail = template['error-detail'];
        data.template.publishModal = template['publish/article-publish-modal'];
        data.template.publishStatus = template['publish/article-publish-modal-status'];
    }

    /**
     * Initialise the methods for the Detail page
     */
    function init() {
        bindEvents();
        $('body').append(data.template.publishModal());
    }

    /**
     * Bind events
     */
    function bindEvents() {
        $(document).on('hide.bs.modal', refreshPage.bind(this));
        $(document).on('click', '#publish-modal .close', refreshPage.bind(this));
        $(document).on('click', '#publish-modal #publish-close', refreshPage.bind(this));
        $(document).on('click', '#publish-modal #publish-action', performPublish.bind(this));
        $(document).on('click', '#publish-modal #publish-action', updatePublishModal.bind(this));
    }

    /**
     * Initialise modal, not actually loading the modal, that's done in bootstrap
     * @param isMultiple
     */
    function initModal(isMultiple) {
        var btnText = (isMultiple) ? 'Publish All' : 'Publish';
        $('#articles-queue', '#publish-modal').empty();
        $('#publish-action', '#publish-modal').empty().text(btnText);
    }

    /**
     * Amend queued items.
     * @param target
     * @param publishNow
     */
    function populateQueue(target, publishNow) {
        var articleId = target.attr('data-article-id');
        var articleVer = target.attr('data-article-version');
        var articleRun = target.attr('data-article-run');
        var articleDoi = target.attr('data-article-doi');
        var addToQueue = {id: articleId, version: articleVer, run: articleRun, doi: articleDoi};
        if (publishNow) {
            if (!_.findWhere(data.queued, addToQueue)) {
                data.queued = utils.addObject(data.queued, addToQueue);
            }
        } else {
            if (_.findWhere(data.queued, addToQueue)) {
                data.queued = utils.removeObject(data.queued, addToQueue);
            } else {
                data.queued = utils.addObject(data.queued, addToQueue);
            }
        }
    }

    /**
     * Update the queue list to the items in the queue
     */
    function displayQueueList() {
        _.each(data.queued, function (article) {
            var listItem = $('<li>' + article.doi + '</li>');
            listItem.data({id: article.id, version: article.version, run: article.run, doi: article.doi});
            $('#articles-queue').append(listItem);
        });
    }

    /**
     * Update the queue with correct status icons and work out when publishing has finished
     * @param article
     */
    function updateQueueListStatus(article) {
        var $elm = $('li', '#articles-queue').attr('id', 'article-' + article.id);
        $elm.find('.article-status').remove();
        $elm.append(data.template.publishStatus(article));
    }

    /**
     * refresh page when
     * user clicks and isPublishing or isAllPublished are true
     * @param e
     */
    function refreshPage(e) {
        if (data.isPublishing === true || data.isAllPublished === true) {
            publish.reloadPage();
        }

        publish.resetModalButtons();
    }

    /**
     * Split out reload page for easier unit testing
     */
    function reloadPage() {
        window.location.reload(true);
    }

    /**
     * Reset the modal buttons
     */
    function resetModalButtons() {
        $('#publish-action', '#publish-modal').prop('disabled', false).removeClass('disabled');
        $('#articles-queue', '#publish-modal').empty();

        // Specific to current page
        $('.btn-publish-queued').hide();
        $('.toggle-publish-all').each(function (i, e) {
            $(e).prop('checked', false);
        });

        data.queued = [];
    }

    /**
     * queue articles to the publishing service
     * @param e
     */
    function updatePublishModal(e) {
        $('#publish-action', '#publish-modal').prop('disabled', true).addClass('disabled');
        data.isPublishing = true;
    }

    /**
     * queue articles to the publishing service
     * @param e
     */
    function performPublish(e) {
        queueArticles(data.queued, queueArticlesSuccess, queueArticlesError);
    }

    /**
     * Queue articles to the service, set timeout to keep polling for the status
     * @param queued
     */
    function queueArticles(queued, successCallback, errorCallback) {
        return $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: config.api.queue_article_publication,
            data: JSON.stringify({articles: queued}),
            success: function (data) {
                successCallback(data);
            },
            error: function (data) {
                errorCallback(data);
            }
        });
    }

    function queueArticlesError(returnedData) {
        log.error(config.errors.en.type.api + ': ' + config.api.queue_article_publication);
        log.info(returnedData);
        log.info({articles: returnedData.queued});
        var errorInfo = utils.formatErrorInformation(returnedData);
        errorInfo.errorType = null;
        errorInfo.ref = 'queueArticlesError';
        errorInfo.type = config.errors.en.type.api;
        $('.modal-body', '#publish-modal').empty().html(data.template.errorMessage(errorInfo));
        $('.modal-body', '#publish-modal').append(data.template.errorDetail(errorInfo));
    }

    function queueArticlesSuccess(data) {
        pollQueue(data.articles);
    }

    /**
     * Update the queue with correct status icons and work out when publishing has finished
     * @param queuedArticles
     */
    function pollQueue(queuedArticles) {
        checkArticleStatus(queuedArticles, checkingStatusSuccess, checkingStatusError);
    }

    /**checkArticleStatus
     * Poll service to find out what is happening
     * @param queued
     */
    function checkArticleStatus(queued, successCallback, errorCallback) {
        return $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: config.api.article_publication_status,
            data: JSON.stringify({articles: queued}),
            success: function (data) {
                successCallback(data);
            },
            error: function (data) {
                errorCallback(data);
            }
        });
    }

    function checkingStatusSuccess(returnedData) {
        data.queued = returnedData;
        data.queuePolled++;
        var articles = returnedData.articles;
        var status = {completed: 0, error: 0, queued: 0};
        var unpublished = [];

        _.each(articles, function (article, i) {
            switch (article['publication-status']) {
                case 'published':
                    status.completed++;
                    break;
                case 'error':
                    status.error++;
                    break;
                case 'queued':
                case 'ready to publish':
                    utils.addObject(unpublished, article);
                    status.queued++;
                    break;
            }
            updateQueueListStatus(article);
        });
        // log.info(status);
        var totalComplete = status.error + status.completed;
        // max polls reached
        if (data.queuePolled >= data.pollLimit) {
            log.info('max polls reached');
            publish.finishPublishing({error: config.errors.en.maxPollsReached, ref: 'max-polls'});
        }
        // all status's are complete or errors stop checking
        else if (totalComplete === articles.length) {
            log.info('all queued items are either complete or errors');
            publish.finishPublishing();
        }
        // if any still queued
        else {
            setTimeout(function () {
                publish.pollQueue(unpublished)
            }, data.publishInterval);
        }

    }

    function checkingStatusError(returnedData) {
        log.error('checkingStatusError', returnedData);
        log.error(config.errors.en.type.api + ': ' + config.api.article_publication_status);
        log.info(returnedData);
        log.info({articles: data.queued});
        var errorInfo = utils.formatErrorInformation(returnedData);
        errorInfo.errorType = null;
        errorInfo.ref = 'checkingStatusError';
        errorInfo.type = config.errors.en.type.api;
        $('.modal-body', '#publish-modal').empty().html(data.template.errorMessage(errorInfo));
        $('.modal-body', '#publish-modal').append(data.template.errorDetail(errorInfo));
        data.isPublishing = false;
    }

    /**
     * We've finished publishing - set some flags and tidy up
     */
    function finishPublishing(returnedData) {
        if (_.has(returnedData, 'error')) {
            log.error(config.errors.en.type.api + ': ' + returnedData.error);
            log.info(returnedData);
            var errorInfo = utils.formatErrorInformation(returnedData);
            errorInfo.errorType = null;
            errorInfo.type = config.errors.en.type.application;
            errorInfo.message = returnedData.error;
            if (_.has(returnedData, 'ref')) {
                errorInfo.ref = returnedData.ref;
                $('#error-message.' + errorInfo.ref, '#publish-modal').remove();
            }
            $('.modal-body', '#publish-modal').prepend(data.template.errorMessage(errorInfo));
        }
        data.isPublishing = false;
        data.isAllPublished = true;
        log.info('publishingFinished');
    }

    var publish = {
        init: init,
        initModal: initModal,
        populateQueue: populateQueue,
        displayQueueList: displayQueueList,
        resetModalButtons: resetModalButtons,
        refreshPage: refreshPage,
        reloadPage: reloadPage,
        performPublish: performPublish,
        updatePublishModal: updatePublishModal,
        queueArticles: queueArticles,
        queueArticlesSuccess: queueArticlesSuccess,
        queueArticlesError: queueArticlesError,
        checkArticleStatus: checkArticleStatus,
        checkingStatusSuccess: checkingStatusSuccess,
        checkingStatusError: checkingStatusError,
        pollQueue: pollQueue,
        updateQueueListStatus: updateQueueListStatus,
        finishPublishing: finishPublishing,
        data: data
    };

    return publish;

};
