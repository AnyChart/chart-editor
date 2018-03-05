goog.provide('chartEditor.CartesianAxesPanelBase');

goog.require('chartEditor.MultiplePanelsBase');
goog.require('chartEditor.settings.axes.Cartesian');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.MultiplePanelsBase}
 */
chartEditor.CartesianAxesPanelBase = function(model, opt_domHelper) {
  chartEditor.CartesianAxesPanelBase.base(this, 'constructor', model, 'CartesianAxesPanelBase', opt_domHelper);

  this.stringId = 'cartesianAxes';

  /**
   * Axis prefix. Should be overridden.
   * @type {string}
   * @protected
   */
  this.xOrY = '';

  this.setButtonLabel('+ Add axis');

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-axes'));
};
goog.inherits(chartEditor.CartesianAxesPanelBase, chartEditor.MultiplePanelsBase);


/** @inheritDoc */
chartEditor.CartesianAxesPanelBase.prototype.enterDocument = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var chartType = model.getModel()['chart']['type'];
  this.allowAddPanels(chartType !== 'radar' && chartType !== 'polar');

  chartEditor.CartesianAxesPanelBase.base(this, 'enterDocument');
};


/** @override */
chartEditor.CartesianAxesPanelBase.prototype.createPanel = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var axisIndex = model.addAxis(this.xOrY);

  return new chartEditor.settings.axes.Cartesian(model, axisIndex, this.xOrY);
};


/** @override */
chartEditor.CartesianAxesPanelBase.prototype.removePanel = function(panelIndex) {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  model.dropAxis(panelIndex, this.xOrY);
};


/** @override */
chartEditor.CartesianAxesPanelBase.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.EditorModel} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];

    var pattern = '^' + this.xOrY + 'Axis\\((\\d+)\\)\\.enabled\\(\\)$';
    var regExp = new RegExp(pattern);
    var axisCount = 0;

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        var axisIndex = Number(match[1]);
        var panel = new chartEditor.settings.axes.Cartesian(model, axisIndex, this.xOrY);
        this.addPanelInstance(panel);
        axisCount++;
      }
    }

    if (axisCount === 0) {
      // Always create 0 axis panel
      this.addPanelInstance(/** @type {chartEditor.SettingsPanelIndexed} */(this.createPanel()));
    }
  }
};
