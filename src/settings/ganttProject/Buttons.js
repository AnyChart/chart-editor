goog.provide('chartEditor.settings.ganttProject.Button');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.input.Base');
goog.require('chartEditor.settings.Font');
goog.require('chartEditor.settings.Stroke');



/**
 * @param {chartEditor.EditorModel} model
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.ganttProject.Button = function(model, opt_name, opt_domHelper) {
  chartEditor.settings.ganttProject.Button.base(this, 'constructor', model, opt_name, opt_domHelper);
  this.allowEnabled(true);
  this.addClassName(goog.getCssName('anychart-ce-settings-level-wrapper'));
};
goog.inherits(chartEditor.settings.ganttProject.Button, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.ganttProject.Button.prototype.createDom = function() {
  chartEditor.settings.ganttProject.Button.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var labels = new chartEditor.settings.Font(model);
  labels.setKey(this.genKey('labels()'));
  this.addChildControl(labels);

  var depthPaddingMultiplier = new chartEditor.controls.input.Base();
  var depthPaddingMultiplierLC = new chartEditor.controls.LabeledControl(depthPaddingMultiplier, 'Content');
  depthPaddingMultiplierLC.init(model, this.genKey('content()'));
  this.addChildControl(depthPaddingMultiplierLC);

  var colorPicker = new chartEditor.colorPicker.Base();
  colorPicker.addClassName(goog.getCssName('background'));
  colorPicker.init(model, this.genKey('fontColor()'));
  this.addChildControl(colorPicker);
};
