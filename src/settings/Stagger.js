goog.provide('anychart.chartEditorModule.settings.Stagger');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.checkbox.Base');
goog.require('anychart.chartEditorModule.comboBox.Base');
goog.require('anychart.chartEditorModule.controls.LabeledControl');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.Stagger = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.Stagger.base(this, 'constructor', model, 'Stagger Mode', opt_domHelper);

  this.addClassName(goog.getCssName('anychart-chart-editor-settings-stagger'));
};
goog.inherits(anychart.chartEditorModule.settings.Stagger, anychart.chartEditorModule.SettingsPanel);


/** @inheritDoc */
anychart.chartEditorModule.settings.Stagger.prototype.setKey = function(key) {
  anychart.chartEditorModule.settings.Stagger.base(this, 'setKey', key);
  this.enabledKey(this.genKey('staggerMode()'));
};


/** @inheritDoc */
anychart.chartEditorModule.settings.Stagger.prototype.createDom = function() {
  anychart.chartEditorModule.settings.Stagger.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  // Stagger lines
  var staggerLines = new anychart.chartEditorModule.comboBox.Base();
  staggerLines.setOptions([1, 2, 3, 4, 5]);
  staggerLines.setRange(0, 10);
  var staggerLinesLC = new anychart.chartEditorModule.controls.LabeledControl(staggerLines, 'Stagger Lines');
  staggerLinesLC.init(model, this.genKey('staggerLines()'));
  this.addChildControl(staggerLinesLC);

  // Stagger max lines
  var staggerMaxLines = new anychart.chartEditorModule.comboBox.Base();
  staggerMaxLines.setOptions([1, 2, 3, 4, 5]);
  staggerMaxLines.setRange(0, 10);
  var staggerMaxLinesLC = new anychart.chartEditorModule.controls.LabeledControl(staggerMaxLines, 'Stagger Max Lines');
  staggerMaxLinesLC.init(model, this.genKey('staggerMaxLines()'));
  this.addChildControl(staggerMaxLinesLC);
};
