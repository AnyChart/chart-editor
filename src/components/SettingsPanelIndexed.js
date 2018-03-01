goog.provide('chartEditor.SettingsPanelIndexed');

goog.require('chartEditor.SettingsPanel');


/**
 * @param {chartEditor.EditorModel} model
 * @param {number} index
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.SettingsPanelIndexed = function(model, index, opt_name, opt_domHelper) {
  chartEditor.SettingsPanelIndexed.base(this, 'constructor', model, opt_name, opt_domHelper);

  /** @type {number|undefined} */
  this.plotIndex_ = void 0;

  /** @type {number} */
  this.index_ = index;

  this.addClassName(goog.getCssName('anychart-chart-editor-settings-panel-indexed'));
};
goog.inherits(chartEditor.SettingsPanelIndexed, chartEditor.SettingsPanel);


/** @return {number} */
chartEditor.SettingsPanelIndexed.prototype.getIndex = function() {
  return this.index_;
};


/** @return {number} */
chartEditor.SettingsPanelIndexed.prototype.getPlotIndex = function() {
  return goog.isNumber(this.plotIndex_) ? this.plotIndex_ : 0;
};


/** @inheritDoc */
chartEditor.SettingsPanelIndexed.prototype.createDom = function() {
  chartEditor.SettingsPanelIndexed.base(this, 'createDom');
  goog.dom.classlist.add(this.getElement(), this.index_ % 2 ? 'even' : 'odd');
};
