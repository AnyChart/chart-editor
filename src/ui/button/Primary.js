goog.provide('chartEditor.ui.button.Primary');
goog.require('chartEditor.ui.button.Base');



/**
 * @param {goog.ui.ControlContent=} opt_content
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.button.Base}
 */
chartEditor.ui.button.Primary = function(opt_content, opt_renderer, opt_domHelper) {
  chartEditor.ui.button.Primary.base(this, 'constructor', opt_content, opt_renderer, opt_domHelper);
  this.addClassName(chartEditor.ui.button.Primary.CSS_CLASS);
};
goog.inherits(chartEditor.ui.button.Primary, chartEditor.ui.button.Base);


/** @type {string} */
chartEditor.ui.button.Primary.CSS_CLASS = goog.getCssName('anychart-button-primary');
