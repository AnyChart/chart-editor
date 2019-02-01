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


//exports
(function() {
  goog.exportSymbol('anychart.ganttEditor', window['anychart'].ganttEditor);
})();
