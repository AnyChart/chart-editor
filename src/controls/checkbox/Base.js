goog.provide('anychart.chartEditorModule.checkbox.Base');

goog.require('anychart.chartEditorModule.checkbox.Renderer');
goog.require('anychart.chartEditorModule.events');
goog.require('goog.ui.Checkbox');
goog.require('goog.ui.Checkbox.State');



/**
 * A Checkbox control.
 * @param {goog.ui.Checkbox.State=} opt_checked Checked state to set.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @param {goog.ui.CheckboxRenderer=} opt_renderer Renderer used to render or
 *     decorate the checkbox; defaults to {@link goog.ui.CheckboxRenderer}.
 * @constructor
 * @extends {goog.ui.Checkbox}
 */
anychart.chartEditorModule.checkbox.Base = function(opt_checked, opt_domHelper, opt_renderer) {
  anychart.chartEditorModule.checkbox.Base.base(this, 'constructor', opt_checked, opt_domHelper,
      opt_renderer || anychart.chartEditorModule.checkbox.Renderer.getInstance());

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

  this.excluded = false;
};
goog.inherits(anychart.chartEditorModule.checkbox.Base, goog.ui.Checkbox);


/**
 * @type {*}
 * @private
 */
anychart.chartEditorModule.checkbox.Base.prototype.normalValue_ = '';


/** @param {*} value */
anychart.chartEditorModule.checkbox.Base.prototype.setNormalValue = function(value) {
  this.normalValue_ = value;
};


/**
 * @type {*}
 * @private
 */
anychart.chartEditorModule.checkbox.Base.prototype.checkedValue_ = '';


/** @param {*} value */
anychart.chartEditorModule.checkbox.Base.prototype.setCheckedValue = function(value) {
  this.checkedValue_ = value;
};


/** @return {anychart.chartEditorModule.EditorModel.Key} */
anychart.chartEditorModule.checkbox.Base.prototype.getKey = function() {
  return this.key;
};


/** @param {anychart.chartEditorModule.EditorModel.Key} value */
anychart.chartEditorModule.checkbox.Base.prototype.setKey = function(value) {
  this.key = value;
};


/** @override */
anychart.chartEditorModule.checkbox.Base.prototype.enterDocument = function() {
  anychart.chartEditorModule.checkbox.Base.base(this, 'enterDocument');
  goog.dom.classlist.enable(this.getElement(), 'anychart-hidden', this.excluded);
  if (!this.excluded)
    goog.events.listen(this, goog.ui.Component.EventType.CHANGE, this.onChange, false, this);
};


/** @inheritDoc */
anychart.chartEditorModule.checkbox.Base.prototype.exitDocument = function() {
  goog.events.unlisten(this, goog.ui.Component.EventType.CHANGE, this.onChange, false, this);
  anychart.chartEditorModule.checkbox.Base.base(this, 'exitDocument');
};


/**
 * Connects control with EditorMode.
 *
 * @param {anychart.chartEditorModule.EditorModel} model Editor model instance to connect with.
 * @param {anychart.chartEditorModule.EditorModel.Key} key Key of control's field in model's structure.
 * @param {string=} opt_callback Callback function that will be called on control's value change instead of simple change value in model.
 *  This function should be model's public method.
 * @param {boolean=} opt_noRebuild Should or not rebuild target (chart) on change value of this control.
 */
anychart.chartEditorModule.checkbox.Base.prototype.init = function(model, key, opt_callback, opt_noRebuild) {
  /**
   * @type {anychart.chartEditorModule.EditorModel}
   * @protected
   */
  this.editorModel = model;
  if (!this.editorModel)
    console.warn('anychart.chartEditorModule.checkbox.Base: Model could not be undefined!');

  this.key = key;

  this.callback = opt_callback;

  this.noRebuild = !!opt_noRebuild;

  this.updateExclusion();
};


/**
 * @param {goog.events.Event} evt
 * @private
 */
anychart.chartEditorModule.checkbox.Base.prototype.onChange = function(evt) {
  evt.stopPropagation();
  if (this.excluded) return;

  if (!this.noDispatch && this.editorModel) {
    //var value = this.isChecked() ? this.checkedValue_ : this.normalValue_;

    if (this.callback)
      this.editorModel.callbackByString(this.callback, this);
    else
      this.editorModel.setValue(this.key, this.getChecked(), false, this.noRebuild);
  }
};


/**
 * Sets value of this control to target's value.
 * Updates model state.
 * @param {?Object} target Object, who's property corresponds to control's key. Used to get value of this control.
 */
anychart.chartEditorModule.checkbox.Base.prototype.setValueByTarget = function(target) {
  if (!this.key || this.excluded) return;

  this.target = target;

  var stringKey = anychart.chartEditorModule.EditorModel.getStringKey(this.key);
  var value = anychart.bindingModule.exec(this.target, stringKey);
  value = goog.typeOf(value) === 'boolean' ? /** @type {boolean} */(value) : false;

  this.noDispatch = true;
  this.setChecked(value);
  this.noDispatch = false;
};


/**
 * Hide or show control by assigning 'hidden' class
 * @param {boolean} value True if excluded.
 */
anychart.chartEditorModule.checkbox.Base.prototype.exclude = function(value) {
  var dirty = this.excluded != value;
  this.excluded = value;

  if (this.isInDocument())
    goog.dom.classlist.enable(this.getElement(), 'anychart-hidden', this.excluded);
  if (dirty && this.excluded && this.editorModel)
    this.editorModel.removeByKey(this.key, true);
};


/**
 * @return {boolean}
 */
anychart.chartEditorModule.checkbox.Base.prototype.isExcluded = function() {
  return this.excluded;
};


/**
 * @public
 */
anychart.chartEditorModule.checkbox.Base.prototype.updateExclusion = function() {
  if (!this.key || !this.key.length || !this.editorModel) return;

  var stringKey = this.editorModel.getStringKey(this.key);
  this.exclude(this.editorModel.checkSettingForExclusion(stringKey));
};
