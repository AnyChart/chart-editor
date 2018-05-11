goog.provide('chartEditor.settings.scales.DateTimeTicks');

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
chartEditor.settings.scales.DateTimeTicks = function(model, opt_name, opt_domHelper) {
  chartEditor.settings.scales.DateTimeTicks.base(this, 'constructor', model, opt_name, opt_domHelper);
};
goog.inherits(chartEditor.settings.scales.DateTimeTicks, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.scales.DateTimeTicks.prototype.createDom = function() {
  chartEditor.settings.scales.DateTimeTicks.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var count = new chartEditor.controls.input.Numbers();
  count.setFormatterFunction(function(value){
    return String(goog.isArray(value) ? Number(value[0]) : Number(value));
  });
  var countLC = new chartEditor.controls.LabeledControl(count, 'Count');
  countLC.init(model, this.genKey('count()'));
  this.addChildControl(countLC);

  // var interval = new chartEditor.controls.input.Numbers();
  // var intervalLC = new chartEditor.controls.LabeledControl(interval, 'Interval');
  // intervalLC.init(model, this.genKey('interval()'));
  // this.addChildControl(intervalLC);
};
