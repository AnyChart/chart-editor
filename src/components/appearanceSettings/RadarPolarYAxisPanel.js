goog.provide('chartEditor.RadarPolarYAxisPanel');

goog.require('chartEditor.RadarPolarAxesPanelBase');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.RadarPolarAxesPanelBase}
 */
chartEditor.RadarPolarYAxisPanel = function(model, opt_domHelper) {
  chartEditor.RadarPolarYAxisPanel.base(this, 'constructor', model, opt_domHelper);

  this.name = 'Y Axis';
  this.xOrY = 'y';
};
goog.inherits(chartEditor.RadarPolarYAxisPanel, chartEditor.RadarPolarAxesPanelBase);
