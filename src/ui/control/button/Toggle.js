goog.provide('chartEditor.ui.control.button.Toggle');

goog.require('chartEditor.events');
goog.require('chartEditor.ui.control.button.Base');

goog.require('goog.ui.INLINE_BLOCK_CLASSNAME');



/**
 * A toggle button control.
 * Extends {@link chartEditor.ui.control.button.Base} by providing checkbox-like semantics.
 * @param {goog.ui.ControlContent=} opt_content
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.control.button.Base}
 */
chartEditor.ui.control.button.Toggle = function(opt_content, opt_renderer, opt_domHelper) {
  chartEditor.ui.control.button.Toggle.base(this, 'constructor', opt_content, opt_renderer, opt_domHelper);

  this.addClassName(goog.ui.INLINE_BLOCK_CLASSNAME);
  this.addClassName('anychart-ce-button-standard');
  this.addClassName(chartEditor.ui.control.button.Toggle.CSS_CLASS);

  this.setSupportedState(goog.ui.Component.State.CHECKED, true);
  this.setAutoStates(goog.ui.Component.State.CHECKED, false);

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
};
goog.inherits(chartEditor.ui.control.button.Toggle, chartEditor.ui.control.button.Base);


/** @type {string} */
chartEditor.ui.control.button.Toggle.CSS_CLASS = goog.getCssName('anychart-ce-button-toggle');


/**
 * @type {*}
 * @private
 */
chartEditor.ui.control.button.Toggle.prototype.normalValue_ = '';


/** @param {*} value */
chartEditor.ui.control.button.Toggle.prototype.setNormalValue = function(value) {
  this.normalValue_ = value;
};


/**
 * @type {*}
 * @private
 */
chartEditor.ui.control.button.Toggle.prototype.checkedValue_ = '';


/** @param {*} value */
chartEditor.ui.control.button.Toggle.prototype.setCheckedValue = function(value) {
  this.checkedValue_ = value;
};


/** @return {chartEditor.model.Base.Key} */
chartEditor.ui.control.button.Toggle.prototype.getKey = function() {
  return this.key;
};


/** @param {chartEditor.model.Base.Key} value */
chartEditor.ui.control.button.Toggle.prototype.setKey = function(value) {
  this.key = value;
};


/**
 * Removes control's value from model
 */
chartEditor.ui.control.button.Toggle.prototype.reset = function() {
  this.editorModel.removeByKey(this.key);
};


/** @override */
chartEditor.ui.control.button.Toggle.prototype.enterDocument = function() {
  chartEditor.ui.control.button.Toggle.base(this, 'enterDocument');

  goog.events.listen(this, goog.ui.Component.EventType.ACTION, this.onChange, false, this);
};


/** @override */
chartEditor.ui.control.button.Toggle.prototype.exitDocument = function() {
  goog.events.unlisten(this, goog.ui.Component.EventType.ACTION, this.onChange, false, this);

  chartEditor.ui.control.button.Toggle.base(this, 'exitDocument');
};


/**
 * @param {goog.events.Event} evt
 * @protected
 */
chartEditor.ui.control.button.Toggle.prototype.onChange = function(evt) {
  evt.stopPropagation();

  if (!this.noDispatch && this.editorModel) {
    var value = this.isChecked() ? this.normalValue_ : this.checkedValue_;

    if (this.callback)
      this.editorModel.callbackByString(this.callback, this);
    else
      this.editorModel.setValue(this.key, value, false, this.noRebuild);
  }
};


/**
 * Connects control with EditorMode.
 *
 * @param {chartEditor.model.Base} model Editor model instance to connect with.
 * @param {chartEditor.model.Base.Key} key Key of control's field in model's structure.
 * @param {string=} opt_callback Callback function that will be called on control's value change instead of simple change value in model.
 *  This function should be model's public method.
 * @param {boolean=} opt_noRebuild Should or not rebuild chart on change value of this control.
 */
chartEditor.ui.control.button.Toggle.prototype.init = function(model, key, opt_callback, opt_noRebuild) {
  /**
   * @type {chartEditor.model.Base}
   * @protected
   */
  this.editorModel = model;

  this.key = key;

  this.callback = opt_callback;

  this.noRebuild = !!opt_noRebuild;
};


/**
 * Sets value of this control to target's value.
 * Updates model state.
 * @param {?Object} target Object, who's property corresponds to control's key. Used to get value of this control.
 */
chartEditor.ui.control.button.Toggle.prototype.setValueByTarget = function(target) {
  this.target = target;

  var stringKey = chartEditor.model.Base.getStringKey(this.key);
  var value = /** @type {string} */(chartEditor.binding.exec(this.target, stringKey));

  this.noDispatch = true;
  this.setChecked(value === this.checkedValue_);
  this.noDispatch = false;
};
