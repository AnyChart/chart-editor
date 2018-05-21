goog.provide('chartEditor.Steps');

goog.require("chartEditor.steps.Base");
goog.require("chartEditor.steps.Export");
goog.require("chartEditor.steps.PrepareData");
goog.require("chartEditor.steps.SetupChart");
goog.require("chartEditor.steps.VisualAppearance");
goog.require("goog.events.EventTarget");
goog.require("goog.fx.AnimationSerialQueue");
goog.require("goog.fx.Transition.EventType");
goog.require("goog.fx.dom");


/**
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
chartEditor.Steps = function() {
  chartEditor.Steps.base(this, 'constructor');

  /**
   * @type {Array.<Object>}
   * @private
   */
  this.descriptors_ = [{
      classFunc: chartEditor.steps.PrepareData,
      instance: null
    },
    {
      classFunc: chartEditor.steps.SetupChart,
      instance: null
    },
    {
      classFunc: chartEditor.steps.VisualAppearance,
      instance: null
    },
    {
      classFunc: chartEditor.steps.Export,
      instance: null
    }];

  /**
   * Current step.
   * @type {chartEditor.steps.Base}
   * @private
   */
  this.currentStep_ = null;

  this.createSteps();
};
goog.inherits(chartEditor.Steps, goog.events.EventTarget);


/** @enum {string} */
chartEditor.Steps.EventType = {
  BEFORE_CHANGE_STEP: goog.events.getUniqueId('beforechangestep')
};


/**
 * Create step instances
 */
chartEditor.Steps.prototype.createSteps = function() {
  var stepDescriptor;
  var classFunc;
  for (var i = 0; i < this.descriptors_.length; i++) {
    stepDescriptor = this.descriptors_[i];
    classFunc = this.descriptors_[i].classFunc;
    this.descriptors_[i].instance = new classFunc(i);
  }
};


/**
 * @param {boolean=} opt_onlyEnabled
 * @return {number}
 */
chartEditor.Steps.prototype.getStepsCount = function(opt_onlyEnabled) {
  if (!opt_onlyEnabled)
    return this.descriptors_.length;

  var count = 0;
  for (var i = 0; i < this.descriptors_.length; i++) {
    if (this.descriptors_[i].instance && this.descriptors_[i].instance['enabled']())
      count++;
  }

  return count;
};


/**
 * @return {chartEditor.steps.Base}
 */
chartEditor.Steps.prototype.getCurrentStep = function() {
  return this.currentStep_;
};


/**
 * @param {number} index
 * @return {?chartEditor.steps.Base}
 */
chartEditor.Steps.prototype.getStepByIndex = function(index) {
  return this.descriptors_[index] && this.descriptors_[index].instance ? this.descriptors_[index].instance : null;
};


/**
 * @return {number}
 */
chartEditor.Steps.prototype.getFirstStepIndex = function() {
  for (var i = 0; i < this.descriptors_.length; i++) {
    if (this.descriptors_[i].instance && this.descriptors_[i].instance['enabled']())
      return i;
  }
  return -1;
};


/**
 * @return {number}
 */
chartEditor.Steps.prototype.getLastStepIndex = function() {
  for (var i = this.descriptors_.length; i--;) {
    if (this.descriptors_[i].instance && this.descriptors_[i].instance['enabled']())
      return i;
  }
  return -1;
};


/**
 * Render the given step.
 * @param {number} index
 * @param {boolean} doAnimation
 */
chartEditor.Steps.prototype.setStep = function(index, doAnimation) {
  var step = this.getStepByIndex(index);
  if (!step || step.isInDocument()) return;

  this.dispatchEvent({
    type: chartEditor.Steps.EventType.BEFORE_CHANGE_STEP,
    index: index
  });

  var animationSpeed = 150;
  if (this.currentStep_) {
    if (doAnimation) {
      var removeAnimation = new goog.fx.AnimationSerialQueue();
      removeAnimation.add(new goog.fx.dom.FadeOut(this.currentStep_.getElement(), animationSpeed));
      goog.events.listenOnce(
          removeAnimation,
          goog.fx.Transition.EventType.END,
          goog.bind(this.removeStep_, this, this.currentStep_));
      removeAnimation.play();
    } else {
      this.removeStep_(this.currentStep_);
    }
  }

  step.render(step.getParent().getElement());

  var appearAnimation = new goog.fx.AnimationSerialQueue();
  appearAnimation.add(new goog.fx.dom.FadeIn(step.getElement(), animationSpeed));
  appearAnimation.play();

  this.currentStep_ = step;
};


/**
 * Remove step from DOM.
 * @param {chartEditor.steps.Base} step
 * @private
 */
chartEditor.Steps.prototype.removeStep_ = function(step) {
  // Remove the child component's DOM from the document.
  // We have to call exitDocument first (see documentation).
  step.exitDocument();
  goog.dom.removeNode(step.getElement());
};


/**
 * @param {boolean} value
 */
chartEditor.Steps.prototype.enabled = function(value) {
  for (var i = this.descriptors_.length; i--;) {
    if (this.descriptors_[i].instance)
      this.descriptors_[i].instance['enabled'](value);
  }
};


/** @inheritDoc */
chartEditor.Steps.prototype.disposeInternal = function() {
  for (var i = 0; i < this.descriptors_.length; i++) {
    if (this.descriptors_[i].instance) {
      goog.dispose(this.descriptors_[i].instance);
      this.descriptors_[i].instance = null;
    }
  }
  chartEditor.Steps.base(this, 'disposeInternal');
};


(function() {
  var proto = chartEditor.Steps.prototype;
  // proto['enabled'] = proto.enabled;
})();
