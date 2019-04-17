goog.provide('chartEditor.ui.panel.pointers.Tank');

goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
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
chartEditor.ui.panel.pointers.Tank = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.ui.panel.pointers.Tank.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.skipSettings(['stroke()']);

  this.addClassName(goog.getCssName('anychart-ce-panel-pointer-tank'));
};
goog.inherits(chartEditor.ui.panel.pointers.Tank, chartEditor.ui.panel.pointers.LinearBase);


/** @override */
chartEditor.ui.panel.pointers.Tank.prototype.createDom = function() {
  chartEditor.ui.panel.pointers.Tank.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  this.addContentSeparator();

  var emptyFill = new chartEditor.ui.control.colorPicker.Base();
  var emptyFillLC = new chartEditor.ui.control.wrapped.Labeled(emptyFill, 'Empty Fill');
  emptyFillLC.init(model, this.genKey('emptyFill()'));
  this.addChildControl(emptyFillLC);
};
