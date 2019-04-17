goog.provide('chartEditor.ui.panel.pointers.RangeBar');

goog.require('chartEditor.ui.panel.pointers.LinearBase');


/**
 * @param {chartEditor.model.Base} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.panel.pointers.LinearBase}
 */
chartEditor.ui.panel.pointers.RangeBar = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.ui.panel.pointers.RangeBar.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.addClassName(goog.getCssName('anychart-ce-panel-pointer-range-bar'));
};
goog.inherits(chartEditor.ui.panel.pointers.RangeBar, chartEditor.ui.panel.pointers.LinearBase);
