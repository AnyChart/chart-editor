goog.provide('anychart.chartEditorModule.settings.pointers.LinearBase');

goog.require('anychart.chartEditorModule.SettingsPanelZippy');
goog.require('anychart.chartEditorModule.colorPicker.Base');
goog.require('anychart.chartEditorModule.comboBox.Base');
goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.input.Base');
goog.require('anychart.chartEditorModule.settings.Stroke');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanelZippy}
 */
anychart.chartEditorModule.settings.pointers.LinearBase = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  anychart.chartEditorModule.settings.pointers.LinearBase.base(this, 'constructor', model, pointerIndex, null, opt_domHelper);

  this.pointerId_ = String(pointerId);
  this.pointerType_ = type;

  var stringKey = 'getPointer(\'' + this.pointerId_ + '\')';
  this.key = [['chart'], ['settings'], stringKey];

  this.allowEnabled(false);
  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-single'));
};
goog.inherits(anychart.chartEditorModule.settings.pointers.LinearBase, anychart.chartEditorModule.SettingsPanelZippy);


/** @override */
anychart.chartEditorModule.settings.pointers.LinearBase.prototype.createDom = function() {
  anychart.chartEditorModule.settings.pointers.LinearBase.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  // region ==== Header
  var name = new anychart.chartEditorModule.input.Base('Pointer name');
  name.init(model, this.genKey('name()'));
  this.addHeaderChildControl(name);
  goog.dom.classlist.add(name.getElement(), goog.getCssName('anychart-chart-editor-series-name-input'));

  var fill = new anychart.chartEditorModule.colorPicker.Base();
  fill.addClassName(goog.getCssName('anychart-chart-editor-settings-control-right'));
  fill.init(model, this.genKey('fill()'));
  this.addHeaderChildControl(fill);
  // endregion

  var stroke = new anychart.chartEditorModule.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  var width = new anychart.chartEditorModule.comboBox.Percent();
  width.setOptions([0, 1, 3, 5, 10, 15, 20, 30]);
  var widthLC = new anychart.chartEditorModule.controls.LabeledControl(width, 'Width');
  widthLC.init(model, this.genKey('width()'));
  this.addChildControl(widthLC);

  var offset = new anychart.chartEditorModule.comboBox.Percent();
  offset.allowNegative(true);
  var offsetLC = new anychart.chartEditorModule.controls.LabeledControl(offset, 'Offset');
  offsetLC.init(model, this.genKey('offset()'));
  this.addChildControl(offsetLC);

  var zIndex = new anychart.chartEditorModule.comboBox.Base();
  zIndex.setOptions([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  var zIndexLC = new anychart.chartEditorModule.controls.LabeledControl(zIndex, 'ZIndex');
  zIndexLC.init(model, this.genKey('zIndex()'));
  this.addChildControl(zIndexLC);
};
