goog.provide('anychart.chartEditorModule.GeneralTheming');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem');
goog.require('anychart.chartEditorModule.controls.select.Palettes');
goog.require('anychart.chartEditorModule.settings.Title');



/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.GeneralTheming = function(model, opt_domHelper) {
  anychart.chartEditorModule.GeneralTheming.base(this, 'constructor', model, 'General Theming', opt_domHelper);
};
goog.inherits(anychart.chartEditorModule.GeneralTheming, anychart.chartEditorModule.SettingsPanel);


/** @inheritDoc */
anychart.chartEditorModule.GeneralTheming.prototype.createDom = function() {
  anychart.chartEditorModule.GeneralTheming.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var themes = goog.object.filter(goog.dom.getWindow()['anychart']['themes'], function(item) {
    return item['palette'];
  });
  this.themeSelect = new anychart.chartEditorModule.controls.select.DataField({caption: 'Select theme', label: 'Theme'});
  var themeNames = goog.object.getKeys(themes);

  for (var i = 0; i < themeNames.length; i++) {
    this.themeSelect.getSelect().addItem(new anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem({
      caption: themeNames[i],
      value: themeNames[i]
    }));
  }
  this.themeSelect.getSelect().init(model, [['anychart'], 'theme()'], 'setTheme');
  this.addChild(this.themeSelect, true);

  var realPalettes = goog.dom.getWindow()['anychart']['palettes'];
  this.paletteSelect = new anychart.chartEditorModule.controls.select.Palettes({caption: 'Select palette', label: 'Palette'});
  for (var paletteName in realPalettes) {
    if (realPalettes.hasOwnProperty(paletteName) && goog.isArray(realPalettes[paletteName])) {
      this.paletteSelect.getSelect().addItem(new anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem({
        caption: paletteName,
        value: paletteName
      }));
    }
  }
  this.paletteSelect.init(model, [['chart'], ['settings'], 'palette()']);
  this.addChild(this.paletteSelect, true);
};


/** @inheritDoc */
anychart.chartEditorModule.GeneralTheming.prototype.onModelChange = function(evt) {
  if (this.paletteSelect) this.paletteSelect.updateExclusion();
  anychart.chartEditorModule.GeneralTheming.base(this, 'onModelChange', evt);
};


/** @inheritDoc */
anychart.chartEditorModule.GeneralTheming.prototype.onChartDraw = function(evt) {
  anychart.chartEditorModule.GeneralTheming.base(this, 'onChartDraw', evt);
  if (evt.rebuild) {
    if (this.themeSelect) this.themeSelect.getSelect().setValueByTarget(goog.dom.getWindow()['anychart']);
    if (this.paletteSelect) this.paletteSelect.getSelect().setValueByTarget(evt.chart);
  }
};


/** @override */
anychart.chartEditorModule.GeneralTheming.prototype.disposeInternal = function() {
  goog.disposeAll([this.themeSelect, this.paletteSelect]);

  this.themeSelect = null;
  this.paletteSelect = null;

  anychart.chartEditorModule.GeneralTheming.base(this, 'disposeInternal');
};
