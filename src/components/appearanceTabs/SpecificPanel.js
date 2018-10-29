goog.provide('chartEditor.SpecificPanel');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.settings.specific.Cartesian');
goog.require('chartEditor.settings.specific.GaugeCircular');
goog.require('chartEditor.settings.specific.GaugeLinear');
goog.require('chartEditor.settings.specific.HeatMap');
goog.require('chartEditor.settings.specific.Mekko');
goog.require('chartEditor.settings.specific.Pie');
goog.require('chartEditor.settings.specific.Polar');
goog.require('chartEditor.settings.specific.Radar');
goog.require('chartEditor.settings.specific.Sankey');
goog.require('chartEditor.settings.specific.Scatter');
goog.require('chartEditor.settings.specific.TagCloud');
goog.require('chartEditor.settings.specific.TreeMap');
goog.require('chartEditor.settings.specific.Waterfall');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.SpecificPanel = function(model, opt_domHelper) {
  chartEditor.SpecificPanel.base(this, 'constructor', model, 'Specific Settings', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.SPECIFIC;

  this.descriptors_ = [
    {
      chartType: 'heatMap',
      classFunc: chartEditor.settings.specific.HeatMap
    },
    {
      chartType: 'waterfall',
      classFunc: chartEditor.settings.specific.Waterfall
    },
    {
      chartType: 'pie',
      classFunc: chartEditor.settings.specific.Pie
    },
    {
      chartType: 'radar',
      classFunc: chartEditor.settings.specific.Radar
    },
    {
      chartType: 'polar',
      classFunc: chartEditor.settings.specific.Polar
    },
    {
      chartType: 'scatter',
      classFunc: chartEditor.settings.specific.Scatter
    },
    {
      chartType: 'treeMap',
      classFunc: chartEditor.settings.specific.TreeMap
    },
    {
      chartType: 'sankey',
      classFunc: chartEditor.settings.specific.Sankey
    },
    {
      chartType: 'gauges.circular',
      classFunc: chartEditor.settings.specific.GaugeCircular
    },
    {
      chartType: ['gauges.linear', 'gauges.led', 'gauges.tank', 'gauges.thermometer'],
      classFunc: chartEditor.settings.specific.GaugeLinear
    },
    {
      chartType: ['mosaic', 'mekko'],
      classFunc: chartEditor.settings.specific.Mekko
    },
    {
      chartType: ['line', 'area', 'bar', 'column', 'box'],
      classFunc: chartEditor.settings.specific.Cartesian
    },
    {
      chartType: ['tagCloud'],
      classFunc: chartEditor.settings.specific.TagCloud
    }
  ];
};
goog.inherits(chartEditor.SpecificPanel, chartEditor.SettingsPanel);


/**
 * Updates specific content and exclusion state of panel.
 * @public
 */
chartEditor.SpecificPanel.prototype.updateSpecific = function() {
  if (this.isExcluded()) return;

  var self = this;
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var currentChartType = model.getModel()['chart']['type'];

  if (currentChartType !== this.chartType_) {
    self.chartType_ = currentChartType;

    var descriptors = goog.array.filter(this.descriptors_, function(item) {
      return goog.isString(item.chartType) ?
          item.chartType === self.chartType_ :
          goog.array.indexOf(item.chartType, self.chartType_) !== -1;
    });

    var descriptor = descriptors.length && descriptors[0];

    if (descriptor) {
      if (this.specific_) {
        this.removeChild(this.specific_, true);
        goog.dispose(this.specific_);
      }

      this.specific_ = /** @type {chartEditor.SettingsPanel} */(new descriptor.classFunc(model));
      this.specific_.allowEnabled(false);

      this.addChild(this.specific_, true);
      goog.style.setElementShown(this.specific_.getTopElement(), false);

      this.name = this.specific_.getName();
      if (this.topEl) {
        // Update title
        var titleEl = this.getDomHelper().getElementByClass('title', this.topEl);
        this.getDomHelper().setTextContent(titleEl, /** @type {string} */(this.name));
      }

      this.exclude(false);

    } else
      this.exclude(true);
  }
};


/** @inheritDoc */
chartEditor.SpecificPanel.prototype.enterDocument = function() {
  this.updateSpecific();
  chartEditor.SpecificPanel.base(this, 'enterDocument');
};


/** @override */
chartEditor.SpecificPanel.prototype.disposeInternal = function() {
  goog.dispose(this.specific_);
  this.specific_ = null;

  chartEditor.SpecificPanel.base(this, 'disposeInternal');
};
