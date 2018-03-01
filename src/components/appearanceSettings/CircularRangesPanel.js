goog.provide('anychart.chartEditorModule.CircularRangesPanel');

goog.require('anychart.chartEditorModule.MultiplePanelsBase');
goog.require('anychart.chartEditorModule.settings.CircularRange');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.MultiplePanelsBase}
 */
anychart.chartEditorModule.CircularRangesPanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.CircularRangesPanel.base(this, 'constructor', model, 'Ranges', opt_domHelper);

  this.stringId = 'circularRanges';

  this.setButtonLabel('+ Add range');

  this.setRemoveFromIndex(0);

  this.addClassName(goog.getCssName('anychart-settings-panel-gauge-ranges'));
};
goog.inherits(anychart.chartEditorModule.CircularRangesPanel, anychart.chartEditorModule.MultiplePanelsBase);


/** @override */
anychart.chartEditorModule.CircularRangesPanel.prototype.createPanel = function() {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var panelIndex = model.addIndexedSetting('range', true);
  return new anychart.chartEditorModule.settings.CircularRange(model, panelIndex);
};


/** @override */
anychart.chartEditorModule.CircularRangesPanel.prototype.removePanel = function(panelIndex) {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  model.dropIndexedSetting(panelIndex, 'range');
};


/** @override */
anychart.chartEditorModule.CircularRangesPanel.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];

    var pattern = '^range\\((\\d+)\\)$';
    var regExp = new RegExp(pattern);

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        var axisIndex = Number(match[1]);
        var panel = new anychart.chartEditorModule.settings.CircularRange(model, axisIndex);
        this.addPanelInstance(panel);
      }
    }
  }
};
