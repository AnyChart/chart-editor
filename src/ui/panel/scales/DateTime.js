goog.provide('chartEditor.ui.panel.scales.DateTime');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.input.Numbers');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.control.wrapped.LabeledTwins');
goog.require('chartEditor.ui.panel.scales.DateTimeTicks');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.scales.DateTime = function(model, opt_domHelper) {
  chartEditor.ui.panel.scales.DateTime.base(this, 'constructor', model, null, opt_domHelper);

  this.allowEnabled(false);
};
goog.inherits(chartEditor.ui.panel.scales.DateTime, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.scales.DateTime.prototype.createDom = function() {
  chartEditor.ui.panel.scales.DateTime.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var inverted = new chartEditor.ui.control.checkbox.Base();
  inverted.setCaption('Inverted');
  inverted.init(model, this.genKey('inverted()'));
  this.addChildControl(inverted);

  var minimum = new chartEditor.ui.control.input.Numbers();
  var minimumLC = new chartEditor.ui.control.wrapped.LabeledTwins(minimum, 'Minimum');
  minimumLC.init(model, this.genKey('minimum()'));
  minimumLC.setKey2(this.genKey('softMinimum()'));
  this.addChildControl(minimumLC);

  var maximum = new chartEditor.ui.control.input.Numbers();
  var maximumLC = new chartEditor.ui.control.wrapped.LabeledTwins(maximum, 'Maximum');
  maximumLC.init(model, this.genKey('maximum()'));
  maximumLC.setKey2(this.genKey('softMaximum()'));
  this.addChildControl(maximumLC);

  var minimumGap = new chartEditor.ui.control.comboBox.Base();
  minimumGap.setOptions([0, .1, .3, .5, .7, .9, 1]);
  minimumGap.setRange(0, 1);
  var minimumGapLC = new chartEditor.ui.control.wrapped.Labeled(minimumGap, 'Minimum Gap');
  minimumGapLC.init(model, this.genKey('minimumGap()'));
  this.addChildControl(minimumGapLC);

  var maximumGap = new chartEditor.ui.control.comboBox.Base();
  maximumGap.setOptions([0, .1, .3, .5, .7, .9, 1]);
  maximumGap.setRange(0, 1);
  var maximumGapLC = new chartEditor.ui.control.wrapped.Labeled(maximumGap, 'Maximum Gap');
  maximumGapLC.init(model, this.genKey('maximumGap()'));
  this.addChildControl(maximumGapLC);

  this.addContentSeparator();

  var ticks = new chartEditor.ui.panel.scales.DateTimeTicks(model, 'Ticks');
  ticks.allowEnabled(false);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);

  this.addContentSeparator();

  var minorTicks = new chartEditor.ui.panel.scales.DateTimeTicks(model, 'Minor Ticks');
  minorTicks.allowEnabled(false);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);
};
