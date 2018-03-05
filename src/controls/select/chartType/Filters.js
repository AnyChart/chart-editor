goog.provide('chartEditor.controls.chartType.Filters');

goog.require('chartEditor.Component');
goog.require('chartEditor.checkbox.Base');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.controls.chartType.Filters = function(opt_domHelper) {
  chartEditor.controls.chartType.Filters.base(this, 'constructor', opt_domHelper);

};
goog.inherits(chartEditor.controls.chartType.Filters, chartEditor.Component);


/** @type {string} */
chartEditor.controls.chartType.Filters.CSS_CLASS = goog.getCssName('anychart-ce-chart-type-filters');


chartEditor.controls.chartType.Filters.Map = {
  'common': 'Common',
  'stacked-value': 'Stacked',
  'stacked-percent': 'Percent stacked',
  'gauges': 'Gauges'
};


/** @inheritDoc */
chartEditor.controls.chartType.Filters.prototype.createDom = function() {
  chartEditor.controls.chartType.Filters.base(this, 'createDom');

  this.addClassName(chartEditor.controls.chartType.Filters.CSS_CLASS);

  var map = chartEditor.controls.chartType.Filters.Map;
  for (var key in map) {
    var checkbox = new chartEditor.checkbox.Base();
    checkbox.setModel(key);
    checkbox.setCaption(map[key]);
    if (key === 'common') checkbox.setChecked(true);

    this.addChild(checkbox, true);
  }
};


/**
 * @return {Array} All checked checkboxes values.
 */
chartEditor.controls.chartType.Filters.prototype.getValue = function() {
  var result = [];
  for (var i = 0; i < this.getChildCount(); i++) {
    var checkbox = this.getChildAt(i);
    if (goog.isFunction(checkbox.isChecked) && checkbox.isChecked()) {
      result.push(checkbox.getModel());
    }
  }

  return result;
};
