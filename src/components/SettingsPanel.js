goog.provide('anychart.chartEditorModule.SettingsPanel');

goog.require('anychart.chartEditorModule.ComponentWithKey');
goog.require('anychart.chartEditorModule.checkbox.Base');
goog.require('anychart.ui.button.Base');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.ComponentWithKey}
 */
anychart.chartEditorModule.SettingsPanel = function(model, opt_name, opt_domHelper) {
  anychart.chartEditorModule.SettingsPanel.base(this, 'constructor', model, opt_domHelper);

  /**
   * @type {?string|undefined}
   * @protected
   */
  this.name = goog.isDef(opt_name) ? opt_name : 'Settings Panel';

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
   * @type {boolean}
   */
  this.allowRemove_ = false;

  /**
   * @type {Array.<anychart.chartEditorModule.SettingsPanel|anychart.chartEditorModule.controls.LabeledControl|anychart.chartEditorModule.checkbox.Base|anychart.chartEditorModule.controls.select.Base|anychart.chartEditorModule.comboBox.Base|anychart.chartEditorModule.colorPicker.Base|anychart.chartEditorModule.input.Base>}
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

  this.addClassName(goog.getCssName('anychart-settings-panel'));
};
goog.inherits(anychart.chartEditorModule.SettingsPanel, anychart.chartEditorModule.ComponentWithKey);


/**
 * @return {boolean} Whether the title settings is enabled.
 */
anychart.chartEditorModule.SettingsPanel.prototype.isEnabled = function() {
  return this.enabled;
};


/** @return {string} */
anychart.chartEditorModule.SettingsPanel.prototype.getStringId = function() {
  return this.stringId;
};


/**
 * @return {?string|undefined}
 */
anychart.chartEditorModule.SettingsPanel.prototype.getName = function() {
  return this.name;
};


/** @param {?string} value */
anychart.chartEditorModule.SettingsPanel.prototype.setName = function(value) {
  this.name = value;
};


/**
 * @param {anychart.chartEditorModule.EditorModel.Key=} opt_key
 * @return {anychart.chartEditorModule.EditorModel.Key|anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.SettingsPanel.prototype.enabledKey = function(opt_key) {
  if (goog.isDef(opt_key)) {
    this.enabledKey_ = opt_key;
    return this;
  }
  return this.enabledKey_;
};


/**
 * @type {boolean}
 * @private
 */
anychart.chartEditorModule.SettingsPanel.prototype.allowEnabled_ = true;


/** @param {boolean} value */
anychart.chartEditorModule.SettingsPanel.prototype.allowEnabled = function(value) {
  this.allowEnabled_ = value;
};


/** @param {boolean} value */
anychart.chartEditorModule.SettingsPanel.prototype.allowRemove = function(value) {
  this.allowRemove_ = value;
  if (this.removeButton) {
    goog.style.setElementShown(this.removeButton, this.allowRemove_);
  }
};


/**
 * Container for enabled button.
 * @type {Element}
 * @private
 */
anychart.chartEditorModule.SettingsPanel.prototype.enabledButtonContainer_ = null;


/**
 * Set container for enabled button.
 * @param {Element} enabledButtonContainer
 */
anychart.chartEditorModule.SettingsPanel.prototype.setEnabledButtonContainer = function(enabledButtonContainer) {
  this.enabledButtonContainer_ = enabledButtonContainer;
};


/** @inheritDoc */
anychart.chartEditorModule.SettingsPanel.prototype.createDom = function() {
  anychart.chartEditorModule.SettingsPanel.base(this, 'createDom');

  var element = /** @type {Element} */(this.getElement());

  var dom = this.getDomHelper();
  this.topEl = dom.createDom(goog.dom.TagName.DIV, 'top');
  element.appendChild(this.topEl);

  if (this.name) {
    this.topEl.appendChild(dom.createDom(goog.dom.TagName.DIV, 'title', this.name));
  } else
    goog.dom.classlist.add(element, 'anychart-settings-panel-no-title');

  if (this.allowRemove_) {
    var removeBtn = dom.createDom(goog.dom.TagName.DIV, 'anychart-settings-panel-remove-btn', '');
    goog.dom.appendChild(this.topEl, removeBtn);
    this.removeButton = removeBtn;
  }

  if (this.canBeEnabled()) {
    var enableContentCheckbox = new anychart.chartEditorModule.checkbox.Base();
    var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
    if (!this.enabledKey_) this.enabledKey(this.genKey('enabled()'));
    enableContentCheckbox.init(model, this.enabledKey_);

    if (this.enabledButtonContainer_) {
      enableContentCheckbox.render(this.enabledButtonContainer_);
      enableContentCheckbox.setParent(this);
    } else {
      this.addChild(enableContentCheckbox, true);
    }
    this.enableContentCheckbox = enableContentCheckbox;
    this.topEl.appendChild(this.enableContentCheckbox && !this.enabledButtonContainer_ ? this.enableContentCheckbox.getElement() : null);
  } else
    goog.dom.classlist.add(element, 'anychart-settings-panel-no-checkbox');

  var noTop = !this.name && !this.allowRemove_ && !(this.enableContentCheckbox && !this.enabledButtonContainer_);
  if (noTop)
    goog.dom.classlist.add(element, 'anychart-settings-panel-no-top');

  this.contentEl = dom.createDom(goog.dom.TagName.DIV, 'content');
  element.appendChild(this.contentEl);
};


/**
 * Returns the DOM element of tom bar.
 * @return {Element}
 */
anychart.chartEditorModule.SettingsPanel.prototype.getTopElement = function() {
  return this.topEl;
};


/** @inheritDoc */
anychart.chartEditorModule.SettingsPanel.prototype.getContentElement = function() {
  return this.contentEl;
};


/** @inheritDoc */
anychart.chartEditorModule.SettingsPanel.prototype.enterDocument = function() {
  anychart.chartEditorModule.SettingsPanel.base(this, 'enterDocument');

  if (this.isExcluded()) return;

  this.updateKeys();
  this.setEnabled(this.enabled);

  if (this.removeButton)
    goog.events.listen(this.removeButton, goog.events.EventType.CLICK, this.onRemoveAction, false, this);
};


/** @override */
anychart.chartEditorModule.SettingsPanel.prototype.exitDocument = function() {
  if (this.removeButton)
    goog.events.unlisten(this.removeButton, goog.events.EventType.CLICK, this.onRemoveAction, false, this);
  anychart.chartEditorModule.SettingsPanel.base(this, 'exitDocument');
};


/**
 * @param {Object} evt
 * @protected
 */
anychart.chartEditorModule.SettingsPanel.prototype.onRemoveAction = function(evt) {
  this.dispatchEvent({
    type: anychart.chartEditorModule.events.EventType.PANEL_CLOSE
  });
};


/** @inheritDoc */
anychart.chartEditorModule.SettingsPanel.prototype.onModelChange = function(evt) {
  if (!this.isExcluded()) {
    anychart.chartEditorModule.SettingsPanel.base(this, 'onModelChange', evt);
  }
};


/** @inheritDoc */
anychart.chartEditorModule.SettingsPanel.prototype.onChartDraw = function(evt) {
  anychart.chartEditorModule.SettingsPanel.base(this, 'onChartDraw', evt);

  if (!this.isExcluded()) {
    if (evt.rebuild && this.enableContentCheckbox && this.canBeEnabled()) {
      this.enableContentCheckbox.setValueByTarget(evt.chart);
      this.setContentEnabled(this.enableContentCheckbox.isChecked());
    }

    for (var i = 0; i < this.childControls_.length; i++) {
      var control = this.childControls_[i];
      if (control && !goog.isFunction(control.addChildControl)) control.setValueByTarget(evt.chart);
    }
  }
};


/**
 * Checks if this panel can be enabled/disabled.
 * If panel can be enabled, the this.key property of panel should contain '*.enable()' key.
 *
 * @return {boolean}
 */
anychart.chartEditorModule.SettingsPanel.prototype.canBeEnabled = function() {
  return this.allowEnabled_ && Boolean(this.key.length);
};


/**
 * Enables/Disables the all group controls.
 * @param {boolean} enabled Whether to enable (true) or disable (false) the
 *     all group controls.
 * @protected
 */
anychart.chartEditorModule.SettingsPanel.prototype.setEnabled = function(enabled) {
  this.enabled = enabled;
  if (!this.canBeEnabled())
    this.enabledContent = this.enabled;

  if (this.isInDocument())
    this.setContentEnabled(this.enabledContent);

  if (this.enableContentCheckbox)
    this.enableContentCheckbox.setEnabled(enabled);
};


/**
 * Enables/Disables the group content controls. Override this to disable labels etc.
 * @param {boolean} enabled Whether to enable (true) or disable (false) the
 *     group content controls.
 * @protected
 */
anychart.chartEditorModule.SettingsPanel.prototype.setContentEnabled = function(enabled) {
  this.enabledContent = this.enabled && enabled;

  // this should be to get child.setEnabled() working
  var tmp = this.enabled;
  this.enabled = true;
  for (var i = 0, count = this.getChildCount(); i < count; i++) {
    var child = this.getChildAt(i);
    if (goog.isFunction(child.setEnabled))
      child.setEnabled(this.enabledContent);
  }
  this.enabled = tmp;

  for (var j = 0; j < this.labels.length; j++) {
    goog.dom.classlist.enable(
        goog.asserts.assert(this.labels[j]),
        goog.getCssName('anychart-control-disabled'), !this.enabledContent);
  }

  if (this.topEl) {
    goog.dom.classlist.enable(
        goog.asserts.assert(this.topEl),
        goog.getCssName('anychart-control-disabled'), !this.enabled);
  }

  if (this.enableContentCheckbox)
    this.enableContentCheckbox.setEnabled(this.enabled);
};


/** @inheritDoc */
anychart.chartEditorModule.SettingsPanel.prototype.setKey = function(key) {
  anychart.chartEditorModule.SettingsPanel.base(this, 'setKey', key);

  if (this.enableContentCheckbox) {
    if (!this.enabledKey_) this.enabledKey(this.genKey('enabled()'));
    var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
    this.enableContentCheckbox.init(model, this.enabledKey_);
  }
};


/**
 * Update model keys.
 * todo: find out if this method is necessary
 */
anychart.chartEditorModule.SettingsPanel.prototype.updateKeys = function() {
  //if (this.isExcluded()) return;
};


/** @inheritDoc */
anychart.chartEditorModule.SettingsPanel.prototype.exclude = function(value) {
  var dirty = this.excluded !== value;
  anychart.chartEditorModule.SettingsPanel.base(this, 'exclude', value);
  if (dirty) this.updateKeys();
};


/**
 * Registers label to disable and dispose
 * @param {?Element} labelElement
 */
anychart.chartEditorModule.SettingsPanel.prototype.registerLabel = function(labelElement) {
  if (!labelElement) return;
  this.labels.push(labelElement);
};


/**
 * @param {anychart.chartEditorModule.SettingsPanel|anychart.chartEditorModule.controls.LabeledControl|anychart.chartEditorModule.checkbox.Base|anychart.chartEditorModule.controls.select.Base|anychart.chartEditorModule.comboBox.Base|anychart.chartEditorModule.colorPicker.Base|anychart.chartEditorModule.input.Base} control
 * @param {number=} opt_index
 * @return {boolean} true if control was added.
 */
anychart.chartEditorModule.SettingsPanel.prototype.addChildControl = function(control, opt_index) {
  var addControl = !this.skippedSettings.length;
  
  if (this.skippedSettings.length) {
    var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
    var controlKey = model.getStringKey(control.getKey(), true);
    addControl = goog.array.indexOf(this.skippedSettings, controlKey) === -1;
  }
  
  if (addControl) {
    this.childControls_.push(control);
    opt_index = goog.isDef(opt_index) ? opt_index : this.getChildCount();
    this.addChildAt(control, opt_index, true);
  }

  return addControl;
};


/** @protected */
anychart.chartEditorModule.SettingsPanel.prototype.addContentSeparator = function() {
  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-chart-editor-settings-item-separator-gaps')));
};


/**
 * Add control keys that should be skipped.
 * @param {string|Array.<string>} value Keys to skip.
 */
anychart.chartEditorModule.SettingsPanel.prototype.skipSettings = function(value) {
  value = goog.isArray(value) ? value : [value];
  this.skippedSettings = goog.array.concat(this.skippedSettings, value);
};


/** @override */
anychart.chartEditorModule.SettingsPanel.prototype.disposeInternal = function() {
  goog.disposeAll(this.childControls_);
  this.childControls_.length = 0;

  this.labels.length = 0;

  anychart.chartEditorModule.SettingsPanel.base(this, 'disposeInternal');
};
