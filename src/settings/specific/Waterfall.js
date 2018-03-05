goog.provide('chartEditor.settings.specific.Waterfall');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.select.DataField');
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


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.specific.Waterfall.CSS_CLASS = goog.getCssName('anychart-ce-settings-panel-waterfall');


/** @override */
chartEditor.settings.specific.Waterfall.prototype.createDom = function() {
  chartEditor.settings.specific.Waterfall.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.settings.specific.Waterfall.CSS_CLASS);

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
  this.addChild(connectorStroke, true);

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
};
