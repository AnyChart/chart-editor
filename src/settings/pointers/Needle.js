goog.provide('chartEditor.settings.pointers.Needle');

goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.settings.pointers.CircularBase');


/**
 * @param {chartEditor.EditorModel} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.pointers.CircularBase}
 */
chartEditor.settings.pointers.Needle = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.settings.pointers.Needle.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'needle';

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-needle'));
};
goog.inherits(chartEditor.settings.pointers.Needle, chartEditor.settings.pointers.CircularBase);


/** @override */
chartEditor.settings.pointers.Needle.prototype.createDom = function() {
  chartEditor.settings.pointers.Needle.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var validateFunction = function(value) {
    return /^-?\d{1,3}%?$/.test(value);
  };

  var formatterFunction = function(value) {
    var match = String(value).match(/^(-?\d{1,3})%?$/);
    return match[1] + "%";
  };
  var radiusOptions = [-20, -10, 0, 10, 30, 50, 70, 100, 110];
  var widthOptions = [0, 3, 5, 10, 15, 20];

  var startRadius = new chartEditor.comboBox.Percent();
  startRadius.setValidateFunction(validateFunction);
  startRadius.setFormatterFunction(formatterFunction);
  startRadius.setOptions(radiusOptions);
  var startRadiusLC = new chartEditor.controls.LabeledControl(startRadius, 'Start Radius');
  startRadiusLC.init(model, this.genKey('startRadius()'));
  this.addChildControl(startRadiusLC);

  var startWidth = new chartEditor.comboBox.Percent();
  startWidth.setOptions(widthOptions);
  var startWidthLC = new chartEditor.controls.LabeledControl(startWidth, 'Start Width');
  startWidthLC.init(model, this.genKey('startWidth()'));
  this.addChildControl(startWidthLC);

  var middleRadius = new chartEditor.comboBox.Percent();
  middleRadius.setValidateFunction(validateFunction);
  middleRadius.setFormatterFunction(formatterFunction);
  middleRadius.setOptions(radiusOptions);
  var middleRadiusLC = new chartEditor.controls.LabeledControl(middleRadius, 'Middle Radius');
  middleRadiusLC.init(model, this.genKey('middleRadius()'));
  this.addChildControl(middleRadiusLC);

  var middleWidth = new chartEditor.comboBox.Percent();
  middleWidth.setOptions(widthOptions);
  var middleWidthLC = new chartEditor.controls.LabeledControl(middleWidth, 'Middle Width');
  middleWidthLC.init(model, this.genKey('middleWidth()'));
  this.addChildControl(middleWidthLC);

  var endRadius = new chartEditor.comboBox.Percent();
  endRadius.setValidateFunction(validateFunction);
  endRadius.setFormatterFunction(formatterFunction);
  endRadius.setOptions(radiusOptions);
  var endRadiusLC = new chartEditor.controls.LabeledControl(endRadius, 'End Radius');
  endRadiusLC.init(model, this.genKey('endRadius()'));
  this.addChildControl(endRadiusLC);

  var endWidth = new chartEditor.comboBox.Percent();
  endWidth.setOptions(widthOptions);
  var endWidthLC = new chartEditor.controls.LabeledControl(endWidth, 'End Width');
  endWidthLC.init(model, this.genKey('endWidth()'));
  this.addChildControl(endWidthLC);
};
