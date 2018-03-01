goog.provide('anychart.chartEditorModule.CartesianAxesPanelBase');

goog.require('anychart.chartEditorModule.MultiplePanelsBase');
goog.require('anychart.chartEditorModule.settings.axes.Cartesian');


/**
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.MultiplePanelsBase}
 */
anychart.chartEditorModule.CartesianAxesPanelBase = function(model, opt_domHelper) {
  anychart.chartEditorModule.CartesianAxesPanelBase.base(this, 'constructor', model, 'CartesianAxesPanelBase', opt_domHelper);

  this.stringId = 'cartesianAxes';

  /**
   * Axis prefix. Should be overridden.
   * @type {string}
   * @protected
   */
  this.xOrY = '';

  this.setButtonLabel('+ Add axis');

  this.addClassName(goog.getCssName('anychart-settings-panel-axes'));
};
goog.inherits(anychart.chartEditorModule.CartesianAxesPanelBase, anychart.chartEditorModule.MultiplePanelsBase);


/** @inheritDoc */
anychart.chartEditorModule.CartesianAxesPanelBase.prototype.enterDocument = function() {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var chartType = model.getModel()['chart']['type'];
  this.allowAddPanels(chartType !== 'radar' && chartType !== 'polar');

  anychart.chartEditorModule.CartesianAxesPanelBase.base(this, 'enterDocument');
};


/** @override */
anychart.chartEditorModule.CartesianAxesPanelBase.prototype.createPanel = function() {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var axisIndex = model.addAxis(this.xOrY);

  return new anychart.chartEditorModule.settings.axes.Cartesian(model, axisIndex, this.xOrY);
};


/** @override */
anychart.chartEditorModule.CartesianAxesPanelBase.prototype.removePanel = function(panelIndex) {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  model.dropAxis(panelIndex, this.xOrY);
};


/** @override */
anychart.chartEditorModule.CartesianAxesPanelBase.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];

    var pattern = '^' + this.xOrY + 'Axis\\((\\d+)\\)\\.enabled\\(\\)$';
    var regExp = new RegExp(pattern);
    var axisCount = 0;

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        var axisIndex = Number(match[1]);
        var panel = new anychart.chartEditorModule.settings.axes.Cartesian(model, axisIndex, this.xOrY);
        this.addPanelInstance(panel);
        axisCount++;
      }
    }

    if (axisCount === 0) {
      // Always create 0 axis panel
      this.addPanelInstance(/** @type {anychart.chartEditorModule.SettingsPanelIndexed} */(this.createPanel()));
    }
  }
};
