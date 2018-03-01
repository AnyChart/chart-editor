goog.provide('anychart.chartEditorModule.settings.pointers.Tank');

goog.require('anychart.chartEditorModule.colorPicker.Base');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.settings.pointers.LinearBase');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.settings.pointers.LinearBase}
 */
anychart.chartEditorModule.settings.pointers.Tank = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  anychart.chartEditorModule.settings.pointers.Tank.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'tank';

  this.skipSettings(['stroke()']);

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-tank'));
};
goog.inherits(anychart.chartEditorModule.settings.pointers.Tank, anychart.chartEditorModule.settings.pointers.LinearBase);


/** @override */
anychart.chartEditorModule.settings.pointers.Tank.prototype.createDom = function() {
  anychart.chartEditorModule.settings.pointers.Tank.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  this.addContentSeparator();

  var emptyFill = new anychart.chartEditorModule.colorPicker.Base();
  var emptyFillLC = new anychart.chartEditorModule.controls.LabeledControl(emptyFill, 'Empty Fill');
  emptyFillLC.init(model, this.genKey('emptyFill()'));
  this.addChildControl(emptyFillLC);
};
