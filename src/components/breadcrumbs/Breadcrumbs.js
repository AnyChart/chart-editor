goog.provide('anychart.chartEditorModule.Breadcrumbs');

goog.require('anychart.chartEditorModule.Item');
goog.require('anychart.ui.Component');
goog.require('goog.ui.Button');


/**
 * @constructor
 * @extends {anychart.ui.Component}
 */
anychart.chartEditorModule.Breadcrumbs = function() {
  anychart.chartEditorModule.Breadcrumbs.base(this, 'constructor');
  this.addClassName('anychart-breadcrumbs');
};
goog.inherits(anychart.chartEditorModule.Breadcrumbs, anychart.ui.Component);


/** @enum {string} */
anychart.chartEditorModule.Breadcrumbs.EventType = {
  COMPLETE: goog.events.getUniqueId('complete'),
  NEXT: goog.events.getUniqueId('next'),
  PREV: goog.events.getUniqueId('prev'),
  CHANGE_STEP: goog.events.getUniqueId('changestep')
};


/**
 * @type {number}
 * @private
 */
anychart.chartEditorModule.Breadcrumbs.prototype.step_ = 0;


/**
 * @type {Array.<anychart.ui.Component>}
 * @private
 */
anychart.chartEditorModule.Breadcrumbs.prototype.steps_ = null;


/**
 * @type {goog.ui.Button}
 * @private
 */
anychart.chartEditorModule.Breadcrumbs.prototype.next_ = null;


/**
 * @type {goog.ui.Button}
 * @private
 */
anychart.chartEditorModule.Breadcrumbs.prototype.prev_ = null;


/**
 * @type {goog.ui.Button}
 * @private
 */
anychart.chartEditorModule.Breadcrumbs.prototype.complete_ = null;


/** @inheritDoc */
anychart.chartEditorModule.Breadcrumbs.prototype.createDom = function() {
  anychart.chartEditorModule.Breadcrumbs.base(this, 'createDom');

  var items = new anychart.ui.Component();
  items.addClassName('anychart-noselect');
  items.addClassName('anychart-breadcrumbs-items');
  this.addChild(items, true);

  var prepareData = new anychart.chartEditorModule.Item('Prepare Data');
  items.addChild(prepareData, true);

  var setupChart = new anychart.chartEditorModule.Item('Setup Chart');
  items.addChild(setupChart, true);

  var visualAppearance = new anychart.chartEditorModule.Item('Visual Appearance');
  items.addChild(visualAppearance, true);

  var buttons = new anychart.ui.Component();
  buttons.addClassName('anychart-breadcrumbs-buttons');
  this.addChild(buttons, true);

  var buttonsRenderer = /** @type {goog.ui.ButtonRenderer} */(goog.ui.ControlRenderer.getCustomRenderer(
      goog.ui.ButtonRenderer,
      'anychart-breadcrumbs-button'));

  var next = new goog.ui.Button('Next', buttonsRenderer);
  next.addClassName('anychart-breadcrumbs-right');
  buttons.addChild(next, true);

  var complete = new goog.ui.Button('Complete', buttonsRenderer);
  complete.addClassName('anychart-breadcrumbs-right');
  buttons.addChild(complete, true);

  var prev = new goog.ui.Button('Previous', buttonsRenderer);
  prev.addClassName('anychart-breadcrumbs-left');
  buttons.addChild(prev, true);

  var clear = new anychart.ui.Component();
  clear.addClassName('anychart-clear');
  this.addChild(clear, true);

  this.next_ = next;
  this.prev_ = prev;
  this.complete_ = complete;
  this.steps_ = [prepareData, setupChart, visualAppearance];

  this.next_.setVisible(false);
  this.prev_.setVisible(false);
  this.complete_.setVisible(false);

  this.getHandler().listen(next, goog.ui.Component.EventType.ACTION, this.onButtonAction_);
  this.getHandler().listen(prev, goog.ui.Component.EventType.ACTION, this.onButtonAction_);
  this.getHandler().listen(complete, goog.ui.Component.EventType.ACTION, this.onButtonAction_);

  goog.array.forEach(this.steps_, function(item) {
    this.getHandler().listen(item, goog.ui.Component.EventType.ACTION, this.onItemAction_);
  }, this);
};


/**
 * @param {number} index
 * @param {Object} stepDescriptors
 */
anychart.chartEditorModule.Breadcrumbs.prototype.setStep = function(index, stepDescriptors) {
  this.step_ = index;
  var firstStep = -1;

  if (this.isInDocument()) {
    if (this.steps_) {
      // update items
      for (var i = 0; i < this.steps_.length; i++) {
        var step = this.steps_[i];
        step.removeClassName('anychart-breadcrumbs-item-active');
        step.setVisible(stepDescriptors[i].enabled);

        if (firstStep < 0 && stepDescriptors[i].enabled) firstStep = i;
      }
      this.steps_[this.step_].addClassName('anychart-breadcrumbs-item-active');

      // update buttons
      if (this.step_ === firstStep) {
        this.prev_.setVisible(false);
        this.complete_.setVisible(false);
        this.next_.setVisible(true);

      } else if (this.step_ === this.steps_.length - 1) {
        this.prev_.setVisible(true);
        this.complete_.setVisible(true);
        this.next_.setVisible(false);

      } else {
        this.prev_.setVisible(true);
        this.complete_.setVisible(false);
        this.next_.setVisible(true);
      }
    }
  }
};


/**
 * @param {goog.events.Event} e
 * @private
 */
anychart.chartEditorModule.Breadcrumbs.prototype.onItemAction_ = function(e) {
  this.dispatchEvent({
    type: anychart.chartEditorModule.Breadcrumbs.EventType.CHANGE_STEP,
    step: goog.array.indexOf(this.steps_, e.target)
  });
};


/**
 * @param {goog.events.Event} e
 * @private
 */
anychart.chartEditorModule.Breadcrumbs.prototype.onButtonAction_ = function(e) {
  if (e.currentTarget === this.next_) {
    this.dispatchEvent(anychart.chartEditorModule.Breadcrumbs.EventType.NEXT);
  } else if (e.currentTarget === this.prev_) {
    this.dispatchEvent(anychart.chartEditorModule.Breadcrumbs.EventType.PREV);
  } else if (e.currentTarget === this.complete_) {
    this.dispatchEvent(anychart.chartEditorModule.Breadcrumbs.EventType.COMPLETE);
  }
};


/** @inheritDoc */
anychart.chartEditorModule.Breadcrumbs.prototype.disposeInternal = function() {
  this.steps_ = null;
  this.next_ = null;
  this.prev_ = null;
  this.complete_ = null;
  anychart.chartEditorModule.Breadcrumbs.base(this, 'disposeInternal');
};
