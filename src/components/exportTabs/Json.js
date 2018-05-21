goog.provide('chartEditor.exportTabs.Json');

goog.require('chartEditor.SettingsPanel');
goog.require('goog.Timer');


/**
 * @param {chartEditor.EditorModel} model
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link goog.ui.Component} for semantics.
 * @constructor
 * @extends {chartEditor.SettingsPanel}
 */
chartEditor.exportTabs.Json = function(model, opt_domHelper) {
  chartEditor.exportTabs.Json.base(this, 'constructor', model, 'JSON', opt_domHelper);

  this.key = [];
};
goog.inherits(chartEditor.exportTabs.Json, chartEditor.SettingsPanel);


/** @inheritDoc */
chartEditor.exportTabs.Json.prototype.enterDocument = function() {
  chartEditor.exportTabs.Json.base(this, 'enterDocument');

  this.dispatchEvent({
    type: chartEditor.events.EventType.WAIT,
    wait: true
  });
};


/** @inheritDoc */
/** @inheritDoc */
chartEditor.exportTabs.Json.prototype.onChartDraw = function(evt) {
  chartEditor.exportTabs.Json.base(this, 'onChartDraw', evt);

  var self = this;
  var model = /** @type {chartEditor.EditorModel} */(this.getModel());
  var json = model.getChartAsJson();

  var dom = this.getDomHelper();
  if (this.preEl)
    dom.removeNode(this.preEl);

  this.codeEl = dom.createDom(goog.dom.TagName.CODE, 'language-json', json);
  this.preEl = dom.createDom(goog.dom.TagName.PRE, 'language-json', this.codeEl);
  dom.appendChild(this.getContentElement(), this.preEl);

  var chartContainer = dom.getElementByClass('anychart-ce-chart-container');
  if (chartContainer) {
    var h = goog.style.getSize(chartContainer).height;
    goog.style.setHeight(this.preEl, h);
  }

  var wrapperEl = dom.getAncestorByClass( this.preEl, 'anychart-ce-step-tab-content');
  if (wrapperEl) {
    goog.style.setStyle(wrapperEl, 'overflow-y', 'hidden');
  }

  var prism = goog.dom.getWindow()['Prism'];
  if (prism) {
    prism['highlightElement'](this.codeEl);
  }

  goog.Timer.callOnce(function(){
    self.dispatchEvent({
      type: chartEditor.events.EventType.WAIT,
      wait: false
    });
  }, 10);
};


/** @inheritDoc */
chartEditor.exportTabs.Json.prototype.disposeInternal = function() {
  this.preEl = this.codeEl = null;

  chartEditor.exportTabs.Json.base(this, 'disposeInternal');
};
