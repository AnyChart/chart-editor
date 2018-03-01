goog.provide('chartEditor.settings.Background');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.settings.Stroke');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.Background = function(model, opt_domHelper) {
  chartEditor.settings.Background.base(this, 'constructor', model, 'Background', opt_domHelper);

  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-chart-editor-settings-Background'));
};
goog.inherits(chartEditor.settings.Background, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.settings.Background.prototype.createDom = function() {
  chartEditor.settings.Background.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var fill = new chartEditor.colorPicker.Base();
  var fillLC = new chartEditor.controls.LabeledControl(fill, 'Background Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  var stroke = new chartEditor.settings.Stroke(model, 'Stroke');
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);
};
