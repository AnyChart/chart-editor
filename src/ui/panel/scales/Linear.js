goog.provide('chartEditor.ui.panel.scales.Linear');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.input.Numbers');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.control.wrapped.LabeledTwins');
goog.require('chartEditor.ui.panel.scales.ScatterTicks');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.scales.Linear = function(model, opt_domHelper) {
  chartEditor.ui.panel.scales.Linear.base(this, 'constructor', model, null, opt_domHelper);

  this.allowEnabled(false);
};
goog.inherits(chartEditor.ui.panel.scales.Linear, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.scales.Linear.prototype.createDom = function() {
  chartEditor.ui.panel.scales.Linear.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var chartType = model.getValue([['chart'], 'type']);

  var inverted = new chartEditor.ui.control.checkbox.Base();
  inverted.setCaption('Inverted');
  inverted.init(model, this.genKey('inverted()'));
  this.addChildControl(inverted);

  var stackMode = new chartEditor.ui.control.fieldSelect.Base({label: 'Stack Mode'});
  stackMode.getSelect().setOptions([
    {value: 'none'},
    {value: 'percent'},
    {value: 'value'}
  ]);
  stackMode.init(model, this.genKey('stackMode()'));
  this.addChildControl(stackMode);

  var stackDirection = new chartEditor.ui.control.fieldSelect.Base({label: 'Stack Direction'});
  stackDirection.getSelect().setOptions([
    {value: 'direct'},
    {value: 'reverse'}
  ]);
  stackDirection.init(model, this.genKey('stackDirection()'));
  this.addChildControl(stackDirection);

  var stickToZero = new chartEditor.ui.control.checkbox.Base();
  stickToZero.setCaption('Stick To Zero');
  stickToZero.init(model, this.genKey('stickToZero()'));
  this.addChildControl(stickToZero);

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

  var ticks = new chartEditor.ui.panel.scales.ScatterTicks(model, 'Ticks');
  ticks.allowEnabled(false);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);

  this.addContentSeparator();

  var minorTicks = new chartEditor.ui.panel.scales.ScatterTicks(model, 'Minor Ticks');
  minorTicks.allowEnabled(false);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);

  // Specific Stock chart yScale settings
  if (chartType === 'stock') {
    this.addContentSeparator();

    var comparisonMode = new chartEditor.ui.control.fieldSelect.Base({label: 'Comparison Mode'});
    comparisonMode.getSelect().setOptions([
      {value: 'none'},
      {value: 'percent'},
      {value: 'value'}
    ]);
    comparisonMode.init(model, this.genKey('comparisonMode()'));
    this.addChildControl(comparisonMode);

    var compareWith = new chartEditor.ui.control.fieldSelect.Base({label: 'Compare With'});
    compareWith.getSelect().setOptions([
      {value: 'first-visible'},
      {value: 'series-start'}
    ]);
    compareWith.init(model, this.genKey('compareWith()'));
    this.addChildControl(compareWith);
  }
};
