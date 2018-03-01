goog.provide('anychart.chartEditorModule.settings.specific.Waterfall');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.settings.Stroke');



/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.specific.Waterfall = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.specific.Waterfall.base(this, 'constructor', model, 'Waterfall Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(anychart.chartEditorModule.settings.specific.Waterfall, anychart.chartEditorModule.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.specific.Waterfall.CSS_CLASS = goog.getCssName('anychart-settings-panel-waterfall');


/** @override */
anychart.chartEditorModule.settings.specific.Waterfall.prototype.createDom = function() {
  anychart.chartEditorModule.settings.specific.Waterfall.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), anychart.chartEditorModule.settings.specific.Waterfall.CSS_CLASS);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  
  var dataMode = new anychart.chartEditorModule.controls.select.DataField({label: 'Data Mode'});
  dataMode.getSelect().setOptions([
    {value: 'diff', caption: 'Difference'},
    {value: 'absolute'}
  ]);
  dataMode.init(model, this.genKey('dataMode()'));
  this.addChildControl(dataMode);

  var connectorStroke = new anychart.chartEditorModule.settings.Stroke(model, 'Connectors');
  connectorStroke.setKey(this.genKey('connectorStroke()'));
  this.addChild(connectorStroke, true);

  var itemsSourceMode = new anychart.chartEditorModule.controls.select.DataField({label: 'Legend Items Source Mode'});
  itemsSourceMode.getSelect().setOptions([
    {value: 'default'},
    {value: 'categories'}
  ]);
  itemsSourceMode.init(model, this.genKey('legend().itemsSourceMode()'));
  this.addChildControl(itemsSourceMode);

  var pointWidth = new anychart.chartEditorModule.comboBox.Percent();
  pointWidth.setOptions([10, 30, 50, 70, 90]);
  var pointWidthLC = new anychart.chartEditorModule.controls.LabeledControl(pointWidth, 'Point Width');
  pointWidthLC.init(model, this.genKey('pointWidth()'));
  this.addChildControl(pointWidthLC);

  var maxPointWidth = new anychart.chartEditorModule.comboBox.Percent();
  maxPointWidth.setOptions([10, 30, 50, 70, 90, 100]);
  var maxPointWidthLC = new anychart.chartEditorModule.controls.LabeledControl(maxPointWidth, 'Max Point Width');
  maxPointWidthLC.init(model, this.genKey('maxPointWidth()'));
  this.addChildControl(maxPointWidthLC);

  var minPointLength = new anychart.chartEditorModule.comboBox.Percent();
  minPointLength.setOptions([0, 2, 5, 10]);
  var minPointLengthLC = new anychart.chartEditorModule.controls.LabeledControl(minPointLength, 'Min Point Length');
  minPointLengthLC.init(model, this.genKey('minPointLength()'));
  this.addChildControl(minPointLengthLC);
};
