goog.provide('chartEditor.ui.appearanceTabs.Scales');

goog.require('chartEditor.scales.ScalePanel');
goog.require('chartEditor.ui.PanelsGroup');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelsGroup}
 */
chartEditor.ui.appearanceTabs.Scales = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.Scales.base(this, 'constructor', model, 'Scales', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.SCALES;

  this.setButtonLabel('+ Add scale');

  this.removeFromIndex(0);

  this.addClassName(goog.getCssName('anychart-ce-panel-scales'));
  this.addClassName(goog.getCssName('anychart-ce-panel-group-with-btn'));
};
goog.inherits(chartEditor.ui.appearanceTabs.Scales, chartEditor.ui.PanelsGroup);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.Scales.prototype.enterDocument = function() {
  chartEditor.ui.appearanceTabs.Scales.base(this, 'enterDocument');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  if (model)
    this.getHandler().listen(model, chartEditor.events.EventType.EDITOR_MODEL_UPDATE_SPECIAL, this.onModelSpecialChange);
};


/**
 * Updates panel list on demand
 * @param {Object} evt
 */
chartEditor.ui.appearanceTabs.Scales.prototype.onModelSpecialChange = function(evt) {
  if (evt.target == this.stringId) {
    this.removeAllPanels();
    this.createPanels();
  }
};


/** @override */
chartEditor.ui.appearanceTabs.Scales.prototype.createPanel = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var panelIndex = model.addStandalone('scale');
  return new chartEditor.scales.ScalePanel(model, panelIndex);
};


/** @override */
chartEditor.ui.appearanceTabs.Scales.prototype.removePanel = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  model.dropStandalone('scale');
};


/** @override */
chartEditor.ui.appearanceTabs.Scales.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
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
