goog.provide('chartEditor.ui.appearanceTabs.ScaleBars');

goog.require('chartEditor.ui.PanelsGroup');
goog.require('chartEditor.ui.panel.ScaleBar');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelsGroup}
 */
chartEditor.ui.appearanceTabs.ScaleBars = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.ScaleBars.base(this, 'constructor', model, 'Scale Bars', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.SCALE_BARS;

  this.setButtonLabel('+ Add scale bar');

  this.removeFromIndex(0);

  this.addClassName(goog.getCssName('anychart-ce-panel-gauge-scale-bars'));
};
goog.inherits(chartEditor.ui.appearanceTabs.ScaleBars, chartEditor.ui.PanelsGroup);


/** @override */
chartEditor.ui.appearanceTabs.ScaleBars.prototype.createPanel = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var panelIndex = model.addIndexedSetting('scaleBar', true);
  return new chartEditor.ui.panel.ScaleBar(model, panelIndex);
};


/** @override */
chartEditor.ui.appearanceTabs.ScaleBars.prototype.removePanel = function(panelIndex) {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  model.dropIndexedSetting(panelIndex, 'scaleBar');
};


/** @override */
chartEditor.ui.appearanceTabs.ScaleBars.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];

    var pattern = '^scaleBar\\((\\d+)\\)$';
    var regExp = new RegExp(pattern);

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        var axisIndex = Number(match[1]);
        var panel = new chartEditor.ui.panel.ScaleBar(model, axisIndex);
        this.addPanelInstance(panel);
      }
    }
  }
};
