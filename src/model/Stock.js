goog.provide('chartEditor.model.Stock');

goog.require('chartEditor.model.Base');
goog.require('chartEditor.ui.appearanceTabs.ChartTitle');
goog.require('chartEditor.ui.appearanceTabs.Data');
goog.require('chartEditor.ui.appearanceTabs.GeneralTheming');
goog.require('chartEditor.ui.appearanceTabs.Grids');
goog.require('chartEditor.ui.appearanceTabs.Legend');
goog.require('chartEditor.ui.appearanceTabs.StockScales');
goog.require('chartEditor.ui.appearanceTabs.StockSeries');
goog.require('chartEditor.ui.appearanceTabs.Tooltip');



/**
 * Editor Model for Stock Editor product.
 *
 * @constructor
 * @extends {chartEditor.model.Base}
 */
chartEditor.model.Stock = function() {
  chartEditor.model.Stock.base(this, 'constructor');

  /** @inheritDoc */
  this.appearanceTabs = [
    {
      name: chartEditor.enums.EditorTabs.DATA,
      classFunc: chartEditor.ui.appearanceTabs.Data,
      docsUrl: 'https://docs.anychart.com/Working_with_Data/Overview'
    },
    {
      name: chartEditor.enums.EditorTabs.TITLE,
      classFunc: chartEditor.ui.appearanceTabs.ChartTitle,
      docsUrl: 'http://docs.anychart.com/Common_Settings/Title'
    },
    {
      name: chartEditor.enums.EditorTabs.LEGEND,
      classFunc: chartEditor.ui.appearanceTabs.Legend,
      docsUrl: 'http://docs.anychart.com/Common_Settings/Legend/Basic_Settings'
    },
    {
      name: chartEditor.enums.EditorTabs.SERIES,
      classFunc: chartEditor.ui.appearanceTabs.StockSeries,
      docsUrl: 'https://api.anychart.com/anychart.core.SeriesBase'
    },
    {
      name: chartEditor.enums.EditorTabs.TOOLTIP,
      classFunc: chartEditor.ui.appearanceTabs.Tooltip,
      docsUrl: 'http://docs.anychart.com/Common_Settings/Tooltip'
    },
    {
      name: chartEditor.enums.EditorTabs.GRIDS,
      classFunc: chartEditor.ui.appearanceTabs.Grids,
      docsUrl: 'http://docs.anychart.com/Axes_and_Grids/Axis_Basics#grids'
    },
    {
      name: chartEditor.enums.EditorTabs.STOCK_SCALES,
      classFunc: chartEditor.ui.appearanceTabs.StockScales,
      docsUrl: 'https://docs.anychart.com/Stock_Charts/Scales'
    }
  ];
};
goog.inherits(chartEditor.model.Stock, chartEditor.model.Base);


// region Structures
chartEditor.model.Stock.Series = {};
chartEditor.model.Stock.Series['line'] = {'fields': [{'field': 'value', 'name': 'Y Value'}]};
chartEditor.model.Stock.Series['spline'] = {'fields': [{'field': 'value', 'name': 'Y Value'}]};
chartEditor.model.Stock.Series['column'] = {'fields': [{'field': 'value', 'name': 'Y Value'}]};
chartEditor.model.Stock.Series['area'] = {'fields': [{'field': 'value', 'name': 'Y Value'}]};
chartEditor.model.Stock.Series['splineArea'] = {
  'name': 'Spline Area',
  'fields': [{'field': 'value', 'name': 'Y Value'}]
};
chartEditor.model.Stock.Series['ohlc'] = chartEditor.model.Stock.Series['candlestick'] = {
  'fields': [
    {'field': 'open', 'name': 'Open Value'},
    {'field': 'high', 'name': 'High Value'},
    {'field': 'low', 'name': 'Low Value'},
    {'field': 'close', 'name': 'Close Value'}]
};
// endregion


/** @inheritDoc */
chartEditor.model.Stock.prototype.getSeriesDescription = function() {
  return chartEditor.model.Stock.Series;
};


// region Model initialization
/** @inheritDoc */
chartEditor.model.Stock.prototype.chooseDefaultChartType = function() {
  this.model['chart']['type'] = 'stock';
};


/** @inheritDoc */
chartEditor.model.Stock.prototype.chooseDefaultSeriesType = function() {
  chartEditor.model.Stock.base(this, 'chooseDefaultSeriesType');

  var seriesType = this.model['chart']['seriesType'];
  if (!seriesType) {
    if (this.fieldsState.numbersCount < 4 || this.fieldsState.numbersCount > 5)
      seriesType = 'line';
    else
      seriesType = this.getChartTypeSettings()['series'][0];
  }

  this.model['chart']['seriesType'] = seriesType;
};


/** @inheritDoc */
chartEditor.model.Stock.prototype.createDefaultMappings = function() {
  this.model['dataSettings']['mappings'] = [this.createDefaultPlotMappings()];

  if (this.model['chart']['seriesType'] === 'ohlc' && this.fieldsState.numbersCount === 5) {
    this.model['chart']['seriesType'] = 'column'; // this is for createDefaultPlotMappings() proper working
    this.model['dataSettings']['mappings'].push(this.createDefaultPlotMappings());
    this.model['chart']['seriesType'] = 'ohlc';
  }
};


/** @inheritDoc */
chartEditor.model.Stock.prototype.createDefaultPlotMappings = function() {
  var result = [];
  var seriesType = this.model['chart']['seriesType'];

  var numValues;
  if (seriesType === 'ohlc' || seriesType === 'candlestick')
    numValues = 4;
  else
    numValues = 1;

  var plotIndex = this.model['dataSettings']['mappings'].length;
  var numSeries;
  var fieldIndex;

  if (seriesType === 'column' && plotIndex === 1)
    numSeries = 1;
  else
    numSeries = Math.floor(this.fieldsState.numbersCount / numValues);

  if (seriesType === 'column' && plotIndex === 1)
    fieldIndex = 4; // try to set volume plot

  for (var i = 0; i < numSeries; i += numValues) {
    var seriesConfig = this.createDefaultSeriesMapping(i, /** @type {string} */(seriesType), void 0, fieldIndex);
    result.push(seriesConfig);
  }

  return result;
};


/** @inheritDoc */
chartEditor.model.Stock.prototype.createDefaultSeriesMapping = function(index, type, opt_id, opt_startFieldIndex) {
  var config = {'ctor': type, 'mapping': {}};
  config['id'] = goog.isDef(opt_id) ? opt_id : goog.string.createUniqueString();

  var strings = this.fieldsState.strings.filter(function(string) {return string != 'dimensionGroup';});
  var numbers = this.fieldsState.numbers.filter(function(string) {return string != 'dimensionGroup';});
  var fields = this.getSeriesDescription()[type]['fields'];

  for (var i = 0; i < fields.length; i++) {
    var j = index + i + (goog.isNumber(opt_startFieldIndex) ? opt_startFieldIndex : 0);
    var numberIndex = numbers.length > j ? j : j % numbers.length;
    var stringIndex = strings.length > j ? j : j % strings.length;

    config['mapping'][fields[i]['field']] =
        (fields[i]['type'] === 'string' && strings.length) ?
            strings[stringIndex] :
            numbers[numberIndex];
  }
  return config;
};


/** @inheritDoc */
chartEditor.model.Stock.prototype.needResetMappings = function(prevChartType, prevSeriesType) {
  return true;
};
// endregion


// region Public and controls callback functions
/**
 * Adds new plot default mapping.
 */
chartEditor.model.Stock.prototype.addPlot = function() {
  var mapping = this.createDefaultPlotMappings();
  this.model['dataSettings']['mappings'].push(mapping);
  this.dispatchUpdate('addPlot', true);
};


/**
 * Drops plot mapping by index.
 * @param {number} index
 */
chartEditor.model.Stock.prototype.dropPlot = function(index) {
  if (index > 0 && this.model['dataSettings']['mappings'].length > index) {
    this.dropChartSettings('plot(');
    goog.array.splice(this.model['dataSettings']['mappings'], index, 1);
    this.dispatchUpdate('dropPlot', true);
  }
};
// endregion

/** @inheritDoc */
chartEditor.model.Stock.prototype.isChartSingleSeries = function() {
  return false;
};


/** @inheritDoc */
chartEditor.model.Stock.prototype.getChartTypeSettings = function() {
  return chartEditor.model.ChartTypes[chartEditor.enums.ChartType.STOCK];
};
