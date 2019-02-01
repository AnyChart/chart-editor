goog.provide('chartEditor.ui.appearanceTabs.ChartLabels');

goog.require('chartEditor.enums');
goog.require('chartEditor.ui.PanelsGroup');
goog.require('chartEditor.ui.panel.ChartLabel');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelsGroup}
 */
chartEditor.ui.appearanceTabs.ChartLabels = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.ChartLabels.base(this, 'constructor', model, 'Chart Labels', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.CHART_LABELS;

  this.setButtonLabel('+ Add label');

  this.removeFromIndex(0);

  this.addClassName(goog.getCssName('anychart-ce-panel-gauge-ranges'));
};
goog.inherits(chartEditor.ui.appearanceTabs.ChartLabels, chartEditor.ui.PanelsGroup);


/** @override */
chartEditor.ui.appearanceTabs.ChartLabels.prototype.createPanel = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var panelIndex = model.addIndexedSetting('label', true);
  return new chartEditor.ui.panel.ChartLabel(model, panelIndex);
};


/** @override */
chartEditor.ui.appearanceTabs.ChartLabels.prototype.removePanel = function(panelIndex) {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  model.dropIndexedSetting(panelIndex, 'label');
};


/** @override */
chartEditor.ui.appearanceTabs.ChartLabels.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];

    var pattern = '^label\\((\\d+)\\)$';
    var regExp = new RegExp(pattern);

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        var axisIndex = Number(match[1]);
        var panel = new chartEditor.ui.panel.ChartLabel(model, axisIndex);
        this.addPanelInstance(panel);
      }
    }
  }
};
