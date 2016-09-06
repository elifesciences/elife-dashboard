var options = {
    debug: true,
    logLevel: 'silent'
};
var config = require('config')(options);
var scheduled = require('scheduled')(config);
var utils = require('utils');
var _ = require('underscore');
var moment = require('moment');

//component to be tested
describe('Scheduled page', function () {
    'use strict';

    var scheduledArticles = {
        "articles": [
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTA4VDE0OjE2OjMx\nWiIsICJydW4iOiAiYjZlZjVkMWYtMjNiMy00ZjRlLTliYTMtN2RlMjRmODg1MTcxIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIwOTAwMy4zL2I2ZWY1ZDFmLTIzYjMtNGY0ZS05YmEzLTdkZTI0Zjg4NTE3\nMSIsICJ2ZXJzaW9uIjogIjMiLCAiZWlmX2xvY2F0aW9uIjogIjA5MDAzLjMvYjZlZjVkMWYtMjNi\nMy00ZjRlLTliYTMtN2RlMjRmODg1MTcxL2VsaWZlLTA5MDAzLXYzLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIwOTAwMyJ9fQ==\n",
                "article-id": "09003",
                "article-type": "research-article",
                "authors": "Miyuki Suzawa, Diego A Miranda, Karmela A Ramos, Kenny K-H Ang, Emily J Faivre, Christopher G Wilson, Laura Caboni, Michelle R Arkin, Yeong-Sang Kim, Robert J Fletterick, Aaron Diaz, John S Schneekloth, Holly A Ingraham, Peter Tontonoz",
                "corresponding-authors": "Holly A Ingraham",
                "doi": "10.7554/eLife.09003",
                "event-status": "end",
                "event-timestamp": 1454940991,
                "event-type": "Post EIF",
                "id": "09003",
                "is-temp": false,
                "path": "content/4/e09003v3",
                "preview-link": "https://elifesciences.org/content/4/e09003v3",
                "publication-date": "2015-12-11T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 1,
                "run-id": "b6ef5d1f-23b3-4f4e-9ba3-7de24f885171",
                "scheduled-publication-date": 1472677200,
                "status": "VOR",
                "title": "A gene-expression screen identifies a non-toxic sumoylation inhibitor that mimics SUMO-less human LRH-1 in liver",
                "version": 3
            },
            {
                "id": "55555",
                "is-temp": true,
                "scheduled-publication-date": 1489096800
            },
            {
                "id": "3444444",
                "is-temp": true,
                "scheduled-publication-date": 1481234400
            },
            {
                "id": "222222",
                "is-temp": true,
                "scheduled-publication-date": 1477688400
            },
            {
                "id": "34444444",
                "is-temp": true,
                "scheduled-publication-date": 1500066000
            },
            {
                "id": "888888888",
                "is-temp": true,
                "scheduled-publication-date": 1472763600
            },
            {
                "id": "1000000",
                "is-temp": true,
                "scheduled-publication-date": 1473454860
            },
            {
                "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTIzVDExOjI1OjM2\nWiIsICJydW4iOiAiNzZkY2ZjYjAtYzUwMC00MDRlLWE2ODYtMGUyZGYxNjZmZTY0IiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIwOTEwMC4yLzc2ZGNmY2IwLWM1MDAtNDA0ZS1hNjg2LTBlMmRmMTY2ZmU2\nNCIsICJ2ZXJzaW9uIjogIjIiLCAiZWlmX2xvY2F0aW9uIjogIjA5MTAwLjIvNzZkY2ZjYjAtYzUw\nMC00MDRlLWE2ODYtMGUyZGYxNjZmZTY0L2VsaWZlLTA5MTAwLXYyLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIwOTEwMCJ9fQ==\n",
                "article-id": "09100",
                "article-type": "research-article",
                "authors": "Samuel Zambrano, Ilario De Toma, Arianna Piffer, Marco E Bianchi, Alessandra Agresti, Suzanne Gaudet",
                "corresponding-authors": "Marco E Bianchi, Alessandra Agresti",
                "doi": "10.7554/eLife.09100",
                "event-status": "end",
                "event-timestamp": 1456226736,
                "event-type": "Post EIF",
                "id": "09100",
                "is-temp": false,
                "path": "content/5/e09100v2",
                "preview-link": "https://elifesciences.org/content/5/e09100v2",
                "publication-date": "2016-01-14T00:00:00Z",
                "publication-status": "ready to publish",
                "run": 1,
                "run-id": "76dcfcb0-c500-404e-a686-0e2df166fe64",
                "scheduled-publication-date": 1472331600,
                "status": "VOR",
                "title": "NF-\u03baB oscillations translate into functionally related patterns of gene expression",
                "version": 2
            }
        ]
    };

    // setPageUrl
    describe('setPageUrl list view', function () {
        var getUrlParamsStub;
        var getWindowPathnameStub;
        var schdReplaceStateStub;
        before(function () {
            getUrlParamsStub = sinon.stub(scheduled, "getUrlParams", function () {
                var urlObject = {
                    view: "list",
                    start: "26-08-2016",
                    end: "26-08-2017"
                };
                return urlObject;
            });
            getWindowPathnameStub = sinon.stub(scheduled, "getWindowPathname", function () {
            });
            schdReplaceStateStub = sinon.stub(scheduled, "schdReplaceState", function () {
            });
        });
        after(function () {
            getUrlParamsStub.restore();
            getWindowPathnameStub.restore();
            schdReplaceStateStub.restore();
        });
        it('Should set page url using address bar information', function () {
            scheduled.setPageUrl();
            expect(scheduled.scheduled.currentView).to.eql('list');
            expect(scheduled.scheduled.listDateStart).to.eql('26-08-2016');
            expect(scheduled.scheduled.listDateEnd).to.eql('26-08-2017');
        });
    });

    describe('setPageUrl calendar view', function () {
        var getUrlParamsStub;
        var getWindowPathnameStub;
        var schdReplaceStateStub;
        before(function () {
            getUrlParamsStub = sinon.stub(scheduled, "getUrlParams", function () {
                var urlObject = {
                    view: "calendar",
                    type: "month",
                    date: "01-08-2016"
                };
                return urlObject;
            });
            getWindowPathnameStub = sinon.stub(scheduled, "getWindowPathname", function () {
            });
            schdReplaceStateStub = sinon.stub(scheduled, "schdReplaceState", function () {
            });
        });
        after(function () {
            getUrlParamsStub.restore();
            getWindowPathnameStub.restore();
            schdReplaceStateStub.restore();
        });
        it('Should set page url using address bar information', function () {
            scheduled.setPageUrl();
            expect(scheduled.scheduled.currentView).to.eql('calendar');
            expect(scheduled.scheduled.currentViewType).to.eql('month');
            expect(scheduled.scheduled.calendarDate).to.eql('01-08-2016');
        });
    });

    describe('renderSwitcher - list view', function () {
        var getUrlParamsStub;
        var getWindowPathnameStub;
        var schdReplaceStateStub;
        before(function () {
            getUrlParamsStub = sinon.stub(scheduled, "getUrlParams", function () {
                var urlObject = {
                    view: "list",
                    start: "26-08-2016",
                    end: "26-08-2017"
                };
                return urlObject;
            });
            getWindowPathnameStub = sinon.stub(scheduled, "getWindowPathname", function () {
            });
            schdReplaceStateStub = sinon.stub(scheduled, "schdReplaceState", function () {
            });
        });
        after(function () {
            getUrlParamsStub.restore();
            getWindowPathnameStub.restore();
            schdReplaceStateStub.restore();
            $('.schedule-page__switcher').empty();
        });
        it('Should render buttons for switching views with list active', function () {
            scheduled.setPageUrl();
            scheduled.renderSwitcher();
            var listBtnActive = $('.schedule-page__switcher .schedule-page-switch[data-switch="list"]').hasClass('active');
            expect(listBtnActive).to.be.true;
        });
    });

    describe('renderSwitcher - calendar view', function () {
        var getUrlParamsStub;
        var getWindowPathnameStub;
        var schdReplaceStateStub;
        before(function () {
            getUrlParamsStub = sinon.stub(scheduled, "getUrlParams", function () {
                var urlObject = {
                    view: "calendar",
                    type: "month",
                    date: "01-08-2016"
                };
                return urlObject;
            });
            getWindowPathnameStub = sinon.stub(scheduled, "getWindowPathname", function () {
            });
            schdReplaceStateStub = sinon.stub(scheduled, "schdReplaceState", function () {
            });
        });
        after(function () {
            getUrlParamsStub.restore();
            getWindowPathnameStub.restore();
            schdReplaceStateStub.restore();
            $('.schedule-page__switcher').empty();
        });
        it('Should render buttons for switching views with calendar active', function () {
            scheduled.setPageUrl();
            scheduled.renderSwitcher();
            var calendarBtnActive = $('.schedule-page__switcher .schedule-page-switch[data-switch="calendar"]').hasClass('active');
            expect(calendarBtnActive).to.be.true;

        });
    });

    describe('renderActions', function () {
        after(function () {
            $('.schedule-page__actions').empty();
        });
        it('Should render the add schedule article button', function () {
            scheduled.renderActions();
            expect($('.schedule-page__actions').length).to.be.greaterThan(0);
        });
    });
    describe('renderLoader', function () {
        it('Should render the loading image', function () {
            scheduled.renderLoader();
            expect($('.loading-template').length).to.be.greaterThan(0);
        });
    });

    describe('switchPage - list view', function () {
        var getUrlParamsStub;
        var getWindowPathnameStub;
        var schdReplaceStateStub;
        var ajaxStub;
        before(function () {
            getUrlParamsStub = sinon.stub(scheduled, "getUrlParams", function () {
                var urlObject = {
                    view: "list",
                    start: "26-08-2016",
                    end: "26-08-2017"
                };
                return urlObject;
            });
            getWindowPathnameStub = sinon.stub(scheduled, "getWindowPathname", function () {
            });
            schdReplaceStateStub = sinon.stub(scheduled, "schdReplaceState", function () {
            });
            ajaxStub = sinon.stub($, "ajax").returns({
                done: function (callback) {
                    scheduled.scheduled.scheduled = scheduledArticles;
                    return callback(scheduledArticles);
                }
            });
        });
        after(function () {
            getUrlParamsStub.restore();
            getWindowPathnameStub.restore();
            schdReplaceStateStub.restore();
            ajaxStub.restore();
            $('.schedule-page__switcher').empty();
            $('.schedule-page__content').empty();
        });
        it('Should switch to list view and change active button when clicked', function () {
            scheduled.setPageUrl();
            scheduled.renderSwitcher();
            scheduled.switchPage('list');
            var listBtnActive = $('.schedule-page__switcher .schedule-page-switch[data-switch="list"]').hasClass('active');
            expect(listBtnActive).to.be.true;
            expect($('.scheduled-page').hasClass('list-view')).to.be.true;
            expect($('.scheduled-page').hasClass('calendar-view')).to.be.false;
            expect($('.schedule-page__content .article-list-section').length).to.be.greaterThan(0);
        });
    });

    describe('switchPage - calendar view', function () {
        var getUrlParamsStub;
        var getWindowPathnameStub;
        var schdReplaceStateStub;
        var renderCalendarStub;
        before(function () {
            getUrlParamsStub = sinon.stub(scheduled, "getUrlParams", function () {
                var urlObject = {
                    view: "calendar",
                    type: "month",
                    date: "01-08-2016"
                };
                return urlObject;
            });
            getWindowPathnameStub = sinon.stub(scheduled, "getWindowPathname", function () {
            });
            schdReplaceStateStub = sinon.stub(scheduled, "schdReplaceState", function () {
            });
            renderCalendarStub = sinon.stub(scheduled, "renderCalendar", function () {
            });
        });
        after(function () {
            getUrlParamsStub.restore();
            getWindowPathnameStub.restore();
            schdReplaceStateStub.restore();
            renderCalendarStub.restore();
            $('.schedule-page__switcher').empty();
            $('.schedule-page__content').empty();
        });
        it('Should switch to list view and change active button when clicked', function () {
            scheduled.setPageUrl();
            scheduled.renderSwitcher();
            scheduled.switchPage('calendar');
            var calendarBtnActive = $('.schedule-page__switcher .schedule-page-switch[data-switch="calendar"]').hasClass('active');
            expect(calendarBtnActive).to.be.true;
            expect($('.scheduled-page').hasClass('list-view')).to.be.false;
            expect($('.scheduled-page').hasClass('calendar-view')).to.be.true;
            expect($('#schedule-calendar').length).to.be.greaterThan(0);
        });
    });

    describe('fetchScheduledArticlesSuccess', function () {
        it('Should update scheduled list', function () {
            scheduled.fetchScheduledArticlesSuccess(scheduledArticles);
            var fetchScheduledArticlesSuccessProcessed = {articles: utils.generateUrl(scheduledArticles.articles)};
            expect(scheduled.scheduled.scheduled).to.eql(fetchScheduledArticlesSuccessProcessed);
        });
    });

    describe('fetchScheduledArticlesError', function () {
        after(function () {
            $('.schedule-page__content').empty();
            $('#error-console').empty();
        });
        it('Show standard error', function () {
            var data = {
                statusCode: 400,
                statusText: config.errors.en.missingInformation,
                responseText: {
                    "message": config.errors.en.noArticleId
                }
            };
            scheduled.fetchScheduledArticlesError(data);
            var alertBox = document.querySelector('#error-message.scheduleArticlePublicationError');
            var statusResult = config.errors.en.missingInformation + '(' + config.errors.en.type.api + ')';
            var messageResult = config.errors.en.noArticleId;
            var alertStatus = alertBox.querySelector('.status');
            var alertMessage = alertBox.querySelector('.message');
            expect(alertStatus.innerHTML).to.eql(statusResult);
            expect(alertMessage.innerHTML).to.eql(messageResult);
        });
    });

    describe('convertArticlesToCalendar', function () {
        it('Should convert returned articles to a format readable by the calendar', function () {

            var input = {
                "articles": [
                    {
                        "_publication-data": "eyJ3b3JrZmxvd19uYW1lIjogIlBvc3RQZXJmZWN0UHVibGljYXRpb24iLCAid29ya2Zsb3dfZGF0\nYSI6IHsic3RhdHVzIjogInZvciIsICJ1cGRhdGVfZGF0ZSI6ICIyMDE2LTAyLTA4VDE0OjE2OjMx\nWiIsICJydW4iOiAiYjZlZjVkMWYtMjNiMy00ZjRlLTliYTMtN2RlMjRmODg1MTcxIiwgImV4cGFu\nZGVkX2ZvbGRlciI6ICIwOTAwMy4zL2I2ZWY1ZDFmLTIzYjMtNGY0ZS05YmEzLTdkZTI0Zjg4NTE3\nMSIsICJ2ZXJzaW9uIjogIjMiLCAiZWlmX2xvY2F0aW9uIjogIjA5MDAzLjMvYjZlZjVkMWYtMjNi\nMy00ZjRlLTliYTMtN2RlMjRmODg1MTcxL2VsaWZlLTA5MDAzLXYzLmpzb24iLCAiYXJ0aWNsZV9p\nZCI6ICIwOTAwMyJ9fQ==\n",
                        "article-id": "09003",
                        "article-type": "research-article",
                        "authors": "Miyuki Suzawa, Diego A Miranda, Karmela A Ramos, Kenny K-H Ang, Emily J Faivre, Christopher G Wilson, Laura Caboni, Michelle R Arkin, Yeong-Sang Kim, Robert J Fletterick, Aaron Diaz, John S Schneekloth, Holly A Ingraham, Peter Tontonoz",
                        "corresponding-authors": "Holly A Ingraham",
                        "doi": "10.7554/eLife.09003",
                        "event-status": "end",
                        "event-timestamp": 1454940991,
                        "event-type": "Post EIF",
                        "id": "09003",
                        "is-temp": false,
                        "path": "content/4/e09003v3",
                        "preview-link": "https://elifesciences.org/content/4/e09003v3",
                        "publication-date": "2015-12-11T00:00:00Z",
                        "publication-status": "ready to publish",
                        "run": 1,
                        "run-id": "b6ef5d1f-23b3-4f4e-9ba3-7de24f885171",
                        "scheduled-publication-date": 1472677200,
                        "status": "VOR",
                        "title": "A gene-expression screen identifies a non-toxic sumoylation inhibitor that mimics SUMO-less human LRH-1 in liver",
                        "version": 3
                    }
                ]
            };
            var result = [
                    {
                        "title": "09003",
                        "backgroundColor": "#cde1f1",
                        "borderColor": "#cde1f1",
                        "textColor": "#111111",
                        "start": moment.unix('1472677200').format('YYYY-MM-DD HH:mm Z'),
                        "url": "article/09003"
                    }
                ];
            var output = scheduled.convertArticlesToCalendar(input);
            expect(output).to.eql(result);
        });
    });

    describe('renderCalendar()', function (done) {
        var getUrlParamsStub;
        var getWindowPathnameStub;
        var renderCalendarViewRenderStub;
        var schdPushStateStub;
        before(function (done) {
            getUrlParamsStub = sinon.stub(scheduled, "getUrlParams", function () {
                var urlObject = {
                    view: "calendar",
                    type: "month",
                    date: "01-08-2016"
                };
                return urlObject;
            });
            getWindowPathnameStub = sinon.stub(scheduled, "getWindowPathname", function () {
            });
            renderCalendarViewRenderStub = sinon.stub(scheduled, "renderCalendarViewRender", function () {
            });
            schdPushStateStub = sinon.stub(scheduled, "schdPushState", function () {
            });

            scheduled.scheduled.scheduled = scheduledArticles;
            $('.scheduled-page').removeClass('list-view');
            $('.scheduled-page').addClass('calendar-view');
            $('.schedule-page__content').empty().html(scheduled.scheduled.template.scheduledContentCalendarTemplate({scheduled: scheduled.scheduled.scheduled}));
            scheduled.renderCalendar();
            this.timeout(3000); // A very long environment setup.
            setTimeout(done, 2500);
        });
        after(function () {
            getUrlParamsStub.restore();
            getWindowPathnameStub.restore();
            renderCalendarViewRenderStub.restore();
            schdPushStateStub.restore();
            $('.schedule-page').empty();
            $('.schedule-page__content').empty();
        });
        it('Should show the calendar', function (done) {

            var scheduleCalendar = $('#schedule-calendar').html();
            expect(scheduleCalendar.length).to.be.greaterThan(0);
            done();

        });
    });

    describe('renderCalendarViewRender', function () {
        var updateCalendarStub;
        before(function () {
            updateCalendarStub = sinon.stub(scheduled, 'updateCalendar');
        });
        after(function () {
            updateCalendarStub.restore();
            $('.schedule-page').empty();
            $('.schedule-page__content').empty();
        });
        it('Should update current View type', function () {
            var view = {
                type: 'agendaWeek',
                start: moment('2016-08-29'),
                end: moment('2016-10-03'),
                title: 'September 2016'
            };
            var element = $('.schedule-page__content');
            scheduled.renderCalendarViewRender(view, element);
            expect(scheduled.scheduled.currentViewType).to.equal('agendaWeek');
            expect(scheduled.scheduled.calendarDate).to.equal('29-08-2016');
        });
        it('In month view it should set the calendar date to the first date of the visible month', function () {
            // visible date is september but calendar shows august, september and october
            // set calendar date to 1st of visible month - september
            var view = {
                type: 'month',
                start: moment('2016-08-29'),
                end: moment('2016-10-03'),
                title: 'September 2016'
            };
            var element = $('.schedule-page__content');
            scheduled.renderCalendarViewRender(view, element);
            expect(scheduled.scheduled.currentViewType).to.equal('month');
            expect(scheduled.scheduled.calendarDate).to.equal('01-09-2016');

            // if the first date is the first - make it that date.
            var view = {
                type: 'month',
                start: moment('2017-05-01'),
                end: moment('2017-06-04'),
                title: 'May 2017'
            };
            var element = $('.schedule-page__content');
            scheduled.renderCalendarViewRender(view, element);
            expect(scheduled.scheduled.currentViewType).to.equal('month');
            expect(scheduled.scheduled.calendarDate).to.equal('01-05-2017');
        });
    });

});

