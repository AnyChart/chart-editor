goog.provide('chartEditor.steps.VisualAppearance');

goog.require("chartEditor.AppearanceTabs");
goog.require("chartEditor.Chart");
goog.require("chartEditor.Component");
goog.require("chartEditor.events");
goog.require("chartEditor.steps.Base");
goog.require("goog.dom.classlist");



/**
 * Chart Editor Step Class.
 * @constructor
 * @param {number} index Step index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {chartEditor.steps.Base}
 */
chartEditor.steps.VisualAppearance = function(index, opt_domHelper) {
  chartEditor.steps.VisualAppearance.base(this, 'constructor', index, opt_domHelper);

  this.name(chartEditor.enums.EditorSteps.APPEARANCE);
  this.title('Visual Appearance');
};
goog.inherits(chartEditor.steps.VisualAppearance, chartEditor.steps.Base);


/** @inheritDoc */
chartEditor.steps.VisualAppearance.prototype.createDom = function() {
  chartEditor.steps.VisualAppearance.base(this, 'createDom');

  var editor = /** @type {chartEditor.Editor} */(this.getParent());
  var model = /** @type {chartEditor.EditorModel} */(editor.getModel());

  var buttonsWrapper = new chartEditor.Component();
  buttonsWrapper.addClassName('anychart-ce-tabs-buttons-wrapper');
  this.addChild(buttonsWrapper, true);

  var rightWrapper = new chartEditor.Component();
  rightWrapper.addClassName('anychart-ce-step-right-wrapper');
  this.addChild(rightWrapper, true);

  this.tabs = new chartEditor.AppearanceTabs(model, buttonsWrapper);
  this.tabs.updateDescriptors(this.tabsSettings);
  rightWrapper.addChild(this.tabs, true);

  var chartWrapper = new chartEditor.Component();
  chartWrapper.addClassName('anychart-ce-step-chart-wrapper');
  rightWrapper.addChild(chartWrapper, true);

  this.chartWrapper = chartWrapper;
  var caption = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-section-caption anychart-chart-preview-caption', 'Chart Preview');
  goog.dom.appendChild(this.chartWrapper.getElement(), caption);
};


/** @inheritDoc */
chartEditor.steps.VisualAppearance.prototype.enterDocument = function() {
  chartEditor.steps.VisualAppearance.base(this, 'enterDocument');

  var editor = /** @type {chartEditor.Editor} */(this.getParent());
  var model = /** @type {chartEditor.EditorModel} */(editor.getModel());

  this.chart_ = new chartEditor.Chart(model);
  this.chartWrapper.addChild(this.chart_, true);
};


/** @inheritDoc */
chartEditor.steps.VisualAppearance.prototype.exitDocument = function() {
  chartEditor.steps.VisualAppearance.base(this, 'exitDocument');
  goog.dispose(this.chart_);
  this.chart_ = null;
};


/** @inheritDoc */
chartEditor.steps.VisualAppearance.prototype.disposeInternal = function() {
  goog.dispose(this.chart_);
  this.chart_ = null;
  chartEditor.steps.VisualAppearance.base(this, 'disposeInternal');
};
