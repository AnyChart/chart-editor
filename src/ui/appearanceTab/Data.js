goog.provide('chartEditor.ui.appearanceTabs.Data');

goog.require("chartEditor.ui.Component");
goog.require("chartEditor.ui.Panel");
goog.require("chartEditor.ui.dataSettings.Widget");



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.Data = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.Data.base(this, 'constructor', model, 'Data', opt_domHelper);
  this.stringId = chartEditor.enums.EditorTabs.DATA;
};
goog.inherits(chartEditor.ui.appearanceTabs.Data, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.Data.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.Data.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  // user data and predefined data sets sections wrapper
  var wrapper = new chartEditor.ui.Component();
  this.addChild(wrapper, true);

  var chartDataSettings = new chartEditor.ui.dataSettings.Widget(model);
  wrapper.addChild(chartDataSettings, true);
};
