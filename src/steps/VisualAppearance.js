goog.provide('chartEditor.steps.VisualAppearance');

goog.require('chartEditor.AppearanceSettings');
goog.require('chartEditor.Chart');
goog.require('chartEditor.events');
goog.require('chartEditor.steps.Base');
goog.require('chartEditor.Component');
goog.require('goog.dom.classlist');



/**
 * Chart Editor Step Class.
 * @constructor
 * @param {number} index Step index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {chartEditor.steps.Base}
 */
chartEditor.steps.VisualAppearance = function(index, opt_domHelper) {
  chartEditor.steps.VisualAppearance.base(this, 'constructor', index, opt_domHelper);

  this.name('Visual Appearance');
  this.title('Visual Appearance');
  this.addClassName('anychart-visual-appearance-step');

  this.panelsSettings_ = {};
};
goog.inherits(chartEditor.steps.VisualAppearance, chartEditor.steps.Base);


/** @inheritDoc */
chartEditor.steps.VisualAppearance.prototype.createDom = function() {
  chartEditor.steps.VisualAppearance.base(this, 'createDom');

  var editor = /** @type {chartEditor.Editor} */(this.getParent());
  var model = /** @type {chartEditor.EditorModel} */(editor.getModel());

  var tabs = new chartEditor.Component();
  tabs.addClassName('anychart-border-box');
  tabs.addClassName('anychart-visual-appearance-step-tabs');
  this.addChild(tabs, true);

  var wrapper = new chartEditor.Component();
  wrapper.addClassName('anychart-visual-appearance-right-wrapper');
  this.addChild(wrapper, true);

  var tabContent = new chartEditor.Component();
  tabContent.addClassName('anychart-border-box');
  tabContent.addClassName('anychart-visual-appearance-settings-tab-content');
  wrapper.addChild(tabContent, true);

  var chartWrapper = new chartEditor.Component();
  chartWrapper.addClassName('anychart-border-box');
  chartWrapper.addClassName('anychart-visual-appearance-settings-chart-wrapper');
  wrapper.addChild(chartWrapper, true);

  this.chartWrapper_ = chartWrapper;
  var caption = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-chart-editor-section-caption anychart-chart-preview-caption', 'Chart Preview');
  goog.dom.appendChild(this.chartWrapper_.getElement(), caption);

  //todo: rework as separate components with fixed structure
  this.appearanceSettings_ = new chartEditor.AppearanceSettings(model, tabs, tabContent);
  this.appearanceSettings_.updateDescriptors(this.panelsSettings_);
  this.addChild(this.appearanceSettings_, true);
};


/** @inheritDoc */
chartEditor.steps.VisualAppearance.prototype.enterDocument = function() {
  // Should be called before enterDocument()!
  this.appearanceSettings_.updateExclusions();

  chartEditor.steps.VisualAppearance.base(this, 'enterDocument');

  var editor = /** @type {chartEditor.Editor} */(this.getParent());
  var model = /** @type {chartEditor.EditorModel} */(editor.getModel());

  this.chart_ = new chartEditor.Chart(model);
  this.chartWrapper_.addChild(this.chart_, true);
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
  goog.dispose(this.appearanceSettings_);
  this.appearanceSettings_ = null;

  chartEditor.steps.VisualAppearance.base(this, 'disposeInternal');
};


/**
 * Enable/disable context menu panel.
 * @param {boolean} enabled
 */
chartEditor.steps.VisualAppearance.prototype.contextMenu = function(enabled) {
  if (this.appearanceSettings_)
    this.appearanceSettings_.enablePanelByName('ContextMenu', enabled);
  else {
    this.panelsSettings_['ContextMenu'] = this.panelsSettings_['ContextMenu'] ? this.panelsSettings_['ContextMenu'] : {};
    this.panelsSettings_['ContextMenu'].enabled = enabled;
  }
};


(function() {
  var proto = chartEditor.steps.VisualAppearance.prototype;
  proto['contextMenu'] = proto.contextMenu;
})();
