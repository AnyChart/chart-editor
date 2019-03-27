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

/**
 * Creates presets container.
 * @return {Element} - Container element.
 */
chartEditor.ui.presets.Widget.prototype.createContainer = function() {
  return goog.dom.createDom(goog.dom.TagName.DIV, 'anychart-ce-presets-container');
};


/** @inheritDoc */
chartEditor.ui.presets.Widget.prototype.createDom = function() {
  chartEditor.ui.presets.Widget.base(this, 'createDom');

  var element = this.getElement();
  var caption = goog.dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-ce-section-caption',
      'Import Data'
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
  this.setsContainer = this.createContainer();

  goog.dom.appendChild(element, header);
  goog.dom.appendChild(element, this.setsContainer);

  this.dataSets_ = [];
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
              var set = indexJson['sets'][i];
              if (set['products'] && (goog.array.indexOf(set['products'], chartEditor.PRODUCT) >= 0 || chartEditor.PRODUCT == chartEditor.model.Product.BUNDLE)) {
                self.dataIndex[set['id']] = set;
              }
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
 * Creates preset.
 * @param {chartEditor.model.Base} model - Related model.
 * @return {chartEditor.ui.presets.Preset} - Preset instance. //TODO (A.Kudryavtsev): Repalce with older parent?
 */
chartEditor.ui.presets.Widget.prototype.createPreset = function(model) {
  return new chartEditor.ui.presets.Preset(model);
};


/**
 * @param {Array=} opt_ids
 * @private
 */
chartEditor.ui.presets.Widget.prototype.showDataSets_ = function(opt_ids) {
  var createItems = !this.setsContainer.hasChildNodes() && this.dataIndex.length;
  for (var i = 0; i < this.dataIndex.length; i++) {
    var dataSetJson = this.dataIndex[i];
    if (!dataSetJson)
      continue;
    var item;
    if (createItems) {
      dataSetJson['state'] = chartEditor.ui.presets.Widget.DatasetState.NOT_LOADED;
      var model = /** @type {chartEditor.model.Base} */(this.getModel());
      var itemComponent = this.createPreset(model);
      itemComponent.init(dataSetJson, dataSetJson['state']);
      this.addChild(itemComponent, true);
      this.setsContainer.appendChild(itemComponent.getElement());

      this.dataSets_.push(itemComponent);

      // For filter
      item = itemComponent.getElement();
    } else {
      var className = 'data-set-' + dataSetJson['id'];
      item = /** @type {Element} */(goog.dom.findNode(this.setsContainer, function(el) {
        return goog.dom.classlist.contains(/** @type {Element} */(el), className);
      }));
    }

    if (!goog.isArray(opt_ids) || opt_ids.indexOf(dataSetJson['id']) !== -1)
      goog.dom.classlist.remove(/** @type {Element} */(item), 'hidden');
    else
      goog.dom.classlist.add(/** @type {Element} */(item), 'hidden');
  }

  if (createItems) {
    this.setsContainer.appendChild(this.dom_.createDom(goog.dom.TagName.DIV, 'anychart-ce-clearboth'));
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

