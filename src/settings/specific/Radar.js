goog.provide('chartEditor.settings.specific.Radar');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.controls.LabeledControl');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.specific.Radar = function(model, opt_domHelper) {
  chartEditor.settings.specific.Radar.base(this, 'constructor', model, 'Radar Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.settings.specific.Radar, chartEditor.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.specific.Radar.CSS_CLASS = goog.getCssName('anychart-chart-editor-settings-panel-radar');


/** @override */
chartEditor.settings.specific.Radar.prototype.createDom = function() {
  chartEditor.settings.specific.Radar.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.settings.specific.Radar.CSS_CLASS);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var startAngle = new chartEditor.comboBox.Base();
  startAngle.setOptions([0, 90, 180, 270]);
  startAngle.setRange(0, 360);
  var startAngleLC = new chartEditor.controls.LabeledControl(startAngle, 'Start Angle');
  startAngleLC.init(model, this.genKey('startAngle()'));
  this.addChildControl(startAngleLC);
};
