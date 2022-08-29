var options = {
    debug: true,
    logLevel: 'silent'
};
var config = require('config')(options);
require('fullcalendar');
var $ = require('jquery');
var moment = require('moment');
global.$ = $;
global.jQuery = $;
var bootstrap = require('bootstrap-sass');
var schedule = require('../js/services/schedule.js')(config);

//component to be tested
describe('Schedule', function () {
    'use strict';
    var $scheduleBtn;
    var $reScheduleBtn;
    var $cancelScheduleBtn;
    var $futureScheduleBtn;
    var picker;

    before(function () {
        // runs before all tests in this block
        schedule.init();

        $scheduleBtn = $('<button class="schedule schedule-btn" data-action-type="schedule" id="schedule-10856" data-toggle="modal" data-target="#schedule-modal" data-article-id="10856" data-title="Schedule Article" ></button>');
        $reScheduleBtn = $('<button class="schedule-amend-btn" data-action-type="schedule-amend" id="schedule-amend-10856" data-toggle="modal" data-target="#schedule-modal" data-article-id="10856" data-title="Re-schedule Article" data-scheduled="1465333200"></button>');
        $cancelScheduleBtn = $('<button class="schedule-cancel-btn" data-action-type="schedule-cancel" id="schedule-cancel-10856" data-toggle="modal" data-target="#schedule-modal" data-article-id="10856"  data-article-doi="10.7554/eLife.10856" data-title="Cancel Schedule"></button>');
        $futureScheduleBtn = $('<button class="schedule-future" data-action-type="future-schedule" id="future-schedule-10856" data-toggle="modal" data-target="#schedule-modal" data-title="Add Scheduled Article"></button>');

        $('body').append($scheduleBtn);
        $('body').append($reScheduleBtn);
        $('body').append($cancelScheduleBtn);
        $('body').append($futureScheduleBtn);
    });

    it('Schedule should exist', function () {
        expect(schedule).to.be.an('object');
    });

    describe('Schedule setParameters()', function() {
        before(function() {
            $scheduleBtn.click();
        });
        after(function() {
            $('#schedule-modal').modal('hide');
        });
        it('Should update schedule parameters', function() {
            expect(schedule.data.articleId).to.equal('10856');
            expect(schedule.data.scheduleActionType).to.equal('schedule');
        });
        it('Should update the template to reflect action type', function() {
            var btnClose = $('#schedule-modal #schedule-close');
            var btnAction = $('#schedule-modal #schedule-action');
            //console.log(btnClose);
            expect(btnClose[0].innerHTML).to.equal('Close');
            expect(btnAction[0].innerHTML).to.equal('Schedule');
            expect(btnClose).to.not.be.null;
            expect(btnAction).to.not.be.null;
        });
    });

    describe('Reschedule setParameters()', function() {
        before(function() {
            $reScheduleBtn.click();
        });
        after(function() {
            $('#schedule-modal').modal('hide')
        });
        it('Should update schedule parameters', function() {
            expect(schedule.data.articleId).to.equal('10856');
            expect(schedule.data.articleScheduled).to.equal('1465333200');
            expect(schedule.data.scheduleActionType).to.equal('schedule-amend');
        });
        it('Should update the template to reflect action type', function() {
            var btnClose = document.querySelector('#schedule-modal .modal-footer #schedule-close');
            var btnAction = document.querySelector('#schedule-modal .modal-footer #schedule-action');
            expect(btnClose.innerHTML).to.equal('Close');
            expect(btnAction.innerHTML).to.equal('Schedule');
            expect(btnClose).to.not.be.null;
            expect(btnAction).to.not.be.null;
        });
    });

    describe('Future schedule setParameters()', function() {
        before(function() {
            $futureScheduleBtn.click();
        });
        after(function() {
            $('#schedule-modal').modal('hide')
        });
        it('Should update schedule parameters', function() {
            expect(schedule.data.articleId).to.be.false;
            expect(schedule.data.articleScheduled).to.be.false;
            expect(schedule.data.scheduleActionType).to.equal('future-schedule');
        });
        it('Should update the template to reflect action type', function() {
            var btnClose = document.querySelector('#schedule-modal .modal-footer #schedule-close');
            var btnAction = document.querySelector('#schedule-modal .modal-footer #schedule-action');
            expect(btnClose.innerHTML).to.equal('Close');
            expect(btnAction.innerHTML).to.equal('Schedule');
            expect(btnClose).to.not.be.null;
            expect(btnAction).to.not.be.null;

            var scheduleModal = document.getElementById('schedule-modal');
            var scheduleIdInput = scheduleModal.querySelector('#schedule-id');
            expect(scheduleIdInput).to.not.be.null; // fails because wrong action type being set
        });
    });

    describe('Cancel setParameters()', function() {
        before(function() {
            $cancelScheduleBtn.click();
        });
        after(function() {
            $('#schedule-modal').modal('hide');
        });
        it('Should update schedule parameters', function() {
            expect(schedule.data.articleId).to.equal('10856');
            expect(schedule.data.scheduleActionType).to.equal('schedule-cancel');
        });
        it('Should update the template to reflect action type', function() {
            var btnNo = document.querySelector('#schedule-modal .modal-footer #schedule-close');
            var btnYes = document.querySelector('#schedule-modal .modal-footer #schedule-cancel-btn');
            expect(btnNo.innerHTML).to.equal('No');
            expect(btnYes.innerHTML).to.equal('Yes');
            expect(btnYes).to.not.be.null;
            expect(btnNo).to.not.be.null;

            var cancelInfo = document.querySelector('#schedule-modal .schedule-cancel-container');
            expect(cancelInfo).to.not.be.null;
        });
    });

    describe('Schedule setModalTitle()', function() {
        before(function() {
            $scheduleBtn.click();
        });
        after(function() {
            $('#schedule-modal').modal('hide')
        });
        it('Should update the title of the modal', function() {
            var title = document.getElementById('schedule-modal').querySelector('.modal-title').innerHTML;
            expect(title).to.equal('Schedule Article');
        });
    });

    describe('Reschedule setModalTitle()', function() {
        before(function() {
            $reScheduleBtn.click();
        });
        after(function() {
            $('#schedule-modal').modal('hide')
        });
        it('Should update the title of the modal', function() {
            var title = document.getElementById('schedule-modal').querySelector('.modal-title').innerHTML;
            expect(title).to.equal('Re-schedule Article');
        });
    });

    describe('Future schedule setModalTitle()', function() {
        before(function() {
            $futureScheduleBtn.click();
        });
        after(function() {
            $('#schedule-modal').modal('hide')
        });
        it('Should update the title of the modal', function() {
            var title = document.getElementById('schedule-modal').querySelector('.modal-title').innerHTML;
            expect(title).to.equal('Add Scheduled Article');
        });
    });

    describe('Cancel setModalTitle()', function() {
        before(function() {
            $cancelScheduleBtn.click();
        });
        after(function() {
            $('#schedule-modal').modal('hide');
        });
        it('Should update the title of the modal', function() {
            var title = document.getElementById('schedule-modal').querySelector('.modal-title').innerHTML;
            expect(title).to.equal('Cancel Schedule');
        });
    });

    describe('initDatetime()', function() {
        before(function() {
            $reScheduleBtn.click();
            picker = $('.datepicker').pickadate( 'picker' );
        });
        after(function() {
            $('#schedule-modal').modal('hide');
            schedule.resetParameters();
        });
        it('Should render a date picker on the page', function() {
            expect(picker).to.not.be.undefined;
        });
        it('When given scheduled date - fields should show correct date', function() {
            expect(picker.get('value')).to.equal('June 7, 2016');
            // date comes from epoch on $reScheduleBtn
        });
        it('When changed update the scheduleDate and validate form', function() {
            picker.set('select', [2000, 2, 1]);
            expect(schedule.data.scheduleDate).to.equal(951868800000); //01 Mar 2000
        });
    });

    describe('setTime', function() {
        before(function() {
            $futureScheduleBtn.click();
            picker = $('.datepicker').pickadate( 'picker' );
        });
        after(function() {
            $('#schedule-modal').modal('hide');
            schedule.resetParameters();
        });
        it('If hours and minutes but no date set scheduleTime', function() {
            var $scheduleField = $('#schedule-modal .schedule-field');
            var $hour = $('#schedule-modal .hourpicker');
            var $min = $('#schedule-modal .minutepicker');
            var $ampm = $('#schedule-modal .ampmpicker');
            $hour.val('01');
            $min.val('30');
            $ampm.val('am');
            $scheduleField.trigger('change');
            expect(schedule.data.scheduleTime).to.equal('01:30 am');
            expect(schedule.data.scheduleDate).to.be.null;
        });
        it('If scheduleTime and scheduleDate - set scheduleDateTime', function() {
            var $scheduleField = $('#schedule-modal .schedule-field');
            var $hour = $('#schedule-modal .hourpicker');
            var $min = $('#schedule-modal .minutepicker');
            var $ampm = $('#schedule-modal .ampmpicker');
            $hour.val('01');
            $min.val('30');
            $ampm.val('am');
            picker.set('select', [2000, 2, 1]);
            $scheduleField.trigger('change');
            expect(schedule.data.scheduleTime).to.equal('01:30 am');
            expect(schedule.data.scheduleDate).to.equal(951868800000); //01 Mar 2000
            expect(schedule.data.scheduleDateTime).to.be.instanceOf(moment);
            expect(schedule.data.scheduleDateTime.unix()).to.equal(951874200); //01 Mar 2000 1:30am
        });
    });

    describe('updateModal', function() {
        before(function() {
            $cancelScheduleBtn.click();
        });
        after(function() {
            $('#schedule-modal').modal('hide');
        });
        it('Update modal cancel info', function() {
            var doi = document.querySelector('.schedule-cancel-btn').getAttribute('data-article-doi');
            var articleCancelInfo = document.querySelector('.schedule-cancel-container .article-cancel-info').innerHTML;
            expect(doi).to.equal(articleCancelInfo); //10.7554/eLife.10856
        });
    });

    describe('padInput', function() {
        before(function() {
            $scheduleBtn.click();
        });
        after(function() {
            $('#schedule-modal').modal('hide');
        });
        it('Pad any numbers < 10 with 0\'s', function() {
            var hour = $('#schedule-modal .hourpicker');
            hour.val('1');
            hour.trigger('change');
            expect(hour.val()).to.equal('01');
            hour.val('10');
            hour.trigger('change');
            expect(hour.val()).to.equal('10');
        });
    });

    describe('loopPicker', function() {
        it('Check that the numbers loop correctly', function() {
            var hour = $('#schedule-modal .hourpicker');
            hour.val('13');
            hour.trigger('change');
            expect(hour.val()).to.equal('01');
            hour.val('0');
            hour.trigger('change');
            expect(hour.val()).to.equal('12');

        });
    });

    describe('validateForm', function() {
        before(function() {
            $scheduleBtn.click();
            picker = $('.datepicker').pickadate( 'picker' );
        });
        after(function() {
            $('#schedule-modal').modal('hide');
        });
        it('Should return true if valid', function(){
            var $hour = $('#schedule-modal .hourpicker');
            var $min = $('#schedule-modal .minutepicker');
            var $ampm = $('#schedule-modal .ampmpicker');
            var $scheduleField = $('#schedule-modal #schedule-id').val('1234');
            $hour.val('01');
            $min.val('30');
            $ampm.val('am');
            $scheduleField.val('1234');
            picker.set('select', [3000, 2, 1]);
            var valid = schedule.validateForm();
            expect(valid).to.be.true;
        });
        it('Should return false if invalid', function(){
            var $hour = $('#schedule-modal .hourpicker');
            var $min = $('#schedule-modal .minutepicker');
            var $ampm = $('#schedule-modal .ampmpicker');
            var $scheduleField = $('#schedule-modal #schedule-id').val('1234');
            $hour.val('01');
            $min.val('30');
            $ampm.val('am');
            $scheduleField.val('1234aaa');
            picker.set('select', [2000, 2, 1]);
            var valid = schedule.validateForm();
            expect(valid).to.be.false;
        });
    });

    describe('checkScheduledTimeValid', function() {
        before(function() {
            $scheduleBtn.click();
            picker = $('.datepicker').pickadate( 'picker' );
        });
        after(function() {
            $('#schedule-modal').modal('hide');
        });
        it('If no hour minute or date - false', function() {
            var $hour = $('#schedule-modal .hourpicker');
            var $min = $('#schedule-modal .minutepicker');
            var $ampm = $('#schedule-modal .ampmpicker');
            var $scheduleField = $('#schedule-modal #schedule-id').val('1234');
            $hour.val('');
            $min.val('');
            $ampm.val('');
            picker.$node.val(''); // clear the input value
            picker.stop().start(); // restart the picker
            schedule.validateForm();
            expect(schedule.checkScheduledTimeValid()).to.be.false;
        });
        it('If another method has deemed it invalid (has class validation-error) return false', function() {
            var $hour = $('#schedule-modal .hourpicker');
            var $min = $('#schedule-modal .minutepicker');
            var $ampm = $('#schedule-modal .ampmpicker');
            var $scheduleField = $('#schedule-modal #schedule-id').val('1234');
            $hour.val('13');
            $min.val('30');
            $ampm.val('am');
            picker.$node.val(''); // clear the input value
            picker.stop().start(); // restart the picker
            schedule.validateForm();
            expect(schedule.checkScheduledTimeValid()).to.be.false;
        });
        it('If the current time is after the input time return true', function() {
            var $hour = $('#schedule-modal .hourpicker');
            var $min = $('#schedule-modal .minutepicker');
            var $ampm = $('#schedule-modal .ampmpicker');
            var $scheduleField = $('#schedule-modal #schedule-id').val('1234');
            $hour.val('01');
            $min.val('30');
            $ampm.val('am');
            picker.set('select', [3000, 2, 1]);
            schedule.validateForm();
            expect(schedule.checkScheduledTimeValid()).to.be.true;
        });
        it('If the current time is before the input time return false', function() {
            var $hour = $('#schedule-modal .hourpicker');
            var $min = $('#schedule-modal .minutepicker');
            var $ampm = $('#schedule-modal .ampmpicker');
            var $scheduleField = $('#schedule-modal #schedule-id').val('1234');
            $hour.val('01');
            $min.val('30');
            $ampm.val('am');
            picker.set('select', [2000, 2, 1]);
            schedule.validateForm();
            expect(schedule.checkScheduledTimeValid()).to.be.false;
        });
    });

    describe('performSchedule', function() {
        afterEach(function() {
            $('#schedule-modal').modal('hide');
        });
        it('If action type schedule', function() {
            $scheduleBtn.click();
            picker = $('.datepicker').pickadate( 'picker' );
            var result  = {article: {'article-identifier': "10856", scheduled: "32508783000" }};
            var $scheduleField = $('#schedule-modal .schedule-field');
            var $hour = $('#schedule-modal .hourpicker');
            var $min = $('#schedule-modal .minutepicker');
            var $ampm = $('#schedule-modal .ampmpicker');
            $hour.val('01');
            $min.val('30');
            $ampm.val('am');
            picker.set('select', [3000, 2, 1]);
            $scheduleField.trigger('change');
            schedule.performSchedule();
            expect(schedule.data.scheduleData).to.eql(result);
            expect(schedule.data.scheduleActionType).to.eql('schedule');
        });
        it('If action type re-schedule', function() {
            $reScheduleBtn.click();
            picker = $('.datepicker').pickadate( 'picker' );
            var result  = {article: {'article-identifier': "10856", scheduled: "32508783000" }};
            var $scheduleField = $('#schedule-modal .schedule-field');
            var $hour = $('#schedule-modal .hourpicker');
            var $min = $('#schedule-modal .minutepicker');
            var $ampm = $('#schedule-modal .ampmpicker');
            $hour.val('01');
            $min.val('30');
            $ampm.val('am');
            picker.set('select', [3000, 2, 1]);
            $scheduleField.trigger('change');
            schedule.performSchedule();
            expect(schedule.data.scheduleData).to.eql(result);
            expect(schedule.data.scheduleActionType).to.eql('schedule-amend');
        });

        it('If action type future schedule', function() {
            $futureScheduleBtn.click();
            picker = $('.datepicker').pickadate( 'picker' );
            var result  = {article: {'article-identifier': "10856", scheduled: "32508783000" }};
            var $scheduleField = $('#schedule-modal .schedule-field');
            var $hour = $('#schedule-modal .hourpicker');
            var $min = $('#schedule-modal .minutepicker');
            var $ampm = $('#schedule-modal .ampmpicker');
            $hour.val('01');
            $min.val('30');
            $ampm.val('am');
            picker.set('select', [3000, 2, 1]);
            $scheduleField.trigger('change');
            schedule.performSchedule();
            expect(schedule.data.scheduleData).to.eql(result);
            expect(schedule.data.scheduleActionType).to.eql('future-schedule');
        });
        it('If action type cancel', function() {
            $cancelScheduleBtn.click();
            picker = $('.datepicker').pickadate( 'picker' );
            var result  = {article: {'article-identifier': "10856", scheduled: false }};
            schedule.performSchedule();
            expect(schedule.data.scheduleData).to.eql(result);
            expect(schedule.data.scheduleActionType).to.eql('schedule-cancel');
        });
    });

    describe('scheduleArticlePublicationSuccess', function(){
        after(function(){
            schedule.resetParameters();
            schedule.data.isScheduling = false;
            schedule.data.isAllScheduled = false;
            $('#schedule-modal').modal('hide');
        });
        it('scheduleArticlePublicationSuccess', function(){
            var data = {result: "success"};
            schedule.scheduleArticlePublicationSuccess(data);
            expect($('#schedule-modal #schedule-close').text()).to.eql('Close');
            expect(schedule.data.isScheduling).to.be.false;
            expect(schedule.data.isAllScheduled).to.be.true;
        });
        it('Should display schedule success alert', function () {
            schedule.data.scheduleActionType = 'schedule';
            var data = {result: "success"};
            schedule.scheduleArticlePublicationSuccess(data);
            var alertBox = document.querySelector('#success-message');
            var messageResult = 'Your article has been successfully scheduled.';
            var alertMessage = alertBox.querySelector('.message');
            expect(alertMessage.innerHTML).to.eql(messageResult);
        });
        it('Should display schedule cancellation success alert', function () {
            schedule.data.scheduleActionType = 'schedule-cancel';
            var data = {result: "success"};
            schedule.scheduleArticlePublicationSuccess(data);
            var alertBox = document.querySelector('#success-message');
            var messageResult = 'This article has been unscheduled.';
            var alertMessage = alertBox.querySelector('.message');
            expect(alertMessage.innerHTML).to.eql(messageResult);
        });
    });

    describe('scheduleArticlePublicationError', function(){
        it('Should display standard error alert and error debug alert', function () {
            var data = {
                statusCode: 400,
                statusText: "Error Occurred",
                responseText: {
                    "message": "I'm afraid I can't do that Dave",
                    "detail": "I'm afraid I can't do that Dave",
                }
            };
            schedule.scheduleArticlePublicationError(data);
            var alertBox = document.querySelector('#error-message.scheduleArticlePublicationError');
            var statusResult = 'Error Occurred(API Error)';
            var messageResult = 'I\'m afraid I can\'t do that Dave';
            var alertStatus = alertBox.querySelector('.status');
            var alertMessage = alertBox.querySelector('.message');
            expect(alertStatus.innerHTML).to.eql(statusResult);
            expect(alertMessage.innerHTML).to.eql(messageResult);
        });
    });

    describe('refreshPage - scheduled page', function() {
        before(function(){
            var $scheduledPage = '<div class="scheduled-page calendar-view"></div>';
            $('body').append($scheduledPage);
        });
        after(function(){
            schedule.resetParameters();
            $('.scheduled-page').remove();
        });
        it('On the scheduled page and there is a scheduled date (ie not cancellation) and calendar view is active and the scheduled datetime is not on the calendar  - reload', function() {
            this.timeout(15000);
            schedule.data.scheduleDateTime = 951874200; // Wed, 01 Mar 2000 01:30:00 GMT
            $('.scheduled-page').addClass('calendar-view');

            $('body').append('<div id="schedule-calendar"></div>');
            $('#schedule-calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                timeFormat: 'h:mma',
                firstDay: 1,
                aspectRatio: 2,
                defaultView: 'agendaDay',
                fixedWeekCount: false,
                editable: false,
                lazyFetch: false,
                defaultDate: '1999-01-01'
            });
            schedule.refreshPage();
            expect(moment.unix($('#schedule-calendar').fullCalendar('getDate')).format('X')).to.eql('951874200');
        });

    });

    describe('refreshPage - not on scheduled page', function() {
        var reloadPageStub;
        var resetParametersSpy;
        before(function(){
            reloadPageStub = sinon.stub(schedule, "reloadPage");
            resetParametersSpy = sinon.spy(schedule, "resetParameters");
        });
        after(function(){
            schedule.resetParameters();
            reloadPageStub.restore();
        });
        it('Reload page if not on scheduled page', function() {
            document.getElementsByTagName('body')[0].classList.remove('scheduled-page');
            schedule.scheduleArticlePublicationSuccess();
            schedule.refreshPage();
            expect(resetParametersSpy.called).to.be.true;
        });
        it('Reload page if not on scheduled page and not scheduling and all scheduled', function() {
            document.getElementsByTagName('body')[0].classList.remove('scheduled-page');
            schedule.scheduleArticlePublicationSuccess();
            schedule.refreshPage();
            expect(resetParametersSpy.called).to.be.true;
            expect(reloadPageStub.called).to.be.true;
        });
    });




});

