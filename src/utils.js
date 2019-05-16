goog.provide('chartEditor.utils');


/**
 * Qlik's HyperCube includes concatenated values as a string with "," delimeter or
 * as a number if there's a single value. This function parse concatenated by Qlik values to
 * normal array for further preprocessing.
 * @param {Array.<string> | number} value input array of objects
 * @return {Array.<string | number>} array of values
 */
chartEditor.utils.parseConcatenatedValue = function (value) {
    if (goog.isDef(value)) {
        var array;
        if (isNaN(value)) {
            array = value.split(",");
        } else {
            array = [value];
        }
        return array;
    }
    return [];
};


/**
 * Preprocess mapping for Gnatt Resource chart.
 * @param {Object} mappingObj default mapping for the current chart type
 * @return {Object}
 */
chartEditor.utils.preprocessResourceMapping = function (mappingObj) {
    var resourceMapping = Object.assign({}, mappingObj);
    resourceMapping['periods'] = 'periods';
    delete resourceMapping['periodId'];
    delete resourceMapping['periodStart'];
    delete resourceMapping['periodEnd'];
    delete resourceMapping['periodConnectTo'];
    return resourceMapping;
};


/**
 * Preprocess data for Gantt Resource chart.
 * @param {Array.<Object>} rawData raw incoming data
 * @param {Object} mappingObj default mapping for the current chart type
 * @return {Array.<Object>}
 */
chartEditor.utils.preprocessResourceData = function (rawData, mappingObj) {
    var preprocessedData = [];
    // add resources to preprocessed data
    for (var i = 0; i < rawData.length; i++) {
        var resourceObj = {};
        resourceObj[mappingObj['id']] = rawData[i][mappingObj['id']];
        resourceObj[mappingObj['name']] = rawData[i][mappingObj['name']];
        resourceObj[mappingObj['parent']] = rawData[i][mappingObj['parent']];
        resourceObj['periods'] = [];

        // create periods like below
        // periods: [
        //     {id: "1_1", start: "2018-01-05", end: "2018-01-25"}
        // ]
        var idArr = chartEditor.utils.parseConcatenatedValue(rawData[i][mappingObj['periodId']]);
        var startArr = chartEditor.utils.parseConcatenatedValue(rawData[i][mappingObj['periodStart']]);
        var endArr = chartEditor.utils.parseConcatenatedValue(rawData[i][mappingObj['periodEnd']]);
        var connectToArr = chartEditor.utils.parseConcatenatedValue(rawData[i][mappingObj['periodConnectTo']]);

        for (var j = 0; j < idArr.length; j++) {
            var periodObj = {id: idArr[j], connectTo: connectToArr[j]};
            // start and end value MUST NEVER be an empty string
            periodObj.start = startArr[j] ? startArr[j] : null;
            periodObj.end = endArr[j] ? endArr[j] : null;
            resourceObj['periods'].push(periodObj);
        }
        preprocessedData.push(resourceObj);
    }
    return preprocessedData;
};