module.exports = function () {
    "use strict";
    // Libs
    var $ = require('jquery');
    global.jQuery = $;

    if ($('.scheduled-page').length > 0) {
        // Libs
        {
            require('fullcalendar');
            require('history');
            // require('qtip');
            var moment = require('moment');
            var _ = require('underscore');
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
            var scheduled = {};
            scheduled.$el = $('.scheduled-page');
            scheduled.urlSet = false;
            scheduled.scheduled = [];
            scheduled.defaultView = 'list';
            scheduled.defaultViewType = 'month';
            scheduled.defaultlistDateStart = moment().format('DD-MM-YYYY');
            scheduled.defaultlistDateEnd = moment().add(1, 'years').format('DD-MM-YYYY');
            scheduled.currentView = scheduled.defaultView;
            scheduled.currentViewType = scheduled.defaultViewType;
            scheduled.calendarDate = scheduled.defaultlistDateStart;
            scheduled.listDateStart = scheduled.defaultlistDateStart;
            scheduled.listDateEnd = scheduled.defaultlistDateEnd;
            scheduled.urlParams = {};
        }

        {
            // Templates
            scheduled.template = {};
            scheduled.template.errorMessage = template['error-message'];
            scheduled.template.errorDetail = template['error-detail'];
            scheduled.template.scheduledContentListTemplate = template['scheduled/scheduled-content-list'];
            scheduled.template.scheduledContentCalendarTemplate = template['scheduled/scheduled-content-calendar'];
            scheduled.template.scheduledActionsTemplate = template['scheduled/scheduled-actions'];
            scheduled.template.scheduledSwitcherTemplate = template['scheduled/scheduled-switcher'];
            scheduled.template.loadingTemplate = template['loading-template'];

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
            switchPage(scheduled.currentView);
        }
    }
    /**
     * Generate the url for history.js
     * @returns {string}
     */
    function createUrl() {
        // put the URL together
        var url = '?';
        if (scheduled.currentView) {
            url += 'view=' + scheduled.currentView;

            if (scheduled.currentView ==  'list') {
                if (scheduled.listDateStart) {
                    url += '&start=' + scheduled.listDateStart;
                }

                if (scheduled.listDateEnd) {
                    url += '&end=' + scheduled.listDateEnd;
                }
            }

            if (scheduled.currentView ==  'calendar') {
                if (scheduled.currentViewType) {
                    url += '&type=' + scheduled.currentViewType;
                }

                if (scheduled.calendarDate) {
                    url += '&date=' + scheduled.calendarDate
                }
            }
        }

        return url;
    }

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
        // We're setting the page url here so the priority is to take items from the URL, else we will use the defaults from init
        scheduled.urlParams = getUrlParams();


        // set from url
        if (_.has(scheduled.urlParams, 'view')) {
            scheduled.currentView = scheduled.urlParams.view;
        }

        if (_.has(scheduled.urlParams, 'start')) {
            scheduled.listDateStart = scheduled.urlParams.start;
        }

        if (_.has(scheduled.urlParams, 'end')) {
            scheduled.listDateEnd = scheduled.urlParams.end;
        }

        if (_.has(scheduled.urlParams, 'type')) {
            scheduled.currentViewType = scheduled.urlParams.type;
        }

        if (_.has(scheduled.urlParams, 'date')) {
            scheduled.calendarDate = scheduled.urlParams.date;
        }

        var urlParams = createUrl();
        var url = window.location.origin + window.location.pathname + urlParams;
        History.replaceState(null, null, url);
    }

    /**
     * Update the page url when things happen. Things such as, clicking list/calendar button or changing the view in the calendar
     */
    function updatePageUrl() {
        // here we have updated the globals so we will take the url data from the history object
        // unless its the list view where we use the default dates
        // (if we were coming from the updated url ones the setPageUrl  method would trigger instead of this one)
        if (scheduled.currentView == 'list') {
            scheduled.listDateStart = scheduled.defaultlistDateStart;
            scheduled.listDateEnd = scheduled.defaultlistDateEnd;
        }

        var urlParams = createUrl();
        var url = window.location.origin + window.location.pathname + urlParams;
        History.pushState(null, null, url);
    }

    /**
     * Bind events
     */
    function bindEvents() {
        $(scheduled.$el).on('click', '.schedule-page-switch', clickSwitchPage.bind(this));
    }

    /**
     * Render the loading icon
     */
    function renderLoader() {
        $('.schedule-page__content', scheduled.$el).empty().html(scheduled.template.loadingTemplate());
    }

    /**
     * Render the list / Calender switcher
     */
    function renderSwitcher() {
        $('.schedule-page__switcher', scheduled.$el).html(scheduled.template.scheduledSwitcherTemplate({currentView: scheduled.currentView}));
    }

    /**
     * Render the 'add scheduled articles' button
     */
    function renderActions() {
        $('.schedule-page__actions', scheduled.$el).html(scheduled.template.scheduledActionsTemplate());
    }

    /**
     * Click to switch the page
     * @param e
     */
    function clickSwitchPage(e) {
        scheduled.currentView = $(e.currentTarget).attr('data-switch');
        switchPage(scheduled.currentView);
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
            var fetch = fetchScheduledArticles(scheduled.listDateStart, scheduled.listDateEnd);
            fetch.done(function (data) {
                $('.schedule-page__content', scheduled.$el).empty().html(scheduled.template.scheduledContentListTemplate({scheduled: scheduled.scheduled}));
                $('[data-toggle="tooltip"]').tooltip({container: 'body'});
            });
        }

        if (pageType === 'calendar') {
            $('.scheduled-page').removeClass('list-view');
            $('.scheduled-page').addClass('calendar-view');
            $('.schedule-page__content', scheduled.$el).empty().html(scheduled.template.scheduledContentCalendarTemplate({scheduled: scheduled.scheduled}));
            renderCalendar();
        }

    }




    /**
     * Fetch Scheduled articles from the API - depending on list or calendar the start/end dates will be different
     * @param start
     * @param end
     */
    function fetchScheduledArticles(start, end) {
        // For debugging purposes
        // log.info('fetchScheduledArticles');
        // log.info('start ' + moment.unix(start).format('dddd, MMMM Do YYYY, h:mm:ss a'));
        // log.info('end ' + moment.unix(end).format('dddd, MMMM Do YYYY, h:mm:ss a'));
        // log.info('/fetchScheduledArticles');

        var startDate = moment(start, 'DD-MM-YYYY').unix();
        var endDate = moment(end, 'DD-MM-YYYY').unix();

        var fetchScheduledArticlesSuccess = function(data) {
            var articles = utils.generateUrl(data.articles);
            scheduled.scheduled = {articles: articles};
        }

        var fetchScheduledArticlesError = function(data,a,e,i) {
            log.error('API Error: ' + config.api.article_schedule_for_range + '/from/' + startDate + '/to/' + endDate + '/');
            log.info(data);
            var errorInfo = utils.formatErrorInformation(data);
            errorInfo.errorType = null;
            errorInfo.ref = 'scheduleArticlePublicationError';
            errorInfo.type = config.errors.en.type.api;
            $('.schedule-page__content', scheduled.$el).empty().html(scheduled.template.errorMessage(errorInfo));
            $('#error-console').empty().html(scheduled.template.errorDetail(errorInfo));

        }

        return $.ajax({
            url: config.api.article_schedule_for_range + '/from/' + startDate + '/to/' + endDate + '/',
            cache: false,
            dataType: 'json',
            success: fetchScheduledArticlesSuccess,
            error: fetchScheduledArticlesError
        });
    }

    /**
     * Render the calendar for the calendar view
     */
    function renderCalendar() {

        function renderCalendarViewRender(view, element) {
            scheduled.currentViewType = view.type;
            // this event fires once the calendar has completed loading and when the date is changed - thus calling the new events
            var start = moment(view.start).format('DD-MM-YYYY');
            var end = moment(view.end).format('DD-MM-YYYY');
            if(scheduled.currentViewType == 'month') {
                // if the current 'start' date of the selected month is not the same as the actual month then set the scheduled.calendarDate to the first of the proper month
                var currentStartMonth = moment(start, 'DD-MM-YYYY').format('MM-YYYY');
                var currentMonth = moment(view.title, 'MMMM YYYY').format('MM-YYYY');
                if(currentStartMonth != currentMonth) {
                    scheduled.calendarDate = moment(view.title, 'MMMM YYYY').startOf('month').format('DD-MM-YYYY');
                }
                else {
                    scheduled.calendarDate = start;
                }
            } else {
                scheduled.calendarDate = start;
            }
            updateCalendar(start, end);
        }


        $('#schedule-calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay',
            },
            eventRender: function (event, element) {
                //Show tooltip when hovering over an event title
                var toolTipContent = '<strong>' + event.title + '</strong><br/>' + moment(event.start).format('MMMM D, YYYY') + ' ' + moment(event.start).format('h:mma');
                /*element.qtip({
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
                });*/
            },

            viewRender: renderCalendarViewRender,

            timeFormat: 'h:mma',
            firstDay: 1,
            aspectRatio: 2,
            defaultView: scheduled.currentViewType,
            fixedWeekCount: false,
            editable: false,
            lazyFetch: false,
            defaultDate: moment(scheduled.calendarDate, 'DD-MM-YYYY')
        });

        log.info('calendar start date ' + moment(scheduled.calendarDate, 'DD-MM-YYYY').format('DD-MM-YYYY'))
    }

    /**
     * Called when the calendar is loaded, or the dates are changed
     * Fetches new articles according to the date requested and updtes the calendar to show them
     * @param start
     * @param end
     */
    function updateCalendar(start, end) {
        log.info('updateCalendar')
        $('#schedule-calendar', scheduled.$el).before(scheduled.template.loadingTemplate());
        var fetch = fetchScheduledArticles(start, end);
        fetch.done(function (data) {
            $('.loading-template', scheduled.$el).remove();
            $('#schedule-calendar').fullCalendar('removeEvents');
            $('#schedule-calendar').fullCalendar('addEventSource', convertArticlesToCalendar(scheduled.scheduled));
            $('#schedule-calendar').fullCalendar('rerenderEvents');
            updatePageUrl();
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
            var calendarArticle = [];
            calendarArticle.title = (a['is-temp']) ? a.id + ' (tmp)' : a.id;
            calendarArticle.backgroundColor = (a['is-temp']) ? config.colorAdvanceArticle : config.colorArticle;
            calendarArticle.borderColor = (a['is-temp']) ? config.colorAdvanceArticle : config.colorArticle;
            calendarArticle.textColor = config.colorText;
            calendarArticle.start = moment.unix(a['scheduled-publication-date']);
            if (!(a['is-temp']) && !_.isNull(a.id)) {
                calendarArticle.url = (config.ISPP) ? '/patterns/04-pages-01-detail/04-pages-01-detail.html?article/' + a.id : 'article/' + a.id;
            }

            calendarArticles.push(calendarArticle);
        });

        return calendarArticles;
    }


    return {
        init: init,
        fetchScheduledArticles: fetchScheduledArticles,
        updateCalendar:updateCalendar
    }


}();
