goog.provide('anychart.chartEditorModule.settings.scales.LogarithmicSpecific');

goog.require('anychart.chartEditorModule.checkbox.Base');
goog.require('anychart.chartEditorModule.settings.scales.LinearSpecific');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.settings.scales.LinearSpecific}
 */
anychart.chartEditorModule.settings.scales.LogarithmicSpecific = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.scales.LogarithmicSpecific.base(this, 'constructor', model, opt_domHelper);
};
goog.inherits(anychart.chartEditorModule.settings.scales.LogarithmicSpecific, anychart.chartEditorModule.settings.scales.LinearSpecific);


/**
 * Default CSS class.
 * @type {string}
 */
anychart.chartEditorModule.settings.scales.LogarithmicSpecific.CSS_CLASS = goog.getCssName('anychart-settings-panel-scale-logarithmic');


/** @override */
anychart.chartEditorModule.settings.scales.LogarithmicSpecific.prototype.createDom = function() {
  anychart.chartEditorModule.settings.scales.LogarithmicSpecific.base(this, 'createDom');

  goog.dom.classlist.add(this.getElement(), anychart.chartEditorModule.settings.scales.LogarithmicSpecific.CSS_CLASS);

  // var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  // var logBase = new anychart.chartEditorModule.input.Base();
  // var logBaseLC = new anychart.chartEditorModule.controls.LabeledControl(logBase, 'Log Base');
  // logBaseLC.init(model, this.genKey('logBase()'));
  // this.addChildControl(logBaseLC);
};
