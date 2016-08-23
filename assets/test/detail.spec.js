var config = require('config');
config.logLevel = 'silent';
var detail = require('detail');

//component to be tested
describe('Details page', function () {
    'use strict';
    var data = {
        "id": "00353",
        "versions": {
            "1": {
                "details": {
                    "article-type": "discussion",
                    "authors": "Version 1 Eve Marder",
                    "corresponding-authors": "Eve Marder",
                    "doi": "10.7554/eLife.00353",
                    "preview-link": "http://54.84.81.117/content/1/e00353v1",
                    "publication-date": "2012-12-13T00:00:00Z",
                    "publication-status": "ready to publish",
                    "status": "VOR",
                    "title": "A good life",
                    "version-number": "1"
                },
                "runs": {
                    "1": {
                        "events": [
                            {
                                "event-message": "Run 1 Finished expansion of article 00353 for version 1 run 1345f644-67ba-479d-8e54-65e7803c79c1 into 00353.1/1345f644-67ba-479d-8e54-65e7803c79c1",
                                "event-status": "end",
                                "event-timestamp": 1453921929,
                                "event-type": "Expand Article"
                            },
                            {
                                "event-message": "Finished applying version number to article 00353 for version 1 run 1345f644-67ba-479d-8e54-65e7803c79c1",
                                "event-status": "end",
                                "event-timestamp": 1453921930,
                                "event-type": "Apply Version Number"
                            },
                            {
                                "event-message": "XML converted to EIF for article 00353 to 00353.1/1345f644-67ba-479d-8e54-65e7803c79c1/elife-00353-v1.json",
                                "event-status": "end",
                                "event-timestamp": 1453921933,
                                "event-type": "Convert JATS"
                            },
                            {
                                "event-message": "Ending setting of publish status for 00353",
                                "event-status": "end",
                                "event-timestamp": 1453921935,
                                "event-type": "Set Publication Status"
                            },
                            {
                                "event-message": "Finished converting images for  003533 images processed ",
                                "event-status": "end",
                                "event-timestamp": 1453921942,
                                "event-type": "Resize Images"
                            },
                            {
                                "event-message": "Deposited assets for article 00353",
                                "event-status": "end",
                                "event-timestamp": 1453921945,
                                "event-type": "Deposit assets"
                            },
                            {
                                "event-message": "Finished submitting EIF for article  00353 status was 200",
                                "event-status": "end",
                                "event-timestamp": 1453921948,
                                "event-type": "Post EIF"
                            }
                        ],
                        "first-event-timestamp": 1453921927,
                        "run-id": "1345f644-67ba-479d-8e54-65e7803c79c1",
                        "run-number": "1",
                        "version-number": "1"
                    },
                    "2": {
                        "events": [
                            {
                                "event-message": "Run 2 Finished expansion of article 00353 for version 1 run afa7d187-4fad-4286-aea4-3460adebfca7 into 00353.1/afa7d187-4fad-4286-aea4-3460adebfca7",
                                "event-status": "end",
                                "event-timestamp": 1453922533,
                                "event-type": "Expand Article"
                            },
                            {
                                "event-message": "Finished applying version number to article 00353 for version 1 run afa7d187-4fad-4286-aea4-3460adebfca7",
                                "event-status": "end",
                                "event-timestamp": 1453922534,
                                "event-type": "Apply Version Number"
                            },
                            {
                                "event-message": "XML converted to EIF for article 00353 to 00353.1/afa7d187-4fad-4286-aea4-3460adebfca7/elife-00353-v1.json",
                                "event-status": "end",
                                "event-timestamp": 1453922536,
                                "event-type": "Convert JATS"
                            },
                            {
                                "event-message": "Ending setting of publish status for 00353",
                                "event-status": "end",
                                "event-timestamp": 1453922537,
                                "event-type": "Set Publication Status"
                            },
                            {
                                "event-message": "Finished converting images for  003533 images processed ",
                                "event-status": "end",
                                "event-timestamp": 1453922543,
                                "event-type": "Resize Images"
                            },
                            {
                                "event-message": "Deposited assets for article 00353",
                                "event-status": "end",
                                "event-timestamp": 1453922546,
                                "event-type": "Deposit assets"
                            },
                            {
                                "event-message": "Finished submitting EIF for article  00353 status was 200",
                                "event-status": "end",
                                "event-timestamp": 1453922549,
                                "event-type": "Post EIF"
                            }
                        ],
                        "first-event-timestamp": 1453922530,
                        "run-id": "afa7d187-4fad-4286-aea4-3460adebfca7",
                        "run-number": "2",
                        "version-number": "1"
                    }
                }
            },
            "2": {
                "details": {
                    "article-type": "discussion",
                    "authors": "Version 2 Eve Marder",
                    "corresponding-authors": "Eve Marder",
                    "doi": "10.7554/eLife.00353",
                    "preview-link": "http://54.84.81.117/content/1/e00353v1",
                    "publication-date": "2012-12-13T00:00:00Z",
                    "publication-status": "ready to publish",
                    "status": "VOR",
                    "title": "A good life",
                    "version-number": "2"
                },
                "runs": {
                    "1": {
                        "events": [
                            {
                                "event-message": "Run 1 Finished expansion of article 00353 for version 1 run 1345f644-67ba-479d-8e54-65e7803c79c1 into 00353.1/1345f644-67ba-479d-8e54-65e7803c79c1",
                                "event-status": "end",
                                "event-timestamp": 1453921929,
                                "event-type": "Expand Article"
                            },
                            {
                                "event-message": "Finished applying version number to article 00353 for version 1 run 1345f644-67ba-479d-8e54-65e7803c79c1",
                                "event-status": "end",
                                "event-timestamp": 1453921930,
                                "event-type": "Apply Version Number"
                            },
                            {
                                "event-message": "XML converted to EIF for article 00353 to 00353.1/1345f644-67ba-479d-8e54-65e7803c79c1/elife-00353-v1.json",
                                "event-status": "end",
                                "event-timestamp": 1453921933,
                                "event-type": "Convert JATS"
                            },
                            {
                                "event-message": "Ending setting of publish status for 00353",
                                "event-status": "end",
                                "event-timestamp": 1453921935,
                                "event-type": "Set Publication Status"
                            },
                            {
                                "event-message": "Finished converting images for  003533 images processed ",
                                "event-status": "end",
                                "event-timestamp": 1453921942,
                                "event-type": "Resize Images"
                            },
                            {
                                "event-message": "Deposited assets for article 00353",
                                "event-status": "end",
                                "event-timestamp": 1453921945,
                                "event-type": "Deposit assets"
                            },
                            {
                                "event-message": "Finished submitting EIF for article  00353 status was 200",
                                "event-status": "end",
                                "event-timestamp": 1453921948,
                                "event-type": "Post EIF"
                            }
                        ],
                        "first-event-timestamp": 1453921927,
                        "run-id": "1345f644-67ba-479d-8e54-65e7803c79c1",
                        "run-number": "1",
                        "version-number": "1"
                    },
                    "2": {
                        "events": [
                            {
                                "event-message": "Run 2 Finished expansion of article 00353 for version 1 run afa7d187-4fad-4286-aea4-3460adebfca7 into 00353.1/afa7d187-4fad-4286-aea4-3460adebfca7",
                                "event-status": "end",
                                "event-timestamp": 1453922533,
                                "event-type": "Expand Article"
                            },
                            {
                                "event-message": "Finished applying version number to article 00353 for version 1 run afa7d187-4fad-4286-aea4-3460adebfca7",
                                "event-status": "end",
                                "event-timestamp": 1453922534,
                                "event-type": "Apply Version Number"
                            },
                            {
                                "event-message": "XML converted to EIF for article 00353 to 00353.1/afa7d187-4fad-4286-aea4-3460adebfca7/elife-00353-v1.json",
                                "event-status": "end",
                                "event-timestamp": 1453922536,
                                "event-type": "Convert JATS"
                            },
                            {
                                "event-message": "Ending setting of publish status for 00353",
                                "event-status": "end",
                                "event-timestamp": 1453922537,
                                "event-type": "Set Publication Status"
                            },
                            {
                                "event-message": "Finished converting images for  003533 images processed ",
                                "event-status": "end",
                                "event-timestamp": 1453922543,
                                "event-type": "Resize Images"
                            },
                            {
                                "event-message": "Deposited assets for article 00353",
                                "event-status": "end",
                                "event-timestamp": 1453922546,
                                "event-type": "Deposit assets"
                            },
                            {
                                "event-message": "Finished submitting EIF for article  00353 status was 200",
                                "event-status": "end",
                                "event-timestamp": 1453922549,
                                "event-type": "Post EIF"
                            }
                        ],
                        "first-event-timestamp": 1453922530,
                        "run-id": "afa7d187-4fad-4286-aea4-3460adebfca7",
                        "run-number": "2",
                        "version-number": "1"
                    }
                }
            }
        }
    };

    it('details should exist', function () {
        expect(detail).to.be.a('object');
    });

    describe('renderLoader()', function () {
        after(function () {
            detail.resetParams();
        });
        it('Should render the loading template', function () {
            detail.renderLoader();
            expect($('.loading-template').length).to.be.greaterThan(0);
        });
    });

    describe('setArticleParams', function () {
        var getWindowPathnameStub;
        before(function () {
            detail.resetParams();
            getWindowPathnameStub = sinon.stub(detail, "getWindowPathname", function () {
                return '/article/00353/1/1345f644-67ba-479d-8e54-65e7803c79c1';
            });
        });
        after(function () {
            getWindowPathnameStub.restore();
            detail.resetParams();
        });
        it('Get information from the url for the article ID', function () {
            var result = {
                articleId: "00353",
                versionNumber: "1",
                runId: '1345f644-67ba-479d-8e54-65e7803c79c1',
            };
            detail.setArticleParams();
            expect(detail.detail.queryParams).to.eql(result);
        });
    });

    describe('getArticle', function () {
        var getWindowPathnameStub;
        var fetchArticleStub;

        before(function () {
            getWindowPathnameStub = sinon.stub(detail, "getWindowPathname", function () {
                return '/article/00353/1/1345f644-67ba-479d-8e54-65e7803c79c1';
            });
            fetchArticleStub = sinon.stub(detail, "fetchArticle");
        });

        after(function () {
            getWindowPathnameStub.restore();
            fetchArticleStub.restore();
        });

        it('QueryParams ArticleID not null - fetch article', function () {
            detail.setArticleParams();
            detail.getArticle();
            expect(fetchArticleStub.called).to.be.true;
        });

        it('QueryParams ArticleID null - show standard error', function () {
            detail.setArticleParams();
            detail.detail.queryParams.articleId = null;
            var data = {
                statusCode: 400,
                statusText: config.errors.en.missingInformation,
                responseText: {
                    "message": config.errors.en.noArticleId
                }
            };
            detail.getArticle();
            var alertBox = document.querySelector('#error-message.getArticleError');
            var statusResult = config.errors.en.missingInformation + '(' + config.errors.en.type.application + ')';
            var messageResult = config.errors.en.noArticleId;
            var alertStatus = alertBox.querySelector('.status');
            var alertMessage = alertBox.querySelector('.message');
            expect(alertStatus.innerHTML).to.eql(statusResult);
            expect(alertMessage.innerHTML).to.eql(messageResult);
        });
    });

    describe('getArticleSuccess()', function () {
        var getWindowPathnameStub;
        var getDetailActionsStub;
        var renderArticleStub;
        before(function () {
            getWindowPathnameStub = sinon.stub(detail, "getWindowPathname", function () {
                return '/article/00353/1/1345f644-67ba-479d-8e54-65e7803c79c1';
            });
            getDetailActionsStub = sinon.stub(detail, "getDetailActions", function () {
            });
            renderArticleStub = sinon.stub(detail, "renderArticle", function () {
            });
        });
        after(function () {
            getWindowPathnameStub.restore();
            getDetailActionsStub.restore();
            renderArticleStub.restore();
        });
        it('Should update details', function () {
            detail.setArticleParams();
            detail.getArticleSuccess(data);
            expect(detail.detail.article).to.eql(data);
            expect(detail.detail.currentArticle).to.eql(data.versions[1].details);
            expect(detail.detail.currentEvents).to.eql(data.versions[1].runs[1]);
        });
    });

    describe('getArticleError()', function () {
        after(function () {
            $('#article').empty();
            $('#article-console').empty();
        });
        it('Should display standard error alert and error debug alert', function () {
            var data = {
                statusCode: 400,
                statusText: "Error Occurred",
                responseText: {
                    "message": "I'm afraid I can't do that Dave",
                    "detail": "I'm afraid I can't do that Dave",
                }
            };
            detail.getArticleError(data);
            var alertBox = document.querySelector('#error-message.getArticleError');
            var statusResult = 'Error Occurred(API Error)';
            var messageResult = 'I\'m afraid I can\'t do that Dave';
            var alertStatus = alertBox.querySelector('.status');
            var alertMessage = alertBox.querySelector('.message');
            expect(alertStatus.innerHTML).to.eql(statusResult);
            expect(alertMessage.innerHTML).to.eql(messageResult);
        });
    });

    describe('setLatestArticle', function () {
        after(function () {
            detail.resetParams();
        });
        // var queryParams = {"articleId": "00353", "versionNumber": "1", "runId": "1345f644-67ba-479d-8e54-65e7803c79c1"};
        it('Should find the last version number in details.article if no version number but has run id', function () {
            var result = {"articleId": "00353", "versionNumber": "2", "runId": "1345f644-67ba-479d-8e54-65e7803c79c1"};
            detail.detail.article = data;
            detail.detail.queryParams = {
                "articleId": "00353",
                "versionNumber": null,
                "runId": "1345f644-67ba-479d-8e54-65e7803c79c1"
            };
            detail.setLatestArticle();
            expect(detail.detail.queryParams).to.eql(result);
        });
        it('Should find the last version and run if only given article ID', function () {
            var result = {"articleId": "00353", "versionNumber": "2", "runId": "afa7d187-4fad-4286-aea4-3460adebfca7"};
            detail.detail.article = data;
            detail.detail.queryParams = {"articleId": "00353", "versionNumber": null, "runId": null};
            detail.setLatestArticle();
            expect(detail.detail.queryParams).to.eql(result);
        });
        it('Should find the last run ID if not given run id', function () {
            var result = {"articleId": "00353", "versionNumber": "2", "runId": "afa7d187-4fad-4286-aea4-3460adebfca7"};
            detail.detail.article = data;
            detail.detail.queryParams = {"articleId": "00353", "versionNumber": "2", "runId": null};
            detail.setLatestArticle();
            expect(detail.detail.queryParams).to.eql(result);
        });
    });

    describe('getCurrentArticle', function () {
        after(function () {
            detail.resetParams();
            $('#article').empty();
            $('#article-console').empty();
        });
        it('Should return details for that version if queryParams has versionNumber', function () {
            detail.detail.article = data;
            detail.detail.queryParams = {"articleId": "00353", "versionNumber": "1"};
            var result = {
                "article-type": "discussion",
                "authors": "Version 1 Eve Marder",
                "corresponding-authors": "Eve Marder",
                "doi": "10.7554/eLife.00353",
                "preview-link": "http://54.84.81.117/content/1/e00353v1",
                "publication-date": "2012-12-13T00:00:00Z",
                "publication-status": "ready to publish",
                "status": "VOR",
                "title": "A good life",
                "version-number": "1"
            };
            var currentArticle = detail.getCurrentArticle();
            expect(currentArticle).to.eql(result);
        });
        it('Should return false and populate detail.errors if queryParams has no versionNumber,', function () {
            detail.detail.article = data;
            detail.detail.queryParams = {"articleId": "00353", "versionNumber": null};
            var result = {
                status: config.errors.en.type.application,
                statusText: config.errors.en.incorrectInformation,
                message: config.errors.en.noVersions + ' (' + detail.detail.queryParams.versionNumber + ')'
            };
            var currentArticle = detail.getCurrentArticle();
            expect(currentArticle).to.be.false;
            expect(detail.detail.errors).to.eql(result);
        });
    });

    describe('getCurrentRun', function () {
        after(function () {
            detail.resetParams();
        });
        it('It should return details for that run if queryParams has versionNumber and runId', function () {
            detail.detail.article = data;
            detail.detail.queryParams = {
                "articleId": "00353",
                "versionNumber": "1",
                "runId": "1345f644-67ba-479d-8e54-65e7803c79c1"
            };
            var result = {
                "events": [
                    {
                        "event-message": "Run 1 Finished expansion of article 00353 for version 1 run 1345f644-67ba-479d-8e54-65e7803c79c1 into 00353.1/1345f644-67ba-479d-8e54-65e7803c79c1",
                        "event-status": "end",
                        "event-timestamp": 1453921929,
                        "event-type": "Expand Article"
                    },
                    {
                        "event-message": "Finished applying version number to article 00353 for version 1 run 1345f644-67ba-479d-8e54-65e7803c79c1",
                        "event-status": "end",
                        "event-timestamp": 1453921930,
                        "event-type": "Apply Version Number"
                    },
                    {
                        "event-message": "XML converted to EIF for article 00353 to 00353.1/1345f644-67ba-479d-8e54-65e7803c79c1/elife-00353-v1.json",
                        "event-status": "end",
                        "event-timestamp": 1453921933,
                        "event-type": "Convert JATS"
                    },
                    {
                        "event-message": "Ending setting of publish status for 00353",
                        "event-status": "end",
                        "event-timestamp": 1453921935,
                        "event-type": "Set Publication Status"
                    },
                    {
                        "event-message": "Finished converting images for  003533 images processed ",
                        "event-status": "end",
                        "event-timestamp": 1453921942,
                        "event-type": "Resize Images"
                    },
                    {
                        "event-message": "Deposited assets for article 00353",
                        "event-status": "end",
                        "event-timestamp": 1453921945,
                        "event-type": "Deposit assets"
                    },
                    {
                        "event-message": "Finished submitting EIF for article  00353 status was 200",
                        "event-status": "end",
                        "event-timestamp": 1453921948,
                        "event-type": "Post EIF"
                    }
                ],
                "first-event-timestamp": 1453921927,
                "run-id": "1345f644-67ba-479d-8e54-65e7803c79c1",
                "run-number": "1",
                "version-number": "1"
            };
            var currentArticle = detail.getCurrentRun();
            expect(currentArticle).to.eql(result);
        });
        it('It should return false and populate detail.errors if queryParams has no versionNumber and runId', function () {
            detail.detail.article = data;
            detail.detail.queryParams = {"articleId": "00353", "versionNumber": null, "runId": null};
            var result = {
                status: config.errors.en.type.application,
                statusText: config.errors.en.incorrectInformation,
                message: config.errors.en.noRuns + ' (' + detail.detail.queryParams.runId + ')'
            };
            var currentRun = detail.getCurrentRun();
            expect(currentRun).to.be.false;
            expect(detail.detail.errors).to.eql(result);
        });
    });

    describe('renderArticle', function () {
        var renderDetailActionsStub;
        var getWindowPathnameStub;
        before(function () {
            getWindowPathnameStub = sinon.stub(detail, "getWindowPathname", function () {
                return '/article/00353/1/1345f644-67ba-479d-8e54-65e7803c79c1';
            });
            renderDetailActionsStub = sinon.stub(detail, "renderDetailActions", function () {
            });
        });
        after(function () {
            detail.resetParams();
            getWindowPathnameStub.restore();
            renderDetailActionsStub.restore();
            $('#article').empty();
        });
        it('if article and no errors - display article ', function () {
            detail.setArticleParams();
            detail.detail.article = data;
            detail.detail.currentArticle = detail.getCurrentArticle();
            detail.detail.currentEvents = detail.getCurrentRun();
            detail.renderArticle();
            var article = document.getElementById('article');
            var articleTitle = article.querySelector('.article__title');
            expect(articleTitle.innerHTML).to.equal('10.7554/eLife.00353');
        });
        it('if no article and errors display those errors on the page ', function () {
            detail.setArticleParams();
            detail.detail.article = null;
            detail.detail.errors = {
                status: config.errors.en.type.application,
                statusText: config.errors.en.incorrectInformation,
                message: config.errors.en.noVersions + ' (' + detail.detail.queryParams.versionNumber + ')'
            };
            detail.renderArticle();
            var article = document.getElementById('article');
            var articleStatus = article.querySelector('.status');
            var articleMessage = article.querySelector('.message');
            expect(articleStatus.innerHTML).to.equal(config.errors.en.incorrectInformation);
            expect(articleMessage.innerHTML).to.equal(config.errors.en.noVersions + ' (' + detail.detail.queryParams.versionNumber + ')');
        });
    });

    describe('getDetailActionsSuccess', function () {
        var renderDetailActionsStub;
        before(function () {
            renderDetailActionsStub = sinon.stub(detail, "renderDetailActions", function () {
            });
        });
        after(function () {
            renderDetailActionsStub.restore();
        });
        it('Render details if one result returned', function () {
            var data = {"articles": [{"article-identifier": "00353", published: false, scheduled: 0}]};
            var result = {"article-identifier": "00353", published: false, scheduled: 0}
            detail.getDetailActionsSuccess(data);
            expect(detail.detail.scheduleStatus).to.eql(result);
            expect(renderDetailActionsStub.called).to.be.true;
        });
    });

    describe('getDetailActionsError', function () {
        after(function () {
            $('#article').empty();
            $('#article-console').empty();
        });
        it('Show standard error', function () {
            var data = {
                statusCode: 400,
                statusText: config.errors.en.missingInformation,
                responseText: {
                    "message": config.errors.en.noArticleId
                }
            };
            detail.getDetailActionsError(data);
            var alertBox = document.querySelector('#error-message.getDetailActionsError');
            var statusResult = config.errors.en.missingInformation + '(' + config.errors.en.type.api + ')';
            var messageResult = config.errors.en.noArticleId;
            var alertStatus = alertBox.querySelector('.status');
            var alertMessage = alertBox.querySelector('.message');
            expect(alertStatus.innerHTML).to.eql(statusResult);
            expect(alertMessage.innerHTML).to.eql(messageResult);
        });
    });

    describe('renderDetailActions', function () {
        var getWindowPathnameStub;
        before(function () {
            getWindowPathnameStub = sinon.stub(detail, "getWindowPathname", function () {
                return '/article/00353/1/1345f644-67ba-479d-8e54-65e7803c79c1';
            });
        });
        after(function () {
            $('#article').empty();
            getWindowPathnameStub.restore();
            detail.resetParams();
        });
        it('Should only show reSchedule and cancel button along with date scheduled - if schedule status not empty and scheduled date is greater than 0', function () {
            $('#article').empty();
            detail.setArticleParams();
            detail.detail.article = data;
            detail.detail.currentArticle = detail.getCurrentArticle();
            detail.detail.currentEvents = detail.getCurrentRun();
            detail.detail.scheduleStatus = {"article-identifier": "00353", published: false, scheduled: 1471381200};
            detail.renderArticle();
            expect($('#article .scheduled-for').text()).to.equal('Scheduled for August 16, 2016 10:00pm');
            var scheduleBtn = $('.article-detail-actions .schedule-btn');
            var reScheduleBtn = $('.article-detail-actions .schedule-amend-btn');
            var cancelBtn = $('.article-detail-actions .schedule-cancel-btn');
            var publishBtn = $('.article-detail-actions .btn-publish');
            expect(scheduleBtn.length).to.equal(0);
            expect(reScheduleBtn.length).to.be.greaterThan(0);
            expect(cancelBtn.length).to.be.greaterThan(0);
            expect(publishBtn.length).to.equal(0);
        });
        it('Should show schedule and publish now button along with no date scheduled - if schedule status not empty and scheduled date is 0', function () {
            $('#article').empty();
            detail.setArticleParams();
            detail.detail.article = data;
            detail.detail.currentArticle = detail.getCurrentArticle();
            detail.detail.currentEvents = detail.getCurrentRun();
            detail.detail.scheduleStatus = {"article-identifier": "00353", published: false, scheduled: 0};
            detail.renderArticle();
            expect($('#article .scheduled-for').text()).to.be.empty;
            var scheduleBtn = $('.article-detail-actions .schedule-btn');
            var reScheduleBtn = $('.article-detail-actions .schedule-amend-btn');
            var cancelBtn = $('.article-detail-actions .schedule-cancel-btn');
            var publishBtn = $('.article-detail-actions .btn-publish');
            expect(scheduleBtn.length).to.be.greaterThan(0);
            expect(reScheduleBtn.length).to.equal(0);
            expect(cancelBtn.length).to.equal(0);
            expect(publishBtn.length).to.be.greaterThan(0);
        });
        it('Should only show publish now button along with no date scheduled - if schedule status is empty', function () {
            $('#article').empty();
            detail.setArticleParams();
            detail.detail.article = data;
            detail.detail.currentArticle = detail.getCurrentArticle();
            detail.detail.currentEvents = detail.getCurrentRun();
            detail.detail.scheduleStatus = [];
            detail.renderArticle();
            expect($('#article .scheduled-for').text()).to.be.empty;
            var scheduleBtn = $('.article-detail-actions .schedule-btn');
            var reScheduleBtn = $('.article-detail-actions .schedule-amend-btn');
            var cancelBtn = $('.article-detail-actions .schedule-cancel-btn');
            var publishBtn = $('.article-detail-actions .btn-publish');
            expect(scheduleBtn.length).to.equal(0);
            expect(reScheduleBtn.length).to.equal(0);
            expect(cancelBtn.length).to.equal(0);
            expect(publishBtn.length).to.be.greaterThan(0);
        });
    });

    describe('bindNavigationEvents & updateRun', function () {
        var renderDetailActionsStub;
        var getWindowPathnameStub;
        var detailPushStateStub;
        before(function () {
            getWindowPathnameStub = sinon.stub(detail, "getWindowPathname", function () {
                return '/article/00353/1/1345f644-67ba-479d-8e54-65e7803c79c1';
            });
            renderDetailActionsStub = sinon.stub(detail, "renderDetailActions", function () {
            });
            detailPushStateStub = sinon.stub(detail, "detailPushState");
        });
        after(function () {
            detail.resetParams();
            getWindowPathnameStub.restore();
            renderDetailActionsStub.restore();
            detailPushStateStub.restore();
            $('#article').empty();
        });
        it('Update url, rendered article and queryParams when new run selected', function () {
            var result = {
                articleId: "00353",
                versionNumber: "1",
                runId: "afa7d187-4fad-4286-aea4-3460adebfca7"
            };
            detail.setArticleParams();
            detail.detail.article = data;
            detail.detail.currentArticle = detail.getCurrentArticle();
            detail.detail.currentEvents = detail.getCurrentRun();
            detail.bindEvents();
            detail.renderArticle();
            $('a[data-version="1"][data-run="afa7d187-4fad-4286-aea4-3460adebfca7"]').click();
            expect(detailPushStateStub.called).to.be.true;
            expect(detail.detail.currUrl).to.equal('/article/00353/1/afa7d187-4fad-4286-aea4-3460adebfca7');
            expect(detail.detail.queryParams).to.eql(result);
        });
    });

    describe('updatePageUrl - all information provided', function () {
        var getUrlHashStub;
        var renderDetailActionsStub;
        var getWindowPathnameStub;
        var detailReplaceStateStub;
        before(function () {
            getWindowPathnameStub = sinon.stub(detail, "getWindowPathname", function () {
                return '/article/00353/1/1345f644-67ba-479d-8e54-65e7803c79c1';
            });
            getUrlHashStub = sinon.stub(detail, "getUrlHash", function () {
                return '/article/00353/1/1345f644-67ba-479d-8e54-65e7803c79c1';
            });
            renderDetailActionsStub = sinon.stub(detail, "renderDetailActions", function () {
            });
            detailReplaceStateStub = sinon.stub(detail, "detailReplaceState", function () {
            });
        });
        after(function () {
            detail.resetParams();
            getWindowPathnameStub.restore();
            getUrlHashStub.restore();
            renderDetailActionsStub.restore();
            detailReplaceStateStub.restore();
            $('#article').empty();
        });
        it('Should return the correct url', function () {
            detail.setArticleParams();
            detail.detail.article = data;
            detail.detail.currentArticle = detail.getCurrentArticle();
            detail.detail.currentEvents = detail.getCurrentRun();
            detail.renderArticle();
            console.log(detail.detail.currUrl);
            expect(detail.detail.currUrl).to.equal('/article/00353/1/1345f644-67ba-479d-8e54-65e7803c79c1');
        });
    });

    describe('updatePageUrl - only version provided', function () {
        var getUrlHashStub;
        var renderDetailActionsStub;
        var getWindowPathnameStub;
        var detailReplaceStateStub;
        before(function () {
            getWindowPathnameStub = sinon.stub(detail, "getWindowPathname", function () {
                return '/article/00353/1';
            });
            getUrlHashStub = sinon.stub(detail, "getUrlHash", function () {
                return '/article/00353/1';
            });
            renderDetailActionsStub = sinon.stub(detail, "renderDetailActions", function () {
            });
            detailReplaceStateStub = sinon.stub(detail, "detailReplaceState", function () {
            });
        });
        after(function () {
            detail.resetParams();
            getWindowPathnameStub.restore();
            getUrlHashStub.restore();
            renderDetailActionsStub.restore();
            detailReplaceStateStub.restore();
            $('#article').empty();
        });
        it('Should return the last run of the provided run', function () {
            detail.setArticleParams();
            detail.detail.article = data;
            detail.detail.currentArticle = detail.getCurrentArticle();
            detail.detail.currentEvents = detail.getCurrentRun();
            detail.renderArticle();
            console.log(detail.detail.currUrl);
            expect(detail.detail.currUrl).to.equal('/article/00353/1/afa7d187-4fad-4286-aea4-3460adebfca7');
        });
    });

    describe('updatePageUrl - no information provided', function () {
        var getUrlHashStub;
        var renderDetailActionsStub;
        var getWindowPathnameStub;
        var detailReplaceStateStub;
        before(function () {
            getWindowPathnameStub = sinon.stub(detail, "getWindowPathname", function () {
                return '/article/00353';
            });
            getUrlHashStub = sinon.stub(detail, "getUrlHash", function () {
                return '/article/00353';
            });
            renderDetailActionsStub = sinon.stub(detail, "renderDetailActions", function () {
            });
            detailReplaceStateStub = sinon.stub(detail, "detailReplaceState", function () {
            });
        });
        after(function () {
            detail.resetParams();
            getWindowPathnameStub.restore();
            getUrlHashStub.restore();
            renderDetailActionsStub.restore();
            detailReplaceStateStub.restore();
            $('#article').empty();
        });
        it('Should return the url of the last run of the last version', function () {
            detail.setArticleParams();
            detail.detail.article = data;
            detail.detail.currentArticle = detail.getCurrentArticle();
            detail.detail.currentEvents = detail.getCurrentRun();
            detail.renderArticle();
            console.log(detail.detail.currUrl);
            expect(detail.detail.currUrl).to.equal('/article/00353/2/afa7d187-4fad-4286-aea4-3460adebfca7');
        });
    });

});

