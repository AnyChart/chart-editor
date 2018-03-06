goog.provide('chartEditor.input.Base');

goog.require('chartEditor.events');

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
chartEditor.input.Base = function(opt_label, opt_domHelper) {
  chartEditor.input.Base.base(this, 'constructor', opt_label, opt_domHelper);

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
   * @type {chartEditor.EditorModel.Key}
   * @protected
   */
  this.key = [];
};
goog.inherits(chartEditor.input.Base, goog.ui.LabelInput);


/**
 * The CSS class name to add to the input when the user has not entered a
 * value.
 */
chartEditor.input.Base.prototype.labelCssClassName =
    goog.getCssName('anychart-ce-input-label');


/**
 * @type {goog.events.KeyHandler}
 * @private
 */
chartEditor.input.Base.prototype.keyHandler_ = null;


/**
 * @param {chartEditor.EditorModel.Key} key
 */
chartEditor.input.Base.prototype.setKey = function(key) {
  this.key = key;
};


/**
 * @return {chartEditor.EditorModel.Key}
 */
chartEditor.input.Base.prototype.getKey = function() {
  return this.key;
};


/**
 * Creates the DOM nodes needed for the label input.
 * @override
 */
chartEditor.input.Base.prototype.createDom = function() {
  this.setElementInternal(this.getDomHelper().createDom(
      goog.dom.TagName.INPUT, {
        'type': goog.dom.InputType.TEXT,
        'className': goog.getCssName('anychart-ce-input')
      }));
};


/** @inheritDoc */
chartEditor.input.Base.prototype.enterDocument = function() {
  chartEditor.input.Base.base(this, 'enterDocument');
  goog.style.setElementShown(this.getElement(), !this.excluded);

  this.inputHandler_ = new goog.events.InputHandler(this.getElement());
  goog.events.listen(this.inputHandler_, goog.events.InputHandler.EventType.INPUT,
      this.onChange, false, this);
};


/** @protected */
chartEditor.input.Base.prototype.onChange = function() {
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
 * @param {chartEditor.EditorModel} model Editor model instance to connect with.
 * @param {chartEditor.EditorModel.Key} key Key of control's field in model's structure.
 * @param {string=} opt_callback Callback function that will be called on control's value change instead of simple change value in model.
 *  This function should be model's public method.
 * @param {boolean=} opt_noRebuildChart Should or not rebuild chart on change value of this control.
 * @param {boolean=} opt_noRebuildMapping
 */
chartEditor.input.Base.prototype.init = function(model, key, opt_callback, opt_noRebuildChart, opt_noRebuildMapping) {
  /**
   * @type {chartEditor.EditorModel}
   * @protected
   */
  this.editorModel = model;

  this.key = key;

  this.callback = opt_callback;

  this.noRebuild = !!opt_noRebuildChart;

  this.noRebuildMapping = !!opt_noRebuildMapping;
};


/** @inheritDoc */
chartEditor.input.Base.prototype.setValue = function(s) {
  if (this.validateFunction_(s)) {
    s = this.formatterFunction_(s);
    chartEditor.input.Base.base(this, 'setValue', s);
  }
};


/**
 * Sets value of this control to target's value.
 * Updates model state.
 * @param {?Object} target Object, who's property corresponds to control's key. Used to get value of this control.
 * @param {boolean=} opt_force
 */
chartEditor.input.Base.prototype.setValueByTarget = function(target, opt_force) {
  if (this.excluded) return;
  if (!opt_force && this.revisionCount1 - this.revisionCount2 > 1) return;
  this.revisionCount2 = this.revisionCount1;

  this.target = target;

  var stringKey = chartEditor.EditorModel.getStringKey(this.key);
  var value = /** @type {string} */(chartEditor.binding.exec(this.target, stringKey));
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
chartEditor.input.Base.prototype.exclude = function(value, opt_needRedraw) {
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
chartEditor.input.Base.prototype.isExcluded = function() {
  return this.excluded;
};


/**
 * @public
 */
chartEditor.input.Base.prototype.updateExclusion = function() {
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
chartEditor.input.Base.prototype.validateFunction_ = function(value) {
  return true;
};


/**
 * Formatter for set value.
 * @param {string} value
 * @return {string}
 * @private
 */
chartEditor.input.Base.prototype.formatterFunction_ = function(value) {
  if (!goog.isDef(value) || goog.isFunction(value))
    value = '';

  return value ? String(value) : '';
};


/**
 * Set validate function.
 * @param {function(string):boolean} validateFunction
 */
chartEditor.input.Base.prototype.setValidateFunction = function(validateFunction) {
  this.validateFunction_ = validateFunction;
};


/**
 * Set formatter function.
 * @param {function(string):string} formatterFunction
 */
chartEditor.input.Base.prototype.setFormatterFunction = function(formatterFunction) {
  this.formatterFunction_ = formatterFunction;
};

/** @inheritDoc */
chartEditor.input.Base.prototype.disposeInternal = function() {
  if (this.inputHandler_) {
    goog.events.removeAll(this.inputHandler_);
    this.inputHandler_.dispose();
    this.inputHandler_ = null;
  }
  chartEditor.input.Base.base(this, 'disposeInternal');
};

