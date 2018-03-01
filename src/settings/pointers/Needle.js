goog.provide('anychart.chartEditorModule.settings.pointers.Needle');

goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.settings.pointers.CircularBase');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.settings.pointers.CircularBase}
 */
anychart.chartEditorModule.settings.pointers.Needle = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  anychart.chartEditorModule.settings.pointers.Needle.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'needle';

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-needle'));
};
goog.inherits(anychart.chartEditorModule.settings.pointers.Needle, anychart.chartEditorModule.settings.pointers.CircularBase);


/** @override */
anychart.chartEditorModule.settings.pointers.Needle.prototype.createDom = function() {
  anychart.chartEditorModule.settings.pointers.Needle.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var validateFunction = function(value) {
    return /^-?\d{1,3}%?$/.test(value);
  };

  var formatterFunction = function(value) {
    var match = String(value).match(/^(-?\d{1,3})%?$/);
    return match[1] + "%";
  };
  var radiusOptions = [-20, -10, 0, 10, 30, 50, 70, 100, 110];
  var widthOptions = [0, 3, 5, 10, 15, 20];

  var startRadius = new anychart.chartEditorModule.comboBox.Percent();
  startRadius.setValidateFunction(validateFunction);
  startRadius.setFormatterFunction(formatterFunction);
  startRadius.setOptions(radiusOptions);
  var startRadiusLC = new anychart.chartEditorModule.controls.LabeledControl(startRadius, 'Start Radius');
  startRadiusLC.init(model, this.genKey('startRadius()'));
  this.addChildControl(startRadiusLC);

  var startWidth = new anychart.chartEditorModule.comboBox.Percent();
  startWidth.setOptions(widthOptions);
  var startWidthLC = new anychart.chartEditorModule.controls.LabeledControl(startWidth, 'Start Width');
  startWidthLC.init(model, this.genKey('startWidth()'));
  this.addChildControl(startWidthLC);

  var middleRadius = new anychart.chartEditorModule.comboBox.Percent();
  middleRadius.setValidateFunction(validateFunction);
  middleRadius.setFormatterFunction(formatterFunction);
  middleRadius.setOptions(radiusOptions);
  var middleRadiusLC = new anychart.chartEditorModule.controls.LabeledControl(middleRadius, 'Middle Radius');
  middleRadiusLC.init(model, this.genKey('middleRadius()'));
  this.addChildControl(middleRadiusLC);

  var middleWidth = new anychart.chartEditorModule.comboBox.Percent();
  middleWidth.setOptions(widthOptions);
  var middleWidthLC = new anychart.chartEditorModule.controls.LabeledControl(middleWidth, 'Middle Width');
  middleWidthLC.init(model, this.genKey('middleWidth()'));
  this.addChildControl(middleWidthLC);

  var endRadius = new anychart.chartEditorModule.comboBox.Percent();
  endRadius.setValidateFunction(validateFunction);
  endRadius.setFormatterFunction(formatterFunction);
  endRadius.setOptions(radiusOptions);
  var endRadiusLC = new anychart.chartEditorModule.controls.LabeledControl(endRadius, 'End Radius');
  endRadiusLC.init(model, this.genKey('endRadius()'));
  this.addChildControl(endRadiusLC);

  var endWidth = new anychart.chartEditorModule.comboBox.Percent();
  endWidth.setOptions(widthOptions);
  var endWidthLC = new anychart.chartEditorModule.controls.LabeledControl(endWidth, 'End Width');
  endWidthLC.init(model, this.genKey('endWidth()'));
  this.addChildControl(endWidthLC);
};
