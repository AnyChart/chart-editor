goog.provide('chartEditor.model.Chart');

goog.require('chartEditor.model.Base');
goog.require('chartEditor.ui.appearanceTabs.ChartLabels');
goog.require('chartEditor.ui.appearanceTabs.ChartSpecific');
goog.require('chartEditor.ui.appearanceTabs.ChartTitle');
goog.require('chartEditor.ui.appearanceTabs.CircularRanges');
goog.require('chartEditor.ui.appearanceTabs.ColorRange');
goog.require('chartEditor.ui.appearanceTabs.ColorScale');
goog.require('chartEditor.ui.appearanceTabs.ContextMenu');
goog.require('chartEditor.ui.appearanceTabs.Credits');
goog.require('chartEditor.ui.appearanceTabs.DataLabels');
goog.require('chartEditor.ui.appearanceTabs.DropOff');
goog.require('chartEditor.ui.appearanceTabs.Flow');
goog.require('chartEditor.ui.appearanceTabs.GeneralTheming');
goog.require('chartEditor.ui.appearanceTabs.Grids');
goog.require('chartEditor.ui.appearanceTabs.Legend');
goog.require('chartEditor.ui.appearanceTabs.Node');
goog.require('chartEditor.ui.appearanceTabs.Pointers');
goog.require('chartEditor.ui.appearanceTabs.ScaleBars');
goog.require('chartEditor.ui.appearanceTabs.Scales');
goog.require('chartEditor.ui.appearanceTabs.SeriesWithScales');
goog.require('chartEditor.ui.appearanceTabs.Tooltip');
goog.require('chartEditor.ui.appearanceTabs.axes.CartesianXAxes');
goog.require('chartEditor.ui.appearanceTabs.axes.CartesianYAxes');
goog.require('chartEditor.ui.appearanceTabs.axes.GaugeAxes');
goog.require('chartEditor.ui.appearanceTabs.axes.RadarPolarXAxis');
goog.require('chartEditor.ui.appearanceTabs.axes.RadarPolarYAxis');
goog.require('chartEditor.ui.panel.scales.Base');



/**
 * ditor Model for Chart Editor product.
 *
 * @constructor
 * @extends {chartEditor.model.Base}
 */
chartEditor.model.Chart = function() {
  chartEditor.model.Chart.base(this, 'constructor');

  /** @inheritDoc */
  this.appearanceTabs = [
    {
      name: chartEditor.enums.EditorTabs.THEMING,
      classFunc: chartEditor.ui.appearanceTabs.GeneralTheming,
      docsUrl: 'http://docs.anychart.com/Appearance_Settings/Themes'
    },
    {
      name: chartEditor.enums.EditorTabs.SPECIFIC,
      classFunc: chartEditor.ui.appearanceTabs.ChartSpecific
    },
    {
      name: chartEditor.enums.EditorTabs.TITLE,
      classFunc: chartEditor.ui.appearanceTabs.ChartTitle,
      docsUrl: 'http://docs.anychart.com/Common_Settings/Title'
    },
    {
      name: chartEditor.enums.EditorTabs.CHART_LABELS,
      classFunc: chartEditor.ui.appearanceTabs.ChartLabels
    },
    {
      name: chartEditor.enums.EditorTabs.LEGEND,
      classFunc: chartEditor.ui.appearanceTabs.Legend,
      docsUrl: 'http://docs.anychart.com/Common_Settings/Legend/Basic_Settings'
    },
    {
      name: chartEditor.enums.EditorTabs.DATA_LABELS,
      classFunc: chartEditor.ui.appearanceTabs.DataLabels,
      docsUrl: 'http://docs.anychart.com/Common_Settings/Labels'
    },
    {
      name: chartEditor.enums.EditorTabs.SERIES,
      classFunc: chartEditor.ui.appearanceTabs.SeriesWithScales,
      docsUrl: 'https://api.anychart.com/anychart.core.SeriesBase'
    },
    {
      name: chartEditor.enums.EditorTabs.POINTERS,
      classFunc: chartEditor.ui.appearanceTabs.Pointers
    },
    {
      name: chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      classFunc: chartEditor.ui.appearanceTabs.CircularRanges
    },
    {
      name: chartEditor.enums.EditorTabs.FLOW,
      classFunc: chartEditor.ui.appearanceTabs.Flow
    },
    {
      name: chartEditor.enums.EditorTabs.NODE,
      classFunc: chartEditor.ui.appearanceTabs.Node
    },
    {
      name: chartEditor.enums.EditorTabs.DROP_OFF,
      classFunc: chartEditor.ui.appearanceTabs.DropOff
    },
    {
      name: chartEditor.enums.EditorTabs.SCALE_BARS,
      classFunc: chartEditor.ui.appearanceTabs.ScaleBars
    },
    {
      name: chartEditor.enums.EditorTabs.SCALES,
      classFunc: chartEditor.ui.appearanceTabs.Scales,
      docsUrl: 'http://docs.anychart.com/Axes_and_Grids/Scales'
    },
    {
      name: chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      classFunc: chartEditor.ui.appearanceTabs.axes.CartesianXAxes,
      docsUrl: 'http://docs.anychart.com/Axes_and_Grids/Axis_Basics'
    },
    {
      name: chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      classFunc: chartEditor.ui.appearanceTabs.axes.CartesianYAxes,
      docsUrl: 'http://docs.anychart.com/Axes_and_Grids/Axis_Basics'
    },
    {
      name: chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      classFunc: chartEditor.ui.appearanceTabs.axes.RadarPolarXAxis,
      docsUrl: 'http://docs.anychart.com/Axes_and_Grids/Axis_Basics'
    },
    {
      name: chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      classFunc: chartEditor.ui.appearanceTabs.axes.RadarPolarYAxis,
      docsUrl: 'http://docs.anychart.com/Axes_and_Grids/Axis_Basics'
    },
    {
      name: chartEditor.enums.EditorTabs.GAUGE_AXES,
      classFunc: chartEditor.ui.appearanceTabs.axes.GaugeAxes,
      docsUrl: 'http://docs.anychart.com/Gauges/Linear_Gauge#scales_and_axes'
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
      name: chartEditor.enums.EditorTabs.COLOR_SCALE,
      classFunc: chartEditor.ui.appearanceTabs.ColorScale,
      docsUrl: 'http://docs.anychart.com/Basic_Charts/Heat_Map_Chart#color_scale'
    },
    {
      name: chartEditor.enums.EditorTabs.COLOR_RANGE,
      classFunc: chartEditor.ui.appearanceTabs.ColorRange,
      docsUrl: 'http://api.anychart.com/v8/anychart.core.ui.ColorRange'
    },
    {
      name: chartEditor.enums.EditorTabs.CONTEXT_MENU,
      classFunc: chartEditor.ui.appearanceTabs.ContextMenu,
      docsUrl: 'http://docs.anychart.com/Common_Settings/UI_Controls/Context_Menu'
    },
    {
      name: chartEditor.enums.EditorTabs.CREDITS,
      classFunc: chartEditor.ui.appearanceTabs.Credits,
      docsUrl: 'http://docs.anychart.com/Quick_Start/Credits'
    }
  ];
};
goog.inherits(chartEditor.model.Chart, chartEditor.model.Base);


// region Structures
chartEditor.model.Series['line'] = {
  'fields': [{'field': 'value', 'name': 'Y Value'}]
};
chartEditor.model.Series['spline'] = {
  'fields': [{'field': 'value', 'name': 'Y Value'}]
};
chartEditor.model.Series['column'] = {
  'fields': [{'field': 'value', 'name': 'Y Value'}]
};
chartEditor.model.Series['bar'] = {
  'fields': [{'field': 'value', 'name': 'Y Value'}]
};
chartEditor.model.Series['area'] = {
  'fields': [{'field': 'value', 'name': 'Y Value'}]
};
chartEditor.model.Series['splineArea'] = {
  'name': 'Spline Area',
  'fields': [{'field': 'value', 'name': 'Y Value'}]
};
chartEditor.model.Series['polygon'] = {
  'fields': [{'field': 'value', 'name': 'Y Value'}]
};
chartEditor.model.Series['polyline'] = {
  'fields': [{'field': 'value', 'name': 'Y Value'}]
};
chartEditor.model.Series['rangeColumn'] = {
  'name': 'Range Column',
  'fields': [
    {'field': 'high', 'name': 'High'},
    {'field': 'low', 'name': 'Low'}
  ]
};
chartEditor.model.Series['waterfall'] = {
  'name': 'Waterfall',
  'fields': [
    {'field': 'value', 'name': 'Value'}
  ]
};
chartEditor.model.Series['ohlc'] = {
  'fields': [
    {'field': 'open', 'name': 'Open Value'},
    {'field': 'high', 'name': 'High Value'},
    {'field': 'low', 'name': 'Low Value'},
    {'field': 'close', 'name': 'Close Value'}]
};
chartEditor.model.Series['candlestick'] = {
  'fields': [
    {'field': 'open'},
    {'field': 'high'},
    {'field': 'low'},
    {'field': 'close'}]
};
chartEditor.model.Series['box'] = {
  'fields': [
    {'field': 'lowest'},
    {'field': 'q1'},
    {'field': 'median'},
    {'field': 'q3'},
    {'field': 'highest'},
    {'field': 'value'},
    {'field': 'outliers'}]
};
chartEditor.model.Series['marker'] = {
  'fields': [{'field': 'value', 'name': 'Value'}]
};
chartEditor.model.Series['bubble'] = {
  'fields': [
    {'field': 'value', 'name': 'Value'},
    {'field': 'size', 'name': 'Size'}]
};
chartEditor.model.Series['heatMap'] = {
  'fields': [
    {'field': 'y', 'name': 'Y Value', 'type': 'string'},
    {'field': 'heat', 'name': 'Heat'}
  ]
};
chartEditor.model.Series['mekko'] = {
  'fields': [{'field': 'value', 'name': 'Y Value'}]
};
chartEditor.model.Series['pie'] = {
  'fields': [{'field': 'value', 'name': 'Value'}]
};
chartEditor.model.Series['sankey'] = {
  'fields': [
    {'field': 'from', 'name': 'From', 'type': 'string'},
    {'field': 'to', 'name': 'To', 'type': 'string'},
    {'field': 'weight', 'name': 'Weight'}]
};
chartEditor.model.Series['funnel'] = {
  'fields': [{'field': 'value', 'name': 'Value'}]
};
chartEditor.model.Series['treeMap'] = {
  'fields': [
    {'field': 'parent', 'name': 'Parent', 'type': 'string'},
    {'field': 'name', 'name': 'Name', 'type': 'string'},
    {'field': 'value', 'name': 'Value'}
  ]
};
chartEditor.model.Series['gauges.bar'] = {
  'ctor': 'bar',
  'name': 'Bar',
  'fields': [{'field': 'value', 'name': 'Value'}]
};
chartEditor.model.Series['gauges.marker'] = {
  'ctor': 'marker',
  'name': 'Marker',
  'fields': [{'field': 'value', 'name': 'Value'}]
};
chartEditor.model.Series['needle'] = {
  'fields': [{'field': 'value', 'name': 'Value'}]
};
chartEditor.model.Series['knob'] = {
  'fields': [{'field': 'value', 'name': 'Value'}]
};
chartEditor.model.Series['linearGauge.bar'] = {
  'ctor': 'bar',
  'name': 'Bar',
  'fields': [{'field': 'value', 'name': 'Value'}]
};
chartEditor.model.Series['linearGauge.led'] = {
  'ctor': 'led',
  'name': 'Led',
  'fields': [{'field': 'value', 'name': 'Value'}]
};
chartEditor.model.Series['linearGauge.tank'] = {
  'ctor': 'tank',
  'name': 'Tank',
  'fields': [{'field': 'value', 'name': 'Value'}]
};
chartEditor.model.Series['linearGauge.thermometer'] = {
  'ctor': 'thermometer',
  'name': 'Thermometer',
  'fields': [{'field': 'value', 'name': 'Value'}]
};
chartEditor.model.Series['linearGauge.marker'] = {
  'ctor': 'marker',
  'name': 'Marker',
  'fields': [{'field': 'value', 'name': 'Value'}]
};
chartEditor.model.Series['linearGauge.rangeBar'] = {
  'ctor': 'rangeBar',
  'name': 'Range Bar',
  'fields': [
    {'field': 'low', 'name': 'Low'},
    {'field': 'high', 'name': 'High'}
  ]
};
chartEditor.model.Series['tagCloud'] = {
  'name': 'tagCloud',
  'fields': [
    {'field': 'value'},
    {'field': 'category', 'type': 'string'}
  ]
};


chartEditor.model.ExcludedPanelsForCharts.push({
  chartTypes: [
    chartEditor.enums.ChartType.LINE,
    chartEditor.enums.ChartType.AREA,
    chartEditor.enums.ChartType.AREA_STACKED_VALUE,
    chartEditor.enums.ChartType.AREA_STACKED_PERCENT,

    chartEditor.enums.ChartType.BAR,
    chartEditor.enums.ChartType.BAR_STACKED_VALUE,
    chartEditor.enums.ChartType.BAR_STACKED_PERCENT,

    chartEditor.enums.ChartType.COLUMN,
    chartEditor.enums.ChartType.COLUMN_STACKED_VALUE,
    chartEditor.enums.ChartType.COLUMN_STACKED_PERCENT,

    chartEditor.enums.ChartType.SCATTER,
    chartEditor.enums.ChartType.WATERFALL,
    chartEditor.enums.ChartType.PIE,
    chartEditor.enums.ChartType.FUNNEL,
    chartEditor.enums.ChartType.BOX,

    chartEditor.enums.ChartType.MEKKO,
    chartEditor.enums.ChartType.BARMEKKO,
    chartEditor.enums.ChartType.MOSAIC,

    chartEditor.enums.ChartType.SANKEY,

    chartEditor.enums.ChartType.GAUGES_CIRCULAR,
    chartEditor.enums.ChartType.GAUGES_LINEAR,
    chartEditor.enums.ChartType.GAUGES_LINEAR_LED,
    chartEditor.enums.ChartType.GAUGES_LINEAR_TANK,
    chartEditor.enums.ChartType.GAUGES_LINEAR_THERMOMETER
  ],
  panels: [
    chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
    chartEditor.enums.EditorTabs.COLOR_SCALE,
    chartEditor.enums.EditorTabs.COLOR_RANGE
  ]
});
chartEditor.model.ExcludedPanelsForCharts.push({
  chartTypes: [
    chartEditor.enums.ChartType.POLAR,
    chartEditor.enums.ChartType.RADAR,
    chartEditor.enums.ChartType.RADAR_STACKED_VALUE,
    chartEditor.enums.ChartType.RADAR_STACKED_PERCENT
  ],
  panels: [
    chartEditor.enums.EditorTabs.CARTESIAN_AXES,
    chartEditor.enums.EditorTabs.COLOR_SCALE,
    chartEditor.enums.EditorTabs.COLOR_RANGE
  ]
});
chartEditor.model.ExcludedPanelsForCharts.push({
  chartTypes: [
    chartEditor.enums.ChartType.PIE,
    chartEditor.enums.ChartType.FUNNEL,
    chartEditor.enums.ChartType.TREEMAP,
    chartEditor.enums.ChartType.SANKEY,
    chartEditor.enums.ChartType.TAG_CLOUD,
    chartEditor.enums.ChartType.GAUGES_CIRCULAR
  ],
  panels: [
    chartEditor.enums.EditorTabs.SERIES,
    chartEditor.enums.EditorTabs.GRIDS,
    chartEditor.enums.EditorTabs.CARTESIAN_AXES,
    chartEditor.enums.EditorTabs.SCALES
  ]
});
chartEditor.model.ExcludedPanelsForCharts.push({
  chartTypes: [
    chartEditor.enums.ChartType.GAUGES_LINEAR,
    chartEditor.enums.ChartType.GAUGES_LINEAR_LED,
    chartEditor.enums.ChartType.GAUGES_LINEAR_TANK,
    chartEditor.enums.ChartType.GAUGES_LINEAR_THERMOMETER
  ],
  panels: [
    chartEditor.enums.EditorTabs.SERIES,
    chartEditor.enums.EditorTabs.GRIDS,
    chartEditor.enums.EditorTabs.CARTESIAN_AXES,
    chartEditor.enums.EditorTabs.DATA_LABELS,
    chartEditor.enums.EditorTabs.CIRCULAR_RANGES
  ]
});
chartEditor.model.ExcludedPanelsForCharts.push({
  chartTypes: [
    chartEditor.enums.ChartType.MEKKO,
    chartEditor.enums.ChartType.BARMEKKO,
    chartEditor.enums.ChartType.MOSAIC
  ],
  panels: [
    chartEditor.enums.EditorTabs.GRIDS
  ]
});

(function() {
  for (var typeName in chartEditor.model.ChartTypes) {
    var typeDescriptor = chartEditor.model.ChartTypes[typeName];
    if (typeDescriptor.product == chartEditor.model.Product.CHART) {
      for (var i = 0; i < chartEditor.model.ExcludedPanelsForCharts.length; i++) {
        if (goog.array.indexOf(chartEditor.model.ExcludedPanelsForCharts[i].chartTypes, typeName) != -1) {
          typeDescriptor.excludedPanels = goog.array.concat(
              goog.isDef(typeDescriptor.excludedPanels) ? typeDescriptor.excludedPanels : [],
              chartEditor.model.ExcludedPanelsForCharts[i].panels);
        }
      }
    }
  }
})();


chartEditor.model.SpecificPanelsForCharts.push({
  chartTypes: [chartEditor.enums.ChartType.SANKEY],
  panels: [
    chartEditor.enums.EditorTabs.NODE,
    chartEditor.enums.EditorTabs.FLOW,
    chartEditor.enums.EditorTabs.DROP_OFF
  ]
}, {
  chartTypes: [chartEditor.enums.ChartType.GAUGES_CIRCULAR],
  panels: [
    chartEditor.enums.EditorTabs.CHART_LABELS
  ]
});
chartEditor.model.SpecificPanelsForCharts.push({
  chartTypes: [
    chartEditor.enums.ChartType.GAUGES_LINEAR,
    chartEditor.enums.ChartType.GAUGES_LINEAR_LED,
    chartEditor.enums.ChartType.GAUGES_LINEAR_TANK,
    chartEditor.enums.ChartType.GAUGES_LINEAR_THERMOMETER,
    chartEditor.enums.ChartType.GAUGES_CIRCULAR],
  panels: [
    chartEditor.enums.EditorTabs.GAUGE_AXES,
    chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
    chartEditor.enums.EditorTabs.SCALE_BARS,
    chartEditor.enums.EditorTabs.POINTERS
  ]
});

(function() {
  for (var typeName in chartEditor.model.ChartTypes) {
    var typeDescriptor = chartEditor.model.ChartTypes[typeName];
    if (typeDescriptor.product == chartEditor.model.Product.CHART) {
      for (var i = 0; i < chartEditor.model.SpecificPanelsForCharts.length; i++) {
        if (goog.array.indexOf(chartEditor.model.SpecificPanelsForCharts[i].chartTypes, typeName) == -1) {
          typeDescriptor.excludedPanels = goog.array.concat(
              goog.isDef(typeDescriptor.excludedPanels) ? typeDescriptor.excludedPanels : [],
              chartEditor.model.SpecificPanelsForCharts[i].panels);
        }
      }
    }
  }
})();
// endregion


// region Model initialization
/** @inheritDoc */
chartEditor.model.Chart.prototype.chooseDefaultChartType = function() {
  chartEditor.model.Chart.base(this, 'chooseDefaultChartType');

  var chartType = this.model['chart']['type'];
  if (!chartType) {
    chartType = 'line';
    var rawData = this.getRawData();
    var dataLength = goog.isFunction(rawData['mapAs']) ? rawData['getRowsCount']() : rawData.length;
    if (this.model['dataSettings']['field'] === this.fieldsState.date_short) {
      chartType = 'column';

      if (this.fieldsState.numbersCount > 3)
        this.setStackMode('value');

    } else if (this.model['dataSettings']['field'] === this.fieldsState.firstString) {
      if (dataLength.length <= 5 && this.fieldsState.numbersCount === 1)
        chartType = 'pie';
      else if (this.fieldsState.numbersCount <= 3)
        chartType = 'bar';
      else if (this.fieldsState.numbersCount <= 5) {
        chartType = 'bar';
        this.setStackMode('value');
      }
    } else
      chartType = 'scatter';
  }

  this.model['chart']['type'] = chartType;
};


/** @inheritDoc */
chartEditor.model.Chart.prototype.chooseDefaultSeriesType = function() {
  chartEditor.model.Chart.base(this, 'chooseDefaultSeriesType');

  var seriesType = this.model['chart']['seriesType'];
  if (!seriesType) {
    if (this.getChartTypeKey() == 'scatter') {
      if (!(this.fieldsState.numbersCount % 2))
        seriesType = 'bubble';
      else
        seriesType = 'marker';
    } else
      seriesType = this.getChartTypeSettings()['series'][0];
  }

  this.model['chart']['seriesType'] = seriesType;
};


/** @inheritDoc */
chartEditor.model.Chart.prototype.createDefaultPlotMappings = function() {
  var result = [];
  var seriesType = this.model['chart']['seriesType'];
  var numValues;
  var numSeries;

  if (seriesType === 'bubble')
    numValues = 2;
  else
    numValues = 1;

  if (this.isChartSingleSeries() || this.chartTypeLike(['box', 'gauges']))
    numSeries = 1;
  else
    numSeries = Math.floor(this.fieldsState.numbersCount / numValues);

  for (var i = 0; i < numSeries; i += numValues) {
    var seriesConfig = this.createDefaultSeriesMapping(i, /** @type {string} */(seriesType));
    result.push(seriesConfig);
  }

  return result;
};


/** @inheritDoc */
chartEditor.model.Chart.prototype.createDefaultSeriesMapping = function(index, type, opt_id, opt_startFieldIndex) {
  var config = {'ctor': type, 'mapping': {}};
  config['id'] = goog.isDef(opt_id) ? opt_id : goog.string.createUniqueString();

  var strings = goog.array.clone(this.fieldsState.strings);
  var numbers = goog.array.clone(this.fieldsState.numbers);
  var fields = chartEditor.model.Series[type]['fields'];

  for (var i = 0; i < fields.length; i++) {
    if (fields[i]['field'] === 'from') { // for Sankey
      config['mapping'][fields[i]['field']] = this.fieldsState.firstString;
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
// endregion


/** @inheritDoc */
chartEditor.model.Chart.prototype.needResetMappings = function(prevChartType, prevSeriesType) {
  var chartType = this.model['chart']['type'];

  return (goog.array.indexOf(this.getChartTypeSettings()['series'], prevSeriesType) === -1) ||
      (prevChartType === 'heatMap' || chartType === 'heatMap') ||
      (prevChartType === 'treeMap' || chartType === 'treeMap') ||
      chartType === 'pie' || chartType === 'radar' || chartType === 'polar' ||
      prevChartType === 'pie' || prevChartType === 'radar' || prevChartType === 'polar';
};


/** @inheritDoc */
chartEditor.model.Chart.prototype.createScaleByType = function(scaleType) {
  var anychart = /** @type {Object} */(goog.dom.getWindow()['anychart']);
  var ctor = chartEditor.ui.panel.scales.Base.descriptors[scaleType].ctor;
  return /** @type {Object} */(chartEditor.binding.exec(anychart, ctor));
};


/** @inheritDoc */
chartEditor.model.Chart.prototype.getStandalonesJsCode = function(chart, printer, eq, settings, standaloneInstances) {
  var anychartGlobal = /** @type {Object} */(goog.dom.getWindow()['anychart']);
  var result = [];
  var appliedScalesSettings = false;
  var self = this;

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
              var ctor = chartEditor.ui.panel.scales.Base.descriptors[descriptor['type']].ctor;
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
              result.push('// Applying scales panel');
            }

            result.push(settingsString);

            if (descriptor['settings']) {
              // Apply standalone instance panel
              goog.object.forEach(descriptor['settings'], function(sValue, sKey) {
                if (chartEditor.binding.testExec(instance, sKey, sValue)) {
                  var sSettingString = self.printKey(printer, instanceVarName, sKey, sValue);
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

  return result;
};


/** @inheritDoc */
chartEditor.model.Gantt.prototype.preprocessMapping = function(mappingObj) {
  if (this.model['chart']['type'] === 'treeMap')
    mappingObj['id'] = settings['dataSettings']['field'];
  return mappingObj;
};
