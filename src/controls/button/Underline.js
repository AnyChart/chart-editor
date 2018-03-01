goog.provide('chartEditor.button.Underline');

goog.require('chartEditor.button.Toggle');



/**
 * Underline button for text appearance.
 * @constructor
 * @extends {chartEditor.button.Toggle}
 */
chartEditor.button.Underline = function() {
  chartEditor.button.Underline.base(this, 'constructor');

  this.setIcon('ac ac-underline');
  this.setNormalValue('normal');
  this.setCheckedValue('underline');
};
goog.inherits(chartEditor.button.Underline, chartEditor.button.Toggle);
