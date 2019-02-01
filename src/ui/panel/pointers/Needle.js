goog.provide('chartEditor.ui.panel.pointers.Needle');

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
chartEditor.ui.panel.pointers.Needle = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.ui.panel.pointers.Needle.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'needle';

  this.addClassName(goog.getCssName('anychart-ce-panel-pointer-needle'));
};
goog.inherits(chartEditor.ui.panel.pointers.Needle, chartEditor.ui.panel.pointers.CircularBase);


/** @override */
chartEditor.ui.panel.pointers.Needle.prototype.createDom = function() {
  chartEditor.ui.panel.pointers.Needle.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var validateFunction = function(value) {
    return /^-?\d{1,3}%?$/.test(value);
  };

  var formatterFunction = function(value) {
    var match = String(value).match(/^(-?\d{1,3})%?$/);
    return match[1] + "%";
  };
  var radiusOptions = [-20, -10, 0, 10, 30, 50, 70, 100, 110];
  var widthOptions = [0, 3, 5, 10, 15, 20];

  var startRadius = new chartEditor.ui.control.comboBox.Percent();
  startRadius.setValidateFunction(validateFunction);
  startRadius.setFormatterFunction(formatterFunction);
  startRadius.setOptions(radiusOptions);
  var startRadiusLC = new chartEditor.ui.control.wrapped.Labeled(startRadius, 'Start Radius');
  startRadiusLC.init(model, this.genKey('startRadius()'));
  this.addChildControl(startRadiusLC);

  var startWidth = new chartEditor.ui.control.comboBox.Percent();
  startWidth.setOptions(widthOptions);
  var startWidthLC = new chartEditor.ui.control.wrapped.Labeled(startWidth, 'Start Width');
  startWidthLC.init(model, this.genKey('startWidth()'));
  this.addChildControl(startWidthLC);

  var middleRadius = new chartEditor.ui.control.comboBox.Percent();
  middleRadius.setValidateFunction(validateFunction);
  middleRadius.setFormatterFunction(formatterFunction);
  middleRadius.setOptions(radiusOptions);
  var middleRadiusLC = new chartEditor.ui.control.wrapped.Labeled(middleRadius, 'Middle Radius');
  middleRadiusLC.init(model, this.genKey('middleRadius()'));
  this.addChildControl(middleRadiusLC);

  var middleWidth = new chartEditor.ui.control.comboBox.Percent();
  middleWidth.setOptions(widthOptions);
  var middleWidthLC = new chartEditor.ui.control.wrapped.Labeled(middleWidth, 'Middle Width');
  middleWidthLC.init(model, this.genKey('middleWidth()'));
  this.addChildControl(middleWidthLC);

  var endRadius = new chartEditor.ui.control.comboBox.Percent();
  endRadius.setValidateFunction(validateFunction);
  endRadius.setFormatterFunction(formatterFunction);
  endRadius.setOptions(radiusOptions);
  var endRadiusLC = new chartEditor.ui.control.wrapped.Labeled(endRadius, 'End Radius');
  endRadiusLC.init(model, this.genKey('endRadius()'));
  this.addChildControl(endRadiusLC);

  var endWidth = new chartEditor.ui.control.comboBox.Percent();
  endWidth.setOptions(widthOptions);
  var endWidthLC = new chartEditor.ui.control.wrapped.Labeled(endWidth, 'End Width');
  endWidthLC.init(model, this.genKey('endWidth()'));
  this.addChildControl(endWidthLC);
};
