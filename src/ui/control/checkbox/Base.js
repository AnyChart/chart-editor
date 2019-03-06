goog.provide('chartEditor.ui.control.checkbox.Base');

goog.require('chartEditor.events');
goog.require('chartEditor.ui.control.checkbox.Renderer');
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
chartEditor.ui.control.checkbox.Base = function(opt_checked, opt_domHelper, opt_renderer) {
  chartEditor.ui.control.checkbox.Base.base(this, 'constructor', opt_checked, opt_domHelper,
      opt_renderer || chartEditor.ui.control.checkbox.Renderer.getInstance());

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

  /**
   * Text to appear in help balloon.
   * @type {string}
   */
  this.balloonText = '';
};
goog.inherits(chartEditor.ui.control.checkbox.Base, goog.ui.Checkbox);


/**
 * @type {*}
 * @private
 */
chartEditor.ui.control.checkbox.Base.prototype.normalValue_ = '';


/** @param {*} value */
chartEditor.ui.control.checkbox.Base.prototype.setNormalValue = function(value) {
  this.normalValue_ = value;
};


/**
 * @type {*}
 * @private
 */
chartEditor.ui.control.checkbox.Base.prototype.checkedValue_ = '';


/** @param {*} value */
chartEditor.ui.control.checkbox.Base.prototype.setCheckedValue = function(value) {
  this.checkedValue_ = value;
};


/** @return {chartEditor.model.Base.Key} */
chartEditor.ui.control.checkbox.Base.prototype.getKey = function() {
  return this.key;
};


/** @param {chartEditor.model.Base.Key} value */
chartEditor.ui.control.checkbox.Base.prototype.setKey = function(value) {
  this.key = value;
};


/**
 * Removes control's value from model
 */
chartEditor.ui.control.checkbox.Base.prototype.reset = function() {
  this.editorModel.removeByKey(this.key);
};


/** @override */
chartEditor.ui.control.checkbox.Base.prototype.enterDocument = function() {
  chartEditor.ui.control.checkbox.Base.base(this, 'enterDocument');
  goog.dom.classlist.enable(this.getElement(), 'anychart-ce-hidden', this.excluded);
  if (!this.excluded) {
    goog.events.listen(this, goog.ui.Component.EventType.CHANGE, this.onChange, false, this);

    this.getHandler().listen(
        this.getElement(),
        [goog.events.EventType.MOUSEENTER, goog.events.EventType.MOUSELEAVE],
        this.handleHover);
  }
};


/** @inheritDoc */
chartEditor.ui.control.checkbox.Base.prototype.exitDocument = function() {
  goog.events.unlisten(this, goog.ui.Component.EventType.CHANGE, this.onChange, false, this);
  goog.events.unlisten(this, [goog.events.EventType.MOUSEENTER, goog.events.EventType.MOUSELEAVE], this.handleHover);
  chartEditor.ui.control.checkbox.Base.base(this, 'exitDocument');
};


/**
 * @param {Object} evt
 */
chartEditor.ui.control.checkbox.Base.prototype.handleHover = function (evt) {
  if (this.isEnabled()) {
    this.dispatchEvent({
      type: evt.type === goog.events.EventType.MOUSEENTER ?
          chartEditor.events.EventType.BALLOON_SHOW :
          chartEditor.events.EventType.BALLOON_HIDE,
      text: this.balloonText
    });
  }
};


/**
 * Connects control with EditorMode.
 *
 * @param {chartEditor.model.Base} model Editor model instance to connect with.
 * @param {chartEditor.model.Base.Key} key Key of control's field in model's structure.
 * @param {string=} opt_callback Callback function that will be called on control's value change instead of simple change value in model.
 *  This function should be model's public method.
 * @param {boolean=} opt_noRebuild Should or not rebuild target (chart) on change value of this control.
 */
chartEditor.ui.control.checkbox.Base.prototype.init = function(model, key, opt_callback, opt_noRebuild) {
  /**
   * @type {chartEditor.model.Base}
   * @protected
   */
  this.editorModel = model;
  if (!this.editorModel)
    console.warn('chartEditor.ui.control.checkbox.Base: Model could not be undefined!');

  this.key = key;

  this.callback = opt_callback;

  this.noRebuild = !!opt_noRebuild;

  this.updateExclusion();

  this.updateBalloonText();
};


/**
 * @param {goog.events.Event} evt
 * @private
 */
chartEditor.ui.control.checkbox.Base.prototype.onChange = function(evt) {
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
chartEditor.ui.control.checkbox.Base.prototype.setValueByTarget = function(target) {
  if (!this.key || this.excluded) return;

  this.target = target;

  var stringKey = chartEditor.model.Base.getStringKey(this.key);
  var value = chartEditor.binding.exec(this.target, stringKey);
  value = goog.typeOf(value) === 'boolean' ? /** @type {boolean} */(value) : false;

  this.noDispatch = true;
  this.setChecked(value);
  this.noDispatch = false;
};


/**
 * Hide or show control by assigning 'hidden' class
 * @param {boolean} value True if excluded.
 */
chartEditor.ui.control.checkbox.Base.prototype.exclude = function(value) {
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
chartEditor.ui.control.checkbox.Base.prototype.isExcluded = function() {
  return this.excluded;
};


/**
 * @public
 */
chartEditor.ui.control.checkbox.Base.prototype.updateExclusion = function() {
  if (!this.key || !this.key.length || !this.editorModel) return;

  var stringKey = this.editorModel.getStringKey(this.key);
  this.exclude(this.editorModel.checkSettingForExclusion(stringKey));
};


/**
 * Set up help balloon text.
 */
chartEditor.ui.control.checkbox.Base.prototype.updateBalloonText = function() {
  if(this.key.length)
    this.balloonText = chartEditor.model.Base.getStringKey(this.key);
};
