goog.provide('chartEditor.ui.panel.ganttProject.LineMarker');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.ganttProject.LineMarker = function(model, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.LineMarker.base(this, 'constructor', model, 'Line Marker', opt_domHelper);

  this.allowEnabled(true);
  this.allowReset(true);

  // this.addClassName(goog.getCssName('anychart-ce-panel-gantt-coloring'));
};
goog.inherits(chartEditor.ui.panel.ganttProject.LineMarker, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.ganttProject.LineMarker.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.LineMarker.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var markerValue = new chartEditor.ui.control.fieldSelect.Base({label: 'Value'});
  markerValue.getSelect().setOptions([
    {value: 'current'},
    {value: 'start'},
    {value: 'end'}
  ]);
  markerValue.init(model, this.genKey('value()'));
  this.addChildControl(markerValue);

  var markerStroke = new chartEditor.ui.panel.Stroke(model, 'Marker stoke');
  markerStroke.setKey(this.genKey('stroke()'));
  this.addChildControl(markerStroke);
};
