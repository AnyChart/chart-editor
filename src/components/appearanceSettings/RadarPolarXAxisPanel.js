goog.provide('anychart.chartEditorModule.RadarPolarXAxisPanel');

goog.require('anychart.chartEditorModule.RadarPolarAxesPanelBase');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.RadarPolarAxesPanelBase}
 */
anychart.chartEditorModule.RadarPolarXAxisPanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.RadarPolarXAxisPanel.base(this, 'constructor', model, opt_domHelper);

  this.name = 'X Axis';
  this.xOrY = 'x';
};
goog.inherits(anychart.chartEditorModule.RadarPolarXAxisPanel, anychart.chartEditorModule.RadarPolarAxesPanelBase);
