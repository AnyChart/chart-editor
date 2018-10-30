goog.provide('chartEditor.TooltipPanel');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.settings.Tooltip');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.TooltipPanel = function(model, opt_domHelper) {
  chartEditor.TooltipPanel.base(this, 'constructor', model, 'Tooltip', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.TOOLTIP;

  this.key = [['chart'], ['settings'], 'tooltip()'];
};
goog.inherits(chartEditor.TooltipPanel, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.TooltipPanel.prototype.createDom = function() {
  chartEditor.TooltipPanel.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var settings = new chartEditor.settings.Tooltip(model);
  settings.allowEnabled(false);
  settings.setName('Tooltip');
  settings.setKey(this.getKey());
  this.addChild(settings, true);
};
