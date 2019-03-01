goog.provide('chartEditor.editor.Chart');

goog.require('chartEditor.editor.Base');
goog.require('chartEditor.model.Chart');


/**
 * Editor ui for Chart Editor
 * 
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @param {chartEditor.enums.ChartType=} opt_lockedChartType - Locked chart type.
 * @extends {chartEditor.editor.Base}
 */
chartEditor.editor.Chart = function(opt_domHelper, opt_lockedChartType) {
  chartEditor.editor.Chart.base(this, 'constructor', opt_domHelper, opt_lockedChartType);

  this.setModel(new chartEditor.model.Chart());
  
  this.addClassName(goog.getCssName('anychart-ce-chart'));
};
goog.inherits(chartEditor.editor.Chart, chartEditor.editor.Base);


/**
 * Constructor function for Stock Editor.
 * @param {chartEditor.enums.ChartType=} opt_lockedChartType - Locked chart type.
 * @return {chartEditor.editor.Chart}
 */
window['anychart'].chartEditor = function(opt_lockedChartType) {
  return new chartEditor.editor.Chart(void 0, opt_lockedChartType);
};

window['anychart'].editor = window['anychart'].chartEditor;

//exports
(function() {
  goog.exportSymbol('anychart.chartEditor', window['anychart'].chartEditor);
  goog.exportSymbol('anychart.editor', window['anychart'].editor);
})();
