goog.provide('chartEditor.ui.panel.ganttProject.GanttElements');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.ganttProject.elements.Base');
goog.require('chartEditor.ui.panel.ganttProject.elements.GroupingTasksElement');
goog.require('chartEditor.ui.panel.ganttProject.elements.MilestonesElement');
goog.require('chartEditor.ui.panel.ganttProject.elements.TaskElement');


/**
 * @param {chartEditor.model.Base} model
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.ganttProject.GanttElements = function(model, opt_name, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.GanttElements.base(this, 'constructor', model, '', opt_domHelper);

  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-ce-panel-gantt-elements'));
};
goog.inherits(chartEditor.ui.panel.ganttProject.GanttElements, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.ganttProject.GanttElements.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.GanttElements.base(this, 'createDom');

  var index = 0;

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var elements = new chartEditor.ui.panel.ganttProject.elements.Base(model, index++, 'Timeline element');
  elements.labelsPanel.hideField('enabled');
  elements.allowEnabled(false);
  elements.addClassName(goog.getCssName('anychart-ce-panel-gantt-element-timeline'));
  elements.setKey(this.genKey('elements()'));
  this.addChildControl(elements);
  this.addContentSeparator();

  var baseLinesElement = new chartEditor.ui.panel.ganttProject.elements.Base(model, index++,  'Baseline elements');
  baseLinesElement.setKey(this.genKey('baselines()'));
  baseLinesElement.showElement('above');
  baseLinesElement.addClassName(goog.getCssName('anychart-ce-panel-gantt-element-baselines'));
  baseLinesElement.allowEnabled(false);
  this.addChildControl(baseLinesElement);
  this.addContentSeparator();

  var connectorElement = new chartEditor.ui.panel.ganttProject.elements.Base(model, index++, 'Connector elements');
  connectorElement.setKey(this.genKey('connectors()'));
  connectorElement.allowEnabled(false);
  connectorElement.hideField('anchor');
  connectorElement.hideField('position');
  connectorElement.hideField('height');
  connectorElement.hideField('offset');
  connectorElement.hideField('labels');
  connectorElement.addClassName(goog.getCssName('anychart-ce-panel-gantt-element-connector'));
  this.addChildControl(connectorElement);
  this.addContentSeparator();

  var groupingTasksElement = new chartEditor.ui.panel.ganttProject.elements.GroupingTasksElement(model, index++);
  groupingTasksElement.setKey(this.genKey('groupingTasks()'));
  this.addChildControl(groupingTasksElement);
  this.addContentSeparator();

  var milestonesElement = new chartEditor.ui.panel.ganttProject.elements.MilestonesElement(model, index++);
  milestonesElement.setKey(this.genKey('milestones()'));
  this.addChildControl(milestonesElement);
  this.addContentSeparator();

  var periodsElement = new chartEditor.ui.panel.ganttProject.elements.Base(model , index++, 'Periods element');
  periodsElement.allowEnabled(false);
  periodsElement.addClassName(goog.getCssName('anychart-ce-panel-element-period'));
  periodsElement.setKey(this.genKey('periods()'));
  this.addChildControl(periodsElement);
  this.addContentSeparator();

  var taskElement = new chartEditor.ui.panel.ganttProject.elements.TaskElement(model, index++);
  taskElement.setKey(this.genKey('tasks()'));
  this.addChildControl(taskElement);
};
