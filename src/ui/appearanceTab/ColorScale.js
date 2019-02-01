goog.provide('chartEditor.ui.appearanceTabs.ColorScale');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.scales.Base');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.ColorScale = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.ColorScale.base(this, 'constructor', model, 'Color Scale', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.COLOR_SCALE;
};
goog.inherits(chartEditor.ui.appearanceTabs.ColorScale, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.ColorScale.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.ColorScale.base(this, 'createDom');
  var element = /** @type {Element} */(this.getElement());
  goog.dom.classlist.add(element, 'panel-panel-color-scale');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var chartColorScale = new chartEditor.ui.panel.scales.Base(model, ['linear-color', 'ordinal-color']);
  chartColorScale.setName(null);
  chartColorScale.setKey([['chart'], ['settings'], 'colorScale()']);
  this.addChildControl(chartColorScale);
};
