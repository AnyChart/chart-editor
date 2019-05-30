goog.provide('chartEditor.ui.appearanceTabs.GanttTimeLine');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.ganttProject.elements.Base');
goog.require('chartEditor.ui.panel.ganttProject.elements.Connectors');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.GanttTimeLine = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.GanttTimeLine.base(this, 'constructor', model, 'Timeline', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_TIMELINE;

  this.setKey([['chart'], ['settings'], 'getTimeline()']);

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.appearanceTabs.GanttTimeLine, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.GanttTimeLine.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.GanttTimeLine.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var splitterPosition = new chartEditor.ui.control.input.Base();
  var splitterPositionLC = new chartEditor.ui.control.wrapped.Labeled(splitterPosition, 'Splitter Position', true);
  splitterPositionLC.init(model, [['chart'], ['settings'], 'splitterPosition()']);
  this.addChildControl(splitterPositionLC);
  this.addContentSeparator();

  var allElements = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'All elements');
  allElements.setKey(this.genKey('elements()'));
  this.addChildControl(allElements);
  this.addContentSeparator();

  var tasksElement = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'Tasks');
  tasksElement.setKey(this.genKey('tasks()'));
  this.addChildControl(tasksElement);
  this.addContentSeparator();

  var tasksProgressElement = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'Tasks progress');
  tasksProgressElement.setKey(this.genKey('tasks().progress()'));
  // tasksProgressElement.allowEnabled(false);
  this.addChildControl(tasksProgressElement);
  this.addContentSeparator();

  var groupingTasksElement = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'Grouping tasks');
  groupingTasksElement.setKey(this.genKey('groupingTasks()'));
  this.addChildControl(groupingTasksElement);
  this.addContentSeparator();

  var gTasksProgressElement = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'Grouping tasks progress');
  gTasksProgressElement.setKey(this.genKey('groupingTasks().progress()'));
  this.addChildControl(gTasksProgressElement);
  this.addContentSeparator();

  var milestonesElement = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'Milestones');
  milestonesElement.setKey(this.genKey('milestones()'));
  this.addChildControl(milestonesElement);
  this.addContentSeparator();

  var milestonesPreviewElement = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'Milestones preview');
  milestonesPreviewElement.setKey(this.genKey('milestones().preview()'));
  this.addChildControl(milestonesPreviewElement);
  this.addContentSeparator();

  var baseLinesElement = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'Baselines (Planned)');
  baseLinesElement.setKey(this.genKey('baselines()'));
  baseLinesElement.setOption('above', true);
  this.addChildControl(baseLinesElement);
  this.addContentSeparator();

  if (model.getModel()['chart']['type'] === chartEditor.enums.ChartType.GANTT_RESOURCE) {
    var periodsElement = new chartEditor.ui.panel.ganttProject.elements.Base(model , 'Periods');
    periodsElement.setKey(this.genKey('periods()'));
    this.addChildControl(periodsElement);
    this.addContentSeparator();
  }

  var connectorsElement = new chartEditor.ui.panel.ganttProject.elements.Connectors(model, 'Connectors');
  connectorsElement.setKey(this.genKey('connectors()'));
  this.addChildControl(connectorsElement);
};
