goog.provide('chartEditor.ui.panel.scales.StockX');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.input.StringArray');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.scales.OrdinalTicks');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.scales.StockX = function(model, opt_domHelper) {
  chartEditor.ui.panel.scales.StockX.base(this, 'constructor', model, null, opt_domHelper);

  this.allowEnabled(false);

  this.key = [['chart'], ['settings'], 'xScale()'];

  this.name = 'X Scale';

};
goog.inherits(chartEditor.ui.panel.scales.StockX, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.scales.StockX.prototype.createDom = function() {
  chartEditor.ui.panel.scales.StockX.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var scaleType = new chartEditor.ui.control.fieldSelect.Base({label: 'Scale type'});
  scaleType.getSelect().setOptions([
    {value: 'ordinal'},
    {value: 'scatter'}
  ]);
  scaleType.init(model, this.getKey('xScale()'));
 this.addChildControl(scaleType);

  // var rotationLC = new chartEditor.ui.control.wrapped.Labeled(scaleType, 'X Scale');
  // rotationLC.init(model, this.genKey('xScale()'));
  // this.addChildControl(rotationLC);

  // var layout = new chartEditor.ui.control.fieldSelect.Base({label: 'Layout'});
  // layout.getSelect().setOptions([
  //   {value: 'horizontal'},
  //   {value: 'vertical'}
  // ]);
  // layout.init(model, this.genKey('itemsLayout()'));
  // this.addChildControl(layout);

  // var inverted = new chartEditor.ui.control.checkbox.Base();
  // inverted.setCaption('Inverted');
  // inverted.init(model, this.genKey('inverted()'));
  // this.addChildControl(inverted);
  //
  // var names = new chartEditor.ui.control.input.StringArray();
  // var namesLC = new chartEditor.ui.control.wrapped.Labeled(names, 'Names');
  // namesLC.init(model, this.genKey('names()'));
  // this.addChildControl(namesLC);
  //
  // var weights = new chartEditor.ui.control.input.StringArray();
  // var weightsLC = new chartEditor.ui.control.wrapped.Labeled(weights, 'Weights');
  // weightsLC.init(model, this.genKey('weights()'));
  // this.addChildControl(weightsLC);
  //
  // this.addContentSeparator();
  //
  // var ticks = new chartEditor.ui.panel.scales.OrdinalTicks(model, 'Ticks');
  // ticks.allowEnabled(false);
  // ticks.setKey(this.genKey('ticks()'));
  // this.addChildControl(ticks);
};
