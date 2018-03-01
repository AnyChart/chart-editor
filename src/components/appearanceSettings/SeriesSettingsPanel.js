goog.provide('anychart.chartEditorModule.SeriesSettingsPanel');

goog.require('anychart.chartEditorModule.MultiplePanelsBase');
goog.require('anychart.chartEditorModule.settings.Series');



/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.MultiplePanelsBase}
 */
anychart.chartEditorModule.SeriesSettingsPanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.SeriesSettingsPanel.base(this, 'constructor', model, 'Series', opt_domHelper);

  this.stringId = 'series';

  this.allowAddPanels(false);
};
goog.inherits(anychart.chartEditorModule.SeriesSettingsPanel, anychart.chartEditorModule.MultiplePanelsBase);


/**
 * Create series settings panels.
 */
anychart.chartEditorModule.SeriesSettingsPanel.prototype.createPanels = function() {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var singleSeries = model.isChartSingleSeries();
  if (!singleSeries) {
    var chartType = model.getValue([['chart'], 'type']);
    var mappings = model.getValue([['dataSettings'], 'mappings']);

    var seriesId;
    var plotIndex;
    var series;

    for (var i = 0; i < mappings.length; i++) {
      for (var j = 0; j < mappings[i].length; j++) {
        seriesId = mappings[i][j]['id'] ? mappings[i][j]['id'] : j;
        plotIndex = chartType === 'stock' ? i : void 0;
        series = new anychart.chartEditorModule.settings.Series(model, seriesId, j, plotIndex);
        this.addPanelInstance(series);
      }
    }
  }
};

