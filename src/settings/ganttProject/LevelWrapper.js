goog.provide('chartEditor.settings.ganttProject.LevelWrapper');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.input.Base');
goog.require('chartEditor.settings.Font');
goog.require('chartEditor.settings.Stroke');



/**
 * @param {chartEditor.EditorModel} model
 * @param {number=} opt_index index of level.
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.ganttProject.LevelWrapper = function(model, opt_index, opt_name, opt_domHelper) {
  chartEditor.settings.ganttProject.LevelWrapper.base(this, 'constructor', model, opt_name || 'Level ' + (opt_index + 1), opt_domHelper);
  this.index_ = opt_index;
  this.allowEnabled(true);
  this.addClassName(goog.getCssName('anychart-ce-settings-level-wrapper'));
};
goog.inherits(chartEditor.settings.ganttProject.LevelWrapper, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.ganttProject.LevelWrapper.prototype.createDom = function() {
  chartEditor.settings.ganttProject.LevelWrapper.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var stroke = new chartEditor.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  var fill = new chartEditor.colorPicker.Base();
  var fillLC = new chartEditor.controls.LabeledControl(fill, 'Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  var font = new chartEditor.settings.Font(model);
  font.setKey(this.getKey());
  this.addChildControl(font);

  var format = new chartEditor.controls.input.Base();
  var formatLC = new chartEditor.controls.LabeledControl(format, 'Format');
  formatLC.init(model, this.genKey('format()'));
  this.addChildControl(formatLC);
  // Not implemented
  //  Advanced Text Settings
  // maxFontSize()	Maximum font size settings.
  // minFontSize()	Minimum font size settings.
};
