goog.provide('anychart.chartEditorModule.settings.pointers.Led');

goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.input.Numbers');
goog.require('anychart.chartEditorModule.settings.pointers.LinearBase');
goog.require('anychart.chartEditorModule.settings.scales.Base');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.settings.pointers.LinearBase}
 */
anychart.chartEditorModule.settings.pointers.Led = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  anychart.chartEditorModule.settings.pointers.Led.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'led';

  this.skipSettings(['fill()', 'stroke()']);

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-led'));
};
goog.inherits(anychart.chartEditorModule.settings.pointers.Led, anychart.chartEditorModule.settings.pointers.LinearBase);


/** @override */
anychart.chartEditorModule.settings.pointers.Led.prototype.createDom = function() {
  anychart.chartEditorModule.settings.pointers.Led.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  this.addContentSeparator();

  var count = new anychart.chartEditorModule.input.Numbers();
  var countLC = new anychart.chartEditorModule.controls.LabeledControl(count, 'Count');
  countLC.init(model, this.genKey('count()'));
  this.addChildControl(countLC);

  var gap = new anychart.chartEditorModule.comboBox.Percent();
  gap.setOptions([1,2,3,5,7,10]);
  var gapLC = new anychart.chartEditorModule.controls.LabeledControl(gap, 'Gap');
  gapLC.init(model, this.genKey('gap()'));
  this.addChildControl(gapLC);

  var size = new anychart.chartEditorModule.comboBox.Percent();
  size.setOptions([1,2,3,5,7,10]);
  var sizeLC = new anychart.chartEditorModule.controls.LabeledControl(size, 'Size');
  sizeLC.init(model, this.genKey('size()'));
  this.addChildControl(sizeLC);

  this.addContentSeparator();

  var colorScale = new anychart.chartEditorModule.settings.scales.Base(model, ['linear-color', 'ordinal-color']);
  colorScale.setKey(this.genKey('colorScale()'));
  this.addChildControl(colorScale);
};
