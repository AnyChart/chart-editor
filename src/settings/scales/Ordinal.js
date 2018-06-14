goog.provide('chartEditor.settings.scales.Ordinal');

goog.require("chartEditor.SettingsPanel");
goog.require("chartEditor.checkbox.Base");
goog.require("chartEditor.controls.LabeledControl");
goog.require("chartEditor.controls.input.StringArray");
goog.require("chartEditor.settings.scales.OrdinalTicks");


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.scales.Ordinal = function(model, opt_domHelper) {
  chartEditor.settings.scales.Ordinal.base(this, 'constructor', model, null, opt_domHelper);

  this.allowEnabled(false);
};
goog.inherits(chartEditor.settings.scales.Ordinal, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.scales.Ordinal.prototype.createDom = function() {
  chartEditor.settings.scales.Ordinal.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var inverted = new chartEditor.checkbox.Base();
  inverted.setCaption('Inverted');
  inverted.init(model, this.genKey('inverted()'));
  this.addChildControl(inverted);

  var names = new chartEditor.controls.input.StringArray();
  var namesLC = new chartEditor.controls.LabeledControl(names, 'Names');
  namesLC.init(model, this.genKey('names()'));
  this.addChildControl(namesLC);

  var weights = new chartEditor.controls.input.StringArray();
  var weightsLC = new chartEditor.controls.LabeledControl(weights, 'Weights');
  weightsLC.init(model, this.genKey('weights()'));
  this.addChildControl(weightsLC);

  this.addContentSeparator();

  var ticks = new chartEditor.settings.scales.OrdinalTicks(model, 'Ticks');
  ticks.allowEnabled(false);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);
};
