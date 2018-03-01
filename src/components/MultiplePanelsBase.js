goog.provide('anychart.chartEditorModule.MultiplePanelsBase');

goog.require('anychart.chartEditorModule.Component');
goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('goog.ui.Button');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {?string=} opt_name
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.MultiplePanelsBase = function(model, opt_name, opt_domHelper) {
  anychart.chartEditorModule.MultiplePanelsBase.base(this, 'constructor', model, opt_name, opt_domHelper);

  // Should be set in children
  this.stringId = '';

  this.panels_ = [];

  this.addClassName(goog.getCssName('anychart-chart-editor-settings-panel-multiple'));
};
goog.inherits(anychart.chartEditorModule.MultiplePanelsBase, anychart.chartEditorModule.SettingsPanel);


/**
 * @type {boolean}
 * @private
 */
anychart.chartEditorModule.MultiplePanelsBase.prototype.allowAddPanels_ = true;


/** @param {boolean} value */
anychart.chartEditorModule.MultiplePanelsBase.prototype.allowAddPanels = function(value) {
  this.allowAddPanels_ = value;

  if (this.addPanelBtn_)
    goog.style.setElementShown(this.addPanelBtn_.getElement(), this.allowAddPanels_);
};


/**
 * @type {number}
 * @private
 */
anychart.chartEditorModule.MultiplePanelsBase.prototype.removeFromIndex_ = 1;


/** @param {number} value */
anychart.chartEditorModule.MultiplePanelsBase.prototype.setRemoveFromIndex = function(value) {
  this.removeFromIndex_ = value;
};


/**
 * @type {string}
 * @private
 */
anychart.chartEditorModule.MultiplePanelsBase.prototype.buttonLabel_ = '+ Add panel';


/** @param {string} value */
anychart.chartEditorModule.MultiplePanelsBase.prototype.setButtonLabel = function(value) {
  this.buttonLabel_ = value;
};


/** @inheritDoc */
anychart.chartEditorModule.MultiplePanelsBase.prototype.createDom = function() {
  anychart.chartEditorModule.MultiplePanelsBase.base(this, 'createDom');

  this.panelsContainer_ = new anychart.chartEditorModule.Component();
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
anychart.chartEditorModule.MultiplePanelsBase.prototype.enterDocument = function() {
  anychart.chartEditorModule.MultiplePanelsBase.base(this, 'enterDocument');

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
anychart.chartEditorModule.MultiplePanelsBase.prototype.removeAllPanels = function() {
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
anychart.chartEditorModule.MultiplePanelsBase.prototype.exitDocument = function() {
  this.removeAllPanels();
  anychart.chartEditorModule.MultiplePanelsBase.base(this, 'exitDocument');
};


/** @override */
anychart.chartEditorModule.MultiplePanelsBase.prototype.disposeInternal = function() {
  this.removeAllPanels();
  anychart.chartEditorModule.MultiplePanelsBase.base(this, 'disposeInternal');
};


/** @private */
anychart.chartEditorModule.MultiplePanelsBase.prototype.onAddPanel = function() {
  var panel = /** @type {anychart.chartEditorModule.SettingsPanelIndexed} */(this.createPanel());

  // Add instance to panels list
  this.addPanelInstance(panel);
};


/**
 * @param {anychart.chartEditorModule.SettingsPanelIndexed} panelInstance
 * @protected
 */
anychart.chartEditorModule.MultiplePanelsBase.prototype.addPanelInstance = function(panelInstance) {
  var panelIndex = panelInstance.getIndex();
  var panelPlotIndex = panelInstance.getPlotIndex();

  if (this.allowAddPanels_ && (!goog.isDef(this.removeFromIndex_) || panelIndex >= this.removeFromIndex_)) {
    panelInstance.allowRemove(true);
    this.getHandler().listen(panelInstance, anychart.chartEditorModule.events.EventType.PANEL_CLOSE, this.onRemovePanel);
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
    /** @type {anychart.chartEditorModule.SettingsPanelIndexed} */(this.panels_[panelPlotIndex][panelIndex - 1]).allowRemove(false);
  }

  this.panelsContainer_.addChild(panelInstance, true);
};



/**
 * @param {goog.events.Event} evt
 * @private
 */
anychart.chartEditorModule.MultiplePanelsBase.prototype.onRemovePanel = function(evt) {
  evt.stopPropagation();

  var panelInstance = /** @type {anychart.chartEditorModule.SettingsPanelIndexed} */(evt.currentTarget);
  var panelIndex = panelInstance.getIndex();
  var panelPlotIndex = panelInstance.getPlotIndex();

  this.removePanel(panelIndex);

  goog.dispose(this.panels_[panelPlotIndex][panelIndex]);
  this.panels_[panelPlotIndex][panelIndex] = null;

  if (this.allowAddPanels_) {
    for (var i = (panelIndex - 1); i >= this.removeFromIndex_; i--) {
      if (this.panels_[panelPlotIndex][i]) {
        /** @type {anychart.chartEditorModule.SettingsPanelIndexed} */(this.panels_[panelPlotIndex][i]).allowRemove(true);
        break;
      }
    }
  }
};


/**
 * @return {?anychart.chartEditorModule.SettingsPanelIndexed}
 * @protected
 */
anychart.chartEditorModule.MultiplePanelsBase.prototype.createPanel = function() {
  // Should be overridden like this:

  // var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  // var panelIndex = model.addAxis();

  // Create and configure panel instance
  // var panel = new anychart.chartEditorModule.settings.axes.Circular(model, panelIndex);
  // panel.allowEnabled(true);

  // return panel;

  return null;
};


/**
 * @param {number} panelIndex
 * @protected
 */
anychart.chartEditorModule.MultiplePanelsBase.prototype.removePanel = function(panelIndex) {
  // Should be overridden something like this:

  // var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  // model.dropAxis(axisIndex, this.xOrY);
};


/**
 * Create Axes settings panels.
 * @protected
 */
anychart.chartEditorModule.MultiplePanelsBase.prototype.createPanels = function() {
  // Should be overridden
};
