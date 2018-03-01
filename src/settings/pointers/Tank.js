goog.provide('chartEditor.settings.pointers.Tank');

goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.controls.LabeledControl');
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
chartEditor.settings.pointers.Tank = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.settings.pointers.Tank.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'tank';

  this.skipSettings(['stroke()']);

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-tank'));
};
goog.inherits(chartEditor.settings.pointers.Tank, chartEditor.settings.pointers.LinearBase);


/** @override */
chartEditor.settings.pointers.Tank.prototype.createDom = function() {
  chartEditor.settings.pointers.Tank.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  this.addContentSeparator();

  var emptyFill = new chartEditor.colorPicker.Base();
  var emptyFillLC = new chartEditor.controls.LabeledControl(emptyFill, 'Empty Fill');
  emptyFillLC.init(model, this.genKey('emptyFill()'));
  this.addChildControl(emptyFillLC);
};
