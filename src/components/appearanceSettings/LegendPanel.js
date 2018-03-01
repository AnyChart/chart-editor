goog.provide('anychart.chartEditorModule.LegendPanel');

goog.require('anychart.chartEditorModule.MultiplePanelsBase');
goog.require('anychart.chartEditorModule.settings.Legend');



/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.MultiplePanelsBase}
 */
anychart.chartEditorModule.LegendPanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.LegendPanel.base(this, 'constructor', model, 'Legend', opt_domHelper);

  this.stringId = 'legend';

  this.allowAddPanels(false);
};
goog.inherits(anychart.chartEditorModule.LegendPanel, anychart.chartEditorModule.MultiplePanelsBase);


/**
 * Create legend settings panels.
 */
anychart.chartEditorModule.LegendPanel.prototype.createPanels = function() {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var chartType = model.getValue([['chart'], 'type']);
  var mappings = model.getValue([['dataSettings'], 'mappings']);

  var plotIndex;
  var legend;
  for (var i = 0; i < mappings.length; i++) {
    plotIndex = chartType === 'stock' ? i : void 0;
    legend = new anychart.chartEditorModule.settings.Legend(model, plotIndex);

    this.addPanelInstance(legend);
  }
};
