goog.provide('chartEditor.steps.Base');

goog.require('chartEditor.Component');
goog.require('chartEditor.ui.button.Primary');
goog.require('chartEditor.ui.button.Secondary');
goog.require('goog.a11y.aria');
goog.require('goog.a11y.aria.Role');
goog.require('goog.dom');
goog.require('goog.dom.classlist');

goog.forwardDeclare('anychart.data.Mapping');
goog.forwardDeclare('anychart.data.Set');



/**
 * Chart Editor Step Class.
 *
 * @param {number} index Step index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.steps.Base = function(index, opt_domHelper) {
  chartEditor.steps.Base.base(this, 'constructor', opt_domHelper);

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

  this.addClassName(goog.getCssName('anychart-ce-step'));
};
goog.inherits(chartEditor.steps.Base, chartEditor.Component);


/**
 * @returns {number}
 */
chartEditor.steps.Base.prototype.getIndex = function() {
  return this.index_;
};


/**
 * Getter/setter for step name.
 * @param {string=} opt_value
 * @return {string|chartEditor.steps.Base}
 */
chartEditor.steps.Base.prototype.name = function(opt_value) {
  if (opt_value) {
    this.name_ = opt_value;
    return this;
  }
  return this.name_;
};


/**
 * Getter/setter for step title.
 * @param {string=} opt_value
 * @return {string|chartEditor.steps.Base}
 */
chartEditor.steps.Base.prototype.title = function(opt_value) {
  if (opt_value) {
    this.title_ = opt_value;
    return this;
  }
  return this.title_;
};


/**
 * Getter/setter for enabled state
 * @param {boolean=} opt_value
 * @return {boolean|chartEditor.steps.Base} Enabled state or self for chaining
 */
chartEditor.steps.Base.prototype.enabled = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.enabled_ = opt_value;
    return this;
  }
  return this.enabled_;
};


/**
 * @param {boolean|Object} value
 */
chartEditor.steps.Base.prototype.setup = function(value) {
  if (goog.isBoolean(value)) {
    this.enabled(value);
  } else {
    // todo: costyling
    if (goog.isDef(value['enabled'])) {
      this.enabled(value['enabled']);
    }
  }
};
