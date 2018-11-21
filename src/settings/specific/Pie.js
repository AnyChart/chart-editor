goog.provide('chartEditor.settings.specific.Pie');

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
chartEditor.settings.specific.Pie = function(model, opt_domHelper) {
  chartEditor.settings.specific.Pie.base(this, 'constructor', model, 'Pie Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-pie'));
};
goog.inherits(chartEditor.settings.specific.Pie, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.specific.Pie.prototype.createDom = function() {
  chartEditor.settings.specific.Pie.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var innerRadius = new chartEditor.comboBox.Percent();
  innerRadius.setOptions([5, 10, 20, 30, 40]);
  var innerRadiusLC = new chartEditor.controls.LabeledControl(innerRadius, 'Inner Radius');
  innerRadiusLC.init(model, this.genKey('innerRadius()'));
  this.addChildControl(innerRadiusLC);

  var connectorstroke = new chartEditor.settings.Stroke(model, 'Connectors');
  connectorstroke.setKey(this.genKey('connectorStroke()'));
  this.addChildControl(connectorstroke);
};
