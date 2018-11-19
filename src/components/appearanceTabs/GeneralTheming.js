goog.provide('chartEditor.GeneralTheming');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.controls.select.DataFieldSelectMenuItem');
goog.require('chartEditor.controls.select.Palettes');
goog.require('chartEditor.controls.select.Theme');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.GeneralTheming = function(model, opt_domHelper) {
  chartEditor.GeneralTheming.base(this, 'constructor', model, 'General Theming', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.THEMING;

  this.anychart_ = goog.dom.getWindow()['anychart'];
};
goog.inherits(chartEditor.GeneralTheming, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.GeneralTheming.prototype.createDom = function() {
  chartEditor.GeneralTheming.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var themes = this.anychart_['themes'];
  this.themeSelect = new chartEditor.controls.select.Theme({caption: 'Select theme', label: 'Theme'});
  for (var themeName in themes) {
    this.themeSelect.getSelect().addItem(new chartEditor.controls.select.DataFieldSelectMenuItem({
      caption: themeName,
      value: themeName
    }));

    // Yes, here we modify anychart.themes
    // The only way to know which theme is applied at the moment
    themes[themeName]['stringId'] = themeName;
  }

  this.themeSelect.getSelect().init(model, [['anychart'], 'theme()'], 'setTheme');
  this.addChild(this.themeSelect, true);

  var realPalettes = this.anychart_['palettes'];
  this.paletteSelect = new chartEditor.controls.select.Palettes({caption: 'Select palette', label: 'Palette'});
  for (var paletteName in realPalettes) {
    if (realPalettes.hasOwnProperty(paletteName) && goog.isArray(realPalettes[paletteName])) {
      this.paletteSelect.getSelect().addItem(new chartEditor.controls.select.DataFieldSelectMenuItem({
        caption: paletteName,
        value: paletteName
      }));
    }
  }
  this.paletteSelect.init(model, [['chart'], ['settings'], 'palette()']);
  this.addChild(this.paletteSelect, true);
};


/** @inheritDoc */
chartEditor.GeneralTheming.prototype.onModelChange = function(evt) {
  if (this.paletteSelect) this.paletteSelect.updateExclusion();
  chartEditor.GeneralTheming.base(this, 'onModelChange', evt);
};


/** @inheritDoc */
chartEditor.GeneralTheming.prototype.onChartDraw = function(evt) {
  chartEditor.GeneralTheming.base(this, 'onChartDraw', evt);
  if (evt.rebuild) {
    if (this.themeSelect)
      this.themeSelect.getSelect().setValueByTarget(this.anychart_);

    if (this.paletteSelect) {
      this.paletteSelect.updateExclusion();
      this.paletteSelect.getSelect().setValueByTarget(evt.chart);
    }
  }
};


/** @override */
chartEditor.GeneralTheming.prototype.disposeInternal = function() {
  goog.disposeAll(this.themeSelect, this.paletteSelect);
  this.themeSelect = null;
  this.paletteSelect = null;

  chartEditor.GeneralTheming.base(this, 'disposeInternal');
};
