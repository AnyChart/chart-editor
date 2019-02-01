goog.provide('chartEditor.ui.control.fieldSelect.Base');

goog.require('chartEditor.ui.Component');
goog.require('chartEditor.ui.control.fieldSelect.Select');
goog.require('chartEditor.ui.control.wrapped.Labeled');



/**
 * @param {Object=} opt_model
 * @param {goog.ui.Menu=} opt_menu
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer
 * @param {string=} opt_menuAdditionalClass
 * @constructor
 * @extends {chartEditor.ui.control.wrapped.Labeled}
 */
chartEditor.ui.control.fieldSelect.Base = function(opt_model, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer, opt_menuAdditionalClass) {
  var select = new chartEditor.ui.control.fieldSelect.Select(
      opt_model,
      opt_menu,
      opt_renderer,
      opt_domHelper,
      opt_menuRenderer,
      opt_menuAdditionalClass);

  var label = opt_model && opt_model.label || '';
  chartEditor.ui.control.fieldSelect.Base.base(this, 'constructor', select, label, false, opt_domHelper);
};
goog.inherits(chartEditor.ui.control.fieldSelect.Base, chartEditor.ui.control.wrapped.Labeled);


/** @inheritDoc */
chartEditor.ui.control.fieldSelect.Base.prototype.enterDocument = function() {
  chartEditor.ui.control.fieldSelect.Base.base(this, 'enterDocument');

  this.updateExclusion();
};


/** @return {chartEditor.ui.control.select.Base} */
chartEditor.ui.control.fieldSelect.Base.prototype.getSelect = function() {
  return /** @type {chartEditor.ui.control.select.Base} */(this.getControl());
};


/** @param {chartEditor.ui.control.fieldSelect.Select} select */
chartEditor.ui.control.fieldSelect.Base.prototype.setSelect = function(select) {
  this.setControl(select);
};


/** @inheritDoc */
chartEditor.ui.control.fieldSelect.Base.prototype.init = function(model, key, opt_callback, opt_noRebuild, opt_noRebuildMapping) {
  chartEditor.ui.control.fieldSelect.Base.base(this, 'init', model, key, opt_callback, opt_noRebuild, opt_noRebuildMapping);

  this.updateExclusion();
};


/**
 * Hide or show control by assigning 'hidden' class
 * @param {boolean} value True if excluded.
 */
chartEditor.ui.control.fieldSelect.Base.prototype.exclude = function(value) {
  if (this.isInDocument()) goog.style.setElementShown(this.getElement(), !value);
  this.control_.exclude(value);
};


/**
 * @public
 */
chartEditor.ui.control.fieldSelect.Base.prototype.updateExclusion = function() {
  this.exclude(!!this.control_.updateExclusion());
};
