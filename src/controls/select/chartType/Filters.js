goog.provide('anychart.chartEditorModule.controls.chartType.Filters');

goog.require('anychart.chartEditorModule.Component');
goog.require('anychart.chartEditorModule.checkbox.Base');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {anychart.chartEditorModule.Component}
 */
anychart.chartEditorModule.controls.chartType.Filters = function(opt_domHelper) {
  anychart.chartEditorModule.controls.chartType.Filters.base(this, 'constructor', opt_domHelper);

};
goog.inherits(anychart.chartEditorModule.controls.chartType.Filters, anychart.chartEditorModule.Component);


/** @type {string} */
anychart.chartEditorModule.controls.chartType.Filters.CSS_CLASS = goog.getCssName('anychart-chart-editor-chart-type-filters');


anychart.chartEditorModule.controls.chartType.Filters.Map = {
  'common': 'Common',
  'stacked-value': 'Stacked',
  'stacked-percent': 'Percent stacked',
  'gauges': 'Gauges'
};


/** @inheritDoc */
anychart.chartEditorModule.controls.chartType.Filters.prototype.createDom = function() {
  anychart.chartEditorModule.controls.chartType.Filters.base(this, 'createDom');

  this.addClassName(anychart.chartEditorModule.controls.chartType.Filters.CSS_CLASS);

  var map = anychart.chartEditorModule.controls.chartType.Filters.Map;
  for (var key in map) {
    var checkbox = new anychart.chartEditorModule.checkbox.Base();
    checkbox.setModel(key);
    checkbox.setCaption(map[key]);
    if (key === 'common') checkbox.setChecked(true);

    this.addChild(checkbox, true);
  }
};


/**
 * @return {Array} All checked checkboxes values.
 */
anychart.chartEditorModule.controls.chartType.Filters.prototype.getValue = function() {
  var result = [];
  for (var i = 0; i < this.getChildCount(); i++) {
    var checkbox = this.getChildAt(i);
    if (goog.isFunction(checkbox.isChecked) && checkbox.isChecked()) {
      result.push(checkbox.getModel());
    }
  }

  return result;
};
