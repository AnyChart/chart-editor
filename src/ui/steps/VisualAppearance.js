goog.provide('chartEditor.ui.steps.VisualAppearance');

goog.require('chartEditor.events');
goog.require('chartEditor.ui.Chart');
goog.require('chartEditor.ui.Component');
goog.require('chartEditor.ui.appearanceTabs.Tabs');
goog.require('chartEditor.ui.steps.Step');
goog.require('goog.dom.classlist');



/**
 * Chart Editor Step Class.
 * @constructor
 * @param {number} index Step index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {chartEditor.ui.steps.Step}
 */
chartEditor.ui.steps.VisualAppearance = function(index, opt_domHelper) {
  chartEditor.ui.steps.VisualAppearance.base(this, 'constructor', index, opt_domHelper);

  this.name(chartEditor.enums.EditorSteps.APPEARANCE);

  this.title('Visual Appearance');
};
goog.inherits(chartEditor.ui.steps.VisualAppearance, chartEditor.ui.steps.Step);


/** @inheritDoc */
chartEditor.ui.steps.VisualAppearance.prototype.createDom = function() {
  chartEditor.ui.steps.VisualAppearance.base(this, 'createDom');

  var editor = /** @type {chartEditor.editor.Base} */(this.getParent());
  var model = /** @type {chartEditor.model.Base} */(editor.getModel());

  var buttonsWrapper = new chartEditor.ui.Component();
  buttonsWrapper.addClassName('anychart-ce-tabs-buttons-wrapper');
  this.addChild(buttonsWrapper, true);

  var rightWrapper = new chartEditor.ui.Component();
  rightWrapper.addClassName('anychart-ce-step-right-wrapper');
  this.addChild(rightWrapper, true);

  this.tabs = new chartEditor.ui.appearanceTabs.Tabs(model, buttonsWrapper);
  this.tabs.updateDescriptors(this.tabsSettings);
  rightWrapper.addChild(this.tabs, true);

  var chartWrapper = new chartEditor.ui.Component();
  chartWrapper.addClassName('anychart-ce-step-chart-wrapper');
  rightWrapper.addChild(chartWrapper, true);

  this.chartWrapper = chartWrapper;
  var caption = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-section-caption anychart-chart-preview-caption', 'Chart Preview');
  goog.dom.appendChild(this.chartWrapper.getElement(), caption);
};


/** @inheritDoc */
chartEditor.ui.steps.VisualAppearance.prototype.enterDocument = function() {
  chartEditor.ui.steps.VisualAppearance.base(this, 'enterDocument');

  var editor = /** @type {chartEditor.editor.Base} */(this.getParent());
  var model = /** @type {chartEditor.model.Base} */(editor.getModel());

  this.chart_ = new chartEditor.ui.Chart(model);
  this.chartWrapper.addChild(this.chart_, true);
};


/** @inheritDoc */
chartEditor.ui.steps.VisualAppearance.prototype.exitDocument = function() {
  chartEditor.ui.steps.VisualAppearance.base(this, 'exitDocument');
  goog.dispose(this.chart_);
  this.chart_ = null;
};


/** @inheritDoc */
chartEditor.ui.steps.VisualAppearance.prototype.disposeInternal = function() {
  goog.dispose(this.chart_);
  this.chart_ = null;
  chartEditor.ui.steps.VisualAppearance.base(this, 'disposeInternal');
};
