goog.provide('chartEditor.ui.panel.ganttProject.elements.Connectors');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.ganttProject.elements.Connectors = function(model, opt_name, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.elements.Connectors.base(this, 'constructor', model, -1, opt_name, opt_domHelper);

  this.allowReset(true);
  this.allowEnabled(false);
};
goog.inherits(chartEditor.ui.panel.ganttProject.elements.Connectors, chartEditor.ui.PanelZippy);



/** @override */
chartEditor.ui.panel.ganttProject.elements.Connectors.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.elements.Connectors.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var stroke = new chartEditor.ui.panel.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  var fill = new chartEditor.ui.control.colorPicker.Base();
  var fillLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);
};
