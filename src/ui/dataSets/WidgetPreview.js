goog.provide('chartEditor.ui.dataSets.WidgetPreview');

goog.require('chartEditor.model.Base');
goog.require('chartEditor.ui.dataSets.DataSetPreview');
goog.require('chartEditor.ui.dataSets.Intro');
goog.require('chartEditor.ui.dataSets.Widget');



/**
 * List of data set panel on SetupChart step.
 *
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.dataSets.Widget}
 */
chartEditor.ui.dataSets.WidgetPreview = function(model, opt_domHelper) {
  chartEditor.ui.dataSets.WidgetPreview.base(this, 'constructor', model, opt_domHelper);
};
goog.inherits(chartEditor.ui.dataSets.WidgetPreview, chartEditor.ui.dataSets.Widget);


/**
 * @inheritDoc
 */
chartEditor.ui.dataSets.WidgetPreview.prototype.initClasses = function() {
  this.addClassName('anychart-ce-input-data');
};


/**
 * @inheritDoc
 */
chartEditor.ui.dataSets.WidgetPreview.prototype.createPanel = function(model, data) {
  return new chartEditor.ui.dataSets.DataSetPreview(model, data);
};


/**
 * Updates data.
 */
chartEditor.ui.dataSets.WidgetPreview.prototype.updateData = function() {
  this.dataSetPanel.updateData();
};


