goog.provide('chartEditor.ui.panel.Background');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.colorPicker.Base');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Stroke');


/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.Background = function(model, opt_domHelper) {
  chartEditor.ui.panel.Background.base(this, 'constructor', model, 'Background', opt_domHelper);

  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-ce-panel-Background'));
};
goog.inherits(chartEditor.ui.panel.Background, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.panel.Background.prototype.createDom = function() {
  chartEditor.ui.panel.Background.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var fill = new chartEditor.ui.control.colorPicker.Base();
  var fillLC = new chartEditor.ui.control.wrapped.Labeled(fill, 'Background Fill');
  fillLC.init(model, this.genKey('fill()'));
  this.addChildControl(fillLC);

  var stroke = new chartEditor.ui.panel.Stroke(model, 'Stroke');
  stroke.setKey(this.genKey('stroke()'));
  this.addChildControl(stroke);
};
