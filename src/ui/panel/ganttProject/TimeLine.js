goog.provide('chartEditor.ui.panel.ganttProject.TimeLine');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.ganttProject.GanttElements');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.ganttProject.TimeLine = function(model, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.TimeLine.base(this, 'constructor', model, '', opt_domHelper);

  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-ce-panel-gantt-timeline'));
};
goog.inherits(chartEditor.ui.panel.ganttProject.TimeLine, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.ganttProject.TimeLine.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.TimeLine.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var ganttElements = new chartEditor.ui.panel.ganttProject.GanttElements(model, 'Elements');
  ganttElements.setKey(this.getKey());
  this.addChildControl(ganttElements);

  //Not implemented
  // Specific panel
  // markers()	Markers panel.
  //   Axes and Scales
  // lineMarker()	Line marker panel.
  // rangeMarker()	Range marker panel.
  // textMarker()	Text marker panel.
  //   Interactivity
  // horizontalScrollBar()	Horizontal scroll bar panel.
  // tooltip()	Tooltip panel.
  // verticalScrollBar()	Vertical scroll bar panel.
  //   Labels
  // labels()	Labels panel.
  //   Miscellaneous
  // baseBarOffset()
  //  Size and Position
  // baselineBarAnchor()	Baseline bar anchor.
  // baselineBarHeight()	Baseline bar height.
  // baselineBarOffset()	Baseline bar offset.
  // baselineBarPosition()
};
