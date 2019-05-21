goog.provide('chartEditor.ui.Chart');

goog.require('chartEditor.binding');
goog.require('chartEditor.model.Base');
goog.require('chartEditor.ui.Component');



/**
 * Chart widget.
 *
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.Chart = function(model, opt_domHelper) {
  chartEditor.ui.Chart.base(this, 'constructor', opt_domHelper);

  this.setModel(model);

  this.anychart = /** @type {Object} */(goog.dom.getWindow()['anychart']);

  /**
   * @type {string}
   * @private
   */
  this.containerId_ = 'anychart-ce-chart-container-' + goog.string.createUniqueString();

  /**
   * @type {Object|null}
   * @private
   */
  this.chart_ = null;

  /**
   * Data set instance that would be created inside editor and should be disposed.
   *
   * @type {Object|null}
   * @private
   */
  this.dataSet_ = null;

  /**
   * Default standalone instances (default scales etc)
   * @type {Object}
   * @private
   */
  this.defaultInstances_ = {};

  this.addClassName(goog.getCssName('anychart-ce-chart-container'));
};
goog.inherits(chartEditor.ui.Chart, chartEditor.ui.Component);


/** @inheritDoc */
chartEditor.ui.Chart.prototype.createDom = function() {
  chartEditor.ui.Chart.base(this, 'createDom');

  this.getDomHelper().setProperties(this.getElement(), {'id': this.containerId_});
};


/** @inheritDoc */
chartEditor.ui.Chart.prototype.enterDocument = function() {
  chartEditor.ui.Chart.base(this, 'enterDocument');

  this.getHandler().listen(/** @type {chartEditor.model.Base} */(this.getModel()),
    chartEditor.events.EventType.EDITOR_MODEL_UPDATE, this.onModelChange);
};


/**
 * Entry point to settings processing cycle.
 */
chartEditor.ui.Chart.prototype.firstDraw = function() {
  this.onModelChange(null);
};


/**
 * Updates ui on model change.
 * @param {?Object} evt
 */
chartEditor.ui.Chart.prototype.onModelChange = function(evt) {
  var self = this;
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var rawData = model.getRawData();
  var settings = model.getModel();
  var defaults = goog.object.clone(model.defaults());
  var chartType = settings['chart']['type'];
  var rebuildChart = !arguments.length || !arguments[0] || arguments[0].rebuildChart;
  var singleSetting;

  if (!chartType)
    return;

  // Global settings
  goog.object.forEach(settings['anychart'], function(value, key) {
    chartEditor.binding.exec(self.anychart, key, value);
  });

  // Chart creation
  if (rebuildChart) {
    /**
     * Re-create chart,set up data and create series
     */
    if (this.chart_) {
      this.chart_['dispose']();
    }

    if (this.dataSet_)
      this.dataSet_['dispose']();

    this.chart_ = /** @type {Object} */(chartEditor.binding.exec(this.anychart, chartType + '()'));

    // Hardcode for Qlik
    this.chart_['contextMenu']()['enabled'](false);

    if (chartType === 'map') {
      var geoData = model.getRawData(true);
      if (geoData) {
        this.chart_['geoData'](geoData);
        var geoIdField = model.getGeoIdField();
        if (geoIdField)
          this.chart_['geoIdField'](geoIdField);
      } else {
        // Geo data still loading
        return;
      }
    }

    var dataSet;
    var plotMapping;
    var seriesMapping;
    var mappingObj;

    if (goog.isFunction(rawData['mapAs'])) {
      // raw data is instance of anychart.data.Set
      dataSet = rawData;
    } else {
      // Create data set
      var dsCtor = model.getChartTypeSettings()['dataSetCtor'];
      var dsCtorArgs = [];

      if (dsCtor === 'table') {
        dsCtorArgs = [settings['dataSettings']['field']];

      } else if (dsCtor === 'tree') {
        mappingObj = settings['dataSettings']['mappings'][0][0]['mapping'];
        dsCtorArgs = [void 0, void 0, void 0, model.preprocessMapping(mappingObj)];
      }

      dataSet = this.dataSet_ = this.anychart['data'][dsCtor].apply(this.anychart['data'], dsCtorArgs);

      // Add data
      if (dsCtor === 'table')
        dataSet['addData'](rawData);
      else if (dsCtor === 'tree')
        dataSet['addData'](model.preprocessData(/** @type {Array<Object>} */(rawData), mappingObj), 'as-table');
      else
        dataSet['data'](rawData);
    }

    // Create mapping and series
    if (dsCtor === 'tree') {
      // no mappings required for tree-data charts
      this.chart_['data'](dataSet);
    } else {
      var pointersIndexes = {};
      for (var i = 0; i < settings['dataSettings']['mappings'].length; i++) {
        plotMapping = settings['dataSettings']['mappings'][i];
        for (var j = 0; j < plotMapping.length; j++) {
          seriesMapping = plotMapping[j]['mapping'];

          mappingObj = dsCtor === 'table' || model.chartTypeLike('gauges') ? {} :
            {'x': settings['dataSettings']['field']};

          for (var k in seriesMapping) {
            if (seriesMapping.hasOwnProperty(k))
              mappingObj[k] = seriesMapping[k];
          }

          var mappingInstance = dataSet['mapAs'](mappingObj);

          var singleSeriesChart = !!model.getChartTypeSettings()['singleSeries'];
          if (singleSeriesChart) {
            this.chart_['data'](mappingInstance);

          } else {
            var seriesCtor = plotMapping[j]['ctor'];
            seriesCtor = model.getSeriesDescription()[seriesCtor]['ctor'] || seriesCtor;

            var series;
            var stringKey =  (model.chartTypeLike('gauges') ? 'getPointer' : 'getSeries') + '(\'' + plotMapping[j]['id'] + '\').name()';

            if (chartType === 'stock') {
              var plot = this.chart_['plot'](i);
              series = plot[seriesCtor](mappingInstance);
              stringKey = 'plot(' + i + ').' + stringKey;

            } else if (chartType === 'gauges.circular') {
              pointersIndexes[seriesCtor] = ++pointersIndexes[seriesCtor] || 0;
              series = this.chart_[seriesCtor](pointersIndexes[seriesCtor], mappingInstance);

            } else {
              series = this.chart_[seriesCtor](mappingInstance);
              // to prevent not drawing line series for qlik purposes
              if ((chartType === 'quadrant' || chartType === 'scatter') && seriesCtor === 'line')
                series['connectMissingPoints'](true);
            }

            if (series['id']) {
              // Set series id
              series['id'](plotMapping[j]['id']);

              if (!model.chartTypeLike('circular')) {
                var fieldKey = mappingObj['value'] ?
                    mappingObj['value'] :
                    mappingObj['close'] ?
                        mappingObj['close'] :
                        mappingObj['high'] ? mappingObj['high'] : null;

                if (fieldKey) {
                  fieldKey = goog.isArray(fieldKey) ? fieldKey[0] : fieldKey;
                  var preparedData = model.getPreparedData();
                  preparedData = preparedData[0];
                  var seriesName = preparedData.fieldNames[fieldKey] ? preparedData.fieldNames[fieldKey] : null;
                  if (!seriesName) {
                    for (var f = 0; f < preparedData.fields.length; f++) {
                      if (String(preparedData.fields[f].key) == String(fieldKey)) {
                        seriesName = preparedData.fields[f].name;
                        break;
                      }
                    }
                  }
                  if (seriesName)
                    defaults[stringKey] = seriesName;
                }
              }
            }
          }
        }
      }
    }

    /**
     * Standalones instances saving and creation
     * If default standalone - just save instance
     * if standalone - create
     */
    var sName;
    var sIndex;
    var descriptor;
    this.defaultInstances_ = {};
    for (sName in settings['standalones']) {
      this.defaultInstances_[sName] = [];

      if (settings['standalones'][sName].length) {
        for (sIndex = 0; sIndex < settings['standalones'][sName].length; sIndex++) {
          descriptor = settings['standalones'][sName][sIndex];
          if (descriptor['type']) {
            if (descriptor['key']) {
              // Save default instances before standalones are applied to chart
              this.defaultInstances_[sName][descriptor['key']] = /** @type {Object} */(chartEditor.binding.exec(this.chart_, descriptor['key']));

            } else if (!descriptor['instance']) {
              // Create standalone instances
              descriptor['instance'] = /** @type {Object} */(model.createScaleByType(descriptor['type']));
            }
          }
        }
      }
    }
  } else {
    if (evt && evt.meta && evt.meta.key) {
      singleSetting = evt.meta;
      if (singleSetting.stringKey.indexOf('(') == -1) {
        // If key is object setting
        singleSetting.stringKey = singleSetting.key[singleSetting.key.length - 2][0];
      }
    }
  }

  /**
   * Apply chart settings
   */
  var key;
  for (key in settings['chart']['settings']) {
    if (settings['chart']['settings'].hasOwnProperty(key)) {
      if (!singleSetting || singleSetting.stringKey === key) {
        var value = settings['chart']['settings'][key];
        if (goog.isString(value)) {
          value = value.replace(/(\\\\)/g, '\\');
          value = value.replace(/(\\n)/g, '\n');

          if (key === 'palette()')
            value = self.anychart['palettes'][value];

          /**
           * Pass standalone instances to chart (for example chart.xScale(NEW_INSTANCE))
           */
          if (value.indexOf('STANDALONE:') === 0) {
            var tmp = value.split(':');
            sName = tmp[1];
            sIndex = tmp[2];
            value = void 0;

            if (tmp.length === 3) {
              // Apply only real standalones (not defaults)
              descriptor = settings['standalones'][sName][sIndex];
              if (!descriptor || descriptor['key'] === key) {
                delete settings['chart']['settings'][key];

              } else if (!descriptor['key']) {
                value = descriptor['instance'];
              }
            }
          }
        }

        if (goog.isDef(value)) {
          //console.log("Apply setting", key, value);
          chartEditor.binding.exec(self.chart_, key, value);
        }
      }
    }
  }


  if (rebuildChart) {
    /**
     * Apply default settings
     * Not override existing settings
     */
    for (key in defaults) {
      if (defaults.hasOwnProperty(key) && !goog.isDef(settings['chart']['settings'][key])) {
        chartEditor.binding.exec(self.chart_, key, defaults[key]);
      }
    }
  }

  /**
   * After chart settings (including standalones) are applied we should apply settings for standalones
   */
  for (sName in settings['standalones']) {
    if (settings['standalones'][sName].length) {
      for (sIndex = 0; sIndex < settings['standalones'][sName].length; sIndex++) {
        descriptor = settings['standalones'][sName][sIndex];
        if (!descriptor)
          continue;

        if (descriptor['key']) {
          var prevInstance = descriptor['instance'];

          descriptor['instance'] = chartEditor.binding.exec(this.chart_, descriptor['key']);
          if (prevInstance && goog.isFunction(prevInstance['dispose']) && descriptor['instance'] !== prevInstance)
            prevInstance['dispose']();

          descriptor['locked'] = this.defaultInstances_[sName][descriptor['key']] != descriptor['instance'];

          if (descriptor['locked']) {
            if (descriptor['settings']) {
              descriptor['settingsCache'] = descriptor['settings'];
              delete descriptor['settings'];
            }

          } else {
            if (descriptor['settingsCache']) {
              descriptor['settings'] = descriptor['settingsCache'];
              delete descriptor['settingsCache'];
            }
          }
        }

        if (descriptor['settings']) {
          goog.object.forEach(descriptor['settings'], function(value, key) {
            var target = descriptor['key'] ? self.chart_ : descriptor['instance'];
            key = descriptor['key'] ? descriptor['key'] + '.' + key : key;
            if (goog.isString(value))
              value = value.replace(/(\\\\)/g, '\\');

            chartEditor.binding.exec(target, key, value);
          });
        }
      }
    }
  }

  if (rebuildChart) {
    this.chart_['listenOnce']('chartdraw', function() {
      self.updateStandalones_(settings);
      model.onChartDraw(self.chart_, rebuildChart);
    });

    this.chart_['container'](this.containerId_);
    this.chart_['draw']();
    if (chartType === 'ganttProject' || chartType === 'ganttResource')
      this.chart_['fitAll']();

  } else {
    model.onChartDraw(self.chart_, rebuildChart);
  }

  // todo: debug
  // window['chart'] = this.chart_;
};


/**
 * After chart draw processing standalones
 *
 * @param {Object} settings
 * @private
 */
chartEditor.ui.Chart.prototype.updateStandalones_ = function(settings) {
  // Default standalone instances creation. Should be called after chart.draw()
  for (var sName in settings['standalones']) {
    if (settings['standalones'][sName].length) {
      for (var sIndex = 0; sIndex < settings['standalones'][sName].length; sIndex++) {
        var descriptor = settings['standalones'][sName][sIndex];
        // Update default standalones instances
        if (goog.isDef(descriptor['key'])) {
          var actualStandaloneInstance = /** @type {Object} */(chartEditor.binding.exec(this.chart_, descriptor['key']));
          if (descriptor['instance'] && descriptor['instance'] != actualStandaloneInstance && goog.isFunction(descriptor['instance']['dispose'])) {
            /**
             * descriptor['instance'] is default instance (for example scale)
             * we should dispose it and save actual instance
             */
            descriptor['instance']['dispose']();
            descriptor['instance'] = actualStandaloneInstance;
          }

          if (descriptor['instance'] !== this.defaultInstances_[sName][descriptor['key']]) {
            /**
             * If applied standalone instance, we should lock default panel instance
             */
            if (descriptor['settings']) {
              descriptor['settingsCache'] = descriptor['settings'];
              delete descriptor['settings'];
            }
            descriptor['locked'] = true;
          }
        }
      }
    }
  }
};


/** @inheritDoc */
chartEditor.ui.Chart.prototype.disposeInternal = function() {
  goog.dispose(this.chart_);
  this.chart_ = null;

  chartEditor.ui.Chart.base(this, 'disposeInternal');
};