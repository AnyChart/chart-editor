goog.provide('anychart.chartEditorModule.input.Base');

goog.require('anychart.chartEditorModule.events');

goog.require('goog.Timer');
goog.require('goog.events.InputHandler');
goog.require('goog.events.KeyHandler');
goog.require('goog.ui.LabelInput');



/**
 * This creates the label input object.
 * @param {string=} opt_label The text to show as the label.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.LabelInput}
 */
anychart.chartEditorModule.input.Base = function(opt_label, opt_domHelper) {
  anychart.chartEditorModule.input.Base.base(this, 'constructor', opt_label, opt_domHelper);

  /**
   * @type {string}
   * @protected
   */
  this.lastValue = '';

  /**
   * @type {boolean}
   * @protected
   */
  this.noDispatch = false;

  /**
   * @type {boolean}
   * @protected
   */
  this.noRebuild = false;

  /**
   * Target object (usually it's chart)
   * @type {?Object}
   * @protected
   */
  this.target = null;

  this.revisionCount1 = 0;

  this.revisionCount2 = 0;

  /**
   * Editor Model key.
   *
   * @type {anychart.chartEditorModule.EditorModel.Key}
   * @protected
   */
  this.key = [];
};
goog.inherits(anychart.chartEditorModule.input.Base, goog.ui.LabelInput);


/**
 * The CSS class name to add to the input when the user has not entered a
 * value.
 */
anychart.chartEditorModule.input.Base.prototype.labelCssClassName =
    goog.getCssName('anychart-chart-editor-input-label');


/**
 * @type {goog.events.KeyHandler}
 * @private
 */
anychart.chartEditorModule.input.Base.prototype.keyHandler_ = null;


/**
 * @param {anychart.chartEditorModule.EditorModel.Key} key
 */
anychart.chartEditorModule.input.Base.prototype.setKey = function(key) {
  this.key = key;
};


/**
 * @return {anychart.chartEditorModule.EditorModel.Key}
 */
anychart.chartEditorModule.input.Base.prototype.getKey = function() {
  return this.key;
};


/**
 * Creates the DOM nodes needed for the label input.
 * @override
 */
anychart.chartEditorModule.input.Base.prototype.createDom = function() {
  this.setElementInternal(this.getDomHelper().createDom(
      goog.dom.TagName.INPUT, {
        'type': goog.dom.InputType.TEXT,
        'className': goog.getCssName('anychart-chart-editor-input')
      }));
};


/** @inheritDoc */
anychart.chartEditorModule.input.Base.prototype.enterDocument = function() {
  anychart.chartEditorModule.input.Base.base(this, 'enterDocument');
  goog.style.setElementShown(this.getElement(), !this.excluded);

  this.inputHandler_ = new goog.events.InputHandler(this.getElement());
  goog.events.listen(this.inputHandler_, goog.events.InputHandler.EventType.INPUT,
      this.onChange, false, this);
};


/** @protected */
anychart.chartEditorModule.input.Base.prototype.onChange = function() {
  if (this.excluded) return;

  var value = this.getValue();

  if (!this.noDispatch && value !== this.lastValue && this.editorModel) {
    if (this.validateFunction_(value)) {
      var caretPosition = goog.dom.selection.getStart(this.getElement());

      if (this.callback)
        this.editorModel.callbackByString(this.callback, this);
      else
        this.editorModel.setValue(this.key, value, false, this.noRebuild, this.noRebuildMapping);

      goog.dom.selection.setCursorPosition(this.getElement(), caretPosition);
    } else {
      // Input is not valid
      this.setValue(this.lastValue);
      value = this.lastValue;
    }
  }

  this.lastValue = value;
  this.revisionCount1++;
};


/**
 * Connects control with EditorMode.
 *
 * @param {anychart.chartEditorModule.EditorModel} model Editor model instance to connect with.
 * @param {anychart.chartEditorModule.EditorModel.Key} key Key of control's field in model's structure.
 * @param {string=} opt_callback Callback function that will be called on control's value change instead of simple change value in model.
 *  This function should be model's public method.
 * @param {boolean=} opt_noRebuildChart Should or not rebuild chart on change value of this control.
 * @param {boolean=} opt_noRebuildMapping
 */
anychart.chartEditorModule.input.Base.prototype.init = function(model, key, opt_callback, opt_noRebuildChart, opt_noRebuildMapping) {
  /**
   * @type {anychart.chartEditorModule.EditorModel}
   * @protected
   */
  this.editorModel = model;

  this.key = key;

  this.callback = opt_callback;

  this.noRebuild = !!opt_noRebuildChart;

  this.noRebuildMapping = !!opt_noRebuildMapping;
};


/** @inheritDoc */
anychart.chartEditorModule.input.Base.prototype.setValue = function(s) {
  if (this.validateFunction_(s)) {
    s = this.formatterFunction_(s);
    anychart.chartEditorModule.input.Base.base(this, 'setValue', s);
  }
};


/**
 * Sets value of this control to target's value.
 * Updates model state.
 * @param {?Object} target Object, who's property corresponds to control's key. Used to get value of this control.
 * @param {boolean=} opt_force
 */
anychart.chartEditorModule.input.Base.prototype.setValueByTarget = function(target, opt_force) {
  if (this.excluded) return;
  if (!opt_force && this.revisionCount1 - this.revisionCount2 > 1) return;
  this.revisionCount2 = this.revisionCount1;

  this.target = target;

  var stringKey = anychart.chartEditorModule.EditorModel.getStringKey(this.key);
  var value = /** @type {string} */(anychart.bindingModule.exec(this.target, stringKey));
  value = this.formatterFunction_(value);

  this.lastValue = value;

  this.noDispatch = true;
  this.setValue(value);
  this.noDispatch = false;
};


/**
 * Hide or show control by assigning 'hidden' class
 * @param {boolean} value True if excluded.
 * @param {boolean=} opt_needRedraw
 */
anychart.chartEditorModule.input.Base.prototype.exclude = function(value, opt_needRedraw) {
  var dirty = this.excluded !== value;
  this.excluded = value;

  if (this.isInDocument())
    goog.style.setElementShown(this.getElement(), !this.excluded);

  if (dirty && this.excluded && this.editorModel)
    this.editorModel.removeByKey(this.key, !opt_needRedraw);
};


/**
 * @return {boolean}
 */
anychart.chartEditorModule.input.Base.prototype.isExcluded = function() {
  return this.excluded;
};


/**
 * @public
 */
anychart.chartEditorModule.input.Base.prototype.updateExclusion = function() {
  if (!this.key || !this.key.length) return;

  var stringKey = this.editorModel.getStringKey(this.key);
  this.exclude(this.editorModel.checkSettingForExclusion(stringKey));
};


/**
 * The validate function to be used for set value.
 * @param {string} value The value to check.
 * @return {boolean}
 * @private
 */
anychart.chartEditorModule.input.Base.prototype.validateFunction_ = function(value) {
  return true;
};


/**
 * Formatter for set value.
 * @param {string} value
 * @return {string}
 * @private
 */
anychart.chartEditorModule.input.Base.prototype.formatterFunction_ = function(value) {
  if (!goog.isDef(value))
    value = '';
  else if (goog.isFunction(value))
    value = '-- value is a function --';

  return String(value);
};


/**
 * Set validate function.
 * @param {function(string):boolean} validateFunction
 */
anychart.chartEditorModule.input.Base.prototype.setValidateFunction = function(validateFunction) {
  this.validateFunction_ = validateFunction;
};


/**
 * Set formatter function.
 * @param {function(string):string} formatterFunction
 */
anychart.chartEditorModule.input.Base.prototype.setFormatterFunction = function(formatterFunction) {
  this.formatterFunction_ = formatterFunction;
};

/** @inheritDoc */
anychart.chartEditorModule.input.Base.prototype.disposeInternal = function() {
  if (this.inputHandler_) {
    goog.events.removeAll(this.inputHandler_);
    this.inputHandler_.dispose();
    this.inputHandler_ = null;
  }
  anychart.chartEditorModule.input.Base.base(this, 'disposeInternal');
};

