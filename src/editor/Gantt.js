goog.provide('chartEditor.editor.Gantt');

goog.require('chartEditor.editor.Base');
goog.require('chartEditor.model.Gantt');
goog.require('chartEditor.utils');



/**
 * Editor ui for Gantt Editor
 * 
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @param {chartEditor.enums.ChartType=} opt_lockedChartType - Locked chart type.
 * @extends {chartEditor.editor.Base}
 */
chartEditor.editor.Gantt = function(opt_domHelper, opt_lockedChartType) {
  chartEditor.editor.Gantt.base(this, 'constructor', opt_domHelper, opt_lockedChartType);

  this.setModel(new chartEditor.model.Gantt());

  this.addClassName(goog.getCssName('anychart-ce-gantt'));
};
goog.inherits(chartEditor.editor.Gantt, chartEditor.editor.Base);


/**
 * Constructor function for Map Editor.
 * @param {chartEditor.enums.ChartType=} opt_lockedChartType - Locked chart type.
 * @return {chartEditor.editor.Gantt}
 */
window['anychart'].ganttEditor = function(opt_lockedChartType) {
  return new chartEditor.editor.Gantt(void 0, opt_lockedChartType);
};


/**
 * Wrapper function for preprocessing mapping for Gantt Resource chart.
 * @param {Object} mappingObj default mapping for the current chart type
 * @return {Object}
 */
chartEditor.editor.Gantt.preprocessResourceMapping = function(mappingObj) {
  return chartEditor.utils.preprocessResourceMapping(mappingObj);
};


/**
 * Wrapper function for preprocessing data for Gantt Resource chart.
 * @param {Array.<Object>} rawData raw incoming data
 * @param {Object} mappingObj default mapping for the current chart type
 * @return {Array.<Object>}
 */
chartEditor.editor.Gantt.preprocessResourceData = function(rawData, mappingObj) {
  return chartEditor.utils.preprocessResourceData(rawData, mappingObj);
};


//exports
(function() {
  goog.exportSymbol('anychart.ganttEditor', window['anychart'].ganttEditor);
  goog.exportSymbol('chartEditor.editor.Gantt.preprocessResourceMapping', chartEditor.editor.Gantt.preprocessResourceMapping);
  goog.exportSymbol('chartEditor.editor.Gantt.preprocessResourceData', chartEditor.editor.Gantt.preprocessResourceData);
})();
