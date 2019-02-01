goog.provide('chartEditor.ui.dataSettings.Plot');

goog.require('chartEditor.ui.ComponentWithKey');
goog.require('chartEditor.ui.dataSettings.Series');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component');



/**
 * Plot panel on Setup chart step.
 *
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.ComponentWithKey}
 */
chartEditor.ui.dataSettings.Plot = function(model, index, opt_domHelper) {
  chartEditor.ui.dataSettings.Plot.base(this, 'constructor', model, opt_domHelper);

  /**
   * @type {number}
   * @private
   */
  this.index_ = index;

  /**
   * @type {Array.<chartEditor.ui.dataSettings.Series>}
   * @private
   */
  this.series_ = [];

  this.addClassName('anychart-ce-plot-panel');
};
goog.inherits(chartEditor.ui.dataSettings.Plot, chartEditor.ui.ComponentWithKey);


/** @inheritDoc */
chartEditor.ui.dataSettings.Plot.prototype.createDom = function() {
  chartEditor.ui.dataSettings.Plot.base(this, 'createDom');

  var dom = this.getDomHelper();
  var element = this.getElement();

  this.title_ = dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-plot-panel-plot-title', 'Plot ' + (this.index_ + 1));
  goog.dom.appendChild(element, this.title_);

  var remove = dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-plot-panel-remove-btn', '');
  goog.dom.appendChild(this.getElement(), remove);
  this.getHandler().listen(remove, goog.events.EventType.CLICK, function() {
    /** @type {chartEditor.model.Base} */(this.getModel()).dropPlot(this.index_);
  });
};


/** @inheritDoc */
chartEditor.ui.dataSettings.Plot.prototype.onModelChange = function(evt) {
  if (evt && !evt.rebuildMapping) return;

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var chartType = model.getValue([['chart'], 'type']);

  // toggle stock specific panel
  chartType === 'stock' ?
      this.addClassName('anychart-ce-plot-panel-stock') :
      this.removeClassName('anychart-ce-plot-panel-stock');

  // Series
  this.removeAllSeries_();

  var plotModel = model.getValue([['dataSettings'], ['mappings', this.index_]]);

  for (var i = 0; i < plotModel.length; i++) {
    var series = new chartEditor.ui.dataSettings.Series(/** @type {chartEditor.model.Base} */(this.getModel()), i);
    if (i === 0) series.addClassName('anychart-ce-plot-panel-series-first');
    this.series_.push(series);
    this.addChild(series, true);
  }

  // TODO: Зачем диспоузить кнопки?
  goog.dispose(this.addSeriesBtn_);
  this.addSeriesBtn_ = null;

  if (!model.isChartSingleSeries()) {
    var addSeriesBtnRenderer = /** @type {goog.ui.ButtonRenderer} */(goog.ui.ControlRenderer.getCustomRenderer(
      goog.ui.ButtonRenderer,
      'anychart-ce-blue-btn'));
    this.addSeriesBtn_ = new goog.ui.Button('+ Add Series', addSeriesBtnRenderer);
    this.addSeriesBtn_.addClassName('anychart-ce-add-btn');
    this.addSeriesBtn_.addClassName('anychart-ce-add-series-btn');
    this.addChildAt(this.addSeriesBtn_, this.getChildCount(), true);
    this.getHandler().listen(this.addSeriesBtn_, goog.ui.Component.EventType.ACTION, this.onAddSeries_);
  }
};


/** @inheritDoc */
chartEditor.ui.dataSettings.Plot.prototype.exitDocument = function() {
  this.removeAllSeries_();
  chartEditor.ui.dataSettings.Plot.base(this, 'exitDocument');
};


/**
 * Asks model to add series.
 * @private
 */
chartEditor.ui.dataSettings.Plot.prototype.onAddSeries_ = function() {
  /** @type {chartEditor.model.Base} */(this.getModel()).addSeries(this.index_);
};


/**
 * Removes all series panel elements from panel.
 * @private
 */
chartEditor.ui.dataSettings.Plot.prototype.removeAllSeries_ = function() {
  for (var i = 0; i < this.series_.length; i++) {
    this.removeChild(this.series_[i], true);
    this.series_[i].dispose();
  }
  this.series_.length = 0;
};


/**
 * Getter/setter for index.
 *
 * @param {number=} opt_value
 * @return {number|chartEditor.ui.dataSettings.Plot}
 */
chartEditor.ui.dataSettings.Plot.prototype.index = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (goog.isNumber(opt_value)) {
      this.index_ = opt_value;
      this.title_.innerHTML = 'Plot ' + (this.index_ + 1);
    }
    return this;
  }
  return this.index_;
};


/** @inheritDoc */
chartEditor.ui.dataSettings.Plot.prototype.dispose = function() {
  this.removeAllSeries_();
  chartEditor.ui.dataSettings.Plot.base(this, 'dispose');
};


/** @inheritDoc */
chartEditor.ui.dataSettings.Plot.prototype.getKey = function(opt_completion) {
  if (!this.key)
    this.key = [['plot', this.index()]];
  return chartEditor.ui.dataSettings.Plot.base(this, 'getKey', opt_completion);
};
