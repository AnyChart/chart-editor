goog.provide('chartEditor.ui.control.textArea.Base');

goog.require('chartEditor.events');
goog.require('chartEditor.ui.control.textArea.Base');
// goog.require('chartEditor.ui.control.colorPicker.Renderer');
// goog.require('goog.dom.classlist');
// goog.require('goog.dom.selection');
// goog.require('goog.events.KeyHandler');
// goog.require('goog.ui.ColorMenuButton');
// goog.require('goog.ui.LabelInput');
goog.require('goog.ui.Control');
goog.require('goog.ui.Textarea');
goog.require('goog.events.InputHandler');




/**
 * A color menu button control.  Extends {@link goog.ui.MenuButton} by adding
 * an API for getting and setting the currently selected color from a menu of
 * color palettes.
 *
 * @param {goog.ui.ControlContent=} opt_content Text caption or existing DOM
 *     structure to display as the button's caption.
 * @param {goog.ui.TextareaRenderer=} opt_renderer Renderer used to render or
 *     decorate the textarea. Defaults to {@link goog.ui.TextareaRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {goog.ui.Control}
 */
chartEditor.ui.control.textArea.Base = function(opt_content, opt_renderer, opt_domHelper) {
  chartEditor.ui.control.textArea.Base.base(this, 'constructor',
    opt_content || '',
    opt_renderer,
    opt_domHelper);

  // this.addClassName('anychart-ce-color');

  // this.setFocusablePopupMenu(true);

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

  this.excluded = false;
};
goog.inherits(chartEditor.ui.control.textArea.Base, goog.ui.Textarea);


/**
 * @type {boolean}
 * @private
 */
// TODO: check the reset
// chartEditor.ui.control.textArea.Base.prototype.allowReset_ = true;
chartEditor.ui.control.textArea.Base.prototype.allowReset_ = false;

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
 * Removes control's value from model
 */
chartEditor.ui.control.textArea.Base.prototype.reset = function() {
  this.editorModel.removeByKey(this.key);
};


/** @override */
chartEditor.ui.control.textArea.Base.prototype.enterDocument = function() {
  chartEditor.ui.control.textArea.Base.base(this, 'enterDocument');

  // TODO: what event type should I handle?
  // goog.dom.classlist.enable(this.getElement(), 'anychart-ce-hidden', this.excluded);
  // if (!this.excluded)
  //   this.getHandler().listen(this, goog.ui.Component.EventType.ACTION, this.onChange_, false);


  goog.style.setElementShown(this.getElement(), !this.excluded);

  this.inputHandler_ = new goog.events.InputHandler(this.getElement());
  goog.events.listen(this.inputHandler_, goog.events.InputHandler.EventType.INPUT,
    this.onChange_, false, this);
};


/** @override */
chartEditor.ui.control.textArea.Base.prototype.exitDocument = function() {
  this.getHandler().unlisten(this, goog.ui.Component.EventType.ACTION, this.onChange_, false);
  chartEditor.ui.control.textArea.Base.base(this, 'exitDocument');
};

// TODO: тут надо переписать поведение
/**
 * @param {goog.events.Event} evt
 * @private
 */
chartEditor.ui.control.textArea.Base.prototype.onChange_ = function(evt) {
  evt.stopPropagation();
  if (this.excluded) return;
  if (!this.noDispatch && this.editorModel) {
    var string = this.getValue();
    var value = JSON.parse(string);
    if (value) {
      if (this.callback)
        this.editorModel.callbackByString(this.callback, this);
      else
        this.editorModel.setValue(this.key, value, this.rebuildChart);
    }
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
 * Updates model state.
 * @param {?Object} target Object, who's property corresponds to control's key. Used to get value of this control.
 */
chartEditor.ui.control.textArea.Base.prototype.setValueByTarget = function(target) {
  if (this.excluded) return;

  this.target = target;

  var stringKey = chartEditor.model.Base.getStringKey(this.key);
  var value = /** @type {string} */(chartEditor.binding.exec(this.target, stringKey));
  // TODO: recreate behavior
  if (goog.isObject(value))
    value = value['color'];

  this.noDispatch = true;
  // this.setSelectedColor(value);
  this.noDispatch = false;
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


// /** @protected */
// chartEditor.ui.control.textArea.Base.prototype.onReset = function() {
//   this.setValue(null);
//   this.editorModel.removeByKey(this.getKey());
// };


/** @override */
chartEditor.ui.control.textArea.Base.prototype.disposeInternal = function() {
  goog.dispose(this.resetButton_);
  this.resetButton_ = null;

  chartEditor.ui.control.textArea.Base.base(this, 'disposeInternal');
};


/**
 * Creates the DOM nodes needed for the textarea input.
 * @override
 */
chartEditor.ui.control.textArea.Base.prototype.createDom = function() {
  this.setElementInternal(this.getDomHelper().createDom(
    goog.dom.TagName.TEXTAREA, {
      'type': goog.dom.InputType.TEXTAREA,
      'className': goog.getCssName('anychart-ce-input')
    }));
};
