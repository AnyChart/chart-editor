goog.provide('chartEditor.YAxesPanel');

goog.require('chartEditor.CartesianAxesPanelBase');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.CartesianAxesPanelBase}
 */
chartEditor.YAxesPanel = function(model, opt_domHelper) {
  chartEditor.YAxesPanel.base(this, 'constructor', model, opt_domHelper);

  this.name = 'Y Axes';
  this.xOrY = 'y';
};
goog.inherits(chartEditor.YAxesPanel, chartEditor.CartesianAxesPanelBase);
