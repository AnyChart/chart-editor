goog.provide('chartEditor.ui.panel.scales.OrdinalTicks');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.input.Numbers');
goog.require('chartEditor.ui.control.input.StringArray');
goog.require('chartEditor.ui.control.wrapped.Labeled');



/**
 * @param {chartEditor.model.Base} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.scales.OrdinalTicks = function(model, opt_name, opt_domHelper) {
  chartEditor.ui.panel.scales.OrdinalTicks.base(this, 'constructor', model, opt_name, opt_domHelper);

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.panel.scales.OrdinalTicks, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.scales.OrdinalTicks.prototype.createDom = function() {
  chartEditor.ui.panel.scales.OrdinalTicks.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var names = new chartEditor.ui.control.input.StringArray();
  var namesLC = new chartEditor.ui.control.wrapped.Labeled(names, 'Names');
  namesLC.init(model, this.genKey('names()'));
  this.addChildControl(namesLC);

  var interval = new chartEditor.ui.control.input.Numbers();
  var intervalLC = new chartEditor.ui.control.wrapped.Labeled(interval, 'Interval');
  intervalLC.init(model, this.genKey('interval()'));
  this.addChildControl(intervalLC);

  var maxCount = new chartEditor.ui.control.input.Numbers();
  var maxCountLC = new chartEditor.ui.control.wrapped.Labeled(maxCount, 'Max Count');
  maxCountLC.init(model, this.genKey('maxCount()'));
  this.addChildControl(maxCountLC);
};
