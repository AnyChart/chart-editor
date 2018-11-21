goog.provide('chartEditor.settings.ganttProject.TimeLine');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.settings.ganttProject.GanttElements');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.ganttProject.TimeLine = function(model, opt_domHelper) {
  chartEditor.settings.ganttProject.TimeLine.base(this, 'constructor', model, '', opt_domHelper);

  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-ce-settings-gantt-timeline'));
};
goog.inherits(chartEditor.settings.ganttProject.TimeLine, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.ganttProject.TimeLine.prototype.createDom = function() {
  chartEditor.settings.ganttProject.TimeLine.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var ganttElements = new chartEditor.settings.ganttProject.GanttElements(model, 'Elements');
  ganttElements.setKey(this.getKey());
  this.addChildControl(ganttElements);

  //Not implemented
  // Specific settings
  // markers()	Markers settings.
  //   Axes and Scales
  // lineMarker()	Line marker settings.
  // rangeMarker()	Range marker settings.
  // textMarker()	Text marker settings.
  //   Interactivity
  // horizontalScrollBar()	Horizontal scroll bar settings.
  // tooltip()	Tooltip settings.
  // verticalScrollBar()	Vertical scroll bar settings.
  //   Labels
  // labels()	Labels settings.
  //   Miscellaneous
  // baseBarOffset()
  //  Size and Position
  // baselineBarAnchor()	Baseline bar anchor.
  // baselineBarHeight()	Baseline bar height.
  // baselineBarOffset()	Baseline bar offset.
  // baselineBarPosition()
};
