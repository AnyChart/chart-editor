goog.provide('chartEditor.settings.specific.GaugeLinear');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.input.Palette');
goog.require('chartEditor.settings.Background');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.specific.GaugeLinear = function(model, opt_domHelper) {
  chartEditor.settings.specific.GaugeLinear.base(this, 'constructor', model, 'Linear Gauge Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];

  this.addClassName(goog.getCssName('anychart-settings-panel-gauge-linear'));
};
goog.inherits(chartEditor.settings.specific.GaugeLinear, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.specific.GaugeLinear.prototype.createDom = function() {
  chartEditor.settings.specific.GaugeLinear.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var layout = new chartEditor.controls.select.DataField({label: 'Layout'});
  layout.getSelect().setOptions([
    {value: 'horizontal'},
    {value: 'vertical'}
  ]);
  layout.init(model, this.genKey('layout()'));
  this.addChildControl(layout);

  var background = new chartEditor.settings.Background(model);
  background.setName(null);
  background.setKey(this.genKey('background()'));
  this.addChildControl(background);

  var palette = new chartEditor.input.Palette('Comma separated colors');
  var paletteLC = new chartEditor.controls.LabeledControl(palette, 'Palette');
  paletteLC.init(model, this.genKey('palette()'));
  this.addChildControl(paletteLC);
};
