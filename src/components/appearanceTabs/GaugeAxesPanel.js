goog.provide('chartEditor.GaugeAxesPanel');

goog.require('chartEditor.MultiplePanelsBase');
goog.require('chartEditor.settings.axes.CircularGauge');
goog.require('chartEditor.settings.axes.LinearGauge');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.MultiplePanelsBase}
 */
chartEditor.GaugeAxesPanel = function(model, opt_domHelper) {
  chartEditor.GaugeAxesPanel.base(this, 'constructor', model, 'Axes', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GAUGE_AXES;

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-gauge-axes'));

  this.setButtonLabel('+ Add axis');
};
goog.inherits(chartEditor.GaugeAxesPanel, chartEditor.MultiplePanelsBase);



/** @override */
chartEditor.GaugeAxesPanel.prototype.enterDocument = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  this.isLinear = String(model.getModel()['chart']['typeKey']).indexOf('gauges.linear') === 0;
  chartEditor.GaugeAxesPanel.base(this, 'enterDocument');
};


/** @override */
chartEditor.GaugeAxesPanel.prototype.createPanel = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var axisIndex = model.addAxis();

  return this.isLinear ?
      new chartEditor.settings.axes.LinearGauge(model, axisIndex) :
      new chartEditor.settings.axes.CircularGauge(model, axisIndex);
};


/** @override */
chartEditor.GaugeAxesPanel.prototype.removePanel = function(panelIndex) {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  model.dropAxis(panelIndex);
};


/** @override */
chartEditor.GaugeAxesPanel.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];

    var pattern = '^axis\\((\\d+)\\)\\.enabled\\(\\)$';
    var regExp = new RegExp(pattern);
    var axisCount = 0;

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        var axisIndex = Number(match[1]);
        var panel = this.isLinear ?
            new chartEditor.settings.axes.LinearGauge(model, axisIndex) :
            new chartEditor.settings.axes.CircularGauge(model, axisIndex);
        this.addPanelInstance(panel);
        axisCount++;
      }
    }

    if (axisCount === 0 && !this.isLinear) {
      // Always create 0 axis panel
      this.addPanelInstance(/** @type {chartEditor.SettingsPanelIndexed} */(this.createPanel()));
    }
  }
};
