goog.provide('chartEditor');

goog.require('chartEditor.editor.Chart');

/**
 * Set default css name mapping for anychart chart editor ui.
 */
goog.setCssNameMapping({
  'goog': 'anychart-ce'
});

chartEditor.DEVELOP = true;

chartEditor.PRODUCT = chartEditor.model.Product.CHART;