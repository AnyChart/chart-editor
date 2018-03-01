goog.provide('anychart.chartEditorModule.settings.scales.LinearColorSpecific');

goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.input.Palette');
goog.require('anychart.chartEditorModule.settings.scales.SpecificBase');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.settings.scales.SpecificBase}
 */
anychart.chartEditorModule.settings.scales.LinearColorSpecific = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.scales.LinearColorSpecific.base(this, 'constructor', model, opt_domHelper);
};
goog.inherits(anychart.chartEditorModule.settings.scales.LinearColorSpecific, anychart.chartEditorModule.settings.scales.SpecificBase);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.scales.LinearColorSpecific.CSS_CLASS = goog.getCssName('anychart-settings-panel-scale-linear-color');


/** @override */
anychart.chartEditorModule.settings.scales.LinearColorSpecific.prototype.createDom = function() {
  anychart.chartEditorModule.settings.scales.LinearColorSpecific.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), anychart.chartEditorModule.settings.scales.LinearColorSpecific.CSS_CLASS);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var colors = new anychart.chartEditorModule.input.Palette('Comma separated colors');
  this.colors_ = new anychart.chartEditorModule.controls.LabeledControl(colors, 'Palette');
  this.colors_.init(model, this.genKey('colors', true));
  this.addChild(this.colors_, true);
};


/** @inheritDoc */
anychart.chartEditorModule.settings.scales.LinearColorSpecific.prototype.onChartDraw = function(evt) {
  anychart.chartEditorModule.settings.scales.LinearColorSpecific.base(this, 'onChartDraw', evt);

  if (!this.isExcluded() && this.scale_ && this.colors_) {
    var colors = this.scale_.colors();
    this.colors_.getControl().setValueByColors(colors);
  }
};


/** @override */
anychart.chartEditorModule.settings.scales.LinearColorSpecific.prototype.disposeInternal = function() {
  goog.dispose(this.colors_);
  this.colors_ = null;
  anychart.chartEditorModule.settings.scales.LinearColorSpecific.base(this, 'disposeInternal');
};
