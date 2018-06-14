goog.provide('chartEditor.ColorScalePanel');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.settings.scales.Base');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.ColorScalePanel = function(model, opt_domHelper) {
  chartEditor.ColorScalePanel.base(this, 'constructor', model, 'Color Scale', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.COLOR_SCALE;
};
goog.inherits(chartEditor.ColorScalePanel, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.ColorScalePanel.prototype.createDom = function() {
  chartEditor.ColorScalePanel.base(this, 'createDom');
  var element = /** @type {Element} */(this.getElement());
  goog.dom.classlist.add(element, 'settings-panel-color-scale');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var chartColorScale = new chartEditor.settings.scales.Base(model, ['linear-color', 'ordinal-color']);
  chartColorScale.setName(null);
  chartColorScale.setKey([['chart'], ['settings'], 'colorScale()']);
  this.addChild(chartColorScale, true);
};
