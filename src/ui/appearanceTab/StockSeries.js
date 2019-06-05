goog.provide('chartEditor.ui.appearanceTabs.StockSeries');

goog.require('chartEditor.ui.PanelsGroup');
goog.require('chartEditor.ui.panel.series.StockSeries');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelsGroup}
 */
chartEditor.ui.appearanceTabs.StockSeries = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.StockSeries.base(this, 'constructor', model, 'Series', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.SERIES;

  this.allowAddPanels(false);
};
goog.inherits(chartEditor.ui.appearanceTabs.StockSeries, chartEditor.ui.PanelsGroup);


/**
 * Create series panel panel.
 */
chartEditor.ui.appearanceTabs.StockSeries.prototype.createPanels = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var mappings = model.getValue([['dataSettings'], 'mappings']);

  for (var i = 0; i < mappings.length; i++) {
    for (var j = 0; j < mappings[i].length; j++) {
      var seriesId = mappings[i][j]['id'] ? mappings[i][j]['id'] : j;
      var series = new chartEditor.ui.panel.series.StockSeries(model, seriesId, j, i);
      this.addPanelInstance(series);
    }
  }
};


/** @inheritDoc */
chartEditor.ui.appearanceTabs.StockSeries.prototype.onModelChange = function(evt) {
  chartEditor.ui.appearanceTabs.StockSeries.base(this, 'onModelChange', evt);
  var needRebuildFor = ['addPlot', 'dropPlot', 'addSeries', 'dropSeries', 'setSeriesType'];
  if (!this.isExcluded() && evt && needRebuildFor.indexOf(evt.meta) !== -1) {
    this.rebuildPanels();
  }
};
