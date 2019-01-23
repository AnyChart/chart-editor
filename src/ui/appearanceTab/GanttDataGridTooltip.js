goog.provide('chartEditor.ui.appearanceTabs.GanttDataGridTooltip');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.Tooltip');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.GanttDataGridTooltip = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.GanttDataGridTooltip.base(this, 'constructor', model, 'Data grid tooltip', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_DATAGRID_TOOLTIP;
  this.allowEnabled(false);
};
goog.inherits(chartEditor.ui.appearanceTabs.GanttDataGridTooltip, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.GanttDataGridTooltip.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.GanttDataGridTooltip.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var tooltip = new chartEditor.ui.panel.Tooltip(model);
  tooltip.allowEditDisplayMode(false);
  tooltip.allowEditPositionMode(false);
  tooltip.setKey([['chart'], ['settings'], 'dataGrid().tooltip()']);
  this.addChild(tooltip, true);
};


