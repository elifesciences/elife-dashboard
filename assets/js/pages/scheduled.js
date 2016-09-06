module.exports = function (config) {
    "use strict";
    // Libs
    var $ = require('jquery');
    global.jQuery = $;

    if ($('.scheduled-page').length > 0) {
        // Libs
        {
            require('fullcalendar');
            require('history');
            require('qtip2');
            var moment = require('moment');
            var _ = require('underscore');
            $.pickadate = require('pickadate');
            var bootstrap = require('bootstrap-sass');
        }

        // Templates
        {
            require('./../helpers/templates-helpers.js');
            var Handlebars = require('handlebars');
            var template = require('./../templates');
            var Swag = require('swag');
            Swag.registerHelpers(Handlebars);
        }

        // App
        {
            var utils = require('utils');
            var publish = require('publish');
            var log = require('loglevel');
            if (!_.isNull(config.logLevel)) {
                log.setLevel(config.logLevel);
            }
        }

        // Variables
        {
            var data = {};
            data.$el = $('.scheduled-page');
            data.urlSet = false;
            data.scheduled = [];
            data.defaultView = 'list';
            data.defaultViewType = 'month';
            data.defaultlistDateStart = moment().format('DD-MM-YYYY');
            data.defaultlistDateEnd = moment().add(1, 'years').format('DD-MM-YYYY');
            data.currentView = data.defaultView;
            data.currentViewType = data.defaultViewType;
            data.calendarDate = data.defaultlistDateStart;
            data.listDateStart = data.defaultlistDateStart;
            data.listDateEnd = data.defaultlistDateEnd;
            data.urlParams = {};
            data.currUrl = null;
        }

        {
            // Templates
            data.template = {};
            data.template.errorMessage = template['error-message'];
            data.template.errorDetail = template['error-detail'];
            data.template.scheduledContentListTemplate = template['scheduled/scheduled-content-list'];
            data.template.scheduledContentCalendarTemplate = template['scheduled/scheduled-content-calendar'];
            data.template.scheduledActionsTemplate = template['scheduled/scheduled-actions'];
            data.template.scheduledSwitcherTemplate = template['scheduled/scheduled-switcher'];
            data.template.loadingTemplate = template['loading-template'];

        }
    }

    //

    /**
     * Initialise the methods for the scheduled page
     */
    function init() {
        if ($('.scheduled-page').length > 0) {
            setPageUrl();
            bindEvents();
            renderSwitcher();
            renderActions();
            switchPage(data.currentView);
        }
    }

    /**
     * Generate the url for history.js
     * @returns {string}
     */
    function createUrl() {
        // put the URL together
        var url = '?';
        if (data.currentView) {
            url += 'view=' + data.currentView;

            if (data.currentView == 'list') {
                if (data.listDateStart) {
                    url += '&start=' + data.listDateStart;
                }

                if (data.listDateEnd) {
                    url += '&end=' + data.listDateEnd;
                }
            }

            if (data.currentView == 'calendar') {
                if (data.currentViewType) {
                    url += '&type=' + data.currentViewType;
                }

                if (data.calendarDate) {
                    url += '&date=' + data.calendarDate
                }
            }
        }

        return url;
    }

    /**
     * Reutn url object from hash
     * @returns {*}
     */
    function getUrlParams() {
        var state = History.getState();
        var hash = state.hash;
        var urlObject = utils.urlObject(hash);
        return urlObject;
    }

    /**
     * Set the page url when first loading the page
     */
    function setPageUrl() {
        // We're setting the page url here so the
        // priority is to take items from the URL,
        // else we will use the defaults from init
        data.urlParams = scheduled.getUrlParams();

        // set from url
        if (_.has(data.urlParams, 'view')) {
            data.currentView = data.urlParams.view;
        }

        if (_.has(data.urlParams, 'start')) {
            data.listDateStart = data.urlParams.start;
        }

        if (_.has(data.urlParams, 'end')) {
            data.listDateEnd = data.urlParams.end;
        }

        if (_.has(data.urlParams, 'type')) {
            data.currentViewType = data.urlParams.type;
        }

        if (_.has(data.urlParams, 'date')) {
            data.calendarDate = data.urlParams.date;
        }

        var urlParams = createUrl();
        data.currUrl = scheduled.getWindowPathname() + urlParams;
        scheduled.schdReplaceState(data.currUrl);
    }

    /**
     * Helper for finding pathname
     * @returns {*}
     */
    function getWindowPathname() {
        return window.location.origin + window.location.pathname;
    }

    /**
     * Replace state wrapper
     * @param url
     */
    function schdReplaceState(url) {
        History.replaceState(null, null, url);
    }

    /**
     * Update the page url when things happen. Things such as, clicking list/calendar button or changing the view in the calendar
     */
    function updatePageUrl() {
        // here we have updated the globals so we will take the url data from the history object
        // unless its the list view where we use the default dates
        // (if we were coming from the updated url ones the setPageUrl  method would trigger instead of this one)
        if (data.currentView == 'list') {
            data.listDateStart = data.defaultlistDateStart;
            data.listDateEnd = data.defaultlistDateEnd;
        }

        var urlParams = createUrl();
        data.currUrl = scheduled.getWindowPathname() + urlParams;
        scheduled.schdPushState(data.currUrl);
    }

    /**
     * Push state wrapper
     * @param url
     */
    function schdPushState(url) {
        History.pushState(null, null, url);
    }

    /**
     * Bind events
     */
    function bindEvents() {
        $(data.$el).on('click', '.schedule-page-switch', clickSwitchPage.bind(this));
    }

    /**
     * Render the loading icon
     */
    function renderLoader() {
        $('.schedule-page__content', data.$el).empty().html(data.template.loadingTemplate());
    }

    /**
     * Render the list / Calender switcher
     */
    function renderSwitcher() {
        $('.schedule-page__switcher', data.$el).html(data.template.scheduledSwitcherTemplate({currentView: data.currentView}));
    }

    /**
     * Render the 'add scheduled articles' button
     */
    function renderActions() {
        $('.schedule-page__actions', data.$el).html(data.template.scheduledActionsTemplate());
    }

    /**
     * Click to switch the page
     * @param e
     */
    function clickSwitchPage(e) {
        data.currentView = $(e.currentTarget).attr('data-switch');
        switchPage(data.currentView);
        updatePageUrl();
    }

    /**
     * switch page content view
     * @param pageType
     */
    function switchPage(pageType) {
        renderLoader();
        renderSwitcher();

        if (pageType === 'list') {
            $('.scheduled-page').addClass('list-view');
            $('.scheduled-page').removeClass('calendar-view');
            var fetch = fetchScheduledArticles(data.listDateStart, data.listDateEnd, fetchScheduledArticlesSuccess, fetchScheduledArticlesError);
            fetch.done(function (returnedData) {
                $('.schedule-page__content', data.$el).empty().html(data.template.scheduledContentListTemplate({scheduled: returnedData.scheduled}));
                $('[data-toggle="tooltip"]').tooltip({container: 'body'});
            });
        }

        if (pageType === 'calendar') {
            $('.scheduled-page').removeClass('list-view');
            $('.scheduled-page').addClass('calendar-view');
            $('.schedule-page__content', data.$el).empty().html(data.template.scheduledContentCalendarTemplate({scheduled: data.scheduled}));
            scheduled.renderCalendar();
        }

    }

    /**
     * Fetch Scheduled articles from the API - depending on list or calendar the start/end dates will be different
     * @param start
     * @param end
     */
    function fetchScheduledArticles(start, end, successCallback, errorCallback) {
        // For debugging purposes
        // log.info('fetchScheduledArticles');
        // log.info('start ' + moment.unix(start).format('dddd, MMMM Do YYYY, h:mm:ss a'));
        // log.info('end ' + moment.unix(end).format('dddd, MMMM Do YYYY, h:mm:ss a'));
        // log.info('/fetchScheduledArticles');
        var startDate = moment(start, 'DD-MM-YYYY').unix();
        var endDate = moment(end, 'DD-MM-YYYY').unix();
        return $.ajax({
            url: config.api.article_schedule_for_range + '/from/' + startDate + '/to/' + endDate + '/',
            cache: false,
            dataType: 'json',
            success: fetchScheduledArticlesSuccess,
            error: fetchScheduledArticlesError
        });
    }

    /**
     * Success callback for fetching scheduled data
     * @param data
     */
    function fetchScheduledArticlesSuccess(returnedData) {
        var articles = utils.generateUrl(returnedData.articles);
        data.scheduled = {articles: articles};
    }

    /**
     * Error callback for fetching scheduled data
     * @param data
     */
    function fetchScheduledArticlesError(returnedData) {
        log.error('API Error: ' + config.api.article_schedule_for_range + '/from/' + returnedData.currentStartDate + '/to/' + returnedData.currentEndDate + '/');
        log.info(returnedData);
        var errorInfo = utils.formatErrorInformation(returnedData);
        errorInfo.errorType = null;
        errorInfo.ref = 'scheduleArticlePublicationError';
        errorInfo.type = config.errors.en.type.api;
        $('.schedule-page__content', data.$el).empty().html(data.template.errorMessage(errorInfo));
        $('#error-console').empty().html(data.template.errorDetail(errorInfo));

    }

    /**
     * Update the global dates called on viewRender
     * @param view
     * @param element
     */
    function renderCalendarViewRender(view, element) {
        data.currentViewType = view.type;
        // this event fires once the calendar has completed loading and when the date is changed - thus calling the new events
        var start = moment(view.start).format('DD-MM-YYYY');
        var end = moment(view.end).format('DD-MM-YYYY');
        if (data.currentViewType == 'month') {
            // if the current 'start' date of the selected month is not the same as the actual month then set the data.calendarDate to the first of the proper month
            var currentStartMonth = moment(start, 'DD-MM-YYYY').format('MM-YYYY');
            var currentMonth = moment(view.title, 'MMMM YYYY').format('MM-YYYY');
            if (currentStartMonth != currentMonth) {
                data.calendarDate = moment(view.title, 'MMMM YYYY').startOf('month').format('DD-MM-YYYY');
            }
            else {
                data.calendarDate = start;
            }
        } else {
            data.calendarDate = start;
        }
        scheduled.updateCalendar(start, end);
    }

    /**
     * Render the calendar for the calendar view
     */
    function renderCalendar() {
        log.info('calendar start date ' + moment(data.calendarDate, 'DD-MM-YYYY').format('DD-MM-YYYY'))
        $('#schedule-calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay',
            },
            eventRender: function (event, element) {
                //Show tooltip when hovering over an event title
                var toolTipContent = '<strong>' + event.title + '</strong><br/>' + moment(event.start).format('MMMM D, YYYY') + ' ' + moment(event.start).format('h:mma');
                element.qtip({
                    content: toolTipContent,
                    hide: {fixed: true, delay: 200},
                    style: 'qtip-light',
                    position: {
                        my: 'bottom center',
                        at: 'top center',
                        target: 'mouse',
                        viewport: $('#fullcalendar'),
                        adjust: {
                            x: 0,
                            y: -10,
                            mouse: false,
                            scroll: false,
                        },
                    },
                });
            },

            viewRender: scheduled.renderCalendarViewRender,

            timeFormat: 'h:mma',
            firstDay: 1,
            aspectRatio: 2,
            defaultView: data.currentViewType,
            fixedWeekCount: false,
            editable: false,
            lazyFetch: false,
            defaultDate: moment(data.calendarDate, 'DD-MM-YYYY')
        });

    }

    /**
     * Called when the calendar is loaded, or the dates are changed
     * Fetches new articles according to the date requested and updtes the calendar to show them
     * @param start
     * @param end
     */
    function updateCalendar(start, end) {
        log.info('updateCalendar')
        $('#schedule-calendar', data.$el).before(data.template.loadingTemplate());
        var fetch = fetchScheduledArticles(start, end, fetchScheduledArticlesSuccess, fetchScheduledArticlesError);
        fetch.done(function (data) {
            $('.loading-template', data.$el).remove();
            $('#schedule-calendar').fullCalendar('removeEvents');
            $('#schedule-calendar').fullCalendar('addEventSource', convertArticlesToCalendar(data.scheduled));
            $('#schedule-calendar').fullCalendar('rerenderEvents');
            scheduled.updatePageUrl();
        });
    }

    /**
     * Convert the data from the API to a format recognised by the calendar.
     * @param articles
     * @returns {Array}
     */
    function convertArticlesToCalendar(data) {
        var calendarArticles = [];
        _.each(data.articles, function (a) {
            var calendarArticle = {};
            calendarArticle.title = (a['is-temp']) ? a.id + ' (tmp)' : a.id;
            calendarArticle.backgroundColor = (a['is-temp']) ? config.colorAdvanceArticle : config.colorArticle;
            calendarArticle.borderColor = (a['is-temp']) ? config.colorAdvanceArticle : config.colorArticle;
            calendarArticle.textColor = config.colorText;
            calendarArticle.start = moment.unix(a['scheduled-publication-date']).format('YYYY-MM-DD HH:mm Z');
            if (!(a['is-temp']) && !_.isNull(a.id)) {
                calendarArticle.url = (config.ISPP) ? '/patterns/04-pages-01-detail/04-pages-01-detail.html?article/' + a.id : 'article/' + a.id;
            }

            calendarArticles.push(calendarArticle);
        });

        return calendarArticles;
    }

    var scheduled = {
        data: data,
        init: init,
        fetchScheduledArticles: fetchScheduledArticles,
        updateCalendar: updateCalendar,
        renderCalendarViewRender: renderCalendarViewRender,
        schdReplaceState: schdReplaceState,
        schdPushState: schdPushState,
        getWindowPathname: getWindowPathname,
        createUrl: createUrl,
        getUrlParams: getUrlParams,
        setPageUrl: setPageUrl,
        updatePageUrl: updatePageUrl,
        bindEvents: bindEvents,
        renderLoader: renderLoader,
        renderSwitcher: renderSwitcher,
        renderActions: renderActions,
        clickSwitchPage: clickSwitchPage,
        switchPage: switchPage,
        fetchScheduledArticlesSuccess: fetchScheduledArticlesSuccess,
        fetchScheduledArticlesError: fetchScheduledArticlesError,
        renderCalendar: renderCalendar,
        convertArticlesToCalendar: convertArticlesToCalendar
    }
    return scheduled;

};
