goog.provide('chartEditor.ui.panel.axes.LinearGauge');

goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.axes.Linear');
goog.require('chartEditor.ui.panel.scales.Base');


/**
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.panel.axes.Linear}
 */
chartEditor.ui.panel.axes.LinearGauge = function(model, index, opt_domHelper) {
  chartEditor.ui.panel.axes.LinearGauge.base(this, 'constructor', model, index, opt_domHelper);
};
goog.inherits(chartEditor.ui.panel.axes.LinearGauge, chartEditor.ui.panel.axes.Linear);


/** @override */
chartEditor.ui.panel.axes.LinearGauge.prototype.createDom = function() {
  chartEditor.ui.panel.axes.LinearGauge.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var offset = new chartEditor.ui.control.comboBox.Percent();
  offset.allowNegative(true);
  var offsetLC = new chartEditor.ui.control.wrapped.Labeled(offset, 'Offset');
  offsetLC.init(model, this.genKey('offset()'));
  this.addChildControl(offsetLC, 1);
};
