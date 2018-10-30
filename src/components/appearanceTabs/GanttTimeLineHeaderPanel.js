goog.provide('chartEditor.GanttTimeLineHeaderPanel');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.settings.ganttProject.TimeLineHeader');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.GanttTimeLineHeaderPanel = function(model, opt_domHelper) {
  chartEditor.GanttTimeLineHeaderPanel.base(this, 'constructor', model, 'Timeline header', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_TIMELINE;
  this.allowEnabled(false);
};
goog.inherits(chartEditor.GanttTimeLineHeaderPanel, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.GanttTimeLineHeaderPanel.prototype.createDom = function() {
  chartEditor.GanttTimeLineHeaderPanel.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var timeLineHeader = new chartEditor.settings.ganttProject.TimeLineHeader(model);
  timeLineHeader.setKey([['chart'], ['settings'], 'getTimeline().header()']);
  this.addChild(timeLineHeader, true);
};


