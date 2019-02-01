goog.provide('chartEditor.ui.panel.specific.Polar');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.checkbox.Base');
goog.require('chartEditor.ui.control.comboBox.Base');
goog.require('chartEditor.ui.control.comboBox.Percent');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.control.wrapped.Labeled');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.specific.Polar = function(model, opt_domHelper) {
  chartEditor.ui.panel.specific.Polar.base(this, 'constructor', model, 'Polar Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.ui.panel.specific.Polar, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.specific.Polar.prototype.createDom = function() {
  chartEditor.ui.panel.specific.Polar.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var sortPointsByX = new chartEditor.ui.control.checkbox.Base();
  sortPointsByX.setCaption('Sort Points By X');
  sortPointsByX.init(model, [['chart'], ['settings'], 'sortPointsByX()']);
  this.addChildControl(sortPointsByX);

  var startAngle = new chartEditor.ui.control.comboBox.Base();
  startAngle.setOptions([0, 90, 180, 270]);
  startAngle.setRange(0, 360);
  var startAngleLC = new chartEditor.ui.control.wrapped.Labeled(startAngle, 'Start Angle');
  startAngleLC.init(model, this.genKey('startAngle()'));
  this.addChildControl(startAngleLC);

  var pointWidth = new chartEditor.ui.control.comboBox.Base();
  pointWidth.setOptions([1, 5, 10, 20, 40]);
  pointWidth.setRange(1, 200);
  var pointWidthLC = new chartEditor.ui.control.wrapped.Labeled(pointWidth, 'Point Width');
  pointWidthLC.init(model, this.genKey('pointWidth()'));
  this.addChildControl(pointWidthLC);

  var maxPointWidth = new chartEditor.ui.control.comboBox.Base();
  maxPointWidth.setOptions([1, 5, 10, 20, 40]);
  maxPointWidth.setRange(1, 200);
  var maxPointWidthLC = new chartEditor.ui.control.wrapped.Labeled(maxPointWidth, 'Max Point Width');
  maxPointWidthLC.init(model, this.genKey('maxPointWidth()'));
  this.addChildControl(maxPointWidthLC);

  var innerRadius = new chartEditor.ui.control.comboBox.Percent();
  innerRadius.setOptions([5, 10, 20, 30, 40]);
  var innerRadiusLC = new chartEditor.ui.control.wrapped.Labeled(innerRadius, 'Inner Radius');
  innerRadiusLC.init(model, this.genKey('innerRadius()'));
  this.addChildControl(innerRadiusLC);

  var xScale = new chartEditor.ui.control.select.Scales({label: 'X Scale', scaleName: 'Default X Scale'});
  xScale.init(model, this.genKey('xScale()'));
  this.addChildControl(xScale);

  var yScale = new chartEditor.ui.control.select.Scales({label: 'Y Scale', scaleName: 'Default Y Scale'});
  yScale.init(model, this.genKey('yScale()'));
  this.addChildControl(yScale);
};
