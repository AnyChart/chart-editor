goog.provide('chartEditor.settings.ganttProject.elements.TaskElement');

goog.require('chartEditor.settings.ganttProject.elements.Base');

/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.ganttProject.elements.Base}
 */
chartEditor.settings.ganttProject.elements.TaskElement = function(model, opt_domHelper) {
  chartEditor.settings.ganttProject.elements.TaskElement.base(this, 'constructor', model, 'Task element', opt_domHelper);

  this.allowEnabled(false);
  this.addClassName(goog.getCssName('anychart-ce-settings-gantt-element-task'));
};
goog.inherits(chartEditor.settings.ganttProject.elements.TaskElement, chartEditor.settings.ganttProject.elements.Base);


/** @override */
chartEditor.settings.ganttProject.elements.TaskElement.prototype.createDom = function() {

  chartEditor.settings.ganttProject.elements.TaskElement.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var progress = new chartEditor.settings.ganttProject.elements.Base(model, 'Progress');
  progress.allowEnabled(false);
  progress.addClassName(goog.getCssName('anychart-ce-settings-gantt-element-progress'));
  progress.setKey(this.genKey('progress()'));
  this.addChildControl(progress);

  // Not implemented
  //   Interactivity
  // normal()	Normal state settings.
  // selected()	Selected state settings.
};