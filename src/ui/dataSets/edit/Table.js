goog.provide('chartEditor.ui.dataSets.edit.Table');

//region -- Requirements.
goog.require('chartEditor.ui.Component');



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
    this.thead_ = dom.createDom(goog.dom.TagName.THEAD);
    this.tbody_ = dom.createDom(goog.dom.TagName.TBODY);
    dom.appendChild(this.table_, this.thead_);
    dom.appendChild(this.table_, this.tbody_);
    dom.appendChild(content, this.table_);
  }
};


//endregion
//region -- Live edit, data update.
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

  var i, td, field;
  var tr = dom.createDom(goog.dom.TagName.TR, 'inner');

  /*
    Creating table header.
    TODO (A.Kudryavtsev): TBA: edit menu.
   */
  td = dom.createDom(goog.dom.TagName.TD, 'anychart-ce-count-row', '#'); //First cell.
  dom.appendChild(tr, td);
  for (i = 0; i < fields.length; i++) {
    field = fields[i];
    td = dom.createDom(goog.dom.TagName.TD, null, field.name + ': ' + field.type);
    dom.appendChild(tr, td);
  }
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
      dom.appendChild(tr, td);
    }
    dom.appendChild(this.tbody_, tr);
  }


};


//endregion
