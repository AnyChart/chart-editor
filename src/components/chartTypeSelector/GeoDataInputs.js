goog.provide('chartEditor.GeoDataInputs');

goog.require('chartEditor.EditorModel');
goog.require('chartEditor.SettingsPanel');
goog.require('chartEditor.controls.select.DataField');
goog.require('chartEditor.controls.select.DataFieldSelectMenuItem');



/**
 * Inputs specific for map charts.
 *
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.GeoDataInputs = function(model, opt_domHelper) {
  chartEditor.GeoDataInputs.base(this, 'constructor', model, null, opt_domHelper);
};
goog.inherits(chartEditor.GeoDataInputs, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.GeoDataInputs.prototype.createDom = function() {
  chartEditor.GeoDataInputs.base(this, 'createDom');
  goog.dom.classlist.add(this.getElement(), 'anychart-geo-data-inputs');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  this.geoDataField_ = new chartEditor.controls.select.DataField({caption: 'Choose geo data', label: 'Geo data'});
  this.geoDataField_.init(model, [['dataSettings'], 'activeGeo'], 'setActiveGeo');
  this.addChild(this.geoDataField_, true);

  this.geoIdField_ = new chartEditor.controls.select.DataField({caption: 'Choose geo id', label: 'Geo ID field'});
  this.geoIdField_.init(model, [['dataSettings'], 'geoIdField']);
  this.addChild(this.geoIdField_, true);
};


/**
 * @param {Object} evt
 * @private
 */
chartEditor.GeoDataInputs.prototype.onLoadGeoDataIndex_ = function(evt) {
  this.createGeoDataOptions_(evt.data);
};

/**
 * Creates options for geo data sets select.
 * @param {Object} geoDataIndex
 * @private
 */
chartEditor.GeoDataInputs.prototype.createGeoDataOptions_ = function(geoDataIndex) {
  for (var key = 0; key < geoDataIndex.length; key++) {
    this.geoDataField_.getSelect().addItem(new chartEditor.controls.select.DataFieldSelectMenuItem({
      caption: geoDataIndex[key]['name'],
      value: chartEditor.EditorModel.DataType.GEO + geoDataIndex[key]['id']
    }));
  }
};


/** @inheritDoc */
chartEditor.GeoDataInputs.prototype.exclude = function(value) {
  chartEditor.GeoDataInputs.base(this, 'exclude', value);
  if (value)
    this.hide();
  else {
    if (this.geoDataField_ && !this.geoDataField_.getSelect().getItemCount()) {
      var model = /** @type {chartEditor.EditorModel} */(this.getModel());
      var geoDataIndex = model.getGeoDataIndex();
      if (geoDataIndex)
        this.createGeoDataOptions_(geoDataIndex);
      else
        this.getHandler().listenOnce(model, chartEditor.events.EventType.GEO_DATA_INDEX_LOADED, this.onLoadGeoDataIndex_);
    }

    if (this.geoIdField_ && !this.geoIdField_.getSelect().getItemCount())
      this.createGeoIdFieldOptions_();

    this.show();
  }
};


/** @inheritDoc */
chartEditor.GeoDataInputs.prototype.onChartDraw = function(evt) {
  if (this.isExcluded()) return;
  chartEditor.GeoDataInputs.base(this, 'onChartDraw', evt);

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  if (model.getModel()['dataSettings']['activeGeo']) {
    if (this.geoDataField_) this.geoDataField_.getSelect().setValueByModel();
    if (this.geoIdField_) this.geoIdField_.getSelect().setValueByModel();
  }
};


/**
 * Creates options for geo id field select.
 * @private
 */
chartEditor.GeoDataInputs.prototype.createGeoIdFieldOptions_ = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var activeGeo = model.getActiveGeo();
  if (!activeGeo) return;

  var preparedData = /** @type {chartEditor.EditorModel} */(this.getModel()).getPreparedData(activeGeo);
  if (!preparedData.length) return;

  for (var key in preparedData[0].fields) {
    this.geoIdField_.getSelect().addItem(new chartEditor.controls.select.DataFieldSelectMenuItem({
      caption: preparedData[0].fields[key].name,
      value: preparedData[0].fields[key].name
    }));
  }
};
