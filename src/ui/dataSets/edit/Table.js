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
   * TODO (A.Kudryavtsev): Why the hell not in typedef?
   * @type {Object}
   * @private
   */
  this.dataSet_ = null;


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
   * Edit input.
   * @type {chartEditor.ui.dataSets.edit.Input}
   * @private
   */
  this.editInput_ = null;

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
 *
 * @param {goog.events.Event} e - Submit event.
 * @private
 */
chartEditor.ui.dataSets.edit.Table.prototype.editInputDataSubmitHandler_ = function(e) {
  var rowIndex = e['rowIndex'];
  var columnIndex = e['columnIndex'];
  var newValue = e['value'];
  var column = this.controller_.getColumnData(columnIndex);
  var key = column.key;
  var type = column.type;

  var cls = type == chartEditor.ui.dataSets.edit.ColumnsController.DataType.NUMBER ?
      Number :
      String;

  var model = this.getModel();
  var active = model.getRawData();
  var item = active[rowIndex];
  item[key] = cls(newValue);

  model.resetPreparedData();
  model.dispatchUpdate();
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


//endregion
//region -- Live edit, data update.
/**
 * Creates Header's <tr>.
 * @param {Array.<Object>} fields - Related fields.
 * @return {Element} - <tr> element.
 */
chartEditor.ui.dataSets.edit.Table.prototype.createHeaderTr = function(fields) {
  var model = this.getModel();
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
    keyInput.columnIndex = i + 1;
    keyInput.listen(chartEditor.events.EventType.EDIT_DATA_SUBMIT, this.editInputHeaderSubmitHandler_, void 0, this);

    if (i + 1 == model.edit.focusHeader) { //Async magic.
      this.selectedKeyInput_ = keyInput;
      goog.Timer.callOnce(function() {
        this.selectedKeyInput_.focusAndSelect();
      }, 10, this);
    }

    td.appendChild(keyInput.getElement());

    var typeSelector = new chartEditor.ui.control.select.DataType(this.controller_.getColumnData(i + 1));
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


/**
 *
 * @param {goog.events.Event} e - Submit event.
 * @private
 */
chartEditor.ui.dataSets.edit.Table.prototype.editInputHeaderSubmitHandler_ = function(e) {
  var columnIndex = e['columnIndex'];
  var oldKey = e['oldValue'];
  var newKey = e['value'];
  var model = this.getModel();
  var active = model.getRawData();

  if (e['lastKeyCode'] == goog.events.KeyCodes.TAB || e['lastKeyCode'] == goog.events.KeyCodes.ENTER) {
    model.edit.focusHeader = columnIndex == this.controller_.getColumns().length - 1 ?
        1 : columnIndex + 1;
  } else {
    model.edit.focusHeader = -1;
  }
  model.edit.focusColumn = -1;
  model.edit.focusRow = -1;

  if (oldKey != newKey) {
    for (var i = 0; i < active.length; i++) {
      var item = active[i];

      /*
        START OF DJUKING.

        We can't just do
          item[newKey] = item[oldKey];
          delete item[oldKey];
        because it breaks for-in cycle order for
        chartEditor.model.Base.prototype.prepareDataSet_

        Such implementation doesn't.
        TODO (A.Kudryavtsev): Test in different browsers.
       */
      var newItem = {};
      for (var j in item) {
        if (j == oldKey) {
          newItem[newKey] = item[j];
        } else {
          newItem[j] = item[j];
        }
      }
      active[i] = newItem;
      /*
        END OF DJUKING.
       */

    }
  }

  model.resetPreparedData();
  model.dispatchUpdate();
};


/**
 * Add field button click handler.
 * @param {goog.events.BrowserEvent} e - Event.
 */
chartEditor.ui.dataSets.edit.Table.prototype.onAddFieldButtonClick = function(e) {
  var model = this.getModel();
  var active = model.getRawData();

  var c = this.controller_.addColumn();
  var key = c.key;
  var val = c.type == chartEditor.ui.dataSets.edit.ColumnsController.DataType.NUMBER ? 0 : 'Value';

  for (var i = 0; i < active.length; i++) {
    var item = active[i];
    item[key] = val;
  }

  model.resetPreparedData();
  model.dispatchUpdate();
};


/**
 * Updates table existing content.
 * Instance of chartEditor.ui.dataSets.DataSet call this method to load predefined data.
 * @param {Object} dataSet
 */
chartEditor.ui.dataSets.edit.Table.prototype.updateContent = function(dataSet) {
  this.dataSet_ = dataSet;

  var dom = this.getDomHelper();
  dom.removeChildren(this.thead_);
  dom.removeChildren(this.tbody_);

  //Model should be set on chartEditor.ui.dataSets.edit.Table instantiation.
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var fields = dataSet.fields;
  this.controller_.fromData(fields);

  var i, td, field;
  var tr = this.createHeaderTr(fields);
  dom.appendChild(this.thead_, tr);

  var rawData = model.getRawData(false);
  /*
    Creating table body.
   */
  for (i = 0; i < rawData.length; i++) {
    var raw = rawData[i];
    tr = dom.createDom(goog.dom.TagName.TR, i % 2 ? 'odd' : 'even');
    td = dom.createDom(goog.dom.TagName.TD, 'anychart-ce-count-row', String(i + 1)); //First cell.
    dom.appendChild(tr, td);
    for (var j = 0; j < fields.length; j++) {
      field = fields[j];
      var key = field.key;
      var value = '';
      var className = null;
      if (goog.isDef(raw[key]))
        value = String(raw[key]);
      else
        value = className = 'empty';

      td = dom.createDom(goog.dom.TagName.TD, className, value);

      td.setAttribute('ac-edit-column', String(j + 1));
      td.setAttribute('ac-edit-row', String(i));

      dom.appendChild(tr, td);
    }
    dom.appendChild(this.tbody_, tr);
  }


};


/**
 *
 * @param {goog.events.Event} e - Event;
 */
chartEditor.ui.dataSets.edit.Table.prototype.typeSelectionHandler = function(e) {
  var selector = e.target;
  var type = selector.getCaption(); //TODO (A.Kudryavtsev): Is it correct reference?
  var column = selector.column;
  var key = column.key;

  var model = this.getModel();
  var active = model.getRawData();

  var cls = type == chartEditor.ui.dataSets.edit.ColumnsController.DataType.NUMBER ?
      Number :
      String;

  for (var i = 0; i < active.length; i++) {
    var item = active[i];
    item[key] = cls(item[key]);
  }

  model.resetPreparedData();
  model.dispatchUpdate();
};
//endregion


