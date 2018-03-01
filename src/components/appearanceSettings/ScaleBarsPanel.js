goog.provide('anychart.chartEditorModule.ScaleBarsPanel');

goog.require('anychart.chartEditorModule.MultiplePanelsBase');
goog.require('anychart.chartEditorModule.settings.ScaleBar');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.MultiplePanelsBase}
 */
anychart.chartEditorModule.ScaleBarsPanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.ScaleBarsPanel.base(this, 'constructor', model, 'Scale Bars', opt_domHelper);

  this.stringId = 'scaleBars';

  this.setButtonLabel('+ Add scale bar');

  this.setRemoveFromIndex(0);

  this.addClassName(goog.getCssName('anychart-settings-panel-gauge-scale-bars'));
};
goog.inherits(anychart.chartEditorModule.ScaleBarsPanel, anychart.chartEditorModule.MultiplePanelsBase);


/** @override */
anychart.chartEditorModule.ScaleBarsPanel.prototype.createPanel = function() {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var panelIndex = model.addIndexedSetting('scaleBar', true);
  return new anychart.chartEditorModule.settings.ScaleBar(model, panelIndex);
};


/** @override */
anychart.chartEditorModule.ScaleBarsPanel.prototype.removePanel = function(panelIndex) {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  model.dropIndexedSetting(panelIndex, 'scaleBar');
};


/** @override */
anychart.chartEditorModule.ScaleBarsPanel.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];

    var pattern = '^scaleBar\\((\\d+)\\)$';
    var regExp = new RegExp(pattern);

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        var axisIndex = Number(match[1]);
        var panel = new anychart.chartEditorModule.settings.ScaleBar(model, axisIndex);
        this.addPanelInstance(panel);
      }
    }
  }
};
