goog.provide('chartEditor.ui.control.wrapped.LabeledTwins');

goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');


/**
 * Labeled control with two mutually exclusive keys.
 * @param {(chartEditor.ui.control.comboBox.Base|chartEditor.ui.control.select.Base|chartEditor.ui.control.input.Base|chartEditor.ui.control.colorPicker.Base)} control
 * @param {string=} opt_label
 * @param {boolean=} opt_allowReset
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.control.wrapped.Labeled}
 */
chartEditor.ui.control.wrapped.LabeledTwins = function(control, opt_label, opt_allowReset, opt_domHelper) {
  chartEditor.ui.control.wrapped.LabeledTwins.base(this, 'constructor', control, opt_label, opt_allowReset, opt_domHelper);

  this.addClassName('anychart-ce-panel-labeled-control-twins');
};
goog.inherits(chartEditor.ui.control.wrapped.LabeledTwins, chartEditor.ui.control.wrapped.Labeled);


/**
 * @type {string}
 * @private
 */
chartEditor.ui.control.wrapped.LabeledTwins.prototype.checkboxCaption_ = 'Soft';


/** @param {string} value */
chartEditor.ui.control.wrapped.LabeledTwins.prototype.setCheckboxCaption = function(value) {
  this.checkboxCaption_ = value;
};


/** @inheritDoc */
chartEditor.ui.control.wrapped.LabeledTwins.prototype.createDom = function() {
  chartEditor.ui.control.wrapped.LabeledTwins.base(this, 'createDom');

  var checkbox = new chartEditor.ui.control.checkbox.Base();
  checkbox.setCaption(this.checkboxCaption_);
  this.addChildAt(checkbox, 0, true);
  this.checkbox_ = checkbox;
  goog.dom.classlist.add(this.checkbox_.getElement(), 'anychart-ce-panel-control-right');

  goog.events.listen(this.checkbox_, goog.ui.Component.EventType.CHANGE, this.onChangeKey, false, this);
};


/** @inheritDoc */
chartEditor.ui.control.wrapped.LabeledTwins.prototype.enterDocument = function() {
  chartEditor.ui.control.wrapped.LabeledTwins.base(this, 'enterDocument');

  if (!this.key_)
    this.key_ = this.control_.getKey();
  
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var mode2 = goog.isDef(model.getValue(this.key2_));
  this.checkbox_.setChecked(mode2);
};


/** @inheritDoc */
chartEditor.ui.control.wrapped.LabeledTwins.prototype.init = function(model, key, opt_callback, opt_noRebuild) {
  chartEditor.ui.control.wrapped.LabeledTwins.base(this, 'init', model, key, opt_callback, opt_noRebuild);
  this.setModel(model);
};


/** @param {chartEditor.model.Base.Key} value */
chartEditor.ui.control.wrapped.LabeledTwins.prototype.setKey2 = function(value) {
  this.key2_ = value;
};


/**
 * @param {Object} evt
 */
chartEditor.ui.control.wrapped.LabeledTwins.prototype.onChangeKey = function(evt) {
  var mode2 = evt.target.getChecked();

  var value = this.control_.getValue();
  var model = /** @type {chartEditor.model.Base} */(this.getModel());

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
chartEditor.ui.control.wrapped.LabeledTwins.prototype.reset = function() {
  this.checkbox_.setChecked(false);

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  model.removeByKey(this.key_, true);
  model.removeByKey(this.key2_);
};


/** @override */
chartEditor.ui.control.wrapped.LabeledTwins.prototype.disposeInternal = function() {
  goog.dispose(this.checkbox_);
  this.checkbox_ = null;

  chartEditor.ui.control.wrapped.LabeledTwins.base(this, 'disposeInternal');
};
