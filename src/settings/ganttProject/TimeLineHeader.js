goog.provide('chartEditor.settings.ganttProject.TimeLineHeader');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.checkbox.Base');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.settings.Font');
goog.require('chartEditor.settings.Stroke');
goog.require('chartEditor.settings.ganttProject.GanttElements');
goog.require('chartEditor.settings.ganttProject.LevelWrapper');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.ganttProject.LevelWrapper}
 */
chartEditor.settings.ganttProject.TimeLineHeader = function(model, opt_domHelper) {
  chartEditor.settings.ganttProject.TimeLineHeader.base(this, 'constructor', model, void 0, 'Common settings', opt_domHelper);

  this.allowEnabled(false);
  this.addClassName(goog.getCssName('anychart-ce-settings-timeline-header'));
};
goog.inherits(chartEditor.settings.ganttProject.TimeLineHeader, chartEditor.settings.ganttProject.LevelWrapper);


/** @override */
chartEditor.settings.ganttProject.TimeLineHeader.prototype.createDom = function() {
  chartEditor.settings.ganttProject.TimeLineHeader.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var drawTopLine = new chartEditor.checkbox.Base();
  drawTopLine.init(model, this.genKey('drawTopLine()'));
  drawTopLine.setCaption('drawTopLine');
  this.addChildControl(drawTopLine);

  var drawRightLine = new chartEditor.checkbox.Base();
  drawRightLine.init(model, this.genKey('drawRightLine()'));
  drawRightLine.setCaption('drawRightLine');
  this.addChildControl(drawRightLine);

  var drawBottomLine = new chartEditor.checkbox.Base();
  drawBottomLine.setCaption('drawBottomLine');
  drawBottomLine.init(model, this.genKey('drawBottomLine()'));
  this.addChildControl(drawBottomLine);

  var drawLeftLine = new chartEditor.checkbox.Base();
  drawLeftLine.setCaption('drawLeftLine');
  drawLeftLine.init(model, this.genKey('drawLeftLine()'));
  this.addChildControl(drawLeftLine);

  this.addContentSeparator();
  var levelIndex = 0;
  var level0 = new chartEditor.settings.ganttProject.LevelWrapper(model, levelIndex);
  level0.setKey(this.genKey('level(' + levelIndex + ')'));
  this.addChildControl(level0);

  this.addContentSeparator();

  levelIndex = 1;
  var level1 = new chartEditor.settings.ganttProject.LevelWrapper(model, levelIndex);
  level1.setKey(this.genKey('level(' + levelIndex + ')'));
  this.addChildControl(level1);

  this.addContentSeparator();

  levelIndex = 2;
  var level2 = new chartEditor.settings.ganttProject.LevelWrapper(model, levelIndex);
  level2.setKey(this.genKey('level(' + levelIndex + ')'));
  this.addChildControl(level2);

  // Not implemented
  // holidays()	Padding settings
  // overlay()	Overlay element..
  //   Coloring
  // background()	Background settings.

};
