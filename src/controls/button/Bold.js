goog.provide('chartEditor.button.Bold');

goog.require('chartEditor.button.Toggle');



/**
 * Bold button for text appearance.
 * @constructor
 * @extends {chartEditor.button.Toggle}
 */
chartEditor.button.Bold = function() {
  chartEditor.button.Bold.base(this, 'constructor');

  this.setIcon('ac ac-bold');
  this.setNormalValue('normal');
  this.setCheckedValue('bold');
};
goog.inherits(chartEditor.button.Bold, chartEditor.button.Toggle);
