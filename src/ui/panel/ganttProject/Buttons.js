goog.provide('chartEditor.ui.panel.ganttProject.Button');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.panel.Font');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.ganttProject.Button = function(model, opt_name, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.Button.base(this, 'constructor', model, opt_name, opt_domHelper);
  this.allowEnabled(true);
  this.addClassName(goog.getCssName('anychart-ce-panel-level-wrapper'));
};
goog.inherits(chartEditor.ui.panel.ganttProject.Button, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.ganttProject.Button.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.Button.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var labels = new chartEditor.ui.panel.Font(model);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  var depthPaddingMultiplier = new chartEditor.ui.control.input.Base();
  var depthPaddingMultiplierLC = new chartEditor.ui.control.wrapped.Labeled(depthPaddingMultiplier, 'Content');
  depthPaddingMultiplierLC.init(model, this.genKey('content()'));
  this.addChildControl(depthPaddingMultiplierLC);

  var colorPicker = new chartEditor.ui.control.colorPicker.Base();
  colorPicker.addClassName(goog.getCssName('background'));
  colorPicker.init(model, this.genKey('fontColor()'));
  this.addChildControl(colorPicker);
};
