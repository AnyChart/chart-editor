goog.provide('chartEditor.ui.appearanceTabs.axes.RadarPolarYAxis');

goog.require('chartEditor.ui.appearanceTabs.axes.RadarPolar');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.appearanceTabs.axes.RadarPolar}
 */
chartEditor.ui.appearanceTabs.axes.RadarPolarYAxis = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.axes.RadarPolarYAxis.base(this, 'constructor', model, opt_domHelper);

  this.name = 'Y Axis';
  this.xOrY = 'y';
};
goog.inherits(chartEditor.ui.appearanceTabs.axes.RadarPolarYAxis, chartEditor.ui.appearanceTabs.axes.RadarPolar);
