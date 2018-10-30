goog.provide('chartEditor.settings.ganttProject.DataGrid');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.settings.ganttProject.Button');
goog.require('chartEditor.settings.ganttProject.Column');




/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.ganttProject.DataGrid = function(model, opt_domHelper) {
  chartEditor.settings.ganttProject.DataGrid.base(this, 'constructor', model, '', opt_domHelper);
  this.allowEnabled(false);
  this.addClassName(goog.getCssName('anychart-ce-settings-gantt-datagrid'));
};
goog.inherits(chartEditor.settings.ganttProject.DataGrid, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.ganttProject.DataGrid.prototype.createDom = function() {
  chartEditor.settings.ganttProject.DataGrid.base(this, 'createDom');

  var model = /**@type {chartEditor.EditorModel}*/(this.getModel());
  var column = new chartEditor.settings.ganttProject.Column(model, 1);
  column.setKey(this.genKey('column(1)'));
  this.addChildControl(column);

  var buttons = new chartEditor.settings.ganttProject.Button(model, 'Buttons');
  buttons.setKey(this.genKey('buttons()'));
  this.addChildControl(buttons);
};
