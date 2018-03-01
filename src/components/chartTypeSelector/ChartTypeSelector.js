goog.provide('anychart.chartEditorModule.ChartTypeSelector');

goog.require('anychart.chartEditorModule.Component');
goog.require('anychart.chartEditorModule.GeoDataInputs');
goog.require('anychart.chartEditorModule.PlotPanel');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.controls.select.DataFieldSelectMenuCaption');
goog.require('anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem');
goog.require('anychart.chartEditorModule.select.ChartType');
goog.require('anychart.ui.Component');
goog.require('goog.ui.Button');
goog.require('goog.ui.MenuItem');



/**
 * Chart type selection widget.
 * Allows to choose chart type and contains PlotPanel widgets.
 *
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 *
 * @constructor
 * @extends {anychart.chartEditorModule.Component}
 */
anychart.chartEditorModule.ChartTypeSelector = function(model, opt_domHelper) {
  anychart.chartEditorModule.ChartTypeSelector.base(this, 'constructor', opt_domHelper);

  this.setModel(model);

  /**
   * @type {Array.<anychart.chartEditorModule.PlotPanel>}
   * @private
   */
  this.plots_ = [];

  this.geoDataInputs_ = null;

  this.addClassName('anychart-border-box');
  this.addClassName('anychart-chart-data-settings');
};
goog.inherits(anychart.chartEditorModule.ChartTypeSelector, anychart.chartEditorModule.Component);


/** @inheritDoc */
anychart.chartEditorModule.ChartTypeSelector.prototype.createDom = function() {
  anychart.chartEditorModule.ChartTypeSelector.base(this, 'createDom');

  var caption = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-chart-editor-section-caption anychart-chart-data-settings-caption', 'Chart Data Settings');
  goog.dom.appendChild(this.getElement(), caption);

  var coreFieldsContainer = new anychart.ui.Component();
  coreFieldsContainer.addClassName('anychart-chart-data-settings-core');
  this.addChild(coreFieldsContainer, true);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  this.chartTypeSelect_ = new anychart.chartEditorModule.select.ChartType();
  this.chartTypeSelect_.init(model, [['chart'], 'type'], 'setChartType');
  coreFieldsContainer.addChild(this.chartTypeSelect_, true);

  this.geoDataInputs_ = new anychart.chartEditorModule.GeoDataInputs(model);
  coreFieldsContainer.addChild(this.geoDataInputs_, true);

  this.coreFieldsContainer_ = coreFieldsContainer;
};


/**
 * Editor model change handler
 * @param {?Object} evt
 */
anychart.chartEditorModule.ChartTypeSelector.prototype.onModelChange = function(evt) {
  if (evt && !evt.rebuildMapping) return;

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var chartType = model.getValue([['chart'], 'type']);
  var stackMode = model.getValue([['chart'], ['settings'], 'yScale().stackMode()']);

  this.chartTypeSelect_.setValueByModel({stackMode: stackMode});

  this.geoDataInputs_.exclude(chartType !== 'map');

  goog.dispose(this.activeAndFieldSelect_);
  this.activeAndFieldSelect_ = null;

  if (chartType === 'map' || model.chartTypeLike('gauges')) {
    // Data Set select
    this.activeAndFieldSelect_ = new anychart.chartEditorModule.controls.select.DataField({
      caption: 'Select data set',
      label: 'Data set'
    });
    this.activeAndFieldSelect_.getSelect().init(model, [['dataSettings'], 'field'], 'setActiveAndField');
    this.createDataSetsOptions_();

  } else {
    // X Values select
    this.activeAndFieldSelect_ = new anychart.chartEditorModule.controls.select.DataField({
      caption: 'Select field',
      label: chartType === 'treeMap' ? 'ID Values' : 'X Values'
    });

    this.activeAndFieldSelect_.getSelect().init(model, [['dataSettings'], 'field'], 'setActiveAndField');
    this.createActiveAndFieldOptions_();
  }

  this.coreFieldsContainer_.addChild(this.activeAndFieldSelect_, true);
  this.activeAndFieldSelect_.addClassName('anychart-select-with-content');
  this.activeAndFieldSelect_.getSelect().setValueByModel({active: model.getActive()});

  goog.dom.classlist.enable(this.activeAndFieldSelect_.getElement(), 'anychart-hidden', this.activeAndFieldSelect_.getSelect().getItemCount() <= 1);

  // Plots
  this.removeAllPlots_();

  var dsSettings = model.getValue(['dataSettings']);
  for (var i = 0; i < dsSettings['mappings'].length; i++) {
    var plot = new anychart.chartEditorModule.PlotPanel(model, i);
    if (i === 0) plot.addClassName('anychart-plot-panel-first');
    this.plots_.push(plot);
    this.addChild(plot, true);
  }

  goog.dispose(this.addPlotBtn_);
  this.addPlotBtn_ = null;

  if (chartType === 'stock') {
    var plotButtonRenderer = /** @type {goog.ui.ButtonRenderer} */(goog.ui.ControlRenderer.getCustomRenderer(
        goog.ui.ButtonRenderer,
        'anychart-chart-data-settings-add-plot-btn'));
    this.addPlotBtn_ = new goog.ui.Button('+ Add Plot', plotButtonRenderer);
    this.addChildAt(this.addPlotBtn_, this.getChildCount(), true);
    this.getHandler().listen(this.addPlotBtn_, goog.ui.Component.EventType.ACTION, this.onAddPlot_);
  }
};


/** @inheritDoc */
anychart.chartEditorModule.ChartTypeSelector.prototype.enterDocument = function() {
  this.onModelChange(null);

  if (this.addPlotBtn_)
    this.getHandler().listen(this.addPlotBtn_, goog.ui.Component.EventType.ACTION, this.onAddPlot_);

  this.getHandler().listen(/** @type {anychart.chartEditorModule.EditorModel} */(this.getModel()),
      anychart.chartEditorModule.events.EventType.EDITOR_MODEL_UPDATE, this.onModelChange);

  anychart.chartEditorModule.ChartTypeSelector.base(this, 'enterDocument');
};


/** @inheritDoc */
anychart.chartEditorModule.ChartTypeSelector.prototype.exitDocument = function() {
  this.removeAllPlots_();
  anychart.chartEditorModule.ChartTypeSelector.base(this, 'exitDocument');
};


/**
 * Creates options for active and field select with data sets names.
 * Is using in case of map chart type.
 * @private
 */
anychart.chartEditorModule.ChartTypeSelector.prototype.createDataSetsOptions_ = function() {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var data = model.getPreparedData();
  // dummy field value - will not be used
  var field = model.getValue([['dataSettings'], 'field']);

  for (var i = 0; i < data.length; i++) {
    if (data[i].type == anychart.chartEditorModule.EditorModel.DataType.GEO)
      continue;

    this.activeAndFieldSelect_.getSelect().addItem(new anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem({
      caption:  data[i].title,
      value: field,
      active: data[i].setFullId
    }));
  }
};


/**
 * Creates options for select active data set and it's field.
 * @private
 */
anychart.chartEditorModule.ChartTypeSelector.prototype.createActiveAndFieldOptions_ = function() {
  var data = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel()).getPreparedData();
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i];
    var title = dataItem.title;
    var fields = dataItem.fields;

    if (data.length > 1) {
      // Add captions if count of data sets is more than one
      this.activeAndFieldSelect_.getSelect().addItem(new anychart.chartEditorModule.controls.select.DataFieldSelectMenuCaption({
        caption: title
      }));
    }

    if (dataItem.type === anychart.chartEditorModule.EditorModel.DataType.GEO) {
      continue;
    }

    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      this.activeAndFieldSelect_.getSelect().addItem(new anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem({
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
anychart.chartEditorModule.ChartTypeSelector.prototype.onAddPlot_ = function() {
  /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel()).addPlot();
};


/** @private */
anychart.chartEditorModule.ChartTypeSelector.prototype.removeAllPlots_ = function() {
  goog.disposeAll(this.plots_);
  this.plots_ = [];
};
