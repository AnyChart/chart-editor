goog.provide('anychart.chartEditorModule.controls.select.ScaleType');
goog.provide('anychart.chartEditorModule.controls.select.ScaleTypeDataFieldSelect');

goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.controls.select.DataFieldSelect');


/**
 * DataField component for palettes property.
 *
 * @param {Object=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 *
 * @constructor
 * @extends {anychart.chartEditorModule.controls.select.DataField}
 */
anychart.chartEditorModule.controls.select.ScaleType = function(opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  anychart.chartEditorModule.controls.select.ScaleType.base(this, 'constructor',opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass);

  this.setSelect(new anychart.chartEditorModule.controls.select.ScaleTypeDataFieldSelect(
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass
  ));
};
goog.inherits(anychart.chartEditorModule.controls.select.ScaleType, anychart.chartEditorModule.controls.select.DataField);


/**
 * @param {Object=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 * @constructor
 * @extends {anychart.chartEditorModule.controls.select.DataFieldSelect}
 */
anychart.chartEditorModule.controls.select.ScaleTypeDataFieldSelect = function (opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  anychart.chartEditorModule.controls.select.ScaleTypeDataFieldSelect.base(this, 'constructor',
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass);
};
goog.inherits(anychart.chartEditorModule.controls.select.ScaleTypeDataFieldSelect, anychart.chartEditorModule.controls.select.DataFieldSelect);


/** @inheritDoc */
anychart.chartEditorModule.controls.select.ScaleTypeDataFieldSelect.prototype.handleSelectionChange = function(evt) {
  if (this.isExcluded()) return;

  if (!this.noDispatch && this.editorModel) {
    var stringKey = anychart.chartEditorModule.EditorModel.getStringKey(this.key);
    var tmp = stringKey.split('.');
    var lastKey = tmp[tmp.length - 1];
    stringKey = stringKey.replace('.' + lastKey, '');

    this.editorModel.dropChartSettings(stringKey);
  }

  anychart.chartEditorModule.controls.select.ScaleTypeDataFieldSelect.base(this, 'handleSelectionChange', evt);
};
