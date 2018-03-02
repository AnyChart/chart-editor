goog.provide('chartEditor.settings.scales.SpecificBase');

goog.require('chartEditor.SettingsPanel');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.settings.scales.SpecificBase = function(model, opt_domHelper) {
  chartEditor.settings.scales.SpecificBase.base(this, 'constructor', model, null, opt_domHelper);

  this.allowEnabled(false);

  this.scale_ = null;
};
goog.inherits(chartEditor.settings.scales.SpecificBase, chartEditor.SettingsPanel);



/** @inheritDoc */
chartEditor.settings.scales.SpecificBase.prototype.onChartDraw = function(evt) {
  chartEditor.settings.scales.SpecificBase.base(this, 'onChartDraw', evt);

  if (!this.isExcluded()) {
    var stringKey = chartEditor.EditorModel.getStringKey(this.key);
    this.scale_ = /** @type {Object} */(chartEditor.binding.exec(evt.chart, stringKey));
  }
};


/** @override */
chartEditor.settings.scales.SpecificBase.prototype.disposeInternal = function() {
  goog.dispose(this.scale_);
  this.scale_ = null;
  chartEditor.settings.scales.SpecificBase.base(this, 'disposeInternal');
};
