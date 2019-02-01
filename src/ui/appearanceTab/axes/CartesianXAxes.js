goog.provide('chartEditor.ui.appearanceTabs.axes.CartesianXAxes');

goog.require('chartEditor.ui.appearanceTabs.axes.Cartesian');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.appearanceTabs.axes.Cartesian}
 */
chartEditor.ui.appearanceTabs.axes.CartesianXAxes = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.axes.CartesianXAxes.base(this, 'constructor', model, opt_domHelper);

  this.name = 'X Axes';
  this.xOrY = 'x';
};
goog.inherits(chartEditor.ui.appearanceTabs.axes.CartesianXAxes, chartEditor.ui.appearanceTabs.axes.Cartesian);
