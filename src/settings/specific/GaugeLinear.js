goog.provide('anychart.chartEditorModule.settings.specific.GaugeLinear');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.input.Palette');
goog.require('anychart.chartEditorModule.settings.Background');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.specific.GaugeLinear = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.specific.GaugeLinear.base(this, 'constructor', model, 'Linear Gauge Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];

  this.addClassName(goog.getCssName('anychart-settings-panel-gauge-linear'));
};
goog.inherits(anychart.chartEditorModule.settings.specific.GaugeLinear, anychart.chartEditorModule.SettingsPanel);


/** @override */
anychart.chartEditorModule.settings.specific.GaugeLinear.prototype.createDom = function() {
  anychart.chartEditorModule.settings.specific.GaugeLinear.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var layout = new anychart.chartEditorModule.controls.select.DataField({label: 'Layout'});
  layout.getSelect().setOptions([
    {value: 'horizontal'},
    {value: 'vertical'}
  ]);
  layout.init(model, this.genKey('layout()'));
  this.addChildControl(layout);

  var background = new anychart.chartEditorModule.settings.Background(model);
  background.setName(null);
  background.setKey(this.genKey('background()'));
  this.addChildControl(background);

  var palette = new anychart.chartEditorModule.input.Palette('Comma separated colors');
  var paletteLC = new anychart.chartEditorModule.controls.LabeledControl(palette, 'Palette');
  paletteLC.init(model, this.genKey('palette()'));
  this.addChildControl(paletteLC);
};
