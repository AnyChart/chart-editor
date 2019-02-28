goog.provide('chartEditor.ui.dataSets.edit.ColumnsController');

//region -- Requirements.
goog.require('goog.array');



//endregion
//region -- Constructor.
/**
 *
 * @param {Array.<Object>=} opt_data - .
 * @constructor
 */
chartEditor.ui.dataSets.edit.ColumnsController = function(opt_data) {

  /**
   * 
   * @type {Array.<chartEditor.ui.dataSets.edit.ColumnsController.Column>}
   * @private
   */
  this.columns_ = [];

  if (goog.isDef(opt_data)) {
    this.fromData(opt_data);
  } else {
    this.reset();
  }

};


//endregion
//region -- Enums.
/**
 *
 * @enum {string}
 */
chartEditor.ui.dataSets.edit.ColumnsController.DataType = {
  NUMBER: 'number',
  STRING: 'string',

  /*
    Special value. Literally means the column with straight
    numbering of rows or another special columns (for future
    implementations).
    Columns marked as 'SPECIAL' are not editable and are not
    related to the data.
   */
  SPECIAL: 'special'
};


//endregion
//region -- Typedefs.
/**
 * @typedef {{
 *  type: chartEditor.ui.dataSets.edit.ColumnsController.DataType,
 *  index: number,
 *  key: (string|undefined)
 * }}
 */
chartEditor.ui.dataSets.edit.ColumnsController.Column;


//endregion
//region -- Data restoration.
/**
 * Restores internal columns model from incoming data.
 * @param {Array.<Object>} fields
 */
chartEditor.ui.dataSets.edit.ColumnsController.prototype.fromData = function(fields) {
  this.defaultReset_();
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    this.addColumn(field.key, field.type);
  }
};


/**
 * Default reset to numbering column only.
 * Do not use outside the class.
 * @private
 */
chartEditor.ui.dataSets.edit.ColumnsController.prototype.defaultReset_ = function() {
  this.columns_.length = 0;
  // this.columns_.push(/** @type {chartEditor.ui.dataSets.edit.ColumnsController.Column} */ ({
  //   index: 0,
  //   type: chartEditor.ui.dataSets.edit.ColumnsController.DataType.SPECIAL //Not editable.
  // }));
};


/**
 * Resets internal columns model to its initial state.
 */
chartEditor.ui.dataSets.edit.ColumnsController.prototype.reset = function() {
  this.defaultReset_();
  this.columns_.push(/** @type {chartEditor.ui.dataSets.edit.ColumnsController.Column} */ ({
    index: 0,
    type: chartEditor.ui.dataSets.edit.ColumnsController.DataType.NUMBER,
    key: 'x'
  }), /** @type {chartEditor.ui.dataSets.edit.ColumnsController.Column} */ ({
    index: 1,
    type: chartEditor.ui.dataSets.edit.ColumnsController.DataType.NUMBER,
    key: 'value'
  }));
};


//endregion
//region -- Columns manipulations.
/**
 * Adds column.
 * @param {string=} opt_key
 * @param {chartEditor.ui.dataSets.edit.ColumnsController.DataType=} opt_type
 * @return {chartEditor.ui.dataSets.edit.ColumnsController.Column}
 */
chartEditor.ui.dataSets.edit.ColumnsController.prototype.addColumn = function(opt_key, opt_type) {
  var l = this.columns_.length;
  var column = {
    index: l,
    type: opt_type || chartEditor.ui.dataSets.edit.ColumnsController.DataType.NUMBER,
    key: opt_key || ('value' + l)
  };
  this.columns_.push(column);
  return column;
};


/**
 * Removes column.
 * @param {number} index
 */
chartEditor.ui.dataSets.edit.ColumnsController.prototype.removeColumn = function(index) {
  goog.array.removeAt(this.columns_, index);
};


/**
 * Columns internal model.
 * @return {Array.<chartEditor.ui.dataSets.edit.ColumnsController.Column>}
 */
chartEditor.ui.dataSets.edit.ColumnsController.prototype.getColumns = function() {
  return this.columns_;
};


/**
 * Gets column data by index.
 * @param {number} index - Index of column.
 * @return {chartEditor.ui.dataSets.edit.ColumnsController.Column}
 */
chartEditor.ui.dataSets.edit.ColumnsController.prototype.getColumnData = function(index) {
  return this.columns_[index];
};


//endregion
//region -- Utility values normalization.
/**
 * TODO (A.Kudryavtsev): Descr.
 * @param {*} val - Value to normalize.
 * @param {chartEditor.ui.dataSets.edit.ColumnsController.DataType=} opt_type - Type.
 * @return {string} - String value.
 */
chartEditor.ui.dataSets.edit.ColumnsController.prototype.normalizeForType = function(val, opt_type) {
  var result;
  switch (opt_type) {
    case chartEditor.ui.dataSets.edit.ColumnsController.DataType.NUMBER:
      result = parseFloat(val);
      result = isNaN(result) ? '' : String(result);
      break;
    default:
      result = String(val);
  }
  return result;
};


/**
 * TODO (A.Kudryavtsev): Descr.
 * @param {*} val - Value to normalize.
 * @param {number} index - Column index.
 * @return {string}
 */
chartEditor.ui.dataSets.edit.ColumnsController.prototype.normalizeForColumnByIndex = function(val, index) {
  return (index + 1 > this.columns_.length) ? '' : this.normalizeForType(val, this.columns_[index].type);
};


/**
 * TODO (A.Kudryavtsev): Descr.
 * @param {*} val - Value to normalize.
 * @param {chartEditor.ui.dataSets.edit.ColumnsController.Column} column - Column.
 * @return {string}
 */
chartEditor.ui.dataSets.edit.ColumnsController.prototype.normalizeForColumn = function(val, column) {
  return this.normalizeForColumnByIndex(val, column.index);
};

//endregion