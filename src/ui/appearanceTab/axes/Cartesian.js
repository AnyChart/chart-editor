goog.provide('chartEditor.ui.appearanceTabs.axes.Cartesian');

goog.require('chartEditor.ui.PanelsGroup');
goog.require('chartEditor.ui.panel.axes.Cartesian');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelsGroup}
 */
chartEditor.ui.appearanceTabs.axes.Cartesian = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.axes.Cartesian.base(this, 'constructor', model, 'CartesianAxesPanelBase', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.CARTESIAN_AXES;

  /**
   * Axis prefix. Should be overridden.
   * @type {string}
   * @protected
   */
  this.xOrY = '';

  this.setButtonLabel('+ Add axis');

  this.addClassName(goog.getCssName('anychart-ce-panel-axes'));
};
goog.inherits(chartEditor.ui.appearanceTabs.axes.Cartesian, chartEditor.ui.PanelsGroup);


/** @inheritDoc */
chartEditor.ui.appearanceTabs.axes.Cartesian.prototype.enterDocument = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var chartType = model.getModel()['chart']['type'];
  this.allowAddPanels(chartType !== 'radar' && chartType !== 'polar');

  chartEditor.ui.appearanceTabs.axes.Cartesian.base(this, 'enterDocument');
};


/** @override */
chartEditor.ui.appearanceTabs.axes.Cartesian.prototype.createPanel = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var axisIndex = model.addAxis(this.xOrY);

  return new chartEditor.ui.panel.axes.Cartesian(model, axisIndex, this.xOrY);
};


/** @override */
chartEditor.ui.appearanceTabs.axes.Cartesian.prototype.removePanel = function(panelIndex) {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  model.dropAxis(panelIndex, this.xOrY);
};


/** @override */
chartEditor.ui.appearanceTabs.axes.Cartesian.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];

    var pattern = '^' + this.xOrY + 'Axis\\((\\d+)\\)\\.enabled\\(\\)$';
    var regExp = new RegExp(pattern);
    var axisCount = 0;

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        var axisIndex = Number(match[1]);
        var panel = new chartEditor.ui.panel.axes.Cartesian(model, axisIndex, this.xOrY);
        this.addPanelInstance(panel);
        axisCount++;
      }
    }

    if (axisCount === 0) {
      model.suspendDispatch();
      // Always create 0 axis panel
      this.addPanelInstance(/** @type {chartEditor.ui.PanelIndexed} */(this.createPanel()));
      if (model.getValue([['chart'], 'type']) === chartEditor.enums.ChartType.QUADRANT)
        this.addPanelInstance(/** @type {chartEditor.ui.PanelIndexed} */(this.createPanel()));
      model.resumeDispatch(true);
    }
  }
};
