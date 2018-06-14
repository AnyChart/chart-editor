goog.provide('chartEditor.settings.specific.HeatMap');

goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.controls.select.Scales');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.specific.HeatMap = function(model, opt_domHelper) {
  chartEditor.settings.specific.HeatMap.base(this, 'constructor', model, 'Heat Map Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.settings.specific.HeatMap, chartEditor.SettingsPanel);


/** @override */
chartEditor.settings.specific.HeatMap.prototype.createDom = function() {
  chartEditor.settings.specific.HeatMap.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var xScale = new chartEditor.controls.select.Scales({label: 'X Scale', scaleName: 'Default X Scale'});
  xScale.init(model, this.genKey('xScale()'));
  this.addChildControl(xScale);

  var yScale = new chartEditor.controls.select.Scales({label: 'Y Scale', scaleName: 'Default Y Scale'});
  yScale.init(model, this.genKey('yScale()'));
  this.addChildControl(yScale);
};
