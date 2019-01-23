goog.provide('chartEditor.ui.appearanceTabs.Legend');

goog.require('chartEditor.ui.PanelsGroup');
goog.require('chartEditor.ui.panel.Legend');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelsGroup}
 */
chartEditor.ui.appearanceTabs.Legend = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.Legend.base(this, 'constructor', model, 'Legend', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.LEGEND;

  this.allowAddPanels(false);

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.appearanceTabs.Legend, chartEditor.ui.PanelsGroup);


/**
 * Create legend panel panel.
 */
chartEditor.ui.appearanceTabs.Legend.prototype.createPanels = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var chartType = model.getValue([['chart'], 'type']);
  var mappings = model.getValue([['dataSettings'], 'mappings']);

  var plotIndex;
  var legend;
  for (var i = 0; i < mappings.length; i++) {
    plotIndex = chartType === 'stock' ? i : void 0;
    legend = new chartEditor.ui.panel.Legend(model, plotIndex);

    this.addPanelInstance(legend);
  }
};
