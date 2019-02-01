goog.provide('chartEditor.ui.panel.specific.HeatMap');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.select.Scales');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.specific.HeatMap = function(model, opt_domHelper) {
  chartEditor.ui.panel.specific.HeatMap.base(this, 'constructor', model, 'Heat Map Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.ui.panel.specific.HeatMap, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.specific.HeatMap.prototype.createDom = function() {
  chartEditor.ui.panel.specific.HeatMap.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var xScale = new chartEditor.ui.control.select.Scales({label: 'X Scale', scaleName: 'Default X Scale'});
  xScale.init(model, this.genKey('xScale()'));
  this.addChildControl(xScale);

  var yScale = new chartEditor.ui.control.select.Scales({label: 'Y Scale', scaleName: 'Default Y Scale'});
  yScale.init(model, this.genKey('yScale()'));
  this.addChildControl(yScale);
};
