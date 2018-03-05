goog.provide('chartEditor.settings.pointers.LinearBase');

goog.require('chartEditor.SettingsPanelZippy');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.input.Base');
goog.require('chartEditor.settings.Stroke');


/**
 * @param {chartEditor.EditorModel} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanelZippy}
 */
chartEditor.settings.pointers.LinearBase = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.settings.pointers.LinearBase.base(this, 'constructor', model, pointerIndex, null, opt_domHelper);

  this.pointerId_ = String(pointerId);
  this.pointerType_ = type;

  var stringKey = 'getPointer(\'' + this.pointerId_ + '\')';
  this.key = [['chart'], ['settings'], stringKey];

  this.allowEnabled(false);
  this.addClassName(goog.getCssName('anychart-ce-settings-panel-pointer-single'));
};
goog.inherits(chartEditor.settings.pointers.LinearBase, chartEditor.SettingsPanelZippy);


/** @override */
chartEditor.settings.pointers.LinearBase.prototype.createDom = function() {
  chartEditor.settings.pointers.LinearBase.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  // region ==== Header
  var name = new chartEditor.input.Base('Pointer name');
  name.init(model, this.genKey('name()'));
  this.addHeaderChildControl(name);
  goog.dom.classlist.add(name.getElement(), goog.getCssName('anychart-ce-series-name-input'));

  var fill = new chartEditor.colorPicker.Base();
  fill.addClassName(goog.getCssName('anychart-ce-settings-control-right'));
  fill.init(model, this.genKey('fill()'));
  this.addHeaderChildControl(fill);
  // endregion

  var stroke = new chartEditor.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  var width = new chartEditor.comboBox.Percent();
  width.setOptions([0, 1, 3, 5, 10, 15, 20, 30]);
  var widthLC = new chartEditor.controls.LabeledControl(width, 'Width');
  widthLC.init(model, this.genKey('width()'));
  this.addChildControl(widthLC);

  var offset = new chartEditor.comboBox.Percent();
  offset.allowNegative(true);
  var offsetLC = new chartEditor.controls.LabeledControl(offset, 'Offset');
  offsetLC.init(model, this.genKey('offset()'));
  this.addChildControl(offsetLC);

  var zIndex = new chartEditor.comboBox.Base();
  zIndex.setOptions([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  var zIndexLC = new chartEditor.controls.LabeledControl(zIndex, 'ZIndex');
  zIndexLC.init(model, this.genKey('zIndex()'));
  this.addChildControl(zIndexLC);
};
