goog.provide('chartEditor.ui.control.textarea.CustomTheme');

goog.require('chartEditor.ui.control.textarea.Base');




/**
 * A specific custom theme control. Extends {@link chartEditor.ui.control.textarea.Base} by adding
 * an API for getting and setting the custom theme applied by user.
 *
 * @param {string=} opt_content Text caption or existing DOM
 *     structure to display as the button's caption.
 * @param {goog.ui.TextareaRenderer=} opt_renderer Renderer used to render or
 *     decorate the textarea. Defaults to {@link goog.ui.TextareaRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {chartEditor.ui.control.textarea.Base}
 */
chartEditor.ui.control.textarea.CustomTheme = function(opt_content, opt_renderer, opt_domHelper) {
  chartEditor.ui.control.textarea.CustomTheme.base(this, 'constructor',
    opt_content || '',
    opt_renderer,
    opt_domHelper);
};
goog.inherits(chartEditor.ui.control.textarea.CustomTheme, chartEditor.ui.control.textarea.Base);


/** @override */
chartEditor.ui.control.textarea.CustomTheme.prototype.reset = function() {
  this.editorModel.removeByKey(this.key);
  this.removeClassName('anychart-ce-error');
};


/** @override */
chartEditor.ui.control.textarea.CustomTheme.prototype.onChange = function(evt) {
  evt.stopPropagation();
  if (this.excluded) return;
  if (!this.noDispatch && this.editorModel) {
    // string representation of the theme
    var string = this.getValue();

    try {
      // tricky check to avoid access to objects with minified names in the current scope
      // it happens when the user types in 'h' or 'vz'
      // theme always starts with { brace
      if (string.charAt(0) !== '{')
        throw new SyntaxError("Not valid object");

      // modified theme string for calling eval to store the theme in globals
      var themeObj;
      var evalString = 'themeObj = ' + string;
      eval(evalString);

      // check if the theme content is completely valid object
      if (!goog.isObject(themeObj))
        throw new SyntaxError("Not valid object");

      // append theme as string to the model
      this.editorModel.setValue(this.key, string, this.rebuildChart);

      // remove error highlight
      this.removeClassName('anychart-ce-error');
    } catch (e) {
      // apply error highlight
      this.addClassName('anychart-ce-error');
    }
  }
};


/**
 * Sets value of this control to target's value.
 * Here the target is a special model field which
 * stores the string representation of the custom theme.
 * Updates model state.
 */
chartEditor.ui.control.textarea.CustomTheme.prototype.setValueByTarget = function() {
  if (this.excluded) return;

  var string = this.editorModel.getValue(this.key);

  if (string)
    this.setValue(string);
  else
    this.setValue('');
};



