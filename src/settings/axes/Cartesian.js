goog.provide('chartEditor.settings.axes.Cartesian');

goog.require('chartEditor.settings.axes.Linear');


/**
 * @param {chartEditor.EditorModel} model
 * @param {number} index
 * @param {string} xOrY
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.settings.axes.Linear}
 */
chartEditor.settings.axes.Cartesian = function(model, index, xOrY, opt_domHelper) {
  chartEditor.settings.axes.Cartesian.base(this, 'constructor', model, index, opt_domHelper);

  this.xOrY = xOrY;
  this.name = this.xOrY + 'Axis(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], this.xOrY + 'Axis(' + this.index_ + ')'];
};
goog.inherits(chartEditor.settings.axes.Cartesian, chartEditor.settings.axes.Linear);
