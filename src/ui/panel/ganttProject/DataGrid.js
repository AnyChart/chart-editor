goog.provide('chartEditor.ui.panel.ganttProject.DataGrid');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.ganttProject.Button');
goog.require('chartEditor.ui.panel.ganttProject.Column');




/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.ganttProject.DataGrid = function(model, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.DataGrid.base(this, 'constructor', model, '', opt_domHelper);
  this.allowEnabled(false);
  this.addClassName(goog.getCssName('anychart-ce-panel-gantt-datagrid'));
};
goog.inherits(chartEditor.ui.panel.ganttProject.DataGrid, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.ganttProject.DataGrid.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.DataGrid.base(this, 'createDom');

  var model = /**@type {chartEditor.model.Base}*/(this.getModel());
  var column = new chartEditor.ui.panel.ganttProject.Column(model, 1);
  column.setKey(this.genKey('column(1)'));
  this.addChildControl(column);

  var buttons = new chartEditor.ui.panel.ganttProject.Button(model, 'Buttons');
  buttons.setKey(this.genKey('buttons()'));
  this.addChildControl(buttons);
};
