goog.provide('chartEditor.controls.select.Palettes');
goog.provide('chartEditor.controls.select.PalettesDataFieldSelect');

goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.controls.select.DataFieldSelect');



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
 * @extends {chartEditor.controls.select.DataField}
 */
chartEditor.controls.select.Palettes = function(opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  chartEditor.controls.select.Palettes.base(this, 'constructor',opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass);

  this.setSelect(new chartEditor.controls.select.PalettesDataFieldSelect(
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass
  ));
};
goog.inherits(chartEditor.controls.select.Palettes, chartEditor.controls.select.DataField);


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
chartEditor.controls.select.PalettesDataFieldSelect = function (opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  chartEditor.controls.select.PalettesDataFieldSelect.base(this, 'constructor',
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass);
};
goog.inherits(chartEditor.controls.select.PalettesDataFieldSelect, chartEditor.controls.select.DataFieldSelect);


/** @inheritDoc */
chartEditor.controls.select.PalettesDataFieldSelect.prototype.handleSelectionChange = function(evt) {
  if (this.excluded) return;

  if (!this.noDispatch && this.editorModel)
    this.editorModel.dropChartSettings(/getSeries\('\w+'\)\.color\(\)/);

  chartEditor.controls.select.PalettesDataFieldSelect.base(this, 'handleSelectionChange', evt);
};


/** @inheritDoc */
chartEditor.controls.select.PalettesDataFieldSelect.prototype.setValueByTarget = function(target) {
  if (this.excluded) return;

  this.target = target;
  var stringKey = chartEditor.EditorModel.getStringKey(this.getKey());
  var value = chartEditor.binding.exec(this.target, stringKey);

  if (value) {
    var realPalettes = goog.dom.getWindow()['anychart']['palettes'];
    var stringValue = '';
    for (var paletteName in realPalettes) {
      if (realPalettes.hasOwnProperty(paletteName) &&
          goog.isArray(realPalettes[paletteName]) &&
          goog.array.equals(value['items'](), realPalettes[paletteName])) {
        stringValue = paletteName;
        break;
      }
    }

    this.noDispatch = true;
    this.setValue(stringValue);
    this.noDispatch = false;
  }
};