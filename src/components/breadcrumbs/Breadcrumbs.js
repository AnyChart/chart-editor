goog.provide('chartEditor.Breadcrumbs');

goog.require("chartEditor.Component");
goog.require("chartEditor.breadcrumbs.Item");
goog.require("goog.ui.Button");


/**
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.Breadcrumbs = function() {
  chartEditor.Breadcrumbs.base(this, 'constructor');
  this.addClassName('anychart-ce-breadcrumbs');
};
goog.inherits(chartEditor.Breadcrumbs, chartEditor.Component);


/** @enum {string} */
chartEditor.Breadcrumbs.EventType = {
  COMPLETE: goog.events.getUniqueId('complete'),
  NEXT: goog.events.getUniqueId('next'),
  PREV: goog.events.getUniqueId('prev'),
  CHANGE_STEP: goog.events.getUniqueId('changestep')
};


/**
 * @type {number}
 * @private
 */
chartEditor.Breadcrumbs.prototype.stepIndex_ = 0;


/**
 * @type {Array.<chartEditor.breadcrumbs.Item>}
 * @private
 */
chartEditor.Breadcrumbs.prototype.items_ = null;


/**
 * @type {goog.ui.Button}
 * @private
 */
chartEditor.Breadcrumbs.prototype.next_ = null;


/**
 * @type {goog.ui.Button}
 * @private
 */
chartEditor.Breadcrumbs.prototype.prev_ = null;


/**
 * @type {goog.ui.Button}
 * @private
 */
chartEditor.Breadcrumbs.prototype.complete_ = null;


/** @inheritDoc */
chartEditor.Breadcrumbs.prototype.createDom = function() {
  chartEditor.Breadcrumbs.base(this, 'createDom');

  var items = new chartEditor.Component();
  items.addClassName('anychart-ce-noselect');
  items.addClassName('anychart-ce-breadcrumbs-items');
  this.addChild(items, true);

  var prepareData = new chartEditor.breadcrumbs.Item('Configure Data');
  items.addChild(prepareData, true);

  var setupChart = new chartEditor.breadcrumbs.Item('Setup Chart');
  items.addChild(setupChart, true);

  var visualAppearance = new chartEditor.breadcrumbs.Item('Visual Appearance');
  items.addChild(visualAppearance, true);

  var exportStep = new chartEditor.breadcrumbs.Item('Export');
  items.addChild(exportStep, true);

  var buttons = new chartEditor.Component();
  buttons.addClassName('anychart-ce-breadcrumbs-buttons');
  this.addChild(buttons, true);

  var buttonsRenderer = /** @type {goog.ui.ButtonRenderer} */(goog.ui.ControlRenderer.getCustomRenderer(
      goog.ui.ButtonRenderer,
      'anychart-ce-breadcrumbs-button'));

  var next = new goog.ui.Button('Next', buttonsRenderer);
  next.addClassName('anychart-ce-breadcrumbs-right');
  buttons.addChild(next, true);

  var complete = new goog.ui.Button('Complete', buttonsRenderer);
  complete.addClassName('anychart-ce-breadcrumbs-right');
  buttons.addChild(complete, true);

  var prev = new goog.ui.Button('Previous', buttonsRenderer);
  prev.addClassName('anychart-ce-breadcrumbs-left');
  buttons.addChild(prev, true);

  var clear = new chartEditor.Component();
  clear.addClassName('anychart-ce-clear');
  this.addChild(clear, true);

  this.next_ = next;
  this.prev_ = prev;
  this.complete_ = complete;
  this.items_ = [prepareData, setupChart, visualAppearance, exportStep];

  this.next_.setVisible(false);
  this.prev_.setVisible(false);
  this.complete_.setVisible(false);

  this.getHandler().listen(next, goog.ui.Component.EventType.ACTION, this.onButtonAction_);
  this.getHandler().listen(prev, goog.ui.Component.EventType.ACTION, this.onButtonAction_);
  this.getHandler().listen(complete, goog.ui.Component.EventType.ACTION, this.onButtonAction_);

  goog.array.forEach(this.items_, function(item) {
    this.getHandler().listen(item, goog.ui.Component.EventType.ACTION, this.onItemAction_);
  }, this);
};


/** @inheritDoc */
chartEditor.Breadcrumbs.prototype.enterDocument = function() {
  chartEditor.Breadcrumbs.base(this, 'enterDocument');

  for (var i = 0; i < this.items_.length; i++) {
    this.items_[i].setVisible(false);
  }
};


/**
 * @param {number} index Next step index
 * @param {chartEditor.Steps} steps
 */
chartEditor.Breadcrumbs.prototype.setStep = function(index, steps) {
  this.stepIndex_ = index;

  if (this.isInDocument()) {
    if (this.items_) {
      // update items
      for (var i = 0; i < this.items_.length; i++) {
        var item = this.items_[i];
        item.removeClassName('anychart-ce-breadcrumbs-item-active');
        var isEnabled = /** @type {boolean} */(steps.getStepByIndex(i).enabled());
        item.setVisible(isEnabled);
      }
      this.items_[this.stepIndex_].addClassName('anychart-ce-breadcrumbs-item-active');

      // update buttons
      var firstIndex = steps.getFirstStepIndex();
      var lastIndex = steps.getLastStepIndex();

      if (firstIndex == lastIndex) {
        // Only one step
        this.prev_.setVisible(false);
        this.next_.setVisible(false);
        this.complete_.setVisible(true);

      } else if (this.stepIndex_ === firstIndex) {
        // First step
        this.prev_.setVisible(false);
        this.next_.setVisible(true);
        this.complete_.setVisible(false);

      } else if (this.stepIndex_ === lastIndex) {
        // Last step
        this.prev_.setVisible(true);
        this.next_.setVisible(false);
        this.complete_.setVisible(true);

      } else {
        // In the middle
        this.prev_.setVisible(true);
        this.next_.setVisible(true);
        this.complete_.setVisible(false);
      }
    }
  }
};


/**
 * @param {goog.events.Event} e
 * @private
 */
chartEditor.Breadcrumbs.prototype.onItemAction_ = function(e) {
  this.dispatchEvent({
    type: chartEditor.Breadcrumbs.EventType.CHANGE_STEP,
    step: goog.array.indexOf(this.items_, e.target)
  });
};


/**
 * @param {goog.events.Event} e
 * @private
 */
chartEditor.Breadcrumbs.prototype.onButtonAction_ = function(e) {
  if (e.currentTarget === this.next_) {
    this.dispatchEvent(chartEditor.Breadcrumbs.EventType.NEXT);
  } else if (e.currentTarget === this.prev_) {
    this.dispatchEvent(chartEditor.Breadcrumbs.EventType.PREV);
  } else if (e.currentTarget === this.complete_) {
    this.dispatchEvent(chartEditor.Breadcrumbs.EventType.COMPLETE);
  }
};


/** @inheritDoc */
chartEditor.Breadcrumbs.prototype.disposeInternal = function() {
  goog.disposeAll(this.items_);
  goog.disposeAll([this.next_, this.prev_, this.complete_]);
  this.items_ = null;
  this.next_ = null;
  this.prev_ = null;
  this.complete_ = null;
  chartEditor.Breadcrumbs.base(this, 'disposeInternal');
};
