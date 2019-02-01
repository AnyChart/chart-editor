goog.provide('chartEditor.ui.appearanceTabs.CircularRanges');

goog.require('chartEditor.enums');
goog.require('chartEditor.ui.PanelsGroup');
goog.require('chartEditor.ui.panel.CircularRange');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelsGroup}
 */
chartEditor.ui.appearanceTabs.CircularRanges = function(model, opt_domHelper) {
  chartEditor.ui.appearanceTabs.CircularRanges.base(this, 'constructor', model, 'Ranges', opt_domHelper);

  this.stringId = chartEditor.enums.EditorTabs.CIRCULAR_RANGES;

  this.setButtonLabel('+ Add range');

  this.removeFromIndex(0);

  this.addClassName(goog.getCssName('anychart-ce-panel-gauge-ranges'));
};
goog.inherits(chartEditor.ui.appearanceTabs.CircularRanges, chartEditor.ui.PanelsGroup);


/** @override */
chartEditor.ui.appearanceTabs.CircularRanges.prototype.createPanel = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var panelIndex = model.addIndexedSetting('range', true);
  return new chartEditor.ui.panel.CircularRange(model, panelIndex);
};


/** @override */
chartEditor.ui.appearanceTabs.CircularRanges.prototype.removePanel = function(panelIndex) {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  model.dropIndexedSetting(panelIndex, 'range');
};


/** @override */
chartEditor.ui.appearanceTabs.CircularRanges.prototype.createPanels = function() {
  if (!this.isExcluded()) {
    var model = /** @type {chartEditor.model.Base} */(this.getModel());
    var settings = model.getModel()['chart']['settings'];

    var pattern = '^range\\((\\d+)\\)$';
    var regExp = new RegExp(pattern);

    for (var key in settings) {
      var match = key.match(regExp);
      if (match) {
        var axisIndex = Number(match[1]);
        var panel = new chartEditor.ui.panel.CircularRange(model, axisIndex);
        this.addPanelInstance(panel);
      }
    }
  }
};
