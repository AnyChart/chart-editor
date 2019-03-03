goog.provide('chartEditor.model.Base');

goog.require('chartEditor.enums');
goog.require('chartEditor.ui.dialog.Confirm');
goog.require('goog.events.EventTarget');
goog.require('goog.format.JsonPrettyPrinter');
goog.require('goog.format.JsonPrettyPrinter.SafeHtmlDelimiters');



/**
 * Base class for model of every product.
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
chartEditor.model.Base = function() {
  chartEditor.model.Base.base(this, 'constructor');

  /**
   * Data container
   * @type {Object}
   * @protected
   */
  this.data = {};

  /**
   * Data sets descriptions container
   * @type {Array}
   * @private
   */
  this.preparedData_ = [];

  this.generateInitialMappingsOnChangeView_ = true;

  /**
   * Model structure
   * @type {chartEditor.model.Base.Model}
   * @protected
   */
  this.model = {
    'dataSettings': {
      'active': null,
      'activeGeo': null,
      'field': null,
      'mappings': [
        // [ // plot
        //   {ctl: 'line', mapping: {value: 1}},
        //   {ctl: 'column', mapping: {value: 2}}
        // ]
      ]
    },
    'anychart': {},
    'chart': {
      'type': null,
      'seriesType': null,
      'settings': {
        //'getSeriesAt(0).name()': 'my series'
      }
    },
    'editorSettings': {},
    'standalones': {}
  };

  /**
   * Default model values.
   * @type {Array}
   * @private
   */
  this.defaults_ = [];

  /**
   * Data set analysis result
   * @type {Object}
   * @protected
   */
  this.fieldsState = {};

  this.suspendQueue_ = 0;

  /**
   * Callback with string names.
   * @type {Object}
   * @private
   */
  this.callbacks_ = {
    'setActiveAndField': this.setActiveAndField,
    'setActiveGeo': this.setActiveGeo,
    'setChartType': this.setChartType,
    'setSeriesType': this.setSeriesType,
    'setTheme': this.setTheme,
    'setContextMenuItemEnable': this.setContextMenuItemEnable
  };

  /**
   * @type {Object}
   * @private
   */
  this.contextMenuItems_ = {
    'exclude': {
      'items': ['exclude-points-point', 'exclude-points-list', 'exclude-points-keep-only', 'exclude-points-separator'],
      'enabled': true
    },
    'marquee': {'items': ['select-marquee-start', 'zoom-marquee-start', 'select-marquee-separator'], 'enabled': true},
    'saveAs': {'items': 'save-chart-as', 'enabled': true},
    'saveDataAs': {'items': 'save-data-as', 'enabled': true},
    'shareWith': {'items': 'share-with', 'enabled': true},
    'printChart': {'items': 'print-chart', 'enabled': true},
    'about': {'items': ['about', 'exporting-separator'], 'enabled': true},
    'fullScreen': {'items': ['full-screen-enter', 'full-screen-exit', 'full-screen-separator'], 'enabled': true}
  };

  /**
   * @type {Array.<Object>}
   */
  this.appearanceTabs = [];
};
goog.inherits(chartEditor.model.Base, goog.events.EventTarget);


/**
 * @typedef {Array.<(Array.<*>|string)>}
 */
chartEditor.model.Base.Key;


/**
 * @typedef {{
 *  dataSettings:
 *  {
 *      active: ?string,
 *      activeGeo: ?string,
 *      field: ?string,
 *      mappings: Array
 *  },
 *  anychart: Object,
 *  chart:
 *  {
 *      type: ?string,
 *      seriesType: ?string,
 *      settings: Object
 *  },
 *  standalones: Object.<Array.<Object>>
 * }}
 */
chartEditor.model.Base.Model;


/**
 * @typedef {{
 *  minify: (boolean|undefined),
 *  container: (string|undefined),
 *  wrapper: (string|undefined),
 *  addData: (boolean|undefined),
 *  addGeoData: (boolean|undefined),
 *  addMarkers: (boolean|undefined)
 * }}
 */
chartEditor.model.Base.JavascriptOptions;


// region Structures
/**
 * @enum {number}
 */
chartEditor.model.Product = {
  BASIC: 0,
  CHART: 1,
  STOCK: 2,
  MAP: 3,
  GANTT: 4
};


/**
 * @enum {Object}
 */
chartEditor.model.ProductDescription = {};
chartEditor.model.ProductDescription[chartEditor.model.Product.BASIC] = {name: 'AnyChart Qlik Basic', url: 'https://github.com/AnyChart/anychart-qlik-basic'};
chartEditor.model.ProductDescription[chartEditor.model.Product.CHART] = {name: 'AnyChart Qlik Charts', url: 'https://market.qlik.com/solutions/AnyChart_Qlik_Charts'};
chartEditor.model.ProductDescription[chartEditor.model.Product.STOCK] = {name: 'AnyChart Qlik Stock Charts', url: 'https://market.qlik.com/solutions/AnyChart_Qlik_Stock_Charts'};
chartEditor.model.ProductDescription[chartEditor.model.Product.MAP] = {name: 'AnyChart Qlik Geo Maps', url: 'https://market.qlik.com/solutions/AnyChart_Qlik_Geo_Maps'};
chartEditor.model.ProductDescription[chartEditor.model.Product.GANTT] = {name: 'AnyChart Qlik Gantt Chart', url: 'https://market.qlik.com/solutions/AnyChart_Qlik_Gantt_Chart'};


/**
 * @enum {string}
 */
chartEditor.model.DataType = {
  CUSTOM: 'c',
  PREDEFINED: 'p',
  GEO: 'g'
};


/**
 * @enum {Array.<Object>}
 */
chartEditor.model.Scales = {
  CARTESIAN: [
    {'type': 'ordinal', 'key': 'xScale()', 'name': 'Default X Scale'},
    {'type': 'linear', 'key': 'yScale()', 'name': 'Default Y Scale'}
  ],
  SCATTER: [
    {'type': 'linear', 'key': 'xScale()', 'name': 'Default X Scale'},
    {'type': 'linear', 'key': 'yScale()', 'name': 'Default Y Scale'}
  ],
  HEATMAP: [
    {'type': 'ordinal', 'key': 'xScale()', 'name': 'Default X Scale'},
    {'type': 'ordinal', 'key': 'yScale()', 'name': 'Default Y Scale'}
  ],
  GAUGE_LINEAR: [
    {'type': 'linear', 'key': 'scale()', 'name': 'Default Scale'}
  ],
  TAG_CLOUD_LINEAR: [
    {'type': 'linear', 'key': 'scale()', 'name': 'Default Scale'}
  ]
};


/**
 * @type {Object}
 */
chartEditor.model.ChartTypes = {
  'line': {
    'value': 'line',
    'name': 'Line',
    'icon': 'line-chart-1.svg', // 'http://www.anychart.com/_design/img/upload/charts/types/'
    'series': ['line', 'spline', 'area', 'splineArea', 'column', 'ohlc'], // first value is default
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    // filters: ['common'], Default chart type filter is 'common'
    product: chartEditor.model.Product.CHART
  },

  'area': {
    'value': 'area',
    'name': 'Area',
    'icon': 'area-chart.svg',
    'series': ['area', 'splineArea', 'line', 'spline', 'column', 'ohlc'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    product: chartEditor.model.Product.CHART
  },
  'area-stacked-value': {
    'value': 'area',
    'stackMode': 'value',
    'name': 'Area stacked (value)',
    'icon': 'stacked-area-chart.svg',
    'series': ['area', 'splineArea', 'line', 'spline', 'column', 'ohlc'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    filters: ['stacked-value'],
    product: chartEditor.model.Product.CHART
  },
  'area-stacked-percent': {
    'value': 'area',
    'stackMode': 'percent',
    'name': 'Area stacked (percent)',
    'icon': 'percent-stacked-area-chart.svg',
    'series': ['area', 'splineArea', 'line', 'spline', 'column', 'ohlc'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    filters: ['stacked-percent'],
    product: chartEditor.model.Product.CHART
  },

  'bar': {
    'value': 'bar',
    'name': 'Bar',
    'icon': 'bar-chart.svg',
    'series': ['bar', 'line', 'spline', 'area', 'splineArea', 'ohlc'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    product: chartEditor.model.Product.CHART
  },
  'bar-stacked-value': {
    'value': 'bar',
    'stackMode': 'value',
    'name': 'Bar stacked (value)',
    'icon': 'stacked-bar-chart.svg',
    'series': ['bar', 'line', 'spline', 'area', 'splineArea', 'ohlc'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    filters: ['stacked-value'],
    product: chartEditor.model.Product.CHART
  },
  'bar-stacked-percent': {
    'value': 'bar',
    'stackMode': 'percent',
    'name': 'Bar stacked (percent)',
    'icon': 'percent-stacked-bar-chart.svg',
    'series': ['bar', 'line', 'spline', 'area', 'splineArea', 'ohlc'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    filters: ['stacked-percent'],
    product: chartEditor.model.Product.CHART
  },

  'column': {
    'value': 'column',
    'name': 'Column',
    'icon': 'column-chart.svg',
    'series': ['column', 'line', 'spline', 'area', 'splineArea', 'ohlc', 'candlestick'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    product: chartEditor.model.Product.CHART
  },
  'column-stacked-value': {
    'value': 'column',
    'stackMode': 'value',
    'name': 'Column stacked (value)',
    'icon': 'stacked-column-chart.svg',
    'series': ['column', 'line', 'spline', 'area', 'splineArea', 'ohlc'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    filters: ['stacked-value'],
    product: chartEditor.model.Product.CHART
  },
  'column-stacked-percent': {
    'value': 'column',
    'stackMode': 'percent',
    'name': 'Column stacked (percent)',
    'icon': 'percent-stacked-column-chart.svg',
    'series': ['column', 'line', 'spline', 'area', 'splineArea', 'ohlc'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    filters: ['stacked-percent'],
    product: chartEditor.model.Product.CHART
  },

  'scatter': {
    'value': 'scatter',
    'name': 'Scatter',
    'icon': 'scatter-chart.svg',
    'series': ['marker', 'bubble', 'line'],
    'scales': chartEditor.model.Scales.SCATTER,
    'dataSetCtor': 'set',
    product: chartEditor.model.Product.CHART
  },
  'waterfall': {
    'value': 'waterfall',
    'name': 'Waterfall',
    'icon': 'waterfall-chart.svg',
    'series': ['waterfall'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    product: chartEditor.model.Product.CHART
  },
  'box': {
    'value': 'box',
    'name': 'Box',
    'icon': 'box-chart.svg',
    'series': ['box', 'line', 'spline', 'column', 'area', 'marker', 'bubble', 'ohlc'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    product: chartEditor.model.Product.CHART
  },

  'radar': {
    'value': 'radar',
    'name': 'Radar',
    'icon': 'radar-chart-1.svg',
    'series': ['line', 'area', 'marker'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    product: chartEditor.model.Product.CHART
  },
  'radar-stacked-value': {
    'value': 'radar',
    'stackMode': 'value',
    'name': 'Radar stacked (value)',
    'icon': 'radar-chart-1.svg',
    'series': ['area'/*, 'line', 'marker'*/],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    filters: ['stacked-value'],
    product: chartEditor.model.Product.CHART
  },
  'radar-stacked-percent': {
    'value': 'radar',
    'stackMode': 'percent',
    'name': 'Radar stacked (percent)',
    'icon': 'radar-chart-1.svg',
    'series': ['area'/*, 'line', 'marker'*/],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    filters: ['stacked-percent'],
    product: chartEditor.model.Product.CHART
  },

  'polar': {
    'value': 'polar',
    'name': 'Polar',
    'icon': 'polar-column-chart.svg',
    'series': ['line', 'area', 'column', 'marker', 'polygon', 'polyline', 'rangeColumn'],
    'scales': chartEditor.model.Scales.SCATTER,
    'dataSetCtor': 'set',
    product: chartEditor.model.Product.CHART
  },

  'pie': {
    'value': 'pie',
    'name': 'Pie',
    'icon': 'pie-chart.svg',
    'series': ['pie'],
    'dataSetCtor': 'set',
    'singleSeries': true,
    product: chartEditor.model.Product.CHART
  },
  'funnel': {
    'value': 'funnel',
    'name': 'Funnel',
    'icon': 'funnel-chart.svg',
    'series': ['funnel'],
    'dataSetCtor': 'set',
    'singleSeries': true,
    product: chartEditor.model.Product.CHART
  },

  'mekko': {
    'value': 'mekko',
    'name': 'Mekko',
    'icon': 'bar-mekko-chart.svg',
    'series': ['mekko'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    product: chartEditor.model.Product.CHART
  },
  'barmekko': {
    'value': 'barmekko',
    'name': 'Bar Mekko',
    'icon': 'bar-mekko-chart.svg',
    'series': ['mekko'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    product: chartEditor.model.Product.CHART
  },
  'mosaic': {
    'value': 'mosaic',
    'name': 'Mosaic',
    'icon': 'mosaic-chart.svg',
    'series': ['mekko'],
    'scales': chartEditor.model.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    product: chartEditor.model.Product.CHART
  },

  'heatMap': {
    'value': 'heatMap',
    'name': 'Heat Map',
    'icon': 'heatmap-chart.svg',
    'series': ['heatMap'],
    'scales': chartEditor.model.Scales.HEATMAP,
    'dataSetCtor': 'set',
    'singleSeries': true,
    excludedPanels: [
      chartEditor.enums.EditorTabs.SERIES,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.COLOR_RANGE
    ],
    'settingsExcludes': ['palette()', 'animation().enabled()'],
    product: chartEditor.model.Product.CHART
  },
  'treeMap': {
    'value': 'treeMap',
    'name': 'Tree Map',
    'icon': 'treemap-chart.svg',
    'series': ['treeMap'],
    'dataSetCtor': 'tree',
    'singleSeries': true,
    excludedPanels: [
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES
    ],
    'settingsExcludes': ['palette()', 'animation().enabled()'],
    product: chartEditor.model.Product.CHART
  },

  'sankey': {
    'value': 'sankey',
    'name': 'Sankey Diagram',
    'icon': 'sankey-diagram.svg',
    'series': ['sankey'],
    'dataSetCtor': 'set',
    'singleSeries': true,
    excludedPanels: [
      chartEditor.enums.EditorTabs.LEGEND,
      chartEditor.enums.EditorTabs.DATA_LABELS
    ],
    product: chartEditor.model.Product.CHART
  },
  'tag-cloud': {
    'value': 'tagCloud',
    'name': 'Tag Cloud',
    'icon': 'tag-cloud.svg',
    'series': ['tagCloud'],
    'scales': chartEditor.model.Scales.TAG_CLOUD_LINEAR,
    'singleSeries': true,
    'dataSetCtor': 'set',
    excludedPanels: [
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.DATA_LABELS
    ],
    product: chartEditor.model.Product.CHART
  },

  'gauges.circular': {
    'value': 'gauges.circular',
    'name': 'Circular Gauge',
    'icon': 'circular-gauge.svg',
    'series': ['gauges.bar', 'gauges.marker', 'needle', 'knob'],
    'dataSetCtor': 'set',
    excludedPanels: [
      chartEditor.enums.EditorTabs.LEGEND,
      chartEditor.enums.EditorTabs.DATA_LABELS,
      chartEditor.enums.EditorTabs.SCALE_BARS
    ],
    'settingsExcludes': ['palette()'],
    filters: ['common', 'gauges'],
    product: chartEditor.model.Product.CHART
  },

  'gauges.linear': {
    'value': 'gauges.linear',
    'name': 'Linear Gauge',
    'icon': 'vertical-gauge-1.svg',
    'series': ['linearGauge.bar', 'linearGauge.led', 'linearGauge.tank', 'linearGauge.thermometer', 'linearGauge.marker', 'linearGauge.rangeBar'],
    'scales': chartEditor.model.Scales.GAUGE_LINEAR,
    'dataSetCtor': 'set',
    'settingsExcludes': ['palette()'],
    filters: ['common', 'gauges'],
    product: chartEditor.model.Product.CHART
  },
  'gauges.linear.led': {
    'value': 'gauges.led',
    'name': 'Led Gauge',
    'icon': 'vertical-gauge-1.svg',
    'series': ['linearGauge.led', 'linearGauge.bar', 'linearGauge.tank', 'linearGauge.thermometer', 'linearGauge.marker', 'linearGauge.rangeBar'],
    'scales': chartEditor.model.Scales.GAUGE_LINEAR,
    'dataSetCtor': 'set',
    'settingsExcludes': ['palette()'],
    filters: ['common', 'gauges'],
    product: chartEditor.model.Product.CHART
  },
  'gauges.linear.tank': {
    'value': 'gauges.tank',
    'name': 'Tank Gauge',
    'icon': 'tank-gauge-1.svg',
    'series': ['linearGauge.tank', 'linearGauge.bar', 'linearGauge.led', 'linearGauge.thermometer', 'linearGauge.marker', 'linearGauge.rangeBar'],
    'scales': chartEditor.model.Scales.GAUGE_LINEAR,
    'dataSetCtor': 'set',
    'settingsExcludes': ['palette()'],
    filters: ['common', 'gauges'],
    product: chartEditor.model.Product.CHART
  },
  'gauges.linear.thermometer': {
    'value': 'gauges.thermometer',
    'name': 'Thermometer',
    'icon': 'thermometer-gauge.svg',
    'series': ['linearGauge.thermometer', 'linearGauge.bar', 'linearGauge.led', 'linearGauge.tank', 'linearGauge.marker', 'linearGauge.rangeBar'],
    'scales': chartEditor.model.Scales.GAUGE_LINEAR,
    'dataSetCtor': 'set',
    'settingsExcludes': ['palette()'],
    filters: ['common', 'gauges'],
    product: chartEditor.model.Product.CHART
  },

  'stock': {
    'value': 'stock',
    'name': 'Stock',
    'icon': 'stock-chart.svg',
    'series': ['ohlc', 'candlestick', 'line', 'spline', 'column', 'area', 'splineArea'],
    'dataSetCtor': 'table',
    'settingsExcludes': ['palette()', 'legend().enabled()', 'animation().enabled()'],
    product: chartEditor.model.Product.STOCK
  },

  'map': {
    'value': 'map',
    'name': 'Map',
    'icon': 'choropleth-map.svg',
    'series': ['marker-by-id', 'marker-by-coordinates', 'bubble-by-id', 'bubble-by-coordinates', 'choropleth'],
    'dataSetCtor': 'set',
    'settingsExcludes': ['animation().enabled()'],
    product: chartEditor.model.Product.MAP
  },

  'ganttProject': {
    'value': 'ganttProject',
    'name': 'Gantt Project',
    'icon': 'gantt-chart.svg',
    'series': ['ganttProject'],
    'dataSetCtor': 'tree',
    'singleSeries': true,
    'settingsExcludes': ['palette()'],
    filters: ['gantt'],
    product: chartEditor.model.Product.GANTT
  },
  'ganttResource': {
    'value': 'ganttResource',
    'name': 'Gantt Resource',
    'icon': 'gantt-chart.svg',
    'series': ['ganttResource'],
    'dataSetCtor': 'tree',
    'singleSeries': true,
    'settingsExcludes': ['palette()'],
    filters: ['gantt'],
    product: chartEditor.model.Product.GANTT
  }
};


/**
 * @type {Object}}
 */
chartEditor.model.Series = {};


/**
 * @typedef {(chartEditor.ui.control.comboBox.Base|
 * chartEditor.ui.control.select.Base|
 * chartEditor.ui.control.input.Base|
 * chartEditor.ui.control.colorPicker.Base|
 * chartEditor.ui.control.fieldSelect.Base)}
 */
chartEditor.model.Base.Control;


/**
 * @typedef {{
 *  chartTypes: Array.<string>,
 *  panels: Array.<chartEditor.enums.EditorTabs>
 * }}
 */
chartEditor.model.SpecificPanels;


/**
 * @type {Array.<chartEditor.model.SpecificPanels>}
 */
chartEditor.model.ExcludedPanelsForCharts = [];

/**
 * @type {Array.<chartEditor.model.SpecificPanels>}
*/
chartEditor.model.SpecificPanelsForCharts = [];
// endregion


// region Model initialization
/**
 * Processes analysis of active data set.  Need ['dataSettings']['active'] to be set.
 * @protected
 */
chartEditor.model.Base.prototype.analyzeDataBeforeChooseField = function() {
  this.fieldsState = {
    numbersCount: 0,
    coordinates: [],
    numbers: [],
    strings: []
  };

  var rawData = this.getRawData();
  var dataRow = rawData[0];
  var fieldValue;
  var numberValue;
  var key;

  for (key in dataRow) {
    fieldValue = dataRow[key];
    numberValue = goog.string.toNumber(fieldValue);

    if (!this.fieldsState.date && goog.isString(fieldValue) && isNaN(numberValue) && new Date(fieldValue).getTime()) {
      // Full valid date by string ("2010-05-17")
      this.fieldsState.date = key;
    }

    if (!this.fieldsState.date_short && !isNaN(numberValue) && /^[0-2]\d{3}$/.test(fieldValue)) {
      // Short date ("2010")
      this.fieldsState.date_short = key;
    }

    if (!isNaN(numberValue)) {
      if (this.fieldsState.coordinates.length < 2 && new RegExp(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/).exec(fieldValue)) {
        this.fieldsState.coordinates.push(key);
      }

    } else if (goog.isString(fieldValue)) {
      this.fieldsState.firstString = goog.isDef(this.fieldsState.firstString) ? this.fieldsState.firstString : key;

      if (!this.fieldsState.geoId && this.isGeoId_(fieldValue))
        this.fieldsState.geoId = key;
    }
  }

  if (this.fieldsState.coordinates.length < 2)
    this.fieldsState.coordinates = [];
};


/**
 * Processes analysis of active data set. Need ['dataSettings']['field'] to be set.
 * @protected
 */
chartEditor.model.Base.prototype.analyzeDataAfterChooseField = function() {
  var rawData = this.getRawData();
  var dataRow = rawData[0];
  var numberValue;
  var key;

  // Counting numbers
  for (key in dataRow) {
    if (this.model['dataSettings']['field'] === key)
      continue;

    numberValue = goog.string.toNumber(dataRow[key]);
    if (!isNaN(numberValue)) {
      this.fieldsState.numbers.push(key);
      this.fieldsState.numbersCount++;

    } else if (goog.isString(dataRow[key])) {
      this.fieldsState.strings.push(key);
    }
  }
};


/**
 * Processes analysis of active data set and sets field.
 *
 * @param {string=} opt_active Active data set id
 * @param {string=} opt_field Field id
 */
chartEditor.model.Base.prototype.chooseActiveAndField = function(opt_active, opt_field) {
  var preparedData = this.getPreparedData();
  this.model['dataSettings']['active'] = goog.isDefAndNotNull(opt_active) ? opt_active : preparedData[0].setFullId;

  if (this.data[this.model['dataSettings']['active']].chartType &&
      (!this.model['chart']['type'] || this.data[this.model['dataSettings']['active']].chartType === this.model['chart']['type'])) {
    var defaults = this.data[this.model['dataSettings']['active']].defaults;
    this.setDefaults(defaults);
  } else
    this.setDefaults([]);

  this.dropChartSettings();

  this.analyzeDataBeforeChooseField();

  // Set up field
  if (goog.isDefAndNotNull(opt_field)) {
    this.model['dataSettings']['field'] = opt_field;

  } else {
    this.model['dataSettings']['field'] = goog.isDef(this.fieldsState.date) ?
        this.fieldsState.date :
        goog.isDef(this.fieldsState.date_short) ?
            this.fieldsState.date_short :
            goog.isDef(this.fieldsState.firstString) ?
                this.fieldsState.firstString :
                preparedData[0].fields[0].key;
  }

  this.analyzeDataAfterChooseField();
};


/**
 * Chooses chart type.
 * @protected
 */
chartEditor.model.Base.prototype.chooseDefaultChartType = function() {
  this.model['chart']['type'] = null;

  var availableChartTypes = chartEditor.model.ChartTypes;
  var desiredChartType = this.data[this.getActive()].chartType;
  if (desiredChartType) {
    var result = goog.object.filter(availableChartTypes, function(item, key){
      return item['value'] === desiredChartType || key === desiredChartType;
    });
    if (goog.object.getCount(result))
      this.model['chart']['type'] = desiredChartType;
  }
};


/**
 * Chooses default series type.
 */
chartEditor.model.Base.prototype.chooseDefaultSeriesType = function() {
  this.model['chart']['seriesType'] = null;
  var availableSeriesTypes = this.getChartTypeSettings()['series'];
  var desiredSeriesType = this.data[this.getActive()].seriesType;
  if (desiredSeriesType && goog.array.indexOf(availableSeriesTypes, desiredSeriesType) !== -1) {
    this.model['chart']['seriesType'] = desiredSeriesType;
  }
};


/**
 * Creates default mappings for plots and series.
 */
chartEditor.model.Base.prototype.createDefaultMappings = function() {
  this.model['dataSettings']['mappings'] = [this.createDefaultPlotMappings()];
};


/**
 * Creates default mappings for plot.
 *
 * @return {Object}
 */
chartEditor.model.Base.prototype.createDefaultPlotMappings = function() {
  return [this.createDefaultSeriesMapping(0, /** @type {string} */(this.model['chart']['seriesType']))];
};


/**
 * Creates config object for one series.
 * Generates auto mapping for this series.
 *
 * @param {number} index Series index (serial number)
 * @param {string} type Series type
 * @param {string=} opt_id Series id.
 * @param {number=} opt_startFieldIndex Index of number field to start from.
 * @return {Object}
 */
chartEditor.model.Base.prototype.createDefaultSeriesMapping = function(index, type, opt_id, opt_startFieldIndex) {return {};};


/**
 * Create default scales
 */
chartEditor.model.Base.prototype.createDefaultStandalones = function() {
  this.model['standalones'] = {};

  // Set default scales
  var chartSettings = this.getChartTypeSettings();
  if (chartSettings['scales']) {
    this.suspendDispatch();
    for (var i = 0; i < chartSettings['scales'].length; i++) {
      this.addStandalone('scale', chartSettings['scales'][i]);
    }
    this.resumeDispatch(true);
  }
};
// endregion


// region Public and controls callback functions
/**
 *
 * @param {Object} chart
 * @param {boolean} rebuild
 */
chartEditor.model.Base.prototype.onChartDraw = function(chart, rebuild) {
  if (chart) { // todo: sometimes it's null
    this.dispatchEvent({
      type: chartEditor.events.EventType.CHART_DRAW,
      chart: chart,
      rebuild: rebuild
    });
  }
};


/**
 * Calls callback function by unminified method name.
 * @param {string} methodName
 * @param {...*} var_args
 */
chartEditor.model.Base.prototype.callbackByString = function(methodName, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  this.callbacks_[methodName].apply(this, args);
};


/**
 * Drops all or some chart panel.
 * @param {(Object|string)=} opt_pattern Regular extperrion or string
 * @param {boolean=} opt_byValue Search by setting value. Is ignored if opt_pattern is undefined.
 */
chartEditor.model.Base.prototype.dropChartSettings = function(opt_pattern, opt_byValue) {
  if (goog.isDef(opt_pattern)) {
    for (var key in this.model['chart']['settings']) {
      var found = false;
      var testString = opt_byValue ? this.model['chart']['settings'][key] : key;

      if (!opt_byValue || goog.isString(testString)) {
        if (typeof opt_pattern === 'object') {
          var r = new RegExp(/** @type {RegExp} */(opt_pattern));
          found = r.test(testString);
        } else
          found = testString.indexOf(opt_pattern) >= 0;
      }

      if (found)
        delete this.model['chart']['settings'][key];
    }
  } else {
    this.model['chart']['settings'] = {};
    this.model['standalones'] = {};
    this.model['editorSettings']['lockSeriesName'] = {};
    this.stackMode = false;
    this.resetContextMenuItems();

    this.applyDefaults();
  }
};


/**
 * Initializes default values for types selects.
 */
chartEditor.model.Base.prototype.onChangeView = function() {
  if (this.generateInitialMappingsOnChangeView_) {
    this.generateInitialMappingsOnChangeView_ = false;
    this.getPreparedData();

    if (this.preparedData_.length > 0) {
      if (this.afterSetModel_) {
        // Use predefined model
        if (this.model['chart']['type'] === 'map')
          this.initGeoData();

        this.applyDefaults();

        this.analyzeDataBeforeChooseField();
        this.analyzeDataAfterChooseField();

        this.afterSetModel_ = false;

      } else {
        this.model['chart']['type'] = null;
        this.chooseActiveAndField();
        this.chooseDefaultChartType();
        this.chooseDefaultSeriesType();
        this.createDefaultMappings();
        this.createDefaultStandalones();
      }
    } else {
      console.warn("NO DATA");
    }
  }
};


/**
 * Adds new plot default mapping.
 */
chartEditor.model.Base.prototype.addPlot = function() {};


/**
 * Drops plot mapping by index.
 * @param {number} index
 */
chartEditor.model.Base.prototype.dropPlot = function(index) {};


/**
 * Adds new series default mapping.
 * @param {number} plotIndex
 */
chartEditor.model.Base.prototype.addSeries = function(plotIndex) {
  var mapping = this.createDefaultSeriesMapping(
      this.model['dataSettings']['mappings'][plotIndex].length,
      /** @type {string} */(this.model['chart']['seriesType']));

  this.model['dataSettings']['mappings'][plotIndex].push(mapping);
  this.dispatchUpdate();
};


/**
 * Drops series mapping by plot and series index.
 * @param {number} plotIndex
 * @param {number} seriesIndex
 */
chartEditor.model.Base.prototype.dropSeries = function(plotIndex, seriesIndex) {
  if (this.model['dataSettings']['mappings'].length > plotIndex &&
      this.model['dataSettings']['mappings'][plotIndex].length > seriesIndex) {

    var removedSeries = goog.array.splice(this.model['dataSettings']['mappings'][plotIndex], seriesIndex, 1);
    var stringKey = this.chartTypeLike('gauges') ? 'getPointer' : 'getSeries';
    this.dropChartSettings(stringKey + '(\'' + removedSeries[0]['id'] + '\')');
    this.dispatchUpdate();
  }
};


/**
 * Callback function for change of active and field select.
 * @param {chartEditor.ui.control.select.Base} input
 */
chartEditor.model.Base.prototype.setActiveAndField = function(input) {
  var selectValue = /** @type {Object} */(input.getValue());
  var field = selectValue.value;
  var active = selectValue.active;

  this.suspendDispatch();

  if (active !== this.model['dataSettings']['active']) {
    this.model['chart']['type'] = null;

    this.chooseActiveAndField(active, field);
    this.chooseDefaultChartType();
    this.chooseDefaultSeriesType();
    this.createDefaultMappings();
    this.createDefaultStandalones();

    this.dispatchUpdate();

  } else if (field !== this.model['dataSettings']['field']) {
    this.model['dataSettings']['field'] = field;

    this.dispatchUpdate();
  }

  this.resumeDispatch();
};


/**
 * Callback function for geo data select control.
 *
 * Implemented in model.Map
 *
 * @param {chartEditor.ui.control.select.Base} selectControl
 */
chartEditor.model.Base.prototype.setActiveGeo = function(selectControl) {};


/**
 * Callback function for change event of chart type select.
 * @param {chartEditor.ui.control.select.Base} input
 */
chartEditor.model.Base.prototype.setChartType = function(input) {
  var selectValue = /** @type {Object} */(input.getValue());
  var chartType = selectValue.value;
  var prevChartType = /** @type {string} */(this.model['chart']['type']);
  this.model['chart']['type'] = chartType;
  this.stackMode = selectValue.stackMode;
  var prevDefaultSeriesType = /** @type {string} */(this.model['chart']['seriesType']);

  if (this.data[this.model['dataSettings']['active']].chartType &&
      this.data[this.model['dataSettings']['active']].chartType !== chartType) {
    this.setDefaults([]);
  }

  if (prevChartType === 'map') {
    delete this.data[this.model['dataSettings']['activeGeo']];
    this.preparedData_.length = 0;

  } else if (chartType === 'map') {
    this.initGeoData();
  }

  if (prevDefaultSeriesType === 'mekko') {
    this.dropChartSettings('pointsPadding()');
  }

  // Drop scales panel anyway
  this.dropChartSettings(/^\w+cale\(\)/);
  this.model['standalones'] = {};

  if (this.needResetMappings(prevChartType, prevDefaultSeriesType)) {
    this.chooseActiveAndField(/** @type {string} */(this.model['dataSettings']['active']));

    // set it again because it was reset in chooseActiveAndField()
    this.stackMode = selectValue.stackMode;
    this.chooseDefaultSeriesType();

    this.createDefaultMappings();
    this.createDefaultStandalones();

  } else {
    // Update default series
    this.chooseDefaultSeriesType();
    this.createDefaultStandalones();

    for (var i = 0; i < this.model['dataSettings']['mappings'].length; i++) {
      for (var j = 0; j < this.model['dataSettings']['mappings'][i].length; j++) {
        var seriesConfig = this.model['dataSettings']['mappings'][i][j];
        if (prevDefaultSeriesType === seriesConfig['ctor']) {
          if (this.checkSeriesFieldsCompatible(prevDefaultSeriesType, /** @type {string} */(this.model['chart']['seriesType']))) {
            this.model['dataSettings']['mappings'][i][j]['ctor'] = this.model['chart']['seriesType'];
          }
        }
      }
    }
  }

  this.setStackMode(selectValue.stackMode);

  this.dispatchUpdate();
};


/**
 * Updates stack mode setting in model.
 * @param {string=} opt_stackMode
 */
chartEditor.model.Base.prototype.setStackMode = function(opt_stackMode) {
  this.dropChartSettings("stackMode(");
  this.stackMode = false;
  if (opt_stackMode) {
    if (this.model['chart']['type'] !== 'stock') {
      this.setValue([['chart'], ['settings'], 'yScale().stackMode()'], opt_stackMode, true);
      this.stackMode = opt_stackMode;
    }
  }
};


/**
 * Callback function for change of series type select.
 * @param {chartEditor.ui.control.select.Base} input
 */
chartEditor.model.Base.prototype.setSeriesType = function(input) {
  var key = input.getKey();
  var inputValue = /** @type {Object} */(input.getValue());
  var type = inputValue.value;
  var plotIndex = key[1][1]; // see SeriesPanel.getKey()
  var seriesIndex = key[2][0];

  if (this.model['dataSettings']['mappings'][plotIndex][seriesIndex]['ctor'] !== type) {
    var oldConfig = this.model['dataSettings']['mappings'][plotIndex][seriesIndex];
    this.model['dataSettings']['mappings'][plotIndex][seriesIndex] = this.createDefaultSeriesMapping(seriesIndex, type, oldConfig['id']);
    this.dispatchUpdate();
  }
};


/**
 * Callback function for change of theme select.
 * @param {chartEditor.ui.control.select.Base} input
 */
chartEditor.model.Base.prototype.setTheme = function(input) {
  this.suspendDispatch();
  delete this.model['chart']['settings']['palette()'];
  var inputValue = input.getValue();
  this.setValue([['anychart'], 'theme()'], inputValue.value);
  this.resumeDispatch();
};


/**
 * Reset this.contextMenuItems_ structure.
 */
chartEditor.model.Base.prototype.resetContextMenuItems = function() {
  goog.object.map(this.contextMenuItems_, function(item) {
    item.enabled = true;
  });
};


/** @return {Object} */
chartEditor.model.Base.prototype.contextMenuItems = function() {
  return this.contextMenuItems_;
};


/**
 * Callback function for contextMenu().itemsFormatter() setting
 * @param {chartEditor.ui.control.checkbox.Base} input
 */
chartEditor.model.Base.prototype.setContextMenuItemEnable = function(input) {
  var stringId = input.getModel();
  this.contextMenuItems_[stringId]['enabled'] = input.getChecked();

  var key;
  var disabledItems = [];
  var exportingItems = ['saveAs', 'saveDataAs', 'shareWith', 'printChart'];
  var count = 0;
  for (key in this.contextMenuItems_) {
    if (!this.contextMenuItems_[key]['enabled']) {
      disabledItems = goog.array.concat(disabledItems, this.contextMenuItems_[key]['items']);
      if (goog.array.indexOf(exportingItems, key) !== -1)
        count++;
    }
  }

  if (count === exportingItems.length)
    disabledItems = goog.array.concat(disabledItems, 'exporting-separator');
  var disabledItemsStr = disabledItems.toString();

  if (disabledItems.length) {
    this.model['chart']['settings']['contextMenu().itemsFormatter()'] = 'function(items){\n' +
        '\tvar res = {};\n' +
        '\tvar disabledItems = "' + disabledItemsStr + '".split(",");\n' +
        '\tfor (var key in items) {\n' +
        '\t\tif (disabledItems.indexOf(key) == -1) {\n' +
        '\t\t\tres[key] = items[key];\n' +
        '\t\t}\n' +
        '\t}\n' +
        '\treturn res;\n' +
        '}';
  } else
    this.removeByKey([['chart'], ['settings'], 'contextMenu().itemsFormatter()']);

  this.dispatchUpdate();
};


/**
 * @param {string=} opt_xOrY
 * @return {number} Created axis index.
 */
chartEditor.model.Base.prototype.addAxis = function(opt_xOrY) {
  var index = -1;
  var pattern;
  var stringKey;
  if (goog.isDef(opt_xOrY))
    pattern = '^' + opt_xOrY + 'Axis\\((\\d+)\\)\\.enabled\\(\\)$';
  else
    pattern = '^' + 'axis\\((\\d+)\\)\\.enabled\\(\\)$';

  var regExp = new RegExp(pattern);
  for (var key in this.model['chart']['settings']) {
    var match = key.match(regExp);
    if (match)
      index = Math.max(match[1], index);
  }
  index += 1;

  if (goog.isDef(opt_xOrY))
    stringKey = opt_xOrY + 'Axis(' + index + ').enabled()';
  else
    stringKey = 'axis(' + index + ').enabled()';

  this.setValue([['chart'], ['settings'], stringKey], true);

  return index;
};


/**
 * @param {number} index
 * @param {string=} opt_xOrY
 */
chartEditor.model.Base.prototype.dropAxis = function(index, opt_xOrY) {
  var pattern = goog.isDef(opt_xOrY) ?
      '^' + opt_xOrY + 'Axis\\(' + index + '\\)' :
      '^' + 'axis\\(' + index + '\\)';

  var regExp = new RegExp(pattern);
  this.dropChartSettings(regExp);
  this.dispatchUpdate(false, true);
};


/**
 * @param {string} stringKeyBase 'range', 'scaleBar' etc
 * @param {boolean=} opt_asObjectKey
 * @return {number} Created range index.
 */
chartEditor.model.Base.prototype.addIndexedSetting = function(stringKeyBase, opt_asObjectKey) {
  var index = -1;
  var pattern;
  if (opt_asObjectKey)
    pattern = '^' + stringKeyBase + '\\((\\d+)\\)$';
  else
    pattern = '^' + stringKeyBase + '\\((\\d+)\\)\\.enabled\\(\\)$';

  var regExp = new RegExp(pattern);

  for (var key in this.model['chart']['settings']) {
    var match = key.match(regExp);
    if (match)
      index = Math.max(match[1], index);
  }
  index += 1;

  var stringKey;
  var value;
  if (opt_asObjectKey) {
    stringKey = stringKeyBase + '(' + index + ')';
    value = {'enabled': true};
  } else {
    stringKey = stringKeyBase + '(' + index + ').enabled()';
    value = true;
  }

  this.setValue([['chart'], ['settings'], stringKey], value);

  return index;
};


/**
 * @param {number} index
 * @param {string} stringKeyBase 'range', 'scaleBar' etc
 */
chartEditor.model.Base.prototype.dropIndexedSetting = function(index, stringKeyBase) {
  var pattern = '^' + stringKeyBase + '\\(' + index + '\\)';
  var regExp = new RegExp(pattern);
  this.dropChartSettings(regExp);
  this.dispatchUpdate(false, true);
};


/**
 * @param {string} stringKeyBase 'scale', etc
 * @param {Object=} opt_fieldValues Initial field values of created standalone
 * @return {number} Created range index.
 */
chartEditor.model.Base.prototype.addStandalone = function(stringKeyBase, opt_fieldValues) {
  var standalones = this.getValue([['standalones'], stringKeyBase]) || [];
  var index = standalones.length;

  opt_fieldValues = opt_fieldValues || {};
  opt_fieldValues['name'] = opt_fieldValues['name'] || 'Scale ' + (index + 1);

  this.setValue([['standalones'], [stringKeyBase, index]], void 0);
  this.model['standalones'][stringKeyBase][index] = opt_fieldValues;
  // Should dispatch because two previous lines do not do this
  this.dispatchUpdate();

  return index;
};


/**
 * Drops last standalone
 * @param {string} stringKeyBase 'range', 'scaleBar' etc
 */
chartEditor.model.Base.prototype.dropStandalone = function(stringKeyBase) {
  var standalones = this.getValue([['standalones'], stringKeyBase]);
  var index = standalones.length - 1;

  var pattern = 'STANDALONE:' + stringKeyBase + ':' + index;
  this.dropChartSettings(pattern, true);
  this.removeByKey([['standalones'], [stringKeyBase, index]]);
};


/**
 * @param {chartEditor.model.Base.Model} value
 */
chartEditor.model.Base.prototype.setModel = function(value) {
  this.model = value;
  this.afterSetModel_ = true;
  this.dispatchUpdate();
};


/**
 * Sets anychart locale panel
 * @param {Object} values
 */
chartEditor.model.Base.prototype.localization = function(values) {
  var locales = [];

  for (var k in values) {
    this.setValue([['anychart'], 'format.' + k + '()'], String(values[k]), true);

    if (values['inputLocale'])
      locales.push(values['inputLocale']);

    if (values['outputLocale'] && values['inputLocale'] != values['outputLocale'])
      locales.push(values['outputLocale']);
  }

  if (locales.length)
    this.loadLocales_(locales);
};


/**
 * Load locales from cdn.anychart.com and runs obtained code
 * @param {Array.<string>} locales List of locales to load
 * @private
 */
chartEditor.model.Base.prototype.loadLocales_ = function(locales) {
  var locale = locales.pop();
  var localeUrl = 'https://cdn.anychart.com/releases/v8/locales/' + locale + '.js';
  var self = this;
  goog.net.XhrIo.send(localeUrl, function(e) {
    if (e.target.getStatus() === 200) {
      try {
        var localeData = e.target.getResponseText();
        eval(localeData);
      } catch (e) {
        // something wrong
      }
    }

    if (locales.length) {
      self.loadLocales_(locales);
    } else {
      self.dispatchEvent({
        type: chartEditor.events.EventType.WAIT,
        wait: false
      });
    }
  });
};

// endregion


// region Editor Model API function
/**
 * Setter for model's field state
 * @param {chartEditor.model.Base.Key} key
 * @param {*} value
 * @param {boolean=} opt_noDispatch
 * @param {boolean=} opt_noRebuildChart
 * @param {boolean=} opt_noRebuildMapping
 * @param {boolean=} opt_noOverride Write value only if key not exists.
 */
chartEditor.model.Base.prototype.setValue = function(key, value, opt_noDispatch, opt_noRebuildChart, opt_noRebuildMapping, opt_noOverride) {
  var target = this.model;
  for (var i = 0; i < key.length; i++) {
    var level = key[i];
    if (goog.isArray(level)) {
      // Drill down
      if (!goog.isDef(target[level[0]])) {
        if (level.length > 1)
          target[level[0]] = [];
        else
          target[level[0]] = {};
      }

      if (goog.isArray(target[level[0]]) && target[level[0]].length === level[1])
        target[level[0]].push({});

      target = goog.isArray(target[level[0]]) ? target[level[0]][level[1]] : target[level[0]];

    } else if (goog.isString(level) && target[level] !== value && (!opt_noOverride || !goog.isDef(target[level]))) {
      // Set value
      target[level] = value;

      if (!opt_noDispatch)
        this.dispatchUpdate(opt_noRebuildChart, opt_noRebuildMapping, level);
    }
  }
  // console.log(this.model['chart']['panel']);
};


/**
 * Getter for input's value
 * @param {chartEditor.model.Base.Key} key
 * @return {*} Input's value
 */
chartEditor.model.Base.prototype.getValue = function(key) {
  var target = this.model;
  var level;

  for (var i = 0; i < key.length; i++) {
    level = key[i];
    if (i === key.length - 1) {
      // result
      if (goog.isArray(level))
        return goog.isDef(target[level[0]]) ? target[level[0]][level[1]] : void 0;

      else if (goog.isString(level))
        return target[level];

    } else {
      // drill down
      if (goog.isArray(level))
        target = goog.isArray(target[level[0]]) ? target[level[0]][level[1]] : target[level[0]];

      else if (goog.isString(level))
        target = target[level];

      if (!target)
        return void 0;
    }
  }
};


/**
 * @param {chartEditor.model.Base.Key} key
 * @param {boolean=} opt_noDispatch
 */
chartEditor.model.Base.prototype.removeByKey = function(key, opt_noDispatch) {
  if (!key.length) return;

  var target = this.model;
  var level;
  for (var i = 0; i < key.length; i++) {
    level = key[i];
    if (i === key.length - 1) {
      // remove
      if (goog.isArray(level) && goog.isArray(target[level[0]])) {
        goog.array.splice(target[level[0]], level[1], 1);
      }
      else if (goog.isString(level)) {
        delete target[level];
      }

    } else {
      // drill down
      if (goog.isArray(level))
        target = goog.isArray(target[level[0]]) ? target[level[0]][level[1]] : target[level[0]];
      else if (goog.isString(level))
        target = target[level];

      if (!target)
        break;
    }
  }
  if (!opt_noDispatch)
    this.dispatchUpdate();
};


/**
 * @param {boolean=} opt_noRebuildChart
 * @param {boolean=} opt_noRebuildMapping
 * @param {string=} opt_lastKey
 */
chartEditor.model.Base.prototype.dispatchUpdate = function(opt_noRebuildChart, opt_noRebuildMapping, opt_lastKey) {
  if (this.suspendQueue_ > 0) {
    this.needDispatch_ = true;
    return;
  }

  this.dispatchEvent({
    type: chartEditor.events.EventType.EDITOR_MODEL_UPDATE,
    rebuildChart: !opt_noRebuildChart,
    rebuildMapping: !opt_noRebuildMapping,
    lastKey: opt_lastKey
  });

  this.needDispatch_ = false;
};


/**
 * Suspends update model event dispatching on one step.
 */
chartEditor.model.Base.prototype.suspendDispatch = function() {
  this.suspendQueue_++;
};


/**
 * suspend queue minus one.
 * @param {boolean=} opt_skipDispatch
 */
chartEditor.model.Base.prototype.resumeDispatch = function(opt_skipDispatch) {
  this.suspendQueue_--;
  if (this.suspendQueue_ === 0 && this.needDispatch_ && !opt_skipDispatch)
    this.dispatchUpdate();
};


/**
 * Converts string to valid model key.
 * @param {chartEditor.model.Base.Key} key
 * @param {boolean=} opt_lastKey
 * @return {string} key as a string
 */
chartEditor.model.Base.getStringKey = function(key, opt_lastKey) {
  var result;
  if (goog.isArray(key)) {
    key = /** @type {Array} */(key);
    result = /** @type {string} */(key[key.length - 1]);

    if (result.indexOf('()') === -1)
      result = /** @type {string} */(key[key.length - 2]) + '.' + result + '()';
  }
  else
    result = String(key);

  if (opt_lastKey) {
    var tmp = result.split('.');
    result = tmp[tmp.length - 1];
  }

  return result;
};

chartEditor.model.Base.prototype.getStringKey = chartEditor.model.Base.getStringKey;


/**
 * @return {Object}
 */
chartEditor.model.Base.prototype.getModel = function() {
  return this.model;
};


/**
 * @param {Array.<{key: chartEditor.model.Base.Key, value: (string|boolean|Object) }>} values
 */
chartEditor.model.Base.prototype.setDefaults = function(values) {
  this.defaults_ = values;
};


/**
 * Applies default setting to model without override existing panel.
 * @private
 */
chartEditor.model.Base.prototype.applyDefaults = function() {
  for (var i = 0; i < this.defaults_.length; i++) {
    this.setValue(this.defaults_[i]['key'], this.defaults_[i]['value'], true, void 0, void 0, true);
  }
};
// endregion


// region Data Model
/**
 * Resets prepared data to recalculate it on this.getPreparedData().
 */
chartEditor.model.Base.prototype.resetPreparedData = function() {
  this.preparedData_.length = 0;
};


/**
 * @param {string} dataType
 * @param {string} setId
 * @return {string}
 */
chartEditor.model.Base.prototype.getFullId = function(dataType, setId) {
  return dataType + setId;
};


/**
 * Add data set to data container.
 * @param {Object} data
 */
chartEditor.model.Base.prototype.addData = function(data) {
  var dataType = data.dataType ? data.dataType : chartEditor.model.DataType.CUSTOM;
  var setId = goog.isDef(data.setId) ? data.setId : goog.string.createUniqueString();
  var setFullId = this.getFullId(dataType, setId);

  // Check if data set exists
  var existingData = null;
  if (dataType != chartEditor.model.DataType.GEO) {
    for (var i in this.data) {
      if (this.data[i].type == chartEditor.model.DataType.CUSTOM || this.data[i].type == chartEditor.model.DataType.PREDEFINED) {
        existingData = this.data[i];
        break;
      }
    }
  }

  var dataSet = {
    data: data.data,

    type: dataType,
    setId: setId,
    setFullId: setFullId,

    title: data.title,
    chartType: data.chartType,
    seriesType: data.seriesType,
    activeGeo: data.activeGeo,
    fieldNames: data.fieldNames || {},
    defaults: data.defaults || []
  };

  if (existingData) {
    var confirm = new chartEditor.ui.dialog.Confirm();
    confirm.setTitle('Remove previous data set?');
    confirm.setTextContent('You already have added data set. Remove it?');

    var self = this;
    goog.events.listen(confirm, goog.ui.Dialog.EventType.SELECT, function(e) {
      if (e.key == 'ok') {
        delete self.data[existingData.setFullId];
        this.generateInitialMappingsOnChangeView_ = true;
        self.addDataInternal(dataSet);
      }

      confirm.dispose();
    });
    confirm.setVisible(true);

  } else {
    this.addDataInternal(dataSet);
  }
};


/**
 * Adds data set to this.data container.
 * If new data set is geo data, then removes old geo data.
 * @param {Object} dataSet Ready to use data structure in internal forma.
 */
chartEditor.model.Base.prototype.addDataInternal = function(dataSet) {
  var setFullId = dataSet.setFullId;
  var dataType = dataSet.type;

  this.data[setFullId] = dataSet;
  this.preparedData_.length = 0;

  if (dataType === chartEditor.model.DataType.GEO) {
    if (this.model['dataSettings']['activeGeo'] !== setFullId) {
      delete this.data[this.model['dataSettings']['activeGeo']];
      this.model['dataSettings']['activeGeo'] = setFullId;
      this.model['dataSettings']['geoIdField'] = null;
    }

    if (!this.model['dataSettings']['geoIdField']) {
      // Find geoIdField
      var rawData = this.getRawData(true);

      var dataRow = rawData['features'][0]['properties'];
      for (var i in dataRow) {
        if ((!this.model['dataSettings']['geoIdField'] || i === 'id') && this.isGeoId_(dataRow[i])) {
          this.model['dataSettings']['geoIdField'] = i;
        }
      }
    }
  } else {
    this.model['dataSettings']['active'] = setFullId;
    this.generateInitialMappingsOnChangeView_ = true;
  }

  this.dispatchUpdate();
};

/**
 * Removes data set from data container.
 * @param {string} setFullId
 */
chartEditor.model.Base.prototype.removeData = function(setFullId) {
  delete this.data[setFullId];

  if (this.model['dataSettings']['activeGeo'] && this.preparedData_.length === 2) {
    // Geo data should not be alone
    delete this.data[this.model['dataSettings']['activeGeo']];
  }

  this.preparedData_.length = 0;

  this.generateInitialMappingsOnChangeView_ = true;

  this.dispatchUpdate();
};


/**
 * @return {!Array.<string>}
 */
chartEditor.model.Base.prototype.getDataKeys = function() {
  return goog.object.getKeys(this.data);
};


/**
 * @param {string=} opt_setFullId
 * @return {Array}
 */
chartEditor.model.Base.prototype.getPreparedData = function(opt_setFullId) {
  var data = !this.preparedData_.length ? this.prepareData_() : this.preparedData_;
  if (opt_setFullId) {
    data = goog.array.filter(data, function(item) {
      return item.setFullId === opt_setFullId;
    });
  }

  return data;
};


/**
 * @param {boolean=} opt_activeGeo
 * @param {number=} opt_startIndex
 * @param {number=} opt_numRows
 * @return {?(Array.<*>|Object)}
 */
chartEditor.model.Base.prototype.getRawData = function(opt_activeGeo, opt_startIndex, opt_numRows) {
  var dataSet = this.data[opt_activeGeo ? this.getActiveGeo() : this.getActive()];
  if (!dataSet)
    return null;

  if (goog.isDef(opt_startIndex) && goog.isDef(opt_numRows) && goog.isArray(dataSet.data))
    return goog.array.slice(dataSet.data, opt_startIndex, opt_startIndex + opt_numRows);

  return dataSet.data;
};


/**
 * Getter for active data set id.
 * @return {?string}
 */
chartEditor.model.Base.prototype.getActive = function() {
  return this.model['dataSettings']['active'];
};


/**
 * Getter for active geo data set id.
 * @return {?string}
 */
chartEditor.model.Base.prototype.getActiveGeo = function() {
  return this.model['dataSettings']['activeGeo'];
};


/**
 * Getter for count of data sets.
 * @return {number}
 */
chartEditor.model.Base.prototype.getDataSetsCount = function() {
  return this.getPreparedData().length;
};


/**
 * Getter for geo id field.
 * @return {?string}
 */
chartEditor.model.Base.prototype.getGeoIdField = function() {
  return this.model['dataSettings']['geoIdField'];
};


/**
 * Returns JS code string that creates a configured chart.
 * @param {chartEditor.model.Base.JavascriptOptions=} opt_options
 * @return {string}
 */
chartEditor.model.Base.prototype.getChartAsJsCode = function(opt_options) {
  return this.getChartWithJsCode_(opt_options)[0];
};


/**
 * Returns configured chart in JSON representation.
 * @return {string}
 */
chartEditor.model.Base.prototype.getChartAsJson = function() {
  var chart = this.getChartWithJsCode_()[1];
  if (!chart) return '';
  var json = chart ? chart['toJson']() : '';
  var settings = this.getModel();
  var outputSettings = settings['editorSettings'] && settings['editorSettings']['output'] ? settings['editorSettings']['output'] : {};
  var minify = !!outputSettings['minify'];
  var containerId = outputSettings['container'];
  if (containerId) {
    var obj = json['chart'] || json['gauge'] || json['gantt'] || json['map'] || {};
    obj['container'] = containerId;
  }
  var printerSettings = new goog.format.JsonPrettyPrinter.TextDelimiters();
  if (minify) {
    printerSettings.lineBreak = '';
    printerSettings.space = '';
    printerSettings.propertySeparator = ',';
    printerSettings.nameValueSeparator = ':';
  }
  var printer = new goog.format.JsonPrettyPrinter(printerSettings);
  return printer.format(json);
};


/**
 * Returns configured chart in XML representation.
 * @return {string}
 */
chartEditor.model.Base.prototype.getChartAsXml = function() {
  var chart = this.getChartWithJsCode_()[1];
  return chart ? chart['toXml'](false) : '';
};


/**
 * Creates a chart instance from the model and the JS code string that creates the chart.
 * @param {chartEditor.model.Base.JavascriptOptions=} opt_options Output options object.
 * @return {!Array} Returns [JsString, ChartInstance]
 * @private
 */
chartEditor.model.Base.prototype.getChartWithJsCode_ = function(opt_options) {
  var settings = this.getModel();
  var outputSettings = settings['editorSettings'] && settings['editorSettings']['output'] ? settings['editorSettings']['output'] : {};
  if (goog.isObject(opt_options))
    for (var k1 in opt_options) {
      outputSettings[k1] = opt_options[k1];
    }

  var chartType = settings['chart']['type'];

  if (!chartType)
    return ['', null];

  // SETTINGS OF THE PRINTER
  var minify = !!outputSettings['minify'];
  var containerId = goog.isDef(outputSettings['container']) ? String(outputSettings['container']) : 'container';
  var wrapper = goog.isDef(outputSettings['wrapper']) ? String(outputSettings['wrapper']) : 'function';
  var addData = !goog.isDef(outputSettings['addData']) || outputSettings['addData'];
  var addGeoData = !goog.isDef(outputSettings['addGeoData']) || outputSettings['addGeoData'];
  var addMarkers = !!outputSettings['addMarkers'];
  var eq = minify ? '=' : ' = ';

  var anychartGlobal = /** @type {Object} */(goog.dom.getWindow()['anychart']);
  var printerSettings = new goog.format.JsonPrettyPrinter.TextDelimiters();
  if (minify) {
    printerSettings.lineBreak = '';
    printerSettings.space = '';
    printerSettings.propertySeparator = ',';
    printerSettings.nameValueSeparator = ':';
  }
  var printer = new goog.format.JsonPrettyPrinter(printerSettings);
  var result = [];
  var self = this;

  // Global panel
  if (!goog.object.isEmpty(settings['anychart'])) {
    result.push('// Applying global panel');
    goog.object.forEach(settings['anychart'], function(value, key) {
      // if (chartEditor.binding.testExec(anychartGlobal, key, value)) {
      result.push(self.printKey(printer, 'anychart', key, value, minify));
      // }
    });
    result.push('');
  }

  var chart = /** @type {Object} */(chartEditor.binding.exec(anychartGlobal, chartType + '()'));
  result.push('// Creating chart', 'var chart' + eq + 'anychart.' + chartType + '();', '');

  if (chartType === 'map') {
    var geoData = this.getRawData(true);
    if (geoData) {
      chart['geoData'](geoData);
      if (addGeoData) {
        result.push(
            '// Setting up geo data',
            'var geoData' + eq + this.printValue_(printer, geoData) + ';',
            'chart.geoData(geoData);'
        );
      } else {
        var getGeoDataInfo = this.getGeoDataInfo();
        result.push('chart.geoData(\'' + getGeoDataInfo['path'] + '\');');
      }

      var geoIdField = this.getGeoIdField();
      if (geoIdField) {
        chart['geoIdField'](geoIdField);
        result.push(this.printKey(printer, 'chart', 'geoIdField()', geoIdField));
      }
    }
  }

  // Create data set
  var rawData = this.getRawData();
  var dsCtor = this.getChartTypeSettings()['dataSetCtor'];
  var dataSet = anychartGlobal['data'][dsCtor]();

  result.push('// Setting up data');

  if (addMarkers) result.push('/*=rawData*/');

  var str = 'var rawData' + eq + (addData ? this.printValue_(printer, rawData) : 'getData()') + ';';
  result.push(str);

  if (addMarkers) result.push('/*rawData=*/');

  if (dsCtor === 'table') {
    result.push('var data' + eq + 'anychart.data.' + dsCtor + '(' + this.printValue_(printer, settings['dataSettings']['field']) + ');');

    dataSet['addData'](rawData);
    result.push('data.addData(rawData);');

  } else if (dsCtor === 'tree') {
    var mappingObj1 = settings['dataSettings']['mappings'][0][0]['mapping'];
    if (chartType === 'treeMap')
      mappingObj1['id'] = settings['dataSettings']['field'];
    result.push('var data' + eq + 'anychart.data.' + dsCtor + '(void 0, void 0, void 0, ' + this.printValue_(printer, mappingObj1) + ');');

    dataSet['addData'](rawData, 'as-table');
    result.push('data.addData(rawData, "as-table");');

  } else {
    result.push('var data' + eq + 'anychart.data.' + dsCtor + '();');

    dataSet['data'](rawData);
    result.push('data.data(rawData);');
  }

  result.push('');

  // create mapping and series
  result.push('// Creating mappings');
  var isSinglePlot = settings['dataSettings']['mappings'].length === 1;
  var isSingleSeries = isSinglePlot && settings['dataSettings']['mappings'][0].length === 1;
  var mappingInstancesList = [];
  var mappingInstances, plotMapping, i, j;
  for (i = 0; i < settings['dataSettings']['mappings'].length; i++) {
    mappingInstancesList.push(mappingInstances = []);
    plotMapping = settings['dataSettings']['mappings'][i];
    for (j = 0; j < plotMapping.length; j++) {
      var seriesMapping = plotMapping[j]['mapping'];
      var mappingObj = dsCtor === 'table' || this.chartTypeLike('gauges') ? {} :
          dsCtor === 'tree' ?
              {'id': settings['dataSettings']['field']} :
              {'x': settings['dataSettings']['field']};

      for (var m in seriesMapping) {
        if (seriesMapping.hasOwnProperty(m))
          mappingObj[m] = seriesMapping[m];
      }

      mappingInstances.push(dataSet['mapAs'](mappingObj));
      result.push('var mapping' + (isSingleSeries ? '' : ((isSinglePlot ? '' : '_' + i) + '_' + j)) + eq + 'data.mapAs(' + this.printValue_(printer, mappingObj) + ');');
    }
  }
  result.push('');

  var singleSeriesChart = !!this.getChartTypeSettings()['singleSeries'];
  if (singleSeriesChart) {
    chart['data'](mappingInstancesList[0][0]);
    result.push(
        '// Setting data to the chart',
        'chart.data(mapping);'
    );
  } else {
    result.push('// Creating series and setting data to them');
    result.push('var series;');

    var pointersIndexes = {};
    for (i = 0; i < settings['dataSettings']['mappings'].length; i++) {
      plotMapping = settings['dataSettings']['mappings'][i];
      for (j = 0; j < plotMapping.length; j++) {
        var seriesCtor = plotMapping[j]['ctor'];
        seriesCtor = chartEditor.model.Series[seriesCtor]['ctor'] || seriesCtor;
        var series;
        var mappingPostfix = '(mapping' + (isSingleSeries ? '' : ((isSinglePlot ? '' : '_' + i) + '_' + j)) + ');';
        if (chartType === 'stock') {
          var plot = chart['plot'](i);
          series = plot[seriesCtor](mappingInstancesList[i][j]);
          result.push('series' + eq + 'chart.plot(' + i + ').' + seriesCtor + mappingPostfix);

        } else if (chartType === 'gauges.circular') {
          pointersIndexes[seriesCtor] = ++pointersIndexes[seriesCtor] || 0;
          series = chart[seriesCtor](pointersIndexes[seriesCtor], mappingInstancesList[i][j]);
          mappingPostfix = '(' + pointersIndexes[seriesCtor] + ', mapping' + (isSingleSeries ? '' : ((isSinglePlot ? '' : '_' + i) + '_' + j)) + ');';
          result.push('series' + eq + 'chart.' + seriesCtor + mappingPostfix);

        } else {
          series = chart[seriesCtor](mappingInstancesList[i][j]);
          result.push('series' + eq + 'chart.' + seriesCtor + mappingPostfix);
        }
        if (series['id']) {
          series['id'](plotMapping[j]['id']);
          result.push('series.id(' + this.printValue_(printer, plotMapping[j]['id']) + ');');
        }
      }
    }
  }
  result.push('');

  // Process standalones instances
  var standaloneInstances = {};
  var standaloneResult = this.getStandalonesJsCode(chart, printer, eq, settings, standaloneInstances);
  if (standaloneResult.length) {
    result = goog.array.concat(result, standaloneResult);
  }

  // Apply chart panel
  if (!goog.object.isEmpty(settings['chart']['settings'])) {
    result.push('// Applying appearance panel');

    var chartSettings;
    if (addMarkers) {
      // Sort panel by keys
      chartSettings = {};
      var keys = goog.object.getKeys(settings['chart']['settings']);
      goog.array.sort(keys, function(a, b) {
        var pattern = /['"]\w+['"]/g;
        var a1 = a.replace(pattern, '');
        var b1 = b.replace(pattern, '');
        return a1 > b1 ? 1 : a1 < b1 ? -1 : 0;
      });
      for (var k = 0; k < keys.length; k++) {
        chartSettings[keys[k]] = settings['chart']['settings'][keys[k]];
      }
    } else
      chartSettings = settings['chart']['settings'];

    var markerSeriesName = '';

    goog.object.forEach(chartSettings, function(value, key) {
      var force = false;
      var quotes = false;
      if (key === "palette()")
        value = anychartGlobal['palettes'][value];
      else if (key === "contextMenu().itemsFormatter()")
        quotes = force = true;

      if (goog.isString(value) && value.indexOf('STANDALONE:') === 0) {
        var tmp = value.split(':');
        var sName = tmp[1];
        var sIndex = tmp[2];
        var instance = standaloneInstances[value] && standaloneInstances[value].instance;
        var sDescriptor = settings['standalones'][sName][sIndex];

        if (instance && !sDescriptor['key'] && chartEditor.binding.testExec(chart, key, instance)) {
              // Pass standalone instance to chart's method
          var instanceVarName = standaloneInstances[value].name;
          var sSettingString = self.printKey(printer, 'chart', key, instanceVarName, true, true);
          result.push(sSettingString);
        }

        value = void 0;
      }

      if (goog.isDef(value) && chartEditor.binding.testExec(chart, key, value)) {
        if (!force && goog.isString(value))
          value = value.replace(/"/g, '\\"');

        var settingString = self.printKey(printer, 'chart', key, value, goog.isString(value) || force, quotes);

        if (addMarkers) {
          var pattern = /(plot\(\d\)\.)?getSeries.*\.name\(.*\)/;
          if (markerSeriesName === '' && settingString.search(pattern) !== -1) {
            result.push('/*=seriesNames*/');
            markerSeriesName = 'opened';
          } else if (markerSeriesName === 'opened' && settingString.search(pattern) === -1) {
            result.push('/*seriesNames=*/');
            markerSeriesName = 'closed';
          }
        }

        result.push(settingString);
      }
    });
    if (addMarkers && markerSeriesName === 'opened') {
      result.push('/*seriesNames=*/');
      markerSeriesName = 'closed';
    }
    result.push('');
  }

  if (containerId) {
    result.push(
        '// Settings container and calling draw',
        this.printKey(printer, 'chart', 'container()', containerId),
        'chart.draw();'
    );
  }

  if (minify) {
    result = goog.array.map(result, function(item) {
      return goog.string.startsWith(item, '//') ? '' : item;
    });
  }
  if (wrapper === 'function' || wrapper === 'document-ready') {
    // add indentation
    if (!minify) {
      goog.array.forEach(result, function(item) {
        return '  ' + item;
      });
    }

    this.indentCode(result);

    // wrap with function
    if (wrapper === 'function') {
      result.unshift('(function()' + (minify ? '' : ' ') + '{');
      result.push((minify ? '' : '  ') + 'return chart;');
      result.push('})();');

      // wrap with anychart.onDocumentReady
    } else if (wrapper === 'document-ready') {
      result.unshift('anychart.onDocumentReady(function()' + (minify ? '' : ' ') + '{');
      result.push('});');
    }
  }
  return [result.join(minify ? '' : '\n'), chart];
};


/**
 * @param {Object} chart
 * @param {goog.format.JsonPrettyPrinter} printer
 * @param {string} eq
 * @param {Object} settings
 * @param {Object} standaloneInstances Object to store created standalones instances.
 * @return {Array}
 * @protected
 */
chartEditor.model.Base.prototype.getStandalonesJsCode = function(chart, printer, eq, settings, standaloneInstances) {
  return [];
};

    
/**
 * @param {goog.format.JsonPrettyPrinter} printer
 * @param {string} prefix
 * @param {string} key
 * @param {*} value
 * @param {boolean=} opt_forceRawValue
 * @param {boolean=} opt_noQuotes
 * @return {string}
 * @protected
 */
chartEditor.model.Base.prototype.printKey = function(printer, prefix, key, value, opt_forceRawValue, opt_noQuotes) {
  if (goog.isDef(value)) {
    var quote = opt_noQuotes ? '' : '"';
    var valueString = opt_forceRawValue ?
        quote + String(value) + quote:
        this.printValue_(printer, value);

    var replaceValue = valueString + ');';
    if (key.search(/[^(]\)$/) !== -1)
      replaceValue = ', ' + replaceValue;

    key = key.replace(/\)$/, replaceValue);
  }
  return prefix + '.' + key;
};


/**
 * @param {goog.format.JsonPrettyPrinter} printer
 * @param {*} value
 * @return {string}
 * @private
 */
chartEditor.model.Base.prototype.printValue_ = function(printer, value) {
  if (goog.isString(value)) {
    value = value.replace(/(\r|\n|\t)/g, function(part, g1) {
      switch (g1) {
        case '\r':
          return '\\r';
        case '\n':
          return '\\n';
        case '\t':
          return '\\t';
      }
      return part;
    });
    value = '"' + value + '"';
  }
  return printer.format(value);
};


/**
 * Returns code with function that returns current data
 * @return {string}
 */
chartEditor.model.Base.prototype.getDataCode = function() {
  var printerSettings = new goog.format.JsonPrettyPrinter.TextDelimiters();
  var printer = new goog.format.JsonPrettyPrinter(printerSettings);
  var result = [];

  result.push('');
  result.push('function getData() {');

  var rawData = this.getRawData();

  var dataStr = 'return ' + this.printValue_(printer, rawData) + ';';
  result.push(dataStr);

  this.indentCode(result, void 0, 2);

  result.push('}');

  return result.join('\n');
};


/**
 * @param {Array.<string>|string} code
 * @param {number=} opt_numSpaces
 * @param {number=} opt_from
 * @param {number=} opt_to
 * @return {Array.<string>|string} Result indented code
 */
chartEditor.model.Base.prototype.indentCode = function(code, opt_numSpaces, opt_from, opt_to) {
  var isString = goog.isString(code);
  code = isString ? [code] : code;
  opt_numSpaces = goog.isDef(opt_numSpaces) ? opt_numSpaces : 2;
  opt_from = goog.isDef(opt_from) ? opt_from : 0;
  opt_to = !goog.isDef(opt_to) || opt_to > code.length ? code.length : opt_to;
  var indentation = goog.string.repeat(' ', opt_numSpaces);
  for (var i = opt_from; i < opt_to; i++) {
    code[i] = indentation + code[i].replace(/\n/g, '\n' + indentation);
  }

  return isString ? code[0] : code;
};


/**
 * @return {Array}
 * @private
 */
chartEditor.model.Base.prototype.prepareData_ = function() {
  var joinedSets = [];
  var singleSets = [];
  var geoSets = [];
  var dataSet;

  for (var i in this.data) {
    if (this.data.hasOwnProperty(i)) {
      dataSet = this.prepareDataSet_(this.data[i]);

      var joined = false;
      if (dataSet.join) {
        /*
         * todo: process join
         */
        joined = true;
      }

      if (joined) {
        dataSet.title = 'Joined set ' + (joinedSets.length + 1);
        joinedSets.push(dataSet);
      } else if (dataSet.type === chartEditor.model.DataType.GEO) {
        geoSets.push(dataSet);
      } else {
        dataSet.title = dataSet.title ? dataSet.title : 'Data set ' + (singleSets.length + 1);
        singleSets.push(dataSet);
      }
    }
  }

  this.preparedData_ = goog.array.concat(joinedSets, singleSets, geoSets);

  return this.preparedData_;
};


/**
 * @param {Object} dataSet
 * @return {Object}
 * @private
 */
chartEditor.model.Base.prototype.prepareDataSet_ = function(dataSet) {
  var result = {
    type: dataSet.type,
    setId: dataSet.setId,
    setFullId: dataSet.setFullId,
    title: dataSet.title,
    fieldNames: dataSet.fieldNames,
    fields: []
  };

  var row = dataSet.type === chartEditor.model.DataType.GEO ?
      dataSet.data['features'][0]['properties'] :
      dataSet.data[0];

  var settings = new goog.format.JsonPrettyPrinter.SafeHtmlDelimiters();
  settings.lineBreak = '';
  settings.objectStart = '\n{';
  settings.arrayStart = '\n[';
  settings.space = '';
  settings.propertySeparator = ', ';
  settings.nameValueSeparator = ': ';

  var f = new goog.format.JsonPrettyPrinter(settings);
  result.sample = f.format(row);

  for (var key in row) {
    var name = goog.isDef(result.fieldNames[key]) ?
        result.fieldNames[key] :
        goog.isArray(row) ? 'Field ' + key : key;

    var val = row[key];
    var type = goog.isDefAndNotNull(val) ? typeof(val) : 'number';
    var field = {
      key: key,
      name: name,
      type: type
    };
    result.fields.push(field);
  }

  return result;
};
// endregion


/**
 * Checks if current mapping are not compatible with new chart and series types.
 *
 * @param {string} prevChartType
 * @param {string} prevSeriesType
 * @return {boolean} true if mappings are not compatible.
 */
chartEditor.model.Base.prototype.needResetMappings = function(prevChartType, prevSeriesType) {
  // var chartType = this.model['chart']['type'];
  return true;
};


/**
 * Checks if fields of two series types are compatible.
 *
 * @param {string} seriesType1
 * @param {string} seriesType2
 * @return {boolean} true if compatible
 */
chartEditor.model.Base.prototype.checkSeriesFieldsCompatible = function(seriesType1, seriesType2) {
  var fields1 = chartEditor.model.Series[seriesType1]['fields'];
  var fields2 = chartEditor.model.Series[seriesType2]['fields'];
  var compatible = true;
  if (fields1.length === fields2.length) {
    for (var i = fields1.length; i--;) {
      if (fields1[i]['field'] !== fields2[i]['field']) {
        compatible = false;
        break;
      }
    }
  } else
    compatible = false;

  return compatible;
};


/**
 * Is string looks like geo id string.
 *
 * @param {string} value
 * @return {boolean}
 * @private
 */
chartEditor.model.Base.prototype.isGeoId_ = function(value) {
  var pattern = /^[A-z]{2,3}([\W_]([A-z]{2}|\d+))?$/;
  return Boolean(new RegExp(pattern).exec(value));
};


/**
 * Checks if setting is excluded for current chart type.
 * @param {string} stringKey
 * @return {boolean} true if excluded.
 */
chartEditor.model.Base.prototype.checkSettingForExclusion = function(stringKey) {
  var excludes = this.getChartTypeSettings()['settingsExcludes'];
  return (excludes && goog.array.indexOf(excludes, stringKey) !== -1);
};


/**
 * Check if current chart type is single series.
 * @return {boolean}
 */
chartEditor.model.Base.prototype.isChartSingleSeries = function() {
  var chartType = this.model['chart']['type'];
  return Boolean(chartType) && Boolean(this.getChartTypeSettings()['singleSeries']);
};


/**
 * @return {string}
 */
chartEditor.model.Base.prototype.getChartTypeKey = function() {
  var chartType = this.model['chart']['type'];
  var chartTypeKey = this.model['chart']['typeKey'];
  
  if (chartType !== chartTypeKey || chartEditor.model.ChartTypes[chartTypeKey]['value'] !== chartType) {
    if (this.stackMode) {
      chartTypeKey = chartType + '-stacked-' + this.stackMode;

    } else {
      var result = goog.object.filter(chartEditor.model.ChartTypes, function(item, key){
        return item['value'] === chartType || key === chartType;
      });
      if (goog.object.getCount(result))
        chartTypeKey = goog.object.getAnyKey(result);
    }

    this.model['chart']['typeKey'] = chartTypeKey;
  }

  return chartTypeKey;
};


/**
 * Returns panel object for current chart type
 * @return {*}
 */
chartEditor.model.Base.prototype.getChartTypeSettings = function() {
  var chartTypeKey = this.getChartTypeKey();
  return chartEditor.model.ChartTypes[chartTypeKey];
};


/**
 * Checks if chart type starts from string value
 * @param {string|Array.<string>} value
 * @return {boolean} true if so
 */
chartEditor.model.Base.prototype.chartTypeLike = function(value) {
  if (goog.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      if (this.chartTypeLike(value[i]))
        return true;
    }
    return false;
  }

  var chartType = this.model['chart']['type'];
  return chartType.indexOf(value) === 0;
};


/** @protected */
chartEditor.model.Base.prototype.initGeoData = function() {};


/**
 * Returns geo data description object.
 * Implemented in model.Map.
 *
 * @return {Object}
 */
chartEditor.model.Base.prototype.getGeoDataInfo = function() {return {};};


/**
 * Returns geo data index list.
 *
 * @return {?Array.<Object>}
 */
chartEditor.model.Base.prototype.getGeoDataIndexList = function() {return null;};


/**
 * Creates scale panel instance by scale type.
 *
 * @param {string} scaleType
 * @return {Object|null}
 */
chartEditor.model.Base.prototype.createScaleByType = function(scaleType) {return null;};


/** @inheritDoc */
chartEditor.model.Base.prototype.disposeInternal = function(){
  this.appearanceTabs.length = 0;
};


//exports
(function() {
  var proto = chartEditor.model.Base.prototype;
  proto['getValue'] = proto.getValue;
})();