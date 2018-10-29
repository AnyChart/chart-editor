goog.provide('chartEditor.SettingsPanel');

goog.require('chartEditor.ComponentWithKey');
goog.require('chartEditor.checkbox.Base');
goog.require('chartEditor.ui.button.Base');


/**
 * @param {chartEditor.EditorModel} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ComponentWithKey}
 */
chartEditor.SettingsPanel = function(model, opt_name, opt_domHelper) {
  chartEditor.SettingsPanel.base(this, 'constructor', model, opt_domHelper);

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
   * @private
   */
  this.allowRemove_ = false;

  /**
   * @type {Array.<chartEditor.SettingsPanel|chartEditor.controls.LabeledControl|chartEditor.checkbox.Base|chartEditor.controls.select.Base|chartEditor.comboBox.Base|chartEditor.colorPicker.Base|chartEditor.controls.input.Base|chartEditor.button.Toggle>}
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

  this.addClassName(goog.getCssName('anychart-ce-settings-panel'));
};
goog.inherits(chartEditor.SettingsPanel, chartEditor.ComponentWithKey);


/**
 * @return {boolean} Whether the title settings is enabled.
 */
chartEditor.SettingsPanel.prototype.isEnabled = function() {
  return this.enabled;
};


/** @return {string} */
chartEditor.SettingsPanel.prototype.getStringId = function() {
  return this.stringId;
};


/**
 * @return {?string|undefined}
 */
chartEditor.SettingsPanel.prototype.getName = function() {
  return this.name;
};


/** @param {?string} value */
chartEditor.SettingsPanel.prototype.setName = function(value) {
  this.name = value;
};


/**
 * @param {chartEditor.EditorModel.Key=} opt_key
 * @return {chartEditor.EditorModel.Key|chartEditor.SettingsPanel}
 */
chartEditor.SettingsPanel.prototype.enabledKey = function(opt_key) {
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
chartEditor.SettingsPanel.prototype.allowEnabled_ = true;


/** @param {boolean} value */
chartEditor.SettingsPanel.prototype.allowEnabled = function(value) {
  this.allowEnabled_ = value;
};


/**
 * @param {boolean=} opt_value
 * @return {boolean}
 */
chartEditor.SettingsPanel.prototype.allowRemove = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.allowRemove_ = opt_value;
    if (this.removeButton) {
      goog.style.setElementShown(this.removeButton, this.allowRemove_);
    }
  }
  return this.allowRemove_;
};


/**
 * Container for enabled button.
 * @type {Element}
 * @private
 */
chartEditor.SettingsPanel.prototype.enabledButtonContainer_ = null;


/**
 * Set container for enabled button.
 * @param {Element} enabledButtonContainer
 */
chartEditor.SettingsPanel.prototype.setEnabledButtonContainer = function(enabledButtonContainer) {
  this.enabledButtonContainer_ = enabledButtonContainer;
};


/** @inheritDoc */
chartEditor.SettingsPanel.prototype.createDom = function() {
  chartEditor.SettingsPanel.base(this, 'createDom');

  var element = /** @type {Element} */(this.getElement());

  var dom = this.getDomHelper();
  this.topEl = dom.createDom(goog.dom.TagName.DIV, 'top');
  element.appendChild(this.topEl);

  if (this.name) {
    this.topEl.appendChild(dom.createDom(goog.dom.TagName.DIV, 'title', this.name));
  } else
    goog.dom.classlist.add(element, 'anychart-ce-settings-panel-no-title');

  if (this.allowRemove_) {
    var removeBtn = dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-settings-panel-remove-btn', '');
    goog.dom.appendChild(this.topEl, removeBtn);
    this.removeButton = removeBtn;
  }

  if (this.canBeEnabled()) {
    var enableContentCheckbox = new chartEditor.checkbox.Base();
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
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
    goog.dom.classlist.add(element, 'anychart-ce-settings-panel-no-checkbox');

  var noTop = !this.name && !this.allowRemove_ && !(this.enableContentCheckbox && !this.enabledButtonContainer_);
  if (noTop)
    goog.dom.classlist.add(element, 'anychart-ce-settings-panel-no-top');

  this.contentEl = dom.createDom(goog.dom.TagName.DIV, 'content');
  element.appendChild(this.contentEl);
};


/**
 * Returns the DOM element of tom bar.
 * @return {Element}
 */
chartEditor.SettingsPanel.prototype.getTopElement = function() {
  return this.topEl;
};


/** @inheritDoc */
chartEditor.SettingsPanel.prototype.getContentElement = function() {
  return this.contentEl;
};


/** @inheritDoc */
chartEditor.SettingsPanel.prototype.enterDocument = function() {
  chartEditor.SettingsPanel.base(this, 'enterDocument');

  if (this.isExcluded()) return;

  this.updateKeys();
  this.setEnabled(this.enabled);

  if (this.removeButton)
    goog.events.listen(this.removeButton, goog.events.EventType.CLICK, this.onRemoveAction, false, this);
};


/** @override */
chartEditor.SettingsPanel.prototype.exitDocument = function() {
  if (this.removeButton)
    goog.events.unlisten(this.removeButton, goog.events.EventType.CLICK, this.onRemoveAction, false, this);
  chartEditor.SettingsPanel.base(this, 'exitDocument');
};


/**
 * @param {Object} evt
 * @protected
 */
chartEditor.SettingsPanel.prototype.onRemoveAction = function(evt) {
  this.dispatchEvent({
    type: chartEditor.events.EventType.PANEL_CLOSE
  });
};


/** @inheritDoc */
chartEditor.SettingsPanel.prototype.onModelChange = function(evt) {
  if (!this.isExcluded()) {
    chartEditor.SettingsPanel.base(this, 'onModelChange', evt);
  }
};


/** @inheritDoc */
chartEditor.SettingsPanel.prototype.onChartDraw = function(evt) {
  chartEditor.SettingsPanel.base(this, 'onChartDraw', evt);

  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    var target;
    if (this.key[0] && this.key[0][0] == 'standalones') {
      var key = [this.key[0], this.key[1], 'instance'];

      target = model.getValue(key);
    } else
      target = evt.chart;

    if (target) {
      if (evt.rebuild && this.enableContentCheckbox && this.canBeEnabled()) {
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
        model.dispatchUpdate();
      }
    }
  }
};


/**
 * Checks if this panel can be enabled/disabled.
 * If panel can be enabled, the this.key property of panel should contain '*.enable()' key.
 *
 * @return {boolean}
 */
chartEditor.SettingsPanel.prototype.canBeEnabled = function() {
  return this.allowEnabled_ && Boolean(this.key.length);
};


/**
 * Enables/Disables the all group controls.
 * @param {boolean} enabled Whether to enable (true) or disable (false) the
 *     all group controls.
 * @protected
 */
chartEditor.SettingsPanel.prototype.setEnabled = function(enabled) {
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
chartEditor.SettingsPanel.prototype.setContentEnabled = function(enabled) {
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
        goog.getCssName('anychart-ce-control-disabled'), !this.enabledContent);
  }

  if (this.topEl) {
    goog.dom.classlist.enable(
        goog.asserts.assert(this.topEl),
        goog.getCssName('anychart-ce-control-disabled'), !this.enabled);
  }

  if (this.enableContentCheckbox)
    this.enableContentCheckbox.setEnabled(this.enabled);
};


/** @inheritDoc */
chartEditor.SettingsPanel.prototype.setKey = function(key) {
  chartEditor.SettingsPanel.base(this, 'setKey', key);

  if (this.enableContentCheckbox) {
    if (!this.enabledKey_) this.enabledKey(this.genKey('enabled()'));
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    this.enableContentCheckbox.init(model, this.enabledKey_);
  }
};


/**
 * Update model keys.
 * todo: find out if this method is necessary
 */
chartEditor.SettingsPanel.prototype.updateKeys = function() {
  //if (this.isExcluded()) return;
};


/** @inheritDoc */
chartEditor.SettingsPanel.prototype.exclude = function(value) {
  var dirty = this.excluded !== value;
  chartEditor.SettingsPanel.base(this, 'exclude', value);
  if (dirty) this.updateKeys();
};


/**
 * Registers label to disable and dispose
 * @param {?Element} labelElement
 */
chartEditor.SettingsPanel.prototype.registerLabel = function(labelElement) {
  if (!labelElement) return;
  this.labels.push(labelElement);
};


/**
 * @param {chartEditor.SettingsPanel|chartEditor.controls.LabeledControl|chartEditor.checkbox.Base|chartEditor.controls.select.Base|chartEditor.comboBox.Base|chartEditor.colorPicker.Base|chartEditor.controls.input.Base|chartEditor.button.Toggle} control
 * @param {number=} opt_index
 * @return {boolean} true if control was added.
 */
chartEditor.SettingsPanel.prototype.addChildControl = function(control, opt_index) {
  var addControl = !this.skippedSettings.length;
  
  if (this.skippedSettings.length) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
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
chartEditor.SettingsPanel.prototype.addContentSeparator = function() {
  goog.dom.appendChild(this.getContentElement(), goog.dom.createDom(
      goog.dom.TagName.DIV,
      goog.getCssName('anychart-ce-settings-item-separator-gaps')));
};


/**
 * Add control keys that should be skipped.
 * @param {string|Array.<string>} value Keys to skip.
 */
chartEditor.SettingsPanel.prototype.skipSettings = function(value) {
  value = goog.isArray(value) ? value : [value];
  this.skippedSettings = goog.array.concat(this.skippedSettings, value);
};


/** @override */
chartEditor.SettingsPanel.prototype.disposeInternal = function() {
  goog.disposeAll(this.childControls_);
  this.childControls_.length = 0;

  this.labels.length = 0;

  chartEditor.SettingsPanel.base(this, 'disposeInternal');
};
