goog.provide('anychart.chartEditorModule.controls.SeriesName');

goog.require('anychart.chartEditorModule.button.Toggle');
goog.require('anychart.chartEditorModule.checkbox.Base');
goog.require('anychart.chartEditorModule.controls.LabeledControl');


/**
 * @param {(anychart.chartEditorModule.comboBox.Base|anychart.chartEditorModule.controls.select.Base|anychart.chartEditorModule.input.Base|anychart.chartEditorModule.colorPicker.Base)} control
 * @param {string=} opt_label
 * @param {boolean=} opt_isSingeValues
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {anychart.chartEditorModule.controls.LabeledControl}
 */
anychart.chartEditorModule.controls.SeriesName = function(control, opt_label, opt_isSingeValues, opt_domHelper) {
  anychart.chartEditorModule.controls.SeriesName.base(this, 'constructor', control, opt_label, opt_domHelper);

  this.addClassName(goog.getCssName('anychart-chart-editor-control-series-name'));

  /**
   * Lock button
   * @type {anychart.chartEditorModule.button.Toggle|null}
   * @private
   */
  this.lockButton_ = null;

  if (opt_isSingeValues) {
    var button = new anychart.chartEditorModule.button.Toggle();
    button.setIcon('ac ac-unlock');
    button.setNormalValue(false);
    button.setCheckedValue(true);

    this.lockButton_ = button;
  }
};
goog.inherits(anychart.chartEditorModule.controls.SeriesName, anychart.chartEditorModule.controls.LabeledControl);


/** @inheritDoc */
anychart.chartEditorModule.controls.SeriesName.prototype.createDom = function() {
  anychart.chartEditorModule.controls.SeriesName.base(this, 'createDom');

  if (this.lockButton_)
    this.addChildAt(this.lockButton_, 0, true);
};


/** @inheritDoc */
anychart.chartEditorModule.controls.SeriesName.prototype.enterDocument = function() {
  anychart.chartEditorModule.controls.SeriesName.base(this, 'enterDocument');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
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
anychart.chartEditorModule.controls.SeriesName.prototype.init = function(model, key, opt_callback, opt_noRebuild, opt_noRebuildMapping) {
  anychart.chartEditorModule.controls.SeriesName.base(this, 'init', model, key, opt_callback, opt_noRebuild, opt_noRebuildMapping);

  this.lockKey_ = [['editorSettings'], ['lockSeriesName'], this.control_.getKey()[2]];

  if (this.lockButton_) {
    if (model.getValue(this.lockKey_) === void 0)
      model.setValue(this.lockKey_, true, true);

    this.lockButton_.init(model, this.lockKey_);
  } else
    model.removeByKey(this.lockKey_, true);
};


/** @override */
anychart.chartEditorModule.controls.SeriesName.prototype.disposeInternal = function() {
  goog.dispose(this.lockButton_);
  this.lockButton_ = null;

  anychart.chartEditorModule.controls.SeriesName.base(this, 'disposeInternal');
};
