goog.provide('anychart.chartEditorModule.SettingsPanelIndexed');

goog.require('anychart.chartEditorModule.SettingsPanel');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {number} index
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.SettingsPanelIndexed = function(model, index, opt_name, opt_domHelper) {
  anychart.chartEditorModule.SettingsPanelIndexed.base(this, 'constructor', model, opt_name, opt_domHelper);

  /** @type {number|undefined} */
  this.plotIndex_ = void 0;

  /** @type {number} */
  this.index_ = index;

  this.addClassName(goog.getCssName('anychart-chart-editor-settings-panel-indexed'));
};
goog.inherits(anychart.chartEditorModule.SettingsPanelIndexed, anychart.chartEditorModule.SettingsPanel);


/** @return {number} */
anychart.chartEditorModule.SettingsPanelIndexed.prototype.getIndex = function() {
  return this.index_;
};


/** @return {number} */
anychart.chartEditorModule.SettingsPanelIndexed.prototype.getPlotIndex = function() {
  return goog.isNumber(this.plotIndex_) ? this.plotIndex_ : 0;
};


/** @inheritDoc */
anychart.chartEditorModule.SettingsPanelIndexed.prototype.createDom = function() {
  anychart.chartEditorModule.SettingsPanelIndexed.base(this, 'createDom');
  goog.dom.classlist.add(this.getElement(), this.index_ % 2 ? 'even' : 'odd');
};
