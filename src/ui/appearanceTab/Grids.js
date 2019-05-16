goog.provide('chartEditor.ui.appearanceTabs.Grids');

goog.require('chartEditor.ui.PanelsGroup');
goog.require('chartEditor.ui.panel.PlotGrids');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelsGroup}
 */
chartEditor.ui.appearanceTabs.Grids = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.Grids.base(this, 'constructor', model, 'Grids', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GRIDS;

  this.allowAddPanels(false);
};
goog.inherits(chartEditor.ui.appearanceTabs.Grids, chartEditor.ui.PanelsGroup);


/**
 * Create plotGrids panel panel.
 */
chartEditor.ui.appearanceTabs.Grids.prototype.createPanels = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var chartType = model.getValue([['chart'], 'type']);
  var mappings = model.getValue([['dataSettings'], 'mappings']);

  var plotIndex;
  var plotGrids;
  for (var i = 0; i < mappings.length; i++) {
    plotIndex = chartType === 'stock' ? i : void 0;
    plotGrids = new chartEditor.ui.panel.PlotGrids(model, plotIndex);

    this.addPanelInstance(plotGrids);
  }
};



/** @inheritDoc */
chartEditor.ui.appearanceTabs.Grids.prototype.onModelChange = function(evt) {
  chartEditor.ui.appearanceTabs.Grids.base(this, 'onModelChange', evt);

  var needRebuildFor = ['addPlot', 'dropPlot'];
  if (!this.isExcluded() && evt && needRebuildFor.indexOf(evt.meta) !== -1) {
    this.rebuildPanels();
  }
};