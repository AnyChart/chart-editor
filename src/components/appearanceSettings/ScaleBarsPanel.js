goog.provide('chartEditor.ScaleBarsPanel');

goog.require('chartEditor.MultiplePanelsBase');
goog.require('chartEditor.settings.ScaleBar');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.MultiplePanelsBase}
 */
chartEditor.ScaleBarsPanel = function(model, opt_domHelper) {
  chartEditor.ScaleBarsPanel.base(this, 'constructor', model, 'Scale Bars', opt_domHelper);

  this.stringId = 'scaleBars';

  this.setButtonLabel('+ Add scale bar');

  this.removeFromIndex(0);

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-gauge-scale-bars'));
};
goog.inherits(chartEditor.ScaleBarsPanel, chartEditor.MultiplePanelsBase);


/** @override */
chartEditor.ScaleBarsPanel.prototype.createPanel = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var panelIndex = model.addIndexedSetting('scaleBar', true);
  return new chartEditor.settings.ScaleBar(model, panelIndex);
};


/** @override */
chartEditor.ScaleBarsPanel.prototype.removePanel = function(panelIndex) {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  model.dropIndexedSetting(panelIndex, 'scaleBar');
};


/** @override */
chartEditor.ScaleBarsPanel.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];

    var pattern = '^scaleBar\\((\\d+)\\)$';
    var regExp = new RegExp(pattern);

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        var axisIndex = Number(match[1]);
        var panel = new chartEditor.settings.ScaleBar(model, axisIndex);
        this.addPanelInstance(panel);
      }
    }
  }
};
