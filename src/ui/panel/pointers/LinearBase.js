goog.provide('chartEditor.ui.panel.pointers.LinearBase');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.pointers.LinearBase = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.ui.panel.pointers.LinearBase.base(this, 'constructor', model, pointerIndex, null, opt_domHelper);

  this.pointerId_ = String(pointerId);
  this.pointerType_ = type;

  var stringKey = 'getPointer(\'' + this.pointerId_ + '\')';
  this.key = [['chart'], ['settings'], stringKey];

  this.allowEnabled(false);
  this.addClassName(goog.getCssName('anychart-ce-panel-pointer-single'));
};
goog.inherits(chartEditor.ui.panel.pointers.LinearBase, chartEditor.ui.PanelZippy);


/** @override */
chartEditor.ui.panel.pointers.LinearBase.prototype.createDom = function() {
  chartEditor.ui.panel.pointers.LinearBase.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  // region ==== Header
  var name = new chartEditor.ui.control.input.Base('Pointer name');
  name.init(model, this.genKey('name()'));
  this.addHeaderChildControl(name);
  goog.dom.classlist.add(name.getElement(), goog.getCssName('anychart-ce-series-name-input'));
  // endregion

  var fill = new chartEditor.ui.control.colorPicker.Base();
  var fillLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  var scale = new chartEditor.ui.control.select.Scales({label: 'Scale'});
  scale.init(model, this.genKey('scale()'), void 0, true);
  this.addChildControl(scale);

  var stroke = new chartEditor.ui.panel.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  var width = new chartEditor.ui.control.comboBox.Percent();
  width.setOptions([0, 1, 3, 5, 10, 15, 20, 30]);
  var widthLC = new chartEditor.ui.control.wrapped.Labeled(width, 'Width');
  widthLC.init(model, this.genKey('width()'));
  this.addChildControl(widthLC);

  var offset = new chartEditor.ui.control.comboBox.Percent();
  offset.allowNegative(true);
  var offsetLC = new chartEditor.ui.control.wrapped.Labeled(offset, 'Offset');
  offsetLC.init(model, this.genKey('offset()'));
  this.addChildControl(offsetLC);

  var zIndex = new chartEditor.ui.control.comboBox.Base();
  zIndex.setOptions([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  var zIndexLC = new chartEditor.ui.control.wrapped.Labeled(zIndex, 'ZIndex');
  zIndexLC.init(model, this.genKey('zIndex()'));
  this.addChildControl(zIndexLC);
};


/**
 * Getter for pointer type
 * @return {string} pointer type
 */
chartEditor.ui.panel.pointers.LinearBase.prototype.getPointerType = function() {
  return this.pointerType_;
};
