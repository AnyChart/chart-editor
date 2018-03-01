goog.provide('anychart.chartEditorModule.RadarPolarYAxisPanel');

goog.require('anychart.chartEditorModule.RadarPolarAxesPanelBase');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.RadarPolarAxesPanelBase}
 */
anychart.chartEditorModule.RadarPolarYAxisPanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.RadarPolarYAxisPanel.base(this, 'constructor', model, opt_domHelper);

  this.name = 'Y Axis';
  this.xOrY = 'y';
};
goog.inherits(anychart.chartEditorModule.RadarPolarYAxisPanel, anychart.chartEditorModule.RadarPolarAxesPanelBase);
