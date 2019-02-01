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
chartEditor.model.Series['ganttResource'] = {
  'ctor': 'ganttResource',
  'name': 'Gantt Resource',
  'fields': [
    {'field': 'id'},
    {'field': 'name'},
    {'field': 'broken'},
    {'field': 'maintenance'},
    {'field': 'working'},
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
  this.model['chart']['seriesType'] = this.getChartTypeKey() == 'ganttProject' ? 'ganttProject' : 'ganttResource';
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
