goog.provide('chartEditor.ui.dataSets.edit.Input');

goog.require('chartEditor.events');
goog.require('goog.Timer');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyHandler');
goog.require('goog.string');
goog.require('goog.style');
goog.require('goog.ui.LabelInput');



/**
 * Edit input.
 * @param {boolean=} opt_headerMode - TODO (A.Kudryavtsev): Descr.
 * @constructor
 * @extends {goog.ui.LabelInput}
 */
chartEditor.ui.dataSets.edit.Input = function(opt_headerMode) {
  chartEditor.ui.dataSets.edit.Input.base(this, 'constructor');

  /**
   * Flag whether input is used as key modifier.
   * Has behaviour that differs from regular input mode.
   * @type {boolean}
   * @private
   */
  this.isHeaderMode_ = !!opt_headerMode;

  /**
   *
   * @type {chartEditor.ui.dataSets.edit.ColumnsController}
   * @private
   */
  this.controller_ = null;

  /**
   * Target where to show input.
   * @type {Element}
   * @private
   */
  this.target_ = null;

  /**
   * Text taken from target.
   * @type {string}
   * @private
   */
  this.targetValueBackup_ = '';

  /**
   * Column index to deal with this.controller_;
   * @type {number}
   */
  this.columnIndex = NaN;

  /**
   * Target row.
   * @type {number}
   * @private
   */
  this.rowIndex_ = NaN;

  /**
   * Message tooltip.
   * @type {goog.ui.Tooltip}
   * @private
   */
  this.tooltip_ = null;
};
goog.inherits(chartEditor.ui.dataSets.edit.Input, goog.ui.LabelInput);


/** @override */
chartEditor.ui.dataSets.edit.Input.prototype.createDom = function() {
  chartEditor.ui.dataSets.edit.Input.base(this, 'createDom');

  var element = this.getElement();
  goog.dom.classlist.add(element, 'anychart-ce-input');
  goog.dom.classlist.add(element, 'anychart-ce-edit-key-input');

  this.keyHandler_ = new goog.events.KeyHandler(this.getElement());

  goog.events.listen(this.keyHandler_, goog.events.KeyHandler.EventType.KEY, this.keyPressHandler_, false, this);

  var handler = this.getHandler();
  handler.listen(this.getElement(), goog.events.EventType.FOCUS, this.focusHandler_);
  handler.listen(this.getElement(), goog.events.EventType.BLUR, this.blurHandler_);
};


/**
 * Sets column controller.
 * @param {chartEditor.ui.dataSets.edit.ColumnsController} controller - .
 */
chartEditor.ui.dataSets.edit.Input.prototype.setColumnsController = function(controller) {
  this.controller_ = controller;
};


/**
 * Whether input is in header mode.
 * @return {boolean}
 */
chartEditor.ui.dataSets.edit.Input.prototype.isHeaderMode = function() {
  return this.isHeaderMode_;
};


/**
 * Shows input. Has the different behaviour depending on whether this.isHeaderMode_ is set.
 * @param {Element|string} targetOrValue - Target element or value to set.
 *  If this.isHeaderMode_ is true, targetOrValue should be a string that will be set as input value.
 *  Otherwise, targetOrValue must be the TD-element that input belongs to.
 */
chartEditor.ui.dataSets.edit.Input.prototype.show = function(targetOrValue) {
  var element = this.getElement();
  if (element) {
    if (this.isHeaderMode_ && goog.isString(targetOrValue)) {
      this.setValue(targetOrValue);
    } else if (goog.dom.isElement(targetOrValue)) {
      this.target_ = /** @type {Element} */ (targetOrValue);
      this.targetValueBackup_ = targetOrValue.textContent;
      targetOrValue.textContent = '';

      this.columnIndex = +(targetOrValue.getAttribute('ac-edit-column'));
      this.rowIndex_ = +(targetOrValue.getAttribute('ac-edit-row'));
      this.setValue(this.targetValueBackup_);

      goog.style.setElementShown(element, true);
      targetOrValue.appendChild(element);
      this.focusAndSelect();
    }
  }
};


/**
 * Hides input element.
 */
chartEditor.ui.dataSets.edit.Input.prototype.hide = function() {
  if (!this.isHeaderMode_) {
    var element = this.getElement();
    if (element) {
      goog.style.setElementShown(element, false);
    }
    this.showError(false);
    this.hasInputError_ = false;
  }
};


/**
 * Key press handler.
 * @param {goog.events.BrowserEvent} e - Browser event.
 * @private
 */
chartEditor.ui.dataSets.edit.Input.prototype.keyPressHandler_ = function(e) {
  this.lastKeyCode_ = e.keyCode;
  if (e.keyCode == goog.events.KeyCodes.TAB) {
    e.preventDefault();
    this.getElement().blur(); //This will dispatch blurHandler_.
  } else if (e.keyCode == goog.events.KeyCodes.ENTER) {
    this.getElement().blur(); //This will dispatch blurHandler_.
  } else if (e.keyCode == goog.events.KeyCodes.ESC) {
    this.revert_();
  } else {
    goog.Timer.callOnce(this.processValue_, 10, this);
  }
};


/**
 * Decorates input if current value contains some incorrect value not suitable to input type.
 * @param {boolean=} opt_forceValue - .
 */
chartEditor.ui.dataSets.edit.Input.prototype.showError = function(opt_forceValue) {
  var val = goog.isDef(opt_forceValue) ? opt_forceValue : this.hasInputError_;
  goog.dom.classlist.enable(this.getElement(), 'anychart-ce-edit-key-input-error', val);
};


/**
 * On key event browser still has not processed an inserted key.
 *  SAMPLE: input contains text 'My Text'.
 *          User presses '1'-button.
 *          User expects this.getValue() to return 'My Text1',
 *          but doesn't get it.
 * That's why we just let the browser to complete settings the value.
 * @private
 * @return {string}
 */
chartEditor.ui.dataSets.edit.Input.prototype.processValue_ = function() {
  var value = this.getValue();
  var testVal;
  if (this.isHeaderMode_) {
    testVal = value;
    this.hasInputError_ = goog.string.isEmptyOrWhitespace(value);
  } else {
    var column = this.controller_.getColumnData(this.columnIndex);
    var type = column.type;

    /*
        TODO (A.Kudryavtsev):
        TODO (A.Kudryavtsev):
        TODO (A.Kudryavtsev):
        Empty string should be treated as missing!!! Process it a bit later!
    */

    if (type == chartEditor.ui.dataSets.edit.ColumnsController.DataType.NUMBER) {
      testVal = /** @type {number} */ (parseFloat(value));
      if (isNaN(testVal)) {
        if (goog.string.isEmptyOrWhitespace(value)) {
          testVal = '';
          this.hasInputError_ = false;
        } else {
          this.hasInputError_ = true;
        }
      } else {
        this.hasInputError_ = false;
      }
    } else {
      testVal = value;
      this.hasInputError_ = false;
    }
  }
  this.showError();
  return String(testVal);
};


/**
 * Dispatches data submit event.
 */
chartEditor.ui.dataSets.edit.Input.prototype.dispatchSubmit = function() {
  var processed = this.processValue_();
  if (this.hasInputError_) {
    this.revert_();
  } else {
    if (this.isHeaderMode_)
      this.setValue(processed);
    else
      this.target_.textContent = processed;

    this.hide();

    //We don't need to prevent default for a while;
    this.dispatchEvent({
      'type': chartEditor.events.EventType.EDIT_DATA_SUBMIT,
      'columnIndex': this.columnIndex,
      'rowIndex': this.rowIndex_,
      'value': this.getValue(),
      'targetRow': this.target_,
      'lastKeyCode': this.lastKeyCode_,
      'oldValue': this.targetValueBackup_
    });
    this.lastKeyCode_ = void 0;
  }
};


/**
 * Reverts changes and hides input.
 * @private
 */
chartEditor.ui.dataSets.edit.Input.prototype.revert_ = function() {
  if (this.isHeaderMode_) {
    this.setValue(this.targetValueBackup_);
    this.getElement().blur();
  } else {
    this.target_.textContent = this.targetValueBackup_;
    this.hide();
  }
};


/**
 * Focus handler.
 * @param {goog.events.BrowserEvent} e - Browser event.
 * @private
 */
chartEditor.ui.dataSets.edit.Input.prototype.focusHandler_ = function(e) {
  //TODO (A.Kudryavtsev): Do we need it?
  if (this.isHeaderMode_) {
    this.processValue_();
    this.targetValueBackup_ = this.getValue();
  }
};


/**
 * Blur handler.
 * @param {goog.events.BrowserEvent} e - Browser event.
 * @private
 */
chartEditor.ui.dataSets.edit.Input.prototype.blurHandler_ = function(e) {
  if (this.lastKeyCode_ != goog.events.KeyCodes.ESC)
    this.dispatchSubmit();
};


/**
 * @inheritDoc
 */
chartEditor.ui.dataSets.edit.Input.prototype.disposeInternal = function() {
  var handler = this.getHandler();
  goog.events.unlisten(this.keyHandler_, goog.events.KeyHandler.EventType.KEY, this.keyPressHandler_, false, this);
  handler.unlisten(this.getElement(), goog.events.EventType.FOCUS, this.focusHandler_);
  handler.unlisten(this.getElement(), goog.events.EventType.BLUR, this.blurHandler_);

  goog.dispose(this.keyHandler_);
  chartEditor.ui.dataSets.edit.Input.base(this, 'disposeInternal');

};
