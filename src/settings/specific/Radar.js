goog.provide('chartEditor.settings.specific.Radar');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.comboBox.Base');
goog.require('chartEditor.controls.LabeledControl');
goog.require('chartEditor.controls.select.Scales');


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


/** @override */
chartEditor.settings.specific.Radar.prototype.createDom = function() {
  chartEditor.settings.specific.Radar.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var startAngle = new chartEditor.comboBox.Base();
  startAngle.setOptions([0, 90, 180, 270]);
  startAngle.setRange(0, 360);
  var startAngleLC = new chartEditor.controls.LabeledControl(startAngle, 'Start Angle');
  startAngleLC.init(model, this.genKey('startAngle()'));
  this.addChildControl(startAngleLC);

  var xScale = new chartEditor.controls.select.Scales({label: 'X Scale', scaleName: 'Default X Scale'});
  xScale.init(model, this.genKey('xScale()'));
  this.addChildControl(xScale);

  var yScale = new chartEditor.controls.select.Scales({label: 'Y Scale', scaleName: 'Default Y Scale'});
  yScale.init(model, this.genKey('yScale()'));
  this.addChildControl(yScale);
};
