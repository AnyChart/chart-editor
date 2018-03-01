goog.provide('anychart.chartEditorModule.settings.pointers.LinearMarker');

goog.require('anychart.chartEditorModule.controls.select.DataField');
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
anychart.chartEditorModule.settings.pointers.LinearMarker = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  anychart.chartEditorModule.settings.pointers.LinearMarker.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'marker';

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-marker'));
};
goog.inherits(anychart.chartEditorModule.settings.pointers.LinearMarker, anychart.chartEditorModule.settings.pointers.LinearBase);


/** @override */
anychart.chartEditorModule.settings.pointers.LinearMarker.prototype.createDom = function() {
  anychart.chartEditorModule.settings.pointers.LinearMarker.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  this.addContentSeparator();

  var type = new anychart.chartEditorModule.controls.select.DataField({label: 'Type'});
  type.getSelect().setOptions(goog.object.getValues(anychart.enums.MarkerType));
  type.init(model, this.genKey('type()'));
  this.addChildControl(type);
};
