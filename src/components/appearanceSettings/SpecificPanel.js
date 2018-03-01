goog.provide('anychart.chartEditorModule.SpecificPanel');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.settings.specific.Cartesian');
goog.require('anychart.chartEditorModule.settings.specific.GaugeCircular');
goog.require('anychart.chartEditorModule.settings.specific.GaugeLinear');
goog.require('anychart.chartEditorModule.settings.specific.Mekko');
goog.require('anychart.chartEditorModule.settings.specific.Pie');
goog.require('anychart.chartEditorModule.settings.specific.Polar');
goog.require('anychart.chartEditorModule.settings.specific.Radar');
goog.require('anychart.chartEditorModule.settings.specific.TreeMap');
goog.require('anychart.chartEditorModule.settings.specific.Waterfall');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.SpecificPanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.SpecificPanel.base(this, 'constructor', model, 'Specific Settings', opt_domHelper);

  this.descriptors_ = [
    {
      chartType: 'waterfall',
      classFunc: anychart.chartEditorModule.settings.specific.Waterfall
    },
    {
      chartType: 'pie',
      classFunc: anychart.chartEditorModule.settings.specific.Pie
    },
    {
      chartType: 'radar',
      classFunc: anychart.chartEditorModule.settings.specific.Radar
    },
    {
      chartType: 'polar',
      classFunc: anychart.chartEditorModule.settings.specific.Polar
    },
    {
      chartType: 'treeMap',
      classFunc: anychart.chartEditorModule.settings.specific.TreeMap
    },
    {
      chartType: 'gauges.circular',
      classFunc: anychart.chartEditorModule.settings.specific.GaugeCircular
    },
    {
      chartType: ['gauges.linear', 'gauges.led', 'gauges.tank', 'gauges.thermometer'],
      classFunc: anychart.chartEditorModule.settings.specific.GaugeLinear
    },
    {
      chartType: ['mosaic', 'mekko'],
      classFunc: anychart.chartEditorModule.settings.specific.Mekko
    },
    {
      chartType: ['line', 'area', 'bar', 'column', 'box'],
      classFunc: anychart.chartEditorModule.settings.specific.Cartesian
    }];
};
goog.inherits(anychart.chartEditorModule.SpecificPanel, anychart.chartEditorModule.SettingsPanel);


/**
 * Updates specific content and exclusion state of panel.
 * @public
 */
anychart.chartEditorModule.SpecificPanel.prototype.updateSpecific = function() {
  var self = this;
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
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
      if (this.specificComponent_) {
        this.removeChild(this.specificComponent_, true);
        goog.dispose(this.specificComponent_);
      }

      this.specificComponent_ = /** @type {anychart.chartEditorModule.SettingsPanel} */(new descriptor.classFunc(model));
      this.specificComponent_.allowEnabled(false);

      this.addChild(this.specificComponent_, true);
      goog.style.setElementShown(this.specificComponent_.getTopElement(), false);

      this.name = this.specificComponent_.getName();
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
anychart.chartEditorModule.SpecificPanel.prototype.enterDocument = function() {
  this.updateSpecific();
  anychart.chartEditorModule.SpecificPanel.base(this, 'enterDocument');
};


/** @override */
anychart.chartEditorModule.SpecificPanel.prototype.disposeInternal = function() {
  goog.dispose(this.specificComponent_);
  this.specificComponent_ = null;

  anychart.chartEditorModule.SpecificPanel.base(this, 'disposeInternal');
};
