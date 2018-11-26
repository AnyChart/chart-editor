goog.provide('chartEditor.controls.select.DataField');

goog.require("chartEditor.Component");
goog.require("chartEditor.controls.LabeledControl");
goog.require("chartEditor.controls.select.DataFieldSelect");


/**
 * @param {Object=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 * @constructor
 * @extends {chartEditor.controls.LabeledControl}
 */
chartEditor.controls.select.DataField = function(opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  var select = new chartEditor.controls.select.DataFieldSelect(
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass);

  var label = opt_model && opt_model.label || '';
  chartEditor.controls.select.DataField.base(this, 'constructor', select, label, false, opt_domHelper);
};
goog.inherits(chartEditor.controls.select.DataField, chartEditor.controls.LabeledControl);


/** @inheritDoc */
chartEditor.controls.select.DataField.prototype.enterDocument = function() {
  chartEditor.controls.select.DataField.base(this, 'enterDocument');

  this.updateExclusion();
};


/** @return {chartEditor.controls.select.Base} */
chartEditor.controls.select.DataField.prototype.getSelect = function() {
  return /** @type {chartEditor.controls.select.Base} */(this.getControl());
};


/** @param {chartEditor.controls.select.DataFieldSelect} select */
chartEditor.controls.select.DataField.prototype.setSelect = function(select) {
  this.setControl(select);
};


/** @inheritDoc */
chartEditor.controls.select.DataField.prototype.init = function(model, key, opt_callback, opt_noRebuild, opt_noRebuildMapping) {
  chartEditor.controls.select.DataField.base(this, 'init', model, key, opt_callback, opt_noRebuild, opt_noRebuildMapping);

  this.updateExclusion();
};


/**
 * Hide or show control by assigning 'hidden' class
 * @param {boolean} value True if excluded.
 */
chartEditor.controls.select.DataField.prototype.exclude = function(value) {
  if (this.isInDocument()) goog.style.setElementShown(this.getElement(), !value);
  this.control_.exclude(value);
};


/**
 * @public
 */
chartEditor.controls.select.DataField.prototype.updateExclusion = function() {
  this.exclude(!!this.control_.updateExclusion());
};
