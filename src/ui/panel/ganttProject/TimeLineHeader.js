goog.provide('chartEditor.ui.panel.ganttProject.TimeLineHeader');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Font');
goog.require('chartEditor.ui.panel.Stroke');
goog.require('chartEditor.ui.panel.ganttProject.GanttElements');
goog.require('chartEditor.ui.panel.ganttProject.LevelWrapper');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.panel.ganttProject.LevelWrapper}
 */
chartEditor.ui.panel.ganttProject.TimeLineHeader = function(model, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.TimeLineHeader.base(this, 'constructor', model, void 0, 'Common panel', opt_domHelper);

  this.allowEnabled(false);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-timeline-header'));
};
goog.inherits(chartEditor.ui.panel.ganttProject.TimeLineHeader, chartEditor.ui.panel.ganttProject.LevelWrapper);


/** @override */
chartEditor.ui.panel.ganttProject.TimeLineHeader.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.TimeLineHeader.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var drawTopLine = new chartEditor.ui.control.checkbox.Base();
  drawTopLine.init(model, this.genKey('drawTopLine()'));
  drawTopLine.setCaption('drawTopLine');
  this.addChildControl(drawTopLine);

  var drawRightLine = new chartEditor.ui.control.checkbox.Base();
  drawRightLine.init(model, this.genKey('drawRightLine()'));
  drawRightLine.setCaption('drawRightLine');
  this.addChildControl(drawRightLine);

  var drawBottomLine = new chartEditor.ui.control.checkbox.Base();
  drawBottomLine.setCaption('drawBottomLine');
  drawBottomLine.init(model, this.genKey('drawBottomLine()'));
  this.addChildControl(drawBottomLine);

  var drawLeftLine = new chartEditor.ui.control.checkbox.Base();
  drawLeftLine.setCaption('drawLeftLine');
  drawLeftLine.init(model, this.genKey('drawLeftLine()'));
  this.addChildControl(drawLeftLine);
};
