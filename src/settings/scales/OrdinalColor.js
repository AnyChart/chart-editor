goog.provide('chartEditor.settings.scales.OrdinalColor');

goog.require("chartEditor.SettingsPanel");
goog.require("chartEditor.controls.LabeledControl");
goog.require("chartEditor.controls.input.Palette");
goog.require("chartEditor.settings.scales.Ranges");


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.scales.OrdinalColor = function(model, opt_domHelper) {
  chartEditor.settings.scales.OrdinalColor.base(this, 'constructor', model, null, opt_domHelper);

  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-scale-ordinal-color'));
};
goog.inherits(chartEditor.settings.scales.OrdinalColor, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.scales.OrdinalColor.prototype.createDom = function() {
  chartEditor.settings.scales.OrdinalColor.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var colors = new chartEditor.controls.input.Palette('Comma separated colors');
  var colorsLC = new chartEditor.controls.LabeledControl(colors, 'Colors');
  colorsLC.init(model, this.genKey('colors()'));
  this.addChildControl(colorsLC);

  this.addContentSeparator();

  var ord = new chartEditor.settings.scales.Ranges(model);
  ord.setKey(this.getKey());
  this.addChildControl(ord);
};


