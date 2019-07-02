goog.provide('chartEditor.ui.appearanceTabs.StockScales');

goog.require('chartEditor.ui.PanelsGroup');
goog.require('chartEditor.ui.panel.scales.StockX');
goog.require('chartEditor.ui.panel.scales.StockY');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelsGroup}
 */
chartEditor.ui.appearanceTabs.StockScales = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.StockScales.base(this, 'constructor', model, 'Scales', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.STOCK_SCALES;

  this.allowAddPanels(false);

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.appearanceTabs.StockScales, chartEditor.ui.PanelsGroup);


/**
 * Create scale panel.
 */
chartEditor.ui.appearanceTabs.StockScales.prototype.createPanels = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var mappings = model.getValue([['dataSettings'], 'mappings']);

  // add X scale
  if (!this.scaleX_) {
    var scaleX = new chartEditor.ui.panel.scales.StockX(model, 0);
    this.addPanelInstance(scaleX);
    this.scaleX_ = scaleX;
  }

  // add one Y scale panel for every existing plot
  for (var plotIndex = 0; plotIndex < mappings.length; plotIndex++) {
    var plotScaleY = new chartEditor.ui.panel.scales.StockY(model, plotIndex);
    this.addPanelInstance(plotScaleY);
  }
};


/** @inheritDoc */
chartEditor.ui.appearanceTabs.StockScales.prototype.onModelChange = function(evt) {
  chartEditor.ui.appearanceTabs.StockScales.base(this, 'onModelChange', evt);

  var needRebuildFor = ['addPlot', 'dropPlot'];
  if (!this.isExcluded() && evt && needRebuildFor.indexOf(evt.meta) !== -1) {
    this.rebuildPanels();
  }
};
