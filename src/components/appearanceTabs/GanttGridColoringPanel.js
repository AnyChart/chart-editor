goog.provide('chartEditor.GanttGridColoringPanel');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.settings.ganttProject.GridColoring');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.GanttGridColoringPanel = function(model, opt_domHelper) {
  chartEditor.GanttGridColoringPanel.base(this, 'constructor', model, 'Grid coloring', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_GRID_COLORING;

  this.allowEnabled(false);
};
goog.inherits(chartEditor.GanttGridColoringPanel, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.GanttGridColoringPanel.prototype.createDom = function() {
  chartEditor.GanttGridColoringPanel.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var gridColoring = new chartEditor.settings.ganttProject.GridColoring(model, '');
  gridColoring.setKey([['chart'], ['settings']]);
  this.addChild(gridColoring, true);
};
