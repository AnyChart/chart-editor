goog.provide('chartEditor.Chart');

goog.require("chartEditor.Component");
goog.require("chartEditor.EditorModel");
goog.require("chartEditor.binding");


/**
 * Chart widget.
 *
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.Chart = function(model, opt_domHelper) {
  chartEditor.Chart.base(this, 'constructor', opt_domHelper);

  this.setModel(model);

  this.anychart = /** @type {Object} */(goog.dom.getWindow()['anychart']);

  /**
   * @type {string}
   * @private
   */
  this.containerId_ = 'anychart-ce-chart-container-' + goog.string.createUniqueString();
};
goog.inherits(chartEditor.Chart, chartEditor.Component);


/** @inheritDoc */
chartEditor.Chart.prototype.createDom = function() {
  chartEditor.Chart.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), 'anychart-ce-chart-container');

  this.getDomHelper().setProperties(this.getElement(), {'id': this.containerId_});
};


/** @inheritDoc */
chartEditor.Chart.prototype.enterDocument = function() {
  chartEditor.Chart.base(this, 'enterDocument');

  this.onModelChange(null);

  this.getHandler().listen(/** @type {chartEditor.EditorModel} */(this.getModel()),
      chartEditor.events.EventType.EDITOR_MODEL_UPDATE, this.onModelChange);
};


/**
 * Updates component on model change.
 * @param {?Object} evt
 */
chartEditor.Chart.prototype.onModelChange = function(evt) {
  var self = this;
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var rawData = model.getRawData();
  var settings = model.getModel();
  var chartType = settings['chart']['type'];
  var rebuild = !arguments.length || !arguments[0] || arguments[0].rebuildChart;

  if (!chartType)
    return;

  // Global settings
  goog.object.forEach(settings['anychart'], function(value, key) {
    chartEditor.binding.exec(self.anychart, key, value);
  });

  // Chart creation
  if (rebuild) {
    if (this.chart_)
      this.chart_['dispose']();

    this.chart_ = /** @type {Object} */(chartEditor.binding.exec(this.anychart, chartType + '()'));

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

    // Create data set
    var dsCtor = model.getChartTypeSettings()['dataSetCtor'];
    var dsCtorArgs = [];
    var plotMapping;
    var seriesMapping;
    var mappingObj;

    if (dsCtor === 'table') {
      dsCtorArgs = [settings['dataSettings']['field']];

    } else if (dsCtor === 'tree') {
      mappingObj = settings['dataSettings']['mappings'][0][0]['mapping'];
      mappingObj['id'] = settings['dataSettings']['field'];
      dsCtorArgs = [void 0, void 0, void 0, mappingObj];
    }

    var dataSet = this.anychart['data'][dsCtor].apply(this.anychart['data'], dsCtorArgs);

    // Add data
    if (dsCtor === 'table')
      dataSet['addData'](rawData);
    else if (dsCtor === 'tree')
      dataSet['addData'](rawData, 'as-table');
    else
      dataSet['data'](rawData);

    // Create mapping and series
    var dataFields;
    var pointersIndexes = {};
    for (var i = 0; i < settings['dataSettings']['mappings'].length; i++) {
      plotMapping = settings['dataSettings']['mappings'][i];
      for (var j = 0; j < plotMapping.length; j++) {
        seriesMapping = plotMapping[j]['mapping'];

        mappingObj = dsCtor === 'table' || model.chartTypeLike('gauges') ? {} :
            dsCtor === 'tree' ?
                {'id': settings['dataSettings']['field']} :
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
          seriesCtor = chartEditor.EditorModel.Series[seriesCtor]['ctor'] || seriesCtor;

          var series;
          var stringKey = 'getSeries(\'' + plotMapping[j]['id'] + '\').name()';

          if (chartType === 'stock') {
            var plot = this.chart_['plot'](i);
            series = plot[seriesCtor](mappingInstance);
            stringKey = 'plot(' + i + ').' + stringKey;

          } else if (chartType === 'gauges.circular') {
            pointersIndexes[seriesCtor] = ++pointersIndexes[seriesCtor] || 0;
            series = this.chart_[seriesCtor](pointersIndexes[seriesCtor], mappingInstance);

          } else {
            series = this.chart_[seriesCtor](mappingInstance);
          }

          if (series['id']) {
            // Set series id
            series['id'](plotMapping[j]['id']);

            if (model.getValue([['editorSettings'], ['lockSeriesName'], stringKey])) {
              // Set forced series name
              dataFields = dataFields || model.getPreparedData(model.getModel()['dataSettings']['active'])[0].fields;
              var currentField = goog.array.filter(dataFields, function(item) {
                return item.key === (goog.isDef(seriesMapping['value']) ? seriesMapping['value'] : goog.object.getAnyValue(seriesMapping));
              })[0];

              if (currentField) {
                settings['chart']['settings'][stringKey] = currentField.name;
                model.setValue([['editorSettings'], ['lockSeriesName'], stringKey], currentField.key, true);
              }
            }
          }
        }
      }
    }
  }

  // Standalones instances creation
  var sName;
  var sIndex;
  var descriptor;
  
  var defaultInstances = {};
  for (sName in settings['standalones']) {
    defaultInstances[sName] = [];

    if (settings['standalones'][sName].length) {
      for (sIndex = 0; sIndex < settings['standalones'][sName].length; sIndex++) {
        descriptor = settings['standalones'][sName][sIndex];

        if (descriptor['type']) {
          if (descriptor['key']) {
            // Save default instance before standalones are applied to chart
            defaultInstances[sName][descriptor['key']] = /** @type {Object} */(chartEditor.binding.exec(this.chart_, descriptor['key']));

          } else if (!descriptor['instance']) {
            // Create instance
            var ctor = chartEditor.settings.scales.Base.descriptors[descriptor['type']].ctor;
            var instance = /** @type {Object} */(chartEditor.binding.exec(this.anychart, ctor));
            if (instance) {
              if (descriptor['settings']) {
                // Apply standalone instance settings
                goog.object.forEach(descriptor['settings'], function(value, key) {
                  if (goog.isString(value))
                    value = value.replace(/(\\\\)/g, '\\');

                  chartEditor.binding.exec(instance, key, value);
                });
              }

              descriptor['instance'] = instance;
            }
          }
        }
      }
    }
  }

  // console.log(defaultInstances['scale']);

  // Chart settings
  // console.log(settings['chart']['settings']);
  goog.object.forEach(settings['chart']['settings'], function(value, key) {
    //console.log("chart settings", key, value);
    if (goog.isString(value)) {
      value = value.replace(/(\\\\)/g, '\\');

      if (key === 'palette()')
        value = self.anychart['palettes'][value];

      if (value.indexOf('STANDALONE:') === 0) {
        var tmp = value.split(':');
        var sName = tmp[1];
        var sIndex = tmp[2];
        value = void 0;

        if (tmp.length == 3) {
          // Apply only real standalones (not defaults)
          descriptor = settings['standalones'][sName][sIndex];
          if (!descriptor['key']) {
            value = descriptor['instance'];

          } else if (descriptor['key'] == key) {
            delete settings['chart']['settings'][key];
          }
        }
      }
    }

    if (goog.isDef(value))
      chartEditor.binding.exec(self.chart_, key, value);
  });

  // After standalones are applied we should apply default standalones
  for (sName in settings['standalones']) {
    if (settings['standalones'][sName].length) {
      for (sIndex = 0; sIndex < settings['standalones'][sName].length; sIndex++) {
        descriptor = settings['standalones'][sName][sIndex];

        if (descriptor['key']) {
          if (descriptor['instance'] && goog.isFunction(descriptor['instance']['dispose'])) {
            // This is default scale
            descriptor['instance']['dispose']();
          }
          
          descriptor['instance'] = chartEditor.binding.exec(this.chart_, descriptor['key']);
          descriptor['locked'] = defaultInstances[sName][descriptor['key']] != descriptor['instance'];
          
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

            if (descriptor['settings']) {
              goog.object.forEach(descriptor['settings'], function(value, key) {
                key = descriptor['key'] + '.' + key;
                if (goog.isString(value)) {
                  value = value.replace(/(\\\\)/g, '\\');
                }
                chartEditor.binding.exec(self.chart_, key, value);
              }); 
            }
          }
        }
      }
    }
  }

  this.chart_['listenOnce']('chartdraw', function() {
    // Default standalone instances creation. Should be called after chart.draw()
    for (var sName in settings['standalones']) {
      if (settings['standalones'][sName].length) {
        for (var sIndex = 0; sIndex < settings['standalones'][sName].length; sIndex++) {
          var descriptor = settings['standalones'][sName][sIndex];

          // Update default standalones instances
          if (goog.isDef(descriptor['key'])) {
            if (descriptor['instance'] && goog.isFunction(descriptor['instance']['dispose'])) {
              // This is default scale
              descriptor['instance']['dispose']();
            }

            descriptor['instance'] = /** @type {Object} */(chartEditor.binding.exec(self.chart_, descriptor['key']));
            if (descriptor['instance'] !== defaultInstances[sName][descriptor['key']]) {
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

    model.onChartDraw(self.chart_, rebuild);
  });

  if (rebuild) {
    this.chart_['container'](this.containerId_);
    this.chart_['draw']();
  }

  // todo: debug
  // window['chart'] = this.chart_;
};


/** @inheritDoc */
chartEditor.Chart.prototype.disposeInternal = function() {
  goog.dispose(this.chart_);
  this.chart_ = null;

  chartEditor.Chart.base(this, 'disposeInternal');
};