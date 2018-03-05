goog.provide('chartEditor.MultiplePanelsBase');

goog.require('chartEditor.Component');
goog.require('chartEditor.SettingsPanel');
goog.require('goog.ui.Button');


/**
 * @param {chartEditor.EditorModel} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.MultiplePanelsBase = function(model, opt_name, opt_domHelper) {
  chartEditor.MultiplePanelsBase.base(this, 'constructor', model, opt_name, opt_domHelper);

  // Should be set in children
  this.stringId = '';

  this.panels_ = [];

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-multiple'));
};
goog.inherits(chartEditor.MultiplePanelsBase, chartEditor.SettingsPanel);


/**
 * @type {boolean}
 * @private
 */
chartEditor.MultiplePanelsBase.prototype.allowAddPanels_ = true;


/** @param {boolean} value */
chartEditor.MultiplePanelsBase.prototype.allowAddPanels = function(value) {
  this.allowAddPanels_ = value;

  if (this.addPanelBtn_)
    goog.style.setElementShown(this.addPanelBtn_.getElement(), this.allowAddPanels_);
};


/**
 * @type {number}
 * @private
 */
chartEditor.MultiplePanelsBase.prototype.removeFromIndex_ = 1;


/** @param {number} value */
chartEditor.MultiplePanelsBase.prototype.setRemoveFromIndex = function(value) {
  this.removeFromIndex_ = value;
};


/**
 * @type {string}
 * @private
 */
chartEditor.MultiplePanelsBase.prototype.buttonLabel_ = '+ Add panel';


/** @param {string} value */
chartEditor.MultiplePanelsBase.prototype.setButtonLabel = function(value) {
  this.buttonLabel_ = value;
};


/** @inheritDoc */
chartEditor.MultiplePanelsBase.prototype.createDom = function() {
  chartEditor.MultiplePanelsBase.base(this, 'createDom');

  this.panelsContainer_ = new chartEditor.Component();
  this.addChild(this.panelsContainer_, true);

  if (this.allowAddPanels_) {
    var addPanelBtnRenderer = /** @type {goog.ui.ButtonRenderer} */(goog.ui.ControlRenderer.getCustomRenderer(
        goog.ui.ButtonRenderer,
        'anychart-axes-panel-add-axis-btn'));

    this.addPanelBtn_ = new goog.ui.Button(this.buttonLabel_, addPanelBtnRenderer);
    this.addChild(this.addPanelBtn_, true);
  }
};


/** @inheritDoc */
chartEditor.MultiplePanelsBase.prototype.enterDocument = function() {
  chartEditor.MultiplePanelsBase.base(this, 'enterDocument');

  if (this.allowAddPanels_ && this.addPanelBtn_) {
    goog.style.setElementShown(this.addPanelBtn_.getElement(), true);
    this.getHandler().listen(this.addPanelBtn_, goog.ui.Component.EventType.ACTION, this.onAddPanel);
  }

  this.createPanels();

  if (this.panels_.length === 1 && this.panels_[0].length === 1 && goog.isFunction(this.panels_[0][0].expand))
    this.panels_[0][0].expand();
};


/**
 * Removes all panels elements from panel.
 * @private
 */
chartEditor.MultiplePanelsBase.prototype.removeAllPanels = function() {
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
chartEditor.MultiplePanelsBase.prototype.exitDocument = function() {
  this.removeAllPanels();
  chartEditor.MultiplePanelsBase.base(this, 'exitDocument');
};


/** @override */
chartEditor.MultiplePanelsBase.prototype.disposeInternal = function() {
  this.removeAllPanels();
  chartEditor.MultiplePanelsBase.base(this, 'disposeInternal');
};


/** @private */
chartEditor.MultiplePanelsBase.prototype.onAddPanel = function() {
  var panel = /** @type {chartEditor.SettingsPanelIndexed} */(this.createPanel());

  // Add instance to panels list
  this.addPanelInstance(panel);
};


/**
 * @param {chartEditor.SettingsPanelIndexed} panelInstance
 * @protected
 */
chartEditor.MultiplePanelsBase.prototype.addPanelInstance = function(panelInstance) {
  var panelIndex = panelInstance.getIndex();
  var panelPlotIndex = panelInstance.getPlotIndex();

  if (this.allowAddPanels_ && (!goog.isDef(this.removeFromIndex_) || panelIndex >= this.removeFromIndex_)) {
    panelInstance.allowRemove(true);
    this.getHandler().listen(panelInstance, chartEditor.events.EventType.PANEL_CLOSE, this.onRemovePanel);
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
    /** @type {chartEditor.SettingsPanelIndexed} */(this.panels_[panelPlotIndex][panelIndex - 1]).allowRemove(false);
  }

  this.panelsContainer_.addChild(panelInstance, true);
};



/**
 * @param {goog.events.Event} evt
 * @private
 */
chartEditor.MultiplePanelsBase.prototype.onRemovePanel = function(evt) {
  evt.stopPropagation();

  var panelInstance = /** @type {chartEditor.SettingsPanelIndexed} */(evt.currentTarget);
  var panelIndex = panelInstance.getIndex();
  var panelPlotIndex = panelInstance.getPlotIndex();

  this.removePanel(panelIndex);

  goog.dispose(this.panels_[panelPlotIndex][panelIndex]);
  this.panels_[panelPlotIndex][panelIndex] = null;

  if (this.allowAddPanels_) {
    for (var i = (panelIndex - 1); i >= this.removeFromIndex_; i--) {
      if (this.panels_[panelPlotIndex][i]) {
        /** @type {chartEditor.SettingsPanelIndexed} */(this.panels_[panelPlotIndex][i]).allowRemove(true);
        break;
      }
    }
  }
};


/**
 * @return {?chartEditor.SettingsPanelIndexed}
 * @protected
 */
chartEditor.MultiplePanelsBase.prototype.createPanel = function() {
  // Should be overridden like this:

  // var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  // var panelIndex = model.addAxis();

  // Create and configure panel instance
  // var panel = new chartEditor.settings.axes.Circular(model, panelIndex);
  // panel.allowEnabled(true);

  // return panel;

  return null;
};


/**
 * @param {number} panelIndex
 * @protected
 */
chartEditor.MultiplePanelsBase.prototype.removePanel = function(panelIndex) {
  // Should be overridden something like this:

  // var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  // model.dropAxis(axisIndex, this.xOrY);
};


/**
 * Create Axes settings panels.
 * @protected
 */
chartEditor.MultiplePanelsBase.prototype.createPanels = function() {
  // Should be overridden
};
