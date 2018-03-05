goog.provide('chartEditor.settings.pointers.Knob');

goog.require('chartEditor.comboBox.Base');
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
chartEditor.settings.pointers.Knob = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.settings.pointers.Knob.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'knob';

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-pointer-knob'));
};
goog.inherits(chartEditor.settings.pointers.Knob, chartEditor.settings.pointers.CircularBase);


/** @override */
chartEditor.settings.pointers.Knob.prototype.createDom = function() {
  chartEditor.settings.pointers.Knob.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var verticesCount = new chartEditor.comboBox.Base();
  verticesCount.setOptions([2, 5, 10, 15, 20]);
  verticesCount.setRange(1, 50);
  var verticesCountLC = new chartEditor.controls.LabeledControl(verticesCount, 'Vertices Count');
  verticesCountLC.init(model, this.genKey('verticesCount()'));
  this.addChildControl(verticesCountLC);

  var topRadius = new chartEditor.comboBox.Percent();
  topRadius.setOptions([10, 30, 50, 70, 90, 100]);
  var topRadiusLC = new chartEditor.controls.LabeledControl(topRadius, 'Top Radius');
  topRadiusLC.init(model, this.genKey('topRadius()'));
  this.addChildControl(topRadiusLC);

  var topRatio = new chartEditor.comboBox.Base();
  topRatio.setOptions([0, .1, .3, .5, .7, .9]);
  topRatio.setRange(0, 1);
  var topRatioLC = new chartEditor.controls.LabeledControl(topRatio, 'Top Ratio');
  topRatioLC.init(model, this.genKey('topRatio()'));
  this.addChildControl(topRatioLC);

  var bottomRadius = new chartEditor.comboBox.Percent();
  bottomRadius.setOptions([10, 30, 50, 70, 90, 100]);
  var bottomRadiusLC = new chartEditor.controls.LabeledControl(bottomRadius, 'Bottom Radius');
  bottomRadiusLC.init(model, this.genKey('bottomRadius()'));
  this.addChildControl(bottomRadiusLC);

  var bottomRatio = new chartEditor.comboBox.Base();
  bottomRatio.setOptions([.1, .3, .5, .7, .9]);
  bottomRatio.setRange(0.01, 1);
  var bottomRatioLC = new chartEditor.controls.LabeledControl(bottomRatio, 'Bottom Ratio');
  bottomRatioLC.init(model, this.genKey('bottomRatio()'));
  this.addChildControl(bottomRatioLC);

  var verticesCurvature = new chartEditor.comboBox.Base();
  verticesCurvature.setOptions([-1, -.5, -.1, 0, .1, .5, 1]);
  verticesCurvature.setRange(-3, 3);
  var verticesCurvatureLC = new chartEditor.controls.LabeledControl(verticesCurvature, 'Vertices Curvature');
  verticesCurvatureLC.init(model, this.genKey('verticesCurvature()'));
  this.addChildControl(verticesCurvatureLC);
};
