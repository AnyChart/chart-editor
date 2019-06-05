goog.provide('chartEditor.ui.appearanceTabs.GeneralTheming');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.fieldSelect.SelectMenuItem');
goog.require('chartEditor.ui.control.fieldSelect.Theme');
goog.require('chartEditor.ui.control.select.Palettes');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.GeneralTheming = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.GeneralTheming.base(this, 'constructor', model, 'General Theming', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.THEMING;

  this.anychart_ = goog.dom.getWindow()['anychart'];

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.appearanceTabs.GeneralTheming, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.GeneralTheming.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.GeneralTheming.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var themes = this.anychart_['themes'];
  this.themeSelect = new chartEditor.ui.control.fieldSelect.Theme({caption: 'Select theme', label: 'Theme'});
  for (var themeName in themes) {
    this.themeSelect.getSelect().addItem(new chartEditor.ui.control.fieldSelect.SelectMenuItem({
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
  this.paletteSelect = new chartEditor.ui.control.select.Palettes({caption: 'Select palette', label: 'Palette'});
  for (var paletteName in realPalettes) {
    if (realPalettes.hasOwnProperty(paletteName) && goog.isArray(realPalettes[paletteName])) {
      this.paletteSelect.getSelect().addItem(new chartEditor.ui.control.fieldSelect.SelectMenuItem({
        caption: paletteName,
        value: paletteName
      }));
    }
  }
  this.paletteSelect.init(model, [['chart'], ['settings'], 'palette()']);
  this.addChild(this.paletteSelect, true);
};


/** @inheritDoc */
chartEditor.ui.appearanceTabs.GeneralTheming.prototype.onModelChange = function(evt) {
  if (this.paletteSelect) this.paletteSelect.updateExclusion();
  chartEditor.ui.appearanceTabs.GeneralTheming.base(this, 'onModelChange', evt);
};


/** @inheritDoc */
chartEditor.ui.appearanceTabs.GeneralTheming.prototype.onChartDraw = function(evt) {
  chartEditor.ui.appearanceTabs.GeneralTheming.base(this, 'onChartDraw', evt);

  if (this.themeSelect)
    this.themeSelect.getSelect().setValueByTarget(this.anychart_);

  if (this.paletteSelect) {
    this.paletteSelect.updateExclusion();
    this.paletteSelect.getSelect().setValueByTarget(evt.chart);
  }
};


/** @override */
chartEditor.ui.appearanceTabs.GeneralTheming.prototype.disposeInternal = function() {
  goog.disposeAll(this.themeSelect, this.paletteSelect);
  this.themeSelect = null;
  this.paletteSelect = null;

  chartEditor.ui.appearanceTabs.GeneralTheming.base(this, 'disposeInternal');
};


/** @inheritDoc */
chartEditor.ui.appearanceTabs.GeneralTheming.prototype.reset = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  model.removeByKey(this.themeSelect.getKey());
  chartEditor.binding.exec(goog.dom.getWindow()['anychart'], 'theme()', 'defaultTheme');

  model.removeByKey(this.paletteSelect.getKey());
};