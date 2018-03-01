goog.provide('anychart.chartEditorModule.PlotPanel');

goog.require('anychart.chartEditorModule.ComponentWithKey');
goog.require('anychart.chartEditorModule.SeriesPanel');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component');


/**
 * Plot panel on Setup chart step.
 *
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.ComponentWithKey}
 */
anychart.chartEditorModule.PlotPanel = function (model, index, opt_domHelper) {
    anychart.chartEditorModule.PlotPanel.base(this, 'constructor', model, opt_domHelper);

    /**
     * @type {number}
     * @private
     */
    this.index_ = index;

    /**
     * @type {Array.<anychart.chartEditorModule.SeriesPanel>}
     * @private
     */
    this.series_ = [];

    this.addClassName('anychart-plot-panel');
};
goog.inherits(anychart.chartEditorModule.PlotPanel, anychart.chartEditorModule.ComponentWithKey);


/** @inheritDoc */
anychart.chartEditorModule.PlotPanel.prototype.createDom = function () {
    anychart.chartEditorModule.PlotPanel.base(this, 'createDom');

    var dom = this.getDomHelper();
    var element = this.getElement();

    this.title_ = dom.createDom(goog.dom.TagName.DIV, 'anychart-plot-panel-plot-title', 'Plot ' + (this.index_ + 1));
    goog.dom.appendChild(element, this.title_);

    var remove = dom.createDom(goog.dom.TagName.DIV, 'anychart-plot-panel-remove-btn', '');
    goog.dom.appendChild(this.getElement(), remove);
    this.getHandler().listen(remove, goog.events.EventType.CLICK, function () {
        /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel()).dropPlot(this.index_);
    });
};


/** @inheritDoc */
anychart.chartEditorModule.PlotPanel.prototype.onModelChange = function (evt) {
    if (evt && !evt.rebuildMapping) return;

    var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
    var chartType = model.getValue([['chart'], 'type']);

    // toggle stock specific settings
    chartType === 'stock' ?
        this.addClassName('anychart-plot-panel-stock') :
        this.removeClassName('anychart-plot-panel-stock');

    // Series
    this.removeAllSeries_();

    var plotModel = model.getValue([['dataSettings'], ['mappings', this.index_]]);

    for (var i = 0; i < plotModel.length; i++) {
        var series = new anychart.chartEditorModule.SeriesPanel(/** @type {anychart.chartEditorModule.EditorModel} */(this.getModel()), i);
        if (i === 0) series.addClassName('anychart-plot-panel-series-first');
        this.series_.push(series);
        this.addChild(series, true);
    }

    // TODO: Зачем диспоузить кнопки?
    goog.dispose(this.addSeriesBtn_);
    this.addSeriesBtn_ = null;

    if (!model.isChartSingleSeries()) {
        var addSeriesBtnRenderer = /** @type {goog.ui.ButtonRenderer} */(goog.ui.ControlRenderer.getCustomRenderer(
            goog.ui.ButtonRenderer,
            'anychart-plot-panel-add-series-btn'));
        this.addSeriesBtn_ = new goog.ui.Button('+ Add Series', addSeriesBtnRenderer);
        this.addChildAt(this.addSeriesBtn_, this.getChildCount(), true);
        this.getHandler().listen(this.addSeriesBtn_, goog.ui.Component.EventType.ACTION, this.onAddSeries_);
    }
};


/** @inheritDoc */
anychart.chartEditorModule.PlotPanel.prototype.exitDocument = function () {
    this.removeAllSeries_();
    anychart.chartEditorModule.PlotPanel.base(this, 'exitDocument');
};


/**
 * Asks model to add series.
 * @private
 */
anychart.chartEditorModule.PlotPanel.prototype.onAddSeries_ = function () {
    /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel()).addSeries(this.index_);
};


/**
 * Removes all series panels elements from panel.
 * @private
 */
anychart.chartEditorModule.PlotPanel.prototype.removeAllSeries_ = function () {
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
 * @return {number|anychart.chartEditorModule.PlotPanel}
 */
anychart.chartEditorModule.PlotPanel.prototype.index = function (opt_value) {
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
anychart.chartEditorModule.PlotPanel.prototype.dispose = function () {
    this.removeAllSeries_();
    anychart.chartEditorModule.PlotPanel.base(this, 'dispose');
};


/** @inheritDoc */
anychart.chartEditorModule.PlotPanel.prototype.getKey = function (opt_completion) {
    if (!this.key)
        this.key = [['plot', this.index()]];
    return anychart.chartEditorModule.PlotPanel.base(this, 'getKey', opt_completion);
};
