goog.provide('chartEditor.ui.panel.scales.ScatterTicks');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.input.Numbers');
goog.require('chartEditor.ui.control.wrapped.Labeled');



/**
 * @param {chartEditor.model.Base} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.scales.ScatterTicks = function(model, opt_name, opt_domHelper) {
  chartEditor.ui.panel.scales.ScatterTicks.base(this, 'constructor', model, opt_name, opt_domHelper);

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.panel.scales.ScatterTicks, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.scales.ScatterTicks.prototype.createDom = function() {
  chartEditor.ui.panel.scales.ScatterTicks.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var count = new chartEditor.ui.control.input.Numbers();
  count.setFormatterFunction(function(value){
    return String(goog.isArray(value) ? Number(value[0]) : Number(value));
  });
  var countLC = new chartEditor.ui.control.wrapped.Labeled(count, 'Count');
  countLC.init(model, this.genKey('count()'));
  this.addChildControl(countLC);

  var interval = new chartEditor.ui.control.input.Numbers();
  var intervalLC = new chartEditor.ui.control.wrapped.Labeled(interval, 'Interval');
  intervalLC.init(model, this.genKey('interval()'));
  this.addChildControl(intervalLC);
};
