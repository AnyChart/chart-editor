goog.provide('chartEditor.button.Italic');

goog.require('chartEditor.button.Toggle');



/**
 * Italic button for text appearance.
 * @constructor
 * @extends {chartEditor.button.Toggle}
 */
chartEditor.button.Italic = function() {
  chartEditor.button.Italic.base(this, 'constructor');

  this.setIcon('ac ac-italic');
  this.setNormalValue('normal');
  this.setCheckedValue('italic');
};
goog.inherits(chartEditor.button.Italic, chartEditor.button.Toggle);
