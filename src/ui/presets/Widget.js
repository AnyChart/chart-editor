goog.provide('chartEditor.ui.presets.Widget');

goog.require('chartEditor.ui.Component');
goog.require('chartEditor.ui.dialog.Sample');
goog.require('chartEditor.ui.presets.Preset');
goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.net.XhrIo');



/**
 * Predefined data sets selector widget.
 *
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.presets.Widget = function(model, opt_domHelper) {
  chartEditor.ui.presets.Widget.base(this, 'constructor', opt_domHelper);

  this.setModel(model);

  this.jsonUrl = 'https://cdn.anychart.com/anydata/common/';

  this.dataType = chartEditor.model.DataType.PREDEFINED;

  /**
   * @type {Array}
   * @protected
   */
  this.dataIndex = [];

  // this.searchFields = ['name', 'tags'];

  /**
   * @type {?chartEditor.ui.dialog.Sample}
   * @private
   */
  this.sampleDialog_ = null;

  this.addClassName('anychart-ce-presets');
};
goog.inherits(chartEditor.ui.presets.Widget, chartEditor.ui.Component);


/**
 * @enum {number}
 */
chartEditor.ui.presets.Widget.DatasetState = {
  NOT_LOADED: 0,
  PROCESSING: 1,
  LOADED: 2
};


/** @inheritDoc */
chartEditor.ui.presets.Widget.prototype.createDom = function() {
  chartEditor.ui.presets.Widget.base(this, 'createDom');

  var element = this.getElement();
  var caption = goog.dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-ce-section-caption',
      'From Preset'
  );
  var filter = goog.dom.createDom(
      goog.dom.TagName.INPUT, {
        'class': 'anychart-ce-presets-filter',
        'placeholder': 'Filter...'
      }
  );
  var header = goog.dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-ce-presets-header',
      [caption]
  );
  var container = goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-presets-container');

  goog.dom.appendChild(element, header);
  goog.dom.appendChild(element, container);

  this.dataSets_ = [];

  this.setsContainer_ = container;

  // this.filterInput_ = filter;
};


/**
 * Loads index json
 * @private
 */
chartEditor.ui.presets.Widget.prototype.loadDataIndex_ = function() {
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
          self.initListeners();
        });
  }
};


/** @inheritDoc */
chartEditor.ui.presets.Widget.prototype.enterDocument = function() {
  chartEditor.ui.presets.Widget.base(this, 'enterDocument');

  if (this.dataSets_.length)
    this.initListeners();
  else
    this.loadDataIndex_();
};


/**
 * @param {Array=} opt_ids
 * @private
 */
chartEditor.ui.presets.Widget.prototype.showDataSets_ = function(opt_ids) {
  var createItems = !this.setsContainer_.hasChildNodes() && this.dataIndex.length;
  for (var i = 0; i < this.dataIndex.length; i++) {
    var dataSetJson = this.dataIndex[i];
    var item;
    if (createItems) {
      dataSetJson['state'] = chartEditor.ui.presets.Widget.DatasetState.NOT_LOADED;
      var model = /** @type {chartEditor.model.Base} */(this.getModel());
      var itemComponent = new chartEditor.ui.presets.Preset(model);
      itemComponent.init(dataSetJson, dataSetJson['state']);
      this.addChild(itemComponent, true);
      this.setsContainer_.appendChild(itemComponent.getElement());

      this.dataSets_.push(itemComponent);

      // For filter
      item = itemComponent.getElement();
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
    this.setsContainer_.appendChild(this.dom_.createDom(goog.dom.TagName.DIV, 'anychart-ce-clearboth'));
  }
};


/**
 * Creates listeners for open sample dialog event
 */
chartEditor.ui.presets.Widget.prototype.initListeners = function() {
  for (var i = 0; i < this.dataSets_.length; i++) {
    this.getHandler().listen(this.dataSets_[i], chartEditor.events.EventType.OPEN_SAMPLE_DIALOG, this.onViewSample_);
  }
};


/**
 * @param {Object} evt
 * @private
 */
chartEditor.ui.presets.Widget.prototype.onViewSample_ = function(evt) {
  if (!this.sampleDialog_) {
    this.sampleDialog_ = new chartEditor.ui.dialog.Sample();
  }

  this.sampleDialog_.updateContent(evt.sampleId);
  this.sampleDialog_.setVisible(true);
};


/**
 * Filters list of data sets on change of filter input value.
 *
 * @param {?Object} evt
 * @private
 */
// chartEditor.ui.presets.Widget.prototype.onFilterChange_ = function(evt) {
//   var searchValue = evt && goog.isDef(evt.currentTarget.value) ? evt.currentTarget.value : this.filterInput_.value;
//   searchValue = searchValue.toLowerCase();
//
//   var model = /** @type {chartEditor.model.Base} */(this.getModel());
//   var loadedDataIds = model.getDataKeys();
//   var ids = [];
//   if (searchValue && this.dataIndex.length) {
//     for (var i = 0; i < this.dataIndex.length; i++) {
//       var set = this.dataIndex[i];
//       var setFullId = this.dataType + set['id'];
//       for (var j = 0; j < this.searchFields.length; j++) {
//         var field = this.searchFields[j];
//         if (set[field]) {
//           var fieldValue = set[field];
//           if ((goog.isString(fieldValue) && fieldValue.toLowerCase().indexOf(searchValue) !== -1) ||
//               goog.array.indexOf(loadedDataIds, setFullId) !== -1) {
//             ids.push(set['id']);
//           } else if (goog.isArray(fieldValue)) {
//             var result = fieldValue.filter(function(item) {
//               return item.toLowerCase().indexOf(searchValue) !== -1;
//             });
//             if (result.length)
//               ids.push(set['id']);
//           }
//         }
//       }
//     }
//     this.showDataSets_(ids);
//   } else {
//     // Show everything
//     this.showDataSets_();
//   }
// };
