goog.provide('chartEditor.ui.control.select.Base');

goog.require('chartEditor.events');
goog.require('chartEditor.reporting');
goog.require('chartEditor.ui.control.fieldSelect.SelectMenuItem');
goog.require('goog.ui.Option');
goog.require('goog.ui.Select');



/**
 *
 * @param {goog.ui.ControlContent=} opt_caption Default caption or existing DOM
 *     structure to display as the button's caption when nothing is selected.
 *     Defaults to no caption.
 * @param {goog.ui.Menu=} opt_menu Menu containing selection options.
 * @param {goog.ui.ButtonRenderer=} opt_renderer Renderer used to render or
 *     decorate the control; defaults to {@link goog.ui.MenuButtonRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @param {!goog.ui.MenuRenderer=} opt_menuRenderer Renderer used to render or
 *     decorate the menu; defaults to {@link goog.ui.MenuRenderer}.
 * @constructor
 * @extends {goog.ui.Select}
 */
chartEditor.ui.control.select.Base = function(opt_caption, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer) {
  chartEditor.ui.control.select.Base.base(this, 'constructor', opt_caption, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer);

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
  this.rebuildChart = false;

  /**
   * Target object (usually it's chart)
   * @type {?Object}
   * @protected
   */
  this.target = null;
};
goog.inherits(chartEditor.ui.control.select.Base, goog.ui.Select);


/**
 * Set model for options.
 * @param {Array.<Object|string>} options
 */
chartEditor.ui.control.select.Base.prototype.setOptions = function(options) {
  for (var a = this.getItemCount(); a--;) {
    this.removeItemAt(a);
  }

  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    if (goog.isString(option))
      option = {value: option};

    var val = option.value;
    if (goog.isDef(val)) {
      if (!goog.isDef(option.caption)) {
        option.caption = goog.string.capitalize(val);
      }

      this.addItem(new chartEditor.ui.control.fieldSelect.SelectMenuItem(option));
    }
  }
};


/** @param {chartEditor.model.Base.Key} value */
chartEditor.ui.control.select.Base.prototype.setKey = function(value) {
  this.key = value;
};


/**
 * Gets key.
 * @return {chartEditor.model.Base.Key}
 */
chartEditor.ui.control.select.Base.prototype.getKey = function() {
  return this.key;
};


/**
 * Removes control's value from model
 */
chartEditor.ui.control.select.Base.prototype.reset = function() {
  this.editorModel.removeByKey(this.key);
};


/** @override */
chartEditor.ui.control.select.Base.prototype.enterDocument = function() {
  chartEditor.ui.control.select.Base.base(this, 'enterDocument');
  goog.style.setElementShown(this.getElement(), !this.excluded);
};


/** @inheritDoc */
chartEditor.ui.control.select.Base.prototype.handleSelectionChange = function (evt) {
  evt.preventDefault();
  evt.stopPropagation();
  if (this.excluded) return;

  if (!this.noDispatch && goog.isDefAndNotNull(this.getValue())) {
    var selectedIndex = this.getSelectedIndex();
    if (this.prevSelectedIndex_ === selectedIndex) return;
    this.prevSelectedIndex_ = selectedIndex;

    if (this.editorModel)
      this.applySelection();
    else
      this.setValue(this.getValue());
  }
};


/**
 * Applies selection to model.
 */
chartEditor.ui.control.select.Base.prototype.applySelection = function () {
  if (this.callback)
    this.editorModel.callbackByString(this.callback, this);
  else {
    var value = this.getValue();
    value = goog.isObject(value) && goog.isDef(value.value) ? value.value : value;
    this.editorModel.setValue(this.key, value, this.rebuildChart);
  }
};


/**
 * Connects control with EditorMode.
 *
 * @param {chartEditor.model.Base} model Editor model instance to connect with.
 * @param {chartEditor.model.Base.Key} key Key of control's field in model's structure.
 * @param {string=} opt_callback Callback function that will be called on control's value change instead of simple change value in model.
 *  This function should be model's public method.
 * @param {boolean=} opt_rebuildChart Should or not rebuild target (chart) on change value of this control.
 * @public
 */
chartEditor.ui.control.select.Base.prototype.init = function(model, key, opt_callback, opt_rebuildChart) {
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
 * @param {*} value
 * @param {Object=} opt_additionalValues
 */
chartEditor.ui.control.select.Base.prototype.setValue = function(value, opt_additionalValues) {
  var selectionModel = this.getSelectionModel();
  if (goog.isDefAndNotNull(value) && selectionModel) {
    for (var i = 0, item; item = selectionModel.getItemAt(i); i++) {
      if (item && typeof item.getValue === 'function') {
        var itemModel = item.getValue();
        if (itemModel == value || itemModel.value == value) {
          var additionalMatch = true;
          if (goog.isObject(opt_additionalValues)) {
            for (var j in opt_additionalValues) {
              if (opt_additionalValues[j] !== itemModel[j]) {
                additionalMatch = false;
                break;
              }
            }
          }
          if (additionalMatch) {
            this.setSelectedItem(/** @type {!goog.ui.MenuItem} */ (item));
            this.prevSelectedIndex_ = this.getSelectedIndex();
            this.updateCaption();
            return;
          }
        }
      }
    }
  }

  this.setSelectedItem(null);
  this.prevSelectedIndex_ = -1;
  this.updateCaption();
};


/**
 * Sets value of this control to model's value.
 *
 * @param {Object=} opt_additionalValues Object of additional values.
 */
chartEditor.ui.control.select.Base.prototype.setValueByModel = function(opt_additionalValues) {
  var modelValue;
  this.noDispatch = true;

  if (this.editorModel && this.key)
    modelValue = this.editorModel.getValue(this.key);

  if (goog.isDef(modelValue))
    this.setValue(modelValue, opt_additionalValues);

  if (!this.getSelectedItem())
    chartEditor.reporting.warning(chartEditor.enums.WarningCode.EDITOR_MODEL_VALUE_NOT_FOUND, null, this.key);

  this.noDispatch = false;
};


/**
 * Sets value of this control to target's value.
 * Updates model state.
 * @param {?Object} target Object, who's property corresponds to control's key. Used to get value of this control.
 * @return {boolean|undefined} If model was updated
 */
chartEditor.ui.control.select.Base.prototype.setValueByTarget = function(target) {
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
 * @param {boolean} value
 */
chartEditor.ui.control.select.Base.prototype.suspendDispatch = function(value) {
  this.noDispatch = value;
};


/**
 * Hide or show control by assigning 'hidden' class
 * @param {boolean} value True if excluded.
 * @return {boolean}
 */
chartEditor.ui.control.select.Base.prototype.exclude = function(value) {
  var dirty = this.excluded !== value;
  this.excluded = value;
  if (this.isInDocument())
    goog.style.setElementShown(this.getElement(), !this.excluded);

  if (dirty && this.excluded && this.editorModel)
    this.editorModel.removeByKey(this.key, true);

  return this.excluded;
};


/**
 * @return {boolean}
 */
chartEditor.ui.control.select.Base.prototype.isExcluded = function() {
  return this.excluded;
};


/** @return {boolean|undefined} */
chartEditor.ui.control.select.Base.prototype.updateExclusion = function() {
  if (!this.key || !this.key.length || !this.editorModel) return;

  var stringKey = this.editorModel.getStringKey(this.key);
  return this.exclude(this.editorModel.checkSettingForExclusion(stringKey));
};
