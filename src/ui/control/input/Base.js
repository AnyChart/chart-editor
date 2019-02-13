goog.provide('chartEditor.ui.control.input.Base');

goog.require('chartEditor.events');
goog.require('goog.dom.selection');
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
chartEditor.ui.control.input.Base = function(opt_label, opt_domHelper) {
  chartEditor.ui.control.input.Base.base(this, 'constructor', opt_label, opt_domHelper);

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

  this.revisionCount1 = 0;

  this.revisionCount2 = 0;

  /**
   * Editor Model key.
   *
   * @type {chartEditor.model.Base.Key}
   * @protected
   */
  this.key = [];
};
goog.inherits(chartEditor.ui.control.input.Base, goog.ui.LabelInput);


/**
 * The CSS class name to add to the input when the user has not entered a
 * value.
 */
chartEditor.ui.control.input.Base.prototype.labelCssClassName =
    goog.getCssName('anychart-ce-input-label');


/**
 * @type {goog.events.KeyHandler}
 * @private
 */
chartEditor.ui.control.input.Base.prototype.keyHandler_ = null;


/**
 * @param {chartEditor.model.Base.Key} key
 */
chartEditor.ui.control.input.Base.prototype.setKey = function(key) {
  this.key = key;
  this.stringKey = chartEditor.model.Base.getStringKey(this.key);
};


/**
 * @param {string} name
 */
chartEditor.ui.control.input.Base.prototype.addClassName = function(name) {
  goog.dom.classlist.add(this.getElement(), goog.getCssName('wide-width'));
};


/**
 * @return {chartEditor.model.Base.Key}
 */
chartEditor.ui.control.input.Base.prototype.getKey = function() {
  return this.key;
};


/**
 * Creates the DOM nodes needed for the label input.
 * @override
 */
chartEditor.ui.control.input.Base.prototype.createDom = function() {
  this.setElementInternal(this.getDomHelper().createDom(
      goog.dom.TagName.INPUT, {
        'type': goog.dom.InputType.TEXT,
        'className': goog.getCssName('anychart-ce-input')
      }));
};


/** @inheritDoc */
chartEditor.ui.control.input.Base.prototype.enterDocument = function() {
  chartEditor.ui.control.input.Base.base(this, 'enterDocument');
  goog.style.setElementShown(this.getElement(), !this.excluded);

  this.inputHandler_ = new goog.events.InputHandler(this.getElement());
  goog.events.listen(this.inputHandler_, goog.events.InputHandler.EventType.INPUT,
      this.onChange, false, this);
};


/** @protected */
chartEditor.ui.control.input.Base.prototype.onChange = function() {
  if (this.excluded) return;

  goog.dom.classlist.enable(this.getElement(), goog.getCssName('anychart-ce-input-with-function'), false);
  goog.dom.setProperties(this.getElement(), {'placeholder': ''});

  var value = this.getValue();
  value = value.replace(/(\\)/g, '\\\\');
  value = value.replace(/(\\\\n)/g, '\\n');

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
 * Should be called to force setValueByTarget
 */
chartEditor.ui.control.input.Base.prototype.resetRevisions = function() {
  this.revisionCount1 = 0;
};


/**
 * Connects control with EditorMode.
 *
 * @param {chartEditor.model.Base} model Editor model instance to connect with.
 * @param {chartEditor.model.Base.Key} key Key of control's field in model's structure.
 * @param {string=} opt_callback Callback function that will be called on control's value change instead of simple change value in model.
 *  This function should be model's public method.
 * @param {boolean=} opt_noRebuildChart Should or not rebuild chart on change value of this control.
 * @param {boolean=} opt_noRebuildMapping
 */
chartEditor.ui.control.input.Base.prototype.init = function(model, key, opt_callback, opt_noRebuildChart, opt_noRebuildMapping) {
  /**
   * @type {chartEditor.model.Base}
   * @protected
   */
  this.editorModel = model;

  this.setKey(key);

  this.callback = opt_callback;

  this.noRebuild = !!opt_noRebuildChart;

  this.noRebuildMapping = !!opt_noRebuildMapping;
};


/** @inheritDoc */
chartEditor.ui.control.input.Base.prototype.setValue = function(s) {
  if (this.validateFunction_(s)) {
    s = this.formatterFunction_(s);
    if (this.lastValue != s) {
      this.lastValue = s;
      chartEditor.ui.control.input.Base.base(this, 'setValue', s);
    }
  }
};


/**
 * Sets value of this control to model's value.
 */
chartEditor.ui.control.input.Base.prototype.setValueByModel = function() {
  if (this.editorModel && this.key) {
    this.noDispatch = true;

    var value = /** @type {string} */(this.editorModel.getValue(this.key));
    if (goog.isDef(value)) {
      this.setValue(value);
    }

    this.noDispatch = false;
  }
};


/**
 * Sets value of this control to target's value.
 * Updates model state.
 * @param {?Object} target Object, who's property corresponds to control's key. Used to get value of this control.
 * @param {boolean=} opt_force
 */
chartEditor.ui.control.input.Base.prototype.setValueByTarget = function(target, opt_force) {
  if (this.excluded) return;

  if (!opt_force && (this.revisionCount1 - this.revisionCount2) > 1) return;
  this.revisionCount2 = this.revisionCount1;

  var value = /** @type {string} */(chartEditor.binding.exec(target, this.stringKey));

  goog.dom.classlist.enable(this.getElement(), goog.getCssName('anychart-ce-input-with-function'), typeof value == 'function');
  var placeholder = typeof value == 'function' ? '-- function value --' : '';
  goog.dom.setProperties(this.getElement(), {'placeholder': placeholder});

  this.noDispatch = true;
  this.setValue(value);
  this.noDispatch = false;
};


/**
 * Hide or show control by assigning 'hidden' class
 * @param {boolean} value True if excluded.
 * @param {boolean=} opt_needRedraw
 */
chartEditor.ui.control.input.Base.prototype.exclude = function(value, opt_needRedraw) {
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
chartEditor.ui.control.input.Base.prototype.isExcluded = function() {
  return this.excluded;
};


/**
 * @public
 */
chartEditor.ui.control.input.Base.prototype.updateExclusion = function() {
  if (!this.key || !this.key.length) return;

  this.exclude(this.editorModel.checkSettingForExclusion(this.stringKey));
};


/** override */
chartEditor.ui.control.input.Base.prototype.reset = function() {
  chartEditor.ui.control.input.Base.base(this, 'reset');

  this.lastValue = '';
  this.editorModel.removeByKey(this.key);
};


/**
 * The validate function to be used for set value.
 * @param {string} value The value to check.
 * @return {boolean}
 * @private
 */
chartEditor.ui.control.input.Base.prototype.validateFunction_ = function(value) {
  return true;
};


/**
 * Formatter for set value.
 * @param {*} value
 * @return {string}
 * @private
 */
chartEditor.ui.control.input.Base.prototype.formatterFunction_ = function(value) {
  if (!goog.isDef(value) || goog.isFunction(value))
    value = '';

  if (goog.isString(value) && value) ///fix ENV-918 gantt can pass a number here
    value = value.replace(/(\n)/g, '\\n');

  return value ? String(value) : '';
};


/**
 * Set validate function.
 * @param {function(string):boolean} validateFunction
 */
chartEditor.ui.control.input.Base.prototype.setValidateFunction = function(validateFunction) {
  this.validateFunction_ = validateFunction;
};


/**
 * Set formatter function.
 * @param {function(*):string} formatterFunction
 */
chartEditor.ui.control.input.Base.prototype.setFormatterFunction = function(formatterFunction) {
  this.formatterFunction_ = formatterFunction;
};


/** @inheritDoc */
chartEditor.ui.control.input.Base.prototype.disposeInternal = function() {
  if (this.inputHandler_) {
    goog.events.removeAll(this.inputHandler_);
    this.inputHandler_.dispose();
    this.inputHandler_ = null;
  }
  chartEditor.ui.control.input.Base.base(this, 'disposeInternal');
};

