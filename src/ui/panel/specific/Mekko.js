goog.provide('chartEditor.ui.panel.specific.Mekko');

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
chartEditor.ui.panel.specific.Mekko = function(model, opt_domHelper) {
  chartEditor.ui.panel.specific.Mekko.base(this, 'constructor', model, 'Mekko Chart Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.ui.panel.specific.Mekko, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.specific.Mekko.prototype.createDom = function() {
  chartEditor.ui.panel.specific.Mekko.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var pointsPadding = new chartEditor.ui.control.comboBox.Base();
  pointsPadding.setOptions([0, 1, 3, 5, 10, 15]);
  pointsPadding.setRange(0, 20);
  var pointsPaddingLC = new chartEditor.ui.control.wrapped.Labeled(pointsPadding, 'Points Padding');
  pointsPaddingLC.init(model, this.genKey('pointsPadding()'));
  this.addChildControl(pointsPaddingLC);

  var xScale = new chartEditor.ui.control.select.Scales({label: 'X Scale', scaleName: 'Default X Scale'});
  xScale.init(model, this.genKey('xScale()'));
  this.addChildControl(xScale);

  var yScale = new chartEditor.ui.control.select.Scales({label: 'Y Scale', scaleName: 'Default Y Scale'});
  yScale.init(model, this.genKey('yScale()'));
  this.addChildControl(yScale);
};
