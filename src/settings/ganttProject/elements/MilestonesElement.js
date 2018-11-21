goog.provide('chartEditor.settings.ganttProject.elements.MilestonesElement');

goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.settings.Font');
goog.require('chartEditor.settings.ganttProject.elements.Base');




/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.ganttProject.elements.Base}
 */
chartEditor.settings.ganttProject.elements.MilestonesElement = function(model, opt_domHelper) {
  chartEditor.settings.ganttProject.elements.MilestonesElement.base(this, 'constructor', model, 'Milestones element', opt_domHelper);

  this.allowEnabled(false);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-settings-gantt-element-milestones'));
};
goog.inherits(chartEditor.settings.ganttProject.elements.MilestonesElement, chartEditor.settings.ganttProject.elements.Base);


/** @override */
chartEditor.settings.ganttProject.elements.MilestonesElement.prototype.createDom = function() {
  chartEditor.settings.ganttProject.elements.MilestonesElement.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var font = new chartEditor.settings.Font(model);
  font.setKey(this.genKey('labels()'));
  this.addChildControl(font);

  var position = new chartEditor.controls.select.DataField();
  position.getSelect().setOptions(goog.object.getValues(chartEditor.enums.Anchor));
  var positionLC = new chartEditor.controls.LabeledControl(position, 'Labels position');
  positionLC.init(model, font.genKey('position()'));
  this.addChildControl(positionLC);

  var anchor = new chartEditor.controls.select.DataField();
  anchor.getSelect().setOptions(goog.object.getValues(chartEditor.enums.Anchor));
  var anchorLC = new chartEditor.controls.LabeledControl(anchor, 'Labels anchor');
  anchorLC.init(model, font.genKey('anchor()'));
  this.addChildControl(anchorLC);

  // Not implemented
  //   Interactivity
  // normal()	Normal state settings.
  // selected()	Selected state settings.
};


