goog.provide('chartEditor.settings.axes.LinearGauge');

goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.settings.axes.Linear');
goog.require('chartEditor.settings.scales.Base');


/**
 * @param {chartEditor.EditorModel} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.axes.Linear}
 */
chartEditor.settings.axes.LinearGauge = function(model, index, opt_domHelper) {
  chartEditor.settings.axes.LinearGauge.base(this, 'constructor', model, index, opt_domHelper);
};
goog.inherits(chartEditor.settings.axes.LinearGauge, chartEditor.settings.axes.Linear);


/** @override */
chartEditor.settings.axes.LinearGauge.prototype.createDom = function() {
  chartEditor.settings.axes.LinearGauge.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var offset = new chartEditor.comboBox.Percent();
  offset.allowNegative(true);
  var offsetLC = new chartEditor.controls.LabeledControl(offset, 'Offset');
  offsetLC.init(model, this.genKey('offset()'));
  this.addChildControl(offsetLC, 1);
};
