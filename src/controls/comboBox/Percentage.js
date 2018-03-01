goog.provide('chartEditor.comboBox.Percent');

goog.require('chartEditor.comboBox.Base');
goog.require('goog.ui.ComboBox');


/**
 * A ComboBox control.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @param {goog.ui.Menu=} opt_menu Optional menu component.
 *     This menu is disposed of by this control.
 * @param {goog.ui.LabelInput=} opt_labelInput Optional label input.
 *     This label input is disposed of by this control.
 * @constructor
 * @extends {chartEditor.comboBox.Base}
 * @suppress {visibility}
 */
chartEditor.comboBox.Percent = function(opt_domHelper, opt_menu, opt_labelInput) {
  chartEditor.comboBox.Percent.base(this, 'constructor', opt_domHelper, opt_menu, opt_labelInput);

  this.allowNegative(false);
};
goog.inherits(chartEditor.comboBox.Percent, chartEditor.comboBox.Base);


/**
 * @type {boolean}
 * @private
 */
chartEditor.comboBox.Percent.prototype.allowNegative_ = false;


/** @param {boolean} value */
chartEditor.comboBox.Percent.prototype.allowNegative = function(value) {
  this.allowNegative_ = value;

  if (this.allowNegative_) {
    // -100 - 100
    this.setValidateFunction(function(value) {
      return /^-?\d{1,3}%?$/.test(value);
    });

    this.setFormatterFunction(function(value) {
      var match = String(value).match(/^(-?\d{1,3})%?$/);
      return match[1] + "%";
    });

    this.setOptions([-100, -70, -50, -30, -10, 0, 10, 30, 50, 70, 100]);

  } else {
    // 0 - 100
    this.setValidateFunction(function(value) {
      return /^\d{1,3}%?$/.test(value);
    });

    this.setFormatterFunction(function(value) {
      var match = String(value).match(/^(\d{1,3})%?$/);
      return String(goog.math.clamp(Number(match[1]), 0, 100)) + "%";
    });

    this.setOptions([0, 10, 30, 50, 70, 90, 100]);
  }
};


/** @inheritDoc */
chartEditor.comboBox.Percent.prototype.setOptions = function(value) {
  chartEditor.comboBox.Percent.base(this, 'setOptions', value);
  var self = this;
  self.captions.length = 0;
  goog.array.forEach(self.options, function(item){
    self.captions.push(item + '%');
  });
};