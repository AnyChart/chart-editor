goog.provide('chartEditor.AppearanceTabs');

goog.require('chartEditor.ChartTitlePanel');
goog.require('chartEditor.CircularRangesPanel');
goog.require('chartEditor.ColorRangePanel');
goog.require('chartEditor.ColorScalePanel');
goog.require('chartEditor.Component');
goog.require('chartEditor.ContextMenuPanel');
goog.require('chartEditor.CreditsPanel');
goog.require('chartEditor.DataLabelsPanel');
goog.require('chartEditor.EditorModel');
goog.require('chartEditor.GaugeAxesPanel');
goog.require('chartEditor.GeneralTheming');
goog.require('chartEditor.GridsPanel');
goog.require('chartEditor.LegendPanel');
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
 * @param {chartEditor.Component} tabs
 * @param {chartEditor.Component} tabContent
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.Tabs}
 */
chartEditor.AppearanceTabs = function(model, tabs, tabContent, opt_domHelper) {
  chartEditor.AppearanceTabs.base(this, 'constructor', model, tabs, tabContent, opt_domHelper);

  this.setModel(model);

  this.descriptors = [
    {
      name: 'GeneralTheming',
      enabled: true,
      classFunc: chartEditor.GeneralTheming,
      instance: null
    },
    {
      name: 'Specific',
      enabled: true,
      classFunc: chartEditor.SpecificPanel,
      instance: null
    },
    {
      name: 'ChartTitle',
      enabled: true,
      classFunc: chartEditor.ChartTitlePanel,
      instance: null
    },
    {
      name: 'Legend',
      enabled: true,
      classFunc: chartEditor.LegendPanel,
      instance: null
    },
    {
      name: 'DataLabels',
      enabled: true,
      classFunc: chartEditor.DataLabelsPanel,
      instance: null
    },
    {
      name: 'SeriesSettings',
      enabled: true,
      classFunc: chartEditor.SeriesSettingsPanel,
      instance: null
    },
    {
      name: 'Pointers',
      enabled: true,
      classFunc: chartEditor.PointersPanel,
      instance: null
    },
    {
      name: 'Ranges',
      enabled: true,
      classFunc: chartEditor.CircularRangesPanel,
      instance: null
    },
    {
      name: 'ScaleBars',
      enabled: true,
      classFunc: chartEditor.ScaleBarsPanel,
      instance: null
    },
    {
      name: 'Scales',
      enabled: true,
      classFunc: chartEditor.ScalesPanel,
      instance: null
    },
    {
      name: 'CartesianXAxes',
      enabled: true,
      classFunc: chartEditor.XAxesPanel,
      instance: null
    },
    {
      name: 'CartesianYAxes',
      enabled: true,
      classFunc: chartEditor.YAxesPanel,
      instance: null
    },
    {
      name: 'RadarXAxes',
      enabled: true,
      classFunc: chartEditor.RadarPolarXAxisPanel,
      instance: null
    },
    {
      name: 'RadarYAxes',
      enabled: true,
      classFunc: chartEditor.RadarPolarYAxisPanel,
      instance: null
    },
    {
      name: 'gaugeAxes',
      enabled: true,
      classFunc: chartEditor.GaugeAxesPanel,
      instance: null
    },
    {
      name: 'Tooltip',
      enabled: true,
      classFunc: chartEditor.TooltipPanel,
      instance: null
    },
    {
      name: 'Grids',
      enabled: true,
      classFunc: chartEditor.GridsPanel,
      instance: null
    },
    {
      name: 'ColorScale',
      enabled: true,
      classFunc: chartEditor.ColorScalePanel,
      instance: null
    },
    {
      name: 'ColorRange',
      enabled: true,
      classFunc: chartEditor.ColorRangePanel,
      instance: null
    },
    {
      name: 'ContextMenu',
      enabled: true,
      classFunc: chartEditor.ContextMenuPanel,
      instance: null
    },
    {
      name: 'Credits',
      enabled: true,
      classFunc: chartEditor.CreditsPanel,
      instance: null
    }
  ];
};
goog.inherits(chartEditor.AppearanceTabs, chartEditor.Tabs);


/**
 * Updates exclusion state of panels.
 */
chartEditor.AppearanceTabs.prototype.updateExclusions = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var panelsExcludes = model.getChartTypeSettings()['panelsExcludes'];

  for (var i = 0; i < this.descriptors.length; i++) {
    var panel = /** @type {?chartEditor.SettingsPanel} */(this.descriptors[i].instance);
    var excluded;

    if (this.descriptors[i].name === 'Specific') {
      panel.updateSpecific();
      excluded = panel.isExcluded();
      if (!excluded)
        this.getDomHelper().setTextContent(this.buttons[i], /** @type {string} */(panel.getName()));

    } else {
      excluded = !this.descriptors[i].enabled || panelsExcludes && goog.array.indexOf(panelsExcludes, panel.getStringId()) !== -1;
      panel.exclude(excluded);
    }

    if (excluded && this.currentPanel === i)
      this.currentPanel = 0;
  }
};
