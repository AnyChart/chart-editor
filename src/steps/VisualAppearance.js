goog.provide('anychart.chartEditorModule.steps.VisualAppearance');

goog.require('anychart.chartEditorModule.AppearanceSettings');
goog.require('anychart.chartEditorModule.Chart');
goog.require('anychart.chartEditorModule.events');
goog.require('anychart.chartEditorModule.steps.Base');
goog.require('anychart.ui.Component');
goog.require('goog.dom.classlist');



/**
 * Chart Editor Step Class.
 * @constructor
 * @param {number} index Step index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {anychart.chartEditorModule.steps.Base}
 */
anychart.chartEditorModule.steps.VisualAppearance = function(index, opt_domHelper) {
  anychart.chartEditorModule.steps.VisualAppearance.base(this, 'constructor', index, opt_domHelper);

  this.name('Visual Appearance');
  this.title('Visual Appearance');
  this.addClassName('anychart-visual-appearance-step');

  this.panelsSettings_ = {};
};
goog.inherits(anychart.chartEditorModule.steps.VisualAppearance, anychart.chartEditorModule.steps.Base);


/** @inheritDoc */
anychart.chartEditorModule.steps.VisualAppearance.prototype.createDom = function() {
  anychart.chartEditorModule.steps.VisualAppearance.base(this, 'createDom');

  var editor = /** @type {anychart.chartEditorModule.Editor} */(this.getParent());
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(editor.getModel());

  var tabs = new anychart.ui.Component();
  tabs.addClassName('anychart-border-box');
  tabs.addClassName('anychart-visual-appearance-step-tabs');
  this.addChild(tabs, true);

  var wrapper = new anychart.ui.Component();
  wrapper.addClassName('anychart-visual-appearance-right-wrapper');
  this.addChild(wrapper, true);

  var tabContent = new anychart.ui.Component();
  tabContent.addClassName('anychart-border-box');
  tabContent.addClassName('anychart-visual-appearance-settings-tab-content');
  wrapper.addChild(tabContent, true);

  var chartWrapper = new anychart.ui.Component();
  chartWrapper.addClassName('anychart-border-box');
  chartWrapper.addClassName('anychart-visual-appearance-settings-chart-wrapper');
  wrapper.addChild(chartWrapper, true);

  this.chartWrapper_ = chartWrapper;
  var caption = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-chart-editor-section-caption anychart-chart-preview-caption', 'Chart Preview');
  goog.dom.appendChild(this.chartWrapper_.getElement(), caption);

  //todo: rework as separate components with fixed structure
  this.appearanceSettings_ = new anychart.chartEditorModule.AppearanceSettings(model, tabs, tabContent);
  this.appearanceSettings_.updateDescriptors(this.panelsSettings_);
  this.addChild(this.appearanceSettings_, true);
};


/** @inheritDoc */
anychart.chartEditorModule.steps.VisualAppearance.prototype.enterDocument = function() {
  // Should be called before enterDocument()!
  this.appearanceSettings_.updateExclusions();

  anychart.chartEditorModule.steps.VisualAppearance.base(this, 'enterDocument');

  var editor = /** @type {anychart.chartEditorModule.Editor} */(this.getParent());
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(editor.getModel());

  this.chart_ = new anychart.chartEditorModule.Chart(model);
  this.chartWrapper_.addChild(this.chart_, true);
};


/** @inheritDoc */
anychart.chartEditorModule.steps.VisualAppearance.prototype.exitDocument = function() {
  anychart.chartEditorModule.steps.VisualAppearance.base(this, 'exitDocument');
  goog.dispose(this.chart_);
  this.chart_ = null;
};


/** @inheritDoc */
anychart.chartEditorModule.steps.VisualAppearance.prototype.disposeInternal = function() {
  goog.dispose(this.chart_);
  this.chart_ = null;
  goog.dispose(this.appearanceSettings_);
  this.appearanceSettings_ = null;

  anychart.chartEditorModule.steps.VisualAppearance.base(this, 'disposeInternal');
};


/**
 * Enable/disable context menu panel.
 * @param {boolean} enabled
 */
anychart.chartEditorModule.steps.VisualAppearance.prototype.contextMenu = function(enabled) {
  if (this.appearanceSettings_)
    this.appearanceSettings_.enablePanelByName('ContextMenu', enabled);
  else {
    this.panelsSettings_['ContextMenu'] = this.panelsSettings_['ContextMenu'] ? this.panelsSettings_['ContextMenu'] : {};
    this.panelsSettings_['ContextMenu'].enabled = enabled;
  }
};


(function() {
  var proto = anychart.chartEditorModule.steps.VisualAppearance.prototype;
  proto['contextMenu'] = proto.contextMenu;
})();
