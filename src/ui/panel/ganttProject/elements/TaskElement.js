goog.provide('chartEditor.ui.panel.ganttProject.elements.TaskElement');

goog.require('chartEditor.ui.panel.ganttProject.elements.Base');

/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.panel.ganttProject.elements.Base}
 */
chartEditor.ui.panel.ganttProject.elements.TaskElement = function(model, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.elements.TaskElement.base(this, 'constructor', model, 'Task element', opt_domHelper);

  this.allowEnabled(false);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-gantt-element-task'));
};
goog.inherits(chartEditor.ui.panel.ganttProject.elements.TaskElement, chartEditor.ui.panel.ganttProject.elements.Base);


/** @override */
chartEditor.ui.panel.ganttProject.elements.TaskElement.prototype.createDom = function() {

  chartEditor.ui.panel.ganttProject.elements.TaskElement.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var progress = new chartEditor.ui.panel.ganttProject.elements.Base(model, 'Progress');
  progress.allowEnabled(false);
  progress.addClassName(goog.getCssName('anychart-ce-panel-gantt-element-progress'));
  progress.setKey(this.genKey('progress()'));
  this.addChildControl(progress);

  // Not implemented
  //   Interactivity
  // normal()	Normal state panel.
  // selected()	Selected state panel.
};
