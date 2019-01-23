goog.provide('chartEditor.ui.appearanceTabs.axes.RadarPolarXAxis');

goog.require('chartEditor.ui.appearanceTabs.axes.RadarPolar');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.appearanceTabs.axes.RadarPolar}
 */
chartEditor.ui.appearanceTabs.axes.RadarPolarXAxis = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.axes.RadarPolarXAxis.base(this, 'constructor', model, opt_domHelper);

  this.name = 'X Axis';
  this.xOrY = 'x';
};
goog.inherits(chartEditor.ui.appearanceTabs.axes.RadarPolarXAxis, chartEditor.ui.appearanceTabs.axes.RadarPolar);
