goog.provide('chartEditor.settings.ganttProject.GridColoring');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.settings.Stroke');
goog.require('chartEditor.settings.ganttProject.Coloring');



/**
 * @param {chartEditor.EditorModel} model
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.ganttProject.GridColoring = function(model, opt_name, opt_domHelper) {
  chartEditor.settings.ganttProject.GridColoring.base(this, 'constructor', model, opt_name, opt_domHelper);
  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-ce-settings-gantt-datagrid-coloring'));
};
goog.inherits(chartEditor.settings.ganttProject.GridColoring, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.ganttProject.GridColoring.prototype.createDom = function() {
  chartEditor.settings.ganttProject.GridColoring.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var timeLine = new chartEditor.settings.ganttProject.Coloring(model, 'Timeline');
  timeLine.setKey(this.genKey('getTimeline()'));
  timeLine.allowEnabled(false);
  this.addChildControl(timeLine);

  this.addContentSeparator();

  var dataGrid = new chartEditor.settings.ganttProject.Coloring(model, 'Data grid');
  dataGrid.allowEnabled(false);
  dataGrid.setKey(this.genKey('dataGrid()'));
  this.addChildControl(dataGrid);
};
