goog.provide('chartEditor.settings.pointers.LinearMarker');

goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.settings.pointers.LinearBase');


/**
 * @param {chartEditor.EditorModel} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.pointers.LinearBase}
 */
chartEditor.settings.pointers.LinearMarker = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.settings.pointers.LinearMarker.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'marker';

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-marker'));
};
goog.inherits(chartEditor.settings.pointers.LinearMarker, chartEditor.settings.pointers.LinearBase);


/** @override */
chartEditor.settings.pointers.LinearMarker.prototype.createDom = function() {
  chartEditor.settings.pointers.LinearMarker.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  this.addContentSeparator();

  var type = new chartEditor.controls.select.DataField({label: 'Type'});
  type.getSelect().setOptions(goog.object.getValues(chartEditor.enums.MarkerType));
  type.init(model, this.genKey('type()'));
  this.addChildControl(type);
};
