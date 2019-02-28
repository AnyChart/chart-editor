goog.provide('chartEditor.ui.dataSets.edit.Table');

//region -- Requirements.
goog.require('chartEditor.ui.Component');
goog.require('chartEditor.ui.control.select.DataType');
goog.require('chartEditor.ui.dataSets.edit.ColumnsController');
goog.require('chartEditor.ui.dataSets.edit.Input');



//endregion
//region -- Constructor.
/**
 * Data editable table.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.dataSets.edit.Table = function(opt_domHelper) {
  chartEditor.ui.dataSets.edit.Table.base(this, 'constructor', opt_domHelper);

  /**
   * Data preview table.
   * @type {Element}
   * @private
   */
  this.table_ = null;


  /**
   * <THEAD> of this.table_.
   * @type {Element}
   * @private
   */
  this.thead_ = null;


  /**
   * <TBODY> of this.table_.
   * @type {Element}
   * @private
   */
  this.tbody_ = null;

  /**
   *
   * @type {chartEditor.ui.dataSets.edit.ColumnsController}
   * @private
   */
  this.controller_ = new chartEditor.ui.dataSets.edit.ColumnsController();

  /**
   * Internal data representation.
   * @type {Array.<Array.<string>>}
   * @private
   */
  this.internalData_ = [];

  /**
   * Edit input.
   * @type {chartEditor.ui.dataSets.edit.Input}
   * @private
   */
  this.editInput_ = null;

  /**
   * TODO (A.Kudryavtsev): .
   * @type {Array.<chartEditor.ui.dataSets.edit.Input>}
   * @private
   */
  this.keyInputs_ = [];

  this.addClassName('anychart-ce-edit-table');
};
goog.inherits(chartEditor.ui.dataSets.edit.Table, chartEditor.ui.Component);


//endregion
//region -- DOM.
/**
 * @inheritDoc
 */
chartEditor.ui.dataSets.edit.Table.prototype.createDom = function() {
  chartEditor.ui.dataSets.edit.Table.base(this, 'createDom');

  if (!this.table_) {
    var dom = this.getDomHelper();
    var content = this.getContentElement();

    this.table_ = dom.createDom(goog.dom.TagName.TABLE, goog.getCssName('anychart-ce-data-preview-table'));
    goog.events.listen(this.table_, goog.events.EventType.CLICK, this.clickHandler_, void 0, this);

    this.thead_ = dom.createDom(goog.dom.TagName.THEAD);
    this.tbody_ = dom.createDom(goog.dom.TagName.TBODY);

    dom.appendChild(this.table_, this.thead_);
    dom.appendChild(this.table_, this.tbody_);
    dom.appendChild(content, this.table_);

    this.editInput_ = new chartEditor.ui.dataSets.edit.Input();
    this.editInput_.setColumnsController(this.controller_);
    this.editInput_.createDom();
    this.editInput_.listen(chartEditor.events.EventType.EDIT_DATA_SUBMIT, this.editInputDataSubmitHandler_, void 0, this);
  }
};


/**
 * Creates Header's <tr>.
 * @param {Array.<Object>} fields - Related fields.
 * @return {Element} - <tr> element.
 */
chartEditor.ui.dataSets.edit.Table.prototype.createHeaderTr = function(fields) {
  this.keyInputs_.length = 0;
  var dom = this.getDomHelper();
  var tr = dom.createDom(goog.dom.TagName.TR, 'inner');
  var td = dom.createDom(goog.dom.TagName.TD, 'anychart-ce-count-row', '#'); //First cell.

  dom.appendChild(tr, td);
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    td = dom.createDom(goog.dom.TagName.TD);

    var keyInput = new chartEditor.ui.dataSets.edit.Input(true);
    keyInput.createDom();
    keyInput.show(field.name);
    keyInput.columnIndex = i;
    keyInput.listen(chartEditor.events.EventType.EDIT_DATA_SUBMIT, this.editInputHeaderSubmitHandler_, void 0, this);
    this.keyInputs_.push(keyInput);

    var keyInputElement = keyInput.getElement();
    goog.dom.classlist.add(keyInputElement, 'anychart-ce-edit-key-input-header');
    td.appendChild(keyInputElement);

    var typeSelector = new chartEditor.ui.control.select.DataType(this.controller_.getColumnData(i));
    typeSelector.render(td);
    goog.events.listen(typeSelector, goog.ui.Component.EventType.ACTION, this.typeSelectionHandler, void 0, this);

    dom.appendChild(tr, td);
  }
  td = dom.createDom(goog.dom.TagName.TD, 'anychart-ce-count-row');
  var addFieldButton = goog.dom.createDom(goog.dom.TagName.SPAN, 'title-button ac-plus');
  goog.dom.appendChild(td, addFieldButton);
  goog.events.listen(addFieldButton, goog.events.EventType.CLICK, this.onAddFieldButtonClick, false, this);

  dom.appendChild(tr, td);
  return tr;
};


//endregion
//region -- Data update.
/**
 * Updates data.
 */
chartEditor.ui.dataSets.edit.Table.prototype.updateData = function() {
  var model = this.getModel();
  var rawData = model.getRawData();
  rawData.length = 0; //Doesn't redefine data array reference.

  var len = this.internalData_.length;
  var i, item;
  for (i = 0; i < len; i++) {
    item = this.internalData_[i];
    var obj = {};
    for (var j = 0; j < item.length; j++) {
      var column = this.controller_.getColumnData(j);
      obj[column.key] = this.controller_.normalizeForColumn(item[j], column);
    }
    rawData.push(obj);
  }

  //Clearing empty rows from the end.
  for (i = len - 1; i; i--) {
    item = this.internalData_[i];
    if (this.containsOnlyEmptyValues_(item))
      rawData.pop();
    else
      break;
  }

  model.resetPreparedData();
  model.dispatchUpdate();
};


/**
 * TODO (A.Kudryavtsev):
 * @param {Array.<string>} arr - .
 * @private
 * @return {boolean}
 */
chartEditor.ui.dataSets.edit.Table.prototype.containsOnlyEmptyValues_ = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    var val = arr[i];
    if (!goog.string.isEmptyOrWhitespace(val)) {
      return false;
    }
  }
  return true;
};


//endregion
//region -- Events handling.
/**
 *
 * @param {goog.events.Event} e - Submit event.
 * @private
 */
chartEditor.ui.dataSets.edit.Table.prototype.editInputDataSubmitHandler_ = function(e) {
  var rowIndex = e['rowIndex'];
  var columnIndex = e['columnIndex'];
  this.internalData_[rowIndex][columnIndex] = e['value'];
  var row, cell;
  if (e['lastKeyCode'] == goog.events.KeyCodes.TAB) {
    row = this.tbody_.childNodes[rowIndex];
    if (row) {
      cell = row.childNodes[columnIndex + 1 + 1];
      if (cell) {
        this.editInput_.show(/** @type {Element} */ (cell));
      } else {
        // Jumping to the next row.
        row = this.tbody_.childNodes[rowIndex + 1];
        if (row) {
          cell = row.childNodes[1];
          this.editInput_.show(/** @type {Element} */ (cell));
        } else {
          //create new one.
          this.appendEmptyRow_();
          row = this.tbody_.childNodes[rowIndex + 1];
          cell = row.childNodes[1];
          this.editInput_.show(/** @type {Element} */ (cell));
        }
      }
    } else {
      // Needs to be debugged! Theoretically, this case is impossible.
    }
  } else if (e['lastKeyCode'] == goog.events.KeyCodes.ENTER) {
    row = this.tbody_.childNodes[rowIndex + 1];
    if (row) {
      cell = row.childNodes[columnIndex + 1];
      this.editInput_.show(/** @type {Element} */ (cell));
    } else {
      this.appendEmptyRow_();
      row = this.tbody_.childNodes[rowIndex + 1];
      cell = row.childNodes[columnIndex + 1];
      this.editInput_.show(/** @type {Element} */ (cell));
    }
  }
};


/**
 *
 * @param {goog.events.BrowserEvent} e - Event.
 * @private
 */
chartEditor.ui.dataSets.edit.Table.prototype.clickHandler_ = function(e) {
  var target = /** @type {Element} */ (e.target);
  var columnIndex = target.getAttribute('ac-edit-column');
  if (goog.isDefAndNotNull(columnIndex)) {
    this.editInput_.show(target);
  }
};


/**
 *
 * @param {goog.events.Event} e - Submit event.
 * @private
 */
chartEditor.ui.dataSets.edit.Table.prototype.editInputHeaderSubmitHandler_ = function(e) {
  var columnIndex = e['columnIndex'];
  var column = this.controller_.getColumnData(columnIndex);
  column.key = e['value'];

  //TODO (A.Kudryavtsev): Add UX.
  if (e['lastKeyCode'] == goog.events.KeyCodes.TAB || e['lastKeyCode'] == goog.events.KeyCodes.ENTER) {
    var keyInput = this.keyInputs_[columnIndex + 1] || this.keyInputs_[0];
    keyInput.focusAndSelect();
  }
};


/**
 * Add field button click handler.
 * @param {goog.events.BrowserEvent} e - Event.
 */
chartEditor.ui.dataSets.edit.Table.prototype.onAddFieldButtonClick = function(e) {
  this.controller_.addColumn();

  for (var i = 0; i < this.internalData_.length; i++) {
    var data = this.internalData_[i];
    data.push('');
  }
  this.syncDomTable();
};


/**
 *
 * @param {goog.events.Event} e - Event;
 */
chartEditor.ui.dataSets.edit.Table.prototype.typeSelectionHandler = function(e) {
  var selector = e.target;
  var type = selector.getCaption(); //TODO (A.Kudryavtsev): Is it correct reference?
  var column = selector.column;
  column.type = type;
};


//endregion
//region -- Live edit.
/**
 *
 * @param {Array.<Object>} rawData
 */
chartEditor.ui.dataSets.edit.Table.prototype.internalDataFromRaw = function(rawData) {
  this.internalData_.length = 0;
  var columns = this.controller_.getColumns();
  for (var i = 0; i < rawData.length; i++) {
    var rawObj = rawData[i];
    var rawArr = [];

    for (var j = 0; j < columns.length; j++) {
      var column = columns[j];
      rawArr.push(String(rawObj[column.key]));
    }
    this.internalData_.push(rawArr);
  }
};


/**
 * Updates table existing content.
 * Instance of chartEditor.ui.dataSets.DataSet call this method to load predefined data.
 * @param {Object} dataSet
 */
chartEditor.ui.dataSets.edit.Table.prototype.updateContent = function(dataSet) {
  var fields = dataSet.fields;
  this.controller_.fromData(fields);

  //Model should be set on chartEditor.ui.dataSets.edit.Table instantiation.
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var rawData = /** @type {Array.<Object>} */ (model.getRawData(false));
  this.internalDataFromRaw(rawData);

  this.updateContentInternal_(fields, rawData);
};


/**
 * Internal content update.
 * @param {Array.<Object>} fields - .
 * @param {Array.<Object>} rawData - .
 * @private
 */
chartEditor.ui.dataSets.edit.Table.prototype.updateContentInternal_ = function(fields, rawData) {
  // Clearing table.
  var dom = this.getDomHelper();
  dom.removeChildren(this.thead_);
  dom.removeChildren(this.tbody_);

  // Creating header.
  var tr = this.createHeaderTr(fields);
  dom.appendChild(this.thead_, tr);

  // Creating body.
  for (var i = 0; i < rawData.length; i++) {
    var raw = rawData[i];
    tr = dom.createDom(goog.dom.TagName.TR, i % 2 ? 'odd' : 'even');
    var td = dom.createDom(goog.dom.TagName.TD, 'anychart-ce-count-row', String(i + 1)); //First cell.
    dom.appendChild(tr, td);
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var key = field.key;
      var value = '';
      var className = null;
      if (goog.isDef(raw[key]))
        value = String(raw[key]);
      else {
        value = '';
        // className = 'empty';
      }

      td = dom.createDom(goog.dom.TagName.TD, className, value);

      td.setAttribute('ac-edit-column', String(j));
      td.setAttribute('ac-edit-row', String(i));

      dom.appendChild(tr, td);
    }
    dom.appendChild(this.tbody_, tr);
  }
};


/**
 * Creates ampty row.
 * @private
 */
chartEditor.ui.dataSets.edit.Table.prototype.appendEmptyRow_ = function() {
  var dom = this.getDomHelper();
  var fields = this.columnsToHeaders_();
  var len = this.internalData_.length;
  var tr = dom.createDom(goog.dom.TagName.TR, len % 2 ? 'odd' : 'even');
  var internal = [];
  var td = dom.createDom(goog.dom.TagName.TD, 'anychart-ce-count-row', String(len + 1));
  dom.appendChild(tr, td);
  for (var i = 0; i < fields.length; i++) {
    internal.push('');
    td = dom.createDom(goog.dom.TagName.TD);
    td.setAttribute('ac-edit-column', String(i));
    td.setAttribute('ac-edit-row', String(len));
    dom.appendChild(tr, td);
  }
  this.internalData_.push(internal);
  dom.appendChild(this.tbody_, tr);
  var content = this.getContentElement();

  // content.scrollTop = content.scrollHeight;
};


/**
 * Resets internal data set and content.
 */
chartEditor.ui.dataSets.edit.Table.prototype.resetContent = function() {
  this.controller_.reset();
  this.internalData_ = [['', '']];
  this.syncDomTable();
};


/**
 * Synchronizes table appearance with internal model.
 */
chartEditor.ui.dataSets.edit.Table.prototype.syncDomTable = function() {
  var fields = this.columnsToHeaders_();
  var rawData = this.internalDataToDataSet_();
  this.updateContentInternal_(fields, rawData);
};


//endregion
//region -- Internal Data Utils.
/**
 * TODO (A.Kudryavtsev):
 * @private
 * @return {Array.<Object>}
 */
chartEditor.ui.dataSets.edit.Table.prototype.columnsToHeaders_ = function() {
  var columns = this.controller_.getColumns();
  var res = [];
  for (var i = 0; i < columns.length; i++) {
    var col = columns[i];
    res.push({
      'key': col.key,
      'name': col.key,
      'type': col.type
    });
  }
  return res;
};


/**
 * TODO (A.Kudryavtsev):
 * @private
 * @return {Array.<Object>}
 */
chartEditor.ui.dataSets.edit.Table.prototype.internalDataToDataSet_ = function() {
  var res = [];
  for (var i = 0; i < this.internalData_.length; i++) {
    var data = this.internalData_[i];
    var objItem = {};
    for (var j = 0; j < data.length; j++) {
      var value = data[j];
      var col = this.controller_.getColumnData(j);
      objItem[col.key] = this.controller_.normalizeForColumn(value, col);
    }
    res.push(objItem);
  }
  return res;
};


//endregion


