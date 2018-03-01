goog.provide('anychart.chartEditorModule.settings.specific.Cartesian');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');



/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.specific.Cartesian = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.specific.Cartesian.base(this, 'constructor', model, 'Cartesian Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(anychart.chartEditorModule.settings.specific.Cartesian, anychart.chartEditorModule.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.specific.Cartesian.CSS_CLASS = goog.getCssName('anychart-chart-editor-settings-panel-cartesian');


/** @override */
anychart.chartEditorModule.settings.specific.Cartesian.prototype.createDom = function() {
  anychart.chartEditorModule.settings.specific.Cartesian.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), anychart.chartEditorModule.settings.specific.Cartesian.CSS_CLASS);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var pointWidth = new anychart.chartEditorModule.comboBox.Percent();
  pointWidth.setOptions([10, 30, 50, 70, 90]);
  var pointWidthLC = new anychart.chartEditorModule.controls.LabeledControl(pointWidth, 'Point Width');
  pointWidthLC.init(model, this.genKey('pointWidth()'));
  this.addChildControl(pointWidthLC);

  var maxPointWidth = new anychart.chartEditorModule.comboBox.Percent();
  maxPointWidth.setOptions([10, 30, 50, 70, 90, 100]);
  var maxPointWidthLC = new anychart.chartEditorModule.controls.LabeledControl(maxPointWidth, 'Max Point Width');
  maxPointWidthLC.init(model, this.genKey('maxPointWidth()'));
  this.addChildControl(maxPointWidthLC);

  var minPointLength = new anychart.chartEditorModule.comboBox.Percent();
  minPointLength.setOptions([0, 2, 5, 10]);
  var minPointLengthLC = new anychart.chartEditorModule.controls.LabeledControl(minPointLength, 'Min Point Length');
  minPointLengthLC.init(model, this.genKey('minPointLength()'));
  this.addChildControl(minPointLengthLC);
};
