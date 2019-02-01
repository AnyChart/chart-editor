goog.provide('chartEditor.ui.panel.specific.Pie');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.specific.Pie = function(model, opt_domHelper) {
  chartEditor.ui.panel.specific.Pie.base(this, 'constructor', model, 'Pie Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];

  this.addClassName(goog.getCssName('anychart-ce-panel-pie'));
};
goog.inherits(chartEditor.ui.panel.specific.Pie, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.specific.Pie.prototype.createDom = function() {
  chartEditor.ui.panel.specific.Pie.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var innerRadius = new chartEditor.ui.control.comboBox.Percent();
  innerRadius.setOptions([5, 10, 20, 30, 40]);
  var innerRadiusLC = new chartEditor.ui.control.wrapped.Labeled(innerRadius, 'Inner Radius');
  innerRadiusLC.init(model, this.genKey('innerRadius()'));
  this.addChildControl(innerRadiusLC);

  var connectorstroke = new chartEditor.ui.panel.Stroke(model, 'Connectors');
  connectorstroke.setKey(this.genKey('connectorStroke()'));
  this.addChildControl(connectorstroke);
};
