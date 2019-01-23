goog.provide('chartEditor.ui.control.comboBox.PercentToRatio');
goog.provide('chartEditor.ui.control.comboBox.PercentToRatioInput');

goog.require('chartEditor.ui.control.comboBox.Percent');



/**
 * A ComboBox control.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @param {goog.ui.Menu=} opt_menu Optional menu ui.
 *     This menu is disposed of by this control.
 * @param {goog.ui.LabelInput=} opt_labelInput Optional label input.
 *     This label input is disposed of by this control.
 * @constructor
 * @extends {chartEditor.ui.control.comboBox.Percent}
 * @suppress {visibility}
 */
chartEditor.ui.control.comboBox.PercentToRatio = function(opt_domHelper, opt_menu, opt_labelInput) {
  opt_labelInput = opt_labelInput || new chartEditor.ui.control.comboBox.PercentToRatioInput;

  chartEditor.ui.control.comboBox.PercentToRatio.base(this, 'constructor', opt_domHelper, opt_menu, opt_labelInput);

  this.setValidateFunction(function(value) {
    return !isNaN(Number(value));
  });

  this.setFormatterFunction(function(value) {
    return String(goog.math.clamp(Number(value), 0, 1));
  });
};
goog.inherits(chartEditor.ui.control.comboBox.PercentToRatio, chartEditor.ui.control.comboBox.Percent);


/** @inheritDoc */
chartEditor.ui.control.comboBox.PercentToRatio.prototype.setValue = function(value) {
  if (this.lastToken_ !== value && this.validateFunction_(value)) {
    value = this.formatterFunction_(value);
    this.lastToken_ = value;
    this.labelInput_.setValueConvert(value);
    this.handleInputChange_();
    this.dispatchEvent(goog.ui.Component.EventType.CHANGE);
  }
};


/** @inheritDoc */
chartEditor.ui.control.comboBox.PercentToRatio.prototype.onInputBlur_ = function(e) {
  chartEditor.ui.control.comboBox.PercentToRatio.base(this, 'onInputBlur_', e);

  this.labelInput_.setValueConvert(/** @type {string} */(this.lastToken_));
};


/**
 * This creates the label input object.
 * @param {string=} opt_label The text to show as the label.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.LabelInput}
 */
chartEditor.ui.control.comboBox.PercentToRatioInput = function(opt_label, opt_domHelper) {
  chartEditor.ui.control.input.Base.base(this, 'constructor', opt_label, opt_domHelper);
};
goog.inherits(chartEditor.ui.control.comboBox.PercentToRatioInput, goog.ui.LabelInput);


chartEditor.ui.control.comboBox.PercentToRatioInput.prototype.setValueConvert = function(s) {
  s = (Number(s) * 100) + '%';
  this.setValue(s);
};