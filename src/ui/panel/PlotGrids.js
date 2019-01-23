goog.provide('chartEditor.ui.panel.PlotGrids');

goog.require('chartEditor.ui.PanelIndexed');
goog.require('chartEditor.ui.panel.Grid');


/**
 * @param {chartEditor.model.Base} model
 * @param {number=} opt_plotIndex
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.PanelIndexed}
 */
chartEditor.ui.panel.PlotGrids = function(model, opt_plotIndex, opt_domHelper) {
  chartEditor.ui.panel.PlotGrids.base(
      this,
      'constructor',
      model,
      goog.isDef(opt_plotIndex) ? opt_plotIndex : 0,
      null,
      opt_domHelper);

  this.plotIndex_ = opt_plotIndex;

  this.key = [['chart'], ['settings']];
  if (goog.isDef(this.plotIndex_)) {
    this.name = 'Grids (plot ' + this.plotIndex_ + ')';
    this.key.push('plot(' + this.plotIndex_ + ')');

  } else {
    this.name = 'Grids';
  }

  this.allowEnabled(false);

  this.addClassName(goog.getCssName('anychart-ce-panel-plot-grids'));
};
goog.inherits(chartEditor.ui.panel.PlotGrids, chartEditor.ui.PanelIndexed);


/** @override */
chartEditor.ui.panel.PlotGrids.prototype.createDom = function() {
  chartEditor.ui.panel.PlotGrids.base(this, 'createDom');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  var xGrid = new chartEditor.ui.panel.Grid(model, 'X Grid');
  xGrid.setKey(this.genKey('xGrid()'));
  this.addChild(xGrid, true);
  this.xGrid_ = xGrid;

  this.addContentSeparator();

  var yGrid = new chartEditor.ui.panel.Grid(model, 'Y Grid');
  yGrid.setKey(this.genKey('yGrid()'));
  this.addChild(yGrid, true);
  this.yGrid_ = yGrid;
};


/** @inheritDoc */
chartEditor.ui.panel.PlotGrids.prototype.updateKeys = function() {
  if (!this.isExcluded()) {
    this.key = [['chart'], ['settings']];
    if (goog.isDef(this.plotIndex_))
      this.key.push('plot(' + this.plotIndex_ + ')');

    // Update keys of children
    if (this.xGrid_) this.xGrid_.setKey(this.genKey('xGrid()'));
    if (this.yGrid_) this.yGrid_.setKey(this.genKey('yGrid()'));
  }

  // Update key of enabled checkbox
  chartEditor.ui.panel.PlotGrids.base(this, 'updateKeys');
};


/** @override */
chartEditor.ui.panel.PlotGrids.prototype.disposeInternal = function() {
  goog.disposeAll(this.xGrid_, this.yGrid_);
  this.xGrid_ = this.yGrid_ = null;

  chartEditor.ui.panel.PlotGrids.base(this, 'disposeInternal');
};
