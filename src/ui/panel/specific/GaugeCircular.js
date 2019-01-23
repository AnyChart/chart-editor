goog.provide('chartEditor.ui.panel.specific.GaugeCircular');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Cap');
goog.require('chartEditor.ui.panel.Stroke');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.specific.GaugeCircular = function(model, opt_domHelper) {
  chartEditor.ui.panel.specific.GaugeCircular.base(this, 'constructor', model, 'Circular Gauge Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];

  this.addClassName(goog.getCssName('anychart-ce-panel-gauge-circular'));
};
goog.inherits(chartEditor.ui.panel.specific.GaugeCircular, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.specific.GaugeCircular.prototype.createDom = function() {
  chartEditor.ui.panel.specific.GaugeCircular.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var fill = new chartEditor.ui.control.colorPicker.Base();
  var fillLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Gauge Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  var stroke = new chartEditor.ui.panel.Stroke(model, 'Stroke');
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  var startAngle = new chartEditor.ui.control.comboBox.Base();
  startAngle.setOptions([-90, 0, 90, 180, 270]);
  startAngle.setRange(-360, 360);
  var startAngleLC = new chartEditor.ui.control.wrapped.Labeled(startAngle, 'Start Angle');
  startAngleLC.init(model, this.genKey('startAngle()'));
  this.addChildControl(startAngleLC);

  var sweepAngle = new chartEditor.ui.control.comboBox.Base();
  sweepAngle.setOptions([-180, -90, 0, 90, 180, 270]);
  sweepAngle.setRange(-360, 360);
  var sweepAngleLC = new chartEditor.ui.control.wrapped.Labeled(sweepAngle, 'Sweep Angle');
  sweepAngleLC.init(model, this.genKey('sweepAngle()'));
  this.addChildControl(sweepAngleLC);

  var circularPadding = new chartEditor.ui.control.comboBox.Percent();
  circularPadding.setOptions([0, 5, 10, 20, 30, 40]);
  var circularPaddingLC = new chartEditor.ui.control.wrapped.Labeled(circularPadding, 'Circular Padding');
  circularPaddingLC.init(model, this.genKey('circularPadding()'));
  this.addChildControl(circularPaddingLC);

  var encloseWithStraightLine = new chartEditor.ui.control.checkbox.Base();
  encloseWithStraightLine.setCaption('Enclose With Straight Line');
  encloseWithStraightLine.init(model, [['chart'], ['settings'], 'encloseWithStraightLine()']);
  this.addChildControl(encloseWithStraightLine);

  this.addContentSeparator();

  var cap = new chartEditor.ui.panel.Cap(model);
  cap.setKey(this.genKey('cap()'));
  this.addChildControl(cap);
};
