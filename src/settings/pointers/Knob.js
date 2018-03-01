goog.provide('anychart.chartEditorModule.settings.pointers.Knob');

goog.require('anychart.chartEditorModule.comboBox.Base');
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
anychart.chartEditorModule.settings.pointers.Knob = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  anychart.chartEditorModule.settings.pointers.Knob.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'knob';

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-knob'));
};
goog.inherits(anychart.chartEditorModule.settings.pointers.Knob, anychart.chartEditorModule.settings.pointers.CircularBase);


/** @override */
anychart.chartEditorModule.settings.pointers.Knob.prototype.createDom = function() {
  anychart.chartEditorModule.settings.pointers.Knob.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var verticesCount = new anychart.chartEditorModule.comboBox.Base();
  verticesCount.setOptions([2, 5, 10, 15, 20]);
  verticesCount.setRange(1, 50);
  var verticesCountLC = new anychart.chartEditorModule.controls.LabeledControl(verticesCount, 'Vertices Count');
  verticesCountLC.init(model, this.genKey('verticesCount()'));
  this.addChildControl(verticesCountLC);

  var topRadius = new anychart.chartEditorModule.comboBox.Percent();
  topRadius.setOptions([10, 30, 50, 70, 90, 100]);
  var topRadiusLC = new anychart.chartEditorModule.controls.LabeledControl(topRadius, 'Top Radius');
  topRadiusLC.init(model, this.genKey('topRadius()'));
  this.addChildControl(topRadiusLC);

  var topRatio = new anychart.chartEditorModule.comboBox.Base();
  topRatio.setOptions([0, .1, .3, .5, .7, .9]);
  topRatio.setRange(0, 1);
  var topRatioLC = new anychart.chartEditorModule.controls.LabeledControl(topRatio, 'Top Ratio');
  topRatioLC.init(model, this.genKey('topRatio()'));
  this.addChildControl(topRatioLC);

  var bottomRadius = new anychart.chartEditorModule.comboBox.Percent();
  bottomRadius.setOptions([10, 30, 50, 70, 90, 100]);
  var bottomRadiusLC = new anychart.chartEditorModule.controls.LabeledControl(bottomRadius, 'Bottom Radius');
  bottomRadiusLC.init(model, this.genKey('bottomRadius()'));
  this.addChildControl(bottomRadiusLC);

  var bottomRatio = new anychart.chartEditorModule.comboBox.Base();
  bottomRatio.setOptions([.1, .3, .5, .7, .9]);
  bottomRatio.setRange(0.01, 1);
  var bottomRatioLC = new anychart.chartEditorModule.controls.LabeledControl(bottomRatio, 'Bottom Ratio');
  bottomRatioLC.init(model, this.genKey('bottomRatio()'));
  this.addChildControl(bottomRatioLC);

  var verticesCurvature = new anychart.chartEditorModule.comboBox.Base();
  verticesCurvature.setOptions([-1, -.5, -.1, 0, .1, .5, 1]);
  verticesCurvature.setRange(-3, 3);
  var verticesCurvatureLC = new anychart.chartEditorModule.controls.LabeledControl(verticesCurvature, 'Vertices Curvature');
  verticesCurvatureLC.init(model, this.genKey('verticesCurvature()'));
  this.addChildControl(verticesCurvatureLC);
};
