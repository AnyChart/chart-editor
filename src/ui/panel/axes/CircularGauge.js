goog.provide('chartEditor.ui.panel.axes.CircularGauge');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Labels');
goog.require('chartEditor.ui.panel.Ticks');
goog.require('chartEditor.ui.panel.scales.Base');



/**
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.axes.CircularGauge = function(model, index, opt_domHelper) {
  chartEditor.ui.panel.axes.CircularGauge.base(this, 'constructor', model, index, null, opt_domHelper);

  this.axisExists = false;
  this.name = 'Axis(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], 'axis(' + this.index_ + ')'];

  this.allowEnabled(true);

  this.allowRemove(true);

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.panel.axes.CircularGauge, chartEditor.ui.PanelZippy);


/** @override */
chartEditor.ui.panel.axes.CircularGauge.prototype.createDom = function() {
  chartEditor.ui.panel.axes.CircularGauge.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  // var scale = new chartEditor.ui.control.select.Scales({label: 'Scale'});
  // scale.init(model, this.genKey('scale()'), void 0, true);
  // this.addChildControl(scale);

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

  var radius = new chartEditor.ui.control.comboBox.Percent();
  radius.setOptions([10, 30, 50, 70, 90]);
  var radiusLC = new chartEditor.ui.control.wrapped.Labeled(radius, 'Radius');
  radiusLC.init(model, this.genKey('radius()'));
  this.addChildControl(radiusLC);

  var width = new chartEditor.ui.control.comboBox.Percent();
  width.setOptions([0, 1, 3, 5, 10]);
  var widthLC = new chartEditor.ui.control.wrapped.Labeled(width, 'Width');
  widthLC.init(model, this.genKey('width()'));
  this.addChildControl(widthLC);

  var cornersRounding = new chartEditor.ui.control.comboBox.Percent();
  cornersRounding.setOptions([0, 20, 50, 70, 100]);
  var cornersRoundingLC = new chartEditor.ui.control.wrapped.Labeled(cornersRounding, 'Corners Rounding');
  cornersRoundingLC.init(model, this.genKey('cornersRounding()'));
  this.addChildControl(cornersRoundingLC);

  var fill = new chartEditor.ui.control.colorPicker.Base();
  var fillLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Axis Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  // Overlap mode
  var overlapMode = new chartEditor.ui.control.fieldSelect.Base({label: 'Labels Overlap'});
  overlapMode.getControl().setOptions([
    {value: 'allow-overlap', caption: 'Overlap'},
    {value: 'no-overlap', caption: 'No overlap'}
  ]);
  overlapMode.init(model, this.genKey('overlapMode()'));
  this.addChildControl(overlapMode);

  this.addContentSeparator();

  //region Labels
  var labels = new chartEditor.ui.panel.Labels(model);
  labels.allowEnabled(true);
  labels.allowEditPosition(false);
  labels.allowEditAnchor(false);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  var drawFirstLabel = new chartEditor.ui.control.checkbox.Base();
  drawFirstLabel.setCaption('Draw First Label');
  drawFirstLabel.init(model, this.genKey('drawFirstLabel()'));
  labels.addChildControl(drawFirstLabel);

  var drawLastLabel = new chartEditor.ui.control.checkbox.Base();
  drawLastLabel.setCaption('Draw Last Label');
  drawLastLabel.init(model, this.genKey('drawLastLabel()'));
  labels.addChildControl(drawLastLabel);

  this.addContentSeparator();

  // Ticks
  var ticks = new chartEditor.ui.panel.Ticks(model);
  ticks.allowEnabled(true);
  ticks.allowEditFill(true);
  ticks.setKey(this.genKey('ticks()'));
  this.addChildControl(ticks);
  //endregion

  this.addContentSeparator();

  //region Minor Labels
  var minorLabels = new chartEditor.ui.panel.Labels(model);
  minorLabels.setName('Minor Labels');
  minorLabels.allowEnabled(true);
  minorLabels.allowEditPosition(false);
  minorLabels.allowEditAnchor(false);
  minorLabels.setKey(this.genKey('minorLabels()'));
  this.addChildControl(minorLabels);

  this.addContentSeparator();

  // Minor Ticks
  var minorTicks = new chartEditor.ui.panel.Ticks(model);
  minorTicks.setName('Minor Ticks');
  minorTicks.allowEnabled(true);
  minorTicks.allowEditFill(true);
  minorTicks.setKey(this.genKey('minorTicks()'));
  this.addChildControl(minorTicks);
  //endregion

  // Scale
  this.addContentSeparator();
  var scale = new chartEditor.ui.panel.scales.Base(model, ['linear', 'log']);
  scale.setKey(this.genKey('scale()'));
  this.addChildControl(scale);
  //endregion
};


/** @inheritDoc */
chartEditor.ui.panel.axes.CircularGauge.prototype.onChartDraw = function(evt) {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  this.getHandler().listenOnce(model, chartEditor.events.EventType.CHART_DRAW, this.onChartDraw);

  if (!this.isExcluded()) {
    var chart = evt.chart;
    var elementsStat = chart['getStat']('chartElements');
    this.axisExists = elementsStat['axes'] > this.index_;

    if (this.axisExists) {
      this.getHandler().unlisten(model, chartEditor.events.EventType.CHART_DRAW, this.onChartDraw);
      chartEditor.ui.panel.axes.CircularGauge.base(this, 'onChartDraw', evt);

    } else
      this.setContentEnabled(false);
  }
};
