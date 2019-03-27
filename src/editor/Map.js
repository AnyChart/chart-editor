goog.provide('chartEditor.editor.Map');

goog.require('chartEditor.editor.Base');
goog.require('chartEditor.model.Map');


/**
 * Editor ui for Map Editor
 * 
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @param {chartEditor.enums.ChartType=} opt_lockedChartType - Locked chart type.
 * @extends {chartEditor.editor.Base}
 */
chartEditor.editor.Map = function(opt_domHelper, opt_lockedChartType) {
  chartEditor.editor.Map.base(this, 'constructor', opt_domHelper, opt_lockedChartType);

  this.setModel(new chartEditor.model.Map());
  
  this.addClassName(goog.getCssName('anychart-ce-map'));
};
goog.inherits(chartEditor.editor.Map, chartEditor.editor.Base);


/**
 * Constructor function for Map Editor.
 * @param {chartEditor.enums.ChartType=} opt_lockedChartType - Locked chart type.
 * @return {chartEditor.editor.Map}
 */
window['anychart'].mapEditor = function(opt_lockedChartType) {
  return new chartEditor.editor.Map(void 0, opt_lockedChartType);
};


//exports
(function() {
  goog.exportSymbol('anychart.mapEditor', window['anychart'].mapEditor);
})();
