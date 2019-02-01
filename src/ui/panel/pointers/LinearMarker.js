goog.provide('chartEditor.ui.panel.pointers.LinearMarker');

goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.panel.pointers.LinearBase');


/**
 * @param {chartEditor.model.Base} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.panel.pointers.LinearBase}
 */
chartEditor.ui.panel.pointers.LinearMarker = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.ui.panel.pointers.LinearMarker.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'marker';

  this.addClassName(goog.getCssName('anychart-ce-panel-pointer-marker'));
};
goog.inherits(chartEditor.ui.panel.pointers.LinearMarker, chartEditor.ui.panel.pointers.LinearBase);


/** @override */
chartEditor.ui.panel.pointers.LinearMarker.prototype.createDom = function() {
  chartEditor.ui.panel.pointers.LinearMarker.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  this.addContentSeparator();

  var type = new chartEditor.ui.control.fieldSelect.Base({label: 'Type'});
  type.getSelect().setOptions(goog.object.getValues(chartEditor.enums.MarkerType));
  type.init(model, this.genKey('type()'));
  this.addChildControl(type);
};
