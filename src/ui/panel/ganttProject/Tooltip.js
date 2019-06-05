goog.provide('chartEditor.ui.panel.ganttProject.Tooltip');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.panel.Tooltip');



/**
 * @param {chartEditor.model.Base} model
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.ganttProject.Tooltip = function(model, opt_name, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.Tooltip.base(this, 'constructor', model, -1, opt_name, opt_domHelper);

  this.allowEnabled(true);
  this.allowReset(true);
};
goog.inherits(chartEditor.ui.panel.ganttProject.Tooltip, chartEditor.ui.PanelZippy);



/** @override */
chartEditor.ui.panel.ganttProject.Tooltip.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.Tooltip.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var tooltip = new chartEditor.ui.panel.Tooltip(model);
  tooltip.setKey(this.getKey());
  tooltip.setName(null);
  tooltip.allowEnabled(false);
  tooltip.allowReset(false);
  tooltip.allowEditDisplayMode(false);
  tooltip.allowEditPositionMode(false);
  this.addChildControl(tooltip);
};
