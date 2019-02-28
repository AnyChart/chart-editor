goog.provide('chartEditor.ui.steps.Widget');

goog.require('chartEditor.ui.steps.Export');
goog.require('chartEditor.ui.steps.PrepareData');
goog.require('chartEditor.ui.steps.SetupChart');
goog.require('chartEditor.ui.steps.Step');
goog.require('chartEditor.ui.steps.VisualAppearance');
goog.require('goog.events.EventTarget');
goog.require('goog.fx.AnimationSerialQueue');
goog.require('goog.fx.Transition.EventType');
goog.require('goog.fx.dom');



/**
 * Steps component.
 * Includes all the steps and provides change step functionality.
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
chartEditor.ui.steps.Widget = function() {
  chartEditor.ui.steps.Widget.base(this, 'constructor');

  /**
   * @type {Array.<Object>}
   * @private
   */
  this.descriptors_ = [{
      classFunc: chartEditor.ui.steps.PrepareData,
      instance: null
    },
    {
      classFunc: chartEditor.ui.steps.SetupChart,
      instance: null
    },
    {
      classFunc: chartEditor.ui.steps.VisualAppearance,
      instance: null
    },
    {
      classFunc: chartEditor.ui.steps.Export,
      instance: null
    }];

  /**
   * Current step.
   * @type {chartEditor.ui.steps.Step}
   * @private
   */
  this.currentStep_ = null;

  this.createSteps();
};
goog.inherits(chartEditor.ui.steps.Widget, goog.events.EventTarget);


/** @enum {string} */
chartEditor.ui.steps.EventType = {
  BEFORE_CHANGE_STEP: goog.events.getUniqueId('beforechangestep')
};


/** @enum {string} */
chartEditor.ui.steps.StepRole = {
  NEXT: 'next',
  PREVIOUS: 'previous',
  FIRST: 'first',
  LAST: 'last'
};


/**
 * Create step instances
 */
chartEditor.ui.steps.Widget.prototype.createSteps = function() {
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
chartEditor.ui.steps.Widget.prototype.getStepsCount = function(opt_onlyEnabled) {
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
 * @return {chartEditor.ui.steps.Step}
 */
chartEditor.ui.steps.Widget.prototype.getCurrentStep = function() {
  return this.currentStep_;
};


/**
 * @param {number} index
 * @return {?chartEditor.ui.steps.Step}
 */
chartEditor.ui.steps.Widget.prototype.getStepByIndex = function(index) {
  return this.descriptors_[index] && this.descriptors_[index].instance ? this.descriptors_[index].instance : null;
};


/**
 * @param {chartEditor.enums.EditorSteps} stepName
 * @return {?chartEditor.ui.steps.Step}
 */
chartEditor.ui.steps.Widget.prototype.getStepByName = function(stepName) {
  for (var i = 0; i < this.descriptors_.length; i++) {
    if (this.descriptors_[i].instance && this.descriptors_[i].instance['name']() == stepName)
      return /** @type {chartEditor.ui.steps.Step} */(this.descriptors_[i].instance);
  }

  return null;
};


/**
 * @param {chartEditor.ui.steps.StepRole} role
 * @return {number}
 */
chartEditor.ui.steps.Widget.prototype.getStepIndex = function(role) {
  var index = -1;
  var i;
  switch(role){
    case chartEditor.ui.steps.StepRole.FIRST:
    case chartEditor.ui.steps.StepRole.NEXT:
      i = role == chartEditor.ui.steps.StepRole.FIRST ? 0 : this.getCurrentStep().getIndex() + 1;
      for (; i < this.descriptors_.length; i++) {
        if (this.descriptors_[i].instance && this.descriptors_[i].instance['enabled']()) {
          index = i;
          break;
        }
      }
      break;
    case chartEditor.ui.steps.StepRole.LAST:
    case chartEditor.ui.steps.StepRole.PREVIOUS:
      i = role == chartEditor.ui.steps.StepRole.LAST ? this.descriptors_.length - 1: this.getCurrentStep().getIndex() - 1;
      for (; i >= 0; i--) {
        if (this.descriptors_[i].instance && this.descriptors_[i].instance['enabled']()) {
          index = i;
          break;
        }
      }
      break;
  }



  return index;
};



/**
 * Render the given step.
 * @param {number} index
 * @param {boolean} doAnimation
 */
chartEditor.ui.steps.Widget.prototype.setStep = function(index, doAnimation) {
  var step = this.getStepByIndex(index);
  if (!step || step.isInDocument()) return;

  var event = {
    type: chartEditor.ui.steps.EventType.BEFORE_CHANGE_STEP,
    index: index
  };
  if (this.currentStep_)
    event.prevIndex = this.currentStep_.getIndex();

  this.dispatchEvent(event);

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
 * @param {chartEditor.ui.steps.Step} step
 * @private
 */
chartEditor.ui.steps.Widget.prototype.removeStep_ = function(step) {
  // Remove the child ui's DOM from the document.
  // We have to call exitDocument first (see documentation).
  step.exitDocument();
  goog.dom.removeNode(step.getElement());
};


/**
 * @param {boolean} value
 */
chartEditor.ui.steps.Widget.prototype.enabled = function(value) {
  for (var i = this.descriptors_.length; i--;) {
    if (this.descriptors_[i].instance)
      this.descriptors_[i].instance['enabled'](value);
  }
};


/** @inheritDoc */
chartEditor.ui.steps.Widget.prototype.disposeInternal = function() {
  for (var i = 0; i < this.descriptors_.length; i++) {
    if (this.descriptors_[i].instance) {
      goog.dispose(this.descriptors_[i].instance);
      this.descriptors_[i].instance = null;
    }
  }
  chartEditor.ui.steps.Widget.base(this, 'disposeInternal');
};


(function() {
  // var proto = chartEditor.ui.steps.Widget.prototype;
  // proto['enabled'] = proto.enabled;
})();
