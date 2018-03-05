goog.provide('chartEditor.settings.specific.Polar');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.checkbox.Base');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.specific.Polar = function(model, opt_domHelper) {
  chartEditor.settings.specific.Polar.base(this, 'constructor', model, 'Polar Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.settings.specific.Polar, chartEditor.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.specific.Polar.CSS_CLASS = goog.getCssName('anychart-ce-settings-panel-polar');


/** @override */
chartEditor.settings.specific.Polar.prototype.createDom = function() {
  chartEditor.settings.specific.Polar.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.settings.specific.Polar.CSS_CLASS);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var sortPointsByX = new chartEditor.checkbox.Base();
  sortPointsByX.setCaption('Sort Points By X');
  sortPointsByX.init(model, [['chart'], ['settings'], 'sortPointsByX()']);
  this.addChildControl(sortPointsByX);

  var startAngle = new chartEditor.comboBox.Base();
  startAngle.setOptions([0, 90, 180, 270]);
  startAngle.setRange(0, 360);
  var startAngleLC = new chartEditor.controls.LabeledControl(startAngle, 'Start Angle');
  startAngleLC.init(model, this.genKey('startAngle()'));
  this.addChildControl(startAngleLC);

  var pointWidth = new chartEditor.comboBox.Base();
  pointWidth.setOptions([1, 5, 10, 20, 40]);
  pointWidth.setRange(1, 200);
  var pointWidthLC = new chartEditor.controls.LabeledControl(pointWidth, 'Point Width');
  pointWidthLC.init(model, this.genKey('pointWidth()'));
  this.addChildControl(pointWidthLC);

  var maxPointWidth = new chartEditor.comboBox.Base();
  maxPointWidth.setOptions([1, 5, 10, 20, 40]);
  maxPointWidth.setRange(1, 200);
  var maxPointWidthLC = new chartEditor.controls.LabeledControl(maxPointWidth, 'Max Point Width');
  maxPointWidthLC.init(model, this.genKey('maxPointWidth()'));
  this.addChildControl(maxPointWidthLC);

  var innerRadius = new chartEditor.comboBox.Percent();
  innerRadius.setOptions([5, 10, 20, 30, 40]);
  var innerRadiusLC = new chartEditor.controls.LabeledControl(innerRadius, 'Inner Radius');
  innerRadiusLC.init(model, this.genKey('innerRadius()'));
  this.addChildControl(innerRadiusLC);
};
