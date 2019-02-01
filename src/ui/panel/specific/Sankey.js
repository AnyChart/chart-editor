goog.provide('chartEditor.ui.panel.specific.Sankey');

goog.require('chartEditor.ui.Panel');
goog.require("chartEditor.ui.control.comboBox.Base");
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.wrapped.Labeled');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.specific.Sankey = function(model, opt_domHelper) {
  chartEditor.ui.panel.specific.Sankey.base(this, 'constructor', model, 'Sankey Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.ui.panel.specific.Sankey, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.specific.Sankey.prototype.createDom = function() {
  chartEditor.ui.panel.specific.Sankey.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var nodeWidth = new chartEditor.ui.control.comboBox.Percent();
  nodeWidth.setOptions([5, 10, 20, 30, 40]);
  var nodeWidthLC = new chartEditor.ui.control.wrapped.Labeled(nodeWidth, 'Node Width');
  nodeWidthLC.init(model, this.genKey('nodeWidth()'));
  this.addChildControl(nodeWidthLC);

  var nodePadding = new chartEditor.ui.control.comboBox.Base();
  nodePadding.setOptions([0, 10, 20, 30]);
  nodePadding.setRange(0,200);
  var nodePaddingLC = new chartEditor.ui.control.wrapped.Labeled(nodePadding, 'Node Padding');
  nodePaddingLC.init(model, this.genKey('nodePadding()'));
  this.addChildControl(nodePaddingLC);

  var curveFactor = new chartEditor.ui.control.comboBox.Base();
  curveFactor.setOptions([0, 0.2, 0.5, 0.8]);
  curveFactor.setRange(0, 1);
  var curveFactorLC = new chartEditor.ui.control.wrapped.Labeled(curveFactor, 'Curve Factor');
  curveFactorLC.init(model, this.genKey('curveFactor()'));
  this.addChildControl(curveFactorLC);
};
