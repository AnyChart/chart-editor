goog.provide('chartEditor.model.Gantt');

goog.require('chartEditor.model.Base');
goog.require('chartEditor.ui.appearanceTabs.ChartTitle');
goog.require('chartEditor.ui.appearanceTabs.ContextMenu');
goog.require('chartEditor.ui.appearanceTabs.Credits');
goog.require('chartEditor.ui.appearanceTabs.GanttDataGrid');
goog.require('chartEditor.ui.appearanceTabs.GanttDataGridTooltip');
goog.require('chartEditor.ui.appearanceTabs.GanttGridColoring');
goog.require('chartEditor.ui.appearanceTabs.GanttTimeLine');
goog.require('chartEditor.ui.appearanceTabs.GanttTimeLineHeader');
goog.require('chartEditor.ui.appearanceTabs.GanttTimeLineTooltip');
goog.require('chartEditor.utils');


/**
 * ditor Model for Gantt Editor product.
 *
 * @constructor
 * @extends {chartEditor.model.Base}
 */
chartEditor.model.Gantt = function() {
  chartEditor.model.Gantt.base(this, 'constructor');

  /** @inheritDoc */
  this.appearanceTabs = [
    {
      name: chartEditor.enums.EditorTabs.TITLE,
      classFunc: chartEditor.ui.appearanceTabs.ChartTitle,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/Title'
    }, {
      name: chartEditor.enums.EditorTabs.GANTT_TIMELINE_HEADER,
      classFunc: chartEditor.ui.appearanceTabs.GanttTimeLineHeader
    }, {
      name: chartEditor.enums.EditorTabs.GANTT_TIMELINE,
      classFunc: chartEditor.ui.appearanceTabs.GanttTimeLine
    }, {
      name: chartEditor.enums.EditorTabs.GANTT_DATAGRID,
      classFunc: chartEditor.ui.appearanceTabs.GanttDataGrid
    }, {
      name: chartEditor.enums.EditorTabs.GANTT_GRID_COLORING,
      classFunc: chartEditor.ui.appearanceTabs.GanttGridColoring
    }, {
      name: chartEditor.enums.EditorTabs.GANTT_TIMELINE_TOOLTIP,
      classFunc: chartEditor.ui.appearanceTabs.GanttTimeLineTooltip,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/Tooltip'
    }, {
      name: chartEditor.enums.EditorTabs.GANTT_DATAGRID_TOOLTIP,
      classFunc: chartEditor.ui.appearanceTabs.GanttDataGridTooltip,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/Tooltip'
    }, {
      name: chartEditor.enums.EditorTabs.CONTEXT_MENU,
      classFunc: chartEditor.ui.appearanceTabs.ContextMenu,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/UI_Controls/Context_Menu'
    }, {
      name: chartEditor.enums.EditorTabs.CREDITS,
      classFunc: chartEditor.ui.appearanceTabs.Credits,
      docsUrl: 'http://docs.anychart.stg/Quick_Start/Credits'
    }];
};
goog.inherits(chartEditor.model.Gantt, chartEditor.model.Base);


// region Structures
chartEditor.model.Series['ganttProject'] = {
  'ctor': 'ganttProject',
  'name': 'Gantt Project',
  'fields': [
    {'field': 'id'},
    {'field': 'name', 'type': 'string'},
    {'field': 'parent'},
    {'field': 'progressValue', 'type': 'string'},
    {'field': 'actualStart', 'type': 'string'},
    {'field': 'actualEnd'},
    {'field': 'connectTo'},
    {'field': 'connectorType', 'type': 'string'}
  ]
};
chartEditor.model.Series['ganttResourceQlik'] = {
  'ctor': 'ganttResource',
  'name': 'Gantt Resource',
  'fields': [
    // resource specific
    {'field': 'id'},
    {'field': 'name'},
    {'field': 'parent'},
    // period specific
    {'field': 'periodId'},
    {'field': 'periodStart'},
    {'field': 'periodEnd'},
    {'field': 'periodConnectTo'},
    {'field': 'periodResourceId'}
  ]
};
chartEditor.model.Series['ganttResource'] = {
  'ctor': 'ganttResource',
  'name': 'Gantt Resource',
  'fields': [
    // resource specific
    {'field': 'id'},
    {'field': 'name'},
    {'field': 'parent'},
    {'field': 'periods'}
  ]
};
// endregion


// region Model initialization
/** @inheritDoc */
chartEditor.model.Gantt.prototype.chooseDefaultChartType = function() {
  chartEditor.model.Gantt.base(this, 'chooseDefaultChartType');

  if (!this.model['chart']['type'])
    this.model['chart']['type'] = 'ganttProject';
};


/** @inheritDoc */
chartEditor.model.Gantt.prototype.chooseDefaultSeriesType = function() {
  var ganttSeriesType;
  if (this.getChartTypeKey() == 'ganttProject') {
    ganttSeriesType = 'ganttProject';
    // Use special mapping for Gantt Resource in Qlik environment
  } else if (this.model['editorSettings']['qlikMode']) {
    ganttSeriesType = 'ganttResourceQlik';
  } else {
    ganttSeriesType = 'ganttResource';
  }
  this.model['chart']['seriesType'] = ganttSeriesType;
};


/** @inheritDoc */
chartEditor.model.Gantt.prototype.createDefaultSeriesMapping = function(index, type, opt_id, opt_startFieldIndex) {
  var config = {'ctor': type, 'mapping': {}};
  config['id'] = goog.isDef(opt_id) ? opt_id : goog.string.createUniqueString();

  var strings = goog.array.clone(this.fieldsState.strings);
  var numbers = goog.array.clone(this.fieldsState.numbers);
  var fields = chartEditor.model.Series[type]['fields'];

  var keys = this.getRawData()[0];
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i]['field'];
    if (field in keys) {
      config['mapping'][field] = field;
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
chartEditor.model.Gantt.prototype.isChartSingleSeries = function() {
  return true;
};


/** @inheritDoc */
chartEditor.model.Gantt.prototype.needResetMappings = function(prevChartType, prevSeriesType) {
  return true;
};


/**
 * Preprocess mapping for Gnatt Resource chart.
 * @param {Object} mappingObj default mapping for the current chart type
 * @return {Object}
 */
chartEditor.model.Gantt.preprocessResourceMapping = function(mappingObj) {
  var resourceMapping = Object.assign({}, mappingObj);
  resourceMapping['periods'] = 'periods';
  delete resourceMapping['periodId'];
  delete resourceMapping['periodStart'];
  delete resourceMapping['periodEnd'];
  delete resourceMapping['periodConnectTo'];
  delete resourceMapping['periodResourceId'];
  return resourceMapping;
};


/**
 * Preprocess data for Gantt Resource chart.
 * @param {?(Array.<*>|Object)} rawData raw incoming data
 * @param {Object} mappingObj default mapping for the current chart type
 * @return {Array.<*>}
 */
chartEditor.model.Gantt.preprocessResourceData = function(rawData, mappingObj) {
  var preprocessedData = [];
  // search all unique resources ID
  var resourceIds = chartEditor.utils.searchUniqueValues(rawData, mappingObj['id']);
  // add resources to preprocessed data
  for (var i = 0; i < resourceIds.length; i++) {
    for (var j = 0; j < rawData.length; j++) {
      if (resourceIds[i] === rawData[j][mappingObj['id']]) {
        var resourceObj = {};
        resourceObj[mappingObj['id']] = resourceIds[i];
        resourceObj[mappingObj['name']] = rawData[j][mappingObj['name']];
        resourceObj[mappingObj['parent']] = rawData[j][mappingObj['parent']];
        resourceObj['periods'] = [];
        preprocessedData.push(resourceObj);
        break;
      }
    }
  }

  // search all unique periods
  var periodsIds = chartEditor.utils.searchUniqueValues(rawData, mappingObj['periodId']);
  // add every unique period to its related resource
  for (i = 0; i < periodsIds.length; i++) {
    for (j = 0; j < rawData.length; j++) {
      if (periodsIds[i] === rawData[j][mappingObj['periodId']]) {
        var periodObj = {
          id: periodsIds[i],
          start: rawData[j][mappingObj['periodStart']],
          end: rawData[j][mappingObj['periodEnd']],
          connectTo: rawData[j][mappingObj['periodConnectTo']]
        };
        for (var l = 0; l < preprocessedData.length; l++) {
          if (preprocessedData[l][mappingObj['id']] == rawData[j][mappingObj['periodResourceId']]) {
            preprocessedData[l]['periods'].push(periodObj);
          }
        }
        break;
      }
    }
  }
  return preprocessedData;
};
