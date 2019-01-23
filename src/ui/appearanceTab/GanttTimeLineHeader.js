goog.provide('chartEditor.ui.appearanceTabs.GanttTimeLineHeader');

goog.require("chartEditor.ui.Panel");
goog.require("chartEditor.ui.panel.ganttProject.LevelWrapper");
goog.require("chartEditor.ui.panel.ganttProject.TimeLineHeader");



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.GanttTimeLineHeader = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.GanttTimeLineHeader.base(this, 'constructor', model, 'Timeline header', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_TIMELINE_HEADER;

  this.allowEnabled(false);

  this.allowReset(true);

  this.key = [['chart'], ['settings'], 'getTimeline().header()'];
};
goog.inherits(chartEditor.ui.appearanceTabs.GanttTimeLineHeader, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.GanttTimeLineHeader.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.GanttTimeLineHeader.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var timeLineHeader = new chartEditor.ui.panel.ganttProject.TimeLineHeader(model);
  timeLineHeader.setKey(this.getKey());
  this.addChildControl(timeLineHeader);

  this.addContentSeparator();

  var levelIndex = 0;
  var level0 = new chartEditor.ui.panel.ganttProject.LevelWrapper(model, levelIndex);
  level0.setKey(this.genKey('level(' + levelIndex + ')'));
  this.addChildControl(level0);

  this.addContentSeparator();

  levelIndex = 1;
  var level1 = new chartEditor.ui.panel.ganttProject.LevelWrapper(model, levelIndex);
  level1.setKey(this.genKey('level(' + levelIndex + ')'));
  this.addChildControl(level1);

  this.addContentSeparator();

  levelIndex = 2;
  var level2 = new chartEditor.ui.panel.ganttProject.LevelWrapper(model, levelIndex);
  level2.setKey(this.genKey('level(' + levelIndex + ')'));
  this.addChildControl(level2);

  // Not implemented
  // holidays()	Padding panel
  // overlay()	Overlay element..
  //   Coloring
  // background()	Background panel.
};


