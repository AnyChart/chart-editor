goog.provide('chartEditor.utils');


/**
 * Find all unique items.
 * @param {?(Array.<*>|Object)} arr array of items
 * @param {string} field the searching field name
 * @return {Array.<*>}
 */
chartEditor.utils.searchUniqueValues = function(arr, field) {
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var str = arr[i][field];
    obj[str] = true;
  }
  return Object.keys(obj);
};
