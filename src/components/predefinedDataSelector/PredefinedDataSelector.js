goog.provide('anychart.chartEditorModule.PredefinedDataSelector');

goog.require('anychart.chartEditorModule.Component');
goog.require('anychart.chartEditorModule.PredefinedDataSet');
goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.net.XhrIo');


/**
 * Predefined data sets selector widget.
 *
 * @param {anychart.chartEditorModule.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {anychart.chartEditorModule.Component}
 */
anychart.chartEditorModule.PredefinedDataSelector = function(model, opt_domHelper) {
  anychart.chartEditorModule.PredefinedDataSelector.base(this, 'constructor', opt_domHelper);

  this.title = 'Use one of our data sets';

  this.jsonUrl = 'https://cdn.anychart.com/anydata/common/';

  this.dataType = anychart.chartEditorModule.EditorModel.DataType.PREDEFINED;

  /**
   * @type {Array}
   * @protected
   */
  this.dataIndex = [];

  this.searchFields = ['name', 'tags'];

  this.setModel(model);
  this.addClassName('anychart-predefined-datasets');
};
goog.inherits(anychart.chartEditorModule.PredefinedDataSelector, anychart.chartEditorModule.Component);


/**
 * @enum {number}
 */
anychart.chartEditorModule.PredefinedDataSelector.DatasetState = {
  NOT_LOADED: 0,
  PROCESSING: 1,
  LOADED: 2
};


/** @inheritDoc */
anychart.chartEditorModule.PredefinedDataSelector.prototype.createDom = function() {
  anychart.chartEditorModule.PredefinedDataSelector.base(this, 'createDom');

  var element = this.getElement();
  var caption = goog.dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-chart-editor-section-caption anychart-predefined-datasets-caption',
      'Ready to Use Data Sets'
  );
  var filter = goog.dom.createDom(
      goog.dom.TagName.INPUT, {
        'class': 'anychart-predefined-datasets-filter',
        'placeholder': 'Filter...'
      }
  );
  var header = goog.dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-predefined-datasets-header',
      [caption]
  );
  var container = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-predefined-datasets-container');

  goog.dom.appendChild(element, header);
  goog.dom.appendChild(element, container);

  this.setsContainer_ = container;
  this.filterInput_ = filter;

  this.loadDataIndex_();
};


/**
 * Loads index json.
 *
 * @private
 */
anychart.chartEditorModule.PredefinedDataSelector.prototype.loadDataIndex_ = function() {
  if (!this.dataIndex.length) {
    var self = this;
    goog.net.XhrIo.send(this.jsonUrl + 'index.json',
        function(e) {
          var xhr = e.target;
          var indexJson = xhr.getResponseJson();
          if (indexJson['sets']) {
            for (var i in indexJson['sets']) {
              self.dataIndex[indexJson['sets'][i]['id']] = indexJson['sets'][i];
            }
          }
          self.showDataSets_();
        });
  }
};


/** @inheritDoc */
anychart.chartEditorModule.PredefinedDataSelector.prototype.enterDocument = function() {
  anychart.chartEditorModule.PredefinedDataSelector.base(this, 'enterDocument');

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  this.getHandler().listen(model, anychart.chartEditorModule.events.EventType.EDITOR_MODEL_UPDATE, this.onModelUpdate);
  this.getHandler().listen(this.filterInput_, goog.events.EventType.INPUT, this.onFilterChange_);
  this.onFilterChange_(null);
};


/** @private */
anychart.chartEditorModule.PredefinedDataSelector.prototype.onModelUpdate = function() {
  this.onFilterChange_(null);
};


/**
 * @param {Array=} opt_ids
 * @private
 */
anychart.chartEditorModule.PredefinedDataSelector.prototype.showDataSets_ = function(opt_ids) {
  var createItems = !this.setsContainer_.hasChildNodes() && this.dataIndex.length;
  for (var i = 0; i < this.dataIndex.length; i++) {
    var dataSetJson = this.dataIndex[i];
    var item;
    if (createItems) {
      dataSetJson['state'] = anychart.chartEditorModule.PredefinedDataSelector.DatasetState.NOT_LOADED;
      var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
      item = new anychart.chartEditorModule.PredefinedDataSet(model);
      item.init(dataSetJson, dataSetJson['state']);
      this.addChild(item, true);
      this.setsContainer_.appendChild(item.getElement());

      // For filter
      item = item.getElement();
    } else {
      var className = 'data-set-' + dataSetJson['id'];
      item = /** @type {Element} */(goog.dom.findNode(this.setsContainer_, function(el) {
        return goog.dom.classlist.contains(/** @type {Element} */(el), className);
      }));
    }

    if (!goog.isArray(opt_ids) || opt_ids.indexOf(dataSetJson['id']) !== -1)
      goog.dom.classlist.remove(/** @type {Element} */(item), 'hidden');
    else
      goog.dom.classlist.add(/** @type {Element} */(item), 'hidden');
  }

  if (createItems) {
    this.setsContainer_.appendChild(this.dom_.createDom(goog.dom.TagName.DIV, 'anychart-clearboth'));
  }
};


/**
 * Filters list of data sets on change of filter input value.
 *
 * @param {?Object} evt
 * @private
 */
anychart.chartEditorModule.PredefinedDataSelector.prototype.onFilterChange_ = function(evt) {
  var searchValue = evt && goog.isDef(evt.currentTarget.value) ? evt.currentTarget.value : this.filterInput_.value;
  searchValue = searchValue.toLowerCase();

  var model = /** @type {anychart.chartEditorModule.EditorModel} */(this.getModel());
  var loadedDataIds = model.getDataKeys();
  var ids = [];
  if (searchValue && this.dataIndex.length) {
    for (var i = 0; i < this.dataIndex.length; i++) {
      var set = this.dataIndex[i];
      var setFullId = this.dataType + set['id'];
      for (var j = 0; j < this.searchFields.length; j++) {
        var field = this.searchFields[j];
        if (set[field]) {
          var fieldValue = set[field];
          if ((goog.isString(fieldValue) && fieldValue.toLowerCase().indexOf(searchValue) !== -1) ||
              goog.array.indexOf(loadedDataIds, setFullId) !== -1) {
            ids.push(set['id']);
          } else if (goog.isArray(fieldValue)) {
            var result = fieldValue.filter(function(item) {
              return item.toLowerCase().indexOf(searchValue) !== -1;
            });
            if (result.length)
              ids.push(set['id']);
          }
        }
      }
    }
    this.showDataSets_(ids);
  } else {
    // Show everything
    this.showDataSets_();
  }
};
