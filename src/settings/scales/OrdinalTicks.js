goog.provide('chartEditor.settings.scales.OrdinalTicks');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.input.Numbers');
goog.require('chartEditor.controls.input.StringArray');


/**
 * @param {chartEditor.EditorModel} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.scales.OrdinalTicks = function(model, opt_name, opt_domHelper) {
  chartEditor.settings.scales.OrdinalTicks.base(this, 'constructor', model, opt_name, opt_domHelper);
};
goog.inherits(chartEditor.settings.scales.OrdinalTicks, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.scales.OrdinalTicks.prototype.createDom = function() {
  chartEditor.settings.scales.OrdinalTicks.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var names = new chartEditor.controls.input.StringArray();
  var namesLC = new chartEditor.controls.LabeledControl(names, 'Names');
  namesLC.init(model, this.genKey('names()'));
  this.addChildControl(namesLC);

  var interval = new chartEditor.controls.input.Numbers();
  var intervalLC = new chartEditor.controls.LabeledControl(interval, 'Interval');
  intervalLC.init(model, this.genKey('interval()'));
  this.addChildControl(intervalLC);

  var maxCount = new chartEditor.controls.input.Numbers();
  var maxCountLC = new chartEditor.controls.LabeledControl(maxCount, 'Max Count');
  maxCountLC.init(model, this.genKey('maxCount()'));
  this.addChildControl(maxCountLC);
};
