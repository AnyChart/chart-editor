goog.provide('chartEditor.settings.pointers.RangeBar');

goog.require('chartEditor.settings.pointers.LinearBase');


/**
 * @param {chartEditor.EditorModel} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.pointers.LinearBase}
 */
chartEditor.settings.pointers.RangeBar = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.settings.pointers.RangeBar.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'rangeBar';

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-pointer-range-bar'));
};
goog.inherits(chartEditor.settings.pointers.RangeBar, chartEditor.settings.pointers.LinearBase);
