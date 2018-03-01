goog.provide('anychart.chartEditorModule.controls.LabeledControlTwins');

goog.require('anychart.chartEditorModule.checkbox.Base');
goog.require('anychart.chartEditorModule.controls.LabeledControl');


/**
 * Labeled control with two mutually exclusive keys.
 * @param {(anychart.chartEditorModule.comboBox.Base|anychart.chartEditorModule.controls.select.Base|anychart.chartEditorModule.input.Base|anychart.chartEditorModule.colorPicker.Base)} control
 * @param {string=} opt_label
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {anychart.chartEditorModule.controls.LabeledControl}
 */
anychart.chartEditorModule.controls.LabeledControlTwins = function(control, opt_label, opt_domHelper) {
  anychart.chartEditorModule.controls.LabeledControlTwins.base(this, 'constructor', control, opt_label, opt_domHelper);

  this.addClassName('anychart-settings-labeled-control-twins');
};
goog.inherits(anychart.chartEditorModule.controls.LabeledControlTwins, anychart.chartEditorModule.controls.LabeledControl);


/**
 * @type {string}
 * @private
 */
anychart.chartEditorModule.controls.LabeledControlTwins.prototype.checkboxCaption_ = 'Soft';


/** @param {string} value */
anychart.chartEditorModule.controls.LabeledControlTwins.prototype.setCheckboxCaption = function(value) {
  this.checkboxCaption_ = value;
};


/** @inheritDoc */
anychart.chartEditorModule.controls.LabeledControlTwins.prototype.createDom = function() {
  anychart.chartEditorModule.controls.LabeledControlTwins.base(this, 'createDom');

  var checkbox = new anychart.chartEditorModule.checkbox.Base();
  checkbox.setCaption(this.checkboxCaption_);
  this.addChildAt(checkbox, 0, true);
  this.checkbox_ = checkbox;
  goog.dom.classlist.add(this.checkbox_.getElement(), 'anychart-chart-editor-settings-control-right');

  goog.events.listen(this.checkbox_, goog.ui.Component.EventType.CHANGE, this.onChangeKey, false, this);
};


/** @inheritDoc */
anychart.chartEditorModule.controls.LabeledControlTwins.prototype.enterDocument = function() {
  anychart.chartEditorModule.controls.LabeledControlTwins.base(this, 'enterDocument');

  if (!this.key_)
    this.key_ = this.control_.getKey();
  
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var mode2 = goog.isDef(model.getValue(this.key2_));
  this.checkbox_.setChecked(mode2);
};


/** @inheritDoc */
anychart.chartEditorModule.controls.LabeledControlTwins.prototype.init = function(model, key, opt_callback, opt_noRebuild) {
  anychart.chartEditorModule.controls.LabeledControlTwins.base(this, 'init', model, key, opt_callback, opt_noRebuild);
  this.setModel(model);
};


/** @param {anychart.chartEditorModule.EditorModel.Key} value */
anychart.chartEditorModule.controls.LabeledControlTwins.prototype.setKey2 = function(value) {
  this.key2_ = value;
};


/**
 * @param {Object} evt
 */
anychart.chartEditorModule.controls.LabeledControlTwins.prototype.onChangeKey = function(evt) {
  var mode2 = evt.target.getChecked();

  var value = this.control_.getValue();
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

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


/** @override */
anychart.chartEditorModule.controls.LabeledControlTwins.prototype.disposeInternal = function() {
  goog.dispose(this.checkbox_);
  this.checkbox_ = null;

  anychart.chartEditorModule.controls.LabeledControlTwins.base(this, 'disposeInternal');
};
