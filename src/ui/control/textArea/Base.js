goog.provide('chartEditor.ui.control.textarea.Base');

goog.require('goog.events.InputHandler');
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
chartEditor.ui.control.textarea.Base = function(opt_content, opt_renderer, opt_domHelper) {
  chartEditor.ui.control.textarea.Base.base(this, 'constructor',
    opt_content || '',
    opt_renderer,
    opt_domHelper);

  this.addClassName('anychart-ce-textarea');
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
goog.inherits(chartEditor.ui.control.textarea.Base, goog.ui.Textarea);


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.control.textarea.Base.prototype.allowEnabled = false;


/** @return {chartEditor.model.Base.Key} */
chartEditor.ui.control.textarea.Base.prototype.getKey = function() {
  return this.key;
};


/** @param {chartEditor.model.Base.Key} value */
chartEditor.ui.control.textarea.Base.prototype.setKey = function(value) {
  this.key = value;
};


/**
 * Removes control's value from model.
 */
chartEditor.ui.control.textarea.Base.prototype.reset = function() {
  this.editorModel.removeByKey(this.key);
};


/** @override */
chartEditor.ui.control.textarea.Base.prototype.enterDocument = function() {
  chartEditor.ui.control.textarea.Base.base(this, 'enterDocument');

  goog.style.setElementShown(this.getElement(), !this.excluded);
  this.inputHandler_ = new goog.events.InputHandler(this.getElement());
  goog.events.listen(this.inputHandler_, goog.events.InputHandler.EventType.INPUT,
    this.onChange, false, this);
};


/** @override */
chartEditor.ui.control.textarea.Base.prototype.exitDocument = function() {
  this.getHandler().unlisten(this, goog.ui.Component.EventType.ACTION, this.onChange, false);
  chartEditor.ui.control.textarea.Base.base(this, 'exitDocument');
};


/**
 * @param {goog.events.Event} evt
 * @protected
 */
chartEditor.ui.control.textarea.Base.prototype.onChange = function(evt) {
  evt.stopPropagation();
  if (this.excluded) return;
  if (!this.noDispatch && this.editorModel) {
    var value = this.getValue();
    this.editorModel.setValue(this.key, value, this.rebuildChart);
    this.setValue(value);
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
chartEditor.ui.control.textarea.Base.prototype.init = function(model, key, opt_callback, opt_rebuildChart) {
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
 * Updates model state.
 * @param {?Object} target Object, who's property corresponds to control's key. Used to get value of this control.
 * @return {boolean|undefined} If model was updated
 */
chartEditor.ui.control.textarea.Base.prototype.setValueByTarget = function(target) {
  if (this.excluded) return;

  if (!this.key || !this.key.length) {
    console.warn("Control with no key!");
    return;
  }
  this.target = target;

  var stringKey = chartEditor.model.Base.getStringKey(this.key);
  var value = /** @type {string} */(chartEditor.binding.exec(this.target, stringKey));

  this.noDispatch = true;
  this.setValue(value);
  this.noDispatch = false;
};


/**
 * Hide or show control by assigning 'hidden' class
 * @param {boolean} value True if excluded.
 */
chartEditor.ui.control.textarea.Base.prototype.exclude = function(value) {
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
chartEditor.ui.control.textarea.Base.prototype.isExcluded = function() {
  return this.excluded;
};


/**
 * @public
 */
chartEditor.ui.control.textarea.Base.prototype.updateExclusion = function() {
  if (!this.key || !this.key.length || !this.editorModel) return;

  var stringKey = this.editorModel.getStringKey(this.key);
  this.exclude(this.editorModel.checkSettingForExclusion(stringKey));
};


/** @override */
chartEditor.ui.control.textarea.Base.prototype.disposeInternal = function() {
  goog.dispose(this.resetButton_);
  this.resetButton_ = null;

  chartEditor.ui.control.textarea.Base.base(this, 'disposeInternal');
};
