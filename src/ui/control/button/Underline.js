goog.provide('chartEditor.ui.control.button.Underline');

goog.require('chartEditor.ui.control.button.Toggle');



/**
 * Underline button for text appearance.
 * @constructor
 * @extends {chartEditor.ui.control.button.Toggle}
 */
chartEditor.ui.control.button.Underline = function() {
  chartEditor.ui.control.button.Underline.base(this, 'constructor');

  this.setIcon('ac ac-underline');
  this.setNormalValue('normal');
  this.setCheckedValue('underline');
};
goog.inherits(chartEditor.ui.control.button.Underline, chartEditor.ui.control.button.Toggle);
