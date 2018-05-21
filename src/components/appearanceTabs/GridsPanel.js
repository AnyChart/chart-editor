goog.provide('chartEditor.GridsPanel');

goog.require('chartEditor.MultiplePanelsBase');
goog.require('chartEditor.settings.PlotGrids');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.MultiplePanelsBase}
 */
chartEditor.GridsPanel = function(model, opt_domHelper) {
  chartEditor.GridsPanel.base(this, 'constructor', model, 'Grids', opt_domHelper);

  this.stringId = 'grids';

  this.allowAddPanels(false);
};
goog.inherits(chartEditor.GridsPanel, chartEditor.MultiplePanelsBase);


/**
 * Create plotGrids settings panels.
 */
chartEditor.GridsPanel.prototype.createPanels = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var chartType = model.getValue([['chart'], 'type']);
  var mappings = model.getValue([['dataSettings'], 'mappings']);

  var plotIndex;
  var plotGrids;
  for (var i = 0; i < mappings.length; i++) {
    plotIndex = chartType === 'stock' ? i : void 0;
    plotGrids = new chartEditor.settings.PlotGrids(model, plotIndex);

    this.addPanelInstance(plotGrids);
  }
};
