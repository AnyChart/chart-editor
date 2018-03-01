goog.provide('anychart.chartEditorModule.YAxesPanel');

goog.require('anychart.chartEditorModule.CartesianAxesPanelBase');



/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.CartesianAxesPanelBase}
 */
anychart.chartEditorModule.YAxesPanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.YAxesPanel.base(this, 'constructor', model, opt_domHelper);

  this.name = 'Y Axes';
  this.xOrY = 'y';
};
goog.inherits(anychart.chartEditorModule.YAxesPanel, anychart.chartEditorModule.CartesianAxesPanelBase);
