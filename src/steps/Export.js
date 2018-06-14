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

  this.name(chartEditor.enums.EditorSteps.EXPORT);

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

  var buttonsWrapper = new chartEditor.Component();
  buttonsWrapper.addClassName('anychart-ce-tabs-buttons-wrapper');
  this.addChild(buttonsWrapper, true);

  var rightWrapper = new chartEditor.Component();
  rightWrapper.addClassName('anychart-ce-step-right-wrapper');
  this.addChild(rightWrapper, true);

  this.tabs = new chartEditor.ExportTabs(model, buttonsWrapper);
  this.tabs.updateDescriptors(this.tabsSettings);
  rightWrapper.addChild(this.tabs, true);

  var chartWrapper = new chartEditor.Component();
  chartWrapper.addClassName('anychart-ce-step-chart-wrapper');
  rightWrapper.addChild(chartWrapper, true);
  this.chartWrapper_ = chartWrapper;
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
  goog.dispose(this.chart_);
  this.chart_ = null;

  chartEditor.steps.Export.base(this, 'disposeInternal');
};
