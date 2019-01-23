goog.provide('chartEditor.ui.appearanceTabs.Tabs');

goog.require('chartEditor.model.Base');
goog.require('chartEditor.ui.Tabs');



/**
 * Appearance tabs widget.
 *
 * @param {chartEditor.model.Base} model
 * @param {chartEditor.ui.Component=} opt_buttonsWrapper
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Tabs}
 */
chartEditor.ui.appearanceTabs.Tabs = function(model, opt_buttonsWrapper, opt_domHelper) {
  chartEditor.ui.appearanceTabs.Tabs.base(this, 'constructor', model, opt_buttonsWrapper, opt_domHelper);

  this.descriptors = model.appearanceTabs;
};
goog.inherits(chartEditor.ui.appearanceTabs.Tabs, chartEditor.ui.Tabs);

