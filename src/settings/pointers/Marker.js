goog.provide('anychart.chartEditorModule.settings.pointers.Marker');

goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.settings.pointers.CircularBase');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {string} type
 * @param {string|number} pointerId
 * @param {number} pointerIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.settings.pointers.CircularBase}
 */
anychart.chartEditorModule.settings.pointers.Marker = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  anychart.chartEditorModule.settings.pointers.Marker.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'marker';

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-marker'));
};
goog.inherits(anychart.chartEditorModule.settings.pointers.Marker, anychart.chartEditorModule.settings.pointers.CircularBase);


/** @override */
anychart.chartEditorModule.settings.pointers.Marker.prototype.createDom = function() {
  anychart.chartEditorModule.settings.pointers.Marker.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var type = new anychart.chartEditorModule.controls.select.DataField({label: 'Type'});
  type.getSelect().setOptions(goog.object.getValues(anychart.enums.MarkerType));
  type.init(model, this.genKey('type()'));
  this.addChildControl(type);

  var position = new anychart.chartEditorModule.controls.select.DataField({label: 'Position'});
  position.getSelect().setOptions(goog.object.getValues(anychart.enums.GaugeSidePosition));
  position.init(model, this.genKey('position()'));
  this.addChildControl(position);

  var radius = new anychart.chartEditorModule.comboBox.Percent();
  radius.setOptions([10, 30, 50, 70, 90, 100]);
  var radiusLC = new anychart.chartEditorModule.controls.LabeledControl(radius, 'Radius');
  radiusLC.init(model, this.genKey('radius()'));
  this.addChildControl(radiusLC);

  var size = new anychart.chartEditorModule.comboBox.Percent();
  size.setOptions([2, 5, 10, 15, 20]);
  var sizeLC = new anychart.chartEditorModule.controls.LabeledControl(size, 'Size');
  sizeLC.init(model, this.genKey('size()'));
  this.addChildControl(sizeLC);
};
