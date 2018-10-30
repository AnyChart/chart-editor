goog.provide('chartEditor.settings.ganttProject.Coloring');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.settings.Stroke');



/**
 * @param {chartEditor.EditorModel} model
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.ganttProject.Coloring = function(model, opt_name, opt_domHelper) {
  chartEditor.settings.ganttProject.Coloring.base(this, 'constructor', model, opt_name || 'Coloring', opt_domHelper);

  this.addClassName(goog.getCssName('anychart-ce-settings-gantt-coloring'));
};
goog.inherits(chartEditor.settings.ganttProject.Coloring, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.ganttProject.Coloring.prototype.createDom = function() {
  chartEditor.settings.ganttProject.Coloring.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var backgroundFill = new chartEditor.colorPicker.Base();
  var backgroundFillLC = new chartEditor.controls.LabeledControl(backgroundFill, 'Background Fill');
  backgroundFillLC.init(model, this.genKey('backgroundFill()'));
  this.addChildControl(backgroundFillLC);

  var rowFill = new chartEditor.colorPicker.Base();
  var rowFillLC = new chartEditor.controls.LabeledControl(rowFill, 'Row fill');
  rowFillLC.init(model, this.genKey('rowFill()'));
  this.addChildControl(rowFillLC);

  var rowEvenFill = new chartEditor.colorPicker.Base();
  var rowEvenFillLC = new chartEditor.controls.LabeledControl(rowEvenFill, 'Row even fill');
  rowEvenFillLC.init(model, this.genKey('rowEvenFill()'));
  this.addChildControl(rowEvenFillLC);

  var rowOddFill = new chartEditor.colorPicker.Base();
  var rowOddFillLC = new chartEditor.controls.LabeledControl(rowOddFill, 'Row odd fill');
  rowOddFillLC.init(model, this.genKey('rowOddFill()'));
  this.addChildControl(rowOddFillLC);

  var rowHoverFill = new chartEditor.colorPicker.Base();
  var rowHoverFillLC = new chartEditor.controls.LabeledControl(rowHoverFill, 'Row hovered fill');
  rowHoverFillLC.init(model, this.genKey('rowHoverFill()'));
  this.addChildControl(rowHoverFillLC);

  var rowSelectedFill = new chartEditor.colorPicker.Base();
  var rowSelectedFillLC = new chartEditor.controls.LabeledControl(rowSelectedFill, 'Row selected fill');
  rowSelectedFillLC.init(model, this.genKey('rowSelectedFill()'));
  this.addChildControl(rowSelectedFillLC);

  var columnStroke = new chartEditor.settings.Stroke(model, 'Column stoke');
  columnStroke.setKey(this.genKey('columnStroke()'));
  this.addChildControl(columnStroke);
};
