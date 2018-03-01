goog.provide('anychart.chartEditorModule.ColorScalePanel');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.settings.scales.Base');



/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.ColorScalePanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.ColorScalePanel.base(this, 'constructor', model, 'Color Scale', opt_domHelper);

  this.stringId = 'colorScale';
};
goog.inherits(anychart.chartEditorModule.ColorScalePanel, anychart.chartEditorModule.SettingsPanel);


/** @inheritDoc */
anychart.chartEditorModule.ColorScalePanel.prototype.createDom = function() {
  anychart.chartEditorModule.ColorScalePanel.base(this, 'createDom');
  var element = /** @type {Element} */(this.getElement());
  goog.dom.classlist.add(element, 'settings-panel-color-scale');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var chartColorScale = new anychart.chartEditorModule.settings.scales.Base(model, ['linear-color', 'ordinal-color']);
  chartColorScale.setName(null);
  chartColorScale.setKey([['chart'], ['settings'], 'colorScale()']);
  this.addChild(chartColorScale, true);
};
