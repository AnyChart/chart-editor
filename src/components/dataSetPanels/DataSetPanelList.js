goog.provide('anychart.chartEditorModule.DataSetPanelList');

goog.require('anychart.chartEditorModule.Component');
goog.require('anychart.chartEditorModule.DataSetPanel');
goog.require('anychart.chartEditorModule.EditorModel');
goog.require('anychart.chartEditorModule.dataSetPanelList.Intro');
goog.require('anychart.ui.Component');


/**
 * List of data set panels on SetupChart step.
 *
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.Component}
 */
anychart.chartEditorModule.DataSetPanelList = function(model, opt_domHelper) {
  anychart.chartEditorModule.DataSetPanelList.base(this, 'constructor', opt_domHelper);

  this.panels_ = [];
  this.setModel(model);
  this.addClassName('anychart-connected-data-sets');

};
goog.inherits(anychart.chartEditorModule.DataSetPanelList, anychart.chartEditorModule.Component);


/** @inheritDoc */
anychart.chartEditorModule.DataSetPanelList.prototype.enterDocument = function() {
  anychart.chartEditorModule.DataSetPanelList.base(this, 'enterDocument');

  this.onModelChange(null);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  this.getHandler().listen(model, anychart.chartEditorModule.events.EventType.EDITOR_MODEL_UPDATE, this.onModelChange);
};


/**
 * Updates component on model change.
 * @param {?Object} evt
 */
anychart.chartEditorModule.DataSetPanelList.prototype.onModelChange = function(evt) {
  var active = this.getModel().getActive();
  var activeGeo = this.getModel().getActiveGeo();
  var data = this.getModel().getPreparedData();

  // clear all content
  this.removeChildren(true);
  goog.disposeAll(this.panels_);
  this.panels_ = [];

  // add caption
  var caption = new anychart.ui.Component();
  caption.addClassName('anychart-chart-editor-section-caption');
  caption.addClassName('anychart-connected-data-sets-caption');
  this.addChild(caption, true);

  // todo: rework this hack!!
  caption.getElement().innerHTML = 'Connected Data Sets';

  // add data sets or intro
  var step = /** @type {anychart.chartEditorModule.steps.Base} */(this.getParent());
  if (data.length) {
    for (var i = 0; i < data.length; i++) {
      if (step.getIndex() === 1 || data[i].type !== anychart.chartEditorModule.EditorModel.DataType.GEO) {
        var panel = new anychart.chartEditorModule.DataSetPanel(data[i]);
        this.panels_.push(panel);
        this.addChild(panel, true);

        panel.setDisabled(step.getIndex() === 0 || this.panels_[i].getSetFullId() !== active);

        if (data[i].type === anychart.chartEditorModule.EditorModel.DataType.GEO)
          this.panels_[i].setActiveGeo(this.panels_[i].getSetFullId() === activeGeo);
      }
    }
  } else {
    var intro = new anychart.chartEditorModule.dataSetPanelList.Intro();
    this.addChild(intro, true);
  }
};
