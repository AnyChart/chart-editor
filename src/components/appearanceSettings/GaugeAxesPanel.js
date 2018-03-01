goog.provide('anychart.chartEditorModule.GaugeAxesPanel');

goog.require('anychart.chartEditorModule.MultiplePanelsBase');
goog.require('anychart.chartEditorModule.settings.axes.Circular');
goog.require('anychart.chartEditorModule.settings.axes.LinearGauge');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.MultiplePanelsBase}
 */
anychart.chartEditorModule.GaugeAxesPanel = function(model, opt_domHelper) {
  anychart.chartEditorModule.GaugeAxesPanel.base(this, 'constructor', model, 'Axes', opt_domHelper);

  this.stringId = 'gaugeAxes';

  this.addClassName(goog.getCssName('anychart-settings-panel-gauge-axes'));

  this.setButtonLabel('+ Add axis');
};
goog.inherits(anychart.chartEditorModule.GaugeAxesPanel, anychart.chartEditorModule.MultiplePanelsBase);



/** @override */
anychart.chartEditorModule.GaugeAxesPanel.prototype.enterDocument = function() {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  this.isLinear = String(model.getModel()['chart']['typeKey']).indexOf('gauges.linear') === 0;
  anychart.chartEditorModule.GaugeAxesPanel.base(this, 'enterDocument');
};


/** @override */
anychart.chartEditorModule.GaugeAxesPanel.prototype.createPanel = function() {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var axisIndex = model.addAxis();

  return this.isLinear ?
      new anychart.chartEditorModule.settings.axes.LinearGauge(model, axisIndex) :
      new anychart.chartEditorModule.settings.axes.Circular(model, axisIndex);
};


/** @override */
anychart.chartEditorModule.GaugeAxesPanel.prototype.removePanel = function(panelIndex) {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  model.dropAxis(panelIndex);
};


/** @override */
anychart.chartEditorModule.GaugeAxesPanel.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];

    var pattern = '^axis\\((\\d+)\\)\\.enabled\\(\\)$';
    var regExp = new RegExp(pattern);
    var axisCount = 0;

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        var axisIndex = Number(match[1]);
        var panel = this.isLinear ?
            new anychart.chartEditorModule.settings.axes.LinearGauge(model, axisIndex) :
            new anychart.chartEditorModule.settings.axes.Circular(model, axisIndex);
        this.addPanelInstance(panel);
        axisCount++;
      }
    }

    if (axisCount === 0 && !this.isLinear) {
      // Always create 0 axis panel
      this.addPanelInstance(/** @type {anychart.chartEditorModule.SettingsPanelIndexed} */(this.createPanel()));
    }
  }
};
