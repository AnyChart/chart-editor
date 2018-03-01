goog.provide('chartEditor.settings.scales.LogarithmicSpecific');

goog.require('chartEditor.checkbox.Base');
goog.require('chartEditor.settings.scales.LinearSpecific');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.scales.LinearSpecific}
 */
chartEditor.settings.scales.LogarithmicSpecific = function(model, opt_domHelper) {
  chartEditor.settings.scales.LogarithmicSpecific.base(this, 'constructor', model, opt_domHelper);
};
goog.inherits(chartEditor.settings.scales.LogarithmicSpecific, chartEditor.settings.scales.LinearSpecific);


/**
 * Default CSS class.
 * @type {string}
 */
chartEditor.settings.scales.LogarithmicSpecific.CSS_CLASS = goog.getCssName('anychart-settings-panel-scale-logarithmic');


/** @override */
chartEditor.settings.scales.LogarithmicSpecific.prototype.createDom = function() {
  chartEditor.settings.scales.LogarithmicSpecific.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), chartEditor.settings.scales.LogarithmicSpecific.CSS_CLASS);

  // var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  // var logBase = new chartEditor.input.Base();
  // var logBaseLC = new chartEditor.controls.LabeledControl(logBase, 'Log Base');
  // logBaseLC.init(model, this.genKey('logBase()'));
  // this.addChildControl(logBaseLC);
};
