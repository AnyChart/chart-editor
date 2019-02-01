goog.provide('chartEditor.ui.appearanceTabs.axes.RadarPolar');

goog.require('chartEditor.ui.PanelsGroup');
goog.require('chartEditor.ui.panel.axes.Polar');
goog.require('chartEditor.ui.panel.axes.Radar');
goog.require('chartEditor.ui.panel.axes.Radial');


/**
 * Base class for axes of radar and polar charts.
 *
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelsGroup}
 */
chartEditor.ui.appearanceTabs.axes.RadarPolar = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.axes.RadarPolar.base(this, 'constructor', model, 'RadarAxesPanelBase', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.RADAR_POLAR_AXES;

  /**
   * Axis prefix. Should be overridden.
   * @type {string}
   * @protected
   */
  this.xOrY = '';

  this.allowAddPanels(false);
};
goog.inherits(chartEditor.ui.appearanceTabs.axes.RadarPolar, chartEditor.ui.PanelsGroup);


/** @override */
chartEditor.ui.appearanceTabs.axes.RadarPolar.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
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
              new chartEditor.ui.panel.axes.Polar(model) :
              new chartEditor.ui.panel.axes.Radar(model)
          :
          new chartEditor.ui.panel.axes.Radial(model);
      this.addPanelInstance(panel);
      model.resumeDispatch(true);
    }
  }
};
