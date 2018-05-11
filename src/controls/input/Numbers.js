goog.provide('chartEditor.controls.input.Numbers');

goog.require('chartEditor.controls.input.Base');


/**
 * This creates the label input object.
 * @param {string=} opt_label The text to show as the label.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {chartEditor.controls.input.Base}
 */
chartEditor.controls.input.Numbers = function(opt_label, opt_domHelper) {
  opt_label = goog.isDef(opt_label) ? opt_label : 'Only numbers';
  chartEditor.controls.input.Numbers.base(this, 'constructor', opt_label, opt_domHelper);

  this.setValidateFunction(function(value){
    return !isNaN(Number(value));
  });
  this.setFormatterFunction(function(value){
    return String(Number(value));
  });
};
goog.inherits(chartEditor.controls.input.Numbers, chartEditor.controls.input.Base);
