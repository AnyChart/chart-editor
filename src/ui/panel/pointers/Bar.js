goog.provide('chartEditor.ui.panel.pointers.Bar');

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
chartEditor.ui.panel.pointers.Bar = function(model, type, pointerId, pointerIndex, opt_domHelper) {
  chartEditor.ui.panel.pointers.Bar.base(this, 'constructor', model, type, pointerId, pointerIndex, opt_domHelper);

  this.pointerType_ = 'bar';

  this.addClassName(goog.getCssName('anychart-ce-panel-pointer-bar'));
};
goog.inherits(chartEditor.ui.panel.pointers.Bar, chartEditor.ui.panel.pointers.CircularBase);


/** @override */
chartEditor.ui.panel.pointers.Bar.prototype.createDom = function() {
  chartEditor.ui.panel.pointers.Bar.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var position = new chartEditor.ui.control.fieldSelect.Base({label: 'Position'});
  position.getSelect().setOptions(goog.object.getValues(chartEditor.enums.GaugeSidePosition));
  position.init(model, this.genKey('position()'));
  this.addChildControl(position);

  var radius = new chartEditor.ui.control.comboBox.Percent();
  radius.setOptions([10, 30, 50, 70, 90, 100]);
  var radiusLC = new chartEditor.ui.control.wrapped.Labeled(radius, 'Radius');
  radiusLC.init(model, this.genKey('radius()'));
  this.addChildControl(radiusLC);

  var width = new chartEditor.ui.control.comboBox.Percent();
  width.setOptions([0, 1, 3, 5, 10, 20]);
  var widthLC = new chartEditor.ui.control.wrapped.Labeled(width, 'Width');
  widthLC.init(model, this.genKey('width()'));
  this.addChildControl(widthLC);
};
