goog.provide('chartEditor.GanttTimeLinePanel');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.settings.ganttProject.TimeLine');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.GanttTimeLinePanel = function(model, opt_domHelper) {
  chartEditor.GanttTimeLinePanel.base(this, 'constructor', model, 'Timeline', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_TIMELINE;

  this.allowReset(true);
};
goog.inherits(chartEditor.GanttTimeLinePanel, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.GanttTimeLinePanel.prototype.createDom = function() {
  chartEditor.GanttTimeLinePanel.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var timeLine = new chartEditor.settings.ganttProject.TimeLine(model);
  timeLine.setKey([['chart'], ['settings'], 'getTimeline()']);
  this.addChildControl(timeLine);
};
