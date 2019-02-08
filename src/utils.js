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
