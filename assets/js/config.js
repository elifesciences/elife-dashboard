module.exports = function config(options) {
    var _ = require('underscore');
    var hasOpts = (!!options) ? true : false;
    var config = {};

    //

    config.logLevel = (_.has(options, 'logLevel')) ? options.logLevel : 0;
    config.colorAdvanceArticle = (_.has(options, 'colorAdvanceArticle')) ? options.colorAdvanceArticle : '#f1f1f1';
    config.colorArticle = (_.has(options, 'colorArticle')) ? options.colorArticle : '#cde1f1';
    config.colorText = (_.has(options, 'colorText')) ? options.colorText : '#111111';


    // is pattern portfolio - used in the pattern library


    config.ISPP = (_.has(options, 'ISPP')) ? options.ISPP : false;


    // API settings

    var api = {};
    api.article_publication_status = (_.has(options, 'api') && _.has(options.api, 'article_publication_status')) ? options.api.article_publication_status : '/api/article_publication_status';
    api.queue_article_publication = (_.has(options, 'api') && _.has(options.api, 'queue_article_publication')) ? options.api.queue_article_publication : '/api/queue_article_publication';
    api.article_scheduled_status = (_.has(options, 'api') && _.has(options.api, 'article_scheduled_status')) ? options.api.article_scheduled_status : '/api/article_scheduled_status';
    api.article_schedule_for_range = (_.has(options, 'api') && _.has(options.api, 'article_schedule_for_range')) ? options.api.article_schedule_for_range : '/api/article_schedule_for_range';
    api.schedule_article_publication = (_.has(options, 'api') && _.has(options.api, 'schedule_article_publication')) ? options.api.schedule_article_publication : '/api/schedule_article_publication';
    api.version_reason = (_.has(options, 'api') && _.has(options.api, 'version_reason')) ? options.api.version_reason : '/api/version_reason';
    api.current = (_.has(options, 'api') && _.has(options.api, 'current')) ? options.api.current : '/api/current';
    api.article = (_.has(options, 'api') && _.has(options.api, 'article')) ? options.api.article : '/api/article';

    // add debug: true to options to turn on test services mode

    if (_.has(options, 'debug') && options.debug === true) {
        api.article_publication_status = (_.has(options, 'api') && _.has(options.api, 'article_publication_status')) ? options.api.article_publication_status : 'http://localhost:8008/api/article_publication_status';
        api.queue_article_publication = (_.has(options, 'api') && _.has(options.api, 'queue_article_publication')) ? options.api.queue_article_publication : 'http://localhost:8008/api/queue_article_publication';
        api.article_scheduled_status = (_.has(options, 'api') && _.has(options.api, 'article_scheduled_status')) ? options.api.article_scheduled_status : 'http://localhost:8008/api/article_scheduled_status';
        api.article_schedule_for_range = (_.has(options, 'api') && _.has(options.api, 'article_schedule_for_range')) ? options.api.article_schedule_for_range : 'http://localhost:8008/api/article_schedule_for_range';
        api.schedule_article_publication = (_.has(options, 'api') && _.has(options.api, 'schedule_article_publication')) ? options.api.schedule_article_publication : 'http://localhost:8008/api/schedule_article_publication';
        api.version_reason = (_.has(options, 'api') && _.has(options.api, 'version_reason')) ? options.api.version_reason : 'http://localhost:8008/api/version_reason';
        api.current = (_.has(options, 'api') && _.has(options.api, 'current')) ? options.api.current : 'http://localhost:8008/api/current';
        api.article = (_.has(options, 'api') && _.has(options.api, 'article')) ? options.api.article : 'http://localhost:8008/api/article';
    }

    config.api = api;

    // end API settings

    // errors

    config.errors = {
        en: {
            type: {
                api: 'API Error',
                application: 'Application Error',
            },
            apiError: 'API Error',
            missingInformation: 'Missing Information',
            incorrectInformation: 'Incorrect Information',
            noArticleId: 'No Article ID was supplied.',
            scheduleInformationUnavailable: 'Please note, scheduling information is unavailable at this time.',
            refresh: 'Please refresh.',
            noRuns: 'There are no runs with this ID.',
            noVersions: 'There are no versions with this ID.',
            errorQueueing: 'An error has occurred while queueing the article(s) requested. Please cancel and try again.',
            errorStatus: 'An error has occurred while checking the status of the article(s) requested. Please cancel and try again.',
            errorScheduling: 'There was an error talking to the API, The article has not been scheduled.',
            maxPollsReached: 'The maximum number of polls has been reached, the server may have timed out, please try again.',
        }
    };

    // end errors
    
    // options
    
    config.articleActions = {
        "reason for version": {
            "actions": ["version-reason"]
        },
        "publication in progress": {
            "actions": []
        },
        "ready to publish": {
            "actions": ["publish", "schedule"]
        },
        "scheduled": {
            "actions": ["reschedule"]
        },
        "error": {
            "actions": []
        },
        "published": {
            "actions": []
        }
    };
    
    //
    
    
    return config;
};
