goog.provide('anychart.chartEditorModule.Steps');

goog.require('anychart.chartEditorModule.steps.Base');
goog.require('anychart.chartEditorModule.steps.PrepareData');
goog.require('anychart.chartEditorModule.steps.SetupChart');
goog.require('anychart.chartEditorModule.steps.VisualAppearance');
goog.require('goog.events.EventTarget');
goog.require('goog.fx.AnimationSerialQueue');
goog.require('goog.fx.Transition.EventType');
goog.require('goog.fx.dom');


/**
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
anychart.chartEditorModule.Steps = function() {
  anychart.chartEditorModule.Steps.base(this, 'constructor');

  /**
   * @type {Array.<Object>}
   * @private
   */
  this.descriptors_ = [{
      name: 'PrepareData',
      enabled: true,
      classFunc: anychart.chartEditorModule.steps.PrepareData,
      instance: null
    },
    {
      name: 'SetupChart',
      enabled: true,
      classFunc: anychart.chartEditorModule.steps.SetupChart,
      instance: null
    },
    {
      name: 'VisualAppearance',
      enabled: true,
      classFunc: anychart.chartEditorModule.steps.VisualAppearance,
      instance: null
    }];

  /**
   * Current step.
   * @type {anychart.chartEditorModule.steps.Base}
   * @private
   */
  this.currentStep_ = null;
};
goog.inherits(anychart.chartEditorModule.Steps, goog.events.EventTarget);


/** @enum {string} */
anychart.chartEditorModule.Steps.EventType = {
  BEFORE_CHANGE_STEP: goog.events.getUniqueId('beforechangestep')
};


/**
 * Create step by string name.
 *
 * @param {string} name
 * @return {?anychart.chartEditorModule.steps.Base}
 */
anychart.chartEditorModule.Steps.prototype.createStep = function(name) {
  var stepDescriptor;
  var index;
  for (index = 0; index < this.descriptors_.length; index++) {
    if (this.descriptors_[index].name == name) {
      stepDescriptor = this.descriptors_[index];
      break;
    }
  }

  if (stepDescriptor && !stepDescriptor.instance) {
    var classFunc = this.descriptors_[index].classFunc;
    this.descriptors_[index].instance = new classFunc(index);
    return this.descriptors_[index].instance;
  }
  return null;
};


/**
 * @return {number}
 */
anychart.chartEditorModule.Steps.prototype.getCurrentStepIndex = function() {
  return this.currentStep_.getIndex();
};


/**
 * @param {number} index
 * @return {?anychart.chartEditorModule.steps.Base}
 */
anychart.chartEditorModule.Steps.prototype.getStepByIndex = function(index) {
  return this.descriptors_[index] && this.descriptors_[index].instance ? this.descriptors_[index].instance : null;
};


/**
 * @param {string} name
 * @return {?Object}
 */
anychart.chartEditorModule.Steps.prototype.getStepDescriptorByName_ = function(name) {
  var stepDescriptor = null;
  for (var i = 0; i < this.descriptors_.length; i++) {
    if (this.descriptors_[i].name == name) {
      stepDescriptor = this.descriptors_[i];
      break;
    }
  }
  return stepDescriptor;
};


/**
 * TODO: Refactor for better API
 * @param {boolean=} opt_enabled
 * @return {anychart.chartEditorModule.steps.Base}}
 */
anychart.chartEditorModule.Steps.prototype.prepareData = function(opt_enabled) {
  var descriptor = this.getStepDescriptorByName_('PrepareData');

  if (goog.isDef(opt_enabled) && descriptor.enabled != opt_enabled) {
    descriptor.enabled = opt_enabled;
    this.setStep(this.getFirstStepIndex(), false);
  }

  return descriptor.instance;
};


/**
 * @param {boolean=} opt_enabled
 * @return {anychart.chartEditorModule.steps.Base}}
 */
anychart.chartEditorModule.Steps.prototype.visualAppearance = function(opt_enabled) {
  var descriptor = this.getStepDescriptorByName_('VisualAppearance');

  if (goog.isDef(opt_enabled) && descriptor.enabled != opt_enabled) {
    descriptor.enabled = opt_enabled;
    this.setStep(this.getFirstStepIndex(), false);
  }

  return descriptor.instance;
};


/**
 * @return {number}
 */
anychart.chartEditorModule.Steps.prototype.getFirstStepIndex = function() {
  for (var i = 0; i < this.descriptors_.length; i++) {
    if (this.descriptors_[i].enabled)
      return i;
  }
  return -1;
};


/**
 * Render the given step.
 * @param {number} index
 * @param {boolean} doAnimation
 */
anychart.chartEditorModule.Steps.prototype.setStep = function(index, doAnimation) {
  var step = this.getStepByIndex(index);
  if (!step || step.isInDocument()) return;

  this.dispatchEvent({
    type: anychart.chartEditorModule.Steps.EventType.BEFORE_CHANGE_STEP,
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
 * @param {anychart.chartEditorModule.steps.Base} step
 * @private
 */
anychart.chartEditorModule.Steps.prototype.removeStep_ = function(step) {
  // Remove the child component's DOM from the document.  We have to call
  // exitDocument first (see documentation).
  step.exitDocument();
  goog.dom.removeNode(step.getElement());
};


/**
 * @return {Array.<Object>}
 */
anychart.chartEditorModule.Steps.prototype.getDescriptors = function() {
  return this.descriptors_;
};


/** @inheritDoc */
anychart.chartEditorModule.Steps.prototype.disposeInternal = function() {
  for (var i = 0; i < this.descriptors_.length; i++) {
    if (this.descriptors_[i].instance) {
      goog.dispose(this.descriptors_[i].instance);
      this.descriptors_[i].instance = null;
    }
  }
  anychart.chartEditorModule.Steps.base(this, 'disposeInternal');
};


(function() {
  var proto = anychart.chartEditorModule.Steps.prototype;
  proto['prepareData'] = proto.prepareData;
  proto['visualAppearance'] = proto.visualAppearance;
})();
