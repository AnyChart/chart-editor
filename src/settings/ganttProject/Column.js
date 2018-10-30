goog.provide('chartEditor.settings.ganttProject.Column');

goog.require('chartEditor.SettingsPanelZippy');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.input.Base');
goog.require('chartEditor.settings.Font');
goog.require('chartEditor.settings.Title');



/**
 * @param {chartEditor.EditorModel} model
 * @param {number} index index of level.
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanelZippy}
 */
chartEditor.settings.ganttProject.Column = function(model, index, opt_name, opt_domHelper) {
  chartEditor.settings.ganttProject.Column.base(this, 'constructor', model, index, opt_name || 'Column ' + (index + 1), opt_domHelper);
  this.setKey([['chart'], ['settings'], 'dataGrid().column(' + this.index_ + ')']);
  this.allowRemove(true);
  this.allowEnabled(true);
  this.addClassName(goog.getCssName('anychart-ce-settings-gantt-column'));
};
goog.inherits(chartEditor.settings.ganttProject.Column, chartEditor.SettingsPanelZippy);

/** @override */
chartEditor.settings.ganttProject.Column.prototype.createDom = function() {
  chartEditor.settings.ganttProject.Column.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var title = new chartEditor.settings.Title(model, 'Title');
  title.allowEditPosition(false);
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);

  var labels = new chartEditor.settings.Font(model);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  var format = new chartEditor.controls.input.Base();
  var formatLC = new chartEditor.controls.LabeledControl(format, 'Format');
  formatLC.init(model, this.genKey('labels().format()'));
  this.addChildControl(formatLC);

  var depthPaddingMultiplier = new chartEditor.controls.input.Base();
  var depthPaddingMultiplierLC = new chartEditor.controls.LabeledControl(depthPaddingMultiplier, 'Depth padding multiplier');
  depthPaddingMultiplierLC.init(model, this.genKey('depthPaddingMultiplier()'));
  this.addChildControl(depthPaddingMultiplierLC);
};
