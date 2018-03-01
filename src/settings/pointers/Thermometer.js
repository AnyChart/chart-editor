goog.provide('chartEditor.settings.pointers.Thermometer');

goog.require('chartEditor.comboBox.Percent');
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
chartEditor.settings.pointers.Thermometer = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.settings.pointers.Thermometer.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'thermometer';

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-thermometer'));
};
goog.inherits(chartEditor.settings.pointers.Thermometer, chartEditor.settings.pointers.LinearBase);


/** @override */
chartEditor.settings.pointers.Thermometer.prototype.createDom = function() {
  chartEditor.settings.pointers.Thermometer.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  this.addContentSeparator();

  var bulbRadius = new chartEditor.comboBox.Percent();
  bulbRadius.allowNegative(true);
  bulbRadius.setOptions([0, 1, 3, 5, 10, 15, 20, 30]);
  var bulbRadiusLC = new chartEditor.controls.LabeledControl(bulbRadius, 'Bulb Radius');
  bulbRadiusLC.init(model, this.genKey('bulbRadius()'));
  this.addChildControl(bulbRadiusLC);

  var bulbPadding = new chartEditor.comboBox.Percent();
  bulbPadding.setOptions([0, 1, 3, 5, 10, 15]);
  var bulbPaddingLC = new chartEditor.controls.LabeledControl(bulbPadding, 'Bulb Padding');
  bulbPaddingLC.init(model, this.genKey('bulbPadding()'));
  this.addChildControl(bulbPaddingLC);
};
