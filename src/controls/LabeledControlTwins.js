goog.provide('chartEditor.controls.LabeledControlTwins');

goog.require('chartEditor.checkbox.Base');
goog.require('chartEditor.controls.LabeledControl');


/**
 * Labeled control with two mutually exclusive keys.
 * @param {(chartEditor.comboBox.Base|chartEditor.controls.select.Base|chartEditor.controls.input.Base|chartEditor.colorPicker.Base)} control
 * @param {string=} opt_label
 * @param {boolean=} opt_allowReset
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.controls.LabeledControl}
 */
chartEditor.controls.LabeledControlTwins = function(control, opt_label, opt_allowReset, opt_domHelper) {
  chartEditor.controls.LabeledControlTwins.base(this, 'constructor', control, opt_label, opt_allowReset, opt_domHelper);

  this.addClassName('anychart-ce-settings-labeled-control-twins');
};
goog.inherits(chartEditor.controls.LabeledControlTwins, chartEditor.controls.LabeledControl);


/**
 * @type {string}
 * @private
 */
chartEditor.controls.LabeledControlTwins.prototype.checkboxCaption_ = 'Soft';


/** @param {string} value */
chartEditor.controls.LabeledControlTwins.prototype.setCheckboxCaption = function(value) {
  this.checkboxCaption_ = value;
};


/** @inheritDoc */
chartEditor.controls.LabeledControlTwins.prototype.createDom = function() {
  chartEditor.controls.LabeledControlTwins.base(this, 'createDom');

  var checkbox = new chartEditor.checkbox.Base();
  checkbox.setCaption(this.checkboxCaption_);
  this.addChildAt(checkbox, 0, true);
  this.checkbox_ = checkbox;
  goog.dom.classlist.add(this.checkbox_.getElement(), 'anychart-ce-settings-control-right');

  goog.events.listen(this.checkbox_, goog.ui.Component.EventType.CHANGE, this.onChangeKey, false, this);
};


/** @inheritDoc */
chartEditor.controls.LabeledControlTwins.prototype.enterDocument = function() {
  chartEditor.controls.LabeledControlTwins.base(this, 'enterDocument');

  if (!this.key_)
    this.key_ = this.control_.getKey();
  
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var mode2 = goog.isDef(model.getValue(this.key2_));
  this.checkbox_.setChecked(mode2);
};


/** @inheritDoc */
chartEditor.controls.LabeledControlTwins.prototype.init = function(model, key, opt_callback, opt_noRebuild) {
  chartEditor.controls.LabeledControlTwins.base(this, 'init', model, key, opt_callback, opt_noRebuild);
  this.setModel(model);
};


/** @param {chartEditor.EditorModel.Key} value */
chartEditor.controls.LabeledControlTwins.prototype.setKey2 = function(value) {
  this.key2_ = value;
};


/**
 * @param {Object} evt
 */
chartEditor.controls.LabeledControlTwins.prototype.onChangeKey = function(evt) {
  var mode2 = evt.target.getChecked();

  var value = this.control_.getValue();
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  if (mode2) {
    this.control_.setKey(this.key2_);
    model.removeByKey(this.key_);

  } else {
    this.control_.setKey(this.key_);
    model.removeByKey(this.key2_);
  }

  if (goog.isDef(value))
    model.setValue(this.control_.getKey(), value);
};



/** @inheritDoc */
chartEditor.controls.LabeledControlTwins.prototype.reset = function() {
  this.checkbox_.setChecked(false);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  model.removeByKey(this.key_, true);
  model.removeByKey(this.key2_);
};


/** @override */
chartEditor.controls.LabeledControlTwins.prototype.disposeInternal = function() {
  goog.dispose(this.checkbox_);
  this.checkbox_ = null;

  chartEditor.controls.LabeledControlTwins.base(this, 'disposeInternal');
};
