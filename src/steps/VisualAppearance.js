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

  this.name('Visual Appearance');

  this.title('Visual Appearance');

  this.tabsSettings = {};
};
goog.inherits(chartEditor.steps.VisualAppearance, chartEditor.steps.Base);


/** @inheritDoc */
chartEditor.steps.VisualAppearance.prototype.createDom = function() {
  chartEditor.steps.VisualAppearance.base(this, 'createDom');

  var editor = /** @type {chartEditor.Editor} */(this.getParent());
  var model = /** @type {chartEditor.EditorModel} */(editor.getModel());

  var tabs = new chartEditor.Component();
  tabs.addClassName('anychart-ce-step-tabs');
  this.addChild(tabs, true);

  var wrapper = new chartEditor.Component();
  wrapper.addClassName('anychart-ce-step-right-wrapper');
  this.addChild(wrapper, true);

  var tabContent = new chartEditor.Component();
  tabContent.addClassName('anychart-ce-step-tab-content');
  wrapper.addChild(tabContent, true);

  var chartWrapper = new chartEditor.Component();
  chartWrapper.addClassName('anychart-ce-step-chart-wrapper');
  wrapper.addChild(chartWrapper, true);

  this.chartWrapper = chartWrapper;
  var caption = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-section-caption anychart-chart-preview-caption', 'Chart Preview');
  goog.dom.appendChild(this.chartWrapper.getElement(), caption);

  this.appearanceTabs = new chartEditor.AppearanceTabs(model, tabs, tabContent);
  this.appearanceTabs.updateDescriptors(this.tabsSettings);
  this.addChild(this.appearanceTabs, true);
};


/** @inheritDoc */
chartEditor.steps.VisualAppearance.prototype.enterDocument = function() {
  // Should be called before enterDocument()!
  this.appearanceTabs.updateExclusions();

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
  goog.disposeAll([this.chart_, this.appearanceTabs]);
  this.chart_ = null;
  this.appearanceTabs = null;

  chartEditor.steps.VisualAppearance.base(this, 'disposeInternal');
};


/**
 * Enable/disable context menu panel.
 * @param {string} panelName
 * @param {boolean} enabled
 */
chartEditor.steps.VisualAppearance.prototype.enablePanel = function(panelName, enabled) {
  if (this.appearanceTabs)
    this.appearanceTabs.enablePanelByName(panelName, enabled);
  else {
    this.tabsSettings[panelName] = this.tabsSettings[panelName] ? this.tabsSettings[panelName] : {};
    this.tabsSettings[panelName].enabled = enabled;
  }
};


(function() {
  var proto = chartEditor.steps.VisualAppearance.prototype;
  proto['enablePanel'] = proto.enablePanel;
})();
