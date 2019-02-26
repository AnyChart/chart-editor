goog.provide('chartEditor.ui.dataSets.Widget');

goog.require('chartEditor.model.Base');
goog.require('chartEditor.ui.Component');
goog.require('chartEditor.ui.dataSets.DataSet');
goog.require('chartEditor.ui.dataSets.Intro');



/**
 * List of data set panel on SetupChart step.
 *
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.dataSets.Widget = function(model, opt_domHelper) {
  chartEditor.ui.dataSets.Widget.base(this, 'constructor', opt_domHelper);

  this.panels_ = [];

  this.setModel(model);

  this.initClasses();
};
goog.inherits(chartEditor.ui.dataSets.Widget, chartEditor.ui.Component);


/**
 * Initializes css classes.
 */
chartEditor.ui.dataSets.Widget.prototype.initClasses = function() {
  this.addClassName('anychart-ce-data-set');
};


/** @inheritDoc */
chartEditor.ui.dataSets.Widget.prototype.enterDocument = function() {
  chartEditor.ui.dataSets.Widget.base(this, 'enterDocument');

  this.onModelChange(null);

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  this.getHandler().listen(model, chartEditor.events.EventType.EDITOR_MODEL_UPDATE, this.onModelChange);
};


/** @inheritDoc */
chartEditor.ui.dataSets.Widget.prototype.exitDocument = function() {
  chartEditor.ui.dataSets.Widget.base(this, 'exitDocument');

  goog.disposeAll(this.panels_);
  this.panels_.length = 0;
};


/**
 * TODO (A.Kudryavtsev):
 * @param model
 * @param data
 * @return {chartEditor.ui.dataSets.DataSet}
 */
chartEditor.ui.dataSets.Widget.prototype.createPanel = function(model, data) {
  return new chartEditor.ui.dataSets.DataSet(model, data);
};


/**
 * Updates ui on model change.
 * @param {?Object} evt
 */
chartEditor.ui.dataSets.Widget.prototype.onModelChange = function(evt) {
  var active = this.getModel().getActive();
  var activeGeo = this.getModel().getActiveGeo();
  var data = this.getModel().getPreparedData();

  // clear all content
  this.removeChildren(true);
  goog.disposeAll(this.panels_);
  this.panels_.length = 0;

  // add data sets or intro
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var step = /** @type {chartEditor.ui.steps.Step} */(this.getParent());
  if (data.length) {
    for (var i = 0; i < data.length; i++) {
      if (step.getIndex() === 1 || data[i].type !== chartEditor.model.DataType.GEO) {
        // var panel = new chartEditor.ui.dataSets.DataSetPreview(model, data[i]);
        var panel = this.createPanel(model, data[i]);
        this.panels_.push(panel);
        this.addChild(panel, true);

        panel.setDisabled(step.getIndex() === 0 || this.panels_[i].getSetFullId() !== active);

        if (data[i].type === chartEditor.model.DataType.GEO)
          this.panels_[i].activatePanelGeo(this.panels_[i].getSetFullId() === activeGeo);
      }
    }
  } else {
    var intro = new chartEditor.ui.dataSets.Intro();
    this.addChild(intro, true);
  }
};


/** @inheritDoc */
chartEditor.ui.dataSets.Widget.prototype.disposeInternal = function() {
  goog.disposeAll(this.panels_);
  this.panels_.length = 0;

  chartEditor.ui.dataSets.Widget.base(this, 'disposeInternal');
};
