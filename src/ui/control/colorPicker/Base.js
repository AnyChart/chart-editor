goog.provide('chartEditor.ui.control.colorPicker.Base');

goog.require('chartEditor.events');
goog.require('chartEditor.ui.control.button.Base');
goog.require('chartEditor.ui.control.colorPicker.Renderer');
goog.require('goog.dom.classlist');
goog.require('goog.dom.selection');
goog.require('goog.events.KeyHandler');
goog.require('goog.ui.ColorMenuButton');
goog.require('goog.ui.LabelInput');



/**
 * A color menu button control.  Extends {@link goog.ui.MenuButton} by adding
 * an API for getting and setting the currently selected color from a menu of
 * color palettes.
 *
 * @param {goog.ui.ControlContent=} opt_content Text caption or existing DOM
 *     structure to display as the button's caption.
 * @param {goog.ui.Menu=} opt_menu Menu to render under the button when clicked;
 *     should contain at least one {@link goog.ui.ColorPalette} if present.
 * @param {goog.ui.MenuButtonRenderer=} opt_renderer Button renderer;
 *     defaults to {@link goog.ui.ColorMenuButtonRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {goog.ui.ColorMenuButton}
 * @suppress {checkTypes} chartEditor.ui.control.colorPicker.Renderer
 */
chartEditor.ui.control.colorPicker.Base = function(opt_content, opt_menu, opt_renderer, opt_domHelper) {
  chartEditor.ui.control.colorPicker.Base.base(this, 'constructor',
      opt_content || '',
      opt_menu,
      opt_renderer || chartEditor.ui.control.colorPicker.Renderer.getInstance(),
      opt_domHelper);

  this.addClassName('anychart-ce-color');

  this.setFocusablePopupMenu(true);

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
goog.inherits(chartEditor.ui.control.colorPicker.Base, goog.ui.ColorMenuButton);


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.control.colorPicker.Base.prototype.allowReset_ = true;


/** @param {boolean} value */
chartEditor.ui.control.colorPicker.Base.prototype.allowReset = function(value) {
  this.allowReset_ = value;
};


/**
 * Opens or closes the menu.  Overrides {@link goog.ui.MenuButton#setOpen} by
 * generating a default color menu on the fly if needed.
 * @param {boolean} open Whether to open or close the menu.
 * @param {goog.events.Event=} opt_e Mousedown event that caused the menu to
 *     be opened.
 * @override
 * @suppress {visibility} this.keyHandler_
 */
chartEditor.ui.control.colorPicker.Base.prototype.setOpen = function(open, opt_e) {
  if (open && this.getItemCount() === 0) {
    var menu = goog.ui.ColorMenuButton.newColorMenu(null, this.getDomHelper());
    this.setMenu(menu);
    // For ESC key support for blur handler (close menu).
    menu.setAllowAutoFocus(false);
    menu.render();

    goog.dom.classlist.add(menu.getElement(), goog.getCssName('anychart-ce-menu-color'));
    // Hack for set check icon (below to don't create inherited class from goog.ui.ColorPalette)
    var colorswatches = menu.getElementsByClass(goog.getCssName('anychart-ce-palette-colorswatch'));
    for (var i = 0; i < colorswatches.length; i++) {
      goog.dom.classlist.addAll(colorswatches[i], ['ac', 'ac-check']);
    }

    var input = new goog.ui.LabelInput('Colorvalue');
    input.render(menu.getElement());
    goog.dom.classlist.add(input.getElement(), goog.getCssName('anychart-ce-label-input'));
    this.colorInput_ = input;
    this.keyHandler_ = new goog.events.KeyHandler(input.getElement());
    this.getHandler().listen(this.keyHandler_,
        goog.events.KeyHandler.EventType.KEY, this.handleColorInputKeyEvent_);
    this.getHandler().listen(input.getElement(), goog.events.EventType.BLUR, this.onColorInputBlur_);

    this.setSelectedColor(/** @type {?string} */ (this.getValue()));

    if (this.allowReset_) {
      var button = new chartEditor.ui.control.button.Base("Reset");
      button.addClassName('anychart-ce-button-reset');
      button.setIcon('ac ac-clear');
      menu.addChildAt(button, 0, true);
      goog.events.listen(button, goog.ui.Component.EventType.ACTION, this.onReset, false, this);
      this.resetButton_ = button;
    }
  }

  chartEditor.ui.control.colorPicker.Base.base(this, 'setOpen', open, opt_e);
};


/**
 * Handles keyboard events from the color input.
 * @param {goog.events.KeyEvent} e Key event to handle.
 * @private
 */
chartEditor.ui.control.colorPicker.Base.prototype.handleColorInputKeyEvent_ = function(e) {
  if (e.keyCode === goog.events.KeyCodes.ENTER) {
    var newRawValue = this.colorInput_.getValue();
    if (goog.color.isValidColor(newRawValue)) {
      var oldValue = this.getValue();
      var newValue = goog.color.parse(newRawValue).hex;
      if (oldValue !== newValue) {
        var caretPosition = goog.dom.selection.getStart(this.colorInput_.getElement());
        this.setSelectedColor(newValue);
        this.onChange_(e);
        goog.dom.selection.setCursorPosition(this.colorInput_.getElement(), caretPosition);
      }
    }
  } else if (e.keyCode === goog.events.KeyCodes.ESC) {
    // Dismiss the menu.
    this.setOpen(false);
    this.getElement().focus();
  }
};


/**
 * Event handler for when the input box looses focus -- reset value.
 * @param {goog.events.BrowserEvent} e The browser event.
 * @private
 */
chartEditor.ui.control.colorPicker.Base.prototype.onColorInputBlur_ = function(e) {
  this.colorInput_.setValue(this.getSelectedColor());
};


/** @override */
chartEditor.ui.control.colorPicker.Base.prototype.setSelectedColor = function(color) {
  this.setValue(color);
  if (this.colorInput_) this.colorInput_.setValue(color);
};


/** @return {chartEditor.model.Base.Key} */
chartEditor.ui.control.colorPicker.Base.prototype.getKey = function() {
  return this.key;
};


/** @param {chartEditor.model.Base.Key} value */
chartEditor.ui.control.colorPicker.Base.prototype.setKey = function(value) {
  this.key = value;
};


/**
 * Removes control's value from model
 */
chartEditor.ui.control.colorPicker.Base.prototype.reset = function() {
  this.editorModel.removeByKey(this.key);
};


/** @override */
chartEditor.ui.control.colorPicker.Base.prototype.enterDocument = function() {
  chartEditor.ui.control.colorPicker.Base.base(this, 'enterDocument');
  goog.dom.classlist.enable(this.getElement(), 'anychart-ce-hidden', this.excluded);
  if (!this.excluded)
    this.getHandler().listen(this, goog.ui.Component.EventType.ACTION, this.onChange_, false);
};


/** @override */
chartEditor.ui.control.colorPicker.Base.prototype.exitDocument = function() {
  this.getHandler().unlisten(this, goog.ui.Component.EventType.ACTION, this.onChange_, false);
  chartEditor.ui.control.colorPicker.Base.base(this, 'exitDocument');
};


/**
 * @param {goog.events.Event} evt
 * @private
 */
chartEditor.ui.control.colorPicker.Base.prototype.onChange_ = function(evt) {
  evt.stopPropagation();
  if (this.excluded) return;

  if (!this.noDispatch && this.editorModel) {
    var value = this.getSelectedColor();
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
chartEditor.ui.control.colorPicker.Base.prototype.init = function(model, key, opt_callback, opt_rebuildChart) {
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
chartEditor.ui.control.colorPicker.Base.prototype.setValueByTarget = function(target) {
  if (this.excluded) return;

  this.target = target;

  var stringKey = chartEditor.model.Base.getStringKey(this.key);
  var value = /** @type {string} */(chartEditor.binding.exec(this.target, stringKey));
  if (goog.isObject(value))
    value = value['color'];

  this.noDispatch = true;
  this.setSelectedColor(value);
  this.noDispatch = false;
};


/**
 * Hide or show control by assigning 'hidden' class
 * @param {boolean} value True if excluded.
 */
chartEditor.ui.control.colorPicker.Base.prototype.exclude = function(value) {
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
chartEditor.ui.control.colorPicker.Base.prototype.isExcluded = function() {
  return this.excluded;
};


/**
 * @public
 */
chartEditor.ui.control.colorPicker.Base.prototype.updateExclusion = function() {
  if (!this.key || !this.key.length || !this.editorModel) return;

  var stringKey = this.editorModel.getStringKey(this.key);
  this.exclude(this.editorModel.checkSettingForExclusion(stringKey));
};


/** @protected */
chartEditor.ui.control.colorPicker.Base.prototype.onReset = function() {
  this.setValue(null);
  this.editorModel.removeByKey(this.getKey());
};


/** @override */
chartEditor.ui.control.colorPicker.Base.prototype.disposeInternal = function() {
  goog.dispose(this.resetButton_);
  this.resetButton_ = null;

  chartEditor.ui.control.colorPicker.Base.base(this, 'disposeInternal');
};