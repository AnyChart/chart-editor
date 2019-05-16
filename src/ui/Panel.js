goog.provide('chartEditor.ui.Panel');

goog.require('chartEditor.ui.ComponentWithKey');
goog.require('chartEditor.ui.control.button.Base');
goog.require('chartEditor.ui.control.checkbox.Base');



/**
 * @param {chartEditor.model.Base} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.ComponentWithKey}
 */
chartEditor.ui.Panel = function(model, opt_name, opt_domHelper) {
  chartEditor.ui.Panel.base(this, 'constructor', model, opt_domHelper);

  /**
   * @type {?string|undefined}
   * @protected
   */
  this.name = goog.isDef(opt_name) ? opt_name : 'Settings panel';

  /**
   * String id for excludes.
   * @type {string}
   * @protected
   */
  this.stringId = 'panel';


  /**
   * @type {boolean}
   * @protected
   */
  this.enabled = true;

  /**
   * @type {boolean}
   * @protected
   */
  this.enabledContent = true;


  /**
   * @type {Array.<chartEditor.ui.Panel|
   *   chartEditor.ui.control.wrapped.Base|
   *   chartEditor.ui.control.checkbox.Base|
   *   chartEditor.ui.control.select.Base|
   *   chartEditor.ui.control.comboBox.Base|
   *   chartEditor.ui.control.colorPicker.Base|
   *   chartEditor.ui.control.input.Base|
   *   chartEditor.ui.control.button.Toggle
   * >}
   * @private
   */
  this.childControls_ = [];


  /**
   * List of keys of child controls to hide.
   * @type {Array.<string>}
   * @protected
   */
  this.skippedSettings = [];

  /**
   * @type {Array.<Element>}
   * @protected
   */
  this.labels = [];


  /**
   * Index for nested class
   * @type {number}
   */
  this.cssNestedIndex = 0;


  /**
   * Flags to set fields shown or not
   * @type {Object}
   */
  this.options = {
    'enabled': true,
    'reset': false,
    'remove': false
  };

  this.addClassName(goog.getCssName('anychart-ce-panel'));
};
goog.inherits(chartEditor.ui.Panel, chartEditor.ui.ComponentWithKey);



/**
 * Enable/disable option. Should be called before createDom() call.
 *
 * @param {string} name
 * @param {boolean} state
 * @return {chartEditor.ui.Panel}
 * */
chartEditor.ui.Panel.prototype.setOption = function(name, state) {
  this.options[name] = state;
  return this;
};


/**
 * Show passed field in DOM.
 * @param {string} name
 * @return {boolean}
 */
chartEditor.ui.Panel.prototype.getOption = function(name) {
  return Boolean(this.options[name]);
};



/**
 * @return {boolean} Whether the title panel is enabled.
 */
chartEditor.ui.Panel.prototype.isEnabled = function() {
  return this.enabled;
};


/** @return {string} */
chartEditor.ui.Panel.prototype.getStringId = function() {
  return this.stringId;
};


/**
 * @return {?string|undefined}
 */
chartEditor.ui.Panel.prototype.getName = function() {
  return this.name;
};


/** @param {?string} value */
chartEditor.ui.Panel.prototype.setName = function(value) {
  this.name = value;
};


/** @param {number} value */
chartEditor.ui.Panel.prototype.setCssNestedIndex = function(value) {
  this.cssNestedIndex = value;
};


/**
 * @param {chartEditor.model.Base.Key=} opt_key
 * @return {chartEditor.model.Base.Key|chartEditor.ui.Panel}
 */
chartEditor.ui.Panel.prototype.enabledKey = function(opt_key) {
  if (goog.isDef(opt_key)) {
    this.enabledKey_ = opt_key;
    return this;
  }
  return this.enabledKey_;
};


/** @param {boolean} value */
chartEditor.ui.Panel.prototype.allowEnabled = function(value) {
  this.setOption('enabled', value);
};


/**
 * @param {boolean=} opt_value
 *
 * @return {boolean|chartEditor.ui.Panel}
 */
chartEditor.ui.Panel.prototype.allowReset = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.setOption('reset', opt_value);
    return this;
  }

  return this.getOption('reset');
};


/**
 * @param {boolean=} opt_value
 * @return {boolean|chartEditor.ui.Panel}
 */
chartEditor.ui.Panel.prototype.allowRemove = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.setOption('remove', opt_value);
    if (this.removeButton)
      goog.style.setElementShown(this.removeButton, this.getOption('remove'));

    return this;
  }
  return this.getOption('remove');
};


/** @inheritDoc */
chartEditor.ui.Panel.prototype.createDom = function() {
  chartEditor.ui.Panel.base(this, 'createDom');

  var element = /** @type {Element} */(this.getElement());
  goog.dom.classlist.add(element, 'anychart-ce-panel-nested-' + this.cssNestedIndex);

  var dom = this.getDomHelper();
  this.topEl = dom.createDom(goog.dom.TagName.DIV, 'top');
  element.appendChild(this.topEl);

  if (this.name) {
    this.topEl.appendChild(dom.createDom(goog.dom.TagName.DIV, 'title', this.name));
  } else
    goog.dom.classlist.add(element, 'anychart-ce-panel-no-title');

  if (this.getOption('reset')) {
    var button = new chartEditor.ui.control.button.Base();
    button.setIcon('ac ac-clear');
    button.addClassName('anychart-ce-button-reset');
    this.addChild(button, true);
    this.topEl.appendChild(button.getElement());

    goog.events.listen(button, goog.ui.Component.EventType.ACTION, this.onReset, false, this);
    this.resetButton_ = button;
  }

  if (this.getOption('remove')) {
    var removeBtn = dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-panel-remove-btn', '');
    goog.dom.appendChild(this.topEl, removeBtn);
    this.removeButton = removeBtn;
  }

  if (this.canBeEnabled()) {
    var enableContentCheckbox = new chartEditor.ui.control.checkbox.Base();
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
    if (!this.enabledKey_) this.enabledKey(this.genKey('enabled()'));
    enableContentCheckbox.init(model, this.enabledKey_, void 0, true); // Should redraw chart for calling setContentEnabled method
    this.addChild(enableContentCheckbox, true);

    this.enableContentCheckbox = enableContentCheckbox;
    this.topEl.appendChild(this.enableContentCheckbox ? this.enableContentCheckbox.getElement() : null);
  } else
    goog.dom.classlist.add(element, 'anychart-ce-panel-no-checkbox');

  var noTop = !this.name && !this.getOption('remove') && !this.enableContentCheckbox;
  if (noTop)
    goog.dom.classlist.add(element, 'anychart-ce-panel-no-top');

  this.contentEl = dom.createDom(goog.dom.TagName.DIV, 'content');
  element.appendChild(this.contentEl);
};


/**
 * Returns the DOM element of tom bar.
 * @return {Element}
 */
chartEditor.ui.Panel.prototype.getTopElement = function() {
  return this.topEl;
};


/** @inheritDoc */
chartEditor.ui.Panel.prototype.getContentElement = function() {
  return this.contentEl;
};


/** @inheritDoc */
chartEditor.ui.Panel.prototype.enterDocument = function() {
  chartEditor.ui.Panel.base(this, 'enterDocument');

  if (this.isExcluded()) return;

  this.updateKeys();
  this.setEnabled(this.enabled);

  if (this.removeButton)
    goog.events.listen(this.removeButton, goog.events.EventType.CLICK, this.onRemoveAction, false, this);
};


/** @override */
chartEditor.ui.Panel.prototype.exitDocument = function() {
  if (this.removeButton)
    goog.events.unlisten(this.removeButton, goog.events.EventType.CLICK, this.onRemoveAction, false, this);
  chartEditor.ui.Panel.base(this, 'exitDocument');
};


/**
 * @param {Object} evt
 * @protected
 */
chartEditor.ui.Panel.prototype.onRemoveAction = function(evt) {
  this.dispatchEvent({
    type: chartEditor.events.EventType.PANEL_CLOSE
  });
};


/** @inheritDoc */
chartEditor.ui.Panel.prototype.onModelChange = function(evt) {
  if (!this.isExcluded()) {
    chartEditor.ui.Panel.base(this, 'onModelChange', evt);
  }
};


/** @inheritDoc */
chartEditor.ui.Panel.prototype.onChartDraw = function(evt) {
  chartEditor.ui.Panel.base(this, 'onChartDraw', evt);

  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
    var target;
    if (this.key[0] && this.key[0][0] == 'standalones') {
      var key = [this.key[0], this.key[1], 'instance'];
      target = model.getValue(key);
    } else
      target = evt.chart;

    if (target) {
      if (this.enableContentCheckbox && this.canBeEnabled()) {
        this.enableContentCheckbox.setValueByTarget(target);
        this.setContentEnabled(this.enableContentCheckbox.isChecked());
      }

      var modelUpdated = false;
      for (var i = 0; i < this.childControls_.length; i++) {
        var control = this.childControls_[i];
        if (control && !goog.isFunction(control.addChildControl)) {
          modelUpdated = control.setValueByTarget(target) || modelUpdated;
        }
      }
      if (modelUpdated) {
        evt.stopPropagation();
        evt.preventDefault();
        model.removeAllListeners(chartEditor.events.EventType.CHART_DRAW);
        model.dispatchUpdate('Panel.onChartDraw');
      }
    }
  }
};


/**
 * @param {Object} evt
 */
chartEditor.ui.Panel.prototype.onReset = function(evt) {
  this.reset();
};


/**
 * Removes control's value from model
 */
chartEditor.ui.Panel.prototype.reset = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  model.suspendDispatch();

  model.removeByKey(this.getKey());

  if (this.enableContentCheckbox)
    model.removeByKey(this.enableContentCheckbox.getKey());

  for (var i = 0; i < this.childControls_.length; i++) {
    var control = this.childControls_[i];
    if (control && goog.isFunction(control.reset)) {
      control.reset();
    }
  }

  model.resumeDispatch(true);
};


/**
 * Checks if this panel can be enabled/disabled.
 * If panel can be enabled, the this.key property of panel should contain '*.enable()' key.
 *
 * @return {boolean}
 */
chartEditor.ui.Panel.prototype.canBeEnabled = function() {
  return this.getOption('enabled') && Boolean(this.key.length);
};


/**
 * Enables/Disables the all group controls.
 * @param {boolean} enabled Whether to enable (true) or disable (false) the
 *     all group controls.
 * @protected
 */
chartEditor.ui.Panel.prototype.setEnabled = function(enabled) {
  this.enabled = enabled;
  if (!this.canBeEnabled())
    this.enabledContent = this.enabled;

  if (this.isInDocument())
    this.setContentEnabled(this.enabledContent);

  // this hack should exist to make child.setEnabled() working
  var tmp = this.enabled;
  this.enabled = true;

  if (this.resetButton_)
    this.resetButton_.setEnabled(enabled);

  if (this.enableContentCheckbox)
    this.enableContentCheckbox.setEnabled(enabled);

  // end of hack
  this.enabled = tmp;
};


/**
 * Enables/Disables the group content controls. Override this to disable labels etc.
 * @param {boolean} enabled Whether to enable (true) or disable (false) the
 *     group content controls.
 * @protected
 */
chartEditor.ui.Panel.prototype.setContentEnabled = function(enabled) {
  this.enabledContent = this.enabled && enabled;

  // this hack should exist to make child.setEnabled() working
  var tmp = this.enabled;
  this.enabled = true;

  for (var i = 0, count = this.childControls_.length; i < count; i++) {
    var child = this.childControls_[i];
    if (goog.isFunction(child.setEnabled))
      child.setEnabled(this.enabledContent);
  }

  // end of hack
  this.enabled = tmp;

  for (var j = 0; j < this.labels.length; j++) {
    goog.dom.classlist.enable(
        goog.asserts.assert(this.labels[j]),
        goog.getCssName('anychart-ce-control-disabled'), !this.enabledContent);
  }

  if (this.topEl) {
    goog.dom.classlist.enable(
        goog.asserts.assert(this.topEl),
        goog.getCssName('anychart-ce-control-disabled'), !this.enabled);
  }
};


/** @inheritDoc */
chartEditor.ui.Panel.prototype.setKey = function(key) {
  chartEditor.ui.Panel.base(this, 'setKey', key);

  if (this.enableContentCheckbox) {
    if (!this.enabledKey_) this.enabledKey(this.genKey('enabled()'));
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
    this.enableContentCheckbox.init(model, this.enabledKey_);
  }
};


/**
 * Update model keys.
 * todo: find out if this method is necessary
 */
chartEditor.ui.Panel.prototype.updateKeys = function() {
  //if (this.isExcluded()) return;
};


/** @inheritDoc */
chartEditor.ui.Panel.prototype.exclude = function(value) {
  var dirty = this.excluded !== value;
  chartEditor.ui.Panel.base(this, 'exclude', value);
  if (dirty) this.updateKeys();
};


/**
 * Registers label to disable and dispose
 * @param {?Element} labelElement
 */
chartEditor.ui.Panel.prototype.registerLabel = function(labelElement) {
  if (!labelElement) return;
  this.labels.push(labelElement);
};


/**
 * @param {chartEditor.ui.Panel|
 * chartEditor.ui.control.wrapped.Base|
 * chartEditor.ui.control.checkbox.Base|
 * chartEditor.ui.control.select.Base|
 * chartEditor.ui.control.comboBox.Base|
 * chartEditor.ui.control.colorPicker.Base|
 * chartEditor.ui.control.input.Base|
 * chartEditor.ui.control.button.Toggle
 * } control
 * @param {number=} opt_index
 * @return {boolean} true if control was added.
 */
chartEditor.ui.Panel.prototype.addChildControl = function(control, opt_index) {
  var addControl = !this.skippedSettings.length;
  
  if (this.skippedSettings.length) {
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
    var controlKey = model.getStringKey(control.getKey(), true);
    addControl = goog.array.indexOf(this.skippedSettings, controlKey) === -1;
  }
  
  if (addControl) {
    this.childControls_.push(control);
    opt_index = goog.isDef(opt_index) ? opt_index : this.getChildCount();
    if (goog.isFunction(control.setCssNestedIndex))
      control.setCssNestedIndex(this.cssNestedIndex + 1);
    this.addChildAt(control, opt_index, true);
  }

  return addControl;
};


/** @protected */
chartEditor.ui.Panel.prototype.addContentSeparator = function() {
  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-panel-item-separator-gaps')));
};


/**
 * Add control keys that should be skipped.
 * @param {string|Array.<string>} value Keys to skip.
 */
chartEditor.ui.Panel.prototype.skipSettings = function(value) {
  value = goog.isArray(value) ? value : [value];
  this.skippedSettings = goog.array.concat(this.skippedSettings, value);
};


/**
 * Adds description div element to the dom element of this panel
 * @param {Element} value
 */
chartEditor.ui.Panel.prototype.addDescription = function(value) {
  var descriptionEl = goog.dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-ce-panel-description',
      value);

  goog.dom.appendChild(this.getElement(), descriptionEl);
  
  var icon = goog.dom.createDom('i', 'ac ac-book');
  goog.dom.insertChildAt(descriptionEl, icon, 0);
};


/** @override */
chartEditor.ui.Panel.prototype.disposeInternal = function() {
  goog.disposeAll(this.childControls_, this.resetButton_);
  this.childControls_.length = 0;
  this.resetButton_ = null;

  this.labels.length = 0;

  chartEditor.ui.Panel.base(this, 'disposeInternal');
};

