goog.provide('chartEditor.ui.appearanceTabs.GanttGridColoring');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.ganttProject.Coloring');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.GanttGridColoring = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.GanttGridColoring.base(this, 'constructor', model, 'Grid coloring', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_GRID_COLORING;

  this.allowEnabled(false);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-gantt-datagrid-coloring'));
};
goog.inherits(chartEditor.ui.appearanceTabs.GanttGridColoring, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.GanttGridColoring.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.GanttGridColoring.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var timeLine = new chartEditor.ui.panel.ganttProject.Coloring(model, 'Timeline');
  timeLine.setKey([['chart'], ['settings'], 'getTimeline()']);
  timeLine.allowEnabled(false);
  this.addChildControl(timeLine);

  this.addContentSeparator();

  var dataGrid = new chartEditor.ui.panel.ganttProject.Coloring(model, 'Data grid');
  dataGrid.allowEnabled(false);
  dataGrid.setKey([['chart'], ['settings'], 'dataGrid()']);
  this.addChildControl(dataGrid);
};
