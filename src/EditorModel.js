goog.provide('chartEditor.EditorModel');

goog.require("chartEditor.dialog.Confirm");
goog.require("chartEditor.enums");
goog.require("goog.events.EventTarget");
goog.require("goog.format.JsonPrettyPrinter");
goog.require("goog.format.JsonPrettyPrinter.SafeHtmlDelimiters");



/**
 * Model!
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
chartEditor.EditorModel = function() {
  chartEditor.EditorModel.base(this, 'constructor');

  /**
   * Data container
   * @type {Object}
   * @private
   */
  this.data_ = {};

  /**
   * Data sets descriptions container
   * @type {Array}
   * @private
   */
  this.preparedData_ = [];

  this.generateInitialMappingsOnChangeView_ = true;

  /**
   * Model structure
   * @type {chartEditor.EditorModel.Model}
   * @private
   */
  this.model_ = {
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
   * @private
   */
  this.fieldsState_ = {};

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
    'setSettingForSeries': this.setSettingForSeries,
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
   * @type {Array}
   * @private
   */
  this.geoDataIndex_ = [];
};
goog.inherits(chartEditor.EditorModel, goog.events.EventTarget);


/**
 * @typedef {Array.<(Array.<*>|string)>}
 */
chartEditor.EditorModel.Key;


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
chartEditor.EditorModel.Model;


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
chartEditor.EditorModel.JavascriptOptions;


// region Structures
/**
 * @enum {string}
 */
chartEditor.EditorModel.DataType = {
  CUSTOM: 'c',
  PREDEFINED: 'p',
  GEO: 'g'
};


/**
 * @enum {Array.<Object>}
 */
chartEditor.EditorModel.Scales = {
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
  ]
};


/**
 * @type {Object}
 */
chartEditor.EditorModel.ChartTypes = {
  'line': {
    'value': 'line',
    'name': 'Line',
    'icon': 'line-chart-1.svg', // 'http://www.anychart.com/_design/img/upload/charts/types/'
    'series': ['line', 'spline', 'area', 'splineArea', 'column', 'ohlc'], // first value is default
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['common']
  },
  'area': {
    'value': 'area',
    'name': 'Area',
    'icon': 'area-chart.svg',
    'series': ['area', 'splineArea', 'line', 'spline', 'column', 'ohlc'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['common']
  },
  'area-stacked-value': {
    'value': 'area',
    'stackMode': 'value',
    'name': 'Area stacked (value)',
    'icon': 'stacked-area-chart.svg',
    'series': ['area', 'splineArea', 'line', 'spline', 'column', 'ohlc'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['stacked-value']
  },
  'area-stacked-percent': {
    'value': 'area',
    'stackMode': 'percent',
    'name': 'Area stacked (percent)',
    'icon': 'percent-stacked-area-chart.svg',
    'series': ['area', 'splineArea', 'line', 'spline', 'column', 'ohlc'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['stacked-percent']
  },
  'bar': {
    'value': 'bar',
    'name': 'Bar',
    'icon': 'bar-chart.svg',
    'series': ['bar', 'line', 'spline', 'area', 'splineArea', 'ohlc'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['common']
  },
  'bar-stacked-value': {
    'value': 'bar',
    'stackMode': 'value',
    'name': 'Bar stacked (value)',
    'icon': 'stacked-bar-chart.svg',
    'series': ['bar', 'line', 'spline', 'area', 'splineArea', 'ohlc'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['stacked-value']
  },
  'bar-stacked-percent': {
    'value': 'bar',
    'stackMode': 'percent',
    'name': 'Bar stacked (percent)',
    'icon': 'percent-stacked-bar-chart.svg',
    'series': ['bar', 'line', 'spline', 'area', 'splineArea', 'ohlc'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['stacked-percent']
  },
  'column': {
    'value': 'column',
    'name': 'Column',
    'icon': 'column-chart.svg',
    'series': ['column', 'line', 'spline', 'area', 'splineArea', 'ohlc', 'candlestick'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['common']
  },
  'column-stacked-value': {
    'value': 'column',
    'stackMode': 'value',
    'name': 'Column stacked (value)',
    'icon': 'stacked-column-chart.svg',
    'series': ['column', 'line', 'spline', 'area', 'splineArea', 'ohlc'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['stacked-value']
  },
  'column-stacked-percent': {
    'value': 'column',
    'stackMode': 'percent',
    'name': 'Column stacked (percent)',
    'icon': 'percent-stacked-step-line-area-chart.svg',
    'series': ['column', 'line', 'spline', 'area', 'splineArea', 'ohlc'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['stacked-percent']
  },
  'scatter': {
    'value': 'scatter',
    'name': 'Scatter',
    'icon': 'scatter-chart.svg',
    'series': ['marker', 'bubble', 'line'],
    'scales': chartEditor.EditorModel.Scales.SCATTER,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['common']
  },
  'waterfall': {
    'value': 'waterfall',
    'name': 'Waterfall',
    'icon': 'waterfall-chart.svg',
    'series': ['waterfall'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['common']
  },
  'pie': {
    'value': 'pie',
    'name': 'Pie',
    'icon': 'pie-chart.svg',
    'series': ['pie'],
    'dataSetCtor': 'set',
    'singleSeries': true,
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.SERIES,
      chartEditor.enums.EditorTabs.GRIDS,
      chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS,
      chartEditor.enums.EditorTabs.SCALES
    ],
    'filters': ['common']
  },
  'funnel': {
    'value': 'funnel',
    'name': 'Funnel',
    'icon': 'funnel-chart.svg',
    'series': ['funnel'],
    'dataSetCtor': 'set',
    'singleSeries': true,
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.SERIES,
      chartEditor.enums.EditorTabs.GRIDS,
      chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS,
      chartEditor.enums.EditorTabs.SCALES
    ],
    'filters': ['common']
  },
  'map': {
    'value': 'map',
    'name': 'Map',
    'icon': 'choropleth-map.svg',
    'series': ['marker-by-id', 'marker-by-coordinates', 'bubble-by-id', 'bubble-by-coordinates', 'choropleth'],
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.GRIDS,
      chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS,
      chartEditor.enums.EditorTabs.SCALES
    ],
    'settingsExcludes': ['animation().enabled()'],
    'filters': ['common']
  },
  'stock': {
    'value': 'stock',
    'name': 'Stock',
    'icon': 'stock-chart.svg',
    'series': ['ohlc', 'candlestick', 'line', 'spline', 'column', 'area', 'splineArea'],
    'dataSetCtor': 'table',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.DATA_LABELS,
      chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS,
      chartEditor.enums.EditorTabs.SCALES
    ],
    'settingsExcludes': ['palette()', 'legend().enabled()', 'animation().enabled()'],
    'filters': ['common']
  },
  'box': {
    'value': 'box',
    'name': 'Box',
    'icon': 'box-chart.svg',
    'series': ['box', 'line', 'spline', 'column', 'area', 'marker', 'bubble', 'ohlc'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
        chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['common']
  },
  'polar': {
    'value': 'polar',
    'name': 'Polar',
    'icon': 'polar-column-chart.svg',
    'series': ['line', 'area', 'column', 'marker', 'polygon', 'polyline', 'rangeColumn'],
    'scales': chartEditor.EditorModel.Scales.SCATTER,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['common']
  },
  'radar': {
    'value': 'radar',
    'name': 'Radar',
    'icon': 'radar-chart-1.svg',
    'series': ['line', 'area', 'marker'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['common']
  },
  'radar-stacked-value': {
    'value': 'radar',
    'stackMode': 'value',
    'name': 'Radar stacked (value)',
    'icon': 'radar-chart-1.svg',
    'series': ['area'/*, 'line', 'marker'*/],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['stacked-value']
  },
  'radar-stacked-percent': {
    'value': 'radar',
    'stackMode': 'percent',
    'name': 'Radar stacked (percent)',
    'icon': 'radar-chart-1.svg',
    'series': ['area'/*, 'line', 'marker'*/],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['stacked-percent']
  },
  'mekko': {
    'value': 'mekko',
    'name': 'Mekko',
    'icon': 'bar-mekko-chart.svg',
    'series': ['mekko'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.GRIDS,
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['common']
  },
  'barmekko': {
    'value': 'barmekko',
    'name': 'Bar Mekko',
    'icon': 'bar-mekko-chart.svg',
    'series': ['mekko'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.GRIDS,
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['common']
  },
  'mosaic': {
    'value': 'mosaic',
    'name': 'Mosaic',
    'icon': 'bar-mekko-chart.svg',
    'series': ['mekko'],
    'scales': chartEditor.EditorModel.Scales.CARTESIAN,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.GRIDS,
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'filters': ['common']
  },
  'heatMap': {
    'value': 'heatMap',
    'name': 'Heat Map',
    'icon': 'heatmap-chart.svg',
    'series': ['heatMap'],
    'scales': chartEditor.EditorModel.Scales.HEATMAP,
    'dataSetCtor': 'set',
    'singleSeries': true,
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.SERIES,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS
    ],
    'settingsExcludes': ['palette()', 'animation().enabled()'],
    'filters': ['common']
  },
  'treeMap': {
    'value': 'treeMap',
    'name': 'Tree Map',
    'icon': 'treemap-chart.svg',
    'series': ['treeMap'],
    'dataSetCtor': 'tree',
    'singleSeries': true,
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.SERIES,
      chartEditor.enums.EditorTabs.GRIDS,
      chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GAUGE_AXES,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.POINTERS,
      chartEditor.enums.EditorTabs.SCALES
    ],
    'settingsExcludes': ['palette()', 'animation().enabled()'],
    'filters': ['common']
  },
  'gauges.circular': {
    'value': 'gauges.circular',
    'name': 'Circular Gauge',
    'icon': 'circular-gauge.svg',
    'series': ['gauges.bar', 'gauges.marker', 'needle', 'knob'],
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.LEGEND,
      chartEditor.enums.EditorTabs.DATA_LABELS,
      chartEditor.enums.EditorTabs.SERIES,
      chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      chartEditor.enums.EditorTabs.GRIDS,
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.SCALE_BARS,
      chartEditor.enums.EditorTabs.SCALES
    ],
    'settingsExcludes': ['palette()'],
    'filters': ['common', 'gauges']
  },
  // region ==== Linear gauges
  'gauges.linear': {
    'value': 'gauges.linear',
    'name': 'Linear Gauge',
    'icon': 'vertical-gauge-1.svg',
    'series': ['linearGauge.bar', 'linearGauge.led', 'linearGauge.tank', 'linearGauge.thermometer', 'linearGauge.marker', 'linearGauge.rangeBar'],
    'scales': chartEditor.EditorModel.Scales.GAUGE_LINEAR,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.DATA_LABELS,
      chartEditor.enums.EditorTabs.SERIES,
      chartEditor.enums.EditorTabs.GRIDS,
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES
    ],
    'settingsExcludes': ['palette()'],
    'filters': ['common', 'gauges']
  },
  'gauges.linear.led': {
    'value': 'gauges.led',
    'name': 'Led Gauge',
    'icon': 'vertical-gauge-1.svg',
    'series': ['linearGauge.led', 'linearGauge.bar', 'linearGauge.tank', 'linearGauge.thermometer', 'linearGauge.marker', 'linearGauge.rangeBar'],
    'scales': chartEditor.EditorModel.Scales.GAUGE_LINEAR,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.DATA_LABELS,
      chartEditor.enums.EditorTabs.SERIES,
      chartEditor.enums.EditorTabs.GRIDS,
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES
    ],
    'settingsExcludes': ['palette()'],
    'filters': ['common', 'gauges']
  },
  'gauges.linear.tank': {
    'value': 'gauges.tank',
    'name': 'Tank Gauge',
    'icon': 'tank-gauge-1.svg',
    'series': ['linearGauge.tank', 'linearGauge.bar', 'linearGauge.led', 'linearGauge.thermometer', 'linearGauge.marker', 'linearGauge.rangeBar'],
    'scales': chartEditor.EditorModel.Scales.GAUGE_LINEAR,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.DATA_LABELS,
      chartEditor.enums.EditorTabs.SERIES,
      chartEditor.enums.EditorTabs.GRIDS,
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES
    ],
    'settingsExcludes': ['palette()'],
    'filters': ['common', 'gauges']
  },
  'gauges.linear.thermometer': {
    'value': 'gauges.thermometer',
    'name': 'Thermometer Gauge',
    'icon': 'thermometer-gauge.svg',
    'series': ['linearGauge.thermometer', 'linearGauge.bar', 'linearGauge.led', 'linearGauge.tank', 'linearGauge.marker', 'linearGauge.rangeBar'],
    'scales': chartEditor.EditorModel.Scales.GAUGE_LINEAR,
    'dataSetCtor': 'set',
    'panelsExcludes': [
      chartEditor.enums.EditorTabs.DATA_LABELS,
      chartEditor.enums.EditorTabs.SERIES,
      chartEditor.enums.EditorTabs.GRIDS,
      chartEditor.enums.EditorTabs.COLOR_SCALE,
      chartEditor.enums.EditorTabs.COLOR_RANGE,
      chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      chartEditor.enums.EditorTabs.RADAR_POLAR_AXES
    ],
    'settingsExcludes': ['palette()'],
    'filters': ['common', 'gauges']
  }
  // endregion
};


/**
 * @type {Object}}
 */
chartEditor.EditorModel.Series = {
  'line': {
    'fields': [{'field': 'value', 'name': 'Y Value'}]
  },
  'spline': {
    'fields': [{'field': 'value', 'name': 'Y Value'}]
  },
  'column': {
    'fields': [{'field': 'value', 'name': 'Y Value'}]
  },
  'bar': {
    'fields': [{'field': 'value', 'name': 'Y Value'}]
  },
  'area': {
    'fields': [{'field': 'value', 'name': 'Y Value'}]
  },
  'splineArea': {
    'name': 'Spline Area',
    'fields': [{'field': 'value', 'name': 'Y Value'}]
  },
  'polygon': {
    'fields': [{'field': 'value', 'name': 'Y Value'}]
  },
  'polyline': {
    'fields': [{'field': 'value', 'name': 'Y Value'}]
  },
  'rangeColumn': {
    'name': 'Range Column',
    'fields': [
      {'field': 'high', 'name': 'High'},
      {'field': 'low', 'name': 'Low'}
    ]
  },
  'waterfall': {
    'name': 'Waterfall',
    'fields': [
      {'field': 'value', 'name': 'Value'}
    ]
  },
  'ohlc': {
    'fields': [
      {'field': 'open', 'name': 'Open Value'},
      {'field': 'high', 'name': 'High Value'},
      {'field': 'low', 'name': 'Low Value'},
      {'field': 'close', 'name': 'Close Value'}]
  },
  'candlestick': {
    'fields': [
      {'field': 'open'},
      {'field': 'high'},
      {'field': 'low'},
      {'field': 'close'}]
  },
  'box': {
    'fields': [
      {'field': 'lowest'},
      {'field': 'q1'},
      {'field': 'median'},
      {'field': 'q3'},
      {'field': 'highest'},
      {'field': 'value'},
      {'field': 'outliers'}]
  },
  'marker': {
    'fields': [{'field': 'value', 'name': 'Value'}]
  },
  'bubble': {
    'fields': [
      {'field': 'value', 'name': 'Value'},
      {'field': 'size', 'name': 'Size'}]
  },
  // map series
  'marker-by-id': {
    'ctor': 'marker',
    'name': 'Marker (by geo Id)',
    'fields': [
      {'field': 'id', 'name': 'Id'}
    ]
  },
  'marker-by-coordinates': {
    'ctor': 'marker',
    'name': 'Marker (by coordinates)',
    'fields': [
      {'field': 'lat', 'name': 'Latitude'},
      {'field': 'long', 'name': 'Longitude'}
    ]
  },
  'bubble-by-id': {
    'ctor': 'bubble',
    'name': 'Bubble (by geo Id)',
    'fields': [
      {'field': 'id', 'name': 'Id'},
      {'field': 'size', 'name': 'Size'}
    ]
  },
  'bubble-by-coordinates': {
    'ctor': 'bubble',
    'name': 'Bubble (by coordinates)',
    'fields': [
      {'field': 'lat', 'name': 'Latitude'},
      {'field': 'long', 'name': 'Longitude'},
      {'field': 'size', 'name': 'Size'}
    ]
  },
  'choropleth': {
    'fields': [
      {'field': 'id', 'name': 'Id'},
      {'field': 'value', 'name': 'Value'}
    ]
  },
  'heatMap': {
    'fields': [
      {'field': 'y', 'name': 'Y Value', 'type': 'string'},
      {'field': 'heat', 'name': 'Heat'}
    ]
  },
  'mekko': {
    'fields': [{'field': 'value', 'name': 'Y Value'}]
  },
  'pie': {
    'fields': [{'field': 'value', 'name': 'Value'}]
  },
  'funnel': {
    'fields': [{'field': 'value', 'name': 'Value'}]
  },
  'treeMap': {
    'fields': [
      {'field': 'parent', 'name': 'Parent', 'type': 'string'},
      {'field': 'name', 'name': 'Name', 'type': 'string'},
      {'field': 'value', 'name': 'Value'}
    ]
  },
  'gauges.bar': {
    'ctor': 'bar',
    'name': 'Bar',
    'fields': [{'field': 'value', 'name': 'Value'}]
  },
  'gauges.marker': {
    'ctor': 'marker',
    'name': 'Marker',
    'fields': [{'field': 'value', 'name': 'Value'}]
  },
  'needle': {
    'fields': [{'field': 'value', 'name': 'Value'}]
  },
  'knob': {
    'fields': [{'field': 'value', 'name': 'Value'}]
  },
  'linearGauge.bar': {
    'ctor': 'bar',
    'name': 'Bar',
    'fields': [{'field': 'value', 'name': 'Value'}]
  },
  'linearGauge.led': {
    'ctor': 'led',
    'name': 'Led',
    'fields': [{'field': 'value', 'name': 'Value'}]
  },
  'linearGauge.tank': {
    'ctor': 'tank',
    'name': 'Tank',
    'fields': [{'field': 'value', 'name': 'Value'}]
  },
  'linearGauge.thermometer': {
    'ctor': 'thermometer',
    'name': 'Thermometer',
    'fields': [{'field': 'value', 'name': 'Value'}]
  },
  'linearGauge.marker': {
    'ctor': 'marker',
    'name': 'Marker',
    'fields': [{'field': 'value', 'name': 'Value'}]
  },
  'linearGauge.rangeBar': {
    'ctor': 'rangeBar',
    'name': 'Range Bar',
    'fields': [
      {'field': 'low', 'name': 'Low'},
      {'field': 'high', 'name': 'High'}
    ]
  }
};
// endregion


// region Model initialization
/**
 * Processes analysis of active data set.  Need ['dataSettings']['active'] to be set.
 * @private
 */
chartEditor.EditorModel.prototype.analyzeDataBeforeChooseField_ = function() {
  this.fieldsState_ = {
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

    if (!this.fieldsState_.date && goog.isString(fieldValue) && isNaN(numberValue) && new Date(fieldValue).getTime()) {
      // Full valid date by string ("2010-05-17")
      this.fieldsState_.date = key;
    }

    if (!this.fieldsState_.date_short && !isNaN(numberValue) && /^[0-2]\d{3}$/.test(fieldValue)) {
      // Short date ("2010")
      this.fieldsState_.date_short = key;
    }

    if (!isNaN(numberValue)) {
      if (this.fieldsState_.coordinates.length < 2 && new RegExp(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/).exec(fieldValue)) {
        this.fieldsState_.coordinates.push(key);
      }

    } else if (goog.isString(fieldValue)) {
      this.fieldsState_.firstString = goog.isDef(this.fieldsState_.firstString) ? this.fieldsState_.firstString : key;

      if (!this.fieldsState_.geoId && this.isGeoId_(fieldValue))
        this.fieldsState_.geoId = key;
    }
  }

  if (this.fieldsState_.coordinates.length < 2)
    this.fieldsState_.coordinates = [];
};


/**
 * Processes analysis of active data set. Need ['dataSettings']['field'] to be set.
 * @private
 */
chartEditor.EditorModel.prototype.analyzeDataAfterChooseField_ = function() {
  var rawData = this.getRawData();
  var dataRow = rawData[0];
  var numberValue;
  var key;

  // Counting numbers
  for (key in dataRow) {
    if (this.model_['dataSettings']['field'] === key)
      continue;

    numberValue = goog.string.toNumber(dataRow[key]);
    if (!isNaN(numberValue)) {
      this.fieldsState_.numbers.push(key);
      this.fieldsState_.numbersCount++;

    } else if (goog.isString(dataRow[key])) {
      this.fieldsState_.strings.push(key);
    }
  }
};


/**
 * Processes analysis of active data set and sets field.
 *
 * @param {string=} opt_active Active data set id
 * @param {string=} opt_field Field id
 */
chartEditor.EditorModel.prototype.chooseDatasetAndField = function(opt_active, opt_field) {
  var preparedData = this.getPreparedData();
  this.model_['dataSettings']['active'] = goog.isDefAndNotNull(opt_active) ? opt_active : preparedData[0].setFullId;

  if (this.data_[this.model_['dataSettings']['active']].chartType &&
      (!this.model_['chart']['type'] || this.data_[this.model_['dataSettings']['active']].chartType === this.model_['chart']['type'])) {
    var defaults = this.data_[this.model_['dataSettings']['active']].defaults;
    this.setDefaults(defaults);
  } else
    this.setDefaults([]);

  this.dropChartSettings();

  this.analyzeDataBeforeChooseField_();

  // Set up field
  if (goog.isDefAndNotNull(opt_field)) {
    this.model_['dataSettings']['field'] = opt_field;

  } else {
    this.model_['dataSettings']['field'] = goog.isDef(this.fieldsState_.date) ?
        this.fieldsState_.date :
        goog.isDef(this.fieldsState_.date_short) ?
            this.fieldsState_.date_short :
            goog.isDef(this.fieldsState_.firstString) ?
                this.fieldsState_.firstString :
                preparedData[0].fields[0].key;
  }

  this.analyzeDataAfterChooseField_();
};


/**
 * Chooses chart type.
 */
chartEditor.EditorModel.prototype.chooseDefaultChartType = function() {
  var chartType = null;

  var recomendedChartType = this.data_[this.getActive()].chartType;
  if (recomendedChartType) {
    var result = goog.object.filter(chartEditor.EditorModel.ChartTypes, function(item, key){
      return item['value'] === recomendedChartType || key === recomendedChartType;
    });
    if (goog.object.getCount(result))
      chartType = recomendedChartType;
  }

  if (!chartType) {
    chartType = 'line';
    var rawData = this.getRawData();

    if (this.model_['dataSettings']['field'] === this.fieldsState_.date) {
      chartType = 'stock';

    } else if (this.model_['dataSettings']['field'] === this.fieldsState_.date_short) {
      chartType = 'column';

      if (this.fieldsState_.numbersCount > 3)
        this.setStackMode('value');

    } else if (this.model_['dataSettings']['field'] === this.fieldsState_.firstString) {
      if (rawData.length <= 5 && this.fieldsState_.numbersCount === 1)
        chartType = 'pie';
      else if (this.fieldsState_.numbersCount <= 3)
        chartType = 'bar';
      else if (this.fieldsState_.numbersCount <= 5) {
        chartType = 'bar';
        this.setStackMode('value');
      }

    } else
      chartType = 'scatter';
  }

  if (chartType === 'map')
    this.initGeoData_();

  this.model_['chart']['type'] = chartType;
};


/**
 * Chooses default series type.
 */
chartEditor.EditorModel.prototype.chooseDefaultSeriesType = function() {
  var seriesType = null;
  var recomendedSeriesType = this.data_[this.getActive()].seriesType;
  if (recomendedSeriesType) {
    var availableTypes = this.getChartTypeSettings()['series'];
    if (goog.array.indexOf(availableTypes, recomendedSeriesType) !== -1)
      seriesType = recomendedSeriesType;
  }

  if (!seriesType) {
    var chartTypeKey = this.getChartTypeKey();
    seriesType = this.getChartTypeSettings()['series'][0];
    switch (chartTypeKey) {
      case 'map':
        if (this.fieldsState_.coordinates.length === 2) {
          if (this.fieldsState_.numbersCount)
            seriesType = 'bubble-by-coordinates';
          else
            seriesType = 'marker-by-coordinates';

        } else if (this.fieldsState_.geoId) {
          if (this.fieldsState_.numbersCount)
            seriesType = 'bubble-by-id';
          else
            seriesType = 'marker-by-id';
        }
        break;

      case 'stock':
        if (this.fieldsState_.numbersCount < 4 || this.fieldsState_.numbersCount > 5)
          seriesType = 'line';
        break;

      case 'scatter':
        if (!(this.fieldsState_.numbersCount % 2))
          seriesType = 'bubble';
        else
          seriesType = 'marker';
        break;
    }
  }

  this.model_['chart']['seriesType'] = seriesType;
};


/**
 * Creates default mappings for plots and series.
 */
chartEditor.EditorModel.prototype.createDefaultMappings = function() {
  this.model_['dataSettings']['mappings'] = [];

  if (this.model_['chart']['type'] === 'stock') {
    this.model_['dataSettings']['mappings'] = [this.createPlotMapping()];

    if (this.model_['chart']['seriesType'] === 'ohlc' && this.fieldsState_.numbersCount === 5) {
      this.model_['chart']['seriesType'] = 'column';
      this.model_['dataSettings']['mappings'].push(this.createPlotMapping());
      this.model_['chart']['seriesType'] = 'ohlc';
    }
  }
  else
    this.model_['dataSettings']['mappings'] = [this.createPlotMapping()];
};


/**
 * Creates plot mapping. Need active data set and default series type to be chosen.
 * @return {Array}
 */
chartEditor.EditorModel.prototype.createPlotMapping = function() {
  var result = [];
  var chartType = this.model_['chart']['type'];
  var seriesType = this.model_['chart']['seriesType'];
  var singleSeries = this.isChartSingleSeries();

  var numValues = 1;
  if (seriesType === 'bubble')
    numValues = 2;
  else if (seriesType === 'ohlc' || seriesType === 'candlestick')
    numValues = 4;

  var plotIndex = this.model_['dataSettings']['mappings'].length;
  var numSeries;
  var fieldIndex;

  if (singleSeries ||
      this.chartTypeLike(['map', 'box', 'gauges']) ||
      (chartType === 'stock' && seriesType === 'column' && plotIndex === 1))
    numSeries = 1;
  else
    numSeries = Math.floor(this.fieldsState_.numbersCount / numValues);

  if (chartType === 'stock' && seriesType === 'column' && plotIndex === 1)
    fieldIndex = 4; // try to set volume plot

  for (var i = 0; i < numSeries; i += numValues) {
    var seriesConfig = this.createSeriesConfig(i, /** @type {string} */(seriesType), void 0, fieldIndex);
    result.push(seriesConfig);
  }

  return result;
};


/**
 * Creates series config.
 * @param {number} index
 * @param {string} type Series type.
 * @param {string=} opt_id Series id.
 * @param {number=} opt_startFieldIndex Index of number to start from.
 * @return {Object}
 */
chartEditor.EditorModel.prototype.createSeriesConfig = function(index, type, opt_id, opt_startFieldIndex) {
  var config = {'ctor': type, 'mapping': {}};
  config['id'] = goog.isDef(opt_id) ? opt_id : goog.string.createUniqueString();

  var strings = goog.array.clone(this.fieldsState_.strings);
  var numbers = goog.array.clone(this.fieldsState_.numbers);
  if (this.model_['chart']['type'] === 'map') {
    var self = this;
    numbers = goog.array.filter(numbers, function(item) {
      return goog.array.indexOf(self.fieldsState_.coordinates, item) === -1;
    });
    this.fieldsState_.numbersCount = numbers.length;
  }

  var fields = chartEditor.EditorModel.Series[type]['fields'];

  for (var i = 0; i < fields.length; i++) {
    if (fields[i]['field'] === 'id' && this.fieldsState_.geoId) {
      config['mapping'][fields[i]['field']] = this.fieldsState_.geoId;

    } else if (this.fieldsState_.coordinates && (fields[i]['field'] === 'lat' || fields[i]['field'] === 'long')) {
      config['mapping'][fields[i]['field']] = (fields[i]['field'] === 'lat') ?
          this.fieldsState_.coordinates[0] :
          this.fieldsState_.coordinates[1];

    } else {
      var j = index + i + (goog.isNumber(opt_startFieldIndex) ? opt_startFieldIndex : 0);
      var numberIndex = numbers.length > j ? j : j % numbers.length;
      var stringIndex = strings.length > j ? j : j % strings.length;

      config['mapping'][fields[i]['field']] =
          (fields[i]['type'] === 'string' && strings.length) ?
              strings[stringIndex] :
              numbers[numberIndex];
    }
  }
  return config;
};


/**
 * Create default scales
 */
chartEditor.EditorModel.prototype.createDefaultStandalones = function() {
  this.model_['standalones'] = {};

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


/**
 * Checks if current mapping are not compatible with new chart and series types.
 *
 * @param {string} prevChartType
 * @param {string} prevSeriesType
 * @return {boolean} true if mappings are not compatible.
 */
chartEditor.EditorModel.prototype.needResetMappings = function(prevChartType, prevSeriesType) {
  var chartType = this.model_['chart']['type'];

  return (goog.array.indexOf(this.getChartTypeSettings()['series'], prevSeriesType) === -1) ||
      (prevChartType === 'stock' || chartType === 'stock') ||
      (prevChartType === 'map' || chartType === 'map') ||
      (prevChartType === 'heatMap' || chartType === 'heatMap') ||
      (prevChartType === 'treeMap' || chartType === 'treeMap') ||
      chartType === 'pie' || chartType === 'radar' || chartType === 'polar' ||
      prevChartType === 'pie' || prevChartType === 'radar' || prevChartType === 'polar';
};


/**
 * Checks if fields of two series types are compatible.
 *
 * @param {string} seriesType1
 * @param {string} seriesType2
 * @return {boolean} true if compatible
 */
chartEditor.EditorModel.prototype.checkSeriesFieldsCompatible = function(seriesType1, seriesType2) {
  var fields1 = chartEditor.EditorModel.Series[seriesType1]['fields'];
  var fields2 = chartEditor.EditorModel.Series[seriesType2]['fields'];
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


/** @private */
chartEditor.EditorModel.prototype.initGeoData_ = function() {
  var activeGeo = goog.isString(this.model_['dataSettings']['activeGeo']) ?
      this.model_['dataSettings']['activeGeo'].substring(1) :
      this.data_[this.getActive()].activeGeo;

  if (this.geoDataIndex_.length)
    this.loadGeoData_(activeGeo);
  else {
    this.dispatchEvent({
      type: chartEditor.events.EventType.WAIT,
      wait: true
    });

    var self = this;
    goog.net.XhrIo.send('https://cdn.anychart.com/anydata/geo/index.json',
        function(e) {
          var xhr = e.target;
          var indexJson = xhr.getResponseJson();
          if (indexJson['sets']) {
            for (var i in indexJson['sets']) {
              self.geoDataIndex_[indexJson['sets'][i]['id']] = indexJson['sets'][i];
            }
          }

          self.dispatchEvent({
            type: chartEditor.events.EventType.GEO_DATA_INDEX_LOADED,
            data: self.geoDataIndex_
          });

          self.loadGeoData_(activeGeo);

          self.dispatchEvent({
            type: chartEditor.events.EventType.WAIT,
            wait: false
          });
        });
  }
};


/**
 * @param {number=} opt_setId
 * @private
 */
chartEditor.EditorModel.prototype.loadGeoData_ = function(opt_setId) {
  var setId = goog.isDef(opt_setId) ? opt_setId : 0;
  var setFullId = chartEditor.EditorModel.DataType.GEO + setId;

  if (setFullId !== this.model_['dataSettings']['activeGeo'] || !this.data_[setFullId]) {
    this.dispatchEvent({
      type: chartEditor.events.EventType.WAIT,
      wait: true
    });

    var setUrl = 'https://cdn.anychart.com/geodata/1.2.0' + this.geoDataIndex_[setId]['data'];
    var self = this;
    goog.net.XhrIo.send(setUrl,
        function(e) {
          if (e.target.getStatus() === 200) {
            var json = e.target.getResponseJson();
            var dataType = chartEditor.EditorModel.DataType.GEO;
            self.addData({
              type: chartEditor.events.EventType.DATA_ADD,
              data: json,
              dataType: dataType,
              setId: setId,
              setFullId: dataType + setId,
              title: self.geoDataIndex_[setId]['name']
            });
          }

          self.dispatchEvent({
            type: chartEditor.events.EventType.WAIT,
            wait: false
          });
        });
  }
};


/** @return {?Array.<Object>} */
chartEditor.EditorModel.prototype.getGeoDataIndex = function() {
  return this.geoDataIndex_.length ? this.geoDataIndex_ : null;
};


/**@return {Object} */
chartEditor.EditorModel.prototype.getGeoDataInfo = function() {
  var result = {};
  if (this.geoDataIndex_ && this.model_['dataSettings']['activeGeo']) {
    var setId = Number(this.model_['dataSettings']['activeGeo'].substr(1));
    if (this.geoDataIndex_[setId]) {
      var url = this.geoDataIndex_[setId]['data'];
      var match = url.match(/\/(\w*)\.json/);
      if (match) {
        result['path'] = 'anychart.maps.' + match[1];
        result['url'] = 'https://cdn.anychart.com/geodata/1.2.0' + url.replace('json', 'js');
        result['geoIdField'] =  this.getGeoIdField();
      }
    }
  }
  return result;
};
// endregion


// region Public and controls callback functions
/**
 *
 * @param {Object} chart
 * @param {boolean} rebuild
 */
chartEditor.EditorModel.prototype.onChartDraw = function(chart, rebuild) {
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
chartEditor.EditorModel.prototype.callbackByString = function(methodName, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  this.callbacks_[methodName].apply(this, args);
};


/**
 * Drops all or some chart settings.
 * @param {(Object|string)=} opt_pattern Regular extperrion or string
 * @param {boolean=} opt_byValue Search by setting value. Is ignored if opt_pattern is undefined.
 */
chartEditor.EditorModel.prototype.dropChartSettings = function(opt_pattern, opt_byValue) {
  if (goog.isDef(opt_pattern)) {
    for (var key in this.model_['chart']['settings']) {
      var found = false;
      var testString = opt_byValue ? this.model_['chart']['settings'][key] : key;

      if (!opt_byValue || goog.isString(testString)) {
        if (typeof opt_pattern === 'object') {
          var r = new RegExp(/** @type {RegExp} */(opt_pattern));
          found = r.test(testString);
        } else
          found = testString.indexOf(opt_pattern) >= 0;
      }

      if (found)
        delete this.model_['chart']['settings'][key];
    }
  } else {
    this.model_['chart']['settings'] = {};
    this.model_['standalones'] = {};
    this.model_['editorSettings']['lockSeriesName'] = {};
    this.stackMode = false;
    this.resetContextMenuItems();

    this.applyDefaults();
  }
};


/**
 * Initializes default values for types selects.
 */
chartEditor.EditorModel.prototype.onChangeView = function() {
  if (this.generateInitialMappingsOnChangeView_) {
    this.generateInitialMappingsOnChangeView_ = false;
    this.getPreparedData();

    if (this.preparedData_.length > 0) {
      if (this.afterSetModel_) {
        // Use predefined model
        if (this.model_['chart']['type'] === 'map')
          this.initGeoData_();

        this.applyDefaults();

        this.analyzeDataBeforeChooseField_();
        this.analyzeDataAfterChooseField_();

        this.afterSetModel_ = false;

      } else {
        this.model_['chart']['type'] = null;
        this.chooseDatasetAndField();
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
chartEditor.EditorModel.prototype.addPlot = function() {
  var mapping = this.createPlotMapping();
  this.model_['dataSettings']['mappings'].push(mapping);
  this.dispatchUpdate();
};


/**
 * Drops plot mapping by index.
 * @param {number} index
 */
chartEditor.EditorModel.prototype.dropPlot = function(index) {
  if (index > 0 && this.model_['dataSettings']['mappings'].length > index) {
    this.dropChartSettings('plot(');
    goog.array.splice(this.model_['dataSettings']['mappings'], index, 1);
    this.dispatchUpdate();
  }
};


/**
 * Adds new series default mapping.
 * @param {number} plotIndex
 */
chartEditor.EditorModel.prototype.addSeries = function(plotIndex) {
  var mapping = this.createSeriesConfig(
      this.model_['dataSettings']['mappings'][plotIndex].length,
      /** @type {string} */(this.model_['chart']['seriesType']));

  this.model_['dataSettings']['mappings'][plotIndex].push(mapping);
  this.dispatchUpdate();
};


/**
 * Drops series mapping by plot and series index.
 * @param {number} plotIndex
 * @param {number} seriesIndex
 */
chartEditor.EditorModel.prototype.dropSeries = function(plotIndex, seriesIndex) {
  if (this.model_['dataSettings']['mappings'].length > plotIndex &&
      this.model_['dataSettings']['mappings'][plotIndex].length > seriesIndex) {

    var removedSeries = goog.array.splice(this.model_['dataSettings']['mappings'][plotIndex], seriesIndex, 1);
    var stringKey = this.chartTypeLike('gauges') ? 'getPointer' : 'getSeries';
    this.dropChartSettings(stringKey + '(\'' + removedSeries[0]['id'] + '\')');
    this.dispatchUpdate();
  }
};


/**
 * Callback function for change of active and field select.
 * @param {chartEditor.controls.select.Base} input
 */
chartEditor.EditorModel.prototype.setActiveAndField = function(input) {
  var selectValue = /** @type {Object} */(input.getValue());
  var field = selectValue.value;
  var active = selectValue.active;

  this.suspendDispatch();

  if (active !== this.model_['dataSettings']['active']) {
    this.model_['chart']['type'] = null;

    this.chooseDatasetAndField(active, field);
    this.chooseDefaultChartType();
    this.chooseDefaultSeriesType();
    this.createDefaultMappings();
    this.createDefaultStandalones();

    this.dispatchUpdate();

  } else if (field !== this.model_['dataSettings']['field']) {
    this.model_['dataSettings']['field'] = field;

    this.dispatchUpdate();
  }

  this.resumeDispatch();
};


/**
 * Callback function for change event of geo data select.
 * @param {chartEditor.controls.select.Base} input
 */
chartEditor.EditorModel.prototype.setActiveGeo = function(input) {
  var selectValue = /** @type {Object} */(input.getValue());
  var setId = Number(selectValue.value.substr(1));
  this.loadGeoData_(setId);
};


/**
 * Callback function for change event of chart type select.
 * @param {chartEditor.controls.select.Base} input
 */
chartEditor.EditorModel.prototype.setChartType = function(input) {
  var selectValue = /** @type {Object} */(input.getValue());
  var chartType = selectValue.value;
  var prevChartType = /** @type {string} */(this.model_['chart']['type']);
  this.model_['chart']['type'] = chartType;
  this.stackMode = selectValue.stackMode;
  var prevDefaultSeriesType = /** @type {string} */(this.model_['chart']['seriesType']);

  if (this.data_[this.model_['dataSettings']['active']].chartType &&
      this.data_[this.model_['dataSettings']['active']].chartType !== chartType) {
    this.setDefaults([]);
  }

  if (prevChartType === 'map') {
    delete this.data_[this.model_['dataSettings']['activeGeo']];
    this.preparedData_.length = 0;

  } else if (chartType === 'map') {
    this.initGeoData_();
  }

  if (prevDefaultSeriesType === 'mekko') {
    this.dropChartSettings('pointsPadding()');
  }

  // Drop scales settings anyway
  this.dropChartSettings(/^\w+cale\(\)/);
  this.model_['standalones'] = {};

  if (this.needResetMappings(prevChartType, prevDefaultSeriesType)) {
    this.chooseDatasetAndField(/** @type {string} */(this.model_['dataSettings']['active']));

    // set it again because it was reset in chooseDatasetAndField()
    this.stackMode = selectValue.stackMode;
    this.chooseDefaultSeriesType();

    this.createDefaultMappings();
    this.createDefaultStandalones();

  } else {
    // Update default series
    this.chooseDefaultSeriesType();
    this.createDefaultStandalones();

    for (var i = 0; i < this.model_['dataSettings']['mappings'].length; i++) {
      for (var j = 0; j < this.model_['dataSettings']['mappings'][i].length; j++) {
        var seriesConfig = this.model_['dataSettings']['mappings'][i][j];
        if (prevDefaultSeriesType === seriesConfig['ctor']) {
          if (this.checkSeriesFieldsCompatible(prevDefaultSeriesType, /** @type {string} */(this.model_['chart']['seriesType']))) {
            this.model_['dataSettings']['mappings'][i][j]['ctor'] = this.model_['chart']['seriesType'];
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
chartEditor.EditorModel.prototype.setStackMode = function(opt_stackMode) {
  this.dropChartSettings("stackMode(");
  this.stackMode = false;
  if (opt_stackMode) {
    if (this.model_['chart']['type'] !== 'stock') {
      this.setValue([['chart'], ['settings'], 'yScale().stackMode()'], opt_stackMode, true);
      this.stackMode = opt_stackMode;
    }
  }
};


/**
 * Callback function for change of series type select.
 * @param {chartEditor.controls.select.Base} input
 */
chartEditor.EditorModel.prototype.setSeriesType = function(input) {
  var key = input.getKey();
  var inputValue = /** @type {Object} */(input.getValue());
  var type = inputValue.value;
  var plotIndex = key[1][1]; // see SeriesPanel.getKey()
  var seriesIndex = key[2][0];

  if (this.model_['dataSettings']['mappings'][plotIndex][seriesIndex]['ctor'] !== type) {
    var oldConfig = this.model_['dataSettings']['mappings'][plotIndex][seriesIndex];
    this.model_['dataSettings']['mappings'][plotIndex][seriesIndex] = this.createSeriesConfig(seriesIndex, type, oldConfig['id']);
    this.dispatchUpdate();
  }
};


/**
 * Callback function for change of theme select.
 * @param {chartEditor.controls.select.Base} input
 */
chartEditor.EditorModel.prototype.setTheme = function(input) {
  delete this.model_['chart']['settings']['palette()'];
  var inputValue = input.getValue();
  this.setValue([['anychart'], 'theme()'], inputValue.value);
  this.dispatchUpdate();
};


/**
 * Callback function for change event of chart.labels().enabled()
 * @param {chartEditor.checkbox.Base} input
 */
chartEditor.EditorModel.prototype.setSettingForSeries = function(input) {

  var value = input.getChecked();
  this.suspendDispatch();

  if (!this.isChartSingleSeries()) {
    var chartType = this.model_['chart']['type'];
    var mappings = this.model_['dataSettings']['mappings'];
    var key = input.getKey();
    var stringKey = key[key.length - 1];

    var seriesId;
    for (var i = 0; i < mappings.length; i++) {
      for (var j = 0; j < mappings[i].length; j++) {
        seriesId = mappings[i][j]['id'];
        var stringKey2 = (chartType === 'stock' ? 'plot(' + i + ').' : '') + 'getSeries(\'' + seriesId + '\').' + stringKey;
        var key2 = [['chart'], ['settings'], stringKey2];
        this.setValue(key2, value);
      }
    }
  }

  this.setValue(input.getKey(), value);

  this.resumeDispatch();
};


/**
 * Reset this.contextMenuItems_ structure.
 */
chartEditor.EditorModel.prototype.resetContextMenuItems = function() {
  goog.object.map(this.contextMenuItems_, function(item) {
    item.enabled = true;
  });
};


/** @return {Object} */
chartEditor.EditorModel.prototype.contextMenuItems = function() {
  return this.contextMenuItems_;
};


/**
 * Callback function for contextMenu().itemsFormatter() setting
 * @param {chartEditor.checkbox.Base} input
 */
chartEditor.EditorModel.prototype.setContextMenuItemEnable = function(input) {
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
    this.model_['chart']['settings']['contextMenu().itemsFormatter()'] = 'function(items){\n' +
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
chartEditor.EditorModel.prototype.addAxis = function(opt_xOrY) {
  var index = -1;
  var pattern;
  var stringKey;
  if (goog.isDef(opt_xOrY))
    pattern = '^' + opt_xOrY + 'Axis\\((\\d+)\\)\\.enabled\\(\\)$';
  else
    pattern = '^' + 'axis\\((\\d+)\\)\\.enabled\\(\\)$';

  var regExp = new RegExp(pattern);
  for (var key in this.model_['chart']['settings']) {
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
chartEditor.EditorModel.prototype.dropAxis = function(index, opt_xOrY) {
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
chartEditor.EditorModel.prototype.addIndexedSetting = function(stringKeyBase, opt_asObjectKey) {
  var index = -1;
  var pattern;
  if (opt_asObjectKey)
    pattern = '^' + stringKeyBase + '\\((\\d+)\\)$';
  else
    pattern = '^' + stringKeyBase + '\\((\\d+)\\)\\.enabled\\(\\)$';

  var regExp = new RegExp(pattern);

  for (var key in this.model_['chart']['settings']) {
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
chartEditor.EditorModel.prototype.dropIndexedSetting = function(index, stringKeyBase) {
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
chartEditor.EditorModel.prototype.addStandalone = function(stringKeyBase, opt_fieldValues) {
  var standalones = this.getValue([['standalones'], stringKeyBase]) || [];
  var index = standalones.length;

  opt_fieldValues = opt_fieldValues || {};
  opt_fieldValues['name'] = opt_fieldValues['name'] || 'Scale ' + (index + 1);

  this.setValue([['standalones'], [stringKeyBase, index]], void 0);
  this.model_['standalones'][stringKeyBase][index] = opt_fieldValues;
  // Should dispatch because two previous lines do not do this
  this.dispatchUpdate();

  return index;
};


/**
 * Drops last standalone
 * @param {string} stringKeyBase 'range', 'scaleBar' etc
 */
chartEditor.EditorModel.prototype.dropStandalone = function(stringKeyBase) {
  var standalones = this.getValue([['standalones'], stringKeyBase]);
  var index = standalones.length - 1;

  var pattern = 'STANDALONE:' + stringKeyBase + ':' + index;
  this.dropChartSettings(pattern, true);
  this.removeByKey([['standalones'], [stringKeyBase, index]]);
};


/**
 * @param {chartEditor.EditorModel.Model} value
 */
chartEditor.EditorModel.prototype.setModel = function(value) {
  this.model_ = value;
  this.afterSetModel_ = true;
  this.dispatchUpdate();
};


/**
 * Sets anychart locale settings
 * @param {Object} values
 */
chartEditor.EditorModel.prototype.localization = function(values) {
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
chartEditor.EditorModel.prototype.loadLocales_ = function(locales) {
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
 * @param {chartEditor.EditorModel.Key} key
 * @param {*} value
 * @param {boolean=} opt_noDispatch
 * @param {boolean=} opt_noRebuildChart
 * @param {boolean=} opt_noRebuildMapping
 * @param {boolean=} opt_noOverride Write value only if key not exists.
 */
chartEditor.EditorModel.prototype.setValue = function(key, value, opt_noDispatch, opt_noRebuildChart, opt_noRebuildMapping, opt_noOverride) {
  var target = this.model_;
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
  // console.log(this.model_['chart']['settings']);
};


/**
 * Getter for input's value
 * @param {chartEditor.EditorModel.Key} key
 * @return {*} Input's value
 */
chartEditor.EditorModel.prototype.getValue = function(key) {
  var target = this.model_;
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
 * @param {chartEditor.EditorModel.Key} key
 * @param {boolean=} opt_noDispatch
 */
chartEditor.EditorModel.prototype.removeByKey = function(key, opt_noDispatch) {
  if (!key.length) return;

  var target = this.model_;
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
chartEditor.EditorModel.prototype.dispatchUpdate = function(opt_noRebuildChart, opt_noRebuildMapping, opt_lastKey) {
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
chartEditor.EditorModel.prototype.suspendDispatch = function() {
  this.suspendQueue_++;
};


/**
 * suspend queue minus one.
 * @param {boolean=} opt_skipDispatch
 */
chartEditor.EditorModel.prototype.resumeDispatch = function(opt_skipDispatch) {
  this.suspendQueue_--;
  if (this.suspendQueue_ === 0 && this.needDispatch_ && !opt_skipDispatch)
    this.dispatchUpdate();
};


/**
 * Converts string to valid model key.
 * @param {chartEditor.EditorModel.Key} key
 * @param {boolean=} opt_lastKey
 * @return {string} key as a string
 */
chartEditor.EditorModel.getStringKey = function(key, opt_lastKey) {
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

chartEditor.EditorModel.prototype.getStringKey = chartEditor.EditorModel.getStringKey;


/**
 * @return {Object}
 */
chartEditor.EditorModel.prototype.getModel = function() {
  return this.model_;
};


/**
 * @param {Array.<{key: chartEditor.EditorModel.Key, value: (string|boolean|Object) }>} values
 */
chartEditor.EditorModel.prototype.setDefaults = function(values) {
  this.defaults_ = values;
};


/**
 * Applies default setting to model without override existing settings.
 * @private
 */
chartEditor.EditorModel.prototype.applyDefaults = function() {
  for (var i = 0; i < this.defaults_.length; i++) {
    this.setValue(this.defaults_[i]['key'], this.defaults_[i]['value'], true, void 0, void 0, true);
  }
};
// endregion


// region Data Model
/**
 * @param {string} dataType
 * @param {string} setId
 * @return {string}
 */
chartEditor.EditorModel.prototype.getFullId = function(dataType, setId) {
  return dataType + setId;
};


/**
 * Add data set to data container.
 * @param {Object} data
 */
chartEditor.EditorModel.prototype.addData = function(data) {
  var dataType = data.dataType ? data.dataType : chartEditor.EditorModel.DataType.CUSTOM;
  var setId = goog.isDef(data.setId) ? data.setId : goog.string.createUniqueString();
  var setFullId = this.getFullId(dataType, setId);

  // Check if data set exists
  var existingData = null;
  if (dataType != chartEditor.EditorModel.DataType.GEO) {
    for (var i in this.data_) {
      if (this.data_[i].type == chartEditor.EditorModel.DataType.CUSTOM || this.data_[i].type == chartEditor.EditorModel.DataType.PREDEFINED) {
        existingData = this.data_[i];
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
    var confirm = new chartEditor.dialog.Confirm();
    confirm.setTitle('Remove previous data set?');
    confirm.setTextContent('You already have added data set. Remove it?');

    var self = this;
    goog.events.listen(confirm, goog.ui.Dialog.EventType.SELECT, function(e) {
      if (e.key == 'ok') {
        delete self.data_[existingData.setFullId];
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
 * Adds data set to this.data_ container.
 * If new data set is geo data, then removes old geo data.
 * @param {Object} dataSet Ready to use data structure in internal forma.
 */
chartEditor.EditorModel.prototype.addDataInternal = function(dataSet) {
  var setFullId = dataSet.setFullId;
  var dataType = dataSet.type;

  this.data_[setFullId] = dataSet;
  this.preparedData_.length = 0;

  if (dataType === chartEditor.EditorModel.DataType.GEO) {
    if (this.model_['dataSettings']['activeGeo'] !== setFullId) {
      delete this.data_[this.model_['dataSettings']['activeGeo']];
      this.model_['dataSettings']['activeGeo'] = setFullId;
      this.model_['dataSettings']['geoIdField'] = null;
    }

    if (!this.model_['dataSettings']['geoIdField']) {
      // Find geoIdField
      var rawData = this.getRawData(true);

      var dataRow = rawData['features'][0]['properties'];
      for (var i in dataRow) {
        if ((!this.model_['dataSettings']['geoIdField'] || i === 'id') && this.isGeoId_(dataRow[i])) {
          this.model_['dataSettings']['geoIdField'] = i;
        }
      }
    }
  } else {
    this.model_['dataSettings']['active'] = setFullId;
    this.generateInitialMappingsOnChangeView_ = true;
  }

  this.dispatchUpdate();
};

/**
 * Removes data set from data container.
 * @param {string} setFullId
 */
chartEditor.EditorModel.prototype.removeData = function(setFullId) {
  delete this.data_[setFullId];

  if (this.model_['dataSettings']['activeGeo'] && this.preparedData_.length === 2) {
    // Geo data should not be alone
    delete this.data_[this.model_['dataSettings']['activeGeo']];
  }

  this.preparedData_.length = 0;

  this.generateInitialMappingsOnChangeView_ = true;

  this.dispatchUpdate();
};


/**
 * @return {!Array.<string>}
 */
chartEditor.EditorModel.prototype.getDataKeys = function() {
  return goog.object.getKeys(this.data_);
};


/**
 * @param {string=} opt_setFullId
 * @return {Array}
 */
chartEditor.EditorModel.prototype.getPreparedData = function(opt_setFullId) {
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
chartEditor.EditorModel.prototype.getRawData = function(opt_activeGeo, opt_startIndex, opt_numRows) {
  var dataSet = this.data_[opt_activeGeo ? this.getActiveGeo() : this.getActive()];
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
chartEditor.EditorModel.prototype.getActive = function() {
  return this.model_['dataSettings']['active'];
};


/**
 * Getter for active geo data set id.
 * @return {?string}
 */
chartEditor.EditorModel.prototype.getActiveGeo = function() {
  return this.model_['dataSettings']['activeGeo'];
};


/**
 * Getter for count of data sets.
 * @return {number}
 */
chartEditor.EditorModel.prototype.getDataSetsCount = function() {
  return this.getPreparedData().length;
};


/**
 * Getter for geo id field.
 * @return {?string}
 */
chartEditor.EditorModel.prototype.getGeoIdField = function() {
  return this.model_['dataSettings']['geoIdField'];
};


/**
 * Returns JS code string that creates a configured chart.
 * @param {chartEditor.EditorModel.JavascriptOptions=} opt_options
 * @return {string}
 */
chartEditor.EditorModel.prototype.getChartAsJsCode = function(opt_options) {
  return this.getChartWithJsCode_(opt_options)[0];
};


/**
 * Returns configured chart in JSON representation.
 * @return {string}
 */
chartEditor.EditorModel.prototype.getChartAsJson = function() {
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
chartEditor.EditorModel.prototype.getChartAsXml = function() {
  var chart = this.getChartWithJsCode_()[1];
  return chart ? chart['toXml'](false) : '';
};


/**
 * Creates a chart instance from the model and the JS code string that creates the chart.
 * @param {chartEditor.EditorModel.JavascriptOptions=} opt_options Output options object.
 * @return {!Array} Returns [JsString, ChartInstance]
 * @private
 */
chartEditor.EditorModel.prototype.getChartWithJsCode_ = function(opt_options) {
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

  // Global settings
  if (!goog.object.isEmpty(settings['anychart'])) {
    result.push('// Applying global settings');
    goog.object.forEach(settings['anychart'], function(value, key) {
      // if (chartEditor.binding.testExec(anychartGlobal, key, value)) {
      result.push(self.printKey_(printer, 'anychart', key, value, minify));
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
        result.push(this.printKey_(printer, 'chart', 'geoIdField()', geoIdField));
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
        seriesCtor = chartEditor.EditorModel.Series[seriesCtor]['ctor'] || seriesCtor;
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
  var appliedScalesSettings = false;
  var standaloneInstances = {};

  goog.object.forEach(settings['standalones'], function(descriptors, sName) {
    var count = 0;
    for (var i = 0; i < descriptors.length; i++) {
      var descriptor = descriptors[i];
      if (!descriptor['locked'] && descriptor['type']) {
        var id = 'STANDALONE:' + sName + ':' + i;
        var instance = standaloneInstances[id] && standaloneInstances[id].instance;
        var instanceVarName = sName + count;
        var settingsString;

        if (!instance) {
          // Create instance
          if (!descriptor['key']) {
            // Standalone instance
            if(goog.object.containsValue(settings['chart']['settings'], id)) {
              var ctor = chartEditor.settings.scales.Base.descriptors[descriptor['type']].ctor;
              instance = /** @type {Object} */(chartEditor.binding.exec(anychartGlobal, ctor));

              if (instance)
                settingsString = 'var ' + instanceVarName + eq + 'anychart.' + ctor + ';';
            }

          } else if (descriptor['settings']) {
            // Native instance
            instance = /** @type {Object} */(chartEditor.binding.exec(chart, descriptor['key']));

            if (instance)
              settingsString = 'var ' + instanceVarName + eq + 'chart.' + descriptor['key'] + ';';
          }

          if (instance) {
            count++;
            if (!appliedScalesSettings) {
              appliedScalesSettings = true;
              result.push('// Applying scales settings');
            }

            result.push(settingsString);

            if (descriptor['settings']) {
              // Apply standalone instance settings
              goog.object.forEach(descriptor['settings'], function(sValue, sKey) {
                if (chartEditor.binding.testExec(instance, sKey, sValue)) {
                  var sSettingString = self.printKey_(printer, instanceVarName, sKey, sValue);
                  result.push(sSettingString);
                }
              });
            }

            standaloneInstances[id] = {instance: instance, name: instanceVarName};
          }
        }
      }
    }
  });

  if(appliedScalesSettings)
    result.push('');

  // Apply chart settings
  if (!goog.object.isEmpty(settings['chart']['settings'])) {
    result.push('// Applying appearance settings');

    var chartSettings;
    if (addMarkers) {
      // Sort settings by keys
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
          var sSettingString = self.printKey_(printer, 'chart', key, instanceVarName, true, true);
          result.push(sSettingString);
        }

        value = void 0;
      }

      if (goog.isDef(value) && chartEditor.binding.testExec(chart, key, value)) {
        var settingString = self.printKey_(printer, 'chart', key, value, goog.isString(value) || force, quotes);

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
        this.printKey_(printer, 'chart', 'container()', containerId),
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
 * @param {goog.format.JsonPrettyPrinter} printer
 * @param {string} prefix
 * @param {string} key
 * @param {*} value
 * @param {boolean=} opt_forceRawValue
 * @param {boolean=} opt_noQuotes
 * @return {string}
 * @private
 */
chartEditor.EditorModel.prototype.printKey_ = function(printer, prefix, key, value, opt_forceRawValue, opt_noQuotes) {
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
chartEditor.EditorModel.prototype.printValue_ = function(printer, value) {
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
chartEditor.EditorModel.prototype.getDataCode = function() {
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
chartEditor.EditorModel.prototype.indentCode = function(code, opt_numSpaces, opt_from, opt_to) {
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
chartEditor.EditorModel.prototype.prepareData_ = function() {
  var joinedSets = [];
  var singleSets = [];
  var geoSets = [];
  var dataSet;

  for (var i in this.data_) {
    if (this.data_.hasOwnProperty(i)) {
      dataSet = this.prepareDataSet_(this.data_[i]);

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
      } else if (dataSet.type === chartEditor.EditorModel.DataType.GEO) {
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
chartEditor.EditorModel.prototype.prepareDataSet_ = function(dataSet) {
  var result = {
    type: dataSet.type,
    setId: dataSet.setId,
    setFullId: dataSet.setFullId,
    title: dataSet.title,
    fieldNames: dataSet.fieldNames,
    fields: []
  };

  var row = dataSet.type === chartEditor.EditorModel.DataType.GEO ?
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

    var field = {
      key: key,
      name: name,
      type: typeof(row[key])
    };
    result.fields.push(field);
  }

  return result;
};
// endregion


/**
 * Is string looks like geo id string.
 *
 * @param {string} value
 * @return {boolean}
 * @private
 */
chartEditor.EditorModel.prototype.isGeoId_ = function(value) {
  var pattern = /^[A-z]{2,3}([\W_]([A-z]{2}|\d+))?$/;
  return Boolean(new RegExp(pattern).exec(value));
};


/**
 * Checks if setting is excluded for current chart type.
 * @param {string} stringKey
 * @return {boolean} true if excluded.
 */
chartEditor.EditorModel.prototype.checkSettingForExclusion = function(stringKey) {
  var excludes = this.getChartTypeSettings()['settingsExcludes'];
  return (excludes && goog.array.indexOf(excludes, stringKey) !== -1);
};


/**
 * Check if current chart type is single series.
 * @return {boolean}
 */
chartEditor.EditorModel.prototype.isChartSingleSeries = function() {
  var chartType = this.model_['chart']['type'];
  return Boolean(chartType) && Boolean(this.getChartTypeSettings()['singleSeries']);
};


/**
 * @return {string}
 */
chartEditor.EditorModel.prototype.getChartTypeKey = function() {
  var chartType = this.model_['chart']['type'];
  var chartTypeKey = this.model_['chart']['typeKey'];
  
  if (chartType !== chartTypeKey || chartEditor.EditorModel.ChartTypes[chartTypeKey]['value'] !== chartType) {
    if (this.stackMode) {
      chartTypeKey = chartType + '-stacked-' + this.stackMode;

    } else {
      var result = goog.object.filter(chartEditor.EditorModel.ChartTypes, function(item, key){
        return item['value'] === chartType || key === chartType;
      });
      if (goog.object.getCount(result))
        chartTypeKey = goog.object.getAnyKey(result);
    }

    this.model_['chart']['typeKey'] = chartTypeKey;
  }

  return chartTypeKey;
};


/**
 * Returns settings object for current chart type
 * @return {*}
 */
chartEditor.EditorModel.prototype.getChartTypeSettings = function() {
  var chartTypeKey = this.getChartTypeKey();
  return chartEditor.EditorModel.ChartTypes[chartTypeKey];
};


/**
 * Checks if chart type starts from string value
 * @param {string|Array.<string>} value
 * @return {boolean} true if so
 */
chartEditor.EditorModel.prototype.chartTypeLike = function(value) {
  if (goog.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      if (this.chartTypeLike(value[i]))
        return true;
    }
    return false;
  }

  var chartType = this.model_['chart']['type'];
  return chartType.indexOf(value) === 0;
};


//exports
(function() {
  var proto = chartEditor.EditorModel.prototype;
  proto['getValue'] = proto.getValue;
})();
