goog.provide('chartEditor.ui.dataSettings.Widget');

goog.require('chartEditor.ui.Component');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.fieldSelect.SelectMenuCaption');
goog.require('chartEditor.ui.control.fieldSelect.SelectMenuItem');
goog.require('chartEditor.ui.dataSettings.GeoDataInputs');
goog.require('chartEditor.ui.dataSettings.Plot');
goog.require('chartEditor.ui.dataSettings.chartTypeSelect.Widget');
goog.require('goog.ui.Button');
goog.require('goog.ui.MenuItem');



/**
 * Chart type selection widget.
 * Allows to choose chart type and contains PlotPanel widgets.
 *
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 *
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.dataSettings.Widget = function(model, opt_domHelper) {
  chartEditor.ui.dataSettings.Widget.base(this, 'constructor', opt_domHelper);

  this.setModel(model);

  /**
   * @type {Array.<chartEditor.ui.dataSettings.Plot>}
   * @private
   */
  this.plots_ = [];

  this.geoDataInputs_ = null;

  this.addClassName('anychart-ce-border-box');
  this.addClassName('anychart-ce-chart-data-panel');
};
goog.inherits(chartEditor.ui.dataSettings.Widget, chartEditor.ui.Component);


/** @inheritDoc */
chartEditor.ui.dataSettings.Widget.prototype.createDom = function() {
  chartEditor.ui.dataSettings.Widget.base(this, 'createDom');

  var coreFieldsContainer = new chartEditor.ui.Component();
  coreFieldsContainer.addClassName('anychart-ce-data-settings-panel-core');
  this.addChild(coreFieldsContainer, true);

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  this.chartTypeSelect_ = new chartEditor.ui.dataSettings.chartTypeSelect.Widget();
  this.chartTypeSelect_.init(model, [['chart'], 'type'], 'setChartType');
  coreFieldsContainer.addChild(this.chartTypeSelect_, true);

  var chartType = model.getValue([['chart'], 'type']);
  if (chartType == 'map') {
    this.geoDataInputs_ = new chartEditor.ui.dataSettings.GeoDataInputs(model);
    coreFieldsContainer.addChild(this.geoDataInputs_, true);
  }

  this.coreFieldsContainer_ = coreFieldsContainer;
};


/**
 * Editor model change handler
 * @param {?Object} evt
 */
chartEditor.ui.dataSettings.Widget.prototype.onModelChange = function(evt) {
  if (evt && !evt.rebuildMapping) return;

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var chartType = model.getValue([['chart'], 'type']);
  var stackMode = model.getValue([['chart'], ['settings'], 'yScale().stackMode()']);

  this.chartTypeSelect_.setValueByModel({stackMode: stackMode});

  if (this.geoDataInputs_)
    this.geoDataInputs_.exclude(chartType !== 'map');

  goog.dispose(this.activeAndFieldSelect_);
  this.activeAndFieldSelect_ = null;

  if (chartType === 'map' || model.chartTypeLike('gauges') || model.chartTypeLike('gantt') || chartType === 'sankey') {
    // Data Set select
    this.activeAndFieldSelect_ = new chartEditor.ui.control.fieldSelect.Base({
      caption: 'Select data set',
      label: 'Data set'
    });
    this.activeAndFieldSelect_.getSelect().init(model, [['dataSettings'], 'field'], 'setActiveAndField');
    this.createDataSetsOptions_();

  } else {
    // X Values select
    this.activeAndFieldSelect_ = new chartEditor.ui.control.fieldSelect.Base({
      caption: 'Select field',
      label: chartType === 'treeMap' ? 'ID Values' : 'X Values'
    });

    this.activeAndFieldSelect_.getSelect().init(model, [['dataSettings'], 'field'], 'setActiveAndField');
    this.createActiveAndFieldOptions_();
  }

  this.coreFieldsContainer_.addChild(this.activeAndFieldSelect_, true);
  this.activeAndFieldSelect_.addClassName('anychart-select-with-content');
  this.activeAndFieldSelect_.getSelect().setValueByModel({active: model.getActive()});

  goog.dom.classlist.enable(this.activeAndFieldSelect_.getElement(), 'anychart-ce-hidden', this.activeAndFieldSelect_.getSelect().getItemCount() <= 1);

  // Plots
  this.removeAllPlots_();

  var dsSettings = model.getValue(['dataSettings']);
  for (var i = 0; i < dsSettings['mappings'].length; i++) {
    var plot = new chartEditor.ui.dataSettings.Plot(model, i);
    if (i === 0) plot.addClassName('anychart-ce-plot-panel-first');
    this.plots_.push(plot);
    this.addChild(plot, true);
  }

  goog.dispose(this.addPlotBtn_);
  this.addPlotBtn_ = null;

  if (chartType === 'stock') {
    var plotButtonRenderer = /** @type {goog.ui.ButtonRenderer} */(goog.ui.ControlRenderer.getCustomRenderer(
      goog.ui.ButtonRenderer,
      'anychart-ce-blue-btn'));
    this.addPlotBtn_ = new goog.ui.Button('+ Add Plot', plotButtonRenderer);
    this.addPlotBtn_.addClassName('anychart-ce-add-btn');
    this.addChildAt(this.addPlotBtn_, this.getChildCount(), true);
    this.getHandler().listen(this.addPlotBtn_, goog.ui.Component.EventType.ACTION, this.onAddPlot_);
  }
};


/** @inheritDoc */
chartEditor.ui.dataSettings.Widget.prototype.enterDocument = function() {
  this.onModelChange(null);

  if (this.addPlotBtn_)
    this.getHandler().listen(this.addPlotBtn_, goog.ui.Component.EventType.ACTION, this.onAddPlot_);

  this.getHandler().listen(/** @type {chartEditor.model.Base} */(this.getModel()),
    chartEditor.events.EventType.EDITOR_MODEL_UPDATE, this.onModelChange);

  chartEditor.ui.dataSettings.Widget.base(this, 'enterDocument');
};


/** @inheritDoc */
chartEditor.ui.dataSettings.Widget.prototype.exitDocument = function() {
  this.removeAllPlots_();
  chartEditor.ui.dataSettings.Widget.base(this, 'exitDocument');
};


/**
 * Creates options for active and field select with data sets names.
 * Is using in case of map chart type.
 * @private
 */
chartEditor.ui.dataSettings.Widget.prototype.createDataSetsOptions_ = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var data = model.getPreparedData();
  // dummy field value - will not be used
  var field = model.getValue([['dataSettings'], 'field']);

  for (var i = 0; i < data.length; i++) {
    if (data[i].type == chartEditor.model.DataType.GEO)
      continue;

    this.activeAndFieldSelect_.getSelect().addItem(new chartEditor.ui.control.fieldSelect.SelectMenuItem({
      caption: data[i].title,
      value: field,
      active: data[i].setFullId
    }));
  }
};


/**
 * Creates options for select active data set and it's field.
 * @private
 */
chartEditor.ui.dataSettings.Widget.prototype.createActiveAndFieldOptions_ = function() {
  var data = /** @type {chartEditor.model.Base} */(this.getModel()).getPreparedData();
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i];
    var title = dataItem.title;
    var fields = dataItem.fields;

    if (data.length > 1) {
      // Add captions if count of data sets is more than one
      this.activeAndFieldSelect_.getSelect().addItem(new chartEditor.ui.control.fieldSelect.SelectMenuCaption({
        caption: title
      }));
    }

    if (dataItem.type === chartEditor.model.DataType.GEO) {
      continue;
    }

    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      this.activeAndFieldSelect_.getSelect().addItem(new chartEditor.ui.control.fieldSelect.SelectMenuItem({
        caption: field.name,
        value: field.key,
        active: data[i].setFullId
      }));
    }
  }
};


/**
 * Asks model to add plot.
 * @private
 */
chartEditor.ui.dataSettings.Widget.prototype.onAddPlot_ = function() {
  /** @type {chartEditor.model.Base} */(this.getModel()).addPlot();
};


/** @private */
chartEditor.ui.dataSettings.Widget.prototype.removeAllPlots_ = function() {
  goog.disposeAll(this.plots_);
  this.plots_ = [];
};
