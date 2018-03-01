goog.provide('chartEditor.settings.Stagger');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.checkbox.Base');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.controls.LabeledControl');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.Stagger = function(model, opt_domHelper) {
  chartEditor.settings.Stagger.base(this, 'constructor', model, 'Stagger Mode', opt_domHelper);

  this.addClassName(goog.getCssName('anychart-chart-editor-settings-stagger'));
};
goog.inherits(chartEditor.settings.Stagger, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.settings.Stagger.prototype.setKey = function(key) {
  chartEditor.settings.Stagger.base(this, 'setKey', key);
  this.enabledKey(this.genKey('staggerMode()'));
};


/** @inheritDoc */
chartEditor.settings.Stagger.prototype.createDom = function() {
  chartEditor.settings.Stagger.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  // Stagger lines
  var staggerLines = new chartEditor.comboBox.Base();
  staggerLines.setOptions([1, 2, 3, 4, 5]);
  staggerLines.setRange(0, 10);
  var staggerLinesLC = new chartEditor.controls.LabeledControl(staggerLines, 'Stagger Lines');
  staggerLinesLC.init(model, this.genKey('staggerLines()'));
  this.addChildControl(staggerLinesLC);

  // Stagger max lines
  var staggerMaxLines = new chartEditor.comboBox.Base();
  staggerMaxLines.setOptions([1, 2, 3, 4, 5]);
  staggerMaxLines.setRange(0, 10);
  var staggerMaxLinesLC = new chartEditor.controls.LabeledControl(staggerMaxLines, 'Stagger Max Lines');
  staggerMaxLinesLC.init(model, this.genKey('staggerMaxLines()'));
  this.addChildControl(staggerMaxLinesLC);
};
