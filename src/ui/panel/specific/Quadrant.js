goog.provide('chartEditor.ui.panel.specific.Quadrant');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.panel.Quarter');
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

  this.addContentSeparator();

  var leftTop = new chartEditor.ui.panel.Quarter(model);
  leftTop.setName('Left Top Quarter');
  leftTop.setKey(this.genKey('quarters().leftTop()'));
  this.addChildControl(leftTop);

  this.addContentSeparator();

  var rightTop = new chartEditor.ui.panel.Quarter(model);
  rightTop.setName('Right Top Quarter');
  rightTop.setKey(this.genKey('quarters().rightTop()'));
  this.addChildControl(rightTop);

  this.addContentSeparator();

  var leftBottom = new chartEditor.ui.panel.Quarter(model);
  leftBottom.setName('Left Bottom Quarter');
  leftBottom.setKey(this.genKey('quarters().leftBottom()'));
  this.addChildControl(leftBottom);

  this.addContentSeparator();

  var rightBottom = new chartEditor.ui.panel.Quarter(model);
  rightBottom.setName('Right Bottom Quarter');
  rightBottom.setKey(this.genKey('quarters().rightBottom()'));
  this.addChildControl(rightBottom);
};
