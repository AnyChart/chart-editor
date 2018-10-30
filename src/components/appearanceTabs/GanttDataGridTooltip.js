goog.provide('chartEditor.GanttDataGridTooltip');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.settings.Tooltip');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.GanttDataGridTooltip = function(model, opt_domHelper) {
  chartEditor.GanttDataGridTooltip.base(this, 'constructor', model, 'Data grid tooltip', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_DATAGRID_TOOLTIP;
  this.allowEnabled(false);
};
goog.inherits(chartEditor.GanttDataGridTooltip, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.GanttDataGridTooltip.prototype.createDom = function() {
  chartEditor.GanttDataGridTooltip.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var tooltip = new chartEditor.settings.Tooltip(model);
  tooltip.allowEditDisplayMode(false);
  tooltip.allowEditPositionMode(false);
  tooltip.setKey([['chart'], ['settings'], 'dataGrid().tooltip()']);
  this.addChild(tooltip, true);
};


