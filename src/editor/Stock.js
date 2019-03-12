goog.provide('chartEditor.editor.Stock');

goog.require('chartEditor.editor.Base');
goog.require('chartEditor.model.Stock');


/**
 * Editor ui for Stock Editor
 * 
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @param {chartEditor.enums.ChartType=} opt_lockedChartType - Locked chart type.
 * @extends {chartEditor.editor.Base}
 */
chartEditor.editor.Stock = function(opt_domHelper, opt_lockedChartType) {
  chartEditor.editor.Stock.base(this, 'constructor', opt_domHelper, opt_lockedChartType);

  this.setModel(new chartEditor.model.Stock());
  
  this.addClassName(goog.getCssName('anychart-ce-stock'));
};
goog.inherits(chartEditor.editor.Stock, chartEditor.editor.Base);


/**
 * Constructor function for Stock Editor.
 * @param {chartEditor.enums.ChartType=} opt_lockedChartType - Locked chart type.
 * @return {chartEditor.editor.Stock}
 */
window['anychart'].stockEditor = function(opt_lockedChartType) {
  return new chartEditor.editor.Stock(void 0, opt_lockedChartType);
};


//exports
(function() {
  goog.exportSymbol('anychart.stockEditor', window['anychart'].stockEditor);
})();
