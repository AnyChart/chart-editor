goog.provide('chartEditor.settings.specific.Scatter');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.controls.select.Scales');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.specific.Scatter = function(model, opt_domHelper) {
  chartEditor.settings.specific.Scatter.base(this, 'constructor', model, 'Scatter Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.settings.specific.Scatter, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.specific.Scatter.prototype.createDom = function() {
  chartEditor.settings.specific.Scatter.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var xScale = new chartEditor.controls.select.Scales({label: 'X Scale', scaleName: 'Default X Scale'});
  xScale.init(model, this.genKey('xScale()'));
  this.addChildControl(xScale);

  var yScale = new chartEditor.controls.select.Scales({label: 'Y Scale', scaleName: 'Default Y Scale'});
  yScale.init(model, this.genKey('yScale()'));
  this.addChildControl(yScale);
};
