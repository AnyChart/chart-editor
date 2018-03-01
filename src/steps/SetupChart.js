goog.provide('anychart.chartEditorModule.steps.SetupChart');

goog.require('anychart.chartEditorModule.Chart');
goog.require('anychart.chartEditorModule.ChartTypeSelector');
goog.require('anychart.chartEditorModule.DataSetPanelList');
goog.require('anychart.chartEditorModule.events');
goog.require('anychart.chartEditorModule.steps.Base');
goog.require('anychart.ui.Component');
goog.require('goog.dom.classlist');
goog.require('goog.format.JsonPrettyPrinter');

goog.forwardDeclare('anychart.data.Mapping');


/**
 * Chart Editor Step Class.
 * @constructor
 * @param {number} index Step index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @extends {anychart.chartEditorModule.steps.Base}
 */
anychart.chartEditorModule.steps.SetupChart = function (index, opt_domHelper) {
    anychart.chartEditorModule.steps.SetupChart.base(this, 'constructor', index, opt_domHelper);

    this.name('Setup Chart');
    this.title('Setup Chart');
    this.addClassName('anychart-setup-chart-step');
};
goog.inherits(anychart.chartEditorModule.steps.SetupChart, anychart.chartEditorModule.steps.Base);


/** @inheritDoc */
anychart.chartEditorModule.steps.SetupChart.prototype.createDom = function () {
    anychart.chartEditorModule.steps.SetupChart.base(this, 'createDom');
    var editor = /** @type {anychart.chartEditorModule.Editor} */(this.getParent());
    var model = /** @type {anychart.chartEditorModule.EditorModel} */(editor.getModel());

    // connected data sets section
    var connectedDataSets = new anychart.chartEditorModule.DataSetPanelList(model);
    this.addChild(connectedDataSets, true);

    // user data and predefined data sets sections wrapper
    var wrapper = new anychart.ui.Component();
    wrapper.addClassName('anychart-prepare-data-step-wrapper');
    this.addChild(wrapper, true);

    var chartDataSettings = new anychart.chartEditorModule.ChartTypeSelector(model);
    wrapper.addChild(chartDataSettings, true);

    var chartPreview = new anychart.ui.Component();
    chartPreview.addClassName('anychart-chart-preview');
    wrapper.addChild(chartPreview, true);

    this.chartWrapper_ = chartPreview.getElement();
    var caption = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-chart-editor-section-caption anychart-chart-preview-caption', 'Chart Preview');
    goog.dom.appendChild(this.chartWrapper_, caption);
};


/** @inheritDoc */
anychart.chartEditorModule.steps.SetupChart.prototype.enterDocument = function () {
    anychart.chartEditorModule.steps.SetupChart.base(this, 'enterDocument');

    var model = /** @type {anychart.chartEditorModule.EditorModel} */(/** @type {anychart.chartEditorModule.Editor} */(this.getParent()).getModel());
    this.chart_ = new anychart.chartEditorModule.Chart(model);
    this.addChild(this.chart_, true);
    this.getDomHelper().appendChild(this.chartWrapper_, this.chart_.getElement());
};


/** @inheritDoc */
anychart.chartEditorModule.steps.SetupChart.prototype.exitDocument = function () {
    anychart.chartEditorModule.steps.SetupChart.base(this, 'exitDocument');

    if (this.chart_) {
        this.removeChild(this.chart_, true);
        this.chart_.dispose();
        this.chart_ = null;
    }
};
