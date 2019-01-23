goog.provide('chartEditor.ui.panel.ganttProject.Column');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Font');
goog.require('chartEditor.ui.panel.Title');



/**
 * @param {chartEditor.model.Base} model
 * @param {number} index index of level.
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.ganttProject.Column = function(model, index, opt_name, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.Column.base(this, 'constructor', model, index, opt_name || 'Column ' + (index + 1), opt_domHelper);
  this.setKey([['chart'], ['settings'], 'dataGrid().column(' + this.index_ + ')']);
  this.allowRemove(true);
  this.allowEnabled(true);
  this.allowReset(true);
  this.addClassName(goog.getCssName('anychart-ce-panel-gantt-column'));
};
goog.inherits(chartEditor.ui.panel.ganttProject.Column, chartEditor.ui.PanelZippy);

/** @override */
chartEditor.ui.panel.ganttProject.Column.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.Column.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var title = new chartEditor.ui.panel.Title(model, 'Title');
  title.allowEditPosition(false);
  title.setKey(this.genKey('title()'));
  this.addChildControl(title);

  var labels = new chartEditor.ui.panel.Font(model);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  var format = new chartEditor.ui.control.input.Base();
  var formatLC = new chartEditor.ui.control.wrapped.Labeled(format, 'Format');
  formatLC.init(model, this.genKey('labels().format()'));
  this.addChildControl(formatLC);

  var depthPaddingMultiplier = new chartEditor.ui.control.input.Base();
  var depthPaddingMultiplierLC = new chartEditor.ui.control.wrapped.Labeled(depthPaddingMultiplier, 'Depth padding multiplier');
  depthPaddingMultiplierLC.init(model, this.genKey('depthPaddingMultiplier()'));
  this.addChildControl(depthPaddingMultiplierLC);
};
