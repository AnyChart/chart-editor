goog.provide('chartEditor.editor.Basic');

goog.require('chartEditor.editor.Base');
goog.require('chartEditor.model.Basic');


/**
 * Editor ui for Basic Editor
 * 
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @param {chartEditor.enums.ChartType=} opt_lockedChartType - Locked chart type.
 * @extends {chartEditor.editor.Base}
 */
chartEditor.editor.Basic = function(opt_domHelper, opt_lockedChartType) {
  chartEditor.editor.Basic.base(this, 'constructor', opt_domHelper, opt_lockedChartType);

  this.setModel(new chartEditor.model.Basic());
  
  this.addClassName(goog.getCssName('anychart-ce-basic'));
};
goog.inherits(chartEditor.editor.Basic, chartEditor.editor.Base);


/**
 * Constructor function for Stock Editor.
 * @param {chartEditor.enums.ChartType=} opt_lockedChartType - Locked chart type.
 * @return {chartEditor.editor.Basic}
 */
window['anychart'].basicEditor = function(opt_lockedChartType) {
  return new chartEditor.editor.Basic(void 0, opt_lockedChartType);
};


//exports
(function() {
  goog.exportSymbol('anychart.basicEditor', window['anychart'].basicEditor);
})();
