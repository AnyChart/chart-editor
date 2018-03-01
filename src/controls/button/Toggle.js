goog.provide('anychart.chartEditorModule.button.Toggle');

goog.require('anychart.chartEditorModule.events');
goog.require('anychart.ui.button.Base');

goog.require('goog.ui.INLINE_BLOCK_CLASSNAME');



/**
 * A toggle button control.
 * Extends {@link anychart.ui.button.Base} by providing checkbox-like semantics.
 * @param {goog.ui.ControlContent=} opt_content
 * @param {goog.ui.ButtonRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {anychart.ui.button.Base}
 */
anychart.chartEditorModule.button.Toggle = function(opt_content, opt_renderer, opt_domHelper) {
  anychart.chartEditorModule.button.Toggle.base(this, 'constructor', opt_content, opt_renderer, opt_domHelper);

  this.addClassName(goog.ui.INLINE_BLOCK_CLASSNAME);
  this.addClassName('anychart-button-standard');
  this.addClassName(anychart.chartEditorModule.button.Toggle.CSS_CLASS);

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
   * @type {anychart.chartEditorModule.EditorModel.Key}
   * @protected
   */
  this.key = [];

  /**
   * @type {boolean}
   * @protected
   */
  this.noDispatch = false;
};
goog.inherits(anychart.chartEditorModule.button.Toggle, anychart.ui.button.Base);


/** @type {string} */
anychart.chartEditorModule.button.Toggle.CSS_CLASS = goog.getCssName('anychart-button-toggle');


/**
 * @type {*}
 * @private
 */
anychart.chartEditorModule.button.Toggle.prototype.normalValue_ = '';


/** @param {*} value */
anychart.chartEditorModule.button.Toggle.prototype.setNormalValue = function(value) {
  this.normalValue_ = value;
};


/**
 * @type {*}
 * @private
 */
anychart.chartEditorModule.button.Toggle.prototype.checkedValue_ = '';


/** @param {*} value */
anychart.chartEditorModule.button.Toggle.prototype.setCheckedValue = function(value) {
  this.checkedValue_ = value;
};


/** @return {anychart.chartEditorModule.EditorModel.Key} */
anychart.chartEditorModule.button.Toggle.prototype.getKey = function() {
  return this.key;
};


/** @param {anychart.chartEditorModule.EditorModel.Key} value */
anychart.chartEditorModule.button.Toggle.prototype.setKey = function(value) {
  this.key = value;
};


/** @override */
anychart.chartEditorModule.button.Toggle.prototype.enterDocument = function() {
  anychart.chartEditorModule.button.Toggle.base(this, 'enterDocument');

  goog.events.listen(this, goog.ui.Component.EventType.ACTION, this.onChange, false, this);
};


/** @override */
anychart.chartEditorModule.button.Toggle.prototype.exitDocument = function() {
  goog.events.unlisten(this, goog.ui.Component.EventType.ACTION, this.onChange, false, this);

  anychart.chartEditorModule.button.Toggle.base(this, 'exitDocument');
};


/**
 * @param {goog.events.Event} evt
 * @protected
 */
anychart.chartEditorModule.button.Toggle.prototype.onChange = function(evt) {
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
 * @param {anychart.chartEditorModule.EditorModel} model Editor model instance to connect with.
 * @param {anychart.chartEditorModule.EditorModel.Key} key Key of control's field in model's structure.
 * @param {string=} opt_callback Callback function that will be called on control's value change instead of simple change value in model.
 *  This function should be model's public method.
 * @param {boolean=} opt_noRebuild Should or not rebuild chart on change value of this control.
 */
anychart.chartEditorModule.button.Toggle.prototype.init = function(model, key, opt_callback, opt_noRebuild) {
  /**
   * @type {anychart.chartEditorModule.EditorModel}
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
anychart.chartEditorModule.button.Toggle.prototype.setValueByTarget = function(target) {
  this.target = target;

  var stringKey = anychart.chartEditorModule.EditorModel.getStringKey(this.key);
  var value = /** @type {string} */(anychart.bindingModule.exec(this.target, stringKey));

  this.noDispatch = true;
  this.setChecked(value === this.checkedValue_);
  this.noDispatch = false;
};
