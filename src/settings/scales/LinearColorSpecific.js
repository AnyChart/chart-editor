goog.provide('chartEditor.settings.scales.LinearColorSpecific');

goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.input.Palette');
goog.require('chartEditor.settings.scales.SpecificBase');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.scales.SpecificBase}
 */
chartEditor.settings.scales.LinearColorSpecific = function(model, opt_domHelper) {
  chartEditor.settings.scales.LinearColorSpecific.base(this, 'constructor', model, opt_domHelper);
};
goog.inherits(chartEditor.settings.scales.LinearColorSpecific, chartEditor.settings.scales.SpecificBase);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.scales.LinearColorSpecific.CSS_CLASS = goog.getCssName('anychart-settings-panel-scale-linear-color');


/** @override */
chartEditor.settings.scales.LinearColorSpecific.prototype.createDom = function() {
  chartEditor.settings.scales.LinearColorSpecific.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.settings.scales.LinearColorSpecific.CSS_CLASS);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var colors = new chartEditor.input.Palette('Comma separated colors');
  this.colors_ = new chartEditor.controls.LabeledControl(colors, 'Palette');
  this.colors_.init(model, this.genKey('colors', true));
  this.addChild(this.colors_, true);
};


/** @inheritDoc */
chartEditor.settings.scales.LinearColorSpecific.prototype.onChartDraw = function(evt) {
  chartEditor.settings.scales.LinearColorSpecific.base(this, 'onChartDraw', evt);

  if (!this.isExcluded() && this.scale_ && this.colors_) {
    var colors = this.scale_.colors();
    this.colors_.getControl().setValueByColors(colors);
  }
};


/** @override */
chartEditor.settings.scales.LinearColorSpecific.prototype.disposeInternal = function() {
  goog.dispose(this.colors_);
  this.colors_ = null;
  chartEditor.settings.scales.LinearColorSpecific.base(this, 'disposeInternal');
};
