goog.provide('chartEditor.ui.appearanceTabs.GanttTooltip');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.ganttProject.Tooltip');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.GanttTooltip = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.GanttTooltip.base(this, 'constructor', model, 'Tooltips', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_TOOLTIP;

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.appearanceTabs.GanttTooltip, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.GanttTooltip.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.GanttTooltip.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  if (model.getModel()['chart']['type'] === chartEditor.enums.ChartType.GANTT_RESOURCE) {
    var periodsTasksTooltip = new chartEditor.ui.panel.ganttProject.Tooltip(model, 'Periods tooltip');
    periodsTasksTooltip.setKey([['chart'], ['settings'], 'getTimeline().periods().tooltip()']);
    this.addChildControl(periodsTasksTooltip);
    this.panelToExpand_ = periodsTasksTooltip;

  } else {
    var dataGridTooltip = new chartEditor.ui.panel.ganttProject.Tooltip(model, 'Data grid tooltip');
    dataGridTooltip.setKey([['chart'], ['settings'], 'dataGrid().tooltip()']);
    this.addChildControl(dataGridTooltip);
    this.addContentSeparator();

    var TLElementsTooltip = new chartEditor.ui.panel.ganttProject.Tooltip(model, 'Timeline tooltip');
    TLElementsTooltip.setKey([['chart'], ['settings'], 'getTimeline().elements().tooltip()']);
    this.addChildControl(TLElementsTooltip);
    this.addContentSeparator();

    var tasksTooltip = new chartEditor.ui.panel.ganttProject.Tooltip(model, 'Tasks tooltip');
    tasksTooltip.setKey([['chart'], ['settings'], 'getTimeline().tasks().tooltip()']);
    this.addChildControl(tasksTooltip);
    this.addContentSeparator();

    var groupingTasksTooltip = new chartEditor.ui.panel.ganttProject.Tooltip(model, 'Grouping tasks tooltip');
    groupingTasksTooltip.setKey([['chart'], ['settings'], 'getTimeline().groupingTasks().tooltip()']);
    this.addChildControl(groupingTasksTooltip);
    this.addContentSeparator();

    var milestonesTasksTooltip = new chartEditor.ui.panel.ganttProject.Tooltip(model, 'Milestones tooltip');
    milestonesTasksTooltip.setKey([['chart'], ['settings'], 'getTimeline().milestones().tooltip()']);
    this.addChildControl(milestonesTasksTooltip);
    this.addContentSeparator();

    var baselinesTasksTooltip = new chartEditor.ui.panel.ganttProject.Tooltip(model, 'Baselines tooltip');
    baselinesTasksTooltip.setKey([['chart'], ['settings'], 'getTimeline().baselines().tooltip()']);
    this.addChildControl(baselinesTasksTooltip);
  }
};

/** @inheritDoc */
chartEditor.ui.appearanceTabs.GanttTooltip.prototype.enterDocument = function() {
  chartEditor.ui.appearanceTabs.GanttTooltip.base(this, 'enterDocument');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  if (model.getModel()['chart']['type'] === chartEditor.enums.ChartType.GANTT_RESOURCE) {
    this.panelToExpand_.expand();
  }
};
