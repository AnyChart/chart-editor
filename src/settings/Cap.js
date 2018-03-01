goog.provide('chartEditor.settings.Cap');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.colorPicker.Base');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.settings.Stroke');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.Cap = function(model, opt_domHelper) {
  chartEditor.settings.Cap.base(this, 'constructor', model, 'Cap', opt_domHelper);

  this.allowEnabled(true);
};
goog.inherits(chartEditor.settings.Cap, chartEditor.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.Cap.CSS_CLASS = goog.getCssName('anychart-chart-editor-settings-cap');


/** @override */
chartEditor.settings.Cap.prototype.createDom = function() {
  chartEditor.settings.Cap.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.settings.Cap.CSS_CLASS);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var fill = new chartEditor.colorPicker.Base();
  var fillLC = new chartEditor.controls.LabeledControl(fill, 'Cap Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  var stroke = new chartEditor.settings.Stroke(model);
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);

  var radius = new chartEditor.comboBox.Percent();
  radius.setOptions([10, 30, 50, 70, 90]);
  var radiusLC = new chartEditor.controls.LabeledControl(radius, 'Radius');
  radiusLC.init(model, this.genKey('radius()'));
  this.addChildControl(radiusLC);
};
