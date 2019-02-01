goog.provide('chartEditor.ui.panel.ganttProject.LevelWrapper');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Font');
goog.require('chartEditor.ui.panel.Stroke');



/**
 * @param {chartEditor.model.Base} model
 * @param {number=} opt_index index of level.
 * @param {string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.ganttProject.LevelWrapper = function(model, opt_index, opt_name, opt_domHelper) {
  chartEditor.ui.panel.ganttProject.LevelWrapper.base(this, 'constructor', model, opt_name || 'Level ' + (opt_index + 1), opt_domHelper);
  this.index_ = opt_index;

  this.allowEnabled(true);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-level-wrapper'));
};
goog.inherits(chartEditor.ui.panel.ganttProject.LevelWrapper, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.ganttProject.LevelWrapper.prototype.createDom = function() {
  chartEditor.ui.panel.ganttProject.LevelWrapper.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var stroke = new chartEditor.ui.panel.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  var fill = new chartEditor.ui.control.colorPicker.Base();
  var fillLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  var font = new chartEditor.ui.panel.Font(model);
  font.setKey(this.getKey());
  this.addChildControl(font);

  var format = new chartEditor.ui.control.input.Base();
  var formatLC = new chartEditor.ui.control.wrapped.Labeled(format, 'Format', true);
  formatLC.init(model, this.genKey('format()'));
  this.addChildControl(formatLC);

  // Not implemented
  //  Advanced Text Settings
  // maxFontSize()	Maximum font size panel.
  // minFontSize()	Minimum font size panel.
};
