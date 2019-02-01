goog.provide('ganttEditor');

goog.require('chartEditor.editor.Gantt');

/**
 * Set default css name mapping for anychart chart editor ui.
 */
goog.setCssNameMapping({
  'goog': 'anychart-ce'
});

chartEditor.DEVELOP = true;

chartEditor.PRODUCT = chartEditor.model.Product.GANTT;