module.exports = function () {

    var _ = require('underscore');
    /**
     * Remove an object
     * @param obj
     * @param match
     * @returns {Array}
     */
    function removeObject(obj, match) {
        var queued = [];
        _.each(obj, function (queue) {
            if (!_.isEqual(queue, match)) {
                queued.push(queue);
            }
        });

        return queued;
    }

    /**
     * append object
     * @param obj
     * @param match
     * @returns {*}
     */
    function addObject(obj, match) {
        obj.push(match);
        return obj;
    }

    /**
     * Find last key of object
     * @param list
     * @returns {*}
     */
    function findLastKey(list) {
        var lastKey = false;
        var cnt = 1;
        var total = _.keys(list).length;
        _.each(list, function (lst, key) {
            if (cnt === total) {
                lastKey = key;
            }

            cnt++;
        });

        return lastKey;
    }

    /**
     * Test if a string is all numeric or not
     * @param string
     * @returns {boolean}
     */
    function isNumeric(string) {
        var hasNumber = /^\d+$/;
        return hasNumber.test(string);
    }

    /**
     * Extract params from url
     * @param options
     */
    function urlObject(url) {
        // /scheduled?view=calendar&type=month&date=01-06-2016
        var optionsStartIndex = url.lastIndexOf('?');
        var options = url.slice(optionsStartIndex).replace('?', '&').split('&');
        var options = _.compact(options);
        var parameters = [];
        _.each(options, function(option){
            var parameter = [];
            var keyValue = option.split('=');
            parameter[keyValue[0]] = keyValue[1];
            addObject(parameters, keyValue)
        });
        parameters = _.object(parameters);
        return parameters;
    }

    /**
     * Check if json is valid
     * @param str
     * @returns {boolean}
     */
    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    /**
     * Pad out a number
     * @param number
     * @param digits
     * @returns {*}
     */
    function padDigits(number, digits) {
        return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    }

    /**
     * Return error message detail
     * @param data
     * @returns {{}}
     */
    function formatErrorInformation(data) {
        var errorInfo = {};
        var responseText = (utils.isJson(data.responseText)) ? JSON.parse(data.responseText) : data.responseText;
        errorInfo.statusCode = data.status;
        errorInfo.statusText = data.statusText;
        errorInfo.message = (_.has(responseText, 'message')) ? responseText.message : responseText ;
        if(_.has(data, 'status') && data.status === 500) {
            errorInfo.message = null;
        }
        errorInfo.detail = (_.has(responseText, 'detail')) ? responseText.detail : responseText ;
        return errorInfo;
    }


     /**
      * Format articles add new url field
     * @param articles
     * @returns {*}
     */
    function generateUrl(article) {
        _.mapObject(article, function(value, key){
            value.url = '';
            if(value.id != null) {
                value.url += value.id;
                if(value.version != null) {
                    value.url += '/' + value.version + '/' + value["run-id"];
                }
            }
            else {
                value.url = null;
            }
            return true;
        });
        return article;
    }


    var utils = {
        padDigits: padDigits,
        isJson: isJson,
        urlObject: urlObject,
        isNumeric: isNumeric,
        findLastKey: findLastKey,
        addObject: addObject,
        removeObject: removeObject,
        formatErrorInformation: formatErrorInformation,
        generateUrl: generateUrl
    };
    return utils;

}();
