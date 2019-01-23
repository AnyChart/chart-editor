goog.provide('chartEditor.ui.control.fieldSelect.Theme');
goog.provide('chartEditor.ui.control.fieldSelect.ThemeDataFieldSelect');

goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.fieldSelect.Select');



/**
 * DataField ui for Theme property.
 *
 * @param {Object=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 *
 * @constructor
 * @extends {chartEditor.ui.control.fieldSelect.Base}
 */
chartEditor.ui.control.fieldSelect.Theme = function(opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  chartEditor.ui.control.fieldSelect.Theme.base(this, 'constructor',opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass);

  this.setSelect(new chartEditor.ui.control.fieldSelect.ThemeDataFieldSelect(
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass
  ));
};
goog.inherits(chartEditor.ui.control.fieldSelect.Theme, chartEditor.ui.control.fieldSelect.Base);


/**
 * @param {Object=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 * @constructor
 * @extends {chartEditor.ui.control.fieldSelect.Select}
 */
chartEditor.ui.control.fieldSelect.ThemeDataFieldSelect = function (opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  chartEditor.ui.control.fieldSelect.ThemeDataFieldSelect.base(this, 'constructor',
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass);
};
goog.inherits(chartEditor.ui.control.fieldSelect.ThemeDataFieldSelect, chartEditor.ui.control.fieldSelect.Select);



/** @inheritDoc */
chartEditor.ui.control.fieldSelect.ThemeDataFieldSelect.prototype.setValueByTarget = function(target) {
  if (this.excluded) return;

  this.target = target;
  var stringKey = chartEditor.model.Base.getStringKey(this.key);
  var value = /** @type {string} */(chartEditor.binding.exec(this.target, stringKey));

  if (goog.isArray(value))
    value = value[0] || 'defaultTheme';

  if (goog.isObject(value) && value['stringId'])
    value = value['stringId'];

  this.noDispatch = true;
  this.setValue(value);
  this.noDispatch = false;
};
