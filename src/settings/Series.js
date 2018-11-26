goog.provide('chartEditor.settings.Series');

goog.require("chartEditor.SettingsPanelZippy");
goog.require("chartEditor.colorPicker.Base");
goog.require("chartEditor.controls.LabeledControl");
goog.require("chartEditor.controls.input.Base");
goog.require("chartEditor.controls.select.Scales");
goog.require("chartEditor.settings.Labels");
goog.require("chartEditor.settings.Markers");
goog.require("chartEditor.settings.Stroke");
goog.require("chartEditor.settings.Title");
goog.require("chartEditor.settings.scales.Base");


/**
 * @param {chartEditor.EditorModel} model
 * @param {string|number} seriesId
 * @param {number} seriesIndex
 * @param {number=} opt_plotIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanelZippy}
 */
chartEditor.settings.Series = function(model, seriesId, seriesIndex, opt_plotIndex, opt_domHelper) {
  chartEditor.settings.Series.base(this, 'constructor', model, seriesIndex, null, opt_domHelper);

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

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-series-single'));
};
goog.inherits(chartEditor.settings.Series, chartEditor.SettingsPanelZippy);


/** @override */
chartEditor.settings.Series.prototype.createDom = function() {
  chartEditor.settings.Series.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  // region ==== Header
  var name = new chartEditor.controls.input.Base('Series name');
  name.init(model, this.genKey('name()'));
  this.addHeaderChildControl(name);

  var lockSeriesNames = model.getValue([['editorSettings'], ['lockSeriesName'], name.getKey()[2]]);
  name.setEnabled(!lockSeriesNames);

  goog.dom.classlist.add(name.getElement(), goog.getCssName('anychart-ce-series-name-input'));

  var fill;
  if (this.hasFillStroke_) {
    fill = new chartEditor.colorPicker.Base();
    fill.init(model, this.genKey('color()'));

    if (!this.hasFallingRising_) {
      this.addHeaderChildControl(fill);
      fill.addClassName(goog.getCssName('anychart-ce-settings-control-right'));
    }
  }
  // endregion

  // region ==== Content
  if (this.hasFillStroke_) {
    if (this.hasFallingRising_) {
      var totalFillLC = new chartEditor.controls.LabeledControl(/** @type {chartEditor.colorPicker.Base} */(fill), 'Total Fill');
      totalFillLC.init(model, this.genKey('fill()'));
      this.addChildControl(totalFillLC);
    }

    var stroke = new chartEditor.settings.Stroke(model, this.hasFallingRising_ ? 'Total Stroke' : 'Stroke');
    stroke.setKey(this.genKey('stroke()'));
    this.addChildControl(stroke);

    this.addContentSeparator();
  }

  if (this.hasFallingRising_) {
    if (this.seriesType_ != 'ohlc') {
      var risingFill = new chartEditor.colorPicker.Base();
      var risingFillLC = new chartEditor.controls.LabeledControl(risingFill, 'Rising Fill');
      risingFillLC.init(model, this.genKey('risingFill()'));
      this.addChildControl(risingFillLC);
    }

    var risingStroke = new chartEditor.settings.Stroke(model, 'Rising Stroke');
    risingStroke.setKey(this.genKey('risingStroke()'));
    this.addChildControl(risingStroke);

    if (this.seriesType_ != 'ohlc') {
      var fallingFill = new chartEditor.colorPicker.Base();
      var fallingFillLC = new chartEditor.controls.LabeledControl(fallingFill, 'Falling Fill');
      fallingFillLC.init(model, this.genKey('fallingFill()'));
      this.addChildControl(fallingFillLC);
    }

    var fallingStroke = new chartEditor.settings.Stroke(model, 'Falling Stroke');
    fallingStroke.setKey(this.genKey('fallingStroke()'));
    this.addChildControl(fallingStroke);

    this.addContentSeparator();
  }

  var chartType = model.getModel()['chart']['type'];
  if (chartType != 'stock' && chartType != 'map') {
    var xScale = new chartEditor.controls.select.Scales({label: 'X Scale', availableOptions: ['ordinal', 'linear', 'date-time']});
    xScale.init(model, this.genKey('xScale()'));
    this.addChildControl(xScale);

    var yScale = new chartEditor.controls.select.Scales({label: 'Y Scale', availableOptions: ['linear', 'log', 'date-time']});
    yScale.init(model, this.genKey('yScale()'));
    this.addChildControl(yScale);

    this.addContentSeparator();
  }

  // Tooltip
  var tooltip = new chartEditor.settings.Title(model, 'Tooltip');
  tooltip.allowEnabled(true);
  tooltip.allowEditPosition(false);
  tooltip.allowEditAlign(false);
  tooltip.setTitleKey('format()');
  tooltip.setKey(this.genKey('tooltip()'));
  this.addChildControl(tooltip);

  this.addContentSeparator();

  // Data labels
  var dataLabels = new chartEditor.settings.Labels(model);
  dataLabels.setName('Data Labels');
  dataLabels.allowEnabled(true);
  dataLabels.setKey(this.genKey('labels()'));
  this.addChildControl(dataLabels);

  this.addContentSeparator();

  // Data markers
  var dataMarkers = new chartEditor.settings.Markers(model);
  dataMarkers.setName('Data Markers');
  dataMarkers.allowEnabled(true);
  dataMarkers.setKey(this.genKey('markers()'));
  this.addChildControl(dataMarkers);

  // Color Scale
  if (this.seriesType_ === 'choropleth') {
    this.addContentSeparator();

    var colorScale = new chartEditor.settings.scales.Base(model, ['linear-color', 'ordinal-color']);
    colorScale.setName('Color Scale');
    colorScale.setKey(this.genKey('colorScale()'));
    this.addChildControl(colorScale);
  }
  // endregion
};
