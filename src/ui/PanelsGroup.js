goog.provide('chartEditor.ui.PanelsGroup');

goog.require('chartEditor.ui.Component');
goog.require('chartEditor.ui.Panel');
goog.require('goog.ui.Button');


/**
 * @param {chartEditor.model.Base} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.PanelsGroup = function(model, opt_name, opt_domHelper) {
  chartEditor.ui.PanelsGroup.base(this, 'constructor', model, opt_name, opt_domHelper);

  // Should be set in children
  this.stringId = '';

  this.panels_ = [];

  this.allowTopElement = false;

  this.addClassName(goog.getCssName('anychart-ce-panel-group'));
};
goog.inherits(chartEditor.ui.PanelsGroup, chartEditor.ui.Panel);


/**
 * @type {boolean}
 * @private
 */
chartEditor.ui.PanelsGroup.prototype.allowAddPanels_ = true;


/** @param {boolean} value */
chartEditor.ui.PanelsGroup.prototype.allowAddPanels = function(value) {
  this.allowAddPanels_ = value;

  if (this.addPanelBtn_) {
    goog.style.setElementShown(this.addPanelBtn_.getElement(), this.allowAddPanels_);
  }

  var className = goog.getCssName('anychart-ce-panel-group-with-btn');
  if (this.allowAddPanels_)
    this.addClassName(className);
  else
    this.removeClassName(className);
};


/**
 * @type {number}
 * @private
 */
chartEditor.ui.PanelsGroup.prototype.removeFromIndex_ = 1;


/** @param {number} value */
chartEditor.ui.PanelsGroup.prototype.removeFromIndex = function(value) {
  this.removeFromIndex_ = value;
};


/**
 * @type {string}
 * @private
 */
chartEditor.ui.PanelsGroup.prototype.buttonLabel_ = '+ Add panel';


/** @param {string} value */
chartEditor.ui.PanelsGroup.prototype.setButtonLabel = function(value) {
  this.buttonLabel_ = value;
};


/** @inheritDoc */
chartEditor.ui.PanelsGroup.prototype.createDom = function() {
  chartEditor.ui.PanelsGroup.base(this, 'createDom');

  this.panelsContainer_ = new chartEditor.ui.Component();
  this.addChild(this.panelsContainer_, true);

  if (this.allowAddPanels_) {
    var addPanelBtnRenderer = /** @type {goog.ui.ButtonRenderer} */(goog.ui.ControlRenderer.getCustomRenderer(
        goog.ui.ButtonRenderer,
        'anychart-ce-blue-btn'));


    this.addPanelBtn_ = new goog.ui.Button(this.buttonLabel_, addPanelBtnRenderer);
    this.addPanelBtn_.addClassName('anychart-ce-add-btn');
    this.addChild(this.addPanelBtn_, true);
  }

  goog.style.setElementShown(this.getTopElement(), this.allowTopElement);
};


/** @inheritDoc */
chartEditor.ui.PanelsGroup.prototype.enterDocument = function() {
  chartEditor.ui.PanelsGroup.base(this, 'enterDocument');

  if (this.allowAddPanels_ && this.addPanelBtn_) {
    goog.style.setElementShown(this.addPanelBtn_.getElement(), true);
    this.getHandler().listen(this.addPanelBtn_, goog.ui.Component.EventType.ACTION, this.onAddPanel);
  }

  this.createPanels();

  if (this.panels_.length === 1 && this.panels_[0].length === 1 && goog.isFunction(this.panels_[0][0].expand))
    this.panels_[0][0].expand();
};


/**
 * Removes all panel elements from panel.
 */
chartEditor.ui.PanelsGroup.prototype.removeAllPanels = function() {
  for (var i = 0; i < this.panels_.length; i++) {
    for (var j = 0; j < this.panels_[i].length; j++) {
      if (this.panels_[i][j]) {
        this.panelsContainer_.removeChild(this.panels_[i][j], true);
        goog.dispose(this.panels_[i][j]);
      }
    }
  }
  this.panels_.length = 0;
};


/** @override */
chartEditor.ui.PanelsGroup.prototype.exitDocument = function() {
  this.removeAllPanels();
  chartEditor.ui.PanelsGroup.base(this, 'exitDocument');
};


/** @override */
chartEditor.ui.PanelsGroup.prototype.disposeInternal = function() {
  this.removeAllPanels();
  chartEditor.ui.PanelsGroup.base(this, 'disposeInternal');
};


/** @private */
chartEditor.ui.PanelsGroup.prototype.onAddPanel = function() {
  var panel = /** @type {chartEditor.ui.PanelIndexed} */(this.createPanel());

  // Add instance to panel list
  if (panel)
    this.addPanelInstance(panel);
};


/**
 * @param {chartEditor.ui.PanelIndexed} panelInstance
 * @protected
 */
chartEditor.ui.PanelsGroup.prototype.addPanelInstance = function(panelInstance) {
  var panelIndex = panelInstance.getIndex();
  var panelPlotIndex = panelInstance.getPlotIndex();

  if (panelInstance.allowRemove() && this.allowAddPanels_ &&
      (!goog.isDef(this.removeFromIndex_) || panelIndex >= this.removeFromIndex_)) {

    this.getHandler().listen(panelInstance, chartEditor.events.EventType.PANEL_CLOSE, this.onRemovePanel);

  } else {
    panelInstance.allowRemove(false);
  }

  if (this.panels_.length <= panelPlotIndex)
    this.panels_.push([]);

  if (this.panels_[panelPlotIndex].length > panelIndex)
    this.panels_[panelPlotIndex][panelIndex] = panelInstance;
  else {
    if (this.panels_[panelPlotIndex].length < panelIndex) {
      for (var i = this.panels_[panelPlotIndex].length; i < panelIndex; i++) {
        this.panels_[panelPlotIndex].push(null);
      }
    }
    this.panels_[panelPlotIndex].push(panelInstance);
  }

  if (this.allowAddPanels_ && panelIndex > 0 && this.panels_[panelPlotIndex][panelIndex - 1]) {
    /** @type {chartEditor.ui.PanelIndexed} */(this.panels_[panelPlotIndex][panelIndex - 1]).allowRemove(false);
  }

  this.panelsContainer_.addChild(panelInstance, true);
};



/**
 * @param {goog.events.Event} evt
 * @private
 */
chartEditor.ui.PanelsGroup.prototype.onRemovePanel = function(evt) {
  evt.stopPropagation();

  var panelInstance = /** @type {chartEditor.ui.PanelIndexed} */(evt.currentTarget);
  var panelIndex = panelInstance.getIndex();
  var panelPlotIndex = panelInstance.getPlotIndex();

  this.removePanel(panelIndex);

  goog.dispose(this.panels_[panelPlotIndex][panelIndex]);
  this.panels_[panelPlotIndex][panelIndex] = null;

  if (this.allowAddPanels_) {
    for (var i = (panelIndex - 1); i >= this.removeFromIndex_; i--) {
      if (this.panels_[panelPlotIndex][i]) {
        /** @type {chartEditor.ui.PanelIndexed} */(this.panels_[panelPlotIndex][i]).allowRemove(true);
        break;
      }
    }
  }
};


/** @inheritDoc */
chartEditor.ui.PanelsGroup.prototype.onReset = function(evt) {
  for (var i = this.panels_.length; i--;) {
    for (var j = this.panels_[i].length; j--;) {
      if (this.panels_[i][j]) // Can be null
        this.panels_[i][j].reset();
    }
  }
};


/**
 * @return {?chartEditor.ui.PanelIndexed}
 * @protected
 */
chartEditor.ui.PanelsGroup.prototype.createPanel = function() {
  // Should be overridden
  // return panel;

  return null;
};


/**
 * @param {number} panelIndex
 * @protected
 */
chartEditor.ui.PanelsGroup.prototype.removePanel = function(panelIndex) {
  // Should be overridden something like this:

  // var model = /** @type {chartEditor.model.Base} */(this.getModel());
  // model.dropAxis(axisIndex, this.xOrY);
};


/**
 * Create Axes panel panel.
 * @protected
 */
chartEditor.ui.PanelsGroup.prototype.createPanels = function() {
  // Should be overridden
};
