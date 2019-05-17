goog.provide('chartEditor.ui.control.wrapped.SeriesName');

goog.require('chartEditor.ui.control.button.Toggle');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');


/**
 * @param {(chartEditor.ui.control.comboBox.Base|chartEditor.ui.control.select.Base|chartEditor.ui.control.input.Base|chartEditor.ui.control.colorPicker.Base)} control
 * @param {string=} opt_label
 * @param {boolean=} opt_isSingeValues
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.control.wrapped.Labeled}
 */
chartEditor.ui.control.wrapped.SeriesName = function(control, opt_label, opt_isSingeValues, opt_domHelper) {
  chartEditor.ui.control.wrapped.SeriesName.base(this, 'constructor', control, opt_label, false, opt_domHelper);

  this.addClassName(goog.getCssName('anychart-ce-control-series-name'));

  /**
   * Lock button
   * @type {chartEditor.ui.control.button.Toggle|null}
   * @private
   */
  this.lockButton_ = null;

  if (opt_isSingeValues) {
    var button = new chartEditor.ui.control.button.Toggle();
    button.setIcon('ac ac-unlock');
    button.setNormalValue(false);
    button.setCheckedValue(true);

    this.lockButton_ = button;
  }
};
goog.inherits(chartEditor.ui.control.wrapped.SeriesName, chartEditor.ui.control.wrapped.Labeled);


/** @inheritDoc */
chartEditor.ui.control.wrapped.SeriesName.prototype.createDom = function() {
  chartEditor.ui.control.wrapped.SeriesName.base(this, 'createDom');

  if (this.lockButton_)
    this.addChildAt(this.lockButton_, 0, true);
};


/** @inheritDoc */
chartEditor.ui.control.wrapped.SeriesName.prototype.enterDocument = function() {
  chartEditor.ui.control.wrapped.SeriesName.base(this, 'enterDocument');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var checkedValue = model.getValue(this.lockKey_);
  if (checkedValue) {
    this.control_.setEnabled(false);
    if (this.lockButton_) {
      this.lockButton_.setIcon('ac ac-lock');
      this.lockButton_.setCheckedValue(checkedValue);
      this.lockButton_.setChecked(true);
    }

  } else {
    this.control_.setEnabled(true);
    if (this.lockButton_) this.lockButton_.setChecked(false);
  }
};


/** @override */
chartEditor.ui.control.wrapped.SeriesName.prototype.init = function(model, key, opt_callback, opt_rebuildChart) {
  chartEditor.ui.control.wrapped.SeriesName.base(this, 'init', model, key, opt_callback, opt_rebuildChart);

  this.lockKey_ = [['editorSettings'], ['lockSeriesName'], this.control_.getKey()[2]];

  if (this.lockButton_) {
    if (model.getValue(this.lockKey_) === void 0)
      model.setValue(this.lockKey_, true);

    this.lockButton_.init(model, this.lockKey_);
  } else
    model.removeByKey(this.lockKey_, true);
};


/** @override */
chartEditor.ui.control.wrapped.SeriesName.prototype.disposeInternal = function() {
  goog.dispose(this.lockButton_);
  this.lockButton_ = null;

  chartEditor.ui.control.wrapped.SeriesName.base(this, 'disposeInternal');
};
