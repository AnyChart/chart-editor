goog.provide('chartEditor.settings.specific.Sankey');

goog.require('chartEditor.SettingsPanel');
goog.require("chartEditor.comboBox.Base");
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.specific.Sankey = function(model, opt_domHelper) {
  chartEditor.settings.specific.Sankey.base(this, 'constructor', model, 'Sankey Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.settings.specific.Sankey, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.specific.Sankey.prototype.createDom = function() {
  chartEditor.settings.specific.Sankey.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var nodeWidth = new chartEditor.comboBox.Percent();
  nodeWidth.setOptions([5, 10, 20, 30, 40]);
  var nodeWidthLC = new chartEditor.controls.LabeledControl(nodeWidth, 'Node Width');
  nodeWidthLC.init(model, this.genKey('nodeWidth()'));
  this.addChildControl(nodeWidthLC);

  var nodePadding = new chartEditor.comboBox.Base();
  nodePadding.setOptions([0, 10, 20, 30]);
  nodePadding.setRange(0,200);
  var nodePaddingLC = new chartEditor.controls.LabeledControl(nodePadding, 'Node Padding');
  nodePaddingLC.init(model, this.genKey('nodePadding()'));
  this.addChildControl(nodePaddingLC);

  var curveFactor = new chartEditor.comboBox.Base();
  curveFactor.setOptions([0, 0.2, 0.5, 0.8]);
  curveFactor.setRange(0, 1);
  var curveFactorLC = new chartEditor.controls.LabeledControl(curveFactor, 'Curve Factor');
  curveFactorLC.init(model, this.genKey('curveFactor()'));
  this.addChildControl(curveFactorLC);
};
