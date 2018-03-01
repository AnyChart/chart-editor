goog.provide('chartEditor.checkbox.AdjustFontSize');

goog.require('chartEditor.checkbox.Base');



/**
 * @param {goog.ui.Checkbox.State=} opt_checked Checked state to set.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @param {goog.ui.CheckboxRenderer=} opt_renderer Renderer used to render or
 *     decorate the checkbox; defaults to {@link goog.ui.CheckboxRenderer}.
 * @constructor
 * @extends {chartEditor.checkbox.Base}
 */
chartEditor.checkbox.AdjustFontSize = function(opt_checked, opt_domHelper, opt_renderer) {
  chartEditor.checkbox.AdjustFontSize.base(this, 'constructor', opt_checked, opt_domHelper,
      opt_renderer || chartEditor.checkbox.Renderer.getInstance());

};
goog.inherits(chartEditor.checkbox.AdjustFontSize, chartEditor.checkbox.Base);



/** @inheritDoc */
chartEditor.checkbox.AdjustFontSize.prototype.setValueByTarget = function(target) {
  if (!this.key || this.excluded) return;

  this.target = target;

  var stringKey = chartEditor.EditorModel.getStringKey(this.key);
  var value = chartEditor.binding.exec(this.target, stringKey);
  if (goog.isObject(value))
    value = value.width && value.height;
  else
    value = goog.typeOf(value) === 'boolean' ? /** @type {boolean} */(value) : false;

  this.noDispatch = true;
  this.setChecked(value);
  this.noDispatch = false;
};

