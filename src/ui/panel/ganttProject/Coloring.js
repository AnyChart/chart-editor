goog.provide('chartEditor.ui.panel.ganttProject.Coloring');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.ganttProject.Coloring = function(model, opt_name, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.Coloring.base(this, 'constructor', model, opt_name || 'Coloring', opt_domHelper);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-gantt-coloring'));
};
goog.inherits(chartEditor.ui.panel.ganttProject.Coloring, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.ganttProject.Coloring.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.Coloring.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var backgroundFill = new chartEditor.ui.control.colorPicker.Base();
  var backgroundFillLC = new chartEditor.ui.control.wrapped.Labeled(backgroundFill, 'Background Fill');
  backgroundFillLC.init(model, this.genKey('backgroundFill()'));
  this.addChildControl(backgroundFillLC);

  var rowFill = new chartEditor.ui.control.colorPicker.Base();
  var rowFillLC = new chartEditor.ui.control.wrapped.Labeled(rowFill, 'Row fill');
  rowFillLC.init(model, this.genKey('rowFill()'));
  this.addChildControl(rowFillLC);

  var rowEvenFill = new chartEditor.ui.control.colorPicker.Base();
  var rowEvenFillLC = new chartEditor.ui.control.wrapped.Labeled(rowEvenFill, 'Row even fill');
  rowEvenFillLC.init(model, this.genKey('rowEvenFill()'));
  this.addChildControl(rowEvenFillLC);

  var rowOddFill = new chartEditor.ui.control.colorPicker.Base();
  var rowOddFillLC = new chartEditor.ui.control.wrapped.Labeled(rowOddFill, 'Row odd fill');
  rowOddFillLC.init(model, this.genKey('rowOddFill()'));
  this.addChildControl(rowOddFillLC);

  var rowHoverFill = new chartEditor.ui.control.colorPicker.Base();
  var rowHoverFillLC = new chartEditor.ui.control.wrapped.Labeled(rowHoverFill, 'Row hovered fill');
  rowHoverFillLC.init(model, this.genKey('rowHoverFill()'));
  this.addChildControl(rowHoverFillLC);

  var rowSelectedFill = new chartEditor.ui.control.colorPicker.Base();
  var rowSelectedFillLC = new chartEditor.ui.control.wrapped.Labeled(rowSelectedFill, 'Row selected fill');
  rowSelectedFillLC.init(model, this.genKey('rowSelectedFill()'));
  this.addChildControl(rowSelectedFillLC);

  var columnStroke = new chartEditor.ui.panel.Stroke(model, 'Column stoke');
  columnStroke.setKey(this.genKey('columnStroke()'));
  this.addChildControl(columnStroke);
};
