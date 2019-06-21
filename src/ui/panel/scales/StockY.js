goog.provide('chartEditor.ui.panel.scales.StockY');

goog.require('chartEditor.ui.PanelZippy');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.panel.Title');
goog.require('chartEditor.ui.panel.scales.Linear');


/**
 * @param {chartEditor.model.Base} model
 * @param {number} plotIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelZippy}
 */
chartEditor.ui.panel.scales.StockY = function(model, plotIndex, opt_domHelper) {
  chartEditor.ui.panel.scales.StockY.base(
    this,
    'constructor',
    model,
    plotIndex,
    null,
    opt_domHelper);

  this.plotIndex_ = plotIndex;

  var stringKey = 'plot(' + this.plotIndex_ + ').yScale()';
  this.name = 'Y-scale (plot ' + this.plotIndex_ + ')';

  this.key = [['chart'], ['settings'], stringKey];

  this.allowEnabled(false);

  this.allowReset(true);

  this.addClassName(goog.getCssName('anychart-ce-panel-legend-single'));
};
goog.inherits(chartEditor.ui.panel.scales.StockY,chartEditor.ui.PanelZippy);


/** @override */
chartEditor.ui.panel.scales.StockY.prototype.createDom = function() {
  chartEditor.ui.panel.scales.StockY.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());


  var scaleType = new chartEditor.ui.control.fieldSelect.Base({label: 'Scale type'});
  scaleType.getSelect().setOptions([
    {value: 'linear'},
    {value: 'log'}
  ]);
  scaleType.setGetterKey('plot(' + this.plotIndex_ + ').yScale().getType()');

  /**
   *  Force chart rebuild is required to avoid the AnyChart bug 8.6.0
   *  When the yScale type has changed it requires force redraw
   */
  scaleType.init(model, this.getKey(), void 0, true);
  // scaleType.init(model, this.getKey());

  this.addChildControl(scaleType);

  this.addContentSeparator();

  var scale = new chartEditor.ui.panel.scales.Linear(model);
  var key = this.getKey();
  // scale.setKey(this.getKey());
  scale.setKey(key);
  this.addChildControl(scale);
};
