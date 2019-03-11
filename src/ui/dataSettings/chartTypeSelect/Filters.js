goog.provide('chartEditor.ui.dataSettings.chartTypeSelect.Filters');

goog.require('chartEditor.ui.Component');
goog.require('chartEditor.ui.control.checkbox.Base');


/**
 * Filters widget for chart type select menu.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.dataSettings.chartTypeSelect.Filters = function(opt_domHelper) {
  chartEditor.ui.dataSettings.chartTypeSelect.Filters.base(this, 'constructor', opt_domHelper);

  this.addClassName(goog.getCssName('anychart-ce-chart-type-filters'));
};
goog.inherits(chartEditor.ui.dataSettings.chartTypeSelect.Filters, chartEditor.ui.Component);


chartEditor.ui.dataSettings.chartTypeSelect.Filters.Map = {
  'common': 'Common',
  'stacked-value': 'Stacked',
  'stacked-percent': 'Percent stacked',
  'gauges': 'Gauges',
  'gantt': 'Gantts'
};


/** @inheritDoc */
chartEditor.ui.dataSettings.chartTypeSelect.Filters.prototype.createDom = function() {
  chartEditor.ui.dataSettings.chartTypeSelect.Filters.base(this, 'createDom');

  var map = chartEditor.ui.dataSettings.chartTypeSelect.Filters.Map;
  for (var key in map) {
    var checkbox = new chartEditor.ui.control.checkbox.Base();
    checkbox.setModel(key);
    checkbox.setCaption(map[key]);
    if ((chartEditor.PRODUCT != chartEditor.model.Product.GANTT && key === 'common') ||
        (chartEditor.PRODUCT == chartEditor.model.Product.GANTT && key === 'gantt') ) {
      checkbox.setChecked(true);
    }

    this.addChild(checkbox, true);
  }
};


/**
 * @return {Array} All checked checkboxes values.
 */
chartEditor.ui.dataSettings.chartTypeSelect.Filters.prototype.getValue = function() {
  var result = [];
  for (var i = 0; i < this.getChildCount(); i++) {
    var checkbox = this.getChildAt(i);
    if (goog.isFunction(checkbox.isChecked) && checkbox.isChecked()) {
      result.push(checkbox.getModel());
    }
  }

  return result;
};
