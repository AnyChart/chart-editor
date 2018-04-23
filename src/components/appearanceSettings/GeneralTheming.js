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
};
goog.inherits(chartEditor.GeneralTheming, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.GeneralTheming.prototype.createDom = function() {
  chartEditor.GeneralTheming.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var themes = goog.object.filter(goog.dom.getWindow()['anychart']['themes'], function(item) {
    return item['palette'];
  });
  this.themeSelect = new chartEditor.controls.select.Theme({caption: 'Select theme', label: 'Theme'});
  var themeNames = goog.object.getKeys(themes);

  for (var i = 0; i < themeNames.length; i++) {
    this.themeSelect.getSelect().addItem(new chartEditor.controls.select.DataFieldSelectMenuItem({
      caption: themeNames[i],
      value: themeNames[i]
    }));
  }
  this.themeSelect.getSelect().init(model, [['anychart'], 'theme()'], 'setTheme');
  this.addChild(this.themeSelect, true);

  var realPalettes = goog.dom.getWindow()['anychart']['palettes'];
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
    if (this.themeSelect) this.themeSelect.getSelect().setValueByTarget(goog.dom.getWindow()['anychart']);

    if (this.paletteSelect) {
      this.paletteSelect.updateExclusion();
      this.paletteSelect.getSelect().setValueByTarget(evt.chart);
    }
  }
};


/** @override */
chartEditor.GeneralTheming.prototype.disposeInternal = function() {
  goog.disposeAll([this.themeSelect, this.paletteSelect]);

  this.themeSelect = null;
  this.paletteSelect = null;

  chartEditor.GeneralTheming.base(this, 'disposeInternal');
};
