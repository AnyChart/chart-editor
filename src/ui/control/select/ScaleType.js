goog.provide('chartEditor.ui.control.select.ScaleType');
goog.provide('chartEditor.ui.control.select.ScaleTypeDataFieldSelect');

goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.fieldSelect.Select');


/**
 * DataField ui for palettes property.
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
chartEditor.ui.control.select.ScaleType = function(opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  chartEditor.ui.control.select.ScaleType.base(this, 'constructor',opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass);

  this.setSelect(new chartEditor.ui.control.select.ScaleTypeDataFieldSelect(
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass
  ));

  this.addClassName(goog.getCssName('anychart-ce-scale-type'));
};
goog.inherits(chartEditor.ui.control.select.ScaleType, chartEditor.ui.control.fieldSelect.Base);


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
chartEditor.ui.control.select.ScaleTypeDataFieldSelect = function (opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  chartEditor.ui.control.select.ScaleTypeDataFieldSelect.base(this, 'constructor',
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass);
};
goog.inherits(chartEditor.ui.control.select.ScaleTypeDataFieldSelect, chartEditor.ui.control.fieldSelect.Select);


/** @inheritDoc */
chartEditor.ui.control.select.ScaleTypeDataFieldSelect.prototype.applySelection = function () {
  var stringKey = chartEditor.model.Base.getStringKey(this.key);
  var tmp = stringKey.split('.');
  var lastKey = tmp[tmp.length - 1];
  stringKey = stringKey.replace('.' + lastKey, '');

  this.editorModel.dropChartSettings(stringKey);

  chartEditor.ui.control.select.ScaleTypeDataFieldSelect.base(this, 'applySelection');
};
