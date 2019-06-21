goog.provide('chartEditor.ui.panel.scales.StockX');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.panel.Gaps');



/**
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.scales.StockX = function(model, index, opt_domHelper) {
  chartEditor.ui.panel.scales.StockX.base(this, 'constructor', model, index, null, opt_domHelper);

  this.allowEnabled(false);

  this.allowReset(true);

  this.key = [['chart'], ['settings'], 'xScale()'];

  this.name = 'X Scale';
};
goog.inherits(chartEditor.ui.panel.scales.StockX, chartEditor.ui.PanelZippy);


/** @override */
chartEditor.ui.panel.scales.StockX.prototype.createDom = function() {
  chartEditor.ui.panel.scales.StockX.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var scaleType = new chartEditor.ui.control.fieldSelect.Base({label: 'Scale type'});

  /**
   *  Stock xScale doesn't return its type by xScale(), getType() is not a function of Stock xScale.
   *  That's why the control is empty after applying setting.
   */
  scaleType.getSelect().setOptions([
    {value: 'ordinal'},
    {value: 'scatter'}
  ]);
  scaleType.init(model, this.getKey());
  this.addChildControl(scaleType);

  var minimumGap = new chartEditor.ui.panel.Gaps(model, 'Minimum Gap');
  minimumGap.setKey(this.genKey('minimumGap()'));
  this.addChildControl(minimumGap);

  var maximumGap = new chartEditor.ui.panel.Gaps(model, 'Maximum Gap');
  maximumGap.setKey(this.genKey('maximumGap()'));
  this.addChildControl(maximumGap);

};
