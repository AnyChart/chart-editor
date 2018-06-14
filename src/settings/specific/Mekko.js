goog.provide('chartEditor.settings.specific.Mekko');

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
chartEditor.settings.specific.Mekko = function(model, opt_domHelper) {
  chartEditor.settings.specific.Mekko.base(this, 'constructor', model, 'Mekko Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.settings.specific.Mekko, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.specific.Mekko.prototype.createDom = function() {
  chartEditor.settings.specific.Mekko.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var pointsPadding = new chartEditor.comboBox.Base();
  pointsPadding.setOptions([0, 1, 3, 5, 10, 15]);
  pointsPadding.setRange(0, 20);
  var pointsPaddingLC = new chartEditor.controls.LabeledControl(pointsPadding, 'Points Padding');
  pointsPaddingLC.init(model, this.genKey('pointsPadding()'));
  this.addChildControl(pointsPaddingLC);

  var xScale = new chartEditor.controls.select.Scales({label: 'X Scale', scaleName: 'Default X Scale'});
  xScale.init(model, this.genKey('xScale()'));
  this.addChildControl(xScale);

  var yScale = new chartEditor.controls.select.Scales({label: 'Y Scale', scaleName: 'Default Y Scale'});
  yScale.init(model, this.genKey('yScale()'));
  this.addChildControl(yScale);
};
