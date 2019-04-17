goog.provide('chartEditor.ui.panel.pointers.Led');

goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.input.Numbers');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.pointers.LinearBase');
goog.require('chartEditor.ui.panel.scales.Base');



/**
 * @param {chartEditor.model.Base} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.panel.pointers.LinearBase}
 */
chartEditor.ui.panel.pointers.Led = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.ui.panel.pointers.Led.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.skipSettings(['fill()', 'stroke()']);

  this.addClassName(goog.getCssName('anychart-ce-panel-pointer-led'));
};
goog.inherits(chartEditor.ui.panel.pointers.Led, chartEditor.ui.panel.pointers.LinearBase);


/** @override */
chartEditor.ui.panel.pointers.Led.prototype.createDom = function() {
  chartEditor.ui.panel.pointers.Led.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  this.addContentSeparator();

  var count = new chartEditor.ui.control.input.Numbers();
  var countLC = new chartEditor.ui.control.wrapped.Labeled(count, 'Count');
  countLC.init(model, this.genKey('count()'));
  this.addChildControl(countLC);

  var gap = new chartEditor.ui.control.comboBox.Percent();
  gap.setOptions([1,2,3,5,7,10]);
  var gapLC = new chartEditor.ui.control.wrapped.Labeled(gap, 'Gap');
  gapLC.init(model, this.genKey('gap()'));
  this.addChildControl(gapLC);

  var size = new chartEditor.ui.control.comboBox.Percent();
  size.setOptions([1,2,3,5,7,10]);
  var sizeLC = new chartEditor.ui.control.wrapped.Labeled(size, 'Size');
  sizeLC.init(model, this.genKey('size()'));
  this.addChildControl(sizeLC);

  this.addContentSeparator();

  var colorScale = new chartEditor.ui.panel.scales.Base(model, ['linear-color', 'ordinal-color']);
  colorScale.setKey(this.genKey('colorScale()'));
  this.addChildControl(colorScale);
};
