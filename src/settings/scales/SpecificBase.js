goog.provide('anychart.chartEditorModule.settings.scales.SpecificBase');

goog.require('anychart.chartEditorModule.SettingsPanel');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.settings.scales.SpecificBase = function(model, opt_domHelper) {
  anychart.chartEditorModule.settings.scales.SpecificBase.base(this, 'constructor', model, null, opt_domHelper);

  this.allowEnabled(false);

  this.scale_ = null;
};
goog.inherits(anychart.chartEditorModule.settings.scales.SpecificBase, anychart.chartEditorModule.SettingsPanel);



/** @inheritDoc */
anychart.chartEditorModule.settings.scales.SpecificBase.prototype.onChartDraw = function(evt) {
  anychart.chartEditorModule.settings.scales.SpecificBase.base(this, 'onChartDraw', evt);

  if (!this.isExcluded()) {
    var stringKey = anychart.chartEditorModule.EditorModel.getStringKey(this.key);
    this.scale_ = /** @type {anychart.colorScalesModule.Ordinal|anychart.colorScalesModule.Linear} */(anychart.bindingModule.exec(evt.chart, stringKey));
  }
};


/** @override */
anychart.chartEditorModule.settings.scales.SpecificBase.prototype.disposeInternal = function() {
  goog.dispose(this.scale_);
  this.scale_ = null;
  anychart.chartEditorModule.settings.scales.SpecificBase.base(this, 'disposeInternal');
};
