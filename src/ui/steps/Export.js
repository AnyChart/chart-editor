goog.provide('chartEditor.ui.steps.Export');

goog.require("chartEditor.ui.Chart");
goog.require("chartEditor.ui.Component");
goog.require("chartEditor.ui.exportTabs.Tabs");
goog.require("chartEditor.ui.steps.Step");


/**
 * Chart Editor Step Class.
 * @constructor
 * @param {number} index Step index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {chartEditor.ui.steps.Step}
 */
chartEditor.ui.steps.Export = function(index, opt_domHelper) {
  chartEditor.ui.steps.Export.base(this, 'constructor', index, opt_domHelper);

  this.name(chartEditor.enums.EditorSteps.EXPORT);

  this.title('Export');

  this.addClassName('anychart-ce-step-export');
};
goog.inherits(chartEditor.ui.steps.Export, chartEditor.ui.steps.Step);


/** @inheritDoc */
chartEditor.ui.steps.Export.prototype.createDom = function() {
  chartEditor.ui.steps.Export.base(this, 'createDom');

  // Loading scripts (http://prismjs.com)
  var dom = this.getDomHelper();
  var element = goog.dom.getDocument()['body'];this.getElement();
  dom.appendChild(element,
      dom.createDom(goog.dom.TagName.SCRIPT,
          {'src': 'http://cdn.anychart.com/chart-editor/prism-compiled.min.js'}));

  dom.appendChild(element,
      dom.createDom(goog.dom.TagName.LINK,
          {'href': 'http://cdn.anychart.com/chart-editor/prism-compiled.min.css', 'type': 'text/css', 'rel': 'stylesheet'}));

  var editor = /** @type {chartEditor.editor.Base} */(this.getParent());
  var model = /** @type {chartEditor.model.Base} */(editor.getModel());

  var buttonsWrapper = new chartEditor.ui.Component();
  buttonsWrapper.addClassName('anychart-ce-tabs-buttons-wrapper');
  this.addChild(buttonsWrapper, true);

  var rightWrapper = new chartEditor.ui.Component();
  rightWrapper.addClassName('anychart-ce-step-right-wrapper');
  this.addChild(rightWrapper, true);

  this.tabs = new chartEditor.ui.exportTabs.Tabs(model, buttonsWrapper);
  this.tabs.updateDescriptors(this.tabsSettings);
  rightWrapper.addChild(this.tabs, true);

  var chartWrapper = new chartEditor.ui.Component();
  chartWrapper.addClassName('anychart-ce-step-chart-wrapper');
  rightWrapper.addChild(chartWrapper, true);
  this.chartWrapper_ = chartWrapper;
};


/** @inheritDoc */
chartEditor.ui.steps.Export.prototype.enterDocument = function() {
  chartEditor.ui.steps.Export.base(this, 'enterDocument');

  var editor = /** @type {chartEditor.editor.Base} */(this.getParent());
  var model = /** @type {chartEditor.model.Base} */(editor.getModel());

  this.chart_ = new chartEditor.ui.Chart(model);
  this.chartWrapper_.addChild(this.chart_, true);
};


/** @inheritDoc */
chartEditor.ui.steps.Export.prototype.exitDocument = function() {
  chartEditor.ui.steps.Export.base(this, 'exitDocument');

  goog.dispose(this.chart_);
  this.chart_ = null;
};


/** @inheritDoc */
chartEditor.ui.steps.Export.prototype.disposeInternal = function() {
  goog.dispose(this.chart_);
  this.chart_ = null;

  chartEditor.ui.steps.Export.base(this, 'disposeInternal');
};
