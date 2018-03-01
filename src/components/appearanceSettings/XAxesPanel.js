goog.provide('chartEditor.XAxesPanel');

goog.require('chartEditor.CartesianAxesPanelBase');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.CartesianAxesPanelBase}
 */
chartEditor.XAxesPanel = function(model, opt_domHelper) {
  chartEditor.XAxesPanel.base(this, 'constructor', model, opt_domHelper);

  this.name = 'X Axes';
  this.xOrY = 'x';
};
goog.inherits(chartEditor.XAxesPanel, chartEditor.CartesianAxesPanelBase);
