goog.provide('chartEditor.ui.control.textArea.Base');

goog.require('chartEditor.events');
goog.require('chartEditor.ui.control.textArea.Base');
goog.require('goog.events.InputHandler');
goog.require('goog.events.KeyHandler');
goog.require('goog.ui.Control');
goog.require('goog.ui.Textarea');




/**
 * A text area control. Extends {@link goog.ui.Textarea} by adding
 * an API for getting and setting the custom theme applied by user.
 *
 * @param {string=} opt_content Text caption or existing DOM
 *     structure to display as the button's caption.
 * @param {goog.ui.TextareaRenderer=} opt_renderer Renderer used to render or
 *     decorate the textarea. Defaults to {@link goog.ui.TextareaRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {goog.ui.Textarea}
 */
chartEditor.ui.control.textArea.Base = function(opt_content, opt_renderer, opt_domHelper) {
  chartEditor.ui.control.textArea.Base.base(this, 'constructor',
    opt_content || '',
    opt_renderer,
    opt_domHelper);

  this.addClassName('anychart-ce-textArea');
  this.addClassName('anychart-ce-input');

  /**
   * Editor Model key.
   *
   * @type {chartEditor.model.Base.Key}
   * @protected
   */
  this.key = [];

  /**
   * @type {boolean}
   * @protected
   */
  this.noDispatch = false;

  /**
   * @type {boolean}
   * @protected
   */
  this.excluded = false;
};
goog.inherits(chartEditor.ui.control.textArea.Base, goog.ui.Textarea);


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.control.textArea.Base.prototype.allowEnabled = false;


/** @return {chartEditor.model.Base.Key} */
chartEditor.ui.control.textArea.Base.prototype.getKey = function() {
  return this.key;
};


/** @param {chartEditor.model.Base.Key} value */
chartEditor.ui.control.textArea.Base.prototype.setKey = function(value) {
  this.key = value;
};


/**
 * Removes control's value from model.
 * It removes by key appendTheme() and
 * and special field customTheme which stores
 * string value for the text area and output JS code.
 */
chartEditor.ui.control.textArea.Base.prototype.reset = function() {
  this.editorModel.removeByKey(this.key);
  this.editorModel.removeByKey([['anychart'], 'customTheme']);
  this.removeClassName('anychart-ce-error');
};


/** @override */
chartEditor.ui.control.textArea.Base.prototype.enterDocument = function() {
  chartEditor.ui.control.textArea.Base.base(this, 'enterDocument');

  goog.style.setElementShown(this.getElement(), !this.excluded);
  this.inputHandler_ = new goog.events.InputHandler(this.getElement());
  goog.events.listen(this.inputHandler_, goog.events.InputHandler.EventType.INPUT,
    this.onChange_, false, this);

  // handle Enter key press separately to add new line to the textarea string
  this.inputHandler_ = new goog.events.KeyHandler(this.getElement());
  goog.events.listen(this.inputHandler_, goog.events.KeyHandler.EventType.KEY,
    this.onEnterPress_, false, this);
};


/** @override */
chartEditor.ui.control.textArea.Base.prototype.exitDocument = function() {
  this.getHandler().unlisten(this, goog.ui.Component.EventType.ACTION, this.onChange_, false);
  chartEditor.ui.control.textArea.Base.base(this, 'exitDocument');
};


/**
 * @param {goog.events.Event} evt
 * @private
 */
chartEditor.ui.control.textArea.Base.prototype.onChange_ = function(evt) {
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
      var evalString = 'window.acCustomTheme = ' + string;
      eval(evalString);

      // check if the theme content is completely valid object
      if (!goog.isObject(window['acCustomTheme']))
        throw new SyntaxError("Not valid object");

      // append theme as object to the chart
      this.editorModel.setValue(this.key, window['acCustomTheme'], this.rebuildChart);

      // store in model the string representation of the custom theme
      // it requires for applying theme code back to the text area and for output JS code
      this.editorModel.setValue([['anychart'], 'customTheme'], string, false);

      // remove error highlight
      if (goog.isObject(window['acCustomTheme']))
        this.removeClassName('anychart-ce-error');

    } catch (e) {
      // apply error highlight
      this.addClassName('anychart-ce-error');
    }
  }
};


/**
 * Handle the Enter key press separately. Adds new line to the
 * textarea string.
 * @param {goog.events.Event} evt
 * @private
 */
chartEditor.ui.control.textArea.Base.prototype.onEnterPress_ = function(evt) {
  evt.stopPropagation();
  var string = this.getValue();
  if (evt.key == 'Enter') {
    string += '\n';
    this.setValue(string);
  }
};


/**
 * Connects control with EditorMode.
 *
 * @param {chartEditor.model.Base} model Editor model instance to connect with.
 * @param {chartEditor.model.Base.Key} key Key of control's field in model's structure.
 * @param {string=} opt_callback Callback function that will be called on control's value change instead of simple change value in model.
 *  This function should be model's public method.
 * @param {boolean=} opt_rebuildChart Should or not rebuild chart on change value of this control.
 */
chartEditor.ui.control.textArea.Base.prototype.init = function(model, key, opt_callback, opt_rebuildChart) {
  /**
   * @type {chartEditor.model.Base}
   * @protected
   */
  this.editorModel = model;

  this.key = key;

  this.callback = opt_callback;

  this.rebuildChart = Boolean(opt_rebuildChart);

  this.updateExclusion();
};


/**
 * Sets value of this control to target's value.
 * Here the target is a special model field which
 * stores the string representation of the custom theme.
 * Updates model state.
 */
chartEditor.ui.control.textArea.Base.prototype.setValueByTarget = function() {
  if (this.excluded) return;

  var string = this.editorModel.getValue([['anychart'], 'customTheme']);

  if (string)
    this.setValue(string);
  else
    this.setValue('');
};


/**
 * Hide or show control by assigning 'hidden' class
 * @param {boolean} value True if excluded.
 */
chartEditor.ui.control.textArea.Base.prototype.exclude = function(value) {
  var dirty = this.excluded !== value;
  this.excluded = value;

  if (this.isInDocument())
    goog.dom.classlist.enable(this.getElement(), 'anychart-ce-hidden', this.excluded);

  if (dirty && this.excluded && this.editorModel)
    this.editorModel.removeByKey(this.key, true);
};


/**
 * @return {boolean}
 */
chartEditor.ui.control.textArea.Base.prototype.isExcluded = function() {
  return this.excluded;
};


/**
 * @public
 */
chartEditor.ui.control.textArea.Base.prototype.updateExclusion = function() {
  if (!this.key || !this.key.length || !this.editorModel) return;

  var stringKey = this.editorModel.getStringKey(this.key);
  this.exclude(this.editorModel.checkSettingForExclusion(stringKey));
};


/** @override */
chartEditor.ui.control.textArea.Base.prototype.disposeInternal = function() {
  goog.dispose(this.resetButton_);
  this.resetButton_ = null;

  chartEditor.ui.control.textArea.Base.base(this, 'disposeInternal');
};
