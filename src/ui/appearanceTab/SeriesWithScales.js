goog.provide('chartEditor.ui.appearanceTabs.SeriesWithScales');

goog.require('chartEditor.ui.PanelsGroup');
goog.require('chartEditor.ui.panel.series.SeriesWithScales');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelsGroup}
 */
chartEditor.ui.appearanceTabs.SeriesWithScales = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.SeriesWithScales.base(this, 'constructor', model, 'Series', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.SERIES;

  this.allowAddPanels(false);
};
goog.inherits(chartEditor.ui.appearanceTabs.SeriesWithScales, chartEditor.ui.PanelsGroup);


/**
 * Create series panel panel.
 */
chartEditor.ui.appearanceTabs.SeriesWithScales.prototype.createPanels = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var singleSeries = model.isChartSingleSeries();
  if (!singleSeries) {
    var mappings = model.getValue([['dataSettings'], 'mappings']);

    for (var j = 0; j < mappings[0].length; j++) {
      var seriesId = mappings[0][j]['id'] ? mappings[0][j]['id'] : j;
      var series = new chartEditor.ui.panel.series.SeriesWithScales(model, seriesId, j);
      this.addPanelInstance(series);
    }
  }
};
