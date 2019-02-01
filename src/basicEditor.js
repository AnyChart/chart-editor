goog.provide('basicEditor');

goog.require('chartEditor.editor.Basic');

/**
 * Set default css name mapping for anychart chart editor ui.
 */
goog.setCssNameMapping({
  'goog': 'anychart-ce'
});

chartEditor.DEVELOP = true;

chartEditor.PRODUCT = chartEditor.model.Product.BASIC;