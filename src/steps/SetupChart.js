goog.provide('chartEditor.steps.SetupChart');

goog.require('chartEditor.Chart');
goog.require('chartEditor.ChartTypeSelector');
goog.require('chartEditor.DataSetPanelList');
goog.require('chartEditor.events');
goog.require('chartEditor.steps.Base');
goog.require('chartEditor.Component');
goog.require('goog.dom.classlist');
goog.require('goog.format.JsonPrettyPrinter');

goog.forwardDeclare('anychart.data.Mapping');


/**
 * Chart Editor Step Class.
 * @constructor
 * @param {number} index Step index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {chartEditor.steps.Base}
 */
chartEditor.steps.SetupChart = function (index, opt_domHelper) {
    chartEditor.steps.SetupChart.base(this, 'constructor', index, opt_domHelper);

    this.name('Setup Chart');
    this.title('Setup Chart');
    this.addClassName('anychart-setup-chart-step');
};
goog.inherits(chartEditor.steps.SetupChart, chartEditor.steps.Base);


/** @inheritDoc */
chartEditor.steps.SetupChart.prototype.createDom = function () {
    chartEditor.steps.SetupChart.base(this, 'createDom');
    var editor = /** @type {chartEditor.Editor} */(this.getParent());
    var model = /** @type {chartEditor.EditorModel} */(editor.getModel());

    // connected data sets section
    var connectedDataSets = new chartEditor.DataSetPanelList(model);
    this.addChild(connectedDataSets, true);

    // user data and predefined data sets sections wrapper
    var wrapper = new chartEditor.Component();
    wrapper.addClassName('anychart-prepare-data-step-wrapper');
    this.addChild(wrapper, true);

    var chartDataSettings = new chartEditor.ChartTypeSelector(model);
    wrapper.addChild(chartDataSettings, true);

    var chartPreview = new chartEditor.Component();
    chartPreview.addClassName('anychart-chart-preview');
    wrapper.addChild(chartPreview, true);

    this.chartWrapper_ = chartPreview.getElement();
    var caption = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-section-caption anychart-chart-preview-caption', 'Chart Preview');
    goog.dom.appendChild(this.chartWrapper_, caption);
};


/** @inheritDoc */
chartEditor.steps.SetupChart.prototype.enterDocument = function () {
    chartEditor.steps.SetupChart.base(this, 'enterDocument');

    var model = /** @type {chartEditor.EditorModel} */(/** @type {chartEditor.Editor} */(this.getParent()).getModel());
    this.chart_ = new chartEditor.Chart(model);
    this.addChild(this.chart_, true);
    this.getDomHelper().appendChild(this.chartWrapper_, this.chart_.getElement());
};


/** @inheritDoc */
chartEditor.steps.SetupChart.prototype.exitDocument = function () {
    chartEditor.steps.SetupChart.base(this, 'exitDocument');

    if (this.chart_) {
        this.removeChild(this.chart_, true);
        this.chart_.dispose();
        this.chart_ = null;
    }
};
