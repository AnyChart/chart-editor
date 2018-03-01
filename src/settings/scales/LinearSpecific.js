goog.provide('anychart.chartEditorModule.settings.scales.LinearSpecific');

goog.require('anychart.chartEditorModule.checkbox.Base');
goog.require('anychart.chartEditorModule.comboBox.Base');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.controls.LabeledControlTwins');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.input.Numbers');
goog.require('anychart.chartEditorModule.settings.scales.ScatterTicks');
goog.require('anychart.chartEditorModule.settings.scales.SpecificBase');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.settings.scales.SpecificBase}
 */
anychart.chartEditorModule.settings.scales.LinearSpecific = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.scales.LinearSpecific.base(this, 'constructor', model, opt_domHelper);
};
goog.inherits(anychart.chartEditorModule.settings.scales.LinearSpecific, anychart.chartEditorModule.settings.scales.SpecificBase);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.scales.LinearSpecific.CSS_CLASS = goog.getCssName('anychart-settings-panel-scale-linear');


/** @override */
anychart.chartEditorModule.settings.scales.LinearSpecific.prototype.createDom = function() {
  anychart.chartEditorModule.settings.scales.LinearSpecific.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), anychart.chartEditorModule.settings.scales.LinearSpecific.CSS_CLASS);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var inverted = new anychart.chartEditorModule.checkbox.Base();
  inverted.setCaption('Inverted');
  inverted.init(model, this.genKey('inverted()'));
  this.addChildControl(inverted);

  var stackMode = new anychart.chartEditorModule.controls.select.DataField({label: 'Stack Mode'});
  stackMode.getSelect().setOptions([
    {value: 'none'},
    {value: 'percent'},
    {value: 'value'}
  ]);
  stackMode.init(model, this.genKey('stackMode()'));
  this.addChildControl(stackMode);

  var stackDirection = new anychart.chartEditorModule.controls.select.DataField({label: 'Stack Direction'});
  stackDirection.getSelect().setOptions([
    {value: 'direct'},
    {value: 'reverse'}
  ]);
  stackDirection.init(model, this.genKey('stackDirection()'));
  this.addChildControl(stackDirection);


  var stickToZero = new anychart.chartEditorModule.checkbox.Base();
  stickToZero.setCaption('Stick To Zero');
  stickToZero.init(model, this.genKey('stickToZero()'));
  this.addChildControl(stickToZero);

  var minimum = new anychart.chartEditorModule.input.Numbers();
  var minimumLC = new anychart.chartEditorModule.controls.LabeledControlTwins(minimum, 'Minimum');
  minimumLC.init(model, this.genKey('minimum()'));
  minimumLC.setKey2(this.genKey('softMinimum()'));
  this.addChildControl(minimumLC);

  var maximum = new anychart.chartEditorModule.input.Numbers();
  var maximumLC = new anychart.chartEditorModule.controls.LabeledControlTwins(maximum, 'Maximum');
  maximumLC.init(model, this.genKey('maximum()'));
  maximumLC.setKey2(this.genKey('softMaximum()'));
  this.addChildControl(maximumLC);

  var minimumGap = new anychart.chartEditorModule.comboBox.Base();
  minimumGap.setOptions([0, .1, .3, .5, .7, .9]);
  minimumGap.setRange(0, 1);
  var minimumGapLC = new anychart.chartEditorModule.controls.LabeledControl(minimumGap, 'Minimum Gap');
  minimumGapLC.init(model, this.genKey('minimumGap()'));
  this.addChildControl(minimumGapLC);

  var maximumGap = new anychart.chartEditorModule.comboBox.Base();
  maximumGap.setOptions([0, .1, .3, .5, .7, .9]);
  maximumGap.setRange(0, 1);
  var maximumGapLC = new anychart.chartEditorModule.controls.LabeledControl(maximumGap, 'Maximum Gap');
  maximumGapLC.init(model, this.genKey('maximumGap()'));
  this.addChildControl(maximumGapLC);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator-gaps')));

  var ticks = new anychart.chartEditorModule.settings.scales.ScatterTicks(model, 'Scale Ticks');
  ticks.allowEnabled(false);
  ticks.setKey(this.genKey('ticks()'));
  this.addChild(ticks, true);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator-gaps')));

  var minorTicks = new anychart.chartEditorModule.settings.scales.ScatterTicks(model, 'Scale Minor Ticks');
  minorTicks.allowEnabled(false);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChild(minorTicks, true);
};
