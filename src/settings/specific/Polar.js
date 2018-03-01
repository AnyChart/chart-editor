goog.provide('anychart.chartEditorModule.settings.specific.Polar');

goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.checkbox.Base');
goog.require('anychart.chartEditorModule.comboBox.Base');
goog.require('anychart.chartEditorModule.comboBox.Percent');
goog.require('anychart.chartEditorModule.controls.LabeledControl');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.specific.Polar = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.specific.Polar.base(this, 'constructor', model, 'Polar Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(anychart.chartEditorModule.settings.specific.Polar, anychart.chartEditorModule.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.specific.Polar.CSS_CLASS = goog.getCssName('anychart-chart-editor-settings-panel-polar');


/** @override */
anychart.chartEditorModule.settings.specific.Polar.prototype.createDom = function() {
  anychart.chartEditorModule.settings.specific.Polar.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), anychart.chartEditorModule.settings.specific.Polar.CSS_CLASS);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  var sortPointsByX = new anychart.chartEditorModule.checkbox.Base();
  sortPointsByX.setCaption('Sort Points By X');
  sortPointsByX.init(model, [['chart'], ['settings'], 'sortPointsByX()']);
  this.addChildControl(sortPointsByX);

  var startAngle = new anychart.chartEditorModule.comboBox.Base();
  startAngle.setOptions([0, 90, 180, 270]);
  startAngle.setRange(0, 360);
  var startAngleLC = new anychart.chartEditorModule.controls.LabeledControl(startAngle, 'Start Angle');
  startAngleLC.init(model, this.genKey('startAngle()'));
  this.addChildControl(startAngleLC);

  var pointWidth = new anychart.chartEditorModule.comboBox.Base();
  pointWidth.setOptions([1, 5, 10, 20, 40]);
  pointWidth.setRange(1, 200);
  var pointWidthLC = new anychart.chartEditorModule.controls.LabeledControl(pointWidth, 'Point Width');
  pointWidthLC.init(model, this.genKey('pointWidth()'));
  this.addChildControl(pointWidthLC);

  var maxPointWidth = new anychart.chartEditorModule.comboBox.Base();
  maxPointWidth.setOptions([1, 5, 10, 20, 40]);
  maxPointWidth.setRange(1, 200);
  var maxPointWidthLC = new anychart.chartEditorModule.controls.LabeledControl(maxPointWidth, 'Max Point Width');
  maxPointWidthLC.init(model, this.genKey('maxPointWidth()'));
  this.addChildControl(maxPointWidthLC);

  var innerRadius = new anychart.chartEditorModule.comboBox.Percent();
  innerRadius.setOptions([5, 10, 20, 30, 40]);
  var innerRadiusLC = new anychart.chartEditorModule.controls.LabeledControl(innerRadius, 'Inner Radius');
  innerRadiusLC.init(model, this.genKey('innerRadius()'));
  this.addChildControl(innerRadiusLC);
};
