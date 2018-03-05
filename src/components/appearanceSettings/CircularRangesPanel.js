goog.provide('chartEditor.CircularRangesPanel');

goog.require('chartEditor.MultiplePanelsBase');
goog.require('chartEditor.settings.CircularRange');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.MultiplePanelsBase}
 */
chartEditor.CircularRangesPanel = function(model, opt_domHelper) {
  chartEditor.CircularRangesPanel.base(this, 'constructor', model, 'Ranges', opt_domHelper);

  this.stringId = 'circularRanges';

  this.setButtonLabel('+ Add range');

  this.setRemoveFromIndex(0);

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-gauge-ranges'));
};
goog.inherits(chartEditor.CircularRangesPanel, chartEditor.MultiplePanelsBase);


/** @override */
chartEditor.CircularRangesPanel.prototype.createPanel = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var panelIndex = model.addIndexedSetting('range', true);
  return new chartEditor.settings.CircularRange(model, panelIndex);
};


/** @override */
chartEditor.CircularRangesPanel.prototype.removePanel = function(panelIndex) {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  model.dropIndexedSetting(panelIndex, 'range');
};


/** @override */
chartEditor.CircularRangesPanel.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];

    var pattern = '^range\\((\\d+)\\)$';
    var regExp = new RegExp(pattern);

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        var axisIndex = Number(match[1]);
        var panel = new chartEditor.settings.CircularRange(model, axisIndex);
        this.addPanelInstance(panel);
      }
    }
  }
};
