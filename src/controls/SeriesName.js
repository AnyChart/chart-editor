goog.provide('chartEditor.controls.SeriesName');

goog.require('chartEditor.button.Toggle');
goog.require('chartEditor.checkbox.Base');
goog.require('chartEditor.controls.LabeledControl');


/**
 * @param {(chartEditor.comboBox.Base|chartEditor.controls.select.Base|chartEditor.controls.input.Base|chartEditor.colorPicker.Base)} control
 * @param {string=} opt_label
 * @param {boolean=} opt_isSingeValues
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.controls.LabeledControl}
 */
chartEditor.controls.SeriesName = function(control, opt_label, opt_isSingeValues, opt_domHelper) {
  chartEditor.controls.SeriesName.base(this, 'constructor', control, opt_label, false, opt_domHelper);

  this.addClassName(goog.getCssName('anychart-ce-control-series-name'));

  /**
   * Lock button
   * @type {chartEditor.button.Toggle|null}
   * @private
   */
  this.lockButton_ = null;

  if (opt_isSingeValues) {
    var button = new chartEditor.button.Toggle();
    button.setIcon('ac ac-unlock');
    button.setNormalValue(false);
    button.setCheckedValue(true);

    this.lockButton_ = button;
  }
};
goog.inherits(chartEditor.controls.SeriesName, chartEditor.controls.LabeledControl);


/** @inheritDoc */
chartEditor.controls.SeriesName.prototype.createDom = function() {
  chartEditor.controls.SeriesName.base(this, 'createDom');

  if (this.lockButton_)
    this.addChildAt(this.lockButton_, 0, true);
};


/** @inheritDoc */
chartEditor.controls.SeriesName.prototype.enterDocument = function() {
  chartEditor.controls.SeriesName.base(this, 'enterDocument');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
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
chartEditor.controls.SeriesName.prototype.init = function(model, key, opt_callback, opt_noRebuild, opt_noRebuildMapping) {
  chartEditor.controls.SeriesName.base(this, 'init', model, key, opt_callback, opt_noRebuild, opt_noRebuildMapping);

  this.lockKey_ = [['editorSettings'], ['lockSeriesName'], this.control_.getKey()[2]];

  if (this.lockButton_) {
    if (model.getValue(this.lockKey_) === void 0)
      model.setValue(this.lockKey_, true, true);

    this.lockButton_.init(model, this.lockKey_);
  } else
    model.removeByKey(this.lockKey_, true);
};


/** @override */
chartEditor.controls.SeriesName.prototype.disposeInternal = function() {
  goog.dispose(this.lockButton_);
  this.lockButton_ = null;

  chartEditor.controls.SeriesName.base(this, 'disposeInternal');
};
