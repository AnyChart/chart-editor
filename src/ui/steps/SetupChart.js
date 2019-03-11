goog.provide('chartEditor.ui.steps.SetupChart');

goog.require("chartEditor.ui.Chart");
goog.require("chartEditor.ui.Component");
goog.require("chartEditor.ui.dataSets.Widget");
goog.require("chartEditor.ui.dataSettings.Widget");
goog.require("chartEditor.ui.steps.Step");



/**
 * Chart Editor Step Class.
 * @constructor
 * @param {number} index Step index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {chartEditor.ui.steps.Step}
 */
chartEditor.ui.steps.SetupChart = function (index, opt_domHelper) {
    chartEditor.ui.steps.SetupChart.base(this, 'constructor', index, opt_domHelper);

    this.name(chartEditor.enums.EditorSteps.CHART);

    this.title('Setup Chart');

    this.addClassName('anychart-setup-chart-step');
};
goog.inherits(chartEditor.ui.steps.SetupChart, chartEditor.ui.steps.Step);


/** @inheritDoc */
chartEditor.ui.steps.SetupChart.prototype.createDom = function () {
    chartEditor.ui.steps.SetupChart.base(this, 'createDom');
    var editor = /** @type {chartEditor.editor.Base} */(this.getParent());
    var model = /** @type {chartEditor.model.Base} */(editor.getModel());

    // connected data sets section
    var connectedDataSets = new chartEditor.ui.dataSets.Widget(model);
    this.addChild(connectedDataSets, true);

    // user data and predefined data sets sections wrapper
    var wrapper = new chartEditor.ui.Component();
    wrapper.addClassName('anychart-ce-step-right-wrapper');
    this.addChild(wrapper, true);

    var chartDataSettings = new chartEditor.ui.dataSettings.Widget(model);
    wrapper.addChild(chartDataSettings, true);

    var chartPreview = new chartEditor.ui.Component();
    chartPreview.addClassName('anychart-chart-preview');
    wrapper.addChild(chartPreview, true);

    this.chartWrapper_ = chartPreview.getElement();
    var caption = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-section-caption anychart-chart-preview-caption', 'Chart Preview');
    goog.dom.appendChild(this.chartWrapper_, caption);
};


/** @inheritDoc */
chartEditor.ui.steps.SetupChart.prototype.enterDocument = function () {
    chartEditor.ui.steps.SetupChart.base(this, 'enterDocument');

    var model = /** @type {chartEditor.model.Base} */(/** @type {chartEditor.editor.Base} */(this.getParent()).getModel());
    this.chart_ = new chartEditor.ui.Chart(model);
    this.addChild(this.chart_, true);
    this.getDomHelper().appendChild(this.chartWrapper_, this.chart_.getElement());
};


/** @inheritDoc */
chartEditor.ui.steps.SetupChart.prototype.exitDocument = function () {
    chartEditor.ui.steps.SetupChart.base(this, 'exitDocument');

    if (this.chart_) {
        this.removeChild(this.chart_, true);
        this.chart_.dispose();
        this.chart_ = null;
    }
};
