goog.provide('chartEditor.ui.panel.scales.Ordinal');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.input.StringArray');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.scales.OrdinalTicks');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.scales.Ordinal = function(model, opt_domHelper) {
  chartEditor.ui.panel.scales.Ordinal.base(this, 'constructor', model, null, opt_domHelper);

  this.allowEnabled(false);
};
goog.inherits(chartEditor.ui.panel.scales.Ordinal, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.scales.Ordinal.prototype.createDom = function() {
  chartEditor.ui.panel.scales.Ordinal.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var inverted = new chartEditor.ui.control.checkbox.Base();
  inverted.setCaption('Inverted');
  inverted.init(model, this.genKey('inverted()'));
  this.addChildControl(inverted);

  var names = new chartEditor.ui.control.input.StringArray();
  var namesLC = new chartEditor.ui.control.wrapped.Labeled(names, 'Names');
  namesLC.init(model, this.genKey('names()'));
  this.addChildControl(namesLC);

  var weights = new chartEditor.ui.control.input.StringArray();
  var weightsLC = new chartEditor.ui.control.wrapped.Labeled(weights, 'Weights');
  weightsLC.init(model, this.genKey('weights()'));
  this.addChildControl(weightsLC);

  this.addContentSeparator();

  var ticks = new chartEditor.ui.panel.scales.OrdinalTicks(model, 'Ticks');
  ticks.allowEnabled(false);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);
};
