goog.provide('chartEditor.model.Gantt');

goog.require('chartEditor.model.Base');
goog.require('chartEditor.ui.appearanceTabs.ChartTitle');
goog.require('chartEditor.ui.appearanceTabs.Data');
goog.require('chartEditor.ui.appearanceTabs.GanttDataGrid');
goog.require('chartEditor.ui.appearanceTabs.GanttGridColoring');
goog.require('chartEditor.ui.appearanceTabs.GanttTimeLine');
goog.require('chartEditor.ui.appearanceTabs.GanttTimeLineHeader');
goog.require('chartEditor.ui.appearanceTabs.GanttTooltip');
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
      name: chartEditor.enums.EditorTabs.DATA,
      classFunc: chartEditor.ui.appearanceTabs.Data,
      docsUrl: 'https://docs.anychart.com/Working_with_Data/Overview'
    },
    {
      name: chartEditor.enums.EditorTabs.TITLE,
      classFunc: chartEditor.ui.appearanceTabs.ChartTitle,
      docsUrl: 'http://docs.anychart.com/Common_Settings/Title'
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
      name: chartEditor.enums.EditorTabs.GANTT_TOOLTIP,
      classFunc: chartEditor.ui.appearanceTabs.GanttTooltip,
      docsUrl: 'http://docs.anychart.com/Common_Settings/Tooltip'
    }, {
      name: chartEditor.enums.EditorTabs.GANTT_GRID_COLORING,
      classFunc: chartEditor.ui.appearanceTabs.GanttGridColoring
    }];
};
goog.inherits(chartEditor.model.Gantt, chartEditor.model.Base);


// region Structures
chartEditor.model.Gantt.Series = {};
chartEditor.model.Gantt.Series['ganttProject'] = {
  'ctor': 'ganttProject',
  'name': 'Gantt Project',
  'fields': [
    {'field': 'id'},
    {'field': 'name', 'type': 'string'},
    {'field': 'parent', 'isOptional': true},
    {'field': 'progressValue', 'type': 'string', 'isOptional': true},
    {'field': 'actualStart', 'type': 'string'},
    {'field': 'actualEnd'},
    {'field': 'baselineStart', 'isOptional': true},
    {'field': 'baselineEnd', 'isOptional': true},
    {'field': 'connectTo', 'isOptional': true},
    {'field': 'connectorType', 'type': 'string', 'isOptional': true}
  ]
};
chartEditor.model.Gantt.Series['ganttResourceQlik'] = {
  'ctor': 'ganttResource',
  'name': 'Gantt Resource',
  'fields': [
    // resource specific
    {'field': 'id'},
    {'field': 'name'},
    {'field': 'parent', 'isOptional': true},
    // period specific
    {'field': 'periodId'},
    {'field': 'periodStart'},
    {'field': 'periodEnd'},
    {'field': 'periodConnectTo', 'isOptional': true}
  ]
};
chartEditor.model.Gantt.Series['ganttResource'] = {
  'ctor': 'ganttResource',
  'name': 'Gantt Resource',
  'fields': [
    // resource specific
    {'field': 'id'},
    {'field': 'name'},
    {'field': 'parent', 'isOptional': true},
    {'field': 'periods'}
  ]
};
// endregion


/** @inheritDoc */
chartEditor.model.Gantt.prototype.getSeriesDescription = function() {
  return chartEditor.model.Gantt.Series;
};


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
  } else if (chartEditor.model.Base.SOLUTION == 'qlik') {
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

  var strings = this.fieldsState.strings.filter(function(string) {return string != 'dimensionGroup';});
  var numbers = this.fieldsState.numbers.filter(function(string) {return string != 'dimensionGroup';});
  var fields = this.getSeriesDescription()[type]['fields'];

  var preparedData = this.getPreparedData();
  var dataRow = preparedData[0].row;
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i]['field'];
    if (field in dataRow) {
      config['mapping'][fields[i]['field']] = field;
    } else if (fields[i]['isOptional']) {
      /* Write nonexistent field value to mapping. This defaults selector to 'not selected' item. */
      config['mapping'][fields[i]['field']] = '__STUB_NONSELECTED__';
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


/** @inheritDoc */
chartEditor.model.Gantt.prototype.preprocessMapping = function(mappingObj) {
  if (this.model['chart']['type'] === 'ganttResource' && chartEditor.model.Base.SOLUTION == 'qlik')
    return chartEditor.utils.preprocessResourceMapping(mappingObj);
  return mappingObj;
};


/** @inheritDoc */
chartEditor.model.Gantt.prototype.preprocessData = function(rawData, mappingObj) {
  if (this.model['chart']['type'] === 'ganttResource' && chartEditor.model.Base.SOLUTION == 'qlik')
    return chartEditor.utils.preprocessResourceData(rawData, mappingObj);
  return rawData;
};
