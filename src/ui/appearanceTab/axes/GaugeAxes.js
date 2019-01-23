goog.provide('chartEditor.ui.appearanceTabs.axes.GaugeAxes');

goog.require('chartEditor.ui.PanelsGroup');
goog.require('chartEditor.ui.panel.axes.CircularGauge');
goog.require('chartEditor.ui.panel.axes.LinearGauge');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelsGroup}
 */
chartEditor.ui.appearanceTabs.axes.GaugeAxes = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.axes.GaugeAxes.base(this, 'constructor', model, 'Axes', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.GAUGE_AXES;

  this.setButtonLabel('+ Add axis');

  this.addClassName(goog.getCssName('anychart-ce-panel-gauge-axes'));
};
goog.inherits(chartEditor.ui.appearanceTabs.axes.GaugeAxes, chartEditor.ui.PanelsGroup);



/** @override */
chartEditor.ui.appearanceTabs.axes.GaugeAxes.prototype.enterDocument = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  this.isLinear = String(model.getModel()['chart']['typeKey']).indexOf('gauges.linear') === 0;
  chartEditor.ui.appearanceTabs.axes.GaugeAxes.base(this, 'enterDocument');
};


/** @override */
chartEditor.ui.appearanceTabs.axes.GaugeAxes.prototype.createPanel = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var axisIndex = model.addAxis();

  return this.isLinear ?
      new chartEditor.ui.panel.axes.LinearGauge(model, axisIndex) :
      new chartEditor.ui.panel.axes.CircularGauge(model, axisIndex);
};


/** @override */
chartEditor.ui.appearanceTabs.axes.GaugeAxes.prototype.removePanel = function(panelIndex) {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  model.dropAxis(panelIndex);
};


/** @override */
chartEditor.ui.appearanceTabs.axes.GaugeAxes.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];

    var pattern = '^axis\\((\\d+)\\)\\.enabled\\(\\)$';
    var regExp = new RegExp(pattern);
    var axisCount = 0;

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        var axisIndex = Number(match[1]);
        var panel = this.isLinear ?
            new chartEditor.ui.panel.axes.LinearGauge(model, axisIndex) :
            new chartEditor.ui.panel.axes.CircularGauge(model, axisIndex);
        this.addPanelInstance(panel);
        axisCount++;
      }
    }

    if (axisCount === 0 && !this.isLinear) {
      // Always create 0 axis panel
      this.addPanelInstance(/** @type {chartEditor.ui.PanelIndexed} */(this.createPanel()));
    }
  }
};
