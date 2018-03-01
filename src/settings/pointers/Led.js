goog.provide('chartEditor.settings.pointers.Led');

goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.input.Numbers');
goog.require('chartEditor.settings.pointers.LinearBase');
goog.require('chartEditor.settings.scales.Base');


/**
 * @param {chartEditor.EditorModel} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.pointers.LinearBase}
 */
chartEditor.settings.pointers.Led = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.settings.pointers.Led.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'led';

  this.skipSettings(['fill()', 'stroke()']);

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-led'));
};
goog.inherits(chartEditor.settings.pointers.Led, chartEditor.settings.pointers.LinearBase);


/** @override */
chartEditor.settings.pointers.Led.prototype.createDom = function() {
  chartEditor.settings.pointers.Led.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  this.addContentSeparator();

  var count = new chartEditor.input.Numbers();
  var countLC = new chartEditor.controls.LabeledControl(count, 'Count');
  countLC.init(model, this.genKey('count()'));
  this.addChildControl(countLC);

  var gap = new chartEditor.comboBox.Percent();
  gap.setOptions([1,2,3,5,7,10]);
  var gapLC = new chartEditor.controls.LabeledControl(gap, 'Gap');
  gapLC.init(model, this.genKey('gap()'));
  this.addChildControl(gapLC);

  var size = new chartEditor.comboBox.Percent();
  size.setOptions([1,2,3,5,7,10]);
  var sizeLC = new chartEditor.controls.LabeledControl(size, 'Size');
  sizeLC.init(model, this.genKey('size()'));
  this.addChildControl(sizeLC);

  this.addContentSeparator();

  var colorScale = new chartEditor.settings.scales.Base(model, ['linear-color', 'ordinal-color']);
  colorScale.setKey(this.genKey('colorScale()'));
  this.addChildControl(colorScale);
};
