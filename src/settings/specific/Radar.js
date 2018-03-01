goog.provide('anychart.chartEditorModule.settings.specific.Radar');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.comboBox.Base');
goog.require('anychart.chartEditorModule.controls.LabeledControl');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.specific.Radar = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.specific.Radar.base(this, 'constructor', model, 'Radar Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(anychart.chartEditorModule.settings.specific.Radar, anychart.chartEditorModule.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.specific.Radar.CSS_CLASS = goog.getCssName('anychart-chart-editor-settings-panel-radar');


/** @override */
anychart.chartEditorModule.settings.specific.Radar.prototype.createDom = function() {
  anychart.chartEditorModule.settings.specific.Radar.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), anychart.chartEditorModule.settings.specific.Radar.CSS_CLASS);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var startAngle = new anychart.chartEditorModule.comboBox.Base();
  startAngle.setOptions([0, 90, 180, 270]);
  startAngle.setRange(0, 360);
  var startAngleLC = new anychart.chartEditorModule.controls.LabeledControl(startAngle, 'Start Angle');
  startAngleLC.init(model, this.genKey('startAngle()'));
  this.addChildControl(startAngleLC);
};
