goog.provide('chartEditor.RadarPolarXAxisPanel');

goog.require('chartEditor.RadarPolarAxesPanelBase');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.RadarPolarAxesPanelBase}
 */
chartEditor.RadarPolarXAxisPanel = function(model, opt_domHelper) {
  chartEditor.RadarPolarXAxisPanel.base(this, 'constructor', model, opt_domHelper);

  this.name = 'X Axis';
  this.xOrY = 'x';
};
goog.inherits(chartEditor.RadarPolarXAxisPanel, chartEditor.RadarPolarAxesPanelBase);
