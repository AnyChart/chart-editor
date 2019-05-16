goog.provide('chartEditor.ui.panel.specific.GaugeLinear');

goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.input.Palette');
goog.require('chartEditor.ui.control.select.Scales');
goog.require('chartEditor.ui.control.wrapped.Labeled');
goog.require('chartEditor.ui.panel.Background');



/**
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.panel.specific.GaugeLinear = function(model, opt_domHelper) {
  chartEditor.ui.panel.specific.GaugeLinear.base(this, 'constructor', model, 'Linear Gauge Settings', opt_domHelper);

  this.key = [['chart'], ['settings']];
};
goog.inherits(chartEditor.ui.panel.specific.GaugeLinear, chartEditor.ui.Panel);


/** @override */
chartEditor.ui.panel.specific.GaugeLinear.prototype.createDom = function() {
  chartEditor.ui.panel.specific.GaugeLinear.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var layout = new chartEditor.ui.control.fieldSelect.Base({label: 'Layout'});
  layout.getSelect().setOptions([
    {value: 'horizontal'},
    {value: 'vertical'}
  ]);
  layout.init(model, this.genKey('layout()'));
  this.addChildControl(layout);

  var background = new chartEditor.ui.panel.Background(model);
  background.setName(null);
  background.setKey(this.genKey('background()'));
  this.addChildControl(background);

  var palette = new chartEditor.ui.control.input.Palette('Comma separated colors');
  var paletteLC = new chartEditor.ui.control.wrapped.Labeled(palette, 'Palette');
  paletteLC.init(model, this.genKey('palette()'));
  this.addChildControl(paletteLC);

  var scale = new chartEditor.ui.control.select.Scales({label: 'Scale', scaleName: 'Default Scale'});
  scale.init(model, this.genKey('scale()'), void 0, true);
  this.addChildControl(scale);
};
