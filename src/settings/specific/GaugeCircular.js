goog.provide('chartEditor.settings.specific.GaugeCircular');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.checkbox.Base');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.settings.Cap');
goog.require('chartEditor.settings.Stroke');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.specific.GaugeCircular = function(model, opt_domHelper) {
  chartEditor.settings.specific.GaugeCircular.base(this, 'constructor', model, 'Circular Gauge Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.settings.specific.GaugeCircular, chartEditor.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.specific.GaugeCircular.CSS_CLASS = goog.getCssName('anychart-ce-settings-panel-gauge-circular');


/** @override */
chartEditor.settings.specific.GaugeCircular.prototype.createDom = function() {
  chartEditor.settings.specific.GaugeCircular.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.settings.specific.GaugeCircular.CSS_CLASS);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var fill = new chartEditor.colorPicker.Base();
  var fillLC = new chartEditor.controls.LabeledControl(fill, 'Gauge Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  var stroke = new chartEditor.settings.Stroke(model, 'Stroke');
  stroke.setKey(this.genKey('stroke()'));
  this.addChild(stroke, true);

  var startAngle = new chartEditor.comboBox.Base();
  startAngle.setOptions([-90, 0, 90, 180, 270]);
  startAngle.setRange(-360, 360);
  var startAngleLC = new chartEditor.controls.LabeledControl(startAngle, 'Start Angle');
  startAngleLC.init(model, this.genKey('startAngle()'));
  this.addChildControl(startAngleLC);

  var sweepAngle = new chartEditor.comboBox.Base();
  sweepAngle.setOptions([-180, -90, 0, 90, 180, 270]);
  sweepAngle.setRange(-360, 360);
  var sweepAngleLC = new chartEditor.controls.LabeledControl(sweepAngle, 'Sweep Angle');
  sweepAngleLC.init(model, this.genKey('sweepAngle()'));
  this.addChildControl(sweepAngleLC);

  var circularPadding = new chartEditor.comboBox.Percent();
  circularPadding.setOptions([0, 5, 10, 20, 30, 40]);
  var circularPaddingLC = new chartEditor.controls.LabeledControl(circularPadding, 'Circular Padding');
  circularPaddingLC.init(model, this.genKey('circularPadding()'));
  this.addChildControl(circularPaddingLC);

  var encloseWithStraightLine = new chartEditor.checkbox.Base();
  encloseWithStraightLine.setCaption('Enclose With Straight Line');
  encloseWithStraightLine.init(model, [['chart'], ['settings'], 'encloseWithStraightLine()']);
  this.addChildControl(encloseWithStraightLine);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-settings-item-separator-gaps')));

  var cap = new chartEditor.settings.Cap(model);
  cap.setKey(this.genKey('cap()'));
  this.addChild(cap, true);
};
