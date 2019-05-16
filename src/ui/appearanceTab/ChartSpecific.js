goog.provide('chartEditor.ui.appearanceTabs.ChartSpecific');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.specific.Cartesian');
goog.require('chartEditor.ui.panel.specific.GaugeCircular');
goog.require('chartEditor.ui.panel.specific.GaugeLinear');
goog.require('chartEditor.ui.panel.specific.HeatMap');
goog.require('chartEditor.ui.panel.specific.Mekko');
goog.require('chartEditor.ui.panel.specific.Pie');
goog.require('chartEditor.ui.panel.specific.Polar');
goog.require('chartEditor.ui.panel.specific.Quadrant');
goog.require('chartEditor.ui.panel.specific.Radar');
goog.require('chartEditor.ui.panel.specific.Sankey');
goog.require('chartEditor.ui.panel.specific.Scatter');
goog.require('chartEditor.ui.panel.specific.TagCloud');
goog.require('chartEditor.ui.panel.specific.TreeMap');
goog.require('chartEditor.ui.panel.specific.Waterfall');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.ChartSpecific = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.ChartSpecific.base(this, 'constructor', model, 'Specific Settings', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.SPECIFIC;

  this.descriptors_ = [
    {
      chartType: 'heatMap',
      classFunc: chartEditor.ui.panel.specific.HeatMap
    },
    {
      chartType: 'waterfall',
      classFunc: chartEditor.ui.panel.specific.Waterfall
    },
    {
      chartType: 'pie',
      classFunc: chartEditor.ui.panel.specific.Pie
    },
    {
      chartType: 'radar',
      classFunc: chartEditor.ui.panel.specific.Radar
    },
    {
      chartType: 'polar',
      classFunc: chartEditor.ui.panel.specific.Polar
    },
    {
      chartType: 'scatter',
      classFunc: chartEditor.ui.panel.specific.Scatter
    },
    {
      chartType: 'treeMap',
      classFunc: chartEditor.ui.panel.specific.TreeMap
    },
    {
      chartType: 'sankey',
      classFunc: chartEditor.ui.panel.specific.Sankey
    },
    {
      chartType: 'gauges.circular',
      classFunc: chartEditor.ui.panel.specific.GaugeCircular
    },
    {
      chartType: ['gauges.linear', 'gauges.led', 'gauges.tank', 'gauges.thermometer'],
      classFunc: chartEditor.ui.panel.specific.GaugeLinear
    },
    {
      chartType: ['mosaic', 'mekko'],
      classFunc: chartEditor.ui.panel.specific.Mekko
    },
    {
      chartType: ['line', 'area', 'bar', 'column', 'box'],
      classFunc: chartEditor.ui.panel.specific.Cartesian
    },
    {
      chartType: ['tagCloud'],
      classFunc: chartEditor.ui.panel.specific.TagCloud
    },
    {
      chartType: ['quadrant'],
      classFunc: chartEditor.ui.panel.specific.Quadrant
    }
  ];

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.appearanceTabs.ChartSpecific, chartEditor.ui.Panel);


/**
 * Updates specific content and exclusion state of panel.
 */
chartEditor.ui.appearanceTabs.ChartSpecific.prototype.updateSpecific = function() {
  if (this.isExcluded()) return;

  var self = this;
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
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

      this.specific_ = /** @type {chartEditor.ui.Panel} */(new descriptor.classFunc(model));
      this.specific_.allowEnabled(false);
      this.specific_.setCssNestedIndex(1);

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
chartEditor.ui.appearanceTabs.ChartSpecific.prototype.onReset = function(evt) {
  this.specific_.reset();
};


/** @inheritDoc */
chartEditor.ui.appearanceTabs.ChartSpecific.prototype.enterDocument = function() {
  this.updateSpecific();
  chartEditor.ui.appearanceTabs.ChartSpecific.base(this, 'enterDocument');
};


/** @override */
chartEditor.ui.appearanceTabs.ChartSpecific.prototype.disposeInternal = function() {
  goog.dispose(this.specific_);
  this.specific_ = null;

  chartEditor.ui.appearanceTabs.ChartSpecific.base(this, 'disposeInternal');
};
