goog.provide('anychart.chartEditorModule.SeriesPanel');

goog.require('anychart.chartEditorModule.ComponentWithKey');
goog.require('anychart.chartEditorModule.controls.SeriesName');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem');
goog.require('anychart.chartEditorModule.input.Base');
goog.require('goog.ui.Component');


/**
 * Series panel on a Plot panel on Setup chart step.
 *
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.ComponentWithKey}
 */
anychart.chartEditorModule.SeriesPanel = function(model, index, opt_domHelper) {
  anychart.chartEditorModule.SeriesPanel.base(this, 'constructor', model, opt_domHelper);

  /**
   * @type {number}
   * @private
   */
  this.index_ = index;

  /**
   * @type {Array.<anychart.chartEditorModule.controls.select.DataField>}
   * @private
   */
  this.fields_ = [];

  this.addClassName('anychart-plot-panel-series');
};
goog.inherits(anychart.chartEditorModule.SeriesPanel, anychart.chartEditorModule.ComponentWithKey);


/** @inheritDoc */
anychart.chartEditorModule.SeriesPanel.prototype.createDom = function() {
  anychart.chartEditorModule.SeriesPanel.base(this, 'createDom');

  var dom = this.getDomHelper();

  this.removeBtn_ = dom.createDom(goog.dom.TagName.DIV, 'anychart-plot-panel-series-remove-btn', '');
  goog.dom.appendChild(this.getElement(), this.removeBtn_);

  this.getKey();
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  if (!model.chartTypeLike('gauges') && !model.isChartSingleSeries()) {
    var mappings = model.getValue([['dataSettings'], ['mappings', this.plotIndex_]]);

    var chartType = model.getValue([['chart'], 'type']);
    var keyStr = chartType === 'stock' ? 'plot(' + this.plotIndex_ + ').' : '';
    var id = goog.isDef(mappings[this.index_]['id']) ? mappings[this.index_]['id'] : this.index_;
    keyStr += 'getSeries(\'' + id + '\').name()';
    var key = [['chart'], ['settings'], keyStr];

    var name = new anychart.chartEditorModule.input.Base();

    var isSingleValues = anychart.chartEditorModule.EditorModel.Series[mappings[this.index_]['ctor']]['fields'].length === 1;
    var nameLC = new anychart.chartEditorModule.controls.SeriesName(name, 'Name', isSingleValues);
    nameLC.init(model, key, void 0, true, true);
    this.addChild(nameLC, true);
    this.name_ = nameLC;
  }

  this.type_ = new anychart.chartEditorModule.controls.select.DataField({
    label: 'Series Type',
    caption: 'Select Series Type',
    value: 'ctor'
  });

  this.type_.getSelect().init(model, this.getKey('ctor'), 'setSeriesType');

  this.addChild(this.type_, true);
};


/** @inheritDoc */
anychart.chartEditorModule.SeriesPanel.prototype.onModelChange = function(evt) {
  anychart.chartEditorModule.SeriesPanel.base(this, 'onModelChange', evt);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var seriesTypes = model.getChartTypeSettings()['series'];

  if (model.isChartSingleSeries() || seriesTypes.length === 1) {
    goog.dom.classlist.enable(this.type_.getElement(), 'anychart-hidden', true);

  } else {
    goog.dom.classlist.enable(this.type_.getElement(), 'anychart-hidden', false);

    for (var i = 0; i < seriesTypes.length; i++) {
      var type = seriesTypes[i];
      var caption = anychart.chartEditorModule.EditorModel.Series[type]['name'] ?
          anychart.chartEditorModule.EditorModel.Series[type]['name'] :
          goog.string.capitalize(type);

      var item = new anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem({
        caption: caption,
        value: type
      });
      this.type_.getSelect().addItem(item);
    }

    this.type_.getSelect().setValueByModel();
  }

  this.createFields();
  this.createFieldsOptions();
};


/** @inheritDoc */
anychart.chartEditorModule.SeriesPanel.prototype.onChartDraw = function(evt) {
  anychart.chartEditorModule.SeriesPanel.base(this, 'onChartDraw', evt);
  if (this.name_) this.name_.setValueByTarget(evt.chart);
};


/** @inheritDoc */
anychart.chartEditorModule.SeriesPanel.prototype.enterDocument = function() {
  if (this.removeBtn_)
    this.getHandler().listen(this.removeBtn_, goog.events.EventType.CLICK, function() {
      var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
      var plotIndex = this.getParent().index();
      model.dropSeries(plotIndex, this.index_);
    });

  anychart.chartEditorModule.SeriesPanel.base(this, 'enterDocument');
};


/** @inheritDoc */
anychart.chartEditorModule.SeriesPanel.prototype.exitDocument = function() {
  this.removeAllFields_();
  anychart.chartEditorModule.SeriesPanel.base(this, 'exitDocument');
};


/**
 * Creates fields without options.
 */
anychart.chartEditorModule.SeriesPanel.prototype.createFields = function() {
  this.removeAllFields_();

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var seriesType = model.getValue(this.getKey('ctor'));

  var fieldsMap = anychart.chartEditorModule.EditorModel.Series[seriesType]['fields'];
  goog.object.forEach(fieldsMap, function(item) {
    var fieldLabel = item['name'] ? item['name'] : item['field'];
    var fieldSelect = new anychart.chartEditorModule.controls.select.DataField({
      label: fieldLabel,
      caption: 'Select ' + fieldLabel,
      value: item['field']
    });

    fieldSelect.getSelect().init(model, this.getKey([['mapping'], item['field']]));
    fieldSelect.addClassName('anychart-select-with-content');

    this.fields_.push(fieldSelect);
    this.addChild(fieldSelect, true);
  }, this);
};


/**
 * Creates options for all fields.
 */
anychart.chartEditorModule.SeriesPanel.prototype.createFieldsOptions = function() {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var active = model.getActive();
  var preparedData = model.getPreparedData();

  var data;
  for (var a = preparedData.length; a--;) {
    if (preparedData[a].type + preparedData[a].setId === active) {
      data = preparedData[a];
      break;
    }
  }

  if (data) {
    for (var i = 0; i < this.fields_.length; i++) {
      var field = this.fields_[i];
      var fieldSelect = field.getSelect();

      for (var b = fieldSelect.getItemCount(); b--;) {
        fieldSelect.removeItemAt(b);
      }

      var dataFields = data.fields;
      for (var j = 0; j < dataFields.length; j++) {
        var caption = dataFields[j].name;
        var option = new anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem({
          caption: caption,
          value: dataFields[j].key
        });
        fieldSelect.addItem(option);
      }

      fieldSelect.setValueByModel();
    }
  }
};


/**
 * Removes all fields from panel.
 * @private
 */
anychart.chartEditorModule.SeriesPanel.prototype.removeAllFields_ = function() {
  for (var a = this.fields_.length; a--;) {
    var field = this.fields_[a];
    this.removeChild(field, true);
    field.dispose();
  }
  this.fields_.length = 0;
};


/**
 * Getter/setter for index.
 *
 * @param {number=} opt_value
 * @return {number|anychart.chartEditorModule.SeriesPanel}
 */
anychart.chartEditorModule.SeriesPanel.prototype.index = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (goog.isNumber(opt_value)) {
      this.index_ = opt_value;
    }
    return this;
  }
  return this.index_;
};


/** @inheritDoc */
anychart.chartEditorModule.SeriesPanel.prototype.getKey = function(opt_completion) {
  if (!this.key || !this.key.length) {
    if (!this.plotIndex_ && this.getParent())
      this.plotIndex_ = this.getParent().index();

    this.key = [['dataSettings'], ['mappings', this.plotIndex_], [this.index_]];
  }

  return anychart.chartEditorModule.SeriesPanel.base(this, 'getKey', opt_completion);
};


/** @inheritDoc */
anychart.chartEditorModule.SeriesPanel.prototype.dispose = function() {
  this.removeAllFields_();
  anychart.chartEditorModule.SeriesPanel.base(this, 'dispose');
};
