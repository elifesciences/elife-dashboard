var options = {
    debug: true,
    logLevel: 'silent'
};
var config = require('config')(options);
var $ = require('jquery');
var Handlebars = require('handlebars');
var template = require('../js/templates');
var Swag = require('../libs/swag.js');
var publish = require('../js/services/publish.js')(config);
Swag.registerHelpers(Handlebars);

function check(done, f) {
    try {
        f();
        done();
    } catch (e) {
        done(e);
    }
}

//component to be tested
describe('Publication', function () {
    'use strict';
    var mock = '';

    before(function () {
        // runs before all tests in this block
        publish.init();
        this.$publishNowBtn = $('<button type="button" data-action="publish" data-article-title="10.7554/eLife.10856" data-article-doi="10.7554/eLife.10856" data-article-id="10856" data-article-version="2" data-article-run="6805bed5-3416-4cba-9960-d897a64c9320">Publish Now</button>');
        $('body').append(template['current/article']);
    });

    it('publish should exist', function () {
        expect(publish).to.be.an('object');
    });

    describe('initModal()', function () {
        it('Should make button text plural if isMultiple true', function () {
            publish.initModal(true);
            expect(document.getElementById('articles-queue').innerHTML).to.be.empty;
            expect(document.getElementById('publish-action').innerHTML).to.equal('Publish All');
        });
        it('Should make button text singular if isMultiple false', function () {
            publish.initModal();
            expect(document.getElementById('articles-queue').innerHTML).to.be.empty;
            expect(document.getElementById('publish-action').innerHTML).to.equal('Publish');
        });
    });

    describe('populateQueue() before publishing', function () {
        it('Should add an object to the queue if publish now is true', function () {
            var result = [{
                id: '10856',
                version: '2',
                run: '6805bed5-3416-4cba-9960-d897a64c9320',
                doi: '10.7554/eLife.10856'
            }];
            publish.populateQueue(this.$publishNowBtn, true);
            expect(publish.data.queued).to.eql(result)
        });
        it('Should add an object to the queue if its not already in there', function () {
            publish.data.queued = [{id: '12345', version: '1', run: '6789'}];
            var result = [{id: '12345', version: '1', run: '6789'}, {
                id: '10856',
                version: '2',
                run: '6805bed5-3416-4cba-9960-d897a64c9320',
                doi: '10.7554/eLife.10856'
            }];
            publish.populateQueue(this.$publishNowBtn);
            expect(publish.data.queued).to.eql(result)
        });
        it('Should remove an object from the queue if its in there', function () {
            publish.data.queued = [{
                id: '10856',
                version: '2',
                run: '6805bed5-3416-4cba-9960-d897a64c9320',
                doi: '10.7554/eLife.10856'
            }];
            var result = [];
            publish.populateQueue(this.$publishNowBtn);
            expect(publish.data.queued).to.eql(result)
        });

    });

    describe('displayQueueList()', function () {
        before(function () {
            publish.populateQueue(this.$publishNowBtn, true);
        });
        it('Should render the correct list of items', function () {
            var result = '<ol id="articles-queue"><li>10.7554/eLife.10856</li></ol>';
            publish.displayQueueList();
            expect(document.getElementById('articles-queue').outerHTML).to.equal(result);
        });
    });

    describe('updatePublishModal()', function () {
        it('Should disable modal publish button and set isPublishing to true', function () {
            publish.updatePublishModal();
            var publishActionClasses = document.getElementById('publish-action').className;
            expect(/disabled/.test(publishActionClasses)).to.be.true;
            expect(publish.data.isPublishing).to.be.true;

        });
        after(function () {
            publish.data.isPublishing = false;
        });
    });

    describe('updateQueueListStatus()', function () {
        before(function () {
            publish.populateQueue(this.$publishNowBtn, true);
            publish.displayQueueList();
        });
        it('Should display danger icon on error', function () {
            var article = {
                "id": "10670",
                "message": "",
                "publication-status": "error",
                "run": "21833c1c-4a26-4a78-ae3c-95ff9c96219c",
                "version": "2"
            };
            publish.updateQueueListStatus(article);
            var queue = document.getElementById('article-' + article.id);
            var classes = ['fa', 'e-icon', 'sm', 'danger', 'fa-times'];
            for (var i = 0; i < classes.length; i++) {
                expect(queue.getElementsByClassName('status-icon')[0].classList.contains(classes[i])).to.be.true;
            }
        });
        it('Should display danger icon on error', function () {
            var article = {
                "id": "10670",
                "message": "",
                "publication-status": "published",
                "run": "21833c1c-4a26-4a78-ae3c-95ff9c96219c",
                "version": "2"
            };
            publish.updateQueueListStatus(article);
            var queue = document.getElementById('article-' + article.id);
            var classes = ['fa', 'e-icon', 'sm', 'success', 'fa-check'];
            for (var i = 0; i < classes.length; i++) {
                expect(queue.getElementsByClassName('status-icon')[0].classList.contains(classes[i])).to.be.true;
            }
        });
        it('Should display danger icon on ready to publish', function () {
            var article = {
                "id": "10670",
                "message": "",
                "publication-status": "ready to publish",
                "run": "21833c1c-4a26-4a78-ae3c-95ff9c96219c",
                "version": "2"
            };
            publish.updateQueueListStatus(article);
            var queue = document.getElementById('article-' + article.id);
            var classes = ['throbber-loader', 'throbber-loader--small'];
            for (var i = 0; i < classes.length; i++) {
                expect(queue.getElementsByClassName('status-icon')[0].classList.contains(classes[i])).to.be.true;
            }
        });
        it('Should display danger icon on queued', function () {
            var article = {
                "id": "10670",
                "message": "",
                "publication-status": "queued",
                "run": "21833c1c-4a26-4a78-ae3c-95ff9c96219c",
                "version": "2"
            };
            publish.updateQueueListStatus(article);
            var queue = document.getElementById('article-' + article.id);
            var classes = ['throbber-loader', 'throbber-loader--small'];
            for (var i = 0; i < classes.length; i++) {
                expect(queue.getElementsByClassName('status-icon')[0].classList.contains(classes[i])).to.be.true;
            }
        });
        it('Should display a message if one is returned', function () {
            var article = {
                "id": "10670",
                "message": "Detailed error message",
                "publication-status": "ready to publish",
                "run": "21833c1c-4a26-4a78-ae3c-95ff9c96219c",
                "version": "2"
            };
            publish.updateQueueListStatus(article);
            var queue = document.getElementById('article-' + article.id);
            var queueMessage = queue.getElementsByClassName('status-message')[0];
            expect(queueMessage.innerHTML).to.equal('Ready to publish: Detailed error message');
        });
    });

    describe('refreshPage()', function () {
        var reloadPageStub;
        var resetModalButtonsSpy;
        beforeEach(function () {
            reloadPageStub = sinon.stub(publish, "reloadPage");
            resetModalButtonsSpy = sinon.spy(publish, "resetModalButtons");
        });
        it('If no publish action occurred - reset the modal buttons', function () {
            publish.data.isPublishing = false;
            publish.data.isAllPublished = false;
            publish.refreshPage();
            expect(resetModalButtonsSpy.calledOnce).to.be.true;
        });
        it('If publish action occurred - if ispublishing true - reload page', function () {
            publish.data.isPublishing = true;
            publish.refreshPage();
            expect(reloadPageStub.called).to.be.true;
        });
        it('If publish action occurred - if isallpublished true - reload page', function () {
            publish.data.isAllPublished = true;
            publish.refreshPage();
            expect(reloadPageStub.called).to.be.true;
        });
        afterEach(function () {
            publish.data.isPublishing = false;
            publish.data.isAllPublished = false;
            reloadPageStub.restore();
            resetModalButtonsSpy.restore();
        });
    });

    describe('resetModalButtons()', function () {
        beforeEach(function () {
            publish.initModal();
            publish.populateQueue(this.$publishNowBtn, true);
            publish.updatePublishModal();
            publish.resetModalButtons();
        });
        it('If no publish action is taken it should re-enable publish-action', function () {
            var publishAction = document.getElementById('publish-action');
            var publishActionClasses = publishAction.classList;
            expect(publishAction.disabled).to.be.false;
            expect(publishActionClasses.contains('disabled')).to.be.false;
        });
        it('If no publish action is taken it should empty articles-queue', function () {
            var articleQueue = document.getElementById('articles-queue');
            expect(articleQueue.innerHTML).to.be.empty;
        });
        it('If no publish action is taken it should empty publish.queued', function () {
            expect(publish.data.queued).to.be.empty;
        });
        afterEach(function () {
            publish.data.isPublishing = false;
        });
    });

    describe('queueArticlesError()', function () {
        it('Should display standard error alert and error debug alert', function () {
            var data = {
                statusCode: 400,
                statusText: "Error Occurred",
                responseText: {
                    "message": "I'm afraid I can't do that Dave",
                    "detail": "I'm afraid I can't do that Dave",
                }
            };
            publish.queueArticlesError(data);
            var alertBox = document.querySelector('#error-message.queueArticlesError');
            var statusResult = 'Error Occurred(API Error)';
            var messageResult = 'I\'m afraid I can\'t do that Dave';
            var alertStatus = alertBox.querySelector('.status');
            var alertMessage = alertBox.querySelector('.message');
            expect(alertStatus.innerHTML).to.eql(statusResult);
            expect(alertMessage.innerHTML).to.eql(messageResult);
        });
    });

    describe('checkingStatusError()', function () {
        beforeEach(function () {
            publish.checkingStatusError({responseText: {"message": "I'm afraid I can't do that Dave"}});
        });
        it('Should display standard error alert and error debug alert', function () {
            var result = "I'm afraid I can't do that Dave";
            var alertBox = document.querySelector('#error-message.checkingStatusError');
            var alertMessage = alertBox.querySelector('.message');
            expect(alertMessage.innerHTML).to.equal(result);
        });
        it('Should set is publishing to false', function () {
            expect(publish.data.isPublishing).to.be.false;
        });
        afterEach(function () {
            publish.data.isPublishing = false;
        });
    });

    describe('checkingStatusSuccess()', function () {
        var finishPublishingSpy;
        var pollQueueSpy;
        beforeEach(function () {
            finishPublishingSpy = sinon.spy(publish, "finishPublishing");
            pollQueueSpy = sinon.spy(publish, "pollQueue");
        });
        it('If any still queued should call pollQueue containing only queued items', function (done) {
            publish.checkingStatusSuccess({
                "articles": [{
                    "doi": "10.7554/elife.005583",
                    "id": "0028983",
                    "message": "I'm afraid I can't do that Dave",
                    "publication-status": "error",
                    "run": "def",
                    "version": "2"
                }, {
                    "doi": "10.1234/elife.12342",
                    "id": "11244323",
                    "message": "I'm afraid I can't do that Dave",
                    "publication-status": "queued",
                    "run": "def",
                    "version": "2"
                }]
            });
            var pollQueueArgs = [[{
                "doi": "10.1234/elife.12342",
                "id": "11244323",
                "message": "I'm afraid I can't do that Dave",
                "publication-status": "queued",
                "run": "def",
                "version": "2"
            }]];
            setTimeout(function () {
                check(done, function () {
                    expect(pollQueueSpy.calledOnce).to.be.true;
                    expect(pollQueueSpy.args[0]).to.eql(pollQueueArgs);
                });
            }, publish.data.publishInterval + 200);
        });
        it('Should call finishPublishing if all errors', function () {
            publish.checkingStatusSuccess({
                "articles": [{
                    "doi": "10.7554/elife.005583",
                    "id": "0028983",
                    "message": "I'm afraid I can't do that Dave",
                    "publication-status": "error",
                    "run": "def",
                    "version": "2"
                }]
            });
            expect(finishPublishingSpy.calledOnce).to.be.true;
        });
        it('Should call finishPublishing if all published', function () {
            publish.checkingStatusSuccess({
                "articles": [{
                    "doi": "10.7554/elife.005583",
                    "id": "0028983",
                    "message": "I'm afraid I can't do that Dave",
                    "publication-status": "published",
                    "run": "def",
                    "version": "2"
                }]
            });
            expect(finishPublishingSpy.calledOnce).to.be.true;
        });
        it('Should call finishPublishing and display error if max polls reached', function () {
            publish.data.queuePolled = publish.data.pollLimit;
            publish.checkingStatusSuccess({
                "articles": [{
                    "doi": "10.7554/elife.005583",
                    "id": "0028983",
                    "message": "I'm afraid I can't do that Dave",
                    "publication-status": "queued",
                    "run": "def",
                    "version": "2"
                }]
            });
            var finishPublishArgs = [{error: config.errors.en.maxPollsReached, ref: 'max-polls'}];
            expect(finishPublishingSpy.args[0]).to.eql(finishPublishArgs);
            expect(finishPublishingSpy.calledOnce).to.be.true;
            var result = config.errors.en.maxPollsReached;
            var alertBox = document.querySelector('#error-message.max-polls');
            var alertMessage = alertBox.querySelector('.message');
            expect(alertMessage.innerHTML).to.equal(result);
        });
        afterEach(function () {
            finishPublishingSpy.restore();
            pollQueueSpy.restore();
            publish.data.queuePolled = 0;
        });
    });

    describe('finishPublishing()', function () {
        it('Should set status variables', function () {
            publish.finishPublishing();
            expect(publish.data.isPublishing).to.be.false;
            expect(publish.data.isAllPublished).to.be.true;
        });
        it('Should display an error if data returned', function () {
            publish.finishPublishing({error: config.errors.en.maxPollsReached, info: 'max-polls'});
            var result = config.errors.en.maxPollsReached;
            var alertBox = document.querySelector('#error-message.max-polls');
            var alertMessage = alertBox.querySelector('.message');
            expect(alertMessage.innerHTML).to.equal(result);
        });
        afterEach(function () {
            publish.data.isPublishing = false;
            publish.data.isAllPublished = false;
        });
    });

});

