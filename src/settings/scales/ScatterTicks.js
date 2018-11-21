goog.provide('chartEditor.settings.scales.ScatterTicks');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.input.Numbers');


/**
 * @param {chartEditor.EditorModel} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.scales.ScatterTicks = function(model, opt_name, opt_domHelper) {
  chartEditor.settings.scales.ScatterTicks.base(this, 'constructor', model, opt_name, opt_domHelper);

  this.allowReset(true);
};
goog.inherits(chartEditor.settings.scales.ScatterTicks, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.scales.ScatterTicks.prototype.createDom = function() {
  chartEditor.settings.scales.ScatterTicks.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var count = new chartEditor.controls.input.Numbers();
  count.setFormatterFunction(function(value){
    return String(goog.isArray(value) ? Number(value[0]) : Number(value));
  });
  var countLC = new chartEditor.controls.LabeledControl(count, 'Count');
  countLC.init(model, this.genKey('count()'));
  this.addChildControl(countLC);

  var interval = new chartEditor.controls.input.Numbers();
  var intervalLC = new chartEditor.controls.LabeledControl(interval, 'Interval');
  intervalLC.init(model, this.genKey('interval()'));
  this.addChildControl(intervalLC);
};
