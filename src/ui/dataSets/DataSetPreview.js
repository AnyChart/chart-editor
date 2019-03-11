goog.provide('chartEditor.ui.dataSets.DataSetPreview');

goog.require('chartEditor.ui.Component');
goog.require('chartEditor.ui.dataSets.DataSet');
goog.require('chartEditor.ui.dataSets.edit.Table');
goog.require('chartEditor.ui.dialog.DataPreview');
goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuButton');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.MenuItemRenderer');
goog.require('goog.ui.MenuSeparator');


/**
 * Uploaded dataset's panel preview.
 *
 * @param {chartEditor.model.Base} model
 * @param {Object} dataSet Data set object
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.dataSets.DataSet}
 */
chartEditor.ui.dataSets.DataSetPreview = function(model, dataSet, opt_domHelper) {
  chartEditor.ui.dataSets.DataSetPreview.base(this, 'constructor', model, dataSet, opt_domHelper);

  /**
   *
   * @type {chartEditor.ui.dataSets.edit.Table}
   * @private
   */
  this.editTable_ = null;
};
goog.inherits(chartEditor.ui.dataSets.DataSetPreview, chartEditor.ui.dataSets.DataSet);


/** @inheritDoc */
chartEditor.ui.dataSets.DataSetPreview.prototype.initContent = function() {
  this.menuButton.setVisible(false);

  var element = /** @type {Element} */(this.getElement());
  var caption = goog.dom.createDom(goog.dom.TagName.H3, 'title-common', 'Input Data');
  goog.dom.appendChild(element, caption);

  var clearButton = goog.dom.createDom(goog.dom.TagName.SPAN, 'title-button ac-clear');
  goog.dom.appendChild(caption, clearButton);
  goog.events.listen(clearButton, goog.events.EventType.CLICK, this.onClearButtonClick, false, this);
  this.previewData();
};


/**
 * Preset preview click handler.
 * @param {goog.events.BrowserEvent} e - Event.
 */
chartEditor.ui.dataSets.DataSetPreview.prototype.onClearButtonClick = function(e) {
  this.editTable_.resetContent();

  // var model = this.getModel();
  // var active = model.getRawData();
  // active.length = 0; //Doesn't redefine data array reference.
  // active.push(
  //     {'x': 0, 'value': 0},
  //     {'x': 1, 'value': 0}
  // );
  // model.resetPreparedData();
  // model.dispatchUpdate();
  // debugger;
};


/**
 * @override
 */
chartEditor.ui.dataSets.DataSetPreview.prototype.previewData = function() {
  if (!this.editTable_) {
    this.editTable_ = new chartEditor.ui.dataSets.edit.Table();
    this.editTable_.setModel(this.getModel());
    this.addChild(this.editTable_, true);
  }
  this.editTable_.updateContent(this.dataSet_);
};


/**
 * @inheritDoc
 */
chartEditor.ui.dataSets.DataSetPreview.prototype.updateData = function() {
  if (this.editTable_)
    this.editTable_.updateData();
};


/** @inheritDoc */
chartEditor.ui.dataSets.DataSetPreview.prototype.disposeInternal = function() {
  goog.disposeAll(this.menu_, this.menuBtn_, this.previewDialog_, this.editTable_);

  this.menu_ = null;
  this.menuBtn_ = null;
  this.previewDialog_ = null;
  this.editTable_ = null;

  chartEditor.ui.dataSets.DataSetPreview.base(this, 'disposeInternal');
};
