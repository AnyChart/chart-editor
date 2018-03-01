goog.provide('anychart.chartEditorModule.settings.ScaleBar');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.SettingsPanelZippy');
goog.require('anychart.chartEditorModule.colorPicker.Base');
goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.input.Numbers');
goog.require('anychart.chartEditorModule.settings.Stroke');
goog.require('anychart.chartEditorModule.settings.scales.Base');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanelZippy}
 */
anychart.chartEditorModule.settings.ScaleBar = function(model, index, opt_domHelper) {
  anychart.chartEditorModule.settings.ScaleBar.base(this, 'constructor', model, index, null, opt_domHelper);
  
  this.name = 'scaleBar(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], 'scaleBar(' + this.index_ + ')'];
  this.enabledKey(this.genKey('enabled', true));

  this.allowEnabled(true);
  this.addClassName(goog.getCssName('anychart-settings-panel-scale-bar'));
};
goog.inherits(anychart.chartEditorModule.settings.ScaleBar, anychart.chartEditorModule.SettingsPanelZippy);


/** @override */
anychart.chartEditorModule.settings.ScaleBar.prototype.createDom = function() {
  anychart.chartEditorModule.settings.ScaleBar.base(this, 'createDom');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  // region ==== Header
  var fill = new anychart.chartEditorModule.colorPicker.Base();
  fill.addClassName(goog.getCssName('anychart-chart-editor-settings-control-right'));
  fill.init(model, this.genKey('fill', true));
  this.addHeaderChildControl(fill);
  // endregion

  var stroke = new anychart.chartEditorModule.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke', true));
  this.addChildControl(stroke);

  var width = new anychart.chartEditorModule.comboBox.Percent();
  width.setOptions([0, 1, 3, 5, 10, 15, 20, 30]);
  var widthLC = new anychart.chartEditorModule.controls.LabeledControl(width, 'Width');
  widthLC.init(model, this.genKey('width', true));
  this.addChildControl(widthLC);

  var offset = new anychart.chartEditorModule.comboBox.Percent();
  offset.allowNegative(true);
  var offsetLC = new anychart.chartEditorModule.controls.LabeledControl(offset, 'Offset');
  offsetLC.init(model, this.genKey('offset', true));
  this.addChildControl(offsetLC);

  this.addContentSeparator();

  var from = new anychart.chartEditorModule.input.Numbers('From value');
  var fromlLC = new anychart.chartEditorModule.controls.LabeledControl(from, 'From');
  fromlLC.init(model, this.genKey('from', true));
  this.addChildControl(fromlLC);

  var to = new anychart.chartEditorModule.input.Numbers('To value');
  var tolLC = new anychart.chartEditorModule.controls.LabeledControl(to, 'To');
  tolLC.init(model, this.genKey('to', true));
  this.addChildControl(tolLC);

  this.addContentSeparator();

  var colorScale = new anychart.chartEditorModule.settings.scales.Base(model, ['linear-color', 'ordinal-color']);
  colorScale.setKey(this.genKey('colorScale()'));
  this.addChildControl(colorScale);
};
