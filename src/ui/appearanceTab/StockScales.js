goog.provide('chartEditor.ui.appearanceTabs.StockScales');

goog.require('chartEditor.scales.ScalePanel');
goog.require('chartEditor.ui.panel.scales.StockX');
goog.require('chartEditor.ui.PanelsGroup');



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
  var scale = new chartEditor.ui.panel.scales.StockX(model);
  // this.addPanelInstance(scale);
  this.addChildControl(scale);

  // add Y scales
  // TODO: create stock scale panel
  for (var i = 0; i < mappings.length; i++) {
    // scale = new chartEditor.ui.panel.Legend(model, i);

    // this.addPanelInstance(scale);
  }
};


/** @inheritDoc */
chartEditor.ui.appearanceTabs.StockScales.prototype.onModelChange = function(evt) {
  chartEditor.ui.appearanceTabs.StockScales.base(this, 'onModelChange', evt);

  // TODO: check behavior
  var needRebuildFor = ['addPlot', 'dropPlot'];
  if (!this.isExcluded() && evt && needRebuildFor.indexOf(evt.meta) !== -1) {
    this.rebuildPanels();
  }
};
