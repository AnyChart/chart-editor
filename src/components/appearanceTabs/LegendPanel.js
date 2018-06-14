goog.provide('chartEditor.LegendPanel');

goog.require('chartEditor.MultiplePanelsBase');
goog.require('chartEditor.settings.Legend');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.MultiplePanelsBase}
 */
chartEditor.LegendPanel = function(model, opt_domHelper) {
  chartEditor.LegendPanel.base(this, 'constructor', model, 'Legend', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.LEGEND;

  this.allowAddPanels(false);
};
goog.inherits(chartEditor.LegendPanel, chartEditor.MultiplePanelsBase);


/**
 * Create legend settings panels.
 */
chartEditor.LegendPanel.prototype.createPanels = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var chartType = model.getValue([['chart'], 'type']);
  var mappings = model.getValue([['dataSettings'], 'mappings']);

  var plotIndex;
  var legend;
  for (var i = 0; i < mappings.length; i++) {
    plotIndex = chartType === 'stock' ? i : void 0;
    legend = new chartEditor.settings.Legend(model, plotIndex);

    this.addPanelInstance(legend);
  }
};
