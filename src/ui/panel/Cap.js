goog.provide('chartEditor.ui.panel.Cap');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Cap = function(model, opt_domHelper) {
  chartEditor.ui.panel.Cap.base(this, 'constructor', model, 'Cap', opt_domHelper);

  this.allowEnabled(true);
};
goog.inherits(chartEditor.ui.panel.Cap, chartEditor.ui.Panel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.ui.panel.Cap.CSS_CLASS = goog.getCssName('anychart-ce-panel-cap');


/** @override */
chartEditor.ui.panel.Cap.prototype.createDom = function() {
  chartEditor.ui.panel.Cap.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.ui.panel.Cap.CSS_CLASS);

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var fill = new chartEditor.ui.control.colorPicker.Base();
  var fillLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Cap Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  var stroke = new chartEditor.ui.panel.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  var radius = new chartEditor.ui.control.comboBox.Percent();
  radius.setOptions([10, 30, 50, 70, 90]);
  var radiusLC = new chartEditor.ui.control.wrapped.Labeled(radius, 'Radius');
  radiusLC.init(model, this.genKey('radius()'));
  this.addChildControl(radiusLC);
};
