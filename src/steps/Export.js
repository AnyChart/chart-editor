goog.provide('chartEditor.steps.Export');

goog.require("chartEditor.Chart");
goog.require("chartEditor.Component");
goog.require("chartEditor.ExportTabs");
goog.require("chartEditor.steps.Base");


/**
 * Chart Editor Step Class.
 * @constructor
 * @param {number} index Step index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {chartEditor.steps.Base}
 */
chartEditor.steps.Export = function(index, opt_domHelper) {
  chartEditor.steps.Export.base(this, 'constructor', index, opt_domHelper);

  this.name('Export');

  this.title('Export');

  this.addClassName('anychart-ce-step-export');
};
goog.inherits(chartEditor.steps.Export, chartEditor.steps.Base);


/** @inheritDoc */
chartEditor.steps.Export.prototype.createDom = function() {
  chartEditor.steps.Export.base(this, 'createDom');

  // Loading scripts (http://prismjs.com)
  var dom = this.getDomHelper();
  var element = goog.dom.getDocument()['body'];this.getElement();
  dom.appendChild(element,
      dom.createDom(goog.dom.TagName.SCRIPT,
          {'src': 'http://cdn.anychart.com/chart-editor/prism-compiled.min.js'}));

  dom.appendChild(element,
      dom.createDom(goog.dom.TagName.LINK,
          {'href': 'http://cdn.anychart.com/chart-editor/prism-compiled.min.css', 'type': 'text/css', 'rel': 'stylesheet'}));

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
  this.chartWrapper_ = chartWrapper;

  this.exportTabs_ = new chartEditor.ExportTabs(model, tabs, tabContent);
  this.addChild(this.exportTabs_, true);
};


/** @inheritDoc */
chartEditor.steps.Export.prototype.enterDocument = function() {
  chartEditor.steps.Export.base(this, 'enterDocument');

  var editor = /** @type {chartEditor.Editor} */(this.getParent());
  var model = /** @type {chartEditor.EditorModel} */(editor.getModel());

  this.chart_ = new chartEditor.Chart(model);
  this.chartWrapper_.addChild(this.chart_, true);
};


/** @inheritDoc */
chartEditor.steps.Export.prototype.exitDocument = function() {
  chartEditor.steps.Export.base(this, 'exitDocument');

  goog.dispose(this.chart_);
  this.chart_ = null;
};


/** @inheritDoc */
chartEditor.steps.Export.prototype.disposeInternal = function() {
  goog.disposeAll([this.chart_, this.exportTabs_]);
  this.chart_ = null;
  this.exportTabs_ = null;

  chartEditor.steps.Export.base(this, 'disposeInternal');
};
