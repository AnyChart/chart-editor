goog.provide('chartEditor.ui.button.Toggle');

goog.require('chartEditor.ui.button.Base');
goog.require('goog.ui.Component.State');



/**
 * @param {goog.ui.ControlContent=} opt_content
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.button.Base}
 */
chartEditor.ui.button.Toggle = function(opt_content, opt_renderer, opt_domHelper) {
  chartEditor.ui.button.Toggle.base(this, 'constructor', opt_content, opt_renderer, opt_domHelper);

  this.addClassName(goog.ui.INLINE_BLOCK_CLASSNAME);
  this.addClassName('anychart-button-standard');
  this.addClassName(chartEditor.ui.button.Toggle.CSS_CLASS);

  this.setSupportedState(goog.ui.Component.State.CHECKED, true);
  this.setAutoStates(goog.ui.Component.State.CHECKED, false);
};
goog.inherits(chartEditor.ui.button.Toggle, chartEditor.ui.button.Base);


/** @type {string} */
chartEditor.ui.button.Toggle.CSS_CLASS = goog.getCssName('anychart-button-toggle');
