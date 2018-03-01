goog.provide('chartEditor.controls.select.FontFamily');

goog.require('chartEditor.controls.select.DataFieldSelect');
goog.require('chartEditor.controls.select.DataFieldSelectMenuItem');



/**
 * @param {(string|Object)=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 * @constructor
 * @extends {chartEditor.controls.select.DataFieldSelect}
 */
chartEditor.controls.select.FontFamily = function(opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  opt_model = goog.isDef(opt_model) ? opt_model : 'font family';
  chartEditor.controls.select.FontFamily.base(this, 'constructor', opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass);

  var fonts = {
    'Arial': 'Arial, Helvetica, sans-serif',
    'Arial Black': 'Arial Black, Gadget, sans-serif',
    'Comic Sans MS': 'Comic Sans MS, cursive, sans-serif',
    'Impact': 'Impact, Charcoal, sans-serif',
    'Lucida Sans Unicode': 'Lucida Sans Unicode, Lucida Grande, sans-serif',
    'Tahoma': 'Tahoma, Geneva, sans-serif',
    'Trebuchet MS': 'Trebuchet MS, Helvetica, sans-serif',
    'Verdana': 'Verdana, Helvetica, Arial, sans-serif',
    'Lucida Console': 'Lucida Console, Monaco, monospace',
    'Source Sans Pro': 'Source Sans Pro, sans-serif'
  };

  for (var key in fonts) {
    this.addItem(new chartEditor.controls.select.DataFieldSelectMenuItem({
      caption: key,
      value: fonts[key]
    }));
  }

};
goog.inherits(chartEditor.controls.select.FontFamily, chartEditor.controls.select.DataFieldSelect);
