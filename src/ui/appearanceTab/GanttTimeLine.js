goog.provide('chartEditor.ui.appearanceTabs.GanttTimeLine');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.ganttProject.TimeLine');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.appearanceTabs.GanttTimeLine = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.GanttTimeLine.base(this, 'constructor', model, 'Timeline', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GANTT_TIMELINE;

  this.allowReset(true);
};
goog.inherits(chartEditor.ui.appearanceTabs.GanttTimeLine, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.GanttTimeLine.prototype.createDom = function() {
  chartEditor.ui.appearanceTabs.GanttTimeLine.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var splitterPosition = new chartEditor.ui.control.input.Base();
  var splitterPositionLC = new chartEditor.ui.control.wrapped.Labeled(splitterPosition, 'Splitter Position', true);
  splitterPositionLC.init(model, [['chart'], ['settings'], 'splitterPosition()']);
  this.addChildControl(splitterPositionLC);

  this.addContentSeparator();

  var timeLine = new chartEditor.ui.panel.ganttProject.TimeLine(model);
  timeLine.setKey([['chart'], ['settings'], 'getTimeline()']);
  this.addChildControl(timeLine);
};
