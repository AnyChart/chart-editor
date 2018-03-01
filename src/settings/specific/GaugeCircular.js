goog.provide('anychart.chartEditorModule.settings.specific.GaugeCircular');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.checkbox.Base');
goog.require('anychart.chartEditorModule.colorPicker.Base');
goog.require('anychart.chartEditorModule.comboBox.Base');
goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.settings.Cap');
goog.require('anychart.chartEditorModule.settings.Stroke');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.specific.GaugeCircular = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.specific.GaugeCircular.base(this, 'constructor', model, 'Circular Gauge Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(anychart.chartEditorModule.settings.specific.GaugeCircular, anychart.chartEditorModule.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.specific.GaugeCircular.CSS_CLASS = goog.getCssName('anychart-settings-panel-gauge-circular');


/** @override */
anychart.chartEditorModule.settings.specific.GaugeCircular.prototype.createDom = function() {
  anychart.chartEditorModule.settings.specific.GaugeCircular.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), anychart.chartEditorModule.settings.specific.GaugeCircular.CSS_CLASS);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var fill = new anychart.chartEditorModule.colorPicker.Base();
  var fillLC = new anychart.chartEditorModule.controls.LabeledControl(fill, 'Gauge Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  var stroke = new anychart.chartEditorModule.settings.Stroke(model, 'Stroke');
  stroke.setKey(this.genKey('stroke()'));
  this.addChild(stroke, true);

  var startAngle = new anychart.chartEditorModule.comboBox.Base();
  startAngle.setOptions([-90, 0, 90, 180, 270]);
  startAngle.setRange(-360, 360);
  var startAngleLC = new anychart.chartEditorModule.controls.LabeledControl(startAngle, 'Start Angle');
  startAngleLC.init(model, this.genKey('startAngle()'));
  this.addChildControl(startAngleLC);

  var sweepAngle = new anychart.chartEditorModule.comboBox.Base();
  sweepAngle.setOptions([-180, -90, 0, 90, 180, 270]);
  sweepAngle.setRange(-360, 360);
  var sweepAngleLC = new anychart.chartEditorModule.controls.LabeledControl(sweepAngle, 'Sweep Angle');
  sweepAngleLC.init(model, this.genKey('sweepAngle()'));
  this.addChildControl(sweepAngleLC);

  var circularPadding = new anychart.chartEditorModule.comboBox.Percent();
  circularPadding.setOptions([0, 5, 10, 20, 30, 40]);
  var circularPaddingLC = new anychart.chartEditorModule.controls.LabeledControl(circularPadding, 'Circular Padding');
  circularPaddingLC.init(model, this.genKey('circularPadding()'));
  this.addChildControl(circularPaddingLC);

  var encloseWithStraightLine = new anychart.chartEditorModule.checkbox.Base();
  encloseWithStraightLine.setCaption('Enclose With Straight Line');
  encloseWithStraightLine.init(model, [['chart'], ['settings'], 'encloseWithStraightLine()']);
  this.addChildControl(encloseWithStraightLine);

  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator-gaps')));

  var cap = new anychart.chartEditorModule.settings.Cap(model);
  cap.setKey(this.genKey('cap()'));
  this.addChild(cap, true);
};
