goog.provide('chartEditor.ui.control.input.Numbers');

goog.require('chartEditor.ui.control.input.Base');


/**
 * This creates the label input object.
 * @param {string=} opt_label The text to show as the label.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {chartEditor.ui.control.input.Base}
 */
chartEditor.ui.control.input.Numbers = function(opt_label, opt_domHelper) {
  opt_label = goog.isDef(opt_label) ? opt_label : 'Only numbers';
  chartEditor.ui.control.input.Numbers.base(this, 'constructor', opt_label, opt_domHelper);

  this.setValidateFunction(function(value){
    return !isNaN(Number(value));
  });
  this.setFormatterFunction(function(value){
    // TODO: remove String casting and check this
    return String(Number(value));
  });
};
goog.inherits(chartEditor.ui.control.input.Numbers, chartEditor.ui.control.input.Base);
