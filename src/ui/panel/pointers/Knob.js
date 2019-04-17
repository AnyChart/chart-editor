goog.provide('chartEditor.ui.panel.pointers.Knob');

goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.pointers.CircularBase');


/**
 * @param {chartEditor.model.Base} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.panel.pointers.CircularBase}
 */
chartEditor.ui.panel.pointers.Knob = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.ui.panel.pointers.Knob.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.addClassName(goog.getCssName('anychart-ce-panel-pointer-knob'));
};
goog.inherits(chartEditor.ui.panel.pointers.Knob, chartEditor.ui.panel.pointers.CircularBase);


/** @override */
chartEditor.ui.panel.pointers.Knob.prototype.createDom = function() {
  chartEditor.ui.panel.pointers.Knob.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var verticesCount = new chartEditor.ui.control.comboBox.Base();
  verticesCount.setOptions([2, 5, 10, 15, 20]);
  verticesCount.setRange(1, 50);
  var verticesCountLC = new chartEditor.ui.control.wrapped.Labeled(verticesCount, 'Vertices Count');
  verticesCountLC.init(model, this.genKey('verticesCount()'));
  this.addChildControl(verticesCountLC);

  var topRadius = new chartEditor.ui.control.comboBox.Percent();
  topRadius.setOptions([10, 30, 50, 70, 90, 100]);
  var topRadiusLC = new chartEditor.ui.control.wrapped.Labeled(topRadius, 'Top Radius');
  topRadiusLC.init(model, this.genKey('topRadius()'));
  this.addChildControl(topRadiusLC);

  var topRatio = new chartEditor.ui.control.comboBox.Base();
  topRatio.setOptions([0, .1, .3, .5, .7, .9]);
  topRatio.setRange(0, 1);
  var topRatioLC = new chartEditor.ui.control.wrapped.Labeled(topRatio, 'Top Ratio');
  topRatioLC.init(model, this.genKey('topRatio()'));
  this.addChildControl(topRatioLC);

  var bottomRadius = new chartEditor.ui.control.comboBox.Percent();
  bottomRadius.setOptions([10, 30, 50, 70, 90, 100]);
  var bottomRadiusLC = new chartEditor.ui.control.wrapped.Labeled(bottomRadius, 'Bottom Radius');
  bottomRadiusLC.init(model, this.genKey('bottomRadius()'));
  this.addChildControl(bottomRadiusLC);

  var bottomRatio = new chartEditor.ui.control.comboBox.Base();
  bottomRatio.setOptions([.1, .3, .5, .7, .9]);
  bottomRatio.setRange(0.01, 1);
  var bottomRatioLC = new chartEditor.ui.control.wrapped.Labeled(bottomRatio, 'Bottom Ratio');
  bottomRatioLC.init(model, this.genKey('bottomRatio()'));
  this.addChildControl(bottomRatioLC);

  var verticesCurvature = new chartEditor.ui.control.comboBox.Base();
  verticesCurvature.setOptions([-1, -.5, -.1, 0, .1, .5, 1]);
  verticesCurvature.setRange(-3, 3);
  var verticesCurvatureLC = new chartEditor.ui.control.wrapped.Labeled(verticesCurvature, 'Vertices Curvature');
  verticesCurvatureLC.init(model, this.genKey('verticesCurvature()'));
  this.addChildControl(verticesCurvatureLC);
};
