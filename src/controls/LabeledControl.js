goog.provide('anychart.chartEditorModule.controls.LabeledControl');

goog.require('anychart.chartEditorModule.Component');


/**
 * @param {(anychart.chartEditorModule.comboBox.Base|anychart.chartEditorModule.controls.select.Base|anychart.chartEditorModule.input.Base|anychart.chartEditorModule.colorPicker.Base)} control
 * @param {string=} opt_label
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {anychart.chartEditorModule.Component}
 */
anychart.chartEditorModule.controls.LabeledControl = function(control, opt_label, opt_domHelper) {
  anychart.chartEditorModule.controls.LabeledControl.base(this, 'constructor', opt_domHelper);

  this.control_ = control;
  this.labelString_ = opt_label ? opt_label : '';

  this.addClassName('anychart-chart-editor-labeled-control');
};
goog.inherits(anychart.chartEditorModule.controls.LabeledControl, anychart.chartEditorModule.Component);


/** @inheritDoc */
anychart.chartEditorModule.controls.LabeledControl.prototype.createDom = function() {
  anychart.chartEditorModule.controls.LabeledControl.base(this, 'createDom');

  var element = this.getElement();

  this.label_ = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-chart-editor-labeled-control-label', this.labelString_);
  goog.dom.appendChild(element, this.label_);

  this.addChild(this.control_, true);
  goog.dom.classlist.add(this.control_.getElement(), 'anychart-chart-editor-settings-control');
  goog.dom.classlist.add(this.control_.getElement(), 'anychart-chart-editor-settings-control-right');

  // var clearBoth = new anychart.chartEditorModule.Component();
  // clearBoth.addClassName('anychart-clearboth');
  // this.addChild(clearBoth, true);
  goog.dom.appendChild(this.getElement(), goog.dom.createDom(goog.dom.TagName.DIV, goog.getCssName('anychart-clearboth')));
};


/**
 * @return {(anychart.chartEditorModule.comboBox.Base|anychart.chartEditorModule.controls.select.Base|anychart.chartEditorModule.input.Base|anychart.chartEditorModule.colorPicker.Base)}
 */
anychart.chartEditorModule.controls.LabeledControl.prototype.getControl = function() {
  return this.control_;
};


/**
 * @param {(anychart.chartEditorModule.comboBox.Base|anychart.chartEditorModule.controls.select.Base|anychart.chartEditorModule.input.Base|anychart.chartEditorModule.colorPicker.Base)} control
 */
anychart.chartEditorModule.controls.LabeledControl.prototype.setControl = function(control) {
  this.control_ = control;
};


/**
 * Connects control with EditorMode.
 *
 * @param {anychart.chartEditorModule.EditorModel} model Editor model instance to connect with.
 * @param {anychart.chartEditorModule.EditorModel.Key} key Key of control's field in model's structure.
 * @param {string=} opt_callback Callback function that will be called on control's value change instead of simple change value in model.
 *  This function should be model's public method.
 * @param {boolean=} opt_noRebuild Should or not rebuild target (chart) on change value of this control.
 * @param {boolean=} opt_noRebuildMapping
 * @public
 */
anychart.chartEditorModule.controls.LabeledControl.prototype.init = function(model, key, opt_callback, opt_noRebuild, opt_noRebuildMapping) {
  this.setModel(model);
  this.control_.init(model, key, opt_callback, opt_noRebuild, opt_noRebuildMapping);
};


/**
 * Wrapper for control's method.
 * @param {?Object} target
 */
anychart.chartEditorModule.controls.LabeledControl.prototype.setValueByTarget = function(target) {
  this.control_.setValueByTarget(target);
};


/**
 * @param {string|null} value
 * @param {boolean=} opt_noDispatch
 */
anychart.chartEditorModule.controls.LabeledControl.prototype.setValue = function(value, opt_noDispatch) {
  this.control_.suspendDispatch(!!opt_noDispatch);
  this.control_.setValue(value);
  this.control_.suspendDispatch(false);
};


/**
 * @return {*}
 */
anychart.chartEditorModule.controls.LabeledControl.prototype.getValue = function() {
  return this.control_ ? this.control_.getValue() : null;
};


/**
 * @return {?anychart.chartEditorModule.EditorModel.Key}
 */
anychart.chartEditorModule.controls.LabeledControl.prototype.getKey = function() {
  return this.control_ ? this.control_.getKey() : null;
};


/**
 * @param {boolean} enabled
 */
anychart.chartEditorModule.controls.LabeledControl.prototype.setEnabled = function(enabled) {
  if (this.label_)
    goog.dom.classlist.enable(this.label_, goog.getCssName('anychart-control-disabled'), !enabled);

  if (this.control_)
    this.control_.setEnabled(enabled);
};


/**
 * Hide or show control by assigning 'hidden' class
 * @param {boolean} value True if excluded.
 */
anychart.chartEditorModule.controls.LabeledControl.prototype.exclude = function(value) {
  this.hide(value);
  this.control_.exclude(value);
};


/**
 * @return {boolean}
 */
anychart.chartEditorModule.controls.LabeledControl.prototype.isExcluded = function() {
  return this.control_.isExcluded();
};


/** @override */
anychart.chartEditorModule.controls.LabeledControl.prototype.disposeInternal = function() {
  goog.dispose(this.control_);
  this.control_ = null;
  this.label_ = null;

  anychart.chartEditorModule.controls.LabeledControl.base(this, 'disposeInternal');
};