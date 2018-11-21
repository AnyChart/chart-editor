goog.provide('chartEditor.controls.WrappedControl');

goog.require('chartEditor.Component');
goog.require('chartEditor.ui.button.Base');


/**
 * @param {chartEditor.EditorModel.Control} control
 *
 * @param {boolean=} opt_allowReset
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.controls.WrappedControl = function(control, opt_allowReset, opt_domHelper) {
  chartEditor.controls.WrappedControl.base(this, 'constructor', opt_domHelper);

  this.control_ = control;

  this.allowReset_ = !!opt_allowReset;

  this.addClassName('anychart-ce-wrapped-control');

  if (this.allowReset_)
    this.addClassName('anychart-ce-resetable-control');
};
goog.inherits(chartEditor.controls.WrappedControl, chartEditor.Component);


/** @inheritDoc */
chartEditor.controls.WrappedControl.prototype.createDom = function() {
  chartEditor.controls.WrappedControl.base(this, 'createDom');

  this.addChild(this.control_, true);
  goog.dom.classlist.add(this.control_.getElement(), 'anychart-ce-settings-control');

  if (this.allowReset_) {
    var button = new chartEditor.ui.button.Base();
    button.setIcon('ac ac-clear');
    button.addClassName('anychart-ce-button-reset');
    this.addChild(button, true);
    goog.events.listen(button, goog.ui.Component.EventType.ACTION, this.onReset, false, this);
    this.resetButton_ = button;
  }
};


/**
 * @return {chartEditor.EditorModel.Control}
 */
chartEditor.controls.WrappedControl.prototype.getControl = function() {
  return this.control_;
};


/**
 * @param {chartEditor.EditorModel.Control} control
 */
chartEditor.controls.WrappedControl.prototype.setControl = function(control) {
  goog.dispose(this.control_);
  this.control_ = control;
};


/** @protected */
chartEditor.controls.WrappedControl.prototype.onReset = function() {
  this.reset();
};


/**
 * Removes control's value from model
 */
chartEditor.controls.WrappedControl.prototype.reset = function() {
  if (goog.isFunction(this.control_.resetRevisions))
    this.control_.resetRevisions();

  this.control_.reset();
};


/**
 * Connects control with EditorMode.
 *
 * @param {chartEditor.EditorModel} model Editor model instance to connect with.
 * @param {chartEditor.EditorModel.Key} key Key of control's field in model's structure.
 * @param {string=} opt_callback Callback function that will be called on control's value change instead of simple change value in model.
 *  This function should be model's public method.
 * @param {boolean=} opt_noRebuild Should or not rebuild target (chart) on change value of this control.
 * @param {boolean=} opt_noRebuildMapping
 * @public
 */
chartEditor.controls.WrappedControl.prototype.init = function(model, key, opt_callback, opt_noRebuild, opt_noRebuildMapping) {
  this.setModel(model);
  this.control_.init(model, key, opt_callback, opt_noRebuild, opt_noRebuildMapping);
};


/**
 * Wrapper for control's method.
 * @param {?Object} target
 * @return {boolean|undefined}
 */
chartEditor.controls.WrappedControl.prototype.setValueByTarget = function(target) {
  return this.control_.setValueByTarget(target);
};


/**
 * @param {string|null} value
 * @param {boolean=} opt_noDispatch
 */
chartEditor.controls.WrappedControl.prototype.setValue = function(value, opt_noDispatch) {
  this.control_.suspendDispatch(!!opt_noDispatch);
  this.control_.setValue(value);
  this.control_.suspendDispatch(false);
};


/**
 * @return {*}
 */
chartEditor.controls.WrappedControl.prototype.getValue = function() {
  return this.control_ ? this.control_.getValue() : null;
};


/**
 * @return {?chartEditor.EditorModel.Key}
 */
chartEditor.controls.WrappedControl.prototype.getKey = function() {
  return this.control_ ? this.control_.getKey() : null;
};


/**
 * @param {boolean} enabled
 */
chartEditor.controls.WrappedControl.prototype.setEnabled = function(enabled) {
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
chartEditor.controls.WrappedControl.prototype.exclude = function(value) {
  this.hide(value);
  this.control_.exclude(value);
};


/**
 * @return {boolean}
 */
chartEditor.controls.WrappedControl.prototype.isExcluded = function() {
  return this.control_.isExcluded();
};


/** @override */
chartEditor.controls.WrappedControl.prototype.disposeInternal = function() {
  goog.disposeAll(this.control_, this.resetButton_);
  this.control_ = null;
  this.resetButton_ = null;

  chartEditor.controls.WrappedControl.base(this, 'disposeInternal');
};