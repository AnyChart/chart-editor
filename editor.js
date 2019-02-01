goog.provide('editor');

goog.require('chartEditor.editor.Chart');
goog.require('chartEditor.editor.Stock');
goog.require('chartEditor.editor.Map');
goog.require('chartEditor.editor.Gantt');

/**
 * Set default css name mapping for anychart chart editor ui.
 */
goog.setCssNameMapping({
  'goog': 'anychart-ce'
});

chartEditor.DEVELOP = true;

chartEditor.PRODUCT = chartEditor.model.Product.GANTT;