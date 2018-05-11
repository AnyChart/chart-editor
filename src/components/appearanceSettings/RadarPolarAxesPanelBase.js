goog.provide('chartEditor.RadarPolarAxesPanelBase');

goog.require('chartEditor.MultiplePanelsBase');
goog.require('chartEditor.settings.axes.Polar');
goog.require('chartEditor.settings.axes.Radar');
goog.require('chartEditor.settings.axes.Radial');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.MultiplePanelsBase}
 */
chartEditor.RadarPolarAxesPanelBase = function(model, opt_domHelper) {
  chartEditor.RadarPolarAxesPanelBase.base(this, 'constructor', model, 'RadarAxesPanelBase', opt_domHelper);

  this.stringId = 'radarPolarAxes';

  /**
   * Axis prefix. Should be overridden.
   * @type {string}
   * @protected
   */
  this.xOrY = '';

  this.allowAddPanels(false);
};
goog.inherits(chartEditor.RadarPolarAxesPanelBase, chartEditor.MultiplePanelsBase);


/** @override */
chartEditor.RadarPolarAxesPanelBase.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];
    var chartType = model.getModel()['chart']['type'];

    var pattern = '^' + this.xOrY + 'Axis\\(\\)\\.enabled\\(\\)$';
    var regExp = new RegExp(pattern);
    var axisCount = 0;

    for (var key in settings) {
      if (regExp.test(key)) {
        axisCount++;
        break;
      }
    }

    if (axisCount === 0) {
      // Always create 0 axis panel
      model.suspendDispatch();
      var panel = this.xOrY === 'x' ?
          chartType === 'polar' ?
              new chartEditor.settings.axes.Polar(model) :
              new chartEditor.settings.axes.Radar(model)
          :
          new chartEditor.settings.axes.Radial(model);
      this.addPanelInstance(panel);
      model.resumeDispatch(true);
    }
  }
};
