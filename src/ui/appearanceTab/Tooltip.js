goog.provide('chartEditor.ui.appearanceTabs.Tooltip');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.Tooltip');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.Tooltip = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.Tooltip.base(this, 'constructor', model, 'Tooltip', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.TOOLTIP;

  this.key = [['chart'], ['settings'], 'tooltip()'];

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.appearanceTabs.Tooltip, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.Tooltip.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.Tooltip.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var settings = new chartEditor.ui.panel.Tooltip(model);
  settings.allowEnabled(false);
  settings.allowReset(false);
  settings.setName(null);
  settings.setKey(this.getKey());
  this.addChildControl(settings);
};
