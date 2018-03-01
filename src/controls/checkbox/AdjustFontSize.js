goog.provide('anychart.chartEditorModule.checkbox.AdjustFontSize');

goog.require('anychart.chartEditorModule.checkbox.Base');



/**
 * @param {goog.ui.Checkbox.State=} opt_checked Checked state to set.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @param {goog.ui.CheckboxRenderer=} opt_renderer Renderer used to render or
 *     decorate the checkbox; defaults to {@link goog.ui.CheckboxRenderer}.
 * @constructor
 * @extends {anychart.chartEditorModule.checkbox.Base}
 */
anychart.chartEditorModule.checkbox.AdjustFontSize = function(opt_checked, opt_domHelper, opt_renderer) {
  anychart.chartEditorModule.checkbox.AdjustFontSize.base(this, 'constructor', opt_checked, opt_domHelper,
      opt_renderer || anychart.chartEditorModule.checkbox.Renderer.getInstance());

};
goog.inherits(anychart.chartEditorModule.checkbox.AdjustFontSize, anychart.chartEditorModule.checkbox.Base);



/** @inheritDoc */
anychart.chartEditorModule.checkbox.AdjustFontSize.prototype.setValueByTarget = function(target) {
  if (!this.key || this.excluded) return;

  this.target = target;

  var stringKey = anychart.chartEditorModule.EditorModel.getStringKey(this.key);
  var value = anychart.bindingModule.exec(this.target, stringKey);
  if (goog.isObject(value))
    value = value.width && value.height;
  else
    value = goog.typeOf(value) === 'boolean' ? /** @type {boolean} */(value) : false;

  this.noDispatch = true;
  this.setChecked(value);
  this.noDispatch = false;
};

