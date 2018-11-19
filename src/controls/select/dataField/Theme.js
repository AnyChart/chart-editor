goog.provide('chartEditor.controls.select.Theme');
goog.provide('chartEditor.controls.select.ThemeDataFieldSelect');

goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.controls.select.DataFieldSelect');



/**
 * DataField component for Theme property.
 *
 * @param {Object=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 *
 * @constructor
 * @extends {chartEditor.controls.select.DataField}
 */
chartEditor.controls.select.Theme = function(opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  chartEditor.controls.select.Theme.base(this, 'constructor',opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass);

  this.setSelect(new chartEditor.controls.select.ThemeDataFieldSelect(
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass
  ));
};
goog.inherits(chartEditor.controls.select.Theme, chartEditor.controls.select.DataField);


/**
 * @param {Object=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 * @constructor
 * @extends {chartEditor.controls.select.DataFieldSelect}
 */
chartEditor.controls.select.ThemeDataFieldSelect = function (opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  chartEditor.controls.select.ThemeDataFieldSelect.base(this, 'constructor',
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass);
};
goog.inherits(chartEditor.controls.select.ThemeDataFieldSelect, chartEditor.controls.select.DataFieldSelect);



/** @inheritDoc */
chartEditor.controls.select.ThemeDataFieldSelect.prototype.setValueByTarget = function(target) {
  if (this.excluded) return;

  this.target = target;
  var stringKey = chartEditor.EditorModel.getStringKey(this.key);
  var value = /** @type {string} */(chartEditor.binding.exec(this.target, stringKey));

  if (goog.isArray(value))
    value = value[0] || 'defaultTheme';

  if (goog.isObject(value) && value['stringId'])
    value = value['stringId'];

  this.noDispatch = true;
  this.setValue(value);
  this.noDispatch = false;
};
