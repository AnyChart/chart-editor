goog.provide('chartEditor.controls.LabeledControl');

goog.require('chartEditor.Component');


/**
 * @param {(chartEditor.comboBox.Base|chartEditor.controls.select.Base|chartEditor.controls.input.Base|chartEditor.colorPicker.Base)} control
 * @param {string=} opt_label
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.controls.LabeledControl = function(control, opt_label, opt_domHelper) {
  chartEditor.controls.LabeledControl.base(this, 'constructor', opt_domHelper);

  this.control_ = control;
  this.labelString_ = opt_label ? opt_label : '';

  this.addClassName('anychart-ce-labeled-control');
};
goog.inherits(chartEditor.controls.LabeledControl, chartEditor.Component);


/** @inheritDoc */
chartEditor.controls.LabeledControl.prototype.createDom = function() {
  chartEditor.controls.LabeledControl.base(this, 'createDom');

  var element = this.getElement();

  this.label_ = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-labeled-control-label', this.labelString_);
  goog.dom.appendChild(element, this.label_);

  this.addChild(this.control_, true);
  goog.dom.classlist.add(this.control_.getElement(), 'anychart-ce-settings-control');
  goog.dom.classlist.add(this.control_.getElement(), 'anychart-ce-settings-control-right');

  goog.dom.appendChild(this.getElement(), goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-ce-clearboth')));
};


/**
 * @return {(chartEditor.comboBox.Base|chartEditor.controls.select.Base|chartEditor.controls.input.Base|chartEditor.colorPicker.Base)}
 */
chartEditor.controls.LabeledControl.prototype.getControl = function() {
  return this.control_;
};


/**
 * @param {(chartEditor.comboBox.Base|chartEditor.controls.select.Base|chartEditor.controls.input.Base|chartEditor.colorPicker.Base)} control
 */
chartEditor.controls.LabeledControl.prototype.setControl = function(control) {
  goog.dispose(this.control_);
  this.control_ = control;
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
chartEditor.controls.LabeledControl.prototype.init = function(model, key, opt_callback, opt_noRebuild, opt_noRebuildMapping) {
  this.setModel(model);
  this.control_.init(model, key, opt_callback, opt_noRebuild, opt_noRebuildMapping);
};


/**
 * Wrapper for control's method.
 * @param {?Object} target
 * @return {boolean|undefined}
 */
chartEditor.controls.LabeledControl.prototype.setValueByTarget = function(target) {
  return this.control_.setValueByTarget(target);
};


/**
 * @param {string|null} value
 * @param {boolean=} opt_noDispatch
 */
chartEditor.controls.LabeledControl.prototype.setValue = function(value, opt_noDispatch) {
  this.control_.suspendDispatch(!!opt_noDispatch);
  this.control_.setValue(value);
  this.control_.suspendDispatch(false);
};


/**
 * @return {*}
 */
chartEditor.controls.LabeledControl.prototype.getValue = function() {
  return this.control_ ? this.control_.getValue() : null;
};


/**
 * @return {?chartEditor.EditorModel.Key}
 */
chartEditor.controls.LabeledControl.prototype.getKey = function() {
  return this.control_ ? this.control_.getKey() : null;
};


/**
 * @param {boolean} enabled
 */
chartEditor.controls.LabeledControl.prototype.setEnabled = function(enabled) {
  if (this.label_)
    goog.dom.classlist.enable(this.label_, goog.getCssName('anychart-ce-control-disabled'), !enabled);

  if (this.control_)
    this.control_.setEnabled(enabled);
};


/**
 * Hide or show control by assigning 'hidden' class
 * @param {boolean} value True if excluded.
 */
chartEditor.controls.LabeledControl.prototype.exclude = function(value) {
  this.hide(value);
  this.control_.exclude(value);
};


/**
 * @return {boolean}
 */
chartEditor.controls.LabeledControl.prototype.isExcluded = function() {
  return this.control_.isExcluded();
};


/** @override */
chartEditor.controls.LabeledControl.prototype.disposeInternal = function() {
  goog.dispose(this.control_);
  this.control_ = null;
  this.label_ = null;

  chartEditor.controls.LabeledControl.base(this, 'disposeInternal');
};