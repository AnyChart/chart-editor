goog.provide('chartEditor.model.Basic');

goog.require('chartEditor.model.Base');
goog.require('chartEditor.ui.appearanceTabs.ChartSpecific');
goog.require('chartEditor.ui.appearanceTabs.ChartTitle');
goog.require('chartEditor.ui.appearanceTabs.ContextMenu');
goog.require('chartEditor.ui.appearanceTabs.Credits');
goog.require('chartEditor.ui.appearanceTabs.DataLabels');
goog.require('chartEditor.ui.appearanceTabs.GeneralTheming');
goog.require('chartEditor.ui.appearanceTabs.Grids');
goog.require('chartEditor.ui.appearanceTabs.Legend');
goog.require('chartEditor.ui.appearanceTabs.Scales');
goog.require('chartEditor.ui.appearanceTabs.SeriesWithScales');
goog.require('chartEditor.ui.appearanceTabs.Tooltip');
goog.require('chartEditor.ui.appearanceTabs.axes.CartesianXAxes');
goog.require('chartEditor.ui.appearanceTabs.axes.CartesianYAxes');
goog.require('chartEditor.ui.panel.scales.Base');



/**
 * ditor Model for Basic Editor product.
 *
 * @constructor
 * @extends {chartEditor.model.Base}
 */
chartEditor.model.Basic = function() {
  chartEditor.model.Basic.base(this, 'constructor');

  /** @inheritDoc */
  this.appearanceTabs = [
    {
      name: chartEditor.enums.EditorTabs.THEMING,
      classFunc: chartEditor.ui.appearanceTabs.GeneralTheming,
      docsUrl: 'http://docs.anychart.stg/Appearance_Settings/Themes'
    },
    {
      name: chartEditor.enums.EditorTabs.SPECIFIC,
      classFunc: chartEditor.ui.appearanceTabs.ChartSpecific
    },
    {
      name: chartEditor.enums.EditorTabs.TITLE,
      classFunc: chartEditor.ui.appearanceTabs.ChartTitle,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/Title'
    },
    {
      name: chartEditor.enums.EditorTabs.LEGEND,
      classFunc: chartEditor.ui.appearanceTabs.Legend,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/Legend/Basic_Settings'
    },
    {
      name: chartEditor.enums.EditorTabs.DATA_LABELS,
      classFunc: chartEditor.ui.appearanceTabs.DataLabels,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/Labels'
    },
    {
      name: chartEditor.enums.EditorTabs.SERIES,
      classFunc: chartEditor.ui.appearanceTabs.SeriesWithScales,
      docsUrl: 'https://api.anychart.com/anychart.core.SeriesBase'
    },
    {
      name: chartEditor.enums.EditorTabs.SCALES,
      classFunc: chartEditor.ui.appearanceTabs.Scales,
      docsUrl: 'http://docs.anychart.stg/Axes_and_Grids/Scales'
    },
    {
      name: chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      classFunc: chartEditor.ui.appearanceTabs.axes.CartesianXAxes,
      docsUrl: 'http://docs.anychart.stg/Axes_and_Grids/Axis_Basics'
    },
    {
      name: chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      classFunc: chartEditor.ui.appearanceTabs.axes.CartesianYAxes,
      docsUrl: 'http://docs.anychart.stg/Axes_and_Grids/Axis_Basics'
    },
    {
      name: chartEditor.enums.EditorTabs.TOOLTIP,
      classFunc: chartEditor.ui.appearanceTabs.Tooltip,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/Tooltip'
    },
    {
      name: chartEditor.enums.EditorTabs.GRIDS,
      classFunc: chartEditor.ui.appearanceTabs.Grids,
      docsUrl: 'http://docs.anychart.stg/Axes_and_Grids/Axis_Basics#grids'
    },
    {
      name: chartEditor.enums.EditorTabs.CONTEXT_MENU,
      classFunc: chartEditor.ui.appearanceTabs.ContextMenu,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/UI_Controls/Context_Menu'
    },
    {
      name: chartEditor.enums.EditorTabs.CREDITS,
      classFunc: chartEditor.ui.appearanceTabs.Credits,
      docsUrl: 'http://docs.anychart.stg/Quick_Start/Credits'
    }
  ];
};
goog.inherits(chartEditor.model.Basic, chartEditor.model.Base);


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
chartEditor.model.Series['area'] = {
  'fields': [{'field': 'value', 'name': 'Y Value'}]
};
chartEditor.model.Series['splineArea'] = {
  'name': 'Spline Area',
  'fields': [{'field': 'value', 'name': 'Y Value'}]
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
chartEditor.model.Series['pie'] = {
  'fields': [{'field': 'value', 'name': 'Value'}]
};


chartEditor.model.ChartTypes['line'].product = chartEditor.model.Product.BASIC;
chartEditor.model.ChartTypes['column'].product = chartEditor.model.Product.BASIC;
chartEditor.model.ChartTypes['column-stacked-value'].product = chartEditor.model.Product.BASIC;
chartEditor.model.ChartTypes['column-stacked-percent'].product = chartEditor.model.Product.BASIC;
chartEditor.model.ChartTypes['pie'].product = chartEditor.model.Product.BASIC;
chartEditor.model.ChartTypes['pie'].excludedPanels = [
  chartEditor.enums.EditorTabs.SERIES,
  chartEditor.enums.EditorTabs.GRIDS,
  chartEditor.enums.EditorTabs.CARTESIAN_AXES,
  chartEditor.enums.EditorTabs.SCALES
];
// endregion


// region Model initialization
/** @inheritDoc */
chartEditor.model.Basic.prototype.chooseDefaultChartType = function() {
  chartEditor.model.Basic.base(this, 'chooseDefaultChartType');

  var chartType = this.model['chart']['type'];
  if (!chartType) {
    chartType = 'line';
    var rawData = this.getRawData();
    if (this.model['dataSettings']['field'] === this.fieldsState.date_short) {
      chartType = 'column';

      if (this.fieldsState.numbersCount > 3)
        this.setStackMode('value');

    } else if (this.model['dataSettings']['field'] === this.fieldsState.firstString && rawData.length <= 5 && this.fieldsState.numbersCount === 1) {
      chartType = 'pie';
    }
  }

  this.model['chart']['type'] = chartType;
};


/** @inheritDoc */
chartEditor.model.Basic.prototype.chooseDefaultSeriesType = function() {
  chartEditor.model.Basic.base(this, 'chooseDefaultSeriesType');

  if (!this.model['chart']['seriesType'])
    this.model['chart']['seriesType'] = this.getChartTypeSettings()['series'][0];
};


/** @inheritDoc */
chartEditor.model.Basic.prototype.createDefaultPlotMappings = function() {
  var result = [];
  var seriesType = this.model['chart']['seriesType'];
  var numValues;
  var numSeries;

  numValues = 1;

  if (seriesType == 'pie')
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
chartEditor.model.Basic.prototype.createDefaultSeriesMapping = function(index, type, opt_id, opt_startFieldIndex) {
  var config = {'ctor': type, 'mapping': {}};
  config['id'] = goog.isDef(opt_id) ? opt_id : goog.string.createUniqueString();

  var strings = goog.array.clone(this.fieldsState.strings);
  var numbers = goog.array.clone(this.fieldsState.numbers);
  var fields = chartEditor.model.Series[type]['fields'];

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
// endregion


/** @inheritDoc */
chartEditor.model.Basic.prototype.needResetMappings = function(prevChartType, prevSeriesType) {
  var chartType = this.model['chart']['type'];

  return (goog.array.indexOf(this.getChartTypeSettings()['series'], prevSeriesType) === -1) ||
      chartType === 'pie' || prevChartType === 'pie';
};


/** @inheritDoc */
chartEditor.model.Basic.prototype.createScaleByType = function(scaleType) {
  var anychart = /** @type {Object} */(goog.dom.getWindow()['anychart']);
  var ctor = chartEditor.ui.panel.scales.Base.descriptors[scaleType].ctor;
  return /** @type {Object} */(chartEditor.binding.exec(anychart, ctor));
};


/** @inheritDoc */
chartEditor.model.Basic.prototype.getStandalonesJsCode = function(chart, printer, eq, settings, standaloneInstances) {
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
