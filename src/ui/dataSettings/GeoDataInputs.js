goog.provide('chartEditor.ui.dataSettings.GeoDataInputs');

goog.require('chartEditor.model.Base');
goog.require('chartEditor.ui.Panel');
goog.require('chartEditor.ui.control.fieldSelect.Base');
goog.require('chartEditor.ui.control.fieldSelect.SelectMenuItem');



/**
 * Inputs specific for map charts.
 *
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Panel}
 */
chartEditor.ui.dataSettings.GeoDataInputs = function(model, opt_domHelper) {
  chartEditor.ui.dataSettings.GeoDataInputs.base(this, 'constructor', model, null, opt_domHelper);
};
goog.inherits(chartEditor.ui.dataSettings.GeoDataInputs, chartEditor.ui.Panel);


/** @inheritDoc */
chartEditor.ui.dataSettings.GeoDataInputs.prototype.createDom = function() {
  chartEditor.ui.dataSettings.GeoDataInputs.base(this, 'createDom');
  goog.dom.classlist.add(this.getElement(), 'anychart-geo-data-inputs');

  var model = /** @type {chartEditor.model.Base} */(this.getModel());

  this.geoDataField_ = new chartEditor.ui.control.fieldSelect.Base({caption: 'Choose geo data', label: 'Geo data'});
  this.geoDataField_.init(model, [['dataSettings'], 'activeGeo'], 'setActiveGeo');
  this.addChild(this.geoDataField_, true);

  this.geoIdField_ = new chartEditor.ui.control.fieldSelect.Base({caption: 'Choose geo id', label: 'Geo ID field'});
  this.geoIdField_.init(model, [['dataSettings'], 'geoIdField']);
  this.addChild(this.geoIdField_, true);
};


/**
 * @param {Object} evt
 * @private
 */
chartEditor.ui.dataSettings.GeoDataInputs.prototype.onLoadGeoDataIndex_ = function(evt) {
  this.createGeoDataOptions_(evt.data);
};

/**
 * Creates options for geo data sets select.
 * @param {Object} geoDataIndexList
 * @private
 */
chartEditor.ui.dataSettings.GeoDataInputs.prototype.createGeoDataOptions_ = function(geoDataIndexList) {
  for (var key = 0; key < geoDataIndexList.length; key++) {
    this.geoDataField_.getSelect().addItem(new chartEditor.ui.control.fieldSelect.SelectMenuItem({
      caption: geoDataIndexList[key]['name'],
      value: chartEditor.model.DataType.GEO + geoDataIndexList[key]['id']
    }));
  }
};


/** @inheritDoc */
chartEditor.ui.dataSettings.GeoDataInputs.prototype.exclude = function(value) {
  chartEditor.ui.dataSettings.GeoDataInputs.base(this, 'exclude', value);
  if (value)
    this.hide();
  else {
    if (this.geoDataField_ && !this.geoDataField_.getSelect().getItemCount()) {
      var model = /** @type {chartEditor.model.Base} */(this.getModel());
      var geoDataIndexList = model.getGeoDataIndexList();
      if (geoDataIndexList)
        this.createGeoDataOptions_(geoDataIndexList);
      else
        this.getHandler().listenOnce(model, chartEditor.events.EventType.GEO_DATA_INDEX_LOADED, this.onLoadGeoDataIndex_);
    }

    if (this.geoIdField_ && !this.geoIdField_.getSelect().getItemCount())
      this.createGeoIdFieldOptions_();

    this.show();
  }
};


/** @inheritDoc */
chartEditor.ui.dataSettings.GeoDataInputs.prototype.onChartDraw = function(evt) {
  if (this.isExcluded()) return;
  chartEditor.ui.dataSettings.GeoDataInputs.base(this, 'onChartDraw', evt);

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  if (model.getModel()['dataSettings']['activeGeo']) {
    if (this.geoDataField_) this.geoDataField_.getSelect().setValueByModel();
    if (this.geoIdField_) this.geoIdField_.getSelect().setValueByModel();
  }
};


/**
 * Creates options for geo id field select.
 * @private
 */
chartEditor.ui.dataSettings.GeoDataInputs.prototype.createGeoIdFieldOptions_ = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var activeGeo = model.getActiveGeo();
  if (!activeGeo) return;

  var preparedData = /** @type {chartEditor.model.Base} */(this.getModel()).getPreparedData(activeGeo);
  if (!preparedData.length) return;

  for (var key in preparedData[0].fields) {
    this.geoIdField_.getSelect().addItem(new chartEditor.ui.control.fieldSelect.SelectMenuItem({
      caption: preparedData[0].fields[key].name,
      value: preparedData[0].fields[key].name
    }));
  }
};
