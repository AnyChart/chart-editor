goog.provide('anychart.chartEditorModule.settings.axes.Circular');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.SettingsPanelZippy');
goog.require('anychart.chartEditorModule.checkbox.Base');
goog.require('anychart.chartEditorModule.colorPicker.Base');
goog.require('anychart.chartEditorModule.comboBox.Base');
goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.settings.Labels');
goog.require('anychart.chartEditorModule.settings.Ticks');
goog.require('anychart.chartEditorModule.settings.scales.Base');



/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanelZippy}
 */
anychart.chartEditorModule.settings.axes.Circular = function(model, index, opt_domHelper) {
  anychart.chartEditorModule.settings.axes.Circular.base(this, 'constructor', model, index, null, opt_domHelper);

  this.axisExists = false;
  this.name = 'Axis(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], 'axis(' + this.index_ + ')'];

  this.allowEnabled(true);
  this.addClassName(goog.getCssName('anychart-settings-panel-gauge-axis-single'));
};
goog.inherits(anychart.chartEditorModule.settings.axes.Circular, anychart.chartEditorModule.SettingsPanelZippy);


/** @override */
anychart.chartEditorModule.settings.axes.Circular.prototype.createDom = function() {
  anychart.chartEditorModule.settings.axes.Circular.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

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

  var radius = new anychart.chartEditorModule.comboBox.Percent();
  radius.setOptions([10, 30, 50, 70, 90]);
  var radiusLC = new anychart.chartEditorModule.controls.LabeledControl(radius, 'Radius');
  radiusLC.init(model, this.genKey('radius()'));
  this.addChildControl(radiusLC);

  var width = new anychart.chartEditorModule.comboBox.Percent();
  width.setOptions([0, 1, 3, 5, 10]);
  var widthLC = new anychart.chartEditorModule.controls.LabeledControl(width, 'Width');
  widthLC.init(model, this.genKey('width()'));
  this.addChildControl(widthLC);

  var cornersRounding = new anychart.chartEditorModule.comboBox.Percent();
  cornersRounding.setOptions([0, 20, 50, 70, 100]);
  var cornersRoundingLC = new anychart.chartEditorModule.controls.LabeledControl(cornersRounding, 'Corners Rounding');
  cornersRoundingLC.init(model, this.genKey('cornersRounding()'));
  this.addChildControl(cornersRoundingLC);

  var fill = new anychart.chartEditorModule.colorPicker.Base();
  var fillLC = new anychart.chartEditorModule.controls.LabeledControl(fill, 'Axis Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  // Overlap mode
  var overlapMode = new anychart.chartEditorModule.controls.select.DataField({label: 'Labels Overlap'});
  overlapMode.getControl().setOptions([
    {value: 'allow-overlap', caption: 'Overlap'},
    {value: 'no-overlap', caption: 'No overlap'}
  ]);
  overlapMode.init(model, this.genKey('overlapMode()'));
  this.addChildControl(overlapMode);

  this.addContentSeparator();

  //region Labels
  var labels = new anychart.chartEditorModule.settings.Labels(model);
  labels.allowEnabled(true);
  labels.allowEditPosition(false);
  labels.allowEditAnchor(false);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  var drawFirstLabel = new anychart.chartEditorModule.checkbox.Base();
  drawFirstLabel.setCaption('Draw First Label');
  drawFirstLabel.init(model, this.genKey('drawFirstLabel()'));
  labels.addChildControl(drawFirstLabel);

  var drawLastLabel = new anychart.chartEditorModule.checkbox.Base();
  drawLastLabel.setCaption('Draw Last Label');
  drawLastLabel.init(model, this.genKey('drawLastLabel()'));
  labels.addChildControl(drawLastLabel);

  this.addContentSeparator();

  // Ticks
  var ticks = new anychart.chartEditorModule.settings.Ticks(model);
  ticks.allowEnabled(true);
  ticks.allowEditFill(true);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);
  //endregion

  this.addContentSeparator();

  //region Minor Labels
  var minorLabels = new anychart.chartEditorModule.settings.Labels(model);
  minorLabels.setName('Minor Labels');
  minorLabels.allowEnabled(true);
  minorLabels.allowEditPosition(false);
  minorLabels.allowEditAnchor(false);
  minorLabels.setKey(this.genKey('minorLabels()'));
  this.addChildControl(minorLabels);

  this.addContentSeparator();

  // Minor Ticks
  var minorTicks = new anychart.chartEditorModule.settings.Ticks(model);
  minorTicks.setName('Minor Ticks');
  minorTicks.allowEnabled(true);
  minorTicks.allowEditFill(true);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);
  //endregion

  this.addContentSeparator();

  var scale = new anychart.chartEditorModule.settings.scales.Base(model, ['linear', 'log']);
  scale.setKey(this.genKey('scale()'));
  scale.setName('Scale');
  scale.skipSettings(['stackMode()', 'stackDirection()']);
  this.addChildControl(scale);
};


/** @inheritDoc */
anychart.chartEditorModule.settings.axes.Circular.prototype.onChartDraw = function(evt) {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  this.getHandler().listenOnce(model, anychart.chartEditorModule.events.EventType.CHART_DRAW, this.onChartDraw);

  if (!this.isExcluded()) {
    var chart = evt.chart;
    this.axisExists = chart.getAxesCount() > this.index_;

    if (this.axisExists) {
      this.getHandler().unlisten(model, anychart.chartEditorModule.events.EventType.CHART_DRAW, this.onChartDraw);
      anychart.chartEditorModule.settings.axes.Circular.base(this, 'onChartDraw', evt);

    } else
      this.setContentEnabled(false);
  }
};
