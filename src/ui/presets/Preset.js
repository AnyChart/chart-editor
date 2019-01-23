goog.provide('chartEditor.ui.presets.Preset');

goog.require('chartEditor.ui.Component');
goog.require('goog.ui.Button');


/**
 * Predefined data set panel.
 *
 * @param {chartEditor.model.Base} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.ui.Component}
 */
chartEditor.ui.presets.Preset = function(model, opt_domHelper) {
  chartEditor.ui.presets.Preset.base(this, 'constructor', opt_domHelper);

  this.setModel(model);

  this.dataType = chartEditor.model.DataType.PREDEFINED;

  this.jsonUrl = 'https://cdn.anychart.com/anydata/common/';

  this.addClassName('anychart-ce-presets-item');
};
goog.inherits(chartEditor.ui.presets.Preset, chartEditor.ui.Component);


/**
 * @param {Object} json
 * @param {number} state
 */
chartEditor.ui.presets.Preset.prototype.init = function(json, state) {
  this.json_ = json;
  this.state_ = state;
};


/** @inheritDoc */
chartEditor.ui.presets.Preset.prototype.createDom = function() {
  chartEditor.ui.presets.Preset.base(this, 'createDom');

  var element = this.getElement();
  var dom = this.getDomHelper();
  var imgUrl = this.json_['logo'].replace('./', 'https://cdn.anychart.com/anydata/common/');

  var image = goog.dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-ce-presets-item-image',
      goog.dom.createDom(goog.dom.TagName.IMG, {'src': imgUrl})
  );
  var caption = dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-ce-presets-item-caption',
      this.json_['name']
  );
  var buttons = dom.createDom(
      goog.dom.TagName.DIV,
      'anychart-ce-presets-item-buttons'
  );
  var buttonsRenderer = /** @type {goog.ui.ButtonRenderer} */(goog.ui.ControlRenderer.getCustomRenderer(
          goog.ui.ButtonRenderer,
          'anychart-ce-presets-item-btn')
  );
  var useBtn = new goog.ui.Button('+ Use Preset', buttonsRenderer);
  useBtn.addClassName('anychart-ce-presets-button-use');
  useBtn.render(buttons);
  this.useBtn_ = useBtn;

  var viewBtn = new goog.ui.Button('', buttonsRenderer);
  viewBtn.addClassName('ac-preview');
  viewBtn.addClassName('anychart-ce-button-view-sample');
  viewBtn.render(buttons);
  this.viewBtn_ = viewBtn;

  dom.appendChild(element, image);
  dom.appendChild(element, caption);
  dom.appendChild(element, buttons);

  this.addClassName('data-set');
  this.addClassName('data-set-' + this.json_['id']);
};


/** @inheritDoc */
chartEditor.ui.presets.Preset.prototype.enterDocument = function() {
  chartEditor.ui.presets.Preset.base(this, 'enterDocument');

  this.getHandler().listen(this.useBtn_, goog.ui.Component.EventType.ACTION, this.onUse_);
  this.getHandler().listen(this.viewBtn_, goog.ui.Component.EventType.ACTION, this.onView_);

  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  this.getHandler().listen(model, chartEditor.events.EventType.EDITOR_MODEL_UPDATE, this.onModelUpdate);

  this.onModelUpdate();
};


/** @private */
chartEditor.ui.presets.Preset.prototype.onModelUpdate = function() {
  var model = /** @type {chartEditor.model.Base} */(this.getModel());
  var loaded = Boolean(model.getPreparedData(this.dataType + this.json_['id']).length);
  goog.dom.classlist.enable(this.getElement(), 'loaded', loaded);
  this.state_ = loaded ?
      chartEditor.ui.presets.Widget.DatasetState.LOADED :
      chartEditor.ui.presets.Widget.DatasetState.NOT_LOADED;
};


/**
 * Loads data set.
 * @private
 */
chartEditor.ui.presets.Preset.prototype.onUse_ = function() {
  if (this.state_ == chartEditor.ui.presets.Widget.DatasetState.LOADED)
    return;

  var setId = this.json_['id'];

  if (setId && this.state_ !== chartEditor.ui.presets.Widget.DatasetState.LOADED) {
    this.state_ = chartEditor.ui.presets.Widget.DatasetState.PROCESSING;
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
            // goog.dom.classlist.add(self.getElement(), 'loaded');
          } else {
            self.state_ = chartEditor.ui.presets.Widget.DatasetState.NOT_LOADED;
          }

          self.dispatchEvent({
            type: chartEditor.events.EventType.WAIT,
            wait: false
          });
        });
  }
};


/** @private */
chartEditor.ui.presets.Preset.prototype.onView_ = function() {
  this.dispatchEvent({
    type: chartEditor.events.EventType.OPEN_SAMPLE_DIALOG,
    sampleUrl: this.json_['sample'],
    sampleId: this.json_['id']
  });
};


/**
 * @param {Object} json
 * @param {string} setId
 * @param {string=} opt_name
 */
chartEditor.ui.presets.Preset.prototype.dispatchLoadData = function(json, setId, opt_name) {
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
chartEditor.ui.presets.Preset.prototype.disposeInternal = function () {
  goog.disposeAll([this.useBtn_, this.viewBtn_]);
  this.useBtn_ = null;
  this.viewBtn_ = null;

  chartEditor.ui.presets.Preset.base(this, 'disposeInternal');
};
