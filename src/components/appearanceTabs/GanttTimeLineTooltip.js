goog.provide('chartEditor.GanttTimeLineTooltip');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.settings.Tooltip');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.GanttTimeLineTooltip = function(model, opt_domHelper) {
  chartEditor.GanttTimeLineTooltip.base(this, 'constructor', model, 'Timeline tooltip', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_TIMELINE_TOOLTIP;
  this.allowEnabled(false);
};
goog.inherits(chartEditor.GanttTimeLineTooltip, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.GanttTimeLineTooltip.prototype.createDom = function() {
  chartEditor.GanttTimeLineTooltip.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var tooltip = new chartEditor.settings.Tooltip(model);
  tooltip.allowEditDisplayMode(false);
  tooltip.allowEditPositionMode(false);
  tooltip.setKey([['chart'], ['settings'], 'getTimeline().tooltip()']);
  this.addChild(tooltip, true);
};


