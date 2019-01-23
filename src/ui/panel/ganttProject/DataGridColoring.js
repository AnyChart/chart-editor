goog.provide('chartEditor.ui.panel.ganttProject.GridColoring');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');
goog.require('chartEditor.ui.panel.ganttProject.Coloring');



/**
 * @param {chartEditor.model.Base} model
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.ganttProject.GridColoring = function(model, opt_name, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.GridColoring.base(this, 'constructor', model, opt_name, opt_domHelper);
  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-ce-panel-gantt-datagrid-coloring'));
};
goog.inherits(chartEditor.ui.panel.ganttProject.GridColoring, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.ganttProject.GridColoring.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.GridColoring.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var timeLine = new chartEditor.ui.panel.ganttProject.Coloring(model, 'Timeline');
  timeLine.setKey(this.genKey('getTimeline()'));
  timeLine.allowEnabled(false);
  this.addChildControl(timeLine);

  this.addContentSeparator();

  var dataGrid = new chartEditor.ui.panel.ganttProject.Coloring(model, 'Data grid');
  dataGrid.allowEnabled(false);
  dataGrid.setKey(this.genKey('dataGrid()'));
  this.addChildControl(dataGrid);
};
