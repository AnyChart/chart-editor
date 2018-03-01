goog.provide('anychart.chartEditorModule.GridsPanel');

goog.require('anychart.chartEditorModule.MultiplePanelsBase');
goog.require('anychart.chartEditorModule.settings.PlotGrids');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.MultiplePanelsBase}
 */
anychart.chartEditorModule.GridsPanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.GridsPanel.base(this, 'constructor', model, 'Grids', opt_domHelper);

  this.stringId = 'grids';

  this.allowAddPanels(false);
};
goog.inherits(anychart.chartEditorModule.GridsPanel, anychart.chartEditorModule.MultiplePanelsBase);


/**
 * Create plotGrids settings panels.
 */
anychart.chartEditorModule.GridsPanel.prototype.createPanels = function() {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var chartType = model.getValue([['chart'], 'type']);
  var mappings = model.getValue([['dataSettings'], 'mappings']);

  var plotIndex;
  var plotGrids;
  for (var i = 0; i < mappings.length; i++) {
    plotIndex = chartType === 'stock' ? i : void 0;
    plotGrids = new anychart.chartEditorModule.settings.PlotGrids(model, plotIndex);

    this.addPanelInstance(plotGrids);
  }
};
