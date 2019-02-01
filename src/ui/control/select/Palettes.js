goog.provide('chartEditor.ui.control.select.Palettes');
goog.provide('chartEditor.ui.control.select.PalettesDataFieldSelect');

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
chartEditor.ui.control.select.Palettes = function(opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  chartEditor.ui.control.select.Palettes.base(this, 'constructor',opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass);

  this.setSelect(new chartEditor.ui.control.select.PalettesDataFieldSelect(
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass
  ));
};
goog.inherits(chartEditor.ui.control.select.Palettes, chartEditor.ui.control.fieldSelect.Base);


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
chartEditor.ui.control.select.PalettesDataFieldSelect = function (opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  chartEditor.ui.control.select.PalettesDataFieldSelect.base(this, 'constructor',
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass);
};
goog.inherits(chartEditor.ui.control.select.PalettesDataFieldSelect, chartEditor.ui.control.fieldSelect.Select);


/** @inheritDoc */
chartEditor.ui.control.select.PalettesDataFieldSelect.prototype.applySelection = function () {
  this.editorModel.dropChartSettings(/getSeries\('\w+'\)\.color\(\)/);

  chartEditor.ui.control.select.PalettesDataFieldSelect.base(this, 'applySelection');
};


/** @inheritDoc */
chartEditor.ui.control.select.PalettesDataFieldSelect.prototype.setValueByTarget = function(target) {
  if (this.excluded) return;

  this.target = target;
  var stringKey = chartEditor.model.Base.getStringKey(this.getKey());
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