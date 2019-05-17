goog.provide('chartEditor.ui.dataSettings.Series');

goog.require('chartEditor.ui.ComponentWithKey');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.fieldSelect.SelectMenuItem');
goog.require('chartEditor.ui.control.input.Base');
goog.require('chartEditor.ui.control.wrapped.SeriesName');
goog.require('goog.ui.Component');



/**
 * Series panel on a Plot panel on Setup chart step.
 *
 * @param {chartEditor.model.Base} model
 * @param {number} index
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.ComponentWithKey}
 */
chartEditor.ui.dataSettings.Series = function(model, index, opt_domHelper) {
  chartEditor.ui.dataSettings.Series.base(this, 'constructor', model, opt_domHelper);

  /**
   * @type {number}
   * @private
   */
  this.index_ = index;

  /**
   * @type {Array.<chartEditor.ui.control.fieldSelect.Base>}
   * @private
   */
  this.fields_ = [];

  this.addClassName('anychart-ce-plot-panel-series');
};
goog.inherits(chartEditor.ui.dataSettings.Series, chartEditor.ui.ComponentWithKey);


/** @inheritDoc */
chartEditor.ui.dataSettings.Series.prototype.createDom = function() {
  chartEditor.ui.dataSettings.Series.base(this, 'createDom');

  var dom = this.getDomHelper();

  this.removeBtn_ = dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-plot-panel-series-remove-btn', '');
  goog.dom.appendChild(this.getElement(), this.removeBtn_);

  this.getKey();
  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  this.type_ = new chartEditor.ui.control.fieldSelect.Base({
    label: 'Series Type',
    caption: 'Select Series Type',
    value: 'ctor'
  });

  this.type_.getSelect().init(model, this.getKey('ctor'), 'setSeriesType');

  this.addChild(this.type_, true);
};


/** @inheritDoc */
chartEditor.ui.dataSettings.Series.prototype.onModelChange = function(evt) {
  chartEditor.ui.dataSettings.Series.base(this, 'onModelChange', evt);

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var seriesTypes = model.getChartTypeSettings()['series'];

  if (model.isChartSingleSeries() || seriesTypes.length === 1) {
    goog.dom.classlist.enable(this.type_.getElement(), 'anychart-ce-hidden', true);

  } else {
    goog.dom.classlist.enable(this.type_.getElement(), 'anychart-ce-hidden', false);

    for (var i = 0; i < seriesTypes.length; i++) {
      var type = seriesTypes[i];
      var caption = chartEditor.model.Series[type]['name'] ?
        chartEditor.model.Series[type]['name'] :
        goog.string.capitalize(type);

      var item = new chartEditor.ui.control.fieldSelect.SelectMenuItem({
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
chartEditor.ui.dataSettings.Series.prototype.enterDocument = function() {
  if (this.removeBtn_)
    this.getHandler().listen(this.removeBtn_, goog.events.EventType.CLICK, function() {
      var model = /** @type {chartEditor.model.Base} */(this.getModel());
      var plotIndex = this.getParent().index();
      model.dropSeries(plotIndex, this.index_);
    });

  chartEditor.ui.dataSettings.Series.base(this, 'enterDocument');
};


/** @inheritDoc */
chartEditor.ui.dataSettings.Series.prototype.exitDocument = function() {
  this.removeAllFields_();
  chartEditor.ui.dataSettings.Series.base(this, 'exitDocument');
};


/**
 * Creates fields without options.
 */
chartEditor.ui.dataSettings.Series.prototype.createFields = function() {
  this.removeAllFields_();

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var seriesType = model.getValue(this.getKey('ctor'));

  var fieldsMap = chartEditor.model.Series[seriesType]['fields'];
  goog.object.forEach(fieldsMap, function(item) {
    var fieldLabel = item['name'] ? item['name'] : item['field'];
    var fieldSelect = new chartEditor.ui.control.fieldSelect.Base({
      label: fieldLabel,
      caption: 'Select ' + fieldLabel,
      value: item['field'],
      isOptional: item['isOptional']
    });

    fieldSelect.getSelect().init(model, this.getKey([['mapping'], item['field']]), void 0, true);
    fieldSelect.addClassName('anychart-select-with-content');

    this.fields_.push(fieldSelect);
    this.addChild(fieldSelect, true);
  }, this);
};


/**
 * Creates options for all fields.
 */
chartEditor.ui.dataSettings.Series.prototype.createFieldsOptions = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
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
      var option;
      if (fieldSelect.getModel().isOptional) {
        option = new chartEditor.ui.control.fieldSelect.SelectMenuItem({
          caption: '--',
          value: null
        });
        fieldSelect.addItem(option);
      }
      for (var j = 0; j < dataFields.length; j++) {
        var caption = data.fieldNames[dataFields[j].key] ?  data.fieldNames[dataFields[j].key] : dataFields[j].name;
        option = new chartEditor.ui.control.fieldSelect.SelectMenuItem({
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
chartEditor.ui.dataSettings.Series.prototype.removeAllFields_ = function() {
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
 * @return {number|chartEditor.ui.dataSettings.Series}
 */
chartEditor.ui.dataSettings.Series.prototype.index = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (goog.isNumber(opt_value)) {
      this.index_ = opt_value;
    }
    return this;
  }
  return this.index_;
};


/** @inheritDoc */
chartEditor.ui.dataSettings.Series.prototype.getKey = function(opt_completion) {
  if (!this.key || !this.key.length) {
    if (!this.plotIndex_ && this.getParent())
      this.plotIndex_ = this.getParent().index();

    this.key = [['dataSettings'], ['mappings', this.plotIndex_], [this.index_]];
  }

  return chartEditor.ui.dataSettings.Series.base(this, 'getKey', opt_completion);
};


/** @inheritDoc */
chartEditor.ui.dataSettings.Series.prototype.dispose = function() {
  this.removeAllFields_();
  chartEditor.ui.dataSettings.Series.base(this, 'dispose');
};
