goog.provide('chartEditor.utils');


/**
 * Find all unique values in array of object by a specific field name.
 * @param {Array.<Object>} arr input array of objects
 * @param {string} field field name of searching unique values
 * @return {Array.<string>}
 */
chartEditor.utils.searchUniqueValues = function(arr, field) {
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var str = arr[i][field];
    obj[str] = true;
  }
  return Object.keys(obj);
};


/**
 * Preprocess mapping for Gnatt Resource chart.
 * @param {Object} mappingObj default mapping for the current chart type
 * @return {Object}
 */
chartEditor.utils.preprocessResourceMapping = function(mappingObj) {
  var resourceMapping = goog.object.clone(mappingObj);
  resourceMapping['periods'] = 'periods';
  delete resourceMapping['periodId'];
  delete resourceMapping['periodStart'];
  delete resourceMapping['periodEnd'];
  delete resourceMapping['periodConnectTo'];
  delete resourceMapping['periodResourceId'];
  return resourceMapping;
};


/**
 * Preprocess data for Gantt Resource chart.
 * @param {Array.<Object>} rawData raw incoming data
 * @param {Object} mappingObj default mapping for the current chart type
 * @return {Array.<Object>}
 */
chartEditor.utils.preprocessResourceData = function(rawData, mappingObj) {
  var preprocessedData = [];
  // search all unique resources ID
  var resourceIds = chartEditor.utils.searchUniqueValues(rawData, mappingObj['id']);
  // add resources to preprocessed data
  for (var i = 0; i < resourceIds.length; i++) {
    for (var j = 0; j < rawData.length; j++) {
      if (resourceIds[i] === rawData[j][mappingObj['id']]) {
        var resourceObj = {};
        resourceObj[mappingObj['id']] = resourceIds[i];
        resourceObj[mappingObj['name']] = rawData[j][mappingObj['name']];
        resourceObj[mappingObj['parent']] = rawData[j][mappingObj['parent']];
        resourceObj['periods'] = [];
        preprocessedData.push(resourceObj);
        break;
      }
    }
  }

  // search all unique periods
  var periodsIds = chartEditor.utils.searchUniqueValues(rawData, mappingObj['periodId']);
  // add every unique period to its related resource
  for (i = 0; i < periodsIds.length; i++) {
    for (j = 0; j < rawData.length; j++) {
      if (periodsIds[i] === rawData[j][mappingObj['periodId']]) {
        var periodObj = {
          id: periodsIds[i],
          start: rawData[j][mappingObj['periodStart']],
          end: rawData[j][mappingObj['periodEnd']],
          connectTo: rawData[j][mappingObj['periodConnectTo']]
        };
        for (var l = 0; l < preprocessedData.length; l++) {
          if (preprocessedData[l][mappingObj['id']] == rawData[j][mappingObj['periodResourceId']]) {
            preprocessedData[l]['periods'].push(periodObj);
          }
        }
        break;
      }
    }
  }
  return preprocessedData;
};


/**
 *
 * @param {chartEditor.model.Base.Key} key1
 * @param {chartEditor.model.Base.Key} key2
 * @return {boolean}
 * @private
 */
chartEditor.utils.compareKeys = function(key1, key2) {
  if (key1.length !== key2.length)
    return false;

  for (var i = key1.length; i--;) {
    if (typeof key1[i] == 'string' && key1[i] !== key2[i])
      return false;

    var type = goog.typeOf(key1[i]);
    if (type !== goog.typeOf(key2[i]))
      return false;

    if (type == 'array' && !goog.array.equals(/** @type {Array} */(key1[i]), /** @type {Array} */(key2[i])))
      return false;

    if (type == 'object' && !goog.object.equals(/** @type {!Object} */(key1[i]), /** @type {!Object} */(key2[i])))
      return false;
  }

  return true;
};