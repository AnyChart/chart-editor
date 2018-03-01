goog.provide('anychart.chartEditorModule.settings.scales.ScatterTicks');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.input.Numbers');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.scales.ScatterTicks = function(model, opt_name, opt_domHelper) {
  anychart.chartEditorModule.settings.scales.ScatterTicks.base(this, 'constructor', model, opt_name, opt_domHelper);
};
goog.inherits(anychart.chartEditorModule.settings.scales.ScatterTicks, anychart.chartEditorModule.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.scales.ScatterTicks.CSS_CLASS = goog.getCssName('anychart-settings-panel-scatter-ticks');


/** @override */
anychart.chartEditorModule.settings.scales.ScatterTicks.prototype.createDom = function() {
  anychart.chartEditorModule.settings.scales.ScatterTicks.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), anychart.chartEditorModule.settings.scales.ScatterTicks.CSS_CLASS);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var count = new anychart.chartEditorModule.input.Numbers();
  count.setFormatterFunction(function(value){
    return String(goog.isArray(value) ? Number(value[0]) : Number(value));
  });
  var countLC = new anychart.chartEditorModule.controls.LabeledControl(count, 'Count');
  countLC.init(model, this.genKey('count()'));
  this.addChildControl(countLC);

  var interval = new anychart.chartEditorModule.input.Numbers();
  var intervalLC = new anychart.chartEditorModule.controls.LabeledControl(interval, 'Interval');
  intervalLC.init(model, this.genKey('interval()'));
  this.addChildControl(intervalLC);
};
