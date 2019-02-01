goog.provide('chartEditor.ui.control.button.Bold');

goog.require('chartEditor.ui.control.button.Toggle');



/**
 * Bold button for text appearance.
 * @constructor
 * @extends {chartEditor.ui.control.button.Toggle}
 */
chartEditor.ui.control.button.Bold = function() {
  chartEditor.ui.control.button.Bold.base(this, 'constructor');

  this.setIcon('ac ac-bold');
  this.setNormalValue('normal');
  this.setCheckedValue('bold');
};
goog.inherits(chartEditor.ui.control.button.Bold, chartEditor.ui.control.button.Toggle);
