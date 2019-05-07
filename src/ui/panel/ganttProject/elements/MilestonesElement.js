goog.provide('chartEditor.ui.panel.ganttProject.elements.MilestonesElement');

goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Font');
goog.require('chartEditor.ui.panel.ganttProject.elements.Base');



/**
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.panel.ganttProject.elements.Base}
 */
chartEditor.ui.panel.ganttProject.elements.MilestonesElement = function(model, index,  opt_domHelper) {
  chartEditor.ui.panel.ganttProject.elements.MilestonesElement.base(this, 'constructor', model, index, 'Milestones element', opt_domHelper);

  this.allowEnabled(false);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-gantt-element-milestones'));
};
goog.inherits(chartEditor.ui.panel.ganttProject.elements.MilestonesElement, chartEditor.ui.panel.ganttProject.elements.Base);


/** @override */
chartEditor.ui.panel.ganttProject.elements.MilestonesElement.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.elements.MilestonesElement.base(this, 'createDom');
  // Not implemented
  //   Interactivity
  // normal()	Normal state panel.
  // selected()	Selected state panel.
};


