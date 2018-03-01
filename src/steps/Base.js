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
   * Enabled transition to next step.
   * @type {boolean}
   * @private
   */
  this.enableNextStep_ = true;

  /**
   * @type {number}
   * @private
   */
  this.index_ = index;
};
goog.inherits(chartEditor.steps.Base, chartEditor.Component);


/**
 * CSS class name.
 * @type {string}
 */
chartEditor.steps.Base.CSS_CLASS = goog.getCssName('anychart-chart-editor-step');


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
 * @returns {number}
 */
chartEditor.steps.Base.prototype.getIndex = function() {
  return this.index_;
};


/** @override */
chartEditor.steps.Base.prototype.createDom = function() {
  goog.base(this, 'createDom');

  var element = /** @type {Element} */(this.getElement());
  goog.dom.classlist.add(element, chartEditor.steps.Base.CSS_CLASS);
};
