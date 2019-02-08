goog.provide('chartEditor.editor.Gantt');

goog.require('chartEditor.editor.Base');
goog.require('chartEditor.model.Gantt');


/**
 * Editor ui for Gantt Editor
 * 
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @extends {chartEditor.editor.Base}
 */
chartEditor.editor.Gantt = function(opt_domHelper) {
  chartEditor.editor.Gantt.base(this, 'constructor', opt_domHelper);

  this.setModel(new chartEditor.model.Gantt());

  this.addClassName(goog.getCssName('anychart-ce-gantt'));
};
goog.inherits(chartEditor.editor.Gantt, chartEditor.editor.Base);


/**
 * Constructor function for Map Editor.
 * @return {chartEditor.editor.Gantt}
 */
window['anychart'].ganttEditor = function() {
  return new chartEditor.editor.Gantt();
};


/**
 * Wrapper function for preprocessing mapping for Gantt Resource chart.
 * @param {Object} mappingObj default mapping for the current chart type
 * @return {Object}
 */
chartEditor.editor.Gantt.preprocessResourceMapping = function(mappingObj) {
  return chartEditor.model.Gantt.preprocessResourceMapping(mappingObj);
};


/**
 * Wrapper function for preprocessing data for Gantt Resource chart.
 * @param {Array.<Object>} rawData raw incoming data
 * @param {Object} mappingObj default mapping for the current chart type
 * @return {Array.<Object>}
 */
chartEditor.editor.Gantt.preprocessResourceData = function(rawData, mappingObj) {
  return chartEditor.model.Gantt.preprocessResourceData(rawData, mappingObj);
};


//exports
(function() {
  goog.exportSymbol('anychart.ganttEditor', window['anychart'].ganttEditor);
  goog.exportSymbol('chartEditor.editor.Gantt.preprocessResourceMapping', chartEditor.editor.Gantt.preprocessResourceMapping);
  goog.exportSymbol('chartEditor.editor.Gantt.preprocessResourceData', chartEditor.editor.Gantt.preprocessResourceData);
})();
