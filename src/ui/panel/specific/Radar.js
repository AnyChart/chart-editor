goog.provide('chartEditor.ui.panel.specific.Radar');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.control.wrapped.Labeled');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.specific.Radar = function(model, opt_domHelper) {
  chartEditor.ui.panel.specific.Radar.base(this, 'constructor', model, 'Radar Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.ui.panel.specific.Radar, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.specific.Radar.prototype.createDom = function() {
  chartEditor.ui.panel.specific.Radar.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var startAngle = new chartEditor.ui.control.comboBox.Base();
  startAngle.setOptions([0, 90, 180, 270]);
  startAngle.setRange(0, 360);
  var startAngleLC = new chartEditor.ui.control.wrapped.Labeled(startAngle, 'Start Angle');
  startAngleLC.init(model, this.genKey('startAngle()'));
  this.addChildControl(startAngleLC);

  var xScale = new chartEditor.ui.control.select.Scales({label: 'X Scale', scaleName: 'Default X Scale'});
  xScale.init(model, this.genKey('xScale()'));
  this.addChildControl(xScale);

  var yScale = new chartEditor.ui.control.select.Scales({label: 'Y Scale', scaleName: 'Default Y Scale'});
  yScale.init(model, this.genKey('yScale()'));
  this.addChildControl(yScale);
};
