goog.provide('chartEditor.ui.panel.specific.Quadrant');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.Stroke');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.specific.Quadrant = function(model, opt_domHelper) {
  chartEditor.ui.panel.specific.Quadrant.base(this, 'constructor', model, 'Quadrant Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.ui.panel.specific.Quadrant, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.specific.Quadrant.prototype.createDom = function() {
  chartEditor.ui.panel.specific.Quadrant.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var stroke = new chartEditor.ui.panel.Stroke(model, 'Crossing stroke');
  stroke.setKey(this.genKey('crossing().stroke()'));
  this.addChildControl(stroke);
};
