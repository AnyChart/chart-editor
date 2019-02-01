goog.provide('chartEditor.editor.Map');

goog.require('chartEditor.editor.Base');
goog.require('chartEditor.model.Map');


/**
 * Editor ui for Map Editor
 * 
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @extends {chartEditor.editor.Base}
 */
chartEditor.editor.Map = function(opt_domHelper) {
  chartEditor.editor.Map.base(this, 'constructor', opt_domHelper);

  this.setModel(new chartEditor.model.Map());
  
  this.addClassName(goog.getCssName('anychart-ce-map'));
};
goog.inherits(chartEditor.editor.Map, chartEditor.editor.Base);


/**
 * Constructor function for Map Editor.
 * @return {chartEditor.editor.Map}
 */
window['anychart'].mapEditor = function() {
  return new chartEditor.editor.Map();
};


//exports
(function() {
  goog.exportSymbol('anychart.mapEditor', window['anychart'].mapEditor);
})();
