goog.provide('chartEditor.ui.appearanceTabs.GanttTimeLineTooltip');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.Tooltip');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.GanttTimeLineTooltip = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.GanttTimeLineTooltip.base(this, 'constructor', model, 'Timeline tooltip', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_TIMELINE_TOOLTIP;

  this.setKey([['chart'], ['settings'], 'getTimeline().tooltip()']);

  this.allowEnabled(true);
  
  this.allowReset(true);
};
goog.inherits(chartEditor.ui.appearanceTabs.GanttTimeLineTooltip, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.GanttTimeLineTooltip.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.GanttTimeLineTooltip.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var tooltip = new chartEditor.ui.panel.Tooltip(model);
  tooltip.setKey(this.getKey());
  tooltip.setName(null);
  tooltip.allowEnabled(false);
  tooltip.allowReset(false);
  tooltip.allowEditDisplayMode(false);
  tooltip.allowEditPositionMode(false);
  this.addChildControl(tooltip);
};


