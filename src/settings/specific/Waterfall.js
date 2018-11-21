goog.provide('chartEditor.settings.specific.Waterfall');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.controls.select.Scales');
goog.require('chartEditor.settings.Stroke');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.specific.Waterfall = function(model, opt_domHelper) {
  chartEditor.settings.specific.Waterfall.base(this, 'constructor', model, 'Waterfall Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.settings.specific.Waterfall, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.specific.Waterfall.prototype.createDom = function() {
  chartEditor.settings.specific.Waterfall.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  
  var dataMode = new chartEditor.controls.select.DataField({label: 'Data Mode'});
  dataMode.getSelect().setOptions([
    {value: 'diff', caption: 'Difference'},
    {value: 'absolute'}
  ]);
  dataMode.init(model, this.genKey('dataMode()'));
  this.addChildControl(dataMode);

  var connectorStroke = new chartEditor.settings.Stroke(model, 'Connectors');
  connectorStroke.setKey(this.genKey('connectorStroke()'));
  this.addChildControl(connectorStroke);

  var itemsSourceMode = new chartEditor.controls.select.DataField({label: 'Legend Items Source Mode'});
  itemsSourceMode.getSelect().setOptions([
    {value: 'default'},
    {value: 'categories'}
  ]);
  itemsSourceMode.init(model, this.genKey('legend().itemsSourceMode()'));
  this.addChildControl(itemsSourceMode);

  var pointWidth = new chartEditor.comboBox.Percent();
  pointWidth.setOptions([10, 30, 50, 70, 90]);
  var pointWidthLC = new chartEditor.controls.LabeledControl(pointWidth, 'Point Width');
  pointWidthLC.init(model, this.genKey('pointWidth()'));
  this.addChildControl(pointWidthLC);

  var maxPointWidth = new chartEditor.comboBox.Percent();
  maxPointWidth.setOptions([10, 30, 50, 70, 90, 100]);
  var maxPointWidthLC = new chartEditor.controls.LabeledControl(maxPointWidth, 'Max Point Width');
  maxPointWidthLC.init(model, this.genKey('maxPointWidth()'));
  this.addChildControl(maxPointWidthLC);

  var minPointLength = new chartEditor.comboBox.Percent();
  minPointLength.setOptions([0, 2, 5, 10]);
  var minPointLengthLC = new chartEditor.controls.LabeledControl(minPointLength, 'Min Point Length');
  minPointLengthLC.init(model, this.genKey('minPointLength()'));
  this.addChildControl(minPointLengthLC);

  var xScale = new chartEditor.controls.select.Scales({label: 'X Scale', scaleName: 'Default X Scale'});
  xScale.init(model, this.genKey('xScale()'));
  this.addChildControl(xScale);

  var yScale = new chartEditor.controls.select.Scales({label: 'Y Scale', scaleName: 'Default Y Scale'});
  yScale.init(model, this.genKey('yScale()'));
  this.addChildControl(yScale);
};
