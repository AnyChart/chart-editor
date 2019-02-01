goog.provide('chartEditor.ui.panel.scales.Logarithmic');

goog.require('chartEditor.ui.panel.scales.Linear');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.panel.scales.Linear}
 */
chartEditor.ui.panel.scales.Logarithmic = function(model, opt_domHelper) {
  chartEditor.ui.panel.scales.Logarithmic.base(this, 'constructor', model, opt_domHelper);
};
goog.inherits(chartEditor.ui.panel.scales.Logarithmic, chartEditor.ui.panel.scales.Linear);


// /** @override */
// chartEditor.panel.scales.Logarithmic.prototype.createDom = function() {
//   chartEditor.panel.scales.Logarithmic.base(this, 'createDom');
//
//   // var model = /** @type {chartEditor.model.Base} */(this.getModel());
//   // var logBase = new chartEditor.ui.control.input.Base();
//   // var logBaseLC = new chartEditor.ui.control.wrapped.Labeled(logBase, 'Log Base');
//   // logBaseLC.init(model, this.genKey('logBase()'));
//   // this.addChildControl(logBaseLC);
// };
