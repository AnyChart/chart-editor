goog.provide('chartEditor.settings.scales.LinearSpecific');

goog.require('chartEditor.checkbox.Base');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.LabeledControlTwins');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.input.Numbers');
goog.require('chartEditor.settings.scales.ScatterTicks');
goog.require('chartEditor.settings.scales.SpecificBase');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.scales.SpecificBase}
 */
chartEditor.settings.scales.LinearSpecific = function(model, opt_domHelper) {
  chartEditor.settings.scales.LinearSpecific.base(this, 'constructor', model, opt_domHelper);
};
goog.inherits(chartEditor.settings.scales.LinearSpecific, chartEditor.settings.scales.SpecificBase);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.scales.LinearSpecific.CSS_CLASS = goog.getCssName('anychart-settings-panel-scale-linear');


/** @override */
chartEditor.settings.scales.LinearSpecific.prototype.createDom = function() {
  chartEditor.settings.scales.LinearSpecific.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.settings.scales.LinearSpecific.CSS_CLASS);

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

  var minimum = new chartEditor.input.Numbers();
  var minimumLC = new chartEditor.controls.LabeledControlTwins(minimum, 'Minimum');
  minimumLC.init(model, this.genKey('minimum()'));
  minimumLC.setKey2(this.genKey('softMinimum()'));
  this.addChildControl(minimumLC);

  var maximum = new chartEditor.input.Numbers();
  var maximumLC = new chartEditor.controls.LabeledControlTwins(maximum, 'Maximum');
  maximumLC.init(model, this.genKey('maximum()'));
  maximumLC.setKey2(this.genKey('softMaximum()'));
  this.addChildControl(maximumLC);

  var minimumGap = new chartEditor.comboBox.Base();
  minimumGap.setOptions([0, .1, .3, .5, .7, .9]);
  minimumGap.setRange(0, 1);
  var minimumGapLC = new chartEditor.controls.LabeledControl(minimumGap, 'Minimum Gap');
  minimumGapLC.init(model, this.genKey('minimumGap()'));
  this.addChildControl(minimumGapLC);

  var maximumGap = new chartEditor.comboBox.Base();
  maximumGap.setOptions([0, .1, .3, .5, .7, .9]);
  maximumGap.setRange(0, 1);
  var maximumGapLC = new chartEditor.controls.LabeledControl(maximumGap, 'Maximum Gap');
  maximumGapLC.init(model, this.genKey('maximumGap()'));
  this.addChildControl(maximumGapLC);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator-gaps')));

  var ticks = new chartEditor.settings.scales.ScatterTicks(model, 'Scale Ticks');
  ticks.allowEnabled(false);
  ticks.setKey(this.genKey('ticks()'));
  this.addChild(ticks, true);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator-gaps')));

  var minorTicks = new chartEditor.settings.scales.ScatterTicks(model, 'Scale Minor Ticks');
  minorTicks.allowEnabled(false);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChild(minorTicks, true);
};
