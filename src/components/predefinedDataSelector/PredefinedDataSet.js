goog.provide('chartEditor.PredefinedDataSet');

goog.require('chartEditor.Component');
goog.require('goog.ui.Button');



/**
 * Predefined data set panel.
 *
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.Component}
 */
chartEditor.PredefinedDataSet = function(model, opt_domHelper) {
  chartEditor.PredefinedDataSet.base(this, 'constructor', opt_domHelper);
  this.setModel(model);

  this.dataType = chartEditor.EditorModel.DataType.PREDEFINED;

  this.jsonUrl = 'https://cdn.anychart.com/anydata/common/';
  this.addClassName('anychart-predefined-datasets-item');
};
goog.inherits(chartEditor.PredefinedDataSet, chartEditor.Component);


/**
 * @param {Object} json
 * @param {number} state
 */
chartEditor.PredefinedDataSet.prototype.init = function(json, state) {
  this.json_ = json;
  this.state_ = state;
};


/** @inheritDoc */
chartEditor.PredefinedDataSet.prototype.createDom = function() {
  chartEditor.PredefinedDataSet.base(this, 'createDom');

  var element = this.getElement();
  var dom = this.getDomHelper();
  var imgUrl = this.json_['logo'].replace('./', 'https://cdn.anychart.com/anydata/common/');

  var image = goog.dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-predefined-datasets-item-image',
      goog.dom.createDom(goog.dom.TagName.IMG, {'src': imgUrl})
  );
  var caption = dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-predefined-datasets-item-caption',
      this.json_['name']
  );
  var buttons = dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-predefined-datasets-item-buttons'
  );
  var buttonsRenderer = /** @type {goog.ui.ButtonRenderer} */(goog.ui.ControlRenderer.getCustomRenderer(
          goog.ui.ButtonRenderer,
          'anychart-predefined-datasets-item-btn')
  );
  var useBtn = new goog.ui.Button('+ Use', buttonsRenderer);
  useBtn.addClassName('anychart-predefined-datasets-item-btn-use');
  useBtn.render(buttons);
  this.useBtn_ = useBtn;

  var viewBtn = new goog.ui.Button('View sample', buttonsRenderer);
  viewBtn.addClassName('anychart-predefined-datasets-item-btn-view');
  viewBtn.render(buttons);
  this.viewBtn_ = viewBtn;

  dom.appendChild(element, image);
  dom.appendChild(element, caption);
  dom.appendChild(element, buttons);

  this.addClassName('data-set');
  this.addClassName('data-set-' + this.json_['id']);
};


/** @inheritDoc */
chartEditor.PredefinedDataSet.prototype.enterDocument = function() {
  chartEditor.PredefinedDataSet.base(this, 'enterDocument');

  var model = /** @type {chartEditor.EditorModel} */(this.getModel());

  this.getHandler().listen(model, chartEditor.events.EventType.EDITOR_MODEL_UPDATE, this.onModelUpdate);
  this.getHandler().listen(this.useBtn_, goog.ui.Component.EventType.ACTION, this.onUseAction_);
  this.getHandler().listen(this.viewBtn_, goog.ui.Component.EventType.ACTION, this.onViewAction_);

  this.onModelUpdate();
};


/** @private */
chartEditor.PredefinedDataSet.prototype.onModelUpdate = function() {
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var loaded = Boolean(model.getPreparedData(this.dataType + this.json_['id']).length);
  goog.dom.classlist.enable(this.getElement(), 'loaded', loaded);
  this.state_ = loaded ?
      chartEditor.PredefinedDataSelector.DatasetState.LOADED :
      chartEditor.PredefinedDataSelector.DatasetState.NOT_LOADED;
};


/**
 * Loads data set.
 *
 * @param {Object} evt
 * @private
 */
chartEditor.PredefinedDataSet.prototype.onUseAction_ = function(evt) {
  var setId = this.json_['id'];

  if (setId && this.state_ !== chartEditor.PredefinedDataSelector.DatasetState.LOADED) {
    this.state_ = chartEditor.PredefinedDataSelector.DatasetState.PROCESSING;
    this.dispatchEvent({
      type: chartEditor.events.EventType.WAIT,
      wait: true
    });

    var setUrl = this.json_['data'].replace('./', this.jsonUrl);
    var self = this;
    goog.net.XhrIo.send(setUrl,
        function(e) {
          if (e.target.getStatus() === 200) {
            var json = e.target.getResponseJson();
            self.dispatchLoadData(json, setId, self.json_['name']);
            goog.dom.classlist.add(self.getElement(), 'loaded');
          } else {
            self.state_ = chartEditor.PredefinedDataSelector.DatasetState.NOT_LOADED;
          }

          self.dispatchEvent({
            type: chartEditor.events.EventType.WAIT,
            wait: false
          });
        });
  }
};


/** @private */
chartEditor.PredefinedDataSet.prototype.onViewAction_ = function() {
  window.open(this.json_['sample'], '_blank');
};


/**
 * @param {Object} json
 * @param {string} setId
 * @param {string=} opt_name
 */
chartEditor.PredefinedDataSet.prototype.dispatchLoadData = function(json, setId, opt_name) {
  if (json['data']) {
    this.dispatchEvent({
      type: chartEditor.events.EventType.DATA_ADD,
      data: json['data'],
      dataType: this.dataType,
      setId: setId,
      setFullId: this.dataType + setId,

      title: opt_name,
      chartType: json['chartType'],
      seriesType: json['seriesType'],
      activeGeo: json['activeGeo'],
      defaults: json['defaults'] || []
    });
  }
};


/** @inheritDoc */
chartEditor.PredefinedDataSet.prototype.disposeInternal = function () {
  this.useBtn_ = null;
  this.viewBtn_ = null;

  chartEditor.PredefinedDataSet.base(this, 'disposeInternal');
};
