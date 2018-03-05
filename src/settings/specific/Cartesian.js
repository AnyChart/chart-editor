goog.provide('chartEditor.settings.specific.Cartesian');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.comboBox.Percent');
goog.require('chartEditor.controls.LabeledControl');



/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.specific.Cartesian = function(model, opt_domHelper) {
  chartEditor.settings.specific.Cartesian.base(this, 'constructor', model, 'Cartesian Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.settings.specific.Cartesian, chartEditor.SettingsPanel);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.specific.Cartesian.CSS_CLASS = goog.getCssName('anychart-ce-settings-panel-cartesian');


/** @override */
chartEditor.settings.specific.Cartesian.prototype.createDom = function() {
  chartEditor.settings.specific.Cartesian.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.settings.specific.Cartesian.CSS_CLASS);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var pointWidth = new chartEditor.comboBox.Percent();
  pointWidth.setOptions([10, 30, 50, 70, 90]);
  var pointWidthLC = new chartEditor.controls.LabeledControl(pointWidth, 'Point Width');
  pointWidthLC.init(model, this.genKey('pointWidth()'));
  this.addChildControl(pointWidthLC);

  var maxPointWidth = new chartEditor.comboBox.Percent();
  maxPointWidth.setOptions([10, 30, 50, 70, 90, 100]);
  var maxPointWidthLC = new chartEditor.controls.LabeledControl(maxPointWidth, 'Max Point Width');
  maxPointWidthLC.init(model, this.genKey('maxPointWidth()'));
  this.addChildControl(maxPointWidthLC);

  var minPointLength = new chartEditor.comboBox.Percent();
  minPointLength.setOptions([0, 2, 5, 10]);
  var minPointLengthLC = new chartEditor.controls.LabeledControl(minPointLength, 'Min Point Length');
  minPointLengthLC.init(model, this.genKey('minPointLength()'));
  this.addChildControl(minPointLengthLC);
};
