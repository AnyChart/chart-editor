goog.provide('chartEditor.ui.control.button.Italic');

goog.require('chartEditor.ui.control.button.Toggle');



/**
 * Italic button for text appearance.
 * @constructor
 * @extends {chartEditor.ui.control.button.Toggle}
 */
chartEditor.ui.control.button.Italic = function() {
  chartEditor.ui.control.button.Italic.base(this, 'constructor');

  this.setIcon('ac ac-italic');
  this.setNormalValue('normal');
  this.setCheckedValue('italic');
};
goog.inherits(chartEditor.ui.control.button.Italic, chartEditor.ui.control.button.Toggle);
