goog.provide('chartEditor.ui.panel.specific.Cartesian');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.input.Numbers');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.control.wrapped.Labeled');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.specific.Cartesian = function(model, opt_domHelper) {
  chartEditor.ui.panel.specific.Cartesian.base(this, 'constructor', model, 'Cartesian Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];

  this.addClassName(goog.getCssName('anychart-ce-panel-cartesian'));
};
goog.inherits(chartEditor.ui.panel.specific.Cartesian, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.specific.Cartesian.prototype.createDom = function() {
  chartEditor.ui.panel.specific.Cartesian.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var pointWidth = new chartEditor.ui.control.comboBox.Percent();
  pointWidth.setOptions([10, 30, 50, 70, 90]);
  var pointWidthLC = new chartEditor.ui.control.wrapped.Labeled(pointWidth, 'Point Width');
  pointWidthLC.init(model, this.genKey('pointWidth()'));
  this.addChildControl(pointWidthLC);

  var maxPointWidth = new chartEditor.ui.control.comboBox.Percent();
  maxPointWidth.setOptions([10, 30, 50, 70, 90, 100]);
  var maxPointWidthLC = new chartEditor.ui.control.wrapped.Labeled(maxPointWidth, 'Max Point Width');
  maxPointWidthLC.init(model, this.genKey('maxPointWidth()'));
  this.addChildControl(maxPointWidthLC);

  var minPointLength = new chartEditor.ui.control.comboBox.Percent();
  minPointLength.setOptions([0, 2, 5, 10]);
  var minPointLengthLC = new chartEditor.ui.control.wrapped.Labeled(minPointLength, 'Min Point Length');
  minPointLengthLC.init(model, this.genKey('minPointLength()'));
  this.addChildControl(minPointLengthLC);

  var columnLikeSeries = ['column', 'bar', 'stick', 'rangeBar', 'rangeColumn'];
  if (columnLikeSeries.indexOf(model.getValue(['chart', 'type'])) !== -1) {
    var barsPadding = new chartEditor.ui.control.input.Numbers();
    var barsPaddingLC = new chartEditor.ui.control.wrapped.Labeled(barsPadding, 'Bars Padding');
    barsPaddingLC.init(model, this.genKey('barsPadding()'));
    this.addChildControl(barsPaddingLC);

    var barGroupsPadding = new chartEditor.ui.control.input.Numbers();
    var barGroupsPaddingLC = new chartEditor.ui.control.wrapped.Labeled(barGroupsPadding, 'Bar Groups Padding');
    barGroupsPaddingLC.init(model, this.genKey('barGroupsPadding()'));
    this.addChildControl(barGroupsPaddingLC);
  }

  var xScale = new chartEditor.ui.control.select.Scales({
    label: 'X Scale',
    scaleName: 'Default X Scale',
    availableOptions: ['ordinal', 'linear', 'date-time']});

  xScale.init(model, this.genKey('xScale()'));
  this.addChildControl(xScale);

  var yScale = new chartEditor.ui.control.select.Scales({
    label: 'Y Scale',
    scaleName: 'Default Y Scale',
    availableOptions: ['linear', 'log', 'date-time']});

  yScale.init(model, this.genKey('yScale()'));
  this.addChildControl(yScale);
};
