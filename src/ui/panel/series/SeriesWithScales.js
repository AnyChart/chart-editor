goog.provide('chartEditor.ui.panel.series.SeriesWithScales');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.control.input.Numbers');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Error');
goog.require('chartEditor.ui.panel.Labels');
goog.require('chartEditor.ui.panel.Markers');
goog.require('chartEditor.ui.panel.Stroke');
goog.require('chartEditor.ui.panel.Title');
goog.require('chartEditor.ui.panel.scales.Base');



/**
 * @param {chartEditor.model.Base} model
 * @param {string|number} seriesId
 * @param {number} seriesIndex
 * @param {number=} opt_plotIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.series.SeriesWithScales = function(model, seriesId, seriesIndex, opt_plotIndex, opt_domHelper) {
  chartEditor.ui.panel.series.SeriesWithScales.base(this, 'constructor', model, seriesIndex, null, opt_domHelper);

  this.seriesId_ = String(seriesId);

  var stringKey = 'getSeries(\'' + this.seriesId_ + '\')';
  if (goog.isDef(opt_plotIndex)) {
    this.plotIndex_ = opt_plotIndex;
    stringKey = 'plot(' + this.plotIndex_ + ').' + stringKey;
  }

  this.seriesType_ = model.getValue([['dataSettings'], ['mappings', this.getPlotIndex()], [this.index_, 'ctor']]);
  this.key = [['chart'], ['settings'], stringKey];

  this.hasFallingRising_ = this.seriesType_ == 'candlestick' || this.seriesType_ == 'waterfall' || this.seriesType_ == 'ohlc';
  this.hasFillStroke_ = this.seriesType_ == 'waterfall' || !this.hasFallingRising_;

  this.allowEnabled(false);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-series-single'));
};
goog.inherits(chartEditor.ui.panel.series.SeriesWithScales, chartEditor.ui.PanelZippy);


/** @override */
chartEditor.ui.panel.series.SeriesWithScales.prototype.createDom = function() {
  chartEditor.ui.panel.series.SeriesWithScales.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  // region ==== Header
  var name = new chartEditor.ui.control.input.Base('Series name');
  name.init(model, this.genKey('name()'));
  this.addHeaderChildControl(name);
  goog.dom.classlist.add(name.getElement(), goog.getCssName('anychart-ce-series-name-input'));
  // endregion

  // region ==== Content
  var dataMarkers = new chartEditor.ui.panel.Markers(model);
  if (this.seriesType_ === 'marker') {
    dataMarkers.setFillKey('color()');
    dataMarkers.setName(null);
    dataMarkers.allowEnabled(false);
    dataMarkers.setKey(this.getKey());
    this.addChildControl(dataMarkers);

    this.addContentSeparator();

  } else if (this.hasFillStroke_) {
    var fill = new chartEditor.ui.control.colorPicker.Base();
    var totalFillLC = new chartEditor.ui.control.wrapped.Labeled(/** @type {chartEditor.ui.control.colorPicker.Base} */(fill),
        this.hasFallingRising_ ? 'Total Fill' : 'Fill');

    totalFillLC.init(model, this.genKey(this.hasFallingRising_ ? 'fill()' : 'color()'));
    this.addChildControl(totalFillLC);
    fill.addClassName(goog.getCssName('anychart-ce-panel-control-right'));

    var stroke = new chartEditor.ui.panel.Stroke(model, this.hasFallingRising_ ? 'Total Stroke' : 'Stroke');
    stroke.setKey(this.genKey('stroke()'));
    this.addChildControl(stroke);

    this.addContentSeparator();
  }

  if (this.hasFallingRising_) {
    if (this.seriesType_ != 'ohlc') {
      var risingFill = new chartEditor.ui.control.colorPicker.Base();
      var risingFillLC = new chartEditor.ui.control.wrapped.Labeled(risingFill, 'Rising Fill');
      risingFillLC.init(model, this.genKey('risingFill()'));
      this.addChildControl(risingFillLC);
    }

    var risingStroke = new chartEditor.ui.panel.Stroke(model, 'Rising Stroke');
    risingStroke.setKey(this.genKey('risingStroke()'));
    this.addChildControl(risingStroke);

    if (this.seriesType_ != 'ohlc') {
      var fallingFill = new chartEditor.ui.control.colorPicker.Base();
      var fallingFillLC = new chartEditor.ui.control.wrapped.Labeled(fallingFill, 'Falling Fill');
      fallingFillLC.init(model, this.genKey('fallingFill()'));
      this.addChildControl(fallingFillLC);
    }

    var fallingStroke = new chartEditor.ui.panel.Stroke(model, 'Falling Stroke');
    fallingStroke.setKey(this.genKey('fallingStroke()'));
    this.addChildControl(fallingStroke);

    this.addContentSeparator();
  }

  var chartType = model.getModel()['chart']['type'];
  if (chartType != 'stock' && chartType != 'map') {
    var xScale = new chartEditor.ui.control.select.Scales({label: 'X Scale', availableOptions: ['ordinal', 'linear', 'date-time']});
    xScale.init(model, this.genKey('xScale()'));
    this.addChildControl(xScale);

    var yScale = new chartEditor.ui.control.select.Scales({label: 'Y Scale', availableOptions: ['linear', 'log', 'date-time']});
    yScale.init(model, this.genKey('yScale()'));
    this.addChildControl(yScale);

    this.addContentSeparator();
  }

  // Tooltip
  var tooltip = new chartEditor.ui.panel.Title(model, 'Tooltip');
  tooltip.allowEnabled(true);
  tooltip.allowEditPosition(false);
  tooltip.allowEditAlign(false);
  tooltip.setTitleKey('format()');
  tooltip.setKey(this.genKey('tooltip()'));
  this.addChildControl(tooltip);

  this.addContentSeparator();

  // Data labels
  var dataLabels = new chartEditor.ui.panel.Labels(model);
  dataLabels.setName('Data Labels');
  dataLabels.allowEnabled(true);
  dataLabels.setKey(this.genKey('labels()'));
  this.addChildControl(dataLabels);

  this.addContentSeparator();

  // Data markers
  if (this.seriesType_ !== 'marker') {
    dataMarkers.setName('Data Markers');
    dataMarkers.allowEnabled(true);
    dataMarkers.setKey(this.genKey('markers()'));
    this.addChildControl(dataMarkers);
  }

  // Color Scale
  if (this.seriesType_ === 'choropleth') {
    this.addContentSeparator();

    var colorScale = new chartEditor.ui.panel.scales.Base(model, ['linear-color', 'ordinal-color']);
    colorScale.setName('Color Scale');
    colorScale.setKey(this.genKey('colorScale()'));
    this.addChildControl(colorScale);
  }

  // column like series specific settings
  // series support xPointPosition() method, some oof them supports pointWidth()
  var xPointPositionSeries = ['box', 'splineArea', 'spline', 'area', 'stick', 'bubble', 'bar', 'ohlc', 'candlestick', 'column', 'line', 'marker'];

  if (xPointPositionSeries.indexOf(this.seriesType_) !== -1) {
    this.addContentSeparator();
    var xPointPosition = new chartEditor.ui.control.input.Numbers();
    var xPointPositionLC = new chartEditor.ui.control.wrapped.Labeled(xPointPosition, 'X Point Position');
    xPointPositionLC.init(model, this.genKey('xPointPosition()'));
    this.addChildControl(xPointPositionLC);

    var pointWidth = new chartEditor.ui.control.comboBox.Percent();
    pointWidth.setOptions([10, 30, 50, 70, 90, 100]);
    var pointWidthLC = new chartEditor.ui.control.wrapped.Labeled(pointWidth, 'Point width');
    pointWidthLC.init(model, this.genKey('pointWidth()'));
    this.addChildControl(pointWidthLC);
  }
  // endregion
};
