goog.provide('chartEditor.editor.bundle');

goog.require('chartEditor.editor.Chart');
goog.require('chartEditor.editor.Gantt');
// goog.require('chartEditor.editor.Map');
goog.require('chartEditor.editor.Stock');
goog.require('chartEditor.enums');


/**
 * Constructor function for Stock Editor.
 * @param {chartEditor.enums.ChartType=} opt_lockedChartType - Locked chart type.
 * @return {chartEditor.editor.Base}
 */
window['anychart'].editor = function(opt_lockedChartType) {
  var lockedChartType = goog.isDefAndNotNull(opt_lockedChartType) ?
      chartEditor.enums.normalizeChartType(opt_lockedChartType) :
      null;
  if (lockedChartType) {
    var types = chartEditor.model.ChartTypes;
    var config = types[lockedChartType];
    var product = config.product;
    switch (product) {
      case chartEditor.model.Product.GANTT:
        return new chartEditor.editor.Gantt(void 0, lockedChartType);
      // case chartEditor.model.Product.MAP:
      //   return new chartEditor.editor.Map(void 0, lockedChartType);
      case chartEditor.model.Product.STOCK:
        return new chartEditor.editor.Stock(void 0, lockedChartType);
      default:
        return new chartEditor.editor.Chart(void 0, lockedChartType);
    }
  }
  // return new chartEditor.editor.Chart();
};


//exports
(function() {
  goog.exportSymbol('anychart.editor', window['anychart'].editor);
})();

