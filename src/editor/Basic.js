goog.provide('chartEditor.editor.Basic');

goog.require('chartEditor.editor.Base');
goog.require('chartEditor.model.Basic');


/**
 * Editor ui for Basic Editor
 * 
 * @constructor
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @extends {chartEditor.editor.Base}
 */
chartEditor.editor.Basic = function(opt_domHelper) {
  chartEditor.editor.Basic.base(this, 'constructor', opt_domHelper);

  this.setModel(new chartEditor.model.Basic());
  
  this.addClassName(goog.getCssName('anychart-ce-basic'));
};
goog.inherits(chartEditor.editor.Basic, chartEditor.editor.Base);


/**
 * Constructor function for Stock Editor.
 * @return {chartEditor.editor.Basic}
 */
window['anychart'].basicEditor = function() {
  return new chartEditor.editor.Basic();
};


//exports
(function() {
  goog.exportSymbol('anychart.basicEditor', window['anychart'].basicEditor);
})();
