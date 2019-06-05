goog.provide('chartEditor.ui.control.wrapped.Base');

goog.require('chartEditor.ui.Component');
goog.require('chartEditor.ui.control.button.Base');


/**
 * Component with control.
 *
 * @param {chartEditor.model.Base.Control} control
 *
 * @param {boolean=} opt_allowReset
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.control.wrapped.Base = function(control, opt_allowReset, opt_domHelper) {
  chartEditor.ui.control.wrapped.Base.base(this, 'constructor', opt_domHelper);

  this.control_ = control;

  this.allowReset_ = !!opt_allowReset;

  this.addClassName('anychart-ce-wrapped-control');

  if (this.allowReset_)
    this.addClassName('anychart-ce-resetable-control');
};
goog.inherits(chartEditor.ui.control.wrapped.Base, chartEditor.ui.Component);


/** @inheritDoc */
chartEditor.ui.control.wrapped.Base.prototype.createDom = function() {
  chartEditor.ui.control.wrapped.Base.base(this, 'createDom');

  this.addChild(this.control_, true);
  goog.dom.classlist.add(this.control_.getElement(), 'anychart-ce-panel-control');

  if (this.allowReset_) {
    var button = new chartEditor.ui.control.button.Base();
    button.setIcon('ac ac-clear');
    button.addClassName('anychart-ce-button-reset');
    this.addChild(button, true);
    goog.events.listen(button, goog.ui.Component.EventType.ACTION, this.onReset, false, this);
    this.resetButton_ = button;
  }
};


/**
 * @return {chartEditor.model.Base.Control}
 */
chartEditor.ui.control.wrapped.Base.prototype.getControl = function() {
  return this.control_;
};


/**
 * @param {chartEditor.model.Base.Control} control
 */
chartEditor.ui.control.wrapped.Base.prototype.setControl = function(control) {
  goog.dispose(this.control_);
  this.control_ = control;
};


/** @protected */
chartEditor.ui.control.wrapped.Base.prototype.onReset = function() {
  this.reset();
};


/**
 * Removes control's value from model
 */
chartEditor.ui.control.wrapped.Base.prototype.reset = function() {
  if (goog.isFunction(this.control_.resetRevisions))
    this.control_.resetRevisions();

  this.control_.reset();
};


/**
 * Connects control with EditorMode.
 *
 * @param {chartEditor.model.Base} model Editor model instance to connect with.
 * @param {chartEditor.model.Base.Key} key Key of control's field in model's structure.
 * @param {string=} opt_callback Callback function that will be called on control's value change instead of simple change value in model.
 *  This function should be model's public method.
 * @param {boolean=} opt_rebuildChart Should or not rebuild target (chart) on change value of this control.
 * @public
 */
chartEditor.ui.control.wrapped.Base.prototype.init = function(model, key, opt_callback, opt_rebuildChart) {
  this.setModel(model);
  this.control_.init(model, key, opt_callback, opt_rebuildChart);
};


/**
 * Wrapper for control's method.
 * @param {?Object} target
 * @return {boolean|undefined}
 */
chartEditor.ui.control.wrapped.Base.prototype.setValueByTarget = function(target) {
  return this.control_.setValueByTarget(target);
};


/**
 * @param {string|null} value
 * @param {boolean=} opt_noDispatch
 */
chartEditor.ui.control.wrapped.Base.prototype.setValue = function(value, opt_noDispatch) {
  this.control_.suspendDispatch(!!opt_noDispatch);
  this.control_.setValue(value);
  this.control_.suspendDispatch(false);
};


/**
 * @return {*}
 */
chartEditor.ui.control.wrapped.Base.prototype.getValue = function() {
  return this.control_ ? this.control_.getValue() : null;
};


/**
 * @return {?chartEditor.model.Base.Key}
 */
chartEditor.ui.control.wrapped.Base.prototype.getKey = function() {
  return this.control_ ? this.control_.getKey() : null;
};


/**
 * @param {boolean} enabled
 */
chartEditor.ui.control.wrapped.Base.prototype.setEnabled = function(enabled) {
  if (this.label_)
    goog.dom.classlist.enable(this.label_, goog.getCssName('anychart-ce-control-disabled'), !enabled);

  if (this.control_)
    this.control_.setEnabled(enabled);

  if (this.resetButton_)
    this.resetButton_.setEnabled(enabled);
};


/**
 * Hide or show control by assigning 'hidden' class
 * @param {boolean} value True if excluded.
 */
chartEditor.ui.control.wrapped.Base.prototype.exclude = function(value) {
  this.hide(value);
  this.control_.exclude(value);
};


/**
 * @return {boolean}
 */
chartEditor.ui.control.wrapped.Base.prototype.isExcluded = function() {
  return this.control_.isExcluded();
};


/** @override */
chartEditor.ui.control.wrapped.Base.prototype.disposeInternal = function() {
  goog.disposeAll(this.control_, this.resetButton_);
  this.control_ = null;
  this.resetButton_ = null;

  chartEditor.ui.control.wrapped.Base.base(this, 'disposeInternal');
};