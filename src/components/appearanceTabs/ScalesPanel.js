goog.provide('chartEditor.ScalesPanel');

goog.require('chartEditor.MultiplePanelsBase');
goog.require('chartEditor.scales.ScalePanel');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.MultiplePanelsBase}
 */
chartEditor.ScalesPanel = function(model, opt_domHelper) {
  chartEditor.ScalesPanel.base(this, 'constructor', model, 'Scales', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.SCALES;

  this.setButtonLabel('+ Add scale');

  this.removeFromIndex(0);

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-scales'));
};
goog.inherits(chartEditor.ScalesPanel, chartEditor.MultiplePanelsBase);


/** @inheritDoc */
chartEditor.ScalesPanel.prototype.enterDocument = function() {
  chartEditor.ScalesPanel.base(this, 'enterDocument');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  if (model)
    this.getHandler().listen(model, chartEditor.events.EventType.EDITOR_MODEL_UPDATE_SPECIAL, this.onModelSpecialChange);
};


/**
 * Updates panels list on demand
 * @param {Object} evt
 */
chartEditor.ScalesPanel.prototype.onModelSpecialChange = function(evt) {
  if (evt.target == this.stringId) {
    this.removeAllPanels();
    this.createPanels();
  }
};


/** @override */
chartEditor.ScalesPanel.prototype.createPanel = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var panelIndex = model.addStandalone('scale');
  return new chartEditor.scales.ScalePanel(model, panelIndex);
};


/** @override */
chartEditor.ScalesPanel.prototype.removePanel = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  model.dropStandalone('scale');
};


/** @override */
chartEditor.ScalesPanel.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    var scales = model.getValue([['standalones'], 'scale']);

    if (scales) {
      for (var i = 0; i < scales.length; i++) {
        var panel = new chartEditor.scales.ScalePanel(model, i);
        if (scales[i]['key']) {
          panel.setScaleAsDefault(scales[i]['type']);
        }

        this.addPanelInstance(panel);
      }
    }
  }
};
