goog.provide('chartEditor.ui.panel.pointers.Thermometer');

goog.require('chartEditor.ui.control.comboBox.Percent');
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
chartEditor.ui.panel.pointers.Thermometer = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.ui.panel.pointers.Thermometer.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'thermometer';

  this.addClassName(goog.getCssName('anychart-ce-panel-pointer-thermometer'));
};
goog.inherits(chartEditor.ui.panel.pointers.Thermometer, chartEditor.ui.panel.pointers.LinearBase);


/** @override */
chartEditor.ui.panel.pointers.Thermometer.prototype.createDom = function() {
  chartEditor.ui.panel.pointers.Thermometer.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  this.addContentSeparator();

  var bulbRadius = new chartEditor.ui.control.comboBox.Percent();
  bulbRadius.allowNegative(true);
  bulbRadius.setOptions([0, 1, 3, 5, 10, 15, 20, 30]);
  var bulbRadiusLC = new chartEditor.ui.control.wrapped.Labeled(bulbRadius, 'Bulb Radius');
  bulbRadiusLC.init(model, this.genKey('bulbRadius()'));
  this.addChildControl(bulbRadiusLC);

  var bulbPadding = new chartEditor.ui.control.comboBox.Percent();
  bulbPadding.setOptions([0, 1, 3, 5, 10, 15]);
  var bulbPaddingLC = new chartEditor.ui.control.wrapped.Labeled(bulbPadding, 'Bulb Padding');
  bulbPaddingLC.init(model, this.genKey('bulbPadding()'));
  this.addChildControl(bulbPaddingLC);
};
