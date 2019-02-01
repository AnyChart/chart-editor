goog.provide('chartEditor.ui.panel.scales.OrdinalColor');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.input.Palette');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.scales.Ranges');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.scales.OrdinalColor = function(model, opt_domHelper) {
  chartEditor.ui.panel.scales.OrdinalColor.base(this, 'constructor', model, null, opt_domHelper);

  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-ce-panel-scale-ordinal-color'));
};
goog.inherits(chartEditor.ui.panel.scales.OrdinalColor, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.scales.OrdinalColor.prototype.createDom = function() {
  chartEditor.ui.panel.scales.OrdinalColor.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var colors = new chartEditor.ui.control.input.Palette('Comma separated colors');
  var colorsLC = new chartEditor.ui.control.wrapped.Labeled(colors, 'Colors');
  colorsLC.init(model, this.genKey('colors()'));
  this.addChildControl(colorsLC);

  this.addContentSeparator();

  var ord = new chartEditor.ui.panel.scales.Ranges(model);
  ord.setKey(this.getKey());
  this.addChildControl(ord);
};


