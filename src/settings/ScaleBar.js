goog.provide('chartEditor.settings.ScaleBar');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.SettingsPanelZippy');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.input.Numbers');
goog.require('chartEditor.settings.Stroke');
goog.require('chartEditor.settings.scales.Base');


/**
 * @param {chartEditor.EditorModel} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanelZippy}
 */
chartEditor.settings.ScaleBar = function(model, index, opt_domHelper) {
  chartEditor.settings.ScaleBar.base(this, 'constructor', model, index, null, opt_domHelper);
  
  this.name = 'scaleBar(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], 'scaleBar(' + this.index_ + ')'];
  this.enabledKey(this.genKey('enabled', true));

  this.allowEnabled(true);
  this.addClassName(goog.getCssName('anychart-ce-settings-panel-scale-bar'));
};
goog.inherits(chartEditor.settings.ScaleBar, chartEditor.SettingsPanelZippy);


/** @override */
chartEditor.settings.ScaleBar.prototype.createDom = function() {
  chartEditor.settings.ScaleBar.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  // region ==== Header
  var fill = new chartEditor.colorPicker.Base();
  fill.addClassName(goog.getCssName('anychart-ce-settings-control-right'));
  fill.init(model, this.genKey('fill', true));
  this.addHeaderChildControl(fill);
  // endregion

  var stroke = new chartEditor.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke', true));
  this.addChildControl(stroke);

  var width = new chartEditor.comboBox.Percent();
  width.setOptions([0, 1, 3, 5, 10, 15, 20, 30]);
  var widthLC = new chartEditor.controls.LabeledControl(width, 'Width');
  widthLC.init(model, this.genKey('width', true));
  this.addChildControl(widthLC);

  var offset = new chartEditor.comboBox.Percent();
  offset.allowNegative(true);
  var offsetLC = new chartEditor.controls.LabeledControl(offset, 'Offset');
  offsetLC.init(model, this.genKey('offset', true));
  this.addChildControl(offsetLC);

  this.addContentSeparator();

  var from = new chartEditor.input.Numbers('From value');
  var fromlLC = new chartEditor.controls.LabeledControl(from, 'From');
  fromlLC.init(model, this.genKey('from', true));
  this.addChildControl(fromlLC);

  var to = new chartEditor.input.Numbers('To value');
  var tolLC = new chartEditor.controls.LabeledControl(to, 'To');
  tolLC.init(model, this.genKey('to', true));
  this.addChildControl(tolLC);

  this.addContentSeparator();

  var colorScale = new chartEditor.settings.scales.Base(model, ['linear-color', 'ordinal-color']);
  colorScale.setKey(this.genKey('colorScale()'));
  this.addChildControl(colorScale);
};
