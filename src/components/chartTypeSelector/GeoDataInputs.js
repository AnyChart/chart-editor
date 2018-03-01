goog.provide('anychart.chartEditorModule.GeoDataInputs');

goog.require('anychart.chartEditorModule.EditorModel');
goog.require('anychart.chartEditorModule.SettingsPanel');
goog.require('anychart.chartEditorModule.controls.select.DataField');
goog.require('anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem');



/**
 * Inputs specific for map charts.
 *
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.SettingsPanel}
 */
anychart.chartEditorModule.GeoDataInputs = function(model, opt_domHelper) {
  anychart.chartEditorModule.GeoDataInputs.base(this, 'constructor', model, null, opt_domHelper);
};
goog.inherits(anychart.chartEditorModule.GeoDataInputs, anychart.chartEditorModule.SettingsPanel);


/** @inheritDoc */
anychart.chartEditorModule.GeoDataInputs.prototype.createDom = function() {
  anychart.chartEditorModule.GeoDataInputs.base(this, 'createDom');
  goog.dom.classlist.add(this.getElement(), 'anychart-geo-data-inputs');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());

  this.geoDataField_ = new anychart.chartEditorModule.controls.select.DataField({caption: 'Choose geo data', label: 'Geo data'});
  this.geoDataField_.init(model, [['dataSettings'], 'activeGeo'], 'setActiveGeo');
  this.addChild(this.geoDataField_, true);

  this.geoIdField_ = new anychart.chartEditorModule.controls.select.DataField({caption: 'Choose geo id', label: 'Geo ID field'});
  this.geoIdField_.init(model, [['dataSettings'], 'geoIdField']);
  this.addChild(this.geoIdField_, true);
};


/**
 * @param {Object} evt
 * @private
 */
anychart.chartEditorModule.GeoDataInputs.prototype.onLoadGeoDataIndex_ = function(evt) {
  this.createGeoDataOptions_(evt.data);
};

/**
 * Creates options for geo data sets select.
 * @param {Object} geoDataIndex
 * @private
 */
anychart.chartEditorModule.GeoDataInputs.prototype.createGeoDataOptions_ = function(geoDataIndex) {
  for (var key = 0; key < geoDataIndex.length; key++) {
    this.geoDataField_.getSelect().addItem(new anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem({
      caption: geoDataIndex[key]['name'],
      value: anychart.chartEditorModule.EditorModel.DataType.GEO + geoDataIndex[key]['id']
    }));
  }
};


/** @inheritDoc */
anychart.chartEditorModule.GeoDataInputs.prototype.exclude = function(value) {
  anychart.chartEditorModule.GeoDataInputs.base(this, 'exclude', value);
  if (value)
    this.hide();
  else {
    if (this.geoDataField_ && !this.geoDataField_.getSelect().getItemCount()) {
      var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
      var geoDataIndex = model.getGeoDataIndex();
      if (geoDataIndex)
        this.createGeoDataOptions_(geoDataIndex);
      else
        this.getHandler().listenOnce(model, anychart.chartEditorModule.events.EventType.GEO_DATA_INDEX_LOADED, this.onLoadGeoDataIndex_);
    }

    if (this.geoIdField_ && !this.geoIdField_.getSelect().getItemCount())
      this.createGeoIdFieldOptions_();

    this.show();
  }
};


/** @inheritDoc */
anychart.chartEditorModule.GeoDataInputs.prototype.onChartDraw = function(evt) {
  if (this.isExcluded()) return;
  anychart.chartEditorModule.GeoDataInputs.base(this, 'onChartDraw', evt);

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  if (model.getModel()['dataSettings']['activeGeo']) {
    if (this.geoDataField_) this.geoDataField_.getSelect().setValueByModel();
    if (this.geoIdField_) this.geoIdField_.getSelect().setValueByModel();
  }
};


/**
 * Creates options for geo id field select.
 * @private
 */
anychart.chartEditorModule.GeoDataInputs.prototype.createGeoIdFieldOptions_ = function() {
  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var activeGeo = model.getActiveGeo();
  if (!activeGeo) return;

  var preparedData = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel()).getPreparedData(activeGeo);
  if (!preparedData.length) return;

  for (var key in preparedData[0].fields) {
    this.geoIdField_.getSelect().addItem(new anychart.chartEditorModule.controls.select.DataFieldSelectMenuItem({
      caption: preparedData[0].fields[key].name,
      value: preparedData[0].fields[key].name
    }));
  }
};
