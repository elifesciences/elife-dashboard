module.exports = function (config) {
    "use strict";
    // Libs
    var $ = require('jquery');
    global.jQuery = $;

        // Libs
        {
            var _ = require('underscore');
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
            var utils = require('./../helpers/utils.js');
            var log = require('loglevel');
            if(!_.isNull(config.logLevel)) { log.setLevel(config.logLevel); }
            var publish = require('./../services/publish.js')(config);
            var versionReason = require('./../services/version-reason.js')(config);
        }

        // Variables
        {
            var data = {};
            data.articles = [];
        }

        // Templates
        {
            data.template = {};
            data.template.errorMessage = template['error-message'];
            data.template.errorDetail = template['error-detail'];
            data.template.loadingTemplate = template['loading-template'];
            data.template.article = template['current/article'];
            data.template.articleStats = template['current/article-stats-template'];
        }


    function init() {
        if ($('.current-page').length > 0) {
            bindEvents();
            renderLoading();
            renderArticles();
            publish.init();
            versionReason.init();
        }
    }

    /**
     * Render loading template
     */
    function renderLoading() {
        $('#articles').empty().html(data.template.loadingTemplate());
    }

    /**
     * Fetch articles and render on the page.
     * Renders both the 'summary' at the top of the page and the list below
     */
    function renderArticles() {
        fetchArticles(fetchArticlesSuccess, fetchArticlesError);
    }

    /**
     * fetch articles
     * @returns {*}
     */
    function fetchArticles(successCallback, errorCallback) {
        return $.ajax({
            url: config.api.current,
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
     * Fetch Articles Success
     * @param articles
     */
    var fetchArticlesSuccess = function (articles) {
        data.articles = articles;
        $('#articles').empty().html(data.template.article(sortArticles(articles)));
        $('#articleStats').empty().html(data.template.articleStats(sortArticles(articles)));
        $('.btn-publish-queued').hide();
        $('[data-toggle="tooltip"]').tooltip({container: 'body'});
    }

    /**
     * Fetch Articles Error
     * @param data
     */
    var fetchArticlesError = function (returnedData) {
        log.info('error');
        log.error(config.errors.en.type.api + ': ' + config.api.current);
        log.info(returnedData);
        var errorInfo = utils.formatErrorInformation(returnedData);
        errorInfo.errorType = null;
        errorInfo.ref = 'fetchArticlesError';
        errorInfo.type = config.errors.en.type.api;
        $('#articles').empty();
        $('#articles').empty().html(data.template.errorMessage(errorInfo));
        $('#articles').append(data.template.errorDetail(errorInfo));
    }


    /**
     * Bind events
     */
    function bindEvents() {
        $('#articles', '.current-page').on('change', 'input.toggle-publish-all:checkbox', toggleAddToQueueBtn.bind(this));
        $('#articles', '.current-page').on('click', '.btn-publish-queued', publishQueued.bind(this));
        $('#articles', '.current-page').on('click', '.btn-publish', currentPublish.bind(this));
        $(window).on('scroll', stickyHeaders.bind(this));
    }

    /**
     * Apply sticky header logic to the article headers
     * Headers are only sticky if number of items >= to 2
     * @param e
     */
    function stickyHeaders(e) {
        $('.sticky').each(function () {
            var width = $(this).outerWidth();
            var caption = $('.sticky-header', this);
            var captionHeight = $('.sticky-header', this).outerHeight();
            var scrolled = $(document).scrollTop();
            var fromTop = $(this).offset().top;
            var scrollDuration = $('tbody', this).outerHeight();
            var fromTopHeight = fromTop + scrollDuration;
            if ($('table tr', this).length >= 2) {
                if (scrolled >= fromTop && scrolled <= fromTopHeight) {
                    $(this).css('padding-top', captionHeight + 'px');
                    $(caption).addClass('sticky').css('width', width + 'px');
                } else {
                    $(this).css('padding-top', '0px');
                    $(caption).removeClass('sticky').css('width', '');
                }
            }
        });
    }

    /**
     * Because the API returns data in any order and handlebars is limited we will sort here
     * Correct order: Error, In Progress, User input Required, Scheduled
     * @param articles
     * @returns {*}
     */
    function sortArticles(unsortedArticles) {
        var articlesErrors = utils.generateUrl(unsortedArticles.error);
        var articlesInProgress = utils.generateUrl(unsortedArticles['in-progress']);
        var articlesUir = utils.generateUrl(unsortedArticles.uir);
        var articlesUirvr = utils.generateUrl(unsortedArticles.uirvr);
        var articlesScheduled = utils.generateUrl(unsortedArticles.scheduled);
        var sortedArticles = {
            error: articlesErrors,
            inProgress: articlesInProgress,
            uir: articlesUir,
            uirvr: articlesUirvr,
            scheduled: articlesScheduled
        };
        return sortedArticles;
    }

    /**
     * When you check a checkbox under any user input required
     * adds the relevant information for the checked item to the queue
     * @param e
     */
    function toggleAddToQueueBtn(e) {
        $('.btn-publish-queued').show();
        var isChecked = $(e.target).is(':checked');
        if (isChecked === false) {
            var cnt = 0;
            $('input.toggle-publish-all:checkbox', '#articles').each(function (i, element) {
                var checkedState = $(element).is(':checked');
                if (checkedState === false) cnt++;
            });

            if (cnt === data.articles.uir.length) $('.btn-publish-queued').hide();
        }

        publish.populateQueue($(e.target).parents('tr'));
    }

    /**
     * When 'Publish all selected' active & clicked
     * Launch publish modal and update the list of queued items.
     *
     */
    function publishQueued() {
        publish.initModal(true);
        publish.displayQueueList();
    }

    /**
     * When 'Publish now' clicked
     * Launch publish modal and update the list of queued items.
     * @param e
     */
    function currentPublish(e) {
        publish.initModal(false);
        publish.populateQueue($(e.target).parents('tr'), true);
        publish.displayQueueList();
    }

    var current = {
        init: init,
        data: data,
        bindEvents: bindEvents,
        renderLoading: renderLoading,
        renderArticles: renderArticles,
        sortArticles: sortArticles,
        fetchArticlesSuccess: fetchArticlesSuccess,
        fetchArticlesError: fetchArticlesError
    };

    return current;


};
