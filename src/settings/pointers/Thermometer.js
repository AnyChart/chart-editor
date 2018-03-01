goog.provide('anychart.chartEditorModule.settings.pointers.Thermometer');

goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
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
anychart.chartEditorModule.settings.pointers.Thermometer = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  anychart.chartEditorModule.settings.pointers.Thermometer.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'thermometer';

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-thermometer'));
};
goog.inherits(anychart.chartEditorModule.settings.pointers.Thermometer, anychart.chartEditorModule.settings.pointers.LinearBase);


/** @override */
anychart.chartEditorModule.settings.pointers.Thermometer.prototype.createDom = function() {
  anychart.chartEditorModule.settings.pointers.Thermometer.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  this.addContentSeparator();

  var bulbRadius = new anychart.chartEditorModule.comboBox.Percent();
  bulbRadius.allowNegative(true);
  bulbRadius.setOptions([0, 1, 3, 5, 10, 15, 20, 30]);
  var bulbRadiusLC = new anychart.chartEditorModule.controls.LabeledControl(bulbRadius, 'Bulb Radius');
  bulbRadiusLC.init(model, this.genKey('bulbRadius()'));
  this.addChildControl(bulbRadiusLC);

  var bulbPadding = new anychart.chartEditorModule.comboBox.Percent();
  bulbPadding.setOptions([0, 1, 3, 5, 10, 15]);
  var bulbPaddingLC = new anychart.chartEditorModule.controls.LabeledControl(bulbPadding, 'Bulb Padding');
  bulbPaddingLC.init(model, this.genKey('bulbPadding()'));
  this.addChildControl(bulbPaddingLC);
};
