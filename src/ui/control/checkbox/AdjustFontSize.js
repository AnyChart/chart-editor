goog.provide('chartEditor.ui.control.checkbox.AdjustFontSize');

goog.require('chartEditor.ui.control.checkbox.Base');



/**
 * @param {goog.ui.Checkbox.State=} opt_checked Checked state to set.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @param {goog.ui.CheckboxRenderer=} opt_renderer Renderer used to render or
 *     decorate the checkbox; defaults to {@link goog.ui.CheckboxRenderer}.
 * @constructor
 * @extends {chartEditor.ui.control.checkbox.Base}
 */
chartEditor.ui.control.checkbox.AdjustFontSize = function(opt_checked, opt_domHelper, opt_renderer) {
  chartEditor.ui.control.checkbox.AdjustFontSize.base(this, 'constructor', opt_checked, opt_domHelper,
      opt_renderer || chartEditor.ui.control.checkbox.Renderer.getInstance());

};
goog.inherits(chartEditor.ui.control.checkbox.AdjustFontSize, chartEditor.ui.control.checkbox.Base);



/** @inheritDoc */
chartEditor.ui.control.checkbox.AdjustFontSize.prototype.setValueByTarget = function(target) {
  if (!this.key || this.excluded) return;

  this.target = target;

  var stringKey = chartEditor.model.Base.getStringKey(this.key);
  var value = chartEditor.binding.exec(this.target, stringKey);
  if (goog.isObject(value))
    value = value.width && value.height;
  else
    value = goog.typeOf(value) === 'boolean' ? /** @type {boolean} */(value) : false;

  this.noDispatch = true;
  this.setChecked(value);
  this.noDispatch = false;
};

