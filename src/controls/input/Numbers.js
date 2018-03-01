goog.provide('anychart.chartEditorModule.input.Numbers');


goog.require('anychart.chartEditorModule.input.Base');


/**
 * This creates the label input object.
 * @param {string=} opt_label The text to show as the label.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {anychart.chartEditorModule.input.Base}
 */
anychart.chartEditorModule.input.Numbers = function(opt_label, opt_domHelper) {
  opt_label = goog.isDef(opt_label) ? opt_label : 'Only numbers';
  anychart.chartEditorModule.input.Numbers.base(this, 'constructor', opt_label, opt_domHelper);

  this.setValidateFunction(function(value){
    return !isNaN(Number(value));
  });
  this.setFormatterFunction(function(value){
    return String(Number(value));
  });
};
goog.inherits(anychart.chartEditorModule.input.Numbers, anychart.chartEditorModule.input.Base);
