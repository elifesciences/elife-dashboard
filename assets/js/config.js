module.exports = {
    api: {
        article_publication_status: '/api/article_publication_status',
        queue_article_publication: '/api/queue_article_publication',
        article_scheduled_status: '/api/article_scheduled_status',
        article_schedule_for_range: '/api/article_schedule_for_range',
        schedule_article_publication: '/api/schedule_article_publication',
        current: '/api/current',
        article: '/api/article'
    },
    // Uncomment to point to test_services.py
    // api: {
    //     article_publication_status: 'http://localhost:8008/api/article_publication_status',
    //     queue_article_publication: 'http://localhost:8008/api/queue_article_publication',
    //     article_scheduled_status: 'http://localhost:8008/api/article_scheduled_status',
    //     article_schedule_for_range: 'http://localhost:8008/api/article_schedule_for_range',
    //     schedule_article_publication: 'http://localhost:8008/api/schedule_article_publication',
    //     current: 'http://localhost:8008/api/current',
    //     article: 'http://localhost:8008/api/article'
    // },
    logLevel: 0,
    ISPP: false,
    isScheduling: false,
    isAllScheduled: false,
    colorAdvanceArticle: '#f1f1f1',
    colorArticle: '#cde1f1',
    colorText: '#111',
    errors: {
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
        },
    }
};
