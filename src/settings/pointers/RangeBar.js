goog.provide('anychart.chartEditorModule.settings.pointers.RangeBar');

goog.require('anychart.chartEditorModule.settings.pointers.LinearBase');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.settings.pointers.LinearBase}
 */
anychart.chartEditorModule.settings.pointers.RangeBar = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  anychart.chartEditorModule.settings.pointers.RangeBar.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'rangeBar';

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-range-bar'));
};
goog.inherits(anychart.chartEditorModule.settings.pointers.RangeBar, anychart.chartEditorModule.settings.pointers.LinearBase);
