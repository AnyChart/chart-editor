goog.provide('anychart.chartEditorModule.controls.select.DataField');

goog.require('anychart.chartEditorModule.controls.LabeledControl');
goog.require('anychart.chartEditorModule.controls.select.DataFieldSelect');
goog.require('anychart.ui.Component');


/**
 * @param {Object=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 * @constructor
 * @extends {anychart.chartEditorModule.controls.LabeledControl}
 */
anychart.chartEditorModule.controls.select.DataField = function(opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  var select = new anychart.chartEditorModule.controls.select.DataFieldSelect(
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass);

  var label = opt_model && opt_model.label || '';
  anychart.chartEditorModule.controls.select.DataField.base(this, 'constructor', select, label, opt_domHelper);
};
goog.inherits(anychart.chartEditorModule.controls.select.DataField, anychart.chartEditorModule.controls.LabeledControl);


/** @inheritDoc */
anychart.chartEditorModule.controls.select.DataField.prototype.enterDocument = function() {
  anychart.chartEditorModule.controls.select.DataField.base(this, 'enterDocument');

  this.updateExclusion();
};


/** @return {anychart.chartEditorModule.controls.select.Base} */
anychart.chartEditorModule.controls.select.DataField.prototype.getSelect = function() {
  return /** @type {anychart.chartEditorModule.controls.select.Base} */(this.getControl());
};


/** @param {anychart.chartEditorModule.controls.select.DataFieldSelect} select */
anychart.chartEditorModule.controls.select.DataField.prototype.setSelect = function(select) {
  this.setControl(select);
};


/** @inheritDoc */
anychart.chartEditorModule.controls.select.DataField.prototype.init = function(model, key, opt_callback, opt_noRebuild) {
  anychart.chartEditorModule.controls.select.DataField.base(this, 'init', model, key, opt_callback, opt_noRebuild);

  this.updateExclusion();
};


/**
 * Hide or show control by assigning 'hidden' class
 * @param {boolean} value True if excluded.
 */
anychart.chartEditorModule.controls.select.DataField.prototype.exclude = function(value) {
  if (this.isInDocument()) goog.style.setElementShown(this.getElement(), !value);
  this.control_.exclude(value);
};


/**
 * @public
 */
anychart.chartEditorModule.controls.select.DataField.prototype.updateExclusion = function() {
  this.exclude(!!this.control_.updateExclusion());
};
