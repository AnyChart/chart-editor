goog.provide('chartEditor.settings.pointers.Marker');

goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.settings.pointers.CircularBase');


/**
 * @param {chartEditor.EditorModel} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.pointers.CircularBase}
 */
chartEditor.settings.pointers.Marker = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.settings.pointers.Marker.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'marker';

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-pointer-marker'));
};
goog.inherits(chartEditor.settings.pointers.Marker, chartEditor.settings.pointers.CircularBase);


/** @override */
chartEditor.settings.pointers.Marker.prototype.createDom = function() {
  chartEditor.settings.pointers.Marker.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var type = new chartEditor.controls.select.DataField({label: 'Type'});
  type.getSelect().setOptions(goog.object.getValues(chartEditor.enums.MarkerType));
  type.init(model, this.genKey('type()'));
  this.addChildControl(type);

  var position = new chartEditor.controls.select.DataField({label: 'Position'});
  position.getSelect().setOptions(goog.object.getValues(chartEditor.enums.GaugeSidePosition));
  position.init(model, this.genKey('position()'));
  this.addChildControl(position);

  var radius = new chartEditor.comboBox.Percent();
  radius.setOptions([10, 30, 50, 70, 90, 100]);
  var radiusLC = new chartEditor.controls.LabeledControl(radius, 'Radius');
  radiusLC.init(model, this.genKey('radius()'));
  this.addChildControl(radiusLC);

  var size = new chartEditor.comboBox.Percent();
  size.setOptions([2, 5, 10, 15, 20]);
  var sizeLC = new chartEditor.controls.LabeledControl(size, 'Size');
  sizeLC.init(model, this.genKey('size()'));
  this.addChildControl(sizeLC);
};
