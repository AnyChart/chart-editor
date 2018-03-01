goog.provide('chartEditor.settings.pointers.Bar');

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
chartEditor.settings.pointers.Bar = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.settings.pointers.Bar.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'bar';

  this.addClassName(goog.getCssName('anychart-settings-panel-pointer-bar'));
};
goog.inherits(chartEditor.settings.pointers.Bar, chartEditor.settings.pointers.CircularBase);


/** @override */
chartEditor.settings.pointers.Bar.prototype.createDom = function() {
  chartEditor.settings.pointers.Bar.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var position = new chartEditor.controls.select.DataField({label: 'Position'});
  position.getSelect().setOptions(goog.object.getValues(chartEditor.enums.GaugeSidePosition));
  position.init(model, this.genKey('position()'));
  this.addChildControl(position);

  var radius = new chartEditor.comboBox.Percent();
  radius.setOptions([10, 30, 50, 70, 90, 100]);
  var radiusLC = new chartEditor.controls.LabeledControl(radius, 'Radius');
  radiusLC.init(model, this.genKey('radius()'));
  this.addChildControl(radiusLC);

  var width = new chartEditor.comboBox.Percent();
  width.setOptions([0, 1, 3, 5, 10, 20]);
  var widthLC = new chartEditor.controls.LabeledControl(width, 'Width');
  widthLC.init(model, this.genKey('width()'));
  this.addChildControl(widthLC);
};
