goog.provide('chartEditor.ui.appearanceTabs.GanttTimeLine');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.ganttProject.elements.Base');



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

  var elements = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'Timeline elements');
  elements.allowEnabled(false);
  elements.setKey(this.genKey('elements()'));
  this.addChildControl(elements);
  this.addContentSeparator();

  var baseLinesElement = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'Baselines');
  baseLinesElement.setKey(this.genKey('baselines()'));
  baseLinesElement.allowEnabled(false);
  baseLinesElement.setOption('above', true);
  this.addChildControl(baseLinesElement);
  this.addContentSeparator();

  var groupingTasksElement = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'Grouping tasks');
  groupingTasksElement.setKey(this.genKey('groupingTasks()'));
  groupingTasksElement.allowEnabled(false);
  groupingTasksElement.allowReset(true);
  this.addChildControl(groupingTasksElement);
  this.addContentSeparator();

  var milestonesElement = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'Milestones');
  milestonesElement.setKey(this.genKey('milestones()'));
  milestonesElement.allowEnabled(false);
  milestonesElement.allowReset(true);
  this.addChildControl(milestonesElement);
  this.addContentSeparator();

  var periodsElement = new chartEditor.ui.panel.ganttProject.elements.Base(model , 'Periods');
  periodsElement.setKey(this.genKey('periods()'));
  periodsElement.allowEnabled(false);
  this.addChildControl(periodsElement);
  this.addContentSeparator();

  var taskElement = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'Tasks');
  taskElement.setKey(this.genKey('tasks()'));
  taskElement.allowEnabled(false);
  taskElement.allowReset(true);
  this.addChildControl(taskElement);
  this.addContentSeparator();

  var connectorElement = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'Connectors');
  connectorElement.setKey(this.genKey('connectors()'));
  connectorElement.allowEnabled(false);
  connectorElement.setOption('anchor', false);
  connectorElement.setOption('position', false);
  connectorElement.setOption('height', false);
  connectorElement.setOption('offset', false);
  connectorElement.setOption('labels', false);
  this.addChildControl(connectorElement);
};
