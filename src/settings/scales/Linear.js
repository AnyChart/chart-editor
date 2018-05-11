goog.provide('chartEditor.settings.scales.Linear');

goog.require("chartEditor.SettingsPanel");
goog.require("chartEditor.checkbox.Base");
goog.require("chartEditor.comboBox.Base");
goog.require("chartEditor.controls.LabeledControl");
goog.require("chartEditor.controls.LabeledControlTwins");
goog.require("chartEditor.controls.input.Numbers");
goog.require("chartEditor.controls.select.DataField");
goog.require("chartEditor.settings.scales.ScatterTicks");


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.scales.Linear = function(model, opt_domHelper) {
  chartEditor.settings.scales.Linear.base(this, 'constructor', model, null, opt_domHelper);

  this.allowEnabled(false);
};
goog.inherits(chartEditor.settings.scales.Linear, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.scales.Linear.prototype.createDom = function() {
  chartEditor.settings.scales.Linear.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var inverted = new chartEditor.checkbox.Base();
  inverted.setCaption('Inverted');
  inverted.init(model, this.genKey('inverted()'));
  this.addChildControl(inverted);

  var stackMode = new chartEditor.controls.select.DataField({label: 'Stack Mode'});
  stackMode.getSelect().setOptions([
    {value: 'none'},
    {value: 'percent'},
    {value: 'value'}
  ]);
  stackMode.init(model, this.genKey('stackMode()'));
  this.addChildControl(stackMode);

  var stackDirection = new chartEditor.controls.select.DataField({label: 'Stack Direction'});
  stackDirection.getSelect().setOptions([
    {value: 'direct'},
    {value: 'reverse'}
  ]);
  stackDirection.init(model, this.genKey('stackDirection()'));
  this.addChildControl(stackDirection);

  var stickToZero = new chartEditor.checkbox.Base();
  stickToZero.setCaption('Stick To Zero');
  stickToZero.init(model, this.genKey('stickToZero()'));
  this.addChildControl(stickToZero);

  var minimum = new chartEditor.controls.input.Numbers();
  var minimumLC = new chartEditor.controls.LabeledControlTwins(minimum, 'Minimum');
  minimumLC.init(model, this.genKey('minimum()'));
  minimumLC.setKey2(this.genKey('softMinimum()'));
  this.addChildControl(minimumLC);

  var maximum = new chartEditor.controls.input.Numbers();
  var maximumLC = new chartEditor.controls.LabeledControlTwins(maximum, 'Maximum');
  maximumLC.init(model, this.genKey('maximum()'));
  maximumLC.setKey2(this.genKey('softMaximum()'));
  this.addChildControl(maximumLC);

  var minimumGap = new chartEditor.comboBox.Base();
  minimumGap.setOptions([0, .1, .3, .5, .7, .9, 1]);
  minimumGap.setRange(0, 1);
  var minimumGapLC = new chartEditor.controls.LabeledControl(minimumGap, 'Minimum Gap');
  minimumGapLC.init(model, this.genKey('minimumGap()'));
  this.addChildControl(minimumGapLC);

  var maximumGap = new chartEditor.comboBox.Base();
  maximumGap.setOptions([0, .1, .3, .5, .7, .9, 1]);
  maximumGap.setRange(0, 1);
  var maximumGapLC = new chartEditor.controls.LabeledControl(maximumGap, 'Maximum Gap');
  maximumGapLC.init(model, this.genKey('maximumGap()'));
  this.addChildControl(maximumGapLC);

  this.addContentSeparator();

  var ticks = new chartEditor.settings.scales.ScatterTicks(model, 'Ticks');
  ticks.allowEnabled(false);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);

  this.addContentSeparator();

  var minorTicks = new chartEditor.settings.scales.ScatterTicks(model, 'Minor Ticks');
  minorTicks.allowEnabled(false);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);
};
