goog.provide('chartEditor.settings.axes.Cartesian');

goog.require('chartEditor.checkbox.Base');
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

  this.addClassName(goog.getCssName('anychart-ce-settings-panel-axis-cartesian'));
};
goog.inherits(chartEditor.settings.axes.Cartesian, chartEditor.settings.axes.Linear);


/** @override */
chartEditor.settings.axes.Cartesian.prototype.createDom = function() {
  chartEditor.settings.axes.Cartesian.base(this, 'createDom');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  var inverted = new chartEditor.checkbox.Base();
  inverted.setCaption('Inverted');
  inverted.init(model, [['chart'], ['settings'], this.xOrY + 'Scale().inverted()']);
  this.addChildControl(inverted, 0);
};