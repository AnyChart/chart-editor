goog.provide('chartEditor.DataSetPanelList');

goog.require('chartEditor.Component');
goog.require('chartEditor.DataSetPanel');
goog.require('chartEditor.EditorModel');
goog.require('chartEditor.dataSetPanelList.Intro');
goog.require('chartEditor.Component');


/**
 * List of data set panels on SetupChart step.
 *
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.DataSetPanelList = function(model, opt_domHelper) {
  chartEditor.DataSetPanelList.base(this, 'constructor', opt_domHelper);

  this.panels_ = [];
  this.setModel(model);
  this.addClassName('anychart-connected-data-sets');

};
goog.inherits(chartEditor.DataSetPanelList, chartEditor.Component);


/** @inheritDoc */
chartEditor.DataSetPanelList.prototype.enterDocument = function() {
  chartEditor.DataSetPanelList.base(this, 'enterDocument');

  this.onModelChange(null);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  this.getHandler().listen(model, chartEditor.events.EventType.EDITOR_MODEL_UPDATE, this.onModelChange);
};


/**
 * Updates component on model change.
 * @param {?Object} evt
 */
chartEditor.DataSetPanelList.prototype.onModelChange = function(evt) {
  var active = this.getModel().getActive();
  var activeGeo = this.getModel().getActiveGeo();
  var data = this.getModel().getPreparedData();

  // clear all content
  this.removeChildren(true);
  goog.disposeAll(this.panels_);
  this.panels_ = [];

  // add caption
  var caption = new chartEditor.Component();
  caption.addClassName('anychart-ce-section-caption');
  caption.addClassName('anychart-connected-data-sets-caption');
  this.addChild(caption, true);

  // todo: rework this hack!!
  caption.getElement().innerHTML = 'Connected Data Sets';

  // add data sets or intro
  var step = /** @type {chartEditor.steps.Base} */(this.getParent());
  if (data.length) {
    for (var i = 0; i < data.length; i++) {
      if (step.getIndex() === 1 || data[i].type !== chartEditor.EditorModel.DataType.GEO) {
        var panel = new chartEditor.DataSetPanel(data[i]);
        this.panels_.push(panel);
        this.addChild(panel, true);

        panel.setDisabled(step.getIndex() === 0 || this.panels_[i].getSetFullId() !== active);

        if (data[i].type === chartEditor.EditorModel.DataType.GEO)
          this.panels_[i].setActiveGeo(this.panels_[i].getSetFullId() === activeGeo);
      }
    }
  } else {
    var intro = new chartEditor.dataSetPanelList.Intro();
    this.addChild(intro, true);
  }
};
