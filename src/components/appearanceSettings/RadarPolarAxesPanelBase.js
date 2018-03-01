goog.provide('anychart.chartEditorModule.RadarPolarAxesPanelBase');

goog.require('anychart.chartEditorModule.MultiplePanelsBase');
goog.require('anychart.chartEditorModule.settings.axes.Polar');
goog.require('anychart.chartEditorModule.settings.axes.Radar');
goog.require('anychart.chartEditorModule.settings.axes.Radial');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.MultiplePanelsBase}
 */
anychart.chartEditorModule.RadarPolarAxesPanelBase = function(model, opt_domHelper) {
  anychart.chartEditorModule.RadarPolarAxesPanelBase.base(this, 'constructor', model, 'RadarAxesPanelBase', opt_domHelper);

  this.stringId = 'radarPolarAxes';

  /**
   * Axis prefix. Should be overridden.
   * @type {string}
   * @protected
   */
  this.xOrY = '';

  this.allowAddPanels(false);
};
goog.inherits(anychart.chartEditorModule.RadarPolarAxesPanelBase, anychart.chartEditorModule.MultiplePanelsBase);


/** @override */
anychart.chartEditorModule.RadarPolarAxesPanelBase.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
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
      var panel = this.xOrY === 'x' ?
          chartType === 'polar' ?
              new anychart.chartEditorModule.settings.axes.Polar(model) :
              new anychart.chartEditorModule.settings.axes.Radar(model)
          :
          new anychart.chartEditorModule.settings.axes.Radial(model);
      this.addPanelInstance(panel);
    }
  }
};
