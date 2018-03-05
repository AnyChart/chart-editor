goog.provide('chartEditor.settings.scales.ScatterTicks');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.input.Numbers');


/**
 * @param {chartEditor.EditorModel} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.scales.ScatterTicks = function(model, opt_name, opt_domHelper) {
  chartEditor.settings.scales.ScatterTicks.base(this, 'constructor', model, opt_name, opt_domHelper);
};
goog.inherits(chartEditor.settings.scales.ScatterTicks, chartEditor.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.scales.ScatterTicks.CSS_CLASS = goog.getCssName('anychart-ce-settings-panel-scatter-ticks');


/** @override */
chartEditor.settings.scales.ScatterTicks.prototype.createDom = function() {
  chartEditor.settings.scales.ScatterTicks.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.settings.scales.ScatterTicks.CSS_CLASS);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var count = new chartEditor.input.Numbers();
  count.setFormatterFunction(function(value){
    return String(goog.isArray(value) ? Number(value[0]) : Number(value));
  });
  var countLC = new chartEditor.controls.LabeledControl(count, 'Count');
  countLC.init(model, this.genKey('count()'));
  this.addChildControl(countLC);

  var interval = new chartEditor.input.Numbers();
  var intervalLC = new chartEditor.controls.LabeledControl(interval, 'Interval');
  intervalLC.init(model, this.genKey('interval()'));
  this.addChildControl(intervalLC);
};
