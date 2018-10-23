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
goog.require('chartEditor.GaugeAxesPanel');
goog.require('chartEditor.GeneralTheming');
goog.require('chartEditor.GridsPanel');
goog.require('chartEditor.LegendPanel');
goog.require('chartEditor.NodePanel');
goog.require('chartEditor.PointersPanel');
goog.require('chartEditor.RadarPolarXAxisPanel');
goog.require('chartEditor.RadarPolarYAxisPanel');
goog.require('chartEditor.ScaleBarsPanel');
goog.require("chartEditor.ScalesPanel");
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
      instance: null
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
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.LEGEND,
      enabled: true,
      classFunc: chartEditor.LegendPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.DATA_LABELS,
      enabled: true,
      classFunc: chartEditor.DataLabelsPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.SERIES,
      enabled: true,
      classFunc: chartEditor.SeriesSettingsPanel,
      instance: null
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
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      enabled: true,
      classFunc: chartEditor.XAxesPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.CARTESIAN_AXES,
      enabled: true,
      classFunc: chartEditor.YAxesPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      enabled: true,
      classFunc: chartEditor.RadarPolarXAxisPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.RADAR_POLAR_AXES,
      enabled: true,
      classFunc: chartEditor.RadarPolarYAxisPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.GAUGE_AXES,
      enabled: true,
      classFunc: chartEditor.GaugeAxesPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.TOOLTIP,
      enabled: true,
      classFunc: chartEditor.TooltipPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.GRIDS,
      enabled: true,
      classFunc: chartEditor.GridsPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.COLOR_SCALE,
      enabled: true,
      classFunc: chartEditor.ColorScalePanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.COLOR_RANGE,
      enabled: true,
      classFunc: chartEditor.ColorRangePanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.CONTEXT_MENU,
      enabled: true,
      classFunc: chartEditor.ContextMenuPanel,
      instance: null
    },
    {
      name: chartEditor.enums.EditorTabs.CREDITS,
      enabled: true,
      classFunc: chartEditor.CreditsPanel,
      instance: null
    }
  ];
};
goog.inherits(chartEditor.AppearanceTabs, chartEditor.Tabs);

