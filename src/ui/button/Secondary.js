goog.provide('chartEditor.ui.button.Secondary');
goog.require('chartEditor.ui.button.Base');



/**
 * @param {goog.ui.ControlContent=} opt_content
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.button.Base}
 */
chartEditor.ui.button.Secondary = function(opt_content, opt_renderer, opt_domHelper) {
  chartEditor.ui.button.Secondary.base(this, 'constructor', opt_content, opt_renderer, opt_domHelper);
  this.addClassName(chartEditor.ui.button.Secondary.CSS_CLASS);
};
goog.inherits(chartEditor.ui.button.Secondary, chartEditor.ui.button.Base);


/** @type {string} */
chartEditor.ui.button.Secondary.CSS_CLASS = goog.getCssName('anychart-button-secondary');
