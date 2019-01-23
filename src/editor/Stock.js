goog.provide('chartEditor.editor.Stock');

goog.require('chartEditor.editor.Base');
goog.require('chartEditor.model.Stock');


/**
 * Editor ui for Stock Editor
 * 
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @extends {chartEditor.editor.Base}
 */
chartEditor.editor.Stock = function(opt_domHelper) {
  chartEditor.editor.Stock.base(this, 'constructor', opt_domHelper);

  this.setModel(new chartEditor.model.Stock());
  
  this.addClassName(goog.getCssName('anychart-ce-stock'));
};
goog.inherits(chartEditor.editor.Stock, chartEditor.editor.Base);


/**
 * Constructor function for Stock Editor.
 * @return {chartEditor.editor.Stock}
 */
window['anychart'].stockEditor = function() {
  return new chartEditor.editor.Stock();
};


//exports
(function() {
  goog.exportSymbol('anychart.stockEditor', window['anychart'].stockEditor);
})();
