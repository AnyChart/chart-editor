goog.provide('chartEditor.ui.panel.pointers.Marker');

goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.pointers.CircularBase');



/**
 * @param {chartEditor.model.Base} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.panel.pointers.CircularBase}
 */
chartEditor.ui.panel.pointers.Marker = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.ui.panel.pointers.Marker.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'marker';

  this.addClassName(goog.getCssName('anychart-ce-panel-pointer-marker'));
};
goog.inherits(chartEditor.ui.panel.pointers.Marker, chartEditor.ui.panel.pointers.CircularBase);


/** @override */
chartEditor.ui.panel.pointers.Marker.prototype.createDom = function() {
  chartEditor.ui.panel.pointers.Marker.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var type = new chartEditor.ui.control.fieldSelect.Base({label: 'Type'});
  type.getSelect().setOptions(goog.object.getValues(chartEditor.enums.MarkerType));
  type.init(model, this.genKey('type()'));
  this.addChildControl(type);

  var position = new chartEditor.ui.control.fieldSelect.Base({label: 'Position'});
  position.getSelect().setOptions(goog.object.getValues(chartEditor.enums.GaugeSidePosition));
  position.init(model, this.genKey('position()'));
  this.addChildControl(position);

  var radius = new chartEditor.ui.control.comboBox.Percent();
  radius.setOptions([10, 30, 50, 70, 90, 100]);
  var radiusLC = new chartEditor.ui.control.wrapped.Labeled(radius, 'Radius');
  radiusLC.init(model, this.genKey('radius()'));
  this.addChildControl(radiusLC);

  var size = new chartEditor.ui.control.comboBox.Percent();
  size.setOptions([2, 5, 10, 15, 20]);
  var sizeLC = new chartEditor.ui.control.wrapped.Labeled(size, 'Size');
  sizeLC.init(model, this.genKey('size()'));
  this.addChildControl(sizeLC);
};
