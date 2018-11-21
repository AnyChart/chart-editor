goog.provide('chartEditor.settings.ganttProject.GanttElements');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.settings.ganttProject.elements.Base');
goog.require('chartEditor.settings.ganttProject.elements.GroupingTasksElement');
goog.require('chartEditor.settings.ganttProject.elements.MilestonesElement');
goog.require('chartEditor.settings.ganttProject.elements.TaskElement');


/**
 * @param {chartEditor.EditorModel} model
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.ganttProject.GanttElements = function(model, opt_name, opt_domHelper) {
  chartEditor.settings.ganttProject.GanttElements.base(this, 'constructor', model, '', opt_domHelper);

  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-ce-settings-gantt-elements'));
};
goog.inherits(chartEditor.settings.ganttProject.GanttElements, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.ganttProject.GanttElements.prototype.createDom = function() {
  chartEditor.settings.ganttProject.GanttElements.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var elements = new chartEditor.settings.ganttProject.elements.Base(model, 'Timeline element');
  elements.allowEnabled(false);
  elements.addClassName(goog.getCssName('anychart-ce-settings-gantt-element-timeline'));
  elements.setKey(this.genKey('elements()'));
  this.addChildControl(elements);
  this.addContentSeparator();

  var baseLinesElement = new chartEditor.settings.ganttProject.elements.Base(model, 'Baseline elements');
  baseLinesElement.setKey(this.genKey('baselines()'));
  baseLinesElement.addClassName(goog.getCssName('anychart-ce-settings-gantt-element-baselines'));
  baseLinesElement.allowEnabled(false);
  this.addChildControl(baseLinesElement);
  this.addContentSeparator();

  var connectorElement = new chartEditor.settings.ganttProject.elements.Base(model, 'Connector elements');
  connectorElement.setKey(this.genKey('connectors()'));
  connectorElement.allowEnabled(false);
  connectorElement.hideField('anchor');
  connectorElement.hideField('position');
  connectorElement.hideField('height');
  connectorElement.addClassName(goog.getCssName('anychart-ce-settings-gantt-element-connector'));
  this.addChildControl(connectorElement);
  this.addContentSeparator();

  var groupingTasksElement = new chartEditor.settings.ganttProject.elements.GroupingTasksElement(model);
  groupingTasksElement.setKey(this.genKey('groupingTasks()'));
  this.addChildControl(groupingTasksElement);
  this.addContentSeparator();

  var milestonesElement = new chartEditor.settings.ganttProject.elements.MilestonesElement(model);
  milestonesElement.setKey(this.genKey('milestones()'));
  this.addChildControl(milestonesElement);
  this.addContentSeparator();

  var periodsElement = new chartEditor.settings.ganttProject.elements.Base(model, 'Periods element');
  periodsElement.allowEnabled(false);
  periodsElement.addClassName(goog.getCssName('anychart-ce-settings-element-period'));
  periodsElement.setKey(this.genKey('periods()'));
  this.addChildControl(periodsElement);
  this.addContentSeparator();

  var taskElement = new chartEditor.settings.ganttProject.elements.TaskElement(model);
  taskElement.setKey(this.genKey('tasks()'));
  this.addChildControl(taskElement);
};
