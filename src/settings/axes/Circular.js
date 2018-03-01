goog.provide('chartEditor.settings.axes.Circular');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.SettingsPanelZippy');
goog.require('chartEditor.checkbox.Base');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.settings.Labels');
goog.require('chartEditor.settings.Ticks');
goog.require('chartEditor.settings.scales.Base');



/**
 * @param {chartEditor.EditorModel} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanelZippy}
 */
chartEditor.settings.axes.Circular = function(model, index, opt_domHelper) {
  chartEditor.settings.axes.Circular.base(this, 'constructor', model, index, null, opt_domHelper);

  this.axisExists = false;
  this.name = 'Axis(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], 'axis(' + this.index_ + ')'];

  this.allowEnabled(true);
  this.addClassName(goog.getCssName('anychart-settings-panel-gauge-axis-single'));
};
goog.inherits(chartEditor.settings.axes.Circular, chartEditor.SettingsPanelZippy);


/** @override */
chartEditor.settings.axes.Circular.prototype.createDom = function() {
  chartEditor.settings.axes.Circular.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

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

  var radius = new chartEditor.comboBox.Percent();
  radius.setOptions([10, 30, 50, 70, 90]);
  var radiusLC = new chartEditor.controls.LabeledControl(radius, 'Radius');
  radiusLC.init(model, this.genKey('radius()'));
  this.addChildControl(radiusLC);

  var width = new chartEditor.comboBox.Percent();
  width.setOptions([0, 1, 3, 5, 10]);
  var widthLC = new chartEditor.controls.LabeledControl(width, 'Width');
  widthLC.init(model, this.genKey('width()'));
  this.addChildControl(widthLC);

  var cornersRounding = new chartEditor.comboBox.Percent();
  cornersRounding.setOptions([0, 20, 50, 70, 100]);
  var cornersRoundingLC = new chartEditor.controls.LabeledControl(cornersRounding, 'Corners Rounding');
  cornersRoundingLC.init(model, this.genKey('cornersRounding()'));
  this.addChildControl(cornersRoundingLC);

  var fill = new chartEditor.colorPicker.Base();
  var fillLC = new chartEditor.controls.LabeledControl(fill, 'Axis Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  // Overlap mode
  var overlapMode = new chartEditor.controls.select.DataField({label: 'Labels Overlap'});
  overlapMode.getControl().setOptions([
    {value: 'allow-overlap', caption: 'Overlap'},
    {value: 'no-overlap', caption: 'No overlap'}
  ]);
  overlapMode.init(model, this.genKey('overlapMode()'));
  this.addChildControl(overlapMode);

  this.addContentSeparator();

  //region Labels
  var labels = new chartEditor.settings.Labels(model);
  labels.allowEnabled(true);
  labels.allowEditPosition(false);
  labels.allowEditAnchor(false);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  var drawFirstLabel = new chartEditor.checkbox.Base();
  drawFirstLabel.setCaption('Draw First Label');
  drawFirstLabel.init(model, this.genKey('drawFirstLabel()'));
  labels.addChildControl(drawFirstLabel);

  var drawLastLabel = new chartEditor.checkbox.Base();
  drawLastLabel.setCaption('Draw Last Label');
  drawLastLabel.init(model, this.genKey('drawLastLabel()'));
  labels.addChildControl(drawLastLabel);

  this.addContentSeparator();

  // Ticks
  var ticks = new chartEditor.settings.Ticks(model);
  ticks.allowEnabled(true);
  ticks.allowEditFill(true);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);
  //endregion

  this.addContentSeparator();

  //region Minor Labels
  var minorLabels = new chartEditor.settings.Labels(model);
  minorLabels.setName('Minor Labels');
  minorLabels.allowEnabled(true);
  minorLabels.allowEditPosition(false);
  minorLabels.allowEditAnchor(false);
  minorLabels.setKey(this.genKey('minorLabels()'));
  this.addChildControl(minorLabels);

  this.addContentSeparator();

  // Minor Ticks
  var minorTicks = new chartEditor.settings.Ticks(model);
  minorTicks.setName('Minor Ticks');
  minorTicks.allowEnabled(true);
  minorTicks.allowEditFill(true);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);
  //endregion

  this.addContentSeparator();

  var scale = new chartEditor.settings.scales.Base(model, ['linear', 'log']);
  scale.setKey(this.genKey('scale()'));
  scale.setName('Scale');
  scale.skipSettings(['stackMode()', 'stackDirection()']);
  this.addChildControl(scale);
};


/** @inheritDoc */
chartEditor.settings.axes.Circular.prototype.onChartDraw = function(evt) {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  this.getHandler().listenOnce(model, chartEditor.events.EventType.CHART_DRAW, this.onChartDraw);

  if (!this.isExcluded()) {
    var chart = evt.chart;
    this.axisExists = chart.getAxesCount() > this.index_;

    if (this.axisExists) {
      this.getHandler().unlisten(model, chartEditor.events.EventType.CHART_DRAW, this.onChartDraw);
      chartEditor.settings.axes.Circular.base(this, 'onChartDraw', evt);

    } else
      this.setContentEnabled(false);
  }
};
