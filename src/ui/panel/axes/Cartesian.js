goog.provide('chartEditor.ui.panel.axes.Cartesian');

goog.require('chartEditor.ui.panel.axes.Linear');


/**
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {string} xOrY
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.panel.axes.Linear}
 */
chartEditor.ui.panel.axes.Cartesian = function(model, index, xOrY, opt_domHelper) {
  chartEditor.ui.panel.axes.Cartesian.base(this, 'constructor', model, index, opt_domHelper);

  this.xOrY = xOrY;
  this.name = this.xOrY + 'Axis(' + this.index_ + ')';
  this.key = [['chart'], ['settings'], this.xOrY + 'Axis(' + this.index_ + ')'];
};
goog.inherits(chartEditor.ui.panel.axes.Cartesian, chartEditor.ui.panel.axes.Linear);
