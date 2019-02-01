goog.provide('chartEditor.ui.panel.specific.Waterfall');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.specific.Waterfall = function(model, opt_domHelper) {
  chartEditor.ui.panel.specific.Waterfall.base(this, 'constructor', model, 'Waterfall Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.ui.panel.specific.Waterfall, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.specific.Waterfall.prototype.createDom = function() {
  chartEditor.ui.panel.specific.Waterfall.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  
  var dataMode = new chartEditor.ui.control.fieldSelect.Base({label: 'Data Mode'});
  dataMode.getSelect().setOptions([
    {value: 'diff', caption: 'Difference'},
    {value: 'absolute'}
  ]);
  dataMode.init(model, this.genKey('dataMode()'));
  this.addChildControl(dataMode);

  var connectorStroke = new chartEditor.ui.panel.Stroke(model, 'Connectors');
  connectorStroke.setKey(this.genKey('connectorStroke()'));
  this.addChildControl(connectorStroke);

  var itemsSourceMode = new chartEditor.ui.control.fieldSelect.Base({label: 'Legend Items Source Mode'});
  itemsSourceMode.getSelect().setOptions([
    {value: 'default'},
    {value: 'categories'}
  ]);
  itemsSourceMode.init(model, this.genKey('legend().itemsSourceMode()'));
  this.addChildControl(itemsSourceMode);

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

  var xScale = new chartEditor.ui.control.select.Scales({label: 'X Scale', scaleName: 'Default X Scale'});
  xScale.init(model, this.genKey('xScale()'));
  this.addChildControl(xScale);

  var yScale = new chartEditor.ui.control.select.Scales({label: 'Y Scale', scaleName: 'Default Y Scale'});
  yScale.init(model, this.genKey('yScale()'));
  this.addChildControl(yScale);
};
