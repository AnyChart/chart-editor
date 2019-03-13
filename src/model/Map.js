goog.provide('chartEditor.model.Map');

goog.require('chartEditor.model.Base');
goog.require('chartEditor.ui.appearanceTabs.ChartTitle');
goog.require('chartEditor.ui.appearanceTabs.ColorRange');
goog.require('chartEditor.ui.appearanceTabs.Data');
goog.require('chartEditor.ui.appearanceTabs.DataLabels');
goog.require('chartEditor.ui.appearanceTabs.GeneralTheming');
goog.require('chartEditor.ui.appearanceTabs.Legend');
goog.require('chartEditor.ui.appearanceTabs.SeriesWithScales');
goog.require('chartEditor.ui.appearanceTabs.Tooltip');



/**
 * ditor Model for Map Editor product.
 *
 * @constructor
 * @extends {chartEditor.model.Base}
 */
chartEditor.model.Map = function() {
  chartEditor.model.Map.base(this, 'constructor');

  /** @inheritDoc */
  this.appearanceTabs = [
    {
      name: chartEditor.enums.EditorTabs.DATA,
      classFunc: chartEditor.ui.appearanceTabs.Data,
      docsUrl: 'https://docs.anychart.com/Working_with_Data/Overview'
    },
    {
      name: chartEditor.enums.EditorTabs.THEMING,
      classFunc: chartEditor.ui.appearanceTabs.GeneralTheming,
      docsUrl: 'http://docs.anychart.com/Appearance_Settings/Themes'
    }, {
      name: chartEditor.enums.EditorTabs.TITLE,
      classFunc: chartEditor.ui.appearanceTabs.ChartTitle,
      docsUrl: 'http://docs.anychart.com/Common_Settings/Title'
    }, {
      name: chartEditor.enums.EditorTabs.LEGEND,
      classFunc: chartEditor.ui.appearanceTabs.Legend,
      docsUrl: 'http://docs.anychart.com/Common_Settings/Legend/Basic_Settings'
    }, {
      name: chartEditor.enums.EditorTabs.DATA_LABELS,
      classFunc: chartEditor.ui.appearanceTabs.DataLabels,
      docsUrl: 'http://docs.anychart.com/Common_Settings/Labels'
    }, {
      name: chartEditor.enums.EditorTabs.SERIES,
      classFunc: chartEditor.ui.appearanceTabs.SeriesWithScales,
      docsUrl: 'https://api.anychart.com/anychart.core.SeriesBase'
    }, {
      name: chartEditor.enums.EditorTabs.TOOLTIP,
      classFunc: chartEditor.ui.appearanceTabs.Tooltip,
      docsUrl: 'http://docs.anychart.com/Common_Settings/Tooltip'
    }, {
      name: chartEditor.enums.EditorTabs.COLOR_RANGE,
      classFunc: chartEditor.ui.appearanceTabs.ColorRange,
      docsUrl: 'http://api.anychart.com/v8/anychart.core.ui.ColorRange'
    }];

  /**
   * @type {Array}
   * @private
   */
  this.geoDataIndexList_ = [];
};
goog.inherits(chartEditor.model.Map, chartEditor.model.Base);


// region Structures
chartEditor.model.Series['marker-by-id'] = {
  'ctor': 'marker',
  'name': 'Marker (by geo Id)',
  'fields': [
    {'field': 'id', 'name': 'Id'}
  ]
};
chartEditor.model.Series['marker-by-coordinates'] = {
  'ctor': 'marker',
  'name': 'Marker (by coordinates)',
  'fields': [
    {'field': 'lat', 'name': 'Latitude'},
    {'field': 'long', 'name': 'Longitude'}
  ]
};
chartEditor.model.Series['bubble-by-id'] = {
  'ctor': 'bubble',
  'name': 'Bubble (by geo Id)',
  'fields': [
    {'field': 'id', 'name': 'Id'},
    {'field': 'size', 'name': 'Size'}
  ]
};
chartEditor.model.Series['bubble-by-coordinates'] = {
  'ctor': 'bubble',
  'name': 'Bubble (by coordinates)',
  'fields': [
    {'field': 'lat', 'name': 'Latitude'},
    {'field': 'long', 'name': 'Longitude'},
    {'field': 'size', 'name': 'Size'}
  ]
};
chartEditor.model.Series['choropleth'] = {
  'fields': [
    {'field': 'id', 'name': 'Id'},
    {'field': 'value', 'name': 'Value'}
  ]
};
// endregion


// region Model initialization
/** @inheritDoc */
chartEditor.model.Map.prototype.chooseDefaultChartType = function() {
  this.initGeoData(); // todo: place this somewhere else
  this.model['chart']['type'] = 'map';
};


/** @inheritDoc */
chartEditor.model.Map.prototype.chooseDefaultSeriesType = function() {
  chartEditor.model.Map.base(this, 'chooseDefaultSeriesType');

  var seriesType = this.model['chart']['seriesType'];
  if (!seriesType) {
    if (this.fieldsState.coordinates.length === 2) {
      if (this.fieldsState.numbersCount)
        seriesType = 'bubble-by-coordinates';
      else
        seriesType = 'marker-by-coordinates';

    } else if (this.fieldsState.geoId) {
      if (this.fieldsState.numbersCount)
        seriesType = 'bubble-by-id';
      else
        seriesType = 'marker-by-id';
    } else
      seriesType = this.getChartTypeSettings()['series'][0];
  }

  this.model['chart']['seriesType'] = seriesType;
};


/** @inheritDoc */
chartEditor.model.Map.prototype.createDefaultSeriesMapping = function(index, type, opt_id, opt_startFieldIndex) {
  var config = {'ctor': type, 'mapping': {}};
  config['id'] = goog.isDef(opt_id) ? opt_id : goog.string.createUniqueString();

  var strings = goog.array.clone(this.fieldsState.strings);
  var numbers = goog.array.clone(this.fieldsState.numbers);
  var fields = chartEditor.model.Series[type]['fields'];

  // Subtract coordinate fields from numbers list
  var self = this;
  numbers = goog.array.filter(numbers, function(item) {
    return goog.array.indexOf(self.fieldsState.coordinates, item) === -1;
  });
  this.fieldsState.numbersCount = numbers.length;

  for (var i = 0; i < fields.length; i++) {
    if (fields[i]['field'] === 'id' && this.fieldsState.geoId) {
      config['mapping'][fields[i]['field']] = this.fieldsState.geoId;

    } else if (this.fieldsState.coordinates && (fields[i]['field'] === 'lat' || fields[i]['field'] === 'long')) {
      config['mapping'][fields[i]['field']] = (fields[i]['field'] === 'lat') ?
          this.fieldsState.coordinates[0] :
          this.fieldsState.coordinates[1];

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


/** @inheritDoc */
chartEditor.model.Map.prototype.initGeoData = function() {
  var activeGeo = goog.isString(this.model['dataSettings']['activeGeo']) ?
      this.model['dataSettings']['activeGeo'].substring(1) :
      this.data[this.getActive()].activeGeo;

  if (this.geoDataIndexList_.length)
    this.loadGeoData(activeGeo);
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
              self.geoDataIndexList_[indexJson['sets'][i]['id']] = indexJson['sets'][i];
            }
          }

          self.dispatchEvent({
            type: chartEditor.events.EventType.GEO_DATA_INDEX_LOADED,
            data: self.geoDataIndexList_
          });

          self.loadGeoData(activeGeo);

          self.dispatchEvent({
            type: chartEditor.events.EventType.WAIT,
            wait: false
          });
        });
  }
};


/**
 * Loads geo data from cdn resource by index.
 *
 * @param {number=} opt_setId
 * @private
 */
chartEditor.model.Map.prototype.loadGeoData = function(opt_setId) {
  var setId = goog.isDef(opt_setId) ? opt_setId : 0;
  var setFullId = chartEditor.model.DataType.GEO + setId;

  if (setFullId !== this.model['dataSettings']['activeGeo'] || !this.data[setFullId]) {
    this.dispatchEvent({
      type: chartEditor.events.EventType.WAIT,
      wait: true
    });

    var setUrl = 'https://cdn.anychart.com/geodata/1.2.0' + this.geoDataIndexList_[setId]['data'];
    var self = this;
    goog.net.XhrIo.send(setUrl,
        function(e) {
          if (e.target.getStatus() === 200) {
            var json = e.target.getResponseJson();
            var dataType = chartEditor.model.DataType.GEO;
            self.addData({
              type: chartEditor.events.EventType.DATA_ADD,
              data: json,
              dataType: dataType,
              setId: setId,
              setFullId: dataType + setId,
              title: self.geoDataIndexList_[setId]['name']
            });
          }

          self.dispatchEvent({
            type: chartEditor.events.EventType.WAIT,
            wait: false
          });
        });
  }
};
// endregion


// region Public and controls callback functions
/** @inheritDoc */
chartEditor.model.Map.prototype.setActiveGeo = function(selectControl) {
  var selectValue = /** @type {Object} */(selectControl.getValue());
  var setId = Number(selectValue.value.substr(1));
  this.loadGeoData(setId);
};
// endregion


/** @inheritDoc */
chartEditor.model.Map.prototype.needResetMappings = function(prevChartType, prevSeriesType) {
  return true;
};


/** @inheritDoc */
chartEditor.model.Map.prototype.getGeoDataIndexList = function() {
  return this.geoDataIndexList_.length ? this.geoDataIndexList_ : null;
};


/** @inheritDoc */
chartEditor.model.Map.prototype.getGeoDataInfo = function() {
  var result = {};
  if (this.geoDataIndexList_ && this.model['dataSettings']['activeGeo']) {
    var setId = Number(this.model['dataSettings']['activeGeo'].substr(1));
    if (this.geoDataIndexList_[setId]) {
      var url = this.geoDataIndexList_[setId]['data'];
      var match = url.match(/\/(\w*)\.json/);
      if (match) {
        result['path'] = 'anychart.maps.' + match[1];
        result['url'] = 'https://cdn.anychart.com/geodata/1.2.0' + url.replace('json', 'js');
        result['geoIdField'] = this.getGeoIdField();
      }
    }
  }
  return result;
};


/** @inheritDoc */
chartEditor.model.Map.prototype.isChartSingleSeries = function() {
  return false;
};


/** @inheritDoc */
chartEditor.model.Map.prototype.getChartTypeSettings = function() {
  return chartEditor.model.ChartTypes[chartEditor.enums.ChartType.MAP];
};


/** @inheritDoc */
chartEditor.model.Map.prototype.getStandalonesJsCode = function(chart, printer, eq, settings, standaloneInstances) {
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
