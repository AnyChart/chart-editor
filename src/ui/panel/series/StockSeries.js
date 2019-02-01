goog.provide('chartEditor.ui.panel.series.StockSeries');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Labels');
goog.require('chartEditor.ui.panel.Markers');
goog.require('chartEditor.ui.panel.Stroke');
goog.require('chartEditor.ui.panel.Title');



/**
 * @param {chartEditor.model.Base} model
 * @param {string|number} seriesId
 * @param {number} seriesIndex
 * @param {number=} opt_plotIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.series.StockSeries = function(model, seriesId, seriesIndex, opt_plotIndex, opt_domHelper) {
  chartEditor.ui.panel.series.StockSeries.base(this, 'constructor', model, seriesIndex, null, opt_domHelper);

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
goog.inherits(chartEditor.ui.panel.series.StockSeries, chartEditor.ui.PanelZippy);


/** @override */
chartEditor.ui.panel.series.StockSeries.prototype.createDom = function() {
  chartEditor.ui.panel.series.StockSeries.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  // region ==== Header
  var name = new chartEditor.ui.control.input.Base('Series name');
  name.init(model, this.genKey('name()'));
  this.addHeaderChildControl(name);

  var lockSeriesNames = model.getValue([['editorSettings'], ['lockSeriesName'], name.getKey()[2]]);
  name.setEnabled(!lockSeriesNames);

  goog.dom.classlist.add(name.getElement(), goog.getCssName('anychart-ce-series-name-input'));

  var fill;
  if (this.hasFillStroke_) {
    fill = new chartEditor.ui.control.colorPicker.Base();
    fill.init(model, this.genKey('color()'));

    if (!this.hasFallingRising_) {
      this.addHeaderChildControl(fill);
      fill.addClassName(goog.getCssName('anychart-ce-panel-control-right'));
    }
  }
  // endregion

  // region ==== Content
  if (this.hasFillStroke_) {
    if (this.hasFallingRising_) {
      var totalFillLC = new chartEditor.ui.control.wrapped.Labeled(/** @type {chartEditor.ui.control.colorPicker.Base} */(fill), 'Total Fill');
      totalFillLC.init(model, this.genKey('fill()'));
      this.addChildControl(totalFillLC);
    }

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
  var dataMarkers = new chartEditor.ui.panel.Markers(model);
  dataMarkers.setName('Data Markers');
  dataMarkers.allowEnabled(true);
  dataMarkers.setKey(this.genKey('markers()'));
  this.addChildControl(dataMarkers);
};
