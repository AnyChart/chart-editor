goog.provide('chartEditor.ui.panel.ganttProject.elements.MilestonesElement');

goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Font');
goog.require('chartEditor.ui.panel.ganttProject.elements.Base');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.panel.ganttProject.elements.Base}
 */
chartEditor.ui.panel.ganttProject.elements.MilestonesElement = function(model, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.elements.MilestonesElement.base(this, 'constructor', model, 'Milestones element', opt_domHelper);

  this.allowEnabled(false);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-gantt-element-milestones'));
};
goog.inherits(chartEditor.ui.panel.ganttProject.elements.MilestonesElement, chartEditor.ui.panel.ganttProject.elements.Base);


/** @override */
chartEditor.ui.panel.ganttProject.elements.MilestonesElement.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.elements.MilestonesElement.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var font = new chartEditor.ui.panel.Font(model);
  font.setKey(this.genKey('labels()'));
  this.addChildControl(font);

  var position = new chartEditor.ui.control.fieldSelect.Base();
  position.getSelect().setOptions(goog.object.getValues(chartEditor.enums.Anchor));
  var positionLC = new chartEditor.ui.control.wrapped.Labeled(position, 'Labels position');
  positionLC.init(model, font.genKey('position()'));
  this.addChildControl(positionLC);

  var anchor = new chartEditor.ui.control.fieldSelect.Base();
  anchor.getSelect().setOptions(goog.object.getValues(chartEditor.enums.Anchor));
  var anchorLC = new chartEditor.ui.control.wrapped.Labeled(anchor, 'Labels anchor');
  anchorLC.init(model, font.genKey('anchor()'));
  this.addChildControl(anchorLC);

  // Not implemented
  //   Interactivity
  // normal()	Normal state panel.
  // selected()	Selected state panel.
};


