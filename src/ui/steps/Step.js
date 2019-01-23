goog.provide('chartEditor.ui.steps.Step');

goog.require('chartEditor.ui.Component');
goog.require('goog.a11y.aria');
goog.require('goog.a11y.aria.Role');
goog.require('goog.dom');
goog.require('goog.dom.classlist');

goog.forwardDeclare('anychart.data.Mapping');
goog.forwardDeclare('anychart.data.Set');



/**
 * Base class for steps.
 *
 * @param {number} index Step index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.steps.Step = function(index, opt_domHelper) {
  chartEditor.ui.steps.Step.base(this, 'constructor', opt_domHelper);

  /**
   * @type {number}
   * @private
   */
  this.index_ = index;

  /**
   * @type {string}
   * @private
   */
  this.name_ = 'step';

  /**
   * @type {string}
   * @private
   */
  this.title_ = 'Step';

  /**
   * @type {boolean}
   * @private
   */
  this.enabled_ = true;

  /**
   * @type {chartEditor.ui.Tabs|null}
   */
  this.tabs = null;

  this.tabsSettings = {};

  this.addClassName(goog.getCssName('anychart-ce-step'));
};
goog.inherits(chartEditor.ui.steps.Step, chartEditor.ui.Component);


/**
 * @returns {number}
 */
chartEditor.ui.steps.Step.prototype.getIndex = function() {
  return this.index_;
};


/**
 * Getter/setter for step name.
 * @param {string=} opt_value
 * @return {string|chartEditor.ui.steps.Step}
 */
chartEditor.ui.steps.Step.prototype.name = function(opt_value) {
  if (opt_value) {
    this.name_ = opt_value;
    return this;
  }
  return this.name_;
};


/**
 * Getter/setter for step title.
 * @param {string=} opt_value
 * @return {string|chartEditor.ui.steps.Step}
 */
chartEditor.ui.steps.Step.prototype.title = function(opt_value) {
  if (opt_value) {
    this.title_ = opt_value;
    return this;
  }
  return this.title_;
};


/**
 * Getter/setter for enabled state of the step
 * @param {boolean=} opt_value
 * @return {boolean|chartEditor.ui.steps.Step} Enabled state or self for chaining
 */
chartEditor.ui.steps.Step.prototype.enabled = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.enabled_ = opt_value;
    return this;
  }
  return this.enabled_;
};


/**
 * @param {boolean|Object} value
 */
chartEditor.ui.steps.Step.prototype.setup = function(value) {
  if (goog.isBoolean(value)) {
    this.enabled(value);
  } else {
    if (goog.isDef(value['enabled'])) {
      this.enabled(value['enabled']);
    }
  }
};


/** @inheritDoc */
chartEditor.ui.steps.Step.prototype.enterDocument = function() {
  // Should be called before enterDocument()!
  if (this.tabs)
    this.tabs.updateExclusions();

  chartEditor.ui.steps.Step.base(this, 'enterDocument');
};


/**
 * Allows to enable/disable tab by name.
 *
 * @param {chartEditor.enums.EditorTabs} tabName
 * @param {boolean|Object} value Boolean value to enable/disable tab or configuration object
 * @return {chartEditor.ui.steps.Step} Self for chaining
 */
chartEditor.ui.steps.Step.prototype.tab = function(tabName, value) {
  value = goog.isObject(value) ? value['enabled'] : !!value;

  if (this.tabs)
    /** @type {chartEditor.ui.Tabs} */(this.tabs).enableTabByName(tabName, value);
  else {
    // Write setting to use it after draw
    this.tabsSettings[tabName] = this.tabsSettings[tabName] ? this.tabsSettings[tabName] : {};
    this.tabsSettings[tabName].enabled = value;
  }

  return this;
};


/** @inheritDoc */
chartEditor.ui.steps.Step.prototype.disposeInternal = function() {
  goog.dispose(this.tabs);
  this.tabs = null;

  chartEditor.ui.steps.Step.base(this, 'disposeInternal');
};


//exports
(function() {
  var proto = chartEditor.ui.steps.Step.prototype;
  proto['enabled'] = proto.enabled;
  proto['tab'] = proto.tab;
})();
