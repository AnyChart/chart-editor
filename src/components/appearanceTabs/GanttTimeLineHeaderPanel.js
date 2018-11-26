goog.provide('chartEditor.GanttTimeLineHeaderPanel');

goog.require("chartEditor.SettingsPanel");
goog.require("chartEditor.settings.ganttProject.LevelWrapper");
goog.require("chartEditor.settings.ganttProject.TimeLineHeader");



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.GanttTimeLineHeaderPanel = function(model, opt_domHelper) {
  chartEditor.GanttTimeLineHeaderPanel.base(this, 'constructor', model, 'Timeline header', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_TIMELINE_HEADER;

  this.allowEnabled(false);

  this.allowReset(true);

  this.key = [['chart'], ['settings'], 'getTimeline().header()'];
};
goog.inherits(chartEditor.GanttTimeLineHeaderPanel, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.GanttTimeLineHeaderPanel.prototype.createDom = function() {
  chartEditor.GanttTimeLineHeaderPanel.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var timeLineHeader = new chartEditor.settings.ganttProject.TimeLineHeader(model);
  timeLineHeader.setKey(this.getKey());
  this.addChildControl(timeLineHeader);

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


