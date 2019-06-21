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

  /**
   * Custom getter key
   * @type {string}}
   * @private
   */
  this.getterKey_ = null;

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
chartEditor.ui.control.fieldSelect.Base.prototype.init = function(model, key, opt_callback, opt_rebuilcChart) {
  chartEditor.ui.control.fieldSelect.Base.base(this, 'init', model, key, opt_callback, opt_rebuilcChart);

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


/**
 * @param {string} key custom getter key.
 * It requires when the same value is applied to the chart by one key, and gets back by another one.
 */
chartEditor.ui.control.fieldSelect.Base.prototype.setGetterKey = function(key) {
  this.getterKey_ = key;
};


/**
 * @return {?string} key custom getter key.
 */
chartEditor.ui.control.fieldSelect.Base.prototype.getGetterKey = function() {
  return this.getterKey_;
};


/** @override */
chartEditor.ui.control.fieldSelect.Base.prototype.setValueByTarget = function(target) {
  /**
   * If the value can returned from the chart by another key, use this getter key for it.
   * It means that setter and getter keys are different.
   */
  if (this.getterKey_) {
    var value = chartEditor.binding.exec(target, this.getterKey_);
    this.setValue(value);
  } else
    chartEditor.ui.control.fieldSelect.Base.base(this, 'setValueByTarget', target);
  // for jsdoc compatibility
  // TODO: probably we should remove the @return from the superclass method
  return;
};
