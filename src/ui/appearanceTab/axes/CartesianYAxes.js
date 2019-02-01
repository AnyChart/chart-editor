goog.provide('chartEditor.ui.appearanceTabs.axes.CartesianYAxes');

goog.require('chartEditor.ui.appearanceTabs.axes.Cartesian');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.appearanceTabs.axes.Cartesian}
 */
chartEditor.ui.appearanceTabs.axes.CartesianYAxes = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.axes.CartesianYAxes.base(this, 'constructor', model, opt_domHelper);

  this.name = 'Y Axes';
  this.xOrY = 'y';
};
goog.inherits(chartEditor.ui.appearanceTabs.axes.CartesianYAxes, chartEditor.ui.appearanceTabs.axes.Cartesian);
