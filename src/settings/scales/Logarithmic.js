goog.provide('chartEditor.settings.scales.Logarithmic');

goog.require('chartEditor.settings.scales.Linear');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.scales.Linear}
 */
chartEditor.settings.scales.Logarithmic = function(model, opt_domHelper) {
  chartEditor.settings.scales.Logarithmic.base(this, 'constructor', model, opt_domHelper);
};
goog.inherits(chartEditor.settings.scales.Logarithmic, chartEditor.settings.scales.Linear);


// /** @override */
// chartEditor.settings.scales.Logarithmic.prototype.createDom = function() {
//   chartEditor.settings.scales.Logarithmic.base(this, 'createDom');
//
//   // var model = /** @type {chartEditor.EditorModel} */(this.getModel());
//   // var logBase = new chartEditor.controls.input.Base();
//   // var logBaseLC = new chartEditor.controls.LabeledControl(logBase, 'Log Base');
//   // logBaseLC.init(model, this.genKey('logBase()'));
//   // this.addChildControl(logBaseLC);
// };
