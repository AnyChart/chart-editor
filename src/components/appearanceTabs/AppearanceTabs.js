goog.provide('chartEditor.AppearanceTabs');

goog.require('chartEditor.ChartTitlePanel');
goog.require('chartEditor.CircularRangesPanel');
goog.require('chartEditor.ColorRangePanel');
goog.require('chartEditor.ColorScalePanel');
goog.require('chartEditor.Component');
goog.require('chartEditor.ContextMenuPanel');
goog.require('chartEditor.CreditsPanel');
goog.require('chartEditor.DataLabelsPanel');
goog.require('chartEditor.DropOffPanel');
goog.require('chartEditor.EditorModel');
goog.require('chartEditor.FlowPanel');
goog.require('chartEditor.GanttDataGridPanel');
goog.require('chartEditor.GanttDataGridTooltip');
goog.require('chartEditor.GanttGridColoringPanel');
goog.require('chartEditor.GanttTimeLineHeaderPanel');
goog.require('chartEditor.GanttTimeLinePanel');
goog.require('chartEditor.GanttTimeLineTooltip');
goog.require('chartEditor.GaugeAxesPanel');
goog.require('chartEditor.GeneralTheming');
goog.require('chartEditor.GridsPanel');
goog.require('chartEditor.LegendPanel');
goog.require('chartEditor.NodePanel');
goog.require('chartEditor.PointersPanel');
goog.require('chartEditor.RadarPolarXAxisPanel');
goog.require('chartEditor.RadarPolarYAxisPanel');
goog.require('chartEditor.ScaleBarsPanel');
goog.require('chartEditor.ScalesPanel');
goog.require('chartEditor.SeriesSettingsPanel');
goog.require('chartEditor.SpecificPanel');
goog.require('chartEditor.Tabs');
goog.require('chartEditor.TooltipPanel');
goog.require('chartEditor.XAxesPanel');
goog.require('chartEditor.YAxesPanel');


/**
 * Appearance settings widget.
 *
 * @param {chartEditor.EditorModel} model
 * @param {chartEditor.Component=} opt_buttonsWrapper
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.Tabs}
 */
chartEditor.AppearanceTabs = function(model, opt_buttonsWrapper, opt_domHelper) {
  chartEditor.AppearanceTabs.base(this, 'constructor', model, opt_buttonsWrapper, opt_domHelper);

  this.descriptors = [
    {
      name: chartEditor.enums.EditorTabs.THEMING,
      enabled: true,
      classFunc: chartEditor.GeneralTheming,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Appearance_Settings/Themes'
    },
    {
      name: chartEditor.enums.EditorTabs.SPECIFIC,
      enabled: true,
      classFunc: chartEditor.SpecificPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.TITLE,
      enabled: true,
      classFunc: chartEditor.ChartTitlePanel,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/Title'
    },
    {
      name: chartEditor.enums.EditorTabs.GANTT_TIMELINE_HEADER,
      enabled: true,
      classFunc: chartEditor.GanttTimeLineHeaderPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.GANTT_TIMELINE,
      enabled: true,
      classFunc: chartEditor.GanttTimeLinePanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.GANTT_DATAGRID,
      enabled: true,
      classFunc: chartEditor.GanttDataGridPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.GANTT_GRID_COLORING,
      enabled: true,
      classFunc: chartEditor.GanttGridColoringPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.LEGEND,
      enabled: true,
      classFunc: chartEditor.LegendPanel,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/Legend/Basic_Settings'
    },
    {
      name: chartEditor.enums.EditorTabs.DATA_LABELS,
      enabled: true,
      classFunc: chartEditor.DataLabelsPanel,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/Labels'
    },
    {
      name: chartEditor.enums.EditorTabs.SERIES,
      enabled: true,
      classFunc: chartEditor.SeriesSettingsPanel,
      instance: null,
      docsUrl: 'https://api.anychart.com/anychart.core.SeriesBase'
    },
    {
      name: chartEditor.enums.EditorTabs.POINTERS,
      enabled: true,
      classFunc: chartEditor.PointersPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.CIRCULAR_RANGES,
      enabled: true,
      classFunc: chartEditor.CircularRangesPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.FLOW,
      enabled: true,
      classFunc: chartEditor.FlowPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.NODE,
      enabled: true,
      classFunc: chartEditor.NodePanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.DROP_OFF,
      enabled: true,
      classFunc: chartEditor.DropOffPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.SCALE_BARS,
      enabled: true,
      classFunc: chartEditor.ScaleBarsPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.SCALES,
      enabled: true,
      classFunc: chartEditor.ScalesPanel,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Axes_and_Grids/Scales'
    },
    {
      name: chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      enabled: true,
      classFunc: chartEditor.XAxesPanel,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Axes_and_Grids/Axis_Basics'
    },
    {
      name: chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      enabled: true,
      classFunc: chartEditor.YAxesPanel,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Axes_and_Grids/Axis_Basics'
    },
    {
      name: chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      enabled: true,
      classFunc: chartEditor.RadarPolarXAxisPanel,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Axes_and_Grids/Axis_Basics'
    },
    {
      name: chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      enabled: true,
      classFunc: chartEditor.RadarPolarYAxisPanel,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Axes_and_Grids/Axis_Basics'
    },
    {
      name: chartEditor.enums.EditorTabs.GAUGE_AXES,
      enabled: true,
      classFunc: chartEditor.GaugeAxesPanel,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Gauges/Linear_Gauge#scales_and_axes'
    },
    {
      name: chartEditor.enums.EditorTabs.TOOLTIP,
      enabled: true,
      classFunc: chartEditor.TooltipPanel,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/Tooltip'
    },{
      name: chartEditor.enums.EditorTabs.GANTT_TIMELINE_TOOLTIP,
      enabled: true,
      classFunc: chartEditor.GanttTimeLineTooltip,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/Tooltip'
    },{
      name: chartEditor.enums.EditorTabs.GANTT_DATAGRID_TOOLTIP,
      enabled: true,
      classFunc: chartEditor.GanttDataGridTooltip,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/Tooltip'
    },
    {
      name: chartEditor.enums.EditorTabs.GRIDS,
      enabled: true,
      classFunc: chartEditor.GridsPanel,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Axes_and_Grids/Axis_Basics#grids'
    },
    {
      name: chartEditor.enums.EditorTabs.COLOR_SCALE,
      enabled: true,
      classFunc: chartEditor.ColorScalePanel,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Basic_Charts/Heat_Map_Chart#color_scale'
    },
    {
      name: chartEditor.enums.EditorTabs.COLOR_RANGE,
      enabled: true,
      classFunc: chartEditor.ColorRangePanel,
      instance: null,
      docsUrl: 'http://api.anychart.stg/v8/anychart.core.ui.ColorRange'
    },
    {
      name: chartEditor.enums.EditorTabs.CONTEXT_MENU,
      enabled: true,
      classFunc: chartEditor.ContextMenuPanel,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Common_Settings/UI_Controls/Context_Menu'
    },
    {
      name: chartEditor.enums.EditorTabs.CREDITS,
      enabled: true,
      classFunc: chartEditor.CreditsPanel,
      instance: null,
      docsUrl: 'http://docs.anychart.stg/Quick_Start/Credits'
    }
  ];
};
goog.inherits(chartEditor.AppearanceTabs, chartEditor.Tabs);

